const JWT = require("jsonwebtoken");
const UsersModel = require("../Models/UsersModel");

const Authorization = async (req, res, next) => {
  const accessToken = req.cookies.accessToken || null;

  if (!accessToken) {
    return res.status(401).json({ msg: "Not Authorized: Token Not Available" });
  }

  let tokenValidation = false;
  let validateAccessToken = false;
  let validateRefreshToken = false;

  validateAccessToken = await JWT.verify(
    accessToken,
    process.env.JWT_ACCESS_SECRET,
    (err, decoded) => {
      if (err) {
        return false;
      }
      tokenValidation = true;
      return true;
    }
  );
  //   console.log(validateAccessToken);
  const decodeToken = await JWT.decode(
    accessToken,
    process.env.JWT_ACCESS_SECRET
  );
  //   console.log(decodeToken);

  if (!validateAccessToken) {
    const user = await UsersModel.findById(decodeToken.id);
    // console.log(user);
    validateRefreshToken = await JWT.verify(
      user.refreshToken,
      process.env.JWT_REFRESH_SECRET,
      (err, decoded) => {
        if (err) {
          return false;
        }
        tokenValidation = true;
        return true;
      }
    );
  }
  //   console.log("Token Verified");
  if (!tokenValidation) {
    return res.status(401).json({ msg: "Not Authorized" });
  } else {
    return next();
  }
  //   return next();
};

module.exports = { Authorization };
