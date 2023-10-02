const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const reviewsSchema = new Schema(
  {
    productID: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    userID: {
      type: mongoose.Types.ObjectId,
      required: true,
    },
    review: {
      type: String,
      required: true,
    },
    rating: {
      type: Number,
      required: true,
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

reviewsSchema.statics.createReview = async function (data) {
  const { productID, userID, review, rating } = data;
  const reviews = await this.create({ productID, userID, review, rating });
  return reviews;
};

reviewsSchema.statics.updateReview = async function (data) {
  const { id, productID, userID, review, rating } = data;
  const reviews = await this.findByIdAndUpdate(id, {
    productID,
    userID,
    review,
    rating,
  });
  return reviews;
};

reviewsSchema.statics.deleteReview = async function (data) {
  const { id } = data;
  const reviews = await this.findByIdAndDelete(id);
  return reviews;
};

reviewsSchema.statics.getAllReviewsByProduct = async function (data) {
  const { productID } = data;
  const reviews = await this.find({ productID });
  return reviews;
};

module.exports = mongoose.model("reviews", reviewsSchema);
