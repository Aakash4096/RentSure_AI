const requestLogger = (req, res, next) => {
  const method = req.method;
  const url = req.originalUrl;
  const startTime = Date.now();

  // Runs when response is finished
  res.on("finish", () => {
    const duration = Date.now() - startTime;

    console.log(
      `${new Date().toISOString()} ${method} ${url} ${res.statusCode} ${duration}ms`,
    );
  });

  next();
};

module.exports = requestLogger;
