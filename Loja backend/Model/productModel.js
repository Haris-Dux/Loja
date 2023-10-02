const { default: mongoose } = require("mongoose");
const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require("../assets/cloudinarySetup");
const validator = require("validator");
const cloudinary = require('../assets/cloudinary')

const Schema = mongoose.Schema;

const productsSchema = new Schema(
  {
    image: {
      public_id: { type: String, required: true },
      secure_url: { type: String, required: true },
      // size: { type: String, required: true },
      // name: { type: String, required: true },
      // type: { type: String, required: true },
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    colors: {
      type: Array,
      default: [],
    },
    category: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
     categoryType: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    subCategory: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    discount: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    availableQuantity: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 5,
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

function isFieldEmpty(fieldName, msg = null) {
  let fieldValidation = false;

  if (fieldName) {
    fieldValidation = true;
  } else {
    if (msg) {
      throw new Error(msg);
    } else {
      throw new Error("Something Went Wrong");
    }
  }
  return fieldValidation;
}

productsSchema.statics.createProduct = async function (data) {
  const {
    image,
    name,
    description,
    colors,
    category,
    categoryType,
    subCategory,
    price,
    discount,
    availableQuantity,
    featured,
  } = data;

  isFieldEmpty(name, "Name Field is Empty");
  isFieldEmpty(description, "Description Field is Empty");
  isFieldEmpty(category, "Category Not Selected");
  //isFieldEmpty(categoryType, "Category Type Not Selected");
  //isFieldEmpty(subCategory, "Sub Category Not Selected");
  isFieldEmpty(colors, "No Colors Added");
  isFieldEmpty(price, "Price Field is Empty");

  if (colors.length <= 0) {
    throw new Error("You Must Select At Least 1 Color");
  }

  if (price <= 0) {
    throw new Error("Price must be greater then 0");
  }

  const result = await cloudinary.uploader.upload(image,{
    folder: "morat-images" ,
    use_filename: true,
    unique_filename: false,
    overwrite: true,
    timeout: 1200000,
    resource_type: 'auto'
  });
  
  let productQuery = {
     image: {
      public_id: result.public_id ,
      secure_url: result.secure_url ,
    },
    name,
    description,
    colors,
    category,
    categoryType,
    subCategory,
    price,
  };

  if (availableQuantity) {
    if (availableQuantity <= 0) {
      throw new Error("Available Quantity must be greater then 0");
    }
    productQuery = { ...productQuery, availableQuantity };
  }

  if (discount) {
    productQuery = { ...productQuery, discount };
  }

  if (availableQuantity) {
    productQuery = { ...productQuery, availableQuantity };
  }

  if (featured) {
    productQuery = { ...productQuery, featured };
  }

  const product = await this.create(productQuery);

  if (!product) {
    await deleteImageFromCloudinary(public_id);
    throw new Error("Your data was not uploaded");
  }

  return product;
};

productsSchema.statics.updateProduct = async function (data) {
  const {
    id,
    image,
    name,
    description,
    colors,
    category,
    categoryType,
    subCategory,
    price,
    discount,
    availableQuantity,
    featured,
    rating,
  } = data;

  isFieldEmpty(id, "No ID Provided");
  isFieldEmpty(name, "Name Field is Empty");
  isFieldEmpty(description, "Description Field is Empty");
  isFieldEmpty(category, "Category Not Selected");
  isFieldEmpty(categoryType, "Category Type Not Selected");
  isFieldEmpty(subCategory, "Sub Category Not Selected");
  isFieldEmpty(colors, "No Colors Added");
  isFieldEmpty(price, "Price Field is Empty");

  if (colors.length <= 0) {
    throw new Error("You Must Select At Least 1 Color");
  }

  if (price <= 0) {
    throw new Error("Price must be greater then 0");
  }

  let productUpdateQuery = {
    name,
    description,
    colors,
    category,
    categoryType,
    subCategory,
    price,
  };

  if (availableQuantity) {
    if (availableQuantity <= 0) {
      throw new Error("Available Quantity must be greater then 0");
    }
    productUpdateQuery = { ...productUpdateQuery, availableQuantity };
  }

  if (discount) {
    productUpdateQuery = { ...productUpdateQuery, discount };
  }

  if (availableQuantity) {
    productUpdateQuery = { ...productUpdateQuery, availableQuantity };
  }

  if (featured) {
    productUpdateQuery = { ...productUpdateQuery, featured };
  }

  if (rating) {
    productUpdateQuery = { ...productUpdateQuery, rating };
  }

  if (image) {
    const result = await cloudinary.uploader.upload(image,{
      folder: "morat-images" ,
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

    const productData = await this.findById(id);

    await deleteImageFromCloudinary(productData.image.public_id);

    productUpdateQuery = { ...productUpdateQuery, image: cloudinaryImageData };
  }

  const product = await this.findByIdAndUpdate(id, productUpdateQuery);

  if (!product) {
    await deleteImageFromCloudinary(public_id);
    throw new Error("Your data was not updated");
  }

  return product;
};

productsSchema.statics.deleteProduct = async function (data) {
  const { id } = data;

  isFieldEmpty(id, "No ID Provided");

  const productData = await this.findById(id);
  deleteImageFromCloudinary(productData.image.public_id);

  const product = await this.findByIdAndDelete(id);

  if (!product) {
    throw new Error("Your data was not deleted");
  }

  return product;
};

productsSchema.statics.getAllProducts = async function (data) {
  const {
    name = "",
    colors,
    category,
    categoryType,
    subCategory,
    price = { priceMin: 0, priceMax: 99999 },
    featured,
    currentPage = 1,
    limit = 30,
  } = data;

  let productQuery = { availableQuantity: { $gt: 0 } };

  if (category) {
    productQuery = { ...productQuery, category };
  }

  if (categoryType) {
    productQuery = { ...productQuery, categoryType };
  }

  if (subCategory) {
    productQuery = { ...productQuery, subCategory };
  }

  if (name) {
    productQuery = {
      ...productQuery,
      name: { $regex: ".*" + name + ".*", $options: "i" },
    };
  }

  if (colors) {
    productQuery = { ...productQuery, colors };
  }

  if (price) {
    const { priceMin, priceMax } = price;
    productQuery = {
      ...productQuery,
      price: { $gte: priceMin, $lte: priceMax },
    };
  }

  if (typeof featured == "boolean") {
    productQuery = { ...productQuery, featured };
  }

  const totalItems = await this.find(productQuery).count();
  const products = await this.find(productQuery)
    .limit(limit)
    .skip((currentPage - 1) * limit)
    .sort({ createdAt: -1 });

  if (!products) {
    throw new Error("Your data was not received");
  }

  return { products, totalPages: Math.ceil(totalItems / limit), currentPage };
};

productsSchema.statics.getProduct = async function (data) {
  const { id } = data;

  isFieldEmpty(id, "No ID Provided");

  const product = await this.findById(id);

  if (!product) {
    throw new Error("Your Data was not received");
  }

  return product;
};

module.exports = mongoose.model("products", productsSchema);
