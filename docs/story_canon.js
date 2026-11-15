// =========================================================================
// DỮ LIỆU CỐT TRUYỆN HẠT NHÂN (docs/story_canon.js) - MỤC 49, 51, 53, 54.2
// Bao gồm: 10 Dấu vết, 7 Vật lưu truyền (V1-V7) & 60 Nhân vật Tầng A (A01-A60)
// =========================================================================

// 1. MƯỜI DẤU VẾT ĐỜI THƯỜNG (Mục 54.2 - Không lộ thuật ngữ mật)
const STORY_TRACES_DB = [
  { ma: "D1", mo_ta: "Phiếu thu thuế mùa này đóng một con dấu lạ có tới ba góc khắc khác nhau, người đi thu đeo thẻ bài của cả thương hội lẫn giáo đường." },
  { ma: "D2", mo_ta: "Khách qua đường nghêu ngao câu hát cổ kể về một vị tướng năm xưa cưới người vợ miền núi để mượn binh lương rồi bỏ bà nơi biên ải." },
  { ma: "D3", mo_ta: "Trên chuôi thanh đoản đao rèn từ vùng biên có khắc ba chấm nhỏ thẳng hàng — dấu tay riêng của một dòng thợ rèn lâu đời." },
  { ma: "D4", mo_ta: "Trước hiên thánh đường, các tu sĩ áo vải đang phát từng bát cháo loãng tưởng nhớ trận đói lớn từng cướp đi một phần ba dân vùng đồng bằng." },
  { ma: "D5", mo_ta: "Ở chợ bến sông, các lái buôn chuyền tay nhau những tờ phiếu nhận nợ đóng dấu hình con thuyền ba cột buồm." },
  { ma: "D6", mo_ta: "Phu khuân vác kháo nhau rằng sổ sách kho lương lớn trên kinh đô ghi đầy ắp nhưng nhiều gian trong kho chỉ toàn trấu và thóc mốc." },
  { ma: "D7", mo_ta: "Một làn khói đen bốc lên từ phía giáo đường; mấy người vừa bị gọi vào xét hỏi bước ra với vẻ mặt tái nhợt và không dám nói một lời." },
  { ma: "D8", mo_ta: "Những toán người miền núi mặc áo lông cừu dắt ngựa thồ hàng xuống chợ biên, ánh mắt luôn dè chừng lính tuần tiễu." },
  { ma: "D9", mo_ta: "Giá sắt phôi ở các lò rèn tăng vọt từng ngày vì tin đồn triều đình sắp mở đợt khai thác mỏ lớn trên dãy núi phía bắc." },
  { ma: "D10", mo_ta: "Những người biết đọc biết viết đang bị để ý kỹ; các bản sách chép tay cũ ngoài chợ đều phải giấu dưới đáy rương." }
];

// 2. BẢY VẬT LƯU TRUYỀN TRONG 200 NĂM (Mục 51.4 - Dùng tên tả thực)
const HEIRLOOM_RELICS_DB = [
  {
    ma: "V1", ten_hien_thi: "Chiếc chìa khóa đồng lớn rỉ xanh của kho lương cũ",
    chuyen_tay: [
      { minY: 8,   maxY: 50,  giu_boi: "A11", tai_noi: "kinh_hoai", ghi_chu: "Cất trong chiếc bình gốm nứt của vị quản kho đầu tiên" },
      { minY: 51,  maxY: 136, giu_boi: "A22", tai_noi: "kinh_hoai", ghi_chu: "Truyền qua các đời quản kho rồi bị ném xuống sông trong đêm mưa năm 136" },
      { minY: 137, maxY: 270, giu_boi: "A60", tai_noi: "cho_ben_say", ghi_chu: "Nằm dưới lớp bùn cạn bến sông Hạ Giang rồi rơi vào tay đứa trẻ mồ côi" }
    ]
  },
  {
    ma: "V2", ten_hien_thi: "Nửa con dấu ngọc cũ có vết bẻ gãy ở chính giữa",
    chuyen_tay: [
      { minY: -6,  maxY: 72,  giu_boi: "A07", tai_noi: "don_bien_ngan", ghi_chu: "Lưu giữ tại bộ lạc miền núi từ sau hôn ước năm lập quốc" },
      { minY: 73,  maxY: 144, giu_boi: "A31", tai_noi: "cho_ben_say", ghi_chu: "Thất lạc sau vụ cháy trại năm 73 và nằm trong ngăn tủ khóa kín ở tiệm cầm đồ" },
      { minY: 145, maxY: 270, giu_boi: "A59", tai_noi: "kinh_hoai", ghi_chu: "Được người thợ khắc dấu nhận ra đường nét của tổ tiên" }
    ]
  },
  {
    ma: "V3", ten_hien_thi: "Cuốn sổ bìa vải ố muối ghi hai cột lãi chìm",
    chuyen_tay: [
      { minY: 85,  maxY: 129, giu_boi: "A32", tai_noi: "cho_ben_say", ghi_chu: "Do người chủ ruộng muối tỉ mẩn ghi chép để chuẩn bị đi kiện" },
      { minY: 130, maxY: 165, giu_boi: "A31", tai_noi: "cho_ben_say", ghi_chu: "Cầm cố tại tiệm cầm đồ Hạ Giang ngay trước khi khổ chủ qua đời" },
      { minY: 166, maxY: 270, giu_boi: "A53", tai_noi: "kinh_hoai", ghi_chu: "Người cháu gái làm kế toán âm thầm truy tìm để rửa oan cho ông nội" }
    ]
  },
  {
    ma: "V4", ten_hien_thi: "Bản chép tay Niên Ký cổ giấu dưới chân đèn đá",
    chuyen_tay: [
      { minY: 0,   maxY: 51,  giu_boi: "A05", tai_noi: "duong_lang", ghi_chu: "Cất giấu dưới chân ngọn đèn lớn của thánh đường" },
      { minY: 52,  maxY: 140, giu_boi: "A17", tai_noi: "kinh_hoai", ghi_chu: "Được sao chép thêm bản phụ lưu giữ tại thư viện" },
      { minY: 141, maxY: 270, giu_boi: "A45", tai_noi: "duong_lang", ghi_chu: "Được tu sĩ chép sách mang theo chạy thoát khỏi đợt đốt sách" }
    ]
  },
  {
    ma: "V5", ten_hien_thi: "Thanh đoản đao thép khắc ba chấm nhỏ nơi chuôi gỗ",
    chuyen_tay: [
      { minY: 0,   maxY: 55,  giu_boi: "A06", tai_noi: "don_bien_ngan", ghi_chu: "Do người thợ rèn già rèn riêng cho đứa con nuôi" },
      { minY: 56,  maxY: 125, giu_boi: "A12", tai_noi: "don_bien_ngan", ghi_chu: "Lưu truyền qua các xưởng rèn vùng biên" },
      { minY: 126, maxY: 270, giu_boi: "A54", tai_noi: "don_bien_ngan", ghi_chu: "Trở thành vật nhận diện của những người thợ rèn họ Khổng" }
    ]
  },
  {
    ma: "V6", ten_hien_thi: "Bản chép lời Bài Ca Hai Vợ kèm khổ cuối thất truyền",
    chuyen_tay: [
      { minY: 3,   maxY: 130, giu_boi: "A29", tai_noi: "quan_bon_nga", ghi_chu: "Truyền miệng qua các gánh hát rong dọc bến sông và biên ải" },
      { minY: 131, maxY: 270, giu_boi: "A58", tai_noi: "quan_bon_nga", ghi_chu: "Vang lên trong các quán trọ mỗi độ có đoàn người miền núi đi qua" }
    ]
  },
  {
    ma: "V7", ten_hien_thi: "Tờ phụ lục khế ước đóng dấu ba bên",
    chuyen_tay: [
      { minY: -6,  maxY: 120, giu_boi: "A01", tai_noi: "kinh_hoai", ghi_chu: "Lưu giữ trong mật thất hoàng cung và tổng hội thương thuyền" },
      { minY: 121, maxY: 270, giu_boi: "A49", tai_noi: "kinh_hoai", ghi_chu: "Gia hạn qua các kỳ năm 60, năm 125 và tiến tới kỳ tất toán năm 190" }
    ]
  }
];

// 3. SÁU MƯƠI NHÂN VẬT HẠT NHÂN TẦNG A (Mục 53 - Đầy đủ A01 đến A60)
const TIER_A_CANON_DB = [
  // --- THẾ HỆ LẬP QUỐC (Sinh trước năm 0) ---
  { id: "A01", ten: "Lâm Khải", vai: "Vương đầu tiên của Hoài Dương", nam_sinh: -42, nam_mat: 31, tai_noi: "kinh_hoai", soi: "ngai", tai_an_noi: 80, dang_noi_doi: true,
    loi_noi_that: "Mỗi đêm ta vẫn đếm lại những bao thóc đã hứa với người chết trong trận Đại Đói năm xưa. Ngai vàng này đứng được là nhờ những món nợ chưa trả.",
    loi_noi_doi: "Hoài Dương lập quốc bằng gươm giáo và thiên mệnh, kho lương của vương triều không hề nợ nần bất kỳ ai!" },
  { id: "A02", ten: "Tú Y", vai: "Người vợ miền núi Ô Khuyết", nam_sinh: -30, nam_mat: 3, tai_noi: "don_bien_ngan", soi: "bien", tai_an_noi: 55, dang_noi_doi: false,
    loi_noi_that: "Ta chỉ mong đứa con nhỏ của mình lớn lên bình an nơi biên ải, đủ sức tự chọn lấy cuộc đời của riêng nó.",
    loi_noi_doi: "Mọi chuyện ở kinh thành ta đã quên hết rồi." },
  { id: "A03", ten: "Hà Thục Nghi", vai: "Vương hậu dòng họ Hà cũ", nam_sinh: -28, nam_mat: 44, tai_noi: "kinh_hoai", soi: "ngai", tai_an_noi: 75, dang_noi_doi: true,
    loi_noi_that: "Ta âm thầm nhận những người họ Hà sa cơ vào làm thị nữ trong cung chỉ mong giữ lại chút máu mủ của gia tộc cũ.",
    loi_noi_doi: "Ta một lòng phụng sự vương triều mới, chẳng còn bận tâm gì tới cựu thần họ Hà nữa." },
  { id: "A04", ten: "Khổng Bảo", vai: "Lão thợ rèn cụt hai ngón tay", nam_sinh: -45, nam_mat: 20, tai_noi: "don_bien_ngan", soi: "bien", tai_an_noi: 50, dang_noi_doi: true,
    loi_noi_that: "Ta khắc ba chấm nhỏ lên chuôi mỗi con dao để sau này đứa con nuôi nhận ra đâu là tay thợ thật của gia đình mình.",
    loi_noi_doi: "Thằng bé Vọng là con ruột của ta đẻ ra ở xóm lò rèn này, chẳng liên quan gì tới người trên kinh đô cả!" },
  { id: "A05", ten: "Huyền Mịch", vai: "Đường chủ đầu tiên của Hỏa Đường", nam_sinh: -35, nam_mat: 38, tai_noi: "duong_lang", soi: "hoa", tai_an_noi: 80, dang_noi_doi: true,
    loi_noi_that: "Ta đã chép lại toàn bộ sự thật về hai tờ khế năm lập quốc vào cuốn Niên Ký và giấu dưới chân ngọn đèn đá lớn.",
    loi_noi_doi: "Trong thánh đường chỉ có kinh văn dạy người ta làm lành, không có sổ sách thế tục nào đâu." },
  { id: "A06", ten: "Lâm Vọng (Khổng Vọng)", vai: "Thợ rèn trẻ vùng biên", nam_sinh: -1, nam_mat: 55, tai_noi: "don_bien_ngan", soi: "bien", tai_an_noi: 55, dang_noi_doi: false,
    loi_noi_that: "Ta chỉ muốn có một xưởng rèn yên ổn và sống cuộc đời thợ thủ công bình thường, đừng ai bắt ta dính vào chuyện tranh ngôi đoạt vị.",
    loi_noi_doi: "Ta chưa từng nghe nói gì về chuyện thân thế của mình cả." },
  { id: "A07", ten: "Ô Khuyết Mộc Đà", vai: "Tộc trưởng già bộ lạc Ô Khuyết", nam_sinh: -60, nam_mat: 12, tai_noi: "don_bien_ngan", soi: "bien", tai_an_noi: 65, dang_noi_doi: false,
    loi_noi_that: "Năm xưa ta gả con gái và cho mượn binh lương vì lời thề cùng chung dãy Bạch Lĩnh. Bản lời thề gốc ta đã chôn dưới chân tổ núi.",
    loi_noi_doi: "Bộ lạc ta không còn giữ tín vật nào của cuộc hôn ước năm đó nữa." },
  { id: "A08", ten: "Đoàn Hải Phù", vai: "Hội trưởng đầu tiên Đoàn Thuyền", nam_sinh: -40, nam_mat: 26, tai_noi: "cho_ben_say", soi: "bac", tai_an_noi: 85, dang_noi_doi: true,
    loi_noi_that: "Một con nợ lớn kéo dài hai trăm năm có lợi hơn một con nợ trả đứt. Ta đã dạy con trai mình rằng ân nghĩa chính là khoản lãi về sau.",
    loi_noi_doi: "Đoàn Thuyền cho vay lương thực năm lập quốc hoàn toàn vì nghĩa hiệp cứu dân!" },

  // --- THẾ HỆ I (Sinh năm 3 - 45) ---
  { id: "A09", ten: "Lâm Trinh", vai: "Vương thứ hai của Hoài Dương", nam_sinh: 3, nam_mat: 58, tai_noi: "kinh_hoai", soi: "ngai", tai_an_noi: 70, dang_noi_doi: true,
    loi_noi_that: "Năm 31 chính ta đã lén cấp ngựa và lộ phí cho người anh cùng cha khác mẹ chạy sang Cao Lăng để tránh cảnh huynh đệ tương tàn.",
    loi_noi_doi: "Kẻ phản nghịch ở Biên Ngạn năm 31 đã bị quân triều đình truy kích không còn dấu vết." },
  { id: "A10", ten: "Hà Chiêu", vai: "Cựu quý tộc họ Hà ở Tây Lĩnh", nam_sinh: -20, nam_mat: 21, tai_noi: "duong_lang", soi: "ngai", tai_an_noi: 65, dang_noi_doi: false,
    loi_noi_that: "Đám trẻ mồ côi vùng Tây Lĩnh được ta nuôi lớn trong tu viện đều hiểu ai mới là chủ nhân xứng đáng của vùng đất này.",
    loi_noi_doi: "Họ Hà chúng ta đã cam phận làm dân thường rồi." },
  { id: "A11", ten: "Phó Lạc", vai: "Quản kho Thiên Lộc đầu tiên", nam_sinh: -25, nam_mat: 50, tai_noi: "kinh_hoai", soi: "lua", tai_an_noi: 60, dang_noi_doi: true,
    loi_noi_that: "Chiếc chìa khóa đồng của Gian Trong không chỉ để mở cửa kho, mà để nhắc nhở rằng thóc trong kho phải khớp với thóc trên sổ.",
    loi_noi_doi: "Mọi gian trong Kho Thiên Lộc đều đầy ắp thóc mới, không thiếu một hạt nào." },
  { id: "A12", ten: "Khổng Lan", vai: "Nữ thợ rèn Biên Ngạn", nam_sinh: 26, nam_mat: 78, tai_noi: "don_bien_ngan", soi: "bien", tai_an_noi: 55, dang_noi_doi: false,
    loi_noi_that: "Thanh đoản đao đầu tiên của cha để lại ta vẫn cất kỹ nơi góc lò, chỉ mong đời mình học được mặt chữ để tự ghi sổ.",
    loi_noi_doi: "Nhà ta chỉ biết đập sắt rèn cuốc, không giữ kỷ vật gì của đời trước đâu." },
  { id: "A13", ten: "Khổng Thạch", vai: "Nông dân gắn ruộng Tam Giang", nam_sinh: 28, nam_mat: 80, tai_noi: "ruong_chu_ap", soi: "lua", tai_an_noi: 45, dang_noi_doi: false,
    loi_noi_that: "Con dao cắt lúa có ba chấm nhỏ trên chuôi này là của cha ta truyền lại, nhờ nó sắc bén mà mùa gặt nào ta cũng cắt nhanh nhất đồng.",
    loi_noi_doi: "Dao này ta mua đại ngoài chợ phiên thôi." },
  { id: "A14", ten: "Ngô Tam", vai: "Trưởng làng Sậy Đỏ · Tam Giang", nam_sinh: 45, nam_mat: 105, tai_noi: "duong_lang", soi: "lua", tai_an_noi: 60, dang_noi_doi: false,
    loi_noi_that: "Ta nợ mạng bà đỡ Sáu Mụ từ lúc lọt lòng. Chừng nào ta còn làm trưởng làng, ta quyết không để hộ nào phải bán con vì thuế!",
    loi_noi_doi: "Làng Sậy Đỏ năm nay nộp đủ cả tô lẫn thuế, không ai giấu hạt thóc nào dưới hầm cả." },
  { id: "A15", ten: "Bà Sáu Mụ", vai: "Bà đỡ già vùng Tam Giang", nam_sinh: -35, nam_mat: 62, tai_noi: "duong_lang", soi: "lua", tai_an_noi: 60, dang_noi_doi: true,
    loi_noi_that: "Qua trận Đại Đói năm xưa nhờ đào rễ cây không độc mà sống, ta đã đỡ đẻ cho nửa số người ở vùng đồng bằng này.",
    loi_noi_doi: "Chuyện cha ruột của mấy đứa trẻ trong vùng ta già rồi nên chẳng nhớ gì đâu." },
  { id: "A16", ten: "Đoàn Hải Lạc", vai: "Hội trưởng Đoàn Thuyền đời thứ hai", nam_sinh: 12, nam_mat: 70, tai_noi: "cho_ben_say", soi: "bac", tai_an_noi: 80, dang_noi_doi: true,
    loi_noi_that: "Đặt được thương điếm ở bến Hạ Giang là nắm được mạch máu lúa gạo. Đôi khi ta mua lại giấy nợ nhỏ của dân nghèo rồi lặng lẽ xé bỏ.",
    loi_noi_doi: "Thương điếm của chúng ta chỉ mua bán vải vóc bình thường, không can dự gì tới thuế khoá." },
  { id: "A17", ten: "Lục Văn Tạ", vai: "Thầy chép sách thư viện Cao Lăng", nam_sinh: 10, nam_mat: 66, tai_noi: "kinh_hoai", soi: "hoa", tai_an_noi: 70, dang_noi_doi: true,
    loi_noi_that: "Khi chép lại cuốn Niên Ký cho Hỏa Đường, ta đã âm thầm chép thêm một bản riêng mà không ghi vào danh mục thư viện.",
    loi_noi_doi: "Mọi cuốn sách qua tay ta đều được nộp đủ cho giáo đường, không có bản sao nào khác." },
  { id: "A18", ten: "Huyền Dung", vai: "Y sĩ · Đường chủ thứ ba Hỏa Đường", nam_sinh: 18, nam_mat: 75, tai_noi: "duong_lang", soi: "hoa", tai_an_noi: 70, dang_noi_doi: false,
    loi_noi_that: "Trong những năm Dịch Ho Sương hoành hành, chính tay ta đã ghi lại từng cái tên người mất và truyền nghề thuốc cho các nữ tu.",
    loi_noi_doi: "Thuốc thang trong giáo đường lúc nào cũng dồi dào." },
  { id: "A19", ten: "Phạm Quân", vai: "Đội trưởng Kiếm Điền · Biên Ngạn", nam_sinh: 25, nam_mat: 80, tai_noi: "don_bien_ngan", soi: "bien", tai_an_noi: 60, dang_noi_doi: true,
    loi_noi_that: "Đứa bé gái mồ côi sau vụ cháy trại miền núi năm đó được ta nhận nuôi và giấu kín gốc gác để nó không bị người đời dị nghị.",
    loi_noi_doi: "Con bé là cháu họ xa của ta dưới quê gửi lên đồn biên giới." },
  { id: "A20", ten: "Mai Chức", vai: "Chủ Hội Phường thợ dệt Vĩ Thủy", nam_sinh: 35, nam_mat: 92, tai_noi: "cho_ben_say", soi: "bac", tai_an_noi: 68, dang_noi_doi: false,
    loi_noi_that: "Nếu thợ thủ công không kết thành Hội Phường để giữ giá tiền công, thuế Khế sẽ nghiền nát từng khung cửi một!",
    loi_noi_doi: "Hội Phường chúng ta hoàn toàn hài lòng với mức thuế hiện tại." },

  // --- THẾ HỆ II (Sinh năm 45 - 95) ---
  { id: "A21", ten: "Lâm Diên", vai: "Vương thứ tư của Hoài Dương", nam_sinh: 55, nam_mat: 121, tai_noi: "kinh_hoai", soi: "ngai", tai_an_noi: 75, dang_noi_doi: true,
    loi_noi_that: "Sáng nào ta cũng lật đọc các tờ khế cũ để tìm một kẽ hở pháp lý, chỉ mong mở được mỏ sắt Bạch Lĩnh trả dứt nợ.",
    loi_noi_doi: "Ngân khố quốc gia vẫn dư sức chi dùng cho cả trăm năm tới!" },
  { id: "A22", ten: "Tôn Bằng", vai: "Quản kho Thiên Lộc", nam_sinh: 58, nam_mat: 136, tai_noi: "kinh_hoai", soi: "lua", tai_an_noi: 75, dang_noi_doi: true,
    loi_noi_that: "Khi ta nhận chức thì kho đã rỗng một phần ba từ đời trước rồi! Ta chỉ lấy thóc vụ mới đắp vào chỗ thiếu hụt trên sổ mà thôi.",
    loi_noi_doi: "Kho Thiên Lộc tuyệt đối không thiếu một hạt thóc nào, ai phao tin đồn nhảm sẽ bị trị tội!" },
  { id: "A23", ten: "Tôn Nhị Nương", vai: "Kế toán giữ sổ Kho Thiên Lộc", nam_sinh: 95, nam_mat: 150, tai_noi: "kinh_hoai", soi: "lua", tai_an_noi: 65, dang_noi_doi: true,
    loi_noi_that: "Để cứu cha khỏi án tử, ta đã chép con số thóc thực tế vào một cuốn sổ nhỏ và giấu dưới nền gạch bếp.",
    loi_noi_doi: "Sổ sách kho lương của cha ta hoàn toàn khớp với thực tế." },
  { id: "A24", ten: "Đoàn Hải Quang", vai: "Hội trưởng Đoàn Thuyền đời thứ ba", nam_sinh: 62, nam_mat: 128, tai_noi: "cho_ben_say", soi: "bac", tai_an_noi: 80, dang_noi_doi: true,
    loi_noi_that: "Ký xong tờ Khế Mới năm 125 là Đoàn Thuyền nắm chắc phần thắng, nhưng tuyệt đối không được để lộ cách tính lãi chìm.",
    loi_noi_doi: "Mọi khoản lãi đều được tính công khai minh bạch theo đúng ước lệ." },
  { id: "A25", ten: "Tạ Quý", vai: "Tri Ấp vùng Hạ Giang", nam_sinh: 70, nam_mat: 132, tai_noi: "kinh_hoai", soi: "ngai", tai_an_noi: 72, dang_noi_doi: true,
    loi_noi_that: "Người đời chửi ta thu thuế tàn nhẫn, nhưng tiền lót tay của đám nhà giàu ta đều đem nuôi hơn chục đứa trẻ mồ côi trong hậu viện.",
    loi_noi_doi: "Phép vua cứ theo sổ mà thu, ta không làm việc gì trái quy tắc cả." },
  { id: "A26", ten: "Nguyên Hiệp", vai: "Giảng sư sáng lập phái Nhất Hỏa", nam_sinh: 55, nam_mat: 125, tai_noi: "duong_lang", soi: "hoa", tai_an_noi: 75, dang_noi_doi: false,
    loi_noi_that: "Ngọn lửa thiêng sinh ra là để nấu chín bát cháo chia cho người đói và soi sáng mặt chữ cho dân nghèo, chứ không phải để thu thập phân!",
    loi_noi_doi: "Giữa các tu sĩ trong Hỏa Đường không hề có sự bất đồng nào." },
  { id: "A27", ten: "Cát Vạn", vai: "Đường chủ phái Tam Hỏa", nam_sinh: 50, nam_mat: 118, tai_noi: "kinh_hoai", soi: "hoa", tai_an_noi: 78, dang_noi_doi: false,
    loi_noi_that: "Cha ta từng chết dưới tay đám lính đói loạn lạc. Chỉ có kỷ luật nghiêm minh và trật tự thập phân mới ngăn được cảnh Đại Đói lặp lại!",
    loi_noi_doi: "Mọi giáo sĩ đều tuân phục tuyệt đối đường lối của tổng đường." },
  { id: "A28", ten: "Bạc Sơn Ngột", vai: "Tộc trưởng bộ lạc Ô Khuyết", nam_sinh: 45, nam_mat: 125, tai_noi: "don_bien_ngan", soi: "bien", tai_an_noi: 65, dang_noi_doi: false,
    loi_noi_that: "Dãy núi Bạch Lĩnh là đất chung theo ước hẹn từ thời tổ phụ. Nếu người miền xuôi muốn độc chiếm mỏ sắt, người miền núi sẽ không lùi bước!",
    loi_noi_doi: "Chúng ta chỉ xuống chợ đổi muối và vải, không quan tâm chuyện mỏ sắt." },
  { id: "A29", ten: "Khuất Na", vai: "Nữ nghệ nhân hát rong biên giới", nam_sinh: 50, nam_mat: 130, tai_noi: "quan_bon_nga", soi: "bien", tai_an_noi: 75, dang_noi_doi: false,
    loi_noi_that: "Bài Ca Hai Vợ mà các người hay nghe ở quán rượu thực ra còn một khổ cuối kể về hai nửa con dấu ngọc bị bẻ đôi.",
    loi_noi_doi: "Đó chỉ là bài hát tình duyên bịa ra cho khách uống rượu nghe vui tai thôi." },
  { id: "A30", ten: "Khổng Mịch", vai: "Thợ cả lò rèn Cao Lăng", nam_sinh: 65, nam_mat: 125, tai_noi: "don_bien_ngan", soi: "bien", tai_an_noi: 55, dang_noi_doi: true,
    loi_noi_that: "Xưởng của ta nhận rèn vũ khí cho cả hai phía để giữ nghề, nhưng trên mỗi chuôi đao ta đều đóng dấu ba chấm để người cùng dòng máu nhận ra nhau.",
    loi_noi_doi: "Ta chỉ rèn nông cụ cho nông dân cày ruộng mà thôi." },
  { id: "A31", ten: "Mộc Phát", vai: "Chủ tiệm cầm đồ Bến Sậy · Hạ Giang", nam_sinh: 70, nam_mat: 135, tai_noi: "cho_ben_say", soi: "bac", tai_an_noi: 75, dang_noi_doi: true,
    loi_noi_that: "Trong ngăn tủ khóa kín cuối tiệm có nửa con dấu ngọc gãy và cuốn sổ muối chưa ai dám đến chuộc.",
    loi_noi_doi: "Tiệm của ta chỉ toàn nồi đồng cũ với cuốc xẻng rỉ sét, làm gì có ấn tín hay sổ mật nào!" },
  { id: "A32", ten: "Điền Hứa", vai: "Chủ ruộng muối Đồi Muối", nam_sinh: 85, nam_mat: 129, tai_noi: "cho_ben_say", soi: "bac", tai_an_noi: 65, dang_noi_doi: false,
    loi_noi_that: "Ta đã tính đi tính lại suốt ba mùa: khoản lãi mà thương hội áp lên diêm dân là lãi chìm cộng dồn trái với giao kèo gốc!",
    loi_noi_doi: "Việc buôn bán muối của nhà ta vẫn thuận lợi, không có tranh chấp gì." },
  { id: "A33", ten: "Lục Thanh Vân", vai: "Thủ thư thành bang Cao Lăng", nam_sinh: 80, nam_mat: 145, tai_noi: "kinh_hoai", soi: "hoa", tai_an_noi: 70, dang_noi_doi: true,
    loi_noi_that: "Trước khi ngọn lửa xét duyệt lan tới thư phòng, ta đã kịp gửi các quyển chép tay quan trọng nhất tản đi nhiều nhà quen.",
    loi_noi_doi: "Toàn bộ sách cũ đều đã nộp lên cho cuộc kiểm duyệt rồi." },
  { id: "A34", ten: "Quách Đồng", vai: "Tướng trấn thủ Đồn Biên Ngạn", nam_sinh: 70, nam_mat: 126, tai_noi: "don_bien_ngan", soi: "bien", tai_an_noi: 65, dang_noi_doi: false,
    loi_noi_that: "Ta thích ngủ ngay cạnh lò rèn quân doanh để nghe tiếng búa đập sắt. Có giữ được mỏ sắt Bạch Lĩnh thì quân lính mới có giáp bền.",
    loi_noi_doi: "Biên giới phía bắc hoàn toàn yên tĩnh, không có động tĩnh gì." },

  // --- THẾ HỆ III (Sinh năm 100 - 135) ---
  { id: "A35", ten: "Lâm Quyết", vai: "Vương thứ sáu của Hoài Dương", nam_sinh: 118, nam_mat: 183, tai_noi: "kinh_hoai", soi: "ngai", tai_an_noi: 75, dang_noi_doi: true,
    loi_noi_that: "Từ đêm nghe một cung nữ già hát câu chuyện về người vợ miền núi năm xưa, ta bắt đầu tự hỏi phải chăng ngai vàng này mang một món nợ máu.",
    loi_noi_doi: "Mọi chiến dịch ở biên giới đều nhằm bảo vệ bờ cõi hiển nhiên của vương triều." },
  { id: "A36", ten: "Hạ Lễ Mặc", vai: "Tổng Sự đứng đầu Nha Môn Kinh Hoài", nam_sinh: 110, nam_mat: 176, tai_noi: "kinh_hoai", soi: "ngai", tai_an_noi: 85, dang_noi_doi: true,
    loi_noi_that: "Làm quan đầu triều giữa thời nợ chồng nợ chẳng khác nào lấy giấy dán lên vách mục; điều ta sợ nhất là dân chúng biết kho lương đã cạn.",
    loi_noi_doi: "Triều cương vững vàng, lương thảo trong Kho Thiên Lộc đủ dùng qua mọi thiên tai!" },
  { id: "A37", ten: "Đoàn Hải Nghi", vai: "Hội trưởng Đoàn Thuyền đời thứ tư", nam_sinh: 105, nam_mat: 170, tai_noi: "cho_ben_say", soi: "bac", tai_an_noi: 82, dang_noi_doi: true,
    loi_noi_that: "Sau cái chết của người chủ muối năm xưa, ta đã mua lại mảnh ruộng muối ấy nhưng để hoang suốt nhiều năm không dám cho ai khai thác.",
    loi_noi_doi: "Mọi vụ kiện tụng ở Đồi Muối năm xưa đều đã khép lại đúng luật." },
  { id: "A38", ten: "Cát Thu Hiền", vai: "Nữ y sĩ phái Nhất Hỏa", nam_sinh: 105, nam_mat: 170, tai_noi: "duong_lang", soi: "hoa", tai_an_noi: 65, dang_noi_doi: false,
    loi_noi_that: "Dù bị phái Tam Hỏa dò xét, ta vẫn lén dùng thảo dược rừng cứu thêm từng đứa trẻ một qua những năm mất mùa dịch bệnh.",
    loi_noi_doi: "Nhà thuốc từ thiện chỉ phát nước sắc thông thường thôi." },
  { id: "A39", ten: "Hạng Tông", vai: "Thẩm vấn viên Soi Lửa · Kinh Hoài", nam_sinh: 102, nam_mat: 185, tai_noi: "kinh_hoai", soi: "hoa", tai_an_noi: 82, dang_noi_doi: true,
    loi_noi_that: "Đêm nào mất ngủ ta cũng mở cuốn sổ ghi tên những người mình từng thẩm vấn; ta làm vậy chỉ vì sợ vương quốc rơi vào hỗn loạn lần nữa.",
    loi_noi_doi: "Hỏa Đường không hề giữ bản chép Niên Ký nào về món nợ lập quốc cả, mọi lời đồn đều là bịa đặt!" },
  { id: "A40", ten: "Ngô Hạnh", vai: "Bà chủ Quán trọ Bốn Ngả", nam_sinh: 135, nam_mat: 200, tai_noi: "quan_bon_nga", soi: "bac", tai_an_noi: 72, dang_noi_doi: false,
    loi_noi_that: "Mọi tin tức từ biên ải về kinh đô đều đi qua bàn rượu của ta. Đứa trẻ mồ côi nào ghé qua bếp sau ta cũng chừa cho phần cơm nóng.",
    loi_noi_doi: "Quán ta vắng khách, chẳng nghe thấy chuyện gì hệ trọng đâu." },
  { id: "A41", ten: "Phạm Tuyết", vai: "Nữ hiệp bảo tiêu · Biên Ngạn", nam_sinh: 130, nam_mat: 178, tai_noi: "don_bien_ngan", soi: "bien", tai_an_noi: 60, dang_noi_doi: false,
    loi_noi_that: "Ta nhận hộ tống các chuyến hàng qua đèo hiểm chỉ mong tích đủ tiền lo cho đứa em nhỏ và tìm hiểu nguồn gốc chiếc vòng cổ cha để lại.",
    loi_noi_doi: "Đường đèo dạo này yên ả lắm." },
  { id: "A42", ten: "Khổng Triệu", vai: "Thợ rèn cả ở Biên Ngạn", nam_sinh: 122, nam_mat: 185, tai_noi: "don_bien_ngan", soi: "bien", tai_an_noi: 55, dang_noi_doi: false,
    loi_noi_that: "Ta thà rèn cuốc xẻng cho dân cày chứ nhất quyết không bán đao khắc ba chấm cho những kẻ muốn gây chiến trên núi Bạch Lĩnh.",
    loi_noi_doi: "Lò rèn của ta hết phôi thép tốt rồi." },
  { id: "A43", ten: "Ngô Cần", vai: "Nông dân Tam Giang · Cháu nội Ngô Tam", nam_sinh: 118, nam_mat: 180, tai_noi: "ruong_chu_ap", soi: "lua", tai_an_noi: 65, dang_noi_doi: true,
    loi_noi_that: "Dưới bàn thờ ông bà trong nhà ta có giấu danh sách các hộ bị siết thuế quá mức; các làng đang lặng lẽ góp gạo nấu chung nồi cháo lớn.",
    loi_noi_doi: "Dân Tam Giang chúng tôi chỉ biết cúi mặt cày ruộng nộp tô thôi." },
  { id: "A44", ten: "Mụ Bảy Ve", vai: "Bà đỡ & Y thuật dân gian Tam Giang", nam_sinh: 128, nam_mat: 195, tai_noi: "duong_lang", soi: "lua", tai_an_noi: 62, dang_noi_doi: true,
    loi_noi_that: "Trời mùa Giá lạnh độc lắm, lên rừng nhớ hái lấy nắm gừng gió hay thảo dược về đun nước uống. Ta đã đỡ đẻ cho cả con của kẻ thù nhà mình mà không nói nửa lời.",
    loi_noi_doi: "Ta chỉ là bà già quê mùa, chẳng biết chuyện đời xưa của các dòng họ đâu." },
  { id: "A45", ten: "Triệu Mặc Thành", vai: "Tu sĩ chép sách lưu động", nam_sinh: 112, nam_mat: 175, tai_noi: "duong_lang", soi: "hoa", tai_an_noi: 68, dang_noi_doi: true,
    loi_noi_that: "Trong bọc vải đeo bên người ta là bản chép thứ ba của cuốn Niên Ký cổ mà ta đã liều mạng cứu ra trước khi thư phòng bị đốt.",
    loi_noi_doi: "Trong bọc vải của ta chỉ là mấy quyển lịch mùa vụ thông thường." },
  { id: "A46", ten: "Sơn Nhĩ", vai: "Tộc trưởng Ô Khuyết chủ trương hòa giải", nam_sinh: 118, nam_mat: 190, tai_noi: "don_bien_ngan", soi: "bien", tai_an_noi: 70, dang_noi_doi: false,
    loi_noi_that: "Ta đã mở hộp đá dưới chân tổ núi và đọc lời thề năm xưa. Nếu có người mang nửa con dấu kia tới, bộ lạc ta sẵn sàng ngồi xuống nghị hòa.",
    loi_noi_doi: "Người miền núi không bao giờ tin lời hứa của người miền xuôi nữa." },
  { id: "A47", ten: "Lão Câm Sông", vai: "Người già ngủ gầm cầu bến Hạ Giang", nam_sinh: 110, nam_mat: 188, tai_noi: "cho_ben_say", soi: "lua", tai_an_noi: 40, dang_noi_doi: true,
    loi_noi_that: "Đêm mưa năm 136 chính mắt lão nhìn thấy viên quản kho ném chiếc chìa khóa đồng lớn xuống khúc sông cạn này...",
    loi_noi_doi: "(Lão chỉ lắc đầu xua tay ra chiều không nghe không biết gì cả)." },
  { id: "A48", ten: "Hoa Liên", vai: "Ca nương trà lâu Kinh Hoài", nam_sinh: 125, nam_mat: 190, tai_noi: "kinh_hoai", soi: "bac", tai_an_noi: 78, dang_noi_doi: true,
    loi_noi_that: "Khi rượu ngà ngà say, các vị chức sự và chủ thuyền thường buột miệng nhắc tới kỳ hạn năm 190. Ta chỉ im lặng rót trà để tích tiền chuộc thân.",
    loi_noi_doi: "Khách đến trà lâu chỉ bàn chuyện thơ phú trăng sao thôi." },

  // --- THẾ HỆ IV (Sinh năm 140 - 183 · Đương thời Năm Đáo Hạn) ---
  { id: "A49", ten: "Lâm Thụy Anh", vai: "Nữ Vương trẻ của Hoài Dương", nam_sinh: 150, nam_mat: 260, tai_noi: "kinh_hoai", soi: "ngai", tai_an_noi: 80, dang_noi_doi: false,
    loi_noi_that: "Ta không muốn trở thành vị vua cuối cùng phải ký giấy chia cắt vương quốc. Nếu ai tìm được bằng chứng cắt bỏ lãi chìm hoặc hòa giải biên ải, ta sẽ trọng thưởng!",
    loi_noi_doi: "Triều đình đã chuẩn bị đủ phương án cho kỳ tất toán sắp tới." },
  { id: "A50", ten: "Lâm Hạo", vai: "Vương đệ · Thân phái Tam Hỏa", nam_sinh: 156, nam_mat: 260, tai_noi: "kinh_hoai", soi: "ngai", tai_an_noi: 70, dang_noi_doi: true,
    loi_noi_that: "Ta tin rằng chỉ cần dựa vào sức mạnh kỷ luật của phái Tam Hỏa là có thể dẹp yên mọi cuộc nổi loạn ở đồng bằng.",
    loi_noi_doi: "Ta hoàn toàn ủng hộ mọi quyết sách ôn hòa của hoàng tỷ." },
  { id: "A51", ten: "Hạ Minh Tuệ", vai: "Nữ thư ký ngự tiền · Kinh Hoài", nam_sinh: 148, nam_mat: 260, tai_noi: "kinh_hoai", soi: "ngai", tai_an_noi: 75, dang_noi_doi: true,
    loi_noi_that: "Ta đã đọc cuốn sổ tay bí mật của cha để lại và biết rõ khoản thâm hụt thực sự trong Kho Thiên Lộc.",
    loi_noi_doi: "Sổ sách trình lên ngự tiền đều đã được kiểm tra không có sai sót." },
  { id: "A52", ten: "Đoàn Hải Quyên", vai: "Nữ Hội trưởng Đoàn Thuyền đương nhiệm", nam_sinh: 140, nam_mat: 260, tai_noi: "cho_ben_say", soi: "bac", tai_an_noi: 85, dang_noi_doi: true,
    loi_noi_that: "Chỉ cần qua năm 190 mà vương thất không trả đủ bạc, toàn bộ quyền thu thuế vùng đồng bằng Tam Giang sẽ chính thức thuộc về Đoàn Thuyền!",
    loi_noi_doi: "Chúng tôi luôn mong muốn gia hạn nợ êm đẹp để giúp vương quốc vượt khó." },
  { id: "A53", ten: "Điền Cẩm Tú", vai: "Kế toán trẻ · Cháu nội chủ muối Điền Hứa", nam_sinh: 150, nam_mat: 260, tai_noi: "kinh_hoai", soi: "bac", tai_an_noi: 75, dang_noi_doi: true,
    loi_noi_that: "Ta xin vào làm kế toán cho thương hội chỉ để tìm lại cuốn sổ muối của ông nội năm xưa và phơi bày cách tính lãi chìm bất hợp pháp!",
    loi_noi_doi: "Ta chỉ là người làm công ăn lương,cặm cụi cộng sổ mỗi ngày thôi." },
  { id: "A54", ten: "Khổng Thảo", vai: "Chủ lò rèn trẻ Biên Ngạn", nam_sinh: 160, nam_mat: 260, tai_noi: "don_bien_ngan", soi: "bien", tai_an_noi: 55, dang_noi_doi: true,
    loi_noi_that: "Muốn giữ mạng ở vùng biên này thì tay cầm đao phải chắc. Nếu ngươi đáng tin và chịu khó phụ kéo bễ rèn sắt, ta sẽ chỉ dạy đao pháp và ý nghĩa của ba chấm trên chuôi đao.",
    loi_noi_doi: "Mấy chấm nhỏ trên chuôi con dao này chỉ là vết mẻ tình cờ lúc đập búa thôi, chẳng có ý nghĩa gì đâu." },
  { id: "A55", ten: "Ngô Lúa", vai: "Cô gái dạy chữ làng Sậy Đỏ", nam_sinh: 165, nam_mat: 260, tai_noi: "duong_lang", soi: "lua", tai_an_noi: 65, dang_noi_doi: false,
    loi_noi_that: "Ta cố học lấy mặt chữ từ các tu sĩ để dạy lại cho bà con trong xóm, để không ai còn bị lừa ký vào những tờ phiếu thuế mập mờ nữa.",
    loi_noi_doi: "Ta chỉ vẽ vời mấy nét chữ trên đất cho đám trẻ con chơi thôi." },
  { id: "A56", ten: "Lục Chính Văn", vai: "Thủ thư trẻ · Nghiên cứu cổ văn", nam_sinh: 150, nam_mat: 260, tai_noi: "kinh_hoai", soi: "hoa", tai_an_noi: 72, dang_noi_doi: false,
    loi_noi_that: "Khi đối chiếu bản chép Niên Ký ở Cao Lăng với lời Bài Ca Hai Vợ ngoài quán rượu, ta nhận ra cả hai đều chỉ về cùng một hiệp ước bị che giấu!",
    loi_noi_doi: "Ta chỉ đang sắp xếp lại các tập thơ cổ trong thư phòng." },
  { id: "A57", ten: "Phạm Hổ", vai: "Đội trưởng tuần tiễu Đồn Biên Ngạn", nam_sinh: 155, nam_mat: 260, tai_noi: "don_bien_ngan", soi: "bien", tai_an_noi: 60, dang_noi_doi: false,
    loi_noi_that: "Lính tráng hai bên chiến tuyến đều là con nhà nghèo cả. Ta có một người bạn kết nghĩa bên phía bộ lạc Ô Khuyết, cả hai đều mong giữ được hòa khí.",
    loi_noi_doi: "Lính đồn Biên Ngạn luôn sẵn sàng xuất kích bất cứ lúc nào." },
  { id: "A58", ten: "Ô Khuyết Lạp Hà", vai: "Nữ sứ giả bộ lạc Ô Khuyết", nam_sinh: 162, nam_mat: 260, tai_noi: "quan_bon_nga", soi: "bien", tai_an_noi: 70, dang_noi_doi: false,
    loi_noi_that: "Ta học nói thông thạo tiếng Hoài Dương và ngồi ở Quán Bốn Ngả này để tìm người có đủ uy tín đưa thông điệp hòa giải lên kinh thành.",
    loi_noi_doi: "Ta chỉ là khách thương hồ đi mua trà và muối về miền núi." },
  { id: "A59", ten: "Mộc Tể", vai: "Thợ khắc dấu ở Kinh Hoài · Chắt Mộc Phát", nam_sinh: 145, nam_mat: 260, tai_noi: "cho_ben_say", soi: "bac", tai_an_noi: 68, dang_noi_doi: true,
    loi_noi_that: "Vừa nhìn vết chạm trên nửa con dấu ngọc cũ là ta nhận ra ngay mũi dao khắc của ông cố nội mình từ hai trăm năm trước!",
    loi_noi_doi: "Ta chỉ khắc con dấu gỗ thông thường cho các sạp hàng ngoài chợ." },
  { id: "A60", ten: "Bé Sậy", vai: "Đứa trẻ mồ côi bên bến sông Hạ Giang", nam_sinh: 183, nam_mat: 260, tai_noi: "quan_bon_nga", soi: "lua", tai_an_noi: 45, dang_noi_doi: false,
    loi_noi_that: "Hôm trước mò ốc dưới bãi bùn cạn bên sông, cháu nhặt được một chiếc chìa khóa đồng nặng trịch có khắc hình bông lúa!",
    loi_noi_doi: "Trong túi cháu chỉ có mấy viên sỏi cuội thôi." }
];

// =========================================================================
// 4. BỘ ĐỒNG BỘ NPC SỐNG THEO NĂM LỊCH SỬ & VẬT LƯU TRUYỀN (TỰ ĐỘNG NỐI VÀO GAME)
// =========================================================================
function syncLivingCanonNPCs(currentYear) {
  if (typeof NPCS_DB === "undefined") return;
  const yr = currentYear || (window.state ? window.state.year : 45);

  // Lọc các nhân vật tầng A đang sống và đã đủ tuổi giao tiếp (từ 7 tuổi trở lên) tại năm hiện tại
  const livingA = TIER_A_CANON_DB.filter(a => (yr >= a.nam_sinh + 7) && (yr <= a.nam_mat));

  // Luôn giữ lại các NPC chức năng cốt lõi (Trưởng làng hòa giải, Bà đỡ, Quản trang, Chủ cầm đồ, Chủ quán, Thợ rèn, Thẩm vấn viên)
  // nhưng cập nhật tên, tuổi và lời thoại đúng với nhân vật tầng A đương thời!
  NPCS_DB.length = 0;

  livingA.forEach(a => {
    const ageNow = yr - a.nam_sinh;
    // Kiểm tra xem nhân vật A này có đang giữ Vật lưu truyền nào trong năm hiện tại không
    const heldRelics = HEIRLOOM_RELICS_DB.filter(v =>
      v.chuyen_tay.some(ct => ct.giu_boi === a.id && yr >= ct.minY && yr <= ct.maxY)
    );
    const relicHint = heldRelics.length > 0
      ? (" (Đang cất giữ: " + heldRelics.map(r => r.ten_hien_thi).join(", ") + ")")
      : "";

    NPCS_DB.push({
      id: a.id,
      ten: a.ten + " (" + ageNow + " tuổi)",
      vai: a.vai,
      tai_noi: a.tai_noi,
      tai_an_noi: a.tai_an_noi,
      than_thien_goc: a.soi === "lua" ? 15 : 5,
      belief: a.loi_noi_that,
      loi_noi_that: a.loi_noi_that + relicHint,
      loi_noi_doi: a.loi_noi_doi,
      dang_noi_doi: a.dang_noi_doi,
      co_the_hoa_giai_feud: a.tai_noi === "duong_lang" && a.soi === "lua",
      co_the_tong_tien: a.dang_noi_doi && (a.soi === "bac" || a.soi === "ngai" || a.soi === "hoa")
    });

    if (window.state && window.state.npcRelations && !window.state.npcRelations[a.id]) {
      window.state.npcRelations[a.id] = {
        than_thien: a.soi === "lua" ? 15 : 5,
        feud_bac: 0,
        dong_loa: false
      };
    }
  });

  // Đảm bảo luôn có ít nhất 1 trưởng lão tại Đường làng có thể hòa giải mối thù nếu năm đó vắng nhân vật Lúa
  if (!NPCS_DB.some(n => n.co_the_hoa_giai_feud)) {
    const backupId = "ELDER_SAY_DO";
    NPCS_DB.push({
      id: backupId,
      ten: "Trưởng lão Làng Sậy Đỏ",
      vai: "Người phân xử việc làng",
      tai_noi: "duong_lang",
      tai_an_noi: 55,
      than_thien_goc: 15,
      belief: "Đùm bọc nhau qua mùa Giá là cách duy nhất để giữ làng.",
      loi_noi_that: "Kỳ thu thuế mùa này rơi vào ngày 13 đến 15, nhớ cất kỹ thóc lành xuống hố gầm phản.",
      loi_noi_doi: "Năm nay thuế má nhẹ nhàng lắm.",
      dang_noi_doi: false,
      co_the_hoa_giai_feud: true,
      co_the_tong_tien: false
    });
    if (window.state && window.state.npcRelations && !window.state.npcRelations[backupId]) {
      window.state.npcRelations[backupId] = { than_thien: 15, feud_bac: 0, dong_loa: false };
    }
  }
}

// Bổ sung 10 Dấu vết (D1-D10) vào kho lời đồn AMBIENT_WHISPERS (Mục 54.2)
if (typeof AMBIENT_WHISPERS !== "undefined") {
  STORY_TRACES_DB.forEach(tr => {
    if (!AMBIENT_WHISPERS.includes(tr.mo_ta)) {
      AMBIENT_WHISPERS.push(tr.mo_ta);
    }
  });
}

// Tự động đồng bộ danh sách NPC sống mỗi khi vẽ lại giao diện theo năm hiện tại
if (typeof render === "function") {
  const prevRenderCanon = render;
  render = function() {
    if (window.state && window.state.year !== undefined) {
      syncLivingCanonNPCs(window.state.year);
    }
    prevRenderCanon();
  };
}
