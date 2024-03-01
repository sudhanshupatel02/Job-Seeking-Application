const express = require("express");
const router = express.Router();
const { isAuthenticated } = require("../middlewares/auth.js");

const {
    employerGetAllApplications,
    jobseekerDeleteApplication,
    jobseekerGetAllApplications,
    postApplication,
  } = require("../controllers/applicationController.js");
  
  router.post("/post", isAuthenticated, postApplication);
  router.get("/employer/getall", isAuthenticated, employerGetAllApplications);
  router.get("/jobseeker/getall", isAuthenticated, jobseekerGetAllApplications);
  router.delete("/delete/:id", isAuthenticated, jobseekerDeleteApplication);

module.exports = router;