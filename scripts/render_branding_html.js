/**
 * ZTTeam - Minimalist HTML/CSS Fanpage Avatar & Cover Renderer
 * Tiêu chí: ĐƠN GIẢN, TINH TẾ, CHỈ CÓ TÊN FANPAGE - KHÔNG THÊM BẤT KỲ CHI TIẾT NÀO KHÁC.
 *  - Avatar: 800 x 800 px (Căn giữa tuyệt đối trong vòng an toàn hình tròn Facebook)
 *  - Cover: 1640 x 924 px (Căn giữa tuyệt đối, hiển thị hoàn hảo trên cả Mobile & Desktop)
 *  - Tuyệt đối không màu Hồng / Tím.
 */

const fs = require('fs');
const path = require('path');
const puppeteer = require('puppeteer');
const { PrismaClient } = require('@prisma/client');
const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');

const connectionString = process.env.DATABASE_URL || 'postgresql://root:rootpassword@postgres:5432/ztreel?schema=public';
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

/**
 * 3 Phong cách nền tối giản, sang trọng (Chỉ đổi nhẹ tone màu nền và font chữ)
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

/**
 * Avatar tối giản: Chỉ có duy nhất tên Page ở giữa
 */
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

/**
 * Cover tối giản: Chỉ có duy nhất tên Page ở giữa
 */
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

async function main() {
  console.log('=== RENDER BỘ NHẬN DIỆN TỐI GIẢN (CHỈ CÓ TÊN FANPAGE) ===');

  const pages = [
    { id: '02cc71fe-cbb5-425f-ae91-995d2b00b0dd', name: 'Lucas King 4435' },
    { id: '069a559a-c413-48ba-bf97-1ef7e4a98057', name: 'Lucas Johnson 3953' },
    { id: '0989c0f5-fba5-467b-92ae-4ea54f25544a', name: 'Henry Martin 5750' },
  ];

  const storageDir = path.resolve(process.cwd(), 'storage/branding');
  if (!fs.existsSync(storageDir)) {
    fs.mkdirSync(storageDir, { recursive: true });
  }

  console.log('\nKhởi chạy Puppeteer Chromium...');
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

  const results = [];

  for (let i = 0; i < pages.length; i++) {
    const p = pages[i];
    const theme = MINIMAL_THEMES[i % MINIMAL_THEMES.length];

    console.log(`\n[${i + 1}/3] Đang render tối giản cho "${p.name}" (Theme: ${theme.name})`);

    const avatarHtml = generateMinimalAvatar(p.name, theme);
    const coverHtml = generateMinimalCover(p.name, theme);

    const avatarFilename = `page_${p.id}_avatar.png`;
    const coverFilename = `page_${p.id}_cover.png`;

    const avatarLocalPath = path.join(storageDir, avatarFilename);
    const coverLocalPath = path.join(storageDir, coverFilename);

    // 1. Render Avatar (800x800)
    const tab1 = await browser.newPage();
    await tab1.setViewport({ width: 800, height: 800, deviceScaleFactor: 1 });
    await tab1.setContent(avatarHtml, { waitUntil: 'networkidle0', timeout: 30000 });
    await tab1.evaluateHandle('document.fonts.ready');
    await new Promise(r => setTimeout(r, 300));
    await tab1.screenshot({ path: avatarLocalPath, type: 'png' });
    await tab1.close();
    console.log(`  ✓ Xong Avatar: ${avatarLocalPath}`);

    // 2. Render Cover (1640x924)
    const tab2 = await browser.newPage();
    await tab2.setViewport({ width: 1640, height: 924, deviceScaleFactor: 1 });
    await tab2.setContent(coverHtml, { waitUntil: 'networkidle0', timeout: 30000 });
    await tab2.evaluateHandle('document.fonts.ready');
    await new Promise(r => setTimeout(r, 300));
    await tab2.screenshot({ path: coverLocalPath, type: 'png' });
    await tab2.close();
    console.log(`  ✓ Xong Cover Photo: ${coverLocalPath}`);

    const avatarUrl = `/storage/branding/${avatarFilename}?v=${Date.now()}`;
    const coverUrl = `/storage/branding/${coverFilename}?v=${Date.now()}`;

    // Cập nhật Database
    await prisma.ztteam_pages.update({
      where: { id: p.id },
      data: {
        branding_avatar_url: avatarUrl,
        branding_cover_url: coverUrl,
        branding_status: 'PENDING_APPROVAL',
        branding_updated_at: new Date(),
      }
    });

    results.push({
      id: p.id,
      name: p.name,
      theme: theme.name,
      avatarUrl: `https://t9.goxo.us${avatarUrl}`,
      coverUrl: `https://t9.goxo.us${coverUrl}`,
    });
  }

  await browser.close();
  await prisma.$disconnect();
  await pool.end();

  console.log(`\n============================================================`);
  console.log(`🎉 HOÀN THÀNH RENDER BỘ NHẬN DIỆN TỐI GIẢN!`);
  console.log(`============================================================\n`);
  results.forEach((r, idx) => {
    console.log(`[${idx + 1}] ${r.name} (${r.theme})`);
    console.log(`  - Avatar: ${r.avatarUrl}`);
    console.log(`  - Cover:  ${r.coverUrl}\n`);
  });
}

main().catch(err => {
  console.error('❌ LỖI:', err);
  process.exit(1);
});
