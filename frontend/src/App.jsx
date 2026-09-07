import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import ScrollToTop from "./Components/ScrollToTop.jsx";
import FloatingWhatsApp from "./Components/FloatingWhatsApp.jsx";
import "./App.css";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

const Home = lazy(() => import("./pages/Home.jsx"));
const About = lazy(() => import("./pages/About.jsx"));
const Facility = lazy(() => import("./pages/Facility.jsx"));
const BookWarehouse = lazy(() => import("./pages/BookWarehouse.jsx"));
const Solutions = lazy(() => import("./pages/Solutions.jsx"));
const UseCases = lazy(() => import("./pages/UseCases.jsx"));
const Clients = lazy(() => import("./pages/Clients.jsx"));
const FAQ = lazy(() => import("./pages/FAQ.jsx"));
const Contact = lazy(() => import("./pages/Contact.jsx"));
const AdminLogin = lazy(() => import("./pages/AdminLogin.jsx"));
const AdminDashboard = lazy(() => import("./pages/AdminDashboard/DashboardMain.jsx"));
const PaymentDemo = lazy(() => import("./pages/PaymentDemo.jsx"));
const PaymentSuccess = lazy(() => import("./pages/PaymentSuccess.jsx"));

function App() {
  return (
    <>
      <ScrollToTop />
      <FloatingWhatsApp />
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-screen bg-stone-50">
          <div className="w-10 h-10 border-4 border-red-700 border-t-transparent rounded-full animate-spin"></div>
        </div>
      }>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/facility" element={<Facility />} />
          <Route path="/book-warehouse" element={<BookWarehouse />} />
          <Route path="/solutions" element={<Solutions />} />
          <Route path="/use-cases" element={<UseCases />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
          <Route path="/payment-demo" element={<PaymentDemo />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
