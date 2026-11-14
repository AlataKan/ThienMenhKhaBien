
export interface SurvivalForecast {
  ngay_nguy_hiem: number | null;
  nguyen_nhan_du_bao: string;
  da_cai_menh: boolean;
  mo_ta_du_bao: string;
}

export class FatePredictor {
  /** Mô phỏng nhanh biến sinh tồn 14 ngày tới để tìm ngày_nguy_hiểm (Mục 10 & 44.3) */
  public static predictFate(state: {
    doi: number; lanh: number; suc_khoe: number;
    cui: number; luong_thuc: number; isWinter: boolean;
    initialDangerDays: number | null;
  }): SurvivalForecast {
    let simDoi = state.doi;
    let simLanh = state.lanh;
    let simSucKhoe = state.suc_khoe;
    let simCui = state.cui;
    let simFood = state.luong_thuc;

    let dangerDay: number | null = null;
    let cause = 'an_toan';

    for (let day = 1; day <= 14; day++) {
      // Mỗi ngày cần ~1 phần lương thực; nếu có lương thực thì giảm đói
      if (simFood >= 0.8) {
        simFood -= 0.8;
        simDoi = Math.max(10, simDoi - 20);
      } else if (simFood > 0) {
        simDoi = Math.max(20, simDoi - simFood * 20 + 12);
        simFood = 0;
      } else {
        simDoi += 22;
      }

      // Mỗi đêm mùa Giá cần 1 bó củi để không bị lạnh cóng
      if (state.isWinter) {
        if (simCui >= 0.8) {
          simCui -= 0.8;
          simLanh = Math.max(10, simLanh - 15);
        } else {
          simCui = 0;
          simLanh += 25;
        }
      } else {
        simLanh = Math.max(0, simLanh - 10);
      }

      if (simDoi >= 95) simSucKhoe -= 28;
      else if (simDoi >= 75) simSucKhoe -= 12;

      if (simLanh >= 95) simSucKhoe -= 30;
      else if (simLanh >= 75) simSucKhoe -= 14;

      if (simSucKhoe <= 0) {
        dangerDay = day;
        cause = simDoi >= simLanh ? 'Kiệt sức vì đói' : 'Nhiễm lạnh đêm mùa Giá';
        break;
      }
    }

    const daCaiMenh = state.initialDangerDays !== null && (dangerDay === null || dangerDay > state.initialDangerDays + 3);
    let moTa = '';
    if (dangerDay === null) {
      moTa = daCaiMenh
        ? '🌟 ĐÃ CẢI MỆNH: Nhờ củi và lương thực tích trữ, bóng đen cái chết mùa Giá đã lùi xa (An toàn trên 14 ngày).'
        : 'Dự báo sinh tồn: Lượng củi và thức ăn hiện tại đủ cầm cự qua những ngày tới.';
    } else {
      moTa = '⚠️ DỰ BÁO SỐ PHẬN GỐC: Nguy cơ gục ngã sau khoảng ' + dangerDay + ' ngày nữa (' + cause + ') nếu không tích thêm lương/củi!';
    }

    return { ngay_nguy_hiem: dangerDay, nguyen_nhan_du_bao: cause, da_cai_menh: daCaiMenh, mo_ta_du_bao: moTa };
  }
}
