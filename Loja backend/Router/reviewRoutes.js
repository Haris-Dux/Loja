const { Router } = require("express");
const {
  createReview,
  updateReview,
  deleteReview,
  getAllReviewsByProduct,
} = require("../Controller/reviewController");

const reviewsRouter = Router();

reviewsRouter.post("/createReview", createReview);
reviewsRouter.post("/updateReview", updateReview);
reviewsRouter.post("/deleteReview", deleteReview);
reviewsRouter.post("/getAllReviewsByProduct", getAllReviewsByProduct);

module.exports = reviewsRouter;
