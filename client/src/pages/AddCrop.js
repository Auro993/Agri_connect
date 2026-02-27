import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AddCrop() {
  const [formData, setFormData] = useState({
    cropName: "",
    quantity: "",
    pricePerKg: "",
    location: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://127.0.0.1:5001/api/crops", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        alert("Crop added successfully! ✅");
        navigate("/crops");
      } else {
        const error = await res.json();
        alert(error.message || "Failed to add crop");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "40px auto", padding: "30px", border: "1px solid #ddd", borderRadius: "10px", background: "#f9f9f9" }}>
      <h2 style={{ textAlign: "center", color: "#2c3e50", marginBottom: "30px" }}>🌱 Add New Crop</h2>
      
      <form onSubmit={handleSubmit}>
        {["cropName", "quantity", "pricePerKg", "location"].map(field => (
          <div key={field} style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px", fontWeight: "bold", color: "#34495e" }}>
              {field === "cropName" ? "Crop Name" : 
               field === "quantity" ? "Quantity (kg)" :
               field === "pricePerKg" ? "Price per kg (₹)" :
               "Location"}
            </label>
            <input
              type={field === "quantity" || field === "pricePerKg" ? "number" : "text"}
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={field === "cropName" ? "e.g., Wheat, Rice" : 
                         field === "quantity" ? "Enter quantity" :
                         field === "pricePerKg" ? "Enter price" :
                         "City/Village"}
              style={{ width: "100%", padding: "12px", borderRadius: "5px", border: "1px solid #bdc3c7", fontSize: "16px" }}
              required
              min={field === "quantity" || field === "pricePerKg" ? "1" : undefined}
            />
          </div>
        ))}

        <div style={{ display: "flex", gap: "15px", marginTop: "30px" }}>
          <button 
            type="button"
            onClick={() => navigate("/crops")}
            style={{ 
              flex: 1, 
              padding: "12px", 
              background: "#95a5a6", 
              color: "white", 
              border: "none", 
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px"
            }}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            style={{ 
              flex: 2, 
              padding: "12px", 
              background: "#27ae60", 
              color: "white", 
              border: "none", 
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "16px",
              opacity: loading ? 0.7 : 1
            }}
            disabled={loading}
          >
            {loading ? "Adding Crop..." : "Add Crop to Marketplace"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddCrop;
