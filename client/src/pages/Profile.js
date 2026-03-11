import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft, FaUser, FaEnvelope, FaMapMarkerAlt, FaSave } from "react-icons/fa";

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    location: "",
    role: "farmer"
  });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.log("Error parsing user");
      }
    }
  }, []);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user", JSON.stringify(user));
    alert("Profile updated successfully!");
    navigate("/dashboard");
  };

  return (
    <div style={styles.container}>
      <button onClick={() => navigate("/dashboard")} style={styles.backButton}>
        <FaArrowLeft /> Back to Dashboard
      </button>
      
      <div style={styles.card}>
        <h1 style={styles.title}><FaUser /> Profile Settings</h1>
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <label style={styles.label}><FaUser /> Full Name</label>
            <input
              type="text"
              name="name"
              value={user.name || ""}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}><FaEnvelope /> Email</label>
            <input
              type="email"
              name="email"
              value={user.email || ""}
              onChange={handleChange}
              style={styles.input}
              required
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}><FaMapMarkerAlt /> Location</label>
            <input
              type="text"
              name="location"
              value={user.location || ""}
              onChange={handleChange}
              placeholder="e.g., Punjab"
              style={styles.input}
            />
          </div>

          <div style={styles.formGroup}>
            <label style={styles.label}>Role</label>
            <select
              name="role"
              value={user.role || "farmer"}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="farmer">Farmer</option>
              <option value="buyer">Buyer</option>
            </select>
          </div>

          <button type="submit" style={styles.submitButton}>
            <FaSave /> Save Changes
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "600px",
    margin: "0 auto",
    padding: "20px"
  },
  backButton: {
    background: "none",
    border: "none",
    color: "#666",
    fontSize: "1rem",
    cursor: "pointer",
    marginBottom: "20px",
    display: "flex",
    alignItems: "center",
    gap: "8px"
  },
  card: {
    background: "white",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.1)"
  },
  title: {
    color: "#333",
    marginBottom: "30px",
    display: "flex",
    alignItems: "center",
    gap: "10px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "20px"
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "5px"
  },
  label: {
    fontWeight: "600",
    color: "#555",
    display: "flex",
    alignItems: "center",
    gap: "5px"
  },
  input: {
    padding: "12px",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "1rem"
  },
  select: {
    padding: "12px",
    border: "2px solid #e0e0e0",
    borderRadius: "8px",
    fontSize: "1rem",
    background: "white"
  },
  submitButton: {
    padding: "14px",
    background: "#27ae60",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    marginTop: "10px"
  }
};

export default Profile;