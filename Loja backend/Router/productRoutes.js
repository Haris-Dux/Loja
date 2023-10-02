const { Router } = require("express");

const productRouter = Router();

const {
  createProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
} = require("../Controller/ProductController");

productRouter.post("/createProduct", createProduct);
productRouter.post("/updateProduct", updateProduct);
productRouter.post("/deleteProduct", deleteProduct);
productRouter.post("/getAllProducts", getAllProducts);
productRouter.post("/getProduct", getProduct);

module.exports = productRouter;
