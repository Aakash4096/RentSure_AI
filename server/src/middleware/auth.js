const authorise = (...allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.headers["x-user-role"];

    if (!userRole) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const role = userRole.toLowerCase();

    if (allowedRoles.includes(role)) {
      next();
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }
  };
};

module.exports = { authorise };
