const { Router } = require("express");
const {
  createSubCategory,
  updateSubCategory,
  deleteSubCategory,
  getAllSubCategories,
  getSubCategory,
} = require("../Controller/SubCategoryController");

const subCategoryRouter = Router();

subCategoryRouter.post("/createSubCategory", createSubCategory);
subCategoryRouter.post("/updateSubCategory", updateSubCategory);
subCategoryRouter.post("/deleteSubCategory", deleteSubCategory);
subCategoryRouter.post("/getAllSubCategories", getAllSubCategories);
subCategoryRouter.post("/getSubCategory", getSubCategory);

module.exports = subCategoryRouter;
