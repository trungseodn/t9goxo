/**
 * ZTTeam - Distinctive HTML/CSS Fanpage Avatar & Cover Renderer
 * Mỗi Fanpage sở hữu một phong cách thiết kế ĐỘC BẢN, RIÊNG BIỆT theo đúng ngành nghề:
 *  - Style 1: Music Studio & Creative Arts (Concentric Vinyl, Neon Soundwave, Street-Chic)
 *  - Style 2: Luxury Heritage & Bistro (Ornate Gold Crest, Fine Dining, Symmetrical Elegance)
 *  - Style 3: Architectural Tech & Corporate (Diagonal Split, Blueprint Grid, HUD Data Metrics)
 * Tuyệt đối không dùng màu Hồng/Tím, chất lượng render 4K siêu sắc nét qua Chromium.
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

function getMonogram(name) {
  const clean = name.replace(/\d+/g, '').trim();
  const parts = clean.split(/\s+/).filter(Boolean);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  } else if (parts.length === 1 && parts[0].length >= 2) {
    return parts[0].substring(0, 2).toUpperCase();
  }
  return 'ZT';
}

function getCleanName(name) {
  return name.trim();
}

/* ==========================================================================
   STYLE 1: MUSIC STUDIO & CREATIVE ARTS (Lucas King 4435 - Bass Guitarist)
   Tone: Acid Emerald, Neon Mint, Deep Vinyl Charcoal, Audio Soundwave
   ========================================================================== */

function generateMusicStudioAvatar(page) {
  const mono = getMonogram(page.name);
  const name = getCleanName(page.name);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800;900&family=Plus+Jakarta+Sans:wght@700;800&family=Space+Grotesk:wght@700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 800px; height: 800px;
      background: #060a0f;
      font-family: 'Space Grotesk', 'Montserrat', sans-serif;
      display: flex; align-items: center; justify-content: center;
      position: relative; overflow: hidden;
    }
    
    /* Neon Studio Ambient Glows */
    .glow-bg-1 {
      position: absolute; width: 650px; height: 650px; border-radius: 50%;
      background: radial-gradient(circle, rgba(16,185,129,0.3) 0%, rgba(6,182,212,0.15) 50%, transparent 70%);
      filter: blur(80px);
    }
    
    /* Concentric Vinyl Grooves */
    .vinyl-groove {
      position: absolute; border-radius: 50%;
      border: 1px solid rgba(255,255,255,0.04);
    }
    .vg-1 { width: 720px; height: 720px; border-color: rgba(16,185,129,0.12); }
    .vg-2 { width: 640px; height: 640px; }
    .vg-3 { width: 560px; height: 560px; border-color: rgba(6,182,212,0.15); border-style: dashed; }
    .vg-4 { width: 480px; height: 480px; }
    
    /* Center Disc Container */
    .disc-core {
      position: relative; z-index: 10;
      width: 660px; height: 660px; border-radius: 50%;
      background: linear-gradient(145deg, #0a111a 0%, #03060a 100%);
      border: 3px solid rgba(16,185,129,0.4);
      box-shadow: 0 0 60px rgba(0,0,0,0.9), 0 0 40px rgba(16,185,129,0.25);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 40px; text-align: center;
    }
    
    /* Audio Equalizer Waveform Graphic */
    .eq-wave {
      display: flex; align-items: center; gap: 7px;
      margin-bottom: 24px;
    }
    .eq-bar {
      width: 6px; border-radius: 4px;
      background: linear-gradient(to top, #059669, #34d399);
      box-shadow: 0 0 10px #10b981;
    }
    .b1 { height: 28px; } .b2 { height: 55px; } .b3 { height: 85px; }
    .b4 { height: 110px; } .b5 { height: 70px; } .b6 { height: 40px; }
    .b7 { height: 95px; } .b8 { height: 110px; } .b9 { height: 60px; }
    .b10 { height: 30px; }
    
    .monogram-badge {
      width: 190px; height: 190px; border-radius: 36px;
      background: linear-gradient(135deg, rgba(16,185,129,0.2) 0%, rgba(6,182,212,0.08) 100%);
      border: 2px solid rgba(52,211,153,0.5);
      box-shadow: 0 15px 35px rgba(0,0,0,0.6), inset 0 0 25px rgba(16,185,129,0.3);
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 22px;
      transform: rotate(-3deg);
    }
    .monogram-text {
      font-family: 'Montserrat', sans-serif;
      font-size: 96px; font-weight: 900;
      color: #ffffff;
      background: linear-gradient(135deg, #ffffff 30%, #34d399 70%, #06b6d4 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      transform: rotate(3deg);
    }
    
    .page-title {
      font-family: 'Montserrat', sans-serif;
      font-size: 38px; font-weight: 900;
      letter-spacing: 1px; color: #ffffff;
      text-transform: uppercase; margin-bottom: 12px;
      text-shadow: 0 4px 20px rgba(0,0,0,0.8);
    }
    
    .tag-audio {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 8px 22px; border-radius: 8px;
      background: rgba(16,185,129,0.15);
      border: 1px solid rgba(52,211,153,0.4);
      font-size: 14px; font-weight: 800; letter-spacing: 3px;
      color: #34d399; text-transform: uppercase;
    }
  </style>
</head>
<body>
  <div class="glow-bg-1"></div>
  <div class="vinyl-groove vg-1"></div>
  <div class="vinyl-groove vg-2"></div>
  <div class="vinyl-groove vg-3"></div>
  <div class="vinyl-groove vg-4"></div>
  
  <div class="disc-core">
    <div class="monogram-badge">
      <div class="monogram-text">${mono}</div>
    </div>
    
    <div class="eq-wave">
      <div class="eq-bar b1"></div><div class="eq-bar b2"></div><div class="eq-bar b3"></div>
      <div class="eq-bar b4"></div><div class="eq-bar b5"></div><div class="eq-bar b6"></div>
      <div class="eq-bar b7"></div><div class="eq-bar b8"></div><div class="eq-bar b9"></div>
      <div class="eq-bar b10"></div>
    </div>
    
    <div class="page-title">${name}</div>
    <div class="tag-audio">♫ BASS & STUDIO RECORDINGS</div>
  </div>
</body>
</html>`;
}

function generateMusicStudioCover(page) {
  const mono = getMonogram(page.name);
  const name = getCleanName(page.name);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800;900&family=Space+Grotesk:wght@600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1640px; height: 924px;
      background: #03070c;
      font-family: 'Space Grotesk', sans-serif;
      position: relative; overflow: hidden;
      display: flex; flex-direction: column; justify-content: space-between;
      padding: 60px 90px;
    }
    
    /* Studio Lighting */
    .glow-cyan {
      position: absolute; top: -150px; left: -100px;
      width: 800px; height: 800px; border-radius: 50%;
      background: radial-gradient(circle, rgba(6,182,212,0.3) 0%, transparent 65%);
      filter: blur(100px);
    }
    .glow-emerald {
      position: absolute; bottom: -200px; right: 200px;
      width: 900px; height: 900px; border-radius: 50%;
      background: radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 65%);
      filter: blur(120px);
    }
    
    /* Huge Background Watermark */
    .bg-watermark {
      position: absolute; top: 120px; left: 60px;
      font-family: 'Montserrat', sans-serif;
      font-size: 190px; font-weight: 900;
      color: rgba(255,255,255,0.02);
      letter-spacing: 12px; text-transform: uppercase;
      user-select: none; z-index: 1; line-height: 0.9;
    }
    
    /* Top Bar */
    .top-bar {
      position: relative; z-index: 10;
      display: flex; justify-content: space-between; align-items: center;
    }
    .live-tag {
      display: inline-flex; align-items: center; gap: 12px;
      padding: 10px 24px; border-radius: 9999px;
      background: rgba(16,185,129,0.12);
      border: 1px solid rgba(52,211,153,0.4);
      color: #34d399; font-weight: 700; font-size: 14px; letter-spacing: 3px;
    }
    .live-dot {
      width: 10px; height: 10px; border-radius: 50%;
      background: #10b981; box-shadow: 0 0 12px #34d399;
    }
    .bpm-counter {
      color: rgba(255,255,255,0.4); font-size: 14px; letter-spacing: 3px; font-weight: 700;
    }

    /* Main Center Grid */
    .main-grid {
      position: relative; z-index: 10;
      display: flex; align-items: center; justify-content: space-between;
      gap: 60px;
    }
    
    .left-title-box {
      max-width: 980px;
    }
    .genre-tag {
      font-size: 18px; font-weight: 800; letter-spacing: 4px;
      color: #06b6d4; text-transform: uppercase; margin-bottom: 14px;
    }
    .main-artist-name {
      font-family: 'Montserrat', sans-serif;
      font-size: 86px; font-weight: 900; line-height: 1.05;
      color: #ffffff; text-transform: uppercase;
      letter-spacing: -1px; margin-bottom: 20px;
      background: linear-gradient(135deg, #ffffff 40%, #a7f3d0 75%, #38bdf8 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      text-shadow: 0 8px 30px rgba(0,0,0,0.8);
    }
    .slogan-desc {
      font-size: 24px; font-weight: 500; color: rgba(255,255,255,0.85);
      line-height: 1.5; margin-bottom: 34px; max-width: 820px;
    }
    
    .audio-pills {
      display: flex; gap: 14px;
    }
    .pill {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 12px 26px; border-radius: 12px;
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.12);
      color: #ffffff; font-weight: 700; font-size: 15px;
      box-shadow: 0 6px 20px rgba(0,0,0,0.4);
    }
    .pill .icon { color: #34d399; }
    
    /* Right Turntable / Vinyl Showcase Disc */
    .vinyl-showcase {
      width: 340px; height: 340px; border-radius: 50%;
      background: radial-gradient(circle, #0e1724 0%, #03060a 80%);
      border: 6px solid #111a26;
      box-shadow: 0 20px 60px rgba(0,0,0,0.8), 0 0 50px rgba(6,182,212,0.3);
      display: flex; align-items: center; justify-content: center;
      position: relative;
    }
    .vinyl-showcase::before {
      content: ''; position: absolute; inset: 15px; border-radius: 50%;
      border: 1px dashed rgba(255,255,255,0.15);
    }
    .vinyl-center-label {
      width: 140px; height: 140px; border-radius: 50%;
      background: linear-gradient(135deg, #10b981 0%, #06b6d4 100%);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      box-shadow: 0 0 30px rgba(16,185,129,0.5);
    }
    .vinyl-label-code {
      font-family: 'Montserrat', sans-serif;
      font-size: 48px; font-weight: 900; color: #020b08;
    }
    .vinyl-rpm {
      font-size: 11px; font-weight: 800; color: #020b08; letter-spacing: 2px;
    }
    
    /* Bottom Sound Spectrum Bar */
    .bottom-spectrum {
      position: relative; z-index: 10;
      display: flex; align-items: center; justify-content: space-between;
      border-top: 1px solid rgba(255,255,255,0.08);
      padding-top: 22px;
    }
    .spectrum-left {
      font-size: 14px; font-weight: 700; letter-spacing: 3px; color: #34d399;
      text-transform: uppercase; display: flex; align-items: center; gap: 10px;
    }
    .spectrum-right {
      color: rgba(255,255,255,0.5); font-size: 14px; letter-spacing: 2px; font-weight: 600;
    }
  </style>
</head>
<body>
  <div class="glow-cyan"></div>
  <div class="glow-emerald"></div>
  <div class="bg-watermark">AUDIO • BASS • GROOVE</div>
  
  <div class="top-bar">
    <div class="live-tag">
      <div class="live-dot"></div>
      <span>STUDIO SOUND SESSIONS</span>
    </div>
    <div class="bpm-counter">MASTERED 96kHz / 24-BIT • STEREO</div>
  </div>
  
  <div class="main-grid">
    <div class="left-title-box">
      <div class="genre-tag">✦ BASS GUITARIST & SOUND PRODUCER</div>
      <h1 class="main-artist-name">${name}</h1>
      <p class="slogan-desc">Rhythm, Resonance & Low-End Soul • Studio Sessions, Basslines & Audio Storytelling</p>
      
      <div class="audio-pills">
        <div class="pill"><span class="icon">♫</span> Heavy Grooves</div>
        <div class="pill"><span class="icon">★</span> Session Artist</div>
        <div class="pill"><span class="icon">✓</span> Verified Musician</div>
      </div>
    </div>
    
    <div class="vinyl-showcase">
      <div class="vinyl-center-label">
        <div class="vinyl-label-code">${mono}</div>
        <div class="vinyl-rpm">45 RPM • HQ</div>
      </div>
    </div>
  </div>
  
  <div class="bottom-spectrum">
    <div class="spectrum-left">
      <span>● NOW PLAYING</span>
      <span>•</span>
      <span>OFFICIAL CHANNEL 2026</span>
    </div>
    <div class="spectrum-right">facebook.com/LucasKing4435</div>
  </div>
</body>
</html>`;
}

/* ==========================================================================
   STYLE 2: LUXURY HERITAGE & ARTISAN BISTRO (Lucas Johnson 3953 - Restaurant)
   Tone: Warm Amber, Imperial Gold, Roasted Espresso, Royal Ornate Medallion
   ========================================================================== */

function generateHeritageBistroAvatar(page) {
  const mono = getMonogram(page.name);
  const name = getCleanName(page.name);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Montserrat:wght@700;800&family=Plus+Jakarta+Sans:wght@600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 800px; height: 800px;
      background: #0d0803;
      font-family: 'Cinzel', 'Montserrat', serif;
      display: flex; align-items: center; justify-content: center;
      position: relative; overflow: hidden;
    }
    
    /* Warm Amber Candlelight Glows */
    .glow-amber-center {
      position: absolute; width: 620px; height: 620px; border-radius: 50%;
      background: radial-gradient(circle, rgba(245,158,11,0.35) 0%, rgba(217,119,6,0.15) 55%, transparent 75%);
      filter: blur(75px);
    }
    
    /* Symmetrical Luxury Octagon & Gold Beaded Rings */
    .medallion-frame {
      position: relative; z-index: 10;
      width: 670px; height: 670px; border-radius: 50%;
      background: radial-gradient(circle at 50% 35%, #241608 0%, #130a03 65%, #080401 100%);
      border: 3px solid #d97706;
      box-shadow: 0 0 60px rgba(0,0,0,0.9), inset 0 0 35px rgba(245,158,11,0.25), 0 0 40px rgba(245,158,11,0.3);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 45px; text-align: center;
    }
    
    .gold-inner-bead {
      position: absolute; inset: 14px; border-radius: 50%;
      border: 1px dashed rgba(251,191,36,0.4);
    }
    
    .crest-stars {
      display: flex; align-items: center; gap: 8px;
      margin-bottom: 18px; color: #fbbf24; font-size: 18px;
    }
    
    /* Ornate Octagonal Shield */
    .shield-badge {
      width: 200px; height: 200px; border-radius: 40px;
      background: linear-gradient(135deg, rgba(245,158,11,0.25) 0%, rgba(217,119,6,0.05) 100%);
      border: 2px solid #fbbf24;
      box-shadow: 0 15px 35px rgba(0,0,0,0.7), inset 0 0 30px rgba(245,158,11,0.4);
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 26px; position: relative;
    }
    .shield-badge::after {
      content: ''; position: absolute; inset: 8px; border-radius: 32px;
      border: 1px solid rgba(251,191,36,0.3);
    }
    
    .monogram-text {
      font-size: 102px; font-weight: 900;
      background: linear-gradient(135deg, #ffffff 20%, #fde68a 60%, #f59e0b 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      filter: drop-shadow(0 4px 10px rgba(0,0,0,0.8));
    }
    
    .brand-name {
      font-size: 40px; font-weight: 800;
      color: #ffffff; letter-spacing: 2px;
      text-transform: uppercase; margin-bottom: 12px;
      text-shadow: 0 4px 18px rgba(0,0,0,0.9);
    }
    
    .ribbon-tag {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 8px 26px; border-radius: 9999px;
      background: linear-gradient(90deg, rgba(217,119,6,0.25), rgba(245,158,11,0.35), rgba(217,119,6,0.25));
      border: 1px solid rgba(251,191,36,0.6);
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 15px; font-weight: 800; letter-spacing: 3px;
      color: #fde68a; text-transform: uppercase;
      box-shadow: 0 4px 20px rgba(0,0,0,0.5);
    }
  </style>
</head>
<body>
  <div class="glow-amber-center"></div>
  
  <div class="medallion-frame">
    <div class="gold-inner-bead"></div>
    
    <div class="crest-stars">
      <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
    </div>
    
    <div class="shield-badge">
      <div class="monogram-text">${mono}</div>
    </div>
    
    <div class="brand-name">${name}</div>
    
    <div class="ribbon-tag">
      <span>❖</span>
      <span>FINE DINING & BISTRO</span>
      <span>❖</span>
    </div>
  </div>
</body>
</html>`;
}

function generateHeritageBistroCover(page) {
  const mono = getMonogram(page.name);
  const name = getCleanName(page.name);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Cinzel:wght@700;800;900&family=Montserrat:wght@700;800;900&family=Plus+Jakarta+Sans:wght@500;600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1640px; height: 924px;
      background: radial-gradient(ellipse at 50% 50%, #1f1205 0%, #0c0702 70%, #040200 100%);
      font-family: 'Cinzel', serif;
      position: relative; overflow: hidden;
      display: flex; flex-direction: column; justify-content: space-between;
      padding: 60px 80px;
    }
    
    /* Warm Amber Volumetric Lighting */
    .glow-top {
      position: absolute; top: -120px; left: 50%; transform: translateX(-50%);
      width: 900px; height: 500px; border-radius: 50%;
      background: radial-gradient(circle, rgba(245,158,11,0.25) 0%, transparent 70%);
      filter: blur(100px);
    }
    
    /* Filigree Gold Border Frame */
    .ornate-border-frame {
      position: absolute; inset: 25px;
      border: 1px solid rgba(245,158,11,0.3);
      pointer-events: none; z-index: 5;
    }
    .ornate-border-inner {
      position: absolute; inset: 32px;
      border: 1px dashed rgba(251,191,36,0.18);
      pointer-events: none; z-index: 5;
    }
    .corner-crest {
      position: absolute; width: 20px; height: 20px; border: 2px solid #fbbf24;
    }
    .tl { top: 20px; left: 20px; border-right: none; border-bottom: none; }
    .tr { top: 20px; right: 20px; border-left: none; border-bottom: none; }
    .bl { bottom: 20px; left: 20px; border-right: none; border-top: none; }
    .br { bottom: 20px; right: 20px; border-left: none; border-top: none; }
    
    /* Symmetrical Center Content */
    .hero-center {
      position: relative; z-index: 10;
      text-align: center; margin: auto; max-width: 1200px;
    }
    
    .royal-crown {
      display: inline-flex; align-items: center; gap: 14px;
      font-size: 15px; font-weight: 700; letter-spacing: 5px;
      color: #fbbf24; text-transform: uppercase; margin-bottom: 20px;
    }
    
    .main-title {
      font-family: 'Cinzel', serif;
      font-size: 82px; font-weight: 900; letter-spacing: 4px;
      color: #ffffff; text-transform: uppercase; margin-bottom: 16px;
      background: linear-gradient(135deg, #ffffff 30%, #fef08a 70%, #f59e0b 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      text-shadow: 0 6px 30px rgba(0,0,0,0.9);
    }
    
    .gold-divider-ornament {
      display: flex; align-items: center; justify-content: center; gap: 20px;
      margin: 0 auto 24px; max-width: 600px;
    }
    .divider-line {
      flex: 1; height: 1px;
      background: linear-gradient(90deg, transparent, #d97706, transparent);
    }
    .divider-diamond {
      width: 10px; height: 10px; transform: rotate(45deg);
      background: #fbbf24; box-shadow: 0 0 10px #fbbf24;
    }
    
    .sub-slogan {
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 24px; font-weight: 500; color: rgba(255,255,255,0.85);
      line-height: 1.6; max-width: 900px; margin: 0 auto 38px;
    }
    
    .badges-row-center {
      display: flex; justify-content: center; gap: 20px;
    }
    .artisan-badge {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 12px 28px; border-radius: 9999px;
      background: rgba(36,22,8,0.7);
      backdrop-filter: blur(12px);
      border: 1px solid rgba(251,191,36,0.35);
      font-family: 'Plus Jakarta Sans', sans-serif;
      font-size: 15px; font-weight: 700; color: #fde68a;
      box-shadow: 0 6px 20px rgba(0,0,0,0.5);
    }
    
    /* Footer */
    .bistro-footer {
      position: relative; z-index: 10;
      display: flex; justify-content: space-between; align-items: center;
      border-top: 1px solid rgba(245,158,11,0.2); padding-top: 20px;
      font-family: 'Plus Jakarta Sans', sans-serif; font-size: 14px;
      color: rgba(255,255,255,0.6); letter-spacing: 2px; text-transform: uppercase;
    }
  </style>
</head>
<body>
  <div class="glow-top"></div>
  <div class="ornate-border-frame"></div>
  <div class="ornate-border-inner"></div>
  <div class="corner-crest tl"></div><div class="corner-crest tr"></div>
  <div class="corner-crest bl"></div><div class="corner-crest br"></div>
  
  <div style="height: 20px;"></div>
  
  <div class="hero-center">
    <div class="royal-crown">
      <span>✦</span>
      <span>TUNISIAN & MEDITERRANEAN CULINARY HERITAGE</span>
      <span>✦</span>
    </div>
    
    <h1 class="main-title">${name}</h1>
    
    <div class="gold-divider-ornament">
      <div class="divider-line"></div>
      <div class="divider-diamond"></div>
      <div class="divider-line"></div>
    </div>
    
    <p class="sub-slogan">Authentic Spices, Coastal Recipes & Time-Honored Culinary Artistry • Fresh Daily Specialties & Warm Hospitality</p>
    
    <div class="badges-row-center">
      <div class="artisan-badge"><span>❖</span> Traditional Recipes</div>
      <div class="artisan-badge"><span>★</span> Artisan Crafted</div>
      <div class="artisan-badge"><span>✓</span> Verified Cuisine</div>
    </div>
  </div>
  
  <div class="bistro-footer">
    <div>ESTABLISHED 2026 • RESERVATIONS & STORIES</div>
    <div>facebook.com/LucasJohnson3953</div>
  </div>
</body>
</html>`;
}

/* ==========================================================================
   STYLE 3: ARCHITECTURAL TECH & CORPORATE (Henry Martin 5750 - Property)
   Tone: High-Tech Cobalt Blue, Steel Cyan, Blueprint Grid, Isometric Modern
   ========================================================================== */

function generateArchitecturalCorporateAvatar(page) {
  const mono = getMonogram(page.name);
  const name = getCleanName(page.name);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800;900&family=Plus+Jakarta+Sans:wght@700;800&family=JetBrains+Mono:wght@700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 800px; height: 800px;
      background: #020712;
      font-family: 'Plus Jakarta Sans', sans-serif;
      display: flex; align-items: center; justify-content: center;
      position: relative; overflow: hidden;
    }
    
    /* Architectural Blueprint Grid Background */
    .grid-bg {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(to right, rgba(37,99,235,0.12) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(37,99,235,0.12) 1px, transparent 1px);
      background-size: 40px 40px;
    }
    .glow-cobalt {
      position: absolute; width: 620px; height: 620px; border-radius: 50%;
      background: radial-gradient(circle, rgba(37,99,235,0.4) 0%, rgba(6,182,212,0.15) 60%, transparent 80%);
      filter: blur(85px);
    }
    
    /* Technical Hexagonal / Shield Frame */
    .hud-frame {
      position: relative; z-index: 10;
      width: 660px; height: 660px; border-radius: 50%;
      background: linear-gradient(145deg, rgba(11,25,48,0.85) 0%, rgba(3,10,22,0.95) 100%);
      backdrop-filter: blur(20px);
      border: 3px solid rgba(59,130,246,0.6);
      box-shadow: 0 0 60px rgba(0,0,0,0.9), 0 0 45px rgba(37,99,235,0.35);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 40px; text-align: center;
    }
    
    /* Coordinate Crosshairs */
    .crosshair {
      position: absolute; font-family: 'JetBrains Mono', monospace;
      font-size: 11px; font-weight: 700; color: rgba(96,165,250,0.6);
      letter-spacing: 2px;
    }
    .c-top { top: 40px; }
    
    /* Isometric Monogram Box */
    .iso-cube-badge {
      width: 210px; height: 210px; border-radius: 32px;
      background: linear-gradient(135deg, rgba(37,99,235,0.3) 0%, rgba(14,165,233,0.1) 100%);
      border: 2px solid #60a5fa;
      box-shadow: 0 20px 40px rgba(0,0,0,0.7), inset 0 0 30px rgba(37,99,235,0.4);
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 24px; position: relative;
    }
    .iso-cube-badge::after {
      content: ''; position: absolute; inset: 10px; border-radius: 24px;
      border: 1px dashed rgba(147,197,253,0.35);
    }
    
    .monogram-text {
      font-family: 'Montserrat', sans-serif;
      font-size: 105px; font-weight: 900;
      background: linear-gradient(135deg, #ffffff 30%, #93c5fd 75%, #38bdf8 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      letter-spacing: -2px;
    }
    
    .brand-title {
      font-family: 'Montserrat', sans-serif;
      font-size: 40px; font-weight: 900;
      color: #ffffff; letter-spacing: 1px;
      text-transform: uppercase; margin-bottom: 12px;
      text-shadow: 0 4px 18px rgba(0,0,0,0.8);
    }
    
    .hud-tag {
      display: inline-flex; align-items: center; gap: 8px;
      padding: 8px 24px; border-radius: 6px;
      background: rgba(37,99,235,0.2);
      border: 1px solid rgba(96,165,250,0.5);
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px; font-weight: 700; letter-spacing: 2px;
      color: #60a5fa; text-transform: uppercase;
    }
  </style>
</head>
<body>
  <div class="grid-bg"></div>
  <div class="glow-cobalt"></div>
  
  <div class="hud-frame">
    <div class="crosshair c-top">[ SYS.REF // PRIME ASSETS ]</div>
    
    <div class="iso-cube-badge">
      <div class="monogram-text">${mono}</div>
    </div>
    
    <div class="brand-title">${name}</div>
    
    <div class="hud-tag">
      <span>■</span>
      <span>COMMERCIAL REAL ESTATE</span>
    </div>
  </div>
</body>
</html>`;
}

function generateArchitecturalCorporateCover(page) {
  const mono = getMonogram(page.name);
  const name = getCleanName(page.name);

  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@800;900&family=Plus+Jakarta+Sans:wght@500;600;700;800&family=JetBrains+Mono:wght@600;700&display=swap');
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      width: 1640px; height: 924px;
      background: #020713;
      font-family: 'Plus Jakarta Sans', sans-serif;
      position: relative; overflow: hidden;
      display: flex; flex-direction: column; justify-content: space-between;
      padding: 65px 95px;
    }
    
    /* Technical Blueprint Grid */
    .blueprint-grid {
      position: absolute; inset: 0;
      background-image:
        linear-gradient(to right, rgba(37,99,235,0.08) 1px, transparent 1px),
        linear-gradient(to bottom, rgba(37,99,235,0.08) 1px, transparent 1px);
      background-size: 60px 60px;
    }
    
    /* Diagonal 60-degree Structural Split */
    .diagonal-architect-cut {
      position: absolute; right: -120px; top: -150px;
      width: 750px; height: 1200px;
      background: linear-gradient(135deg, rgba(37,99,235,0.2) 0%, rgba(2,6,23,0.95) 70%);
      transform: rotate(20deg);
      border-left: 2px solid rgba(96,165,250,0.3);
      box-shadow: -20px 0 60px rgba(0,0,0,0.8);
      z-index: 2;
    }
    
    .glow-spot-blue {
      position: absolute; top: -100px; left: 100px;
      width: 800px; height: 800px; border-radius: 50%;
      background: radial-gradient(circle, rgba(37,99,235,0.3) 0%, transparent 65%);
      filter: blur(120px);
    }
    
    /* Header Top Bar */
    .tech-header {
      position: relative; z-index: 10;
      display: flex; justify-content: space-between; align-items: center;
    }
    .hud-tag-pill {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 8px 20px; border-radius: 4px;
      background: rgba(37,99,235,0.2);
      border: 1px solid rgba(96,165,250,0.4);
      font-family: 'JetBrains Mono', monospace; font-size: 13px;
      font-weight: 700; color: #60a5fa; letter-spacing: 2px;
    }
    .hud-right-specs {
      font-family: 'JetBrains Mono', monospace;
      font-size: 13px; color: rgba(255,255,255,0.45); letter-spacing: 2px;
    }
    
    /* Center Split Hero */
    .hero-body {
      position: relative; z-index: 10;
      display: flex; align-items: center; justify-content: space-between;
      gap: 70px;
    }
    
    .left-intel {
      max-width: 950px;
    }
    .sector-badge {
      font-family: 'JetBrains Mono', monospace;
      font-size: 16px; font-weight: 700; letter-spacing: 3px;
      color: #38bdf8; text-transform: uppercase; margin-bottom: 14px;
    }
    .corporate-title {
      font-family: 'Montserrat', sans-serif;
      font-size: 84px; font-weight: 900; line-height: 1.05;
      color: #ffffff; text-transform: uppercase;
      letter-spacing: -1.5px; margin-bottom: 22px;
      background: linear-gradient(135deg, #ffffff 40%, #bfdbfe 70%, #60a5fa 100%);
      -webkit-background-clip: text; -webkit-text-fill-color: transparent;
      text-shadow: 0 8px 30px rgba(0,0,0,0.9);
    }
    .corp-slogan {
      font-size: 24px; font-weight: 500; color: rgba(255,255,255,0.85);
      line-height: 1.5; margin-bottom: 34px; max-width: 820px;
    }
    
    /* Metrics Row */
    .metrics-row {
      display: flex; gap: 16px;
    }
    .metric-chip {
      display: inline-flex; align-items: center; gap: 10px;
      padding: 12px 24px; border-radius: 8px;
      background: rgba(15,23,42,0.8);
      border: 1px solid rgba(59,130,246,0.35);
      font-size: 15px; font-weight: 700; color: #ffffff;
      box-shadow: 0 6px 20px rgba(0,0,0,0.5);
    }
    .metric-chip .m-icon { color: #60a5fa; font-family: 'JetBrains Mono', monospace; }
    
    /* Right Architectural Card */
    .architect-card {
      width: 320px; height: 380px; border-radius: 20px;
      background: rgba(11,25,48,0.75);
      backdrop-filter: blur(20px);
      border: 2px solid rgba(96,165,250,0.5);
      box-shadow: 0 25px 60px rgba(0,0,0,0.8), 0 0 50px rgba(37,99,235,0.3);
      display: flex; flex-direction: column; align-items: center; justify-content: center;
      padding: 30px; text-align: center; position: relative;
    }
    .card-crest-box {
      width: 140px; height: 140px; border-radius: 24px;
      background: linear-gradient(135deg, rgba(37,99,235,0.4) 0%, rgba(56,189,248,0.15) 100%);
      border: 2px solid #60a5fa;
      display: flex; align-items: center; justify-content: center;
      margin-bottom: 22px; box-shadow: 0 10px 25px rgba(0,0,0,0.5);
    }
    .card-mono {
      font-family: 'Montserrat', sans-serif;
      font-size: 72px; font-weight: 900; color: #ffffff;
    }
    .card-corp-name {
      font-family: 'Montserrat', sans-serif;
      font-size: 20px; font-weight: 800; color: #ffffff;
      letter-spacing: 2px; text-transform: uppercase; margin-bottom: 6px;
    }
    .card-hud-code {
      font-family: 'JetBrains Mono', monospace;
      font-size: 12px; font-weight: 700; color: #60a5fa; letter-spacing: 2px;
    }
    
    /* Footer */
    .tech-footer {
      position: relative; z-index: 10;
      display: flex; justify-content: space-between; align-items: center;
      border-top: 1px solid rgba(255,255,255,0.1); padding-top: 22px;
      font-family: 'JetBrains Mono', monospace; font-size: 13px;
      color: rgba(255,255,255,0.5); letter-spacing: 2px;
    }
  </style>
</head>
<body>
  <div class="blueprint-grid"></div>
  <div class="glow-spot-blue"></div>
  <div class="diagonal-architect-cut"></div>
  
  <div class="tech-header">
    <div class="hud-tag-pill">
      <span>//</span>
      <span>COMMERCIAL REAL ESTATE & ASSETS</span>
    </div>
    <div class="hud-right-specs">PORTFOLIO ADVISORY • 2026</div>
  </div>
  
  <div class="hero-body">
    <div class="left-intel">
      <div class="sector-badge">► METROPOLITAN ASSET ADVISOR</div>
      <h1 class="corporate-title">${name}</h1>
      <p class="corp-slogan">Strategic Commercial Properties, Investment Advisory & Prime Real Estate Portfolio Management</p>
      
      <div class="metrics-row">
        <div class="metric-chip"><span class="m-icon">[🏢]</span> Prime Assets</div>
        <div class="metric-chip"><span class="m-icon">[📈]</span> High ROI Focus</div>
        <div class="metric-chip"><span class="m-icon">[✓]</span> Verified Advisory</div>
      </div>
    </div>
    
    <div class="architect-card">
      <div class="card-crest-box">
        <div class="card-mono">${mono}</div>
      </div>
      <div class="card-corp-name">${name}</div>
      <div class="card-hud-code">[ ADVISORY ID: 5750 ]</div>
    </div>
  </div>
  
  <div class="tech-footer">
    <div>EXECUTIVE REAL ESTATE ADVISORY • CAPITAL MARKETS</div>
    <div>facebook.com/HenryMartin5750</div>
  </div>
</body>
</html>`;
}

async function main() {
  console.log('=== RENDER BỘ NHẬN DIỆN KHÁC BIỆT ĐỘC BẢN CHO 3 FANPAGE ===');

  const pages = [
    {
      id: '02cc71fe-cbb5-425f-ae91-995d2b00b0dd',
      name: 'Lucas King 4435',
      category: 'Bass guitarist',
      styleName: 'Style 1: Studio Sound & Bass Waveform',
      generateAvatar: generateMusicStudioAvatar,
      generateCover: generateMusicStudioCover,
    },
    {
      id: '069a559a-c413-48ba-bf97-1ef7e4a98057',
      name: 'Lucas Johnson 3953',
      category: 'Tunisian restaurant',
      styleName: 'Style 2: Luxury Heritage Bistro & Gold Filigree',
      generateAvatar: generateHeritageBistroAvatar,
      generateCover: generateHeritageBistroCover,
    },
    {
      id: '0989c0f5-fba5-467b-92ae-4ea54f25544a',
      name: 'Henry Martin 5750',
      category: 'Commercial property agent',
      styleName: 'Style 3: Techno-Architectural & Corporate Metropolis',
      generateAvatar: generateArchitecturalCorporateAvatar,
      generateCover: generateArchitecturalCorporateCover,
    }
  ];

  const storageDir = path.resolve(process.cwd(), 'storage/branding');
  if (!fs.existsSync(storageDir)) {
    fs.mkdirSync(storageDir, { recursive: true });
  }

  console.log('\nĐang khởi chạy Puppeteer (Chromium)...');
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
    console.log(`\n------------------------------------------------------------`);
    console.log(`[${i + 1}/3] Đang render phong cách độc bản cho "${p.name}"`);
    console.log(`  -> Phong cách: ${p.styleName}`);

    const avatarHtml = p.generateAvatar(p);
    const coverHtml = p.generateCover(p);

    const avatarFilename = `page_${p.id}_avatar.png`;
    const coverFilename = `page_${p.id}_cover.png`;

    const avatarLocalPath = path.join(storageDir, avatarFilename);
    const coverLocalPath = path.join(storageDir, coverFilename);

    // 1. Render Avatar (800 x 800)
    console.log(`  -> Render Avatar (800x800)...`);
    const tab1 = await browser.newPage();
    await tab1.setViewport({ width: 800, height: 800, deviceScaleFactor: 1 });
    await tab1.setContent(avatarHtml, { waitUntil: 'networkidle0', timeout: 30000 });
    await tab1.evaluateHandle('document.fonts.ready');
    await new Promise(r => setTimeout(r, 400));
    await tab1.screenshot({ path: avatarLocalPath, type: 'png' });
    await tab1.close();
    console.log(`     ✓ Xong Avatar`);

    // 2. Render Cover (1640 x 924)
    console.log(`  -> Render Cover (1640x924)...`);
    const tab2 = await browser.newPage();
    await tab2.setViewport({ width: 1640, height: 924, deviceScaleFactor: 1 });
    await tab2.setContent(coverHtml, { waitUntil: 'networkidle0', timeout: 30000 });
    await tab2.evaluateHandle('document.fonts.ready');
    await new Promise(r => setTimeout(r, 400));
    await tab2.screenshot({ path: coverLocalPath, type: 'png' });
    await tab2.close();
    console.log(`     ✓ Xong Cover Photo`);

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
      category: p.category,
      style: p.styleName,
      avatarUrl: `https://t9.goxo.us${avatarUrl}`,
      coverUrl: `https://t9.goxo.us${coverUrl}`,
    });
  }

  await browser.close();
  await prisma.$disconnect();
  await pool.end();

  console.log(`\n============================================================`);
  console.log(`🎉 ĐÃ RENDER THÀNH CÔNG 3 PHONG CÁCH HOÀN TOÀN KHÁC BIỆT!`);
  console.log(`============================================================\n`);
  results.forEach((r, idx) => {
    console.log(`[${idx + 1}] ${r.name} - ${r.style}`);
    console.log(`  - Avatar: ${r.avatarUrl}`);
    console.log(`  - Cover:  ${r.coverUrl}\n`);
  });
}

main().catch(err => {
  console.error('❌ LỖI:', err);
  process.exit(1);
});
