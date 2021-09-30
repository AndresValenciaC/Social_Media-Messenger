const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const helmet = require("helmet");
const morgan = require("morgan");
var cors = require("cors");
const multer = require("multer");
const path = require("path");
// Routes
const userRoute = require("./routes/users");
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const conversationRoute = require("./routes/conversation");
const messageRoute = require("./routes/message");

dotenv.config();

// Connect mongoDB
mongoose.connect(
  process.env.MONGO_URL,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to MongoDB");
  }
);
// middleWare
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));
app.use(cors());

// Upload files in api, it should be on a cloud server
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/fileStorageImg");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});
// filename: (req, file, cb) => {
//   cb(null, file.originalname);
// },

/** The path to reach a file or folder that`s not res api
 * if use that path dont make any request, just go to the directory
http://localhost:8800/uploadImages/sillaPrueba.png 
*/
app.use(
  "/uploadImages",
  express.static(path.join(__dirname, "public/fileStorageImg"))
);
const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("File uploaded successfully");
  } catch (error) {
    console.error(error);
  }
});

//Api rest
app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/conversation", conversationRoute);
app.use("/api/message", messageRoute);
// Connect to Backend
app.listen(8800, () => {
  console.log("Backend Server Running!");
});
