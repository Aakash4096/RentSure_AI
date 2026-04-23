const config = require("..config/env");

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};
// Custom logger class
class logger {
  constructor() {
    this.currentLevel = config.isDevelopment
      ? LOG_LEVELS.DEBUG
      : LOG_LEVELS.INFO;
  }
  formatMessage(level, message, meta = {}) {
    const timestamp = new Date().toISOString();

    const logObject = {
      timestamp,
      level,
      message,
      environment: config.nodeEnv,
      ...meta,
    };
    if (config.isDevelopment) {
      return JSON.stringify(logObject);
    }
    const colors = {
      ERROR: "\x1b[31m", // Red
      WARN: "\x1b[33m", // Yellow
      INFO: "\x1b[36m", // Cyan
      DEBUG: "\x1b[90m", // Gray
    };
    const reset = "\x1b[0m";
    return `${colors[level]}[${timestamp}] [${level}] ${reset}${message}`;
  }
  // Log methods for different levels
  debug(message, meta) {
    if (this.currentLevel <= LOG_LEVELS.DEBUG) {
      console.debug(this.formatMessage("DEBUG", message, meta));
    }
  }
  // For info, warn, and error, we use console.info, console.warn, and console.error respectively to ensure proper log level handling in various environments
  info(message, meta) {
    if (this.currentLevel <= LOG_LEVELS.INFO) {
      console.info(this.formatMessage("INFO", message, meta));
    }
  }
  warn(message, meta) {
    if (this.currentLevel <= LOG_LEVELS.WARN) {
      console.warn(this.formatMessage("WARN", message, meta));
    }
  }
  error(message, meta) {
    if (this.currentLevel <= LOG_LEVELS.ERROR) {
      console.error(this.formatMessage("ERROR", message, meta));
    }
  }
}
module.exports = new logger();
