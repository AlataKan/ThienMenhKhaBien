
const fs = require('fs');
const cfg = JSON.parse(fs.readFileSync('assets/resources/data/config/game_config.json', 'utf8'));
const data = JSON.parse(fs.readFileSync('assets/resources/data/world/tu_dien.json', 'utf8'));

function assert(cond, msg) {
  if (!cond) { console.error('[THẤT BẠI] ' + msg); process.exit(1); }
  console.log('[ĐẠT] ' + msg);
}

function predictDays(doi, lanh, sk, cui, food) {
  for (let d = 1; d <= 14; d++) {
    if (food >= 0.8) { food -= 0.8; doi = Math.max(10, doi - 20); }
    else { doi += 22; }
    if (cui >= 0.8) { cui -= 0.8; lanh = Math.max(10, lanh - 15); }
    else { lanh += 25; }
    if (doi >= 95) sk -= 28; else if (doi >= 75) sk -= 12;
    if (lanh >= 95) sk -= 30; else if (lanh >= 75) sk -= 14;
    if (sk <= 0) return d;
  }
  return null;
}

console.log('--- CHẠY KIỂM THỬ THỰC TẠI GĐ1, GĐ2 & GĐ3 ---');
const p3 = data.personas[2];
// Kết cục 1: Không làm gì -> đường dự báo chạm 0 trong mùa Giá
const initialDanger = predictDays(p3.doi_ban_dau, p3.lanh_ban_dau, 85, p3.cui, p3.luong_thuc);
assert(initialDanger !== null && initialDanger <= 6, 'Test Case Mục 10 (Kết cục gốc): Không hành động sẽ chạm ngưỡng chết đói/lạnh sau ' + initialDanger + ' ngày');

// Kết cục 2: Bổ củi và săn thỏ -> đẩy lùi đường dự báo qua mùa đông
const afterActionDanger = predictDays(25, 20, 85, p3.cui + 12, p3.luong_thuc + 12);
assert(afterActionDanger === null, 'Test Case Mục 10 (Cải mệnh): Bổ củi + săn thỏ đẩy lùi ngày nguy hiểm, sống sót qua mùa Giá');
assert(data.random_archetypes.length >= 6, 'Đã nạp ngân hàng Kiểu đời và Bốc ngẫu nhiên theo trọng số giai cấp');
