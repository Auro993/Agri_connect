import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { 
  FaArrowLeft, FaCalendarAlt, FaRupeeSign, FaUser,
  FaMapMarkerAlt, FaStar, FaCheckCircle, FaShieldAlt,
  FaTractor, FaInfoCircle, FaClock
} from "react-icons/fa";
import equipmentData from "../data/equipmentData";

function Booking() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [equipment, setEquipment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalDays, setTotalDays] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  const [agreeTerms, setAgreeTerms] = useState(false);

  useEffect(() => {
    // Find equipment by id
    const item = equipmentData.find(e => e.id === parseInt(id));
    if (item) {
      setEquipment(item);
      
      // Set default dates (tomorrow and day after tomorrow)
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dayAfter = new Date();
      dayAfter.setDate(dayAfter.getDate() + 2);
      
      setStartDate(tomorrow.toISOString().split('T')[0]);
      setEndDate(dayAfter.toISOString().split('T')[0]);
    }
    setLoading(false);
  }, [id]);

  useEffect(() => {
    if (startDate && endDate && equipment) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
      setTotalDays(diffDays);
      setTotalAmount(diffDays * equipment.pricing.daily);
    }
  }, [startDate, endDate, equipment]);

  const handleBooking = () => {
    if (!agreeTerms) {
      alert("Please agree to the terms and conditions");
      return;
    }
    
    // In a real app, this would send booking to backend
    alert("Booking confirmed! You will receive a confirmation shortly.");
    navigate("/my-listings");
  };

  const formatCurrency = (amount) => {
    return `₹${amount.toLocaleString('en-IN')}`;
  };

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p>Loading equipment details...</p>
      </div>
    );
  }

  if (!equipment) {
    return (
      <div style={styles.container}>
        <h2>Equipment not found</h2>
        <button onClick={() => navigate("/equipment-list")} style={styles.backButton}>
          Back to Equipment List
        </button>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={() => navigate("/equipment-list")} style={styles.backButton}>
          <FaArrowLeft style={{ marginRight: "8px" }} /> Back to Equipment
        </button>
      </div>

      <div style={styles.bookingGrid}>
        {/* Left Column - Equipment Details */}
        <div style={styles.equipmentDetails}>
          <div style={styles.equipmentCard}>
            <div style={styles.equipmentHeader}>
              <div style={styles.equipmentIcon}>{equipment.image}</div>
              <div>
                <h1 style={styles.equipmentName}>{equipment.name}</h1>
                <p style={styles.equipmentType}>{equipment.type}</p>
              </div>
            </div>

            <div style={styles.ownerInfo}>
              <FaUser style={{ color: "#2c5e3a" }} />
              <div>
                <span style={styles.ownerLabel}>Owner</span>
                <span style={styles.ownerName}>{equipment.owner.name}</span>
              </div>
              {equipment.owner.verified && (
                <div style={styles.verifiedBadge}>
                  <FaCheckCircle style={{ color: "#27ae60" }} />
                  <span>Verified</span>
                </div>
              )}
            </div>

            <div style={styles.locationInfo}>
              <FaMapMarkerAlt style={{ color: "#e74c3c" }} />
              <span>{equipment.location.district}, {equipment.location.state}</span>
              <span style={styles.distance}>({equipment.location.distance} away)</span>
            </div>

            <div style={styles.rating}>
              <FaStar style={{ color: "#f39c12" }} />
              <span>{equipment.rating}</span>
              <span style={styles.reviewCount}>({equipment.totalReviews} reviews)</span>
            </div>

            <div style={styles.description}>
              <h3 style={styles.sectionTitle}>Description</h3>
              <p style={styles.descriptionText}>{equipment.description}</p>
            </div>

            <div style={styles.specs}>
              <h3 style={styles.sectionTitle}>Specifications</h3>
              <div style={styles.specsGrid}>
                {Object.entries(equipment.specs).map(([key, value]) => (
                  <div key={key} style={styles.specItem}>
                    <span style={styles.specKey}>{key}:</span>
                    <span style={styles.specValue}>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div style={styles.features}>
              <h3 style={styles.sectionTitle}>Features</h3>
              <div style={styles.featuresList}>
                {equipment.features.map((feature, index) => (
                  <div key={index} style={styles.featureItem}>
                    <FaCheckCircle style={{ color: "#27ae60", marginRight: "8px" }} />
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Booking Form */}
        <div style={styles.bookingForm}>
          <div style={styles.formCard}>
            <h2 style={styles.formTitle}>Book This Equipment</h2>

            <div style={styles.priceSummary}>
              <span style={styles.priceLabel}>Daily Rate</span>
              <span style={styles.priceValue}>{formatCurrency(equipment.pricing.daily)}</span>
              <span style={styles.priceUnit}>/day</span>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                <FaCalendarAlt style={{ marginRight: "8px", color: "#27ae60" }} />
                Start Date
              </label>
              <input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                min={new Date().toISOString().split('T')[0]}
                style={styles.dateInput}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>
                <FaCalendarAlt style={{ marginRight: "8px", color: "#27ae60" }} />
                End Date
              </label>
              <input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                min={startDate}
                style={styles.dateInput}
              />
            </div>

            <div style={styles.calculation}>
              <div style={styles.calcRow}>
                <span>Daily Rate:</span>
                <span>{formatCurrency(equipment.pricing.daily)} × {totalDays} days</span>
              </div>
              <div style={styles.calcRow}>
                <span>Subtotal:</span>
                <span>{formatCurrency(totalAmount)}</span>
              </div>
              <div style={styles.calcRow}>
                <span>Security Deposit:</span>
                <span>{formatCurrency(equipment.pricing.securityDeposit)}</span>
              </div>
              <div style={styles.calcRowTotal}>
                <span>Total Amount:</span>
                <span>{formatCurrency(totalAmount + equipment.pricing.securityDeposit)}</span>
              </div>
            </div>

            <div style={styles.securityNote}>
              <FaShieldAlt style={{ color: "#27ae60", marginRight: "8px" }} />
              <span>Security deposit will be refunded after equipment return in good condition</span>
            </div>

            <div style={styles.terms}>
              <input
                type="checkbox"
                id="terms"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                style={styles.checkbox}
              />
              <label htmlFor="terms">
                I agree to the <a href="/terms" style={styles.termsLink}>terms and conditions</a> and will return the equipment in good condition
              </label>
            </div>

            <button 
              onClick={handleBooking}
              style={styles.bookButton}
              disabled={!agreeTerms}
            >
              Confirm Booking
            </button>

            <div style={styles.paymentNote}>
              <FaInfoCircle style={{ color: "#3498db", marginRight: "8px" }} />
              <span>Payment will be collected after owner confirms availability</span>
            </div>
          </div>

          {/* Availability Calendar Placeholder */}
          <div style={styles.availabilityCard}>
            <h3 style={styles.availabilityTitle}>
              <FaClock style={{ marginRight: "8px", color: "#f39c12" }} />
              Availability
            </h3>
            <div style={styles.availabilityStatus}>
              <div style={styles.availabilityDot}></div>
              <span>Available on selected dates</span>
            </div>
            <p style={styles.availabilityNote}>
              Owner typically responds within 2 hours
            </p>
          </div>
        </div>
      </div>
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
    fontSize: "1rem",
    cursor: "pointer",
    padding: "8px 0",
    display: "flex",
    alignItems: "center"
  },
  
  bookingGrid: {
    display: "grid",
    gridTemplateColumns: "2fr 1fr",
    gap: "30px"
  },
  
  equipmentDetails: {
    // Styles for left column
  },
  
  equipmentCard: {
    background: "white",
    borderRadius: "16px",
    padding: "25px",
    border: "1px solid #c8e6c9"
  },
  
  equipmentHeader: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px"
  },
  
  equipmentIcon: {
    fontSize: "4rem",
    background: "#f9fff9",
    padding: "15px",
    borderRadius: "16px",
    border: "1px solid #c8e6c9"
  },
  
  equipmentName: {
    fontSize: "1.8rem",
    color: "#1e3c2c",
    margin: "0 0 5px 0"
  },
  
  equipmentType: {
    fontSize: "1rem",
    color: "#2c5e3a",
    margin: 0
  },
  
  ownerInfo: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    padding: "15px",
    background: "#f9fff9",
    borderRadius: "12px",
    border: "1px solid #c8e6c9",
    marginBottom: "15px"
  },
  
  ownerLabel: {
    display: "block",
    fontSize: "0.75rem",
    color: "#5a7c6a"
  },
  
  ownerName: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#1e3c2c"
  },
  
  verifiedBadge: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    marginLeft: "auto",
    color: "#27ae60",
    fontSize: "0.9rem"
  },
  
  locationInfo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    marginBottom: "15px",
    color: "#2c5e3a"
  },
  
  distance: {
    color: "#5a7c6a",
    fontSize: "0.9rem"
  },
  
  rating: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    marginBottom: "20px",
    color: "#2c5e3a"
  },
  
  reviewCount: {
    color: "#5a7c6a",
    fontSize: "0.9rem",
    marginLeft: "5px"
  },
  
  sectionTitle: {
    fontSize: "1.1rem",
    color: "#1e3c2c",
    margin: "0 0 10px 0"
  },
  
  description: {
    marginBottom: "20px"
  },
  
  descriptionText: {
    color: "#2c5e3a",
    lineHeight: 1.6,
    margin: 0
  },
  
  specs: {
    marginBottom: "20px"
  },
  
  specsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px",
    background: "#f9fff9",
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid #c8e6c9"
  },
  
  specItem: {
    display: "flex",
    flexDirection: "column"
  },
  
  specKey: {
    fontSize: "0.75rem",
    color: "#5a7c6a",
    textTransform: "capitalize"
  },
  
  specValue: {
    fontSize: "0.95rem",
    color: "#1e3c2c",
    fontWeight: "600"
  },
  
  features: {
    marginBottom: "20px"
  },
  
  featuresList: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px"
  },
  
  featureItem: {
    display: "flex",
    alignItems: "center",
    fontSize: "0.9rem",
    color: "#2c5e3a"
  },
  
  bookingForm: {
    // Styles for right column
  },
  
  formCard: {
    background: "white",
    borderRadius: "16px",
    padding: "25px",
    border: "1px solid #c8e6c9",
    marginBottom: "20px"
  },
  
  formTitle: {
    fontSize: "1.3rem",
    color: "#1e3c2c",
    margin: "0 0 20px 0"
  },
  
  priceSummary: {
    background: "#f9fff9",
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid #c8e6c9",
    marginBottom: "20px",
    display: "flex",
    alignItems: "baseline",
    gap: "10px"
  },
  
  priceLabel: {
    color: "#5a7c6a",
    fontSize: "0.9rem"
  },
  
  priceValue: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#f39c12"
  },
  
  priceUnit: {
    color: "#5a7c6a"
  },
  
  formGroup: {
    marginBottom: "20px"
  },
  
  label: {
    display: "flex",
    alignItems: "center",
    color: "#1e3c2c",
    marginBottom: "8px",
    fontWeight: "500"
  },
  
  dateInput: {
    width: "100%",
    padding: "12px 15px",
    fontSize: "1rem",
    border: "2px solid #c8e6c9",
    borderRadius: "10px",
    background: "#f9fff9",
    color: "#1e3c2c"
  },
  
  calculation: {
    background: "#f9fff9",
    padding: "15px",
    borderRadius: "12px",
    border: "1px solid #c8e6c9",
    marginBottom: "15px"
  },
  
  calcRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    color: "#2c5e3a"
  },
  
  calcRowTotal: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "10px",
    paddingTop: "10px",
    borderTop: "1px solid #c8e6c9",
    fontWeight: "700",
    color: "#1e3c2c"
  },
  
  securityNote: {
    display: "flex",
    alignItems: "center",
    padding: "12px",
    background: "#e8f5e9",
    borderRadius: "10px",
    marginBottom: "20px",
    color: "#2c5e3a",
    fontSize: "0.9rem"
  },
  
  terms: {
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    marginBottom: "20px"
  },
  
  checkbox: {
    width: "18px",
    height: "18px",
    marginTop: "2px",
    accentColor: "#27ae60"
  },
  
  termsLink: {
    color: "#27ae60",
    textDecoration: "none",
    fontWeight: "600"
  },
  
  bookButton: {
    width: "100%",
    background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)",
    color: "white",
    border: "none",
    padding: "16px",
    borderRadius: "10px",
    fontSize: "1.1rem",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "15px"
  },
  
  paymentNote: {
    display: "flex",
    alignItems: "center",
    padding: "12px",
    background: "#e3f2fd",
    borderRadius: "10px",
    color: "#2c5e3a",
    fontSize: "0.85rem"
  },
  
  availabilityCard: {
    background: "white",
    borderRadius: "16px",
    padding: "20px",
    border: "1px solid #c8e6c9"
  },
  
  availabilityTitle: {
    fontSize: "1.1rem",
    color: "#1e3c2c",
    margin: "0 0 15px 0",
    display: "flex",
    alignItems: "center"
  },
  
  availabilityStatus: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "10px"
  },
  
  availabilityDot: {
    width: "10px",
    height: "10px",
    background: "#27ae60",
    borderRadius: "50%"
  },
  
  availabilityNote: {
    color: "#5a7c6a",
    fontSize: "0.85rem",
    margin: 0
  }
};

export default Booking;