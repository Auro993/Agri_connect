import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaArrowLeft, FaCalendarAlt, FaSearch, FaFilter,
  FaLeaf, FaExclamationTriangle, FaCheckCircle,
  FaClock, FaEye, FaDownload, FaShare
} from "react-icons/fa";
import { sampleScans } from "../data/cropDiseases";

function ScanHistory() {
  const navigate = useNavigate();
  const [scans, setScans] = useState(sampleScans);
  const [search, setSearch] = useState("");
  const [filterCrop, setFilterCrop] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");

  // Get unique crops for filter
  const crops = ["All", ...new Set(sampleScans.map(scan => scan.crop))];
  const statuses = ["All", ...new Set(sampleScans.map(scan => scan.status))];

  // Filter scans
  const filteredScans = scans.filter(scan => {
    const matchesSearch = scan.disease.toLowerCase().includes(search.toLowerCase()) ||
                         scan.crop.toLowerCase().includes(search.toLowerCase());
    const matchesCrop = filterCrop === "All" || scan.crop === filterCrop;
    const matchesStatus = filterStatus === "All" || scan.status === filterStatus;
    return matchesSearch && matchesCrop && matchesStatus;
  });

  const getStatusColor = (status) => {
    switch(status) {
      case "treated": return { color: "#27ae60", bg: "#e8f5e9" };
      case "monitoring": return { color: "#f39c12", bg: "#fff3e0" };
      case "recovered": return { color: "#3498db", bg: "#e3f2fd" };
      default: return { color: "#7f8c8d", bg: "#f5f5f5" };
    }
  };

  const getSeverityIcon = (severity) => {
    switch(severity) {
      case "mild": return "🟡";
      case "moderate": return "🟠";
      case "severe": return "🔴";
      default: return "⚪";
    }
  };

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-IN', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={() => navigate("/crop-doctor")} style={styles.backButton}>
          <FaArrowLeft style={{ marginRight: "8px" }} /> Back to Crop Doctor
        </button>
        <h1 style={styles.title}>
          <FaCalendarAlt style={{ marginRight: "15px", color: "#27ae60" }} />
          Scan History
        </h1>
        <p style={styles.subtitle}>
          View and manage your past crop disease scans
        </p>
      </div>

      {/* Search and Filters */}
      <div style={styles.filtersCard}>
        <div style={styles.searchBox}>
          <FaSearch style={styles.searchIcon} />
          <input
            type="text"
            placeholder="Search by disease or crop..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.searchInput}
          />
        </div>

        <div style={styles.filterControls}>
          <div style={styles.filterGroup}>
            <FaFilter style={styles.filterIcon} />
            <select
              value={filterCrop}
              onChange={(e) => setFilterCrop(e.target.value)}
              style={styles.filterSelect}
            >
              {crops.map(crop => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
          </div>

          <div style={styles.filterGroup}>
            <FaFilter style={styles.filterIcon} />
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={styles.filterSelect}
            >
              {statuses.map(status => (
                <option key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Results Count */}
      <div style={styles.resultsInfo}>
        <p>Found {filteredScans.length} scans</p>
      </div>

      {/* Scans List */}
      <div style={styles.scansList}>
        {filteredScans.map((scan) => {
          const statusStyle = getStatusColor(scan.status);
          return (
            <div key={scan.id} style={styles.scanCard}>
              <div style={styles.scanHeader}>
                <div style={styles.scanIcon}>{scan.image}</div>
                <div style={styles.scanInfo}>
                  <h3 style={styles.scanTitle}>{scan.disease}</h3>
                  <p style={styles.scanMeta}>
                    <span style={styles.cropName}>{scan.crop}</span>
                    <span style={styles.dot}>•</span>
                    <span style={styles.scanDate}>{formatDate(scan.date)} at {scan.time}</span>
                  </p>
                </div>
                <span style={{
                  ...styles.statusBadge,
                  background: statusStyle.bg,
                  color: statusStyle.color
                }}>
                  {scan.status}
                </span>
              </div>

              <div style={styles.scanDetails}>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Confidence</span>
                  <span style={styles.detailValue}>{scan.confidence}%</span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Severity</span>
                  <span style={styles.severityValue}>
                    {getSeverityIcon(scan.severity)} {scan.severity}
                  </span>
                </div>
                <div style={styles.detailItem}>
                  <span style={styles.detailLabel}>Location</span>
                  <span style={styles.detailValue}>{scan.location}</span>
                </div>
              </div>

              {scan.notes && (
                <div style={styles.notes}>
                  <span style={styles.notesLabel}>Notes:</span>
                  <p style={styles.notesText}>{scan.notes}</p>
                </div>
              )}

              <div style={styles.scanActions}>
                <button 
                  onClick={() => navigate("/crop-doctor", { state: { scanId: scan.id } })}
                  style={styles.viewButton}
                >
                  <FaEye /> View Details
                </button>
                <button style={styles.shareButton}>
                  <FaShare /> Share
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* No Results */}
      {filteredScans.length === 0 && (
        <div style={styles.noResults}>
          <p>No scans found matching your criteria</p>
          <button 
            onClick={() => {
              setSearch("");
              setFilterCrop("All");
              setFilterStatus("All");
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
    maxWidth: "1000px",
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
  
  filtersCard: {
    background: "white",
    borderRadius: "16px",
    padding: "25px",
    marginBottom: "20px",
    border: "1px solid #c8e6c9"
  },
  
  searchBox: {
    position: "relative",
    marginBottom: "15px"
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
    gridTemplateColumns: "repeat(2, 1fr)",
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
  
  scansList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  
  scanCard: {
    background: "white",
    borderRadius: "16px",
    padding: "25px",
    border: "1px solid #c8e6c9"
  },
  
  scanHeader: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "15px"
  },
  
  scanIcon: {
    fontSize: "2.5rem",
    background: "#f9fff9",
    padding: "10px",
    borderRadius: "12px",
    border: "1px solid #c8e6c9"
  },
  
  scanInfo: {
    flex: 1
  },
  
  scanTitle: {
    fontSize: "1.2rem",
    color: "#1e3c2c",
    margin: "0 0 5px 0"
  },
  
  scanMeta: {
    fontSize: "0.9rem",
    color: "#5a7c6a",
    margin: 0
  },
  
  cropName: {
    color: "#2c5e3a",
    fontWeight: "500"
  },
  
  dot: {
    margin: "0 8px"
  },
  
  scanDate: {
    color: "#5a7c6a"
  },
  
  statusBadge: {
    padding: "6px 15px",
    borderRadius: "30px",
    fontSize: "0.85rem",
    fontWeight: "600"
  },
  
  scanDetails: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "15px",
    padding: "15px 0",
    borderTop: "1px solid #c8e6c9",
    borderBottom: "1px solid #c8e6c9",
    marginBottom: "15px"
  },
  
  detailItem: {
    textAlign: "center"
  },
  
  detailLabel: {
    display: "block",
    fontSize: "0.75rem",
    color: "#5a7c6a",
    marginBottom: "5px"
  },
  
  detailValue: {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#1e3c2c"
  },
  
  severityValue: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#1e3c2c",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "5px"
  },
  
  notes: {
    background: "#f9fff9",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "15px",
    border: "1px solid #c8e6c9"
  },
  
  notesLabel: {
    fontSize: "0.85rem",
    color: "#5a7c6a",
    marginRight: "8px"
  },
  
  notesText: {
    color: "#2c5e3a",
    margin: "5px 0 0 0",
    fontSize: "0.95rem"
  },
  
  scanActions: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "10px"
  },
  
  viewButton: {
    padding: "12px",
    background: "#27ae60",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "0.95rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
  },
  
  shareButton: {
    padding: "12px",
    background: "white",
    border: "2px solid #27ae60",
    color: "#27ae60",
    borderRadius: "8px",
    fontSize: "0.95rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
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

export default ScanHistory;