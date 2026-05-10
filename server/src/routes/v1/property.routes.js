const express = require("express");
const router = express.Router();
const {
  getProperties,
  getNearbyProperties,
  createProperty,
  getProperty,
} = require("../../controllers/property.controller");

// GET all properties
router.get("/", getProperties);

// GET nearby properties (MUST be before /:id)
router.get("/nearby", getNearbyProperties);

// GET single property
router.get("/:id", getProperty);

// POST create property
router.post("/", createProperty);

module.exports = router;
