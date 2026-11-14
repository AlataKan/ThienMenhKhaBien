
const fs = require('fs');
const cfg = JSON.parse(fs.readFileSync('assets/resources/data/config/game_config.json', 'utf8'));
const data = JSON.parse(fs.readFileSync('assets/resources/data/world/tu_dien.json', 'utf8'));

function calcTiers(p) {
  const tiers = {};
  for (const [k, c] of Object.entries(cfg.f_tuoi)) {
    if (k === 'thi_giac' && p.mu) { tiers[k] = 0; continue; }
    const age = Math.max(0.2, p.tuoi);
    const fTang = Math.min(1, Math.pow(age / c.tuoi_dinh, c.q));
    const fGiam = p.tuoi <= c.tuoi_suy ? 1 : Math.max(c.san_gia, 1 / (1 + Math.pow((p.tuoi - c.tuoi_suy) / (c.tuoi_nua - c.tuoi_suy), c.p)));
    const haoMon = k === 'suc_manh' ? (p.hao_mon_suc_manh || 0) : 0;
    tiers[k] = Math.max(0, Math.min(5, Math.floor((65 * fTang * fGiam * (1 - haoMon)) / 20)));
  }
  return tiers;
}

function getMenuIds(p) {
  const tiers = calcTiers(p);
  const sources = new Set(['ban_than:moi_trang_thai']);
  if (p.giai_doan === 'so_sinh') sources.add('ban_than:so_sinh');
  p.noi_chon.forEach(s => sources.add('noi_chon:' + s));
  p.do_vat.forEach(s => sources.add('do_vat:' + s));
  p.nguoi_xung_quanh.forEach(s => sources.add('nguoi_xung_quanh:' + s));
  p.nghia_vu.forEach(s => sources.add('nghia_vu:' + s));

  return data.actions.filter(tpl => {
    if (!tpl.nguon_goi_y.some(s => sources.has(s))) return false;
    if (!tpl.giai_doan.includes(p.giai_doan)) return false;
    for (const [ab, minT] of Object.entries(tpl.nang_luc_yeu_cau)) {
      if ((tiers[ab] ?? 0) < minT) return false;
    }
    if (tpl.vat_pham_yeu_cau && !tpl.vat_pham_yeu_cau.every(i => p.do_vat.includes(i))) return false;
    if (tpl.kien_thuc_yeu_cau && !tpl.kien_thuc_yeu_cau.every(k => p.kien_thuc.includes(k))) return false;
    return true;
  }).map(a => a.mau);
}

function assert(cond, msg) {
  if (!cond) { console.error('[THẤT BẠI] ' + msg); process.exit(1); }
  console.log('[ĐẠT] ' + msg);
}

console.log('--- CHẠY KIỂM THỬ THỰC TẠI GĐ1 TRÊN GITHUB ACTIONS ---');
const [p1, p2, p3, p4, p5, p6] = data.personas;
assert(getMenuIds(p1).includes('bu_me') && !getMenuIds(p1).includes('bo_cui'), 'Persona 1 (Sơ sinh): Có bú mẹ, không có bổ củi');
assert(getMenuIds(p2).includes('nhat_cui_nho') && !getMenuIds(p2).includes('bo_cui'), 'Persona 2 (Bé 8 tuổi mồ côi): Sức mạnh bậc 0 chỉ nhặt củi nhỏ, không bổ củi');
assert(getMenuIds(p3).includes('bo_cui') && getMenuIds(p3).includes('gat_lua_lao_dich'), 'Persona 3 (Trai 17 nông nô): Có bổ củi và gặt lúa lao dịch');
assert(getMenuIds(p4).includes('ke_chuyen_cho_chau'), 'Persona 4 (Ông lão 68 tuổi): Có kể chuyện cho cháu');
assert(getMenuIds(p5).includes('doc_so_sach'), 'Persona 5 (Con nhà buôn biết chữ): Có đọc sổ sách');
assert(getMenuIds(p6).includes('nghe_ngong_quan_ruou') && !getMenuIds(p6).includes('doc_so_sach'), 'Persona 6 (Khách mù): Nghe ngóng được ở quán rượu nhưng bị chặn đọc sách');
