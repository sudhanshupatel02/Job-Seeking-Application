const { catchAsyncErrors } = require("../middlewares/catchAsyncError.js");
const Job = require("../models/jobSchema.js");
const ErrorHandler = require("../middlewares/error.js");

exports.getAllJobs = catchAsyncErrors(async (req, res, next) => {
    const jobs = await Job.find({ expired: false });
    res.status(200).json({
      success: true,
      jobs,
    });
  });

  exports.postJob = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;  //req.user auth me likha hai usme se aa raha h[ {const role = req.user.role},{const { role } = req.user} koi 1 likh skta h]
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
      );
    }
    const {
      title,
      description,
      category,
      country,
      city,
      location,
      fixedSalary,
      salaryFrom,
      salaryTo,
    } = req.body;
  
    if (!title || !description || !category || !country || !city || !location) {
      return next(new ErrorHandler("Please provide full job details.", 400));
    }
  
    if ((!salaryFrom || !salaryTo) && !fixedSalary) {
      return next(new ErrorHandler("Please either provide fixed salary or ranged salary.",400));
    }
  
    if (salaryFrom && salaryTo && fixedSalary) {
      return next(
        new ErrorHandler("Cannot Enter Fixed and Ranged Salary together.", 400)
      );
    }
    const postedBy = req.user._id;  //job post kaun kar rha hai
    const job = await Job.create({
      title,
      description,
      category,
      country,
      city,
      location,
      fixedSalary,
      salaryFrom,
      salaryTo,
      postedBy,
    });
    res.status(200).json({
      success: true,
      message: "Job Posted Successfully!",
      job,
    });
  });

  exports.getMyJobs = catchAsyncErrors(async (req, res, next) => {
    const { role } = req.user;
    if (role === "Job Seeker") {
      return next(
        new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
      );
    }
    const myJobs = await Job.find({ postedBy: req.user._id });
    res.status(200).json({
      success: true,
      myJobs,
    });
  });
  
  