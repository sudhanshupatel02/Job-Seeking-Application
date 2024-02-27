//app create
const express =  require("express"); 
const app = express();

//PORT find krna h
require("dotenv").config();
const PORT = process.env.PORT || 3000;

// const cookieParser = require("cookie-parser");
// app.use(cookieParser());

//middleware add krne h
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const fileupload = require("express-fileupload");
app.use(fileupload({
    useTempFiles: true,
    tempFileDir: '/tmp/'
}));

const cors = require("cors");
app.use(
    cors({
      origin: [process.env.FRONTEND_URL],
      method: ["GET", "POST", "DELETE", "PUT"],
      credentials: true,
    })
  );

//db se connect krna h
const db = require("./config/database");
db.connect();

//cloud se connect krna h
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api route mount krna h
const jobRouter = require("./routes/jobRoutes.js");
app.use("/api/v1/job", jobRouter);

const userRouter = require("./routes/userRoutes.js");
app.use("/api/v1/user", userRouter);

// const applicationRouter = require("./applicationRoutes.js");
// app.use("/api/v1/application", applicationRouter);

const {errorMiddleware} = require("./middlewares/error.js");
app.use(errorMiddleware);

//activate server
app.listen(PORT, () => {
    console.log(`App is Running at ${PORT}`);
})