/**
 * GIAI ĐOẠN 4, 5 & 6: XÃ HỘI, DANH VỌNG, MỐI THÙ (FEUD), HỘI ĐƯỜNG & TÁCH FACT/BELIEF
 * Tuân thủ Mục 21, 22.4, 24, 25, 26, 30, 31, 40, 43.8, 45.2, 45.3 của tài liệu thiết kế.
 */
export type ReputationType = 'danh_du' | 'tin_nhiem_thuong_mai' | 'tin_nhiem_ton_giao' | 'tieng_xau' | 'uy_quyen';

export interface BeliefRecord {
  chu_the: string;
  menh_de: string;
  do_tin: number; // 0.0 - 1.0
  nguon: string;
}

export interface FeudRecord {
  voi_npc: string;
  bac: 0 | 1 | 2 | 3 | 4; // 0: Bình thường, 1: Xích mích, 2: Căm ghét, 3: Phá hoại ngầm, 4: Bạo lực
  nguyen_nhan: string;
}

export interface AccompliceRecord {
  voi_npc: string;
  bi_mat_chung: string;
  hieu_luc: number; // 0 - 100
}

export class SocialAndBeliefEngine {
  /**
   * Mục 24 & 45.3: Sinh danh hiệu / biệt danh từ danh vọng nổi bật (Ẩn hoàn toàn con số với người chơi)
   */
  public static getVisibleTitle(rep: Record<ReputationType, number>): string {
    if (rep.tieng_xau >= 45) return 'Biệt danh: Kẻ Có Tiếng Xấu Ngoài Lề';
    if (rep.uy_quyen >= 50) return 'Danh hiệu: Người Có Uy Quyền';
    if (rep.tin_nhiem_thuong_mai >= 45) return 'Danh hiệu: Bạn Hàng Giữ Chữ Tín';
    if (rep.tin_nhiem_ton_giao >= 45) return 'Danh hiệu: Người Mộ Đạo Hiền Hòa';
    if (rep.danh_du >= 45) return 'Danh hiệu: Kẻ Giữ Lời';
    if (rep.danh_du <= -25) return 'Tiếng đồn: Kẻ Thất Hứa';
    return 'Tiếng tăm: Dân thường vô danh';
  }

  /**
   * Mục 43.8: Phát hiện nói dối dựa trên thiên phú nhay_ben_xa_hoi.
   * Chỉ tiết lộ dấu hiệu của Belief/cảm xúc NPC, tuyệt đối không tiết lộ Fact khách quan.
   */
  public static detectLieProbability(params: {
    mucNhayBenXaHoi: number;
    kichHoat: number;
    kinhNghiemGiaoTe: number;
    taiAnNoiNpc: number;
  }): number {
    const d = (params.mucNhayBenXaHoi - 50) / 50;
    const p =
      0.3 +
      0.3 * d * params.kichHoat +
      0.2 * (params.kinhNghiemGiaoTe / 100) -
      0.2 * ((params.taiAnNoiNpc - 50) / 50);
    return Math.max(0.05, Math.min(0.9, p));
  }

  /**
   * Mục 22.4: Công lý theo giai cấp
   * Cùng một tội, quý tộc/người có tiền và quan hệ bảo lãnh bị phạt nhẹ hơn hẳn nông nô/ngoài lề.
   */
  public static calculateClassPenalty(params: {
    mucDoToi: number;
    diaViNanNhan: number;
    giaiCapPhamToi: string;
    xuSatBaoLanh: number;
    quanHeCheCho: number;
  }): { mucPhat: number; hinhThuc: string } {
    const classMultiplier: Record<string, number> = {
      ke_ngoai_le: 1.5,
      nong_no_ruong_dat: 1.35,
      nong_dan_tu_do: 1.15,
      tho_thu_cong: 1.0,
      thuong_nhan_thi_dan: 0.75,
      giao_si: 0.65,
      ky_si_quan_nhan: 0.5,
      quan_lai: 0.45
    };
    const mult = classMultiplier[params.giaiCapPhamToi] ?? 1.0;
    const shield = 1 + params.xuSatBaoLanh * 0.15 + params.quanHeCheCho * 0.25;
    const rawPenalty = (params.mucDoToi * (1 + params.diaViNanNhan / 100) * mult) / shield;

    if (rawPenalty >= 45) {
      return { mucPhat: rawPenalty, hinhThuc: 'Đánh roi công khai & Phạt lao dịch khổ sai' };
    }
    if (rawPenalty >= 20) {
      return { mucPhat: rawPenalty, hinhThuc: 'Tịch thu tài sản / Phạt lao dịch ngắn hạn' };
    }
    return { mucPhat: rawPenalty, hinhThuc: 'Nộp phạt bằng xu sắt / Nhắc nhở nhờ có bảo lãnh' };
  }
}
