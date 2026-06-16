const rateLimiter = (maxRequests = 5, windowMs = 60000) => {
  const requests = new Map();

  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();

    let entry = requests.get(ip);

    if (!entry || now > entry.resetTime) {
      entry = { count: 0, resetTime: now + windowMs };
      requests.set(ip, entry);
    }

    if (entry.count >= maxRequests) {
      return res.status(429).json({
        message: "Too Many Requests",
        retryAfter: Math.ceil((entry.resetTime - now) / 1000),
      });
    }

    entry.count++;
    next();
  };
};

module.exports = rateLimiter;
