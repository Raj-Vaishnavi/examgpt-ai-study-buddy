const express = require("express");
const multer = require("multer");
const fs = require("fs");
const pdfParse = require("pdf-parse");

const router = express.Router();

// File storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

// Upload route
router.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    const filePath = req.file.path;

    const dataBuffer = fs.readFileSync(filePath);

    const pdfData = await pdfParse(dataBuffer);

    res.json({
      success: true,
      extractedText: pdfData.text,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: "Error processing PDF",
    });
  }
});

module.exports = router;