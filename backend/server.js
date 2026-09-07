// require("dotenv").config({ path: "./.env" });
// const express = require("express");
// const cors = require("cors");
// const compression = require("compression");
// const cookieParser = require("cookie-parser");

// const enquiryRoutes = require("./routes/enquiryRoutes");
// const contactRoutes = require("./routes/contactRoutes");
// const adminContactRoutes = require("./routes/adminContactRoutes");

// const connectDB = require("./config/db");
// const authRoutes = require("./routes/authRoutes");
// const profileRoutes = require("./routes/profileRoutes");
// // const ProductRoutes = require("./routes/adminProductAdd.routes");
// const adminRoutes = require("./routes/adminRoutes");
// const faqRoutes = require("./routes/faqRoutes");
// const pricingRoutes = require("./routes/pricingRoutes");

// const app = express();

// // Middleware
// app.use(compression());
// app.use(express.json({ limit: "50mb" }));
// app.use(express.urlencoded({ extended: true, limit: "50mb" }));
// app.use(cookieParser());

// app.use(
//   cors({
//     origin: [
//       "https://wahrehousing-project.vercel.app/",
//       "http://localhost:5174",
//     ],
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   }),
// );
// app.use((req, res, next) => {
//   console.log(`🌍 Incoming Request: ${req.method} ${req.url}`);
//   next();
// });
// // Routes
// app.use("/api/auth", authRoutes);
// // app.use("/api/products", ProductRoutes);
// app.use("/api/enquiries", enquiryRoutes);
// app.use("/api/contact", contactRoutes);
// app.use("/api/admin/contacts", adminContactRoutes);
// app.use("/api/admin/faqs", faqRoutes);
// app.use("/api/admin/pricing", pricingRoutes);
// app.use("/api/admin", adminRoutes);

// app.get("/", (req, res) => {
//   res.json({ message: "Welcome to vardha warehousing" });
// });
// console.log("🛣 Registering /api/profile routes");
// app.use("/api/profile", profileRoutes);

// // Test route for profile
// app.get("/api/test", (req, res) => {
//   res.json({ message: "API is working" });
// });

// // Error handling
// app.use((err, req, res, next) => {
//   console.error("Server Error:", err.stack);
//   res.status(500).json({
//     success: false,
//     message: "Something went wrong!",
//   });
// });

// // 404 handler
// app.use("*", (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: "Route not found",
//   });
// });

// // Start server only AFTER DB connects
// const PORT = process.env.PORT || 5000;

// connectDB()
//   .then(() => {
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => {
//     console.error("Failed to connect DB:", err);
//   });


require("dotenv").config();

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
const adminRoutes = require("./routes/adminRoutes");
const faqRoutes = require("./routes/faqRoutes");
const pricingRoutes = require("./routes/pricingRoutes");

const app = express();

/* =====================================================
   CORS CONFIGURATION
===================================================== */

const allowedOrigins = [
  "https://vardha-project-eta.vercel.app",
  "http://localhost:5174",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests without an Origin
      // (Postman, server-to-server requests, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ CORS blocked origin:", origin);
      return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

/* =====================================================
   OTHER MIDDLEWARE
===================================================== */

app.use(compression());

app.use(express.json({ limit: "50mb" }));

app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

app.use(cookieParser());

/* =====================================================
   REQUEST LOGGER
===================================================== */

app.use((req, res, next) => {
  console.log(`🌍 Incoming Request: ${req.method} ${req.url}`);
  next();
});

/* =====================================================
   ROUTES
===================================================== */

app.use("/api/auth", authRoutes);

app.use("/api/enquiries", enquiryRoutes);

app.use("/api/contact", contactRoutes);

app.use("/api/admin/contacts", adminContactRoutes);

app.use("/api/admin/faqs", faqRoutes);

app.use("/api/admin/pricing", pricingRoutes);

app.use("/api/admin", adminRoutes);

app.use("/api/profile", profileRoutes);

/* =====================================================
   ROOT ROUTE
===================================================== */

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Welcome to Vardha Warehousing API",
  });
});

/* =====================================================
   TEST ROUTE
===================================================== */

app.get("/api/test", (req, res) => {
  res.json({
    success: true,
    message: "API is working",
  });
});

/* =====================================================
   ERROR HANDLING
===================================================== */

app.use((err, req, res, next) => {
  console.error("❌ Server Error:", err.stack);

  res.status(500).json({
    success: false,
    message: "Something went wrong!",
  });
});

/* =====================================================
   404 HANDLER
===================================================== */

app.use("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

/* =====================================================
   START SERVER
===================================================== */

const PORT = process.env.PORT || 5000;

connectDB()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log("✅ Allowed CORS origins:", allowedOrigins);
    });
  })
  .catch((err) => {
    console.error("❌ Failed to connect DB:", err);
  });