const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const config = require("./src/config/env");
const { connectDB } = require("./src/config/database");
const logger = require("./src/utils/logger");
const ApiError = require("./src/utils/ApiError");

// Initialize Express app
const app = express();

// ============ MIDDLEWARE ============

// Helmet secures Express apps by setting various HTTP headers
app.use(helmet());

// CORS - Allow frontend to communicate with backend
app.use(
  cors({
    origin: config.isDevelopment
      ? ["http://localhost:3000", "http://localhost:5173"]
      : process.env.FRONTEND_URL,
    credentials: true,
  }),
);

// Logging - Morgan for HTTP requests, our logger for application logs
app.use(morgan("dev"));

// Body parsing
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// ============ ROUTES ============
const requestLogger = require("./src/middleware/requestLogger");
app.use(requestLogger);
app.use("/api/v1/contracts", require("./src/routes/v1/contract.routes"));
// Health check endpoint
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "healthy",
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
  });
});

// API Routes (will be added in Phase 3)
// app.use('/api/v1/auth', require('./src/routes/v1/auth.routes'));
// app.use('/api/v1/properties', require('./src/routes/v1/property.routes'));
// API Routes
app.use("/api/v1/auth", require("./src/routes/v1/auth.routes"));
app.use("/api/v1/properties", require("./src/routes/v1/property.routes"));
// ============ ERROR HANDLING ============

// 404 handler
app.use((req, res, next) => {
  next(new ApiError(404, `Route ${req.originalUrl} not found`));
});

// Global error handler
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  logger.error(`[${req.method}] ${req.path} >> ${statusCode}: ${message}`, {
    stack: config.isDevelopment ? err.stack : undefined,
    ip: req.ip,
  });

  res.status(statusCode).json({
    success: false,
    message,
    ...(config.isDevelopment && { stack: err.stack }),
  });
});

// ============ SERVER STARTUP ============

const startServer = async () => {
  try {
    // Connect to MongoDB first
    await connectDB();

    // Then start Express server
    const server = app.listen(config.port, () => {
      logger.info(
        `🚀 Server running on port ${config.port} in ${config.nodeEnv} mode`,
      );
      logger.info(`📍 Health check: http://localhost:${config.port}/health`);
    });

    // Graceful shutdown handlers
    const gracefulShutdown = async (signal) => {
      logger.info(`${signal} received. Starting graceful shutdown...`);

      server.close(async () => {
        logger.info("HTTP server closed");

        const { disconnectDB } = require("./src/config/database");
        await disconnectDB();

        logger.info("Graceful shutdown complete");
        process.exit(0);
      });

      setTimeout(() => {
        logger.error("Forced shutdown due to timeout");
        process.exit(1);
      }, 10000);
    };

    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));
  } catch (error) {
    logger.error("Failed to start server:", error);
    process.exit(1);
  }
};

// Handle uncaught exceptions and unhandled rejections
process.on("uncaughtException", (error) => {
  logger.error("UNCAUGHT EXCEPTION! 💥 Shutting down...", error);
  process.exit(1);
});

process.on("unhandledRejection", (error) => {
  logger.error("UNHANDLED REJECTION! 💥 Shutting down...", error);
  process.exit(1);
});

// Start the server
startServer();
