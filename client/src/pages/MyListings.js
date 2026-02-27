import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaEdit, FaTrash, FaPlus, FaArrowLeft,
  FaRupeeSign, FaMapMarkerAlt, FaCalendarAlt,
  FaCheckCircle, FaClock, FaEye, FaPause,
  FaPlay, FaStar, FaUser
} from "react-icons/fa";
import { myEquipment } from "../data/equipmentData";

function MyListings() {
  const navigate = useNavigate();
  const [listings, setListings] = useState(myEquipment);
  const [activeTab, setActiveTab] = useState("listings");

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  const getStatusColor = (status) => {
    switch(status) {
      case "available": return { color: "#27ae60", bg: "#e8f5e9" };
      case "rented": return { color: "#e74c3c", bg: "#ffebee" };
      case "active": return { color: "#3498db", bg: "#e3f2fd" };
      case "completed": return { color: "#7f8c8d", bg: "#f5f5f5" };
      default: return { color: "#7f8c8d", bg: "#f5f5f5" };
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this listing?")) {
      setListings(listings.filter(item => item.id !== id));
    }
  };

  const handleToggleAvailability = (id) => {
    setListings(listings.map(item => 
      item.id === id 
        ? { ...item, availability: { 
            ...item.availability, 
            status: item.availability.status === "available" ? "paused" : "available" 
          }}
        : item
    ));
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={() => navigate("/equipment-list")} style={styles.backButton}>
          <FaArrowLeft style={{ marginRight: "8px" }} /> Back to Equipment
        </button>
        <h1 style={styles.title}>
          📋 My Equipment Listings
        </h1>
        <p style={styles.subtitle}>
          Manage your equipment and track earnings
        </p>
      </div>

      {/* Action Buttons */}
      <div style={styles.actionButtons}>
        <button 
          onClick={() => setActiveTab("listings")}
          style={{
            ...styles.tabButton,
            background: activeTab === "listings" ? "#27ae60" : "white",
            color: activeTab === "listings" ? "white" : "#2c5e3a"
          }}
        >
          My Equipment
        </button>
        <button 
          onClick={() => setActiveTab("bookings")}
          style={{
            ...styles.tabButton,
            background: activeTab === "bookings" ? "#27ae60" : "white",
            color: activeTab === "bookings" ? "white" : "#2c5e3a"
          }}
        >
          Current Bookings
        </button>
        <button 
          onClick={() => navigate("/add-listing")}
          style={styles.addButton}
        >
          <FaPlus /> Add New Listing
        </button>
      </div>

      {/* Content based on active tab */}
      {activeTab === "listings" ? (
        /* ========== MY EQUIPMENT LISTINGS ========== */
        <div style={styles.listingsGrid}>
          {listings.map((item) => (
            <div key={item.id} style={styles.listingCard}>
              <div style={styles.cardHeader}>
                <div style={styles.equipmentIcon}>{item.image}</div>
                <div style={styles.equipmentInfo}>
                  <h3 style={styles.equipmentName}>{item.name}</h3>
                  <p style={styles.equipmentType}>{item.type}</p>
                </div>
                <span style={{
                  ...styles.statusBadge,
                  background: getStatusColor(item.availability.status).bg,
                  color: getStatusColor(item.availability.status).color
                }}>
                  {item.availability.status}
                </span>
              </div>

              <div style={styles.location}>
                <FaMapMarkerAlt style={{ color: "#e74c3c", marginRight: "5px" }} />
                <span>{item.location}</span>
              </div>

              <div style={styles.pricing}>
                <div style={styles.priceItem}>
                  <span style={styles.priceLabel}>Daily</span>
                  <span style={styles.priceValue}>{formatCurrency(item.pricing.daily)}</span>
                </div>
                <div style={styles.priceItem}>
                  <span style={styles.priceLabel}>Weekly</span>
                  <span style={styles.priceValue}>{formatCurrency(item.pricing.weekly)}</span>
                </div>
                <div style={styles.priceItem}>
                  <span style={styles.priceLabel}>Monthly</span>
                  <span style={styles.priceValue}>{formatCurrency(item.pricing.monthly)}</span>
                </div>
              </div>

              <div style={styles.earnings}>
                <div style={styles.earningItem}>
                  <span style={styles.earningLabel}>Total Earnings</span>
                  <span style={styles.earningValue}>{formatCurrency(item.earnings.total)}</span>
                </div>
                <div style={styles.earningItem}>
                  <span style={styles.earningLabel}>This Month</span>
                  <span style={styles.earningValue}>{formatCurrency(item.earnings.thisMonth)}</span>
                </div>
                <div style={styles.earningItem}>
                  <span style={styles.earningLabel}>Rentals</span>
                  <span style={styles.earningValue}>{item.earnings.rentals}</span>
                </div>
              </div>

              <div style={styles.cardActions}>
                <button 
                  onClick={() => handleToggleAvailability(item.id)}
                  style={{
                    ...styles.actionButton,
                    background: item.availability.status === "available" ? "#f39c12" : "#27ae60"
                  }}
                >
                  {item.availability.status === "available" ? <FaPause /> : <FaPlay />}
                  {item.availability.status === "available" ? "Pause" : "Activate"}
                </button>
                <button 
                  onClick={() => navigate(`/edit-listing/${item.id}`)}
                  style={{ ...styles.actionButton, background: "#3498db" }}
                >
                  <FaEdit /> Edit
                </button>
                <button 
                  onClick={() => handleDelete(item.id)}
                  style={{ ...styles.actionButton, background: "#e74c3c" }}
                >
                  <FaTrash /> Delete
                </button>
              </div>

              {/* Current Bookings */}
              {item.currentBookings && item.currentBookings.length > 0 && (
                <div style={styles.currentBookings}>
                  <h4 style={styles.bookingsTitle}>Current Bookings</h4>
                  {item.currentBookings.map(booking => (
                    <div key={booking.id} style={styles.bookingItem}>
                      <div style={styles.bookingInfo}>
                        <FaUser style={{ color: "#2c5e3a", marginRight: "8px" }} />
                        <span>{booking.renter}</span>
                      </div>
                      <div style={styles.bookingDates}>
                        <FaCalendarAlt style={{ color: "#2c5e3a", marginRight: "5px" }} />
                        <span>{booking.startDate} to {booking.endDate}</span>
                      </div>
                      <div style={styles.bookingStatus}>
                        <span style={{
                          ...styles.bookingStatusBadge,
                          background: getStatusColor(booking.status).bg,
                          color: getStatusColor(booking.status).color
                        }}>
                          {booking.status}
                        </span>
                        <span style={styles.bookingAmount}>{formatCurrency(booking.totalAmount)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        /* ========== CURRENT BOOKINGS ========== */
        <div style={styles.bookingsList}>
          {listings.flatMap(item => 
            item.currentBookings?.map(booking => (
              <div key={booking.id} style={styles.bookingCard}>
                <div style={styles.bookingCardHeader}>
                  <div>
                    <h3 style={styles.bookingEquipmentName}>{item.name}</h3>
                    <p style={styles.bookingRenter}>{booking.renter}</p>
                  </div>
                  <span style={{
                    ...styles.bookingStatusBadge,
                    background: getStatusColor(booking.status).bg,
                    color: getStatusColor(booking.status).color
                  }}>
                    {booking.status}
                  </span>
                </div>

                <div style={styles.bookingDetails}>
                  <div style={styles.bookingDetail}>
                    <FaCalendarAlt style={{ color: "#2c5e3a" }} />
                    <div>
                      <span style={styles.detailLabel}>Start Date</span>
                      <span style={styles.detailValue}>{booking.startDate}</span>
                    </div>
                  </div>
                  <div style={styles.bookingDetail}>
                    <FaCalendarAlt style={{ color: "#2c5e3a" }} />
                    <div>
                      <span style={styles.detailLabel}>End Date</span>
                      <span style={styles.detailValue}>{booking.endDate}</span>
                    </div>
                  </div>
                  <div style={styles.bookingDetail}>
                    <FaRupeeSign style={{ color: "#2c5e3a" }} />
                    <div>
                      <span style={styles.detailLabel}>Amount</span>
                      <span style={styles.detailValue}>{formatCurrency(booking.totalAmount)}</span>
                    </div>
                  </div>
                </div>

                <div style={styles.bookingActions}>
                  <button style={styles.messageButton}>Message Renter</button>
                  <button style={styles.viewButton}>View Details</button>
                </div>
              </div>
            ))
          )}
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
    margin: "0 0 8px 0"
  },
  
  subtitle: {
    color: "#2c5e3a",
    fontSize: "0.95rem",
    margin: 0
  },
  
  actionButtons: {
    display: "flex",
    gap: "15px",
    marginBottom: "30px",
    flexWrap: "wrap"
  },
  
  tabButton: {
    padding: "12px 25px",
    border: "2px solid #27ae60",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.3s"
  },
  
  addButton: {
    background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)",
    color: "white",
    border: "none",
    padding: "12px 25px",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginLeft: "auto"
  },
  
  listingsGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "20px"
  },
  
  listingCard: {
    background: "white",
    borderRadius: "16px",
    padding: "25px",
    border: "1px solid #c8e6c9"
  },
  
  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "15px"
  },
  
  equipmentIcon: {
    fontSize: "2.5rem",
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
  
  equipmentType: {
    fontSize: "0.9rem",
    color: "#2c5e3a",
    margin: 0
  },
  
  statusBadge: {
    padding: "6px 15px",
    borderRadius: "30px",
    fontSize: "0.85rem",
    fontWeight: "600"
  },
  
  location: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.95rem",
    color: "#2c5e3a",
    marginBottom: "15px"
  },
  
  pricing: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    padding: "15px 0",
    borderTop: "1px solid #c8e6c9",
    borderBottom: "1px solid #c8e6c9",
    marginBottom: "15px"
  },
  
  priceItem: {
    textAlign: "center"
  },
  
  priceLabel: {
    display: "block",
    fontSize: "0.75rem",
    color: "#5a7c6a",
    marginBottom: "5px"
  },
  
  priceValue: {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#1e3c2c"
  },
  
  earnings: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    marginBottom: "15px"
  },
  
  earningItem: {
    textAlign: "center",
    background: "#f9fff9",
    padding: "10px",
    borderRadius: "10px",
    border: "1px solid #c8e6c9"
  },
  
  earningLabel: {
    display: "block",
    fontSize: "0.7rem",
    color: "#5a7c6a",
    marginBottom: "5px"
  },
  
  earningValue: {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#27ae60"
  },
  
  cardActions: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "10px",
    marginBottom: "20px"
  },
  
  actionButton: {
    padding: "10px",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontSize: "0.9rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px"
  },
  
  currentBookings: {
    borderTop: "1px solid #c8e6c9",
    paddingTop: "15px"
  },
  
  bookingsTitle: {
    fontSize: "1rem",
    color: "#1e3c2c",
    margin: "0 0 10px 0"
  },
  
  bookingItem: {
    background: "#f9fff9",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid #c8e6c9",
    marginBottom: "8px"
  },
  
  bookingInfo: {
    display: "flex",
    alignItems: "center",
    marginBottom: "5px"
  },
  
  bookingDates: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.85rem",
    color: "#2c5e3a",
    marginBottom: "5px"
  },
  
  bookingStatus: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  
  bookingStatusBadge: {
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "0.8rem",
    fontWeight: "600"
  },
  
  bookingAmount: {
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#1e3c2c"
  },
  
  bookingsList: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "15px"
  },
  
  bookingCard: {
    background: "white",
    borderRadius: "16px",
    padding: "20px",
    border: "1px solid #c8e6c9"
  },
  
  bookingCardHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "15px"
  },
  
  bookingEquipmentName: {
    fontSize: "1.1rem",
    color: "#1e3c2c",
    margin: "0 0 5px 0"
  },
  
  bookingRenter: {
    fontSize: "0.9rem",
    color: "#2c5e3a",
    margin: 0
  },
  
  bookingDetails: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "15px",
    marginBottom: "15px",
    padding: "15px 0",
    borderTop: "1px solid #c8e6c9",
    borderBottom: "1px solid #c8e6c9"
  },
  
  bookingDetail: {
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  
  detailLabel: {
    display: "block",
    fontSize: "0.7rem",
    color: "#5a7c6a"
  },
  
  detailValue: {
    fontSize: "0.9rem",
    fontWeight: "600",
    color: "#1e3c2c"
  },
  
  bookingActions: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px"
  },
  
  messageButton: {
    padding: "10px",
    border: "2px solid #27ae60",
    background: "white",
    color: "#27ae60",
    borderRadius: "8px",
    fontSize: "0.9rem",
    fontWeight: "600",
    cursor: "pointer"
  },
  
  viewButton: {
    padding: "10px",
    background: "#27ae60",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "0.9rem",
    fontWeight: "600",
    cursor: "pointer"
  }
};

export default MyListings;