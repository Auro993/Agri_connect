import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  FaBell, FaTrash, FaPlus, FaCheckCircle,
  FaEnvelope, FaSms, FaMobile, FaClock,
  FaArrowLeft
} from "react-icons/fa";

function SetAlerts() {
  const navigate = useNavigate();
  const location = useLocation();
  const prefilledCrop = location.state?.crop || "";
  const prefilledPrice = location.state?.price || "";

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      crop: "Wheat",
      condition: "above",
      targetPrice: 2500,
      currentPrice: 2275,
      notification: ["email", "sms"],
      active: true,
      createdAt: "2026-02-13"
    },
    {
      id: 2,
      crop: "Rice",
      condition: "below",
      targetPrice: 2300,
      currentPrice: 2450,
      notification: ["email"],
      active: true,
      createdAt: "2026-02-12"
    }
  ]);

  const [showForm, setShowForm] = useState(false);
  const [newAlert, setNewAlert] = useState({
    crop: prefilledCrop || "",
    condition: "above",
    targetPrice: prefilledPrice || "",
    notification: {
      email: true,
      sms: false,
      whatsapp: false
    }
  });

  const [successMessage, setSuccessMessage] = useState("");

  const crops = ["Wheat", "Rice", "Onion", "Tomato", "Potato", "Cotton", "Maize", "Sugarcane"];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewAlert(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (type) => {
    setNewAlert(prev => ({
      ...prev,
      notification: {
        ...prev.notification,
        [type]: !prev.notification[type]
      }
    }));
  };

  const handleAddAlert = () => {
    if (!newAlert.crop || !newAlert.targetPrice) {
      alert("Please select crop and enter target price");
      return;
    }

    const alert = {
      id: Date.now(),
      crop: newAlert.crop,
      condition: newAlert.condition,
      targetPrice: parseFloat(newAlert.targetPrice),
      currentPrice: Math.floor(Math.random() * 1000) + 2000,
      notification: Object.keys(newAlert.notification).filter(key => newAlert.notification[key]),
      active: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setAlerts([alert, ...alerts]);
    setNewAlert({
      crop: "",
      condition: "above",
      targetPrice: "",
      notification: { email: true, sms: false, whatsapp: false }
    });
    setShowForm(false);
    setSuccessMessage("Alert created successfully!");

    setTimeout(() => setSuccessMessage(""), 3000);
  };

  const handleDeleteAlert = (id) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };

  const handleToggleActive = (id) => {
    setAlerts(alerts.map(alert => 
      alert.id === id ? { ...alert, active: !alert.active } : alert
    ));
  };

  return (
    <div style={styles.container}>
      {/* Header with Back Button */}
      <div style={styles.header}>
        <button onClick={() => navigate("/market-prices")} style={styles.backButton}>
          <FaArrowLeft style={{ marginRight: "8px" }} /> Back to Market Prices
        </button>
        <h1 style={styles.title}>
          <FaBell style={{ marginRight: "15px", color: "#27ae60" }} />
          Price Alerts
        </h1>
        <p style={styles.subtitle}>
          Get notified when crop prices reach your target
        </p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div style={styles.successMessage}>
          <FaCheckCircle style={{ marginRight: "10px" }} />
          {successMessage}
        </div>
      )}

      {/* Create Alert Button */}
      {!showForm && (
        <button 
          onClick={() => setShowForm(true)}
          style={styles.createButton}
        >
          <FaPlus /> Create New Alert
        </button>
      )}

      {/* Alert Form */}
      {showForm && (
        <div style={styles.formCard}>
          <h3 style={styles.formTitle}>Create New Price Alert</h3>
          
          <div style={styles.formGroup}>
            <label style={styles.label}>Select Crop</label>
            <select
              name="crop"
              value={newAlert.crop}
              onChange={handleInputChange}
              style={styles.select}
            >
              <option value="">Choose crop...</option>
              {crops.map(crop => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Alert Condition</label>
            <div style={styles.radioGroup}>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="condition"
                  value="above"
                  checked={newAlert.condition === "above"}
                  onChange={handleInputChange}
                />
                Price goes above
              </label>
              <label style={styles.radioLabel}>
                <input
                  type="radio"
                  name="condition"
                  value="below"
                  checked={newAlert.condition === "below"}
                  onChange={handleInputChange}
                />
                Price goes below
              </label>
            </div>
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Target Price (₹/quintal)</label>
            <input
              type="number"
              name="targetPrice"
              value={newAlert.targetPrice}
              onChange={handleInputChange}
              placeholder="Enter target price"
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Notify via</label>
            <div style={styles.checkboxGroup}>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={newAlert.notification.email}
                  onChange={() => handleCheckboxChange('email')}
                />
                <FaEnvelope /> Email
              </label>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={newAlert.notification.sms}
                  onChange={() => handleCheckboxChange('sms')}
                />
                <FaSms /> SMS
              </label>
              <label style={styles.checkboxLabel}>
                <input
                  type="checkbox"
                  checked={newAlert.notification.whatsapp}
                  onChange={() => handleCheckboxChange('whatsapp')}
                />
                <FaMobile /> WhatsApp
              </label>
            </div>
          </div>

          <div style={styles.formActions}>
            <button onClick={() => setShowForm(false)} style={styles.cancelButton}>
              Cancel
            </button>
            <button onClick={handleAddAlert} style={styles.saveButton}>
              Create Alert
            </button>
          </div>
        </div>
      )}

      {/* Active Alerts */}
      <div style={styles.alertsSection}>
        <h2 style={styles.sectionTitle}>Your Active Alerts</h2>
        
        {alerts.length === 0 ? (
          <div style={styles.emptyState}>
            <p>You haven't created any alerts yet</p>
          </div>
        ) : (
          <div style={styles.alertsList}>
            {alerts.map(alert => (
              <div key={alert.id} style={styles.alertCard}>
                <div style={styles.alertHeader}>
                  <div>
                    <h3 style={styles.alertCrop}>{alert.crop}</h3>
                    <span style={{
                      ...styles.alertCondition,
                      background: alert.condition === "above" ? "rgba(39, 174, 96, 0.1)" : "rgba(231, 76, 60, 0.1)",
                      color: alert.condition === "above" ? "#27ae60" : "#e74c3c"
                    }}>
                      {alert.condition === "above" ? "↑ Above" : "↓ Below"} ₹{alert.targetPrice}
                    </span>
                  </div>
                  <div style={styles.alertActions}>
                    <button 
                      onClick={() => handleToggleActive(alert.id)}
                      style={{
                        ...styles.activeToggle,
                        background: alert.active ? "#27ae60" : "#e2e8f0",
                        color: alert.active ? "white" : "#64748b"
                      }}
                    >
                      {alert.active ? "Active" : "Paused"}
                    </button>
                    <button 
                      onClick={() => handleDeleteAlert(alert.id)}
                      style={styles.deleteButton}
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>

                <div style={styles.alertDetails}>
                  <div style={styles.priceInfo}>
                    <span style={styles.priceLabel}>Current Price</span>
                    <span style={styles.currentPrice}>₹{alert.currentPrice}</span>
                  </div>
                  <div style={styles.priceInfo}>
                    <span style={styles.priceLabel}>Target Price</span>
                    <span style={styles.targetPrice}>₹{alert.targetPrice}</span>
                  </div>
                  <div style={styles.notificationIcons}>
                    {alert.notification.includes('email') && <FaEnvelope title="Email" />}
                    {alert.notification.includes('sms') && <FaSms title="SMS" />}
                    {alert.notification.includes('whatsapp') && <FaMobile title="WhatsApp" />}
                  </div>
                </div>

                <div style={styles.alertFooter}>
                  <FaClock style={{ marginRight: "5px", color: "#94a3b8" }} />
                  <span style={styles.createdDate}>
                    Created: {new Date(alert.createdAt).toLocaleDateString('en-IN')}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Tips Section */}
      <div style={styles.tipsSection}>
        <h3 style={styles.tipsTitle}>💡 Pro Tips</h3>
        <ul style={styles.tipsList}>
          <li>Set alerts for multiple price points to catch the best deals</li>
          <li>Enable WhatsApp notifications for instant updates</li>
          <li>You can pause alerts without deleting them</li>
          <li>Get notified when prices drop to buy low, or rise to sell high</li>
        </ul>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1000px",
    margin: "0 auto",
    padding: "30px 20px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    background: "#f0f7f0",  // ✅ CHANGED TO SOFT GREEN BACKGROUND
    minHeight: "100vh"
  },
  
  header: {
    marginBottom: "30px"
  },
  
  backButton: {
    background: "none",
    border: "none",
    color: "#2c5e3a",  // ✅ DARKER GREEN FOR CONTRAST
    fontSize: "0.95rem",
    cursor: "pointer",
    padding: "8px 0",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center",
    fontWeight: "500"
  },
  
  title: {
    fontSize: "2rem",
    color: "#1e3c2c",  // ✅ DARK GREEN
    margin: "0 0 8px 0",
    display: "flex",
    alignItems: "center"
  },
  
  subtitle: {
    color: "#2c5e3a",  // ✅ MEDIUM GREEN
    fontSize: "0.95rem",
    margin: 0
  },
  
  successMessage: {
    background: "#d4edda",
    color: "#155724",
    padding: "15px 20px",
    borderRadius: "10px",
    marginBottom: "25px",
    display: "flex",
    alignItems: "center",
    border: "1px solid #c3e6cb"
  },
  
  createButton: {
    background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)",
    color: "white",
    border: "none",
    padding: "16px 30px",
    borderRadius: "12px",
    fontSize: "1.1rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    width: "100%",
    marginBottom: "30px",
    boxShadow: "0 4px 12px rgba(39, 174, 96, 0.3)"
  },
  
  formCard: {
    background: "white",
    borderRadius: "16px",
    padding: "30px",
    marginBottom: "40px",
    boxShadow: "0 4px 12px rgba(0, 50, 30, 0.1)",
    border: "1px solid #c8e6c9"
  },
  
  formTitle: {
    fontSize: "1.3rem",
    color: "#1e3c2c",
    margin: "0 0 25px 0",
    fontWeight: "600"
  },
  
  formGroup: {
    marginBottom: "25px"
  },
  
  label: {
    display: "block",
    marginBottom: "10px",
    color: "#1e3c2c",
    fontWeight: "500",
    fontSize: "0.95rem"
  },
  
  select: {
    width: "100%",
    padding: "14px 20px",
    fontSize: "1rem",
    border: "2px solid #c8e6c9",
    borderRadius: "10px",
    outline: "none",
    background: "#f9fff9",
    cursor: "pointer",
    color: "#1e3c2c"
  },
  
  input: {
    width: "100%",
    padding: "14px 20px",
    fontSize: "1rem",
    border: "2px solid #c8e6c9",
    borderRadius: "10px",
    outline: "none",
    background: "#f9fff9",
    color: "#1e3c2c"
  },
  
  radioGroup: {
    display: "flex",
    gap: "30px"
  },
  
  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#2c5e3a",
    cursor: "pointer"
  },
  
  checkboxGroup: {
    display: "flex",
    gap: "30px"
  },
  
  checkboxLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#2c5e3a",
    cursor: "pointer"
  },
  
  formActions: {
    display: "flex",
    gap: "15px",
    justifyContent: "flex-end",
    marginTop: "20px"
  },
  
  cancelButton: {
    background: "white",
    border: "2px solid #c8e6c9",
    color: "#2c5e3a",
    padding: "14px 30px",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer"
  },
  
  saveButton: {
    background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)",
    color: "white",
    border: "none",
    padding: "14px 30px",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer"
  },
  
  alertsSection: {
    marginBottom: "40px"
  },
  
  sectionTitle: {
    fontSize: "1.5rem",
    color: "#1e3c2c",
    margin: "0 0 20px 0",
    fontWeight: "600"
  },
  
  emptyState: {
    background: "white",
    borderRadius: "16px",
    padding: "60px 20px",
    textAlign: "center",
    color: "#2c5e3a",
    border: "2px dashed #c8e6c9"
  },
  
  alertsList: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "20px"
  },
  
  alertCard: {
    background: "white",
    borderRadius: "16px",
    padding: "25px",
    boxShadow: "0 4px 12px rgba(0, 50, 30, 0.08)",
    border: "1px solid #c8e6c9"
  },
  
  alertHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: "15px"
  },
  
  alertCrop: {
    fontSize: "1.3rem",
    margin: "0 0 8px 0",
    color: "#1e3c2c",
    fontWeight: "600"
  },
  
  alertCondition: {
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "600"
  },
  
  alertActions: {
    display: "flex",
    gap: "10px",
    alignItems: "center"
  },
  
  activeToggle: {
    padding: "6px 15px",
    border: "none",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "600",
    cursor: "pointer"
  },
  
  deleteButton: {
    background: "none",
    border: "none",
    color: "#e74c3c",
    fontSize: "1.1rem",
    cursor: "pointer",
    padding: "5px"
  },
  
  alertDetails: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "15px 0",
    borderTop: "1px solid #c8e6c9",
    borderBottom: "1px solid #c8e6c9",
    marginBottom: "12px"
  },
  
  priceInfo: {
    display: "flex",
    flexDirection: "column"
  },
  
  priceLabel: {
    fontSize: "0.75rem",
    color: "#5a7c6a",
    textTransform: "uppercase",
    marginBottom: "4px"
  },
  
  currentPrice: {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#1e3c2c"
  },
  
  targetPrice: {
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#27ae60"
  },
  
  notificationIcons: {
    display: "flex",
    gap: "12px",
    fontSize: "1.2rem",
    color: "#2c5e3a"
  },
  
  alertFooter: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.85rem",
    color: "#5a7c6a"
  },
  
  createdDate: {
    color: "#5a7c6a"
  },
  
  tipsSection: {
    background: "linear-gradient(145deg, #e8f5e9 0%, #c8e6c9 100%)",
    borderRadius: "16px",
    padding: "25px",
    border: "1px solid #a5d6a7"
  },
  
  tipsTitle: {
    fontSize: "1.1rem",
    color: "#1e3c2c",
    margin: "0 0 15px 0",
    fontWeight: "600"
  },
  
  tipsList: {
    margin: 0,
    paddingLeft: "20px",
    color: "#2c5e3a",
    lineHeight: 2
  }
};

export default SetAlerts;