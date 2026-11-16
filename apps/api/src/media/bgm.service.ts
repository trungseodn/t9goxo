import { Injectable, Logger, BadRequestException, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { promisify } from 'util';
import { ztteam_getBgmPath } from '../common/ztteam_storage.util';

const execAsync = promisify(exec);

export interface ZTTeamBgmItem {
  id: string;
  filename: string;
  name: string;
  url: string;
  size_bytes: number;
  size_formatted: string;
  created_at: string;
}

@Injectable()
export class ZTTeamBgmService {
  private readonly logger = new Logger('ZTTeamBgmService');

  /**
   * ZTTeam: Lấy danh sách tất cả file âm thanh trong thư viện BGM
   */
  async ztteam_getBgmList(): Promise<ZTTeamBgmItem[]> {
    const bgmDir = ztteam_getBgmPath();
    if (!fs.existsSync(bgmDir)) {
      fs.mkdirSync(bgmDir, { recursive: true });
      return [];
    }

    const files = fs.readdirSync(bgmDir);
    const audioExts = ['.mp3', '.m4a', '.wav', '.aac', '.ogg', '.mp4'];

    const items: ZTTeamBgmItem[] = [];

    for (const filename of files) {
      const ext = path.extname(filename).toLowerCase();
      if (!audioExts.includes(ext)) continue;

      const fullPath = path.join(bgmDir, filename);
      try {
        const stat = fs.statSync(fullPath);
        const nameWithoutExt = path.basename(filename, ext).replace(/[_-]/g, ' ');
        const formattedName = nameWithoutExt
          .split(' ')
          .map(w => w.charAt(0).toUpperCase() + w.slice(1))
          .join(' ');

        items.push({
          id: filename,
          filename,
          name: formattedName,
          url: `/storage/bgm/${filename}`,
          size_bytes: stat.size,
          size_formatted: (stat.size / (1024 * 1024)).toFixed(2) + ' MB',
          created_at: stat.birthtime ? stat.birthtime.toISOString() : new Date().toISOString(),
        });
      } catch (e) {
        /** Bỏ qua nếu lỗi đọc file */
      }
    }

    /** Ưu tiên kiss_of_spring.mp4 lên đầu nếu có */
    items.sort((a, b) => {
      if (a.filename === 'kiss_of_spring.mp4') return -1;
      if (b.filename === 'kiss_of_spring.mp4') return 1;
      return a.name.localeCompare(b.name);
    });

    return items;
  }

  /**
   * ZTTeam: Tải file âm thanh mới lên thư viện BGM
   * Tự động trích xuất track âm thanh sang MP3 chất lượng cao nếu tải lên file Video MP4, MOV, WEBM
   */
  async ztteam_saveBgmFile(file: any): Promise<ZTTeamBgmItem> {
    if (!file) {
      throw new BadRequestException('Vui lòng chọn file âm thanh để tải lên');
    }

    const audioExts = ['.mp3', '.m4a', '.wav', '.aac', '.ogg', '.flac'];
    const videoExts = ['.mp4', '.mov', '.webm', '.mkv', '.m4v', '.avi', '.flv'];
    const originalExt = path.extname(file.originalname).toLowerCase();

    const isAudio = audioExts.includes(originalExt);
    const isVideo = videoExts.includes(originalExt);

    if (!isAudio && !isVideo) {
      throw new BadRequestException(
        `Định dạng file không hỗ trợ: ${originalExt}. Hệ thống hỗ trợ âm thanh (MP3, M4A, WAV, AAC, OGG) và Video (MP4, MOV, WEBM).`
      );
    }

    const bgmDir = ztteam_getBgmPath();
    if (!fs.existsSync(bgmDir)) {
      fs.mkdirSync(bgmDir, { recursive: true });
    }

    /** Chuẩn hóa tên file an toàn */
    const baseName = path.basename(file.originalname, originalExt)
      .toLowerCase()
      .replace(/[^a-z0-9]/g, '_')
      .replace(/_+/g, '_')
      .substring(0, 50);

    /**
     * Nếu là video (MP4, MOV,...), luôn trích xuất sang định dạng .mp3 để trình duyệt phát thử
     * và render video mượt mà 100%. Nếu là audio thì giữ nguyên phần mở rộng hoặc lưu mp3.
     */
    const finalExt = isVideo ? '.mp3' : originalExt;
    const safeFilename = `${baseName}_${Date.now()}${finalExt}`;
    const targetPath = path.join(bgmDir, safeFilename);

    if (isVideo) {
      /** Trích xuất stream âm thanh từ video sang MP3 bằng FFmpeg */
      try {
        await execAsync(`ffmpeg -nostdin -y -i "${file.path}" -vn -c:a libmp3lame -b:a 192k -ar 44100 "${targetPath}"`);
      } catch (err: any) {
        this.logger.error(`Trích xuất audio thất bại từ ${file.originalname}: ${err.message}`);
        throw new BadRequestException(
          `Không thể trích xuất âm thanh từ file video "${file.originalname}". Hãy đảm bảo video có chứa track âm thanh hợp lệ.`
        );
      }
    } else {
      fs.copyFileSync(file.path, targetPath);
    }

    /** Xóa file tạm của multer */
    try {
      if (file.path && fs.existsSync(file.path)) {
        fs.unlinkSync(file.path);
      }
    } catch (e) {
      /** Bỏ qua */
    }

    if (!fs.existsSync(targetPath)) {
      throw new BadRequestException(`Lưu file âm thanh thất bại: ${file.originalname}`);
    }

    const stat = fs.statSync(targetPath);
    this.logger.log(`Uploaded BGM file: ${safeFilename} (${(stat.size / 1024 / 1024).toFixed(2)} MB, isVideoExtracted=${isVideo})`);

    const formattedTitle = baseName
      .split('_')
      .filter(Boolean)
      .map(w => w.charAt(0).toUpperCase() + w.slice(1))
      .join(' ') || 'BGM Track';

    return {
      id: safeFilename,
      filename: safeFilename,
      name: formattedTitle,
      url: `/storage/bgm/${safeFilename}`,
      size_bytes: stat.size,
      size_formatted: (stat.size / (1024 * 1024)).toFixed(2) + ' MB',
      created_at: new Date().toISOString(),
    };
  }

  /**
   * ZTTeam: Tải hàng loạt file âm thanh / video MP4 lên thư viện BGM cùng lúc
   */
  async ztteam_saveBgmFilesBulk(files: any[]): Promise<{
    succeeded: ZTTeamBgmItem[];
    failed: { filename: string; reason: string }[];
  }> {
    if (!files || files.length === 0) {
      throw new BadRequestException('Vui lòng chọn ít nhất 1 file để tải lên');
    }

    const succeeded: ZTTeamBgmItem[] = [];
    const failed: { filename: string; reason: string }[] = [];

    for (const file of files) {
      try {
        const item = await this.ztteam_saveBgmFile(file);
        succeeded.push(item);
      } catch (err: any) {
        failed.push({
          filename: file.originalname || 'unknown',
          reason: err.message || 'Lỗi không xác định',
        });
        /** Dọn dẹp file tạm nếu còn */
        try {
          if (file.path && fs.existsSync(file.path)) fs.unlinkSync(file.path);
        } catch (_) {}
      }
    }

    return { succeeded, failed };
  }

  /**
   * ZTTeam: Xóa file âm thanh khỏi thư viện BGM
   */
  async ztteam_deleteBgmFile(filename: string): Promise<boolean> {
    const bgmDir = ztteam_getBgmPath();
    const targetPath = path.join(bgmDir, path.basename(filename));

    if (!fs.existsSync(targetPath)) {
      throw new NotFoundException(`Không tìm thấy file âm thanh: ${filename}`);
    }

    fs.unlinkSync(targetPath);
    this.logger.log(`Deleted BGM file: ${filename}`);
    return true;
  }

  /**
   * ZTTeam: Lấy đường dẫn file BGM tuyệt đối để render video
   * Mặc định ngẫu nhiên (random) trong đúng 3 bản nhạc tuyển chọn:
   * 1. kiss_of_spring.mp4
   * 2. summit.mp4
   * 3. to_the_top.mp4
   */
  ztteam_resolveBgmPath(preferredFilename?: string | null): string {
    const bgmDir = ztteam_getBgmPath();

    /** 1. Nếu có file chỉ định và tồn tại */
    if (preferredFilename) {
      const p = path.join(bgmDir, path.basename(preferredFilename));
      if (fs.existsSync(p)) return p;
    }

    /** 2. Danh sách 3 file nhạc tuyển chọn mặc định */
    const TOP_3_BGM = ['kiss_of_spring.mp4', 'summit.mp4', 'to_the_top.mp4'];

    /** Kiểm tra các file khả dụng trong storage/bgm */
    const availableTopBgm = TOP_3_BGM
      .map(file => path.join(bgmDir, file))
      .filter(fullPath => fs.existsSync(fullPath));

    if (availableTopBgm.length > 0) {
      const randIndex = Math.floor(Math.random() * availableTopBgm.length);
      return availableTopBgm[randIndex];
    }

    /** 3. Fallback lấy bất kỳ file âm thanh nào trong thư mục storage/bgm */
    if (fs.existsSync(bgmDir)) {
      const audioExts = ['.mp3', '.m4a', '.wav', '.aac', '.mp4'];
      const files = fs.readdirSync(bgmDir).filter(f => audioExts.includes(path.extname(f).toLowerCase()));
      if (files.length > 0) {
        const rand = files[Math.floor(Math.random() * files.length)];
        return path.join(bgmDir, rand);
      }
    }

    /** 4. Fallback về assets/bgm nếu storage chưa có */
    const assetsBgmDir = path.join(process.cwd(), 'assets', 'bgm');
    for (const file of TOP_3_BGM) {
      const assetPath = path.join(assetsBgmDir, file);
      if (fs.existsSync(assetPath)) return assetPath;
    }

    throw new Error('Không tìm thấy bản nhạc nền BGM nào trong hệ thống');
  }
}
