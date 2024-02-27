const User = require("../models/userSchema.js");
const { catchAsyncErrors } = require("./catchAsyncError.js");
const ErrorHandler = require("./error.js")
const jwt = require("jsonwebtoken")

exports.isAuthenticated = catchAsyncErrors(async (req, res, next) => {

  // Assuming req is the request object
const cookieHeader = req.headers.cookie;

// Now parse the cookie header to extract the specific cookie value
const parseCookie = cookieHeader.split(';').reduce((cookies, cookie) => {
  const [name, value] = cookie.trim().split('=');
  cookies[name] = value;
  return cookies;
}, {});

// Now you can access the specific cookie value by its name
const token = parseCookie.token;
  if (!token) {
    return next(new ErrorHandler("User Not Authorized", 401));
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

  req.user = await User.findById(decoded.id);

  next();
});