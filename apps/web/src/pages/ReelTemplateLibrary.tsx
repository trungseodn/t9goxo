import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { useUIStore } from '../stores/uiStore';
import CustomDropdown from '../components/CustomDropdown';

/**
 * 6 Bộ màu sắc Dark Seamless cao cấp, điện ảnh cho Text Story Reel
 * TUYỆT ĐỐI KHÔNG SỬ DỤNG MÀU HỒNG VÀ TÍM (Theo user rules & AGENTS.md)
 */
export interface ZTTeamColorPreset {
  id: string;
  name: string;
  badge: string;
  desc: string;
  bgGradient: string;
  cardBg: string;
  cardBorder: string;
  cardShadow: string;
  hlColor: string;
  hookColor: string;
  ctaColor: string;
  textColor: string;
}

export const ZTTEAM_TEXT_STORY_PALETTES: ZTTeamColorPreset[] = [
  {
    id: 'midnight_sapphire',
    name: 'Midnight Sapphire (Xanh Thẳm Huyền Bí)',
    badge: 'Sapphire Glow',
    desc: 'Card xanh đen phát sáng, chữ vàng hổ phách nổi bật, ánh sáng xanh huyền ảo',
    bgGradient: 'radial-gradient(ellipse at 85% 15%, #05264a 0%, #031226 40%, #01060f 100%)',
    cardBg: 'rgba(5, 19, 41, 0.76)',
    cardBorder: '1.5px solid rgba(56, 189, 248, 0.35)',
    cardShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(56, 189, 248, 0.22)',
    hlColor: '#fbbf24',
    hookColor: '#fbbf24',
    ctaColor: '#38bdf8',
    textColor: '#e2e8f0',
  },
  {
    id: 'emerald_shadow',
    name: 'Emerald Shadow (Lục Bảo Quyền Quý)',
    badge: 'Emerald Deep',
    desc: 'Sắc ngọc lục bảo sâu thẳm, viền xanh phát sáng, highlight xanh ngọc ánh kim',
    bgGradient: 'radial-gradient(ellipse at 80% 20%, #062b1e 0%, #021a11 45%, #010a06 100%)',
    cardBg: 'rgba(4, 28, 19, 0.78)',
    cardBorder: '1.5px solid rgba(52, 211, 153, 0.35)',
    cardShadow: '0 25px 60px rgba(0, 0, 0, 0.92), 0 0 35px rgba(16, 185, 129, 0.25)',
    hlColor: '#34d399',
    hookColor: '#a7f3d0',
    ctaColor: '#6ee7b7',
    textColor: '#f1f5f9',
  },
  {
    id: 'obsidian_gold',
    name: 'Obsidian Gold (Vàng Kim Hoàng Gia)',
    badge: 'Obsidian Gold',
    desc: 'Đen gỗ mun huyền bí kết hợp ánh vàng kim hoàng gia, highlight vàng chanh kịch tính',
    bgGradient: 'radial-gradient(ellipse at 75% 20%, #2a1a08 0%, #0f0a04 45%, #030201 100%)',
    cardBg: 'rgba(18, 12, 6, 0.82)',
    cardBorder: '1.8px solid rgba(234, 179, 8, 0.45)',
    cardShadow: '0 25px 65px rgba(0, 0, 0, 0.95), 0 0 35px rgba(234, 179, 8, 0.25)',
    hlColor: '#fde047',
    hookColor: '#fde047',
    ctaColor: '#fbbf24',
    textColor: '#f8fafc',
  },
  {
    id: 'charcoal_slate',
    name: 'Charcoal Slate (Xám Đen Hiện Đại & Censor)',
    badge: 'Modern Slate',
    desc: 'Đen than hoạt tính tối giản, che mờ tên bí ẩn, highlight vàng kim tương phản cao',
    bgGradient: 'radial-gradient(ellipse at 70% 30%, #18181b 0%, #09090b 50%, #000000 100%)',
    cardBg: 'rgba(24, 24, 27, 0.84)',
    cardBorder: '1.5px solid rgba(148, 163, 184, 0.25)',
    cardShadow: '0 25px 60px rgba(0, 0, 0, 0.95), 0 0 25px rgba(255, 255, 255, 0.08)',
    hlColor: '#facc15',
    hookColor: '#ffffff',
    ctaColor: '#38bdf8',
    textColor: '#f1f5f9',
  },
  {
    id: 'royal_ocean',
    name: 'Royal Ocean (Xanh Lam Biển Sâu)',
    badge: 'Oceanic Deep',
    desc: 'Xanh coban đại dương sâu thẳm, highlight xanh điện quang Neon sắc bén',
    bgGradient: 'radial-gradient(ellipse at 80% 25%, #0c204c 0%, #040c1e 45%, #01040c 100%)',
    cardBg: 'rgba(8, 18, 42, 0.80)',
    cardBorder: '1.8px solid rgba(96, 165, 250, 0.38)',
    cardShadow: '0 32px 85px rgba(0, 0, 0, 0.88), 0 0 45px rgba(37, 99, 235, 0.25)',
    hlColor: '#38bdf8',
    hookColor: '#93c5fd',
    ctaColor: '#60a5fa',
    textColor: '#e6edf5',
  },
  {
    id: 'frosted_clean',
    name: 'Frosted Glass Clean (Kính Mờ Tinh Tế)',
    badge: 'Clean Glass',
    desc: 'Thẻ kính mờ Frosted Glassmorphism đẳng cấp trên nền phiến đá đen, không hồng tím',
    bgGradient: 'linear-gradient(135deg, #091e2f 0%, #0f172a 50%, #020617 100%)',
    cardBg: 'rgba(30, 41, 59, 0.72)',
    cardBorder: '1.5px solid rgba(255, 255, 255, 0.20)',
    cardShadow: '0 25px 60px rgba(0, 0, 0, 0.8), 0 0 25px rgba(255, 255, 255, 0.1)',
    hlColor: '#38bdf8',
    hookColor: '#38bdf8',
    ctaColor: '#38bdf8',
    textColor: '#f8fafc',
  },
];

const DEFAULT_SAMPLE_STORY = `My parents demanded 50% of my salary, so I gave them exactly what they asked for. The day after discovering how much I earned, my parents showed up at my apartment—with a calculator. Dad sat down and announced, "Half your monthly income is fair. We raised you." Mom nodded. "It's time you gave back." They forgot all the years I had spent paying their bills, covering their rent, and watching my own dreams disappear while they spent my money. Then Dad placed a "family support agreement" in front of me. My name was already typed on the signature line. I didn't argue. I simply walked to my desk and returned with an envelope. "Fine," I said. "Here's what I owe you." Mom opened it. Her smile vanished. Dad stopped breathing. Because inside was something they had never expected to see...`;

const DEFAULT_SAMPLE_HIGHLIGHTS = [
  '50% of my salary',
  'The day after discovering how much I earned',
  'They forgot all the years I had spent paying their bills',
  'Because inside was something they had never expected to see...',
];

export default function ReelTemplateLibrary() {
  const { ztteam_showToast, ztteam_showConfirm } = useUIStore();

  /** Danh sách Template đã lưu trong Database */
  const [templates, setTemplates] = useState<any[]>([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState<string | null>(null);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(true);

  /** Bộ lọc danh mục & Tìm kiếm trong Kho Mẫu */
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterSearch, setFilterSearch] = useState<string>('');

  /** Form state tùy biến mẫu */
  const [templateName, setTemplateName] = useState<string>('Text Story - Mẫu Tùy Chỉnh Mới');
  const [bgGradient, setBgGradient] = useState<string>(ZTTEAM_TEXT_STORY_PALETTES[0].bgGradient);
  const [cardBg, setCardBg] = useState<string>(ZTTEAM_TEXT_STORY_PALETTES[0].cardBg);
  const [cardBorder, setCardBorder] = useState<string>(ZTTEAM_TEXT_STORY_PALETTES[0].cardBorder);
  const [cardShadow, setCardShadow] = useState<string>(ZTTEAM_TEXT_STORY_PALETTES[0].cardShadow);
  const [hlColor, setHlColor] = useState<string>(ZTTEAM_TEXT_STORY_PALETTES[0].hlColor);
  const [hookColor, setHookColor] = useState<string>(ZTTEAM_TEXT_STORY_PALETTES[0].hookColor);
  const [ctaColor, setCtaColor] = useState<string>(ZTTEAM_TEXT_STORY_PALETTES[0].ctaColor);
  const [textColor, setTextColor] = useState<string>(ZTTEAM_TEXT_STORY_PALETTES[0].textColor);
  const [ctaText, setCtaText] = useState<string>('Continue Reading...');

  /** Header & Branding */
  const [authorName, setAuthorName] = useState<string>('Derek West');
  const [authorSubtitle, setAuthorSubtitle] = useState<string>('4hrs ago · A Text Story');
  const [hasVerified, setHasVerified] = useState<boolean>(true);
  const [hasFollowBtn, setHasFollowBtn] = useState<boolean>(false);
  const [isCensoredName, setIsCensoredName] = useState<boolean>(false);

  /** Footer & Bottom Pill */
  const [hasBottomPill, setHasBottomPill] = useState<boolean>(false);
  const [bottomPillText, setBottomPillText] = useState<string>('Full Story In Comment 👇');

  /** Typography & Text */
  const [storyContent, setStoryContent] = useState<string>(DEFAULT_SAMPLE_STORY);
  const [highlightInput, setHighlightInput] = useState<string>(DEFAULT_SAMPLE_HIGHLIGHTS.join('\n'));
  const [fontSize, setFontSize] = useState<number>(14);
  const [lineHeight, setLineHeight] = useState<number>(1.35);

  /** Fanpage List để xem thử & Gán */
  const [pages, setPages] = useState<any[]>([]);
  const [previewPageId, setPreviewPageId] = useState<string>('');
  const [selectedPageForApply, setSelectedPageForApply] = useState<string>('');
  const [isApplying, setIsApplying] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  /** Active Tab Điều Khiển */
  const [activeTab, setActiveTab] = useState<'palette' | 'branding' | 'text' | 'footer' | 'apply'>('palette');

  /** Tải danh sách Template và Fanpage */
  useEffect(() => {
    ztteam_loadTemplates();
    ztteam_loadPages();
  }, []);

  const ztteam_loadTemplates = async () => {
    try {
      setIsLoadingTemplates(true);
      const res = await api.get('templates?format=video');
      if (Array.isArray(res.data)) {
        const textStories = res.data.filter((t: any) => t.content_type === 'text_story');
        setTemplates(textStories);
        if (textStories.length > 0 && !selectedTemplateId) {
          ztteam_populateTemplate(textStories[0]);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingTemplates(false);
    }
  };

  const ztteam_loadPages = async () => {
    try {
      const res = await api.get('facebook/pages');
      setPages(res.data || []);
    } catch (err) {
      /** ignore */
    }
  };

  /** Nạp thông tin template vào Editor */
  const ztteam_populateTemplate = (tpl: any) => {
    setSelectedTemplateId(tpl.id);
    setTemplateName(tpl.name || 'Text Story Mẫu');
    const layout = tpl.layout || {};

    setBgGradient(layout.bgGradient || ZTTEAM_TEXT_STORY_PALETTES[0].bgGradient);
    setCardBg(layout.cardBg || ZTTEAM_TEXT_STORY_PALETTES[0].cardBg);
    setCardBorder(layout.cardBorder || ZTTEAM_TEXT_STORY_PALETTES[0].cardBorder);
    setCardShadow(layout.cardShadow || ZTTEAM_TEXT_STORY_PALETTES[0].cardShadow);
    setHlColor(layout.hlColor || ZTTEAM_TEXT_STORY_PALETTES[0].hlColor);
    setHookColor(layout.hookColor || ZTTEAM_TEXT_STORY_PALETTES[0].hookColor);
    setCtaColor(layout.ctaColor || ZTTEAM_TEXT_STORY_PALETTES[0].ctaColor);
    setTextColor(layout.textColor || ZTTEAM_TEXT_STORY_PALETTES[0].textColor);
    setCtaText(layout.ctaText || 'Continue Reading...');

    setAuthorName(layout.authorName || 'Derek West');
    setAuthorSubtitle(layout.authorSubtitle || '4hrs ago · A Text Story');
    setHasVerified(layout.hasVerified !== undefined ? Boolean(layout.hasVerified) : true);
    setHasFollowBtn(layout.hasFollowBtn !== undefined ? Boolean(layout.hasFollowBtn) : false);
    setIsCensoredName(layout.isCensoredName !== undefined ? Boolean(layout.isCensoredName) : false);

    setHasBottomPill(layout.hasBottomPill !== undefined ? Boolean(layout.hasBottomPill) : false);
    setBottomPillText(layout.bottomPillText || 'Full Story In Comment 👇');
    setFontSize(layout.fontSize || 14);
    setLineHeight(layout.lineHeight || 1.35);
  };

  /** Tạo Mẫu Mới */
  const ztteam_handleNewTemplate = () => {
    setSelectedTemplateId(null);
    setTemplateName('Text Story - Mẫu Mới Tùy Chỉnh');
    ztteam_applyColorPreset(ZTTEAM_TEXT_STORY_PALETTES[0]);
    setAuthorName('ZTTeam Channel');
    setAuthorSubtitle('2hrs ago · Viral Reel');
    setHasVerified(true);
    setHasFollowBtn(false);
    setIsCensoredName(false);
    setHasBottomPill(false);
    setBottomPillText('Full Story In Comment 👇');
    setCtaText('Continue Reading...');
    ztteam_showToast('Đã chuyển sang chế độ tạo mẫu mới', 'info');
  };

  /** Áp dụng 1 bộ màu có sẵn */
  const ztteam_applyColorPreset = (preset: ZTTeamColorPreset) => {
    setBgGradient(preset.bgGradient);
    setCardBg(preset.cardBg);
    setCardBorder(preset.cardBorder);
    setCardShadow(preset.cardShadow);
    setHlColor(preset.hlColor);
    setHookColor(preset.hookColor);
    setCtaColor(preset.ctaColor);
    setTextColor(preset.textColor);
    ztteam_showToast(`Đã áp dụng bộ màu: ${preset.name}`, 'success');
  };

  /** Xử lý highlight từ khóa */
  const highlightPhrases = highlightInput
    .split('\n')
    .map((s) => s.trim())
    .filter(Boolean);

  const ztteam_renderHighlightedText = (text: string) => {
    if (!highlightPhrases || highlightPhrases.length === 0) {
      return <span>{text}</span>;
    }

    const sortedPhrases = [...highlightPhrases].sort((a, b) => b.length - a.length);
    const escaped = sortedPhrases.map((p) => p.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|');
    if (!escaped) return <span>{text}</span>;

    const regex = new RegExp(`(${escaped})`, 'gi');
    const parts = text.split(regex);

    return parts.map((part, idx) => {
      const isMatch = sortedPhrases.some((p) => p.toLowerCase() === part.toLowerCase());
      if (isMatch) {
        return (
          <span
            key={idx}
            style={{ color: hlColor }}
            className="font-black drop-shadow-xs"
          >
            {part}
          </span>
        );
      }
      return <span key={idx}>{part}</span>;
    });
  };

  /** Tính toán hiển thị xem trước với Fanpage thực tế */
  const previewPage = pages.find((p) => p.id === previewPageId || p.fb_page_id === previewPageId);
  const displayAuthorName = previewPage ? previewPage.name : authorName;
  const displayAvatar = previewPage?.avatar || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150';

  const CATEGORY_TABS = [
    { id: 'all', label: 'Tất cả' },
    { id: 'ocean', label: '🌊 Lam & Cyan' },
    { id: 'emerald', label: '🌲 Lục Bảo' },
    { id: 'obsidian', label: '🌑 Đen Obsidian' },
    { id: 'gold', label: '👑 Vàng Hổ Phách' },
    { id: 'earth', label: '☕ Cà Phê & Gỗ' },
    { id: 'crimson', label: '🔥 Đỏ Kịch Tính' },
    { id: 'cyber', label: '⚡ Cyber Tech' },
    { id: 'frosted', label: '❄️ Kính Mờ & Băng' },
  ];

  const filteredTemplates = templates.filter((tpl) => {
    const layout = tpl.layout || {};
    const tplCategory = layout.category || '';
    const tplName = (tpl.name || '').toLowerCase();
    const tplAuthor = (layout.authorName || '').toLowerCase();
    const tplSubtitle = (layout.authorSubtitle || '').toLowerCase();
    const tplTheme = (layout.themeStyle || '').toLowerCase();

    // Lọc theo Category
    if (filterCategory !== 'all') {
      if (tplCategory !== filterCategory) {
        const matchesCategory =
          (filterCategory === 'ocean' && (tplName.includes('ocean') || tplName.includes('sapphire') || tplName.includes('cyan') || tplName.includes('arctic') || tplName.includes('biển') || tplName.includes('trench') || tplName.includes('glacier'))) ||
          (filterCategory === 'emerald' && (tplName.includes('emerald') || tplName.includes('forest') || tplName.includes('lục bảo') || tplName.includes('jade') || tplName.includes('mint') || tplName.includes('pine') || tplName.includes('moss') || tplName.includes('rừng'))) ||
          (filterCategory === 'obsidian' && (tplName.includes('obsidian') || tplName.includes('charcoal') || tplName.includes('slate') || tplName.includes('mono') || tplName.includes('đen') || tplName.includes('titanium') || tplName.includes('stealth') || tplName.includes('noir'))) ||
          (filterCategory === 'gold' && (tplName.includes('gold') || tplName.includes('amber') || tplName.includes('vàng') || tplName.includes('bronze') || tplName.includes('citrus') || tplName.includes('honey') || tplName.includes('midas') || tplName.includes('pharaoh'))) ||
          (filterCategory === 'earth' && (tplName.includes('espresso') || tplName.includes('wood') || tplName.includes('cà phê') || tplName.includes('walnut') || tplName.includes('mocha') || tplName.includes('chocolate') || tplName.includes('gỗ') || tplName.includes('leather'))) ||
          (filterCategory === 'crimson' && (tplName.includes('crimson') || tplName.includes('ruby') || tplName.includes('blood') || tplName.includes('red') || tplName.includes('đỏ') || tplName.includes('dracula') || tplName.includes('garnet') || tplName.includes('burgundy'))) ||
          (filterCategory === 'cyber' && (tplName.includes('cyber') || tplName.includes('matrix') || tplName.includes('hud') || tplName.includes('quantum') || tplName.includes('hacker') || tplName.includes('radar') || tplName.includes('voltage') || tplName.includes('hazard'))) ||
          (filterCategory === 'frosted' && (tplName.includes('frosted') || tplName.includes('kính') || tplName.includes('băng') || tplName.includes('pearl') || tplName.includes('quartz') || tplName.includes('acrylic') || tplName.includes('snow') || tplName.includes('platinum')));
        if (!matchesCategory) return false;
      }
    }

    // Lọc theo ô tìm kiếm
    if (filterSearch.trim()) {
      const q = filterSearch.toLowerCase().trim();
      const match = tplName.includes(q) || tplAuthor.includes(q) || tplSubtitle.includes(q) || tplTheme.includes(q);
      if (!match) return false;
    }

    return true;
  });

  /** Lưu / Cập nhật template */
  const ztteam_saveTemplate = async () => {
    try {
      setIsSaving(true);
      const payload = {
        name: templateName.trim() || 'Text Story Mẫu',
        format: 'video',
        content_type: 'text_story',
        layout: {
          bgGradient,
          cardBg,
          cardBorder,
          cardShadow,
          hlColor,
          hookColor,
          ctaColor,
          textColor,
          ctaText,
          authorName,
          authorSubtitle,
          hasVerified,
          hasFollowBtn,
          isCensoredName,
          hasBottomPill,
          bottomPillText,
          fontSize,
          lineHeight,
        },
      };

      if (selectedTemplateId) {
        await api.put(`templates/${selectedTemplateId}`, payload);
        ztteam_showToast(`Đã cập nhật mẫu "${templateName}" thành công!`, 'success');
      } else {
        const res = await api.post('templates', payload);
        setSelectedTemplateId(res.data?.id || null);
        ztteam_showToast(`Đã lưu mẫu mới "${templateName}" vào Kho Giao Diện!`, 'success');
      }
      await ztteam_loadTemplates();
    } catch (err: any) {
      ztteam_showToast(err.response?.data?.message || 'Lỗi khi lưu mẫu giao diện', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  /** Nhân bản Template */
  const ztteam_duplicateTemplate = async (tplId: string) => {
    try {
      setIsSaving(true);
      const res = await api.post(`templates/${tplId}/duplicate`, {});
      ztteam_showToast('Đã nhân bản mẫu thành công!', 'success');
      await ztteam_loadTemplates();
      if (res.data) {
        ztteam_populateTemplate(res.data);
      }
    } catch (err: any) {
      ztteam_showToast(err.response?.data?.message || 'Lỗi khi nhân bản mẫu', 'error');
    } finally {
      setIsSaving(false);
    }
  };

  /** Xóa Template */
  const ztteam_deleteTemplate = async (tpl: any) => {
    const confirmed = await ztteam_showConfirm(
      'Xóa mẫu giao diện',
      `Bạn có chắc chắn muốn xóa mẫu "${tpl.name}" khỏi Kho Giao Diện Reel không?`
    );
    if (!confirmed) return;

    try {
      await api.delete(`templates/${tpl.id}`);
      ztteam_showToast(`Đã xóa mẫu "${tpl.name}" thành công!`, 'success');
      await ztteam_loadTemplates();
    } catch (err: any) {
      ztteam_showToast(err.response?.data?.message || 'Lỗi khi xóa mẫu', 'error');
    }
  };

  /** Gán mẫu cho Fanpage */
  const ztteam_applyToFanpage = async () => {
    if (!selectedPageForApply) {
      ztteam_showToast('Vui lòng chọn Fanpage muốn áp dụng', 'error');
      return;
    }

    const confirmed = await ztteam_showConfirm(
      'Áp dụng mẫu giao diện cho Fanpage',
      `Bạn có muốn thiết lập Fanpage này sử dụng công nghệ Text Story Reel với mẫu "${templateName}" không?`
    );
    if (!confirmed) return;

    try {
      setIsApplying(true);
      await api.put(`facebook/pages/${selectedPageForApply}/settings`, {
        video_engine: 'text_story',
        default_reel_template_id: selectedTemplateId || null,
      });
      ztteam_showToast(`Đã gắn mẫu "${templateName}" cho Fanpage thành công!`, 'success');
    } catch (err: any) {
      ztteam_showToast(err.response?.data?.message || 'Lỗi khi áp dụng cho Fanpage', 'error');
    } finally {
      setIsApplying(false);
    }
  };

  return (
    <div className="w-full space-y-6 animate-in fade-in duration-300 pb-12">
      {/** 1. Header Banner */}
      <div className="bg-fb-surface rounded-2xl shadow-lg p-6 flex flex-col md:flex-row md:items-center justify-between gap-4 border border-fb-surface-hover/60">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/15 text-blue-400 border border-blue-500/30">
              Text Story Reel Studio
            </span>
            <span className="text-xs text-fb-text-muted">• Tỉ lệ 9:16 (1080x1920 2K)</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-fb-text tracking-tight flex items-center gap-2.5">
            <span className="material-symbols-outlined text-cyan-400 text-3xl">auto_stories</span>
            Kho Giao Diện Reel (Text Story)
          </h2>
          <p className="text-xs sm:text-sm font-medium text-fb-text-muted mt-1 leading-relaxed max-w-3xl">
            Tùy biến và lưu trữ kho mẫu giao diện Text Story Reel: Card kính mờ Frosted Glass, Tích xanh Verified, Nút Follow, Censor Tên Page, Highlight từ khóa AI kịch tính và chế độ Random tự động cho Fanpage.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            type="button"
            onClick={ztteam_handleNewTemplate}
            className="flex items-center gap-1.5 px-4 py-2.5 bg-fb-surface-hover hover:bg-fb-surface-hover/80 text-fb-text rounded-xl text-xs font-bold transition-all border border-white/10 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[17px] text-cyan-400">add_circle</span>
            <span>Tạo Mẫu Mới</span>
          </button>

          <button
            type="button"
            onClick={ztteam_saveTemplate}
            disabled={isSaving}
            className="flex items-center gap-1.5 px-5 py-2.5 bg-gradient-to-r from-fb-blue to-cyan-500 hover:from-fb-blue-hover hover:to-cyan-600 text-white rounded-xl text-xs font-bold transition-all shadow-md shadow-blue-500/20 cursor-pointer disabled:opacity-50"
          >
            <span className={`material-symbols-outlined text-[17px] ${isSaving ? 'animate-spin' : ''}`}>
              {isSaving ? 'sync' : 'save'}
            </span>
            <span>{isSaving ? 'Đang lưu...' : selectedTemplateId ? 'Cập Nhật Mẫu' : 'Lưu Vào Kho Mẫu'}</span>
          </button>
        </div>
      </div>

      {/** 2. DANH SÁCH MẪU TRONG KHO (LOAD TỪ DATABASE) */}
      <div className="bg-fb-surface rounded-2xl p-5 shadow-lg border border-fb-surface-hover/60 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-400 text-xl">folder_special</span>
            <h3 className="text-sm font-black text-fb-text uppercase tracking-wide">
              Các Mẫu Đang Có Trong Kho ({templates.length})
            </h3>
          </div>
          {/** Ô Tìm Kiếm */}
          <div className="relative w-full sm:w-72">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-fb-text-muted text-base">
              search
            </span>
            <input
              type="text"
              value={filterSearch}
              onChange={(e) => setFilterSearch(e.target.value)}
              placeholder="Tìm theo tên, màu sắc, phong cách..."
              className="w-full pl-9 pr-8 py-1.5 bg-fb-surface-hover/50 border border-white/10 rounded-xl text-xs text-fb-text placeholder-fb-text-muted focus:outline-hidden focus:border-cyan-400"
            />
            {filterSearch && (
              <button
                type="button"
                onClick={() => setFilterSearch('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-fb-text-muted hover:text-white"
              >
                <span className="material-symbols-outlined text-sm">close</span>
              </button>
            )}
          </div>
        </div>

        {/** Thanh Tab Phân Loại Category */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 border-b border-fb-surface-hover/50 scrollbar-none">
          {CATEGORY_TABS.map((tab) => {
            const count = tab.id === 'all'
              ? templates.length
              : templates.filter(t => {
                  const cat = t.layout?.category;
                  if (cat === tab.id) return true;
                  const nm = (t.name || '').toLowerCase();
                  if (tab.id === 'ocean') return nm.includes('ocean') || nm.includes('cyan') || nm.includes('sapphire') || nm.includes('arctic') || nm.includes('biển') || nm.includes('trench') || nm.includes('glacier');
                  if (tab.id === 'emerald') return nm.includes('emerald') || nm.includes('forest') || nm.includes('lục bảo') || nm.includes('jade') || nm.includes('mint') || nm.includes('pine') || nm.includes('moss') || nm.includes('rừng');
                  if (tab.id === 'obsidian') return nm.includes('obsidian') || nm.includes('slate') || nm.includes('mono') || nm.includes('charcoal') || nm.includes('đen') || nm.includes('titanium') || nm.includes('stealth') || nm.includes('noir');
                  if (tab.id === 'gold') return nm.includes('gold') || nm.includes('amber') || nm.includes('vàng') || nm.includes('bronze') || nm.includes('citrus') || nm.includes('honey') || nm.includes('midas') || nm.includes('pharaoh');
                  if (tab.id === 'earth') return nm.includes('espresso') || nm.includes('wood') || nm.includes('cà phê') || nm.includes('walnut') || nm.includes('mocha') || nm.includes('chocolate') || nm.includes('gỗ') || nm.includes('leather');
                  if (tab.id === 'crimson') return nm.includes('crimson') || nm.includes('ruby') || nm.includes('blood') || nm.includes('red') || nm.includes('đỏ') || nm.includes('dracula') || nm.includes('garnet') || nm.includes('burgundy');
                  if (tab.id === 'cyber') return nm.includes('cyber') || nm.includes('matrix') || nm.includes('hud') || nm.includes('quantum') || nm.includes('hacker') || nm.includes('radar') || nm.includes('voltage') || nm.includes('hazard');
                  if (tab.id === 'frosted') return nm.includes('frosted') || nm.includes('kính') || nm.includes('băng') || nm.includes('pearl') || nm.includes('quartz') || nm.includes('acrylic') || nm.includes('snow') || nm.includes('platinum');
                  return false;
                }).length;
            const isActive = filterCategory === tab.id;

            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setFilterCategory(tab.id)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all flex items-center gap-1.5 cursor-pointer ${
                  isActive
                    ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 shadow-xs'
                    : 'bg-fb-surface-hover/40 text-fb-text-muted hover:text-fb-text hover:bg-fb-surface-hover border border-transparent'
                }`}
              >
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-mono ${
                  isActive ? 'bg-cyan-500/25 text-cyan-300' : 'bg-black/30 text-slate-400'
                }`}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {isLoadingTemplates ? (
          <div className="py-6 text-center text-xs text-fb-text-muted flex items-center justify-center gap-2">
            <span className="material-symbols-outlined animate-spin text-fb-blue">sync</span>
            <span>Đang nạp danh sách mẫu từ hệ thống...</span>
          </div>
        ) : filteredTemplates.length === 0 ? (
          <div className="py-8 text-center text-xs text-fb-text-muted space-y-2">
            <p>Không tìm thấy mẫu nào phù hợp với bộ lọc hiện tại.</p>
            {(filterSearch || filterCategory !== 'all') && (
              <button
                type="button"
                onClick={() => { setFilterCategory('all'); setFilterSearch(''); }}
                className="text-cyan-400 hover:underline font-bold inline-block cursor-pointer"
              >
                Xóa bộ lọc & hiển thị tất cả ({templates.length} mẫu)
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-3.5 max-h-[460px] overflow-y-auto pr-1">
            {filteredTemplates.map((tpl) => {
              const isSelected = selectedTemplateId === tpl.id;
              const tplHl = tpl.layout?.hlColor || '#fbbf24';
              const tplBg = tpl.layout?.bgGradient || '#0f172a';

              return (
                <div
                  key={tpl.id}
                  onClick={() => ztteam_populateTemplate(tpl)}
                  className={`p-3.5 rounded-xl cursor-pointer transition-all border relative flex flex-col justify-between ${
                    isSelected
                      ? 'bg-fb-surface-hover/90 border-cyan-400 shadow-lg shadow-cyan-500/10 ring-2 ring-cyan-400/25'
                      : 'bg-fb-surface-hover/30 border-white/5 hover:bg-fb-surface-hover hover:border-white/20'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <span
                          className="w-3.5 h-3.5 rounded-full border border-white/20 shrink-0 shadow-xs"
                          style={{ background: tplHl }}
                          title={`Màu highlight: ${tplHl}`}
                        />
                        <span className="text-[10px] font-bold text-fb-text-muted truncate max-w-[120px]">
                          {tpl.layout?.authorName || 'Text Story'}
                        </span>
                      </div>
                      {isSelected ? (
                        <span className="material-symbols-outlined text-cyan-400 text-lg">check_circle</span>
                      ) : (
                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            type="button"
                            onClick={() => ztteam_duplicateTemplate(tpl.id)}
                            className="p-1 text-fb-text-muted hover:text-cyan-400 rounded-lg hover:bg-white/5"
                            title="Nhân bản mẫu này"
                          >
                            <span className="material-symbols-outlined text-[15px]">content_copy</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => ztteam_deleteTemplate(tpl)}
                            className="p-1 text-fb-text-muted hover:text-rose-400 rounded-lg hover:bg-white/5"
                            title="Xóa mẫu này"
                          >
                            <span className="material-symbols-outlined text-[15px]">delete</span>
                          </button>
                        </div>
                      )}
                    </div>

                    <h4 className="text-xs font-black text-fb-text truncate">{tpl.name}</h4>
                    <p className="text-[10px] text-fb-text-muted mt-0.5 line-clamp-1">
                      {tpl.layout?.authorSubtitle || 'A Text Story'}
                    </p>
                  </div>

                  <div className="mt-2.5 pt-2 border-t border-white/5 flex items-center justify-between text-[10px]">
                    <span className="text-fb-text-muted font-medium flex items-center gap-1">
                      {tpl.layout?.isCensoredName && (
                        <span className="px-1.5 py-0.2 rounded bg-amber-500/20 text-amber-300 font-bold">Censor</span>
                      )}
                      {tpl.layout?.hasVerified && (
                        <span className="material-symbols-outlined text-blue-400 text-[13px]">verified</span>
                      )}
                      {tpl.layout?.hasFollowBtn && (
                        <span className="text-blue-400 font-bold">+Follow</span>
                      )}
                    </span>
                    <span className="text-cyan-400 font-bold">Chọn ➔</span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/** 3. KHU VỰC THIẾT KẾ: LIVE PREVIEW (CỘT TRÁI) + BẢNG ĐIỀU KHIỂN (CỘT PHẢI) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/** CỘT TRÁI: LIVE 9:16 PHONE MOCKUP (45% Width) */}
        <div className="lg:col-span-5 flex flex-col items-center">
          {/** Tùy chọn xem trước với Fanpage thực tế */}
          <div className="w-full max-w-[380px] mb-3 bg-fb-surface p-3 rounded-2xl border border-fb-surface-hover/60">
            <label className="block text-[11px] font-bold text-fb-text uppercase mb-1.5 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-cyan-400 text-[15px]">visibility</span>
              <span>Xem Thử Trực Quan Với Fanpage:</span>
            </label>
            <CustomDropdown
              value={previewPageId}
              onChange={(val) => setPreviewPageId(String(val))}
              options={[
                { value: '', label: `✨ Mặc định xem thử (${authorName})` },
                ...pages.map((p) => ({
                  value: p.id,
                  label: `📄 ${p.name} (Tên & Avatar thật)`,
                })),
              ]}
              className="w-full text-xs"
            />
            <p className="text-[10px] text-fb-text-muted mt-1 leading-tight">
              💡 Khi render Reel thật, hệ thống sẽ tự động gán Tên & Avatar của chính Fanpage được áp dụng.
            </p>
          </div>

          {/** Phone Device Bezel */}
          <div className="w-[340px] sm:w-[380px] h-[670px] sm:h-[720px] bg-slate-950 rounded-[44px] p-3.5 shadow-2xl border-4 border-slate-800 relative flex flex-col overflow-hidden">
            {/** Phone Notch */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-28 h-4 bg-slate-900 rounded-full z-30" />

            {/** Màn Hình Reel 9:16 Content */}
            <div
              className="w-full h-full rounded-[34px] overflow-hidden relative flex flex-col justify-between p-4 transition-all select-none"
              style={{ background: bgGradient }}
            >
              {/** Quầng sáng mờ huyền ảo trong nền */}
              <div className="absolute top-10 right-0 w-44 h-44 bg-cyan-400/20 rounded-full blur-2xl pointer-events-none" />
              <div className="absolute bottom-16 left-0 w-44 h-44 bg-amber-400/15 rounded-full blur-2xl pointer-events-none" />

              {/** KHUNG TRUYỆN TRUNG TÂM (CARD CHÍNH) */}
              <div
                className="w-full my-auto rounded-2xl p-4 flex flex-col justify-between transition-all relative z-10"
                style={{
                  background: cardBg,
                  border: cardBorder,
                  boxShadow: cardShadow,
                  backdropFilter: 'blur(24px)',
                  WebkitBackdropFilter: 'blur(24px)',
                }}
              >
                {/** Header của Card */}
                <div className="flex items-center justify-between pb-3 border-b border-white/10">
                  <div className="flex items-center gap-2.5 min-w-0">
                    {/** Avatar Fanpage / Author */}
                    <div className="relative shrink-0">
                      <img
                        src={displayAvatar}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full object-cover shadow-md"
                        style={{ border: `2px solid ${hookColor}` }}
                        onError={(e: any) => {
                          e.target.onerror = null;
                          e.target.src = 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150';
                        }}
                      />
                    </div>

                    {/** Tên & Meta */}
                    <div className="min-w-0">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span
                          className={`text-xs font-black truncate leading-tight ${
                            isCensoredName ? 'blur-[3.5px] select-none' : ''
                          }`}
                          style={{ color: '#ffffff' }}
                        >
                          {displayAuthorName}
                        </span>

                        {/** Tích xanh Verified */}
                        {hasVerified && (
                          <svg className="w-3.5 h-3.5 shrink-0 text-[#1877F2]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1.2 14.2l-3.5-3.5 1.4-1.4 2.1 2.1 5.6-5.6 1.4 1.4-7 7z" />
                          </svg>
                        )}

                        {/** Follow Button kiểu Facebook */}
                        {hasFollowBtn && (
                          <span className="px-2 py-0.5 rounded text-[9px] font-black bg-[#1877F2] text-white flex items-center gap-0.5 shrink-0 shadow-xs">
                            <span>+</span>
                            <span>Follow</span>
                          </span>
                        )}
                      </div>

                      <div className="text-[10px] font-medium text-slate-400 flex items-center gap-1 mt-0.5 truncate">
                        <span>{authorSubtitle}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/** Nội dung truyện & Typography */}
                <div className="py-3">
                  <p
                    className="font-bold tracking-tight text-left leading-snug whitespace-pre-line"
                    style={{
                      fontSize: `${fontSize}px`,
                      lineHeight: lineHeight,
                      color: textColor,
                      fontFamily: "'Barlow Condensed', 'Montserrat', sans-serif",
                    }}
                  >
                    {ztteam_renderHighlightedText(storyContent)}
                  </p>
                </div>

                {/** Nút Continue Reading ở góc đáy của Card */}
                <div className="pt-2 text-right">
                  <span
                    className="text-xs font-black tracking-wide inline-block"
                    style={{ color: ctaColor }}
                  >
                    {ctaText}
                  </span>
                </div>
              </div>

              {/** BANNER PILL ĐÁY ("Full Story In Comment") */}
              {hasBottomPill && (
                <div className="w-full mt-2 z-10 animate-pulse">
                  <div className="mx-auto w-fit px-4 py-1.5 rounded-full bg-black/85 border border-emerald-500/40 shadow-lg flex items-center gap-1.5 text-xs font-black text-emerald-400">
                    <span>{bottomPillText}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/** CỘT PHẢI: BẢNG TÙY BIẾN THÔNG SỐ (55% Width) */}
        <div className="lg:col-span-7 bg-fb-surface rounded-2xl p-6 shadow-lg border border-fb-surface-hover/60 space-y-6">
          {/** Tên mẫu giao diện */}
          <div>
            <label className="block text-xs font-bold text-fb-text uppercase mb-1.5">
              Tên Mẫu Giao Diện (Text Story Template Name)
            </label>
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              placeholder="VD: Text Story - Sapphire Emerald Dark..."
              className="w-full bg-fb-surface-hover text-fb-text text-xs font-black p-2.5 rounded-xl border border-white/5 focus:outline-none focus:ring-1 focus:ring-fb-blue"
            />
          </div>

          {/** Tabs điều khiển */}
          <div className="flex items-center gap-2 border-b border-fb-surface-hover/60 pb-3 flex-wrap">
            {[
              { id: 'palette', label: 'Màu Sắc & Nền', icon: 'palette' },
              { id: 'branding', label: 'Thương Hiệu & Header', icon: 'badge' },
              { id: 'text', label: 'Nội Dung & Highlight', icon: 'format_color_text' },
              { id: 'footer', label: 'CTA & Nút Đáy', icon: 'call_to_action' },
              { id: 'apply', label: 'Gán Cho Fanpage', icon: 'send_to_mobile' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-fb-blue text-white shadow-md shadow-blue-500/20'
                    : 'text-fb-text-muted hover:text-fb-text hover:bg-fb-surface-hover'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </div>

          {/** TAB 1: MÀU SẮC & NỀN (PALETTE & BACKGROUND) */}
          {activeTab === 'palette' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-bold text-cyan-400 uppercase tracking-wide mb-2">
                  Bộ Màu Điện Ảnh Có Sẵn (1-Click Áp Dụng - Chuẩn Không Hồng / Tím)
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {ZTTEAM_TEXT_STORY_PALETTES.map((preset) => (
                    <div
                      key={preset.id}
                      onClick={() => ztteam_applyColorPreset(preset)}
                      className="p-3 rounded-xl bg-fb-surface-hover/40 border border-white/5 hover:border-cyan-400/60 cursor-pointer transition-all hover:bg-fb-surface-hover flex items-center justify-between"
                    >
                      <div className="flex items-center gap-2.5">
                        <span
                          className="w-5 h-5 rounded-full border border-white/20 shrink-0 shadow-sm"
                          style={{ background: preset.hlColor }}
                        />
                        <div>
                          <h5 className="text-xs font-black text-fb-text">{preset.badge}</h5>
                          <p className="text-[10px] text-fb-text-muted line-clamp-1">{preset.name}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-cyan-400">Chọn</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-fb-surface-hover/40 space-y-3.5">
                <label className="block text-xs font-bold text-fb-text uppercase tracking-wide">
                  Tùy Biến Chi Tiết Màu Sắc & Thẻ Kính (CSS Tokens)
                </label>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-fb-text">Background Gradient Nền Reel:</span>
                  </div>
                  <input
                    type="text"
                    value={bgGradient}
                    onChange={(e) => setBgGradient(e.target.value)}
                    className="w-full bg-fb-surface-hover text-cyan-300 text-xs font-mono p-2 rounded-xl border border-white/5 focus:outline-none focus:ring-1 focus:ring-fb-blue"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <span className="block text-xs font-bold text-fb-text mb-1">Nền Thẻ Card (cardBg):</span>
                    <input
                      type="text"
                      value={cardBg}
                      onChange={(e) => setCardBg(e.target.value)}
                      className="w-full bg-fb-surface-hover text-slate-300 text-xs font-mono p-2 rounded-xl border border-white/5"
                    />
                  </div>
                  <div>
                    <span className="block text-xs font-bold text-fb-text mb-1">Viền Thẻ Card (cardBorder):</span>
                    <input
                      type="text"
                      value={cardBorder}
                      onChange={(e) => setCardBorder(e.target.value)}
                      className="w-full bg-fb-surface-hover text-slate-300 text-xs font-mono p-2 rounded-xl border border-white/5"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <span className="block text-xs font-bold text-amber-400 mb-1">Màu Highlight (hlColor):</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={hlColor}
                        onChange={(e) => setHlColor(e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={hlColor}
                        onChange={(e) => setHlColor(e.target.value)}
                        className="w-full bg-fb-surface-hover text-amber-300 text-xs font-mono p-1.5 rounded-lg border border-white/5"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-bold text-amber-300 mb-1">Màu Hook Quote (hookColor):</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={hookColor}
                        onChange={(e) => setHookColor(e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={hookColor}
                        onChange={(e) => setHookColor(e.target.value)}
                        className="w-full bg-fb-surface-hover text-amber-300 text-xs font-mono p-1.5 rounded-lg border border-white/5"
                      />
                    </div>
                  </div>

                  <div>
                    <span className="block text-xs font-bold text-cyan-400 mb-1">Màu Nút CTA (ctaColor):</span>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={ctaColor}
                        onChange={(e) => setCtaColor(e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent border-0"
                      />
                      <input
                        type="text"
                        value={ctaColor}
                        onChange={(e) => setCtaColor(e.target.value)}
                        className="w-full bg-fb-surface-hover text-cyan-300 text-xs font-mono p-1.5 rounded-lg border border-white/5"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/** TAB 2: THƯƠNG HIỆU & HEADER */}
          {activeTab === 'branding' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div className="bg-fb-surface-hover/30 p-3.5 rounded-xl border border-blue-500/20 text-xs text-blue-200">
                <div className="flex items-center gap-1.5 font-bold text-cyan-400 mb-1">
                  <span className="material-symbols-outlined text-[17px]">info</span>
                  <span>Đồng Bộ Tên & Avatar Fanpage Tự Động</span>
                </div>
                <p className="text-[11px] text-fb-text-muted leading-relaxed">
                  Khi tạo video Reel thực tế cho bất kỳ Fanpage nào, hệ thống sẽ tự động trích xuất Tên và Avatar của chính Fanpage đó vào Header này. Các thông số bên dưới dùng để cấu hình phong cách hiển thị và xem trước mẫu.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-fb-text uppercase mb-1.5">Tên Xem Thử Mẫu</label>
                  <input
                    type="text"
                    value={authorName}
                    onChange={(e) => setAuthorName(e.target.value)}
                    className="w-full bg-fb-surface-hover text-fb-text text-xs font-bold p-2.5 rounded-xl border border-white/5 focus:outline-none focus:ring-1 focus:ring-fb-blue"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-fb-text uppercase mb-1.5">Dòng Phụ Đề Thời Gian</label>
                  <input
                    type="text"
                    value={authorSubtitle}
                    onChange={(e) => setAuthorSubtitle(e.target.value)}
                    placeholder="VD: 4hrs ago · A Text Story"
                    className="w-full bg-fb-surface-hover text-fb-text text-xs font-medium p-2.5 rounded-xl border border-white/5 focus:outline-none focus:ring-1 focus:ring-fb-blue"
                  />
                </div>
              </div>

              {/** Toggles */}
              <div className="pt-2 border-t border-fb-surface-hover/40 grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="flex items-center justify-between p-3 rounded-xl bg-fb-surface-hover/30 border border-white/5">
                  <span className="text-xs font-bold text-fb-text flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-blue-400">verified</span>
                    Tích Xanh FB
                  </span>
                  <button
                    type="button"
                    onClick={() => setHasVerified(!hasVerified)}
                    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors cursor-pointer ${
                      hasVerified ? 'bg-blue-600' : 'bg-black/40 border border-white/5'
                    }`}
                  >
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${hasVerified ? 'translate-x-5' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-fb-surface-hover/30 border border-white/5">
                  <span className="text-xs font-bold text-fb-text flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-cyan-400">add_circle</span>
                    Nút + Follow
                  </span>
                  <button
                    type="button"
                    onClick={() => setHasFollowBtn(!hasFollowBtn)}
                    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors cursor-pointer ${
                      hasFollowBtn ? 'bg-blue-600' : 'bg-black/40 border border-white/5'
                    }`}
                  >
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${hasFollowBtn ? 'translate-x-5' : 'translate-x-1'}`} />
                  </button>
                </div>

                <div className="flex items-center justify-between p-3 rounded-xl bg-fb-surface-hover/30 border border-white/5">
                  <span className="text-xs font-bold text-fb-text flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-sm text-amber-400">blur_on</span>
                    Censor Tên Page
                  </span>
                  <button
                    type="button"
                    onClick={() => setIsCensoredName(!isCensoredName)}
                    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors cursor-pointer ${
                      isCensoredName ? 'bg-amber-600' : 'bg-black/40 border border-white/5'
                    }`}
                  >
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${isCensoredName ? 'translate-x-5' : 'translate-x-1'}`} />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/** TAB 3: NỘI DUNG & HIGHLIGHT */}
          {activeTab === 'text' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="block text-xs font-bold text-fb-text uppercase">Đoạn Văn Bản Trích Dẫn Story</label>
                  <span className="text-[11px] text-fb-text-muted">Độ dài: {storyContent.length} ký tự</span>
                </div>
                <textarea
                  rows={5}
                  value={storyContent}
                  onChange={(e) => setStoryContent(e.target.value)}
                  className="w-full bg-fb-surface-hover text-fb-text text-xs font-medium p-3 rounded-xl border border-white/5 focus:outline-none focus:ring-1 focus:ring-fb-blue custom-scrollbar leading-relaxed"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-fb-text uppercase mb-1.5">
                  Cụm Từ Khóa Highlight Kịch Tính (Mỗi dòng 1 cụm từ)
                </label>
                <textarea
                  rows={3}
                  value={highlightInput}
                  onChange={(e) => setHighlightInput(e.target.value)}
                  placeholder="50% of my salary&#10;The day after discovering how much I earned..."
                  className="w-full bg-fb-surface-hover text-amber-300 text-xs font-mono p-3 rounded-xl border border-white/5 focus:outline-none focus:ring-1 focus:ring-fb-blue custom-scrollbar"
                />
              </div>

              {/** Sliders Cỡ Chữ & Giãn Dòng */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-fb-surface-hover/40">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-fb-text mb-1">
                    <span>Cỡ Chữ:</span>
                    <span className="text-cyan-400">{fontSize}px</span>
                  </div>
                  <input
                    type="range"
                    min={12}
                    max={18}
                    step={0.2}
                    value={fontSize}
                    onChange={(e) => setFontSize(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-bold text-fb-text mb-1">
                    <span>Khoảng Cách Dòng:</span>
                    <span className="text-cyan-400">{lineHeight}</span>
                  </div>
                  <input
                    type="range"
                    min={1.15}
                    max={1.5}
                    step={0.02}
                    value={lineHeight}
                    onChange={(e) => setLineHeight(parseFloat(e.target.value))}
                    className="w-full accent-cyan-400 cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/** TAB 4: CTA & NÚT ĐÁY */}
          {activeTab === 'footer' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-bold text-fb-text uppercase mb-1.5">Chữ Nút Đọc Tiếp (CTA)</label>
                <input
                  type="text"
                  value={ctaText}
                  onChange={(e) => setCtaText(e.target.value)}
                  className="w-full bg-fb-surface-hover text-fb-text text-xs font-bold p-2.5 rounded-xl border border-white/5 focus:outline-none focus:ring-1 focus:ring-fb-blue"
                />
              </div>

              <div className="p-4 rounded-xl bg-fb-surface-hover/30 border border-white/5 space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="text-xs font-bold text-fb-text">Thanh Banner Nổi Đáy ("Full Story In Comment")</h4>
                    <p className="text-[11px] text-fb-text-muted mt-0.5">Hiển thị viên thuốc phát sáng ở đáy để kêu gọi khán giả vào comment đọc tiếp Part 2</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setHasBottomPill(!hasBottomPill)}
                    className={`relative inline-flex h-5 w-10 items-center rounded-full transition-colors cursor-pointer shrink-0 ${
                      hasBottomPill ? 'bg-emerald-500' : 'bg-black/40 border border-white/5'
                    }`}
                  >
                    <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-white transition-transform ${hasBottomPill ? 'translate-x-5' : 'translate-x-1'}`} />
                  </button>
                </div>

                {hasBottomPill && (
                  <div>
                    <label className="block text-xs font-bold text-fb-text uppercase mb-1">Nội dung Banner Đáy</label>
                    <input
                      type="text"
                      value={bottomPillText}
                      onChange={(e) => setBottomPillText(e.target.value)}
                      placeholder="Full Story In Comment 👇"
                      className="w-full bg-fb-surface text-emerald-400 text-xs font-bold p-2.5 rounded-xl border border-white/10 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/** TAB 5: GÁN CHO FANPAGE */}
          {activeTab === 'apply' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <label className="block text-xs font-bold text-fb-text uppercase mb-1.5">
                  Chọn Fanpage Cần Gán Mẫu Này
                </label>
                <CustomDropdown
                  value={selectedPageForApply}
                  onChange={(val) => setSelectedPageForApply(String(val))}
                  options={[
                    { value: '', label: '-- Chọn Fanpage Facebook --' },
                    ...pages.map((p: any) => ({
                      value: p.id,
                      label: `${p.name} (ID: ${p.fb_page_id})`,
                    })),
                  ]}
                  className="w-full"
                />
                <p className="text-[11px] text-fb-text-muted mt-2 leading-relaxed">
                  Khi gán, Fanpage sẽ tự động được chuyển chế độ video sang <strong>Text Story Reel 9:16</strong>, và cố định sử dụng mẫu giao diện này cho các bài Reel.
                </p>
              </div>

              <button
                type="button"
                onClick={ztteam_applyToFanpage}
                disabled={isApplying || !selectedPageForApply}
                className="w-full flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 via-fb-blue to-cyan-500 hover:from-blue-500 hover:to-cyan-400 text-white rounded-xl text-xs font-black transition-all shadow-lg shadow-blue-500/25 cursor-pointer disabled:opacity-50"
              >
                <span className={`material-symbols-outlined text-[18px] ${isApplying ? 'animate-spin' : ''}`}>
                  {isApplying ? 'sync' : 'verified'}
                </span>
                <span>{isApplying ? 'Đang áp dụng...' : '⚡ Xác Nhận Gán Mẫu Này Cho Fanpage'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
