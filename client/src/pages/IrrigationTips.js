import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaTint, FaArrowLeft, FaSeedling, FaClock,
  FaCalendarAlt, FaCheckCircle, FaInfoCircle,
  FaSun, FaCloudSun, FaLeaf
} from "react-icons/fa";
import { getWeatherData, getIrrigationTips } from "../data/weatherAPI";

function IrrigationTips() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState("Wheat");
  const [irrigationTips, setIrrigationTips] = useState(null);
  const [loading, setLoading] = useState(true);

  const crops = ["Wheat", "Rice", "Onion", "Tomato", "Potato", "Cotton", "Maize", "Sugarcane"];
  const locations = ["Punjab", "Haryana", "UP", "Maharashtra", "Karnataka"];
  const [selectedLocation, setSelectedLocation] = useState("Punjab");

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      if (userData.location) {
        setSelectedLocation(userData.location);
      }
    }
    
    fetchData();
  }, [selectedLocation, selectedCrop]);

  const fetchData = () => {
    setLoading(true);
    setTimeout(() => {
      const weather = getWeatherData(selectedLocation);
      setWeatherData(weather);
      const tips = getIrrigationTips(selectedCrop, weather);
      setIrrigationTips(tips);
      setLoading(false);
    }, 800);
  };

  const getWaterAdvice = () => {
    if (!weatherData) return "";
    
    const hasRain = weatherData.forecast.some(day => day.icon === "🌧️");
    if (hasRain) {
      return "Rain expected soon. Skip irrigation for 2-3 days.";
    }
    
    if (weatherData.temp > 35) {
      return "High temperature detected. Increase irrigation frequency.";
    }
    
    if (weatherData.humidity > 80) {
      return "High humidity. Reduce irrigation to prevent fungal diseases.";
    }
    
    return "Normal conditions. Follow standard irrigation schedule.";
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading irrigation tips...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={() => navigate("/farm-advisor")} style={styles.backButton}>
          <FaArrowLeft style={{ marginRight: "8px" }} /> Back to Farm Advisor
        </button>
        <h1 style={styles.title}>
          <FaTint style={{ marginRight: "15px", color: "#3498db" }} />
          Smart Irrigation Tips
        </h1>
        <p style={styles.subtitle}>
          Crop-specific watering recommendations based on weather
        </p>
      </div>

      {/* Location and Crop Selection */}
      <div style={styles.selectionCard}>
        <div style={styles.selectionGroup}>
          <label style={styles.selectionLabel}>Location:</label>
          <select
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
            style={styles.selectionSelect}
          >
            {locations.map(loc => (
              <option key={loc} value={loc}>{loc}</option>
            ))}
          </select>
        </div>
        
        <div style={styles.selectionGroup}>
          <label style={styles.selectionLabel}>Crop:</label>
          <select
            value={selectedCrop}
            onChange={(e) => setSelectedCrop(e.target.value)}
            style={styles.selectionSelect}
          >
            {crops.map(crop => (
              <option key={crop} value={crop}>{crop}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Current Weather Summary */}
      {weatherData && (
        <div style={styles.weatherSummary}>
          <div style={styles.weatherSummaryIcon}>{weatherData.icon}</div>
          <div style={styles.weatherSummaryInfo}>
            <div style={styles.weatherSummaryTemp}>{weatherData.temp}°C</div>
            <div style={styles.weatherSummaryCond}>{weatherData.condition}</div>
            <div style={styles.weatherSummaryLocation}>{selectedLocation}</div>
          </div>
        </div>
      )}

      {/* Water Requirement Card */}
      {irrigationTips && (
        <div style={styles.waterCard}>
          <h3 style={styles.waterTitle}>
            <FaTint style={{ marginRight: "10px", color: "#3498db" }} />
            Water Requirements for {selectedCrop}
          </h3>
          
          <div style={styles.waterGrid}>
            <div style={styles.waterItem}>
              <FaCalendarAlt style={styles.waterIcon} />
              <div>
                <span style={styles.waterLabel}>Water Needed</span>
                <span style={styles.waterValue}>{irrigationTips.waterNeeded}</span>
              </div>
            </div>
            
            <div style={styles.waterItem}>
              <FaClock style={styles.waterIcon} />
              <div>
                <span style={styles.waterLabel}>Frequency</span>
                <span style={styles.waterValue}>{irrigationTips.frequency}</span>
              </div>
            </div>
            
            <div style={styles.waterItem}>
              <FaSun style={styles.waterIcon} />
              <div>
                <span style={styles.waterLabel}>Best Time</span>
                <span style={styles.waterValue}>{irrigationTips.bestTime}</span>
              </div>
            </div>
            
            <div style={styles.waterItem}>
              <FaCloudSun style={styles.waterIcon} />
              <div>
                <span style={styles.waterLabel}>Method</span>
                <span style={styles.waterValue}>{irrigationTips.method}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Smart Advice Card */}
      <div style={styles.adviceCard}>
        <h3 style={styles.adviceTitle}>
          <FaCheckCircle style={{ marginRight: "10px", color: "#27ae60" }} />
          Today's Smart Advice
        </h3>
        <p style={styles.adviceText}>{getWaterAdvice()}</p>
        
        <div style={styles.tipsList}>
          <h4 style={styles.tipsSubtitle}>💧 Water Saving Tips:</h4>
          <ul style={styles.tips}>
            <li>Water early morning (5-7 AM) to reduce evaporation</li>
            <li>Use drip irrigation for vegetables to save 30-50% water</li>
            <li>Mulch around plants to retain soil moisture</li>
            <li>Check soil moisture before irrigating - stick your finger 2 inches deep</li>
            <li>Group plants with similar water needs together</li>
          </ul>
        </div>
      </div>

      {/* Schedule Card */}
      <div style={styles.scheduleCard}>
        <h3 style={styles.scheduleTitle}>
          <FaCalendarAlt style={{ marginRight: "10px", color: "#f39c12" }} />
          Recommended Irrigation Schedule
        </h3>
        
        <div style={styles.scheduleGrid}>
          <div style={styles.scheduleDay}>
            <span style={styles.scheduleDayName}>Today</span>
            <span style={styles.scheduleDayStatus}>Water needed</span>
            <span style={styles.scheduleDayTime}>6:00 AM</span>
          </div>
          <div style={styles.scheduleDay}>
            <span style={styles.scheduleDayName}>Tomorrow</span>
            <span style={styles.scheduleDayStatus}>No watering</span>
            <span style={styles.scheduleDayTime}>-</span>
          </div>
          <div style={styles.scheduleDay}>
            <span style={styles.scheduleDayName}>Day 3</span>
            <span style={styles.scheduleDayStatus}>Water needed</span>
            <span style={styles.scheduleDayTime}>6:30 AM</span>
          </div>
          <div style={styles.scheduleDay}>
            <span style={styles.scheduleDayName}>Day 4</span>
            <span style={styles.scheduleDayStatus}>No watering</span>
            <span style={styles.scheduleDayTime}>-</span>
          </div>
          <div style={styles.scheduleDay}>
            <span style={styles.scheduleDayName}>Day 5</span>
            <span style={styles.scheduleDayStatus}>Water needed</span>
            <span style={styles.scheduleDayTime}>6:00 AM</span>
          </div>
        </div>
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
    background: "#f0f7f0",
    minHeight: "100vh"
  },
  
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    background: "#f0f7f0"
  },
  
  spinner: {
    width: "50px",
    height: "50px",
    border: "4px solid #c8e6c9",
    borderTop: "4px solid #27ae60",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginBottom: "20px"
  },
  
  header: {
    marginBottom: "30px"
  },
  
  backButton: {
    background: "none",
    border: "none",
    color: "#2c5e3a",
    fontSize: "0.95rem",
    cursor: "pointer",
    padding: "8px 0",
    marginBottom: "10px",
    display: "flex",
    alignItems: "center"
  },
  
  title: {
    fontSize: "2rem",
    color: "#1e3c2c",
    margin: "0 0 8px 0",
    display: "flex",
    alignItems: "center"
  },
  
  subtitle: {
    color: "#2c5e3a",
    fontSize: "0.95rem",
    margin: 0
  },
  
  selectionCard: {
    background: "white",
    borderRadius: "16px",
    padding: "25px",
    marginBottom: "25px",
    border: "1px solid #c8e6c9",
    display: "flex",
    gap: "30px"
  },
  
  selectionGroup: {
    flex: 1
  },
  
  selectionLabel: {
    display: "block",
    color: "#1e3c2c",
    fontWeight: "600",
    marginBottom: "8px",
    fontSize: "0.95rem"
  },
  
  selectionSelect: {
    width: "100%",
    padding: "12px 20px",
    fontSize: "1rem",
    border: "2px solid #c8e6c9",
    borderRadius: "10px",
    background: "#f9fff9",
    color: "#1e3c2c",
    cursor: "pointer"
  },
  
  weatherSummary: {
    background: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)",
    borderRadius: "16px",
    padding: "25px",
    marginBottom: "25px",
    color: "white",
    display: "flex",
    alignItems: "center",
    gap: "30px"
  },
  
  weatherSummaryIcon: {
    fontSize: "4rem"
  },
  
  weatherSummaryInfo: {
    flex: 1
  },
  
  weatherSummaryTemp: {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "5px"
  },
  
  weatherSummaryCond: {
    fontSize: "1.2rem",
    marginBottom: "5px",
    opacity: 0.9
  },
  
  weatherSummaryLocation: {
    fontSize: "1rem",
    opacity: 0.8
  },
  
  waterCard: {
    background: "white",
    borderRadius: "16px",
    padding: "25px",
    marginBottom: "25px",
    border: "1px solid #c8e6c9"
  },
  
  waterTitle: {
    fontSize: "1.2rem",
    color: "#1e3c2c",
    margin: "0 0 20px 0",
    display: "flex",
    alignItems: "center"
  },
  
  waterGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px"
  },
  
  waterItem: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "15px",
    background: "#f9fff9",
    borderRadius: "12px",
    border: "1px solid #c8e6c9"
  },
  
  waterIcon: {
    fontSize: "1.5rem",
    color: "#3498db"
  },
  
  waterLabel: {
    display: "block",
    fontSize: "0.8rem",
    color: "#5a7c6a",
    marginBottom: "4px"
  },
  
  waterValue: {
    display: "block",
    fontSize: "1rem",
    fontWeight: "600",
    color: "#1e3c2c"
  },
  
  adviceCard: {
    background: "white",
    borderRadius: "16px",
    padding: "25px",
    marginBottom: "25px",
    border: "1px solid #c8e6c9"
  },
  
  adviceTitle: {
    fontSize: "1.2rem",
    color: "#1e3c2c",
    margin: "0 0 15px 0",
    display: "flex",
    alignItems: "center"
  },
  
  adviceText: {
    fontSize: "1.1rem",
    color: "#27ae60",
    padding: "15px",
    background: "#f0fdf4",
    borderRadius: "10px",
    marginBottom: "20px",
    fontWeight: "500"
  },
  
  tipsSubtitle: {
    fontSize: "1rem",
    color: "#1e3c2c",
    margin: "0 0 10px 0"
  },
  
  tips: {
    margin: 0,
    paddingLeft: "20px",
    color: "#2c5e3a",
    lineHeight: 2
  },
  
  scheduleCard: {
    background: "white",
    borderRadius: "16px",
    padding: "25px",
    border: "1px solid #c8e6c9"
  },
  
  scheduleTitle: {
    fontSize: "1.2rem",
    color: "#1e3c2c",
    margin: "0 0 20px 0",
    display: "flex",
    alignItems: "center"
  },
  
  scheduleGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "10px"
  },
  
  scheduleDay: {
    textAlign: "center",
    padding: "15px",
    background: "#f9fff9",
    borderRadius: "12px",
    border: "1px solid #c8e6c9"
  },
  
  scheduleDayName: {
    display: "block",
    fontSize: "1rem",
    fontWeight: "600",
    color: "#1e3c2c",
    marginBottom: "8px"
  },
  
  scheduleDayStatus: {
    display: "block",
    fontSize: "0.85rem",
    color: "#27ae60",
    marginBottom: "8px"
  },
  
  scheduleDayTime: {
    display: "block",
    fontSize: "0.9rem",
    color: "#2c5e3a"
  }
};

export default IrrigationTips;