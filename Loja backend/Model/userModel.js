const { default: mongoose } = require("mongoose");
const JWT = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const validator = require("validator");

const Schema = mongoose.Schema;

const usersSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      default: "",
    },
    phone: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      required: true,
    },
    refreshToken: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

function setMongoose() {
  return mongoose.set("toJSON", {
    virtuals: true,
    transform: (doc, returnValue) => {
      delete returnValue.password;
      delete returnValue.refreshToken;
      delete returnValue._id;
      delete returnValue.__v;
      delete returnValue.createdAt;
      delete returnValue.updatedAt;
    },
  });
}

async function catchErrors(error) {
  const errorException = new Error("");

  let errorMsg = "";
  let errorCode = "400";

  if (error.code === 11000) {
    errorMsg = `${Object.keys(error.keyValue)[0]} already exists`;
  } else {
    errorMsg = Object.values(error.message)[0];
  }

  errorException.statusCode = errorCode;
  errorException.message = errorMsg;

  throw errorException;
}

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

usersSchema.statics.signup = async function (data) {
  const { name, email, password, role } = data;

  if (!name) {
    throw new Error("Name Field is empty");
  }
  if (!email) {
    throw new Error("Email Field is empty");
  }

  if (!password) {
    throw new Error("Password Field is empty");
  }

  if (!role) {
    throw new Error("Role is not set");
  }

  const validateEmail = validator.isEmail(email);

  if (!validateEmail) {
    throw new Error("This is not a valid E-mail");
  }

  const salt = await bcrypt.genSalt(10);
  const hashPass = await bcrypt.hash(password, salt);

  const user = await this.create({
    name,
    email,
    password: hashPass,
    role,
  }).catch((error) => catchErrors(error));

  setMongoose();

  return user;
};

usersSchema.statics.login = async function (data) {
  const { email, password } = data;

  if (!email) {
    throw new Error("Email Field is empty");
  }

  if (!password) {
    throw new Error("Password Field is empty");
  }

  // if (!role) {
  //   throw new Error("Role is not set");
  // }

  const validateEmail = validator.isEmail(email);

  if (!validateEmail) {
    throw new Error("This is not a valid E-mail");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw new Error("User Does Not Exist!");
  }

  const comparePass = await bcrypt.compare(password, user.password);

  if (!comparePass) {
    throw new Error("Password is incorrect");
  }

  const refreshToken = await generateToken({
    data: {
      id: user.id,
    },
    type: "refresh",
  });

  const updateRefreshToken = await this.findByIdAndUpdate(user.id, {
    refreshToken,
  });

  if (!updateRefreshToken) {
    throw new Error("Could not create a token");
  }

  setMongoose();

  return user;
};

// usersSchema.statics.logout = async function (data) {
//   const { id } = data;
//   const user = await this.findByIdAndUpdate(id, { refreshToken: "" });
//   user.refreshToken = null;
//   return;
// };

usersSchema.statics.logout = async function (data) {
  const { id } = data;

  if (!id) {
    throw new Error("ID Not Provided");
  }
  const user = await this.findById(id);

  if (!user) {
    throw new Error("User Not Found");
  }
  user.refreshToken = null;
  await user.save();
  return user;
};


// usersSchema.statics.updateUser = async function (data) {
//   const { id, name, email, address, phone, newPassword, confirmPassword } =
//     data;

//   let updateFields = {
//     name,
//     address,
//     phone,
//     email,
//   };

//   // if (!name) {
//   //   throw new Error("Name Field is empty");
//   // }

//   // if (!email) {
//   //   throw new Error("Email Field is empty");
//   // }

//   // if (!address) {
//   //   throw new Error("Address Field is empty");
//   // }

//   // if (!phone) {
//   //   throw new Error("Phone Field is empty");
//   // }

//   const validateEmail = validator.isEmail(email);

//   if (!validateEmail) {
//     throw new Error("This is not a valid E-mail");
//   }

//   if (newPassword) {
//     if (newPassword != confirmPassword) {
//       throw new Error("New Password and Confirm Password do not match");
//     }

//     if (newPassword === confirmPassword) {
//       const salt = await bcrypt.genSalt(10);
//       const hashPass = await bcrypt.hash(newPassword, salt);

//       updateFields = {
//         ...updateFields,
//         password: hashPass,
//       };
//     }
//   }

//   const user = await this.findByIdAndUpdate(id, updateFields);

//   if (!user) {
//     throw new Error("Was not able to update user");
//   }

//   setMongoose();

//   return user;
// };


usersSchema.statics.updateUser = async function (data) {
  const { id, name, email, address, phone, newPassword, confirmPassword } = data;

  let updateFields = {
    name,
    email,
  };

  if (address) {
    updateFields.address = address;
  }

  if (phone) {
    updateFields.phone = phone;
  }

  // Check for newPassword and confirmPassword here and update password if needed.

  const user = await this.findByIdAndUpdate(id, updateFields);

  if (!user) {
    throw new Error("Was not able to update user");
  }

   setMongoose();

   return user;
}

usersSchema.statics.getUser = function (data) {
  const { id } = data;

  if (!id) {
    throw new Error("ID Not Provided");
  }

  const user = this.findById(id);

  return user;
};

module.exports = mongoose.model("users", usersSchema);
