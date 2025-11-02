const jwt = require("jsonwebtoken");
const UserModel = require("../pgModels/userModel"); // adjust path if needed
const config = require("../config/dev.config");

module.exports = async (req, res, next) => {
  try {
    // ✅ Check if Authorization header exists
    if (!req.headers.authorization) {
      return res.status(401).json({
        success: false,
        message: "Token Not Found",
      });
    }

    // ✅ Extract token from "Bearer <token>"
    const token = req.headers.authorization.split(" ").pop();

    // ✅ Verify token
    const decoded = jwt.verify(token, config.SECRET); // Make sure config.SECRET is defined in your dev.config.js
    const userId = decoded.id; // or decoded._id depending on how you generated token

    console.log("token:", token);
    console.log("userId:", userId);

    // ✅ Find user in SQL database (not deleted or blocked)
    const user = await UserModel.findOne({
      where: { id: userId },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found or deleted",
      });
    }

    if (user.isBlocked) {
      return res.status(401).json({
        success: false,
        message: "Your account is blocked",
      });
    }

    // ✅ Attach user object to request
    req.user = user;

    // ✅ Optional: Apply route-based restrictions (like your Mongo example)
    // Example: allow if registered or document added, or if specific URLs
    if (user) {
      return next();
    } else {
      console.log("req.url:", req.url);
      return res.status(401).json({
        success: false,
        message: "Unauthorized access",
      });
    }
  } catch (error) {
    console.log("Auth Middleware Error:", error);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};
