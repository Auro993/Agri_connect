import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaCamera, FaUpload, FaArrowLeft, FaLeaf,
  FaCheckCircle, FaExclamationTriangle, FaInfoCircle,
  FaFlask, FaTint, FaSeedling, FaCalendarAlt,
  FaDownload, FaShare, FaSave, FaSearch
} from "react-icons/fa";
import { analyzeCropImage } from "../data/cropDiseases";

function CropDoctor() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [selectedCrop, setSelectedCrop] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [activeTab, setActiveTab] = useState("upload");

  const crops = ["Wheat", "Rice", "Tomato", "Potato", "Onion", "Maize", "Cotton", "Sugarcane"];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleAnalyze = async () => {
    if (!selectedImage || !selectedCrop) {
      alert("Please select a crop type and upload an image");
      return;
    }

    setLoading(true);
    try {
      // Simulate AI analysis
      const analysisResult = await analyzeCropImage(selectedCrop, selectedImage);
      setResult(analysisResult);
      setActiveTab("result");
    } catch (error) {
      console.error("Analysis failed:", error);
      alert("Failed to analyze image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const resetUpload = () => {
    setSelectedImage(null);
    setPreviewUrl(null);
    setSelectedCrop("");
    setResult(null);
    setActiveTab("upload");
  };

  const getSeverityColor = (severity) => {
    switch(severity) {
      case "mild": return { color: "#f39c12", bg: "#fff3e0" };
      case "moderate": return { color: "#e67e22", bg: "#ffe6cc" };
      case "severe": return { color: "#e74c3c", bg: "#ffebee" };
      default: return { color: "#27ae60", bg: "#e8f5e9" };
    }
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={() => navigate("/dashboard")} style={styles.backButton}>
          <FaArrowLeft style={{ marginRight: "8px" }} /> Back to Dashboard
        </button>
        <h1 style={styles.title}>
          <FaLeaf style={{ marginRight: "15px", color: "#27ae60" }} />
          AI Crop Doctor
        </h1>
        <p style={styles.subtitle}>
          Upload a photo of your crop to detect diseases and get treatment recommendations
        </p>
      </div>

      {/* Action Buttons */}
      <div style={styles.actionButtons}>
        <button 
          onClick={() => setActiveTab("upload")}
          style={{
            ...styles.tabButton,
            background: activeTab === "upload" ? "#27ae60" : "white",
            color: activeTab === "upload" ? "white" : "#2c5e3a"
          }}
        >
          <FaCamera /> New Scan
        </button>
        <button 
          onClick={() => navigate("/scan-history")}
          style={{
            ...styles.tabButton,
            background: activeTab === "history" ? "#27ae60" : "white",
            color: activeTab === "history" ? "white" : "#2c5e3a"
          }}
        >
          <FaCalendarAlt /> Scan History
        </button>
      </div>

      {/* Main Content */}
      {activeTab === "upload" && !result && (
        <div style={styles.uploadSection}>
          {/* Crop Selection */}
          <div style={styles.cropSelection}>
            <label style={styles.label}>Select Crop Type:</label>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              style={styles.cropSelect}
            >
              <option value="">Choose crop...</option>
              {crops.map(crop => (
                <option key={crop} value={crop}>{crop}</option>
              ))}
            </select>
          </div>

          {/* Upload Area */}
          <div 
            style={styles.uploadArea}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => fileInputRef.current.click()}
          >
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              style={{ display: "none" }}
            />
            
            {previewUrl ? (
              <div style={styles.previewContainer}>
                <img src={previewUrl} alt="Preview" style={styles.preview} />
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    resetUpload();
                  }}
                  style={styles.removeButton}
                >
                  ✕
                </button>
              </div>
            ) : (
              <div style={styles.uploadPlaceholder}>
                <FaCamera style={styles.uploadIcon} />
                <p style={styles.uploadText}>Click or drag & drop to upload</p>
                <p style={styles.uploadHint}>Supports: JPG, PNG (Max 5MB)</p>
              </div>
            )}
          </div>

          {/* Analyze Button */}
          <button 
            onClick={handleAnalyze}
            style={styles.analyzeButton}
            disabled={!selectedImage || !selectedCrop || loading}
          >
            {loading ? (
              <>
                <div style={styles.spinner}></div>
                Analyzing...
              </>
            ) : (
              <>
                <FaSearch /> Analyze Crop
              </>
            )}
          </button>
        </div>
      )}

      {/* Analysis Result */}
      {result && activeTab === "result" && (
        <div style={styles.resultSection}>
          {/* Header with Actions */}
          <div style={styles.resultHeader}>
            <h2 style={styles.resultTitle}>Analysis Result</h2>
            <div style={styles.resultActions}>
              <button onClick={() => setActiveTab("upload")} style={styles.newScanBtn}>
                <FaCamera /> New Scan
              </button>
            </div>
          </div>

          {/* Image and Basic Info */}
          <div style={styles.resultGrid}>
            <div style={styles.imageCard}>
              <img src={previewUrl} alt="Scanned crop" style={styles.resultImage} />
              <div style={styles.imageOverlay}>
                <span style={styles.cropTag}>{result.crop}</span>
                <span style={styles.dateTag}>{result.date}</span>
              </div>
            </div>

            <div style={styles.infoCard}>
              <h3 style={styles.diseaseName}>{result.disease}</h3>
              <p style={styles.scientificName}>{result.scientificName}</p>
              
              <div style={styles.confidenceBar}>
                <span style={styles.confidenceLabel}>Detection Confidence</span>
                <div style={styles.progressBar}>
                  <div 
                    style={{ 
                      ...styles.progressFill, 
                      width: `${result.confidence}%`,
                      background: result.confidence > 85 ? "#27ae60" : "#f39c12"
                    }}
                  ></div>
                </div>
                <span style={styles.confidenceValue}>{result.confidence}%</span>
              </div>

              <div style={styles.severityTag}>
                <span style={styles.severityLabel}>Severity:</span>
                <span style={{
                  ...styles.severityBadge,
                  background: getSeverityColor(result.severity).bg,
                  color: getSeverityColor(result.severity).color
                }}>
                  {result.severity.charAt(0).toUpperCase() + result.severity.slice(1)}
                </span>
              </div>

              <p style={styles.description}>{result.description}</p>
            </div>
          </div>

          {/* Symptoms */}
          <div style={styles.section}>
            <h3 style={styles.sectionTitle}>
              <FaExclamationTriangle style={{ marginRight: "10px", color: "#e74c3c" }} />
              Symptoms Detected
            </h3>
            <ul style={styles.symptomsList}>
              {result.symptoms.map((symptom, index) => (
                <li key={index} style={styles.symptomItem}>{symptom}</li>
              ))}
            </ul>
          </div>

          {/* Treatment Recommendations */}
          <div style={styles.treatmentSection}>
            <h3 style={styles.sectionTitle}>
              <FaFlask style={{ marginRight: "10px", color: "#3498db" }} />
              Treatment Recommendations
            </h3>
            
            <div style={styles.treatmentGrid}>
              {/* Organic Treatment */}
              <div style={styles.treatmentCard}>
                <div style={styles.treatmentHeader}>
                  <FaLeaf style={{ color: "#27ae60", fontSize: "1.5rem" }} />
                  <h4 style={styles.treatmentType}>Organic Methods</h4>
                </div>
                <ul style={styles.treatmentList}>
                  {result.treatment.organic.map((item, index) => (
                    <li key={index} style={styles.treatmentItem}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Chemical Treatment */}
              <div style={styles.treatmentCard}>
                <div style={styles.treatmentHeader}>
                  <FaFlask style={{ color: "#e67e22", fontSize: "1.5rem" }} />
                  <h4 style={styles.treatmentType}>Chemical Control</h4>
                </div>
                <ul style={styles.treatmentList}>
                  {result.treatment.chemical.map((item, index) => (
                    <li key={index} style={styles.treatmentItem}>{item}</li>
                  ))}
                </ul>
              </div>

              {/* Prevention */}
              <div style={styles.treatmentCard}>
                <div style={styles.treatmentHeader}>
                  <FaCheckCircle style={{ color: "#3498db", fontSize: "1.5rem" }} />
                  <h4 style={styles.treatmentType}>Prevention Tips</h4>
                </div>
                <ul style={styles.treatmentList}>
                  {result.treatment.prevention.map((item, index) => (
                    <li key={index} style={styles.treatmentItem}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={styles.actionBar}>
            <button 
              onClick={() => navigate("/scan-history")}
              style={styles.historyButton}
            >
              <FaCalendarAlt /> View in History
            </button>
            <button 
              onClick={resetUpload}
              style={styles.newScanButton}
            >
              <FaCamera /> New Scan
            </button>
          </div>
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
  
  actionButtons: {
    display: "flex",
    gap: "15px",
    marginBottom: "30px"
  },
  
  tabButton: {
    padding: "12px 25px",
    border: "2px solid #27ae60",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px",
    transition: "all 0.3s"
  },
  
  uploadSection: {
    background: "white",
    borderRadius: "16px",
    padding: "30px",
    border: "1px solid #c8e6c9"
  },
  
  cropSelection: {
    marginBottom: "25px"
  },
  
  label: {
    display: "block",
    color: "#1e3c2c",
    fontWeight: "600",
    marginBottom: "10px",
    fontSize: "1rem"
  },
  
  cropSelect: {
    width: "100%",
    padding: "14px 20px",
    fontSize: "1rem",
    border: "2px solid #c8e6c9",
    borderRadius: "10px",
    background: "#f9fff9",
    color: "#1e3c2c",
    cursor: "pointer"
  },
  
  uploadArea: {
    border: "3px dashed #c8e6c9",
    borderRadius: "16px",
    padding: "40px",
    textAlign: "center",
    cursor: "pointer",
    background: "#f9fff9",
    marginBottom: "25px",
    minHeight: "300px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s"
  },
  
  uploadPlaceholder: {
    textAlign: "center"
  },
  
  uploadIcon: {
    fontSize: "4rem",
    color: "#27ae60",
    marginBottom: "15px"
  },
  
  uploadText: {
    fontSize: "1.2rem",
    color: "#1e3c2c",
    margin: "0 0 10px 0"
  },
  
  uploadHint: {
    color: "#5a7c6a",
    fontSize: "0.9rem",
    margin: 0
  },
  
  previewContainer: {
    position: "relative",
    width: "100%",
    maxWidth: "400px",
    margin: "0 auto"
  },
  
  preview: {
    width: "100%",
    maxHeight: "300px",
    objectFit: "contain",
    borderRadius: "12px"
  },
  
  removeButton: {
    position: "absolute",
    top: "10px",
    right: "10px",
    background: "#e74c3c",
    color: "white",
    border: "none",
    width: "30px",
    height: "30px",
    borderRadius: "50%",
    cursor: "pointer",
    fontSize: "1rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  
  analyzeButton: {
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
    gap: "10px"
  },
  
  spinner: {
    width: "20px",
    height: "20px",
    border: "3px solid rgba(255,255,255,0.3)",
    borderTop: "3px solid white",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
    marginRight: "10px"
  },
  
  resultSection: {
    background: "white",
    borderRadius: "16px",
    padding: "30px",
    border: "1px solid #c8e6c9"
  },
  
  resultHeader: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "25px"
  },
  
  resultTitle: {
    fontSize: "1.5rem",
    color: "#1e3c2c",
    margin: 0
  },
  
  resultActions: {
    display: "flex",
    gap: "10px"
  },
  
  newScanBtn: {
    background: "#27ae60",
    color: "white",
    border: "none",
    padding: "10px 20px",
    borderRadius: "8px",
    fontSize: "0.9rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px"
  },
  
  resultGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1.5fr",
    gap: "25px",
    marginBottom: "25px"
  },
  
  imageCard: {
    position: "relative",
    background: "#f9fff9",
    borderRadius: "12px",
    padding: "15px",
    border: "1px solid #c8e6c9"
  },
  
  resultImage: {
    width: "100%",
    height: "200px",
    objectFit: "contain",
    borderRadius: "8px"
  },
  
  imageOverlay: {
    position: "absolute",
    top: "20px",
    left: "20px",
    display: "flex",
    gap: "10px"
  },
  
  cropTag: {
    background: "#27ae60",
    color: "white",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "600"
  },
  
  dateTag: {
    background: "rgba(0,0,0,0.6)",
    color: "white",
    padding: "5px 12px",
    borderRadius: "20px",
    fontSize: "0.85rem"
  },
  
  infoCard: {
    padding: "20px",
    background: "#f9fff9",
    borderRadius: "12px",
    border: "1px solid #c8e6c9"
  },
  
  diseaseName: {
    fontSize: "1.5rem",
    color: "#1e3c2c",
    margin: "0 0 5px 0"
  },
  
  scientificName: {
    fontSize: "0.95rem",
    color: "#5a7c6a",
    fontStyle: "italic",
    margin: "0 0 20px 0"
  },
  
  confidenceBar: {
    marginBottom: "15px"
  },
  
  confidenceLabel: {
    display: "block",
    fontSize: "0.85rem",
    color: "#5a7c6a",
    marginBottom: "5px"
  },
  
  progressBar: {
    height: "8px",
    background: "#e2e8f0",
    borderRadius: "4px",
    overflow: "hidden",
    marginBottom: "5px"
  },
  
  progressFill: {
    height: "100%",
    borderRadius: "4px",
    transition: "width 0.5s"
  },
  
  confidenceValue: {
    fontSize: "1.1rem",
    fontWeight: "600",
    color: "#1e3c2c"
  },
  
  severityTag: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px"
  },
  
  severityLabel: {
    color: "#5a7c6a",
    fontSize: "0.9rem"
  },
  
  severityBadge: {
    padding: "5px 15px",
    borderRadius: "20px",
    fontSize: "0.85rem",
    fontWeight: "600"
  },
  
  description: {
    color: "#2c5e3a",
    lineHeight: 1.6,
    margin: 0
  },
  
  section: {
    marginBottom: "25px"
  },
  
  sectionTitle: {
    fontSize: "1.2rem",
    color: "#1e3c2c",
    margin: "0 0 15px 0",
    display: "flex",
    alignItems: "center"
  },
  
  symptomsList: {
    listStyle: "none",
    padding: 0,
    margin: 0
  },
  
  symptomItem: {
    padding: "8px 0",
    color: "#2c5e3a",
    borderBottom: "1px solid #f0f0f0",
    "::before": {
      content: '"•"',
      color: "#27ae60",
      fontWeight: "bold",
      marginRight: "10px"
    }
  },
  
  treatmentSection: {
    marginBottom: "25px"
  },
  
  treatmentGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px"
  },
  
  treatmentCard: {
    background: "#f9fff9",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #c8e6c9"
  },
  
  treatmentHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px"
  },
  
  treatmentType: {
    fontSize: "1.1rem",
    color: "#1e3c2c",
    margin: 0
  },
  
  treatmentList: {
    listStyle: "none",
    padding: 0,
    margin: 0
  },
  
  treatmentItem: {
    padding: "6px 0",
    color: "#2c5e3a",
    fontSize: "0.9rem",
    "::before": {
      content: '"•"',
      color: "#27ae60",
      fontWeight: "bold",
      marginRight: "8px"
    }
  },
  
  actionBar: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "15px",
    marginTop: "20px"
  },
  
  historyButton: {
    padding: "14px",
    background: "white",
    border: "2px solid #27ae60",
    color: "#27ae60",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
  },
  
  newScanButton: {
    padding: "14px",
    background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px"
  }
};

export default CropDoctor;