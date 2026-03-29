import { useState } from "react"; 
import { useNavigate } from "react-router-dom";
import { 
  FaSearch, FaFilter, FaMapMarkerAlt, FaStar,
  FaTractor, FaCalendarAlt, FaRupeeSign, FaArrowLeft,
  FaInfoCircle, FaCheckCircle, FaClock, FaUserCheck
} from "react-icons/fa";
import equipmentData from "../data/equipmentData";

function EquipmentList() {
  const navigate = useNavigate();
  const [equipment] = useState(equipmentData);
  const [search, setSearch] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedLocation, setSelectedLocation] = useState("All");
  const [priceRange, setPriceRange] = useState("All");

  // Get unique types and locations for filters
  const types = ["All", ...new Set(equipmentData.map(item => item.type))];
  const locations = ["All", ...new Set(equipmentData.map(item => item.location.state))];

  // Filter equipment
  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
                         item.description.toLowerCase().includes(search.toLowerCase());
    const matchesType = selectedType === "All" || item.type === selectedType;
    const matchesLocation = selectedLocation === "All" || item.location.state === selectedLocation;
    
    let matchesPrice = true;
    if (priceRange === "Under ₹1000") {
      matchesPrice = item.pricing.daily < 1000;
    } else if (priceRange === "₹1000 - ₹2000") {
      matchesPrice = item.pricing.daily >= 1000 && item.pricing.daily <= 2000;
    } else if (priceRange === "₹2000 - ₹3000") {
      matchesPrice = item.pricing.daily >= 2000 && item.pricing.daily <= 3000;
    } else if (priceRange === "Above ₹3000") {
      matchesPrice = item.pricing.daily > 3000;
    }
    
    return matchesSearch && matchesType && matchesLocation && matchesPrice;
  });

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={() => navigate("/dashboard")} style={styles.backButton}>
          <FaArrowLeft style={{ marginRight: "8px" }} /> Back to Dashboard
        </button>
        <h1 style={styles.title}>
          <FaTractor style={{ marginRight: "15px", color: "#f39c12" }} />
          Rent Farm Equipment
        </h1>
        <p style={styles.subtitle}>
          Browse tractors, harvesters and tools from nearby farmers
        </p>
      </div>

      {/* Action Buttons */}
      <div style={styles.actionButtons}>
        <button 
          onClick={() => navigate("/my-listings")}
          style={styles.myListingsButton}
        >
          📋 My Listings
        </button>
      </div>

      {/* Search and Filters */}
      <div style={styles.filtersCard}>
        <div style={styles.searchSection}>
          <div style={styles.searchBox}>
            <FaSearch style={styles.searchIcon} />
            <input
              type="text"
              placeholder="Search equipment by name or description..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={styles.searchInput}
            />
          </div>
        </div>

        <div style={styles.filterControls}>
          <div style={styles.filterGroup}>
            <FaFilter style={styles.filterIcon} />
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              style={styles.filterSelect}
            >
              {types.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          <div style={styles.filterGroup}>
            <FaMapMarkerAlt style={styles.filterIcon} />
            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              style={styles.filterSelect}
            >
              {locations.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>

          <div style={styles.filterGroup}>
            <FaRupeeSign style={styles.filterIcon} />
            <select
              value={priceRange}
              onChange={(e) => setPriceRange(e.target.value)}
              style={styles.filterSelect}
            >
              <option value="All">All Prices</option>
              <option value="Under ₹1000">Under ₹1000/day</option>
              <option value="₹1000 - ₹2000">₹1000 - ₹2000/day</option>
              <option value="₹2000 - ₹3000">₹2000 - ₹3000/day</option>
              <option value="Above ₹3000">Above ₹3000/day</option>
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div style={styles.resultsInfo}>
        <p>Found {filteredEquipment.length} equipment</p>
      </div>

      {/* Equipment Grid */}
      <div style={styles.equipmentGrid}>
        {filteredEquipment.map((item) => (
          <div key={item.id} style={styles.equipmentCard}>
            <div style={styles.cardHeader}>
              <div style={styles.equipmentIcon}>{item.image}</div>
              <div style={styles.equipmentInfo}>
                <h3 style={styles.equipmentName}>{item.name}</h3>
                <div style={styles.ownerInfo}>
                  <span style={styles.ownerName}>{item.owner.name}</span>
                  {item.owner.verified && (
                    <FaUserCheck style={{ color: "#27ae60", marginLeft: "5px" }} title="Verified Owner" />
                  )}
                </div>
              </div>
            </div>

            <div style={styles.rating}>
              <FaStar style={{ color: "#f39c12" }} />
              <span>{item.rating}</span>
              <span style={styles.reviewCount}>({item.totalReviews} reviews)</span>
            </div>

            <div style={styles.location}>
              <FaMapMarkerAlt style={{ color: "#e74c3c", marginRight: "5px" }} />
              <span>{item.location.district}, {item.location.state}</span>
              <span style={styles.distance}>({item.location.distance})</span>
            </div>

            <div style={styles.specs}>
              {Object.entries(item.specs).slice(0, 3).map(([key, value]) => (
                <div key={key} style={styles.specItem}>
                  <span style={styles.specKey}>{key}:</span>
                  <span style={styles.specValue}>{value}</span>
                </div>
              ))}
            </div>

            <div style={styles.pricing}>
              <div style={styles.priceMain}>
                <span style={styles.priceLabel}>Daily Rate</span>
                <span style={styles.priceValue}>{formatCurrency(item.pricing.daily)}</span>
                <span style={styles.priceUnit}>/day</span>
              </div>
              <div style={styles.securityDeposit}>
                <FaInfoCircle style={{ color: "#3498db", marginRight: "5px" }} />
                <span>Security: {formatCurrency(item.pricing.securityDeposit)}</span>
              </div>
            </div>

            <div style={styles.availability}>
              {item.availability.status === "available" ? (
                <div style={styles.available}>
                  <FaCheckCircle style={{ color: "#27ae60" }} />
                  <span>Available {item.availability.nextAvailable}</span>
                </div>
              ) : (
                <div style={styles.rented}>
                  <FaClock style={{ color: "#e74c3c" }} />
                  <span>Available from {item.availability.nextAvailable}</span>
                </div>
              )}
            </div>

            <button 
              onClick={() => navigate(`/booking/${item.id}`)}
              style={styles.bookButton}
              disabled={item.availability.status !== "available"}
            >
              {item.availability.status === "available" ? "Book Now" : "Check Availability"}
            </button>
          </div>
        ))}
      </div>

      {/* No Results */}
      {filteredEquipment.length === 0 && (
        <div style={styles.noResults}>
          <p>No equipment found matching your criteria</p>
          <button 
            onClick={() => {
              setSearch("");
              setSelectedType("All");
              setSelectedLocation("All");
              setPriceRange("All");
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
    background: "#f0f7f0",
    minHeight: "100vh"
  },
  
  header: {
    marginBottom: "20px"
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
  
  actionButtons: {
    marginBottom: "25px",
    display: "flex",
    justifyContent: "flex-end"
  },
  
  myListingsButton: {
    background: "linear-gradient(135deg, #f39c12 0%, #e67e22 100%)",
    color: "white",
    border: "none",
    padding: "12px 25px",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  
  filtersCard: {
    background: "white",
    borderRadius: "16px",
    padding: "25px",
    marginBottom: "20px",
    border: "1px solid #c8e6c9"
  },
  
  searchSection: {
    marginBottom: "20px"
  },
  
  searchBox: {
    position: "relative"
  },
  
  searchIcon: {
    position: "absolute",
    left: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#2c5e3a"
  },
  
  searchInput: {
    width: "100%",
    padding: "14px 20px 14px 45px",
    fontSize: "1rem",
    border: "2px solid #c8e6c9",
    borderRadius: "10px",
    outline: "none",
    background: "#f9fff9"
  },
  
  filterControls: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "15px"
  },
  
  filterGroup: {
    position: "relative"
  },
  
  filterIcon: {
    position: "absolute",
    left: "12px",
    top: "50%",
    transform: "translateY(-50%)",
    color: "#2c5e3a",
    zIndex: 1
  },
  
  filterSelect: {
    width: "100%",
    padding: "12px 12px 12px 35px",
    fontSize: "0.95rem",
    border: "2px solid #c8e6c9",
    borderRadius: "10px",
    outline: "none",
    background: "#f9fff9",
    cursor: "pointer",
    color: "#1e3c2c"
  },
  
  resultsInfo: {
    marginBottom: "20px",
    color: "#2c5e3a",
    fontSize: "1rem"
  },
  
  equipmentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "20px"
  },
  
  equipmentCard: {
    background: "white",
    borderRadius: "16px",
    padding: "25px",
    border: "1px solid #c8e6c9",
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    transition: "all 0.3s"
  },
  
  cardHeader: {
    display: "flex",
    gap: "15px"
  },
  
  equipmentIcon: {
    fontSize: "3rem",
    background: "#f9fff9",
    padding: "10px",
    borderRadius: "12px",
    border: "1px solid #c8e6c9"
  },
  
  equipmentInfo: {
    flex: 1
  },
  
  equipmentName: {
    fontSize: "1.2rem",
    color: "#1e3c2c",
    margin: "0 0 5px 0",
    fontWeight: "600"
  },
  
  ownerInfo: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.9rem",
    color: "#2c5e3a"
  },
  
  ownerName: {
    color: "#2c5e3a"
  },
  
  rating: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    color: "#2c5e3a"
  },
  
  reviewCount: {
    color: "#5a7c6a",
    fontSize: "0.85rem",
    marginLeft: "5px"
  },
  
  location: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.9rem",
    color: "#2c5e3a"
  },
  
  distance: {
    color: "#5a7c6a",
    marginLeft: "5px",
    fontSize: "0.85rem"
  },
  
  specs: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "8px",
    padding: "10px 0",
    borderTop: "1px solid #c8e6c9",
    borderBottom: "1px solid #c8e6c9"
  },
  
  specItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center"
  },
  
  specKey: {
    fontSize: "0.7rem",
    color: "#5a7c6a",
    textTransform: "capitalize",
    marginBottom: "2px"
  },
  
  specValue: {
    fontSize: "0.85rem",
    color: "#1e3c2c",
    fontWeight: "600"
  },
  
  pricing: {
    display: "flex",
    flexDirection: "column",
    gap: "5px"
  },
  
  priceMain: {
    display: "flex",
    alignItems: "baseline",
    gap: "5px"
  },
  
  priceLabel: {
    color: "#5a7c6a",
    fontSize: "0.85rem"
  },
  
  priceValue: {
    fontSize: "1.5rem",
    fontWeight: "700",
    color: "#f39c12"
  },
  
  priceUnit: {
    color: "#5a7c6a",
    fontSize: "0.85rem"
  },
  
  securityDeposit: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.85rem",
    color: "#2c5e3a"
  },
  
  availability: {
    marginTop: "5px"
  },
  
  available: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#27ae60",
    fontSize: "0.9rem"
  },
  
  rented: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#e74c3c",
    fontSize: "0.9rem"
  },
  
  bookButton: {
    background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)",
    color: "white",
    border: "none",
    padding: "14px",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px"
  },
  
  noResults: {
    textAlign: "center",
    padding: "60px 20px",
    background: "white",
    borderRadius: "16px",
    color: "#2c5e3a",
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

export default EquipmentList;
