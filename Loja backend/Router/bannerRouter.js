const { Router } = require("express");
const {
  createBanner,
  updateBanner,
  deleteBanner,
  getAllBanners,
  getBanner,
} = require("../Controller/BannerController");

const bannerRouter = Router();

bannerRouter.post("/createBanner", createBanner);
bannerRouter.post("/updateBanner", updateBanner);
bannerRouter.post("/deleteBanner", deleteBanner);
bannerRouter.post("/getAllBanners", getAllBanners);
bannerRouter.post("/getBanner", getBanner);

module.exports = bannerRouter;
