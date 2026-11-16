import { Controller, Get, Post, Delete, Param, Body, UploadedFiles, UseInterceptors, BadRequestException } from '@nestjs/common';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { ZTTeamBgmService } from './bgm.service';
import { ZTTeamHookVideoService } from './hook-video.service';
import * as os from 'os';
const { diskStorage } = require('multer');

@Controller('media')
export class ZTTeamMediaController {
  constructor(
    private readonly bgmService: ZTTeamBgmService,
    private readonly hookVideoService: ZTTeamHookVideoService,
  ) {}

  /**
   * ZTTeam: Lấy danh sách nhạc nền BGM trong thư viện
   * GET /api/media/bgm
   */
  @Get('bgm')
  async ztteam_getBgmList() {
    const list = await this.bgmService.ztteam_getBgmList();
    return {
      success: true,
      data: list,
    };
  }

  /**
   * ZTTeam: Tải file nhạc nền BGM mới lên hệ thống (Hỗ trợ 1 file hoặc hàng loạt file)
   * Tự động trích xuất âm thanh từ MP4, MOV sang MP3
   * POST /api/media/bgm/upload
   */
  @Post('bgm/upload')
  @UseInterceptors(AnyFilesInterceptor({
    storage: diskStorage({
      destination: os.tmpdir(),
    }),
    limits: {
      fileSize: 100 * 1024 * 1024, /** Tối đa 100MB cho file âm thanh hoặc video MP4 */
    },
  }))
  async ztteam_uploadBgm(@UploadedFiles() files: any[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Không tìm thấy file tải lên');
    }

    if (files.length === 1) {
      const item = await this.bgmService.ztteam_saveBgmFile(files[0]);
      return {
        success: true,
        message: 'Tải file âm thanh lên thư viện thành công!',
        data: item,
        items: [item],
      };
    }

    const result = await this.bgmService.ztteam_saveBgmFilesBulk(files);
    return {
      success: true,
      message: `Đã xử lý xong ${result.succeeded.length}/${files.length} file âm thanh!`,
      data: result.succeeded[0] || null,
      items: result.succeeded,
      failed: result.failed,
    };
  }

  /**
   * ZTTeam: Tải hàng loạt file âm thanh / video MP4 lên hệ thống
   * POST /api/media/bgm/bulk-upload
   */
  @Post('bgm/bulk-upload')
  @UseInterceptors(AnyFilesInterceptor({
    storage: diskStorage({
      destination: os.tmpdir(),
    }),
    limits: {
      fileSize: 100 * 1024 * 1024,
    },
  }))
  async ztteam_bulkUploadBgm(@UploadedFiles() files: any[]) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Vui lòng chọn ít nhất 1 file để tải lên');
    }

    const result = await this.bgmService.ztteam_saveBgmFilesBulk(files);
    return {
      success: true,
      message: `Đã xử lý thành công ${result.succeeded.length}/${files.length} file âm thanh!`,
      data: result.succeeded[0] || null,
      items: result.succeeded,
      failed: result.failed,
    };
  }

  /**
   * ZTTeam: Xóa file nhạc nền BGM khỏi hệ thống
   * DELETE /api/media/bgm/:filename
   */
  @Delete('bgm/:filename')
  async ztteam_deleteBgm(@Param('filename') filename: string) {
    if (!filename) {
      throw new BadRequestException('Vui lòng chỉ định tên file âm thanh cần xóa');
    }

    await this.bgmService.ztteam_deleteBgmFile(filename);
    return {
      success: true,
      message: 'Đã xóa file âm thanh thành công!',
    };
  }

  /**
   * ZTTeam: Kích hoạt render Video Hook sắc nét từ ảnh thủ công
   * POST /api/media/hook-render/:imageId
   */
  @Post('hook-render/:imageId')
  async ztteam_triggerHookRender(@Param('imageId') imageId: string, @Body() body: { bgm?: string }) {
    const result = await this.hookVideoService.ztteam_renderHookVideo(imageId, {
      bgmFilename: body?.bgm,
    });
    return result;
  }
}
