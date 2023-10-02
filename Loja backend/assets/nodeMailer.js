const nodemailer = require("nodemailer");
const JWT = require("jsonwebtoken");
const userModel = require("../Model/userModel");

const resetPasswordMail = async (to, from) => {
  // const user = await userModel.findOne({ email: to });
  const user = await userModel.findOne({ email: "demo1@example.com" });

  if (!user) {
    throw new Error("This user Does not exist");
  }
  console.log("user: ", user);
  const resetToken = await JWT.sign(
    { id: user.id },
    process.env.JWT_ACCESS_SECRET,
    { expiresIn: "15m" }
  );

  const output = `
    <h3>Password Reset Link</h3>
    <p>This link will expire in 15 minutes</p>
    <a href="http://localhost:3000/user/resetPassword?t=${resetToken}" target="_blank">Reset Link</a>
  `;

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    // host: "",
    // service: "gmail",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_AUTH_USER_EMAIL, // generated ethereal user
      pass: process.env.EMAIL_AUTH_PASSWORD, // generated ethereal password
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  // setup email data with unicode symbols
  let mailOptions = {
    from, // sender address
    to, // list of receivers
    subject: "Reset Passowrd Link", // Subject line
    html: output, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      return false;
    }
    // console.log(info);
    return true;
  });

  // console.log(transporter);
};

module.exports = { resetPasswordMail };
