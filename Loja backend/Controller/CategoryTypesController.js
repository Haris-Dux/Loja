const categoryTypesModel = require("../Model/categoryTypesModel");

async function createCategoryType(req, res) {
  try {
    const categoryTypeData = await categoryTypesModel.createCategoryType(
      req.body
    );
    res.status(200).json({ categoryTypeData, msg: "Created Category Type" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

async function updateCategoryType(req, res) {
  try {
    const categoryTypeData = await categoryTypesModel.updateCategoryType(
      req.body
    );
    res.status(200).json({ categoryTypeData, msg: "Updated Category Type" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

async function deleteCategoryType(req, res) {
  try {
    const categoryTypeData = await categoryTypesModel.deleteCategoryType(
      req.body
    );
    res.status(200).json({ categoryTypeData, msg: "Category Type Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

async function getAllCategoryTypes(req, res) {
  try {
    const categoryTypesData = await categoryTypesModel.getAllCategoryTypes(
      req.body
    );
    res.status(200).json({ categoryTypesData, msg: "Got All Category Types" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

async function getCategoryType(req, res) {
  try {
    const categoryTypeData = await categoryTypesModel.getCategoryType(req.body);
    res.status(200).json({ categoryTypeData, msg: "Got Category Type" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

module.exports = {
  createCategoryType,
  updateCategoryType,
  deleteCategoryType,
  getAllCategoryTypes,
  getCategoryType,
};
