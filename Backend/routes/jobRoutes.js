const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth.js");

// import
const { getAllJobs , postJob , getMyJobs , updateJob} = require("../controllers/jobController.js");

// const {
//   deleteJob,
//   getAllJobs,
//   getMyJobs,
//   getSingleJob,
//   postJob,
//   updateJob,
// } = require("../controllers/jobController.js");

// api routes
router.get("/getall", getAllJobs);
router.post("/post", isAuthenticated, postJob);
router.get("/getmyjobs", isAuthenticated, getMyJobs);
router.put("/update/:id", isAuthenticated, updateJob);
// router.delete("/delete/:id", isAuthenticated, deleteJob);
// router.get("/:id", isAuthenticated, getSingleJob);

module.exports = router;