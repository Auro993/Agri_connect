import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";

import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Public Pages
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

// Dashboard
import Dashboard from "./pages/Dashboard";

// Week 1: Mandi Price Alert
import MarketPrices from "./pages/MarketPrices";
import SetAlerts from "./pages/SetAlerts";

// Week 2: Weather Scheduler
import FarmAdvisor from "./pages/FarmAdvisor";
import IrrigationTips from "./pages/IrrigationTips";

// Week 3: Rent-a-Tractor
import EquipmentList from "./pages/EquipmentList";
import MyListings from "./pages/MyListings";
import Booking from "./pages/Booking";
import AddListing from "./pages/AddListing";  // ✅ ADD THIS LINE

// Week 4: AI Crop Doctor
import CropDoctor from "./pages/CropDoctor";
import ScanHistory from "./pages/ScanHistory";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      
      <div style={{ padding: "30px", minHeight: "80vh", background: "#f5f5f5" }}>
        <Routes>
          {/* ========== PUBLIC ROUTES ========== */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* ========== DASHBOARD (PROTECTED) ========== */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } 
          />

          {/* ========== WEEK 1: MANDI PRICE ALERT ========== */}
          <Route 
            path="/market-prices" 
            element={
              <ProtectedRoute>
                <MarketPrices />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/set-alerts" 
            element={
              <ProtectedRoute>
                <SetAlerts />
              </ProtectedRoute>
            } 
          />

          {/* ========== WEEK 2: WEATHER SCHEDULER ========== */}
          <Route 
            path="/farm-advisor" 
            element={
              <ProtectedRoute>
                <FarmAdvisor />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/irrigation-tips" 
            element={
              <ProtectedRoute>
                <IrrigationTips />
              </ProtectedRoute>
            } 
          />

          {/* ========== WEEK 3: RENT-A-TRACTOR ========== */}
          <Route 
            path="/equipment-list" 
            element={
              <ProtectedRoute>
                <EquipmentList />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/my-listings" 
            element={
              <ProtectedRoute>
                <MyListings />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/booking/:id" 
            element={
              <ProtectedRoute>
                <Booking />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/add-listing" 
            element={
              <ProtectedRoute>
                <AddListing />
              </ProtectedRoute>
            } 
          />

          {/* ========== WEEK 4: AI CROP DOCTOR ========== */}
          <Route 
            path="/crop-doctor" 
            element={
              <ProtectedRoute>
                <CropDoctor />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/scan-history" 
            element={
              <ProtectedRoute>
                <ScanHistory />
              </ProtectedRoute>
            } 
          />

          {/* ========== 404 NOT FOUND ========== */}
          <Route 
            path="*" 
            element={
              <div style={{ 
                textAlign: "center", 
                padding: "50px",
                background: "white",
                borderRadius: "10px",
                boxShadow: "0 2px 10px rgba(0,0,0,0.05)"
              }}>
                <h2 style={{ color: "#e74c3c", fontSize: "2rem", marginBottom: "20px" }}>
                  ❌ 404 - Page Not Found
                </h2>
                <p style={{ color: "#64748b", marginBottom: "30px" }}>
                  The page you're looking for doesn't exist or has been moved.
                </p>
                <button 
                  onClick={() => window.location.href = "/"}
                  style={{ 
                    padding: "12px 30px", 
                    background: "#27ae60", 
                    color: "white", 
                    border: "none", 
                    borderRadius: "8px", 
                    fontSize: "1rem",
                    fontWeight: "600",
                    cursor: "pointer",
                    transition: "all 0.3s"
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = "#2ecc71";
                    e.target.style.transform = "translateY(-2px)";
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = "#27ae60";
                    e.target.style.transform = "translateY(0)";
                  }}
                >
                  Go to Homepage
                </button>
              </div>
            } 
          />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;