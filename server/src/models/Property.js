const mongoose = require("mongoose");

const propertySchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Property title is required"],
    trim: true,
    maxlength: [100, "Title cannot exceed 100 characters"],
  },
  description: {
    type: String,
    maxlength: [1000, "Description cannot exceed 1000 characters"],
  },
  address: {
    full: {
      type: String,
      required: [true, "Address is required"],
    },
    city: String,
    state: String,
    location: {
      type: {
        type: String,
        enum: ["Point"],
        default: "Point",
      },
      coordinates: {
        type: [Number],
        required: true,
      },
    },
  },
  price: {
    monthly: {
      type: Number,
      required: [true, "Monthly rent is required"],
      min: [0, "Price cannot be negative"],
    },
    deposit: Number,
  },
  amenities: [String],
  landlord: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  safetyScore: {
    type: Number,
    default: 50,
    min: 0,
    max: 100,
  },
  trustScore: {
    type: Number,
    default: 50,
    min: 0,
    max: 100,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Geospatial index for location-based queries
propertySchema.index({ "address.location": "2dsphere" });

module.exports = mongoose.model("Property", propertySchema);
