const userModel = require("../Model/userModel");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { resetPasswordMail } = require("../assets/nodeMailer");

async function generateToken({
  data = {},
  type = "access",
  expiresIn = "1d",
} = {}) {
  const tokenSecret =
    type === "access"
      ? process.env.JWT_ACCESS_SECRET
      : process.env.JWT_REFRESH_SECRET;
  return await JWT.sign(data, tokenSecret, { expiresIn });
}

async function signup(req, res) {
  try {
    const userData = await userModel.signup(req.body);
    res.status(200).json({ userData, msg: "You Have Signed Up Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

async function login(req, res) {
  try {
    const userData = await userModel.login(req.body);

    const accessToken = await generateToken({
      data: {
        id: userData.id,
      },
    });

    res
      .status(200)
      .json({ userData, accessToken, msg: "You Have logged In Successfully" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

async function updateUser(req, res) {
  try {
    const userData = await userModel.updateUser(req.body);
    res.status(200).json({ userData, msg: "You Info has been updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

async function forgotPassword(req, res) {
  const { email } = req.body;
  const from = process.env.EMAIL_FROM;
  try {
    if (!email) {
      throw new Error("No Email Provided");
    }

    const emailRes = await resetPasswordMail(email, from);
    return res.status(200).json({ msg: "Email Sent" });
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong" });
  }
}

async function resetPassword(req, res) {
  const { resetToken, newPassword, confirmPassword } = req.body;
  // console.log(resetToken);
  try {
    if (newPassword != confirmPassword) {
      throw new Error("New Password and Confirm Password don't match");
    }

    const decodeToken = await JWT.decode(
      resetToken,
      process.env.JWT_ACCESS_SECRET
    );
    // console.log(decodeToken);
    const user = await userModel.findById(decodeToken.id);

    if (!user) {
      throw new Error("User Does Not Exist");
    }

    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(newPassword, salt);

    await userModel.findByIdAndUpdate(user.id, { password: hashPass });
    res.status(200).json({ msg: "User Password Reset" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
}

const validateToken = async (req, res) => {
  const { accessToken } = req.body;
  // console.log(accessToken);

  let tokenValidation = false;
  let validateAccessToken = false;
  let validateRefreshToken = false;
  let newAccessToken = accessToken;
  let msg = "Your session has expired";

  validateAccessToken = await JWT.verify(
    accessToken,
    process.env.JWT_ACCESS_SECRET,
    (err, decoded) => {
      if (err) {
        return false;
      }
      msg = "Your Session is valid";
      tokenValidation = true;
      return true;
    }
  );
  // console.log(validateAccessToken);
  const decodeToken = await JWT.decode(
    accessToken,
    process.env.JWT_ACCESS_SECRET
  );
  // console.log(decodeToken);

  if (!validateAccessToken) {
    const user = await userModel.findById(decodeToken.id);

    if (!user) {
      res.status(403).json({ msg: "User Not Found" });
    }

    // console.log(user);
    validateRefreshToken = await JWT.verify(
      user.refreshToken,
      process.env.JWT_REFRESH_SECRET,
      async (err, decoded) => {
        if (err) {
          return false;
        }

        msg = "Your Session is valid";
        tokenValidation = true;
        newAccessToken = generateToken({ data: user.id });
        const refreshToken = generateToken({ data: user.id, type: "refresh" });
        await userModel.findById(user.id, { refreshToken });
        return true;
      }
    );
  }
  // console.log("Token Verified");
  res.status(200).json({
    tokenValidation,
    validateAccessToken,
    validateRefreshToken,
    accessToken: newAccessToken,
    msg,
  });
};

async function logout(req, res) {
  try {
    const { id } = req.body; 
    if (!id) {
      throw new Error("ID Not Provided");
    }
    const user = await userModel.logout({ id });
    res.status(200).json({ msg: "User logged out successfully", user });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

module.exports = {
  signup,
  login, logout,
  updateUser,
  forgotPassword,
  resetPassword,
  validateToken,
};
