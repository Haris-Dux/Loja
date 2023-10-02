const { Router } = require("express");
const productRouter = require("./productRoutes");
const categoryRouter = require("./categoryRoutes");
const orderRouter = require("./orderRoutes");
const paymentRouter = require("./paymentRoutes");
const userRouter = require("./userRoutes");
const reviewsRouter = require("./reviewRoutes");
const subCategoryRouter = require("./subCategoryRoutes");
const categoryTypesRouter = require("./categoryTypesRoutes");
const bannerRouter = require("./bannerRouter");

const router = Router();

router.use(userRouter);
router.use(bannerRouter);
router.use(categoryRouter);
router.use(categoryTypesRouter);
router.use(subCategoryRouter);
router.use(productRouter);
router.use(reviewsRouter);
router.use(orderRouter);
router.use(paymentRouter);

module.exports = router;

// {
//     "id": "64bb9cbe4fe0c3b89a0bb1a3",
//     "category": "64ba5cf452266bbf0232b6d9",
//     "categoryType": "64bb9bf34fe0c3b89a0bb1a1",
//     "name": "T-Shirt Mens"
//   }

// {
//     "subCategoryData": {
//       "category": "64ba5cf452266bbf0232b6d9",
//       "categoryType": "64bb9bf34fe0c3b89a0bb1a1",
//       "name": "T-Shirt Mens",
//       "createdAt": "2023-07-22T09:33:04.424Z",
//       "updatedAt": "2023-07-22T09:33:04.424Z",
//       "id": "64bba250e3193d232dd8825c"
//     },
//     "msg": "Created Sub Category"
//   }
