const { Router } = require("express");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getCategory,
} = require("../Controller/CategoryController");

const categoryRouter = Router();

categoryRouter.post("/createCategory", createCategory);

categoryRouter.post("/updateCategory", updateCategory);

categoryRouter.post("/deleteCategory", deleteCategory);

categoryRouter.post("/getAllCategories", getAllCategories);

categoryRouter.post("/getCategory", getCategory);

module.exports = categoryRouter;
