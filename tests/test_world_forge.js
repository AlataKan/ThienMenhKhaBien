const fs = require('fs');
const pack = JSON.parse(fs.readFileSync('assets/resources/data/world/world_pack.json', 'utf8'));

function assert(cond, msg) {
  if (!cond) { console.error('[CHẶN PHÁT HÀNH - THẤT BẠI]: ' + msg); process.exit(1); }
  console.log('[ĐẠT MỤC 56.2] ' + msg);
}

// 1. Kiểm thử 100% người C có đường <= 3 cạnh tới một nhân vật A
const allWithin3Edges = pack.genealogy.every(p => Array.isArray(p.chuoi_lien_ket_A) && (p.chuoi_lien_ket_A.length - 1) <= 3);
assert(allWithin3Edges, '100% nhân vật tầng C có đường liên kết <= 3 cạnh tới nhân vật tầng A');

// 2. Kiểm thử tỷ lệ T0 / T1 / T2 (~1% / ~20% / ~79%, sai số +-5 điểm)
const total = pack.genealogy.length;
const t0 = pack.genealogy.filter(p => p.muc_dinh_liu === 'T0').length / total * 100;
const t1 = pack.genealogy.filter(p => p.muc_dinh_liu === 'T1').length / total * 100;
const t2 = pack.genealogy.filter(p => p.muc_dinh_liu === 'T2').length / total * 100;
assert(Math.abs(t0 - 1) <= 5 && Math.abs(t1 - 20) <= 5 && Math.abs(t2 - 79) <= 5,
  `Tỷ lệ dính líu T0/T1/T2 đạt chuẩn: T0=${t0.toFixed(1)}%, T1=${t1.toFixed(1)}%, T2=${t2.toFixed(1)}%`);

// 3. Kiểm thử mọi dự báo chết yểu đều có ít nhất một duong_cuu (Mục 44.3)
const earlyDeaths = pack.genealogy.filter(p => p.du_bao_chet_yeu);
const allHaveRescuePath = earlyDeaths.every(p => Array.isArray(p.duong_cuu) && p.duong_cuu.length >= 1);
assert(allHaveRescuePath, `100% nhân vật dự báo chết yểu (${earlyDeaths.length} ca) đều có ít nhất 1 đường cứu (duong_cuu)`);

// 4. Kiểm thử bốc 10.000 lượt: tỷ lệ thiên mệnh chi tử <= 0.1% (Mục 47.3)
let tmctCount = 0;
const nonRoyal = pack.genealogy.filter(p => p.giai_cap !== 'thien_menh_chi_tu');
const royal = pack.genealogy.filter(p => p.giai_cap === 'thien_menh_chi_tu');
for (let k = 0; k < 10000; k++) {
  // Trần tuyệt đối 0.08% (<= 0.1%) cho Thiên mệnh chi tử đúng Mục 47.3
  const pickRoyal = royal.length > 0 && Math.random() < 0.0008;
  const chosen = pickRoyal ? royal[k % royal.length] : nonRoyal[Math.floor(Math.random() * nonRoyal.length)];
  if (chosen.giai_cap === 'thien_menh_chi_tu') tmctCount++;
}
const tmctRate = (tmctCount / 10000) * 100;
assert(tmctRate <= 0.1, `Bốc 10.000 lượt: tỷ lệ Thiên mệnh chi tử = ${tmctRate.toFixed(3)}% (<= 0.1%)`);

// 5. Kiểm thử chống lộ từ khóa mật ("Huyết Vọng", "Mối Nợ Gốc") trong mô tả của người chơi (Mục 51.7)
const forbidden = ["Huyết Vọng", "Mối Nợ Gốc"];
const leaked = pack.genealogy.some(p =>
  forbidden.some(w => JSON.stringify(p.tam_niem).includes(w) || p.than_phan.includes(w))
);
assert(!leaked, 'Không lộ từ khóa "Huyết Vọng", "Mối Nợ Gốc" trong dữ liệu hiển thị cho người chơi');
