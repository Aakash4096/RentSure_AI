const dotenv = require("dotenv");
const path = require("path");

// Load environment variables
dotenv.config({
  path: path.join(__dirname, "../../.env"),
});

const requiredEnvVars = ["PORT", "MONGODB_URI", "JWT_SECRET", "NODE_ENV"];

// Check required variables
for (const envVar of requiredEnvVars) {
  if (!process.env[envVar]) {
    throw new Error(`Environment variable ${envVar} is missing`);
  }
}

const config = {
  port: Number(process.env.PORT) || 5000,
  nodeEnv: process.env.NODE_ENV,
  mongodbUri: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpire: process.env.JWT_EXPIRE || "7d",

  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
};

module.exports = config;
