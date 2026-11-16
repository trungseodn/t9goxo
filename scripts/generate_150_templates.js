const fs = require('fs');
const path = require('path');

// 150 Mẫu được thiết kế tỉ mỉ chia thành 8 nhóm chủ đề
// TUYỆT ĐỐI KHÔNG DÙNG MÀU HỒNG VÀ TÍM
const templates = [];

// =========================================================================
// NHÓM 1: OCEAN, CYAN & ARCTIC DEEP (MẪU 51 - 70: 20 MẪU)
// =========================================================================
const oceanDefs = [
  { id: 'mariana_trench', name: 'Mariana Trench (Vực Sâu Mariana)', hl: '#38bdf8', hook: '#7dd3fc', cta: '#0284c7', bg: '#021024', card: 'rgba(2, 20, 48, 0.82)', border: 'rgba(56, 189, 248, 0.35)', shadow: 'rgba(2, 132, 199, 0.25)', author: 'Ocean Mysteries', sub: '1hr ago · 🌊 Deep Sea' },
  { id: 'cyan_laser_grid', name: 'Cyan Laser Grid (Lưới Điện Quang)', hl: '#22d3ee', hook: '#67e8f9', cta: '#06b6d4', bg: '#031e2b', card: 'rgba(3, 34, 48, 0.80)', border: 'rgba(34, 211, 238, 0.45)', shadow: 'rgba(6, 182, 212, 0.30)', author: 'Cyber Grid', sub: '2hrs ago · ⚡ Viral Pulse' },
  { id: 'nordic_fjord_blue', name: 'Nordic Fjord Blue (Vịnh Bắc Âu Băng Giá)', hl: '#93c5fd', hook: '#bfdbfe', cta: '#3b82f6', bg: '#0a192f', card: 'rgba(13, 31, 58, 0.78)', border: 'rgba(147, 197, 253, 0.35)', shadow: 'rgba(59, 130, 246, 0.22)', author: 'Nordic Tales', sub: '4hrs ago · ❄️ Nordic Story' },
  { id: 'deep_sea_kraken', name: 'Deep Sea Kraken (Thủy Quái Biển Sâu)', hl: '#38bdf8', hook: '#facc15', cta: '#0ea5e9', bg: '#010f1c', card: 'rgba(2, 22, 41, 0.84)', border: 'rgba(14, 165, 233, 0.40)', shadow: 'rgba(2, 132, 199, 0.28)', author: 'Abyss Chronicles', sub: '30m ago · 🐙 Kraken Files' },
  { id: 'bermuda_abyss', name: 'Bermuda Abyss (Vực Thẳm Bermuda)', hl: '#67e8f9', hook: '#38bdf8', cta: '#0891b2', bg: '#031926', card: 'rgba(3, 29, 44, 0.80)', border: 'rgba(103, 232, 249, 0.35)', shadow: 'rgba(6, 182, 212, 0.25)', author: 'Bermuda Vault', sub: '3hrs ago · ⚠️ Unsolved' },
  { id: 'glacial_frostbite', name: 'Glacial Frostbite (Băng Giá Bắc Cực)', hl: '#e0f2fe', hook: '#7dd3fc', cta: '#38bdf8', bg: '#071e33', card: 'rgba(8, 36, 61, 0.76)', border: 'rgba(224, 242, 254, 0.40)', shadow: 'rgba(56, 189, 248, 0.28)', author: 'Frost Bite Daily', sub: '5hrs ago · 🧊 Sub-Zero' },
  { id: 'poseidon_trident', name: 'Poseidon Trident (Đinh Ba Hải Vương)', hl: '#38bdf8', hook: '#fbbf24', cta: '#0284c7', bg: '#02182b', card: 'rgba(4, 28, 51, 0.82)', border: 'rgba(56, 189, 248, 0.40)', shadow: 'rgba(2, 132, 199, 0.30)', author: 'Poseidon Realm', sub: 'Just now · 🔱 Mythic' },
  { id: 'aquamarine_crystal', name: 'Aquamarine Crystal (Pha Lê Ngọc Lam)', hl: '#2dd4bf', hook: '#5eead4', cta: '#14b8a6', bg: '#022126', card: 'rgba(3, 37, 43, 0.78)', border: 'rgba(45, 212, 191, 0.42)', shadow: 'rgba(20, 184, 166, 0.25)', author: 'Crystal Vault', sub: '2hrs ago · 💎 Crystal Clear' },
  { id: 'bioluminescent_tide', name: 'Bioluminescent Tide (Thủy Triều Phát Quang)', hl: '#22d3ee', hook: '#67e8f9', cta: '#06b6d4', bg: '#01192b', card: 'rgba(2, 31, 53, 0.80)', border: 'rgba(34, 211, 238, 0.48)', shadow: 'rgba(34, 211, 238, 0.32)', author: 'Bio Marine', sub: '45m ago · ✨ Glowing Waters' },
  { id: 'atlantic_storm_wave', name: 'Atlantic Storm Wave (Sóng Thần Đại Tây Dương)', hl: '#60a5fa', hook: '#93c5fd', cta: '#2563eb', bg: '#081a30', card: 'rgba(10, 31, 59, 0.82)', border: 'rgba(96, 165, 250, 0.38)', shadow: 'rgba(37, 99, 235, 0.26)', author: 'Storm Watchers', sub: '6hrs ago · 🌊 Heavy Storm' },
  { id: 'submarine_stealth', name: 'Submarine Stealth (Tàu Ngầm Tàng Hình)', hl: '#38bdf8', hook: '#94a3b8', cta: '#0ea5e9', bg: '#031321', card: 'rgba(4, 22, 38, 0.85)', border: 'rgba(56, 189, 248, 0.30)', shadow: 'rgba(2, 132, 199, 0.22)', author: 'Silent Depths', sub: '1hr ago · 🤫 Secret Mission' },
  { id: 'frost_aurora_night', name: 'Frost Aurora Night (Đêm Bắc Cực Quang Lam)', hl: '#38bdf8', hook: '#22d3ee', cta: '#0284c7', bg: '#04172e', card: 'rgba(6, 27, 54, 0.78)', border: 'rgba(56, 189, 248, 0.42)', shadow: 'rgba(34, 211, 238, 0.28)', author: 'Aurora Borealis', sub: '3hrs ago · 🌌 Northern Sky' },
  { id: 'aegean_sunken_city', name: 'Aegean Sunken City (Cổ Thành Chìm Aegean)', hl: '#2dd4bf', hook: '#fef08a', cta: '#0d9488', bg: '#032029', card: 'rgba(4, 36, 46, 0.80)', border: 'rgba(45, 212, 191, 0.36)', shadow: 'rgba(13, 148, 136, 0.24)', author: 'Lost Atlantis', sub: '4hrs ago · 🏛️ Ancient Ruins' },
  { id: 'polar_glacier_peak', name: 'Polar Glacier Peak (Đỉnh Băng Cực Điểm)', hl: '#bae6fd', hook: '#f8fafc', cta: '#38bdf8', bg: '#071f36', card: 'rgba(9, 36, 64, 0.75)', border: 'rgba(186, 230, 253, 0.40)', shadow: 'rgba(56, 189, 248, 0.26)', author: 'Polar Expedition', sub: '2hrs ago · 🏔️ Glacier Peak' },
  { id: 'blue_neon_pulse', name: 'Blue Neon Pulse (Nhịp Đập Lam Neon)', hl: '#38bdf8', hook: '#60a5fa', cta: '#0284c7', bg: '#03162c', card: 'rgba(4, 25, 51, 0.82)', border: 'rgba(56, 189, 248, 0.50)', shadow: 'rgba(56, 189, 248, 0.35)', author: 'Neon Pulse', sub: 'Just now · ⚡ Live Pulse' },
  { id: 'ice_cave_cathedral', name: 'Ice Cave Cathedral (Thánh Đường Hang Băng)', hl: '#7dd3fc', hook: '#e0f2fe', cta: '#0284c7', bg: '#05192e', card: 'rgba(7, 29, 54, 0.78)', border: 'rgba(125, 211, 252, 0.38)', shadow: 'rgba(2, 132, 199, 0.25)', author: 'Ice Caverns', sub: '5hrs ago · ❄️ Hidden Cave' },
  { id: 'coral_deep_trench', name: 'Coral Deep Trench (Rạn San Hô Đáy Biển)', hl: '#2dd4bf', hook: '#38bdf8', cta: '#14b8a6', bg: '#021d26', card: 'rgba(3, 33, 43, 0.80)', border: 'rgba(45, 212, 191, 0.38)', shadow: 'rgba(20, 184, 166, 0.25)', author: 'Reef Explorers', sub: '3hrs ago · 🐠 Deep Reef' },
  { id: 'cyber_oceanic_core', name: 'Cyber Oceanic Core (Lõi Đại Dương Không Gian)', hl: '#22d3ee', hook: '#38bdf8', cta: '#06b6d4', bg: '#021727', card: 'rgba(3, 27, 46, 0.82)', border: 'rgba(34, 211, 238, 0.45)', shadow: 'rgba(6, 182, 212, 0.30)', author: 'Oceanic AI', sub: '1hr ago · 🤖 Quantum Core' },
  { id: 'frozen_horizon', name: 'Frozen Horizon (Đường Chân Trời Đóng Băng)', hl: '#93c5fd', hook: '#e2e8f0', cta: '#3b82f6', bg: '#091c33', card: 'rgba(12, 34, 61, 0.78)', border: 'rgba(147, 197, 253, 0.35)', shadow: 'rgba(59, 130, 246, 0.24)', author: 'Frozen Edge', sub: '4hrs ago · 🌅 Ice Horizon' },
  { id: 'midnight_aqua_flow', name: 'Midnight Aqua Flow (Dòng Chảy Lam Thủy)', hl: '#38bdf8', hook: '#2dd4bf', cta: '#0284c7', bg: '#031a2c', card: 'rgba(5, 30, 51, 0.80)', border: 'rgba(56, 189, 248, 0.40)', shadow: 'rgba(2, 132, 199, 0.28)', author: 'Midnight Current', sub: '2hrs ago · 💧 Fluid Motion' },
];

oceanDefs.forEach((d, idx) => {
  const num = 51 + idx;
  templates.push({
    num,
    name: `Text Story #${String(num).padStart(2, '0')} - ${d.name}`,
    category: 'ocean',
    presetId: `story_${num}_${d.id}`,
    themeStyle: d.id,
    authorName: d.author,
    authorSubtitle: d.sub,
    hasVerified: idx % 2 === 0,
    hasFollowBtn: idx % 3 === 0,
    isCensoredName: idx % 4 === 0,
    bgGradient: `radial-gradient(ellipse at 80% 20%, ${d.bg} 0%, #020b14 50%, #000408 100%)`,
    aura1: d.border,
    aura2: d.shadow,
    aura3: 'rgba(2, 6, 23, 0.7)',
    cardBg: d.card,
    cardBorder: `1.5px solid ${d.border}`,
    cardShadow: `0 25px 60px rgba(0, 0, 0, 0.92), 0 0 35px ${d.shadow}`,
    textColor: '#f1f5f9',
    hookColor: d.hook,
    hlColor: d.hl,
    ctaText: idx % 2 === 0 ? 'Continue Reading...' : 'Part 2 in Comment 👇',
    ctaColor: d.cta,
    hasBottomPill: idx % 2 === 1,
    bottomPillText: idx % 2 === 1 ? 'Full Story In Comment 👇' : '',
  });
});

// =========================================================================
// NHÓM 2: EMERALD, MOSS & DEEP FOREST (MẪU 71 - 90: 20 MẪU)
// =========================================================================
const emeraldDefs = [
  { id: 'amazon_canopy', name: 'Amazon Rainforest Canopy (Tán Rừng Amazon)', hl: '#34d399', hook: '#a7f3d0', cta: '#059669', bg: '#042417', card: 'rgba(4, 38, 24, 0.80)', border: 'rgba(52, 211, 153, 0.38)', shadow: 'rgba(16, 185, 129, 0.25)', author: 'Wild Amazon', sub: '2hrs ago · 🌿 Jungle Files' },
  { id: 'imperial_jade_stone', name: 'Imperial Jade Stone (Bảo Ngọc Hoàng Triều)', hl: '#10b981', hook: '#fde047', cta: '#047857', bg: '#032014', card: 'rgba(3, 34, 21, 0.82)', border: 'rgba(16, 185, 129, 0.42)', shadow: 'rgba(16, 185, 129, 0.28)', author: 'Dynasty Jewels', sub: '1hr ago · 👑 Royal Jade' },
  { id: 'ancient_moss_ruins', name: 'Ancient Moss Ruins (Tàn Tích Rêu Phong)', hl: '#4ade80', hook: '#86efac', cta: '#16a34a', bg: '#072412', card: 'rgba(8, 38, 19, 0.78)', border: 'rgba(74, 222, 128, 0.35)', shadow: 'rgba(34, 197, 94, 0.22)', author: 'Forgotten Ruins', sub: '4hrs ago · 🏛️ Lost Relics' },
  { id: 'sherwood_outlaw', name: 'Sherwood Outlaw (Rừng Rậm Sherwood)', hl: '#84cc16', hook: '#bef264', cta: '#65a30d', bg: '#0c2108', card: 'rgba(15, 38, 10, 0.80)', border: 'rgba(132, 204, 22, 0.38)', shadow: 'rgba(101, 163, 13, 0.25)', author: 'Sherwood Tales', sub: '3hrs ago · 🏹 Outlaw Diary' },
  { id: 'emerald_serpent', name: 'Emerald Serpent (Bạch Xà & Ngọc Xà)', hl: '#34d399', hook: '#6ee7b7', cta: '#059669', bg: '#032115', card: 'rgba(4, 36, 23, 0.82)', border: 'rgba(52, 211, 153, 0.42)', shadow: 'rgba(16, 185, 129, 0.30)', author: 'Serpent Vault', sub: '50m ago · 🐍 Mystery Lair' },
  { id: 'celtic_druid_grove', name: 'Celtic Druid Grove (Rừng Pháp Sư Druid)', hl: '#4ade80', hook: '#fef08a', cta: '#15803d', bg: '#062312', card: 'rgba(8, 38, 20, 0.80)', border: 'rgba(74, 222, 128, 0.36)', shadow: 'rgba(22, 163, 74, 0.24)', author: 'Druid Grove', sub: '5hrs ago · 🧙 Sacred Trees' },
  { id: 'mint_crystal_clean', name: 'Mint Crystal Clean (Pha Lê Bạc Hà)', hl: '#5eead4', hook: '#99f6e4', cta: '#0d9488', bg: '#022320', card: 'rgba(3, 38, 35, 0.76)', border: 'rgba(94, 234, 212, 0.40)', shadow: 'rgba(20, 184, 166, 0.26)', author: 'Minty Stories', sub: '30m ago · 🍃 Refreshing' },
  { id: 'deep_pine_mist', name: 'Deep Pine Mist (Sương Khói Thông Đỏ)', hl: '#34d399', hook: '#cbd5e1', cta: '#059669', bg: '#052219', card: 'rgba(7, 36, 27, 0.82)', border: 'rgba(52, 211, 153, 0.35)', shadow: 'rgba(16, 185, 129, 0.22)', author: 'Pine Whisper', sub: '2hrs ago · 🌲 Deep Woods' },
  { id: 'toxic_cyber_green', name: 'Toxic Cyber Green (Xanh Độc Dược Điện Toán)', hl: '#22c55e', hook: '#86efac', cta: '#16a34a', bg: '#05230e', card: 'rgba(7, 38, 16, 0.82)', border: 'rgba(34, 197, 94, 0.48)', shadow: 'rgba(34, 197, 94, 0.32)', author: 'Cyber Toxic', sub: 'Just now · ☣️ Bio Grid' },
  { id: 'bamboo_mist_sanctuary', name: 'Bamboo Mist Sanctuary (Trúc Lâm Thâm U)', hl: '#84cc16', hook: '#d9f99d', cta: '#4d7c0f', bg: '#08210b', card: 'rgba(11, 36, 15, 0.78)', border: 'rgba(132, 204, 22, 0.36)', shadow: 'rgba(101, 163, 13, 0.22)', author: 'Zen Bamboo', sub: '6hrs ago · 🎋 Zen Haven' },
  { id: 'basilisk_lair', name: 'Basilisk Lair (Hang Ổ Mãng Xà)', hl: '#10b981', hook: '#facc15', cta: '#047857', bg: '#021e13', card: 'rgba(3, 32, 20, 0.84)', border: 'rgba(16, 185, 129, 0.40)', shadow: 'rgba(5, 150, 105, 0.28)', author: 'Dark Basilisk', sub: '1hr ago · 🦎 Danger Zone' },
  { id: 'enchanted_forest_glow', name: 'Enchanted Forest Glow (Rừng Thần Bí)', hl: '#4ade80', hook: '#6ee7b7', cta: '#16a34a', bg: '#042514', card: 'rgba(6, 40, 22, 0.78)', border: 'rgba(74, 222, 128, 0.42)', shadow: 'rgba(34, 197, 94, 0.28)', author: 'Enchanted Realm', sub: '4hrs ago · ✨ Fairy Woods' },
  { id: 'nordic_evergreen', name: 'Nordic Evergreen (Cây Khảm Xanh Vĩnh Cửu)', hl: '#34d399', hook: '#f1f5f9', cta: '#059669', bg: '#062218', card: 'rgba(9, 36, 26, 0.80)', border: 'rgba(52, 211, 153, 0.36)', shadow: 'rgba(16, 185, 129, 0.24)', author: 'Evergreen Post', sub: '3hrs ago · 🌲 Northern Pines' },
  { id: 'malachite_vein', name: 'Malachite Vein (Mạch Đá Khổng Tước)', hl: '#10b981', hook: '#34d399', cta: '#047857', bg: '#032416', card: 'rgba(4, 38, 23, 0.82)', border: 'rgba(16, 185, 129, 0.45)', shadow: 'rgba(16, 185, 129, 0.30)', author: 'Malachite Vault', sub: '2hrs ago · 💎 Vein Pattern' },
  { id: 'willow_tree_stream', name: 'Willow Tree Stream (Suối Râm Cây Liễu)', hl: '#6ee7b7', hook: '#a7f3d0', cta: '#0d9488', bg: '#04221b', card: 'rgba(6, 36, 29, 0.78)', border: 'rgba(110, 231, 183, 0.38)', shadow: 'rgba(20, 184, 166, 0.24)', author: 'Willow Stream', sub: '5hrs ago · 🍃 Peaceful Waters' },
  { id: 'jungle_predator', name: 'Jungle Predator (Kẻ Săn Mồi Rừng Sâu)', hl: '#84cc16', hook: '#facc15', cta: '#65a30d', bg: '#0a2007', card: 'rgba(13, 36, 9, 0.84)', border: 'rgba(132, 204, 22, 0.40)', shadow: 'rgba(101, 163, 13, 0.26)', author: 'Predator Sightings', sub: '40m ago · 🐆 Stealth Hunt' },
  { id: 'mountain_alpine_moss', name: 'Mountain Alpine Moss (Rêu Tuyết Đỉnh Núi)', hl: '#4ade80', hook: '#e2e8f0', cta: '#16a34a', bg: '#052315', card: 'rgba(8, 38, 23, 0.78)', border: 'rgba(74, 222, 128, 0.35)', shadow: 'rgba(34, 197, 94, 0.22)', author: 'Alpine Trails', sub: '7hrs ago · ⛰️ High Altitude' },
  { id: 'jade_dynasty_seal', name: 'Jade Dynasty Seal (Ngọc Tỷ Đế Vương)', hl: '#10b981', hook: '#fef08a', cta: '#047857', bg: '#022115', card: 'rgba(4, 35, 22, 0.82)', border: 'rgba(16, 185, 129, 0.44)', shadow: 'rgba(16, 185, 129, 0.28)', author: 'Dynasty Records', sub: '3hrs ago · 📜 Imperial Seal' },
  { id: 'viridian_shadow', name: 'Viridian Shadow (Bóng Râm Ngọc Lục Viridian)', hl: '#34d399', hook: '#94a3b8', cta: '#059669', bg: '#042217', card: 'rgba(6, 36, 25, 0.82)', border: 'rgba(52, 211, 153, 0.35)', shadow: 'rgba(16, 185, 129, 0.22)', author: 'Viridian Files', sub: '1hr ago · 🕶️ Shadow Agent' },
  { id: 'bioluminescent_spore', name: 'Bioluminescent Spore (Bào Tử Rừng Phát Quang)', hl: '#4ade80', hook: '#86efac', cta: '#16a34a', bg: '#032412', card: 'rgba(5, 40, 20, 0.80)', border: 'rgba(74, 222, 128, 0.45)', shadow: 'rgba(34, 197, 94, 0.32)', author: 'Glowing Spores', sub: 'Just now · 🍄 Night Forest' },
];

emeraldDefs.forEach((d, idx) => {
  const num = 71 + idx;
  templates.push({
    num,
    name: `Text Story #${String(num).padStart(2, '0')} - ${d.name}`,
    category: 'emerald',
    presetId: `story_${num}_${d.id}`,
    themeStyle: d.id,
    authorName: d.author,
    authorSubtitle: d.sub,
    hasVerified: idx % 2 === 1,
    hasFollowBtn: idx % 3 === 0,
    isCensoredName: idx % 4 === 1,
    bgGradient: `radial-gradient(ellipse at 80% 20%, ${d.bg} 0%, #021109 50%, #000603 100%)`,
    aura1: d.border,
    aura2: d.shadow,
    aura3: 'rgba(2, 20, 10, 0.7)',
    cardBg: d.card,
    cardBorder: `1.5px solid ${d.border}`,
    cardShadow: `0 25px 60px rgba(0, 0, 0, 0.92), 0 0 35px ${d.shadow}`,
    textColor: '#f1f5f9',
    hookColor: d.hook,
    hlColor: d.hl,
    ctaText: idx % 2 === 0 ? 'Continue Reading...' : 'Swipe for Truth 👉',
    ctaColor: d.cta,
    hasBottomPill: idx % 2 === 0,
    bottomPillText: idx % 2 === 0 ? 'Audio On 🔊' : '',
  });
});

// =========================================================================
// NHÓM 3: OBSIDIAN, TITANIUM & STEALTH NOIR (MẪU 91 - 110: 20 MẪU)
// =========================================================================
const obsidianDefs = [
  { id: 'damascus_steel', name: 'Damascus Steel (Thép Damascus Rèn Tối)', hl: '#facc15', hook: '#e2e8f0', cta: '#38bdf8', bg: '#171717', card: 'rgba(26, 26, 26, 0.85)', border: 'rgba(212, 212, 216, 0.30)', shadow: 'rgba(255, 255, 255, 0.08)', author: 'Damascus Blade', sub: '1hr ago · ⚔️ Forged Dark' },
  { id: 'stealth_fighter', name: 'Stealth Fighter F-22 (Tiêm Kích Tàng Hình)', hl: '#38bdf8', hook: '#94a3b8', cta: '#0ea5e9', bg: '#0f172a', card: 'rgba(20, 27, 45, 0.84)', border: 'rgba(148, 163, 184, 0.28)', shadow: 'rgba(56, 189, 248, 0.15)', author: 'Stealth Wing', sub: '3hrs ago · ✈️ Radar Invisible' },
  { id: 'gotham_noir', name: 'Gotham Detective Noir (Thám Tử Gotham)', hl: '#fbbf24', hook: '#ffffff', cta: '#eab308', bg: '#121214', card: 'rgba(20, 20, 24, 0.88)', border: 'rgba(250, 204, 21, 0.32)', shadow: 'rgba(234, 179, 8, 0.18)', author: 'Gotham Files', sub: '2hrs ago · 🕵️ Dark Alley' },
  { id: 'monolith_space', name: 'Monolith Space Black (Khối Cự Thạch)', hl: '#67e8f9', hook: '#f8fafc', cta: '#06b6d4', bg: '#09090b', card: 'rgba(18, 18, 22, 0.86)', border: 'rgba(103, 232, 249, 0.25)', shadow: 'rgba(6, 182, 212, 0.15)', author: 'Deep Monolith', sub: '4hrs ago · 🌌 Beyond Stars' },
  { id: 'charcoal_minimal', name: 'Charcoal Minimalist (Than Hoạt Tính)', hl: '#fde047', hook: '#e2e8f0', cta: '#38bdf8', bg: '#141414', card: 'rgba(24, 24, 27, 0.86)', border: 'rgba(161, 161, 170, 0.25)', shadow: 'rgba(255, 255, 255, 0.06)', author: 'Minimal Slate', sub: '5hrs ago · 📄 Clean Confession' },
  { id: 'matte_titanium', name: 'Matte Titanium Alloy (Hợp Kim Titan Mờ)', hl: '#38bdf8', hook: '#cbd5e1', cta: '#0284c7', bg: '#111827', card: 'rgba(22, 30, 46, 0.84)', border: 'rgba(203, 213, 225, 0.32)', shadow: 'rgba(148, 163, 184, 0.18)', author: 'Titanium Lab', sub: '1hr ago · ⚙️ Alloy Tech' },
  { id: 'cyber_shadow_protocol', name: 'Cyber Shadow Protocol (Nghị Trình Bóng Đêm)', hl: '#22d3ee', hook: '#94a3b8', cta: '#0891b2', bg: '#0d131f', card: 'rgba(16, 23, 38, 0.85)', border: 'rgba(34, 211, 238, 0.30)', shadow: 'rgba(34, 211, 238, 0.18)', author: 'Shadow Protocol', sub: '30m ago · 🔒 Top Secret' },
  { id: 'high_contrast_bw', name: 'High Contrast Noir (Tương Phản Đơn Sắc)', hl: '#ffffff', hook: '#facc15', cta: '#38bdf8', bg: '#050505', card: 'rgba(15, 15, 15, 0.90)', border: 'rgba(255, 255, 255, 0.40)', shadow: 'rgba(255, 255, 255, 0.12)', author: 'Monochrome Post', sub: '45m ago · 🎬 Cinema B&W' },
  { id: 'volcanic_basalt', name: 'Volcanic Basalt Glass (Đá Núi Lửa Basalt)', hl: '#fb923c', hook: '#fdba74', cta: '#ea580c', bg: '#181210', card: 'rgba(28, 20, 18, 0.86)', border: 'rgba(251, 146, 60, 0.32)', shadow: 'rgba(234, 88, 12, 0.20)', author: 'Basalt Core', sub: '2hrs ago · 🌋 Volcanic Crust' },
  { id: 'anonymous_vault', name: 'Anonymous Vault (Hầm Tài Liệu Tuyệt Mật)', hl: '#fde047', hook: '#ffffff', cta: '#38bdf8', bg: '#0e0e11', card: 'rgba(20, 20, 26, 0.88)', border: 'rgba(161, 161, 170, 0.30)', shadow: 'rgba(250, 204, 21, 0.15)', author: 'Redacted Files', sub: 'Just now · 📁 Declassified' },
  { id: 'graphite_sketch', name: 'Graphite Shadow Sketch (Phác Thảo Than Chì)', hl: '#94a3b8', hook: '#e2e8f0', cta: '#38bdf8', bg: '#151518', card: 'rgba(25, 25, 30, 0.84)', border: 'rgba(148, 163, 184, 0.30)', shadow: 'rgba(255, 255, 255, 0.07)', author: 'Graphite Club', sub: '6hrs ago · ✏️ Raw Diary' },
  { id: 'carbon_fiber_weave', name: 'Carbon Fiber Weave (Sợi Carbon Dệt)', hl: '#38bdf8', hook: '#cbd5e1', cta: '#0ea5e9', bg: '#0f1115', card: 'rgba(20, 22, 28, 0.86)', border: 'rgba(100, 116, 139, 0.35)', shadow: 'rgba(56, 189, 248, 0.18)', author: 'Carbon Fiber', sub: '1hr ago · 🏎️ Hyper Carbon' },
  { id: 'deep_space_void', name: 'Deep Space Void (Khoảng Không Vô Tận)', hl: '#7dd3fc', hook: '#bae6fd', cta: '#0284c7', bg: '#080b12', card: 'rgba(14, 18, 28, 0.88)', border: 'rgba(125, 211, 252, 0.25)', shadow: 'rgba(2, 132, 199, 0.18)', author: 'Deep Void', sub: '3hrs ago · 🛸 Zero Gravity' },
  { id: 'heavy_armor_plating', name: 'Heavy Armor Plating (Giáp Kim Loại Nặng)', hl: '#fbbf24', hook: '#94a3b8', cta: '#eab308', bg: '#12151c', card: 'rgba(22, 26, 35, 0.86)', border: 'rgba(148, 163, 184, 0.32)', shadow: 'rgba(234, 179, 8, 0.15)', author: 'Heavy Armor', sub: '5hrs ago · 🛡️ Steel Wall' },
  { id: 'cold_steel_edge', name: 'Cold Steel Edge (Lưỡi Thép Lạnh)', hl: '#38bdf8', hook: '#f1f5f9', cta: '#0284c7', bg: '#10141c', card: 'rgba(20, 24, 34, 0.84)', border: 'rgba(203, 213, 225, 0.32)', shadow: 'rgba(56, 189, 248, 0.20)', author: 'Cold Steel', sub: '2hrs ago · 🔪 Razor Sharp' },
  { id: 'dark_negative_film', name: 'Dark Room Negative (Âm Bản Phòng Tối)', hl: '#facc15', hook: '#ffffff', cta: '#ca8a04', bg: '#080808', card: 'rgba(18, 18, 18, 0.90)', border: 'rgba(250, 204, 21, 0.35)', shadow: 'rgba(234, 179, 8, 0.18)', author: 'Darkroom Photos', sub: '4hrs ago · 🎞️ Negative Film' },
  { id: 'phantom_silhouette', name: 'Phantom Silhouette (Hình Bóng Bóng Ma)', hl: '#94a3b8', hook: '#f8fafc', cta: '#38bdf8', bg: '#0c0d12', card: 'rgba(18, 20, 26, 0.86)', border: 'rgba(148, 163, 184, 0.25)', shadow: 'rgba(255, 255, 255, 0.08)', author: 'The Phantom', sub: 'Just now · 👤 Ghost Whispers' },
  { id: 'tungsten_core', name: 'Tungsten Heavy Core (Lõi Kim Loại Vonfram)', hl: '#38bdf8', hook: '#e2e8f0', cta: '#0284c7', bg: '#12141a', card: 'rgba(22, 25, 32, 0.85)', border: 'rgba(148, 163, 184, 0.30)', shadow: 'rgba(56, 189, 248, 0.16)', author: 'Tungsten Lab', sub: '3hrs ago · ⚡ Density 19.3' },
  { id: 'silver_mercury', name: 'Silver Mercury Reflect (Thủy Ngân Bạc)', hl: '#e2e8f0', hook: '#38bdf8', cta: '#0ea5e9', bg: '#111722', card: 'rgba(20, 27, 40, 0.84)', border: 'rgba(226, 232, 240, 0.35)', shadow: 'rgba(56, 189, 248, 0.22)', author: 'Liquid Mercury', sub: '1hr ago · 🪞 Liquid Metal' },
  { id: 'silent_interrogation', name: 'Silent Interrogation (Phòng Hỏi Cung)', hl: '#fbbf24', hook: '#ffffff', cta: '#eab308', bg: '#0a0a0c', card: 'rgba(18, 18, 22, 0.88)', border: 'rgba(251, 191, 36, 0.28)', shadow: 'rgba(251, 191, 36, 0.16)', author: 'Cold Case Files', sub: '5hrs ago · 🔦 Dark Room' },
];

obsidianDefs.forEach((d, idx) => {
  const num = 91 + idx;
  templates.push({
    num,
    name: `Text Story #${String(num).padStart(2, '0')} - ${d.name}`,
    category: 'obsidian',
    presetId: `story_${num}_${d.id}`,
    themeStyle: d.id,
    authorName: d.author,
    authorSubtitle: d.sub,
    hasVerified: idx % 3 === 0,
    hasFollowBtn: idx % 2 === 1,
    isCensoredName: true, // Nhóm Noir & Obsidian thường che tên tạo sự bí ẩn
    bgGradient: `radial-gradient(ellipse at 75% 25%, ${d.bg} 0%, #060608 50%, #000000 100%)`,
    aura1: d.border,
    aura2: d.shadow,
    aura3: 'rgba(10, 10, 12, 0.7)',
    cardBg: d.card,
    cardBorder: `1.5px solid ${d.border}`,
    cardShadow: `0 25px 65px rgba(0, 0, 0, 0.95), 0 0 30px ${d.shadow}`,
    textColor: '#f1f5f9',
    hookColor: d.hook,
    hlColor: d.hl,
    ctaText: idx % 2 === 0 ? 'Part 2 in Comments 👇' : 'Tap to Unveil Secret...',
    ctaColor: d.cta,
    hasBottomPill: idx % 3 === 0,
    bottomPillText: idx % 3 === 0 ? 'Follow for Part 2 🚀' : '',
  });
});

// =========================================================================
// NHÓM 4: GOLD, AMBER, HONEY & ROYAL BRONZE (MẪU 111 - 130: 20 MẪU)
// =========================================================================
const goldDefs = [
  { id: 'midas_touch', name: 'King Midas Touch (Bàn Tay Vàng Midas)', hl: '#fde047', hook: '#fef08a', cta: '#eab308', bg: '#2b1b05', card: 'rgba(38, 24, 6, 0.84)', border: 'rgba(253, 224, 71, 0.45)', shadow: 'rgba(234, 179, 8, 0.32)', author: 'Midas Vault', sub: '1hr ago · 👑 Golden Touch' },
  { id: 'pharaoh_sarcophagus', name: 'Pharaoh Sarcophagus (Lăng Mộ Ai Cập)', hl: '#fbbf24', hook: '#fde047', cta: '#d97706', bg: '#241704', card: 'rgba(34, 20, 5, 0.85)', border: 'rgba(251, 191, 36, 0.42)', shadow: 'rgba(217, 119, 6, 0.30)', author: 'Pharaoh Crypt', sub: '3hrs ago · 🏺 Ancient Tomb' },
  { id: 'baltic_amber_fossil', name: 'Baltic Amber Fossil (Hổ Phách Baltic)', hl: '#f59e0b', hook: '#fbbf24', cta: '#d97706', bg: '#261603', card: 'rgba(36, 20, 4, 0.82)', border: 'rgba(245, 158, 11, 0.42)', shadow: 'rgba(245, 158, 11, 0.28)', author: 'Amber Fossil', sub: '4hrs ago · 🪲 Million Years' },
  { id: 'royal_crest', name: 'Royal Sovereign Crest (Huy Hiệu Quân Vương)', hl: '#fde047', hook: '#ffffff', cta: '#ca8a04', bg: '#281907', card: 'rgba(38, 23, 8, 0.84)', border: 'rgba(253, 224, 71, 0.40)', shadow: 'rgba(234, 179, 8, 0.26)', author: 'Royal Sovereign', sub: '2hrs ago · 🏰 Royal Court' },
  { id: 'golden_sand_dune', name: 'Golden Sand Dune (Cồn Cát Sahara)', hl: '#facc15', hook: '#fed7aa', cta: '#ea580c', bg: '#261706', card: 'rgba(36, 21, 8, 0.82)', border: 'rgba(250, 204, 21, 0.38)', shadow: 'rgba(234, 88, 12, 0.24)', author: 'Sahara Winds', sub: '5hrs ago · 🏜️ Desert Tales' },
  { id: 'liquid_molten_gold', name: 'Liquid Molten Gold (Vàng Nóng Chảy)', hl: '#fde047', hook: '#fbbf24', cta: '#eab308', bg: '#2d1c04', card: 'rgba(42, 25, 5, 0.85)', border: 'rgba(253, 224, 71, 0.50)', shadow: 'rgba(234, 179, 8, 0.35)', author: 'Gold Foundry', sub: 'Just now · 🧈 1000°C Melt' },
  { id: 'antique_bronze_relic', name: 'Antique Bronze Relic (Cổ Vật Đồng Thau)', hl: '#fbbf24', hook: '#fdba74', cta: '#c2410c', bg: '#211608', card: 'rgba(32, 21, 10, 0.84)', border: 'rgba(251, 191, 36, 0.35)', shadow: 'rgba(194, 65, 12, 0.25)', author: 'Antique Relic', sub: '6hrs ago · 🛡️ Bronze Age' },
  { id: 'honeycomb_nectar', name: 'Honeycomb Nectar (Mật Ong Vàng)', hl: '#f59e0b', hook: '#fde047', cta: '#d97706', bg: '#261804', card: 'rgba(38, 23, 6, 0.80)', border: 'rgba(245, 158, 11, 0.40)', shadow: 'rgba(245, 158, 11, 0.28)', author: 'Honey Nectar', sub: '1hr ago · 🍯 Pure Golden' },
  { id: 'golden_hour_sunbeam', name: 'Golden Hour Sunbeam (Nắng Chiều Hoàng Kim)', hl: '#fde047', hook: '#fed7aa', cta: '#ea580c', bg: '#291806', card: 'rgba(39, 23, 8, 0.80)', border: 'rgba(253, 224, 71, 0.38)', shadow: 'rgba(234, 88, 12, 0.25)', author: 'Golden Hour', sub: '45m ago · 🌅 Sunset Glow' },
  { id: 'wall_street_bullion', name: 'Wall Street Bullion (Thỏi Vàng Phố Wall)', hl: '#facc15', hook: '#ffffff', cta: '#ca8a04', bg: '#221606', card: 'rgba(32, 20, 8, 0.85)', border: 'rgba(250, 204, 21, 0.45)', shadow: 'rgba(202, 138, 4, 0.30)', author: 'Wall St Bullion', sub: '2hrs ago · 📈 999.9 Fine' },
  { id: 'byzantine_imperial_gold', name: 'Byzantine Imperial Gold (Vàng Byzantine)', hl: '#fde047', hook: '#fbbf24', cta: '#b45309', bg: '#271705', card: 'rgba(37, 22, 6, 0.84)', border: 'rgba(253, 224, 71, 0.42)', shadow: 'rgba(180, 83, 9, 0.28)', author: 'Byzantine Empire', sub: '4hrs ago · 👑 Empire Gold' },
  { id: 'aztec_sun_calendar', name: 'Aztec Sun Calendar (Lịch Mặt Trời Aztec)', hl: '#fbbf24', hook: '#fdba74', cta: '#ea580c', bg: '#251505', card: 'rgba(35, 19, 6, 0.82)', border: 'rgba(251, 191, 36, 0.38)', shadow: 'rgba(234, 88, 12, 0.25)', author: 'Aztec Sun', sub: '3hrs ago · ☀️ Solar Stone' },
  { id: 'champagne_vintage_spark', name: 'Champagne Vintage Spark (Bọt Champagne Vàng)', hl: '#fef08a', hook: '#ffffff', cta: '#eab308', bg: '#261b09', card: 'rgba(38, 26, 11, 0.78)', border: 'rgba(254, 240, 138, 0.40)', shadow: 'rgba(234, 179, 8, 0.25)', author: 'Vintage Champagne', sub: '1hr ago · 🥂 Vintage 1996' },
  { id: 'gilded_frame_canvas', name: 'Gilded Frame Canvas (Khung Tranh Dát Vàng)', hl: '#fde047', hook: '#fed7aa', cta: '#d97706', bg: '#231505', card: 'rgba(33, 19, 6, 0.84)', border: 'rgba(253, 224, 71, 0.36)', shadow: 'rgba(217, 119, 6, 0.25)', author: 'Gilded Masterpiece', sub: '5hrs ago · 🖼️ Louvre Vault' },
  { id: 'amber_sunset_flame', name: 'Amber Sunset Flame (Lửa Hổ Phách Hoàng Hôn)', hl: '#fb923c', hook: '#fde047', cta: '#ea580c', bg: '#2c1605', card: 'rgba(42, 21, 6, 0.82)', border: 'rgba(251, 146, 60, 0.42)', shadow: 'rgba(234, 88, 12, 0.30)', author: 'Sunset Flame', sub: '30m ago · 🔥 Amber Fire' },
  { id: 'topaz_gemstone_cut', name: 'Topaz Gemstone Cut (Đá Quý Topaz)', hl: '#f59e0b', hook: '#fde047', cta: '#b45309', bg: '#241604', card: 'rgba(35, 20, 5, 0.82)', border: 'rgba(245, 158, 11, 0.44)', shadow: 'rgba(245, 158, 11, 0.30)', author: 'Topaz Cut', sub: '2hrs ago · 💎 50 Carats' },
  { id: 'eldorado_lost_empire', name: 'Eldorado Lost Empire (Đế Chế Eldorado)', hl: '#fde047', hook: '#fef08a', cta: '#ca8a04', bg: '#281a05', card: 'rgba(38, 24, 6, 0.84)', border: 'rgba(253, 224, 71, 0.46)', shadow: 'rgba(202, 138, 4, 0.32)', author: 'Eldorado Map', sub: '4hrs ago · 🗺️ City of Gold' },
  { id: 'roman_centurion_brass', name: 'Roman Centurion Brass (Đồng Thau La Mã)', hl: '#fbbf24', hook: '#fde047', cta: '#c2410c', bg: '#221506', card: 'rgba(33, 20, 8, 0.84)', border: 'rgba(251, 191, 36, 0.36)', shadow: 'rgba(194, 65, 12, 0.25)', author: 'Centurion Guard', sub: '6hrs ago · 🛡️ Legion XII' },
  { id: 'silk_road_spices', name: 'Silk Road Spices Gold (Con Đường Tơ Lụa)', hl: '#facc15', hook: '#fed7aa', cta: '#d97706', bg: '#251705', card: 'rgba(36, 21, 6, 0.82)', border: 'rgba(250, 204, 21, 0.40)', shadow: 'rgba(217, 119, 6, 0.26)', author: 'Silk Road Trader', sub: '3hrs ago · 🐪 Caravan Gold' },
  { id: 'aureus_imperial_crown', name: 'Aureus Imperial Crown (Vương Miện Aureus)', hl: '#fde047', hook: '#ffffff', cta: '#eab308', bg: '#2a1a05', card: 'rgba(40, 24, 6, 0.85)', border: 'rgba(253, 224, 71, 0.48)', shadow: 'rgba(234, 179, 8, 0.35)', author: 'Imperial Aureus', sub: '1hr ago · 👑 Caesar Crown' },
];

goldDefs.forEach((d, idx) => {
  const num = 111 + idx;
  templates.push({
    num,
    name: `Text Story #${String(num).padStart(2, '0')} - ${d.name}`,
    category: 'gold',
    presetId: `story_${num}_${d.id}`,
    themeStyle: d.id,
    authorName: d.author,
    authorSubtitle: d.sub,
    hasVerified: idx % 2 === 0,
    hasFollowBtn: idx % 3 === 1,
    isCensoredName: idx % 5 === 0,
    bgGradient: `radial-gradient(ellipse at 75% 20%, ${d.bg} 0%, #100a02 45%, #030200 100%)`,
    aura1: d.border,
    aura2: d.shadow,
    aura3: 'rgba(30, 18, 4, 0.7)',
    cardBg: d.card,
    cardBorder: `1.8px solid ${d.border}`,
    cardShadow: `0 25px 65px rgba(0, 0, 0, 0.95), 0 0 35px ${d.shadow}`,
    textColor: '#f8fafc',
    hookColor: d.hook,
    hlColor: d.hl,
    ctaText: idx % 2 === 0 ? 'Continue Reading...' : 'Read Full Story Below 👇',
    ctaColor: d.cta,
    hasBottomPill: idx % 2 === 1,
    bottomPillText: idx % 2 === 1 ? 'Full Story In Comment 👇' : '',
  });
});

// =========================================================================
// NHÓM 5: EARTH, WOOD, ESPRESSO & LEATHER (MẪU 131 - 150: 20 MẪU)
// =========================================================================
const earthDefs = [
  { id: 'espresso_crema', name: 'Espresso Crema Roast (Cà Phê Rang Đậm Khói)', hl: '#fbbf24', hook: '#fed7aa', cta: '#d97706', bg: '#24140a', card: 'rgba(35, 19, 10, 0.84)', border: 'rgba(251, 191, 36, 0.32)', shadow: 'rgba(217, 119, 6, 0.22)', author: 'Espresso Bar', sub: '30m ago · ☕ Dark Roast' },
  { id: 'walnut_woodgrain', name: 'Aged Walnut Woodgrain (Vân Gỗ Óc Chó)', hl: '#f59e0b', hook: '#fde047', cta: '#b45309', bg: '#221308', card: 'rgba(32, 18, 9, 0.84)', border: 'rgba(245, 158, 11, 0.35)', shadow: 'rgba(180, 83, 9, 0.24)', author: 'Walnut Craft', sub: '2hrs ago · 🪵 Solid Wood' },
  { id: 'vintage_cigar_leather', name: 'Vintage Cigar & Leather (Xì Gà & Da Thuộc)', hl: '#fb923c', hook: '#fdba74', cta: '#ea580c', bg: '#261208', card: 'rgba(38, 18, 9, 0.85)', border: 'rgba(251, 146, 60, 0.35)', shadow: 'rgba(234, 88, 12, 0.25)', author: 'Havana Lounge', sub: '4hrs ago · 🍂 Vintage Lounge' },
  { id: 'belgian_cocoa', name: 'Dark Belgian Cocoa (Ca Cao Đen Bỉ)', hl: '#fde047', hook: '#fed7aa', cta: '#d97706', bg: '#1f1008', card: 'rgba(30, 16, 8, 0.86)', border: 'rgba(253, 224, 71, 0.32)', shadow: 'rgba(217, 119, 6, 0.22)', author: 'Belgian Cocoa', sub: '1hr ago · 🍫 85% Dark' },
  { id: 'grand_canyon_clay', name: 'Grand Canyon Clay (Đất Sét Grand Canyon)', hl: '#fb923c', hook: '#fdba74', cta: '#c2410c', bg: '#29140a', card: 'rgba(40, 20, 11, 0.82)', border: 'rgba(251, 146, 60, 0.38)', shadow: 'rgba(194, 65, 12, 0.26)', author: 'Canyon Trekker', sub: '5hrs ago · 🏜️ Red Rock' },
  { id: 'oak_wine_barrel', name: 'Oak Wine Barrel (Thùng Rượu Gỗ Sồi)', hl: '#fbbf24', hook: '#fed7aa', cta: '#b45309', bg: '#241208', card: 'rgba(36, 18, 9, 0.84)', border: 'rgba(251, 191, 36, 0.34)', shadow: 'rgba(180, 83, 9, 0.24)', author: 'Cellar Master', sub: '3hrs ago · 🍷 Aged 18 Yrs' },
  { id: 'antique_parchment', name: 'Antique Parchment Scroll (Cuộn Giấy Da Cổ)', hl: '#facc15', hook: '#fef08a', cta: '#ca8a04', bg: '#23160a', card: 'rgba(34, 21, 11, 0.82)', border: 'rgba(250, 204, 21, 0.35)', shadow: 'rgba(202, 138, 4, 0.24)', author: 'Ancient Library', sub: '6hrs ago · 📜 Lost Scroll' },
  { id: 'mahogany_desk', name: 'Mahogany Royal Desk (Bàn Gỗ Gụ)', hl: '#f59e0b', hook: '#fdba74', cta: '#b45309', bg: '#231008', card: 'rgba(34, 16, 9, 0.85)', border: 'rgba(245, 158, 11, 0.36)', shadow: 'rgba(180, 83, 9, 0.25)', author: 'Cabinet Archives', sub: '2hrs ago · 🖋️ Private Study' },
  { id: 'desert_sandstone', name: 'Desert Nomad Sandstone (Đá Sa Thạch)', hl: '#facc15', hook: '#fed7aa', cta: '#ea580c', bg: '#26160a', card: 'rgba(38, 22, 11, 0.82)', border: 'rgba(250, 204, 21, 0.36)', shadow: 'rgba(234, 88, 12, 0.24)', author: 'Nomad Journey', sub: '4hrs ago · 🐪 Desert Trail' },
  { id: 'roasted_chestnut', name: 'Roasted Chestnut Hearth (Hạt Dẻ Nướng Lò Sưởi)', hl: '#fbbf24', hook: '#fdba74', cta: '#d97706', bg: '#251308', card: 'rgba(36, 18, 9, 0.84)', border: 'rgba(251, 191, 36, 0.35)', shadow: 'rgba(217, 119, 6, 0.25)', author: 'Winter Hearth', sub: '1hr ago · 🌰 Warm Hearth' },
  { id: 'mocha_hazelnut', name: 'Mocha Hazelnut Brew (Mocha Hạt Phỉ)', hl: '#f59e0b', hook: '#fde047', cta: '#b45309', bg: '#211208', card: 'rgba(32, 17, 9, 0.84)', border: 'rgba(245, 158, 11, 0.34)', shadow: 'rgba(180, 83, 9, 0.22)', author: 'Hazelnut Cafe', sub: '2hrs ago · ☕ Sweet Brew' },
  { id: 'rustic_cabin', name: 'Rustic Cabin Hearth (Lò Sưởi Gỗ Núi)', hl: '#fb923c', hook: '#fed7aa', cta: '#c2410c', bg: '#251409', card: 'rgba(36, 19, 10, 0.84)', border: 'rgba(251, 146, 60, 0.36)', shadow: 'rgba(194, 65, 12, 0.25)', author: 'Cabin In Woods', sub: '5hrs ago · 🪵 Fireplace' },
  { id: 'terracotta_pottery', name: 'Terracotta Pottery (Gốm Đất Nung)', hl: '#fb923c', hook: '#fdba74', cta: '#ea580c', bg: '#28140a', card: 'rgba(39, 20, 11, 0.82)', border: 'rgba(251, 146, 60, 0.38)', shadow: 'rgba(234, 88, 12, 0.26)', author: 'Artisan Clay', sub: '3hrs ago · 🏺 Handcrafted' },
  { id: 'ancient_cedar', name: 'Ancient Cedar Tree (Gỗ Tuyết Tùng)', hl: '#34d399', hook: '#fed7aa', cta: '#059669', bg: '#1c170c', card: 'rgba(28, 22, 12, 0.84)', border: 'rgba(52, 211, 153, 0.32)', shadow: 'rgba(16, 185, 129, 0.20)', author: 'Sacred Cedar', sub: '7hrs ago · 🌲 1000 Yrs Old' },
  { id: 'old_cartographer', name: 'Old Cartographer Map (Bản Đồ Cổ)', hl: '#facc15', hook: '#fef08a', cta: '#ca8a04', bg: '#23170a', card: 'rgba(34, 22, 11, 0.82)', border: 'rgba(250, 204, 21, 0.35)', shadow: 'rgba(202, 138, 4, 0.24)', author: 'Old Navigator', sub: '4hrs ago · 🧭 Uncharted Sea' },
  { id: 'bourbon_oak', name: 'Bourbon Oak Cask (Gỗ Sồi Bourbon)', hl: '#fbbf24', hook: '#fed7aa', cta: '#d97706', bg: '#261307', card: 'rgba(38, 18, 8, 0.85)', border: 'rgba(251, 191, 36, 0.36)', shadow: 'rgba(217, 119, 6, 0.26)', author: 'Bourbon Reserve', sub: '1hr ago · 🥃 Single Barrel' },
  { id: 'deep_forest_soil', name: 'Deep Forest Soil (Đất Mùn Rừng Rậm)', hl: '#f59e0b', hook: '#86efac', cta: '#b45309', bg: '#1a140b', card: 'rgba(26, 20, 11, 0.85)', border: 'rgba(245, 158, 11, 0.30)', shadow: 'rgba(180, 83, 9, 0.20)', author: 'Earth & Roots', sub: '6hrs ago · 🍄 Deep Earth' },
  { id: 'tanned_leather', name: 'Tanned Saddle Leather (Yên Ngựa Da Thuộc)', hl: '#fb923c', hook: '#fdba74', cta: '#c2410c', bg: '#241308', card: 'rgba(35, 18, 9, 0.84)', border: 'rgba(251, 146, 60, 0.35)', shadow: 'rgba(194, 65, 12, 0.24)', author: 'Western Leather', sub: '2hrs ago · 🤠 Wild West' },
  { id: 'coffee_grinder', name: 'Vintage Coffee Grinder (Cối Xay Cà Phê Cổ)', hl: '#fbbf24', hook: '#fed7aa', cta: '#d97706', bg: '#221307', card: 'rgba(33, 18, 8, 0.84)', border: 'rgba(251, 191, 36, 0.34)', shadow: 'rgba(217, 119, 6, 0.24)', author: 'Coffee Artisan', sub: '3hrs ago · ⚙️ Manual Grind' },
  { id: 'redwood_giant', name: 'Redwood Giant Trunk (Thân Cây Khổng Lồ)', hl: '#fb923c', hook: '#fed7aa', cta: '#ea580c', bg: '#251108', card: 'rgba(37, 17, 9, 0.84)', border: 'rgba(251, 146, 60, 0.36)', shadow: 'rgba(234, 88, 12, 0.25)', author: 'Redwood Forest', sub: '5hrs ago · 🌲 Giant Trees' },
];

earthDefs.forEach((d, idx) => {
  const num = 131 + idx;
  templates.push({
    num,
    name: `Text Story #${String(num).padStart(2, '0')} - ${d.name}`,
    category: 'earth',
    presetId: `story_${num}_${d.id}`,
    themeStyle: d.id,
    authorName: d.author,
    authorSubtitle: d.sub,
    hasVerified: idx % 3 === 0,
    hasFollowBtn: idx % 2 === 0,
    isCensoredName: idx % 4 === 2,
    bgGradient: `radial-gradient(ellipse at 75% 25%, ${d.bg} 0%, #0d0804 50%, #020101 100%)`,
    aura1: d.border,
    aura2: d.shadow,
    aura3: 'rgba(20, 10, 4, 0.7)',
    cardBg: d.card,
    cardBorder: `1.5px solid ${d.border}`,
    cardShadow: `0 25px 60px rgba(0, 0, 0, 0.95), 0 0 35px ${d.shadow}`,
    textColor: '#f1f5f9',
    hookColor: d.hook,
    hlColor: d.hl,
    ctaText: idx % 2 === 0 ? 'Continue Reading...' : 'Part 2 in Comment 👇',
    ctaColor: d.cta,
    hasBottomPill: idx % 3 === 1,
    bottomPillText: idx % 3 === 1 ? 'Audio On 🔊' : '',
  });
});

// =========================================================================
// NHÓM 6: CRIMSON BLOOD & MYSTERY THRILLER (MẪU 151 - 170: 20 MẪU)
// TUYỆT ĐỐI KHÔNG HỒNG TÍM: CHỈ ĐỎ MÁU, ĐỎ RƯỢU VANG THẪM, ĐỎ THUẦN
// =========================================================================
const crimsonDefs = [
  { id: 'crime_scene', name: 'Crimson Blood Crime Scene (Hiện Trường Án Mạng)', hl: '#ef4444', hook: '#fca5a5', cta: '#dc2626', bg: '#2b0707', card: 'rgba(40, 8, 8, 0.85)', border: 'rgba(239, 68, 68, 0.40)', shadow: 'rgba(220, 38, 38, 0.30)', author: 'True Crime Detective', sub: '15m ago · 🚨 Crime Scene' },
  { id: 'ruby_red_dynasty', name: 'Ruby Red Dynasty (Huyết Ngọc Hoàng Triều)', hl: '#f87171', hook: '#fde047', cta: '#b91c1c', bg: '#260606', card: 'rgba(38, 7, 7, 0.84)', border: 'rgba(248, 113, 113, 0.42)', shadow: 'rgba(185, 28, 28, 0.28)', author: 'Dynasty Secrets', sub: '2hrs ago · 💎 Imperial Ruby' },
  { id: 'dracula_manor', name: 'Vampire Dracula Manor (Lâu Đài Dracula)', hl: '#ef4444', hook: '#ffffff', cta: '#991b1b', bg: '#220505', card: 'rgba(32, 6, 6, 0.88)', border: 'rgba(239, 68, 68, 0.35)', shadow: 'rgba(153, 27, 27, 0.30)', author: 'Transylvania Lore', sub: 'Midnight · 🦇 Bloodline' },
  { id: 'noir_warning_light', name: 'Noir Red Warning Light (Đèn Cảnh Báo Phòng Đen)', hl: '#f87171', hook: '#fca5a5', cta: '#dc2626', bg: '#240606', card: 'rgba(35, 7, 7, 0.86)', border: 'rgba(248, 113, 113, 0.45)', shadow: 'rgba(220, 38, 38, 0.35)', author: 'Warning Signal', sub: '1hr ago · ⚠️ Code Red' },
  { id: 'burning_embers', name: 'Burning Red Embers (Than Đỏ Bừng Cháy)', hl: '#fb923c', hook: '#f87171', cta: '#ea580c', bg: '#290906', card: 'rgba(41, 10, 8, 0.84)', border: 'rgba(251, 146, 60, 0.40)', shadow: 'rgba(234, 88, 12, 0.28)', author: 'Ashes & Flame', sub: '3hrs ago · 🔥 Glowing Coals' },
  { id: 'deep_garnet_gem', name: 'Deep Garnet Gem (Ngọc Garnet Đỏ Máu)', hl: '#ef4444', hook: '#fca5a5', cta: '#b91c1c', bg: '#230606', card: 'rgba(34, 7, 7, 0.85)', border: 'rgba(239, 68, 68, 0.38)', shadow: 'rgba(185, 28, 28, 0.26)', author: 'Garnet Vault', sub: '4hrs ago · 💎 Deep Cut' },
  { id: 'red_wax_seal', name: 'Red Wax Royal Seal (Dấu Niêm Phong Sáp Đỏ)', hl: '#f87171', hook: '#fde047', cta: '#dc2626', bg: '#250707', card: 'rgba(36, 8, 8, 0.84)', border: 'rgba(248, 113, 113, 0.38)', shadow: 'rgba(220, 38, 38, 0.26)', author: 'Confidential Post', sub: '50m ago · 💌 Wax Sealed' },
  { id: 'red_alert_emergency', name: 'Red Alert Emergency (Cảnh Báo Khẩn Đỏ)', hl: '#ef4444', hook: '#ffffff', cta: '#dc2626', bg: '#2d0606', card: 'rgba(44, 7, 7, 0.88)', border: 'rgba(239, 68, 68, 0.50)', shadow: 'rgba(239, 68, 68, 0.38)', author: 'Emergency Alert', sub: 'Just now · 🚨 Critical' },
  { id: 'crimson_velvet', name: 'Crimson Velvet Theater (Nhung Đỏ Nhà Hát Cổ)', hl: '#f87171', hook: '#fde047', cta: '#b91c1c', bg: '#260608', card: 'rgba(38, 7, 10, 0.85)', border: 'rgba(248, 113, 113, 0.36)', shadow: 'rgba(185, 28, 28, 0.25)', author: 'Classic Opera', sub: '5hrs ago · 🎭 Act III' },
  { id: 'blood_moon_eclipse', name: 'Blood Moon Eclipse (Nguyệt Thực Huyết Nguyệt)', hl: '#ef4444', hook: '#fca5a5', cta: '#dc2626', bg: '#280606', card: 'rgba(39, 7, 7, 0.86)', border: 'rgba(239, 68, 68, 0.42)', shadow: 'rgba(220, 38, 38, 0.30)', author: 'Eclipse Watchers', sub: 'Midnight · 🌕 Lunar Eclipse' },
  { id: 'scarlet_whispers', name: 'Scarlet Whispers (Lời Thì Thầm Đỏ Thẫm)', hl: '#f87171', hook: '#cbd5e1', cta: '#b91c1c', bg: '#240607', card: 'rgba(35, 7, 9, 0.84)', border: 'rgba(248, 113, 113, 0.35)', shadow: 'rgba(185, 28, 28, 0.24)', author: 'Scarlet Diary', sub: '2hrs ago · 🤫 Untold Truth' },
  { id: 'dark_burgundy_cellar', name: 'Dark Burgundy Cellar (Hầm Rượu Đỏ Burgundy)', hl: '#ef4444', hook: '#fde047', cta: '#991b1b', bg: '#210507', card: 'rgba(31, 6, 9, 0.86)', border: 'rgba(239, 68, 68, 0.34)', shadow: 'rgba(153, 27, 27, 0.24)', author: 'Burgundy Cellar', sub: '4hrs ago · 🍷 Vintage 1982' },
  { id: 'inferno_volcano', name: 'Inferno Volcano Core (Lõi Dung Nham Núi Lửa)', hl: '#fb923c', hook: '#f87171', cta: '#ea580c', bg: '#2d0805', card: 'rgba(43, 9, 6, 0.85)', border: 'rgba(251, 146, 60, 0.45)', shadow: 'rgba(234, 88, 12, 0.32)', author: 'Volcano Core', sub: '1hr ago · 🌋 Magma Flow' },
  { id: 'red_tape_classified', name: 'Red Tape Classified (Hồ Sơ Niêm Phong Băng Đỏ)', hl: '#ef4444', hook: '#ffffff', cta: '#dc2626', bg: '#230606', card: 'rgba(33, 7, 7, 0.88)', border: 'rgba(239, 68, 68, 0.40)', shadow: 'rgba(220, 38, 38, 0.28)', author: 'Classified Archive', sub: '3hrs ago · 📁 Eyes Only' },
  { id: 'cardinal_red_cloak', name: 'Cardinal Red Cloak (Áo Choàng Đỏ Hồng Y)', hl: '#f87171', hook: '#fde047', cta: '#b91c1c', bg: '#250607', card: 'rgba(36, 7, 9, 0.85)', border: 'rgba(248, 113, 113, 0.38)', shadow: 'rgba(185, 28, 28, 0.26)', author: 'Vatican Secrets', sub: '6hrs ago · 🏛️ Ancient Order' },
  { id: 'heartbeat_pulse', name: 'Silent Heartbeat Pulse (Nhịp Tim Đập Đỏ)', hl: '#ef4444', hook: '#fca5a5', cta: '#dc2626', bg: '#280606', card: 'rgba(39, 7, 7, 0.86)', border: 'rgba(239, 68, 68, 0.44)', shadow: 'rgba(239, 68, 68, 0.32)', author: 'Pulse Check', sub: 'Just now · 💓 140 BPM' },
  { id: 'phoenix_ashes', name: 'Phoenix Ashes Flame (Ngọn Lửa Phượng Hoàng)', hl: '#fb923c', hook: '#f87171', cta: '#ea580c', bg: '#2a0805', card: 'rgba(41, 9, 6, 0.84)', border: 'rgba(251, 146, 60, 0.42)', shadow: 'rgba(234, 88, 12, 0.30)', author: 'Phoenix Rising', sub: '2hrs ago · 🦅 Reborn' },
  { id: 'red_neon_diner', name: 'Red Neon Diner Window (Cửa Sổ Đèn Neon Đỏ)', hl: '#f87171', hook: '#fca5a5', cta: '#dc2626', bg: '#260606', card: 'rgba(37, 7, 7, 0.85)', border: 'rgba(248, 113, 113, 0.46)', shadow: 'rgba(220, 38, 38, 0.34)', author: 'Midnight Diner', sub: '1hr ago · 🌧️ Rainy Night' },
  { id: 'crimson_rose_thorn', name: 'Crimson Rose Thorn (Gai Hoa Hồng Đỏ)', hl: '#ef4444', hook: '#fca5a5', cta: '#b91c1c', bg: '#240606', card: 'rgba(34, 7, 7, 0.84)', border: 'rgba(239, 68, 68, 0.38)', shadow: 'rgba(185, 28, 28, 0.25)', author: 'Dark Romance', sub: '4hrs ago · 🌹 Sharp Thorn' },
  { id: 'red_line_border', name: 'Red Line Border Control (Vạch Giới Hạn Đỏ)', hl: '#ef4444', hook: '#ffffff', cta: '#dc2626', bg: '#270606', card: 'rgba(38, 7, 7, 0.88)', border: 'rgba(239, 68, 68, 0.44)', shadow: 'rgba(220, 38, 38, 0.30)', author: 'Border Dispatch', sub: '30m ago · 🚫 Do Not Cross' },
];

crimsonDefs.forEach((d, idx) => {
  const num = 151 + idx;
  templates.push({
    num,
    name: `Text Story #${String(num).padStart(2, '0')} - ${d.name}`,
    category: 'crimson',
    presetId: `story_${num}_${d.id}`,
    themeStyle: d.id,
    authorName: d.author,
    authorSubtitle: d.sub,
    hasVerified: idx % 2 === 0,
    hasFollowBtn: idx % 3 === 0,
    isCensoredName: idx % 2 === 1,
    bgGradient: `radial-gradient(ellipse at 80% 20%, ${d.bg} 0%, #100202 50%, #030000 100%)`,
    aura1: d.border,
    aura2: d.shadow,
    aura3: 'rgba(25, 4, 4, 0.7)',
    cardBg: d.card,
    cardBorder: `1.5px solid ${d.border}`,
    cardShadow: `0 25px 65px rgba(0, 0, 0, 0.95), 0 0 35px ${d.shadow}`,
    textColor: '#f8fafc',
    hookColor: d.hook,
    hlColor: d.hl,
    ctaText: idx % 2 === 0 ? 'Part 2 in Comment 👇' : 'Wait for the ending... ⏳',
    ctaColor: d.cta,
    hasBottomPill: idx % 2 === 1,
    bottomPillText: idx % 2 === 1 ? 'Wait for the ending... ⏳' : '',
  });
});

// =========================================================================
// NHÓM 7: CYBER TECH, MATRIX GREEN & NEON WARNING (MẪU 171 - 190: 20 MẪU)
// TUYỆT ĐỐI KHÔNG HỒNG TÍM: CHỈ XANH LÁ MATRIX, XANH CYAN HUỲNH QUANG, VÀNG HAZARD
// =========================================================================
const cyberDefs = [
  { id: 'matrix_rain', name: 'Matrix Digital Rain (Mưa Mã Số Matrix)', hl: '#22c55e', hook: '#86efac', cta: '#16a34a', bg: '#021f09', card: 'rgba(3, 34, 12, 0.85)', border: 'rgba(34, 197, 94, 0.50)', shadow: 'rgba(34, 197, 94, 0.35)', author: 'Matrix Terminal', sub: 'Just now · 01001001' },
  { id: 'cyber_terminal_hud', name: 'Cyber Terminal HUD (Giao Diện Tác Chiến)', hl: '#22d3ee', hook: '#67e8f9', cta: '#0891b2', bg: '#031929', card: 'rgba(4, 28, 44, 0.84)', border: 'rgba(34, 211, 238, 0.45)', shadow: 'rgba(6, 182, 212, 0.30)', author: 'Combat HUD', sub: '10m ago · 🛰️ Online 100%' },
  { id: 'biohazard_neon', name: 'Neon Biohazard (Cảnh Báo Sinh Học)', hl: '#eab308', hook: '#fde047', cta: '#ca8a04', bg: '#211c03', card: 'rgba(35, 29, 5, 0.85)', border: 'rgba(234, 179, 8, 0.50)', shadow: 'rgba(234, 179, 8, 0.35)', author: 'Sector 7 Lab', sub: '25m ago · ☣️ Bio Contained' },
  { id: 'circuit_board_green', name: 'Circuit Board Green (Bo Mạch Vi Xử Lý)', hl: '#34d399', hook: '#6ee7b7', cta: '#059669', bg: '#032115', card: 'rgba(4, 36, 23, 0.82)', border: 'rgba(52, 211, 153, 0.42)', shadow: 'rgba(16, 185, 129, 0.28)', author: 'Hardware Architect', sub: '1hr ago · 💽 Silicon Wafer' },
  { id: 'quantum_core', name: 'Quantum Core Computer (Máy Tính Lượng Tử)', hl: '#38bdf8', hook: '#7dd3fc', cta: '#0284c7', bg: '#03172b', card: 'rgba(4, 26, 48, 0.84)', border: 'rgba(56, 189, 248, 0.48)', shadow: 'rgba(2, 132, 199, 0.32)', author: 'Qubit Quantum', sub: '2hrs ago · ⚛️ 128 Qubits' },
  { id: 'hacker_console', name: 'Hacker Console Dark (Giao Diện Hacker Đêm)', hl: '#4ade80', hook: '#ffffff', cta: '#16a34a', bg: '#03180b', card: 'rgba(4, 26, 13, 0.88)', border: 'rgba(74, 222, 128, 0.40)', shadow: 'rgba(34, 197, 94, 0.28)', author: 'Root Access', sub: '40m ago · 💻 Sudo Bash' },
  { id: 'high_voltage_alert', name: 'High Voltage Alert (Cảnh Báo Cao Thế Vàng)', hl: '#facc15', hook: '#fde047', cta: '#eab308', bg: '#251e04', card: 'rgba(40, 31, 6, 0.85)', border: 'rgba(250, 204, 21, 0.52)', shadow: 'rgba(234, 179, 8, 0.38)', author: 'High Voltage Grid', sub: '15m ago · ⚡ 100,000 Volts' },
  { id: 'neural_link', name: 'Cybernetic Neural Link (Cầu Nối Thần Kinh)', hl: '#2dd4bf', hook: '#5eead4', cta: '#0d9488', bg: '#032021', card: 'rgba(4, 34, 36, 0.82)', border: 'rgba(45, 212, 191, 0.44)', shadow: 'rgba(20, 184, 166, 0.28)', author: 'Synapse Core', sub: '3hrs ago · 🧠 Synaptic Link' },
  { id: 'sonar_radar_pulse', name: 'Radar Sonar Pulse (Xung Radar Quét Sâu)', hl: '#22c55e', hook: '#86efac', cta: '#15803d', bg: '#021c0b', card: 'rgba(3, 30, 13, 0.84)', border: 'rgba(34, 197, 94, 0.44)', shadow: 'rgba(34, 197, 94, 0.30)', author: 'Sonar Radar', sub: '50m ago · 📡 Ping Detected' },
  { id: 'radioactive_core', name: 'Radioactive Reactor (Lò Phản Ứng Phóng Xạ)', hl: '#eab308', hook: '#facc15', cta: '#ca8a04', bg: '#221a02', card: 'rgba(36, 28, 4, 0.86)', border: 'rgba(234, 179, 8, 0.50)', shadow: 'rgba(234, 179, 8, 0.35)', author: 'Chernobyl Watch', sub: '2hrs ago · ☢️ Reactor #4' },
  { id: 'dark_fiber_optic', name: 'Dark Fiber Optic (Cáp Quang Ánh Sáng)', hl: '#38bdf8', hook: '#60a5fa', cta: '#0284c7', bg: '#031426', card: 'rgba(4, 23, 44, 0.84)', border: 'rgba(56, 189, 248, 0.45)', shadow: 'rgba(2, 132, 199, 0.30)', author: 'Fiber Backbone', sub: '1hr ago · 💡 100 Gbps' },
  { id: 'crypto_hash_vault', name: 'Cryptographic Hash Vault (Khối Băm Mật Mã)', hl: '#34d399', hook: '#a7f3d0', cta: '#059669', bg: '#031e15', card: 'rgba(4, 32, 23, 0.84)', border: 'rgba(52, 211, 153, 0.40)', shadow: 'rgba(16, 185, 129, 0.26)', author: 'SHA-256 Vault', sub: '35m ago · 🔐 Block 840,000' },
  { id: 'ai_core_intelligence', name: 'Artificial Intelligence Core (Lõi AI Xanh Cyan)', hl: '#22d3ee', hook: '#e0f2fe', cta: '#0891b2', bg: '#021828', card: 'rgba(3, 27, 44, 0.84)', border: 'rgba(34, 211, 238, 0.48)', shadow: 'rgba(6, 182, 212, 0.32)', author: 'AGI Synthetics', sub: 'Just now · 🤖 Neural Compute' },
  { id: 'synthwave_grid', name: 'Neon Grid Synthwave (Lưới Không Gian Synthwave)', hl: '#fde047', hook: '#38bdf8', cta: '#eab308', bg: '#041829', card: 'rgba(5, 27, 46, 0.82)', border: 'rgba(253, 224, 71, 0.40)', shadow: 'rgba(56, 189, 248, 0.30)', author: '80s Synthwave', sub: '4hrs ago · 🕹️ Retro Grid' },
  { id: 'satellite_tracker', name: 'Satellite Orbital Tracker (Vệ Tinh Quỹ Đạo)', hl: '#38bdf8', hook: '#94a3b8', cta: '#0ea5e9', bg: '#051627', card: 'rgba(8, 25, 43, 0.84)', border: 'rgba(56, 189, 248, 0.38)', shadow: 'rgba(2, 132, 199, 0.24)', author: 'Orbit Tracking', sub: '2hrs ago · 🛰️ ISS Live' },
  { id: 'glitch_signal_noise', name: 'Glitch Signal Noise (Nhiễu Sóng Điện Tử)', hl: '#4ade80', hook: '#22d3ee', cta: '#16a34a', bg: '#031b14', card: 'rgba(5, 29, 22, 0.84)', border: 'rgba(74, 222, 128, 0.42)', shadow: 'rgba(34, 211, 238, 0.28)', author: 'Signal Corrupt', sub: '45m ago · 📺 Glitch Broadcast' },
  { id: 'binary_stream_dark', name: 'Binary Stream Dark (Dòng Chảy Nhị Phân)', hl: '#22c55e', hook: '#f1f5f9', cta: '#15803d', bg: '#02180a', card: 'rgba(3, 26, 11, 0.86)', border: 'rgba(34, 197, 94, 0.42)', shadow: 'rgba(34, 197, 94, 0.28)', author: 'Binary Logic', sub: '3hrs ago · 💾 Raw Bitstream' },
  { id: 'plasma_shield', name: 'Plasma Shield Generator (Lá Chắn Plasma)', hl: '#22d3ee', hook: '#38bdf8', cta: '#0284c7', bg: '#03182b', card: 'rgba(4, 27, 48, 0.84)', border: 'rgba(34, 211, 238, 0.50)', shadow: 'rgba(6, 182, 212, 0.35)', author: 'Defense Array', sub: '1hr ago · 🛡️ Shield 100%' },
  { id: 'mech_combat_hud', name: 'Mech Combat Armor HUD (Giáp Robot Chiến Đấu)', hl: '#fbbf24', hook: '#22d3ee', cta: '#d97706', bg: '#081724', card: 'rgba(12, 26, 40, 0.85)', border: 'rgba(251, 191, 36, 0.42)', shadow: 'rgba(217, 119, 6, 0.28)', author: 'Mech Titan VII', sub: '55m ago · 🤖 Systems Ready' },
  { id: 'cyber_firewall', name: 'Cyber Firewall Secure (Tường Lửa Vàng Cam)', hl: '#fb923c', hook: '#fde047', cta: '#ea580c', bg: '#201205', card: 'rgba(34, 19, 7, 0.85)', border: 'rgba(251, 146, 60, 0.46)', shadow: 'rgba(234, 88, 12, 0.32)', author: 'Firewall Guard', sub: 'Just now · 🔥 Intrusion Blocked' },
];

cyberDefs.forEach((d, idx) => {
  const num = 171 + idx;
  templates.push({
    num,
    name: `Text Story #${String(num).padStart(2, '0')} - ${d.name}`,
    category: 'cyber',
    presetId: `story_${num}_${d.id}`,
    themeStyle: d.id,
    authorName: d.author,
    authorSubtitle: d.sub,
    hasVerified: idx % 2 === 1,
    hasFollowBtn: idx % 2 === 0,
    isCensoredName: idx % 3 === 0,
    bgGradient: `radial-gradient(ellipse at 80% 20%, ${d.bg} 0%, #02080a 50%, #000203 100%)`,
    aura1: d.border,
    aura2: d.shadow,
    aura3: 'rgba(2, 15, 20, 0.7)',
    cardBg: d.card,
    cardBorder: `1.5px solid ${d.border}`,
    cardShadow: `0 25px 65px rgba(0, 0, 0, 0.95), 0 0 35px ${d.shadow}`,
    textColor: '#f1f5f9',
    hookColor: d.hook,
    hlColor: d.hl,
    ctaText: idx % 2 === 0 ? 'Continue Reading...' : 'Part 2 in Comment 👇',
    ctaColor: d.cta,
    hasBottomPill: idx % 2 === 0,
    bottomPillText: idx % 2 === 0 ? 'Full Story In Comment 👇' : '',
  });
});

// =========================================================================
// NHÓM 8: FROSTED CLEAN, ARCTIC GLASS & PURE MINIMALIST (MẪU 191 - 200: 10 MẪU)
// =========================================================================
const frostedDefs = [
  { id: 'scandinavian_glass', name: 'Frosted Scandinavian Glass (Kính Mờ Bắc Âu)', hl: '#38bdf8', hook: '#ffffff', cta: '#0284c7', bg: '#0b1626', card: 'rgba(24, 38, 62, 0.65)', border: 'rgba(255, 255, 255, 0.28)', shadow: 'rgba(255, 255, 255, 0.12)', author: 'Nordic Minimal', sub: '2hrs ago · ❄️ Frosted Glass' },
  { id: 'arctic_white_snowdrift', name: 'Arctic White Snowdrift (Tuyết Trắng Bắc Băng)', hl: '#7dd3fc', hook: '#f8fafc', cta: '#38bdf8', bg: '#0a192c', card: 'rgba(22, 40, 68, 0.68)', border: 'rgba(224, 242, 254, 0.32)', shadow: 'rgba(56, 189, 248, 0.18)', author: 'Arctic Drift', sub: '1hr ago · 🏔️ White Silence' },
  { id: 'clean_pearl_minimal', name: 'Clean Pearl Minimal (Ngọc Trai Trắng Tối Giản)', hl: '#fde047', hook: '#ffffff', cta: '#38bdf8', bg: '#101726', card: 'rgba(26, 36, 56, 0.70)', border: 'rgba(255, 255, 255, 0.25)', shadow: 'rgba(255, 255, 255, 0.10)', author: 'Pearl Minimal', sub: '3hrs ago · 🤍 Pure Clean' },
  { id: 'smoked_quartz', name: 'Smoked Quartz Crystal (Thạch Anh Khói)', hl: '#38bdf8', hook: '#cbd5e1', cta: '#0ea5e9', bg: '#12141c', card: 'rgba(28, 32, 44, 0.72)', border: 'rgba(203, 213, 225, 0.26)', shadow: 'rgba(148, 163, 184, 0.14)', author: 'Smoked Quartz', sub: '4hrs ago · 💎 Translucent' },
  { id: 'frosted_obsidian_window', name: 'Frosted Obsidian Window (Cửa Sổ Đá Phủ Sương)', hl: '#facc15', hook: '#f1f5f9', cta: '#ca8a04', bg: '#0e1017', card: 'rgba(24, 27, 38, 0.74)', border: 'rgba(255, 255, 255, 0.22)', shadow: 'rgba(250, 204, 21, 0.12)', author: 'Frosted Obsidian', sub: '5hrs ago · 🪟 Foggy Night' },
  { id: 'platinum_brushed_metal', name: 'Platinum Brushed Metal (Bạch Kim Phay Xước)', hl: '#38bdf8', hook: '#ffffff', cta: '#0284c7', bg: '#111622', card: 'rgba(28, 36, 52, 0.72)', border: 'rgba(226, 232, 240, 0.32)', shadow: 'rgba(255, 255, 255, 0.10)', author: 'Platinum Grade', sub: '1hr ago · 🪙 Platinum 950' },
  { id: 'acrylic_sheet', name: 'Transparent Acrylic Sheet (Tấm Acrylic Trong Vắt)', hl: '#2dd4bf', hook: '#e0f2fe', cta: '#0d9488', bg: '#0a1824', card: 'rgba(20, 38, 54, 0.65)', border: 'rgba(255, 255, 255, 0.30)', shadow: 'rgba(45, 212, 191, 0.16)', author: 'Acrylic Modern', sub: '2hrs ago · 🧊 See-Through' },
  { id: 'ice_fog_morning', name: 'Ice Fog Morning (Sương Mù Băng Buổi Sáng)', hl: '#7dd3fc', hook: '#f8fafc', cta: '#0284c7', bg: '#091829', card: 'rgba(20, 37, 60, 0.68)', border: 'rgba(186, 230, 253, 0.30)', shadow: 'rgba(56, 189, 248, 0.18)', author: 'Morning Fog', sub: '6hrs ago · 🌫️ Dense Fog' },
  { id: 'silver_linen', name: 'Silver Linen Minimal (Vải Lanh Bạc Sang Trọng)', hl: '#fde047', hook: '#e2e8f0', cta: '#38bdf8', bg: '#11151e', card: 'rgba(26, 32, 46, 0.72)', border: 'rgba(226, 232, 240, 0.25)', shadow: 'rgba(255, 255, 255, 0.08)', author: 'Silver Linen', sub: '3hrs ago · 🧵 Fine Texture' },
  { id: 'diamond_facet', name: 'Diamond Facet Prism (Mặt Cắt Kim Cương Bạc)', hl: '#38bdf8', hook: '#ffffff', cta: '#0ea5e9', bg: '#0d1829', card: 'rgba(24, 38, 62, 0.68)', border: 'rgba(255, 255, 255, 0.35)', shadow: 'rgba(56, 189, 248, 0.22)', author: 'Diamond Prism', sub: 'Just now · 💎 Brilliant Cut' },
];

frostedDefs.forEach((d, idx) => {
  const num = 191 + idx;
  templates.push({
    num,
    name: `Text Story #${String(num).padStart(2, '0')} - ${d.name}`,
    category: 'frosted',
    presetId: `story_${num}_${d.id}`,
    themeStyle: d.id,
    authorName: d.author,
    authorSubtitle: d.sub,
    hasVerified: idx % 2 === 0,
    hasFollowBtn: idx % 3 === 0,
    isCensoredName: false,
    bgGradient: `linear-gradient(135deg, ${d.bg} 0%, #050b14 60%, #010307 100%)`,
    aura1: d.border,
    aura2: d.shadow,
    aura3: 'rgba(255, 255, 255, 0.08)',
    cardBg: d.card,
    cardBorder: `1.5px solid ${d.border}`,
    cardShadow: `0 25px 60px rgba(0, 0, 0, 0.85), 0 0 30px ${d.shadow}`,
    textColor: '#f8fafc',
    hookColor: d.hook,
    hlColor: d.hl,
    ctaText: idx % 2 === 0 ? 'Continue Reading...' : 'Swipe to Reveal 👉',
    ctaColor: d.cta,
    hasBottomPill: idx % 2 === 1,
    bottomPillText: idx % 2 === 1 ? 'Audio On 🔊' : '',
  });
});

console.log(`Đã định nghĩa đủ ${templates.length} mẫu mới (#51 -> #200)!`);

// Tạo file TypeScript
let tsOutput = `/**
 * Danh sách 150 Mẫu Giao Diện Text Story Reel Mới (Mẫu #51 -> #200)
 * TUYỆT ĐỐI KHÔNG SỬ DỤNG MÀU HỒNG VÀ TÍM (Theo AGENTS.md & User Rules)
 * Phân bổ thành 8 nhóm phong cách:
 * - 1. Ocean & Cyan Glow (20 mẫu: #51 - #70)
 * - 2. Emerald, Jade & Ancient Forest (20 mẫu: #71 - #90)
 * - 3. Obsidian, Titanium & Stealth Noir (20 mẫu: #91 - #110)
 * - 4. Gold, Amber & Royal Bronze (20 mẫu: #111 - #130)
 * - 5. Earth, Espresso, Wood & Leather (20 mẫu: #131 - #150)
 * - 6. Crimson Blood & Mystery Thriller (20 mẫu: #151 - #170)
 * - 7. Cyber Tech, Matrix Green & Neon Warning (20 mẫu: #171 - #190)
 * - 8. Frosted Clean & Arctic Glass (10 mẫu: #191 - #200)
 */

import { ZTTeamStoryTemplateItem } from './text_story_50_templates';

export const getTextStory150MoreTemplates = (): ZTTeamStoryTemplateItem[] => [
`;

templates.forEach((t) => {
  tsOutput += `  {
    name: ${JSON.stringify(t.name)},
    format: 'video',
    content_type: 'text_story',
    voice_id: null,
    video_y: 0,
    video_radius: 0,
    html_content: '',
    layout: {
      presetId: ${JSON.stringify(t.presetId)},
      category: ${JSON.stringify(t.category)} as any,
      themeStyle: ${JSON.stringify(t.themeStyle)},
      authorName: ${JSON.stringify(t.authorName)},
      authorSubtitle: ${JSON.stringify(t.authorSubtitle)},
      hasVerified: ${t.hasVerified},
      hasFollowBtn: ${t.hasFollowBtn},
      isCensoredName: ${t.isCensoredName},
      bgGradient: ${JSON.stringify(t.bgGradient)},
      aura1: ${JSON.stringify(t.aura1)},
      aura2: ${JSON.stringify(t.aura2)},
      aura3: ${JSON.stringify(t.aura3)},
      cardBg: ${JSON.stringify(t.cardBg)},
      cardBorder: ${JSON.stringify(t.cardBorder)},
      cardShadow: ${JSON.stringify(t.cardShadow)},
      textColor: ${JSON.stringify(t.textColor)},
      hookColor: ${JSON.stringify(t.hookColor)},
      hlColor: ${JSON.stringify(t.hlColor)},
      ctaText: ${JSON.stringify(t.ctaText)},
      ctaColor: ${JSON.stringify(t.ctaColor)},
      hasBottomPill: ${t.hasBottomPill},
      bottomPillText: ${JSON.stringify(t.bottomPillText)},
    },
    is_default: true,
  },
`;
});

tsOutput += `];\n`;

const targetPath = path.join(__dirname, '../apps/api/src/templates/text_story_150_more_templates.ts');
fs.writeFileSync(targetPath, tsOutput, 'utf8');
console.log(`Đã xuất thành công ra file: ${targetPath}`);
