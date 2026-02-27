import { useState, useEffect } from "react";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch("http://127.0.0.1:5001/api/orders", {
        headers: {
          "Authorization": `Bearer ${token}`
        }
      });
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>📦 My Orders</h2>
      
      {orders.length === 0 ? (
        <div style={{ textAlign: "center", padding: "50px", background: "#fff", borderRadius: "10px" }}>
          <p style={{ fontSize: "18px", color: "#7f8c8d" }}>You haven't placed any orders yet.</p>
          <button 
            onClick={() => window.location.href = "/crops"}
            style={{ padding: "12px 30px", marginTop: "20px", background: "#3498db", color: "white", border: "none", borderRadius: "5px" }}
          >
            Browse Crops
          </button>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", background: "#fff", borderRadius: "10px", overflow: "hidden" }}>
            <thead>
              <tr style={{ background: "#2c3e50", color: "white" }}>
                <th style={{ padding: "15px", textAlign: "left" }}>Order ID</th>
                <th style={{ padding: "15px", textAlign: "left" }}>Crop</th>
                <th style={{ padding: "15px", textAlign: "left" }}>Quantity</th>
                <th style={{ padding: "15px", textAlign: "left" }}>Total Price</th>
                <th style={{ padding: "15px", textAlign: "left" }}>Status</th>
                <th style={{ padding: "15px", textAlign: "left" }}>Date</th>
              </tr>
            </thead>
            <tbody>
              {orders.map(order => (
                <tr key={order.id} style={{ borderBottom: "1px solid #eee" }}>
                  <td style={{ padding: "15px" }}>#{order.id}</td>
                  <td style={{ padding: "15px" }}>{order.Crop?.cropName || "Unknown"}</td>
                  <td style={{ padding: "15px" }}>{order.quantity} kg</td>
                  <td style={{ padding: "15px", fontWeight: "bold", color: "#27ae60" }}>₹{order.totalPrice}</td>
                  <td style={{ padding: "15px" }}>
                    <span style={{ 
                      padding: "5px 10px", 
                      borderRadius: "20px", 
                      background: "#2ecc71", 
                      color: "white",
                      fontSize: "14px"
                    }}>
                      Completed
                    </span>
                  </td>
                  <td style={{ padding: "15px", color: "#7f8c8d" }}>
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Orders;
