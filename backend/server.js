require("dotenv").config({ path: "./.env" });
const express = require("express");
const cors = require("cors");
const compression = require("compression");
const cookieParser = require("cookie-parser");

const enquiryRoutes = require("./routes/enquiryRoutes");
const contactRoutes = require("./routes/contactRoutes");
const adminContactRoutes = require("./routes/adminContactRoutes");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profileRoutes");
// const ProductRoutes = require("./routes/adminProductAdd.routes");
const adminRoutes = require("./routes/adminRoutes");
const faqRoutes = require("./routes/faqRoutes");
const pricingRoutes = require("./routes/pricingRoutes");

const app = express();

// Middleware
app.use(compression());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "https://wahrehousing-project.vercel.app/",
      "http://localhost:5174",
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use((req, res, next) => {
  console.log(`🌍 Incoming Request: ${req.method} ${req.url}`);
  next();
});
// Routes
app.use("/api/auth", authRoutes);
// app.use("/api/products", ProductRoutes);
app.use("/api/enquiries", enquiryRoutes);
app.use("/api/contact", contactRoutes);
app.use("/api/admin/contacts", adminContactRoutes);
app.use("/api/admin/faqs", faqRoutes);
app.use("/api/admin/pricing", pricingRoutes);
app.use("/api/admin", adminRoutes);

app.get("/", (req, res) => {
  res.json({ message: "Welcome to vardha warehousing" });
});
console.log("🛣 Registering /api/profile routes");
app.use("/api/profile", profileRoutes);

// Test route for profile
app.get("/api/test", (req, res) => {
  res.json({ message: "API is working" });
});

// Error handling
app.use((err, req, res, next) => {
  console.error("Server Error:", err.stack);
  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});

// 404 handler
app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Start server only AFTER DB connects
const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect DB:", err);
  });
