import React, { useState, useCallback } from "react";
import Sidebar from "./Sidebar";
import Navbar from "./Nav";
import DashboardHome from "./DashboardHome";
import Enquiries from "./Enquiries";
import FAQManagement from "./FAQManagement";
import Contacts from "./Contacts";
import PricingManagement from "./PricingManagement";
import ProfileSettings from "./profile";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Package, Mail } from "lucide-react";

function MainDashboard() {
  const [activePage, setActivePage] = useState("dashboard");
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [recordsTab, setRecordsTab] = useState("enquiries");
  const navigate = useNavigate();

  const handleLogout = useCallback(async () => {
    try {
      await axios.get("/api/auth/logout", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("adminToken")}`,
        },
        withCredentials: true,
      });
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      localStorage.removeItem("adminToken");
      localStorage.removeItem("admin");
      delete axios.defaults.headers.common["Authorization"];
      navigate("/admin-login");
    }
  }, [navigate]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F8F7F5]">
      <Sidebar
        activePage={activePage}
        setActivePage={setActivePage}
        handleLogout={handleLogout}
        isCollapsed={isSidebarCollapsed}
        setIsCollapsed={setIsSidebarCollapsed}
      />

      <div
        className={`flex-1 flex flex-col transition-all duration-300
          ${isSidebarCollapsed ? "lg:ml-20" : "lg:ml-72"}
        `}
      >
        <Navbar onProfileClick={() => setActivePage("profile")} />

        <main className="flex-1 overflow-y-auto p-4 md:p-6">
          <div className="max-w-6xl mx-auto">
            {activePage === "dashboard" && <DashboardHome />}
            {(activePage === "enquiries" || activePage === "contacts") && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <h1 className="text-3xl font-serif font-medium text-stone-900">
                      {activePage === "enquiries" ? "Enquiry Management" : "Contact Management"}
                    </h1>
                    <p className="text-stone-600 font-sans font-light">
                      {activePage === "enquiries"
                        ? "View and manage warehouse enquiries"
                        : "View and manage contact form submissions"}
                    </p>
                  </div>
                  <div className="flex rounded-xl border border-stone-200 bg-white p-1">
                    <button
                      onClick={() => { setRecordsTab("enquiries"); setActivePage("enquiries"); }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                        recordsTab === "enquiries"
                          ? "bg-red-700 text-white shadow"
                          : "text-stone-600 hover:text-stone-900"
                      }`}
                    >
                      <Package className="w-4 h-4" />
                      Enquiries
                    </button>
                    <button
                      onClick={() => { setRecordsTab("contacts"); setActivePage("contacts"); }}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-all ${
                        recordsTab === "contacts"
                          ? "bg-red-700 text-white shadow"
                          : "text-stone-600 hover:text-stone-900"
                      }`}
                    >
                      <Mail className="w-4 h-4" />
                      Contacts
                    </button>
                  </div>
                </div>
                {recordsTab === "enquiries" && <Enquiries />}
                {recordsTab === "contacts" && <Contacts />}
              </div>
            )}
            {activePage === "faqs" && <FAQManagement />}
            {activePage === "pricing" && (
              <div className="flex justify-center">
                <div className="w-full max-w-3xl">
                  <PricingManagement />
                </div>
              </div>
            )}
            {activePage === "profile" && <ProfileSettings onCancel={() => setActivePage("dashboard")} />}
          </div>
        </main>
      </div>
    </div>
  );
}

export default MainDashboard;
