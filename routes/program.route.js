// import { unlink } from 'node:fs';
const unlink = require('node:fs').unlink;
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

const delay = ms => new Promise(res => setTimeout(res, ms));

// post image and get data
router.post("/getImageName", upload.single("image"), async (req, res) => {
  // console.log(req.file);
  const { spawn } = require("child_process");
  //   const pyProg = spawn("python", [
  //     "backend.py",
  //     "E:\\MayHocvaCongCu_SE335\\Project\\data\\Banh_1.jpg",
  //   ]);
  const pyProg = await spawn("python", ["backend.py", req.file.path]);

  pyProg.stdout.on("data", function (data) {
    var cakeName = data.toString();
    console.log(cakeName);
    res.status(200).json({ message: cakeName });
    // res.write(data);
    // res.end("end");
  });

  await delay(5000);
  unlink(req.file.path, (err) => {
    if (err) throw err;
    console.log(req.file.path + ' was deleted');
  }); 
});

module.exports = router;
