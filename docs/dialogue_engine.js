// =========================================================================
// BỘ MÁY ĐỐI THOẠI ĐA NHÁNH & XÃ HỘI THỰC TẾ (docs/dialogue_engine.js)
// Thực thi Mục 13.2, 22.6, 30, 31, 40 (Tách Fact/Belief, Thái độ theo Giai cấp,
// Giao dịch việc thật, Bái sư học nghề & Đấu trí vạch trần nói dối)
// =========================================================================

(function initDeepDialogueEngine() {
  // 1. HỆ THỐNG XƯNG HÔ TIẾNG VIỆT THEO TUỔI TÁC & GIAI CẤP (Mục 22.6 & 47.7)
  function getPronouns(player, npc) {
    const pAge = player.tuoi || 18;
    const ageMatch = npc.ten.match(/\((\d+)\s*tuổi\)/);
    const nAge = ageMatch ? parseInt(ageMatch[1], 10) : 40;
    const pHighClass = player.giai_cap === "quan_lai" || player.giai_cap === "ky_si_quan_nhan" || player.giai_cap === "thien_menh_chi_tu";

    if (pHighClass && !npc.vai.includes("Vương") && !npc.vai.includes("Tổng Sự")) {
      return { npcSelf: "tôi", playerCall: "ngài", playerSelf: "ta", npcCall: "ngươi" };
    }
    if (nAge >= pAge + 25) {
      return { npcSelf: "ta", playerCall: "con", playerSelf: "con", npcCall: nAge >= 55 ? "cụ" : "bác" };
    }
    if (pAge >= nAge + 25) {
      return { npcSelf: "cháu", playerCall: "lão bá", playerSelf: "ta", npcCall: "cháu" };
    }
    if (nAge >= pAge + 8) {
      return { npcSelf: "ta", playerCall: "đệ", playerSelf: "đệ", npcCall: "huynh/tỷ" };
    }
    return { npcSelf: "ta", playerCall: "ngươi", playerSelf: "tôi", npcCall: "người anh em" };
  }

  // 2. SINH LỜI CHÀO MỞ ĐẦU THEO HOÀN CẢNH THỰC TẾ (GIỜ GIẤC, ĐÓI RÁCH, TIẾNG XẤU, GIAI CẤP)
  function buildContextualGreeting(npc, rel, pro) {
    const p = state.persona;
    const isNight = state.hour >= 19 || state.hour < 6;
    const isStarving = state.doi >= 75 || state.theLuc <= 20;
    const isNotorious = state.rep && state.rep.tieng_xau >= 30;

    if (rel.feud_bac >= 2) {
      return `⚡ [Ánh mắt căm phẫn]: Vừa thấy bóng bạn, ${npc.ten} đã sầm mặt lùi lại một bước, tay nắm chặt vật cứng bên người:\n"Giữa ${pro.npcSelf} và ${pro.playerCall} đã kết oán thù sâu nặng, còn vác mặt tới đây làm gì? Đi khuất mắt ngay trước khi ${pro.npcSelf} hô hoán lên!"`;
    }
    if (rel.feud_bac === 1) {
      return `💢 [Thái độ lạnh nhạt]: ${npc.ten} liếc nhìn bạn rồi quay đi chỗ khác:\n"Chuyện xích mích lần trước ${pro.npcSelf} chưa quên đâu. Nếu ${pro.playerCall} không có thành ý giảng hòa thì đừng làm mất thời gian của ${pro.npcSelf}."`;
    }
    if (isNotorious && !rel.dong_loa) {
      return `⚠️ [Dè chừng tiếng xấu]: ${npc.ten} vội che túi tiền và kéo vạt áo lùi lại khi nhận ra bạn:\n"Khắp vùng này đang xầm xì chuyện không hay về ${pro.playerCall}. Đứng xa ra một chút, có chuyện gì nói nhanh rồi đi đi!"`;
    }
    if (isNight) {
      return `🌙 [Đêm khuya]: Giữa bóng tối tĩnh mịch, ${npc.ten} giơ ngọn đèn dầu lên soi rõ mặt bạn:\n"Đêm hôm khuya khoắt gió lạnh thế này, ${pro.playerCall} không ở nhà đóng cửa ngủ mà còn lọ mọ ra đây có việc gì gấp?"`;
    }
    if (isStarving) {
      return `🥀 [Nhìn thấy vẻ tiều tụy]: ${npc.ten}cau mày nhìn sắc mặt xanh xao và bước chân lảo đảo của bạn:\n"Trông ${pro.playerCall} kìa, môi khô nứt nẻ, chân đi không vững. Đói lả đến mức này rồi sao?"`;
    }
    if (rel.dong_loa) {
      return `🤝 [Đồng lõa giữ bí mật]: ${npc.ten} nhìn quanh bốn phía thấy vắng người mới khẽ gật đầu với bạn:\n"Chuyện kín giữa hai chúng ta vẫn an toàn. Hôm nay ${pro.playerCall} tìm ${pro.npcSelf} bàn việc gì?"`;
    }
    if (rel.than_thien >= 35) {
      return `🍵 [Chỗ thân tình]: ${npc.ten} nở nụ cười ấm áp, ngừng tay việc đang làm để đón bạn:\n"À, ${pro.playerCall} tới đấy ư! Lại đây ngồi nghỉ chân chút đã, dạo này cuộc sống thế nào?"`;
    }
    return `👁️ [Quan sát xã giao]: ${npc.ten} dừng tay nhìn trang phục (${p.than_phan}) của bạn:\n"Chào ${pro.playerCall}. Thời buổi mùa màng thuế má khắc nghiệt, tìm ${pro.npcSelf} có chuyện gì?"`;
  }

  // 3. XÁC ĐỊNH NHÓM NGHỀ & DỊCH VỤ ĐẶC THÙ CỦA TỪNG NPC
  function getNpcRoleCategory(npc) {
    const v = (npc.vai + " " + npc.ten).toLowerCase();
    if (v.includes("rèn") || v.includes("khổng")) return "smith";
    if (v.includes("y sĩ") || v.includes("bà đỡ") || v.includes("mụ") || v.includes("thuốc")) return "healer";
    if (v.includes("cầm đồ") || v.includes("mộc phát") || v.includes("thương") || v.includes("hội trưởng") || v.includes("kế toán") || v.includes("muối")) return "merchant";
    if (v.includes("quán") || v.includes("ca nương") || v.includes("hát")) return "inn";
    if (v.includes("giảng sư") || v.includes("đường chủ") || v.includes("thủ thư") || v.includes("chép") || v.includes("tu sĩ")) return "scholar";
    if (v.includes("tướng") || v.includes("đội trưởng") || v.includes("kiếm điền") || v.includes("bảo tiêu") || v.includes("quản trang") || v.includes("soi lửa")) return "military";
    if (v.includes("trưởng làng") || v.includes("trưởng lão") || v.includes("nông dân")) return "elder";
    return "general";
  }

  // 4. BỘ MÁY HIỂN THỊ CÂY HỘI THOẠI ĐA TẦNG (MULTI-TURN DIALOGUE NODE)
  window.openNpcDialogue = function(npc, currentNode = "root", customMessage = null) {
    if (state.isWorking || freneticInterval || state.isDead) return;
    SoundFX.playSoftStep();

    if (!state.npcRelations[npc.id]) {
      state.npcRelations[npc.id] = { than_thien: npc.than_thien_goc || 5, feud_bac: 0, dong_loa: false };
    }
    if (!state.npcMemory) state.npcMemory = {};
    if (!state.npcMemory[npc.id]) {
      state.npcMemory[npc.id] = { talks: 0,lieExposed: false, helpedToday: false, learnedToday: false };
    }

    const rel = state.npcRelations[npc.id];
    const mem = state.npcMemory[npc.id];
    const pro = getPronouns(state.persona, npc);
    const roleCat = getNpcRoleCategory(npc);

    const box = document.getElementById('freneticBox');
    const titleEl = document.getElementById('freneticTitle');
    const timerEl = document.getElementById('freneticTimer');
    const descEl = document.getElementById('freneticDesc');
    const choicesEl = document.getElementById('freneticChoices');

    box.className = 'frenetic-overlay dialogue-mode';
    const attLabel = rel.feud_bac > 0
      ? `⚡ Mối thù Bậc ${rel.feud_bac}`
      : (rel.dong_loa ? "🤝 Đồng lõa" : (rel.than_thien >= 40 ? "💚 Tri kỷ" : (rel.than_thien >= 20 ? "🍵 Thân quen" : "⚖️ Xã giao")));
    titleEl.textContent = `💬 ${npc.ten.toUpperCase()} · ${npc.vai}`;
    timerEl.textContent = attLabel;

    let mainText = customMessage || buildContextualGreeting(npc, rel, pro);
    const options = [];

    // =======================================================================
    // NHÁNH A: ĐANG CÓ MỐI THÙ (FEUD >= 1) -> BUỘC PHẢI GIẢNG HÒA HOẶC ĐỐI ĐẦU
    // =======================================================================
    if (rel.feud_bac > 0 && currentNode === "root") {
      options.push({
        label: `🙇 [${pro.playerSelf} biết lỗi rồi] Biếu 2 Xu sắt tiền trà rượu để xóa bỏ hiềm khích`,
        action: () => {
          if (state.xuSat < 2) {
            window.openNpcDialogue(npc, "root", `${npc.ten} cười nhạt nhìn bàn tay trắng của bạn:\n"Nói miệng xuông mà đòi giảng hòa ư? Khi nào có đủ 2 đồng xu sắt lễ tạ thì hãy tới nói chuyện!"`);
          } else {
            state.xuSat -= 2;
            rel.feud_bac = Math.max(0, rel.feud_bac - 1);
            rel.than_thien += 12;
            advanceClock(10, false, false);
            window.openNpcDialogue(npc, "root", `Nhận 2 đồng xu sắt và thấy thái độ biết điều của bạn, ${npc.ten} thở dài cất tiền vào túi:\n"Thôi được, coi như chuyện cũ bỏ qua một phần. Từ nay ăn nói cẩn thận đấy!"`);
          }
        }
      });

      if (state.voNghe >= 2.0) {
        options.push({
          label: `🗡️ [Thị uy bằng vũ lực] Đặt tay lên chuôi vũ khí, nhìn thẳng vào mắt ${npc.ten} ép phải nhượng bộ`,
          action: () => {
            advanceClock(10, false, false);
            if (state.voNghe >= 3.5 || Math.random() < 0.5) {
              rel.feud_bac = 0;
              state.rep.uy_quyen += 8;
              window.openNpcDialogue(npc, "root", `Trước khí thế sắc lẹm và thân thủ vững vàng của bạn, ${npc.ten} tái mặt lùi lại hai bước:\n"Được... được rồi! Coi như ${pro.npcSelf} chưa nói gì, từ nay nước sông không phạm nước giếng!"`);
            } else {
              rel.feud_bac = Math.min(4, rel.feud_bac + 1);
              state.sucKhoe = Math.max(5, state.sucKhoe - 8);
              window.openNpcDialogue(npc, "root", `${npc.ten} chẳng những không sợ mà còn vung gậy đánh trả quyết liệt làm bạn trúng đòn đau điếng (-8 Sức khỏe)! Mối thù leo lên Bậc ${rel.feud_bac}!`);
            }
          }
        });
      }
    }

    // =======================================================================
    // NHÁNH B: MENU GỐC KHI KHÔNG CÓ THÙ OÁN (CHỌN CHỦ ĐỀ SÂU)
    // =======================================================================
    else if (currentNode === "root") {
      // 1. Nhánh trò chuyện sâu về hoàn cảnh & bắt thóp Fact/Belief
      options.push({
        label: `🗣️ Hỏi chuyện đời sống & Lắng nghe tâm sự của ${npc.ten} (-3 Thể lực, +10 phút)`,
        action: () => {
          state.theLuc = Math.max(0, state.theLuc - 3);
          mem.talks++;
          advanceClock(10, false, false);

          const isTrusting = rel.than_thien >= 30 || rel.dong_loa || mem.lieExposed;
          const statement = (isTrusting || !npc.dang_noi_doi) ? npc.loi_noi_that : npc.loi_noi_doi;

          let detectNote = "";
          let canExpose = false;
          if (npc.dang_noi_doi && !isTrusting) {
            const pDetect = computeLieDetectionProb(npc);
            if (Math.random() < pDetect) {
              canExpose = true;
              detectNote = `\n\n👁️ [Nhạy bén xã hội phát hiện mâu thuẫn]: Khi nói câu này, ngón tay của ${npc.ten} khẽ siết lại và ánh mắt lảng tránh — bạn nhận ra ngay người này đang cố tình che giấu sự thật!`;
            }
          }

          window.openNpcDialogue(
            npc,
            canExpose ? "topic_story_lie_detected" : "topic_story",
            `${npc.ten} trầm ngâm nhìn ra xa rồi nói với bạn:\n"${statement}"${detectNote}`
          );
        }
      });

      // 2. Nhánh Hỏi thăm Tin đồn & Thời cuộc trong vùng
      options.push({
        label: `👂 Dò hỏi tin đồn, giá cả & động tĩnh quanh vùng`,
        action: () => {
          advanceClock(8, false, false);
          const l2Rumor = (typeof window.sampleNpcRumorBeliefLazy === "function")
            ? window.sampleNpcRumorBeliefLazy(npc.id, state.location)
            : null;
          const whisper = nextFromDeck('whisperDeck', AMBIENT_WHISPERS);
          const msg = l2Rumor
            ? `${npc.ten} nhìn quanh rồi hạ giọng kể cho bạn:\n"Dạo này khắp nơi đang xôn xao chuyện này: ${l2Rumor.noi_dung}"\n\nNgoài ra họ còn bảo: "${whisper}"`
            : `${npc.ten} ngẫm nghĩ một lát rồi kể:\n"${whisper}"`;
          window.openNpcDialogue(npc, "topic_rumor", msg);
        }
      });

      // 3. Nhánh Công việc, Giao dịch ngầm & Nhờ vả thực tế theo đúng nghề của NPC
      options.push({
        label: `🤝 Bàn việc làm ăn, Nhờ cậy hoặc Xin phụ việc (${npc.vai})`,
        action: () => {
          window.openNpcDialogue(npc, "topic_work", `${npc.ten} nhìn bạn gật đầu:\n"Được thôi, ở chỗ ${pro.npcSelf} mọi việc đều có quy tắc rõ ràng. ${pro.playerCall} muốn bàn việc gì nào?"`);
        }
      });

      // 4. Nhánh Bái sư / Thỉnh giáo kiến thức hoặc nghề nghiệp
      options.push({
        label: `📖 Thỉnh giáo kinh nghiệm & Học hỏi kỹ năng từ ${npc.ten}`,
        action: () => {
          window.openNpcDialogue(npc, "topic_learn", `${npc.ten} vuốt cằm đánh giá sự kiên nhẫn của bạn:\n"Muốn học được cái chữ, đường đao hay mánh tính sổ đều phải đổ mồ hôi và có lòng thành, không phải chuyện ngày một ngày hai đâu."`);
        }
      });
    }

    // =======================================================================
    // NHÁNH C: ĐẤU TRÍ KHI PHÁT HIỆN NPC NÓI DỐI (FACT VS BELIEF - MỤC 40 & 43.8)
    // =======================================================================
    else if (currentNode === "topic_story" || currentNode === "topic_story_lie_detected") {
      if (currentNode === "topic_story_lie_detected") {
        options.push({
          label: `👁️ [Khéo léo gợi mở] "Lời của ${pro.npcCall} nghe còn có chỗ ngập ngừng, ${pro.playerSelf} là người kín miệng, xin cứ nói thật..."`,
          action: () => {
            advanceClock(12, false, false);
            const doiNhan = (state.hocVan && state.hocVan.doi_nhan) || 0;
            if (rel.than_thien >= 15 || doiNhan >= 0.4 || state.rep.danh_du >= 25) {
              mem.lieExposed = true;
              rel.than_thien += 10;
              window.openNpcDialogue(npc, "root", `${npc.ten} giật mình nhìn sâu vào mắt bạn, rồi thở dài một tiếng trút bỏ vẻ phòng bị:\n"Không ngờ ${pro.playerCall} lại tinh ý đến vậy. Thôi được, ${pro.npcSelf} nói thật nhưng tuyệt đối đừng để lộ ra ngoài:\n${npc.loi_noi_that}"`);
            } else {
              rel.than_thien -= 8;
              window.openNpcDialogue(npc, "root", `${npc.ten} lập tức đanh mặt lại:\n"${pro.playerCall} mới quen biết được bao lâu mà dám bắt bẻ lời của ${pro.npcSelf}? Không tin thì thôi, đừng hỏi nhiều!"`);
            }
          }
        });

        if (state.coBangChung > 0 || (state.kyVat && state.kyVat.length > 0)) {
          options.push({
            label: `📜 [Đặt vật chứng lên bàn] Dùng Bằng chứng / Kỷ vật đang giữ buộc ${npc.ten} phải吐 lộ sự thật & kết Đồng lõa`,
            action: () => {
              mem.lieExposed = true;
              rel.dong_loa = true;
              rel.than_thien += 20;
              state.xuSat += 6;
              window.openNpcDialogue(npc, "root", `Vừa nhìn thấy vật chứng trong tay bạn, sắc mặt ${npc.ten} trắng bệch! Họ vội vàng dúi cho bạn 6 đồng xu sắt và thề kết làm Đồng lõa:\n"Khẽ thôi! Đừng để tai vách mạch rừng nghe thấy! Sự thật là: ${npc.loi_noi_that}"`);
            }
          });
        }
      }

      options.push({
        label: `🍵 Đồng cảm và chia sẻ nỗi niềm với ${npc.ten} (+Thiện cảm, +Kinh nghiệm Đối nhân xử thế)`,
        action: () => {
          rel.than_thien = Math.min(100, rel.than_thien + 6);
          if (state.hocVan) state.hocVan.doi_nhan = Number((state.hocVan.doi_nhan + 0.06).toFixed(2));
          window.openNpcDialogue(npc, "root", `Sự lắng nghe chân thành của bạn khiến ${npc.ten} ấm lòng hơn giữa thời buổi loạn lạc (+Thiện cảm).`);
        }
      });

      options.push({
        label: `↩️ Quay lại câu chuyện chính`,
        action: () => window.openNpcDialogue(npc, "root")
      });
    }

    // =======================================================================
    // NHÁNH D: PHẢN HỒI TIN ĐỒN & KIỂM CHỨNG SƯƠNG MÙ (MỤC 31 & 35)
    // =======================================================================
    else if (currentNode === "topic_rumor") {
      options.push({
        label: `🔍 Hỏi kỹ xem tin đồn này đáng tin đến đâu (Kiểm chứng độ xác thực)`,
        action: () => {
          advanceClock(8, false, false);
          const trustNote = rel.than_thien >= 25
            ? `"Chuyện này chính tai ${pro.npcSelf} nghe từ người trong cuộc, mười phần thì đến tám chín phần là thật đấy, ${pro.playerCall} nên liệu mà phòng bị trước!"`
            : `"Chuyện ngoài đầu đường xó chợ truyền tai nhau ấy mà, nghe để biết thế thôi chứ thực hư thế nào ${pro.npcSelf} cũng chẳng dám chắc."`;
          window.openNpcDialogue(npc, "root", `${npc.ten} gật gù đáp:\n${trustNote}`);
        }
      });

      options.push({
        label: `↩️ Quay lại câu chuyện chính`,
        action: () => window.openNpcDialogue(npc, "root")
      });
    }

    // =======================================================================
    // NHÁNH E: CÔNG VIỆC, GIAO DỊCH & NHỜ VẢ THEO ĐÚNG VAI TRÒ NPC
    // =======================================================================
    else if (currentNode === "topic_work") {
      // 1. Làm việc vặt phụ giúp NPC (Chỉ 1 lần/ngày với mỗi NPC, tốn thể lực thật)
      if (!mem.helpedToday) {
        options.push({
          label: `💪 Xin phụ việc tay chân giúp ${npc.ten} một buổi (-16 Thể lực, +Đồ ăn hoặc Xu lẻ, +Thiện cảm)`,
          action: () => {
            if (state.theLuc < 18) {
              window.openNpcDialogue(npc, "topic_work", `${npc.ten} lắc đầu:\n"Trông ${pro.playerCall} thở còn không ra hơi kìa, làm sao vác nổi đồ? Về nghỉ ngơi đi đã!"`);
              return;
            }
            mem.helpedToday = true;
            state.theLuc = Math.max(0, state.theLuc - 16);
            state.doi = Math.min(100, state.doi + 4);
            rel.than_thien = Math.min(100, rel.than_thien + 10);
            advanceClock(36, false, false);

            let rewardMsg = "";
            if (roleCat === "inn" || roleCat === "elder" || roleCat === "healer") {
              state.doi = Math.max(10, state.doi - 28);
              state.luongLanh = Number((state.luongLanh + 0.25).toFixed(2));
              rewardMsg = `Sau khi bạn phụ gánh nước và dọn dẹp xong, ${npc.ten} múc cho bạn một bát cơm nóng ăn tại chỗ (giảm mạnh cơn đói) và gói thêm 0.25 phần lương lành mang về!`;
            } else {
              state.xuSat += 2;
              rewardMsg = `Bạn làm việc chăm chỉ suốt hơn nửa giờ. ${npc.ten} hài lòng trả cho bạn 2 đồng xu sắt tiền công!`;
            }
            window.openNpcDialogue(npc, "root", rewardMsg);
            render();
          }
        });
      }

      // 2. Tương tác đặc thù theo từng nghề của NPC
      if (roleCat === "smith") {
        if (!state.persona.co_riu) {
          options.push({
            label: `🪓 Đặt rèn một chiếc Rìu sắt đốn củi (-6 Xu sắt · Mở khóa Đốn gỗ & Bổ củi)`,
            action: () => {
              if (state.xuSat < 6) {
                window.openNpcDialogue(npc, "topic_work", `${npc.ten} chỉ vào đống phôi thép:\n"Sắt vùng biên đang đắt đỏ, phải đủ 6 đồng xu sắt ${pro.npcSelf} mới rèn rìu cho ${pro.playerCall} được."`);
              } else {
                state.xuSat -= 6;
                state.persona.co_riu = true;
                window.openNpcDialogue(npc, "root", `${npc.ten} chọn một lưỡi rìu thép dày dạn vừa ra lò trao tận tay bạn. Từ nay bạn đã có Rìu sắt để đốn gỗ và bổ củi!`);
                render();
              }
            }
          });
        }
      }

      if (roleCat === "healer") {
        options.push({
          label: `🩺 Nhờ ${npc.ten} bắt mạch & Bốc thuốc chữa bệnh tại chỗ (-3 Xu sắt tiền dược liệu)`,
          action: () => {
            if (state.xuSat < 3) {
              window.openNpcDialogue(npc, "topic_work", `${npc.ten} thở dài:\n"Thảo dược quý trên rừng ngày càng hiếm, ${pro.playerCall} phụ thêm 3 đồng xu sắt tiền mua vị thuốc dẫn thì ${pro.npcSelf} mới sắc thuốc đặc trị được."`);
            } else {
              state.xuSat -= 3;
              advanceClock(20, false, false);
              if (state.benhTat && state.benhTat.length > 0) {
                if (Math.random() < 0.70) {
                  const cured = state.benhTat.pop();
                  state.sucKhoe = Math.min(100, state.sucKhoe + 10);
                  window.openNpcDialogue(npc, "root", `${npc.ten} bắt mạch kỹ lưỡng rồi châm cứu và cho bạn uống bát thuốc đắng nghét. Mồ hôi độc vã ra, chứng bệnh (${cured}) đã thuyên giảm hẳn!`);
                } else {
                  state.sucKhoe = Math.min(100, state.sucKhoe + 4);
                  window.openNpcDialogue(npc, "root", `${npc.ten}cố gắng điều chế thuốc cho bạn uống. Tuy người ấm lên (+4 Sức khỏe) nhưng gốc bệnh vẫn còn dai dẳng, cần uống thêm lần nữa.`);
                }
              } else {
                state.sucKhoe = Math.min(100, state.sucKhoe + 8);
                window.openNpcDialogue(npc, "root", `${npc.ten} bắt mạch thấy bạn chỉ suy nhược cơ thể nên bốc cho thang thuốc bổ (+8 Sức khỏe).`);
              }
              render();
            }
          }
        });
      }

      if (roleCat === "merchant") {
        options.push({
          label: `⚖️ Cầm cố / Đổi nhanh 1.0 Bó củi khô lấy 2 Xu sắt tiền mặt`,
          action: () => {
            if (state.cui < 1.0) {
              window.openNpcDialogue(npc, "topic_work", `${npc.ten} lắc đầu:\n"Cần có đủ 1.0 bó củi khô ráo thì ${pro.npcSelf} mới thu mua được."`);
            } else {
              state.cui = Number((state.cui - 1.0).toFixed(2));
              state.xuSat += 2;
              window.openNpcDialogue(npc, "root", `Bạn giao 1 bó củi khô cho ${npc.ten} và nhận ngay 2 đồng xu sắt.`);
              render();
            }
          }
        });
      }

      if (roleCat === "elder" && npc.co_the_hoa_giai_feud) {
        options.push({
          label: `🕊️ Nhờ đứng ra làm trung gian hòa giải các mối thù xích mích (-2 Xu lễ trà)`,
          action: () => {
            if (state.xuSat < 2) {
              window.openNpcDialogue(npc, "topic_work", `Cần 2 đồng xu sắt làm lễ trà nước để mời người lớn đi phân xử.`);
            } else {
              state.xuSat -= 2;
              Object.values(state.npcRelations).forEach(r => { if (r.feud_bac > 0) r.feud_bac = Math.max(0, r.feud_bac - 2); });
              if (typeof unlockAchievement === 'function') unlockAchievement("ACH_PEACEMAKER");
              window.openNpcDialogue(npc, "root", `${npc.ten} đích thân đi dàn xếp, giúp hóa giải êm đẹp các mối bất hòa quanh vùng!`);
              render();
            }
          }
        });
      }

      options.push({
        label: `↩️ Quay lại câu chuyện chính`,
        action: () => window.openNpcDialogue(npc, "root")
      });
    }

    // =======================================================================
    // NHÁNH F: BÁI SƯ & THỈNH GIÁO KIẾN THỨC CHUYÊN SÂU TỪ NPC (NHẬN XÉT 4 & 5)
    // =======================================================================
    else if (currentNode === "topic_learn") {
      if (rel.than_thien < 15) {
        mainText = `${npc.ten} xua tay:\n"Chỗ ${pro.npcSelf} với ${pro.playerCall} mới chỉ biết sơ qua, chưa đủ tin cậy để truyền dạy nghề ngỗng hay chữ nghĩa. Hãy chịu khó qua lại giúp đỡ nhau thêm đi đã! (Cần Thiện cảm cao hơn)"`;
      } else if (mem.learnedToday) {
        mainText = `${npc.ten} gật đầu bảo:\n"Hôm nay ${pro.npcSelf} đã chỉ điểm cho ${pro.playerCall} nhiều điều rồi. Hãy về nghiền ngẫm cho thấm đi, ngày mai hoặc dịp khác lại tới học tiếp!"`;
      } else {
        if (roleCat === "scholar") {
          options.push({
            label: `📚 Xin chỉ dạy Chữ nghĩa & Luật lệ điển chế (-10 Thể lực, -1 Xu giấy mực)`,
            action: () => {
              if (state.xuSat < 1 || state.theLuc < 12) {
                window.openNpcDialogue(npc, "topic_learn", `Bạn cần có ít nhất 1 đồng xu sắt mua giấy mực và đủ Thể lực để ngồi học.`);
                return;
              }
              mem.learnedToday = true;
              state.xuSat -= 1;
              state.theLuc = Math.max(0, state.theLuc - 10);
              state.hocVan.nhan_chu = Number((state.hocVan.nhan_chu + 0.14).toFixed(2));
              state.hocVan.luat_le = Number((state.hocVan.luat_le + 0.14).toFixed(2));
              if (state.hocVan.nhan_chu >= 1.0) state.persona.biet_chu = true;
              advanceClock(36, false, false);
              window.openNpcDialogue(npc, "root", `${npc.ten} tận tình giảng giải cho bạn từng nét chữ cổ và các điều luật trị quốc (+Chữ nghĩa, +Luật lệ).`);
              render();
            }
          });
        }

        if (roleCat === "merchant" || roleCat === "inn") {
          options.push({
            label: `🧮 Xin chỉ dạy Toán pháp, Sổ sách & Kinh tế thương trường (-10 Thể lực, -1 Xu lễ học)`,
            action: () => {
              if (state.xuSat < 1 || state.theLuc < 12) {
                window.openNpcDialogue(npc, "topic_learn", `Cần 1 đồng xu sắt lễ học và đủ Thể lực tỉnh táo.`);
                return;
              }
              mem.learnedToday = true;
              state.xuSat -= 1;
              state.theLuc = Math.max(0, state.theLuc - 10);
              state.hocVan.toan_phap = Number((state.hocVan.toan_phap + 0.18).toFixed(2));
              state.hocVan.kinh_te = Number((state.hocVan.kinh_te + 0.15).toFixed(2));
              state.buonBan = Number((state.buonBan + 0.12).toFixed(2));
              advanceClock(36, false, false);
              window.openNpcDialogue(npc, "root", `${npc.ten} bày bàn tính gỗ ra chỉ cho bạn cách nhẩm nhanh lãi lỗ và nhìn mặt hàng thật giả (+Toán pháp, +Kinh tế).`);
              render();
            }
          });
        }

        if (roleCat === "healer") {
          options.push({
            label: `🌿 Xin học nhận diện thảo dược & Y lý bốc thuốc trị bệnh (-10 Thể lực)`,
            action: () => {
              if (state.theLuc < 12) {
                window.openNpcDialogue(npc, "topic_learn", `Cơ thể bạn đang quá mệt không thể tập trung nhớ vị thuốc.`);
                return;
              }
              mem.learnedToday = true;
              state.theLuc = Math.max(0, state.theLuc - 10);
              state.hocVan.y_ly = Number((state.hocVan.y_ly + 0.22).toFixed(2));
              advanceClock(36, false, false);
              window.openNpcDialogue(npc, "root", `${npc.ten} đưa bạn xem từng chiếc lá thuốc phơi khô, chỉ rõ vị nào trị cảm hàn, vị nào trị đau bụng tà (+Y lý dân gian, tăng tỷ lệ tự sắc thuốc khỏi bệnh!).`);
              render();
            }
          });
        }

        if (roleCat === "military" || roleCat === "smith") {
          options.push({
            label: `⚔️ Xin chỉ điểm tư thế đứng tấn & Cận chiến thực chiến (-18 Thể lực, gây mỏi cơ)`,
            action: () => {
              if (state.theLuc < 20 || state.cangCo >= 55) {
                window.openNpcDialogue(npc, "topic_learn", `Gân cốt bạn đang mỏi nhừ hoặc thiếu thể lực, tập tiếp sẽ chấn thương ngay!`);
                return;
              }
              mem.learnedToday = true;
              state.theLuc = Math.max(0, state.theLuc - 18);
              state.cangCo = Math.min(100, (state.cangCo || 0) + 28);
              state.voNghe = Number((state.voNghe + 0.20).toFixed(2));
              advanceClock(42, false, false);
              window.openNpcDialogue(npc, "root", `${npc.ten} chỉnh lại từng thế đứng tấn và cách phát lực cổ tay cho bạn. Bắp thịt đau rát nhưng võ nghệ tiến bộ rõ rệt (+Võ nghệ)!`);
              render();
            }
          });
        }
      }

      options.push({
        label: `↩️ Quay lại câu chuyện chính`,
        action: () => window.openNpcDialogue(npc, "root")
      });
    }

    // Luôn có nút Cự cãi (khi ở menu gốc) và nút Chào tạm biệt đóng hộp thoại
    if (currentNode === "root" && rel.feud_bac < 4) {
      options.push({
        label: `💢 Nặng lời chất vấn / Tranh chấp quyền lợi với ${npc.ten}`,
        action: () => {
          rel.than_thien -= 25;
          rel.feud_bac = Math.min(4, rel.feud_bac + 1);
          window.openNpcDialogue(npc, "root", `Lời qua tiếng lại gay gắt khiến ${npc.ten} nổi giận đùng đùng! Mối thù giữa hai bên đã leo lên Bậc ${rel.feud_bac}!`);
          render();
        }
      });
    }

    options.push({
      label: `👋 Chắp tay cáo từ, khép lại cuộc trò chuyện`,
      action: () => {
        box.style.display = 'none';
        render();
      }
    });

    descEl.textContent = mainText;
    choicesEl.innerHTML = '';
    options.forEach(opt => {
      const btn = document.createElement('button');
      btn.className = 'btn-main-action';
      btn.innerHTML = '<span class="act-name">' + opt.label + '</span>';
      btn.onclick = opt.action;
      choicesEl.appendChild(btn);
    });

    box.style.display = 'block';
  };

  // Đặt lại cờ helpedToday / learnedToday của NPC khi bước sang ngày mới
  const prevAdvanceDialogue = advanceClock;
  advanceClock = function(minutes, markSmoke = false, isSleeping = false) {
    const prevDay = state.totalDaysPlayed;
    prevAdvanceDialogue(minutes, markSmoke, isSleeping);
    if (state.totalDaysPlayed > prevDay && state.npcMemory) {
      Object.values(state.npcMemory).forEach(m => {
        m.helpedToday = false;
        m.learnedToday = false;
      });
    }
  };
})();
