const dotenv = require("dotenv");
const path = require("path");
// Load environment variables from .env file
dotenv.config({ path: path.join(__dirname, "../../.env") });
// List of required environment variables
const requiredEnvVars = ["PORT", "MONGODB_URI", "JWT_SECRET", "NODE_ENV"];

// Check for required environment variables
requiredEnvVars.forEach((envVar) => {
  if (!process.env[envVar]) {
    throw new Error(
      `Environment variable ${envVar} is required but not defined.`,
    );
  }
});

// Export the environment variables as a config object

const config = {
  port: path.parseInt(process.env.PORT, 10) || 5000,
  nodeEnv: process.env.NODE_ENV,
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE || "7d",
};

module.exports = config;
