// =========================================================================
// BỘ MÁY NHẬP VAI GIAI CẤP THỐNG TRỊ, SAI KHIẾN GIA ĐINH & BIẾN CỐ ĐỜI SỐNG
// File: docs/noble_and_rp_engine.js (Tích hợp Hướng A + Hướng B + Hướng C)
// =========================================================================

(function initNobleAndRoleplayEngine() {

  // 1. KIỂM TRA NHÂN VẬT CÓ THUỘC TẦNG LỚP TRÊN (CHỦ ẤP / QUÝ TỘC / QUAN LẠI / PHÚ THƯƠNG)
  window.isHighBornOrRuler = function(p) {
    if (!p) return false;
    const highClasses = ["ky_si_quan_nhan", "quan_lai", "lanh_chua_vung", "thien_menh_chi_tu"];
    if (highClasses.includes(p.giai_cap)) return true;
    const tp = (p.than_phan || "").toLowerCase();
    if (tp.includes("chủ ấp") || tp.includes("quý tộc") || tp.includes("hoàng tộc") || tp.includes("tri ấp") || tp.includes("chức sự") || tp.includes("kiếm điền") || tp.includes("bang hàng")) {
      return true;
    }
    return false;
  };

  // 2. BỔ SUNG 2 NHÂN VẬT CHỦ ẤP & QUÝ TỘC VÀO MÀN HÌNH KHỞI ĐẦU ĐỂ CHƠI NGAY (HƯỚNG C)
  const NOBLE_STARTER_PERSONAS = [
    {
      id: "P7_CHU_AP",
      title: "👑 Chủ Ấp vùng Tam Giang (32 tuổi · Giai cấp Thống trị)",
      ten: "Hạ Minh Viễn",
      tuoi: 32, nam_sinh: 115, giai_doan: "truong_thanh",
      giai_cap: "lanh_chua_vung",
      than_phan: "Chủ Ấp thế tập · Tam Giang",
      vi_tri_khoi_dau: "nha",
      boi_canh_mo_ta: "Bạn ngồi trên ghế gỗ lim giữa Dinh thự Chủ Ấp. Dưới quyền bạn là hàng chục hộ nông nô cày ruộng nộp tô và toán gia đinh canh cổng. Bạn không phải lo kiếm củi hay kéo nước, nhưng mỗi cuối mùa phải nộp đủ bạc Cống thuế Khế lên Kinh Hoài trong khi đám tá điền dưới ấp đang âm ỉ bất mãn!",
      nguoi: ["con_chau"], nghia_vu: [], biet_chu: true, co_riu: true, nhay_ben_xh: 75,
      tri_thuc: 4, vo_nghe: 3, buon_ban: 3,
      cua_cai_then: true, vach_rach: false, mai_vung: true,
      xu_sat: 28, nuoc: 6, cui: 5.0, go_tho: 2.0, luong_lanh: 6.5, luong_moc: 0.0, lanh: 15, doi: 15,
      luoi: 25, kien_nhan: 70, y_chi: 75, trach_nhiem: 65, can_dam: 65, hao_mon: 0, mu: false,
      tam_niem: {
        mong: "Thu đủ tô thuế nộp lên Kinh Hoài và mở rộng điền trang gia tộc",
        so: "Nông nô trong ấp nổi loạn đốt dinh thự hoặc bị triều đình tịch biên đất đai vì trễ thuế Khế",
        ganh_nang: "Khoản định mức cống nạp 12 Xu sắt mỗi mùa cho Nha môn Kinh Hoài",
        goc_khuat: "Đang cho gã quản trang lén thu tăng thêm hai phần thóc tô so với quy định gốc"
      }
    },
    {
      id: "P8_QUAN_LAI",
      title: "🏛️ Quan Tri Ấp / Chức Sự Kinh Hoài (29 tuổi · Quan lại Quý tộc)",
      ten: "Tạ Mặc Nhiên",
      tuoi: 29, nam_sinh: 140, giai_doan: "truong_thanh",
      giai_cap: "quan_lai",
      than_phan: "Quan Chức Sự Nha Môn · Kinh Hoài",
      vi_tri_khoi_dau: "kinh_hoai",
      boi_canh_mo_ta: "Bạn khoác quan phục chỉnh tề, cưỡi ngựa đi lại giữa Tư dinh và Nha môn Kinh Hoài. Trong tay bạn là con dấu xét xử kiện tụng, thanh tra kho lương và điều động lính tuần. Một lời phán của bạn có thể cứu sống cả một làng hoặc đẩy kẻ chống đối vào ngục tối!",
      nguoi: [], nghia_vu: [], biet_chu: true, co_riu: false, nhay_ben_xh: 82,
      tri_thuc: 6, vo_nghe: 2, buon_ban: 4,
      cua_cai_then: true, vach_rach: false, mai_vung: true,
      xu_sat: 35, nuoc: 6, cui: 5.0, go_tho: 0, luong_lanh: 5.5, luong_moc: 0.0, lanh: 10, doi: 15,
      luoi: 20, kien_nhan: 80, y_chi: 80, trach_nhiem: 70, can_dam: 60, hao_mon: 0, mu: false,
      tam_niem: {
        mong: "Thăng tiến lên bậc Tổng Sự hoặc dùng quyền lực cải tổ sổ sách Kho Thiên Lộc",
        so: "Bị cuốn vào cuộc thanh trừng giữa phái Tam Hỏa và các đại chủ nợ Đoàn Thuyền",
        ganh_nang: "Phải giữ yên trật tự trị an và sổ thuế của cả vùng",
        goc_khuat: "Nắm giữ bản sao danh sách các quan chức từng nhận hối lộ của thương hội"
      }
    }
  ];

  if (typeof PERSONAS !== "undefined") {
    NOBLE_STARTER_PERSONAS.forEach(np => {
      if (!PERSONAS.some(p => p.id === np.id)) {
        PERSONAS.push(np);
      }
    });
  }

  // 3. KHỞI TẠO TRẠNG THÁI QUẢN LÝ TRANG VIÊN & THUỘC HẠ CHO TẦNG LỚP TRÊN (HƯỚNG A)
  function ensureNobleState() {
    if (!state || !state.persona) return;
    const isNoble = window.isHighBornOrRuler(state.persona);
    state.isNobleClass = isNoble;

    if (state.nobleData === undefined || state.nobleData.ownerId !== state.persona.id) {
      state.nobleData = {
        ownerId: state.persona.id,
        soTaDien: isNoble ? 18 : 0,          // Số hộ nông nô / tá điền dưới quyền
        soGiaDinh: isNoble ? 4 : 0,          // Số gia đinh / lính hộ viện
        batManDan: isNoble ? 22 : 0,         // Độ bất mãn của nông nô (0-100, >= 85 sẽ nổi loạn đốt dinh!)
        noThueTrieuDinh: isNoble ? 10 : 0,   // Định mức xu phải nộp lên Kinh Hoài mỗi cuối mùa
        daNopThueMuaNay: false,
        daThuToMuaNay: false,
        quanTrangGianLan: Math.random() < 0.5
      };
      if (isNoble && state.hocVan) {
        state.hocVan.nhan_chu = Math.max(1.5, state.hocVan.nhan_chu || 0);
        state.hocVan.toan_phap = Math.max(1.2, state.hocVan.toan_phap || 0);
        state.hocVan.doi_nhan = Math.max(1.2, state.hocVan.doi_nhan || 0);
        state.hocVan.luat_le = Math.max(1.2, state.hocVan.luat_le || 0);
        state.hocVan.kinh_te = Math.max(1.2, state.hocVan.kinh_te || 0);
      }
    }
    if (state.consecCommonerLives === undefined) state.consecCommonerLives = 0;
    if (state.lastDilemmaBeat === undefined) state.lastDilemmaBeat = 0;
  }

  // 4. DANH SÁCH HÀNH ĐỘNG ĐỘC QUYỀN CỦA GIAI CẤP THỐNG TRỊ (SAI KHIẾN CON NGƯỜI - HƯỚNG A)
  const NOBLE_EXCLUSIVE_ACTIONS = [
    {
      mau: "noble_y_yen_nghi_ngoi",
      ten_vi: "🛏️ Nằm nghỉ trên trường kỷ gỗ trầm, sai thị tỳ hầu trà nóng & điểm tâm (Hồi phục toàn diện)",
      nhom: "Dinh thự & Hầu hạ",
      thoi_luong_mo: "24 phút", tai_noi: ["nha", "kinh_hoai"], so_nhip: 3, sfx: "fire",
      only_noble: true,
      giai_doan: ["thieu_nhi", "thieu_nien", "truong_thanh", "trung_nien", "gia"],
      yeu_cau: {}, tag: ["sinh_ton", "nghi_ngoi"],
      chi_phi: { the_luc: 12, chan: -8, doi: -12 },
      ket_qua: { noble_rest_feast: true },
      mo_ta: "Trong phòng ấm kín gió có lò than hồng, người hầu dâng lên bát canh hầm nóng hổi và trà thảo mộc giúp bạn thư giãn hoàn toàn."
    },
    {
      mau: "noble_sai_gia_dinh_sam_do",
      ten_vi: "📣 Sai gia đinh ra chợ mua sắm Lương thảo, Củi đốt & Nước sạch (-3 Xu sắt · Tự động lấp đầy kho dinh thự)",
      nhom: "Dinh thự & Hầu hạ",
      thoi_luong_mo: "18 phút", tai_noi: ["nha", "duong_lang", "cho_ben_say", "kinh_hoai"], so_nhip: 2, sfx: "step",
      only_noble: true,
      giai_doan: ["thieu_nien", "truong_thanh", "trung_nien", "gia"],
      yeu_cau: {}, req_check: { xu_sat: 3 }, tieu_hao: { xu_sat: 3 }, tag: ["sinh_ton"],
      chi_phi: { the_luc: 1, chan: -2, doi: -5 },
      ket_qua: { noble_servant_shop: true },
      mo_ta: "Bạn phất tay giao 3 đồng xu sắt cho gã gia đinh. Chẳng mấy chốc chúng đã khiêng về đầy ắp gạo trắng, củi khô và nước sạch đổ đầy chum mà bạn không phải động một ngón tay."
    },
    {
      mau: "noble_thu_to_ta_dien",
      ten_vi: "📜 Mở sổ Điền trang & Sai Quản trang đi thu tô thuế từ các hộ Nông nô (+Xu sắt, +Lương lành, tăng Bất mãn)",
      nhom: "Cai trị & Quyền lực",
      thoi_luong_mo: "36 phút", tai_noi: ["nha", "ruong_chu_ap", "duong_lang"], so_nhip: 4, sfx: "chop",
      only_noble: true,
      giai_doan: ["thieu_nien", "truong_thanh", "trung_nien", "gia"],
      yeu_cau: {}, tag: ["muu_sinh"],
      chi_phi: { the_luc: -2, chan: 0, doi: 1 },
      ket_qua: { noble_collect_rent: true },
      mo_ta: "Bạn ngồi trên ghế cao nhìn gã quản trang cùng đám gia đinh dẫn các hộ nông nô vào sân nộp thóc tô và tiền sưu của vụ này."
    },
    {
      mau: "noble_tra_so_quan_trang",
      ten_vi: "👁️ Gọi gã Quản trang vào thư phòng tra khảo sổ sách & thu hồi tiền ăn chặn (+Xu sắt, +Uy quyền)",
      nhom: "Cai trị & Quyền lực",
      thoi_luong_mo: "30 phút", tai_noi: ["nha", "ruong_chu_ap", "kinh_hoai"], so_nhip: 4, sfx: "step",
      only_noble: true,
      giai_doan: ["thieu_nien", "truong_thanh", "trung_nien", "gia"],
      yeu_cau: {}, tag: ["thong_tin"],
      chi_phi: { the_luc: -2, chan: -2, doi: 1 },
      ket_qua: { noble_audit_steward: true },
      mo_ta: "Bạn đập bàn đối chiếu từng dòng trên cuốn sổ thu tô với thực tế ngoài đồng, khiến gã quản trang mồ hôi túa ra như tắm."
    },
    {
      mau: "noble_mo_kho_cuu_te",
      ten_vi: "🥣 Mở kho lương Dinh thự phát cháo giảm tô cho Nông nô (-1.2 Lương lành · Giảm mạnh nguy cơ Nổi loạn & Tạo Delta)",
      nhom: "Cai trị & Quyền lực",
      thoi_luong_mo: "30 phút", tai_noi: ["nha", "duong_lang", "ruong_chu_ap"], so_nhip: 4, sfx: "fire",
      only_noble: true,
      giai_doan: ["thieu_nien", "truong_thanh", "trung_nien", "gia"],
      yeu_cau: {}, req_check: { luong_lanh: 1.2 }, tieu_hao: { luong_lanh_linh_hoat: 1.2 }, tag: ["xa_hoi", "doi_doi"],
      chi_phi: { the_luc: -1.5, chan: -10, doi: 1 },
      ket_qua: { noble_relief_serfs: true },
      mo_ta: "Bạn ra lệnh mở cổng kho, sai gia đinh bắc chảo lớn nấu cháo đặc phát cho các hộ tá điền đang đói rét. Tiếng cảm tạ vang lên khắp xóm, hóa giải hẳn mầm mống bạo động!"
    },
    {
      mau: "noble_xu_kien_dan_lang",
      ten_vi: "⚖️ Ngồi ghế công đường phân xử tranh chấp ruộng đất & nợ nần trong vùng (+Uy quyền, +Danh dự hoặc +Tiền lót tay)",
      nhom: "Cai trị & Quyền lực",
      thoi_luong_mo: "36 phút", tai_noi: ["nha", "duong_lang", "kinh_hoai"], so_nhip: 4, sfx: "step",
      only_noble: true,
      giai_doan: ["thieu_nien", "truong_thanh", "trung_nien", "gia"],
      yeu_cau: {}, tag: ["xa_hoi"],
      chi_phi: { the_luc: -2, chan: -3, doi: 1 },
      ket_qua: { noble_judge_dispute: true },
      mo_ta: "Hai bên nguyên đơn và bị đơn quỳ trước thềm chờ phán quyết của bạn."
    },
    {
      mau: "noble_nop_cong_thue_kinh_hoai",
      ten_vi: "🏛️ Đóng ấn nộp 10 Xu sắt Cống thuế Khế định kỳ cho Nha môn Kinh Hoài (Giữ vững tước vị & Điền trang)",
      nhom: "Quan trường & Giao tế",
      thoi_luong_mo: "24 phút", tai_noi: ["nha", "kinh_hoai"], so_nhip: 3, sfx: "step",
      only_noble: true,
      giai_doan: ["thieu_nien", "truong_thanh", "trung_nien", "gia"],
      yeu_cau: {}, req_check: { xu_sat: 10 }, tieu_hao: { xu_sat: 10 }, tag: ["doi_doi"],
      chi_phi: { the_luc: -1, chan: -5, doi: 0.5 },
      ket_qua: { noble_pay_crown_tax: true },
      mo_ta: "Bạn sai người áp tải rương tiền xu nộp đủ phần cống thuế Khế của kỳ này, nhận tờ biên lai đóng dấu đỏ đảm bảo không ai có cớ tịch biên điền trang của bạn."
    },
    {
      mau: "noble_mo_tiec_ket_giao",
      ten_vi: "🍶 Mở yến tiệc rượu ngon chiêu đãi các Chức sắc & Chủ thuyền (-6 Xu sắt · +Uy quyền lớn, +Tầm ảnh hưởng)",
      nhom: "Quan trường & Giao tế",
      thoi_luong_mo: "42 phút", tai_noi: ["nha", "quan_bon_nga", "kinh_hoai"], so_nhip: 5, sfx: "fire",
      only_noble: true,
      giai_doan: ["truong_thanh", "trung_nien", "gia"],
      yeu_cau: {}, req_check: { xu_sat: 6 }, tieu_hao: { xu_sat: 6 }, tag: ["xa_hoi", "doi_doi"],
      chi_phi: { the_luc: -1, chan: -12, doi: -15 },
      ket_qua: { noble_host_banquet: true },
      mo_ta: "Đèn lồng thắp sáng rực sảnh đường, rượu ấm và thịt quay bày kín bàn. Qua chén rượu, các chức sắc và đại thương nhân tiết lộ cho bạn nhiều tin mật triều chính."
    }
  ];

  NOBLE_EXCLUSIVE_ACTIONS.forEach(na => {
    if (!ACTIONS.some(a => a.mau === na.mau)) {
      ACTIONS.unshift(na);
    }
  });

  // Danh sách các việc lao động chân tay mạt hạng sẽ bị ẨN HOÀN TOÀN khi bạn là Quý tộc / Chủ Ấp
  const PEASANT_MENIAL_ACTIONS = new Set([
    "cai_then_cua", "va_vach_tranh", "chang_mai_nha", "cat_luong_xuong_ho", "lay_luong_tu_ho",
    "an_luong_moc", "phoi_sang_luong_moc", "ben_duoc_di_dem", "bo_cui_tai_nha", "dan_ro_ben_thung",
    "ganh_nuoc_gieng", "xin_chao_hoa_duong", "mot_rau_ven_muong", "nhat_cui_rung", "don_go_rung",
    "gat_lua_lao_dich", "mot_lua_roi", "boc_vac_ben_thuyen", "moc_tui_cho_phien", "phu_rua_bat_che_cui",
    "hat_rong_ke_chuyen"
  ]);

  const prevGetActionsNoble = getActionsForCurrentPlace;
  getActionsForCurrentPlace = function(p) {
    ensureNobleState();
    const isNoble = window.isHighBornOrRuler(p);
    const rawList = prevGetActionsNoble(p);

    return rawList.filter(item => {
      const tpl = item.tpl;
      if (tpl.only_noble && !isNoble) return false;
      if (isNoble && PEASANT_MENIAL_ACTIONS.has(tpl.mau)) return false;
      return true;
    });
  };

  // 5. ĐẶC QUYỀN CƯỠI NGỰA / KIỆU CỦA TẦNG LỚP TRÊN (HƯỚNG C: NHANH GẤP 3 LẦN, KHÔNG MỆT)
  const prevGetTravelNoble = getTravelMinutes;
  getTravelMinutes = function(fromId, toId) {
    const res = prevGetTravelNoble(fromId, toId);
    if (state && state.persona && window.isHighBornOrRuler(state.persona)) {
      return {
        minutes: Math.max(3, Math.round(res.minutes * 0.35)),
        reasons: ["🐎 Cưỡi ngựa / Xe ngựa riêng"]
      };
    }
    return res;
  };

  // 6. HỆ THỐNG BIẾN CỐ ĐỜI SỐNG ĐỘT XUẤT THEO GIAI CẤP (HƯỚNG B: ROLEPLAY DILEMMAS)
  function triggerRoleplayDilemma() {
    if (state.isWorking || freneticInterval || state.isDead || !state.persona) return;
    ensureNobleState();
    const isNoble = window.isHighBornOrRuler(state.persona);
    const nd = state.nobleData;

    if (isNoble) {
      // --- BỘ TÌNH HUỐNG NHẬP VAI CỦA CHỦ ẤP / QUÝ TỘC / QUAN LẠI ---
      const nobleDilemmas = [
        {
          title: "⚡ TÌNH HUỐNG TRANG VIÊN: TÁ ĐIỀN QUỲ XIN KHẤT TÔ!",
          desc: "Ngoài cổng dinh thự, một hộ nông nô dắt theo đứa con nhỏ mặt mũi xanh xao quỳ sụp xuống bùn lạnh:\n\"Bẩm Chủ nhân! Mùa này sâu bệnh cắn phá cộng thêm đứa nhỏ đau ốm, nhà con chỉ còn đúng nửa đấu thóc. Xin ngài mở lượng hải hà cho khất lại phần tô thiếu sang vụ sau, nếu thu sạch lúc này cả nhà con chỉ còn nước chết đói!\"",
          choices: [
            {
              text: "🕊️ Chấp thuận giảm nửa phần tô & Sai gia đinh lấy 0.3 Lương lành phát thêm cho đứa nhỏ (Đắc nhân tâm)",
              resolve: () => {
                clearSituationUI();
                state.luongLanh = Math.max(0, state.luongLanh - 0.3);
                state.xuSat += 2;
                nd.batManDan = Math.max(0, nd.batManDan - 18);
                state.rep.danh_du += 12;
                updateCenterStage("Người nông nô dập đầu cảm tạ trong nước mắt. Cả vùng truyền tai nhau về lòng nhân từ của bạn, lòng dân trong ấp yên ổn hẳn (Bất mãn giảm mạnh, +2 Xu tô thu nhẹ).", [{ label: "🕊️ Lòng dân quy thuận", type: "gain" }]);
                render();
              }
            },
            {
              text: "⚖️ Giữ đúng lệ: Chỉ thu phần thóc hiện có (+4 Xu sắt), không phạt roi nhưng không miễn giảm",
              resolve: () => {
                clearSituationUI();
                state.xuSat += 4;
                state.luongLanh += 0.5;
                nd.batManDan = Math.min(100, nd.batManDan + 6);
                updateCenterStage("Bạn phán xử lạnh lùng theo đúng sổ định mức. Gia đinh vào thu 4 đồng xu và nửa bao thóc, để lại tiếng thở dài nặng nề ngoài cổng.", [{ label: "🪙 +4 Xu sắt, +0.5 Lương", type: "gain" }]);
                render();
              }
            },
            {
              text: "🔨 Ra lệnh cho Quản trang dẫn gia đinh vào khám nhà vét sạch thóc & phạt làm lao dịch bù (+8 Xu sắt, +Bất mãn cao)",
              resolve: () => {
                clearSituationUI();
                state.xuSat += 8;
                state.luongLanh += 1.0;
                nd.batManDan = Math.min(100, nd.batManDan + 25);
                state.rep.uy_quyen += 8;
                updateCenterStage("Tiếng khóc la vang lên khi đám gia đinh vét sạch bồ thóc của hộ tá điền. Kho của bạn đầy thêm (+8 Xu, +1.0 Lương), nhưng ánh mắt đám nông nô nhìn dinh thự hằn lên tia oán giận!", [{ label: "🪙 +8 Xu sắt · ⚠️ Bất mãn tăng vọt", type: "warn" }]);
                render();
              }
            }
          ]
        },
        {
          title: "⚡ TÌNH HUỐNG QUAN TRƯỜNG: PHÁI VIÊN KINH HOÀI ĐÒI CỐNG NẠP!",
          desc: "Một đoàn kỵ mã đeo con dấu ba bên dừng trước thềm dinh thự. Viên chức sự bước vào, đặt tờ trát thu Khế Nợ lên bàn:\n\"Đã tới kỳ thu cống nạp định kỳ của triều đình và Đoàn Thuyền. Ngài hãy giao nộp 8 đồng xu sắt ngay hôm nay, hoặc cho phép chúng tôi bắt 3 hộ nông nô khỏe mạnh trong ấp đi đào mỏ Bạch Lĩnh trừ nợ!\"",
          choices: [
            {
              text: "🪙 Mở rương nộp đủ 8 Xu sắt để bảo vệ nông nô trong ấp và giữ trọn uy tín",
              resolve: () => {
                clearSituationUI();
                if (state.xuSat >= 8) {
                  state.xuSat -= 8;
                  nd.daNopThueMuaNay = true;
                  nd.batManDan = Math.max(0, nd.batManDan - 10);
                  state.rep.uy_quyen += 10;
                  updateCenterStage("Bạn đàng hoàng xuất 8 đồng xu sắt nộp đủ cống thuế. Đoàn phái viên đóng dấu hoàn tất rồi rút lui, dân trong ấp biết ơn vì không ai bị bắt đi phu mỏ!", [{ label: "🏛️ Hoàn tất Cống thuế", type: "gain" }]);
                } else {
                  state.rep.uy_quyen = Math.max(0, state.rep.uy_quyen - 15);
                  nd.batManDan += 15;
                  updateCenterStage("Mở rương ra không đủ 8 đồng xu sắt, đoàn phái viên cười nhạt tự ý xông vào làng bắt người đi phu làm uy tín của bạn sụt giảm nghiêm trọng!", [{ label: "⚠️ Thiếu bạc nộp cống", type: "warn" }]);
                }
                render();
              }
            },
            {
              text: "⛓️ Chỉ điểm cho phái viên bắt 3 hộ tá điền đi phu mỏ thay cho tiền thuế (Giữ được tiền nhưng mất dân & tăng Bất mãn)",
              resolve: () => {
                clearSituationUI();
                nd.soTaDien = Math.max(4, nd.soTaDien - 3);
                nd.batManDan = Math.min(100, nd.batManDan + 28);
                nd.daNopThueMuaNay = true;
                updateCenterStage("Bạn giữ nguyên được rương tiền, mặc cho tiếng kêu khóc của 3 hộ dân bị trói giải lên biên ải. Điền trang mất bớt người cày và lòng dân sục sôi oán hận!", [{ label: "⚠️ Mất 3 hộ tá điền · Bất mãn +28%", type: "warn" }]);
                render();
              }
            },
            {
              text: "🍶 Mời viên chức sự vào phòng kín uống rượu & đút lót riêng 4 Xu sắt để hắn ghi khống đã nộp đủ",
              resolve: () => {
                clearSituationUI();
                if (state.xuSat >= 4) {
                  state.xuSat -= 4;
                  nd.daNopThueMuaNay = true;
                  state.coBangChung = (state.coBangChung || 0) + 1;
                  updateCenterStage("Nhận 4 đồng xu đút lót lén dưới gầm bàn, viên chức sự cười ha hả ký xác nhận hoàn tất kỳ thuế và còn để lộ cho bạn một tờ chứng từ mật (+1 Bằng chứng)!", [{ label: "📜 Tiết kiệm thuế & +1 Bằng chứng", type: "gain" }]);
                } else {
                  updateCenterStage("Bạn không có nổi 4 đồng xu sắt để đút lót!", [{ label: "🔒 Thiếu xu", type: "warn" }]);
                }
                render();
              }
            }
          ]
        },
        {
          title: "⚡ TÌNH HUỐNG NỘI BỘ: PHÁT GIÁC QUẢN TRANG ĂN CHẶN!",
          desc: "Người đầu bếp già trong dinh thự lén bẩm báo với bạn lúc chập tối:\n\"Bẩm chủ nhân, con thấy gã Quản trang đêm qua lén chở 2 bao thóc từ kho sau dinh thự ra quán trọ bán riêng, lại còn ghi khống vào sổ là thóc bị chuột ăn!\"",
          choices: [
            {
              text: "⚔️ Lập tức dẫn gia đinh ập tới bắt quả tang, tịch thu lại 7 Xu sắt & phạt roi răn đe!",
              resolve: () => {
                clearSituationUI();
                state.xuSat += 7;
                state.luongLanh += 0.8;
                state.rep.uy_quyen += 12;
                nd.batManDan = Math.max(0, nd.batManDan - 8);
                updateCenterStage("Bạn ập tới bắt sống gã quản trang cùng tang vật, thu hồi 7 đồng xu sắt và 0.8 phần lương lành! Đám thuộc hạ trong dinh từ đó răm rắp phục tùng không dám gian dối.", [{ label: "🪙 Thu hồi +7 Xu, +0.8 Lương", type: "gain" }]);
                render();
              }
            },
            {
              text: "🤫 Gọi riêng gã Quản trang vào phòng, bắt hắn nộp 5 Xu chuộc tội và biến hắn thành tay sai đắc lực",
              resolve: () => {
                clearSituationUI();
                state.xuSat += 5;
                if (state.npcRelations["QUAN_TRANG_AP"]) state.npcRelations["QUAN_TRANG_AP"].dong_loa = true;
                updateCenterStage("Biết bạn nắm thóp mạng sống của mình, gã quản trang run rẩy dâng 5 đồng xu sắt và thề sống chết làm chó săn trung thành cho bạn!", [{ label: "🪙 +5 Xu · 🤝 Quản trang thành Đồng lõa", type: "gain" }]);
                render();
              }
            }
          ]
        }
      ];

      // Nếu độ bất mãn của dân >= 80%: Nổ ra biến cố NỔI LOẠN ĐỐT DINH THỰ!
      if (nd.batManDan >= 80) {
        SoundFX.playDoorKnock();
        setScreenVignette('danger');
        showSituationUI(
          "🔥 BẠO ĐỘNG: NÔNG NÔ CẦM ĐUỐC BAO VÂY DINH THỰ!",
          "Vì bị siết tô thuế quá mức chịu đựng (Độ bất mãn chạm đỉnh), hàng chục nông nô cầm cuốc xẻng và đuốc lửa đang hò hét đập cổng dinh thự đòi mở kho chia thóc!",
          [
            {
              text: "🥣 Lập tức mở kho phát 1.5 Lương lành & 5 Xu sắt xoa dịu đám đông trước khi lửa bén lên mái",
              resolve: () => {
                clearSituationUI();
                state.luongLanh = Math.max(0, state.luongLanh - 1.5);
                state.xuSat = Math.max(0, state.xuSat - 5);
                nd.batManDan = 35;
                updateCenterStage("Nhận được thóc gạo và lời hứa giảm tô của bạn, đám đông dần hạ vũ khí giải tán trong đêm.", [{ label: "🕊️ Dập tắt bạo động", type: "gain" }]);
                render();
              }
            },
            {
              text: "⚔️ Cầm đao chỉ huy toán Gia đinh xông ra trấn áp thẳng tay!",
              resolve: () => {
                clearSituationUI();
                if (state.voNghe >= 3.0 || nd.soGiaDinh >= 4) {
                  nd.batManDan = 50;
                  state.theLuc = Math.max(10, state.theLuc - 25);
                  updateCenterStage("Cuộc xô xát đẫm máu trước cổng dinh thự kết thúc khi toán gia đinh của bạn đánh dạt đám người cầm đầu.", [{ label: "⚔️ Trấn áp bằng vũ lực", type: "warn" }]);
                } else {
                  state.sucKhoe = Math.max(10, state.sucKhoe - 30);
                  state.xuSat = Math.max(0, state.xuSat - 10);
                  nd.batManDan = 45;
                  updateCenterStage("Đám đông quá hung hãn tràn qua cổng lấy đi 10 đồng xu sắt và đánh bạn bị thương (-30 Sức khỏe)!", [{ label: "🩸 Thất thủ trước đám đông", type: "warn" }]);
                }
                render();
              }
            }
          ]
        );
        return;
      }

      const pick = nobleDilemmas[Math.floor(Math.random() * nobleDilemmas.length)];
      SoundFX.playDoorKnock();
      showSituationUI(pick.title, pick.desc, pick.choices);
    } else {
      // --- BỘ TÌNH HUỐNG NHẬP VAI CỦA NÔNG NÔ / DÂN THƯỜNG (HƯỚNG B) ---
      const commonerDilemmas = [
        {
          title: "⚡ BIẾN CỐ XÓM GIỀNG: HÀNG XÓM Đập CỬA ĐÊM KHUYA!",
          desc: "Ngoài cửa gỗ có tiếng gõ gấp gáp. Bác nông dân nhà bên cạnh run rẩy đứng dưới gió lạnh:\n\"Cứu nhà tôi với! Đứa nhỏ đang sốt co giật mà bếp tắt lửa, bồ gạo cũng cạn sạch rồi. Cho nhà tôi vay tạm 0.4 phần lương lành hoặc nửa bó củi qua đêm nay, sang mùa gặt tôi trả gấp đôi!\"",
          choices: [
            {
              text: "🤝 Sớt ngay 0.4 Lương lành & 0.4 Củi khô cứu đứa nhỏ (Tạo tình nghĩa sâu nặng trong xóm)",
              resolve: () => {
                clearSituationUI();
                if (state.luongLanh >= 0.4 && state.cui >= 0.4) {
                  state.luongLanh = Number((state.luongLanh - 0.4).toFixed(2));
                  state.cui = Number((state.cui - 0.4).toFixed(2));
                  state.rep.danh_du += 15;
                  state.macroDeltaMod.to_chuc_tam_giang += 0.08;
                  const note = "Đêm lạnh chia gạo và củi cứu sống đứa trẻ nhà hàng xóm";
                  if (!state.deltasGhiNhan.includes(note)) state.deltasGhiNhan.push(note);
                  updateCenterStage("Người hàng xóm ôm gói gạo và bó củi chạy về trong nước mắt cảm kích. Vài hôm sau khi đứa nhỏ khỏe lại, họ mang biếu lại bạn 3 đồng xu sắt tích cóp!", [{ label: "🌱 Tạo Delta Tình làng nghĩa xóm · +3 Xu", type: "gain" }]);
                  state.xuSat += 3;
                } else {
                  updateCenterStage("Bạn lục tìm trong bếp nhưng chính nhà bạn cũng không còn đủ 0.4 Lương lành và 0.4 Củi!", [{ label: "⚠️ Lực bất tòng tâm", type: "warn" }]);
                }
                render();
              }
            },
            {
              text: "🥀 Thở dài đóng cửa từ chối vì lương thực trong nhà cũng chỉ vừa đủ cầm cự",
              resolve: () => {
                clearSituationUI();
                state.chan = Math.min(100, state.chan + 10);
                updateCenterStage("Bạn cài chặt then cửa quay vào trong. Tiếng bước chân lủi thủi rời đi ngoài ngõ làm lòng bạn nặng trĩu.", [{ label: "🕯️ Giữ lương thực cho bản thân", type: "warn" }]);
                render();
              }
            }
          ]
        },
        {
          title: "⚡ BIẾN CỐ LAO DỊCH: QUẢN TRANG BẮT NỘP BÙ TÔ!",
          desc: "Gã Quản trang Chủ Ấp dẫn hai tên gia đinh cầm gậy chặn ngay trước sân nhà bạn, lớn tiếng quát:\n\"Hộ nông nô sát vách nhà ngươi đã bỏ trốn đêm qua! Chủ Ấp ra lệnh các hộ xung quanh phải nộp bù phần thóc thiếu của chúng: Nộp ngay 2 Xu sắt hoặc đi gánh đất đắp đê nửa ngày không công!\"",
          choices: [
            {
              text: "💪 Cắn răng đi gánh đất đắp đê chịu phạt lao dịch (-22 Thể lực) để giữ tiền",
              resolve: () => {
                clearSituationUI();
                state.theLuc = Math.max(5, state.theLuc - 22);
                advanceClock(45, false, false);
                updateCenterStage("Bạn còng lưng gánh đất dưới sự giám sát của đám gia đinh suốt buổi, người mỏi nhừ nhưng giữ được đồng xu trong túi.", [{ label: "😮‍💨 Chịu phạt lao dịch (-22 Thể lực)", type: "warn" }]);
                render();
              }
            },
            {
              text: "🪙 Đưa 2 Xu sắt cho êm chuyện để giữ sức làm việc khác",
              resolve: () => {
                clearSituationUI();
                if (state.xuSat >= 2) {
                  state.xuSat -= 2;
                  updateCenterStage("Nhận 2 đồng xu sắt, gã quản trang hất hàm bỏ sang nhà khác.", [{ label: "🪙 -2 Xu sắt nộp bù", type: "warn" }]);
                } else {
                  state.theLuc = Math.max(5, state.theLuc - 25);
                  updateCenterStage("Không có đủ 2 xu sắt, chúng bắt bạn đi khuân đá đắp mương tới tối mịt!", [{ label: "🥵 Bị cưỡng bức lao dịch", type: "warn" }]);
                }
                render();
              }
            }
          ]
        }
      ];

      const pick = commonerDilemmas[Math.floor(Math.random() * commonerDilemmas.length)];
      SoundFX.playDoorKnock();
      showSituationUI(pick.title, pick.desc, pick.choices);
    }
  }

  // 7. XỬ LÝ KẾT QUẢ CÁC HÀNH ĐỘNG CỦA GIAI CẤP THỐNG TRỊ & KÍCH HOẠT DILEMMA ĐỊNH KỲ
  const prevFinalizeNoble = finalizeActionResult;
  finalizeActionResult = function(tpl, isPush, wasSlowed) {
    ensureNobleState();
    prevFinalizeNoble(tpl, isPush, wasSlowed);

    const kq = (tpl && tpl.ket_qua) || {};
    const nd = state.nobleData;
    const notes = [];

    if (kq.noble_rest_feast) {
      state.theLuc = Math.min(100, state.theLuc + 35);
      state.doi = Math.max(5, state.doi - 45);
      state.lanh = 10;
      state.cangCo = Math.max(0, (state.cangCo || 0) - 30);
      notes.push("🍵 Nhờ có người hầu chăm sóc và bữa điểm tâm nóng sốt, cơ thể bạn hoàn toàn sảng khoái.");
    }

    if (kq.noble_servant_shop) {
      state.luongLanh = Math.min(8.0, state.luongLanh + 1.8);
      state.cui = Math.min(6.0, state.cui + 2.0);
      state.nuocSach = 6;
      state.doi = Math.max(10, state.doi - 30);
      state.lanh = 12;
      notes.push("📣 Gia đinh đã chất đầy lương thảo (+1.8 Lương lành), củi đốt (+2.0 Củi) và đổ đầy chum nước (6 gáo), đồng thời dọn sẵn bữa cơm nóng cho bạn.");
    }

    if (kq.noble_collect_rent) {
      const baseRentXu = Math.max(4, Math.round(nd.soTaDien * 0.45));
      const stolenBySteward = nd.quanTrangGianLan ? 3 : 0;
      const actualXu = Math.max(2, baseRentXu - stolenBySteward);
      state.xuSat += actualXu;
      state.luongLanh = Math.min(8.0, state.luongLanh + 1.2);
      nd.batManDan = Math.min(100, nd.batManDan + 14);
      notes.push(`📜 Đợt thu tô từ ${nd.soTaDien} hộ tá điền mang về +${actualXu} Xu sắt và +1.2 Lương lành (Độ bất mãn của nông nô tăng lên ${nd.batManDan}%).` + (stolenBySteward > 0 ? " (Bạn thoáng thấy ánh mắt gã Quản trang có vẻ lấm lét khi trình sổ...)" : ""));
    }

    if (kq.noble_audit_steward) {
      if (nd.quanTrangGianLan) {
        nd.quanTrangGianLan = false;
        state.xuSat += 9;
        state.rep.uy_quyen += 12;
        notes.push("👁️ [Bắt tận tay gian lận]: Bạn phát hiện gã Quản trang khai man sổ tô, lập tức tịch thu lại +9 Xu sắt biển thủ và chấn chỉnh kỷ cương điền trang!");
      } else {
        state.rep.uy_quyen += 4;
        nd.quanTrangGianLan = Math.random() < 0.35;
        notes.push("👁️ Sổ sách đợt này khớp từng đồng xu, đám thuộc hạ thấy bạn kiểm tra sát sao nên không ai dám lơ là.");
      }
    }

    if (kq.noble_relief_serfs) {
      nd.batManDan = Math.max(0, nd.batManDan - 30);
      nd.soTaDien += 2;
      state.rep.danh_du += 18;
      state.macroDeltaMod.to_chuc_tam_giang += 0.10;
      const dNote = "Chủ Ấp mở kho lương phát cháo và giảm tô cứu dân qua mùa Giá";
      if (!state.deltasGhiNhan.includes(dNote)) state.deltasGhiNhan.push(dNote);
      notes.push(`🥣 Lòng dân trong ấp phấn khởi tột cùng (Độ bất mãn giảm xuống ${nd.batManDan}%), có thêm 2 hộ dân lưu tán xin vào ấp cày ruộng cho bạn!`);
    }

    if (kq.noble_judge_dispute) {
      state.rep.uy_quyen += 10;
      state.rep.danh_du += 8;
      state.xuSat += 3;
      if (state.hocVan) state.hocVan.luat_le = Number((state.hocVan.luat_le + 0.15).toFixed(2));
      notes.push("⚖️ Bản án phân xử hợp tình hợp lý của bạn khiến cả hai bên tâm phục khẩu phục (+3 Xu lệ phí công đường, +Uy quyền, +Luật lệ).");
    }

    if (kq.noble_pay_crown_tax) {
      nd.daNopThueMuaNay = true;
      state.rep.uy_quyen += 15;
      notes.push("🏛️ Nha môn Kinh Hoài đóng dấu xác nhận điền trang của bạn đã hoàn thành nghĩa vụ Cống thuế Khế mùa này.");
    }

    if (kq.noble_host_banquet) {
      state.rep.uy_quyen += 16;
      state.rep.tin_nhiem_tm += 12;
      if (state.hocVan) state.hocVan.doi_nhan = Number((state.hocVan.doi_nhan + 0.20).toFixed(2));
      notes.push("🍶 Buổi yến tiệc giúp bạn kết giao sâu rộng với giới quyền quý Kinh Hoài (+Uy quyền lớn, +Đối nhân xử thế).");
    }

    if (notes.length > 0) {
      const box = document.getElementById("narrativeBox");
      if (box) box.textContent += "\n\n" + notes.join("\n");
      render();
    }

    // Cứ mỗi 4 nhịp hành động, kích hoạt một Biến cố Đời sống Đột xuất (Hướng B)
    if (!state.isDead && !freneticInterval && state.actionsTaken - (state.lastDilemmaBeat || 0) >= 4) {
      if (Math.random() < 0.65) {
        state.lastDilemmaBeat = state.actionsTaken;
        triggerRoleplayDilemma();
      }
    }
  };

  // 8. NÂNG CẤP NÚT "TUA 2 NGÀY" CHO RIÊNG GIAI CẤP THỐNG TRỊ (GIA ĐINH HẦU HẠ & THU TÔ TỰ ĐỘNG)
  const prevSkipNoble = skipDaysSmart;
  skipDaysSmart = function() {
    ensureNobleState();
    if (!window.isHighBornOrRuler(state.persona)) {
      prevSkipNoble();
      return;
    }
    if (state.isWorking || freneticInterval || state.isDead) return;
    SoundFX.playSoftStep();

    const nd = state.nobleData;
    const stepsLog = [];
    const deltas = [{ label: '⏩ 2 ngày tại Dinh thự', type: '' }];

    state.location = 'nha';
    // Gia đinh tự động lo cơm rượu, củi sưởi và thu tô nhẹ
    const rentIncome = Math.max(3, Math.round(nd.soTaDien * 0.25));
    state.xuSat += rentIncome - 2; // Thu tô trừ đi 2 xu chi phí sinh hoạt dinh thự
    state.luongLanh = Math.min(8.0, state.luongLanh + 0.6);
    state.cui = Math.min(6.0, state.cui + 1.0);
    state.nuocSach = 6;

    stepsLog.push(`Gia đinh hầu hạ cơm nước, sưởi ấm lò than và giữ cổng dinh thự an toàn (-2 Xu chi phí).`);
    stepsLog.push(`Quản trang thu tiền tô lẻ từ ${nd.soTaDien} hộ tá điền nộp vào trướng phòng (+${rentIncome} Xu sắt, +0.6 Lương lành).`);

    if (state.hocVan) {
      state.hocVan.luat_le = Number((state.hocVan.luat_le + 0.08).toFixed(2));
      state.hocVan.kinh_te = Number((state.hocVan.kinh_te + 0.08).toFixed(2));
      stepsLog.push(`Ngồi trong thư phòng đọc sách điển chế và duyệt sổ sách điền trang.`);
    }

    advanceClock(24 * 60 * 2, true, true);
    state.doi = 15;
    state.lanh = 12;
    state.theLuc = 96;
    state.sucKhoe = Math.min(100, state.sucKhoe + 8);
    state.cangCo = 0;
    state.hour = 8;
    state.actionsTaken++;

    deltas.push({ label: `🪙 Thu ròng +${rentIncome - 2} Xu`, type: 'gain' });
    deltas.push({ label: '🏯 Dinh thự ấm êm', type: 'gain' });

    updateCenterStage("[SINH HOẠT CỦA BẬC QUÝ TỘC / CHỦ ẤP QUA 2 NGÀY]:\n• " + stepsLog.join("\n• "), deltas);
    render();
  };
  const btnSkipEl = document.getElementById("btnSkipAuto");
  if (btnSkipEl) btnSkipEl.onclick = skipDaysSmart;

  // 9. CƠ CHẾ BẢO HIỂM BỐC GIAI CẤP (30% TỶ LỆ BỐC TRÚNG TẦNG TRÊN, Tối đa 2 kiếp nghèo là tới 1 kiếp Quý tộc/Chủ Ấp!)
  const prevRandomReincarnate = window.startRandomReincarnation;
  window.startRandomReincarnation = function() {
    ensureNobleState();
    const forceNoble = (state.consecCommonerLives || 0) >= 2 || Math.random() < 0.32;

    if (forceNoble && typeof ARCHETYPES_POOL !== "undefined" && ARCHETYPES_POOL.length > 0) {
      const highPool = ARCHETYPES_POOL.filter(a =>
        a.giai_cap === "ky_si_quan_nhan" ||
        a.giai_cap === "quan_lai" ||
        a.giai_cap === "thien_menh_chi_tu" ||
        a.giai_cap === "thuong_nhan_thi_dan" ||
        (a.ten_kieu && (a.ten_kieu.includes("Chủ Ấp") || a.ten_kieu.includes("Quý tộc") || a.ten_kieu.includes("Tri Ấp")))
      );

      if (highPool.length > 0) {
        const picked = highPool[Math.floor(Math.random() * highPool.length)];
        const randomAge = Math.floor(Math.random() * (picked.tuoi_max - picked.tuoi_min + 1)) + picked.tuoi_min;
        const randomBirthYear = Math.floor(Math.random() * 170) + 5;
        const ho = picked.ho_goi_y[Math.floor(Math.random() * picked.ho_goi_y.length)];
        const ten = picked.ten_goi_y[Math.floor(Math.random() * picked.ten_goi_y.length)];

        state.consecCommonerLives = 0;
        const noblePersona = {
          id: picked.ma + "_NOBLE_" + Date.now(),
          title: picked.ten_kieu + " (" + randomAge + " tuổi)",
          ten: ho + " " + ten + " (" + picked.ten_kieu.replace(/\[[^\]]+\]\s*/, "") + ")",
          tuoi: randomAge,
          nam_sinh: randomBirthYear,
          giai_doan: getLifeStageByAge(randomAge),
          giai_cap: picked.giai_cap === "thuong_nhan_thi_dan" ? "thuong_nhan_thi_dan" : (picked.giai_cap || "ky_si_quan_nhan"),
          than_phan: picked.than_phan,
          vi_tri_khoi_dau: picked.vi_tri || "nha",
          boi_canh_mo_ta: "👑 [Bốc trúng Tầng lớp Trên]: " + picked.boi_canh + "\n• Bạn sống trong Dinh thự riêng, đi lại bằng ngựa và có Gia đinh / Tá điền dưới quyền sai khiến!",
          nguoi: [], nghia_vu: [], biet_chu: true, co_riu: true, nhay_ben_xh: 75,
          tri_thuc: 4, vo_nghe: 2, buon_ban: 3,
          cua_cai_then: true, vach_rach: false, mai_vung: true,
          xu_sat: 22, nuoc: 6, cui: 4.5, go_tho: 0, luong_lanh: 4.5, luong_moc: 0, lanh: 15, doi: 20,
          luoi: 25, kien_nhan: 75, y_chi: 75, trach_nhiem: 70, can_dam: 65, hao_mon: 0, mu: false,
          tam_niem: { mong: picked.mong, so: picked.so, ganh_nang: picked.ganh_nang, goc_khuat: picked.goc_khuat }
        };
        beginLifeWithPersona(noblePersona);
        return;
      }
    }

    state.consecCommonerLives = (state.consecCommonerLives || 0) + 1;
    prevRandomReincarnate();
  };

  // 10. ĐỔI GIAO DIỆN KHÔNG GIAN SỐNG SANG "🏯 DINH THỰ CHỦ ẤP / TƯ DINH" KHI LÀ TẦNG TRÊN (HƯỚNG C)
  const prevRenderNoble = render;
  render = function() {
    ensureNobleState();
    const p = state.persona;
    const isNoble = p && window.isHighBornOrRuler(p);

    // Đổi tên địa điểm "nha" theo đúng giai cấp trước khi vẽ
    const nhaPlace = PLACES.find(pl => pl.id === "nha");
    if (nhaPlace) {
      if (isNoble) {
        nhaPlace.short = "🏯 Dinh thự Chủ Ấp";
        nhaPlace.full = "Dinh thự & Điền trang riêng (Trong dinh)";
        PLACE_NAMES["nha"] = nhaPlace.full;
      } else {
        nhaPlace.short = "🏠 Gian nhà tranh";
        nhaPlace.full = "Gian nhà tranh (Trong nhà)";
        PLACE_NAMES["nha"] = nhaPlace.full;
      }
    }

    prevRenderNoble();
    if (!p || !isNoble) return;

    // Ghi đè 3 thẻ trạng thái nhà tranh thành 3 thẻ quản trị Dinh thự & Điền trang
    const hBadges = document.getElementById("houseBadges");
    if (hBadges) {
      const nd = state.nobleData;
      hBadges.innerHTML =
        `<span class="house-badge safe">🛡️ Hộ viện: ${nd.soGiaDinh} Gia đinh</span>` +
        `<span class="house-badge safe">🌾 Điền trang: ${nd.soTaDien} hộ Tá điền</span>` +
        `<span class="house-badge ${nd.batManDan >= 60 ? 'vuln' : 'safe'}">🔥 Bất mãn nông nô: ${nd.batManDan}%</span>`;
    }
  };

  // Khởi tạo lại danh sách nhân vật ở màn hình đầu để hiện ngay P7 (Chủ Ấp) và P8 (Quan Chức Sự)
  if (typeof initStartMenu === "function") {
    initStartMenu();
  }
})();
