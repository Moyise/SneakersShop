const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      try {
        token = req.headers.authorization.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select("-password");

        next();
      } catch (error) {
        console.error(error);
        res.status(401).json({ message: "Not authorized, token failed" });
      }
    }

    if (!token) {
      throw error;
    }
  } catch (error) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};

const admin = async (req, res, next) => {
  try {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      throw error;
    }
  } catch (error) {
    res.status(401).json({ message: "Not authorized, not Admin" });
  }
};

module.exports = { protect, admin };
