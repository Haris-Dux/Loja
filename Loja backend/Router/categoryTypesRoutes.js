const { Router } = require("express");
const {
  createCategoryType,
  updateCategoryType,
  deleteCategoryType,
  getAllCategoryTypes,
  getCategoryType,
} = require("../Controller/CategoryTypesController");

const categoryTypesRouter = Router();

categoryTypesRouter.post("/createCategoryType", createCategoryType);

categoryTypesRouter.post("/updateCategoryType", updateCategoryType);

categoryTypesRouter.post("/deleteCategoryType", deleteCategoryType);

categoryTypesRouter.post("/getAllCategoryTypes", getAllCategoryTypes);

categoryTypesRouter.post("/getCategoryType", getCategoryType);

module.exports = categoryTypesRouter;
