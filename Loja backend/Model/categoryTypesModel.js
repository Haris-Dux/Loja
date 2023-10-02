const { default: mongoose } = require("mongoose");
const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require("../assets/cloudinarySetup");
const cloudinary = require('../assets/cloudinary')

const Schema = mongoose.Schema;

const categoryTypesSchema = new Schema(
  {
    category: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    image: {
      public_id: { type: String },
      secure_url: { type: String },
      // size: { type: String },
      // name: { type: String },
      // type: { type: String },
    },
    name: {
      type: String,
      required: true,
    },
    color: {
      type: String,
      default: "#242424",
    },
  },
  { timestamps: true }
);

mongoose.set("toJSON", {
  virtuals: true,
  transform: (doc, returnValue) => {
    delete returnValue._id;
    delete returnValue.__v;
  },
});

categoryTypesSchema.statics.createCategoryType = async function (data) {
  const { category, image, name, color } = data;

  let categoryTypeQuery = { category, name };

  if (!name) {
    throw new Error("Name is empty");
  }

  if (!category) {
    throw new Error("Category not selected");
  }

  if (color) {
    categoryTypeQuery = { ...categoryTypeQuery, color };
  }

  if (image) {
    const result = await cloudinary.uploader.upload(image,{
      folder: "Loja-CategoryTypes",
      use_filename: true,
      unique_filename: false,
      overwrite: true,
      timeout: 1200000,
      resource_type: 'auto'
    });
    const cloudinaryImageData = {
      public_id: result.public_id ,
      secure_url: result.secure_url ,
    };

    categoryTypeQuery = { ...categoryTypeQuery, image: cloudinaryImageData };
  }

  const categoriesType = await this.create(categoryTypeQuery);
  return categoriesType;
};

categoryTypesSchema.statics.updateCategoryType = async function (data) {
  const { id, category, name, color, image } = data;

  let categoryTypeQuery = { category, name };

  if (!id) {
    throw new Error("ID is not defined");
  }

  if (!name) {
    throw new Error("Name is empty");
  }

  if (!category) {
    throw new Error("Category not selected");
  }

  if (color) {
    categoryTypeQuery = { ...categoryTypeQuery, color };
  }

  if (image) {
    const {
      size,
      name: imageName,
      type,
      public_id,
      secure_url,
    } = await uploadImageToCloudinary(image, "/categoryTypes");
    const cloudinaryImageData = {
      size,
      name: imageName,
      type,
      public_id,
      secure_url,
    };

    const categoryTypeData = await this.findById(id);

    if (categoryTypeData.image.public_id) {
      deleteImageFromCloudinary(categoryTypeData.image.public_id);
    }

    categoryTypeQuery = { ...categoryTypeQuery, image: cloudinaryImageData };
  }

  const categoriesType = await this.findByIdAndUpdate(id, categoryTypeQuery);
  return categoriesType;
};

categoryTypesSchema.statics.deleteCategoryType = async function (data) {
  const { id } = data;

  if (!id) {
    throw new Error("ID is not defined");
  }

  const categoryTypeData = await this.findById(id);

  deleteImageFromCloudinary(categoryTypeData.image.public_id);

  const categoriesType = await this.findByIdAndDelete(id);
  return categoriesType;
};

categoryTypesSchema.statics.getAllCategoryTypes = async function (data) {
  const { category } = data;

  if (!category) {
    throw new Error("Category not selected");
  }

  const categoriesTypes = await this.find({ category });
  return categoriesTypes;
};

categoryTypesSchema.statics.getCategoryType = async function (data) {
  const { category, name } = data;

  if (!name) {
    throw new Error("Name is empty");
  }

  if (!category) {
    throw new Error("Category is empty");
  }

  const categoryType = await this.findOne({ category, name });
  return categoryType;
};

module.exports = mongoose.model("categoryTypes", categoryTypesSchema);
