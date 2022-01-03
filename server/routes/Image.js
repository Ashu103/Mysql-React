const fs = require("fs");
const express = require("express");
const router = express.Router();
const { Image } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddlewares");

const fileUpload = require("../middlewares/file-upload");

router.post("/", validateToken, fileUpload.single("file"), async (req, res) => {
  //what should i write it here to save a image to database
  //image datatype is

  await Image.create({
    pic: fs.readFileSync("uploads/images" + req.file.filename),
  }).then((image) => {
    fs.writeFileSync("uploads/images" + image.pic);
  });
  return res.send("File has been uploaded");
});

module.exports = router;
