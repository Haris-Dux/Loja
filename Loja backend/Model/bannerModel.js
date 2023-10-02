const { default: mongoose } = require("mongoose");
const {
  uploadImageToCloudinary,
  deleteImageFromCloudinary,
} = require("../assets/cloudinarySetup");

const Schema = mongoose.Schema;

const bannersSchema = new Schema(
  {
    title: {
      text: { type: String, default: "" },
      color: { type: String, default: "#242424" },
    },
    subTitle: {
      text: { type: String, default: "" },
      color: { type: String, default: "#242424" },
    },
    image: {
      public_id: { type: String, required: true },
      secure_url: { type: String, required: true },
      size: { type: String, required: true },
      name: { type: String, required: true },
      type: { type: String, required: true },
    },
    btn: {
      text: { type: String, default: "" },
      color: { type: String, default: "#ffffff" },
      bgColor: { type: String, default: "#242424" },
      link: { type: String, default: "" },
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

bannersSchema.statics.createBanner = async function (data) {
  const { title, subTitle, image, btn } = data;
  const { size, name, type, public_id, secure_url } =
    await uploadImageToCloudinary(image, "/banners");
  const cloudinaryImageData = { size, name, type, public_id, secure_url };

  if (title) {
    if (Object.keys(title).length != 2) {
      throw new Error("Title properties are not defined");
    } else {
      if (Object.keys(title).some((value) => value === "text")) {
        console.log(title.text);
        if (!title.text) {
          throw new Error("Text property is empty");
        }
      } else {
        throw new Error("Text property is not defined");
      }

      if (Object.keys(title).some((value) => value === "color")) {
        if (!title.color) {
          throw new Error("Color property is empty");
        }
      } else {
        throw new Error("Color property is not defined");
      }
    }
  }

  if (subTitle) {
    if (Object.keys(subTitle).length != 2) {
      throw new Error("Sub Title properties are not defined");
    } else {
      if (Object.keys(subTitle).some((value) => value === "text")) {
        console.log(subTitle.text);
        if (!subTitle.text) {
          throw new Error("Text property is empty");
        }
      } else {
        throw new Error("Text property is not defined");
      }

      if (Object.keys(subTitle).some((value) => value === "color")) {
        if (!subTitle.color) {
          throw new Error("Color property is empty");
        }
      } else {
        throw new Error("Color property is not defined");
      }
    }
  }

  if (btn) {
    if (Object.keys(btn).length != 4) {
      throw new Error("Button properties are not defined");
    } else {
      Object.keys(subTitle).map((value) => {
        if (value != "text") {
          throw new Error("Text property is not defined");
        }
        if (value != "color") {
          throw new Error("Color property is not defined");
        }
        if (value != "bgColor") {
          throw new Error("Background Color property is not defined");
        }
        if (value != "link") {
          throw new Error("Link is not defined");
        }
      });
    }
  }

  const banners = await this.create({
    title,
    subTitle,
    image: cloudinaryImageData,
    btn,
  });
  // const banners = true;
  return banners;
};

bannersSchema.statics.updateBanner = async function (data) {
  const { id, title, subTitle, image, btn } = data;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    throw new Error("Not a Valid ID");
  }

  let bannerQuery = {};

  if (image) {
    const { size, name, type, public_id, secure_url } =
      await uploadImageToCloudinary(image, "/banners");
    const cloudinaryImageData = { size, name, type, public_id, secure_url };

    const bannerData = await this.findById(id);

    deleteImageFromCloudinary(bannerData.image.public_id);

    bannerQuery = { ...bannerQuery, image: cloudinaryImageData };
  }

  if (title) {
    if (Object.keys(title).length != 2) {
      throw new Error("Title properties are not defined");
    } else {
      if (Object.keys(title).some((value) => value === "text")) {
        console.log(title.text);
        if (!title.text) {
          throw new Error("Text property is empty");
        }
      } else {
        throw new Error("Text property is not defined");
      }

      if (Object.keys(title).some((value) => value === "color")) {
        if (!title.color) {
          throw new Error("Color property is empty");
        }
      } else {
        throw new Error("Color property is not defined");
      }
    }
    bannerQuery = { ...bannerQuery, title };
  }

  if (subTitle) {
    if (Object.keys(subTitle).length != 2) {
      throw new Error("Sub Title properties are not defined");
    } else {
      if (Object.keys(subTitle).some((value) => value === "text")) {
        console.log(subTitle.text);
        if (!subTitle.text) {
          throw new Error("Text property is empty");
        }
      } else {
        throw new Error("Text property is not defined");
      }

      if (Object.keys(subTitle).some((value) => value === "color")) {
        if (!subTitle.color) {
          throw new Error("Color property is empty");
        }
      } else {
        throw new Error("Color property is not defined");
      }
    }
    bannerQuery = { ...bannerQuery, subTitle };
  }

  if (btn) {
    if (Object.keys(btn).length != 4) {
      throw new Error("Button properties are not defined");
    } else {
      Object.keys(btn).map((value) => {
        if (value != "text") {
          throw new Error("Text property is not defined");
        }
        if (value != "color") {
          throw new Error("Color property is not defined");
        }
        if (value != "bgColor") {
          throw new Error("Background Color property is not defined");
        }
        if (value != "link") {
          throw new Error("Link is not defined");
        }
      });
    }
    bannerQuery = { ...bannerQuery, btn };
  }

  const banner = await this.findByIdAndUpdate(id, bannerQuery);

  return banner;
};

bannersSchema.statics.deleteBanner = async function (data) {
  const { id } = data;

  if (!id) {
    throw new Error("ID is missing");
  }

  const bannerData = await this.findById(id);

  deleteImageFromCloudinary(bannerData.image.public_id);

  const banners = await this.findByIdAndDelete(id);
  return banners;
};

bannersSchema.statics.getAllBanners = async function (data) {
  const banners = await this.find({});
  return banners;
};

bannersSchema.statics.getBanner = async function (data) {
  const { id } = data;

  if (!id) {
    throw new Error("ID is missing");
  }

  const banner = await this.findById(id);
  return banner;
};

module.exports = mongoose.model("banners", bannersSchema);
