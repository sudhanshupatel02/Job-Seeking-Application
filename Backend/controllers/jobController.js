const { catchAsyncErrors } = require("../middlewares/catchAsyncError.js");
const Job = require("../models/jobSchema.js");
// const ErrorHandler = require("../middlewares/error.js");

exports.getAllJobs = catchAsyncErrors(async (req, res, next) => {
    const jobs = await Job.find({ expired: false });
    res.status(200).json({
      success: true,
      jobs,
    });
  });