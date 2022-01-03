const multer = require("multer");
const path = require("path");
const fileUpload = multer({
  limits: 500000,
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/images");
    },
    filename: (req, file, cb) => {
      cb(
        null,
        file.originalname + "-" + Date.now() + path.extname(file.originalname)
      );
    },
  }),
});

module.exports = fileUpload;
