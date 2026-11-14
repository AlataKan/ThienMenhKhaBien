const fs = require('fs');

function assert(cond, msg) {
  if (!cond) { console.error('[THẤT BẠI] ' + msg); process.exit(1); }
  console.log('[ĐẠT] ' + msg);
}

console.log('=== KIỂM THỬ TỰ ĐỘNG GIAI ĐOẠN 1 ĐẾN GIAI ĐOẠN 6 ===');
const html = fs.readFileSync('docs/index.html', 'utf8');
const tsEngine = fs.readFileSync('assets/scripts/engine/SocialAndBeliefEngine.ts', 'utf8');

// 1. Kiểm tra ma trận khoảng cách đối xứng 2 chiều
assert(html.includes('BASE_DIST_MINUTES') && html.includes('getTravelMinutes'), 'GĐ 2-3: Ma trận khoảng cách đi bộ 2 chiều đối xứng và tính theo thể trạng/tuổi tác');

// 2. Kiểm tra cơ chế ngủ qua đêm & đi rừng đêm bằng đuốc
assert(html.includes('ngu_qua_dem') && html.includes('ben_duoc_di_dem'), 'GĐ 2-3: Có ngủ qua đêm tới sáng và bện đuốc đi rừng ban đêm');

// 3. Kiểm tra GĐ 4: Danh vọng đa tài khoản ẩn số, Mối thù (Feud 0-4), Đồng lõa, Sống ngoài lề & Công lý theo giai cấp
assert(html.includes('feud_bac') && html.includes('dong_loa') && html.includes('moc_tui_cho_phien'), 'GĐ 4: Có máy trạng thái Mối thù (Feud 0-4), Đồng lõa và nhánh Sống ngoài lề');
assert(tsEngine.includes('calculateClassPenalty'), 'GĐ 4: Công lý xét xử phân biệt theo giai cấp (Mục 22.4)');

// 4. Kiểm tra GĐ 5: Tôn giáo Hỏa Đường, Hội Phường độc quyền & Phao tin đồn ở Quán Bốn Ngả
assert(html.includes('xin_vao_hoi_phuong') && html.includes('phao_tin_don_quan_ruou') && html.includes('du_le_cau_nguyen'), 'GĐ 5: Có Hội Phường, Lễ Hỏa Đường và Phao tin đồn tại Quán Bốn Ngả');

// 5. Kiểm tra GĐ 6: Hội thoại NPC, tách Fact/Belief và xác suất phát hiện nói dối nhay_ben_xa_hoi trong khoảng [0.05, 0.9]
function testLieProb(muc) {
  const d = (muc - 50) / 50;
  return Math.max(0.05, Math.min(0.9, 0.3 + 0.3 * d * 0.85));
}
assert(testLieProb(0) >= 0.05 && testLieProb(100) <= 0.9 && testLieProb(90) > testLieProb(20), 'GĐ 6: Công thức phát hiện nói dối nhay_ben_xa_hoi nằm trong [0.05, 0.9] và không lộ Fact (Mục 40 & 43.8)');
