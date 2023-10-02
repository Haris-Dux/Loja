const reviewModel = require("../Model/reviewModel");

async function createReview(req, res) {
  try {
    const reviewData = await reviewModel.createReview(req.body);
    res.status(200).json({ reviewData, msg: "" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

async function updateReview(req, res) {
  try {
    const reviewData = await reviewModel.updateReview(req.body);
    res.status(200).json({ reviewData, msg: "" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

async function deleteReview(req, res) {
  try {
    const reviewData = await reviewModel.deleteReview(req.body);
    res.status(200).json({ reviewData, msg: "" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

async function getAllReviewsByProduct(req, res) {
  try {
    const reviewData = await reviewModel.getAllReviewsByProduct(req.body);
    res.status(200).json({ reviewData, msg: "" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

module.exports = {
  createReview,
  updateReview,
  deleteReview,
  getAllReviewsByProduct,
};
