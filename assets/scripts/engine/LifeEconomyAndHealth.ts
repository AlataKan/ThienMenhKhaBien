import { AbilityKey } from '../core/Models';

export interface DiseaseDef {
    id: string;
    ten_vi: string;
    he_so_nang_luc: Partial<Record<AbilityKey, number>>; // Hệ số nhân vào công thức mục 36.1
    mat_suc_khoe_moi_ngay: number;
    man_tinh: boolean;
}

export const DISEASE_CATALOG: Record<string, DiseaseDef> = {
    cam_lanh: {
        id: 'cam_lanh',
        ten_vi: 'Cảm lạnh mùa Giá',
        he_so_nang_luc: { van_dong: 0.75, suc_manh: 0.75, chiu_dung: 0.65 },
        mat_suc_khoe_moi_ngay: 4,
        man_tinh: false
    },
    dau_bung: {
        id: 'dau_bung',
        ten_vi: 'Đau bụng tà (do ăn đồ mốc / nước bẩn)',
        he_so_nang_luc: { van_dong: 0.65, suc_manh: 0.6, chiu_dung: 0.55 },
        mat_suc_khoe_moi_ngay: 6,
        man_tinh: false
    },
    ho_suong: {
        id: 'ho_suong',
        ten_vi: 'Dịch Ho Sương (Biến cố E12)',
        he_so_nang_luc: { van_dong: 0.55, suc_manh: 0.6, chiu_dung: 0.45, noi: 0.7 },
        mat_suc_khoe_moi_ngay: 8,
        man_tinh: false
    }
};

export class LifeEconomyAndHealth {
    /**
     * Mục 27 & 50.4: Tính hệ số giá lương thực và củi theo 4 mùa Hoài Dương
     * 0: Nảy (Xuân - giáp hạt), 1: Nắng (Hạ), 2: Gặt (Thu - lúa rẻ), 3: Giá (Đông - củi đắt, lúa đắt)
     */
    public static getSeasonalMarketModifiers(seasonIdx: number): {
        he_so_gia_luong: number;
        he_so_gia_cui: number;
        mo_ta_thi_truong: string;
    } {
        switch (seasonIdx) {
            case 2: // Mùa Gặt
                return { he_so_gia_luong: 0.7, he_so_gia_cui: 1.0, mo_ta_thi_truong: 'Mùa Gặt thóc mới đầy chợ, giá lương thực hạ nhiệt.' };
            case 3: // Mùa Giá
                return { he_so_gia_luong: 1.45, he_so_gia_cui: 1.6, mo_ta_thi_truong: 'Mùa Giá rét đậm, củi đốt bán được giá cao nhưng gạo rất đắt.' };
            case 0: // Mùa Nảy (Giáp hạt)
                return { he_so_gia_luong: 1.25, he_so_gia_cui: 1.0, mo_ta_thi_truong: 'Mùa Nảy giáp hạt, thóc cũ trong dân đã vơi.' };
            default: // Mùa Nắng
                return { he_so_gia_luong: 1.0, he_so_gia_cui: 0.85, mo_ta_thi_truong: 'Mùa Nắng giá cả chợ phiên bình ổn.' };
        }
    }

    /**
     * Mục 27: Lương thực có hạn dùng, tự chuyển một phần thành lương ẩm mốc nếu không cất kỹ
     */
    public static applyDailyFoodSpoilage(luongLanh: number, luongMoc: number, isRainyOrHumid: boolean): {
        luongLanh: number;
        luongMoc: number;
        spoiledAmount: number;
    } {
        if (luongLanh <= 0.3) return { luongLanh, luongMoc, spoiledAmount: 0 };
        const rate = isRainyOrHumid ? 0.12 : 0.06;
        const spoiled = Math.min(luongLanh, Number((luongLanh * rate).toFixed(2)));
        return {
            luongLanh: Number((luongLanh - spoiled).toFixed(2)),
            luongMoc: Number((luongMoc + spoiled).toFixed(2)),
            spoiledAmount: spoiled
        };
    }
}
