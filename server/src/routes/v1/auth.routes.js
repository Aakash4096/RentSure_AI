const express = require("express");
const router = express.Router();
const { register, login, getMe } = require("../../controllers/auth.controller");
const { protect } = require("../../middleware/auth.middleware");

// GET /api/v1/auth/me - Protected (requires token)
router.get("/me", protect, getMe);
router.post("/register", register);
router.post("/login", login);

module.exports = router;
