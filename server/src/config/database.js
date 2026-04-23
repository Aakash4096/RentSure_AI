const mongoose = require("mongoose");
const config = require("./env");
const logger = require("../utils/logger");

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(config.mongodbUri, {
      serverSelectionTimeoutMS: 5000, // Set a timeout for server selection
      socketTimeoutMS: 45000, // Set a timeout for socket operations
    });
    logger.info(`MongoDB Connected: ${conn.connection.host}`);
    mongoose.connection.on("error", (err) => {
      logger.error(`MongoDB connection error: ${err}`);
    });
    mongoose.connection.on("disconnected", () => {
      logger.warn("MongoDB disconnected. Attempting to reconnect...");
    });
    mongoose.connection.on("reconnected", () => {
      logger.info("MongoDB reconnected successfully.");
    });
  } catch (err) {
    logger.error(`Error connecting to MongoDB: ${err.message}`);

    //In development, we can attempt to reconnect after a delay
    // In production, we might want to exit the process to allow a process manager to restart it
    if (config.isDevelopment) {
      console.error("Full error details:", err);
    }
    // Exit the process with failure code
    process.exit(1);
  }
};

// gracefull disconnection handling

const disconnectDB = async () => {
  try {
    await mongoose.disconnect();
    logger.info("MongoDB disconnected gracefully.");
  } catch (err) {
    logger.error(`Error disconnecting from MongoDB: ${err.message}`);
  }
};
module.exports = { connectDB, disconnectDB };
