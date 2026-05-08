// Create: server/src/middleware/requestLogger.js
const requestLogger = (req, res, next) => {
  // Your code here
  const method = req.method;
  const url = req.originalUrl;
  const startTime = Date.now();
  res.on("finish", () => {
    console.log(
      `${new Date().toISOString()} ${method} ${url} ${res.statusCode} ${Date.now() - startTime}ms`,
    );
  });

  // Hint: Use res.on('finish', () => { ... }) to calculate response time
  next();
};
module.exports = requestLogger;
