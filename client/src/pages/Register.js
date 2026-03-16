import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

// Get the API URL from environment variable
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "buyer",
    location: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Debug log
    console.log("🔄 Attempting registration...");
    console.log("Data:", formData);
    console.log("URL:", `${API_URL}/api/auth/register`);

    try {
      // First, test if backend is reachable
      console.log("🔍 Testing backend connection...");
      const testResponse = await fetch(`${API_URL}/api/auth/register`, {
        method: "GET",
        mode: "cors"
      });
      console.log("Backend test response:", testResponse.status);

      // Now attempt registration
      console.log("📤 Sending registration request...");
      const startTime = Date.now();
      
      const response = await fetch(`${API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify(formData),
        mode: "cors"
      });

      const endTime = Date.now();
      console.log(`⏱️ Response time: ${endTime - startTime}ms`);
      console.log("Status:", response.status);
      console.log("OK:", response.ok);

      if (!response.ok) {
        let errorMsg = `HTTP ${response.status}`;
        try {
          const errorData = await response.json();
          errorMsg = errorData.message || errorMsg;
          console.error("Error data:", errorData);
        } catch (e) {
          const text = await response.text();
          errorMsg = text || errorMsg;
          console.error("Error text:", text);
        }
        throw new Error(errorMsg);
      }

      const data = await response.json();
      console.log("✅ Success! Data:", data);
      
      // Show success message and redirect to login
      alert(`🎉 Registration successful!\nPlease login with your credentials.`);
      navigate("/login");
      
    } catch (error) {
      console.error("❌ Registration error:", error);
      console.error("Error details:", error.message, error.stack);
      
      let errorMessage = error.message;
      
      if (error.message.includes("Failed to fetch") || 
          error.message.includes("NetworkError") ||
          error.message.includes("Network request failed")) {
        errorMessage = "Cannot connect to backend server. Make sure the backend is running.";
      }
      
      setError(errorMessage);
      alert(`Registration failed: ${errorMessage}\n\nCheck console (F12) for details.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      maxWidth: "500px", 
      margin: "40px auto", 
      padding: "30px", 
      border: "1px solid #ddd", 
      borderRadius: "10px",
      background: "#f9f9f9"
    }}>
      <h2 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "25px" }}>Create Account</h2>
      
      {error && (
        <div style={{ 
          background: "#ffeaea", 
          color: "#e74c3c", 
          padding: "15px", 
          borderRadius: "8px",
          marginBottom: "20px",
          border: "1px solid #ffcccc",
          fontSize: "14px"
        }}>
          <strong>⚠️ Error:</strong> {error}
          <div style={{ marginTop: "10px", fontSize: "12px", color: "#c0392b" }}>
            <strong>Debug Info:</strong><br/>
            • Backend URL: {API_URL}/api/auth/register<br/>
            • Make sure backend is running
          </div>
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#34495e" }}>Full Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Enter full name"
            style={{ width: "100%", padding: "12px", borderRadius: "5px", border: "1px solid #bdc3c7", fontSize: "16px" }}
            required
            disabled={loading}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#34495e" }}>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter email"
            style={{ width: "100%", padding: "12px", borderRadius: "5px", border: "1px solid #bdc3c7", fontSize: "16px" }}
            required
            disabled={loading}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#34495e" }}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Create password (min 6 characters)"
            style={{ width: "100%", padding: "12px", borderRadius: "5px", border: "1px solid #bdc3c7", fontSize: "16px" }}
            minLength="6"
            required
            disabled={loading}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#34495e" }}>Role</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            style={{ width: "100%", padding: "12px", borderRadius: "5px", border: "1px solid #bdc3c7", fontSize: "16px" }}
            disabled={loading}
          >
            <option value="farmer">Farmer</option>
            <option value="buyer">Buyer</option>
          </select>
        </div>

        <div style={{ marginBottom: "30px" }}>
          <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#34495e" }}>Location</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter city/village"
            style={{ width: "100%", padding: "12px", borderRadius: "5px", border: "1px solid #bdc3c7", fontSize: "16px" }}
            disabled={loading}
          />
        </div>

        <button 
          type="submit" 
          style={{ 
            width: "100%", 
            padding: "15px", 
            background: loading ? "#95a5a6" : "#27ae60", 
            color: "white", 
            border: "none", 
            borderRadius: "5px",
            cursor: loading ? "not-allowed" : "pointer",
            fontSize: "16px",
            fontWeight: "bold",
            transition: "all 0.3s"
          }}
          disabled={loading}
        >
          {loading ? (
            <>
              <span style={{ display: "inline-block", animation: "spin 1s linear infinite", marginRight: "10px" }}>⟳</span>
              Registering...
            </>
          ) : "Register"}
        </button>
        
        <div style={{ textAlign: "center", marginTop: "25px", color: "#7f8c8d" }}>
          <p>
            Already have an account?{" "}
            <Link to="/login" style={{ color: "#3498db", textDecoration: "none", fontWeight: "bold" }}>
              Login here
            </Link>
          </p>
          <p style={{ fontSize: "12px", marginTop: "15px", background: "#f0f0f0", padding: "10px", borderRadius: "5px" }}>
            <strong>Note:</strong> Backend URL: {API_URL}<br/>
            Check console (F12) for detailed error information
          </p>
        </div>
      </form>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}

export default Register;