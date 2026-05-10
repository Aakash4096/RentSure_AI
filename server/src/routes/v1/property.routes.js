const express = require("express");
const router = express.Router();
const {
  getProperties,
  getNearbyProperties,
  createProperty,
  getProperty,
  updateSafetyScore,
  updateTrustScore,
} = require("../../controllers/property.controller");

router.put("/:id/trust", updateTrustScore);

// GET all properties
router.get("/", getProperties);

// GET nearby properties (MUST be before /:id)
router.get("/nearby", getNearbyProperties);

// GET single property
router.get("/:id", getProperty);

// POST create property
router.post("/", createProperty);

module.exports = router;
