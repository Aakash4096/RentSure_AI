// server/src/middleware/rateLimiter.js
const rateLimiter = (maxRequests = 5, windowMs = 60000) => {
  const requests = new Map();

  return (req, res, next) => {
    const ip = req.ip;
    const now = Date.now();

    // Your code here
    // 1. Get or create entry for this IP

    let entry = requests.get(ip);
    if (!entry) {
      entry = { count: 0, resetTime: now + windowMs };
      requests.set(ip, entry);
    }

    // 2. Check if window has expired (reset if so)
    if (now > entry.resetTime) {
      entry.count = 0;
      entry.resetTime = now + windowMs;
    }
    // 3. Check if over limit (return 429 if so)
    if (entry.count >= maxRequests) {
      const retryAfter = Math.ceil((entry.resetTime - now) / 1000);
      return res.status(429).json({ message: "Too Many Requests", retryAfter });
    }
    // 4. Increment count and call next()
    entry.count++;
    next();
  };
};

module.exports = rateLimiter;
