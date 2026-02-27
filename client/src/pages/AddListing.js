import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaArrowLeft, FaTractor, FaImage, FaRupeeSign,
  FaMapMarkerAlt, FaInfoCircle, FaCheckCircle,
  FaPlus, FaTimes
} from "react-icons/fa";

function AddListing() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    type: "Tractor",
    category: "Tractor",
    description: "",
    dailyRate: "",
    weeklyRate: "",
    monthlyRate: "",
    securityDeposit: "",
    location: "",
    district: "",
    state: "Punjab",
    features: [],
    images: []
  });

  const [currentFeature, setCurrentFeature] = useState("");
  const [features, setFeatures] = useState([]);
  const [images, setImages] = useState([]);
  const [step, setStep] = useState(1);

  const equipmentTypes = [
    "Tractor", "Harvester", "Water Pump", "Rotavator", 
    "Leveller", "Plough", "Cultivator", "Sprayer"
  ];

  const states = [
    "Punjab", "Haryana", "UP", "Maharashtra", "Karnataka", 
    "Telangana", "Gujarat", "Rajasthan", "Bihar", "MP"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddFeature = () => {
    if (currentFeature.trim()) {
      setFeatures([...features, currentFeature.trim()]);
      setCurrentFeature("");
    }
  };

  const handleRemoveFeature = (index) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + images.length <= 5) {
      const newImages = files.map(file => ({
        file,
        preview: URL.createObjectURL(file),
        name: file.name
      }));
      setImages([...images, ...newImages]);
    } else {
      alert("You can upload maximum 5 images");
    }
  };

  const handleRemoveImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    // Validate form
    if (!formData.name || !formData.dailyRate || !formData.location) {
      alert("Please fill in all required fields");
      return;
    }

    // In real app, this would send data to backend
    alert("Equipment listed successfully!");
    navigate("/my-listings");
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.name || !formData.dailyRate) {
        alert("Please fill in equipment name and daily rate");
        return;
      }
    }
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  return (
    <div style={styles.container}>
      {/* Header */}
      <div style={styles.header}>
        <button onClick={() => navigate("/my-listings")} style={styles.backButton}>
          <FaArrowLeft style={{ marginRight: "8px" }} /> Back to My Listings
        </button>
        <h1 style={styles.title}>
          <FaPlus style={{ marginRight: "15px", color: "#27ae60" }} />
          Add New Equipment Listing
        </h1>
        <p style={styles.subtitle}>
          List your equipment for rent to other farmers
        </p>
      </div>

      {/* Progress Steps */}
      <div style={styles.progressBar}>
        <div style={{ ...styles.progressStep, background: step >= 1 ? "#27ae60" : "#e2e8f0" }}>
          <span style={styles.stepNumber}>1</span>
          <span style={styles.stepLabel}>Basic Info</span>
        </div>
        <div style={{ ...styles.progressLine, background: step >= 2 ? "#27ae60" : "#e2e8f0" }}></div>
        <div style={{ ...styles.progressStep, background: step >= 2 ? "#27ae60" : "#e2e8f0" }}>
          <span style={styles.stepNumber}>2</span>
          <span style={styles.stepLabel}>Pricing</span>
        </div>
        <div style={{ ...styles.progressLine, background: step >= 3 ? "#27ae60" : "#e2e8f0" }}></div>
        <div style={{ ...styles.progressStep, background: step >= 3 ? "#27ae60" : "#e2e8f0" }}>
          <span style={styles.stepNumber}>3</span>
          <span style={styles.stepLabel}>Location</span>
        </div>
        <div style={{ ...styles.progressLine, background: step >= 4 ? "#27ae60" : "#e2e8f0" }}></div>
        <div style={{ ...styles.progressStep, background: step >= 4 ? "#27ae60" : "#e2e8f0" }}>
          <span style={styles.stepNumber}>4</span>
          <span style={styles.stepLabel}>Features</span>
        </div>
      </div>

      {/* Form Card */}
      <div style={styles.formCard}>
        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div style={styles.stepContent}>
            <h2 style={styles.stepTitle}>Basic Information</h2>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Equipment Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="e.g., John Deere 5050D Tractor"
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Equipment Type *</label>
              <select
                name="type"
                value={formData.type}
                onChange={handleChange}
                style={styles.select}
              >
                {equipmentTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe your equipment, its condition, age, etc."
                rows="4"
                style={styles.textarea}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Upload Photos (Max 5)</label>
              <div style={styles.imageUploadArea}>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImageUpload}
                  style={{ display: "none" }}
                  id="image-upload"
                />
                <label htmlFor="image-upload" style={styles.uploadButton}>
                  <FaImage /> Choose Images
                </label>
                <span style={styles.uploadHint}>{images.length}/5 photos uploaded</span>
              </div>
              
              {images.length > 0 && (
                <div style={styles.imagePreviewGrid}>
                  {images.map((img, index) => (
                    <div key={index} style={styles.imagePreview}>
                      <img src={img.preview} alt={img.name} style={styles.previewImage} />
                      <button 
                        onClick={() => handleRemoveImage(index)}
                        style={styles.removeImageBtn}
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Step 2: Pricing */}
        {step === 2 && (
          <div style={styles.stepContent}>
            <h2 style={styles.stepTitle}>Pricing Details</h2>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Daily Rate (₹) *</label>
              <input
                type="number"
                name="dailyRate"
                value={formData.dailyRate}
                onChange={handleChange}
                placeholder="e.g., 1500"
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Weekly Rate (₹) - Optional</label>
              <input
                type="number"
                name="weeklyRate"
                value={formData.weeklyRate}
                onChange={handleChange}
                placeholder="e.g., 9000"
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Monthly Rate (₹) - Optional</label>
              <input
                type="number"
                name="monthlyRate"
                value={formData.monthlyRate}
                onChange={handleChange}
                placeholder="e.g., 32000"
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Security Deposit (₹) *</label>
              <input
                type="number"
                name="securityDeposit"
                value={formData.securityDeposit}
                onChange={handleChange}
                placeholder="e.g., 5000"
                style={styles.input}
              />
              <small style={styles.hint}>Refundable deposit taken from renters</small>
            </div>
          </div>
        )}

        {/* Step 3: Location */}
        {step === 3 && (
          <div style={styles.stepContent}>
            <h2 style={styles.stepTitle}>Location Details</h2>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Village/City *</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="e.g., Ludhiana"
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>District</label>
              <input
                type="text"
                name="district"
                value={formData.district}
                onChange={handleChange}
                placeholder="e.g., Ludhiana"
                style={styles.input}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>State *</label>
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                style={styles.select}
              >
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Step 4: Features */}
        {step === 4 && (
          <div style={styles.stepContent}>
            <h2 style={styles.stepTitle}>Features & Specifications</h2>
            
            <div style={styles.formGroup}>
              <label style={styles.label}>Add Features</label>
              <div style={styles.featureInput}>
                <input
                  type="text"
                  value={currentFeature}
                  onChange={(e) => setCurrentFeature(e.target.value)}
                  placeholder="e.g., Power Steering, AC Cabin, GPS"
                  style={{ ...styles.input, flex: 1 }}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddFeature()}
                />
                <button onClick={handleAddFeature} style={styles.addFeatureBtn}>
                  <FaPlus /> Add
                </button>
              </div>
            </div>

            {features.length > 0 && (
              <div style={styles.featuresList}>
                {features.map((feature, index) => (
                  <div key={index} style={styles.featureTag}>
                    <span>{feature}</span>
                    <button 
                      onClick={() => handleRemoveFeature(index)}
                      style={styles.removeFeatureBtn}
                    >
                      <FaTimes />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div style={styles.formGroup}>
              <label style={styles.label}>Additional Specifications</label>
              <textarea
                name="specs"
                value={formData.specs}
                onChange={handleChange}
                placeholder="Engine power, fuel type, year, hours used, etc."
                rows="3"
                style={styles.textarea}
              />
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div style={styles.navigationButtons}>
          {step > 1 && (
            <button onClick={prevStep} style={styles.prevButton}>
              Previous
            </button>
          )}
          {step < 4 ? (
            <button onClick={nextStep} style={styles.nextButton}>
              Next Step
            </button>
          ) : (
            <button onClick={handleSubmit} style={styles.submitButton}>
              <FaCheckCircle /> List Equipment
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "800px",
    margin: "0 auto",
    padding: "30px 20px",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    background: "#f0f7f0",
    minHeight: "100vh"
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
  
  progressBar: {
    display: "flex",
    alignItems: "center",
    marginBottom: "30px",
    background: "white",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #c8e6c9"
  },
  
  progressStep: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "8px 16px",
    borderRadius: "30px",
    color: "white",
    minWidth: "60px"
  },
  
  stepNumber: {
    width: "24px",
    height: "24px",
    background: "white",
    color: "#27ae60",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    marginBottom: "4px"
  },
  
  stepLabel: {
    fontSize: "0.8rem",
    color: "white"
  },
  
  progressLine: {
    flex: 1,
    height: "2px",
    margin: "0 10px"
  },
  
  formCard: {
    background: "white",
    borderRadius: "16px",
    padding: "30px",
    border: "1px solid #c8e6c9"
  },
  
  stepContent: {
    marginBottom: "30px"
  },
  
  stepTitle: {
    fontSize: "1.3rem",
    color: "#1e3c2c",
    margin: "0 0 25px 0"
  },
  
  formGroup: {
    marginBottom: "20px"
  },
  
  label: {
    display: "block",
    color: "#1e3c2c",
    fontWeight: "600",
    marginBottom: "8px",
    fontSize: "0.95rem"
  },
  
  input: {
    width: "100%",
    padding: "12px 15px",
    fontSize: "1rem",
    border: "2px solid #c8e6c9",
    borderRadius: "8px",
    outline: "none",
    background: "#f9fff9"
  },
  
  select: {
    width: "100%",
    padding: "12px 15px",
    fontSize: "1rem",
    border: "2px solid #c8e6c9",
    borderRadius: "8px",
    outline: "none",
    background: "#f9fff9",
    cursor: "pointer"
  },
  
  textarea: {
    width: "100%",
    padding: "12px 15px",
    fontSize: "1rem",
    border: "2px solid #c8e6c9",
    borderRadius: "8px",
    outline: "none",
    background: "#f9fff9",
    resize: "vertical",
    fontFamily: "inherit"
  },
  
  hint: {
    display: "block",
    color: "#5a7c6a",
    fontSize: "0.85rem",
    marginTop: "5px"
  },
  
  imageUploadArea: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "15px"
  },
  
  uploadButton: {
    padding: "12px 20px",
    background: "#f9fff9",
    border: "2px solid #27ae60",
    color: "#27ae60",
    borderRadius: "8px",
    fontSize: "0.95rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  
  uploadHint: {
    color: "#5a7c6a",
    fontSize: "0.9rem"
  },
  
  imagePreviewGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(5, 1fr)",
    gap: "10px",
    marginTop: "15px"
  },
  
  imagePreview: {
    position: "relative",
    aspectRatio: "1"
  },
  
  previewImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "8px",
    border: "1px solid #c8e6c9"
  },
  
  removeImageBtn: {
    position: "absolute",
    top: "5px",
    right: "5px",
    width: "20px",
    height: "20px",
    background: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    fontSize: "12px"
  },
  
  featureInput: {
    display: "flex",
    gap: "10px"
  },
  
  addFeatureBtn: {
    padding: "0 20px",
    background: "#27ae60",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "0.95rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    gap: "5px"
  },
  
  featuresList: {
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginTop: "15px",
    padding: "15px",
    background: "#f9fff9",
    borderRadius: "8px",
    border: "1px solid #c8e6c9"
  },
  
  featureTag: {
    display: "flex",
    alignItems: "center",
    gap: "5px",
    padding: "5px 10px",
    background: "white",
    border: "1px solid #27ae60",
    borderRadius: "30px",
    fontSize: "0.9rem",
    color: "#27ae60"
  },
  
  removeFeatureBtn: {
    background: "none",
    border: "none",
    color: "#e74c3c",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    padding: "2px"
  },
  
  navigationButtons: {
    display: "flex",
    justifyContent: "space-between",
    gap: "15px",
    marginTop: "30px",
    paddingTop: "20px",
    borderTop: "1px solid #c8e6c9"
  },
  
  prevButton: {
    padding: "12px 30px",
    background: "white",
    border: "2px solid #27ae60",
    color: "#27ae60",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer"
  },
  
  nextButton: {
    padding: "12px 30px",
    background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    marginLeft: "auto"
  },
  
  submitButton: {
    padding: "12px 30px",
    background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  }
};

export default AddListing;