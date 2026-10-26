import { getBannerImage } from "../../utils/bannerImageStore";
import { toAbsoluteAssetUrl } from "../../utils/api";

const FALLBACK_IMAGES = [
  "/uploads/banners/banner1.jpg",
  "/uploads/banners/banner2.jpg",
  "/uploads/banners/banner3.jpg",
];
export const getActiveHomeBanners = () => {
  try {
    const saved = JSON.parse(localStorage.getItem("adminHomeBanners"));
    const active = Array.isArray(saved) ? saved.filter((banner) => banner?.active) : [];
    if (active.length > 0) {
      return active.map((banner, index) => ({
        ...banner,
        image: toAbsoluteAssetUrl(banner.image || FALLBACK_IMAGES[index % FALLBACK_IMAGES.length]),
      }));
    }
  } catch {
    // Use the public fallbacks when admin banner data is unavailable.
  }

  return FALLBACK_IMAGES.map((image, index) => ({
    id: `fallback-${index}`,
    image: toAbsoluteAssetUrl(image),
    title: "Sweetstar Movie",
    subtitle: "Trải nghiệm điện ảnh trọn vẹn cùng những bộ phim mới nhất.",
    active: true,
  }));
};

export const hydrateHomeBannerImages = async (banners) => Promise.all(
  banners.map(async (banner) => {
    try {
      const storedImage = await getBannerImage(banner.imageKey);
      return storedImage ? { ...banner, image: toAbsoluteAssetUrl(storedImage) } : banner;
    } catch {
      return banner;
    }
  }),
);
