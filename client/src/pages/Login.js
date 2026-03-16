import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaEye, FaEyeSlash, FaLock, FaEnvelope, FaGoogle, FaFacebookF } from "react-icons/fa";

// Get the API URL from environment variable
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }
    return newErrors;
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setLoading(true);
    setErrors({});

    try {
      console.log("🔍 Attempting login to:", `${API_URL}/api/auth/login`);
      
      const res = await fetch(`${API_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        
        // Show success message
        alert("🎉 Login successful! Welcome back!");
        
        // Navigate to dashboard
        navigate("/dashboard");
      } else {
        setErrors({ general: data.message || "Login failed. Please try again." });
      }
    } catch (error) {
      console.error("Login error:", error);
      setErrors({ 
        general: "Network error. Cannot connect to backend server. Make sure the backend is running." 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider) => {
    alert(`🚧 ${provider} login integration coming soon!`);
  };

  const handleForgotPassword = () => {
    alert("📧 Password reset feature coming soon!");
  };

  return (
    <div style={styles.container}>
      <div style={styles.loginCard}>
        {/* Left Side - Branding */}
        <div style={styles.leftPanel}>
          <div style={styles.brand}>
            <div style={styles.logo}>
              🌾
            </div>
            <h1 style={styles.brandTitle}>AgriConnect</h1>
            <p style={styles.brandSubtitle}>Welcome back to your farming dashboard</p>
          </div>
          
          <div style={styles.features}>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>🌱</div>
              <div>
                <h4>Manage Crops</h4>
                <p>Track your crops and inventory</p>
              </div>
            </div>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>💰</div>
              <div>
                <h4>Track Earnings</h4>
                <p>Monitor your profits in real-time</p>
              </div>
            </div>
            <div style={styles.feature}>
              <div style={styles.featureIcon}>📦</div>
              <div>
                <h4>Order Management</h4>
                <p>Handle all orders from one place</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div style={styles.rightPanel}>
          <div style={styles.formHeader}>
            <h2 style={styles.formTitle}>Sign In to Your Account</h2>
            <p style={styles.formSubtitle}>Enter your credentials to continue</p>
          </div>

          {errors.general && (
            <div style={styles.errorAlert}>
              ⚠️ {errors.general}
            </div>
          )}

          <form onSubmit={handleLogin} style={styles.form}>
            {/* Email Field */}
            <div style={styles.inputGroup}>
              <label style={styles.label}>
                <FaEnvelope style={styles.inputIcon} />
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="farmer@example.com"
                style={styles.input}
                disabled={loading}
              />
              {errors.email && <span style={styles.errorText}>{errors.email}</span>}
            </div>

            {/* Password Field */}
            <div style={styles.inputGroup}>
              <div style={styles.labelRow}>
                <label style={styles.label}>
                  <FaLock style={styles.inputIcon} />
                  Password
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  style={styles.forgotPassword}
                >
                  Forgot password?
                </button>
              </div>
              <div style={styles.passwordWrapper}>
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  style={styles.input}
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={styles.passwordToggle}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              {errors.password && <span style={styles.errorText}>{errors.password}</span>}
            </div>

            {/* Remember Me */}
            <div style={styles.rememberMe}>
              <input
                type="checkbox"
                id="remember"
                style={styles.checkbox}
              />
              <label htmlFor="remember">Remember me for 30 days</label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              style={styles.submitButton}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div style={styles.spinner}></div>
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </button>

            {/* Divider */}
            <div style={styles.divider}>
              <span>Or continue with</span>
            </div>

            {/* Social Login Buttons */}
            <div style={styles.socialButtons}>
              <button
                type="button"
                onClick={() => handleSocialLogin("Google")}
                style={styles.socialButtonGoogle}
              >
                <FaGoogle /> Google
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("Facebook")}
                style={styles.socialButtonFacebook}
              >
                <FaFacebookF /> Facebook
              </button>
            </div>

            {/* Sign Up Link */}
            <div style={styles.signupLink}>
              <p>
                Don't have an account?{" "}
                <Link to="/register" style={styles.link}>
                  Sign up for free
                </Link>
              </p>
              
            </div>
          </form>
        </div>
      </div>

      {/* Security Badge */}
      <div style={styles.securityBadge}>
        <FaLock style={{ marginRight: "10px" }} />
        <span>Your data is protected with 256-bit SSL encryption</span>
      </div>
    </div>
  );
}

// Styles remain exactly the same as your original...
const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "linear-gradient(135deg, #f8fff8 0%, #e8f5e9 100%)",
    padding: "20px"
  },
  loginCard: {
    display: "flex",
    maxWidth: "1000px",
    width: "100%",
    background: "white",
    borderRadius: "20px",
    overflow: "hidden",
    boxShadow: "0 20px 60px rgba(39, 174, 96, 0.15)",
    minHeight: "600px"
  },
  leftPanel: {
    flex: 1,
    background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)",
    color: "white",
    padding: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between"
  },
  brand: {
    textAlign: "center"
  },
  logo: {
    fontSize: "60px",
    marginBottom: "20px"
  },
  brandTitle: {
    fontSize: "2.5rem",
    marginBottom: "10px"
  },
  brandSubtitle: {
    opacity: 0.9,
    fontSize: "1.1rem"
  },
  features: {
    margin: "40px 0"
  },
  feature: {
    display: "flex",
    alignItems: "center",
    marginBottom: "30px",
    background: "rgba(255, 255, 255, 0.1)",
    padding: "15px",
    borderRadius: "10px",
    backdropFilter: "blur(10px)"
  },
  featureIcon: {
    fontSize: "24px",
    marginRight: "15px",
    width: "50px",
    height: "50px",
    background: "rgba(255, 255, 255, 0.2)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  testimonial: {
    background: "rgba(255, 255, 255, 0.1)",
    padding: "20px",
    borderRadius: "10px",
    backdropFilter: "blur(10px)"
  },
  testimonialAuthor: {
    display: "flex",
    alignItems: "center",
    marginTop: "15px"
  },
  testimonialAvatar: {
    width: "40px",
    height: "40px",
    background: "white",
    color: "#27ae60",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    marginRight: "15px"
  },
  testimonialName: {
    margin: 0,
    fontWeight: "bold"
  },
  testimonialRole: {
    margin: 0,
    opacity: 0.8,
    fontSize: "0.9rem"
  },
  rightPanel: {
    flex: 1,
    padding: "50px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center"
  },
  formHeader: {
    marginBottom: "40px",
    textAlign: "center"
  },
  formTitle: {
    fontSize: "2rem",
    color: "#2c3e50",
    marginBottom: "10px"
  },
  formSubtitle: {
    color: "#7f8c8d",
    fontSize: "1rem"
  },
  errorAlert: {
    background: "#ffeaea",
    color: "#e74c3c",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "20px",
    border: "1px solid #ffcccc",
    textAlign: "center"
  },
  form: {
    width: "100%"
  },
  inputGroup: {
    marginBottom: "25px"
  },
  label: {
    display: "flex",
    alignItems: "center",
    color: "#2c3e50",
    fontWeight: "600",
    marginBottom: "8px",
    fontSize: "14px"
  },
  labelRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  inputIcon: {
    marginRight: "10px",
    color: "#27ae60"
  },
  input: {
    width: "100%",
    padding: "15px 20px",
    fontSize: "16px",
    border: "2px solid #e0e0e0",
    borderRadius: "10px",
    transition: "all 0.3s",
    outline: "none"
  },
  passwordWrapper: {
    position: "relative"
  },
  passwordToggle: {
    position: "absolute",
    right: "15px",
    top: "50%",
    transform: "translateY(-50%)",
    background: "none",
    border: "none",
    color: "#7f8c8d",
    cursor: "pointer",
    fontSize: "16px"
  },
  errorText: {
    color: "#e74c3c",
    fontSize: "14px",
    marginTop: "5px",
    display: "block"
  },
  forgotPassword: {
    background: "none",
    border: "none",
    color: "#27ae60",
    fontSize: "14px",
    cursor: "pointer",
    textDecoration: "underline"
  },
  rememberMe: {
    display: "flex",
    alignItems: "center",
    marginBottom: "30px"
  },
  checkbox: {
    marginRight: "10px",
    width: "18px",
    height: "18px",
    accentColor: "#27ae60"
  },
  submitButton: {
    width: "100%",
    padding: "18px",
    fontSize: "16px",
    fontWeight: "bold",
    background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)",
    color: "white",
    border: "none",
    borderRadius: "10px",
    cursor: "pointer",
    transition: "all 0.3s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
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
  divider: {
    display: "flex",
    alignItems: "center",
    margin: "30px 0",
    color: "#95a5a6"
  },
  socialButtons: {
    display: "flex",
    gap: "15px",
    marginBottom: "30px"
  },
  socialButtonGoogle: {
    flex: 1,
    padding: "15px",
    background: "#fff",
    border: "2px solid #e0e0e0",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px"
  },
  socialButtonFacebook: {
    flex: 1,
    padding: "15px",
    background: "#fff",
    border: "2px solid #e0e0e0",
    borderRadius: "10px",
    fontSize: "14px",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px"
  },
  signupLink: {
    textAlign: "center",
    marginTop: "30px"
  },
  link: {
    color: "#27ae60",
    fontWeight: "bold",
    textDecoration: "none"
  },
  securityBadge: {
    display: "flex",
    alignItems: "center",
    marginTop: "30px",
    padding: "15px 30px",
    background: "white",
    borderRadius: "50px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.05)",
    color: "#27ae60",
    fontWeight: "600",
    fontSize: "14px"
  }
};

// Add spinner animation
const styleSheet = document.styleSheets[0];
styleSheet.insertRule(`
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`, styleSheet.cssRules.length);

export default Login;