import { useState, useEffect } from "react";

function Crops() {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCrops();
  }, []);

  const fetchCrops = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://127.0.0.1:5001/api/crops", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();
      setCrops(data);
    } catch (error) {
      console.error("Error fetching crops:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading crops...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>🌾 Available Crops</h2>
      
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: "20px" }}>
        <button 
          style={{ padding: "10px 20px", background: "#27ae60", color: "white", border: "none", borderRadius: "5px" }}
          onClick={() => window.location.href = "/add-crop"}
        >
          + Add Crop
        </button>
      </div>

      {crops.length === 0 ? (
        <p>No crops available. Be the first to add one!</p>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "20px" }}>
          {crops.map(crop => (
            <div key={crop.id} style={styles.card}>
              <h3 style={{ color: "#2c3e50", marginBottom: "10px" }}>{crop.cropName}</h3>
              <p><strong>Quantity:</strong> {crop.quantity} kg</p>
              <p><strong>Price:</strong> ₹{crop.pricePerKg}/kg</p>
              <p><strong>Location:</strong> {crop.location}</p>
              <p><strong>Seller:</strong> {crop.User?.name || "Unknown"}</p>
              
              <div style={{ marginTop: "15px", display: "flex", gap: "10px" }}>
                <button style={styles.btnBuy}>🛒 Buy Now</button>
                <button style={styles.btnDetails}>ℹ️ Details</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "10px",
    padding: "20px",
    background: "#fff",
    boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
    transition: "transform 0.2s",
    ":hover": {
      transform: "translateY(-5px)",
      boxShadow: "0 5px 15px rgba(0,0,0,0.2)"
    }
  },
  btnBuy: {
    padding: "8px 15px",
    background: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    flex: 1
  },
  btnDetails: {
    padding: "8px 15px",
    background: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    flex: 1
  }
};

export default Crops;
