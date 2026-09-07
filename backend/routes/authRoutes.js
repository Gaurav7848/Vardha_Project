const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const Admin = require("../models/Admin");
const { protect } = require("../middleware/auth");
// const { sendOTPEmail } = require("../config/emailConfig");
const { all } = require("axios");

// Generate random OTP
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// @route   POST /api/auth/signup
// @desc    Register admin (requires secret key)
// @access  Public
router.post(
  "/signup",
  [
    body("name").not().isEmpty().withMessage("Name is required"),
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
    body("secretKey").not().isEmpty().withMessage("Secret key is required"),
  ],
  async (req, res) => {
    console.log("🚀 SIGNUP ROUTE HIT");
    console.log("📦 Incoming Body:", req.body);
    // Check for validation errors
    const errors = validationResult(req);
    console.log("🧪 Validation Result:", errors.array());
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { name, email, password, role, secretKey } = req.body;

    try {
      console.log("🔑 Provided Secret Key:", secretKey);
      console.log("🔑 Expected Secret Key:", process.env.ADMIN_SECRET_KEY);
      // Verify secret key
      if (secretKey !== process.env.ADMIN_SECRET_KEY) {
        return res.status(401).json({
          success: false,
          field: "secretKey",
          message: "Invalid secret key. Access denied.",
        });
      }

      // Check if admin already exists
      console.log("🔍 Checking if admin exists for email:", email);
      let admin = await Admin.findOne({ email });
      if (admin) {
        console.log("❌ Admin already exists");
        return res.status(400).json({
          success: false,
          message: "Admin already exists with this email",
        });
      }

      // Create admin
      admin = await Admin.create({
        name,
        email,
        password,
        role: role || "admin",
      });
      console.log("✅ Admin created:", admin._id);

      // Create token
      const token = admin.getSignedJwtToken();

      // Set cookie options
      const options = {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      };
      console.log("🎉 Sending success response");
      res
        .status(201)
        .cookie("token", token, options)
        .json({
          success: true,
          token,
          admin: {
            id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
            company: admin.company,
          },
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
);

// @route   POST /api/auth/login
// @desc    Login admin
// @access  Public
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("password").not().isEmpty().withMessage("Password is required"),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    try {
      // Check for admin
      const admin = await Admin.findOne({ email }).select("+password");

      if (!admin) {
        return res.status(401).json({
          success: false,
          field: "email",
          message: "Email not registered",
        });
      }

      // Check if password matches
      const isMatch = await admin.matchPassword(password);

      if (!isMatch) {
        return res.status(401).json({
          success: false,
          field: "password",
          message: "Incorrect Password",
        });
      }

      // Update last login
      admin.lastLogin = Date.now();
      await admin.save();

      // Create token
      const token = admin.getSignedJwtToken();

      // Set cookie options
      const options = {
        expires: new Date(
          Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000,
        ),
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      };

      res
        .status(200)
        .cookie("token", token, options)
        .json({
          success: true,
          token,
          admin: {
            id: admin._id,
            name: admin.name,
            email: admin.email,
            role: admin.role,
            company: admin.company,
          },
        });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
);

// @route   POST /api/auth/forgot-password/send-otp
// @desc    Send OTP to email if registered
// @access  Public
router.post(
  "/forgot-password/send-otp",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("secretKey").not().isEmpty().withMessage("Secret key is required"),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, secretKey } = req.body;

    try {
      console.log("🔍 Forgot password request received:");
      console.log("Email:", email);
      console.log("Secret Key:", secretKey);
      console.log("Expected Secret Key:", process.env.ADMIN_SECRET_KEY);

      // FIRST: Verify secret key (MOST IMPORTANT)
      if (secretKey !== process.env.ADMIN_SECRET_KEY) {
        console.log("❌ Invalid secret key");
        return res.status(401).json({
          success: false,
          field: "secretKey",
          message: "Invalid secret key. Access denied.",
        });
      }
      const admin = await Admin.findOne({ email });

      if (!admin) {
        return res.status(404).json({
          success: false,
          field: "email",
          message: "Email not registered",
        });
      }

      console.log("✅ Email found:", admin.email);

      // Generate OTP
      const otp = generateOTP();
      console.log("Generated OTP:", otp);

      admin.resetPasswordOTP = otp;
      admin.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
      await admin.save();

      // Send OTP via email
      // const emailSent = await sendOTPEmail(email, otp);

      // if (!emailSent) {
      //   console.log("❌ Failed to send email");
      //   return res.status(500).json({
      //     success: false,
      //     field: "otp",
      //     message: "Failed to send OTP email. Please try again.",
      //   });
      // }

      // console.log("✅ Email sent successfully");

      res.status(200).json({
        success: true,
        message: "OTP sent successfully to your email",
      });
    } catch (error) {
      console.error("❌ Server error:", error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
);

// @route   POST /api/auth/forgot-password/verify-otp
// @desc    Verify OTP
// @access  Public
router.post(
  "/forgot-password/verify-otp",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("otp")
      .isLength({ min: 6, max: 6 })
      .withMessage("Please provide a valid 6-digit OTP"),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, otp } = req.body;

    try {
      // Find admin by email
      const admin = await Admin.findOne({ email }).lean();

      if (!admin) {
        return res.status(404).json({
          success: false,
          field: "email",
          message: "Email not registered",
        });
      }

      // Check if OTP exists and is valid
      if (!admin.resetPasswordOTP || !admin.resetPasswordExpire) {
        return res.status(400).json({
          success: false,
          field: "otp",
          message: "No OTP request found. Please request OTP again.",
        });
      }

      // Check if OTP has expired
      if (admin.resetPasswordExpire < Date.now()) {
        return res.status(400).json({
          success: false,
          field: "otp",
          message: "OTP has expired. Please request a new OTP.",
        });
      }

      // Verify OTP
      if (admin.resetPasswordOTP !== otp) {
        return res.status(400).json({
          success: false,
          field: "otp",
          message: "Invalid OTP",
        });
      }

      res.status(200).json({
        success: true,
        field: "otp",
        message: "OTP verified successfully",
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
);

// @route   POST /api/auth/forgot-password/reset
// @desc    Reset password after OTP verification
// @access  Public
router.post(
  "/forgot-password/reset",
  [
    body("email").isEmail().withMessage("Please provide a valid email"),
    body("newPassword")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters"),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error("Passwords do not match");
      }
      return true;
    }),
  ],
  async (req, res) => {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const { email, newPassword } = req.body;

    try {
      // Find admin by email
      const admin = await Admin.findOne({ email }).select("+password");

      if (!admin) {
        return res.status(404).json({
          success: false,
          field: "email",
          message: "Email not registered",
        });
      }

      // Update password
      admin.password = newPassword;
      admin.resetPasswordOTP = undefined;
      admin.resetPasswordExpire = undefined;

      await admin.save();

      // Create new token for auto-login
      const token = admin.getSignedJwtToken();

      res.status(200).json({
        success: true,
        message: "Password reset successful",
        token,
        admin: {
          id: admin._id,
          name: admin.name,
          email: admin.email,
          role: admin.role,
          company: admin.company,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        message: "Server error",
      });
    }
  },
);

// @route   GET /api/auth/logout
// @desc    Logout admin / clear cookie
// @access  Private
router.get("/logout", protect, (req, res) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

// @route   GET /api/auth/me
// @desc    Get current logged in admin
// @access  Private
router.get("/me", protect, async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      admin: req.admin,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
});

module.exports = router;
