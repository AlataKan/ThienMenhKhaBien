// =========================================================================
// 1. ĐỊA ĐIỂM & MA TRẬN KHOẢNG CÁCH 2 CHIỀU ĐỐI XỨNG TUYỆT ĐỐI
// =========================================================================
const PLACES = [
  { id: "nha", short: "🏠 Gian nhà tranh", full: "Gian nhà tranh (Trong nhà)", isCity: false },
  { id: "duong_lang", short: "🏘️ Đường làng & Hỏa Đường", full: "Đường làng & Hiên Hỏa Đường", isCity: false },
  { id: "ruong_chu_ap", short: "🌾 Đồng Chủ Ấp", full: "Cánh đồng Chủ Ấp", isCity: false },
  { id: "bia_rung", short: "🌲 Bìa Rừng Đen", full: "Bìa Rừng Đen (Trên rừng)", isCity: false },
  { id: "cho_ben_say", short: "🧺 Chợ & Hội Phường", full: "Chợ Bến Sậy & Hội Phường", isCity: false },
  { id: "quan_bon_nga", short: "🍶 Quán Bốn Ngả", full: "Quán trọ Bốn Ngả (Máy tin đồn)", isCity: false },
  { id: "don_bien_ngan", short: "⚔️ Đồn Biên Ngạn", full: "Đồn Biên Ngạn & Lò Rèn Họ Khổng", isCity: true },
  { id: "kinh_hoai", short: "🏛️ Kinh đô Kinh Hoài", full: "Kinh đô Kinh Hoài & Nha Môn", isCity: true }
];

const PLACE_NAMES = {};
PLACES.forEach(p => PLACE_NAMES[p.id] = p.full);

const BASE_DIST_MINUTES = {
  nha:           { nha: 0,  duong_lang: 8,  ruong_chu_ap: 14, bia_rung: 20, cho_ben_say: 16, quan_bon_nga: 18, don_bien_ngan: 32, kinh_hoai: 40 },
  duong_lang:    { nha: 8,  duong_lang: 0,  ruong_chu_ap: 8,  bia_rung: 16, cho_ben_say: 10, quan_bon_nga: 12, don_bien_ngan: 28, kinh_hoai: 35 },
  ruong_chu_ap:  { nha: 14, duong_lang: 8,  ruong_chu_ap: 0,  bia_rung: 14, cho_ben_say: 12, quan_bon_nga: 15, don_bien_ngan: 30, kinh_hoai: 38 },
  bia_rung:      { nha: 20, duong_lang: 16, ruong_chu_ap: 14, bia_rung: 0,  cho_ben_say: 22, quan_bon_nga: 20, don_bien_ngan: 24, kinh_hoai: 45 },
  cho_ben_say:   { nha: 16, duong_lang: 10, ruong_chu_ap: 12, bia_rung: 22, cho_ben_say: 0,  quan_bon_nga: 6,  don_bien_ngan: 26, kinh_hoai: 30 },
  quan_bon_nga:  { nha: 18, duong_lang: 12, ruong_chu_ap: 15, bia_rung: 20, cho_ben_say: 6,  quan_bon_nga: 0,  don_bien_ngan: 22, kinh_hoai: 28 },
  don_bien_ngan: { nha: 32, duong_lang: 28, ruong_chu_ap: 30, bia_rung: 24, cho_ben_say: 26, quan_bon_nga: 22, don_bien_ngan: 0,  kinh_hoai: 36 },
  kinh_hoai:     { nha: 40, duong_lang: 35, ruong_chu_ap: 38, bia_rung: 45, cho_ben_say: 30, quan_bon_nga: 28, don_bien_ngan: 36, kinh_hoai: 0  }
};

const CONFIG = {
  seasons: ["Nảy (Xuân)", "Nắng (Hạ)", "Gặt (Thu)", "Giá (Đông)"],
  f_tuoi: {
    van_dong:   { tuoi_dinh: 22, q: 1.0, tuoi_suy: 35, tuoi_nua: 75, p: 2, san_gia: 0.15 },
    suc_manh:   { tuoi_dinh: 27, q: 1.0, tuoi_suy: 35, tuoi_nua: 70, p: 2, san_gia: 0.20 },
    chiu_dung:  { tuoi_dinh: 25, q: 1.0, tuoi_suy: 33, tuoi_nua: 65, p: 2, san_gia: 0.15 },
    tay_kheo:   { tuoi_dinh: 26, q: 0.8, tuoi_suy: 45, tuoi_nua: 80, p: 2, san_gia: 0.30 },
    thi_giac:   { tuoi_dinh: 20, q: 0.7, tuoi_suy: 40, tuoi_nua: 75, p: 2, san_gia: 0.30 },
    thinh_giac: { tuoi_dinh: 20, q: 0.7, tuoi_suy: 45, tuoi_nua: 80, p: 2, san_gia: 0.30 },
    noi:        { tuoi_dinh: 8,  q: 0.5, tuoi_suy: 70, tuoi_nua: 95, p: 2, san_gia: 0.50 },
    tri_nho:    { tuoi_dinh: 25, q: 0.8, tuoi_suy: 50, tuoi_nua: 85, p: 2, san_gia: 0.30 }
  }
};

// =========================================================================
// 2. HỆ THỐNG NPC THEO ĐỊA ĐIỂM & NIỀM TIN (BELIEF)
// =========================================================================
const NPCS_DB = [
  {
    id: "A14_NGO_TAM", ten: "Trưởng làng Ngô Tam", vai: "Trưởng làng Sậy Đỏ", tai_noi: "duong_lang",
    tai_an_noi: 55, than_thien_goc: 15,
    belief: "Ta tin rằng nếu các hộ trong làng đùm bọc nhau và giấu bớt sản lượng thóc thì mới mong sống sót qua kỳ thu thuế Khế.",
    loi_noi_that: "Này con, kỳ thu thuế mùa này rơi vào ngày 13 đến 15 đấy. Trong nhà có thóc lành thì nhớ đào hố dưới gầm phản mà cất bớt đi.",
    loi_noi_doi: "Kho lương trên huyện năm nay đầy ắp, quan trên hứa sẽ miễn giảm thuế cho làng ta rồi, cứ để thóc ngoài sân đừng lo!",
    dang_noi_doi: false,
    co_the_hoa_giai_feud: true
  },
  {
    id: "A44_MU_BAY_VE", ten: "Bà đỡ Mụ Bảy Ve", vai: "Bà đỡ & Y thuật dân gian", tai_noi: "duong_lang",
    tai_an_noi: 60, than_thien_goc: 20,
    belief: "Ta đã đỡ đẻ cho cả vùng Tam Giang này, ta biết rõ những ai mang vết bớt hay giữ kỷ vật của dòng họ cũ.",
    loi_noi_that: "Trời mùa Giá lạnh độc lắm, lên rừng nhớ hái lấy nắm gừng gió hay thảo dược về đun nước uống mới không bị ho lao.",
    loi_noi_doi: "Ta chỉ là bà già mù chữ trong xóm, chẳng biết mặt mũi người nhà quan hay chuyện đỡ đẻ năm xưa đâu.",
    dang_noi_doi: true
  },
  {
    id: "QUAN_TRANG_AP", ten: "Gã Quản Trang Chủ Ấp", vai: "Tay sai thu tô & Giám sát lao dịch", tai_noi: "ruong_chu_ap",
    tai_an_noi: 65, than_thien_goc: -20,
    belief: "Đám nông nô lúc nào cũng tìm cách giấu thóc, phải thẳng tay phạt roi hoặc ăn chặn mới giữ được kỷ luật.",
    loi_noi_that: "Cắt lúa cho nhanh cái tay lên! Đứa nào gặt sót gốc rạ hay nộp thiếu tô thì đừng trách cây roi mây của ta!",
    loi_noi_doi: "Cứ làm việc chăm chỉ đi, cuối vụ Chủ Ấp sẽ chia đôi ruộng tốt và miễn toàn bộ nợ thóc cho nhà ngươi!",
    dang_noi_doi: true,
    co_the_tong_tien: true
  },
  {
    id: "A31_MOC_PHAT", ten: "Chủ hiệu cầm đồ Mộc Phát", vai: "Chủ tiệm cầm đồ & Hội Phường Bến Sậy", tai_noi: "cho_ben_say",
    tai_an_noi: 75, than_thien_goc: 5,
    belief: "Trong ngăn tủ khóa kín của ta có giữ nửa con dấu cũ và cuốn sổ muối chưa ai dám chuộc, nhưng tuyệt đối không được để lộ.",
    loi_noi_that: "Muốn buôn bán yên ổn không bị tuần chợ tịch thu hàng thì đóng 8 xu sắt vào Hội Phường, ta cấp thẻ bài cho.",
    loi_noi_doi: "Tiệm cầm đồ của ta chỉ toàn nồi đồng rách với cuốc xẻng cũ của dân quê, làm gì có cuốn sổ muối hay ấn tín nào!",
    dang_noi_doi: true,
    co_the_tong_tien: true
  },
  {
    id: "A40_NGO_HANH", ten: "Bà chủ quán Ngô Hạnh", vai: "Chủ Quán trọ Bốn Ngả", tai_noi: "quan_bon_nga",
    tai_an_noi: 70, than_thien_goc: 15,
    belief: "Mọi tin đồn từ biên ải đến kinh thành đều đi qua bàn rượu của ta; ai giữ chữ tín thì ta che chở.",
    loi_noi_that: "Khách thương hồ vừa kháo nhau rằng Đoàn Thuyền đang đòi siết thuế bến sông, còn ở Biên Ngạn đang thiếu sắt rèn vũ khí.",
    loi_noi_doi: "Quán ta vắng khách cả tháng nay, chẳng có ai từ Kinh Hoài hay Biên Ngạn ghé qua nói chuyện gì đâu.",
    dang_noi_doi: false
  },
  {
    id: "A54_KHONG_THAO", ten: "Thợ rèn trẻ Khổng Thảo", vai: "Chủ lò rèn Biên Ngạn · Dòng dõi Khổng Bảo", tai_noi: "don_bien_ngan",
    tai_an_noi: 50, than_thien_goc: 10,
    belief: "Ba chấm khắc trên chuôi dao là dấu hiệu nhận nhau của dòng máu cũ từ thời lập quốc, ta chỉ truyền nghề cho người đáng tin.",
    loi_noi_that: "Muốn giữ mạng ở vùng biên này thì tay cầm đao phải chắc. Nếu ngươi chịu khó phụ kéo bễ rèn sắt, ta sẽ chỉ dạy đao pháp và nghề rèn.",
    loi_noi_doi: "Mấy chấm nhỏ trên chuôi con dao này chỉ là vết mẻ tình cờ lúc đập búa thôi, chẳng có ý nghĩa gì đâu.",
    dang_noi_doi: true
  },
  {
    id: "A39_HANG_TONG", ten: "Thẩm vấn viên Hạng Tông", vai: "Soi Lửa phái Tam Hỏa · Kinh Hoài", tai_noi: "kinh_hoai",
    tai_an_noi: 80, than_thien_goc: -10,
    belief: "Kỷ luật sắt và ngọn lửa thanh trừng của Tam Hỏa là thứ duy nhất ngăn vương quốc này rơi vào cảnh Đại Đói hỗn loạn lần nữa.",
    loi_noi_that: "Bất kỳ kẻ nào tàng trữ sách chép lậu hoặc phao tin làm loạn lòng dân đều sẽ bị đưa ra xét hỏi trước Hỏa Đường.",
    loi_noi_doi: "Hỏa Đường không hề giữ bản chép Niên Ký nào về món nợ của tiên vương cả, mọi lời đồn đều là bịa đặt.",
    dang_noi_doi: true
  }
];

// =========================================================================
// 3. DANH SÁCH HÀNH ĐỘNG TẠI CHỖ (TÍCH HỢP TRỌN VẸN GIAI ĐOẠN 1 - 9)
// =========================================================================
const ACTIONS = [
  // ==================== A. TRONG NHÀ (nha) ====================
  {
    mau: "ngu_qua_dem", ten_vi: "🛏️ Lên phản đắp chăn ngủ qua đêm tới sáng (Hồi phục toàn diện)", nhom: "Ngủ & Nghỉ ngơi",
    thoi_luong_mo: "tới 6h sáng", tai_noi: ["nha"], so_nhip: 4, sfx: "step", is_sleep: true,
    giai_doan: ["so_sinh", "au_nhi", "thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau_gio_dem: true, yeu_cau: {}, tag: ["ban_nang", "nghi_ngoi"],
    chi_phi: { the_luc: 0, chan: 0, doi: 0 }, ket_qua: { ngu_toi_sang: true },
    mo_ta: "Bạn cài cửa, kéo ổ rơm và chăn vải thô đắp kín người, chìm vào giấc ngủ sâu qua đêm lạnh."
  },
  {
    mau: "chop_mat_nghi", ten_vi: "💤 Chợp mắt nằm nghỉ trên phản gỗ (Hồi +28 Thể lực)", nhom: "Ngủ & Nghỉ ngơi",
    thoi_luong_mo: "24 phút", tai_noi: ["nha"], so_nhip: 4, sfx: "step",
    giai_doan: ["so_sinh", "au_nhi", "thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: {}, tag: ["ban_nang", "nghi_ngoi"],
    chi_phi: { the_luc: 7.0, chan: -2.0, doi: 0.6 }, ket_qua: {},
    mo_ta: "Bạn nằm duỗi lưng trên chiếc phản gỗ trong nhà, điều hòa hơi thở để cơ bắp phục hồi."
  },
  {
    mau: "khoc_goi_me", ten_vi: "Khóc gọi hơi ấm của mẹ", nhom: "Bản năng sơ sinh", thoi_luong_mo: "12 phút",
    tai_noi: ["nha"], so_nhip: 2, sfx: "step", giai_doan: ["so_sinh"], yeu_cau: { noi: 0 }, tag: ["ban_nang"],
    chi_phi: { the_luc: -1, chan: 0, doi: 1 }, ket_qua: { lanh: -15 },
    mo_ta: "Cổ họng bạn bật ra tiếng khóc khàn đặc, mẹ vội vã kéo thêm ổ rơm khô ủ ấm quanh người bạn."
  },
  {
    mau: "bu_me", ten_vi: "Bú sữa mẹ", nhom: "Bản năng sơ sinh", thoi_luong_mo: "18 phút",
    tai_noi: ["nha"], so_nhip: 3, sfx: "step", can_nguoi: "me", giai_doan: ["so_sinh"], yeu_cau: {}, tag: ["ban_nang"],
    chi_phi: { the_luc: 2, chan: -4, doi: -18 }, ket_qua: { lanh: -8, suc_khoe: 2 },
    mo_ta: "Hơi ấm từ lòng mẹ và dòng sữa nóng làm cái bụng nhỏ dịu cơn co thắt."
  },
  {
    mau: "an_luong_lanh", ten_vi: "🍚 Bắc nồi nấu cháo lương lành (Giảm mạnh cơn đói & hồi sức)", nhom: "Bếp núc & Ăn uống",
    thoi_luong_mo: "18 phút", tai_noi: ["nha"], so_nhip: 3, sfx: "fire",
    giai_doan: ["au_nhi", "thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: {}, req_check: { luong_lanh: 0.3, nuoc: 1 }, tieu_hao: { luong_lanh_linh_hoat: 0.4, nuoc: 1 }, tag: ["sinh_ton"],
    chi_phi: { the_luc: 4, chan: -4, doi: -22 }, ket_qua: { suc_khoe: 3, lanh: -10, bep_am: true },
    mo_ta: "Ở góc bếp trong nhà, bạn đun sôi gạo lành với nước sạch. Bát cháo nóng hổi làm cơ thể ấm sực và tỉnh táo hẳn lên."
  },
  {
    mau: "an_luong_moc", ten_vi: "🥣 Luộc kỹ lương ẩm mốc cầm hơi (Dùng khi thiếu gạo lành)", nhom: "Bếp núc & Ăn uống",
    thoi_luong_mo: "24 phút", tai_noi: ["nha"], so_nhip: 4, sfx: "fire",
    giai_doan: ["au_nhi", "thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: {}, req_check: { luong_moc: 0.4 }, tieu_hao: { luong_moc: 0.4 }, tag: ["sinh_ton"],
    chi_phi: { the_luc: 1, chan: 2, doi: -13 }, ket_qua: { an_luong_moc_xu_ly: true, bep_am: true },
    mo_ta: "Bạn gạn rửa nhiều lần rồi đun kỹ phần bột mốc trước khi nhắm mắt nuốt xuống để cầm cự qua cơn đói."
  },
  {
    mau: "phoi_sang_luong_moc", ten_vi: "☀️ Đem lương ẩm mốc ra sân sàng sảy & phơi nắng (Chuyển thành Lương lành)", nhom: "Bếp núc & Ăn uống",
    thoi_luong_mo: "24 phút", tai_noi: ["nha"], so_nhip: 4, sfx: "step",
    giai_doan: ["thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { tay_kheo: 1 }, req_check: { luong_moc: 0.4, ban_ngay: true }, tag: ["muu_sinh"],
    chi_phi: { the_luc: -1.2, chan: 0.5, doi: 0.8 }, ket_qua: { cuu_luong_moc: true },
    mo_ta: "Tranh thủ lúc ban ngày có nắng hanh, bạn trải nong ra hiên nhà, tỉ mẩn nhặt bỏ hạt thối và phơi khô số lương bị ẩm."
  },
  {
    mau: "dun_nuoc_sac_thuoc", ten_vi: "🍵 Đun nước sôi / Sắc thảo dược uống ấm bụng & trị bệnh", nhom: "Bếp núc & Ăn uống",
    thoi_luong_mo: "18 phút", tai_noi: ["nha"], so_nhip: 3, sfx: "fire",
    giai_doan: ["thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: {}, req_check: { nuoc: 1 }, tieu_hao: { nuoc: 1 }, tag: ["sinh_ton"],
    chi_phi: { the_luc: 2.0, chan: -1.5, doi: -2 }, ket_qua: { uong_nuoc_am: true, bep_am: true },
    mo_ta: "Bạn bắc siêu đất đun sôi gáo nước giếng (kèm lá thuốc nếu có), húp từng ngụm nóng giúp bụng êm lại và đẩy lùi khí lạnh."
  },
  {
    mau: "dot_lua_suoi", ten_vi: "🔥 Nhóm bếp củi sưởi ấm gian nhà (Xua tan rét cóng)", nhom: "Bếp núc & Ăn uống",
    thoi_luong_mo: "24 phút", tai_noi: ["nha"], so_nhip: 4, sfx: "fire",
    giai_doan: ["thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { tay_kheo: 0 }, req_check: { cui: 0.6 }, tieu_hao: { cui: 0.6 }, tag: ["sinh_ton"],
    chi_phi: { the_luc: 2.5, chan: -2, doi: 0.6 }, ket_qua: { lanh: -38, bep_am: true },
    mo_ta: "Ngọn lửa bập bùng bén vào củi khô trong bếp, xua đi cái lạnh cắt da đang luồn qua khe vách."
  },
  {
    mau: "cat_luong_xuong_ho", ten_vi: "🕳️ Cất giấu 0.5 phần Lương lành xuống hố gầm phản (Chống tịch thu)", nhom: "Nhà cửa & Phòng bị",
    thoi_luong_mo: "12 phút", tai_noi: ["nha"], so_nhip: 2, sfx: "step",
    giai_doan: ["thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { tay_kheo: 0 }, req_check: { luong_lanh: 0.5, ho_chua_day: true }, tag: ["sinh_ton"],
    chi_phi: { the_luc: -0.6, chan: 0, doi: 0.2 }, ket_qua: { cat_xuong_ho: true },
    mo_ta: "Bạn lật tấm ván mục dưới gầm phản tối om, đem 0.5 phần lương lành cất xuống hố đất rồi phủ tro lên trên."
  },
  {
    mau: "lay_luong_tu_ho", ten_vi: "🕳️ Lấy lương lành từ dưới hố gầm phản lên để nấu ăn", nhom: "Nhà cửa & Phòng bị",
    thoi_luong_mo: "6 phút", tai_noi: ["nha"], so_nhip: 1, sfx: "step",
    giai_doan: ["thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { tay_kheo: 0 }, req_check: { co_do_trong_ho: true }, tag: ["sinh_ton"],
    chi_phi: { the_luc: -0.3, chan: 0, doi: 0.1 }, ket_qua: { lay_tu_ho: true },
    mo_ta: "Bạn mở nắp hầm nhỏ dưới gầm phản, lấy toàn bộ phần lương thực dự phòng lên để chuẩn bị nấu cháo."
  },
  {
    mau: "cai_then_cua", ten_vi: "🔒 Cài / Mở then cửa gỗ đầu hồi", nhom: "Nhà cửa & Phòng bị",
    thoi_luong_mo: "6 phút", tai_noi: ["nha"], so_nhip: 1, sfx: "chop",
    giai_doan: ["thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { tay_kheo: 0 }, tag: ["sinh_ton"],
    chi_phi: { the_luc: -0.2, chan: 0, doi: 0.1 }, ket_qua: { doi_trang_thai_cua: true },
    mo_ta: "Bạn bước tới cánh cửa gỗ, điều chỉnh lại thanh cài then."
  },
  {
    mau: "va_vach_tranh", ten_vi: "🧱 Trát bùn & chèn rơm vá kín khe vách rách", nhom: "Nhà cửa & Phòng bị",
    thoi_luong_mo: "30 phút", tai_noi: ["nha"], so_nhip: 5, sfx: "step", chi_hien_khi_vach_rach: true,
    giai_doan: ["thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { tay_kheo: 1 }, req_check: { cui: 0.4 }, tieu_hao: { cui: 0.4 }, tag: ["sinh_ton"],
    chi_phi: { the_luc: -2.2, chan: 0.6, doi: 1.0 }, ket_qua: { va_kin_vach: true },
    mo_ta: "Bạn trộn bùn đất với rơm bện trát kín những khe hở trên vách nứa. Nhà vừa ấm hơn vừa ngăn người ngoài ngó trộm vào trong."
  },
  {
    mau: "chang_mai_nha", ten_vi: "🏠 Chằng lại kèo mái tranh chống gió lốc mùa Giá", nhom: "Nhà cửa & Phòng bị",
    thoi_luong_mo: "24 phút", tai_noi: ["nha"], so_nhip: 4, sfx: "chop", chi_hien_khi_mai_yeu: true,
    giai_doan: ["thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { tay_kheo: 1 }, req_check: { cui: 0.4 }, tieu_hao: { cui: 0.4 }, tag: ["sinh_ton"],
    chi_phi: { the_luc: -2.2, chan: 0.5, doi: 1.0 }, ket_qua: { gia_co_mai: true },
    mo_ta: "Bạn dùng dây mây và cành gỗ cứng buộc chặt lại các thanh xà mái hiên, yên tâm không sợ gió bấc giật tốc mái nữa."
  },
  {
    mau: "cham_soc_gia_dinh_sinh_con",
    ten_vi: "👶 Chăm sóc bạn đời & Đón con chào đời (-1.0 Lương lành, -1 Thảo dược · Cần Mụ Bảy Ve đỡ đẻ)",
    nhom: "Gia đình & Vòng đời",
    thoi_luong_mo: "nửa ngày", tai_noi: ["nha"], so_nhip: 6, sfx: "fire",
    giai_doan: ["truong_thanh", "trung_nien"],
    yeu_cau: {}, req_check: { da_ket_hon: true, luong_lanh: 1.0, thao_duoc: 1 },
    tieu_hao: { luong_lanh_linh_hoat: 1.0, thao_duoc: 1 }, tag: ["sinh_ton", "doi_doi"],
    chi_phi: { the_luc: -3.0, chan: -20.0, doi: 1.5 }, ket_qua: { sinh_con_thanh_cong: true },
    mo_ta: "Nhờ chuẩn bị sẵn gạo lành nấu cháo bổ dưỡng và lá thuốc ấm, ca vượt cạn trong gian nhà tranh diễn ra suôn sẻ. Tiếng khóc chào đời của đứa trẻ vang lên ấm áp!"
  },
  {
    mau: "ben_duoc_di_dem", ten_vi: "🔦 Bện bó đuốc tẩm nhựa thông (Để soi đường đi rừng ban đêm)", nhom: "Thủ công & Rèn luyện",
    thoi_luong_mo: "12 phút", tai_noi: ["nha"], so_nhip: 2, sfx: "fire",
    giai_doan: ["thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { tay_kheo: 1 }, req_check: { cui: 0.3 }, tieu_hao: { cui: 0.3 }, tag: ["muu_sinh"],
    chi_phi: { the_luc: -0.8, chan: 0, doi: 0.4 }, ket_qua: { tao_duoc: 1 },
    mo_ta: "Bạn bó chặt cành khô với giẻ tẩm nhựa thông, tạo thành cây đuốc sáng rực giúp đi rừng ban đêm không sợ lạc hay thú dữ."
  },
  {
    mau: "bo_cui_tai_nha", ten_vi: "🪓 Bổ khúc gỗ thô thành củi đốt (+1.5 Bó củi khô)", nhom: "Thủ công & Rèn luyện",
    thoi_luong_mo: "30 phút", tai_noi: ["nha"], so_nhip: 5, sfx: "chop",
    giai_doan: ["thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { suc_manh: 1, tay_kheo: 1 }, req_check: { go_tho: 1.0, co_riu: true }, tieu_hao: { go_tho: 1.0 }, tag: ["muu_sinh"],
    chi_phi: { the_luc: -2.8, chan: 0.8, doi: 1.4 }, ket_qua: { cui: 1.5 },
    mo_ta: "Ở hiên sau nhà, bạn vung rìu bổ những khúc gỗ thô mang từ rừng về thành từng thanh củi nhỏ xếp gọn gàng."
  },
  {
    mau: "dan_ro_ben_thung", ten_vi: "🧺 Ngồi đan rổ rá / Bện thừng rơm (+1 Đồ đan đem ra chợ bán lấy xu)", nhom: "Thủ công & Rèn luyện",
    thoi_luong_mo: "30 phút", tai_noi: ["nha"], so_nhip: 5, sfx: "step",
    giai_doan: ["thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { tay_kheo: 1 }, tag: ["muu_sinh"],
    chi_phi: { the_luc: -1.3, chan: 0.4, doi: 1.0 }, ket_qua: { do_dan_lat: 1 },
    mo_ta: "Ngồi trong nhà tránh gió (dù mắt mờ hay đêm tối vẫn lần tay làm được), bạn chẻ tre bện rơm đan thành chiếc rổ chắc chắn."
  },
  {
    mau: "on_chu_doc_sach_nha", ten_vi: "📖 Ngồi bên đèn dầu ôn luyện mặt chữ & nghiền ngẫm sách (+Tri thức)", nhom: "Thủ công & Rèn luyện",
    thoi_luong_mo: "30 phút", tai_noi: ["nha"], so_nhip: 5, sfx: "step",
    giai_doan: ["thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { thi_giac: 1, tri_nho: 1 }, req_check: { tri_thuc_min: 1 }, tag: ["tri_thuc"],
    chi_phi: { the_luc: -0.8, chan: 0.5, doi: 0.8 }, ket_qua: { tang_tri_thuc: 1 },
    mo_ta: "Bạn lấy que củi cháy dở vạch từng nét chữ lên nền đất phẳng trong nhà, ôn lại những chữ đã học."
  },
  {
    mau: "luyen_dao_phap_san_nha", ten_vi: "🗡️ Đứng tấn & Vung đao gỗ luyện võ ngoài sân nhà (+Võ nghệ)", nhom: "Thủ công & Rèn luyện",
    thoi_luong_mo: "30 phút", tai_noi: ["nha"], so_nhip: 5, sfx: "chop",
    giai_doan: ["thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien"],
    yeu_cau: { van_dong: 1, suc_manh: 1 }, tag: ["vo_thuat"],
    chi_phi: { the_luc: -3.0, chan: -0.5, doi: 1.6 }, ket_qua: { tang_vo_nghe: 1 },
    mo_ta: "Bạn đứng tấn vững chãi giữa khoảng sân hẹp, tập từng đường đao chém gió rèn luyện gân cốt."
  },

  // ==================== B. ĐƯỜNG LÀNG & HỎA ĐƯỜNG (duong_lang) ====================
  {
    mau: "ganh_nuoc_gieng", ten_vi: "💧 Ra giếng làng kéo nước sạch về nhà (+3 Gáo nước)", nhom: "Việc làng xóm",
    thoi_luong_mo: "18 phút", tai_noi: ["duong_lang"], so_nhip: 3, sfx: "step",
    giai_doan: ["thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { van_dong: 1 }, tag: ["sinh_ton"],
    chi_phi: { the_luc: -1.6, chan: 0.2, doi: 0.8 }, ket_qua: { nuoc: 3 },
    mo_ta: "Bạn thả gầu gỗ xuống giếng đá đầu làng, kéo lên làn nước trong vắt mang về đổ đầy chum."
  },
  {
    mau: "cuu_giup_xom_gieng_delta",
    ten_vi: "🤝 San sẻ 0.6 Lương lành & 0.5 Củi cứu hộ nghèo trong xóm qua cơn đói (Tạo Delta cấp Làng)",
    nhom: "Việc làng xóm", thoi_luong_mo: "18 phút", tai_noi: ["duong_lang"], so_nhip: 3, sfx: "fire",
    giai_doan: ["thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: {}, req_check: { luong_lanh: 0.6, cui: 0.5 }, tieu_hao: { luong_lanh_linh_hoat: 0.6, cui: 0.5 }, tag: ["xa_hoi", "doi_doi"],
    chi_phi: { the_luc: -1.0, chan: -8.0, doi: 0.5 }, ket_qua: { delta_cuu_lang: true },
    mo_ta: "Bạn mang phần gạo lành và củi khô sang chia cho gia đình người hàng xóm đang lả đi vì đói lạnh, giữ lại mạng sống cho một hộ dân vốn sẽ gục ngã trong mùa Giá."
  },
  {
    mau: "nho_lam_moi_ket_hon",
    ten_vi: "💍 Nhờ người làm mối & Sắm lễ cưới hỏi lập gia đình (-12 Xu sắt · Yêu cầu từ 18 tuổi)",
    nhom: "Gia đình & Vòng đời", thoi_luong_mo: "1 buổi", tai_noi: ["duong_lang"], so_nhip: 6, sfx: "fire",
    giai_doan: ["truong_thanh", "trung_nien"],
    yeu_cau: { noi: 1 }, req_check: { xu_sat: 12, chua_ket_hon: true, tuoi_18: true, khong_tieng_xau_nang: true },
    tieu_hao: { xu_sat: 12 }, tag: ["xa_hoi", "doi_doi"],
    chi_phi: { the_luc: -2.0, chan: -15.0, doi: 1.0 }, ket_qua: { ket_hon_thanh_cong: true },
    mo_ta: "Bạn sắm sửa sính lễ trầu cau và 12 đồng xu sắt nhờ bà mối cùng trưởng làng chứng giám, chính thức đón người bạn đời về chung sống dưới mái nhà tranh!"
  },
  {
    mau: "hoc_chu_hoa_duong", ten_vi: "📚 Ngồi nghe giảng sư Nhất Hỏa dạy nhận mặt chữ (+Tri thức / Mở khóa Biết chữ)", nhom: "Tôn giáo & Học chữ",
    thoi_luong_mo: "30 phút", tai_noi: ["duong_lang"], so_nhip: 5, sfx: "step",
    giai_doan: ["thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { tri_nho: 1 }, req_check: { ban_ngay: true }, tag: ["tri_thuc"],
    chi_phi: { the_luc: -1.0, chan: 0.6, doi: 0.9 }, ket_qua: { hoc_chu_lang: true },
    mo_ta: "Dưới hiên thánh đường Nhất Hỏa, vị giảng sư kiên nhẫn viết từng chữ đơn giản lên bảng gỗ để dạy dân nghèo."
  },
  {
    mau: "du_le_cau_nguyen", ten_vi: "🕯️ Dự lễ cầu nguyện & Bố thí ở Hỏa Đường (+Tín nhiệm tôn giáo, giảm Sợ/Chán)", nhom: "Tôn giáo & Học chữ",
    thoi_luong_mo: "24 phút", tai_noi: ["duong_lang"], so_nhip: 4, sfx: "fire",
    giai_doan: ["thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: {}, tag: ["ton_giao"],
    chi_phi: { the_luc: -0.4, chan: -4.0, doi: 0.6 }, ket_qua: { tang_tin_nhiem_ton_giao: 8 },
    mo_ta: "Bạn đứng trước ngọn Sinh Hỏa trong thánh đường làng, lắng nghe lời giảng của Cha Đường khiến lòng nhẹ bớt nỗi bất an."
  },
  {
    mau: "xin_chao_hoa_duong", ten_vi: "🥣 Xếp hàng trước hiên Nhất Hỏa xin cháo bố thí", nhom: "Tôn giáo & Học chữ",
    thoi_luong_mo: "24 phút", tai_noi: ["duong_lang"], so_nhip: 4, sfx: "step",
    giai_doan: ["au_nhi", "thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { van_dong: 1 }, tag: ["xa_hoi"],
    chi_phi: { the_luc: -0.7, chan: 1.0, doi: 0.4 }, ket_qua: { xin_an_ngau_nhien: true },
    mo_ta: "Bạn cầm bát đứng chờ trước nồi cháo công của các tu sĩ Nhất Hỏa."
  },
  {
    mau: "xin_thuoc_hoa_duong", ten_vi: "🌿 Nhờ nữ tu y sĩ Nhất Hỏa bắt mạch & xin thuốc (+8 Sức khỏe, trị bệnh)", nhom: "Tôn giáo & Học chữ",
    thoi_luong_mo: "24 phút", tai_noi: ["duong_lang"], so_nhip: 4, sfx: "step",
    giai_doan: ["thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { noi: 1 }, req_check: { ban_ngay: true }, tag: ["sinh_ton"],
    chi_phi: { the_luc: -0.7, chan: 0, doi: 0.7 }, ket_qua: { kham_benh_mien_phi: true },
    mo_ta: "Bạn ngồi chờ ở hiên nhà thuốc từ thiện để nữ tu y sĩ kiểm tra vết thương và phát thảo dược."
  },
  {
    mau: "mot_rau_ven_muong", ten_vi: "🌱 Mót rau má, đào củ chuối ven bờ mương (+0.35 Lương lành)", nhom: "Việc làng xóm",
    thoi_luong_mo: "24 phút", tai_noi: ["duong_lang"], so_nhip: 4, sfx: "step",
    giai_doan: ["thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { van_dong: 1 }, tag: ["muu_sinh"],
    chi_phi: { the_luc: -1.6, chan: 0.8, doi: 1.0 }, ket_qua: { hai_rau_muong: true },
    mo_ta: "Bạn men theo bờ mương cạn quanh làng, vạch cỏ tìm những bụi rau dại và củ chuối non sạch sẽ."
  },

  // ==================== C. TRÊN BÌA RỪNG ĐEN (bia_rung) ====================
  {
    mau: "nhat_cui_rung", ten_vi: "🔥 Lội rừng nhặt cành củi khô gãy rụng (+0.7 Bó củi khô)", nhom: "Kiếm củi & Hái lượm",
    thoi_luong_mo: "30 phút", tai_noi: ["bia_rung"], so_nhip: 5, sfx: "step",
    giai_doan: ["thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { van_dong: 1 }, tag: ["muu_sinh"],
    chi_phi: { the_luc: -2.0, chan: 0.8, doi: 1.4 }, ket_qua: { cui: 0.7 },
    mo_ta: "Dưới tán cây của Bìa Rừng Đen, bạn gom những cành củi khô gãy rụng bó chặt lại mang về."
  },
  {
    mau: "don_go_rung", ten_vi: "🪵 Vung rìu đốn khúc gỗ lớn (+1.4 Gỗ thô mang về nhà bổ củi)", nhom: "Kiếm củi & Hái lượm",
    thoi_luong_mo: "36 phút", tai_noi: ["bia_rung"], so_nhip: 6, sfx: "chop",
    giai_doan: ["thieu_nien", "truong_thanh", "trung_nien"],
    yeu_cau: { suc_manh: 1, van_dong: 1 }, req_check: { co_riu: true }, tag: ["muu_sinh"],
    chi_phi: { the_luc: -3.2, chan: 1.0, doi: 1.8 }, ket_qua: { go_tho: 1.4 },
    mo_ta: "Bạn chọn những thân cây khô trên sườn đồi, vung rìu chặt thành từng khúc gỗ thô vác về nhà."
  },
  {
    mau: "hai_thao_duoc_nam", ten_vi: "🌿 Tìm hái thảo dược, gừng gió & củ mài (+1 Thảo dược, +0.35 Lương lành)", nhom: "Kiếm củi & Hái lượm",
    thoi_luong_mo: "30 phút", tai_noi: ["bia_rung"], so_nhip: 5, sfx: "step",
    giai_doan: ["thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { van_dong: 1, thi_giac: 1 }, tag: ["muu_sinh"],
    chi_phi: { the_luc: -1.8, chan: 0.4, doi: 1.3 }, ket_qua: { hai_loc_rung: true },
    mo_ta: "Bạn lần theo các hốc đá ẩm tìm lá thuốc dân gian, củ mài và nấm rừng."
  },
  {
    mau: "san_tho_bia_rung", ten_vi: "🏹 Gài bẫy dây bắt thỏ hoang & gà rừng", nhom: "Săn bắt",
    thoi_luong_mo: "36 phút", tai_noi: ["bia_rung"], so_nhip: 6, sfx: "step",
    giai_doan: ["thieu_nien", "truong_thanh", "trung_nien"],
    yeu_cau: { van_dong: 1, thi_giac: 1 }, tag: ["muu_sinh"],
    chi_phi: { the_luc: -3.0, chan: 0.6, doi: 1.6 }, ket_qua: { san_bat_ngau_nhien: true },
    mo_ta: "Bạn lần theo vết chân thú trên lớp lá mục, kiên nhẫn gài dây bẫy ở lối mòn thú hoang hay qua lại."
  },

  // ==================== D. CÁNH ĐỒNG CHỦ ẤP (ruong_chu_ap) ====================
  {
    mau: "gat_lua_lao_dich", ten_vi: "🌾 Còng lưng gặt lúa lao dịch nộp Chủ Ấp (Nhận thóc / xu công)", nhom: "Ngoài đồng",
    thoi_luong_mo: "36 phút", tai_noi: ["ruong_chu_ap"], so_nhip: 6, sfx: "chop",
    giai_doan: ["thieu_nien", "truong_thanh", "trung_nien"],
    yeu_cau: { suc_manh: 2, van_dong: 2 }, tag: ["muu_sinh"],
    chi_phi: { the_luc: -3.5, chan: 1.8, doi: 1.8 }, ket_qua: { tra_cong_lao_dich: true },
    mo_ta: "Giữa cánh đồng của Chủ Ấp, bạn còng lưng cắt từng lượm lúa dưới ánh mắt soi mói của gã quản trang."
  },
  {
    mau: "mot_lua_roi", ten_vi: "🌾 Cúi mót bông lúa sót lại & mò củ ấu ven đầm", nhom: "Ngoài đồng",
    thoi_luong_mo: "24 phút", tai_noi: ["ruong_chu_ap"], so_nhip: 4, sfx: "step",
    giai_doan: ["thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { van_dong: 1 }, tag: ["muu_sinh"],
    chi_phi: { the_luc: -1.8, chan: 1.0, doi: 1.2 }, ket_qua: { mot_lua_ngau_nhien: true },
    mo_ta: "Bạn cúi mò từng bông lúa sót lại trên gốc rạ và vớt củ ấu già ven đầm."
  },

  // ==================== E. CHỢ BẾN SẬY & HỘI PHƯỜNG (cho_ben_say) ====================
  {
    mau: "mua_gao_bang_xu", ten_vi: "🍚 Dùng 2 Xu sắt đong Gạo lành (Sản lượng tùy giá chợ 4 mùa)", nhom: "Mua bán & Hội Phường",
    thoi_luong_mo: "12 phút", tai_noi: ["cho_ben_say"], so_nhip: 2, sfx: "step",
    giai_doan: ["thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { noi: 1 }, req_check: { xu_sat: 2 }, tieu_hao: { xu_sat: 2 }, tag: ["sinh_ton"],
    chi_phi: { the_luc: -0.4, chan: -1, doi: 0.2 }, ket_qua: { luong_lanh: 0.7 },
    mo_ta: "Bạn trao 2 đồng xu sắt cho hàng gạo ở Bến Sậy, đong đầy túi gạo trắng thơm mang về."
  },
  {
    mau: "doi_cui_lay_gao", ten_vi: "🔥 Đem 1.0 bó Củi khô đổi lấy Lương lành (Mùa Giá được giá cao)", nhom: "Mua bán & Hội Phường",
    thoi_luong_mo: "18 phút", tai_noi: ["cho_ben_say"], so_nhip: 3, sfx: "step",
    giai_doan: ["thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { van_dong: 1, noi: 1 }, req_check: { cui: 1.0 }, tieu_hao: { cui: 1.0 }, tag: ["xa_hoi"],
    chi_phi: { the_luc: -0.6, chan: 0, doi: 0.5 }, ket_qua: { luong_lanh: 0.55 },
    mo_ta: "Ở góc chợ Bến Sậy, bạn đổi bó củi khô lấy một túi gạo sạch."
  },
  {
    mau: "ban_do_dan_lat", ten_vi: "🧺 Bán 1 Đồ đan lát lấy Xu sắt (Thành viên Hội Phường được giá gấp rưỡi!)", nhom: "Mua bán & Hội Phường",
    thoi_luong_mo: "18 phút", tai_noi: ["cho_ben_say"], so_nhip: 3, sfx: "step",
    giai_doan: ["thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { noi: 1 }, req_check: { do_dan_lat: 1 }, tieu_hao: { do_dan_lat: 1 }, tag: ["muu_sinh"],
    chi_phi: { the_luc: -0.6, chan: 0.2, doi: 0.5 }, ket_qua: { ban_do_dan_xu_ly: true },
    mo_ta: "Bạn bày bán chiếc rổ tre mình tự đan cho khách đi chợ Bến Sậy."
  },
  {
    mau: "ban_thao_duoc_cho", ten_vi: "🌿 Bán 1 nắm Thảo dược rừng lấy +4 Xu sắt", nhom: "Mua bán & Hội Phường",
    thoi_luong_mo: "18 phút", tai_noi: ["cho_ben_say"], so_nhip: 3, sfx: "step",
    giai_doan: ["thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { noi: 1 }, req_check: { thao_duoc: 1 }, tieu_hao: { thao_duoc: 1 }, tag: ["muu_sinh"],
    chi_phi: { the_luc: -0.5, chan: 0, doi: 0.4 }, ket_qua: { xu_sat: 4, tang_buon_ban: 1 },
    mo_ta: "Hiệu thuốc ở chợ Bến Sậy thu mua ngay nắm thảo dược rừng của bạn với giá 4 đồng xu sắt."
  },
  {
    mau: "xin_vao_hoi_phuong", ten_vi: "🪪 Đóng 8 Xu sắt xin gia nhập HỘI PHƯỜNG (Bán đồ đan/thủ công giá cao, được bảo vệ)", nhom: "Mua bán & Hội Phường",
    thoi_luong_mo: "30 phút", tai_noi: ["cho_ben_say"], so_nhip: 4, sfx: "step", chi_hien_khi_chua_vao_hoi: true,
    giai_doan: ["thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { tay_kheo: 1, noi: 1 }, req_check: { xu_sat: 8, khong_tieng_xau_nang: true }, tieu_hao: { xu_sat: 8 }, tag: ["doi_doi"],
    chi_phi: { the_luc: -0.8, chan: -5.0, doi: 0.5 }, ket_qua: { vao_hoi_phuong: true },
    mo_ta: "Bạn nộp 8 đồng xu sắt phí nhập hội và vượt qua bài kiểm tra tay nghề, chính thức nhận thẻ bài Hội Phường!"
  },
  {
    mau: "tim_mua_ky_vat_cam_do", ten_vi: "🔍 Chuộc lại món đồ cũ bỏ quên trong góc tiệm cầm đồ (-5 Xu sắt)", nhom: "Mua bán & Hội Phường",
    thoi_luong_mo: "18 phút", tai_noi: ["cho_ben_say"], so_nhip: 3, sfx: "step",
    giai_doan: ["thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { noi: 1 }, req_check: { xu_sat: 5 }, tieu_hao: { xu_sat: 5 }, tag: ["thong_tin"],
    chi_phi: { the_luc: -0.5, chan: -2.0, doi: 0.4 }, ket_qua: { chuoc_ky_vat_cho: true },
    mo_ta: "Bạn trả 5 đồng xu sắt cho chủ tiệm cầm đồ Mộc Phát để lấy một bọc vải cũ phủ đầy bụi nằm sâu trong ngăn tủ góc tiệm."
  },
  {
    mau: "mua_kien_hang_buon", ten_vi: "📦 Gom 1 Kiện hàng quê giá sỉ (-6 Xu sắt -> Đem lên Kinh Hoài bán lấy 13 Xu)", nhom: "Mua bán & Hội Phường",
    thoi_luong_mo: "24 phút", tai_noi: ["cho_ben_say"], so_nhip: 4, sfx: "step",
    giai_doan: ["thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { noi: 1 }, req_check: { xu_sat: 6 }, tieu_hao: { xu_sat: 6 }, tag: ["thuong_mai"],
    chi_phi: { the_luc: -1.2, chan: -0.5, doi: 0.8 }, ket_qua: { hang_buon: 1, tang_buon_ban: 1 },
    mo_ta: "Bạn gom mua một kiện tơ thô và muối hạt tại bến sông với giá 6 xu sắt để chuẩn bị gánh lên Kinh Hoài."
  },
  {
    mau: "boc_vac_ben_thuyen", ten_vi: "⚓ Bốc vác bao hàng thuê ở bến thuyền (+3 Xu sắt)", nhom: "Làm thuê & Ngoài lề",
    thoi_luong_mo: "36 phút", tai_noi: ["cho_ben_say"], so_nhip: 6, sfx: "chop",
    giai_doan: ["thieu_nien", "truong_thanh", "trung_nien"],
    yeu_cau: { suc_manh: 2, van_dong: 2 }, req_check: { khong_tieng_xau_nang: true }, tag: ["muu_sinh"],
    chi_phi: { the_luc: -3.5, chan: 1.2, doi: 1.8 }, ket_qua: { xu_sat: 3 },
    mo_ta: "Bạn vác từng bao muối nặng trịch từ dưới thuyền lên bến, nhận 3 đồng xu sắt tiền công."
  },
  {
    mau: "moc_tui_cho_phien", ten_vi: "🕵️ [Sống ngoài lề] Lợi dụng đám đông móc túi khách qua chợ (Rủi ro bị bắt theo giai cấp)", nhom: "Làm thuê & Ngoài lề",
    thoi_luong_mo: "12 phút", tai_noi: ["cho_ben_say"], so_nhip: 2, sfx: "step", is_outlaw: true,
    giai_doan: ["thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien"],
    yeu_cau: { tay_kheo: 1, van_dong: 1 }, tag: ["bat_hop_phap"],
    chi_phi: { the_luc: -1.0, chan: 0, doi: 0.5 }, ket_qua: { moc_tui_xu_ly: true },
    mo_ta: "Bạn áp sát một khách buôn đang mải mặc cả giữa chợ phiên Bến Sậy, nhẹ nhàng lách ngón tay vào túi tiền bên hông hắn..."
  },

  // ==================== F. QUÁN TRỌ BỐN NGẢ (quan_bon_nga) ====================
  {
    mau: "hat_rong_ke_chuyen", ten_vi: "🎶 Hát rong / Kể chuyện xưa cho khách thương hồ (+2 Xu sắt & ăn lót dạ)", nhom: "Tại quán trọ",
    thoi_luong_mo: "30 phút", tai_noi: ["quan_bon_nga"], so_nhip: 5, sfx: "step",
    giai_doan: ["thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { noi: 1, thinh_giac: 1 }, tag: ["xa_hoi"],
    chi_phi: { the_luc: -1.2, chan: -1.0, doi: 0.5 }, ket_qua: { hat_rong_quan: true },
    mo_ta: "Bạn cất giọng hát khúc ca cổ giữa quán rượu, khách thương hồ vỗ bàn thưởng 2 đồng xu sắt và nửa chiếc bánh nướng."
  },
  {
    mau: "phu_rua_bat_che_cui", ten_vi: "🍲 Phụ rửa bát & chẻ củi sau bếp cho bà chủ Ngô Hạnh (+0.4 Lương lành, +0.3 Củi)", nhom: "Tại quán trọ",
    thoi_luong_mo: "30 phút", tai_noi: ["quan_bon_nga"], so_nhip: 5, sfx: "chop",
    giai_doan: ["thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { tay_kheo: 1 }, tag: ["muu_sinh"],
    chi_phi: { the_luc: -2.0, chan: 1.0, doi: 0.8 }, ket_qua: { phu_bep_quan: true },
    mo_ta: "Bạn ngồi sau bếp quán trọ cọ rửa chồng bát đĩa và nhóm lò giúp bà chủ Ngô Hạnh."
  },
  {
    mau: "phao_tin_don_quan_ruou", ten_vi: "🗣️ [Vũ khí thông tin] Chủ động phao tin đồn tại bàn rượu (Tạo/Dập lời đồn)", nhom: "Tin đồn & Ngoài lề",
    thoi_luong_mo: "24 phút", tai_noi: ["quan_bon_nga"], so_nhip: 4, sfx: "step",
    giai_doan: ["thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { noi: 1 }, req_check: { xu_sat: 1 }, tieu_hao: { xu_sat: 1 }, tag: ["thong_tin"],
    chi_phi: { the_luc: -0.8, chan: -1.5, doi: 0.5 }, ket_qua: { phao_tin_xu_ly: true },
    mo_ta: "Bạn bỏ ra 1 đồng xu sắt mua rượu mời mấy gã lái buôn ngồi đầu bàn, khéo léo gieo câu chuyện theo ý mình để nó lan đi khắp vùng."
  },
  {
    mau: "ngu_tro_quan_bon_nga", ten_vi: "🛏️ Thuê chiếu góc quán ngủ qua đêm tới sáng (-1 Xu sắt, ấm áp an toàn)", nhom: "Tại quán trọ",
    thoi_luong_mo: "tới 6h sáng", tai_noi: ["quan_bon_nga"], so_nhip: 4, sfx: "step", is_sleep: true,
    giai_doan: ["thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau_gio_dem: true, yeu_cau: {}, req_check: { xu_sat: 1 }, tieu_hao: { xu_sat: 1 }, tag: ["nghi_ngoi"],
    chi_phi: { the_luc: 0, chan: 0, doi: 0 }, ket_qua: { ngu_toi_sang: true },
    mo_ta: "Bạn trả 1 đồng xu sắt cho bà chủ quán, được trải chiếu nằm cạnh lò rượu ấm áp ngủ một mạch tới sáng."
  },

  // ==================== G. ĐỒN BIÊN NGẠN & LÒ RÈN (don_bien_ngan) ====================
  {
    mau: "hoc_vo_bien_ngan", ten_vi: "⚔️ Theo đội trưởng Phạm Hổ luyện Đao pháp & Cận chiến (+2 Võ nghệ)", nhom: "Võ thuật & Binh nghiệp",
    thoi_luong_mo: "36 phút", tai_noi: ["don_bien_ngan"], so_nhip: 6, sfx: "chop",
    giai_doan: ["thieu_nien", "truong_thanh", "trung_nien"],
    yeu_cau: { van_dong: 1, suc_manh: 1 }, tag: ["vo_thuat"],
    chi_phi: { the_luc: -3.6, chan: -1.0, doi: 1.8 }, ket_qua: { tang_vo_nghe: 2 },
    mo_ta: "Trên bãi tập gió cát của Đồn Biên Ngạn, bạn được chỉ điểm cách bước bộ, đỡ đòn và vung đao dứt khoát."
  },
  {
    mau: "phu_lo_ren_ho_khong", ten_vi: "🔨 Phụ kéo bễ & đập sắt tại Lò rèn Khổng Thảo (+3 Xu sắt, +1 Võ nghệ)", nhom: "Võ thuật & Binh nghiệp",
    thoi_luong_mo: "36 phút", tai_noi: ["don_bien_ngan"], so_nhip: 6, sfx: "chop",
    giai_doan: ["thieu_nien", "truong_thanh", "trung_nien"],
    yeu_cau: { suc_manh: 1, tay_kheo: 1 }, tag: ["muu_sinh"],
    chi_phi: { the_luc: -3.2, chan: 0.5, doi: 1.6 }, ket_qua: { xu_sat: 3, tang_vo_nghe: 1, lanh: -15 },
    mo_ta: "Hơi lửa lò rèn nóng rực làm tan hết giá lạnh. Bạn vung búa đập từng phôi thép đỏ hồng cùng thợ rèn dòng họ Khổng."
  },
  {
    mau: "nhan_bao_tieu_thuong_doan", ten_vi: "🛡️ Nhận đi Bảo tiêu hộ tống xe hàng qua đèo (+8 Xu sắt, +2 Võ nghệ, +Danh dự)", nhom: "Võ thuật & Binh nghiệp",
    thoi_luong_mo: "48 phút", tai_noi: ["don_bien_ngan"], so_nhip: 7, sfx: "chop",
    giai_doan: ["thieu_nien", "truong_thanh", "trung_nien"],
    yeu_cau: { van_dong: 2, suc_manh: 1 }, req_check: { vo_nghe_min: 3 }, tag: ["vo_thuat"],
    chi_phi: { the_luc: -4.0, chan: -1.5, doi: 2.0 }, ket_qua: { xu_sat: 8, tang_vo_nghe: 2, tang_danh_du: 10 },
    mo_ta: "Nhờ võ nghệ vững vàng, bạn cầm đao đi kèm xe hàng qua hẻm núi Biên Ngạn, đánh đuổi đám cướp vặt và nhận 8 đồng xu sắt hậu hĩnh!"
  },
  {
    mau: "trao_ky_vat_bien_ngan",
    ten_vi: "🗡️ Đưa kỷ vật (Dao ba chấm / Ấn ngọc gãy) cho người giữ đồn Biên Ngạn (Tạo Delta Hòa giải biên ải)",
    nhom: "Đổi Đời & Thăng Tiến", thoi_luong_mo: "30 phút", tai_noi: ["don_bien_ngan"], so_nhip: 4, sfx: "step",
    giai_doan: ["thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { noi: 1 }, req_check: { co_ky_vat: true }, tag: ["doi_doi"],
    chi_phi: { the_luc: -1.5, chan: -10.0, doi: 0.8 }, ket_qua: { delta_hoa_giai_bien_ai: true },
    mo_ta: "Nhìn thấy kỷ vật bạn trao tận tay, thợ rèn họ Khổng và đội trưởng đồn biên lặng người đi rồi lập tức cử người mang tín vật lên núi thương lượng, làm dịu hẳn nguy cơ xung đột đẫm máu ở Bạch Lĩnh!"
  },
  {
    mau: "lap_cong_phong_kiem_dien", ten_vi: "🎖️ Đầu quân lập chiến công trấn ải -> Phong bậc KIẾM ĐIỀN (Đổi giai cấp & Cấp ruộng!)", nhom: "Đổi Đời & Thăng Tiến",
    thoi_luong_mo: "1 buổi", tai_noi: ["don_bien_ngan"], so_nhip: 7, sfx: "chop",
    giai_doan: ["thieu_nien", "truong_thanh", "trung_nien"],
    yeu_cau: { van_dong: 2, suc_manh: 2 }, req_check: { vo_nghe_min: 8 }, tag: ["doi_doi"],
    chi_phi: { the_luc: -4.5, chan: -5.0, doi: 2.0 }, ket_qua: { thang_cap_kiem_dien: true },
    mo_ta: "Bạn dẫn đầu toán tuần tiễu đẩy lùi cuộc đột kích ở sườn Bạch Lĩnh, chính thức được ghi tên vào ngạch Kiếm Điền (Tiểu quý tộc quân nhân)!"
  },

  // ==================== H. KINH ĐÔ KINH HOÀI (kinh_hoai) ====================
  {
    mau: "ban_kien_hang_kinh_hoai", ten_vi: "💰 Bán Kiện hàng quê cho Bang Hàng Kinh Hoài (+13 Xu sắt, +Tín nhiệm thương mại)", nhom: "Thương trường Kinh Đô",
    thoi_luong_mo: "24 phút", tai_noi: ["kinh_hoai"], so_nhip: 4, sfx: "step",
    giai_doan: ["thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { noi: 1 }, req_check: { hang_buon: 1 }, tieu_hao: { hang_buon: 1 }, tag: ["thuong_mai"],
    chi_phi: { the_luc: -1.0, chan: -2.0, doi: 0.7 }, ket_qua: { xu_sat: 13, tang_buon_ban: 2, tang_tin_nhiem_tm: 10 },
    mo_ta: "Giữa phố phường sầm uất của Kinh Hoài, kiện hàng quê bạn gánh từ Bến Sậy lên bán đắt như tôm tươi, thu về 13 đồng xu sắt!"
  },
  {
    mau: "chep_sach_thu_vien_kinh", ten_vi: "📜 Chép thuê sách cổ & tìm đọc hồ sơ ở Kinh Hoài (+4 Xu sắt, +2 Tri thức, Cơ hội tìm Bằng chứng)", nhom: "Khoa cử & Tri thức",
    thoi_luong_mo: "30 phút", tai_noi: ["kinh_hoai"], so_nhip: 5, sfx: "step",
    giai_doan: ["thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { thi_giac: 1, tri_nho: 1 }, req_check: { biet_chu: true }, tag: ["tri_thuc"],
    chi_phi: { the_luc: -1.2, chan: 0, doi: 0.9 }, ket_qua: { chep_sach_kinh_hoai: true },
    mo_ta: "Bạn ngồi trong thư phòng ở Kinh Hoài chép lại các văn bản lịch sử và sổ sách, vừa có tiền vừa mở mang học vấn."
  },
  {
    mau: "de_trinh_thanh_tra_kinh_hoai",
    ten_vi: "⚖️ Dùng vị thế & Bằng chứng đệ trình phơi bày gian lận sổ sách tại Kinh Hoài (Tạo Delta Cấp Quốc Gia)",
    nhom: "Đổi Đời & Thăng Tiến", thoi_luong_mo: "42 phút", tai_noi: ["kinh_hoai"], so_nhip: 6, sfx: "step",
    giai_doan: ["thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { noi: 1 }, req_check: { tam_voi_cap_2: true, co_bang_chung_hoac_ky_vat: true }, tag: ["doi_doi"],
    chi_phi: { the_luc: -2.5, chan: -12.0, doi: 1.0 }, ket_qua: { delta_thanh_tra_kho: true },
    mo_ta: "Nhờ có vị thế xã hội (Tầm với đủ rộng) kèm vật chứng xác thực, bản tố cáo của bạn buộc nha môn Kinh Hoài phải mở cuộc kiểm tra công khai, cắt giảm khoản lãi ngầm và bù lại thóc thiếu hụt trong kho!"
  },
  {
    mau: "chuoc_than_tu_do", ten_vi: "🔓 Nộp 20 Xu sắt tại nha môn để CHUỘC THÂN (Thoát kiếp Dân Gắn Ruộng!)", nhom: "Đổi Đời & Thăng Tiến",
    thoi_luong_mo: "30 phút", tai_noi: ["kinh_hoai"], so_nhip: 5, sfx: "step", chi_hien_khi_nong_no: true,
    giai_doan: ["thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { noi: 1 }, req_check: { xu_sat: 20 }, tieu_hao: { xu_sat: 20 }, tag: ["doi_doi"],
    chi_phi: { the_luc: -1.0, chan: -10.0, doi: 0.5 }, ket_qua: { chuoc_than_thanh_cong: true },
    mo_ta: "Bạn đặt 20 đồng xu sắt tích cóp bằng mồ hôi nước mắt lên bàn thư lại, nhận tờ văn tự xóa bỏ thân phận Dân Gắn Ruộng!"
  },
  {
    mau: "thi_tuyen_thu_lai", ten_vi: "🎓 Ứng tuyển kỳ khảo hạch THƯ LẠI / CHỨC SỰ (Đổi đời thành Quan chức nhỏ!)", nhom: "Đổi Đời & Thăng Tiến",
    thoi_luong_mo: "42 phút", tai_noi: ["kinh_hoai"], so_nhip: 6, sfx: "step",
    giai_doan: ["thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { tri_nho: 2 }, req_check: { biet_chu: true, tri_thuc_min: 6, khong_tieng_xau_nang: true }, tag: ["doi_doi"],
    chi_phi: { the_luc: -2.0, chan: -8.0, doi: 1.2 }, ket_qua: { thang_cap_chuc_su: true },
    mo_ta: "Nhờ thông hiểu chữ nghĩa và lý lịch trong sạch, bạn vượt qua kỳ khảo hạch ở Kinh Hoài, được bổ nhiệm làm Thư lại Chức Sự!"
  },
  {
    mau: "mo_sap_bang_hang", ten_vi: "🏮 Góp 30 Xu sắt lập hiệu buôn gia nhập BANG HÀNG (Đổi đời thành Thương gia!)", nhom: "Đổi Đời & Thăng Tiến",
    thoi_luong_mo: "36 phút", tai_noi: ["kinh_hoai"], so_nhip: 5, sfx: "step",
    giai_doan: ["thieu_nien", "truong_thanh", "trung_nien", "gia"],
    yeu_cau: { noi: 1 }, req_check: { xu_sat: 30, buon_ban_min: 4 }, tieu_hao: { xu_sat: 30 }, tag: ["doi_doi"],
    chi_phi: { the_luc: -1.5, chan: -10.0, doi: 0.8 }, ket_qua: { thang_cap_thuong_nhan: true },
    mo_ta: "Bạn chính thức treo biển hiệu buôn của riêng mình tại Kinh Hoài, bước chân vào hàng ngũ Thương gia Bang Hàng!"
  }
];

// =========================================================================
// 4. SÁU THỜI KỲ LỊCH SỬ HOÀI DƯƠNG & BIẾN CỐ VĨ MÔ (GIAI ĐOẠN 8)
// =========================================================================
const HOAI_DUONG_ERAS = [
  { id: 1, minY: 0,   maxY: 30,  ten: "Thời kỳ I · Mùa Khế", he_so_doi: 1.2, he_so_thue: 0.9 },
  { id: 2, minY: 31,  maxY: 70,  ten: "Thời kỳ II · Bình Yên Mượn", he_so_doi: 0.85, he_so_thue: 1.0 },
  { id: 3, minY: 71,  maxY: 105, ten: "Thời kỳ III · Kho Rỗng Dần", he_so_doi: 1.15, he_so_thue: 1.3 },
  { id: 4, minY: 106, maxY: 145, ten: "Thời kỳ IV · Bạch Lĩnh", he_so_doi: 1.25, he_so_thue: 1.45 },
  { id: 5, minY: 146, maxY: 182, ten: "Thời kỳ V · Nợ Chồng Nợ", he_so_doi: 1.4, he_so_thue: 1.65 },
  { id: 6, minY: 183, maxY: 270, ten: "Thời kỳ VI · Đáo Hạn", he_so_doi: 1.35, he_so_thue: 1.8 }
];

const MACRO_EVENTS_DB = [
  {
    id: "E12_dich_ho_suong", minY: 60, maxY: 66,
    check: (m) => m.no_khe >= 0.7,
    chi_bao: "🌫️ [Tín hiệu quanh vùng]: Nhiều nhà ngoài phố đóng kín cửa treo dải vải trắng, chợ vắng hẳn người qua lại và mùi lá thuốc xông khói đặc quánh trong sương sớm.",
    tac_dong: (st) => { if (!st.benhTat.includes('ho_suong') && Math.random() < 0.25) st.benhTat.push('ho_suong'); }
  },
  {
    id: "E15_mat_mua_kho_gia", minY: 90, maxY: 98,
    check: (m) => m.do_rong_kho >= 0.35,
    chi_bao: "🌫️ [Tín hiệu quanh vùng]: Xe chở thóc cứu tế từ Kho Thiên Lộc về chỉ phát nhỏ giọt một nửa định mức; ngoài chợ giá gạo tăng vọt khiến nhiều tá điền bỏ ruộng.",
    tac_dong: (st) => { st.macroPriceSpike = 1.4; }
  },
  {
    id: "E18_noi_day_mua_gia_1", minY: 97, maxY: 103,
    check: (m) => m.bat_man_tam_giang >= 0.65 && m.to_chuc_tam_giang >= 0.15,
    chi_bao: "🌫️ [Tín hiệu quanh vùng]: Nhiều cánh đồng ở Tam Giang không ai cày cấy, ban đêm có tiếng bước chân rầm rập và lính Kiếm Điền lập chốt xét hỏi khắp các ngả đường.",
    tac_dong: (st) => { st.macroPriceSpike = 1.3; }
  },
  {
    id: "E20_chien_tranh_bach_linh_1", minY: 114, maxY: 122,
    check: (m) => m.cang_thang_bach_linh >= 0.65,
    chi_bao: "🌫️ [Tín hiệu quanh vùng]: Từng đoàn lính vác giáo đi về hướng bắc, giá sắt ở lò rèn tăng vọt và những toán người Ô Khuyết tị nạn bắt đầu dựng lều tạm ven Bến Bắc.",
    tac_dong: (st) => { st.macroPriceSpike = 1.35; }
  },
  {
    id: "E23_nam_kho_vong", minY: 134, maxY: 142,
    check: (m) => m.do_rong_kho >= 0.55,
    chi_bao: "🌫️ [Tín hiệu quanh vùng]: Cửa Kho Thiên Lộc đóng im ỉm báo hết thóc, dòng người đói rách từ Hạ Giang đổ về tìm đào rễ cây và cướp các xe lương trên đường.",
    tac_dong: (st) => { st.macroPriceSpike = 1.6; }
  },
  {
    id: "E25_chien_tranh_bach_linh_2", minY: 149, maxY: 162,
    check: (m) => m.cang_thang_bach_linh >= 0.65 && m.no_khe >= 1.3,
    chi_bao: "🌫️ [Tín hiệu quanh vùng]: Tiếng trống gom lính vang lên dưới cổng thành, thanh niên trai tráng trong xóm bị gọi đi biên ải khiến ruộng vườn thiếu hẳn người làm.",
    tac_dong: (st) => { st.macroPriceSpike = 1.45; }
  },
  {
    id: "E29_noi_bat_chao", minY: 174, maxY: 181,
    check: (m) => m.bat_man_tam_giang >= 0.78 && m.to_chuc_tam_giang >= 0.38,
    chi_bao: "🌫️ [Tín hiệu quanh vùng]: Các ngôi làng ở Tam Giang im lìm khác thường vào ban đêm, phiếu thuế bị xé bỏ ngoài đầu ngõ và dân làng lặng lẽ góp gạo nấu chung nồi cháo lớn.",
    tac_dong: (st) => { st.macroPriceSpike = 1.4; }
  },
  {
    id: "E31_nam_dao_han", minY: 188, maxY: 205,
    check: (m) => m.no_khe >= 1.75,
    chi_bao: "🌫️ [Tín hiệu quanh vùng]: Những toán người đeo con dấu ba bên trực tiếp đến niêm phong các kho thóc, dân làng rào kín cổng tre còn kỵ binh Ô Khuyết đã xuất hiện ở thảo nguyên phía bắc.",
    tac_dong: (st) => { st.macroPriceSpike = 1.7; }
  }
];

const AMBIENT_WHISPERS = [
  "Lúc đi ngang đầu xóm, bạn thoáng nghe mấy người già bảo năm nay người thu thuế đeo con dấu có tới ba hình khắc lạ, thu theo từng mùa.",
  "Bên vệ đường, một lão mù vừa gảy đàn vừa nghêu ngao câu hát cũ về một vị lãnh chúa năm xưa từng bỏ rơi người vợ vùng núi sau khi mượn được binh lương.",
  "Chỗ lò rèn cuối chợ có người mang tới sửa một thanh đoản đao cũ kỹ; ông thợ rèn vừa nhìn thấy ba chấm nhỏ trên chuôi đã vội đóng cửa xưởng.",
  "Mấy phu bốc vác ở bến sông thì thào với nhau rằng kho lương lớn trên kinh đô nhìn ngoài thì niêm phong kín mít nhưng bên trong nhiều gian đã mốc meo trống rỗng.",
  "Đoàn người miền núi dắt ngựa chở lông cừu đi qua ngõ, họ bảo vùng núi phía bắc đang có quân lính kéo lên đào bới tìm mạch sắt.",
  "Ở Kinh Hoài đang mở đợt tuyển mộ người biết chữ vào chép sổ kho và tuyển tráng đinh có võ nghệ ở Đồn Biên Ngạn."
];

const PERSONAS = [
  {
    id: "P1", title: "Đứa trẻ sơ sinh mùa gầy (1 tuổi)", ten: "Đứa con nhà nông nô", tuoi: 1, nam_sinh: 160, giai_doan: "so_sinh",
    giai_cap: "nong_no_ruong_dat", than_phan: "Con của Dân Gắn Ruộng · Làng Sậy Đỏ",
    vi_tri_khoi_dau: "nha",
    boi_canh_mo_ta: "Bạn mới một tuổi, nằm trong ổ rơm mỏng giữa gian nhà tranh lạnh buốt. Khi lớn hơn qua các năm, bạn có thể ra trường chữ Nhất Hỏa học chữ hoặc lên Biên Ngạn học võ.",
    nguoi: ["me"], nghia_vu: [], biet_chu: false, co_riu: false, nhay_ben_xh: 55,
    tri_thuc: 0, vo_nghe: 0, buon_ban: 0,
    cua_cai_then: true, vach_rach: true, mai_vung: false,
    xu_sat: 2, nuoc: 2, cui: 1.2, go_tho: 0, luong_lanh: 1.0, luong_moc: 0.0, lanh: 50, doi: 48,
    luoi: 30, kien_nhan: 50, y_chi: 50, trach_nhiem: 20, can_dam: 30, hao_mon: 0, mu: false,
    tam_niem: {
      mong: "Qua được cơn sốt mùa đông, lớn lên học chữ hoặc học nghề đổi đời",
      so: "Đêm lạnh tắt lửa hoặc cả đời bị trói buộc làm nông nô",
      ganh_nang: "Cha mẹ còn nợ chủ ruộng nửa vụ thóc",
      goc_khuat: "Dưới lớp tã vải thô có giấu một nắm hạt giống lúa chịu hạn của gia đình"
    }
  },
  {
    id: "P2", title: "Đứa trẻ mồ côi bên bến sông (8 tuổi)", ten: "Bé Sậy", tuoi: 8, nam_sinh: 183, giai_doan: "thieu_nhi",
    giai_cap: "ke_ngoai_le", than_phan: "Trẻ không nơi nương tựa · Bến Sậy",
    vi_tri_khoi_dau: "nha",
    boi_canh_mo_ta: "Bạn tám tuổi, trú tạm trong túp lều ven sông. Bạn có thể đan rổ rá đem ra chợ bán lấy xu, trò chuyện với các NPC quanh làng/chợ hoặc ra hiên Hỏa Đường học chữ miễn phí.",
    nguoi: [], nghia_vu: [], biet_chu: false, co_riu: false, nhay_ben_xh: 75,
    tri_thuc: 1, vo_nghe: 0, buon_ban: 1,
    cua_cai_then: false, vach_rach: true, mai_vung: false,
    xu_sat: 2, nuoc: 2, cui: 1.0, go_tho: 0, luong_lanh: 0.7, luong_moc: 0.5, lanh: 42, doi: 48,
    luoi: 20, kien_nhan: 75, y_chi: 80, trach_nhiem: 60, can_dam: 55, hao_mon: 0, mu: false,
    tam_niem: {
      mong: "Học biết chữ hoặc vào Hội Phường buôn bán để bước chân vào Kinh Hoài",
      so: "Bị xua đuổi khỏi bến sông khi sương muối tràn về",
      ganh_nang: "Nhớ ơn những người nghèo bên bến từng nhường cho mình củ khoai",
      goc_khuat: "Trong túi áo rách có giấu chiếc chìa khóa đồng nặng trịch nhặt được dưới bùn sông"
    }
  },
  {
    id: "P3", title: "Trai trẻ gắn ruộng (17 tuổi)", ten: "Khổng Thạch", tuoi: 17, nam_sinh: 28, giai_doan: "thieu_nien",
    giai_cap: "nong_no_ruong_dat", than_phan: "Dân Gắn Ruộng · Tam Giang",
    vi_tri_khoi_dau: "nha",
    boi_canh_mo_ta: "Bạn 17 tuổi, sức vóc dẻo dai. Bạn có thể giao tiếp với các NPC ở từng địa điểm (tab '👥 Giao tiếp NPC' bên cột phải), vào Hội Phường, lên Đồn Biên Ngạn học võ thành Kiếm Điền hoặc tích xu lên Kinh Hoài chuộc thân!",
    nguoi: [], nghia_vu: ["lao_dich"], biet_chu: false, co_riu: true, nhay_ben_xh: 60,
    tri_thuc: 0, vo_nghe: 2, buon_ban: 0,
    cua_cai_then: false, vach_rach: true, mai_vung: false,
    xu_sat: 3, nuoc: 2, cui: 1.2, go_tho: 1.0, luong_lanh: 0.9, luong_moc: 0.4, lanh: 40, doi: 45,
    luoi: 15, kien_nhan: 85, y_chi: 80, trach_nhiem: 75, can_dam: 65, hao_mon: 0, mu: false,
    tam_niem: {
      mong: "Chuộc thân tự do hoặc luyện võ lập công trở thành Kiếm Điền",
      so: "Cả đời còng lưng làm Dân Gắn Ruộng bị quản trang chèn ép",
      ganh_nang: "Nghĩa vụ lao dịch cho Chủ Ấp",
      goc_khuat: "Giữ con dao cắt lúa cũ của cha để lại, trên chuôi gỗ có khắc ba chấm nhỏ"
    }
  },
  {
    id: "P4", title: "Lão nông tuổi xế chiều (68 tuổi)", ten: "Lão Ngô Tam", tuoi: 68, nam_sinh: 45, giai_doan: "gia",
    giai_cap: "nong_dan_tu_do", than_phan: "Người già có uy tín · Làng Sậy Đỏ",
    vi_tri_khoi_dau: "nha",
    boi_canh_mo_ta: "Bạn 68 tuổi, bước chân đi lại chậm hơn thời trai trẻ nhưng có Danh dự và Uy quyền tuổi tác trong làng, có thể đứng ra hòa giải các mối thù xóm giềng.",
    nguoi: ["con_chau"], nghia_vu: [], biet_chu: false, co_riu: false, nhay_ben_xh: 80,
    tri_thuc: 2, vo_nghe: 0, buon_ban: 2,
    cua_cai_then: true, vach_rach: false, mai_vung: true,
    xu_sat: 4, nuoc: 3, cui: 2.0, go_tho: 0, luong_lanh: 1.2, luong_moc: 0.0, lanh: 35, doi: 38,
    luoi: 35, kien_nhan: 85, y_chi: 75, trach_nhiem: 85, can_dam: 60, hao_mon: 0.45, mu: false,
    tam_niem: {
      mong: "Nhìn đám cháu nhỏ bình an qua mùa Giá",
      so: "Cảnh đói kém năm xưa lặp lại trên mảnh đất này",
      ganh_nang: "Lời hứa năm xưa với bà đỡ già đã cứu mạng mình",
      goc_khuat: "Từng lén sửa lại con số thóc của xóm để giúp dân làng đỡ bị siết thuế"
    }
  },
  {
    id: "P5", title: "Người học việc giữ sổ (15 tuổi)", ten: "Điền Cẩm Tú", tuoi: 15, nam_sinh: 150, giai_doan: "thieu_nien",
    giai_cap: "thuong_nhan_thi_dan", than_phan: "Học việc giữ sổ · Hạ Giang",
    vi_tri_khoi_dau: "kinh_hoai",
    boi_canh_mo_ta: "Bạn 15 tuổi, đã biết chữ và đang ở Kinh đô Kinh Hoài. Bạn có thể chép sách tìm ra Bằng chứng lãi chìm, thi đỗ Thư lại Chức Sự hoặc buôn chuyến lập hiệu buôn Bang Hàng!",
    nguoi: [], nghia_vu: [], biet_chu: true, co_riu: false, nhay_ben_xh: 75,
    tri_thuc: 3, vo_nghe: 0, buon_ban: 2,
    cua_cai_then: true, vach_rach: false, mai_vung: true,
    xu_sat: 6, nuoc: 3, cui: 2.0, go_tho: 0, luong_lanh: 1.5, luong_moc: 0.0, lanh: 25, doi: 35,
    luoi: 30, kien_nhan: 80, y_chi: 75, trach_nhiem: 75, can_dam: 50, hao_mon: 0, mu: false,
    tam_niem: {
      mong: "Thi đỗ Chức Sự hoặc lập hiệu buôn lớn để điều tra vụ án Sổ Muối của ông nội",
      so: "Bị chủ thương hội phát hiện mình đang âm thầm đối chiếu sổ cũ",
      ganh_nang: "Lời dặn của cha trước ngày gia đình mất ruộng muối",
      goc_khuat: "Cất giấu một mảnh giấy chép lại các khoản lãi ngầm dưới đáy rương"
    }
  },
  {
    id: "P6", title: "Người hát rong mù (30 tuổi)", ten: "Khách mù Quán Bốn Ngả", tuoi: 30, nam_sinh: 142, giai_doan: "truong_thanh",
    giai_cap: "ke_ngoai_le", than_phan: "Người hát rong · Bến Bắc",
    vi_tri_khoi_dau: "quan_bon_nga",
    boi_canh_mo_ta: "Đôi mắt mù lòa nhưng thiên phú Nhạy bén xã hội cực cao (88 điểm) giúp bạn dễ dàng nhận ra khi nào NPC đang nói dối điều chính họ không tin!",
    nguoi: [], nghia_vu: [], biet_chu: true, co_riu: false, nhay_ben_xh: 88,
    tri_thuc: 2, vo_nghe: 0, buon_ban: 2,
    cua_cai_then: false, vach_rach: true, mai_vung: false,
    xu_sat: 5, nuoc: 2, cui: 1.6, go_tho: 0, luong_lanh: 1.0, luong_moc: 0.4, lanh: 35, doi: 38,
    luoi: 30, kien_nhan: 80, y_chi: 80, trach_nhiem: 60, can_dam: 50, hao_mon: 0, mu: true,
    tam_niem: {
      mong: "Tích đủ tiền mở sạp hoặc có chốn dưỡng già ấm áp",
      so: "Đôi tai kém dần khi tuổi già ập tới",
      ganh_nang: "Chia sẻ phần bánh kiếm được cho đứa trẻ dẫn đường",
      goc_khuat: "Thuộc lòng một đoạn ca cổ bị cấm hát trong kinh thành"
    }
  }
];
