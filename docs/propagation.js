// =========================================================================
// HỆ THỐNG LAN TRUYỀN TIN ĐỒN CÓ NGÂN SÁCH (L1-L2-L3) - docs/propagation.js
// Đã sửa lỗi tham chiếu let state và ẩn hoàn toàn dự báo tương lai (Mục 35 & 41)
// =========================================================================

const PROPAGATION_BUDGET_CFG = {
  ngan_sach_ms_moi_tick: 5,
  toi_da_tin_hoat_dong_moi_vung: 50,
  epsilon_dung: 0.01,
  gop_tin_trung_chu_de: true,
  buoc_truy_nguon_toi_da: 6,
  p_lo_moi_buoc: 0.08
};

const L2_COMMUNITIES = [
  { id: "duong_lang", ten: "Làng Sậy Đỏ & Hiên Nhất Hỏa", ket_noi: ["nha", "ruong_chu_ap", "cho_ben_say"], he_so_lan: 0.35 },
  { id: "ruong_chu_ap", ten: "Cánh đồng Chủ Ấp", ket_noi: ["duong_lang", "bia_rung"], he_so_lan: 0.25 },
  { id: "cho_ben_say", ten: "Chợ Bến Sậy & Hội Phường", ket_noi: ["duong_lang", "quan_bon_nga", "kinh_hoai"], he_so_lan: 0.55 },
  { id: "quan_bon_nga", ten: "Quán trọ Bốn Ngả", ket_noi: ["cho_ben_say", "don_bien_ngan", "kinh_hoai"], he_so_lan: 0.75 },
  { id: "don_bien_ngan", ten: "Đồn Biên Ngạn", ket_noi: ["quan_bon_nga", "bia_rung", "kinh_hoai"], he_so_lan: 0.40 },
  { id: "kinh_hoai", ten: "Kinh đô Kinh Hoài", ket_noi: ["cho_ben_say", "quan_bon_nga", "don_bien_ngan"], he_so_lan: 0.60 }
];

function getGameStateRef() {
  if (typeof state !== "undefined" && state) return state;
  if (typeof window !== "undefined" && window.state) return window.state;
  return null;
}

function ensurePropagationState() {
  const st = getGameStateRef();
  if (!st) return null;
  window.state = st; // Đồng bộ tham chiếu toàn cục
  if (!Array.isArray(st.activeRumorsL2)) {
    st.activeRumorsL2 = [
      {
        id: "R_INIT_TAX",
        chu_de: "thue_khe",
        noi_dung: "Khách qua đường rỉ tai nhau rằng kỳ thu thuế mùa này rơi vào ngày 13 đến 15, ai để thóc ngoài sân dễ bị thu sạch.",
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
  return st;
}

function stepBudgetedPropagation() {
  const st = ensurePropagationState();
  if (!st || !Array.isArray(st.activeRumorsL2)) return;

  const tStart = performance.now();
  const rumors = st.activeRumorsL2;

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
      nodeState.do_tin_trung_binh *= 0.985;
      r.l2_nodes[comm.id] = nodeState;
      const sig = nodeState.ti_le_biet * nodeState.do_tin_trung_binh;
      if (sig > maxSignal) maxSignal = sig;
    });

    if (maxSignal < PROPAGATION_BUDGET_CFG.epsilon_dung) {
      rumors.splice(i, 1);
    }
  }
}

window.createOrMergeRumorL2 = function(chuDe, noiDung, noiPhat, nguonId) {
  const st = ensurePropagationState();
  if (!st) return null;
  const rumors = st.activeRumorsL2;
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
