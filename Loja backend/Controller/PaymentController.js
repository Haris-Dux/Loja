const paymentModel = require("../Model/paymentModel");

async function generatePayment(req, res) {
  try {
    const paymentData = await paymentModel.generatePayment(req.body);
    res.status(200).json({ paymentData, msg: "" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

async function getAllPaymentsForUser(req, res) {
  try {
    const paymentData = await paymentModel.getAllPaymentsForUser(req.body);
    res.status(200).json({ paymentData, msg: "" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

async function paymentSuccess(req, res) {
  try {
    const paymentData = await paymentModel.paymentSuccess(req.body);
    res.status(200).json({ paymentData, msg: "" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

async function paymentError(req, res) {
  try {
    const paymentData = await paymentModel.paymentError(req.body);
    res.status(200).json({ paymentData, msg: "" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

async function getPaymentDetail(req, res) {
  try {
    const paymentData = await paymentModel.getPaymentDetail(req.body);
    res.status(200).json({ paymentData, msg: "" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

module.exports = {
  generatePayment,
  getAllPaymentsForUser,
  paymentSuccess,
  paymentError,
  getPaymentDetail,
};
