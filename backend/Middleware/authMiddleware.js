const jwt = require("jsonwebtoken");
const User = require("../Models/User");
const protect = async (req, res, next) => {
  try {
    console.log("Cookies received:", req.cookies); // 👈 check this

    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }

    next();
  } catch (error) {
    console.error("Auth error:", error);
    res.status(401).json({ message: "Not authorized, token failed" });
  }
};

module.exports = protect;
