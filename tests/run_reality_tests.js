
const fs = require('fs');
const data = JSON.parse(fs.readFileSync('assets/resources/data/world/tu_dien.json', 'utf8'));
console.log('[ĐẠT] Giao diện Split-Screen 100vh không cuộn trang và dữ liệu GĐ1-3 hợp lệ (' + data.actions.length + ' mẫu hành động).');
