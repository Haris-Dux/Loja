const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const categoriesSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
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

categoriesSchema.statics.createCategory = async function (data) {
  const { name } = data;

  if (!name) {
    throw new Error("Name is empty");
  }

  const categories = await this.create({ name });
  return categories;
};

categoriesSchema.statics.updateCategory = async function (data) {
  const { id, name } = data;

  if (!id) {
    throw new Error("ID is not defined");
  }

  if (!name) {
    throw new Error("Name is empty");
  }

  const categories = await this.findByIdAndUpdate(id, { name });
  return categories;
};

categoriesSchema.statics.deleteCategory = async function (data) {
  const { id } = data;

  if (!id) {
    throw new Error("ID is not defined");
  }

  const categories = await this.findByIdAndDelete(id);
  return categories;
};

categoriesSchema.statics.getAllCategories = async function (data) {
  const categories = await this.find({});
  return categories;
};

categoriesSchema.statics.getCategory = async function (data) {
  const { name } = data;

  if (!name) {
    throw new Error("Name is empty");
  }

  const category = await this.findOne({ name });
  return category;
};

module.exports = mongoose.model("categories", categoriesSchema);
