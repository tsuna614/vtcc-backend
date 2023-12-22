const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    // console.log(file)
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });
// const upload = multer();

// post image and get data
router.post("/getImageName", upload.single("image"), async (req, res) => {
  console.log(req.file);
  const { spawn } = require("child_process");
  //   const pyProg = spawn("python", [
  //     "backend.py",
  //     "E:\\MayHocvaCongCu_SE335\\Project\\data\\Banh_1.jpg",
  //   ]);
  // const pyProg = await spawn("python", ["backend.py", req.file.path]);

  // console.log("running");

  // pyProg.stdout.on("data", function (data) {
  //   console.log(data.toString());
  //   res.status(200).json({ message: `Name of cake: ${data.toString()}` });
  //   // res.write(data);
  //   // res.end("end");
  // });
});

module.exports = router;
