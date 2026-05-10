const Property = require("../models/Property");

// GET /api/v1/properties - Get all properties
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

// GET /api/v1/properties/nearby - Find properties near a location
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

// POST /api/v1/properties - Create a new property
const createProperty = async (req, res) => {
  try {
    const { title, description, address, price, amenities } = req.body;

    const propertyData = {
      title,
      description,
      address: {
        full: address.full,
        city: address.city,
        state: address.state,
        location: {
          type: "Point",
          coordinates: [address.lng, address.lat], // [lng, lat] order!
        },
      },
      price,
      amenities,
    };

    const property = await Property.create(propertyData);
    res.status(201).json({ message: "Property created", property });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Failed to create property", error: error.message });
  }
};

// GET /api/v1/properties/:id - Get single property
const getProperty = async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({ message: "Property not found" });
    }

    res.json({ property });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch property", error: error.message });
  }
};

module.exports = {
  getProperties,
  getNearbyProperties,
  createProperty,
  getProperty,
};
