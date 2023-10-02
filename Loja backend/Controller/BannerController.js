const bannerModel = require("../Model/bannerModel");

async function createBanner(req, res) {
  try {
    const bannerData = await bannerModel.createBanner(req.body);
    res.status(200).json({ bannerData, msg: "Banner Created" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

async function updateBanner(req, res) {
  try {
    const bannerData = await bannerModel.updateBanner(req.body);
    res.status(200).json({ bannerData, msg: "Banner Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

async function deleteBanner(req, res) {
  try {
    const bannerData = await bannerModel.deleteBanner(req.body);
    res.status(200).json({ bannerData, msg: "Banner Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

async function getAllBanners(req, res) {
  try {
    const bannerData = await bannerModel.getAllBanners(req.body);
    res.status(200).json({ bannerData, msg: "Got All Banners" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

async function getBanner(req, res) {
  try {
    const bannerData = await bannerModel.getBanner(req.body);
    res.status(200).json({ bannerData, msg: "Got Banner" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

module.exports = {
  createBanner,
  updateBanner,
  deleteBanner,
  getAllBanners,
  getBanner,
};
