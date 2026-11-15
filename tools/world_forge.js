/**
 * WORLD FORGE (CÔNG CỤ DỰNG THẾ GIỚI HOÀI DƯƠNG - MỤC 46.1, 46.2, 47.2, 51, 52, 53, 54)
 * Mô phỏng xác định (deterministic) từ năm -40 đến năm 270.
 */
const fs = require('fs');
const path = require('path');

// Bộ sinh số ngẫu nhiên xác định theo seed (Mục 44.4 & 46.2)
class DeterministicRNG {
  constructor(seedStr) {
    let h = 2166136261 >>> 0;
    for (let i = 0; i < seedStr.length; i++) {
      h ^= seedStr.charCodeAt(i);
      h = Math.imul(h, 16777619);
    }
    this.state = (h >>> 0) || 1;
  }
  nextFloat() {
    let t = (this.state += 0x6D2B79F5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  }
  nextInt(min, max) {
    return Math.floor(this.nextFloat() * (max - min + 1)) + min;
  }
  pick(arr) {
    return arr[Math.floor(this.nextFloat() * arr.length)];
  }
}

const SCALE_TIER = process.argv[2] || 'S';
const SCALE_CONFIG = {
  S: { popCount: 2000,  hubCount: 24,  maxPlayYear: 200 },
  M: { popCount: 15000, hubCount: 90,  maxPlayYear: 200 },
  L: { popCount: 50000, hubCount: 180, maxPlayYear: 200 }
}[SCALE_TIER] || { popCount: 2000, hubCount: 24, maxPlayYear: 200 };

const rng = new DeterministicRNG("HOAI_DUONG_CANON_SEED_V12");

// 1. MƯỜI HAI VÙNG CỦA HOÀI DƯƠNG (Mục 50.2)
const REGIONS = [
  { id: "tam_giang", ten: "Tam Giang", vi_tri_game: "nha", soi_chinh: "lua" },
  { id: "ha_giang", ten: "Hạ Giang (Bến Sậy)", vi_tri_game: "cho_ben_say", soi_chinh: "bac" },
  { id: "dong_coc", ten: "Đông Cốc", vi_tri_game: "ruong_chu_ap", soi_chinh: "lua" },
  { id: "doi_muoi", ten: "Đồi Muối", vi_tri_game: "cho_ben_say", soi_chinh: "bac" },
  { id: "rung_den", ten: "Rừng Đen", vi_tri_game: "bia_rung", soi_chinh: "bien" },
  { id: "tay_linh", ten: "Tây Lĩnh", vi_tri_game: "duong_lang", soi_chinh: "hoa" },
  { id: "vi_thuy", ten: "Vĩ Thủy", vi_tri_game: "cho_ben_say", soi_chinh: "bac" },
  { id: "kinh_hoai", ten: "Kinh Hoài", vi_tri_game: "kinh_hoai", soi_chinh: "ngai" },
  { id: "bien_ngan", ten: "Biên Ngạn Nam", vi_tri_game: "don_bien_ngan", soi_chinh: "bien" },
  { id: "ben_bac", ten: "Bến Bắc (Quán Bốn Ngả)", vi_tri_game: "quan_bon_nga", soi_chinh: "bac" }
];

// 2. NHÂN VẬT HẠT NHÂN TẦNG A (Mục 53)
const TIER_A_LIST = [
  { id: "A01", ten: "Lâm Khải", nam_sinh: -42, nam_mat: 31, vai: "Vương đầu tiên", vung: "kinh_hoai", soi: "ngai" },
  { id: "A02", ten: "Tú Y", nam_sinh: -30, nam_mat: 3, vai: "Vương hậu đầu", vung: "bien_ngan", soi: "bien" },
  { id: "A04", ten: "Khổng Bảo", nam_sinh: -45, nam_mat: 20, vai: "Thợ rèn già Biên Ngạn", vung: "bien_ngan", soi: "bien" },
  { id: "A05", ten: "Huyền Mịch", nam_sinh: -35, nam_mat: 38, vai: "Đường chủ Hỏa Đường", vung: "tay_linh", soi: "hoa" },
  { id: "A06", ten: "Lâm Vọng", nam_sinh: -1, nam_mat: 55, vai: "Thợ rèn ẩn danh", vung: "bien_ngan", soi: "bien" },
  { id: "A11", ten: "Phó Lạc", nam_sinh: -25, nam_mat: 50, vai: "Quản kho đầu tiên", vung: "kinh_hoai", soi: "lua" },
  { id: "A13", ten: "Khổng Thạch", nam_sinh: 28, nam_mat: 80, vai: "Nông dân Tam Giang", vung: "tam_giang", soi: "lua" },
  { id: "A14", ten: "Ngô Tam", nam_sinh: 45, nam_mat: 105, vai: "Trưởng làng Sậy Đỏ", vung: "tam_giang", soi: "lua" },
  { id: "A18", ten: "Huyền Dung", nam_sinh: 18, nam_mat: 75, vai: "Y sĩ Đường chủ", vung: "tay_linh", soi: "hoa" },
  { id: "A20", ten: "Mai Chức", nam_sinh: 35, nam_mat: 92, vai: "Chủ Hội Phường Vĩ Thủy", vung: "vi_thuy", soi: "bac" },
  { id: "A22", ten: "Tôn Bằng", nam_sinh: 58, nam_mat: 136, vai: "Quản kho Thiên Lộc", vung: "kinh_hoai", soi: "lua" },
  { id: "A26", ten: "Nguyên Hiệp", nam_sinh: 55, nam_mat: 125, vai: "Giảng sư Nhất Hỏa", vung: "tay_linh", soi: "hoa" },
  { id: "A31", ten: "Mộc Phát", nam_sinh: 70, nam_mat: 135, vai: "Chủ tiệm cầm đồ Hạ Giang", vung: "ha_giang", soi: "bac" },
  { id: "A32", ten: "Điền Hứa", nam_sinh: 85, nam_mat: 129, vai: "Chủ muối Đồi Muối", vung: "doi_muoi", soi: "bac" },
  { id: "A38", ten: "Cát Thu Hiền", nam_sinh: 105, nam_mat: 170, vai: "Nữ y sĩ Nhất Hỏa", vung: "ha_giang", soi: "hoa" },
  { id: "A39", ten: "Hạng Tông", nam_sinh: 102, nam_mat: 185, vai: "Thẩm vấn viên Soi Lửa", vung: "kinh_hoai", soi: "hoa" },
  { id: "A40", ten: "Ngô Hạnh", nam_sinh: 135, nam_mat: 200, vai: "Bà chủ Quán Bốn Ngả", vung: "ben_bac", soi: "bac" },
  { id: "A42", ten: "Khổng Triệu", nam_sinh: 122, nam_mat: 185, vai: "Thợ rèn Biên Ngạn", vung: "bien_ngan", soi: "bien" },
  { id: "A43", ten: "Ngô Cần", nam_sinh: 118, nam_mat: 180, vai: "Thủ lĩnh nông dân Tam Giang", vung: "tam_giang", soi: "lua" },
  { id: "A44", ten: "Mụ Bảy Ve", nam_sinh: 128, nam_mat: 195, vai: "Bà đỡ vùng Tam Giang", vung: "tam_giang", soi: "lua" },
  { id: "A47", ten: "Lão Câm Sông", nam_sinh: 110, nam_mat: 188, vai: "Người ăn mày bến sông", vung: "ha_giang", soi: "lua" },
  { id: "A49", ten: "Lâm Thụy Anh", nam_sinh: 150, nam_mat: 225, vai: "Nữ Vương Hoài Dương", vung: "kinh_hoai", soi: "ngai" },
  { id: "A53", ten: "Điền Cẩm Tú", nam_sinh: 150, nam_mat: 220, vai: "Kế toán trẻ Hạ Giang", vung: "ha_giang", soi: "bac" },
  { id: "A54", ten: "Khổng Thảo", nam_sinh: 160, nam_mat: 230, vai: "Thợ rèn trẻ Biên Ngạn", vung: "bien_ngan", soi: "bien" },
  { id: "A57", ten: "Phạm Hổ", nam_sinh: 155, nam_mat: 225, vai: "Đội trưởng lính biên", vung: "bien_ngan", soi: "bien" },
  { id: "A60", ten: "Bé Sậy", nam_sinh: 183, nam_mat: 250, vai: "Trẻ mồ côi bên sông", vung: "ha_giang", soi: "lua" }
];

// 3. SINH CÁC NÚT & CHỦ NÚT TẦNG B (Mục 51.2 & 54.1: Mỗi nút nối trực tiếp tới 1 nhân vật A)
const HUB_TYPES = ["Làng nông nghiệp", "Giáo xứ Nhất Hỏa", "Chợ phiên", "Quán trọ", "Hội Phường nghề", "Đồn biên giới"];
const HO_LIST = ["Ngô", "Khổng", "Điền", "Mộc", "Phạm", "Lục", "Tạ", "Mai", "Cát", "Bùi", "Đỗ", "Lê", "Trần"];
const TEN_LIST = ["Bình", "Thạch", "Cần", "Lúa", "Thảo", "Hổ", "Tâm", "Hiền", "Phát", "Lộc", "Nhẫn", "An", "Vân", "Sơn"];

const hubs = [];
for (let i = 0; i < SCALE_CONFIG.hubCount; i++) {
  const reg = REGIONS[i % REGIONS.length];
  const linkedA = TIER_A_LIST.find(a => a.vung === reg.id) || TIER_A_LIST[i % TIER_A_LIST.length];
  const hubType = HUB_TYPES[i % HUB_TYPES.length];
  const ownerName = rng.pick(HO_LIST) + " " + rng.pick(TEN_LIST);
  hubs.push({
    nut_id: "NUT_" + (i + 1),
    ten_nut: hubType + " " + reg.ten + " #" + (Math.floor(i / REGIONS.length) + 1),
    vung_id: reg.id,
    vi_tri_game: reg.vi_tri_game,
    chu_nut_B: {
      id: "B_" + (i + 1),
      ten: ownerName,
      vai: "Chủ nút (" + hubType + ")",
      noi_voi_A: linkedA.id,
      ten_A_lien_ket: linkedA.ten
    }
  });
}

// 4. MÔ PHỎNG CHUỖI BIẾN VĨ MÔ TỪ NĂM -40 ĐẾN 270 (Mục 46.2 & 52.2)
const macroTimeline = {};
for (let y = -40; y <= 270; y += 5) {
  const t = Math.max(0, Math.min(200, y)) / 200;
  macroTimeline[y] = {
    no_khe: Number((0.5 + t * 1.45).toFixed(2)),
    do_rong_kho: Number(Math.min(0.85, Math.max(0, t * 0.8)).toFixed(2)),
    bat_man_tam_giang: Number(Math.min(0.95, 0.45 + t * 0.45).toFixed(2)),
    to_chuc_tam_giang: Number(Math.min(0.75, 0.05 + t * 0.5).toFixed(2)),
    cang_thang_bach_linh: Number(Math.min(0.9, 0.15 + Math.abs(Math.sin(y / 20)) * 0.3 + t * 0.45).toFixed(2)),
    ran_nut_hoa_duong: Number(Math.min(0.85, 0.05 + t * 0.7).toFixed(2))
  };
}

// 5. SINH DÂN SỐ TẦNG C KÈM GIA PHẢ, ĐỘ DÍNH LÍU T0/T1/T2 & ĐƯỜNG CỨU CHẾT YỂU (Mục 44.3, 47.3, 51.6, 54)
const EARLY_DEATH_CAUSES = [
  {
    nguyen_nhan: "Cơn sốt rét mùa Giá lúc nhỏ",
    duong_cuu: [
      "Ủ ấm bằng củi khô và cho uống nước cháo nóng kịp thời",
      "Nhờ bà đỡ hoặc nữ tu y sĩ Nhất Hỏa sắc thảo dược giải hàn"
    ]
  },
  {
    nguyen_nhan: "Kiệt sức vì thiếu ăn trong năm mất mùa",
    duong_cuu: [
      "Xin cháo công ở hiên Nhất Hỏa và mót củ ấu, rau dại ven mương",
      "Đan rổ rá đem ra chợ đổi lấy gạo lành dự trữ dưới hố gầm phản"
    ]
  }
];

const CLASS_POOL = [
  { gc: "nong_no_ruong_dat", label: "Dân Gắn Ruộng", weight: 42, rarity: 1.0 },
  { gc: "nong_dan_tu_do",    label: "Nông dân tự do", weight: 26, rarity: 1.0 },
  { gc: "ke_ngoai_le",       label: "Kẻ Không Tên",   weight: 10, rarity: 1.0 },
  { gc: "tho_thu_cong",      label: "Thợ thủ công",   weight: 10, rarity: 0.8 },
  { gc: "thuong_nhan_thi_dan", label: "Thương nhân nhỏ", weight: 6, rarity: 0.6 },
  { gc: "giao_si",           label: "Tu sĩ Hỏa Đường", weight: 3, rarity: 0.5 },
  { gc: "ky_si_quan_nhan",   label: "Kiếm Điền",      weight: 2, rarity: 0.4 },
  { gc: "quan_lai",          label: "Thư lại Chức Sự", weight: 0.9, rarity: 0.2 },
  { gc: "thien_menh_chi_tu", label: "Hoàng tộc họ Lâm", weight: 0.1, rarity: 0.05 }
];

function pickClassByPopulationWeight() {
  const total = CLASS_POOL.reduce((s, c) => s + c.weight, 0);
  let r = rng.nextFloat() * total;
  for (const c of CLASS_POOL) {
    r -= c.weight;
    if (r <= 0) return c;
  }
  return CLASS_POOL[0];
}

const genealogy = [];
for (let i = 0; i < SCALE_CONFIG.popCount; i++) {
  const hub = hubs[i % hubs.length];
  const reg = REGIONS.find(r => r.id === hub.vung_id) || REGIONS[0];
  const cls = pickClassByPopulationWeight();
  const namSinh = rng.nextInt(0, SCALE_CONFIG.maxPlayYear - 5);
  const isEarlyDeathForecast = rng.nextFloat() < 0.25;
  const tuoiMatDuBao = isEarlyDeathForecast ? rng.nextInt(14, 24) : rng.nextInt(52, 76);

  // Phân bổ độ dính líu T0 (~1%), T1 (~20%), T2 (~79%) đúng Mục 51.6
  const rollTier = rng.nextFloat();
  const mucDinhLiu = rollTier < 0.01 ? "T0" : (rollTier < 0.21 ? "T1" : "T2");

  // Chuỗi liên kết <= 3 cạnh tới nhân vật A (Mục 51.2)
  const hopChain = [
    "C" + (i + 1),
    hub.nut_id,
    hub.chu_nut_B.id,
    hub.chu_nut_B.noi_voi_A
  ];

  const earlyCause = isEarlyDeathForecast ? rng.pick(EARLY_DEATH_CAUSES) : null;
  const ho = cls.gc === "thien_menh_chi_tu" ? "Lâm" : rng.pick(HO_LIST);
  const ten = rng.pick(TEN_LIST);
  const chaTen = ho + " " + rng.pick(TEN_LIST);
  const meTen = rng.pick(HO_LIST) + " Thị " + rng.pick(TEN_LIST);

  genealogy.push({
    id: "P" + String(i + 1).padStart(5, "0"),
    ten: ho + " " + ten,
    cha_me: [chaTen, meTen],
    nam_sinh: namSinh,
    tuoi_khoi_dau: rng.nextInt(14, Math.min(28, tuoiMatDuBao - 2)),
    nam_mat_du_bao_goc: namSinh + tuoiMatDuBao,
    du_bao_chet_yeu: isEarlyDeathForecast,
    nguyen_nhan_tu_vong_goc: earlyCause ? earlyCause.nguyen_nhan : "Tuổi già sức kiệt tự nhiên",
    duong_cuu: earlyCause ? earlyCause.duong_cuu : ["Duy trì lương thực, củi ấm và tích lũy cho tuổi già"],
    giai_cap: cls.gc,
    than_phan: cls.label + " · " + reg.ten,
    he_so_hiem: cls.rarity,
    vung_id: reg.id,
    vi_tri_khoi_dau: reg.vi_tri_game,
    nut_id: hub.nut_id,
    ten_nut: hub.ten_nut,
    chu_nut_ten: hub.chu_nut_B.ten,
    muc_dinh_liu: mucDinhLiu,
    chuoi_lien_ket_A: hopChain, // Độ dài 4 đỉnh = 3 cạnh: C -> Nút -> B -> A
    biet_chu: cls.gc === "giao_si" || cls.gc === "quan_lai" || cls.gc === "thien_menh_chi_tu",
    co_riu: cls.gc === "nong_no_ruong_dat" || cls.gc === "tho_thu_cong",
    tam_niem: {
      mong: isEarlyDeathForecast
        ? ("Vượt qua dự báo yểu mệnh (" + earlyCause.nguyen_nhan + ") và sống tới tuổi già")
        : "Giữ bình yên cho gia đình nhỏ tại " + reg.ten + " và tìm cơ hội thăng tiến",
      so: "Đói rét mùa Giá hoặc bị cuốn vào vòng xoáy nợ thuế",
      ganh_nang: "Phụng dưỡng cha mẹ (" + chaTen + " & " + meTen + ") tại " + hub.ten_nut,
      goc_khuat: "Từng nghe " + hub.chu_nut_B.ten + " nhắc tới những chuyện cũ trong vùng"
    }
  });
}

const worldPack = {
  version: "1.0.0-stage8",
  scale_tier: SCALE_TIER,
  world_seed: "HOAI_DUONG_CANON_SEED_V12",
  generated_at: new Date().toISOString(),
  population_count: genealogy.length,
  hub_count: hubs.length,
  macro_timeline: macroTimeline,
  hubs: hubs,
  genealogy: genealogy
};

fs.writeFileSync("assets/resources/data/world/world_pack.json", JSON.stringify(worldPack, null, 2), "utf8");
fs.writeFileSync("docs/world_pack.js", "window.WORLD_PACK = " + JSON.stringify(worldPack) + ";\n", "utf8");
console.log("[WORLD FORGE] Đã xuất gói thế giới bậc " + SCALE_TIER + " (" + genealogy.length + " nhân vật, " + hubs.length + " nút).");
