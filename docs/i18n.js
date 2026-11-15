// =========================================================================
// FILE CHUYỂN ĐỔI NGÔN NGỮ ĐỘC LẬP (docs/i18n.js) - MỤC 47.7
// Tự động dịch toàn bộ giao diện, hành động, điều kiện, đồng hồ và diễn biến
// =========================================================================

const I18N_UI_LABELS = {
  vi: {
    start_title: "THIÊN MỆNH KHẢ BIẾN",
    start_sub: "Giai đoạn 1–11: Sinh tồn, Làng xã, Danh vọng, Hội Phường, Gia đình, 6 Thời kỳ & Cải mệnh",
    btn_random: "🎲 Bốc Kiếp Sống Ngẫu Nhiên (Theo Tỷ Lệ Giai Cấp)",
    btn_social: "🤝 Quan hệ & Danh tiếng",
    btn_bio: "📖 Bản thân & Đổi đời",
    btn_sys: "⚙️ Lưu / Thành tựu / VI-EN",
    btn_skip: "⏩ Để ngày tháng trôi (+2 Ngày · Tự ưu tiên Sinh tồn & Rèn luyện)",
    right_header: "Việc tại chỗ & Người xung quanh",
    travel_header: "🚶 Di chuyển (Quãng đường đối xứng · Tốc độ tùy thể trạng):",
    lang_label: "🌐 Ngôn ngữ: Tiếng Việt"
  },
  en: {
    start_title: "FATE UNFIXED (THIÊN MỆNH KHẢ BIẾN)",
    start_sub: "Stages 1–11: Survival, Society, Guilds, Family, 6 Historical Eras & World Delta",
    btn_random: "🎲 Draw Random Life (Weighted by Social Class)",
    btn_social: "🤝 Relations & Repute",
    btn_bio: "📖 Self & Ambition",
    btn_sys: "⚙️ Save / Trophies / VI-EN",
    btn_skip: "⏩ Let Days Pass (+2 Days · Smart Auto-Survival & Training)",
    right_header: "Local Actions & Nearby NPCs",
    travel_header: "🚶 Travel (Symmetric Distance · Speed by Physical State):",
    lang_label: "🌐 Language: English"
  }
};

// BẢNG CỤM TỪ DỊCH TỰ ĐỘNG (Dễ dàng thêm dòng mới khi mở rộng game)
const I18N_PHRASES = [
  // 1. Tên nhân vật, Thân phận & Địa danh
  ["Khách mù Quán Bốn Ngả", "Blind Minstrel of Four-Way Inn"],
  ["Đứa con nhà nông nô", "Serf's Newborn Child"],
  ["Bé Sậy", "Little Say"],
  ["Khổng Thạch", "Khong Thach"],
  ["Lão Ngô Tam", "Old Ngo Tam"],
  ["Điền Cẩm Tú", "Dien Cam Tu"],
  ["Đứa trẻ sơ sinh mùa gầy (1 tuổi)", "Infant Born in the Lean Season (Age 1)"],
  ["Đứa trẻ mồ côi bên bến sông (8 tuổi)", "Orphan by Reed Wharf (Age 8)"],
  ["Trai trẻ gắn ruộng (17 tuổi)", "Young Bound Serf (Age 17)"],
  ["Lão nông tuổi xế chiều (68 tuổi)", "Elderly Peasant (Age 68)"],
  ["Người học việc giữ sổ (15 tuổi)", "Apprentice Bookkeeper (Age 15)"],
  ["Người hát rong mù (30 tuổi)", "Blind Wandering Minstrel (Age 30)"],
  ["Con của Dân Gắn Ruộng", "Child of Bound Serfs"],
  ["Trẻ không nơi nương tựa", "Homeless Orphan"],
  ["Dân Gắn Ruộng", "Bound Serf"],
  ["Người già có uy tín", "Respected Elder"],
  ["Học việc giữ sổ", "Apprentice Scribe"],
  ["Người hát rong", "Wandering Minstrel"],
  ["Thị dân Tự do", "Free Citizen"],
  ["Kiếm Điền (Quân nhân quý tộc)", "Sword-Field Knight (Minor Noble)"],
  ["Thư lại Chức Sự", "Court Scribe Official"],
  ["Chủ hiệu Bang Hàng", "Merchant Guild Master"],
  ["Gian nhà tranh (Trong nhà)", "Thatched Hut (Indoors)"],
  ["Đường làng & Hiên Hỏa Đường", "Village Road & Fire Shrine Porch"],
  ["Cánh đồng Chủ Ấp", "Lord's Fields"],
  ["Bìa Rừng Đen (Trên rừng)", "Black Forest Edge (Woods)"],
  ["Chợ Bến Sậy & Hội Phường", "Reed Market & Guild Hall"],
  ["Quán trọ Bốn Ngả (Máy tin đồn)", "Four-Way Inn (Rumor Hub)"],
  ["Đồn Biên Ngạn & Lò Rèn Họ Khổng", "Border Outpost & Khong Forge"],
  ["Kinh đô Kinh Hoài & Nha Môn", "Kinh Hoai Capital & Magistrate"],
  ["🏠 Gian nhà tranh", "🏠 Thatched Hut"],
  ["🏘️ Đường làng & Hỏa Đường", "🏘️ Village & Fire Shrine"],
  ["🌾 Đồng Chủ Ấp", "🌾 Lord's Fields"],
  ["🌲 Bìa Rừng Đen", "🌲 Black Forest Edge"],
  ["🧺 Chợ & Hội Phường", "🧺 Market & Guild"],
  ["🍶 Quán Bốn Ngả", "🍶 Four-Way Inn"],
  ["⚔️ Đồn Biên Ngạn", "⚔️ Border Outpost"],
  ["🏛️ Kinh đô Kinh Hoài", "🏛️ Kinh Hoai Capital"],
  ["Làng Sậy Đỏ", "Red Reed Village"],
  ["Bến Sậy", "Reed Wharf"],
  ["Bến Bắc", "North Wharf"],
  ["Hạ Giang", "Lower River"],
  ["Tam Giang", "Three Rivers"],
  ["Biên Ngạn", "Borderlands"],
  ["Kinh Hoài", "Kinh Hoai Capital"],

  // 2. Thanh trạng thái, Cảnh báo, Thời kỳ & Mùa
  ["Tiếng tăm: Dân thường vô danh", "Repute: Unknown Commoner"],
  ["Tiếng tăm: Kẻ Có Tiếng Xấu Ngoài Lề", "Repute: Notorious Outlaw"],
  ["Danh hiệu: Người Có Uy Quyền", "Title: Person of Authority"],
  ["Danh hiệu: Bạn Hàng Giữ Chữ Tín", "Title: Trusted Merchant"],
  ["Danh hiệu: Tín Đồ Mộ Đạo", "Title: Devout Believer"],
  ["Danh hiệu: Kẻ Giữ Lời", "Title: Oathkeeper"],
  ["CHÂN THỰC", "AUTHENTIC"],
  ["🔊 Âm thanh: BẬT", "🔊 Sound: ON"],
  ["🔇 Âm thanh: TẮT", "🔇 Sound: OFF"],
  ["🩸 Mắt bạn hoa đom đóm, tay chân tê cứng vì đói lạnh! Hãy nấu ăn hoặc nhóm bếp ngay!", "🩸 Vision blurs and limbs go numb from hunger and freezing cold! Cook food or light a fire immediately!"],
  ["⚠️ Gió lạnh thổi buốt và bụng bắt đầu cồn cào. Hãy chú ý ăn uống và giữ ấm.", "⚠️ Bitter wind chills your bones and your stomach growls. Eat and stay warm."],
  ["🕯️ Cơ thể tỉnh táo, đủ sức làm việc, giao tiếp xã hội hoặc đi xa tìm cơ hội đổi đời.", "🕯️ Mind is clear and body steady enough to work, socialize, or seek fortune afar."],
  ["🔒 Cửa: Đã cài then", "🔒 Door: Barred"],
  ["🔓 Cửa: Chưa cài then", "🔓 Door: Unbarred"],
  ["🧱 Vách: Đã trát kín", "🧱 Wall: Sealed"],
  ["👁️ Vách: Tranh rách", "👁️ Wall: Torn Thatch"],
  ["🏠 Mái: Đã chằng vững", "🏠 Roof: Reinforced"],
  ["🍃 Mái: Chưa chằng", "🍃 Roof: Unsecured"],
  ["Thời kỳ I · Mùa Khế", "Era I · Season of Pacts"],
  ["Thời kỳ II · Bình Yên Mượn", "Era II · Borrowed Peace"],
  ["Thời kỳ III · Kho Rỗng Dần", "Era III · Hollowing Granary"],
  ["Thời kỳ IV · Bạch Lĩnh", "Era IV · White Ridge War"],
  ["Thời kỳ V · Nợ Chồng Nợ", "Era V · Debt Upon Debt"],
  ["Thời kỳ VI · Đáo Hạn", "Era VI · The Reckoning"],
  ["Mùa Nảy (Xuân)", "Sprout (Spring)"],
  ["Mùa Nắng (Hạ)", "Sun (Summer)"],
  ["Mùa Gặt (Thu)", "Harvest (Autumn)"],
  ["Mùa Giá (Đông)", "Frost (Winter)"],
  ["💪 Sức dẻo dai", "💪 Stamina: Strong"],
  ["😮‍💨 Thấm mệt", "😮‍💨 Stamina: Tired"],
  ["🥵 Chân tay bủn rủn", "🥵 Stamina: Exhausted"],
  ["🍚 Bụng êm", "🍚 Belly: Full"],
  ["🥣 Bụng cồn cào", "🥣 Belly: Hungry"],
  ["🥀 Đói hoa mắt", "🥀 Belly: Starving"],
  ["🔥 Đủ ấm", "🔥 Warmth: Cozy"],
  ["🌬️ Se lạnh", "🌬️ Warmth: Chilly"],
  ["❄️ Rét run cầm cập", "❄️ Warmth: Freezing"],
  ["🪪 Hội Phường", "🪪 Guild Member"],
  ["⚠️ Đang bị chú ý vì Tiếng xấu", "⚠️ Watched (Notoriety)"],
  ["🤧 Bệnh: Cảm lạnh", "🤧 Illness: Cold"],
  ["🤢 Bệnh: Đau bụng tà", "🤢 Illness: Gut Rot"],
  ["😷 Dịch: Ho Sương", "😷 Plague: Frost Cough"],
  ["🌾 Chợ mùa Gặt: Gạo rẻ", "🌾 Harvest Market: Cheap Rice"],
  ["❄️ Chợ mùa Giá: Củi đắt, Gạo khan", "❄️ Winter Market: Pricey Wood, Scarce Rice"],
  ["⚖️ Giá chợ: Bình ổn", "⚖️ Market: Stable Prices"],

  // 3. Nhóm tab & Tốc độ di chuyển
  ["Tất cả", "All"],
  ["Ngủ & Nghỉ ngơi", "Sleep & Rest"],
  ["Bản năng sơ sinh", "Infant Instincts"],
  ["Bếp núc & Ăn uống", "Cooking & Food"],
  ["Nhà cửa & Phòng bị", "Home & Defense"],
  ["Gia đình & Vòng đời", "Family & Lineage"],
  ["Thủ công & Rèn luyện", "Crafts & Training"],
  ["Việc làng xóm", "Village Tasks"],
  ["Tôn giáo & Học chữ", "Religion & Study"],
  ["Kiếm củi & Hái lượm", "Foraging & Wood"],
  ["Săn bắt", "Hunting"],
  ["Ngoài đồng", "Field Labor"],
  ["Mua bán & Hội Phường", "Market & Guild"],
  ["Làm thuê & Ngoài lề", "Labor & Outlaw"],
  ["Tại quán trọ", "At the Inn"],
  ["Tin đồn & Ngoài lề", "Rumors & Intrigue"],
  ["Võ thuật & Binh nghiệp", "Martial & Military"],
  ["Đổi Đời & Thăng Tiến", "Social Mobility"],
  ["Thương trường Kinh Đô", "Capital Trade"],
  ["Khoa cử & Tri thức", "Scholarship"],
  ["👥 Giao tiếp NPC", "👥 Talk to NPCs"],
  ["(Đang đứng)", "(Here)"],
  ["Tốc độ: Bình thường", "Speed: Normal"],
  ["Tốc độ: Chậm", "Speed: Slow"],
  ["chân yếu/lão hóa", "aging legs"],
  ["bước chân nhỏ", "short stride"],
  ["khinh thân nhanh nhẹn", "agile footwork"],
  ["dò đường", "blind navigation"],
  ["đói mệt", "hungry & tired"],
  ["đang mang bệnh", "illness"],
  ["đêm tối", "night darkness"],

  // 4. Toàn bộ Hành động & Mô tả điều kiện
  ["Lên phản đắp chăn ngủ qua đêm tới sáng (Hồi phục toàn diện)", "Sleep on the wooden bed until dawn (Full recovery)"],
  ["Chợp mắt nằm nghỉ trên phản gỗ (Hồi +28 Thể lực)", "Take a short nap on the wooden bed (+28 Stamina)"],
  ["Khóc gọi hơi ấm của mẹ", "Cry out for mother's warmth"],
  ["Bú sữa mẹ", "Nurse from mother"],
  ["Bắc nồi nấu cháo lương lành (Giảm mạnh cơn đói & hồi sức)", "Cook hot porridge from clean grain (Greatly reduces hunger & heals)"],
  ["Luộc kỹ lương ẩm mốc cầm hơi (Dùng khi thiếu gạo lành)", "Boil spoiled grain thoroughly to survive (Risk of stomach ache)"],
  ["Đem lương ẩm mốc ra sân sàng sảy & phơi nắng (Chuyển thành Lương lành)", "Winnow & sun-dry spoiled grain in the yard (Salvages into Clean Grain)"],
  ["Đun nước sôi / Sắc thảo dược uống ấm bụng & trị bệnh", "Boil well water / Brew medicinal herbs to warm up & cure illness"],
  ["Nhóm bếp củi sưởi ấm gian nhà (Xua tan rét cóng)", "Light the firewood hearth to warm the hut (Dispels freezing cold)"],
  ["Cất giấu 0.5 phần Lương lành xuống hố gầm phản (Chống tịch thu)", "Hide 0.5 Clean Grain in the secret pit under the bed (Tax-proof)"],
  ["Lấy lương lành từ dưới hố gầm phản lên để nấu ăn", "Retrieve hidden Clean Grain from the under-bed pit"],
  ["Cài / Mở then cửa gỗ đầu hồi", "Bar / Unbar the wooden front door"],
  ["Trát bùn & chèn rơm vá kín khe vách rách", "Plaster mud & straw to seal torn wall gaps"],
  ["Chằng lại kèo mái tranh chống gió lốc mùa Giá", "Lash roof beams with vines against winter gales"],
  ["Chăm sóc bạn đời & Đón con chào đời (-1.0 Lương lành, -1 Thảo dược · Cần Mụ Bảy Ve đỡ đẻ)", "Care for spouse & welcome newborn child (-1.0 Clean Grain, -1 Herb)"],
  ["Bện bó đuốc tẩm nhựa thông (Để soi đường đi rừng ban đêm)", "Craft pine-resin torch (For safe night forest travel)"],
  ["Bổ khúc gỗ thô thành củi đốt (+1.5 Bó củi khô)", "Chop raw timber into dry firewood (+1.5 Firewood)"],
  ["Ngồi đan rổ rá / Bện thừng rơm (+1 Đồ đan đem ra chợ bán lấy xu)", "Weave bamboo baskets & straw ropes (+1 Craft to sell at market)"],
  ["Ngồi bên đèn dầu ôn luyện mặt chữ & nghiền ngẫm sách (+Tri thức)", "Study characters & read texts by oil lamp (+Knowledge)"],
  ["Đứng tấn & Vung đao gỗ luyện võ ngoài sân nhà (+Võ nghệ)", "Practice stances & wooden blade strikes in the yard (+Martial Arts)"],
  ["Ra giếng làng kéo nước sạch về nhà (+3 Gáo nước)", "Draw clean water from the village well (+3 Water Ladles)"],
  ["San sẻ 0.6 Lương lành & 0.5 Củi cứu hộ nghèo trong xóm qua cơn đói (Tạo Delta cấp Làng)", "Share 0.6 Clean Grain & 0.5 Firewood to save starving neighbors (Village Delta)"],
  ["Nhờ người làm mối & Sắm lễ cưới hỏi lập gia đình (-12 Xu sắt · Yêu cầu từ 18 tuổi)", "Arrange marriage & wedding gifts (-12 Iron Coins · Requires Age 18+)"],
  ["Ngồi nghe giảng sư Nhất Hỏa dạy nhận mặt chữ (+Tri thức / Mở khóa Biết chữ)", "Attend First-Flame free literacy class (+Knowledge / Unlocks Literacy)"],
  ["Dự lễ cầu nguyện & Bố thí ở Hỏa Đường (+Tín nhiệm tôn giáo, giảm Sợ/Chán)", "Attend prayer & almsgiving at the Fire Shrine (+Religious Trust)"],
  ["Xếp hàng trước hiên Nhất Hỏa xin cháo bố thí", "Queue at the First-Flame porch for charity porridge"],
  ["Nhờ nữ tu y sĩ Nhất Hỏa bắt mạch & xin thuốc (+8 Sức khỏe, trị bệnh)", "Ask First-Flame healer nun for pulse check & medicine (+8 Health, cures illness)"],
  ["Mót rau má, đào củ chuối ven bờ mương (+0.35 Lương lành)", "Forage wild greens & banana roots along the ditch (+0.35 Clean Grain)"],
  ["Lội rừng nhặt cành củi khô gãy rụng (+0.7 Bó củi khô)", "Gather fallen dry branches in the woods (+0.7 Firewood)"],
  ["Vung rìu đốn khúc gỗ lớn (+1.4 Gỗ thô mang về nhà bổ củi)", "Fell dry trees with axe (+1.4 Raw Timber to chop at home)"],
  ["Tìm hái thảo dược, gừng gió & củ mài (+1 Thảo dược, +0.35 Lương lành)", "Forage medicinal herbs, wild ginger & yams (+1 Herb, +0.35 Clean Grain)"],
  ["Gài bẫy dây bắt thỏ hoang & gà rừng", "Set snare traps for wild hares & pheasants"],
  ["Còng lưng gặt lúa lao dịch nộp Chủ Ấp (Nhận thóc / xu công)", "Perform corvée rice harvesting for the Lord (Receive grain or coin)"],
  ["Cúi mót bông lúa sót lại & mò củ ấu ven đầm", "Glean leftover rice ears & dig water chestnuts by the swamp"],
  ["Dùng 2 Xu sắt đong Gạo lành (Sản lượng tùy giá chợ 4 mùa)", "Spend 2 Iron Coins to buy Clean Grain (Yield varies by season)"],
  ["Đem 1.0 bó Củi khô đổi lấy Lương lành (Mùa Giá được giá cao)", "Barter 1.0 Firewood bundle for Clean Grain (High value in Winter)"],
  ["Bán 1 Đồ đan lát lấy Xu sắt (Thành viên Hội Phường được giá gấp rưỡi!)", "Sell 1 Woven Craft for Iron Coins (Guild members earn 5 Coins!)"],
  ["Bán 1 nắm Thảo dược rừng lấy +4 Xu sắt", "Sell 1 bundle of Wild Herbs for +4 Iron Coins"],
  ["Đóng 8 Xu sắt xin gia nhập HỘI PHƯỜNG (Bán đồ đan/thủ công giá cao, được bảo vệ)", "Pay 8 Iron Coins to join the CRAFTSMEN GUILD (Higher prices & protection)"],
  ["Chuộc lại món đồ cũ bỏ quên trong góc tiệm cầm đồ (-5 Xu sắt)", "Redeem forgotten old parcel from the pawnshop corner (-5 Iron Coins)"],
  ["Gom 1 Kiện hàng quê giá sỉ (-6 Xu sắt -> Đem lên Kinh Hoài bán lấy 13 Xu)", "Buy 1 Wholesale Trade Bale (-6 Coins -> Sell in Capital for 13 Coins)"],
  ["Bốc vác bao hàng thuê ở bến thuyền (+3 Xu sắt)", "Haul heavy cargo sacks at the river docks (+3 Iron Coins)"],
  ["[Sống ngoài lề] Lợi dụng đám đông móc túi khách qua chợ (Rủi ro bị bắt theo giai cấp)", "[Outlaw] Pickpocket a merchant in the market crowd (Class justice risk)"],
  ["Hát rong / Kể chuyện xưa cho khách thương hồ (+2 Xu sắt & ăn lót dạ)", "Sing old ballads & tell tales to tavern guests (+2 Coins & snack)"],
  ["Phụ rửa bát & chẻ củi sau bếp cho bà chủ Ngô Hạnh (+0.4 Lương lành, +0.3 Củi)", "Wash dishes & split wood in the inn kitchen (+0.4 Clean Grain, +0.3 Firewood)"],
  ["[Vũ khí thông tin] Chủ động phao tin đồn tại bàn rượu (Tạo/Dập lời đồn)", "[Information Weapon] Spread strategic rumors at the tavern tables"],
  ["Thuê chiếu góc quán ngủ qua đêm tới sáng (-1 Xu sắt, ấm áp an toàn)", "Rent a warm mat by the tavern stove to sleep until dawn (-1 Coin)"],
  ["Theo đội trưởng Phạm Hổ luyện Đao pháp & Cận chiến (+2 Võ nghệ)", "Train sabre & close combat with Captain Pham Ho (+2 Martial Arts)"],
  ["Phụ kéo bễ & đập sắt tại Lò rèn Khổng Thảo (+3 Xu sắt, +1 Võ nghệ)", "Work the bellows & hammer iron at Khong Thao's Forge (+3 Coins, +1 Martial)"],
  ["Nhận đi Bảo tiêu hộ tống xe hàng qua đèo (+8 Xu sắt, +2 Võ nghệ, +Danh dự)", "Escort merchant caravan across the mountain pass (+8 Coins, +2 Martial, +Honor)"],
  ["Đưa kỷ vật (Dao ba chấm / Ấn ngọc gãy) cho người giữ đồn Biên Ngạn (Tạo Delta Hòa giải biên ải)", "Present Heirloom Relic to Border Outpost commanders (Border Peace Delta)"],
  ["Đầu quân lập chiến công trấn ải -> Phong bậc KIẾM ĐIỀN (Đổi giai cấp & Cấp ruộng!)", "Achieve frontier merit -> Promoted to SWORD-FIELD KNIGHT (Noble Class!)"],
  ["Bán Kiện hàng quê cho Bang Hàng Kinh Hoài (+13 Xu sắt, +Tín nhiệm thương mại)", "Sell Wholesale Trade Bale to Capital Merchant Guild (+13 Coins, +Trade Trust)"],
  ["Chép thuê sách cổ & tìm đọc hồ sơ ở Kinh Hoài (+4 Xu sắt, +2 Tri thức, Cơ hội tìm Bằng chứng)", "Copy ancient books & archives in the Capital (+4 Coins, +2 Knowledge, Evidence chance)"],
  ["Dùng vị thế & Bằng chứng đệ trình phơi bày gian lận sổ sách tại Kinh Hoài (Tạo Delta Cấp Quốc Gia)", "Submit Evidence to expose granary & interest fraud at the Capital (National Delta)"],
  ["Nộp 20 Xu sắt tại nha môn để CHUỘC THÂN (Thoát kiếp Dân Gắn Ruộng!)", "Pay 20 Iron Coins at the Magistrate to REDEEM FREEDOM (Break serfdom!)"],
  ["Ứng tuyển kỳ khảo hạch THƯ LẠI / CHỨC SỰ (Đổi đời thành Quan chức nhỏ!)", "Take the COURT SCRIBE / OFFICIAL examination (Rise to Official class!)"],
  ["Góp 30 Xu sắt lập hiệu buôn gia nhập BANG HÀNG (Đổi đời thành Thương gia!)", "Invest 30 Iron Coins to establish a trading house in the MERCHANT GUILD!"],

  // 5. Dòng điều kiện & Diễn biến trung tâm
  ["✓ Đủ điều kiện thực hiện · Ước chừng:", "✓ Ready to perform · Est:"],
  ["Bấm để trò chuyện", "Click to converse"],
  ["Trò chuyện & Tương tác với", "Converse & Interact with"],
  ["Thái độ: Thân thiết", "Attitude: Friendly"],
  ["Thái độ: Bình thường", "Attitude: Neutral"],
  ["Thái độ: Lạnh nhạt/Đề phòng", "Attitude: Wary/Cold"],
  ["Chỉ ngủ qua đêm từ 18h00 tối đến 05h00 sáng", "Only available at night (18:00 – 05:00)"],
  ["Hiện tại:", "Current:"],
  ["Cơ thể không đáp ứng: cần", "Physical gate: requires"],
  ["Cần ánh sáng ban ngày", "Requires daylight"],
  ["Hố giấu đã đầy", "Secret pit is full"],
  ["Hố giấu đang trống", "Secret pit is empty"],
  ["Cần Biết chữ (Học ở hiên Nhất Hỏa đạt 3 điểm Tri thức)", "Requires Literacy (Study at First-Flame porch to reach 3 Knowledge)"],
  ["DIỄN BIẾN · NHỊP #", "EVENT LOG · BEAT #"],
  ["[TỰ ĐỘNG SINH TỒN & RÈN LUYỆN QUA 2 NGÀY]:", "[AUTO-SURVIVAL & TRAINING OVER 2 DAYS]:"],
  ["Đem đồ đan lát ra chợ bán thu về", "Took woven crafts to market and sold them for"],
  ["Dùng xu sắt đong thêm gạo lành mang về nhà.", "Spent iron coins to buy clean grain and brought it home."],
  ["Lấy lương lành từ hố giấu dưới gầm phản lên nấu ăn.", "Retrieved clean grain from the secret pit under the bed to cook."],
  ["Phơi nắng lương mốc thu lại", "Sun-dried spoiled grain, salvaging"],
  ["phần lương sạch.", "clean grain."],
  ["Bắc nồi nấu cháo gạo lành ăn no bụng, cơ thể khỏe khoắn.", "Cooked a pot of hot porridge from clean grain; belly is full and body strengthened."],
  ["Nhóm bếp lửa ấm áp và ngủ đủ giấc ban đêm.", "Lit a warm hearth fire and slept soundly through the night."],
  ["Chép sổ thuê và ôn luyện chữ nghĩa", "Copied ledgers for hire and practiced calligraphy"],
  ["Luyện đao pháp ngoài sân", "Practiced sabre stances in the yard"],
  ["Ngồi đan thêm 1 chiếc rổ tre để dành đem bán.", "Wove 1 bamboo basket to sell at the market later."],
  ["Bạn ngồi sau bếp quán trọ cọ rửa chồng bát đĩa và nhóm lò giúp bà chủ Ngô Hạnh.", "You sat in the inn's back kitchen scrubbing greasy dishes and tending the stove for Madam Ngo Hanh."],
  ["Bạn cất giọng hát khúc ca cổ giữa quán rượu, khách thương hồ vỗ bàn thưởng 2 đồng xu sắt và nửa chiếc bánh nướng.", "You sang an ancient ballad in the tavern; traveling merchants clapped and tipped 2 iron coins and half a baked cake."],
  ["Trôi qua 2 ngày", "2 Days Passed"],
  ["Đã nấu ăn no bụng", "Cooked & Ate Well"]
];

function translateStringToEn(str) {
  if (!str || typeof str !== "string") return str;
  let out = str;

  for (const [vi, en] of I18N_PHRASES) {
    if (out.includes(vi)) out = out.split(vi).join(en);
  }

  // Dịch tự động các mẫu câu có số động (Regex)
  out = out
    .replace(/(\d+)\s*tuổi/g, "Age $1")
    .replace(/📚 Chữ: Biết chữ \((\d+)\)/g, "📚 Literacy: Literate ($1)")
    .replace(/📚 Chữ: (\d+\/3)/g, "📚 Literacy: $1")
    .replace(/⚔️ Võ: (\d+)/g, "⚔️ Martial: $1")
    .replace(/⚖️ Buôn: (\d+)/g, "⚖️ Trade: $1")
    .replace(/⏳ Năm (\d+)/g, "⏳ Year $1")
    .replace(/Ngày (\d+\/15)/g, "Day $1")
    .replace(/(\d+)h00/g, "$1:00")
    .replace(/🪙 Tiền: (\d+) xu/g, "🪙 Coins: $1")
    .replace(/💧 Nước: (\d+) gáo/g, "💧 Water: $1")
    .replace(/🔥 Củi: ([\d.]+) bó/g, "🔥 Firewood: $1")
    .replace(/🌾 Lương lành: ([\d.]+)/g, "🌾 Clean Grain: $1")
    .replace(/🍂 Lương mốc: ([\d.]+)/g, "🍂 Spoiled: $1")
    .replace(/🕳️ Hố giấu: ([\d.]+)/g, "🕳️ Hidden: $1")
    .replace(/🧺 Đồ đan: (\d+)/g, "🧺 Crafts: $1")
    .replace(/🌿 Thảo dược: (\d+)/g, "🌿 Herbs: $1")
    .replace(/📦 Kiện hàng: (\d+)/g, "📦 Trade Bales: $1")
    .replace(/📜 Bằng chứng: (\d+)/g, "📜 Evidence: $1")
    .replace(/🗝️ Kỷ vật: (\d+)/g, "🗝️ Relics: $1")
    .replace(/🤒 Suy nhược \((\d+)%\)/g, "🤒 Weakened ($1%)")
    .replace(/💍 Đã lập gia đình \(Con: (\d+)\)/g, "💍 Married (Children: $1)")
    .replace(/⏱️ \+(\d+) phút/g, "⏱️ +$1 mins")
    .replace(/(\d+) phút/g, "$1 mins")
    .replace(/xu sắt/g, "Iron Coins")
    .replace(/Lương lành/g, "Clean Grain")
    .replace(/Lương mốc/g, "Spoiled Grain")
    .replace(/Bó củi khô/g, "Firewood")
    .replace(/bó củi/g, "Firewood")
    .replace(/Tri thức/g, "Knowledge")
    .replace(/Võ nghệ/g, "Martial")
    .replace(/Cần ≥/g, "Requires ≥")
    .replace(/Hiện có/g, "Have");

  return out;
}

// LƯU TRẠNG THÁI VĂN BẢN GỐC ĐỂ ĐỔI QUA LẠI VI <-> EN TỨC THÌ
let cachedCenterVi = { text: "", deltas: [] };

const baseUpdateCenter = updateCenterStage;
updateCenterStage = function(mainText, deltas) {
  cachedCenterVi = { text: mainText, deltas: JSON.parse(JSON.stringify(deltas || [])) };
  baseUpdateCenter(mainText, deltas);
  if (window.appSettings && window.appSettings.lang === "en") {
    applyEnglishToDOM();
  }
};

const baseRender = render;
render = function() {
  baseRender();
  if (window.appSettings && window.appSettings.lang === "en") {
    applyEnglishToDOM();
  }
};

function applyEnglishToDOM() {
  const dict = I18N_UI_LABELS.en;
  document.querySelector(".start-title").textContent = dict.start_title;
  document.querySelector(".start-sub").textContent = dict.start_sub;
  const btnStartLang = document.getElementById("btnStartLang");
  if (btnStartLang) btnStartLang.textContent = dict.lang_label;

  document.getElementById("btnOpenSocial").textContent = dict.btn_social;
  document.getElementById("btnOpenBio").textContent = dict.btn_bio;
  const btnSys = document.getElementById("btnOpenSystem");
  if (btnSys) btnSys.textContent = dict.btn_sys;
  document.getElementById("btnSkipAuto").textContent = dict.btn_skip;

  const travelLabel = document.querySelector(".travel-bar-label span:first-child");
  if (travelLabel) travelLabel.textContent = dict.travel_header;
  const rightTitle = document.querySelector(".right-title span:first-child");
  if (rightTitle) rightTitle.textContent = dict.right_header;

  // Dịch các phần tử chính trên màn hình
  const idsToTranslate = [
    "topCharName", "topCharSub", "topLocBadge", "topRepBadge", "topProgressBadge",
    "topModeBadge", "btnToggleMute", "sensoryText", "beatHeaderLeft", "beatHeaderRight",
    "narrativeBox", "clockDisplay", "stockXu", "stockWater", "stockCui",
    "stockFoodClean", "stockFoodSpoiled", "stockHidden", "speedStatusHint", "rightLocHint"
  ];
  idsToTranslate.forEach(id => {
    const el = document.getElementById(id);
    if (el && el.textContent) el.textContent = translateStringToEn(el.textContent);
  });

  // Dịch các danh sách thẻ/nút động
  document.querySelectorAll(
    "#houseBadges .house-badge, #feelTags .feel-tag, #beatDeltas .delta-pill, " +
    "#recentLog .log-entry, #travelChips .travel-chip, #filterTabs .tab-pill, " +
    "#menuBox .act-name, #menuBox .act-req-ok, #menuBox .act-req-missing, #menuBox .btn-push, " +
    "#startPersonaList .act-name, #startPersonaList .act-sub"
  ).forEach(el => {
    if (el.textContent === "Gắng") el.textContent = "Push";
    else el.textContent = translateStringToEn(el.textContent);
  });
}

window.toggleLanguage = function() {
  window.appSettings.lang = window.appSettings.lang === "vi" ? "en" : "vi";
  const dict = I18N_UI_LABELS[window.appSettings.lang];

  document.querySelector(".start-title").textContent = dict.start_title;
  document.querySelector(".start-sub").textContent = dict.start_sub;
  const btnStartLang = document.getElementById("btnStartLang");
  if (btnStartLang) btnStartLang.textContent = dict.lang_label;
  document.getElementById("btnOpenSocial").textContent = dict.btn_social;
  document.getElementById("btnOpenBio").textContent = dict.btn_bio;
  const btnSys = document.getElementById("btnOpenSystem");
  if (btnSys) btnSys.textContent = dict.btn_sys;
  document.getElementById("btnSkipAuto").textContent = dict.btn_skip;
  const travelLabel = document.querySelector(".travel-bar-label span:first-child");
  if (travelLabel) travelLabel.textContent = dict.travel_header;
  const rightTitle = document.querySelector(".right-title span:first-child");
  if (rightTitle) rightTitle.textContent = dict.right_header;

  initStartMenu();
  refreshContinueButton();

  if (state.persona) {
    baseUpdateCenter(cachedCenterVi.text || state.persona.boi_canh_mo_ta, cachedCenterVi.deltas);
    render();
  } else if (window.appSettings.lang === "en") {
    applyEnglishToDOM();
  }
};
// Bổ sung từ điển cho Ngân hàng Kiểu đời 5 sợi dây & 3 Hồi cuộc đời (GĐ 12)
I18N_PHRASES.push(
  ["Nông nô gắn ruộng Tam Giang", "Bound Serf of Three Rivers"],
  ["Thợ làm muối Đồi Muối", "Salt Boiler of Salt Hill"],
  ["Người gánh nước thuê khập khiễng (KK)", "Limping Water Carrier (Flawed)"],
  ["Con Chủ Ấp nhỏ sa sút", "Scion of a Fallen Minor Lord"],
  ["Người chép thuê mắt mờ dần (KK)", "Fading-Sight Copyist (Flawed)"],
  ["Tu sĩ chép sách trẻ Hỏa Đường", "Young Fire-Shrine Scribe Monk"],
  ["Người sống sót qua dịch Ho Sương, phổi yếu (KK)", "Frost-Cough Survivor with Weak Lungs (Flawed)"],
  ["Thợ rèn học việc Biên Ngạn", "Frontier Apprentice Blacksmith"],
  ["Thợ săn Rừng Đen điếc một tai (KK)", "One-Ear-Deaf Black Forest Hunter (Flawed)"],
  ["Chủ tiệm cầm đồ nhỏ Hạ Giang", "Small Pawnshop Keeper of Lower River"],
  ["Thiên mệnh chi tử · Hoàng tộc Hoài Dương", "Child of Destiny · Royal House of Hoai Duong"],
  ["Thợ nấu muối · Đồi Muối (Hạ Giang)", "Salt Boiler · Salt Hill (Lower River)"],
  ["Kẻ Không Tên (Chân tật nguyền) · Bến Sậy", "Nameless Outcast (Crippled Leg) · Reed Wharf"],
  ["Hậu duệ Chủ Ấp sa sút · Kinh Hoài", "Fallen Noble Scion · Kinh Hoai Capital"],
  ["Thợ chép chữ · Kinh Hoài", "Contract Copyist · Kinh Hoai Capital"],
  ["Tu sĩ chép kinh · Hỏa Đường", "Scripture Monk · Fire Shrine"],
  ["Dân tự do (Phổi yếu sau dịch) · Hạ Giang", "Free Peasant (Weak Lungs) · Lower River"],
  ["Thợ rèn biên ải · Đồn Biên Ngạn", "Frontier Blacksmith · Border Outpost"],
  ["Thợ săn miền sơn cước · Bìa Rừng Đen", "Highland Hunter · Black Forest Edge"],
  ["Thương nhân nhỏ · Chợ Bến Sậy", "Petty Merchant · Reed Market"],
  ["Thiên Mệnh Chi Tử (Hoàng tộc họ Lâm) · Kinh Hoài", "Child of Destiny (Royal Lam Clan) · Kinh Hoai"],
  ["📖 [Bước sang Hồi II · Trưởng Thành]:", "📖 [Entering Act II · Adulthood]:"],
  ["🍂 [Bước sang Hồi III · Xế Chiều]:", "🍂 [Entering Act III · Twilight Years]:"],
  ["📖 Điểm ngắt cuộc đời", "📖 Life Formative Beat"]
);
