const express = require("express");
const router = express.Router();
const multer = require("multer");
const axios = require("axios");
const FormData = require("form-data");

const upload = multer({ storage: multer.memoryStorage() });

router.post("/scan", upload.single("contract"), async (req, res) => {
  try {
    const formData = new FormData();
    formData.append("file", req.file.buffer, {
      filename: req.file.originalname,
      contentType: req.file.mimetype,
    });

    const response = await axios.post("http://localhost:8000/scan", formData, {
      headers: formData.getHeaders(),
    });

    res.json(response.data);
  } catch (error) {
    res.status(500).json({ message: "Scan failed", error: error.message });
  }
});

module.exports = router;
