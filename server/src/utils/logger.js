const config = require("../config/env");

const LOG_LEVELS = {
  DEBUG: 0,
  INFO: 1,
  WARN: 2,
  ERROR: 3,
};

const COLORS = {
  ERROR: "\x1b[31m",
  WARN: "\x1b[33m",
  INFO: "\x1b[36m",
  DEBUG: "\x1b[90m",
};

const RESET = "\x1b[0m";

class Logger {
  constructor() {
    this.currentLevel = config.isDevelopment
      ? LOG_LEVELS.DEBUG
      : LOG_LEVELS.INFO;
  }

  formatMessage(level, message, meta) {
    const timestamp = new Date().toISOString();
    const hasMeta = meta && Object.keys(meta).length > 0;

    if (config.isProduction) {
      return JSON.stringify({
        timestamp,
        level,
        message,
        environment: config.nodeEnv,
        ...(hasMeta && { meta }),
      });
    }

    const color = COLORS[level] || "\x1b[37m";
    let output = `${color}[${timestamp}] [${level}]${RESET} ${message}`;

    if (hasMeta) {
      output += ` ${JSON.stringify(meta, null, 2)}`;
    }

    return output;
  }

  debug(message, meta) {
    if (this.currentLevel <= LOG_LEVELS.DEBUG) {
      console.log(this.formatMessage("DEBUG", message, meta));
    }
  }

  info(message, meta) {
    if (this.currentLevel <= LOG_LEVELS.INFO) {
      console.log(this.formatMessage("INFO", message, meta));
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

module.exports = new Logger();
