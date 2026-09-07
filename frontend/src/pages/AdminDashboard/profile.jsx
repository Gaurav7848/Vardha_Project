import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ArrowLeft,
  Save,
  User,
  Mail,
  Phone,
  Lock,
  Upload,
  MapPin,
  CheckCircle2,
  AlertCircle,
  KeyRound,
} from "lucide-react";

const ProfileSettings = ({ onCancel }) => {
  const initialProfile = {
    name: "",
    role: "admin",
    email: "",
    phone: "",
    district: "",
    state: "",
    pinCode: "",
    country: "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    photo: null,
  };

  const [profile, setProfile] = useState(initialProfile);
  const [savedProfile, setSavedProfile] = useState(initialProfile);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [showToast, setShowToast] = useState(false);
  const [toastMsg, setToastMsg] = useState(
    "Profile synchronized successfully!",
  );
  const [toastType, setToastType] = useState("success"); // "success" | "error"

  // ── Fetch real admin data from backend on mount ──────────────────────────
  useEffect(() => {
    const fetchProfile = async () => {
      console.log("🚀 fetchProfile started");
      try {
        const token = localStorage.getItem("adminToken");
        console.log("🔑 Token from localStorage:", token);
        console.log("📡 Sending request to /api/profile/me");
        const res = await axios.get("/api/profile/me", {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        });
        console.log("✅ Response received:", res.data);
        if (res.data.success) {
          const data = res.data.admin;
          const loaded = {
            ...initialProfile,
            name: data.name || "",
            email: data.email || "",
            role: data.role || "admin",
            phone: data.phone || "",
          };
          setProfile(loaded);
          setSavedProfile(loaded);
        }
      } catch (err) {
        console.log("❌ Axios error full object:", err);
        console.log("❌ Axios response:", err.response);
        console.log("❌ Axios status:", err.response?.status);
        console.log("❌ Axios data:", err.response?.data);
        console.error("Failed to load profile:", err);
        showToastMessage("Failed to load profile data.", "error");
      } finally {
        setFetching(false);
      }
    };
    fetchProfile();
  }, []);

  // ── Helpers ───────────────────────────────────────────────────────────────
  const isDirty = JSON.stringify(profile) !== JSON.stringify(savedProfile);

  const showToastMessage = (msg, type = "success") => {
    setToastMsg(msg);
    setToastType(type);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile((prev) => ({ ...prev, photo: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleBack = () => {
    if (isDirty) {
      if (window.confirm("You have unsaved changes. Leave anyway?")) {
        onCancel();
      }
    } else {
      onCancel();
    }
  };

  // ── Save to backend ───────────────────────────────────────────────────────
  const handleSave = async () => {
    if (profile.newPassword && profile.newPassword.length < 8) {
      showToastMessage("Password must be at least 8 characters!", "error");
      return;
    }

    if (
      profile.newPassword &&
      profile.newPassword !== profile.confirmPassword
    ) {
      showToastMessage("New passwords do not match!", "error");
      return;
    }

     setLoading(true);
     try {
       const token = localStorage.getItem("adminToken");

       // 1. Update profile fields
      await axios.put(
        "/api/profile/update",
        {
          name: profile.name,
          phone: profile.phone,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
          withCredentials: true,
        },
      );

      // 2. Change password only if fields are filled
      if (profile.currentPassword && profile.newPassword) {
        await axios.post(
          "/api/profile/change-password",
          {
            currentPassword: profile.currentPassword,
            newPassword: profile.newPassword,
            confirmPassword: profile.confirmPassword,
          },
          {
            headers: { Authorization: `Bearer ${token}` },
            withCredentials: true,
          },
        );
      }

      // Reset password fields after save
      const updated = {
        ...profile,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      };
      setProfile(updated);
      setSavedProfile(updated);
      showToastMessage("Profile synchronized successfully!", "success");
    } catch (err) {
      showToastMessage(
        err.response?.data?.message || "Failed to save profile.",
        "error",
      );
    } finally {
      setLoading(false);
    }
  };

  // ── Loading state ─────────────────────────────────────────────────────────
  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F4F7FE]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-red-600/30 border-t-red-600 rounded-full animate-spin" />
          <p className="text-sm font-bold text-stone-500 uppercase tracking-widest">
            Loading Profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-2 md:p-5 text-[#1C1917]">
      {/* ── TOAST ── */}
      {showToast && (
        <div
          className={`fixed top-10 right-10 px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-3 z-[100] transition-all duration-300
          ${toastType === "success" ? "bg-green-600 text-white" : "bg-red-500 text-white"}`}
        >
          {toastType === "success" ? (
            <CheckCircle2 size={20} />
          ) : (
            <AlertCircle size={20} />
          )}
          <span className="font-bold text-sm">{toastMsg}</span>
        </div>
      )}

      <div className="max-w-5xl mx-auto space-y-6 pb-20">
        {/* ── STICKY HEADER ── */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-white/70 backdrop-blur-md p-6 rounded-[1.5rem] top-16 z-40 border border-white shadow-sm">
          <div className="flex items-center gap-4">
            <button
              className="w-10 h-10 cursor-pointer rounded-full hover:bg-red-700 border border-red-700 text-red-700 hover:text-white flex items-center justify-center hover:scale-110 transition-transform"
              onClick={handleBack}
            >
              <ArrowLeft size={18} />
            </button>
            <div>
              <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
                Admin<span className="text-red-700"> Profile</span>
                {isDirty && (
                  <span className="w-2 h-2 bg-red-700 rounded-full animate-pulse" />
                )}
              </h1>
              <p className="text-[10px] uppercase font-bold text-stone-400 tracking-widest">
                Master Identity Control
              </p>
            </div>
          </div>

          <button
            onClick={handleSave}
            disabled={!isDirty || loading}
            className={`flex items-center gap-2 px-8 py-3 rounded-2xl font-bold transition-all shadow-lg
              ${
                isDirty
                  ? "hover:bg-red-800 text-white bg-red-700 scale-105 cursor-pointer"
                  : "bg-stone-200 text-stone-400 cursor-not-allowed"
              }`}
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Save size={18} />
            )}
            {loading ? "Syncing..." : "Save Changes"}
          </button>
        </div>

        {/* ── MAIN CARD ── */}
        <div className="bg-white rounded-[1.5rem] border border-stone-200 shadow-2xl overflow-hidden">
          {/* Card Header */}
          <div className="p-6 md:p-10 border-b border-stone-100 bg-gradient-to-b from-white to-[#FAF9F8]">
            <div className="flex items-center gap-3">
              <User size={22} className="text-stone-800" />
              <h2 className="text-xl font-bold text-stone-800">
                Basic Details
              </h2>
            </div>
          </div>

          <div className="px-4">
            <div className="h-[3px] bg-red-700" />
          </div>

          {/* ── FORM CONTENT ── */}
          <div className="p-6 md:p-8 space-y-8">
            {/* PERSONAL IDENTIFICATION */}
            <Section
              title="Personal Identification"
              icon={<User size={16} className="text-red-700" />}
            >
              <Grid>
                <InputField
                  label="Display Name"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  placeholder="e.g. John Doe"
                />
                <InputField
                  label="Contact Number"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  placeholder="+91 00000 00000"
                />
                <InputField
                  label="Work Email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  placeholder="admin@example.com"
                  disabled={true} // Email cannot be changed
                />
              </Grid>
            </Section>

            <div className="px-4">
              <div className="h-[3px] bg-red-700" />
            </div>

            {/* SECURITY & AUTHENTICATION */}
            <Section
              title="Security & Authentication"
              icon={<Lock size={16} className="text-red-700" />}
            >
              <div className="bg-stone-50 p-6 md:p-8 rounded-2xl border border-stone-100 shadow-inner">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 bg-white rounded-xl shadow-sm border border-stone-100">
                    <KeyRound size={18} className="text-red-700" />
                  </div>
                  <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-stone-700">
                    Credential Refresh
                  </h4>
                </div>
                <Grid>
                  <InputField
                    label="Current Password"
                    name="currentPassword"
                    type="password"
                    value={profile.currentPassword}
                    onChange={handleChange}
                    placeholder="••••••••"
                  />
                  <InputField
                    label="New Password"
                    name="newPassword"
                    type="password"
                    value={profile.newPassword}
                    onChange={handleChange}
                    placeholder="Min. 8 characters"
                  />
                  <InputField
                    label="Confirm New Password"
                    name="confirmPassword"
                    type="password"
                    value={profile.confirmPassword}
                    onChange={handleChange}
                    placeholder="Match new password"
                  />
                </Grid>
              </div>
            </Section>

            {/* UNSAVED CHANGES ALERT */}
            {isDirty && (
              <div className="flex items-center gap-4 bg-orange-50 p-5 rounded-3xl border border-orange-100 text-red-700">
                <div className="p-2 bg-red-700 text-white rounded-full">
                  <AlertCircle size={18} />
                </div>
                <div className="flex-1">
                  <p className="text-xs font-black uppercase tracking-widest">
                    Unsaved Modifications
                  </p>
                  <p className="text-[11px] font-medium opacity-80">
                    Sync the database to apply these profile updates.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// ── SUB-COMPONENTS ────────────────────────────────────────────────────────────

const Section = ({ title, icon, children }) => (
  <div>
    <div className="flex items-center gap-4 mb-6">
      <div className="p-2.5 bg-[#FAF9F8] border border-stone-100 rounded-2xl shadow-sm">
        {icon}
      </div>
      <h3 className="text-[11px] font-black uppercase tracking-[0.3em] text-stone-400">
        {title}
      </h3>
    </div>
    {children}
  </div>
);

const Grid = ({ children }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {children}
  </div>
);

const InputField = ({ label, disabled = false, ...props }) => (
  <div className="space-y-2 group">
    <label className="text-[10px] font-black text-stone-500 uppercase tracking-widest ml-1 transition-colors group-focus-within:text-red-700">
      {label}
    </label>
    <input
      {...props}
      disabled={disabled}
      className={`w-full border rounded-[1.2rem] px-6 py-4 text-sm font-bold text-stone-800 outline-none transition-all placeholder:text-stone-300
        ${
          disabled
            ? "bg-stone-100 border-stone-200 text-stone-400 cursor-not-allowed"
            : "bg-[#FAF9F8] border-stone-200 focus:border-red-500 focus:ring-8 focus:ring-red-500/5 focus:bg-white"
        }`}
    />
    {disabled && (
      <p className="text-[9px] text-stone-400 ml-1 font-bold uppercase tracking-widest">
        Email cannot be changed
      </p>
    )}
  </div>
);

export default ProfileSettings;
