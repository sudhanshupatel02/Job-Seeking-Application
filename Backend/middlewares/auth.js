const User = require("../models/userSchema.js");
const { catchAsyncErrors } = require("./catchAsyncError.js");
const ErrorHandler = require("./error.js")
const jwt = require("jsonwebtoken")

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);

  next();
});