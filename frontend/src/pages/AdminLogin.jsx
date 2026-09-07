// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Warehouse, Lock, Mail, Eye, EyeOff } from 'lucide-react';
// import axios from 'axios';

// const AdminLogin = () => {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: '', password: '' });
//   const [showPassword, setShowPassword] = useState(false);
//   const [error, setError] = useState('');
//   const [loading, setLoading] = useState(false);

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     try {
//       const { adminLogin } = await import('../services/adminService');
//       const result = await adminLogin(formData);
//       if (result.success) {
//         localStorage.setItem('adminToken', result.token);
//         localStorage.setItem('admin', JSON.stringify(result.admin));
//         axios.defaults.headers.common['Authorization'] = `Bearer ${result.token}`;
//         navigate('/admin-dashboard');
//       } else {
//         setError(result.message || 'Login failed');
//       }
//     } catch (err) {
//       setError('Unable to connect. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen bg-stone-950 flex items-center justify-center font-sans relative overflow-hidden">
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.15),transparent_60%)]"></div>
//       <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(220,38,38,0.1),transparent_60%)]"></div>

//       <motion.div
//         initial={{ opacity: 0, y: 30 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl"
//       >
//         <div className="text-center mb-8">
//           <div className="w-16 h-16 bg-red-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-900/30">
//             <Warehouse className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="text-3xl font-serif font-semibold text-white mb-2">Admin Login</h1>
//           <p className="text-stone-400 font-sans font-light text-sm">Vardha Warehousing Admin Panel</p>
//         </div>

//         <form onSubmit={handleSubmit} className="space-y-6">
//           {error && (
//             <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-4 text-red-300 text-sm">
//               {error}
//             </div>
//           )}

//           <div>
//             <label className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 block">Email</label>
//             <div className="relative">
//               <Mail className="absolute left-4 top-3.5 w-5 h-5 text-stone-500" />
//               <input
//                 type="email"
//                 name="email"
//                 value={formData.email}
//                 onChange={handleChange}
//                 required
//                 className="w-full bg-transparent border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-red-500 transition-all text-white font-sans placeholder:text-stone-500"
//                 placeholder="admin@vardha.com"
//               />
//             </div>
//           </div>

//           <div>
//             <label className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 block">Password</label>
//             <div className="relative">
//               <Lock className="absolute left-4 top-3.5 w-5 h-5 text-stone-500" />
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 name="password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 required
//                 className="w-full bg-transparent border border-white/10 rounded-xl py-3 pl-12 pr-12 outline-none focus:border-red-500 transition-all text-white font-sans placeholder:text-stone-500"
//                 placeholder="Enter password"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute right-4 top-3.5 text-stone-500 hover:text-white transition-colors"
//               >
//                 {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             disabled={loading}
//             className="w-full bg-red-700 text-white font-bold py-4 rounded-xl text-xs uppercase tracking-widest hover:bg-red-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? 'Signing in...' : 'Sign In'}
//           </button>
//         </form>
//       </motion.div>
//     </div>
//   );
// };

// export default AdminLogin;


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Warehouse, Lock, Mail, Eye, EyeOff } from "lucide-react";
import axios from "axios";

const AdminLogin = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    setError("");
  };

  // const handleSubmit = async (e) => {

  //   e.preventDefault();

  //   setLoading(true);
  //   setError("");

  //   try {
  //     // Import admin login service
  //     const { adminLogin } = await import("../services/adminService");

  //     const result = await adminLogin(formData);

  //     console.log("LOGIN RESPONSE:", result);

  //     // Support different possible response structures
  //     const token =
  //       result?.token ||
  //       result?.data?.token ||
  //       result?.accessToken ||
  //       result?.data?.accessToken;

  //     const admin =
  //       result?.admin ||
  //       result?.data?.admin ||
  //       result?.user ||
  //       result?.data?.user;

  //     // Check login success
  //     if (result?.success === true || token) {
  //       // Save token if backend sends one
  //       if (token) {
  //         localStorage.setItem("adminToken", token);

  //         axios.defaults.headers.common[
  //           "Authorization"
  //         ] = `Bearer ${token}`;
  //       }

  //       // Save admin information
  //       if (admin) {
  //         localStorage.setItem("admin", JSON.stringify(admin));
  //       }

  //       console.log("✅ Admin login successful");

  //       // Go to dashboard
  //       navigate("/admin-dashboard", { replace: true });

  //       return;
  //     }

  //     // Login failed
  //     setError(
  //       result?.message ||
  //         result?.error ||
  //         "Invalid email or password"
  //     );
  //   } catch (err) {
  //     console.error("LOGIN ERROR:", err);

  //     if (err.response) {
  //       console.error("STATUS:", err.response.status);
  //       console.error("DATA:", err.response.data);

  //       setError(
  //         err.response.data?.message ||
  //           "Login failed. Please check your email and password."
  //       );
  //     } else if (err.request) {
  //       setError(
  //         "Unable to connect to server. Please try again."
  //       );
  //     } else {
  //       setError("Something went wrong. Please try again.");
  //     }
  //   } finally {
  //     setLoading(false);
  //   }
  // };
const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    const { adminLogin } = await import("../services/adminService");

    const result = await adminLogin(formData);

    console.log("LOGIN RESULT:", result);

    if (result.success) {
      const token = result.token;

      if (!token) {
        console.error(
          "Login successful but token is missing:",
          result
        );

        setError(
          "Login successful, but authentication token is missing."
        );

        return;
      }

      // Save token
      localStorage.setItem("adminToken", token);

      // Save admin
      if (result.admin) {
        localStorage.setItem(
          "admin",
          JSON.stringify(result.admin)
        );
      }

      // Set Authorization header
      axios.defaults.headers.common["Authorization"] =
        `Bearer ${token}`;

      console.log("✅ Token saved");

      // Navigate to dashboard
      navigate("/admin-dashboard", {
        replace: true,
      });
    } else {
      setError(
        result.message || "Invalid email or password"
      );
    }
  } catch (err) {
    console.error("LOGIN ERROR:", err);

    console.error(
      "SERVER RESPONSE:",
      err.response?.data
    );

    setError(
      err.response?.data?.message ||
        "Unable to login. Please try again."
    );
  } finally {
    setLoading(false);
  }
};
  
  return (
    <div className="min-h-screen bg-stone-950 flex items-center justify-center font-sans relative overflow-hidden">

      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(220,38,38,0.15),transparent_60%)]"></div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(220,38,38,0.1),transparent_60%)]"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 w-full max-w-md bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-10 shadow-2xl"
      >

        {/* Header */}
        <div className="text-center mb-8">

          <div className="w-16 h-16 bg-red-700 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-red-900/30">
            <Warehouse className="w-8 h-8 text-white" />
          </div>

          <h1 className="text-3xl font-serif font-semibold text-white mb-2">
            Admin Login
          </h1>

          <p className="text-stone-400 font-sans font-light text-sm">
            Vardha Warehousing Admin Panel
          </p>

        </div>

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Error */}
          {error && (
            <div className="bg-red-900/30 border border-red-500/50 rounded-xl p-4 text-red-300 text-sm">
              {error}
            </div>
          )}

          {/* Email */}
          <div>

            <label className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 block">
              Email
            </label>

            <div className="relative">

              <Mail className="absolute left-4 top-3.5 w-5 h-5 text-stone-500" />

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                autoComplete="email"
                className="w-full bg-transparent border border-white/10 rounded-xl py-3 pl-12 pr-4 outline-none focus:border-red-500 transition-all text-white font-sans placeholder:text-stone-500"
                placeholder="admin@vardha.com"
              />

            </div>

          </div>

          {/* Password */}
          <div>

            <label className="text-xs font-bold uppercase tracking-widest text-stone-400 mb-2 block">
              Password
            </label>

            <div className="relative">

              <Lock className="absolute left-4 top-3.5 w-5 h-5 text-stone-500" />

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                autoComplete="current-password"
                className="w-full bg-transparent border border-white/10 rounded-xl py-3 pl-12 pr-12 outline-none focus:border-red-500 transition-all text-white font-sans placeholder:text-stone-500"
                placeholder="Enter password"
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="absolute right-4 top-3.5 text-stone-500 hover:text-white transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>

            </div>

          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-red-700 text-white font-bold py-4 rounded-xl text-xs uppercase tracking-widest hover:bg-red-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>

        </form>

      </motion.div>
    </div>
  );
};

export default AdminLogin;