import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaCloudSun, FaTint, FaWind, FaTemperatureHigh,
  FaArrowLeft, FaLeaf, FaCalendarAlt, FaCheckCircle,
  FaExclamationTriangle, FaInfoCircle, FaSeedling
} from "react-icons/fa";
import { getWeatherData, getFarmingAdvice } from "../data/weatherAPI";

function FarmAdvisor() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [advice, setAdvice] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLocation, setSelectedLocation] = useState("Punjab");

  const locations = ["Punjab", "Haryana", "UP", "Maharashtra", "Karnataka"];

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const userData = JSON.parse(storedUser);
      setUser(userData);
      if (userData.location) {
        setSelectedLocation(userData.location);
      }
    }
    
    fetchWeatherData(selectedLocation);
  }, [selectedLocation]);

  const fetchWeatherData = (location) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      const data = getWeatherData(location);
      setWeatherData(data);
      const farmingAdvice = getFarmingAdvice(data);
      setAdvice(farmingAdvice);
      setLoading(false);
    }, 1000);
  };

  const getAdviceIcon = (type) => {
    switch(type) {
      case "success": return <FaCheckCircle style={{ color: "#27ae60" }} />;
      case "warning": return <FaExclamationTriangle style={{ color: "#e74c3c" }} />;
      default: return <FaInfoCircle style={{ color: "#3498db" }} />;
    }
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Fetching weather data...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={() => navigate("/dashboard")} style={styles.backButton}>
          <FaArrowLeft style={{ marginRight: "8px" }} /> Back to Dashboard
        </button>
        <h1 style={styles.title}>
          <FaCloudSun style={{ marginRight: "15px", color: "#3498db" }} />
          Farm Advisor
        </h1>
        <p style={styles.subtitle}>
          Weather-based farming recommendations for your location
        </p>
      </div>

      {/* Location Selector */}
      <div style={styles.locationCard}>
        <label style={styles.locationLabel}>Select Location:</label>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          style={styles.locationSelect}
        >
          {locations.map(loc => (
            <option key={loc} value={loc}>{loc}</option>
          ))}
        </select>
      </div>

      {/* Current Weather */}
      {weatherData && (
        <div style={styles.weatherCard}>
          <div style={styles.weatherHeader}>
            <h2 style={styles.weatherTitle}>Current Weather - {selectedLocation}</h2>
            <span style={styles.updateTime}>Updated just now</span>
          </div>
          
          <div style={styles.weatherMain}>
            <div style={styles.weatherIcon}>
              <span style={styles.largeIcon}>{weatherData.icon}</span>
            </div>
            <div style={styles.weatherInfo}>
              <div style={styles.temperature}>{weatherData.temp}°C</div>
              <div style={styles.condition}>{weatherData.condition}</div>
            </div>
          </div>

          <div style={styles.weatherDetails}>
            <div style={styles.detailItem}>
              <FaTint style={styles.detailIcon} />
              <span>Humidity: {weatherData.humidity}%</span>
            </div>
            <div style={styles.detailItem}>
              <FaWind style={styles.detailIcon} />
              <span>Wind: {weatherData.windSpeed} km/h</span>
            </div>
            <div style={styles.detailItem}>
              <FaTemperatureHigh style={styles.detailIcon} />
              <span>Feels like: {weatherData.temp}°C</span>
            </div>
          </div>
        </div>
      )}

      {/* 5-Day Forecast */}
      {weatherData && (
        <div style={styles.forecastCard}>
          <h3 style={styles.forecastTitle}>5-Day Forecast</h3>
          <div style={styles.forecastGrid}>
            {weatherData.forecast.map((day, index) => (
              <div key={index} style={styles.forecastDay}>
                <span style={styles.forecastDayName}>{day.day}</span>
                <span style={styles.forecastIcon}>{day.icon}</span>
                <span style={styles.forecastTemp}>{day.temp}°</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Farming Advice */}
      <div style={styles.adviceCard}>
        <h3 style={styles.adviceTitle}>
          <FaLeaf style={{ marginRight: "10px", color: "#27ae60" }} />
          Today's Farming Recommendations
        </h3>
        
        <div style={styles.adviceList}>
          {advice.map((item, index) => (
            <div key={index} style={styles.adviceItem}>
              <div style={styles.adviceIcon}>
                {getAdviceIcon(item.type)}
              </div>
              <div style={styles.adviceContent}>
                <h4 style={styles.adviceItemTitle}>{item.title}</h4>
                <p style={styles.adviceDescription}>{item.description}</p>
              </div>
            </div>
          ))}
        </div>

        <button 
          onClick={() => navigate("/irrigation-tips")}
          style={styles.irrigationButton}
        >
          <FaSeedling /> View Irrigation Tips
        </button>
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
  
  locationCard: {
    background: "white",
    borderRadius: "16px",
    padding: "20px",
    marginBottom: "25px",
    border: "1px solid #c8e6c9",
    display: "flex",
    alignItems: "center",
    gap: "20px"
  },
  
  locationLabel: {
    color: "#1e3c2c",
    fontWeight: "600",
    fontSize: "1rem"
  },
  
  locationSelect: {
    padding: "10px 20px",
    fontSize: "1rem",
    border: "2px solid #c8e6c9",
    borderRadius: "10px",
    background: "#f9fff9",
    color: "#1e3c2c",
    cursor: "pointer",
    minWidth: "200px"
  },
  
  weatherCard: {
    background: "white",
    borderRadius: "16px",
    padding: "25px",
    marginBottom: "25px",
    border: "1px solid #c8e6c9"
  },
  
  weatherHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px"
  },
  
  weatherTitle: {
    fontSize: "1.3rem",
    color: "#1e3c2c",
    margin: 0
  },
  
  updateTime: {
    color: "#5a7c6a",
    fontSize: "0.85rem"
  },
  
  weatherMain: {
    display: "flex",
    alignItems: "center",
    gap: "40px",
    marginBottom: "20px"
  },
  
  weatherIcon: {
    fontSize: "4rem"
  },
  
  largeIcon: {
    fontSize: "5rem"
  },
  
  weatherInfo: {
    flex: 1
  },
  
  temperature: {
    fontSize: "3rem",
    fontWeight: "700",
    color: "#1e3c2c",
    marginBottom: "5px"
  },
  
  condition: {
    fontSize: "1.3rem",
    color: "#2c5e3a"
  },
  
  weatherDetails: {
    display: "flex",
    gap: "30px",
    padding: "15px 0",
    borderTop: "1px solid #c8e6c9"
  },
  
  detailItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#2c5e3a"
  },
  
  detailIcon: {
    color: "#3498db"
  },
  
  forecastCard: {
    background: "white",
    borderRadius: "16px",
    padding: "25px",
    marginBottom: "25px",
    border: "1px solid #c8e6c9"
  },
  
  forecastTitle: {
    fontSize: "1.2rem",
    color: "#1e3c2c",
    margin: "0 0 20px 0"
  },
  
  forecastGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "10px"
  },
  
  forecastDay: {
    textAlign: "center",
    padding: "15px",
    background: "#f9fff9",
    borderRadius: "12px",
    border: "1px solid #c8e6c9"
  },
  
  forecastDayName: {
    display: "block",
    fontSize: "1rem",
    fontWeight: "600",
    color: "#1e3c2c",
    marginBottom: "10px"
  },
  
  forecastIcon: {
    display: "block",
    fontSize: "2rem",
    marginBottom: "10px"
  },
  
  forecastTemp: {
    fontSize: "1.1rem",
    color: "#2c5e3a"
  },
  
  adviceCard: {
    background: "white",
    borderRadius: "16px",
    padding: "25px",
    border: "1px solid #c8e6c9"
  },
  
  adviceTitle: {
    fontSize: "1.2rem",
    color: "#1e3c2c",
    margin: "0 0 20px 0",
    display: "flex",
    alignItems: "center"
  },
  
  adviceList: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "25px"
  },
  
  adviceItem: {
    display: "flex",
    gap: "15px",
    padding: "15px",
    background: "#f9fff9",
    borderRadius: "12px",
    border: "1px solid #c8e6c9"
  },
  
  adviceIcon: {
    fontSize: "1.3rem"
  },
  
  adviceContent: {
    flex: 1
  },
  
  adviceItemTitle: {
    fontSize: "1rem",
    color: "#1e3c2c",
    margin: "0 0 5px 0",
    fontWeight: "600"
  },
  
  adviceDescription: {
    fontSize: "0.9rem",
    color: "#2c5e3a",
    margin: 0,
    lineHeight: 1.5
  },
  
  irrigationButton: {
    width: "100%",
    background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)",
    color: "white",
    border: "none",
    padding: "16px",
    borderRadius: "12px",
    fontSize: "1.1rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    transition: "all 0.3s"
  }
};

export default FarmAdvisor;