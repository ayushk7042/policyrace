// const jwt = require('jsonwebtoken');
// const User = require('../models/User');

// exports.protect = async (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   if (!authHeader || !authHeader.startsWith('Bearer ')) return res.status(401).json({ message: 'Not authorized' });

//   const token = authHeader.split(' ')[1];
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     if (!decoded || !decoded.id) return res.status(401).json({ message: 'Invalid token' });

//     // load user
//     const user = await User.findById(decoded.id);
//     if (!user) return res.status(401).json({ message: 'User not found' });

//     req.user = { id: user._id, email: user.email };
//     next();
//   } catch (err) {
//     console.error(err);
//     res.status(401).json({ message: 'Token error' });
//   }
// };


const jwt = require("jsonwebtoken");
const User = require("../models/User");

// ✅ Protect route (user authentication)
exports.protect = async (req, res, next) => {
  try {
    let token;

    // Token via Authorization header
    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
      token = authHeader.split(" ")[1];
    }

    // Token via cookie (optional)
    if (!token && req.cookies?.token) {
      token = req.cookies.token;
    }

    // No token found
    if (!token) {
      return res.status(401).json({ message: "Not authorized, token missing" });
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.id) {
      return res.status(401).json({ message: "Invalid token" });
    }

    // Load user from DB
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // Attach user to request
    req.user = user;
    next();
  } catch (err) {
    console.error("Auth error:", err);
    res.status(401).json({ message: "Token error or expired" });
  }
};

// ✅ Admin only access
exports.adminOnly = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403).json({ message: "Admin access required" });
  }
};
