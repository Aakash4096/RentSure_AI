const express = require("express");
const router = express.Router();
const { protect, authorize } = require("../../middleware/auth.middleware");

const {
  getProperties,
  getNearbyProperties,
  createProperty,
  getProperty,
  updateSafetyScore,
  updateTrustScore,
  getMyListings,
  deleteProperty,
} = require("../../controllers/property.controller");

// Public routes
router.get("/", getProperties);
router.get("/nearby", getNearbyProperties);

router.get("/my-listings", protect, getMyListings);
router.get("/:id", getProperty);

// Protected routes
router.post("/", protect, createProperty);
router.put("/:id/safety", protect, updateSafetyScore);
router.put("/:id/trust", protect, updateTrustScore);
router.delete("/:id", protect, authorize("admin", "landlord"), deleteProperty);

module.exports = router;
