import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaSearch, FaFilter, FaArrowUp, FaArrowDown, 
  FaBell, FaMapMarkerAlt, FaCalendarAlt, 
  FaChartLine, FaSortAmountDown, FaSortAmountUp
} from "react-icons/fa";
import mandiPrices from "../data/mandiPrices";

function MarketPrices() {
  const navigate = useNavigate();
  const [prices] = useState(mandiPrices);
  const [search, setSearch] = useState("");
  const [selectedState, setSelectedState] = useState("All");
  const [selectedCrop, setSelectedCrop] = useState("All");
  const [sortBy, setSortBy] = useState("crop");
  const [sortOrder, setSortOrder] = useState("asc");

  // Get unique states and crops for filters
  const states = ["All", ...new Set(mandiPrices.map(item => item.state))];
  const crops = ["All", ...new Set(mandiPrices.map(item => item.crop))];

  // Handle search and filters
  const filteredPrices = prices.filter(item => {
    const matchesSearch = item.crop.toLowerCase().includes(search.toLowerCase()) ||
                         item.market.toLowerCase().includes(search.toLowerCase());
    const matchesState = selectedState === "All" || item.state === selectedState;
    const matchesCrop = selectedCrop === "All" || item.crop === selectedCrop;
    return matchesSearch && matchesState && matchesCrop;
  });

  // Handle sorting
  const sortedPrices = [...filteredPrices].sort((a, b) => {
    if (sortBy === "price") {
      return sortOrder === "asc" ? a.price - b.price : b.price - a.price;
    } else if (sortBy === "crop") {
      return sortOrder === "asc" 
        ? a.crop.localeCompare(b.crop) 
        : b.crop.localeCompare(a.crop);
    } else if (sortBy === "change") {
      const changeA = parseInt(a.change) || 0;
      const changeB = parseInt(b.change) || 0;
      return sortOrder === "asc" ? changeA - changeB : changeB - changeA;
    }
    return 0;
  });

  const toggleSort = (field) => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const getTrendColor = (change) => {
    const changeNum = parseInt(change);
    if (changeNum > 0) return { color: "#27ae60", bg: "rgba(39, 174, 96, 0.1)" };
    if (changeNum < 0) return { color: "#e74c3c", bg: "rgba(231, 76, 60, 0.1)" };
    return { color: "#7f8c8d", bg: "#f1f5f9" };
  };

  const formatNumber = (num) => {
    return num.toLocaleString('en-IN');
  };

  return (
    <div style={styles.container}>
      {/* Header with Back Button */}
      <div style={styles.header}>
        <button onClick={() => navigate("/dashboard")} style={styles.backButton}>
          ← Back to Dashboard
        </button>
        <h1 style={styles.title}>
          <FaChartLine style={{ marginRight: "15px", color: "#27ae60" }} />
          Mandi Price Intelligence
        </h1>
        <p style={styles.subtitle}>
          Real-time wholesale prices from APMC mandis across India
        </p>
      </div>

      {/* Search and Filters */}
      <div style={styles.filtersCard}>
        <div style={styles.searchSection}>
          <div style={styles.searchBox}>
            <FaSearch style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search by crop or market..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />
          </div>
          
          <div style={styles.filterControls}>
            <div style={styles.filterGroup}>
              <FaFilter style={styles.filterIcon} />
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                style={styles.filterSelect}
              >
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>

            <div style={styles.filterGroup}>
              <FaFilter style={styles.filterIcon} />
              <select
                value={selectedCrop}
                onChange={(e) => setSelectedCrop(e.target.value)}
                style={styles.filterSelect}
              >
                {crops.map(crop => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </select>
            </div>

            <button 
              onClick={() => navigate("/set-alerts")}
              style={styles.alertButton}
            >
              <FaBell /> Manage Alerts
            </button>
          </div>
        </div>
      </div>

      {/* Results Count and Sort */}
      <div style={styles.resultsInfo}>
        <p>Showing {sortedPrices.length} prices</p>
        <div style={styles.sortInfo}>
          <span>Sort by: </span>
          <button 
            onClick={() => toggleSort("crop")}
            style={{ ...styles.sortButton, fontWeight: sortBy === "crop" ? "700" : "400" }}
          >
            Crop {sortBy === "crop" && (sortOrder === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />)}
          </button>
          <button 
            onClick={() => toggleSort("price")}
            style={{ ...styles.sortButton, fontWeight: sortBy === "price" ? "700" : "400" }}
          >
            Price {sortBy === "price" && (sortOrder === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />)}
          </button>
          <button 
            onClick={() => toggleSort("change")}
            style={{ ...styles.sortButton, fontWeight: sortBy === "change" ? "700" : "400" }}
          >
            Change {sortBy === "change" && (sortOrder === "asc" ? <FaSortAmountUp /> : <FaSortAmountDown />)}
          </button>
        </div>
      </div>

      {/* Price Cards Grid */}
      <div style={styles.pricesGrid}>
        {sortedPrices.map((item) => {
          const trend = getTrendColor(item.change);
          return (
            <div key={item.id} style={styles.priceCard}>
              <div style={styles.cardHeader}>
                <div>
                  <h3 style={styles.cropName}>{item.crop}</h3>
                </div>
                <span style={{ ...styles.trendBadge, background: trend.bg, color: trend.color }}>
                  {parseInt(item.change) > 0 ? <FaArrowUp /> : parseInt(item.change) < 0 ? <FaArrowDown /> : null} {item.change}%
                </span>
              </div>

              <div style={styles.marketInfo}>
                <FaMapMarkerAlt style={{ color: "#64748b", marginRight: "5px" }} />
                <span>{item.market}, {item.state}</span>
              </div>

              <div style={styles.priceSection}>
                <span style={styles.priceLabel}>Price</span>
                <span style={styles.priceValue}>₹{formatNumber(item.price)}</span>
                <span style={styles.priceUnit}>/{item.unit}</span>
              </div>

              <button 
                onClick={() => navigate("/set-alerts", { state: { crop: item.crop, price: item.price } })}
                style={styles.alertBtn}
              >
                <FaBell /> Set Alert
              </button>
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {sortedPrices.length === 0 && (
        <div style={styles.noResults}>
          <p>No prices found matching your criteria</p>
          <button 
            onClick={() => {
              setSearch("");
              setSelectedState("All");
              setSelectedCrop("All");
            }}
            style={styles.clearButton}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
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
  
  filtersCard: {
    background: "white",
    borderRadius: "16px",
    padding: "25px",
    marginBottom: "20px",
    boxShadow: "0 4px 12px rgba(0, 50, 30, 0.1)",  // ✅ GREEN TINTED SHADOW
    border: "1px solid #c8e6c9"  // ✅ LIGHT GREEN BORDER
  },
  
  searchSection: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    gap: "20px"
  },
  
  searchBox: {
    position: "relative",
    flex: 1
  },
  
  searchIcon: {
    position: "absolute",
    left: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#2c5e3a"  // ✅ GREEN ICON
  },
  
  searchInput: {
    width: "100%",
    padding: "12px 20px 12px 45px",
    fontSize: "0.95rem",
    border: "2px solid #c8e6c9",  // ✅ LIGHT GREEN BORDER
    borderRadius: "10px",
    outline: "none",
    transition: "all 0.3s",
    background: "#f9fff9",  // ✅ VERY LIGHT GREEN BACKGROUND
    ":focus": {
      borderColor: "#27ae60"
    }
  },
  
  filterControls: {
    display: "flex",
    gap: "15px",
    alignItems: "center"
  },
  
  filterGroup: {
    position: "relative",
    minWidth: "150px"
  },
  
  filterIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#2c5e3a",  // ✅ GREEN ICON
    zIndex: 1
  },
  
  filterSelect: {
    width: "100%",
    padding: "12px 12px 12px 35px",
    fontSize: "0.95rem",
    border: "2px solid #c8e6c9",  // ✅ LIGHT GREEN BORDER
    borderRadius: "10px",
    outline: "none",
    background: "#f9fff9",  // ✅ VERY LIGHT GREEN BACKGROUND
    cursor: "pointer",
    appearance: "none",
    color: "#1e3c2c"  // ✅ DARK GREEN TEXT
  },
  
  alertButton: {
    background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)",
    color: "white",
    border: "none",
    padding: "12px 24px",
    borderRadius: "10px",
    fontSize: "0.95rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    textDecoration: "none",
    whiteSpace: "nowrap",
    boxShadow: "0 4px 10px rgba(39, 174, 96, 0.3)"
  },
  
  resultsInfo: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    color: "#2c5e3a",  // ✅ GREEN TEXT
    background: "white",
    padding: "12px 20px",
    borderRadius: "10px",
    border: "1px solid #c8e6c9"
  },
  
  sortInfo: {
    display: "flex",
    gap: "15px",
    alignItems: "center"
  },
  
  sortButton: {
    background: "none",
    border: "none",
    color: "#1e3c2c",  // ✅ DARK GREEN
    fontSize: "0.9rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    padding: "5px 10px",
    borderRadius: "20px",
    ":hover": {
      background: "#e8f5e9"
    }
  },
  
  pricesGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px"
  },
  
  priceCard: {
    background: "white",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 4px 12px rgba(0, 50, 30, 0.08)",
    border: "1px solid #c8e6c9",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    transition: "all 0.3s",
    ":hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 12px 24px rgba(39, 174, 96, 0.15)",
      borderColor: "#27ae60"
    }
  },
  
  cardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "flex-start"
  },
  
  cropName: {
    fontSize: "1.3rem",
    margin: 0,
    color: "#1e3c2c",  // ✅ DARK GREEN
    fontWeight: "600"
  },
  
  trendBadge: {
    padding: "6px 12px",
    borderRadius: "30px",
    fontSize: "0.85rem",
    fontWeight: "600",
    display: "flex",
    alignItems: "center",
    gap: "4px"
  },
  
  marketInfo: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.9rem",
    color: "#2c5e3a",  // ✅ MEDIUM GREEN
    padding: "8px 0",
    borderBottom: "1px solid #c8e6c9"
  },
  
  priceSection: {
    padding: "10px 0"
  },
  
  priceLabel: {
    display: "block",
    fontSize: "0.8rem",
    color: "#5a7c6a",  // ✅ MUTED GREEN
    marginBottom: "4px"
  },
  
  priceValue: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#1e3c2c"  // ✅ DARK GREEN
  },
  
  priceUnit: {
    fontSize: "0.9rem",
    color: "#5a7c6a",  // ✅ MUTED GREEN
    marginLeft: "5px"
  },
  
  alertBtn: {
    background: "white",
    border: "2px solid #27ae60",
    color: "#27ae60",
    padding: "10px",
    borderRadius: "10px",
    fontSize: "0.9rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    textDecoration: "none",
    marginTop: "5px",
    transition: "all 0.2s",
    ":hover": {
      background: "#27ae60",
      color: "white"
    }
  },
  
  noResults: {
    textAlign: "center",
    padding: "60px 20px",
    background: "white",
    borderRadius: "16px",
    color: "#2c5e3a",  // ✅ GREEN TEXT
    border: "2px dashed #c8e6c9"
  },
  
  clearButton: {
    background: "#27ae60",
    color: "white",
    border: "none",
    padding: "12px 30px",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "20px"
  }
};

export default MarketPrices;