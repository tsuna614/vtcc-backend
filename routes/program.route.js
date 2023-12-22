// import { unlink } from 'node:fs';
const unlink = require("node:fs").unlink;
const express = require("express");
const path = require("path");
const router = express.Router();
const multer = require("multer");
const { spawn } = require("child_process");
const fs = require("fs");

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

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

// post image and get data
router.post("/getImageName", upload.single("image"), async (req, res) => {
  var imagePath = { path: req.file.path };
  jsonImagePath = JSON.stringify(imagePath);

  await fs.writeFile(
    path.join(__dirname, "..", "data", "imagePath.json"),
    // path.join("/opt/render/project/src/data/imagePath.json"),
    jsonImagePath,
    function (err) {
      if (err) {
        console.log(err);
      };
      console.log("Saved!");
    }
  );

  const pyProg = await spawn("python", ["backend.py"], 'abc');

  pyProg.stdout.on("data", function (data) {
    var cakeName = data.toString();
    console.log(cakeName);
    res.status(200).json({ message: cakeName });
    // res.write(data);
    // res.end("end");
  });

  await delay(20000);
  unlink(req.file.path, (err) => {
    if (err) throw err;
    console.log(req.file.path + " was deleted");
  });
  // unlink("data/imagePath.json", (err) => {
  //   if (err) throw err;
  //   console.log("imagePath.json was deleted");
  // });
  var emptyPath = { path: '' };
  jsonEmptyPath = JSON.stringify(emptyPath);

  fs.writeFile(
    path.join(__dirname, "..", "data", "imagePath.json"),
    // path.join("/opt/render/project/src/data/imagePath.json"),
    jsonEmptyPath,
    function (err) {
      if (err) {
        console.log(err);
      };
      console.log("Saved!");
    }
  );
});

module.exports = router;
