const { calculateTrustScore } = require("../services/trust.service");
const Property = require("../models/Property");
const { calculateSafetyScore } = require("../services/safety.service");

// GET all properties
const getProperties = async (req, res) => {
  try {
    const properties = await Property.find();
    res.json({ count: properties.length, properties });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch properties", error: error.message });
  }
};

// GET nearby properties
const getNearbyProperties = async (req, res) => {
  try {
    const { lat, lng, maxDistance } = req.query;
    if (!lat || !lng) {
      return res
        .status(400)
        .json({ message: "Latitude and longitude are required" });
    }
    const properties = await Property.find({
      "address.location": {
        $near: {
          $geometry: {
            type: "Point",
            coordinates: [parseFloat(lng), parseFloat(lat)],
          },
          $maxDistance: parseInt(maxDistance) || 5000,
        },
      },
    });
    res.json({ count: properties.length, properties });
  } catch (error) {
    res.status(500).json({
      message: "Failed to find nearby properties",
      error: error.message,
    });
  }
};

// GET single property
const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });
    res.json({ property });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch property", error: error.message });
  }
};

// POST create property
const createProperty = async (req, res) => {
  try {
    const { title, description, address, price, amenities } = req.body;
    const safetyScore = calculateSafetyScore(
      address.lat,
      address.lng,
      amenities,
    );

    const propertyData = {
      title,
      description,
      address: {
        full: address.full,
        city: address.city,
        state: address.state,
        location: {
          type: "Point",
          coordinates: [address.lng, address.lat],
        },
      },
      price,
      amenities,
      safetyScore,
      landlord: req.user.userId,
    };

    const property = await Property.create(propertyData);
    res.status(201).json({ message: "Property created", property });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create property", error: error.message });
  }
};

// GET landlord's own listings
const getMyListings = async (req, res) => {
  try {
    const properties = await Property.find({ landlord: req.user.userId });
    res.json({ count: properties.length, properties });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch your listings" });
  }
};

// DELETE property
const deleteProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) return res.status(404).json({ message: "Not found" });
    // Replace the existing if check with this:
    if (
      req.user.role !== "admin" &&
      property.landlord.toString() !== req.user.userId
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }
    await Property.findByIdAndDelete(req.params.id);
    res.json({ message: "Property deleted" });
  } catch (error) {
    res.status(500).json({ message: "Delete failed" });
  }
};

// PUT update safety score
const updateSafetyScore = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });
    const [lng, lat] = property.address.location.coordinates;
    property.safetyScore = calculateSafetyScore(lat, lng, property.amenities);
    await property.save();
    res.json({
      message: "Safety score updated",
      safetyScore: property.safetyScore,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update safety score" });
  }
};

// PUT update trust score
const updateTrustScore = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property)
      return res.status(404).json({ message: "Property not found" });
    const landlord = {
      isVerified: req.body.isVerified || false,
      documentsSubmitted: req.body.documentsSubmitted || 0,
    };
    const reviews = req.body.reviews || [];
    property.trustScore = calculateTrustScore(landlord, reviews);
    await property.save();
    res.json({
      message: "Trust score updated",
      trustScore: property.trustScore,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to update trust score" });
  }
};

module.exports = {
  getProperties,
  getNearbyProperties,
  createProperty,
  getProperty,
  getMyListings,
  deleteProperty,
  updateSafetyScore,
  updateTrustScore,
};
