const { catchAsyncErrors } = require("../middlewares/catchAsyncError.js");
const User = require("../models/userSchema.js");  //{User} ye lika tha thabhi run nhi ho raha tha postman per [models Schema sing raha hai]  
const ErrorHandler = require("../middlewares/error.js");
const {sendToken} = require("../utils/jwtToken.js");

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
  sendToken(user, 201, res, "User Registered!");
});

exports.login = catchAsyncErrors(async (req, res, next) => {
  const { email, password, role } = req.body;
  if (!email || !password || !role) {
    return next(new ErrorHandler("Please provide email ,password and role."));
  }
  const user = await User.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email Or Password.", 400));
  }
  if (user.role !== role) {
    return next(
      new ErrorHandler(`User with provided email and ${role} not found!`, 404)
    );
  }
  sendToken(user, 201, res, "User Logged In!");
});

exports.logout = catchAsyncErrors(async (req, res, next) => {
  res.status(201).cookie("token", "", {        //"" or null kuchh bhi likha sakte h
      httpOnly: true,
      expires: new Date(Date.now()),         //jwtToken me jo value hai wahi valu deni h value same honi chahiye
    })
    .json({
      success: true,
      message: "Logged Out Successfully.",
    });
});

// exports.getUser = catchAsyncErrors((req, res, next) => {
//   const user = req.user;
//   res.status(200).json({
//     success: true,
//     user,
//   });
// });