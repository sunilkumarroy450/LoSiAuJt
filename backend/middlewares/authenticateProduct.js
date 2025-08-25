const jwt = require("jsonwebtoken");

const requireAuth = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  // 1. Check if authorization header is present
  if (!authHeader) {
    return res
      .status(403)
      .send({ message: "Unauthorized, JWT token is required", success: false });
  }

  // 2. Handle both "Bearer <token>" and plain "<token>"
  const token = authHeader.startsWith("Bearer ")
    ? authHeader.split(" ")[1]
    : authHeader;

  try {
    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Attach user info to request
    req.user = decoded;
    next();
  } catch (error) {
    console.error("JWT verification failed:", error.message);
    return res
      .status(401)
      .send({ message: "Invalid or expired token", success: false });
  }
};

module.exports = { requireAuth };
