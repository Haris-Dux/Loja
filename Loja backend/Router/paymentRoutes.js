const { Router } = require("express");
const {
  generatePayment,
  paymentSuccess,
  paymentError,
  getAllPaymentsForUser,
  getPaymentDetail,
} = require("../Controller/PaymentController");

const paymentRouter = Router();

paymentRouter.post("/generatePayment", generatePayment);

paymentRouter.post("/payment/success/:type", paymentSuccess);
paymentRouter.post("/payment/error/:type", paymentError);

paymentRouter.post("/getAllPaymentsForUser", getAllPaymentsForUser);

paymentRouter.post("/getPaymentDetail", getPaymentDetail);

module.exports = paymentRouter;
