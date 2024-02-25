const { catchAsyncErrors } = require("../middlewares/catchAsyncError.js");
const { User } = require("../models/userSchema.js");
const ErrorHandler = require("../middlewares/error.js");
// const { sendToken } = require("../utils/jwtToken.js");

exports.register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, phone, password, role } = req.body;
  if (!name || !email || !phone || !password || !role) {
    return next(new ErrorHandler("Please fill full form!"));
  }
  const isEmail = await User.findOne({ email });
  if (isEmail) {
    return next(new ErrorHandler("Email already registered!"));
  }
  const user = await User.create({
    name,
    email,
    phone,
    password,
    role,
  });
  res.status(200).json({
    success: true,
    message: "user register",
    user,
  })
//   sendToken(user, 201, res, "User Registered!");
});