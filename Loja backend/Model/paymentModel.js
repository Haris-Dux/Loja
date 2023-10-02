const { default: mongoose } = require("mongoose");

const Schema = mongoose.Schema;

const paymentsSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    transaction_ID: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
    },
    statusMessage: {
      type: String,
      default: "",
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

paymentsSchema.statics.generatePayment = async function (data) {
  const { type = "cod" } = data;

  let paymentQuery = {};

  if ((type = "cod")) {
    paymentQuery = {
      type: "cod",
    };
  }

  const payment = await this.create(paymentQuery);
  return payment;
};

paymentsSchema.statics.paymentSuccess = async function (data) {
  const { id, transaction_ID, statusMessage } = data;
  const payment = await this.findByIdAndUpdate(id, {
    transaction_ID,
    status: "success",
    statusMessage,
  });
  return payment;
};

paymentsSchema.statics.paymentError = async function (data) {
  const { id, statusMessage } = data;
  const payment = await this.findByIdAndUpdate(id, {
    status: "error",
    statusMessage,
  });
  return payment;
};

paymentsSchema.statics.getAllPaymentsForUser = async function (data) {
  const {} = data;
  const payment = await this.find({});
  return payment;
};

paymentsSchema.statics.getPaymentDetail = async function (data) {
  const { id } = data;
  const payment = await this.findById(id);
  return payment;
};

module.exports = mongoose.model("payments", paymentsSchema);
