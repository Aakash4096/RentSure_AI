const mongoose = require("mongoose");
const config = require("./env");
const logger = require("../utils/logger");

// Connect to MongoDB
const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongodbUri);

    logger.info(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    logger.error(`MongoDB connection failed: ${error.message}`);

    // Stop the application if database connection fails
    process.exit(1);
  }
};

// Close MongoDB connection
const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    logger.info("MongoDB disconnected");
  } catch (error) {
    logger.error(`Error disconnecting MongoDB: ${error.message}`);
  }
};

module.exports = { connectDB, disconnectDB };
