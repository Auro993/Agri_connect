import { useState, useEffect } from "react";

function MyCrops() {
  const [myCrops, setMyCrops] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyCrops();
  }, []);

  const fetchMyCrops = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://127.0.0.1:5001/api/crops/my", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();
      setMyCrops(data);
    } catch (error) {
      console.error("Error fetching my crops:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (cropId) => {
    if (window.confirm("Are you sure you want to delete this crop?")) {
      try {
        const token = localStorage.getItem("token");
        await fetch(`http://localhost:5001/api/crops/${cropId}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        alert("Crop deleted successfully");
        fetchMyCrops(); // Refresh list
      } catch (error) {
        alert("Failed to delete crop");
      }
    }
  };

  if (loading) return <p>Loading your crops...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>👨‍🌾 My Crops</h2>
      
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
        <p>Total crops listed: <strong>{myCrops.length}</strong></p>
        <button 
          style={{ padding: "10px 20px", background: "#27ae60", color: "white", border: "none", borderRadius: "5px" }}
          onClick={() => window.location.href = "/add-crop"}
        >
          + Add New Crop
        </button>
      </div>

      {myCrops.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px", background: "#fff", borderRadius: "10px", border: "2px dashed #ddd" }}>
          <p style={{ fontSize: "18px", color: "#7f8c8d" }}>You haven't listed any crops yet.</p>
          <button 
            onClick={() => window.location.href = "/add-crop"}
            style={{ padding: "12px 30px", marginTop: "20px", background: "#3498db", color: "white", border: "none", borderRadius: "5px" }}
          >
            List Your First Crop
          </button>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(350px, 1fr))", gap: "20px" }}>
          {myCrops.map(crop => (
            <div key={crop.id} style={styles.card}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
                <h3 style={{ color: "#2c3e50", margin: 0 }}>{crop.cropName}</h3>
                <span style={{ 
                  background: crop.quantity > 0 ? "#27ae60" : "#e74c3c", 
                  color: "white", 
                  padding: "3px 10px", 
                  borderRadius: "20px", 
                  fontSize: "14px" 
                }}>
                  {crop.quantity > 0 ? "Available" : "Sold Out"}
                </span>
              </div>
              
              <div style={{ marginTop: "15px" }}>
                <div style={styles.infoRow}>
                  <span style={styles.label}>Quantity:</span>
                  <span style={styles.value}>{crop.quantity} kg</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.label}>Price:</span>
                  <span style={styles.value}>₹{crop.pricePerKg}/kg</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.label}>Location:</span>
                  <span style={styles.value}>{crop.location}</span>
                </div>
                <div style={styles.infoRow}>
                  <span style={styles.label}>Total Value:</span>
                  <span style={{ ...styles.value, fontWeight: "bold", color: "#27ae60" }}>
                    ₹{crop.quantity * crop.pricePerKg}
                  </span>
                </div>
              </div>

              <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
                <button style={styles.editBtn}>✏️ Edit</button>
                <button 
                  style={styles.deleteBtn}
                  onClick={() => handleDelete(crop.id)}
                >
                  🗑️ Delete
                </button>
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
    padding: "25px",
    background: "#fff",
    boxShadow: "0 3px 10px rgba(0,0,0,0.08)"
  },
  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    paddingBottom: "8px",
    borderBottom: "1px solid #eee"
  },
  label: {
    color: "#7f8c8d",
    fontSize: "14px"
  },
  value: {
    fontWeight: "500",
    color: "#2c3e50"
  },
  editBtn: {
    flex: 1,
    padding: "10px",
    background: "#3498db",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.3s",
    ":hover": {
      background: "#2980b9"
    }
  },
  deleteBtn: {
    flex: 1,
    padding: "10px",
    background: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.3s",
    ":hover": {
      background: "#c0392b"
    }
  }
};

export default MyCrops;
