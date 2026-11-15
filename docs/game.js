// =========================================================================
// 1. ÂM THANH TẢ THỰC (ĐẦY ĐỦ HIỆU ỨNG GÕ CỬA, CHÓ SỦA, TIM ĐẬP - KHÔNG ÂM THOÁT NẠN)
// =========================================================================
const SoundFX = {
  ctx: null,
  muted: false,
  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
  },
  playChop() {
    if (this.muted) return; this.init(); if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(135, now);
    osc.frequency.exponentialRampToValueAtTime(38, now + 0.11);
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(now); osc.stop(now + 0.12);
  },
  playFire() {
    if (this.muted) return; this.init(); if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const bufferSize = this.ctx.sampleRate * 0.18;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (bufferSize * 0.4));
    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass'; filter.frequency.value = 1200;
    const gain = this.ctx.createGain(); gain.gain.value = 0.2;
    noise.connect(filter); filter.connect(gain); gain.connect(this.ctx.destination);
    noise.start(now);
  },
  playSoftStep() {
    if (this.muted) return; this.init(); if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(95, now);
    osc.frequency.exponentialRampToValueAtTime(45, now + 0.07);
    gain.gain.setValueAtTime(0.14, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.08);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(now); osc.stop(now + 0.08);
  },
  playDoorKnock() {
    if (this.muted) return; this.init(); if (!this.ctx) return;
    [0, 0.18, 0.36].forEach(offset => {
      const now = this.ctx.currentTime + offset;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'square';
      osc.frequency.setValueAtTime(110, now);
      osc.frequency.exponentialRampToValueAtTime(42, now + 0.09);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(now); osc.stop(now + 0.1);
    });
  },
  playDogBark() {
    if (this.muted) return; this.init(); if (!this.ctx) return;
    [0, 0.22].forEach(offset => {
      const now = this.ctx.currentTime + offset;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(190, now);
      osc.frequency.linearRampToValueAtTime(280, now + 0.05);
      osc.frequency.exponentialRampToValueAtTime(85, now + 0.18);
      gain.gain.setValueAtTime(0.28, now);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 0.19);
      osc.connect(gain); gain.connect(this.ctx.destination);
      osc.start(now); osc.stop(now + 0.19);
    });
  },
  playHeartbeat() {
    if (this.muted) return; this.init(); if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(60, now);
    osc.frequency.exponentialRampToValueAtTime(32, now + 0.14);
    gain.gain.setValueAtTime(0.28, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.15);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(now); osc.stop(now + 0.15);
  },
  playReincarnate() {
    if (this.muted) return; this.init(); if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(110, now);
    osc.frequency.exponentialRampToValueAtTime(55, now + 1.4);
    gain.gain.setValueAtTime(0.24, now);
    gain.gain.exponentialRampToValueAtTime(0.005, now + 1.45);
    osc.connect(gain); gain.connect(this.ctx.destination);
    osc.start(now); osc.stop(now + 1.45);
  }
};

// =========================================================================
// 2. TRẠNG THÁI TRÒ CHƠI & CÔNG THỨC CỐT LÕI (ĐỐI CHIẾU MỤC 34, 36, 43, 47, 52)
// =========================================================================
const CLASS_RARITY_WEIGHTS = {
  nong_no_ruong_dat: 1.0,
  nong_dan_tu_do: 1.0,
  ke_ngoai_le: 1.0,
  tho_thu_cong: 0.8,
  thuong_nhan_thi_dan: 0.6,
  giao_si: 0.5,
  ky_si_quan_nhan: 0.4,
  quan_lai: 0.3,
  lanh_chua_vung: 0.2,
  thien_menh_chi_tu: 0.1
};

let state = {
  persona: null,
  authenticMode: false,
  isWorking: false,
  isDead: false,
  location: "nha",
  cuaCaiThen: false,
  vachRach: true,
  maiVung: false,
  bepConKhoi: false,
  daVaoHoiPhuong: false,
  daKetHon: false,
  soCon: 0,
  coBangChung: 0,
  kyVat: [],
  benhTat: [],
  deltasGhiNhan: [],
  macroDeltaMod: { no_khe: 0, do_rong_kho: 0, cang_thang_bach_linh: 0, to_chuc_tam_giang: 0 },
  macroPriceSpike: 1.0,
  coDuoc: 0,
  hoGiauDo: 0.0,
  thaoDuoc: 0,
  doDanLat: 0,
  hangBuon: 0,
  xuSat: 3,
  nuocSach: 2,
  triThuc: 0,
  voNghe: 0,
  buonBan: 0,
  rep: { danh_du: 10, tin_nhiem_tm: 5, tin_nhiem_tg: 5, tieng_xau: 0, uy_quyen: 0 },
  npcRelations: {},
  hour: 8,
  dayInSeason: 10,
  seasonIdx: 3,
  year: 45,
  totalDaysPlayed: 0,
  lastTaxSeasonKey: "",
  lastDangerDay: -10,
  lastFulfilledClass: null,
  theLuc: 80,
  sucKhoe: 85,
  doi: 45,
  lanh: 40,
  chan: 10,
  cui: 1.2,
  goTho: 0.0,
  luongLanh: 0.9,
  luongMoc: 0.4,
  amAnhDoi: 0,
  actionsTaken: 0,
  recentHistory: [],
  activeCategory: 'Tất cả',
  whisperDeck: []
};

let freneticInterval = null;
let tiers = {};
let rawVanDong = 60;
let selectedStartMode = false;

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function nextFromDeck(deckKey, sourcePool) {
  if (!state[deckKey] || state[deckKey].length === 0) {
    state[deckKey] = shuffleArray(sourcePool);
  }
  return state[deckKey].pop();
}

function getLifeStageByAge(tuoi) {
  if (tuoi <= 2) return 'so_sinh';
  if (tuoi <= 6) return 'au_nhi';
  if (tuoi <= 12) return 'thieu_nhi';
  if (tuoi <= 17) return 'thieu_nien';
  if (tuoi <= 44) return 'truong_thanh';
  if (tuoi <= 60) return 'trung_nien';
  return 'gia';
}

function getCurrentEra(year) {
  return HOAI_DUONG_ERAS.find(e => year >= e.minY && year <= e.maxY) || HOAI_DUONG_ERAS[0];
}

function computeMacroVariables(year) {
  const t = Math.max(0, Math.min(200, year)) / 200;
  const mod = state.macroDeltaMod || { no_khe: 0, do_rong_kho: 0, cang_thang_bach_linh: 0, to_chuc_tam_giang: 0 };
  return {
    no_khe: Number(Math.max(0.2, 0.6 + t * 1.4 + mod.no_khe).toFixed(2)),
    do_rong_kho: Number(Math.max(0, Math.min(0.9, t * 0.8 + mod.do_rong_kho)).toFixed(2)),
    bat_man_tam_giang: Number(Math.min(0.95, 0.45 + t * 0.45).toFixed(2)),
    to_chuc_tam_giang: Number(Math.min(0.9, 0.05 + t * 0.5 + mod.to_chuc_tam_giang).toFixed(2)),
    cang_thang_bach_linh: Number(Math.max(0.05, Math.min(0.95, 0.15 + Math.sin(year / 18) * 0.25 + t * 0.55 + mod.cang_thang_bach_linh)).toFixed(2)),
    ran_nut_hoa_duong: Number(Math.min(0.85, 0.05 + t * 0.7).toFixed(2)),
    su_that_ro: Number(Math.min(0.5, 0.02 + t * 0.25).toFixed(2))
  };
}

function getPlayerReachLevel() {
  const gc = state.persona ? state.persona.giai_cap : '';
  if (gc === 'quan_lai' || gc === 'ky_si_quan_nhan') {
    return { cap: 3, ten: 'Cấp Huyện & Biên ải (Tác động được chính sự vùng và quân ngũ)' };
  }
  if (state.daVaoHoiPhuong || gc === 'thuong_nhan_thi_dan' || state.xuSat >= 15) {
    return { cap: 2, ten: 'Cấp Chợ phiên & Thương hội (Tác động được giao thương và tin tức)' };
  }
  return { cap: 1, ten: 'Cấp Làng xóm (Chỉ tác động được gia đình và người quanh xóm)' };
}

function initNpcRelations() {
  state.npcRelations = {};
  NPCS_DB.forEach(npc => {
    state.npcRelations[npc.id] = {
      than_thien: npc.than_thien_goc,
      feud_bac: 0,
      dong_loa: false
    };
  });
}

function getReputationTitle() {
  const r = state.rep;
  if (r.tieng_xau >= 40) return "Tiếng tăm: Kẻ Có Tiếng Xấu Ngoài Lề";
  if (r.uy_quyen >= 40) return "Danh hiệu: Người Có Uy Quyền";
  if (r.tin_nhiem_tm >= 35) return "Danh hiệu: Bạn Hàng Giữ Chữ Tín";
  if (r.tin_nhiem_tg >= 35) return "Danh hiệu: Tín Đồ Mộ Đạo";
  if (r.danh_du >= 35) return "Danh hiệu: Kẻ Giữ Lời";
  return "Tiếng tăm: Dân thường vô danh";
}

function computeLieDetectionProb(npc) {
  const muc = state.persona.nhay_ben_xh || 50;
  const d = (muc - 50) / 50;
  const p = 0.3 + 0.3 * d * 0.85 + 0.2 * (state.buonBan / 10) - 0.2 * ((npc.tai_an_noi - 50) / 50);
  return Math.max(0.05, Math.min(0.9, p));
}

// MỤC 36.1 & 43.5: TÍNH BẬC NĂNG LỰC 0-5 CÓ NHÂN HỆ SỐ SUY GIẢM DO BỆNH TẬT
function calcTiers(p) {
  tiers = {};
  p.giai_doan = getLifeStageByAge(p.tuoi);

  let diseasePenalty = 1.0;
  if (state.benhTat && state.benhTat.length > 0) {
    if (state.benhTat.includes('cam_lanh')) diseasePenalty *= 0.80;
    if (state.benhTat.includes('dau_bung')) diseasePenalty *= 0.75;
    if (state.benhTat.includes('ho_suong')) diseasePenalty *= 0.65;
  }

  for (const [k, cfg] of Object.entries(CONFIG.f_tuoi)) {
    if (k === 'thi_giac' && p.mu) { tiers[k] = 0; continue; }
    const age = Math.max(0.2, p.tuoi);
    const fTang = Math.min(1, Math.pow(age / cfg.tuoi_dinh, cfg.q));
    const fGiam = p.tuoi <= cfg.tuoi_suy ? 1 : Math.max(cfg.san_gia, 1 / (1 + Math.pow((p.tuoi - cfg.tuoi_suy) / (cfg.tuoi_nua - cfg.tuoi_suy), cfg.p)));
    const haoMon = (k === 'suc_manh' || k === 'van_dong') ? (p.hao_mon || 0) : 0;
    const benhMod = (k === 'van_dong' || k === 'suc_manh' || k === 'chiu_dung') ? diseasePenalty : 1.0;
    const val = Math.max(5, 65 * fTang * fGiam * (1 - haoMon) * benhMod);
    if (k === 'van_dong') rawVanDong = val;
    tiers[k] = Math.max(0, Math.min(5, Math.floor(val / 20)));
  }
}

function getTravelMinutes(fromId, toId) {
  if (fromId === toId) return { minutes: 0, reasons: [] };
  const base = (BASE_DIST_MINUTES[fromId] && BASE_DIST_MINUTES[fromId][toId]) || 15;
  let mult = 1.0;
  const reasons = [];

  if (rawVanDong < 35) { mult *= 1.45; reasons.push("chân yếu/lão hóa"); }
  else if (rawVanDong < 50) { mult *= 1.2; reasons.push("bước chân nhỏ"); }
  else if (state.voNghe >= 4) { mult *= 0.85; reasons.push("khinh thân nhanh nhẹn"); }

  if (state.persona && state.persona.mu) { mult *= 1.35; reasons.push("dò đường"); }
  if (state.theLuc <= 28 || state.doi >= 72) { mult *= 1.35; reasons.push("đói mệt"); }
  if (state.benhTat && state.benhTat.length > 0) { mult *= 1.25; reasons.push("đang mang bệnh"); }

  const isNight = state.hour >= 18 || state.hour < 6;
  if (isNight && state.coDuoc <= 0) { mult *= 1.25; reasons.push("đêm tối"); }

  return { minutes: Math.max(4, Math.round(base * mult)), reasons };
}

function setScreenVignette(mode) {
  const vig = document.getElementById('screenVignette');
  vig.className = 'screen-vignette ' + (mode || '');
  if (mode === 'relief') {
    setTimeout(() => {
      if (vig.classList.contains('relief')) vig.className = 'screen-vignette';
    }, 2200);
  }
}

function playReincarnationTransition(quoteText, callback) {
  SoundFX.playReincarnate();
  const curtain = document.getElementById('transitionCurtain');
  const txt = document.getElementById('transitionText');
  txt.textContent = quoteText;
  curtain.classList.add('show');
  setTimeout(() => {
    if (callback) callback();
    setTimeout(() => {
      curtain.classList.remove('show');
    }, 550);
  }, 1150);
}

function advanceClock(minutes, markSmoke = false, isSleeping = false) {
  const hours = minutes / 60;
  const prevHour = state.hour;
  state.hour += hours;

  if (markSmoke) state.bepConKhoi = true;
  else if (hours >= 1.5) state.bepConKhoi = false;

  const era = getCurrentEra(state.year);
  state.doi = Math.min(100, state.doi + hours * (isSleeping ? 1.1 : 2.0) * (era.he_so_doi || 1.0));
  const isNight = (prevHour >= 18 || prevHour < 6);
  const outdoorPenalty = (state.location === 'bia_rung' || state.location === 'ruong_chu_ap') ? 1.35 : 1.0;
  const wallLeakPenalty = (state.location === 'nha' && state.vachRach) ? 1.2 : 0.8;

  if (state.seasonIdx === 3 && !isSleeping) {
    state.lanh = Math.min(100, state.lanh + hours * (isNight ? 3.5 : 1.5) * outdoorPenalty * wallLeakPenalty);
  }

  if (state.hour >= 24) {
    const days = Math.floor(state.hour / 24);
    state.hour = state.hour % 24;
    state.dayInSeason += days;
    state.totalDaysPlayed += days;
    state.bepConKhoi = false;

    for (let i = 0; i < days; i++) {
      if (state.rep.tieng_xau > 0) state.rep.tieng_xau = Math.max(0, state.rep.tieng_xau - 1);

      if (state.luongLanh > 0.4) {
        const spoiledAmt = Math.min(state.luongLanh, 0.1);
        state.luongLanh = Math.max(0, state.luongLanh - spoiledAmt);
        state.luongMoc += spoiledAmt;
      }

      if (state.lanh >= 75 && !state.benhTat.includes('cam_lanh') && Math.random() < 0.45) {
        state.benhTat.push('cam_lanh');
      }
      if (state.seasonIdx === 3 && (state.location === 'cho_ben_say' || state.location === 'kinh_hoai') && !state.benhTat.includes('ho_suong') && Math.random() < 0.12) {
        state.benhTat.push('ho_suong');
      }
      if (state.benhTat.length > 0) {
        state.sucKhoe = Math.max(0, state.sucKhoe - state.benhTat.length * 4);
      }

      if (state.location === 'nha' && state.cui >= 0.6) {
        state.cui = Math.max(0, state.cui - 0.6);
        state.lanh = Math.max(10, state.lanh - 24);
      } else if (state.seasonIdx === 3 && state.location !== 'quan_bon_nga') {
        state.lanh = Math.min(100, state.lanh + 18);
        state.sucKhoe = Math.max(0, state.sucKhoe - 8);
      }
      if (state.doi >= 88) {
        state.sucKhoe = Math.max(0, state.sucKhoe - 9);
      }
    }

    if (state.dayInSeason > 15) {
      state.dayInSeason = 1;
      state.seasonIdx = (state.seasonIdx + 1) % 4;
      if (state.seasonIdx === 0) {
        state.year++;
        state.persona.tuoi++;
      }
    }
    calcTiers(state.persona);
  }

  if ((state.doi >= 80 || state.lanh >= 80) && state.amAnhDoi < 70) {
    state.amAnhDoi = 75;
  }

  if (state.sucKhoe <= 0 && !state.isDead) {
    state.isDead = true;
    showEndOfLifeChronicle("Hơi thở cuối cùng tắt lịm vì cơ thể đã cạn kiệt sinh lực.");
  }
}

// =========================================================================
// 3. KIỂM TRA ĐIỀU KIỆN & XẾP HẠNG MENU THEO NHU CẦU + ÁM ẢNH (MỤC 7.2 & 29.3)
// =========================================================================
function checkActionAvailability(p, tpl) {
  const isNight = state.hour >= 18 || state.hour < 6;
  const missing = [];

  if (tpl.yeu_cau_gio_dem && !isNight) {
    missing.push("Chỉ ngủ qua đêm từ 18h00 tối đến 05h00 sáng (Hiện tại: " + Math.floor(state.hour) + "h00)");
  }

  for (const [ab, minT] of Object.entries(tpl.yeu_cau || {})) {
    if ((tiers[ab] ?? 0) < minT) {
      const abNames = { van_dong: "Vận động", suc_manh: "Sức mạnh", tay_kheo: "Khéo tay", thi_giac: "Thị giác (Mắt sáng)", thinh_giac: "Thính giác", noi: "Giọng nói", tri_nho: "Trí nhớ" };
      missing.push("Cơ thể không đáp ứng: cần " + (abNames[ab] || ab) + " bậc ≥ " + minT);
    }
  }

  const rc = tpl.req_check;
  if (rc) {
    if (rc.luong_lanh && state.luongLanh < rc.luong_lanh) missing.push("Cần ≥ " + rc.luong_lanh + " Lương lành (Hiện có " + state.luongLanh.toFixed(1) + ")");
    if (rc.luong_moc && state.luongMoc < rc.luong_moc) missing.push("Cần ≥ " + rc.luong_moc + " Lương mốc (Hiện có " + state.luongMoc.toFixed(1) + ")");
    if (rc.nuoc && state.nuocSach < rc.nuoc) missing.push("Cần ≥ " + rc.nuoc + " Gáo nước sạch (Ra Đường làng kéo nước giếng)");
    if (rc.cui && state.cui < rc.cui) missing.push("Cần ≥ " + rc.cui + " Bó củi khô (Hiện có " + state.cui.toFixed(1) + ")");
    if (rc.go_tho && state.goTho < rc.go_tho) missing.push("Cần ≥ " + rc.go_tho + " Gỗ thô (Lên Rừng Đen đốn gỗ)");
    if (rc.co_riu && !p.co_riu) missing.push("Cần có Rìu sắt");
    if (rc.do_dan_lat && state.doDanLat < rc.do_dan_lat) missing.push("Cần ≥ 1 Đồ đan lát (Đan ở Nhà)");
    if (rc.thao_duoc && state.thaoDuoc < rc.thao_duoc) missing.push("Cần ≥ 1 Thảo dược (Hái trên Rừng Đen)");
    if (rc.hang_buon && state.hangBuon < rc.hang_buon) missing.push("Cần ≥ 1 Kiện hàng quê (Mua ở Chợ Bến Sậy)");
    if (rc.xu_sat && state.xuSat < rc.xu_sat) missing.push("Cần ≥ " + rc.xu_sat + " Xu sắt (Hiện có " + state.xuSat + " xu)");
    if (rc.ban_ngay && isNight) missing.push("Cần ánh sáng ban ngày (06h00 – 18h00)");
    if (rc.ho_chua_day && state.hoGiauDo >= 2.0) missing.push("Hố giấu đã đầy (2.0 phần)");
    if (rc.co_do_trong_ho && state.hoGiauDo <= 0.05) missing.push("Hố giấu đang trống (0.0 phần)");
    if (rc.biet_chu && !p.biet_chu) missing.push("Cần Biết chữ (Học ở hiên Nhất Hỏa đạt 3 điểm Tri thức)");
    if (rc.tri_thuc_min && state.triThuc < rc.tri_thuc_min) missing.push("Cần Tri thức ≥ " + rc.tri_thuc_min + " (Hiện có " + state.triThuc + ")");
    if (rc.vo_nghe_min && state.voNghe < rc.vo_nghe_min) missing.push("Cần Võ nghệ ≥ " + rc.vo_nghe_min + " (Hiện có " + state.voNghe + ")");
    if (rc.buon_ban_min && state.buonBan < rc.buon_ban_min) missing.push("Cần Kinh nghiệm buôn bán ≥ " + rc.buon_ban_min);
    if (rc.khong_tieng_xau_nang && state.rep.tieng_xau >= 40) missing.push("Bị từ chối vì đang mang Tiếng xấu tội phạm");
    if (rc.tuoi_18 && p.tuoi < 18) missing.push("Chỉ được kết hôn khi đủ 18 tuổi trở lên (Hiện tại: " + p.tuoi + " tuổi)");
    if (rc.chua_ket_hon && state.daKetHon) missing.push("Bạn đã lập gia đình rồi");
    if (rc.da_ket_hon && !state.daKetHon) missing.push("Cần lập gia đình trước (Nhờ làm mối ở Đường làng)");
    if (rc.co_ky_vat && (!state.kyVat || state.kyVat.length === 0)) missing.push("Cần nắm giữ ít nhất 1 Kỷ vật cũ (Chuộc ở tiệm cầm đồ Chợ Bến Sậy)");
    if (rc.tam_voi_cap_2 && getPlayerReachLevel().cap < 2) missing.push("Tầm với chưa đủ (Hãy vào Hội Phường, tích ≥15 xu, hoặc đỗ Chức Sự / Kiếm Điền)");
    if (rc.co_bang_chung_hoac_ky_vat && state.coBangChung <= 0 && (!state.kyVat || state.kyVat.length === 0)) {
      missing.push("Cần có Bằng chứng sổ sách (chép sách ở Kinh Hoài) hoặc Kỷ vật lưu truyền");
    }
  }

  return { canRun: missing.length === 0, missingText: missing.join(" · ") };
}

function scoreActionPriority(p, tpl) {
  let score = 20;
  const tags = tpl.tag || [];
  if (tags.includes('sinh_ton')) {
    if (state.doi >= 60 || state.lanh >= 60) score += 45;
    if (state.amAnhDoi > 0) score += (state.amAnhDoi / 100) * 3.0 * 15; // Mục 29.3: he_so_keo tối đa 3.0
  }
  if (tags.includes('nghi_ngoi') && state.theLuc <= 35) score += 40 + (p.luoi || 30) * 0.3;
  if (tags.includes('muu_sinh') && state.amAnhDoi > 0) score += (state.amAnhDoi / 100) * 25;
  if (tags.includes('doi_doi')) score += 15;
  return score;
}

function getActionsForCurrentPlace(p) {
  const list = ACTIONS.filter(tpl => {
    if (!tpl.tai_noi || !tpl.tai_noi.includes(state.location)) return false;
    if (!tpl.giai_doan.includes(p.giai_doan)) return false;
    if (tpl.chi_hien_khi_vach_rach && !state.vachRach) return false;
    if (tpl.chi_hien_khi_mai_yeu && state.maiVung) return false;
    if (tpl.chi_hien_khi_nong_no && p.giai_cap !== 'nong_no_ruong_dat') return false;
    if (tpl.chi_hien_khi_chua_vao_hoi && state.daVaoHoiPhuong) return false;
    if (tpl.can_nguoi && !p.nguoi.includes(tpl.can_nguoi)) return false;
    return true;
  }).map(tpl => {
    const status = checkActionAvailability(p, tpl);
    return { tpl, canRun: status.canRun, missingText: status.missingText, score: scoreActionPriority(p, tpl) };
  });

  if (p.giai_doan !== 'so_sinh') {
    const npcsHere = NPCS_DB.filter(n => n.tai_noi === state.location);
    npcsHere.forEach(npc => {
      const rel = state.npcRelations[npc.id] || { than_thien: 0, feud_bac: 0, dong_loa: false };
      const feudText = rel.feud_bac > 0 ? (" · ⚡ Mối thù Bậc " + rel.feud_bac) : "";
      const allyText = rel.dong_loa ? " · 🤝 Đồng lõa" : "";
      list.push({
        tpl: {
          mau: "talk_" + npc.id,
          ten_vi: "💬 Trò chuyện & Tương tác với " + npc.ten + " (" + npc.vai + ")",
          nhom: "👥 Giao tiếp NPC",
          thoi_luong_mo: "một chốc",
          is_npc_dialogue: true,
          npc_ref: npc,
          tag: ["ban_nang"]
        },
        canRun: true,
        missingText: "Thái độ: " + (rel.than_thien >= 25 ? "Thân thiết" : (rel.than_thien < 0 ? "Lạnh nhạt/Đề phòng" : "Bình thường")) + feudText + allyText,
        score: 25
      });
    });
  }

  return list.sort((a, b) => {
    if (a.canRun !== b.canRun) return a.canRun ? -1 : 1;
    return b.score - a.score;
  });
}

// =========================================================================
// 4. HỘI THOẠI NPC, TÁCH FACT/BELIEF & TỐNG TIỀN / MỐI THÙ (GIAI ĐOẠN 6)
// =========================================================================
function openNpcDialogue(npc) {
  if (state.isWorking || freneticInterval || state.isDead) return;
  SoundFX.playSoftStep();
  const rel = state.npcRelations[npc.id];
  const box = document.getElementById('freneticBox');
  const titleEl = document.getElementById('freneticTitle');
  const timerEl = document.getElementById('freneticTimer');
  const descEl = document.getElementById('freneticDesc');
  const choicesEl = document.getElementById('freneticChoices');

  box.className = 'frenetic-overlay dialogue-mode';
  titleEl.textContent = "💬 ĐỐI THOẠI: " + npc.ten.toUpperCase() + " (" + npc.vai + ")";
  timerEl.textContent = rel.feud_bac > 0 ? ("⚡ Thù Bậc " + rel.feud_bac) : (rel.dong_loa ? "🤝 Đồng lõa" : "");

  const statement = (rel.than_thien >= 30 || !npc.dang_noi_doi) ? npc.loi_noi_that : npc.loi_noi_doi;
  let lieHint = "";
  if (npc.dang_noi_doi && rel.than_thien < 30) {
    const pDetect = computeLieDetectionProb(npc);
    if (Math.random() < pDetect) {
      lieHint = "\n\n👁️ [Nhạy bén xã hội phát hiện]: Ánh mắt và nhịp thở của " + npc.ten + " thoáng khựng lại — trực giác mách bảo bạn người này đang nói điều mà chính ông ta cũng không tin!";
    }
  }

  descEl.textContent = "\"" + statement + "\"" + lieHint;
  choicesEl.innerHTML = '';

  const options = [
    {
      label: "🤝 Hỏi thăm lễ phép & Giúp việc nhỏ (+Thiện cảm, nghe thêm lời thật)",
      action: () => {
        box.style.display = 'none';
        rel.than_thien = Math.min(100, rel.than_thien + 15);
        state.rep.danh_du += 3;
        advanceClock(12, false, false);
        updateCenterStage(
          "Bạn cư xử lễ độ và phụ giúp " + npc.ten + " một tay. Thái độ của họ ấm dần lên và chia sẻ thêm cho bạn:\n\"" + npc.loi_noi_that + "\"",
          [{ label: "🤝 Thiện cảm tăng với " + npc.ten, type: "gain" }]
        );
        render();
      }
    }
  ];

  if (npc.co_the_hoa_giai_feud) {
    options.push({
      label: "🕊️ Nhờ Trưởng làng đứng ra hòa giải các mối thù xích mích trong vùng (-2 Xu lễ trà)",
      action: () => {
        box.style.display = 'none';
        if (state.xuSat < 2) {
          updateCenterStage("Bạn cần có 2 đồng xu sắt làm lễ trà nước để nhờ trưởng làng đi hòa giải.", [{ label: "🔒 Cần 2 Xu sắt", type: "warn" }]);
        } else {
          state.xuSat -= 2;
          Object.values(state.npcRelations).forEach(r => { if (r.feud_bac > 0) r.feud_bac = Math.max(0, r.feud_bac - 2); });
          updateCenterStage("Trưởng làng Ngô Tam đứng ra dàn xếp ổn thỏa, các mối bất hòa quanh vùng đều được hạ nhiệt!", [{ label: "🕊️ Đã hóa giải Mối thù (Feud)", type: "gain" }]);
        }
        render();
      }
    });
  }

  if (state.coBangChung > 0 && npc.co_the_tong_tien) {
    options.push({
      label: "📜 [Đòn bẩy] Đưa mảnh bằng chứng sổ sách ra ép " + npc.ten + " chia tiền & kết làm Đồng lõa",
      action: () => {
        box.style.display = 'none';
        state.coBangChung--;
        if (state.voNghe >= 2 || state.triThuc >= 3 || Math.random() < 0.65) {
          state.xuSat += 10;
          rel.dong_loa = true;
          updateCenterStage(
            "Nhìn thấy tờ bằng chứng xác thực trong tay bạn, " + npc.ten + " tái mặt vội đưa 10 đồng xu sắt để bịt miệng và buộc phải kết thành Đồng lõa che chở cho bạn!",
            [{ label: "🪙 +10 Xu sắt", type: "gain" }, { label: "🤝 Kết thành Đồng lõa", type: "gain" }]
          );
        } else {
          rel.feud_bac = Math.min(4, rel.feud_bac + 2);
          rel.than_thien -= 40;
          updateCenterStage(
            npc.ten + " đập bàn quát tháo giật lấy mảnh giấy rồi dọa sẽ cho người trả thù bạn! Mối thù leo thang lên Bậc " + rel.feud_bac + "!",
            [{ label: "⚡ Mối thù (Feud) tăng lên Bậc " + rel.feud_bac, type: "warn" }]
          );
        }
        render();
      }
    });
  }

  options.push({
    label: "💢 Lời qua tiếng lại / Tranh chấp quyền lợi (Gây xích mích Mối thù Feud)",
    action: () => {
      box.style.display = 'none';
      rel.than_thien -= 25;
      rel.feud_bac = Math.min(4, rel.feud_bac + 1);
      const feudNames = ["Bình thường", "Xích mích lời nói", "Căm ghét ra mặt", "Phá hoại ngầm", "Xung đột bạo lực"];
      updateCenterStage(
        "Cuộc tranh cãi gay gắt khiến quan hệ giữa bạn và " + npc.ten + " rạn nứt nặng nề. Mối thù đã chuyển sang Bậc " + rel.feud_bac + " (" + feudNames[rel.feud_bac] + ")!",
        [{ label: "⚡ Mối thù Bậc " + rel.feud_bac + ": " + feudNames[rel.feud_bac], type: "warn" }]
      );
      render();
    }
  });

  options.push({
    label: "👋 Khẽ gật đầu chào rồi quay lại công việc",
    action: () => {
      box.style.display = 'none';
      render();
    }
  });

  options.forEach(opt => {
    const btn = document.createElement('button');
    btn.className = 'btn-main-action';
    btn.innerHTML = '<span class="act-name">' + opt.label + '</span>';
    btn.onclick = opt.action;
    choicesEl.appendChild(btn);
  });

  box.style.display = 'block';
}

// =========================================================================
// 5. BIẾN CỐ ĐỜI THỰC THEO ĐỊA ĐIỂM & KỲ THU THUẾ MÙA (1 LẦN/MÙA - MỤC 20 & 22.2)
// =========================================================================
function checkRealisticWorldEvents() {
  const currentSeasonKey = state.year + "_" + state.seasonIdx;
  const isDaytime = state.hour >= 8 && state.hour <= 17;

  if (
    state.location === 'nha' &&
    isDaytime &&
    state.dayInSeason >= 13 &&
    state.lastTaxSeasonKey !== currentSeasonKey &&
    state.persona.giai_cap !== 'ky_si_quan_nhan' &&
    state.persona.giai_cap !== 'quan_lai' &&
    Math.random() < 0.35
  ) {
    state.lastTaxSeasonKey = currentSeasonKey;
    state.lastDangerDay = state.totalDaysPlayed;
    triggerTaxCollectorAtHome();
    return;
  }

  if (state.totalDaysPlayed - state.lastDangerDay < 2) return;

  const isNight = state.hour >= 18 || state.hour < 6;
  const forestChance = (isNight && state.coDuoc <= 0) ? 0.14 : 0.05;
  if (state.location === 'bia_rung' && Math.random() < forestChance) {
    state.lastDangerDay = state.totalDaysPlayed;
    triggerForestDanger();
  }
}

function triggerTaxCollectorAtHome() {
  SoundFX.playDoorKnock();
  setScreenVignette('danger');

  const collectorTypes = [
    { id: "de_tinh", ten: "Người lính thu sưu già đi một mình", pha_cua: false },
    { id: "da_nghi", ten: "Gã thu thuế đeo dấu ba bên ánh mắt dòm ngó", pha_cua: false },
    { id: "hung_han", ten: "Gã quản trang dẫn theo hai tên tay sai", pha_cua: true }
  ];
  const collector = collectorTypes[Math.floor(Math.random() * collectorTypes.length)];

  const desc =
    "[KỲ THU SƯU THUẾ MÙA NÀY - 1 LẦN DUY NHẤT TRONG MÙA]\n" +
    "Ngoài sân: " + collector.ten + " gõ cửa thu tô thuế định kỳ.";

  const choices = [
    {
      text: "Chui xuống gầm phản gỗ tối om, nín thở nằm im chờ chúng bỏ đi",
      resolve: () => evaluateHomeHiding("gam_phan", collector)
    },
    {
      text: "Mở cửa cho xem góc bếp trống (Giữ an toàn cho lương dưới hố giấu)",
      resolve: () => evaluateHomeHiding("mo_cua_than_nhien", collector)
    }
  ];

  if (state.xuSat >= 2) {
    choices.push({
      text: "Đóng 2 đồng xu sắt tiền sưu thuế để yên ổn làm ăn",
      resolve: () => evaluateHomeHiding("hoi_lo_xu", collector)
    });
  }

  showSituationUI("⚡ ĐẾN KỲ THU TÔ THUẾ TRONG MÙA!", desc, choices);
}

function evaluateHomeHiding(method, collector) {
  clearSituationUI();
  let story = "";
  const deltas = [];

  if (method === "hoi_lo_xu") {
    state.xuSat -= 2;
    story = "Bạn nộp 2 đồng xu sắt, gã thu thuế gạch tên nhà bạn vào sổ hoàn tất kỳ thuế mùa này rồi rời đi.";
    deltas.push({ label: "🪙 -2 xu sắt · Hoàn tất kỳ thuế", type: "gain" });
  } else if (method === "mo_cua_than_nhien") {
    if (state.luongLanh <= 0.3 && state.hoGiauDo > 0) {
      story = "Nhờ đã cất lương xuống hố giấu dưới gầm phản, chúng nhìn quanh nồi niêu trống trơn đành tặc lưỡi bỏ đi!";
      deltas.push({ label: "🕳️ Bảo toàn lương thực nhờ hố giấu", type: "gain" });
    } else {
      const takenCui = Math.min(state.cui, 0.6);
      state.cui = Math.max(0, state.cui - takenCui);
      story = "Chúng thu đi " + takenCui.toFixed(1) + " bó củi khô trừ vào phần sưu thuế mùa này.";
      deltas.push({ label: "🔥 -" + takenCui.toFixed(1) + " bó củi thuế mùa", type: "warn" });
    }
  } else {
    if (!state.cuaCaiThen && collector.id !== "de_tinh") {
      const takenCui = Math.min(state.cui, 0.7);
      state.cui = Math.max(0, state.cui - takenCui);
      story = "Vì cửa chưa cài then, chúng đẩy cửa vào lấy mất " + takenCui.toFixed(1) + " bó củi.";
      deltas.push({ label: "⚠️ Quên cài then cửa", type: "warn" });
    } else {
      story = "Bạn nằm im trong bóng tối dưới gầm phản, gã thu thuế ngó qua không thấy ai đành bỏ sang nhà khác!";
      deltas.push({ label: "💚 Trốn thoát kỳ thuế an toàn", type: "gain" });
    }
  }

  updateCenterStage(story, deltas);
  render();
}

function triggerForestDanger() {
  SoundFX.playDogBark();
  setScreenVignette('danger');

  const desc = "Trên lối mòn Bìa Rừng Đen, một con chó hoang đói mồi gầm gừ lao ra chắn ngang đường của bạn!";
  const choices = [
    {
      text: "Vung vũ khí / gậy gỗ lớn đập mạnh dọa nó (Võ nghệ: " + state.voNghe + ")",
      resolve: () => {
        clearSituationUI();
        state.theLuc = Math.max(0, state.theLuc - 6);
        updateCenterStage("Bạn quát lớn vung gậy đánh bật con thú dữ lùi vào bụi rậm.", [{ label: "💚 Đánh đuổi thú dữ", type: "gain" }]);
        render();
      }
    },
    {
      text: "Leo nhanh lên chạc cây sồi bên cạnh chờ nó bỏ đi",
      resolve: () => {
        clearSituationUI();
        state.theLuc = Math.max(0, state.theLuc - 5);
        updateCenterStage("Bạn trèo lên chạc cây cao an toàn chờ con thú bỏ đi.", [{ label: "💚 Tránh trên chạc cây", type: "gain" }]);
        render();
      }
    }
  ];

  showSituationUI("⚡ NGUY HIỂM TRÊN RỪNG!", desc, choices);
}

function showSituationUI(title, desc, choices) {
  const box = document.getElementById('freneticBox');
  const titleEl = document.getElementById('freneticTitle');
  const timerEl = document.getElementById('freneticTimer');
  const descEl = document.getElementById('freneticDesc');
  const choicesEl = document.getElementById('freneticChoices');

  box.className = 'frenetic-overlay';
  titleEl.textContent = title;
  descEl.textContent = desc;
  choicesEl.innerHTML = '';

  let remSec = 10.0;
  choices.forEach(ch => {
    const btn = document.createElement('button');
    btn.className = 'btn-main-action';
    btn.innerHTML = '<span class="act-name">▶ ' + ch.text + '</span>';
    btn.onclick = () => ch.resolve();
    choicesEl.appendChild(btn);
  });

  box.style.display = 'block';
  freneticInterval = setInterval(() => {
    remSec -= 0.1;
    timerEl.textContent = Math.max(0, remSec).toFixed(1) + 's';
    if (Math.abs(remSec - Math.round(remSec)) < 0.08) SoundFX.playHeartbeat();
    if (remSec <= 0) choices[0].resolve();
  }, 100);
}

function clearSituationUI() {
  clearInterval(freneticInterval);
  freneticInterval = null;
  document.getElementById('freneticBox').style.display = 'none';
  setScreenVignette('relief');
}

// =========================================================================
// 6. THỰC THI HÀNH ĐỘNG, DI CHUYỂN & KẾT QUẢ GIAI ĐOẠN 1 - 9
// =========================================================================
window.travelToPlace = function(destId) {
  if (state.isWorking || freneticInterval || state.isDead || destId === state.location) return;
  document.getElementById('freneticBox').style.display = 'none';
  const placeObj = PLACES.find(pl => pl.id === destId);
  if (!placeObj) return;

  const travelInfo = getTravelMinutes(state.location, destId);
  const isNight = state.hour >= 18 || state.hour < 6;
  SoundFX.playSoftStep();

  const prevLocName = PLACE_NAMES[state.location];
  state.location = destId;
  state.activeCategory = 'Tất cả';
  state.theLuc = Math.max(0, state.theLuc - Math.max(1.5, travelInfo.minutes * 0.12));

  let nightNote = "";
  if (isNight && destId === 'bia_rung') {
    if (state.coDuoc > 0) {
      state.coDuoc--;
      nightNote = "\n\n🔦 Bạn châm cháy một bó đuốc nhựa thông cầm tay (-1 Đuốc), ánh lửa soi rõ lối mòn lên rừng đêm.";
    } else {
      state.lanh = Math.min(100, state.lanh + 8);
      nightNote = "\n\n🌑 Bạn mò mẫm lên Bìa Rừng Đen giữa đêm tối không có đuốc.";
    }
  } else if (destId !== 'nha' && Math.random() < 0.25) {
    nightNote = "\n\n" + nextFromDeck('whisperDeck', AMBIENT_WHISPERS);
  }

  advanceClock(travelInfo.minutes, false, false);
  state.actionsTaken++;

  const speedDetail = travelInfo.reasons.length > 0 ? " (Do " + travelInfo.reasons.join(", ") + ")" : "";
  let msg = "Bạn rời khỏi " + prevLocName + ", đi bộ " + travelInfo.minutes + " phút" + speedDetail + " tới " + placeObj.full + "." + nightNote;

  updateCenterStage(msg, [
    { label: '📍 Tới: ' + placeObj.short, type: '' },
    { label: '⏱️ +' + travelInfo.minutes + ' phút đi đường', type: '' }
  ]);
  render();
};

function runAction(tpl, isPush) {
  if (state.isWorking || freneticInterval || state.isDead) return;
  if (tpl.is_npc_dialogue && tpl.npc_ref) {
    openNpcDialogue(tpl.npc_ref);
    return;
  }

  const check = checkActionAvailability(state.persona, tpl);
  if (!check.canRun) return;

  if (tpl.is_sleep) {
    executeOvernightSleep(tpl);
    return;
  }

  state.isWorking = true;
  const isStarvingOrExhausted = (state.doi >= 72 || state.theLuc <= 26);
  const stepDelayMs = isStarvingOrExhausted ? 300 : 130;
  const totalSteps = tpl.so_nhip || 3;

  const progBox = document.getElementById('workProgressBox');
  const progText = document.getElementById('workProgressText');
  const progPace = document.getElementById('workProgressPace');
  const progFill = document.getElementById('workProgressFill');

  progBox.style.display = 'block';
  progFill.style.width = '0%';
  progFill.className = 'work-progress-fill' + (isStarvingOrExhausted ? ' slow-strained' : '');
  progPace.textContent = isStarvingOrExhausted ? '⚠️ Cử động chậm chạp vì đói mệt' : 'Nhịp độ bình thường';

  render();

  let currentStep = 0;
  const stepTimer = setInterval(() => {
    currentStep++;
    const pct = Math.min(100, Math.round((currentStep / totalSteps) * 100));
    progFill.style.width = pct + '%';
    progText.textContent = tpl.ten_vi + ' (Nhịp ' + currentStep + '/' + totalSteps + ')';

    if (tpl.sfx === 'chop') SoundFX.playChop();
    else if (tpl.sfx === 'fire') SoundFX.playFire();
    else SoundFX.playSoftStep();

    if (currentStep >= totalSteps) {
      clearInterval(stepTimer);
      setTimeout(() => {
        progBox.style.display = 'none';
        state.isWorking = false;
        finalizeActionResult(tpl, isPush, isStarvingOrExhausted);
      }, 90);
    }
  }, stepDelayMs);
}

function executeOvernightSleep(tpl) {
  if (tpl.tieu_hao && tpl.tieu_hao.xu_sat) {
    state.xuSat = Math.max(0, state.xuSat - tpl.tieu_hao.xu_sat);
  }
  const hoursToMorning = state.hour >= 18 ? (24 - state.hour + 6) : (6 - state.hour);
  const sleepMinutes = Math.max(120, Math.round(hoursToMorning * 60));

  playReincarnationTransition(
    "Đêm khuya tĩnh mịch, bạn nhắm mắt chìm vào giấc ngủ sâu cho tới khi tiếng gà gáy sáng vang lên...",
    () => {
      state.cuaCaiThen = true;
      advanceClock(sleepMinutes, false, true);
      state.hour = 6;
      state.theLuc = 95;
      state.chan = Math.max(0, state.chan - 25);
      state.sucKhoe = Math.min(100, state.sucKhoe + 6);
      state.lanh = Math.max(15, state.lanh - 20);
      state.actionsTaken++;

      updateCenterStage(
        tpl.mo_ta + "\n\nBình minh ngày mới đã lên (06h00 sáng). Cơ thể bạn đã hồi phục dồi dào sinh lực!",
        [{ label: '🌅 Đã tới 06h00 sáng hôm sau', type: 'gain' }, { label: '💪 Thể lực hồi phục 95%', type: 'gain' }]
      );
      render();
    }
  );
}

function finalizeActionResult(tpl, isPush, wasSlowed) {
  const prevText = document.getElementById('narrativeBox').textContent;
  if (state.actionsTaken > 0 && prevText) {
    const shortLine = prevText.split('\n')[0];
    state.recentHistory.unshift('• ' + shortLine);
    if (state.recentHistory.length > 3) state.recentHistory.pop();
  }

  // Điều chỉnh sản lượng mua gạo / đổi củi theo Giá chợ 4 mùa & Biến cố vĩ mô (GĐ7 & GĐ8)
  const spike = state.macroPriceSpike || 1.0;
  if (tpl.mau === 'mua_gao_bang_xu') {
    const baseRice = state.seasonIdx === 2 ? 0.95 : (state.seasonIdx === 3 ? 0.5 : 0.7);
    tpl.ket_qua.luong_lanh = Number((baseRice / spike).toFixed(2));
  }
  if (tpl.mau === 'doi_cui_lay_gao') {
    const baseEx = state.seasonIdx === 3 ? 0.85 : (state.seasonIdx === 2 ? 0.7 : 0.55);
    tpl.ket_qua.luong_lanh = Number((baseEx / spike).toFixed(2));
  }

  const p = state.persona;
  let beats = 0, stopReason = 'hoan_thanh';
  const maxBeats = tpl.so_nhip || 3;
  const boost = isPush ? 25 : 0;

  if (tpl.tieu_hao) {
    if (tpl.tieu_hao.cui) state.cui = Math.max(0, state.cui - tpl.tieu_hao.cui);
    if (tpl.tieu_hao.go_tho) state.goTho = Math.max(0, state.goTho - tpl.tieu_hao.go_tho);
    if (tpl.tieu_hao.luong_lanh_linh_hoat) {
      const used = Math.min(state.luongLanh, tpl.tieu_hao.luong_lanh_linh_hoat);
      state.luongLanh = Math.max(0, state.luongLanh - used);
    }
    if (tpl.tieu_hao.luong_moc) state.luongMoc = Math.max(0, state.luongMoc - tpl.tieu_hao.luong_moc);
    if (tpl.tieu_hao.nuoc) state.nuocSach = Math.max(0, state.nuocSach - tpl.tieu_hao.nuoc);
    if (tpl.tieu_hao.do_dan_lat) state.doDanLat = Math.max(0, state.doDanLat - tpl.tieu_hao.do_dan_lat);
    if (tpl.tieu_hao.thao_duoc) state.thaoDuoc = Math.max(0, state.thaoDuoc - tpl.tieu_hao.thao_duoc);
    if (tpl.tieu_hao.hang_buon) state.hangBuon = Math.max(0, state.hangBuon - tpl.tieu_hao.hang_buon);
    if (tpl.tieu_hao.xu_sat) state.xuSat = Math.max(0, state.xuSat - tpl.tieu_hao.xu_sat);
  }

  let gainedCui = 0, gainedGo = 0, gainedClean = 0, gainedSpoiled = 0, gainedXu = 0;
  let outcomeNotes = [];

  while (beats < maxBeats) {
    beats++;
    state.theLuc = Math.max(0, Math.min(100, state.theLuc + tpl.chi_phi.the_luc));
    state.chan = Math.max(0, Math.min(100, state.chan + tpl.chi_phi.chan));
    state.doi = Math.max(0, Math.min(100, state.doi + tpl.chi_phi.doi));

    // Phản ứng phớt lờ Ám ảnh đói/lạnh (Mục 29.3)
    if (state.amAnhDoi > 0 && !(tpl.tag || []).includes('sinh_ton') && !(tpl.tag || []).includes('muu_sinh')) {
      state.chan = Math.min(100, state.chan + 1.5);
    }

    if (tpl.ket_qua.cui) { state.cui += tpl.ket_qua.cui / maxBeats; gainedCui += tpl.ket_qua.cui / maxBeats; }
    if (tpl.ket_qua.go_tho) { state.goTho += tpl.ket_qua.go_tho / maxBeats; gainedGo += tpl.ket_qua.go_tho / maxBeats; }
    if (tpl.ket_qua.luong_lanh) { state.luongLanh += tpl.ket_qua.luong_lanh / maxBeats; gainedClean += tpl.ket_qua.luong_lanh / maxBeats; }
    if (tpl.ket_qua.lanh) state.lanh = Math.max(0, Math.min(100, state.lanh + tpl.ket_qua.lanh / maxBeats));
    if (tpl.ket_qua.suc_khoe) state.sucKhoe = Math.max(0, Math.min(100, state.sucKhoe + tpl.ket_qua.suc_khoe / maxBeats));

    if (state.theLuc <= 4) { stopReason = 'kiet_suc'; break; }

    const khoChiu = (100 - state.theLuc) * 0.65 + state.chan * 0.7 + state.doi * 0.4 + state.lanh * 0.35;
    const nguong = 55 - p.luoi * 0.45 + p.kien_nhan * 0.5 + p.y_chi * 0.35 + boost + (Math.random() * 8 - 4);
    if (khoChiu > nguong && !tpl.tag.includes('ban_nang') && !tpl.tag.includes('sinh_ton') && !tpl.tag.includes('doi_doi')) {
      stopReason = 'ngat_noi_tam';
      break;
    }
  }

  const kq = tpl.ket_qua;
  if (kq.nuoc) { state.nuocSach += kq.nuoc; outcomeNotes.push("Đã kéo thêm +" + kq.nuoc + " gáo nước giếng."); }
  if (kq.tao_duoc) { state.coDuoc += kq.tao_duoc; outcomeNotes.push("Bện xong 1 bó đuốc đi đêm."); }
  if (kq.do_dan_lat) { state.doDanLat += kq.do_dan_lat; outcomeNotes.push("Đan xong 1 món đồ tre/rơm."); }
  if (kq.hang_buon) { state.hangBuon += kq.hang_buon; outcomeNotes.push("Đã mua 1 Kiện hàng quê giá sỉ."); }
  if (kq.xu_sat) { state.xuSat += kq.xu_sat; gainedXu += kq.xu_sat; }
  if (kq.tang_danh_du) { state.rep.danh_du += kq.tang_danh_du; outcomeNotes.push("Uy tín và Danh dự của bạn được nhiều người biết đến."); }
  if (kq.tang_tin_nhiem_tm) { state.rep.tin_nhiem_tm += kq.tang_tin_nhiem_tm; outcomeNotes.push("Tín nhiệm thương mại của bạn tăng lên trong giới buôn bán."); }
  if (kq.tang_tin_nhiem_ton_giao) { state.rep.tin_nhiem_tg += kq.tang_tin_nhiem_ton_giao; outcomeNotes.push("Các tu sĩ và giáo dân nhìn bạn với ánh mắt thiện cảm hơn."); }

  if (kq.ket_hon_thanh_cong) {
    state.daKetHon = true;
    state.rep.danh_du += 15;
    outcomeNotes.push("💍 Bạn đã chính thức lập gia đình, có người cùng gánh vác nắng mưa!");
  }
  if (kq.sinh_con_thanh_cong) {
    state.soCon = (state.soCon || 0) + 1;
    if (!state.persona.nguoi.includes('con_chau')) state.persona.nguoi.push('con_chau');
    outcomeNotes.push("👶 Gia đình bạn đón thêm một đứa trẻ khỏe mạnh chào đời (Con cái: " + state.soCon + ")!");
  }
  if (kq.delta_cuu_lang) {
    state.rep.danh_du += 18;
    state.macroDeltaMod.to_chuc_tam_giang += 0.12;
    const note = "Cứu sống gia đình hàng xóm qua mùa Giá (Nhà không bị bỏ hoang, tình đoàn kết trong làng tăng lên)";
    if (!state.deltasGhiNhan.includes(note)) state.deltasGhiNhan.push(note);
    outcomeNotes.push("🌱 [Tạo Delta Cấp Làng]: " + note + ".");
  }
  if (kq.chuoc_ky_vat_cho) {
    const items = [
      "Nửa con dấu ngọc cũ có vết bẻ gãy",
      "Cuốn sổ bìa vải ố muối ghi những con số chìm",
      "Chiếc chìa khóa đồng lớn rỉ xanh"
    ];
    const picked = items[state.actionsTaken % items.length];
    if (!state.kyVat.includes(picked)) state.kyVat.push(picked);
    outcomeNotes.push("🔍 Bạn mở bọc vải cũ và thu được kỷ vật: [" + picked + "]!");
  }
  if (kq.delta_hoa_giai_bien_ai && state.kyVat.length > 0) {
    const usedItem = state.kyVat.pop();
    state.rep.danh_du += 25;
    state.rep.uy_quyen += 20;
    state.xuSat += 10; gainedXu += 10;
    state.macroDeltaMod.cang_thang_bach_linh -= 0.35;
    const note = "Trao [" + usedItem + "] tại Biên Ngạn giúp hạ nhiệt xung đột biên giới và hoãn binh đao";
    if (!state.deltasGhiNhan.includes(note)) state.deltasGhiNhan.push(note);
    outcomeNotes.push("🌟 [Tạo Delta Lịch Sử]: " + note + " (+10 Xu sắt thưởng)!");
  }
  if (kq.delta_thanh_tra_kho) {
    if (state.coBangChung > 0) state.coBangChung--;
    else if (state.kyVat.length > 0) state.kyVat.pop();
    state.rep.danh_du += 30;
    state.rep.uy_quyen += 25;
    state.xuSat += 12; gainedXu += 12;
    state.macroDeltaMod.no_khe -= 0.4;
    state.macroDeltaMod.do_rong_kho -= 0.3;
    const note = "Phơi bày khoản lãi ngầm và thất thoát kho lương tại Kinh Hoài, làm nhẹ gánh sưu thuế cho dân vùng dưới";
    if (!state.deltasGhiNhan.includes(note)) state.deltasGhiNhan.push(note);
    outcomeNotes.push("🌟 [Tạo Delta Cấp Quốc Gia]: " + note + " (+12 Xu sắt)!");
  }

  if (kq.vao_hoi_phuong) {
    state.daVaoHoiPhuong = true;
    state.rep.tin_nhiem_tm += 15;
    outcomeNotes.push("🪪 [THÀNH VIÊN HỘI PHƯỜNG]: Từ nay mỗi món đồ đan/thủ công bạn bán ở chợ sẽ thu về 5 Xu sắt (thay vì 3 Xu)!");
  }
  if (kq.ban_do_dan_xu_ly) {
    const price = state.daVaoHoiPhuong ? 5 : 3;
    state.xuSat += price; gainedXu += price;
    state.buonBan += 1;
    outcomeNotes.push(state.daVaoHoiPhuong
      ? "Nhờ có thẻ bài Hội Phường, món đồ đan bán được giá cao (+5 Xu sắt)!"
      : "Bạn bán món đồ đan ở rìa chợ thu về +3 Xu sắt.");
  }

  if (kq.moc_tui_xu_ly) {
    const hasAlly = Object.values(state.npcRelations).some(r => r.dong_loa);
    if (Math.random() < 0.55) {
      state.xuSat += 5; gainedXu += 5;
      state.rep.danh_du -= 5;
      outcomeNotes.push("Bạn lấy gọn túi tiền có 5 đồng xu sắt mà khổ chủ không hề hay biết!");
    } else if (hasAlly) {
      state.rep.tieng_xau += 10;
      outcomeNotes.push("Khổ chủ phát hiện hô hoán, nhưng nhờ có NPC Đồng lõa cản đường đám tuần chợ nên bạn thoát thân kịp thời!");
    } else {
      state.rep.tieng_xau += 25;
      state.rep.danh_du -= 15;
      if (p.giai_cap === 'quan_lai' || p.giai_cap === 'ky_si_quan_nhan' || (p.giai_cap === 'thuong_nhan_thi_dan' && state.xuSat >= 4)) {
        state.xuSat = Math.max(0, state.xuSat - 4);
        outcomeNotes.push("⚖️ [CÔNG LÝ THEO GIAI CẤP]: Bạn bị bắt quả tang, nhưng nhờ địa vị và 4 xu sắt bảo lãnh nên chỉ bị phạt tiền rồi cho về!");
      } else {
        state.sucKhoe = Math.max(5, state.sucKhoe - 14);
        state.theLuc = Math.max(0, state.theLuc - 20);
        outcomeNotes.push("⚖️ [CÔNG LÝ THEO GIAI CẤP]: Vì thuộc tầng lớp thấp không tiền bảo lãnh, đội tuần chợ đè bạn ra đánh roi tại chỗ (-14 Sức khỏe)!");
      }
    }
  }

  if (kq.phao_tin_xu_ly) {
    if (state.rep.tieng_xau > 0) {
      state.rep.tieng_xau = Math.max(0, state.rep.tieng_xau - 18);
      outcomeNotes.push("🗣️ Tin đồn bạn tung ra giúp gột bớt Tiếng xấu của bạn trong vùng!");
    } else {
      state.rep.uy_quyen += 8;
      state.buonBan += 1;
      outcomeNotes.push("🗣️ Câu chuyện bạn gieo vào bàn rượu lan nhanh, làm tăng vị thế của bạn!");
    }
  }

  if (kq.chep_sach_kinh_hoai) {
    state.xuSat += 4; gainedXu += 4;
    state.triThuc += 2;
    if (Math.random() < 0.45) {
      state.coBangChung++;
      outcomeNotes.push("📜 [PHÁT HIỆN BẰNG CHỨNG]: Bạn phát hiện một tờ khế ghi khoản lãi chìm bất hợp pháp và lén chép lại làm Bằng chứng (Hiện có: " + state.coBangChung + ")!");
    }
  }

  if (kq.tang_tri_thuc) { state.triThuc += kq.tang_tri_thuc; outcomeNotes.push("Tri thức +" + kq.tang_tri_thuc + "."); }
  if (kq.hoc_chu_lang) {
    state.triThuc += 1;
    if (!p.biet_chu && state.triThuc >= 3) {
      p.biet_chu = true;
      outcomeNotes.push("🎓 [ĐỘT PHÁ TRI THỨC]: Bạn đã chính thức BIẾT ĐỌC BIẾT VIẾT!");
    } else {
      outcomeNotes.push("Học chữ tiến bộ (Tri thức: " + state.triThuc + "/3).");
    }
  }
  if (kq.tang_vo_nghe) { state.voNghe += kq.tang_vo_nghe; outcomeNotes.push("Võ nghệ +" + kq.tang_vo_nghe + "."); }
  if (kq.tang_buon_ban) { state.buonBan += kq.tang_buon_ban; outcomeNotes.push("Buôn bán +" + kq.tang_buon_ban + "."); }

  if (kq.chuoc_than_thanh_cong) {
    p.giai_cap = "thuong_nhan_thi_dan";
    p.than_phan = "Thị dân Tự do · Hoài Dương";
    p.nghia_vu = [];
    state.rep.danh_du += 20;
    const note = "Tích cóp chuộc thân thoát khỏi kiếp Dân Gắn Ruộng";
    if (!state.deltasGhiNhan.includes(note)) state.deltasGhiNhan.push(note);
    outcomeNotes.push("🌟 [ĐỔI MỆNH]: Bạn đã thoát kiếp Dân Gắn Ruộng, trở thành Thị dân tự do!");
  }
  if (kq.thang_cap_kiem_dien) {
    p.giai_cap = "ky_si_quan_nhan";
    p.than_phan = "Kiếm Điền (Quân nhân quý tộc) · Biên Ngạn";
    p.nghia_vu = [];
    state.rep.uy_quyen += 45;
    state.xuSat += 15; gainedXu += 15;
    const note = "Lập chiến công ở Biên Ngạn, bước lên hàng ngũ Kiếm Điền";
    if (!state.deltasGhiNhan.includes(note)) state.deltasGhiNhan.push(note);
    outcomeNotes.push("🌟 [PHONG BẬC KIẾM ĐIỀN]: Bạn bước lên tầng lớp Kiếm Điền có uy quyền và bổng lộc (+15 Xu sắt)!");
  }
  if (kq.thang_cap_chuc_su) {
    p.giai_cap = "quan_lai";
    p.than_phan = "Thư lại Chức Sự · Kinh Hoài";
    p.nghia_vu = [];
    state.rep.uy_quyen += 40;
    state.xuSat += 12; gainedXu += 12;
    const note = "Từ dân thường học chữ thi đỗ Thư lại Chức Sự tại Kinh Hoài";
    if (!state.deltasGhiNhan.includes(note)) state.deltasGhiNhan.push(note);
    outcomeNotes.push("🌟 [ĐỖ THƯ LẠI CHỨC SỰ]: Bạn chính thức làm quan chức nhỏ tại nha môn Kinh Hoài (+12 Xu sắt)!");
  }
  if (kq.thang_cap_thuong_nhan) {
    p.giai_cap = "thuong_nhan_thi_dan";
    p.than_phan = "Chủ hiệu Bang Hàng · Kinh Hoài";
    p.nghia_vu = [];
    state.rep.tin_nhiem_tm += 50;
    state.luongLanh += 3.0; gainedClean += 3.0;
    const note = "Lập hiệu buôn lớn trong Bang Hàng Kinh Hoài";
    if (!state.deltasGhiNhan.includes(note)) state.deltasGhiNhan.push(note);
    outcomeNotes.push("🌟 [PHÚ THƯƠNG BANG HÀNG]: Hiệu buôn của bạn chính thức khai trương tại Kinh Hoài!");
  }

  if (kq.doi_trang_thai_cua) { state.cuaCaiThen = !state.cuaCaiThen; outcomeNotes.push(state.cuaCaiThen ? "Đã cài chặt then cửa." : "Đã mở then cửa."); }
  if (kq.va_kin_vach) { state.vachRach = false; outcomeNotes.push("Vách nhà đã trát bùn kín mít."); }
  if (kq.gia_co_mai) { state.maiVung = true; outcomeNotes.push("Kèo mái nhà đã chằng buộc vững chắc."); }
  if (kq.cat_xuong_ho) { state.luongLanh = Math.max(0, state.luongLanh - 0.5); state.hoGiauDo += 0.5; outcomeNotes.push("Đã cất 0.5 Lương lành xuống hố giấu."); }
  if (kq.lay_tu_ho) { const amt = state.hoGiauDo; state.luongLanh += amt; state.hoGiauDo = 0; outcomeNotes.push("Đã lấy " + amt.toFixed(1) + " Lương lành từ hố giấu lên."); }
  if (kq.cuu_luong_moc) {
    const convert = Math.min(0.6, state.luongMoc);
    state.luongMoc -= convert; state.luongLanh += convert * 0.8; gainedClean += convert * 0.8;
    outcomeNotes.push("Phơi nắng thu lại +" + (convert * 0.8).toFixed(2) + " Lương lành.");
  }
  if (kq.an_luong_moc_xu_ly) {
    const sickChance = state.nuocSach > 0 ? 0.18 : 0.50;
    if (state.nuocSach > 0) state.nuocSach--;
    if (Math.random() < sickChance) {
      state.sucKhoe = Math.max(0, state.sucKhoe - 6);
      if (state.benhTat && !state.benhTat.includes('dau_bung')) state.benhTat.push('dau_bung');
      outcomeNotes.push("Bụng đau quặn vì độc tố mốc (-6 Sức khỏe, mắc chứng Đau bụng tà).");
    } else {
      outcomeNotes.push("Nhờ đun kỹ với nước sạch nên bụng bạn không bị ngộ độc.");
    }
  }

  if (kq.uong_nuoc_am) {
    state.lanh = Math.max(5, state.lanh - 18);
    if (state.thaoDuoc > 0) {
      state.thaoDuoc--;
      state.sucKhoe = Math.min(100, state.sucKhoe + 10);
      if (state.benhTat.length > 0) {
        const cured = state.benhTat.pop();
        outcomeNotes.push("🍵 Bát thuốc thảo dược nóng hổi chữa khỏi chứng bệnh (" + cured + ") và hồi phục +10 Sức khỏe!");
      } else {
        outcomeNotes.push("Sắc thảo dược uống hồi phục +10 Sức khỏe.");
      }
    } else {
      state.sucKhoe = Math.min(100, state.sucKhoe + 3);
      if (state.benhTat.includes('cam_lanh') && Math.random() < 0.4) {
        state.benhTat = state.benhTat.filter(b => b !== 'cam_lanh');
        outcomeNotes.push("Uống nước sôi nóng giúp dứt cơn cảm lạnh.");
      }
    }
  }
  if (kq.hai_rau_muong) { state.luongLanh += 0.35; gainedClean += 0.35; }
  if (kq.kham_benh_mien_phi) {
    state.sucKhoe = Math.min(100, state.sucKhoe + 8);
    if (state.benhTat.length > 0) {
      state.benhTat = [];
      outcomeNotes.push("🌿 Nữ tu y sĩ Nhất Hỏa cho thuốc đẩy lùi toàn bộ chứng bệnh trong người!");
    }
  }
  if (kq.hai_loc_rung) { state.thaoDuoc++; state.luongLanh += 0.35; gainedClean += 0.35; }
  if (kq.san_bat_ngau_nhien) {
    if (Math.random() < 0.55) { state.luongLanh += 0.8; gainedClean += 0.8; outcomeNotes.push("Bẫy được thỏ rừng (+0.8 Lương lành)."); }
    else { state.luongMoc += 0.35; gainedSpoiled += 0.35; outcomeNotes.push("Nhặt được ít thịt thú sót lại (+0.35 Lương mốc)."); }
  }
  if (kq.tra_cong_lao_dich) {
    const roll = Math.random();
    if (roll < 0.25) { state.xuSat += 1; gainedXu += 1; outcomeNotes.push("Quản trang bắt lỗi, chỉ trả 1 xu sắt."); }
    else if (roll < 0.65) { state.luongMoc += 0.55; gainedSpoiled += 0.55; outcomeNotes.push("Nhận được +0.55 Lương mốc."); }
    else { state.luongLanh += 0.5; gainedClean += 0.5; outcomeNotes.push("Nhận được +0.5 Lương lành."); }
  }
  if (kq.mot_lua_ngau_nhien) { state.luongLanh += 0.3; state.luongMoc += 0.25; gainedClean += 0.3; gainedSpoiled += 0.25; }
  if (kq.xin_an_ngau_nhien) { state.doi = Math.max(10, state.doi - 16); }
  if (kq.hat_rong_quan) { state.xuSat += 2; gainedXu += 2; state.doi = Math.max(15, state.doi - 10); }
  if (kq.phu_bep_quan) { state.luongLanh += 0.4; gainedClean += 0.4; state.cui += 0.3; gainedCui += 0.3; }

  const macroVars = computeMacroVariables(state.year);
  state.macroPriceSpike = 1.0;
  MACRO_EVENTS_DB.forEach(ev => {
    if (state.year >= ev.minY && state.year <= ev.maxY && ev.check(macroVars)) {
      ev.tac_dong(state);
      if (state.location !== 'nha' && Math.random() < 0.25 && !outcomeNotes.includes(ev.chi_bao)) {
        outcomeNotes.push(ev.chi_bao);
      }
    }
  });

  if (isPush) state.sucKhoe = Math.max(0, state.sucKhoe - 3);

  const minutes = beats * 6 * (wasSlowed ? 1.4 : 1);
  advanceClock(minutes, !!kq.bep_am, false);
  state.actionsTaken++;

  const deltas = [{ label: '⏱️ +' + Math.round(minutes) + ' phút', type: '' }];
  if (wasSlowed) deltas.push({ label: '🐢 Chậm vì đói mệt', type: 'warn' });
  if (gainedXu > 0) deltas.push({ label: '🪙 +' + gainedXu + ' xu sắt', type: 'gain' });
  if (gainedGo > 0) deltas.push({ label: '🪵 +' + gainedGo.toFixed(1) + ' gỗ thô', type: 'gain' });
  if (gainedCui > 0) deltas.push({ label: '🔥 +' + gainedCui.toFixed(1) + ' bó củi', type: 'gain' });
  if (gainedClean > 0) deltas.push({ label: '🌾 +' + gainedClean.toFixed(1) + ' lương lành', type: 'gain' });
  if (gainedSpoiled > 0) deltas.push({ label: '🍂 +' + gainedSpoiled.toFixed(1) + ' lương mốc', type: 'warn' });
  if (stopReason === 'kiet_suc') deltas.push({ label: '⚠️ Dừng vì kiệt sức', type: 'warn' });
  else if (stopReason === 'ngat_noi_tam') deltas.push({ label: '🛑 Tự dừng theo tâm lý', type: 'warn' });

  const bodyParts = [tpl.mo_ta];
  if (outcomeNotes.length > 0) bodyParts.push(outcomeNotes.join(' '));

  updateCenterStage(bodyParts.join('\n\n'), deltas);

  if (!state.isDead && p.giai_doan !== 'so_sinh') {
    checkRealisticWorldEvents();
  }

  render();
}

// =========================================================================
// 7. TUA TỰ ĐỘNG THÔNG MINH & CẬP NHẬT GIAO DIỆN
// =========================================================================
function skipDaysSmart() {
  if (state.isWorking || freneticInterval || state.isDead) return;
  SoundFX.playSoftStep();
  const p = state.persona;
  const stepsLog = [];
  const deltas = [{ label: '⏩ Trôi qua 2 ngày', type: '' }];

  if (state.luongLanh < 1.0) {
    if (state.doDanLat > 0) {
      const price = state.daVaoHoiPhuong ? 5 : 3;
      const earned = state.doDanLat * price;
      state.xuSat += earned;
      state.doDanLat = 0;
      stepsLog.push("Đem đồ đan lát ra chợ bán thu về +" + earned + " xu sắt.");
    }
    if (state.xuSat >= 2) {
      const packs = Math.min(3, Math.floor(state.xuSat / 2));
      state.xuSat -= packs * 2;
      state.luongLanh += packs * 0.7;
      deltas.push({ label: '🌾 Đong +' + (packs * 0.7).toFixed(1) + ' gạo lành', type: 'gain' });
      stepsLog.push("Dùng xu sắt đong thêm gạo lành mang về nhà.");
    }
  }

  if (state.luongLanh < 0.5 && state.hoGiauDo > 0) {
    state.luongLanh += state.hoGiauDo;
    stepsLog.push("Lấy lương lành từ hố giấu dưới gầm phản lên nấu ăn.");
    state.hoGiauDo = 0;
  }

  if (state.luongMoc >= 0.5) {
    const conv = Math.min(0.8, state.luongMoc);
    state.luongMoc -= conv;
    state.luongLanh += conv * 0.75;
    stepsLog.push("Phơi nắng lương mốc thu lại +" + (conv * 0.75).toFixed(2) + " phần lương sạch.");
  }

  if (state.nuocSach < 2) state.nuocSach += 3;
  if (state.luongLanh >= 0.4) {
    state.luongLanh -= Math.min(0.7, state.luongLanh);
    state.doi = Math.max(12, state.doi - 45);
    state.sucKhoe = Math.min(100, state.sucKhoe + 8);
    deltas.push({ label: '🍚 Đã nấu ăn no bụng', type: 'gain' });
    stepsLog.push("Bắc nồi nấu cháo gạo lành ăn no bụng, cơ thể khỏe khoắn.");
  }

  if (state.cui < 1.0) state.cui += 1.2;
  if (state.lanh >= 35 && state.cui >= 0.6) {
    state.cui -= 0.6;
    state.lanh = 15;
    stepsLog.push("Nhóm bếp lửa ấm áp và ngủ đủ giấc ban đêm.");
  }

  if (p.biet_chu) {
    state.triThuc += 1; state.xuSat += 2;
    stepsLog.push("Chép sổ thuê và ôn luyện chữ nghĩa (+1 Tri thức, +2 Xu sắt).");
  } else if (p.co_riu && state.voNghe > 0) {
    state.voNghe += 1;
    stepsLog.push("Luyện đao pháp ngoài sân (+1 Võ nghệ).");
  } else {
    state.doDanLat += 1;
    stepsLog.push("Ngồi đan thêm 1 chiếc rổ tre để dành đem bán.");
  }

  state.location = 'nha';
  state.theLuc = Math.min(95, state.theLuc + 25);
  advanceClock(24 * 60 * 2, false, true);
  state.hour = 8;
  state.actionsTaken++;

  updateCenterStage("[TỰ ĐỘNG SINH TỒN & RÈN LUYỆN QUA 2 NGÀY]:\n• " + stepsLog.join("\n• "), deltas);
  render();
}

function updateCenterStage(mainText, deltas) {
  const card = document.getElementById('currentBeatCard');
  card.classList.remove('pulse-action');
  void card.offsetWidth;
  card.classList.add('pulse-action');

  document.getElementById('beatHeaderLeft').textContent = 'DIỄN BIẾN · NHỊP #' + state.actionsTaken;
  document.getElementById('beatHeaderRight').textContent = PLACE_NAMES[state.location] + ' · ' + Math.floor(state.hour) + 'h00';
  document.getElementById('narrativeBox').textContent = mainText;

  const deltaBox = document.getElementById('beatDeltas');
  deltaBox.innerHTML = '';
  (deltas || []).forEach(d => {
    const span = document.createElement('span');
    span.className = 'delta-pill ' + (d.type || '');
    span.textContent = d.label;
    deltaBox.appendChild(span);
  });

  const logBox = document.getElementById('recentLog');
  logBox.innerHTML = '';
  state.recentHistory.forEach(item => {
    const div = document.createElement('div');
    div.className = 'log-entry';
    div.textContent = item;
    logBox.appendChild(div);
  });
}

function showEndOfLifeChronicle(deathReason) {
  const p = state.persona;
  if (p.tuoi >= 60) state.lastFulfilledClass = p.giai_cap; // Mục 47.11: Đời viên mãn kích hoạt luân chuyển giai cấp
  openModal('📜 Khép Lại Một Kiếp Người (Mục 37)',
    '<p style="color:#ff9e9e; font-weight:600;">' + deathReason + '</p>' +
    '<p><strong>Người đã khuất:</strong> ' + p.ten + ' (Hưởng dương ' + p.tuoi + ' tuổi) · ' + p.than_phan + '</p>' +
    '<p><strong>Danh tiếng để lại:</strong> ' + getReputationTitle() + '</p>' +
    '<hr style="border-color:#2b3242"/>' +
    '<p><strong>Sự thật & Bảng chênh lệch so với lịch sử gốc (Mục 5 & 37):</strong><br/>' +
    '• Tầm với cuối đời: ' + getPlayerReachLevel().ten + '<br/>' +
    '• Những số phận đã thay đổi (Delta): ' + (state.deltasGhiNhan.length > 0 ? ('<strong>' + state.deltasGhiNhan.join('; ') + '</strong>') : 'Sống lặng lẽ thuận theo dòng chảy mặc định') + '<br/>' +
    '• Tâm nguyện cả đời: ' + p.tam_niem.mong + '<br/>' +
    '• Góc khuất chưa từng nói: ' + p.tam_niem.goc_khuat + '</p>' +
    '<button class="start-btn-random" style="margin-top:14px;" onclick="returnToStartMenu()">🕯️ Khép lại kiếp này & Bước sang kiếp khác</button>'
  );
}

function render() {
  const p = state.persona;
  if (!p) return;

  calcTiers(p);

  document.getElementById('topCharName').textContent = p.ten;
  document.getElementById('topCharSub').textContent = p.tuoi + ' tuổi · ' + p.than_phan;
  document.getElementById('topLocBadge').textContent = '📍 ' + PLACE_NAMES[state.location];
  document.getElementById('topRepBadge').textContent = getReputationTitle();
  document.getElementById('topProgressBadge').textContent =
    '📚 Chữ: ' + (p.biet_chu ? 'Biết chữ (' + state.triThuc + ')' : state.triThuc + '/3') +
    ' · ⚔️ Võ: ' + state.voNghe +
    ' · ⚖️ Buôn: ' + state.buonBan;
  document.getElementById('topModeBadge').style.display = state.authenticMode ? 'inline-block' : 'none';
  document.getElementById('rightLocHint').textContent = PLACE_NAMES[state.location];

  const strip = document.getElementById('sensoryStrip');
  const sText = document.getElementById('sensoryText');
  if (state.sucKhoe <= 35 || state.doi >= 82 || state.lanh >= 82) {
    strip.className = 'sensory-warning-strip critical';
    sText.textContent = '🩸 Mắt bạn hoa đom đóm, tay chân tê cứng vì đói lạnh! Hãy nấu ăn hoặc nhóm bếp ngay!';
  } else if (state.cui < 0.6 || (state.luongLanh + state.luongMoc + state.hoGiauDo) < 0.5 || state.doi >= 60 || state.lanh >= 60) {
    strip.className = 'sensory-warning-strip warn';
    sText.textContent = '⚠️ Gió lạnh thổi buốt và bụng bắt đầu cồn cào. Hãy chú ý ăn uống và giữ ấm.';
  } else {
    strip.className = 'sensory-warning-strip';
    sText.textContent = '🕯️ Cơ thể tỉnh táo, đủ sức làm việc, giao tiếp xã hội hoặc đi xa tìm cơ hội đổi đời.';
  }

  const hBadges = document.getElementById('houseBadges');
  hBadges.innerHTML = '';
  if (state.location === 'nha') {
    const bDoor = document.createElement('span');
    bDoor.className = 'house-badge ' + (state.cuaCaiThen ? 'safe' : 'vuln');
    bDoor.textContent = state.cuaCaiThen ? '🔒 Cửa: Đã cài then' : '🔓 Cửa: Chưa cài then';
    hBadges.appendChild(bDoor);

    const bWall = document.createElement('span');
    bWall.className = 'house-badge ' + (!state.vachRach ? 'safe' : 'vuln');
    bWall.textContent = !state.vachRach ? '🧱 Vách: Đã trát kín' : '👁️ Vách: Tranh rách';
    hBadges.appendChild(bWall);

    const bRoof = document.createElement('span');
    bRoof.className = 'house-badge ' + (state.maiVung ? 'safe' : 'vuln');
    bRoof.textContent = state.maiVung ? '🏠 Mái: Đã chằng vững' : '🍃 Mái: Chưa chằng';
    hBadges.appendChild(bRoof);
  }

  const isNight = state.hour >= 18 || state.hour < 6;
  const currentEra = getCurrentEra(state.year);
  document.getElementById('clockDisplay').textContent =
    '⏳ Năm ' + state.year + ' (' + currentEra.ten + ') · Mùa ' + CONFIG.seasons[state.seasonIdx] + ' (Ngày ' + state.dayInSeason + '/15) · ' + Math.floor(state.hour) + 'h00';
  document.getElementById('stockXu').textContent = '🪙 Tiền: ' + state.xuSat + ' xu';
  document.getElementById('stockWater').textContent = '💧 Nước: ' + state.nuocSach + ' gáo';
  document.getElementById('stockCui').textContent = '🔥 Củi: ' + state.cui.toFixed(1) + ' bó';
  document.getElementById('stockFoodClean').textContent = '🌾 Lương lành: ' + state.luongLanh.toFixed(1);
  document.getElementById('stockFoodSpoiled').textContent = '🍂 Lương mốc: ' + state.luongMoc.toFixed(1);
  document.getElementById('stockHidden').textContent = '🕳️ Hố giấu: ' + state.hoGiauDo.toFixed(1);

  const feelContainer = document.getElementById('feelTags');
  feelContainer.innerHTML = '';
  const tags = [
    { text: state.theLuc > 60 ? '💪 Sức dẻo dai' : (state.theLuc > 28 ? '😮‍💨 Thấm mệt' : '🥵 Chân tay bủn rủn'), cls: state.theLuc > 60 ? 'good' : (state.theLuc <= 28 ? 'bad' : '') },
    { text: state.doi < 40 ? '🍚 Bụng êm' : (state.doi < 70 ? '🥣 Bụng cồn cào' : '🥀 Đói hoa mắt'), cls: state.doi < 40 ? 'good' : (state.doi >= 70 ? 'bad' : '') },
    { text: state.lanh < 40 ? '🔥 Đủ ấm' : (state.lanh < 70 ? '🌬️ Se lạnh' : '❄️ Rét run cầm cập'), cls: state.lanh < 40 ? 'good' : (state.lanh >= 70 ? 'bad' : '') }
  ];
  if (state.daVaoHoiPhuong) tags.push({ text: '🪪 Hội Phường', cls: 'good' });
  if (state.coBangChung > 0) tags.push({ text: '📜 Bằng chứng: ' + state.coBangChung, cls: 'good' });
  if (state.kyVat.length > 0) tags.push({ text: '🗝️ Kỷ vật: ' + state.kyVat.length, cls: 'good' });
  if (state.doDanLat > 0) tags.push({ text: '🧺 Đồ đan: ' + state.doDanLat, cls: 'good' });
  if (state.thaoDuoc > 0) tags.push({ text: '🌿 Thảo dược: ' + state.thaoDuoc, cls: 'good' });
  if (state.hangBuon > 0) tags.push({ text: '📦 Kiện hàng: ' + state.hangBuon, cls: 'good' });
  if (state.rep.tieng_xau >= 20) tags.push({ text: '⚠️ Đang bị chú ý vì Tiếng xấu', cls: 'bad' });
  if (state.sucKhoe < 55) tags.push({ text: '🤒 Suy nhược (' + Math.round(state.sucKhoe) + '%)', cls: 'bad' });
  const tenBenhMap = { cam_lanh: '🤧 Bệnh: Cảm lạnh', dau_bung: '🤢 Bệnh: Đau bụng tà', ho_suong: '😷 Dịch: Ho Sương' };
  (state.benhTat || []).forEach(b => tags.push({ text: tenBenhMap[b] || b, cls: 'bad' }));
  if (state.daKetHon) tags.push({ text: '💍 Đã lập gia đình (Con: ' + (state.soCon || 0) + ')', cls: 'good' });
  const giaGaoMua = state.seasonIdx === 2 ? '🌾 Chợ mùa Gặt: Gạo rẻ' : (state.seasonIdx === 3 ? '❄️ Chợ mùa Giá: Củi đắt, Gạo khan' : '⚖️ Giá chợ: Bình ổn');
  tags.push({ text: giaGaoMua, cls: state.seasonIdx === 2 ? 'good' : '' });

  tags.forEach(t => {
    const s = document.createElement('span');
    s.className = 'feel-tag ' + t.cls;
    s.textContent = t.text;
    feelContainer.appendChild(s);
  });

  const travelBar = document.getElementById('travelBar');
  const travelChips = document.getElementById('travelChips');
  const speedHint = document.getElementById('speedStatusHint');

  if (p.giai_doan === 'so_sinh') {
    travelBar.style.display = 'none';
  } else {
    travelBar.style.display = 'flex';
    travelChips.innerHTML = '';
    const sampleTravel = getTravelMinutes('nha', 'duong_lang');
    speedHint.textContent = sampleTravel.reasons.length > 0
      ? 'Tốc độ: Chậm (' + sampleTravel.reasons.join(', ') + ')'
      : 'Tốc độ: Bình thường';

    PLACES.forEach(pl => {
      const btn = document.createElement('button');
      const isCurrent = pl.id === state.location;
      const tInfo = getTravelMinutes(state.location, pl.id);
      const isNightForest = isNight && pl.id === 'bia_rung';

      btn.className = 'travel-chip' + (isCurrent ? ' current' : '') + (pl.isCity ? ' city-dest' : '') + (isNightForest ? ' night-warn' : '');
      btn.disabled = isCurrent || state.isWorking || !!freneticInterval || state.isDead;
      btn.textContent = pl.short + (isCurrent ? ' (Đang đứng)' : ' (' + tInfo.minutes + 'p)');
      btn.onclick = () => window.travelToPlace(pl.id);
      travelChips.appendChild(btn);
    });
  }

  const allActions = getActionsForCurrentPlace(p);
  const categories = ['Tất cả', ...new Set(allActions.map(a => a.tpl.nhom))];
  if (!categories.includes(state.activeCategory)) state.activeCategory = 'Tất cả';

  const tabBox = document.getElementById('filterTabs');
  tabBox.innerHTML = '';
  categories.forEach(cat => {
    const pill = document.createElement('button');
    pill.className = 'tab-pill' + (cat === state.activeCategory ? ' active' : '');
    pill.textContent = cat;
    pill.onclick = () => { state.activeCategory = cat; render(); };
    tabBox.appendChild(pill);
  });

  const menu = document.getElementById('menuBox');
  menu.innerHTML = '';
  const filtered = state.activeCategory === 'Tất cả' ? allActions : allActions.filter(a => a.tpl.nhom === state.activeCategory);

  filtered.forEach(item => {
    const { tpl, canRun, missingText } = item;
    const card = document.createElement('div');
    card.className = 'action-card';

    const btn = document.createElement('button');
    let extraCls = '';
    if (tpl.is_sleep) extraCls = ' sleep-highlight';
    else if (tpl.is_npc_dialogue) extraCls = ' npc-highlight';
    else if (tpl.is_outlaw) extraCls = ' outlaw-highlight';
    else if (tpl.tag && tpl.tag.includes('doi_doi')) extraCls = ' ambition-highlight';

    btn.className = 'btn-main-action' + extraCls;
    btn.disabled = !canRun || state.isWorking || !!freneticInterval || state.isDead;

    const reqLine = tpl.is_npc_dialogue
      ? '<span class="act-req-ok">👥 ' + missingText + ' · Bấm để trò chuyện</span>'
      : (canRun
          ? '<span class="act-req-ok">✓ Đủ điều kiện thực hiện · Ước chừng: ' + tpl.thoi_luong_mo + '</span>'
          : '<span class="act-req-missing">🔒 ' + missingText + '</span>');

    btn.innerHTML = '<span class="act-name">' + (canRun ? '▶ ' : '') + tpl.ten_vi + '</span>' + reqLine;
    btn.onclick = () => runAction(tpl, false);
    card.appendChild(btn);

    if (!tpl.is_npc_dialogue && (!tpl.tag || !tpl.tag.includes('ban_nang')) && !tpl.is_sleep) {
      const pBtn = document.createElement('button');
      pBtn.className = 'btn-push';
      pBtn.disabled = !canRun || state.isWorking || !!freneticInterval || state.isDead;
      pBtn.textContent = 'Gắng';
      pBtn.onclick = () => runAction(tpl, true);
      card.appendChild(pBtn);
    }
    menu.appendChild(card);
  });
}

// =========================================================================
// 8. KHỞI TẠO MENU & BỐC NHÂN VẬT THEO TRỌNG SỐ GIAI CẤP (MỤC 47.3 & 47.11)
// =========================================================================
function initStartMenu() {
  const list = document.getElementById('startPersonaList');
  list.innerHTML = '';
  PERSONAS.forEach(p => {
    const btn = document.createElement('button');
    btn.className = 'btn-main-action';
    btn.innerHTML = '<span class="act-name">' + p.title + '</span><span class="act-sub">' + p.than_phan + '</span>';
    btn.onclick = () => beginLifeWithPersona(p);
    list.appendChild(btn);
  });
}

window.selectStartMode = function(isAuth) {
  selectedStartMode = isAuth;
  document.getElementById('cardModeNormal').className = 'mode-card' + (!isAuth ? ' selected-normal' : '');
  document.getElementById('cardModeAuthentic').className = 'mode-card' + (isAuth ? ' selected' : '');
};

window.startRandomReincarnation = function() {
  const weightedPool = PERSONAS.map(p => {
    let w = CLASS_RARITY_WEIGHTS[p.giai_cap] || 0.5;
    if (state.lastFulfilledClass && p.giai_cap !== state.lastFulfilledClass) {
      w *= 2.0; // Mục 47.11: he_so_luan_chuyen = 2.0
    }
    return { p, w };
  });
  let r = Math.random() * weightedPool.reduce((s, item) => s + item.w, 0);
  let chosen = weightedPool[0].p;
  for (const item of weightedPool) {
    r -= item.w;
    if (r <= 0) { chosen = item.p; break; }
  }
  state.lastFulfilledClass = null;
  beginLifeWithPersona(chosen);
};

function beginLifeWithPersona(p) {
  document.getElementById('startMenuOverlay').style.display = 'none';
  closeModal();
  playReincarnationTransition(
    'Giữa vòng xoáy hai trăm năm của Hoài Dương, bạn mở mắt trong thân xác của ' + p.ten + ' (' + p.tuoi + ' tuổi)...',
    () => {
      state.persona = JSON.parse(JSON.stringify(p));
      state.authenticMode = selectedStartMode;
      state.isDead = false;
      state.isWorking = false;
      state.location = p.vi_tri_khoi_dau || 'nha';
      state.cuaCaiThen = !!p.cua_cai_then;
      state.vachRach = p.vach_rach !== undefined ? p.vach_rach : true;
      state.maiVung = !!p.mai_vung;
      state.bepConKhoi = false;
      state.daVaoHoiPhuong = false;
      state.daKetHon = p.tuoi >= 50;
      state.soCon = p.tuoi >= 50 ? 2 : 0;
      state.coBangChung = 0;
      state.benhTat = [];
      state.kyVat = [];
      if (p.id === 'P2') state.kyVat.push('Chìa khóa đồng nặng trịch nhặt dưới bùn sông');
      if (p.id === 'P3') state.kyVat.push('Con dao cũ khắc ba chấm nhỏ trên chuôi gỗ');
      if (p.id === 'P5') state.kyVat.push('Mảnh giấy chép tay các khoản lãi ngầm');
      state.deltasGhiNhan = [];
      state.macroDeltaMod = { no_khe: 0, do_rong_kho: 0, cang_thang_bach_linh: 0, to_chuc_tam_giang: 0 };
      state.macroPriceSpike = 1.0;
      state.coDuoc = 0;
      state.hoGiauDo = 0.0;
      state.thaoDuoc = 0;
      state.doDanLat = 0;
      state.hangBuon = 0;
      state.xuSat = p.xu_sat ?? 3;
      state.nuocSach = p.nuoc ?? 2;
      state.triThuc = p.tri_thuc ?? 0;
      state.voNghe = p.vo_nghe ?? 0;
      state.buonBan = p.buon_ban ?? 0;
      state.rep = { danh_du: 10, tin_nhiem_tm: 5, tin_nhiem_tg: 5, tieng_xau: 0, uy_quyen: 0 };
      initNpcRelations();
      state.hour = 8; state.dayInSeason = 10; state.seasonIdx = 3;
      state.year = (p.nam_sinh || 30) + p.tuoi;
      state.totalDaysPlayed = 0;
      state.lastTaxSeasonKey = "";
      state.lastDangerDay = -10;
      state.theLuc = 80; state.sucKhoe = 85;
      state.doi = p.doi ?? 45; state.lanh = p.lanh ?? 40; state.chan = 10;
      state.cui = p.cui ?? 1.2;
      state.goTho = p.go_tho ?? 0.0;
      state.luongLanh = p.luong_lanh ?? 0.9;
      state.luongMoc = p.luong_moc ?? 0.3;
      state.amAnhDoi = 0; state.actionsTaken = 0; state.recentHistory = [];
      state.activeCategory = 'Tất cả';

      calcTiers(state.persona);
      updateCenterStage(p.boi_canh_mo_ta, [
        { label: '📍 Đang ở: ' + PLACE_NAMES[state.location], type: '' },
        { label: '🎭 ' + p.than_phan, type: '' }
      ]);
      render();
    }
  );
}

window.returnToStartMenu = function() {
  closeModal();
  document.getElementById('startMenuOverlay').style.display = 'flex';
};

function openModal(title, htmlContent) {
  document.getElementById('modalTitle').textContent = title;
  document.getElementById('modalBody').innerHTML = htmlContent;
  document.getElementById('modalBackdrop').style.display = 'flex';
}

function closeModal() {
  document.getElementById('modalBackdrop').style.display = 'none';
}

document.getElementById('btnOpenSocial').onclick = () => {
  let rows = NPCS_DB.map(npc => {
    const r = state.npcRelations[npc.id] || { than_thien: 0, feud_bac: 0, dong_loa: false };
    const att = r.than_thien >= 30 ? "Thân thiết / Tin cậy" : (r.than_thien < 0 ? "Đề phòng / Ghét" : "Bình thường");
    const feudStr = r.feud_bac > 0 ? ('<span style="color:#ff9e80;"> · ⚡ Mối thù Bậc ' + r.feud_bac + '</span>') : '';
    const allyStr = r.dong_loa ? '<span style="color:#9ef0b6;"> · 🤝 Đồng lõa giữ bí mật</span>' : '';
    return '<div style="background:#13161d; padding:9px 12px; border-radius:6px; margin-bottom:7px; border-left:3px solid #3c5273;">' +
      '<strong>' + npc.ten + '</strong> (' + npc.vai + ' · ' + PLACE_NAMES[npc.tai_noi] + ')<br/>' +
      '<span style="font-size:13px; color:#a9b6cc;">Thái độ: ' + att + feudStr + allyStr + '</span></div>';
  }).join('');

  openModal('🤝 Mạng Lưới Quan Hệ, Danh Tiếng, Tầm Với & Delta (GĐ 4–9)',
    '<p><strong>• Danh hiệu hiện tại (Mục 24 - Ẩn con số):</strong> <span style="color:#ffd982;">' + getReputationTitle() + '</span></p>' +
    '<p><strong>• Tầm với ảnh hưởng hiện tại (Mục 9):</strong> <span style="color:#a8d1ff;">' + getPlayerReachLevel().ten + '</span></p>' +
    '<p><strong>• Tư cách Hội Phường (Mục 26):</strong> ' + (state.daVaoHoiPhuong ? '🪪 Đã là thành viên chính thức' : 'Chưa gia nhập (Có thể xin vào ở Chợ Bến Sậy)') + '</p>' +
    '<p><strong>• Bằng chứng & Kỷ vật đang giữ:</strong> ' + state.coBangChung + ' văn bản' + (state.kyVat.length > 0 ? (' · Kỷ vật: <span style="color:#ffd982;">' + state.kyVat.join(', ') + '</span>') : '') + '</p>' +
    '<p><strong>• Dấu ấn đã thay đổi thế giới (Delta - Mục 5):</strong> ' + (state.deltasGhiNhan.length > 0 ? ('<br/>🌱 ' + state.deltasGhiNhan.join('<br/>🌱 ')) : 'Chưa tạo biến đổi lớn nào so với lịch sử gốc') + '</p>' +
    '<hr style="border-color:#2b3242"/>' +
    '<p><strong>Các nhân vật trong vùng:</strong></p>' + rows
  );
};

document.getElementById('btnOpenBio').onclick = () => {
  const p = state.persona;
  if (!p) return;
  openModal('📖 Tâm Niệm & Con Đường Đổi Đời (Mục 22.5)',
    '<p><strong>Thân phận hiện tại:</strong> ' + p.ten + ' (' + p.tuoi + ' tuổi) · <strong>Giai cấp:</strong> ' + p.than_phan + '</p>' +
    '<p><strong>• Năng lực tích lũy:</strong> 📚 Tri thức: ' + state.triThuc + ' · ⚔️ Võ nghệ: ' + state.voNghe + ' · ⚖️ Buôn bán: ' + state.buonBan + '</p>' +
    '<hr style="border-color:#2b3242"/>' +
    '<p><strong>🌟 Ba con đường vượt phận hàn vi:</strong><br/>' +
    '1. <strong>Võ nghiệp (Đồn Biên Ngạn):</strong> Luyện Võ nghệ đạt ≥ 8 ➔ Lập chiến công phong bậc <strong>Kiếm Điền</strong>.<br/>' +
    '2. <strong>Khoa cử (Đường làng ➔ Kinh Hoài):</strong> Học chữ ở hiên Nhất Hỏa (Tri thức ≥ 3) rồi lên Kinh Hoài chép sách (Tri thức ≥ 6) ➔ Thi đỗ <strong>Thư lại Chức Sự</strong>.<br/>' +
    '3. <strong>Thương gia (Chợ Bến Sậy ➔ Kinh Hoài):</strong> Gia nhập <strong>Hội Phường</strong>, buôn Kiện hàng quê lên Kinh Hoài ➔ Tích 20 xu <strong>Chuộc thân</strong> hoặc 30 xu mở hiệu <strong>Bang Hàng</strong>.</p>' +
    '<div class="danger-zone-box">' +
      '<button class="btn-reincarnate-red" onclick="document.getElementById(\'confirmReincarnateBox\').style.display=\'block\'">🩸 Từ bỏ kiếp này (Sang kiếp mới)</button>' +
      '<div class="confirm-reincarnate-box" id="confirmReincarnateBox">' +
        '<div style="color:#ffb3b3; font-size:13.5px; margin-bottom:10px;">⚠️ <strong>Xác nhận buông xuôi kiếp hiện tại?</strong><br/>Mọi diễn biến của kiếp sống này sẽ khép lại và thế giới sẽ hồi quy về trạng thái ban đầu.</div>' +
        '<div style="display:flex; gap:8px; justify-content:flex-end;">' +
          '<button class="nav-btn" onclick="document.getElementById(\'confirmReincarnateBox\').style.display=\'none\'">Ở lại kiếp này</button>' +
          '<button class="btn-reincarnate-red" onclick="window.returnToStartMenu()">Xác nhận sang kiếp mới</button>' +
        '</div>' +
      '</div>' +
    '</div>'
  );
};

document.getElementById('btnToggleMute').onclick = function() {
  SoundFX.muted = !SoundFX.muted;
  this.textContent = SoundFX.muted ? '🔇 Âm thanh: TẮT' : '🔊 Âm thanh: BẬT';
};

document.getElementById('btnCloseModal').onclick = closeModal;
document.getElementById('btnSkipAuto').onclick = skipDaysSmart;

initStartMenu();
