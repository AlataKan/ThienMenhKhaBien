// =========================================================================
// HỆ THỐNG LAN TRUYỀN CÓ NGÂN SÁCH (L1-L2-L3) & ĐƯỜNG DỰ BÁO SỐ PHẬN (docs/propagation.js)
// Tuân thủ Mục 10 (Đường dự báo số phận) & Mục 41 (Lan truyền có ngân sách)
// =========================================================================

const PROPAGATION_BUDGET_CFG = {
  ngan_sach_ms_moi_tick: 5,
  toi_da_tin_hoat_dong_moi_vung: 50,
  epsilon_dung: 0.01,
  gop_tin_trung_chu_de: true,
  buoc_truy_nguon_toi_da: 6,
  p_lo_moi_buoc: 0.08
};

// Danh sách các nút cộng đồng L2 trong vùng kích hoạt (Mục 41.1)
const L2_COMMUNITIES = [
  { id: "duong_lang", ten: "Làng Sậy Đỏ & Hiên Nhất Hỏa", ket_noi: ["nha", "ruong_chu_ap", "cho_ben_say"], he_so_lan: 0.35 },
  { id: "ruong_chu_ap", ten: "Cánh đồng Chủ Ấp", ket_noi: ["duong_lang", "bia_rung"], he_so_lan: 0.25 },
  { id: "cho_ben_say", ten: "Chợ Bến Sậy & Hội Phường", ket_noi: ["duong_lang", "quan_bon_nga", "kinh_hoai"], he_so_lan: 0.55 },
  { id: "quan_bon_nga", ten: "Quán trọ Bốn Ngả (Máy tin đồn)", ket_noi: ["cho_ben_say", "don_bien_ngan", "kinh_hoai"], he_so_lan: 0.75 },
  { id: "don_bien_ngan", ten: "Đồn Biên Ngạn & Xóm Lò Rèn", ket_noi: ["quan_bon_nga", "bia_rung", "kinh_hoai"], he_so_lan: 0.40 },
  { id: "kinh_hoai", ten: "Kinh đô Kinh Hoài & Nha Môn", ket_noi: ["cho_ben_say", "quan_bon_nga", "don_bien_ngan"], he_so_lan: 0.60 }
];

function hashSeedFloat(str) {
  let h = 2166136261 >>> 0;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return ((h >>> 0) % 10000) / 10000;
}

function ensurePropagationState() {
  if (!window.state) return;
  if (!Array.isArray(window.state.activeRumorsL2)) {
    window.state.activeRumorsL2 = [
      {
        id: "R_INIT_TAX",
        chu_de: "thue_khe",
        noi_dung: "Người thu thuế mùa này mang theo con dấu ba bên và kiểm tra gắt gao các bồ thóc lộ thiên.",
        nguon_goc: "NPC_THUONG_HO",
        chuoi_truyen: ["cho_ben_say", "quan_bon_nga"],
        tuoi_tin_ngay: 1,
        ttl_ngay: 20,
        l2_nodes: {
          quan_bon_nga: { ti_le_biet: 0.65, do_tin_trung_binh: 0.75 },
          cho_ben_say: { ti_le_biet: 0.50, do_tin_trung_binh: 0.70 },
          duong_lang: { ti_le_biet: 0.30, do_tin_trung_binh: 0.65 }
        },
        l1_cache: {}
      }
    ];
  }
  if (window.state.initialDangerDays === undefined) {
    const initForecast = simulateDestinyForecast();
    window.state.initialDangerDays = initForecast.ngay_nguy_hiem;
    window.state.currentDangerDays = initForecast.ngay_nguy_hiem;
  }
}

// MỤC 41.1 - 41.4: CHẠY LAN TRUYỀN L2 CÓ NGÂN SÁCH (<= 5ms/tick)
function stepBudgetedPropagation() {
  if (!window.state) return;
  ensurePropagationState();
  const tStart = performance.now();
  const rumors = window.state.activeRumorsL2;

  // Giới hạn số lượng tin hoạt động tối đa mỗi vùng = 50
  if (rumors.length > PROPAGATION_BUDGET_CFG.toi_da_tin_hoat_dong_moi_vung) {
    rumors.length = PROPAGATION_BUDGET_CFG.toi_da_tin_hoat_dong_moi_vung;
  }

  for (let i = rumors.length - 1; i >= 0; i--) {
    if (performance.now() - tStart > PROPAGATION_BUDGET_CFG.ngan_sach_ms_moi_tick) break;

    const r = rumors[i];
    r.tuoi_tin_ngay = (r.tuoi_tin_ngay || 0) + 0.25;
    if (r.tuoi_tin_ngay > (r.ttl_ngay || 25)) {
      rumors.splice(i, 1);
      continue;
    }

    let maxSignal = 0;
    L2_COMMUNITIES.forEach(comm => {
      const nodeState = r.l2_nodes[comm.id] || { ti_le_biet: 0, do_tin_trung_binh: 0 };
      comm.ket_noi.forEach(nbId => {
        const nb = r.l2_nodes[nbId];
        if (nb && nb.ti_le_biet * nb.do_tin_trung_binh >= PROPAGATION_BUDGET_CFG.epsilon_dung) {
          const transfer = nb.ti_le_biet * 0.12 * comm.he_so_lan;
          if (transfer > 0.005) {
            nodeState.ti_le_biet = Math.min(0.95, nodeState.ti_le_biet + transfer);
            nodeState.do_tin_trung_binh = Math.max(nodeState.do_tin_trung_binh, nb.do_tin_trung_binh * 0.94);
            if (r.chuoi_truyen.length < PROPAGATION_BUDGET_CFG.buoc_truy_nguon_toi_da && !r.chuoi_truyen.includes(comm.id)) {
              r.chuoi_truyen.push(comm.id);
            }
          }
        }
      });
      // Suy giảm tự nhiên theo thời gian
      nodeState.do_tin_trung_binh *= 0.985;
      r.l2_nodes[comm.id] = nodeState;
      const sig = nodeState.ti_le_biet * nodeState.do_tin_trung_binh;
      if (sig > maxSignal) maxSignal = sig;
    });

    // Dừng và dọn tin khi do_tin * ti_le_biet < epsilon_dung (0.01)
    if (maxSignal < PROPAGATION_BUDGET_CFG.epsilon_dung) {
      rumors.splice(i, 1);
    }
  }
}

// MỤC 31.1 & 41.4: THÊM HOẶC GỘP TIN ĐỒN MỚI VÀO MẠNG L2
window.createOrMergeRumorL2 = function(chuDe, noiDung, noiPhat, nguonId) {
  ensurePropagationState();
  const rumors = window.state.activeRumorsL2;
  if (PROPAGATION_BUDGET_CFG.gop_tin_trung_chu_de) {
    const existing = rumors.find(r => r.chu_de === chuDe);
    if (existing) {
      existing.noi_dung = noiDung;
      existing.tuoi_tin_ngay = 0;
      const node = existing.l2_nodes[noiPhat] || { ti_le_biet: 0.4, do_tin_trung_binh: 0.7 };
      node.ti_le_biet = Math.min(0.95, node.ti_le_biet + 0.35);
      node.do_tin_trung_binh = Math.min(0.95, node.do_tin_trung_binh + 0.15);
      existing.l2_nodes[noiPhat] = node;
      return existing;
    }
  }
  const newRumor = {
    id: "R_" + Date.now(),
    chu_de: chuDe,
    noi_dung: noiDung,
    nguon_goc: nguonId || "PLAYER",
    chuoi_truyen: [noiPhat],
    tuoi_tin_ngay: 0,
    ttl_ngay: 24,
    l2_nodes: {
      [noiPhat]: { ti_le_biet: 0.65, do_tin_trung_binh: 0.80 }
    },
    l1_cache: {}
  };
  rumors.unshift(newRumor);
  return newRumor;
};

// MỤC 41.2: LẤY MẪU THEO YÊU CẦU (LAZY SAMPLING) KHI GẶP NPC
window.sampleNpcRumorBeliefLazy = function(npcId, placeId) {
  ensurePropagationState();
  const rumors = window.state.activeRumorsL2;
  for (const r of rumors) {
    if (r.l1_cache[npcId] !== undefined) {
      if (r.l1_cache[npcId]) return r;
      continue;
    }
    const l2 = r.l2_nodes[placeId] || { ti_le_biet: 0.15, do_tin_trung_binh: 0.5 };
    const roll = hashSeedFloat((window.state.year || 45) + "_" + npcId + "_" + r.id);
    const knows = roll < l2.ti_le_biet;
    r.l1_cache[npcId] = knows;
    if (knows) return r;
  }
  return null;
};

// MỤC 41.3: TRUY NGUỒN LAZY (CHỈ TÍNH KHI CÓ ĐIỀU TRA, TỐI ĐA 6 BƯỚC)
window.traceRumorSourceLazy = function(rumor) {
  if (!rumor || !Array.isArray(rumor.chuoi_truyen)) return false;
  const steps = Math.min(PROPAGATION_BUDGET_CFG.buoc_truy_nguon_toi_da, rumor.chuoi_truyen.length);
  const pExpose = 1 - Math.pow(1 - PROPAGATION_BUDGET_CFG.p_lo_moi_buoc, steps);
  return Math.random() < pExpose;
};

// MỤC 10: MÔ PHỎNG NHANH ĐƯỜNG DỰ BÁO SỐ PHẬN (TÌM NGÀY NGUY HIỂM)
function simulateDestinyForecast() {
  if (!window.state || !window.state.persona) {
    return { ngay_nguy_hiem: null, trang_thai_van: "Chưa xác định.", an_toan: true };
  }
  let simDoi = window.state.doi;
  let simLanh = window.state.lanh;
  let simSK = window.state.sucKhoe;
  let simFood = window.state.luongLanh + window.state.hoGiauDo + window.state.luongMoc * 0.6 + (window.state.xuSat >= 2 ? Math.floor(window.state.xuSat / 2) * 0.6 : 0);
  let simCui = window.state.cui + window.state.goTho * 1.2;
  const isWinter = window.state.seasonIdx === 3;

  let dangerDay = null;
  for (let day = 1; day <= 20; day++) {
    // Mỗi ngày mô phỏng tiêu thụ thức ăn và củi dự trữ
    if (simFood >= 0.4) {
      simFood -= 0.4;
      simDoi = Math.max(20, simDoi - 10);
    } else {
      simDoi = Math.min(100, simDoi + 22);
    }

    if (isWinter) {
      if (simCui >= 0.6) {
        simCui -= 0.6;
        simLanh = Math.max(15, simLanh - 12);
      } else {
        simLanh = Math.min(100, simLanh + 20);
      }
    }

    if (simDoi >= 85) simSK -= 12;
    if (simLanh >= 80) simSK -= 10;
    if (window.state.benhTat && window.state.benhTat.length > 0) {
      simSK -= window.state.benhTat.length * 4;
    }

    if (simSK <= 0) {
      dangerDay = day;
      break;
    }
  }

  if (dangerDay !== null) {
    return {
      ngay_nguy_hiem: dangerDay,
      an_toan: false,
      trang_thai_van: "⚠️ Linh cảm sinh tồn (Mục 10): Nếu không kiếm thêm lương thực hoặc củi đốt, cơ thể bạn khó lòng trụ qua khoảng " + dangerDay + " ngày tới!"
    };
  }
  return {
    ngay_nguy_hiem: null,
    an_toan: true,
    trang_thai_van: "🕯️ Linh cảm sinh tồn (Mục 10): Nhờ lượng củi và lương thực tích trữ hiện tại, đường dự báo sinh mạng của bạn đã đẩy lùi nguy cơ đói lạnh trong suốt mùa này."
  };
}

// NỐI TỰ ĐỘNG VÀO GAME RUNTIME
if (typeof finalizeActionResult === "function") {
  const prevFinalizeProp = finalizeActionResult;
  finalizeActionResult = function(tpl, isPush, wasSlowed) {
    if (tpl && tpl.mau === "phao_tin_don_quan_ruou") {
      window.createOrMergeRumorL2(
        "tin_don_ban_ruou",
        "Khách qua Quán Bốn Ngả bàn tán về một người tên " + (window.state.persona ? window.state.persona.ten : "vô danh") + " rất trọng chữ tín và thông hiểu thời cuộc.",
        window.state.location,
        "PLAYER"
      );
    }
    prevFinalizeProp(tpl, isPush, wasSlowed);
    stepBudgetedPropagation();

    const forecast = simulateDestinyForecast();
    const prevDanger = window.state.currentDangerDays;
    window.state.currentDangerDays = forecast.ngay_nguy_hiem;

    // Khi đẩy lùi ngày nguy hiểm ra xa hoặc thoát hẳn ngưỡng chết -> Ghi nhận hệ quả cải mệnh (Mục 10)
    if (prevDanger !== null && (forecast.ngay_nguy_hiem === null || forecast.ngay_nguy_hiem > prevDanger + 3)) {
      const note = "Tích lũy củi và lương thực đẩy lùi dự báo chết đói/lạnh mùa Giá (Mục 10)";
      if (window.state.deltasGhiNhan && !window.state.deltasGhiNhan.includes(note)) {
        window.state.deltasGhiNhan.push(note);
      }
    }
  };
}

// Hiển thị Đường dự báo số phận (bằng lời) và Tin đồn Cộng đồng L2 trong Modal Quan hệ
const btnSocProp = document.getElementById("btnOpenSocial");
if (btnSocProp) {
  const prevSocialClick = btnSocProp.onclick;
  btnSocProp.onclick = function() {
    if (prevSocialClick) prevSocialClick();
    ensurePropagationState();
    const forecast = simulateDestinyForecast();
    const l2Here = window.state.activeRumorsL2.map(r => {
      const node = r.l2_nodes[window.state.location] || { ti_le_biet: 0.1, do_tin_trung_binh: 0.4 };
      const spreadDesc = node.ti_le_biet >= 0.5 ? "Lan rộng khắp nơi" : (node.ti_le_biet >= 0.25 ? "Nhiều người rỉ tai" : "Mới manh nha");
      return '<div style="font-size:13px; color:#d8c398; margin-bottom:4px;">• "' + r.noi_dung + '" <em>(' + spreadDesc + ' · Chuỗi truyền: ' + r.chuoi_truyen.length + '/6 nút)</em></div>';
    }).join("");

    const bodyEl = document.getElementById("modalBody");
    if (bodyEl) {
      const extraHtml =
        '<div style="background:#161d26; border:1px solid #334760; border-radius:6px; padding:10px 12px; margin-bottom:12px;">' +
        '<strong>🔮 Dự Báo Số Phận (Mục 10 - Ẩn con số):</strong><br/>' +
        '<span style="font-size:13.5px; color:' + (forecast.an_toan ? '#9ef0b6' : '#ff9e9e') + ';">' + forecast.trang_thai_van + '</span>' +
        '<hr style="border-color:#263345; margin:8px 0;"/>' +
        '<strong>🗣️ Tin Đồn Đang Lan Truyền Tại Nút Cộng Đồng L2 (Mục 41):</strong><br/>' +
        (l2Here || '<span style="font-size:13px; color:#8490a6;">Chưa có lời đồn mới nào vượt ngưỡng.</span>') +
        '</div>';
      bodyEl.innerHTML = extraHtml + bodyEl.innerHTML;
    }
  };
}
