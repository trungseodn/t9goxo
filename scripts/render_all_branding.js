/**
 * ZTTeam - Tự động Render và Áp dụng Bộ nhận diện Tối giản (Chỉ có tên Fanpage)
 * Cho toàn bộ Fanpage chưa có Avatar/Cover trên hệ thống.
 * 
 * - Render Avatar (800x800 px) & Cover (1640x924 px) bằng HTML/CSS qua Chromium.
 * - Tự động upload và gán Avatar & Cover lên Facebook Fanpage qua Meta Graph API (published=false để tránh spam).
 * - Cập nhật database ztteam_pages.
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const axios = require('axios');
const FormData = require('form-data');
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const connectionString = process.env.DATABASE_URL || 'postgresql://root:rootpassword@postgres:5432/ztreel?schema=public';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const API_VERSION = 'v21.0';

/**
 * 3 Phong cách nền tối giản, sang trọng (Zero Pink, Zero Purple)
 */
const MINIMAL_THEMES = [
  {
    id: 'deep_slate_cyan',
    name: 'Deep Slate Minimalist',
    bgAvatar: 'radial-gradient(circle at 50% 50%, #0d1a2d 0%, #060d17 60%, #02050a 100%)',
    bgCover: 'radial-gradient(ellipse at 50% 50%, #0f2038 0%, #060e1a 55%, #020509 100%)',
    fontFamily: "'Montserrat', sans-serif",
    textGradient: 'linear-gradient(135deg, #ffffff 40%, #e2e8f0 70%, #94a3b8 100%)',
    textGlow: '0 0 35px rgba(56, 189, 248, 0.25)',
  },
  {
    id: 'luxury_charcoal_gold',
    name: 'Luxury Charcoal Minimalist',
    bgAvatar: 'radial-gradient(circle at 50% 50%, #1a1610 0%, #0d0a06 60%, #040302 100%)',
    bgCover: 'radial-gradient(ellipse at 50% 50%, #201a11 0%, #0f0c08 55%, #050402 100%)',
    fontFamily: "'Plus Jakarta Sans', sans-serif",
    textGradient: 'linear-gradient(135deg, #ffffff 40%, #fef3c7 70%, #f59e0b 100%)',
    textGlow: '0 0 35px rgba(245, 158, 11, 0.25)',
  },
  {
    id: 'deep_emerald_carbon',
    name: 'Deep Emerald Minimalist',
    bgAvatar: 'radial-gradient(circle at 50% 50%, #081d14 0%, #030d09 60%, #010403 100%)',
    bgCover: 'radial-gradient(ellipse at 50% 50%, #0a2519 0%, #04120c 55%, #010503 100%)',
    fontFamily: "'Inter', sans-serif",
    textGradient: 'linear-gradient(135deg, #ffffff 40%, #d1fae5 70%, #10b981 100%)',
    textGlow: '0 0 35px rgba(16, 185, 129, 0.25)',
  }
];

function generateMinimalAvatar(pageName, theme) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800;900&family=Plus+Jakarta+Sans:wght@800;900&family=Inter:wght@800;900&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 800px;
      height: 800px;
      background: ${theme.bgAvatar};
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 60px;
      overflow: hidden;
    }
    .page-name {
      font-family: ${theme.fontFamily};
      font-size: 58px;
      font-weight: 900;
      line-height: 1.15;
      letter-spacing: -0.5px;
      text-transform: uppercase;
      background: ${theme.textGradient};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 4px 20px rgba(0, 0, 0, 0.8));
      text-shadow: ${theme.textGlow};
      max-width: 640px;
      word-break: break-word;
    }
  </style>
</head>
<body>
  <h1 class="page-name">${pageName}</h1>
</body>
</html>`;
}

function generateMinimalCover(pageName, theme) {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800;900&family=Plus+Jakarta+Sans:wght@800;900&family=Inter:wght@800;900&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1640px;
      height: 924px;
      background: ${theme.bgCover};
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 80px 120px;
      overflow: hidden;
    }
    .page-name {
      font-family: ${theme.fontFamily};
      font-size: 96px;
      font-weight: 900;
      line-height: 1.1;
      letter-spacing: -1.5px;
      text-transform: uppercase;
      background: ${theme.textGradient};
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 6px 30px rgba(0, 0, 0, 0.9));
      text-shadow: ${theme.textGlow};
      max-width: 1350px;
      word-break: break-word;
    }
  </style>
</head>
<body>
  <h1 class="page-name">${pageName}</h1>
</body>
</html>`;
}

/**
 * Gắn Avatar và Cover lên Facebook Fanpage qua Meta Graph API
 */
async function applyToFacebook(page, avatarPath, coverPath) {
  const token = page.page_token_encrypted;
  const pageId = page.fb_page_id;

  if (!token) {
    throw new Error('Chưa có Page Token');
  }

  // 1. Tải Avatar
  let updatedAvatar = false;
  if (fs.existsSync(avatarPath)) {
    const avForm = new FormData();
    avForm.append('access_token', token);
    avForm.append('published', 'false');
    avForm.append('source', fs.createReadStream(avatarPath));

    const avUpload = await axios.post(`https://graph.facebook.com/${API_VERSION}/${pageId}/photos`, avForm, {
      headers: avForm.getHeaders(),
      maxBodyLength: Infinity,
      timeout: 30000,
    });

    const avPhotoId = avUpload.data?.id;
    if (avPhotoId) {
      await axios.post(`https://graph.facebook.com/${API_VERSION}/${pageId}/picture`, null, {
        params: { photo: avPhotoId, access_token: token },
        timeout: 20000,
      });
      updatedAvatar = true;
    }
  }

  // 2. Tải Cover Photo
  let updatedCover = false;
  if (fs.existsSync(coverPath)) {
    const cvForm = new FormData();
    cvForm.append('access_token', token);
    cvForm.append('published', 'false');
    cvForm.append('source', fs.createReadStream(coverPath));

    const cvUpload = await axios.post(`https://graph.facebook.com/${API_VERSION}/${pageId}/photos`, cvForm, {
      headers: cvForm.getHeaders(),
      maxBodyLength: Infinity,
      timeout: 30000,
    });

    const cvPhotoId = cvUpload.data?.id;
    if (cvPhotoId) {
      await axios.post(`https://graph.facebook.com/${API_VERSION}/${pageId}`, null, {
        params: { cover: cvPhotoId, offset_y: 0, access_token: token },
        timeout: 20000,
      });
      updatedCover = true;
    }
  }

  return { updatedAvatar, updatedCover };
}

async function main() {
  console.log('================================================================');
  console.log('🚀 BẮT ĐẦU QUY TRÌNH RENDER VÀ GẮN NHẬN DIỆN TỐI GIẢN TOÀN BỘ PAGE');
  console.log('================================================================\n');

  // 1. Lấy danh sách toàn bộ các page chưa có branding (hoặc cần cập nhật)
  const pendingPages = await prisma.ztteam_pages.findMany({
    where: {
      is_active: true,
      OR: [
        { branding_avatar_url: null },
        { branding_cover_url: null },
        { branding_status: 'PENDING_APPROVAL' }
      ]
    },
    orderBy: { name: 'asc' },
    select: {
      id: true,
      fb_page_id: true,
      name: true,
      page_token_encrypted: true,
      branding_avatar_url: true,
      branding_cover_url: true,
    }
  });

  console.log(`Tìm thấy tổng cộng: ${pendingPages.length} Fanpage cần xử lý.\n`);

  if (pendingPages.length === 0) {
    console.log('Tất cả Fanpage đều đã có ảnh đại diện và ảnh bìa hợp lệ!');
    process.exit(0);
  }

  const storageDir = path.resolve(process.cwd(), 'storage/branding');
  if (!fs.existsSync(storageDir)) {
    fs.mkdirSync(storageDir, { recursive: true });
  }

  console.log('Khởi chạy Chromium Puppeteer...');
  const browser = await puppeteer.launch({
    headless: true,
    executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || '/usr/bin/chromium',
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-gpu',
      '--disable-dev-shm-usage',
      '--force-color-profile=srgb',
    ]
  });

  const tabAvatar = await browser.newPage();
  await tabAvatar.setViewport({ width: 800, height: 800, deviceScaleFactor: 1 });

  const tabCover = await browser.newPage();
  await tabCover.setViewport({ width: 1640, height: 924, deviceScaleFactor: 1 });

  let successCount = 0;
  let failCount = 0;

  for (let i = 0; i < pendingPages.length; i++) {
    const p = pendingPages[i];
    const theme = MINIMAL_THEMES[i % MINIMAL_THEMES.length];
    const prefix = `[${i + 1}/${pendingPages.length}] "${p.name}"`;

    const avatarFilename = `page_${p.id}_avatar.png`;
    const coverFilename = `page_${p.id}_cover.png`;
    const avatarLocalPath = path.join(storageDir, avatarFilename);
    const coverLocalPath = path.join(storageDir, coverFilename);

    const avatarUrl = `/storage/branding/${avatarFilename}`;
    const coverUrl = `/storage/branding/${coverFilename}`;

    try {
      // 1. Render Avatar (800x800)
      const avatarHtml = generateMinimalAvatar(p.name, theme);
      await tabAvatar.setContent(avatarHtml, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await tabAvatar.screenshot({ path: avatarLocalPath, type: 'png' });

      // 2. Render Cover (1640x924)
      const coverHtml = generateMinimalCover(p.name, theme);
      await tabCover.setContent(coverHtml, { waitUntil: 'domcontentloaded', timeout: 15000 });
      await tabCover.screenshot({ path: coverLocalPath, type: 'png' });

      // 3. Cập nhật Database
      await prisma.ztteam_pages.update({
        where: { id: p.id },
        data: {
          branding_avatar_url: avatarUrl,
          branding_cover_url: coverUrl,
          branding_status: 'PROCESSING',
          branding_updated_at: new Date(),
        }
      });

      // 4. Gắn lên Facebook Meta Graph API
      let fbStatusMsg = 'Bỏ qua FB';
      if (p.page_token_encrypted) {
        try {
          const { updatedAvatar, updatedCover } = await applyToFacebook(p, avatarLocalPath, coverLocalPath);
          fbStatusMsg = `FB OK (Avatar: ${updatedAvatar ? '✓' : '✗'}, Cover: ${updatedCover ? '✓' : '✗'})`;
          
          await prisma.ztteam_pages.update({
            where: { id: p.id },
            data: {
              branding_status: 'COMPLETED',
              branding_error: null,
            }
          });
        } catch (fbErr) {
          const errMsg = fbErr.response?.data?.error?.message || fbErr.message;
          fbStatusMsg = `FB Lỗi: ${errMsg}`;
          await prisma.ztteam_pages.update({
            where: { id: p.id },
            data: {
              branding_status: 'FAILED',
              branding_error: errMsg,
            }
          });
        }
      }

      console.log(`${prefix} -> Render OK | ${fbStatusMsg}`);
      successCount++;
    } catch (renderErr) {
      console.error(`${prefix} -> LỖI RENDER: ${renderErr.message}`);
      failCount++;
    }

    // Nghỉ nhẹ 300ms giữa các request để bảo vệ rate-limit Facebook Graph API
    await new Promise(r => setTimeout(r, 300));
  }

  await tabAvatar.close();
  await tabCover.close();
  await browser.close();
  await prisma.$disconnect();
  await pool.end();

  console.log('\n================================================================');
  console.log(`🎉 HOÀN THÀNH TẤT CẢ! Thành công: ${successCount} | Thất bại: ${failCount}`);
  console.log('================================================================\n');
}

main().catch(err => {
  console.error('❌ LỖI TOÀN CỤC:', err);
  process.exit(1);
});

