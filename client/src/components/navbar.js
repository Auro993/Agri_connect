import { Link, useNavigate, useLocation } from "react-router-dom"; 
import { useState, useEffect } from "react";
import { FaUser, FaMoon, FaSun } from "react-icons/fa";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userStr = localStorage.getItem("user");
    
    if (token && userStr) {
      setIsLoggedIn(true);
      try {
        const user = JSON.parse(userStr);
        setUserName(user.name || "User");
      } catch (e) {
        setUserName("User");
      }
    } else {
      setIsLoggedIn(false);
      setUserName("");
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.style.backgroundColor = "#1a1a1a";
      document.body.style.color = "#ffffff";
    } else {
      setIsDarkMode(false);
      document.body.style.backgroundColor = "#f5f5f5";
      document.body.style.color = "#333333";
    }
  }, [location.pathname]);

  const toggleTheme = () => {
    if (isDarkMode) {
      // Switch to light mode
      document.body.style.backgroundColor = "#f5f5f5";
      document.body.style.color = "#333333";
      document.documentElement.style.backgroundColor = "#f5f5f5";
      localStorage.setItem("theme", "light");
      setIsDarkMode(false);
    } else {
      // Switch to dark mode
      document.body.style.backgroundColor = "#1a1a1a";
      document.body.style.color = "#ffffff";
      document.documentElement.style.backgroundColor = "#1a1a1a";
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    setUserName("");
    navigate("/");
  };

  // Don't show navbar on login/register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  return (
    <nav style={{
      ...styles.nav,
      background: isDarkMode ? "#0a0a0a" : "linear-gradient(90deg, #1e3c2c 0%, #2c5e3a 100%)"
    }}>
      <div style={styles.navContainer}>
        {/* Logo Section */}
        <Link to="/" style={styles.logoLink}>
          <span style={styles.logo}>🌾 AgriConnect</span>
        </Link>

        {/* Center Section - Empty for now */}
        <div style={styles.centerSection}></div>

        {/* Right Section - ALWAYS SHOW THEME TOGGLE + AUTH BUTTONS ON HOME PAGE */}
        <div style={styles.rightSection}>
          {/* Theme Toggle Button - Always visible */}
          <button 
            onClick={toggleTheme} 
            style={{
              ...styles.themeToggle,
              background: isDarkMode ? "#333" : "rgba(255,255,255,0.2)",
              color: isDarkMode ? "#ffd700" : "#fff"
            }}
          >
            {isDarkMode ? <FaSun /> : <FaMoon />}
          </button>

          {/* ALWAYS show Login/Register on home page regardless of login state */}
          {location.pathname === '/' ? (
            <div style={styles.authButtons}>
              <Link to="/login" style={styles.loginBtn}>Login</Link>
              <Link to="/register" style={styles.registerBtn}>Register</Link>
            </div>
          ) : isLoggedIn ? (
            // Logged in and not on home page - show user menu
            <div style={styles.userSection}>
              <div style={styles.userInfo}>
                <FaUser style={styles.userIcon} />
                <span style={styles.userName}>Hi, {userName?.split(" ")[0] || "Farmer"}!</span>
              </div>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </div>
          ) : (
            // Not logged in and not on home page - show login/register
            <div style={styles.authButtons}>
              <Link to="/login" style={styles.loginBtn}>Login</Link>
              <Link to="/register" style={styles.registerBtn}>Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    width: "100%",
    transition: "background 0.3s ease"
  },
  navContainer: {
    maxWidth: "1400px",
    margin: "0 auto",
    padding: "0 20px",
    height: "70px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  logoLink: {
    textDecoration: "none",
    display: "flex",
    alignItems: "center"
  },
  logo: {
    fontSize: "1.5rem",
    fontWeight: "bold",
    color: "#fff",
    letterSpacing: "0.5px",
    whiteSpace: "nowrap"
  },
  centerSection: {
    flex: 1
  },
  rightSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    minWidth: "fit-content"
  },
  themeToggle: {
    border: "1px solid rgba(255,255,255,0.2)",
    width: "40px",
    height: "40px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.2rem",
    cursor: "pointer",
    transition: "all 0.3s ease"
  },
  authButtons: {
    display: "flex",
    gap: "10px"
  },
  loginBtn: {
    textDecoration: "none",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "500",
    padding: "8px 20px",
    borderRadius: "6px",
    border: "2px solid #27ae60",
    background: "transparent",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap"
  },
  registerBtn: {
    textDecoration: "none",
    color: "#fff",
    fontSize: "1rem",
    fontWeight: "600",
    padding: "8px 20px",
    borderRadius: "6px",
    background: "#27ae60",
    border: "2px solid #27ae60",
    transition: "all 0.3s ease",
    whiteSpace: "nowrap"
  },
  userSection: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },
  userInfo: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    background: "rgba(255,255,255,0.1)",
    padding: "6px 12px",
    borderRadius: "30px"
  },
  userIcon: {
    fontSize: "0.9rem",
    color: "#ecf0f1"
  },
  userName: {
    color: "#fff",
    fontSize: "0.95rem",
    fontWeight: "500"
  },
  logoutBtn: {
    padding: "8px 16px",
    background: "#e74c3c",
    color: "white",
    border: "none",
    borderRadius: "6px",
    fontSize: "0.9rem",
    fontWeight: "500",
    cursor: "pointer",
    transition: "all 0.2s",
    whiteSpace: "nowrap"
  }
};

export default Navbar;
