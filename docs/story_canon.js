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
// =========================================================================
// 5. TRỌN BỘ 120 KIỂU ĐỜI TẦNG C (K001 - K120) & NGÂN HÀNG 6 ĐIỂM NGẮT 3 HỒI (MỤC 54.4 & 54.6)
// Đinh dạng nén: [Mã, Tên kiểu đời, Mã giai cấp, Sợi dây, Vị trí khởi đầu, Mong -> Sợ, Nợ/Lời hứa, Bí mật nhỏ, Cánh cửa, Cờ đặc biệt]
// Mã giai cấp: nn (nông nô), nd (nông dân), nl (ngoài lề), tc (thợ thủ công), tn (thương nhân/thị dân), gs (giáo sĩ), tq (tiểu quý tộc/Kiếm Điền), dq (hoàng tộc/đại quý tộc)
// =========================================================================
const RAW_120_ARCHETYPES = [
  // ==================== SỢI LÚA (K001 - K024) ====================
  ["K001", "Đứa trẻ nông nô sinh giữa mùa gầy", "nn", "lua", "nha", "một bữa no → bị bán khỏi làng", "mẹ nợ chủ ruộng nửa vụ lúa", "giấu nắm hạt giống trong tã", "D1", "baby"],
  ["K002", "Nông nô gắn ruộng Tam Giang", "nn", "lua", "nha", "con có mảnh ruộng riêng → đổi chủ", "thề với vợ không bỏ trốn", "từng bỏ trốn một đêm rồi quay lại", "D1", "axe"],
  ["K003", "Tá điền nợ địa tô", "nd", "lua", "ruong_chu_ap", "trả hết tô trước mùa Giá → bị đuổi khỏi ruộng", "nợ chủ ruộng một vụ thóc", "giấu ba bao lúa dưới nền nhà", "D1", ""],
  ["K004", "Tiểu nông Đông Cốc", "nd", "lua", "ruong_chu_ap", "giữ ruộng cho con → sâu bệnh mất mùa", "hứa gả con cho họ hàng", "thửa ruộng thực ra là của anh trai đã mất", "D6", ""],
  ["K005", "Con cả gánh các em", "nn", "lua", "nha", "nuôi các em khôn lớn → mẹ ốm nặng", "lời hứa với cha lúc hấp hối", "từng trộm khoai nhà hàng xóm cứu đói", "D4", "youth"],
  ["K006", "Phu kho Thiên Lộc", "nd", "lua", "kinh_hoai", "cho con học chữ → mất việc ở kho", "nợ quản kho một ân huệ", "đã thấy bao lúa mốc trong kho mà im lặng", "D6", ""],
  ["K007", "Thợ xay lúa làng", "tc", "lua", "duong_lang", "không bị chủ thầu ép giá → hạn hán", "cầm cối xay cho chủ nợ", "biết rõ ai lấy bớt bột của ai trong làng", "D1", ""],
  ["K008", "Người chăn bò Cao Nguyên Sương", "nd", "lua", "bia_rung", "đàn gia súc không bị sói vồ → mất đàn", "mượn bò giống của họ hàng", "làm chết một con bê vì ngủ quên", "D8", ""],
  ["K009", "Ngư dân Hải Đường", "nd", "lua", "cho_ben_say", "mẻ cá đầy khoang → bão biển", "nợ tiền lưới của chủ thuyền", "bán cá lậu thuế cho thuyền lạ ngoài bến", "D5", ""],
  ["K010", "Thợ làm muối Đồi Muối", "tc", "lua", "cho_ben_say", "tiền công đủ ăn → chủ muối phá sản", "nợ tiền ứng trước", "biết sổ muối chép hai bản lãi khác nhau", "D5", ""],
  ["K011", "Bà đỡ làng", "nd", "lua", "duong_lang", "không mất đứa trẻ nào → bị đồn là điềm xấu", "lời hứa với bà thầy truyền nghề", "biết cha thật của vài đứa trẻ trong vùng", "D4", ""],
  ["K012", "Trưởng làng", "nd", "lua", "duong_lang", "làng đủ ăn qua đông → bị quan quở trách", "nợ dân làng một vụ cứu đói", "khai thiếu sản lượng thóc để giảm thuế cho dân", "D1", "elder"],
  ["K013", "Người nhặt rác bờ sông Hạ Giang", "nl", "lua", "cho_ben_say", "một chỗ ngủ ấm → bị xua đuổi", "nợ quán trọ một bữa ăn", "nhặt được vật kim loại lạ dưới bùn chưa dám bán", "V1", ""],
  ["K014", "Trẻ mồ côi sau mùa đói", "nl", "lua", "quan_bon_nga", "có người nhận nuôi → đói rét", "lời hứa của người đỡ đầu", "nhớ rõ mặt kẻ đã bỏ rơi mình", "D4", "child"],
  ["K015", "Người trồng dâu nuôi tằm Vĩ Thủy", "nn", "lua", "ruong_chu_ap", "tơ tằm được giá → mưa ẩm hỏng kén", "nợ hội phường bán tơ", "nuôi tằm trộm trong góc chuồng gà", "D1", ""],
  ["K016", "Người gánh nước thuê khập khiễng (KK)", "nl", "lua", "duong_lang", "đủ tiền thuê góc nhà → bị bắt đi lao dịch", "hứa với bà chủ trọ", "giấu cái chân thành tật từ thuở nhỏ", "D4", "kk_leg"],
  ["K017", "Nông nô bỏ ruộng lên thị trấn", "nn", "lua", "cho_ben_say", "kiếm được việc làm → bị bắt giải về ấp", "cha mẹ già còn ở lại quê", "đang trốn khoản thuế Khế tồn đọng", "D1", ""],
  ["K018", "Lão nông nuôi cháu mồ côi", "nn", "lua", "nha", "nhìn cháu khôn lớn → mình nhắm mắt trước", "lời hứa với người con trai đã khuất", "chôn con ở gò đất không dám dựng bia", "D4", "elder"],
  ["K019", "Người chở lúa thuê trên sông", "tc", "lua", "cho_ben_say", "chuyến đò chở đầy → thuyền mắc cạn", "nợ tiền thuê thuyền", "biết số lúa lên bến Hạ Giang ít hơn trên sổ", "D6", ""],
  ["K020", "Cô gái Tam Giang học chữ nhờ tu sĩ", "nd", "lua", "duong_lang", "đọc thông phiếu thuế → bị tuần đinh nghi ngờ", "nợ ân tình một tu sĩ dạy chữ", "lén chép lại danh sách người nợ thuế trong xóm", "D10", "lit"],
  ["K021", "Thợ gặt thuê đi theo mùa", "nd", "lua", "ruong_chu_ap", "tiền công đủ qua mùa đông → bị chủ ruộng giữ chân", "nợ tiền trọ đầu mùa", "từng bị một chủ ruộng giàu quỵt cả tháng công", "D4", ""],
  ["K022", "Chủ ấp nhỏ sợ nông nô bỏ trốn", "tq", "lua", "ruong_chu_ap", "giữ đủ người cày ruộng → bị chủ nợ siết đất", "cầm cố đất cho giáo đường", "lén che giấu nông nô chạy trốn từ ấp khác tới", "D1", "lit"],
  ["K023", "Thanh tra lương vùng", "tq", "lua", "kinh_hoai", "thanh tra đúng sự thật → bị cấp trên ép ký khống", "nợ quan trên một ân huệ cất nhắc", "luôn ghi hai bản số liệu thực và khống", "D6", "lit"],
  ["K024", "Người nấu cháo công", "nn", "lua", "duong_lang", "ai xếp hàng cũng có phần → cạn sạch bồ gạo", "lời hứa với vị Cha Đường", "lén lấy gạo nhà mình bỏ thêm vào nồi cháo công", "D4", ""],

  // ==================== SỢI NGAI (K025 - K048) ====================
  ["K025", "Con thứ của Chủ Ấp", "tq", "ngai", "kinh_hoai", "được chia mảnh đất riêng → bị gửi vào giáo đường", "hứa với mẹ không tranh giành với anh cả", "thích nghề rèn thủ công hơn lễ nghi quý tộc", "D7", "lit"],
  ["K026", "Chủ Ấp nhỏ nợ thuế Khế", "tq", "ngai", "ruong_chu_ap", "giữ được đất tổ phụ → mất ấp vào tay chủ nợ", "đang cầm cố ruộng tốt", "từng lén khắc giả một con dấu biên nhận thuế", "D1", "lit"],
  ["K027", "Kiếm Điền già hết sức", "tq", "ngai", "don_bien_ngan", "tuổi già yên ổn → ruộng cấp bị thu hồi", "nợ đồng đội cũ một mạng sống", "giấu vết sẹo dài từ trận đánh đầu đời", "D9", "elder"],
  ["K028", "Con gái Chủ Ấp có hôn ước chính trị (từ 18 tuổi)", "tq", "ngai", "kinh_hoai", "tự chọn người thương → bị gả trừ nợ", "tờ hôn ước gia tộc định sẵn", "biết đọc chữ và xem sổ sách lén", "D1", "18plus_lit"],
  ["K029", "Cung nữ hầu Vương hậu", "tc", "ngai", "kinh_hoai", "được xuất cung về quê → biết quá nhiều chuyện mật", "lời thề giữ kín việc trong cung", "từng nghe hát trọn vẹn khúc ca miền núi trong nội điện", "D2", ""],
  ["K030", "Thị vệ cổng cung", "tq", "ngai", "kinh_hoai", "được thăng chức đội trưởng → bị nghi ngờ", "nợ đội trưởng tiền bảo lãnh", "thấy rõ những ai lén ra vào cung lúc nửa đêm", "D6", ""],
  ["K031", "Người hầu bàn tiệc quan lớn", "tc", "ngai", "kinh_hoai", "nhận tiền thưởng hậu hĩnh → lỡ tay làm đổ rượu", "nợ tiền chuộc của chủ nhà", "nghe lỏm được cuộc bàn bạc về món nợ quốc gia", "D5", ""],
  ["K032", "Tri Ấp thu thuế Khế", "tq", "ngai", "kinh_hoai", "thu đủ định mức → dân chúng làm loạn", "nợ ân tình tiến cử của cấp trên", "tự bỏ tiền túi bù vào phần thuế thiếu của dân nghèo", "D1", "lit"],
  ["K033", "Thư lại giữ hộ tịch", "tq", "ngai", "kinh_hoai", "giữ sổ sách sạch sẽ → bị ép xóa tên người", "nợ một ân huệ của Chủ Ấp", "lén chép lại tên một dòng họ mà người trên muốn xóa", "D6", "lit"],
  ["K034", "Con trai quan nhỏ học trường chữ", "tq", "ngai", "kinh_hoai", "thi đỗ chức sự → thua kém con nhà quyền quý", "lời hứa nối nghiệp cha", "đọc trộm sách chép tay bị cấm trong thư viện", "D10", "lit"],
  ["K035", "Quý tộc sa sút bán đồ cũ", "tq", "ngai", "cho_ben_say", "giữ lại thể diện gia phong → cạn sạch đồng xu cuối", "nợ tiền lãi tiệm cầm đồ", "còn giấu một món bảo vật gia truyền chưa đành lòng bán", "V2", "lit"],
  ["K036", "Người chép thuê cho quan, mắt mờ dần (KK)", "tc", "ngai", "kinh_hoai", "nét chữ ngay ngắn → đôi mắt mù dần", "nợ ơn người thầy dạy chữ", "mỗi văn kiện quan trọng đều chép hai bản, giữ lại một", "D10", "kk_eye"],
  ["K037", "Người đưa thư triều đình", "nd", "ngai", "quan_bon_nga", "giao thư đúng hạn → bị chặn cướp giữa đèo", "lời thề không mở niêm phong", "đã lén đọc một bức mật thư gửi lên biên ải", "D5", ""],
  ["K038", "Tay sai thu thuế đeo dấu ba bên", "tn", "ngai", "cho_ben_say", "thu đủ chỉ tiêu lãnh thưởng → bị dân làng căm ghét", "nợ tiền bảo lãnh của chủ Bang Hàng", "nhận ra hình khắc kỳ lạ trên tờ khế gốc", "D1", ""],
  ["K039", "Hoàng tộc xa", "dq", "ngai", "kinh_hoai", "giữ yên vị thế → bị cuốn vào tranh đoạt ngôi vị", "lời dặn của bậc trưởng bối", "cất giữ một mảnh ngọc bội không rõ nguồn gốc", "D2", "lit"],
  ["K040", "Người nuôi ngựa trong cung", "tc", "ngai", "kinh_hoai", "đàn ngựa khỏe mạnh → bị đổ vạ khi ngựa ốm", "nợ tiền trưởng chuồng ngựa", "biết rõ con ngựa tốt nào từng được lén đưa ra biên giới", "D9", ""],
  ["K041", "Thanh tra thuế trẻ", "tq", "ngai", "kinh_hoai", "làm đúng chức trách → bị điều đi vùng xa", "nợ ân tình người thầy cũ", "phát hiện số bạc thuế nộp về không khớp với sổ thu", "D1", "lit"],
  ["K042", "Người xử kiện làng", "tq", "ngai", "duong_lang", "phân xử công tâm → bị Chủ Ấp gây sức ép", "lời thề trước dân làng", "từng xử ép một vụ tranh đất và day dứt mãi", "D6", "lit"],
  ["K043", "Lính canh kho thuế", "tq", "ngai", "kinh_hoai", "nhận đủ lương tháng → bị đổi ca đêm mùa Giá", "nợ tiền đội trưởng", "biết rõ các rương thuế trong kho đã vơi đi một nửa", "D6", ""],
  ["K044", "Quý tộc họ Hà cũ", "tq", "ngai", "duong_lang", "khôi phục thanh danh gia tộc → bị dò xét", "lời thề trước bàn thờ tổ tiên", "giấu một bức thư tay của vị vương hậu họ Hà năm xưa", "D2", "lit"],
  ["K045", "Chủ ấp Rừng Đen săn bắn", "tq", "ngai", "bia_rung", "giữ vùng rừng yên tĩnh → triều đình đòi tăng thuế", "nợ tiền lễ Hỏa Đường", "lén cho người săn bắn trong khu rừng cấm của vua", "D1", "lit"],
  ["K046", "Gián điệp nhỏ cho một Chủ Ấp", "tn", "ngai", "quan_bon_nga", "săn được tin đắt giá → bị lộ thân phận", "nợ mạng người bảo trợ", "lén bán tin tức cho cả hai phe để tự vệ", "D5", ""],
  ["K047", "Tù nhân ngục Kinh Hoài", "nl", "ngai", "kinh_hoai", "được ân xá ra tù → bỏ mạng trong ngục lạnh", "lời hứa nhắn tin cho bạn tù", "nghe được cái tên thật của một nhân vật lớn trong cung", "D6", ""],
  ["K048", "Kiểm kê quân lương", "tq", "ngai", "don_bien_ngan", "sổ sách đủ số → phát hiện lương thảo thiếu hụt", "nợ ân tình vị tướng biên", "buộc phải ghi lệch con số để giữ yên quân tâm", "D6", "lit"],

  // ==================== SỢI HỎA (K049 - K072) ====================
  ["K049", "Đứa trẻ được dâng vào Hỏa Đường", "gs", "hoa", "duong_lang", "được học chữ nghĩa → mất tự do suốt đời", "cha mẹ nợ thuế thập phân", "trong lòng không hề muốn làm tu sĩ", "D7", "youth_lit"],
  ["K050", "Tu sĩ chép sách trẻ", "gs", "hoa", "duong_lang", "giữ cho sách cổ sống sót → sách bị đem đốt", "lời hứa với vị thầy già", "lén chép riêng một bản Niên Ký cất giấu", "V4", "lit"],
  ["K051", "Cha Đường làng nghèo", "gs", "hoa", "duong_lang", "nồi cháo công đủ chia cho làng → bị đòi nộp thập phân", "nợ tổng đường khoản lễ năm", "lấy phần lương thảo của chính mình bỏ thêm vào nồi cháo", "D4", "lit"],
  ["K052", "Nữ tu y sĩ", "gs", "hoa", "duong_lang", "cứu sống người bệnh → bị Soi Lửa chất vấn", "nợ ơn nữ tu truyền nghề", "lén dùng bài thuốc dân gian nằm ngoài sách giáo luật", "D4", "lit"],
  ["K053", "Soi Lửa tập sự", "gs", "hoa", "kinh_hoai", "được thăng bậc thẩm vấn → ám ảnh mùi khói lửa", "lời hứa tuân phục sư phụ", "chưa từng dám nhìn thẳng vào mắt người bị xét hỏi", "D7", "lit"],
  ["K054", "Người học chữ muộn, trí nhớ kém (KK)", "nd", "hoa", "duong_lang", "tự viết nổi tên mình → bị người đời chê cười", "nợ tiền dầu đèn của thầy dạy", "phải ghi nhớ mặt chữ bằng các hình vẽ ký hiệu riêng", "D10", "kk_mem"],
  ["K055", "Giảng sư Nhất Hỏa lưu động", "gs", "hoa", "duong_lang", "mọi ngôi làng đều có cháo ấm → bị bắt vì dị giáo", "lời thề với huynh đệ đồng môn", "đã từng hoài nghi các điều khoản thu thập phân", "D4", "lit"],
  ["K056", "Cha Đường thu thập phân", "gs", "hoa", "duong_lang", "thu đủ định mức nộp lên → bị dân làng oán hận", "nợ ân cất nhắc của giáo chủ", "lén giữ lại một phần thóc thập phân chia cho hộ đói", "D1", "lit"],
  ["K057", "Người giữ đèn thánh đường", "gs", "hoa", "duong_lang", "ngọn Sinh Hỏa không bao giờ tắt → cháy lan màn trướng", "lời thề với Đường chủ đầu tiên", "biết rõ bên dưới chân đèn đá lớn có hốc giấu đồ", "V4", ""],
  ["K058", "Thợ đóng sách, làm giấy", "tc", "hoa", "kinh_hoai", "làm ra mẻ giấy bền đẹp → thiếu vỏ cây nguyên liệu", "nợ vốn chủ xưởng giấy", "cất giấu những mảnh giấy vụn có ghi các dòng chữ cấm", "D10", ""],
  ["K059", "Dân thường hay cầu bình an", "nd", "hoa", "duong_lang", "con cái khỏe mạnh → mất mùa đói kém", "còn nợ lễ vật tạ ơn thánh đường", "tin rằng mọi tai ương đều có điềm báo từ trước", "D7", ""],
  ["K060", "Người được cứu nhờ cháo công", "nd", "hoa", "duong_lang", "báo đáp ơn cứu mạng → bị gọi đi phu dịch", "lời hứa phụ việc cho Cha Đường", "thuở đói lòng từng lén múc trộm thêm một bát cháo", "D4", ""],
  ["K061", "Người bị Soi Lửa hỏi rồi thả", "nd", "hoa", "kinh_hoai", "sống yên ổn phần đời còn lại → bị triệu tập lần nữa", "lời thề tuyệt đối giữ im lặng", "trong lúc hoảng loạn đã lỡ khai tên một người bạn", "D7", ""],
  ["K062", "Thầy lang dân gian", "nd", "hoa", "duong_lang", "chữa lành bệnh cho dân → bị vu cáo làm tà thuật", "lời hứa cứu người với bệnh nhân cũ", "từng bốc nhầm vị thuốc làm một ca bệnh trở nặng", "D4", ""],
  ["K063", "Thầy giáo trường chữ làng", "gs", "hoa", "duong_lang", "học trò nghèo biết đọc chữ → thiếu giấy bút", "nợ kinh phí của Hỏa Đường", "lén dạy học trò đọc hiểu cả các văn tự khế ước", "D10", "lit"],
  ["K064", "Người sống sót qua dịch Ho Sương, phổi yếu (KK)", "nd", "hoa", "nha", "qua được mùa đông lạnh → nhớ lại cảnh dịch bệnh", "nợ mạng người đã chăm sóc mình", "vẫn cất mảnh vải trắng treo cửa năm dịch bệnh", "D4", "kk_lung"],
  ["K065", "Người chôn cất thuê", "nl", "hoa", "duong_lang", "đủ tiền đong gạo → bị người làng xa lánh", "lời hứa đắp mộ tử tế cho người khuất", "đào trúng một món đồ cổ trong ngôi mộ vô danh", "D4", ""],
  ["K066", "Người hát kinh thuê", "nd", "hoa", "duong_lang", "nhận đủ tiền công lễ → khản đặc mất giọng", "nợ tiền chủ đám lễ", "thuộc lòng cả những khúc ca thế tục bị cấm hát", "D2", ""],
  ["K067", "Học trò trẻ Cao Lăng", "tn", "hoa", "kinh_hoai", "hoàn thành việc học → cạn sạch tiền trọ", "nợ học phí của thầy", "lén gửi thư chép lại các tư liệu hiếm về quê", "V4", "lit"],
  ["K068", "Người bán sách giả", "nl", "hoa", "cho_ben_say", "kiếm đủ tiền qua ngày → bị Soi Lửa bắt quả tang", "nợ tiền giấy của chủ lò in", "thực ra thuộc lòng từng chữ của một bản sách thật", "D10", "lit"],
  ["K069", "Viện trưởng tu viện Tây Lĩnh", "gs", "hoa", "duong_lang", "giữ vườn thuốc tu viện bình yên → bị lửa thiêu", "lời hứa với vị viện trưởng tiền nhiệm", "đang lén che giấu một giảng sư phái Nhất Hỏa", "V4", "lit"],
  ["K070", "Quản tài sản thập phân", "gs", "hoa", "kinh_hoai", "sổ sách khớp từng đấu thóc → kho thập phân thiếu hụt", "nợ ơn cất nhắc của giáo chủ", "đã sửa lại con số để che giấu phần thóc bị mốc", "D6", "lit"],
  ["K071", "Người dịch chữ cổ", "gs", "hoa", "kinh_hoai", "dịch trọn vẹn văn bản cổ → bị cấm công bố", "nợ ân tình người thầy truyền chữ", "đọc hiểu được những dòng ghi chú cổ trên Niên Ký", "V4", "lit"],
  ["K072", "Người tu khổ hạnh ngoài lề", "nl", "hoa", "bia_rung", "tâm trí tĩnh lặng → cơn đói hành hạ", "lời nguyện giữ im lặng", "trước khi đi tu từng là một người lính biên ải", "D4", ""],

  // ==================== SỢI BIÊN (K073 - K096) ====================
  ["K073", "Lính nghĩa vụ trẻ bị gom", "nd", "bien", "don_bien_ngan", "sống sót trở về quê → bỏ mạng nơi chiến trường", "lời hứa trở về với mẹ già", "cầm giáo đứng gác nhưng chưa từng muốn giết ai", "D9", ""],
  ["K074", "Thợ rèn học việc Biên Ngạn", "tc", "bien", "don_bien_ngan", "rèn thạo nghề sắt → thầy dạy khắc nghiệt", "nợ ba năm công học việc", "lén tự rèn một thanh đoản đao ngoài giờ", "D3", "axe"],
  ["K075", "Người dẫn đường qua núi", "nd", "bien", "bia_rung", "kiếm đủ tiền nuôi thân → lạc giữa bão tuyết", "nợ mạng người dẫn đường đi trước", "từng lén dẫn đường cho một thương khách Ô Khuyết", "D8", ""],
  ["K076", "Người buôn lậu muối và sắt qua biên", "tn", "bien", "don_bien_ngan", "chuyến hàng lãi lớn → bị tuần biên bắt giữ", "nợ vốn của chủ hàng lớn", "quen biết và làm ăn với cả hai bên chiến tuyến", "D9", ""],
  ["K077", "Lính đánh thuê già", "nl", "bien", "don_bien_ngan", "kiếm khoản tiền dưỡng già cuối → không ai còn thuê", "nợ mạng người đồng đội cũ", "luôn đeo chiếc vòng cổ kỷ vật của người cha", "D9", "elder"],
  ["K078", "Dân tị nạn Tây Lĩnh", "nd", "bien", "duong_lang", "dựng lại mái nhà mới → bị xua đuổi", "lời hứa tìm lại người thân thất lạc", "mang theo bức thư cũ của tổ tiên trong bọc áo", "D7", ""],
  ["K079", "Người Ô Khuyết bán len ở chợ biên", "nd", "bien", "cho_ben_say", "bán được giá tốt → bị cướp sạch hàng", "nợ hàng của trưởng trại", "thuộc một khổ hát cổ mà người miền xuôi không biết", "D2", ""],
  ["K080", "Người đưa thư biên giới", "nd", "bien", "don_bien_ngan", "chuyển thư an toàn → bị phục kích giữa đèo", "lời thề không để mất thư", "đã vô tình đọc được thư hòa giải của một sứ giả", "D8", ""],
  ["K081", "Chủ đồn nhỏ", "tq", "bien", "don_bien_ngan", "giữ vững đồn biên → quân lương gửi lên bị cắt xén", "nợ ân tình của tướng chỉ huy", "đang cưu mang vợ con của những người lính đã tử trận", "D9", ""],
  ["K082", "Mụ thuốc doanh trại", "nd", "bien", "don_bien_ngan", "cứu sống thương binh → cạn kiệt thảo dược", "nợ tiền thuốc của thầy lang", "lén mua lá thuốc từ người miền núi bên kia biên giới", "D9", ""],
  ["K083", "Góa phụ lính", "nd", "bien", "nha", "nuôi con khôn lớn → bị cắt phần trợ cấp tử sĩ", "lời hứa với người chồng trước ngày ra trận", "cất giữ thanh đoản đao khắc ba chấm của chồng", "D3", ""],
  ["K084", "Đứa trẻ lớn lên trong doanh trại", "nd", "bien", "don_bien_ngan", "tìm được tung tích cha → chiến sự nổ ra", "lời dặn của mẹ", "thuộc lòng mọi ngóc ngách và lối thoát quanh đồn", "D9", "child"],
  ["K085", "Người Ô Khuyết rời bộ lạc", "nd", "bien", "quan_bon_nga", "sống tự do nơi đất mới → bị người xung quanh dè bỉu", "món nợ ân tình với bộ lạc cũ", "giữ một mảnh đá khắc lời thề tổ núi", "D8", ""],
  ["K086", "Người chăm ngựa chiến", "tc", "bien", "don_bien_ngan", "ngựa chiến sung sức → quân đội thua trận", "nợ tiền chủ trại ngựa", "thương quý một con ngựa già như người thân", "D9", ""],
  ["K087", "Thợ mỏ thăm dò Bạch Lĩnh", "tc", "bien", "don_bien_ngan", "tìm ra mạch sắt lớn → sập hầm mỏ", "nợ tiền ứng của chủ thầu", "lén giấu một mẩu quặng bạc nguyên chất trong túi", "D9", "axe"],
  ["K088", "Kẻ đào ngũ", "nl", "bien", "bia_rung", "trốn thoát về miền xuôi → bị đội truy bắt nhận mặt", "nợ mạng người bạn đồng ngũ", "vẫn còn giấu tấm thẻ bài quân ngũ dưới đáy túi", "D9", ""],
  ["K089", "Người nấu ăn doanh trại", "nd", "bien", "don_bien_ngan", "nấu đủ cơm cho lính → lương thực bị ẩm mốc", "nợ tiền của quản bếp", "lén san sẻ cơm cháy cuối nồi cho đám trẻ tị nạn", "D4", ""],
  ["K090", "Thợ rèn Cao Lăng bán dao", "tc", "bien", "don_bien_ngan", "khách mua nông cụ đông → chiến tranh làm đứt đường sắt", "nợ tiền than của chủ xưởng", "nhận ra dấu ba chấm trên thanh đao của một khách lạ", "D3", "axe"],
  ["K091", "Người đọc chữ trên bia biên", "nd", "bien", "don_bien_ngan", "hiểu rõ lịch sử vùng biên → bị quan trấn thủ nghi kỵ", "nợ ơn dạy chữ của một tu sĩ", "đọc được tên vị vương hậu đầu tiên khắc trên bia đá cũ", "V2", "lit"],
  ["K092", "Thợ săn Rừng Đen điếc một tai (KK)", "nd", "bien", "bia_rung", "săn được nhiều thú → phạm vào luật rừng của Chủ Ấp", "nợ phần da thú nộp tô", "biết lối vào một hang đá cổ giáp sườn núi Bạch Lĩnh", "D8", "kk_ear"],
  ["K093", "Kẻ cướp đường núi", "nl", "bien", "bia_rung", "kiếm đủ ăn qua mùa tuyết → bị lính biên truy quét", "nợ máu với gã đầu đảng", "trước khi bị dồn vào bước đường cùng vốn là nông dân hiền lành", "D1", "axe"],
  ["K094", "Người lái xe lương quân", "nd", "bien", "don_bien_ngan", "chở lương tới đồn an toàn → bị quy tội hao hụt", "nợ tiền thế chân cho quản kho", "thấy rõ số bao thóc chất lên xe ít hơn con số ghi trong lệnh", "D6", ""],
  ["K095", "Cô gái gả qua biên giới (từ 18 tuổi)", "nd", "bien", "don_bien_ngan", "giữ hòa khí hai nhà → bị coi như con tin", "hôn ước hòa hiếu vùng biên", "nói thông thạo cả tiếng Hoài Dương lẫn tiếng miền núi", "D8", "18plus"],
  ["K096", "Người giữ trạm lửa hiệu", "tq", "bien", "don_bien_ngan", "báo tin kịp thời → khói mù làm báo nhầm hiệu lệnh", "nợ ơn cất nhắc của trưởng đồn", "từng một lần châm lửa trễ nửa khắc vì ngủ gật", "D9", ""],

  // ==================== SỢI BẠC (K097 - K120) ====================
  ["K097", "Học trò thợ dệt Vĩ Thủy", "tc", "bac", "cho_ben_say", "lên bậc thợ cả → xưởng dệt đóng cửa vì thuế", "nợ tiền học nghề của thầy", "cất giấu một mẫu hoa văn dệt tơ của riêng mình", "D5", ""],
  ["K098", "Thợ cả Hội Phường", "tc", "bac", "cho_ben_say", "giữ giá tiền công cho thợ → bị thương hội ép giá", "nợ quỹ chung của Hội Phường", "từng đứng đầu cuộc bãi công đòi quyền lợi năm trước", "D5", ""],
  ["K099", "Chủ quán rượu thị trấn", "tn", "bac", "quan_bon_nga", "quán xá đông khách → bị lính tuần trấn lột", "nợ tiền thuê đất mở quán", "biết rõ tin đồn nào là thật, tin đồn nào do ai tung ra", "D5", ""],
  ["K100", "Chủ tiệm cầm đồ nhỏ", "tn", "bac", "cho_ben_say", "khấm khá mà không bị thanh tra → đồ cầm bị đòi lại", "nợ vốn người cho vay lớn", "giữ riêng một món cổ vật nhạy cảm không dám bày bán", "V3", "lit"],
  ["K101", "Tiểu thương rong", "tn", "bac", "cho_ben_say", "bán sạch gánh hàng → bị cướp dọc đường quê", "nợ tiền lấy hàng sỉ", "thường đi đường vòng để né trạm thu thuế chợ", "D5", ""],
  ["K102", "Kế toán thuê cho thương nhân", "tn", "bac", "kinh_hoai", "sổ sách cân đối → bị ông chủ ép sửa số liệu", "nợ tiền bảo lãnh của chủ hiệu", "luôn âm thầm chép một cuốn sổ phụ giữ làm bằng chứng", "V3", "lit"],
  ["K103", "Thủy thủ Tịch Hải lên bờ", "tn", "bac", "cho_ben_say", "nhận đủ tiền công chuyến biển → dịch bệnh ở cảng", "nợ tiền ứng của thuyền trưởng", "lén giấu vài món hàng ngoại nhập miễn thuế trong hành lý", "D5", ""],
  ["K104", "Chủ thuyền sông nhỏ", "tn", "bac", "cho_ben_say", "chuyến hàng xuôi dòng có lãi → thuyền mắc cạn", "nợ tiền đóng thuyền của Đoàn Thuyền", "từng mua giấy thông hành chép tay giá rẻ để qua trạm", "D5", ""],
  ["K105", "Thợ đóng thuyền", "tc", "bac", "cho_ben_say", "đóng được con thuyền vững chãi → thiếu gỗ tốt", "nợ tiền gỗ của chủ xưởng", "để ý thấy các thuyền lớn của thương hội chở bạc nặng bất thường", "D5", "axe"],
  ["K106", "Kẻ giả mạo giấy tờ", "nl", "bac", "kinh_hoai", "nét bút giả tinh vi không ai biết → bị nha môn phát giác", "nợ tiền của kẻ đặt hàng ngầm", "từng được thuê chép giả một tờ phụ lục khế ước cổ", "V7", "lit"],
  ["K107", "Tay buôn lậu thành thị", "nl", "bac", "cho_ben_say", "phất lên nhanh chóng → bị đồng bọn bán đứng", "nợ phần chia cho đầu sỏ", "lén gửi tiền tích cóp vào hòm công đức nhà thờ để cất giấu", "D5", ""],
  ["K108", "Người cho vay nặng lãi nhỏ", "tn", "bac", "cho_ben_say", "thu hồi đủ cả vốn lẫn lãi → bị con nợ tố cáo", "bản thân lại là con nợ của chủ thuyền lớn", "chỉ là kẻ thu gom bạc lẻ nộp lên cho thương hội", "D5", ""],
  ["K109", "Ca nương trà lâu Kinh Hoài (từ 18 tuổi, nói bóng gió)", "nl", "bac", "kinh_hoai", "tích đủ bạc tự chuộc thân → lộ những điều nghe được bên bàn trà", "nợ văn tự chuộc thân với chủ lầu", "nhớ rõ từng khuôn mặt và giọng nói của các vị quan khách quen", "D5", "18plus"],
  ["K110", "Con nhà buôn giàu bị ép kế nghiệp", "tn", "bac", "kinh_hoai", "được tự do làm điều mình thích → gánh nặng gia sản", "lời hứa giữ hiệu buôn với cha", "trong thâm tâm chỉ muốn làm một người thợ thủ công bình dị", "D5", "lit"],
  ["K111", "Người quét kho cảng", "nl", "bac", "cho_ben_say", "có việc làm đều đặn → bến cảng vắng tàu", "nợ tiền trọ của quản bến", "nhặt được một tờ giấy rách có đóng con dấu ba bên", "D1", ""],
  ["K112", "Phu khuân vác Bến Sậy", "nd", "bac", "cho_ben_say", "đủ sức vác hàng mỗi ngày → chấn thương lưng", "nợ tiền cơm của chủ trọ", "nghe lỏm được chuyện mặc cả lãi suất giữa các lái buôn lớn", "D5", ""],
  ["K113", "Người đổi tiền ở chợ", "tn", "bac", "cho_ben_say", "ăn chênh lệch tỷ giá ổn định → bị cướp sạp tiền", "nợ vốn bạc của chủ hiệu lớn", "nhìn thoáng qua là biết đồng xu nào đúc thiếu sắt", "D5", "lit"],
  ["K114", "Thợ kim hoàn", "tc", "bac", "kinh_hoai", "gặp được khách sang trọng → nhận phải đồ gian", "nợ phí thường niên của Hội Phường", "từng được thuê nấu chảy một mảnh kim loại có khắc chữ cổ", "V2", ""],
  ["K115", "Tay móc túi chợ phiên", "nl", "bac", "cho_ben_say", "kiếm đủ ăn qua ngày → bị tuần chợ bắt tại trận", "nợ tiền bảo kê của gã đầu sỏ", "từng móc được một chiếc túi gấm có đựng nửa con dấu lạ", "D5", ""],
  ["K116", "Nhân viên thu thuế Bang Hàng", "tn", "bac", "cho_ben_say", "thu đủ sổ thuế → bị tiểu thương oán ghét", "nợ ân tình của chủ thương hội", "thấy rõ dòng tiền thuế Khế thực chất chảy về đâu", "D1", "lit"],
  ["K117", "Người hát rong kể chuyện, mù (KK)", "nl", "bac", "quan_bon_nga", "nhớ trọn vẹn các khúc ca cổ → tuổi già lãng quên", "nợ ơn đứa trẻ dẫn đường", "thuộc lòng một dị bản kỳ lạ của Bài Ca Hai Vợ", "V6", "kk_blind"],
  ["K118", "Thợ khắc dấu", "tc", "bac", "kinh_hoai", "tay nghề tinh xảo → bị ép khắc con dấu giả", "nợ ơn truyền nghề của sư phụ", "tổ tiên từng khắc một con dấu ngọc rồi chính tay bẻ làm đôi", "V2", ""],
  ["K119", "Người bán bánh rong phiên chợ lớn", "nd", "bac", "cho_ben_say", "bán hết mẹt bánh nóng → mưa rào ế khách", "nợ tiền bột của chủ lò bánh", "đứng góc chợ nên hay nghe lỏm được chuyện đại sự kinh thành", "D1", ""],
  ["K120", "Lái buôn Cao Lăng qua Hoài Dương", "tn", "bac", "quan_bon_nga", "chuyến buôn đường dài có lãi → bị giữ hàng ở trạm thuế", "nợ vốn của thương hội Cao Lăng", "lén kẹp các bản sách chép tay hiếm vào giữa những kiện vải", "D10", "lit"]
];

const GC_CODE_MAP = {
  nn: { giai_cap: "nong_no_ruong_dat", label: "Dân Gắn Ruộng" },
  nd: { giai_cap: "nong_dan_tu_do",    label: "Nông dân tự do" },
  nl: { giai_cap: "ke_ngoai_le",       label: "Kẻ Không Tên (Ngoài lề)" },
  tc: { giai_cap: "tho_thu_cong",      label: "Thợ thủ công" },
  tn: { giai_cap: "thuong_nhan_thi_dan", label: "Thương nhân & Thị dân" },
  gs: { giai_cap: "giao_si",           label: "Giáo sĩ Hỏa Đường" },
  tq: { giai_cap: "ky_si_quan_nhan",   label: "Tiểu quý tộc / Kiếm Điền" },
  dq: { giai_cap: "thien_menh_chi_tu", label: "Hoàng tộc / Đại quý tộc" }
};

const THREAD_NAME_MAP = {
  lua: "Sợi Lúa (Sinh tồn & Ruộng đất)",
  ngai: "Sợi Ngai (Quyền lực & Thuế khóa)",
  hoa: "Sợi Hỏa (Đức tin & Tri thức)",
  bien: "Sợi Biên (Biên ải & Khói lửa)",
  bac: "Sợi Bạc (Thương trường & Khế nợ)"
};

// CHUYỂN HÓA 120 KIỂU ĐỜI THÀNH ĐỐI TƯỢNG ĐẦY ĐỦ 6 ĐIỂM NGẮT (3 HỒI) & BƠM VÀO ARCHETYPES_POOL
(function hydrateAll120Archetypes() {
  if (typeof ARCHETYPES_POOL === "undefined") return;

  const hoPoolByThread = {
    lua: ["Ngô", "Khổng", "Lý", "Trần", "Bùi", "Đỗ"],
    ngai: ["Lâm", "Hạ", "Tạ", "Phó", "Tôn", "Quách"],
    hoa: ["Huyền", "Nguyên", "Cát", "Triệu", "Lục"],
    bien: ["Khổng", "Phạm", "Quách", "Bạc", "Sơn", "Khuất"],
    bac: ["Đoàn", "Mộc", "Điền", "Mai", "Ngô", "Lục"]
  };
  const tenPool = ["Thạch", "Cần", "Lúa", "Thảo", "Hổ", "Tâm", "Hiền", "Phát", "Lộc", "Nhẫn", "An", "Vân", "Sơn", "Tú", "Bình", "Tể", "Hạnh", "Minh"];

  const full120 = RAW_120_ARCHETYPES.map(row => {
    const [ma, ten_kieu, gcKey, soi, vi_tri, mongSo, ganh_nang, goc_khuat, canh_cua, flag] = row;
    const [mong, so] = mongSo.split("→").map(s => s.trim());
    const gcInfo = GC_CODE_MAP[gcKey] || GC_CODE_MAP.nd;

    // Quy tắc cứng Mục 47.8 & 54.5: Các kiểu đời 18+ bắt buộc tuổi khởi đầu >= 18
    let tuoiMin = 15, tuoiMax = 30;
    if (flag.includes("baby")) { tuoiMin = 1; tuoiMax = 2; }
    else if (flag.includes("child")) { tuoiMin = 8; tuoiMax = 12; }
    else if (flag.includes("youth")) { tuoiMin = 13; tuoiMax = 17; }
    else if (flag.includes("18plus")) { tuoiMin = 18; tuoiMax = 26; }
    else if (flag.includes("elder")) { tuoiMin = 58; tuoiMax = 68; }

    const isKK = flag.startsWith("kk_");
    const haoMon = flag === "kk_leg" ? 0.35 : (flag === "kk_lung" ? 0.25 : (flag === "kk_eye" ? 0.2 : 0));
    const isMu = flag === "kk_blind";
    const bietChu = flag.includes("lit") || gcKey === "gs" || gcKey === "tq" || gcKey === "dq";
    const coRiu = flag.includes("axe") || (gcKey === "nn" && tuoiMin >= 15);

    // Ngân hàng 6 Điểm ngắt chia 3 Hồi (Mục 54.4 & 56.2: Hồi 1: 2 điểm, Hồi 2: 2 điểm, Hồi 3: 2 điểm)
    const soseiBeats = {
      hoi_1: [
        "Lần đầu cảm nhận rõ nỗi lo của gia đình về [" + so + "] giữa những ngày thiếu thốn.",
        "Nghe người lớn trong vùng thì thào nhắc tới dấu vết (" + canh_cua + ") và nhận thức được gánh nặng [" + ganh_nang + "]."
      ],
      hoi_2: [
        "Gánh nặng [" + ganh_nang + "] đến kỳ phải đối mặt trực tiếp, buộc bạn phải lựa chọn giữa an toàn bản thân và mong mỏi [" + mong + "].",
        "Một biến cố bất ngờ tại địa phương suýt làm lộ góc khuất [" + goc_khuat + "], mở ra cánh cửa chạm tới vận mệnh lớn của vùng (" + canh_cua + ")."
      ],
      hoi_3: [
        "Khi mái đầu đã điểm bạc, những hệ quả từ cách bạn giải quyết [" + ganh_nang + "] năm xưa nay hiện rõ lên cuộc sống quanh mình.",
        "Ngồi nhìn lại chặng đường đã qua với tâm niệm [" + mong + "], bạn chuẩn bị để lại di sản và ký ức cuối đời."
      ]
    };

    return {
      ma: ma,
      ten_kieu: "[" + ma + "] " + ten_kieu,
      ho_goi_y: hoPoolByThread[soi] || ["Ngô", "Lê"],
      ten_goi_y: tenPool,
      giai_cap: gcInfo.giai_cap,
      than_phan: gcInfo.label + " · " + THREAD_NAME_MAP[soi],
      vi_tri: vi_tri,
      tuoi_min: tuoiMin,
      tuoi_max: tuoiMax,
      co_riu: coRiu,
      biet_chu: bietChu,
      hao_mon: haoMon,
      mu: isMu,
      is_kk: isKK,
      canh_cua: canh_cua,
      diem_ngat_6: soseiBeats,
      boi_canh: "Kiểu đời " + ma + " (" + ten_kieu + " · " + THREAD_NAME_MAP[soi] + ").\n• Mong mỏi: " + mong + ".\n• Nỗi sợ: " + so + ".\n• Nợ / Lời hứa: " + ganh_nang + ".",
      mong: mong,
      so: so,
      ganh_nang: ganh_nang,
      goc_khuat: goc_khuat,
      diem_ngat_hoi_2: soseiBeats.hoi_2[0] + " " + soseiBeats.hoi_2[1],
      diem_ngat_hoi_3: soseiBeats.hoi_3[0] + " " + soseiBeats.hoi_3[1]
    };
  });

  // Thay thế nội dung ARCHETYPES_POOL hiện có bằng trọn bộ 120 kiểu đời chuẩn xác
  ARCHETYPES_POOL.length = 0;
  full120.forEach(item => ARCHETYPES_POOL.push(item));
  window.ARCHETYPES_120_DB = full120;
})();
