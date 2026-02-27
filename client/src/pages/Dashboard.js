import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { 
  FaSeedling, FaShoppingCart, FaTractor, FaCamera,
  FaUsers, FaLeaf, FaChartLine, FaBell,
  FaArrowRight, FaCloudSun, FaWallet, FaWater,
  FaCalendarAlt, FaClock, FaCheckCircle,
  FaExclamationTriangle, FaLightbulb, FaBookOpen,
  FaMapMarkerAlt, FaTemperatureHigh, FaTint, FaWind,
  FaSun, FaPhone, FaEnvelope, FaUser,
  FaBoxOpen, FaTags, FaDollarSign, FaRegClock,
  FaStar, FaHeart, FaShare, FaDownload,
  FaFacebook, FaTwitter, FaInstagram, FaLinkedin,
  FaSpinner, FaCircle, FaRegBell, FaRegCalendarAlt,
  FaRegClock as FaRegClockAlt, FaRegSun, FaRegMoon,
  FaBolt, FaSeedling as FaSeedlingIcon, FaTree,
  FaCloud, FaSun as FaSunIcon, FaMoon, FaStar as FaStarIcon,
  FaRocket, FaCrown, FaGem, FaFire
} from "react-icons/fa";

// Import images
import mandiImg from "../assets/images/Mandi-Price.avif";
import weatherImg from "../assets/images/Weather.avif";
import equipmentImg from "../assets/images/Rent-Farm.avif";
import cropDoctorImg from "../assets/images/Crop-Doctor.avif";

function Dashboard() {
  const navigate = useNavigate();
  const [user, setUser] = useState({ name: "Aurosmita Sahoo", location: "Punjab" });
  const [currentTime, setCurrentTime] = useState(new Date());
  const [imageErrors, setImageErrors] = useState({});
  const [hoveredCard, setHoveredCard] = useState(null);
  const [isLoading, setIsLoading] = useState({});
  const [showNotification, setShowNotification] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    
    // Mouse move effect for parallax
    const handleMouseMove = (e) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      clearInterval(timer);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const handleImageError = (imgName) => {
    setImageErrors(prev => ({ ...prev, [imgName]: true }));
  };

  const handleActionClick = (path) => {
    setIsLoading(prev => ({ ...prev, [path]: true }));
    setTimeout(() => {
      navigate(path);
    }, 300);
  };

  const formattedDate = currentTime.toLocaleDateString('en-IN', { 
    weekday: 'long', 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });

  const formattedTime = currentTime.toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Premium animations
  const animations = `
    @keyframes float {
      0% { transform: translateY(0px) rotate(0deg); }
      50% { transform: translateY(-10px) rotate(1deg); }
      100% { transform: translateY(0px) rotate(0deg); }
    }
    
    @keyframes float-slow {
      0% { transform: translateY(0px); }
      50% { transform: translateY(-15px); }
      100% { transform: translateY(0px); }
    }
    
    @keyframes pulse-glow {
      0% { box-shadow: 0 0 0 0 rgba(39, 174, 96, 0.4); }
      50% { box-shadow: 0 0 0 15px rgba(39, 174, 96, 0); }
      100% { box-shadow: 0 0 0 0 rgba(39, 174, 96, 0); }
    }
    
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    
    @keyframes spin-slow {
      from { transform: rotate(0deg); }
      to { transform: rotate(360deg); }
    }
    
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      10%, 30%, 50%, 70%, 90% { transform: translateX(-5px); }
      20%, 40%, 60%, 80% { transform: translateX(5px); }
    }
    
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes slideInLeft {
      from {
        opacity: 0;
        transform: translateX(-30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(30px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes bounce {
      0%, 100% { transform: scale(1); }
      50% { transform: scale(1.1); }
    }
    
    @keyframes shimmer {
      0% { background-position: -1000px 0; }
      100% { background-position: 1000px 0; }
    }
    
    @keyframes rotateY {
      from { transform: rotateY(0deg); }
      to { transform: rotateY(360deg); }
    }
    
    @keyframes heartbeat {
      0% { transform: scale(1); }
      14% { transform: scale(1.3); }
      28% { transform: scale(1); }
      42% { transform: scale(1.3); }
      70% { transform: scale(1); }
    }
    
    @keyframes ripple {
      0% { transform: scale(0); opacity: 1; }
      100% { transform: scale(4); opacity: 0; }
    }
    
    @keyframes glowPulse {
      0% { filter: drop-shadow(0 0 2px rgba(39, 174, 96, 0.5)); }
      50% { filter: drop-shadow(0 0 15px rgba(39, 174, 96, 0.8)); }
      100% { filter: drop-shadow(0 0 2px rgba(39, 174, 96, 0.5)); }
    }
    
    @keyframes rotateGlow {
      0% { transform: rotate(0deg); filter: hue-rotate(0deg); }
      100% { transform: rotate(360deg); filter: hue-rotate(360deg); }
    }
    
    @keyframes float-particle {
      0% { transform: translateY(0) translateX(0); opacity: 0; }
      50% { opacity: 1; }
      100% { transform: translateY(-100px) translateX(20px); opacity: 0; }
    }
    
    @keyframes borderGlow {
      0%, 100% { border-color: rgba(39, 174, 96, 0.2); }
      50% { border-color: rgba(39, 174, 96, 0.6); }
    }
    
    @keyframes scalePulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.02); }
      100% { transform: scale(1); }
    }
    
    @keyframes rotateScale {
      0% { transform: rotate(0deg) scale(1); }
      50% { transform: rotate(180deg) scale(1.2); }
      100% { transform: rotate(360deg) scale(1); }
    }

    /* Animation Classes */
    .float-animation {
      animation: float 3s ease-in-out infinite;
    }
    
    .float-slow {
      animation: float-slow 5s ease-in-out infinite;
    }
    
    .pulse-glow {
      animation: pulse-glow 2s infinite;
    }
    
    .spin-slow {
      animation: spin-slow 8s linear infinite;
    }
    
    .shake-on-hover:hover {
      animation: shake 0.5s ease-in-out;
    }
    
    .slide-in {
      animation: slideIn 0.8s ease-out;
    }
    
    .slide-in-left {
      animation: slideInLeft 0.8s ease-out;
    }
    
    .slide-in-right {
      animation: slideInRight 0.8s ease-out;
    }
    
    .bounce-on-hover:hover {
      animation: bounce 0.5s ease-in-out;
    }
    
    .shimmer {
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      background-size: 1000px 100%;
      animation: shimmer 2s infinite;
    }
    
    .rotate-3d {
      animation: rotateY 3s ease-in-out infinite;
      transform-style: preserve-3d;
    }
    
    .heartbeat {
      animation: heartbeat 1.5s ease-in-out infinite;
    }
    
    .glow-pulse {
      animation: glowPulse 2s ease-in-out infinite;
    }
    
    .rotate-glow {
      animation: rotateGlow 5s linear infinite;
    }
    
    .border-pulse {
      animation: borderGlow 2s ease-in-out infinite;
    }
    
    .scale-pulse {
      animation: scalePulse 2s ease-in-out infinite;
    }

    /* Hover Effects */
    .hover-lift {
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      position: relative;
      overflow: hidden;
    }
    
    .hover-lift:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 0 20px 40px rgba(39, 174, 96, 0.15);
    }
    
    .hover-lift::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 0;
      height: 0;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.3);
      transform: translate(-50%, -50%);
      transition: width 0.6s, height 0.6s;
    }
    
    .hover-lift:hover::after {
      width: 300px;
      height: 300px;
    }
    
    .hover-glow {
      transition: all 0.3s;
    }
    
    .hover-glow:hover {
      filter: drop-shadow(0 0 10px rgba(39, 174, 96, 0.5));
      transform: scale(1.05);
    }
    
    .hover-border {
      position: relative;
      overflow: hidden;
    }
    
    .hover-border::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
      transition: left 0.5s;
    }
    
    .hover-border:hover::before {
      left: 100%;
    }
    
    .ripple-effect {
      position: relative;
      overflow: hidden;
    }
    
    .ripple-effect:active::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100px;
      height: 100px;
      background: rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0);
      animation: ripple 0.6s ease-out;
    }

    /* Particle Effects */
    .particle-container {
      position: relative;
      overflow: hidden;
    }
    
    .particle {
      position: absolute;
      width: 4px;
      height: 4px;
      background: rgba(39, 174, 96, 0.3);
      border-radius: 50%;
      pointer-events: none;
    }
    
    .particle:nth-child(1) { top: 10%; left: 20%; animation: float-particle 3s infinite; }
    .particle:nth-child(2) { top: 30%; left: 80%; animation: float-particle 4s infinite 1s; }
    .particle:nth-child(3) { top: 70%; left: 40%; animation: float-particle 5s infinite 2s; }
    .particle:nth-child(4) { top: 90%; left: 60%; animation: float-particle 3.5s infinite 1.5s; }
    .particle:nth-child(5) { top: 50%; left: 10%; animation: float-particle 4.5s infinite 0.5s; }

    /* Loading Spinner */
    .loading-spinner {
      width: 20px;
      height: 20px;
      border: 2px solid rgba(255,255,255,0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin-slow 0.8s linear infinite;
    }

    /* Card Shine Effect */
    .card-shine {
      position: relative;
      overflow: hidden;
    }
    
    .card-shine::before {
      content: '';
      position: absolute;
      top: -50%;
      left: -50%;
      width: 200%;
      height: 200%;
      background: linear-gradient(
        45deg,
        transparent 30%,
        rgba(255, 255, 255, 0.1) 50%,
        transparent 70%
      );
      transform: rotate(45deg);
      animation: shine 3s infinite;
    }
    
    @keyframes shine {
      from { transform: translateX(-100%) rotate(45deg); }
      to { transform: translateX(100%) rotate(45deg); }
    }

    /* Gradient Text Animation */
    .gradient-text-animate {
      background: linear-gradient(90deg, #27ae60, #2ecc71, #27ae60, #2ecc71);
      background-size: 300% 100%;
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      animation: gradientShift 3s linear infinite;
    }

    /* Counter Animation */
    @keyframes countUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    .count-animation {
      animation: countUp 0.5s ease-out;
    }
  `;

  return (
    <div style={styles.container}>
      <style>{animations}</style>
      
      {/* Particle Background */}
      <div className="particle-container" style={styles.particleContainer}>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>
      
      {/* ========== SECTION 1: HEADER WITH USER INFO ========== */}
      <div style={styles.sectionSpacer}>
        <div style={styles.premiumGlassHeader} className="hover-lift">
          <div style={{ position: "relative", zIndex: 2 }}>
            <div style={styles.welcomeBadge} className="float-animation">
              <FaLeaf style={styles.badgeIcon} className="spin-slow" />
              <span>FARMER DASHBOARD</span>
            </div>
            <h1 style={styles.greeting} className="slide-in">
              Welcome back, <span style={styles.gradientText} className="gradient-text-animate">{user?.name?.split(" ")[0] || "Farmer"}!</span>
            </h1>
            <div style={styles.userMeta}>
              <span style={styles.metaItem} className="hover-scale">
                <FaMapMarkerAlt style={styles.metaIcon} className="bounce-on-hover" /> {user?.location || "Punjab"}
              </span>
              <span style={styles.metaItem} className="hover-scale">
                <FaCalendarAlt style={styles.metaIcon} className="bounce-on-hover" /> Member since {user?.memberSince || "2024"}
              </span>
              <span style={styles.metaItem} className="hover-scale">
                <FaRegClock style={styles.metaIcon} className="spin-slow" /> {formattedDate}
              </span>
              <span style={styles.metaItem} className="hover-scale">
                <FaRegClockAlt style={styles.metaIcon} className="pulse-glow" /> {formattedTime}
              </span>
            </div>
          </div>
          <div style={styles.headerRight}>
            <div 
              style={styles.premiumNotification} 
              className="hover-lift"
              onMouseEnter={() => setShowNotification(true)}
              onMouseLeave={() => setShowNotification(false)}
            >
              <FaBell style={styles.bellIcon} className="shake-on-hover" />
              <span style={styles.notificationPulse}></span>
              {showNotification && (
                <div style={styles.notificationDropdown}>
                  <p>🔔 No new notifications</p>
                </div>
              )}
            </div>
            <div style={styles.userAvatar} className="hover-glow">
              <FaUser style={styles.avatarIcon} />
            </div>
          </div>
        </div>
      </div>

      {/* ========== SECTION 2: STATS CARDS ========== */}
      <div style={styles.sectionSpacer}>
        <div style={styles.statsGrid}>
          {[
            { icon: <FaUsers />, label: "Farmers", value: "—", sublabel: "Active", gradient: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)" },
            { icon: <FaLeaf />, label: "Crops", value: "—", sublabel: "Listed", gradient: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)" },
            { icon: <FaShoppingCart />, label: "Orders", value: "—", sublabel: "Delivered", gradient: "linear-gradient(135deg, #f39c12 0%, #e67e22 100%)" },
            { icon: <FaWallet />, label: "Earnings", value: "—", sublabel: "Total", gradient: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)" }
          ].map((stat, index) => (
            <div 
              key={index} 
              className="hover-lift card-shine" 
              style={styles.premiumStatCard}
              onMouseEnter={() => setHoveredCard(`stat-${index}`)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={{ ...styles.premiumStatIcon, background: stat.gradient }} className="rotate-3d">
                {stat.icon}
              </div>
              <div style={styles.statContent}>
                <div style={styles.statLabel}>{stat.label}</div>
                <div style={styles.statValue} className={hoveredCard === `stat-${index}` ? 'count-animation' : ''}>
                  {stat.value}
                </div>
                <div style={styles.statSublabel}>{stat.sublabel}</div>
              </div>
              {hoveredCard === `stat-${index}` && (
                <div style={styles.statSparkle}></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ========== SECTION 3: FARM MANAGEMENT TOOLS ========== */}
      <div style={styles.sectionSpacer}>
        <h2 style={styles.premiumSectionTitle} className="slide-in">
          <span className="gradient-text-animate">🌱 Farm Management Tools</span>
        </h2>
        <p style={styles.premiumSubtitle} className="fade-in">
          Everything you need to manage your farm efficiently
        </p>
        
        <div style={styles.featuresGrid}>
          {[
            { img: mandiImg, icon: <FaChartLine />, title: "Mandi Price Intelligence", desc: "Real-time wholesale prices from APMC mandis.", path: "/market-prices", btnText: "View Prices", gradient: "linear-gradient(135deg, #27ae60, #2ecc71)" },
            { img: weatherImg, icon: <FaCloudSun />, title: "Weather & Farm Advisor", desc: "Daily recommendations based on weather.", path: "/farm-advisor", btnText: "View Advisor", gradient: "linear-gradient(135deg, #3498db, #2980b9)" },
            { img: equipmentImg, icon: <FaTractor />, title: "Rent Farm Equipment", desc: "Browse tractors and tools from nearby farmers.", path: "/equipment-list", btnText: "Browse Equipment", gradient: "linear-gradient(135deg, #f39c12, #e67e22)" },
            { img: cropDoctorImg, icon: <FaCamera />, title: "AI Crop Doctor", desc: "Upload photos to detect diseases instantly.", path: "/crop-doctor", btnText: "Scan Crop", gradient: "linear-gradient(135deg, #9b59b6, #8e44ad)" }
          ].map((feature, index) => (
            <div 
              key={index} 
              className="hover-lift card-shine" 
              style={styles.premiumFeatureCard}
              onMouseEnter={() => setHoveredCard(`feature-${index}`)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <div style={styles.premiumImageWrapper}>
                {!imageErrors[Object.keys(imageErrors)[index]] ? (
                  <img 
                    src={feature.img} 
                    alt={feature.title} 
                    style={styles.premiumFeatureImage} 
                    onError={() => handleImageError(Object.keys(imageErrors)[index])}
                    className="scale-pulse"
                  />
                ) : (
                  <div style={{...styles.premiumFeatureImage, background: feature.gradient, display: "flex", alignItems: "center", justifyContent: "center"}} className="rotate-glow">
                    {feature.icon}
                  </div>
                )}
                <div style={styles.premiumFeatureBadge} className="float-animation">
                  {feature.icon}
                </div>
                {hoveredCard === `feature-${index}` && (
                  <div style={styles.featureOverlay}>
                    <FaRocket style={{ color: 'white', fontSize: '2rem' }} className="bounce-on-hover" />
                  </div>
                )}
              </div>
              <div style={styles.premiumFeatureContent}>
                <h3 style={styles.premiumFeatureTitle}>{feature.title}</h3>
                <p style={styles.premiumFeatureDesc}>{feature.desc}</p>
                <button 
                  onClick={() => handleActionClick(feature.path)} 
                  style={styles.premiumFeatureBtn}
                  className="ripple-effect"
                  disabled={isLoading[feature.path]}
                >
                  {isLoading[feature.path] ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    <>
                      {feature.btnText} <FaArrowRight style={{ marginLeft: "8px" }} className="shake-on-hover" />
                    </>
                  )}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ========== SECTION 4: QUICK ACTIONS - 3x2 GRID ========== */}
      <div style={styles.sectionSpacer}>
        <h3 style={styles.premiumSubSectionTitle} className="slide-in-left">
          <FaBolt style={{ marginRight: "10px", color: "#27ae60" }} className="glow-pulse" />
          Quick Actions
        </h3>
        <div style={styles.quickActions3x2Grid}>
          {[
            { icon: <FaSeedling />, label: "Add Crop", path: "/add-crop", gradient: "linear-gradient(135deg, #27ae60, #2ecc71)" },
            { icon: <FaShoppingCart />, label: "Sell Crops", path: "/crops", gradient: "linear-gradient(135deg, #3498db, #2980b9)" },
            { icon: <FaTractor />, label: "Rent Equipment", path: "/equipment-list", gradient: "linear-gradient(135deg, #f39c12, #e67e22)" },
            { icon: <FaCamera />, label: "Scan Crop", path: "/crop-doctor", gradient: "linear-gradient(135deg, #9b59b6, #8e44ad)" },
            { icon: <FaBookOpen />, label: "List Products", path: "/my-listings", gradient: "linear-gradient(135deg, #1abc9c, #16a085)" },
            { icon: <FaUser />, label: "Setup Profile", path: "/profile", gradient: "linear-gradient(135deg, #e74c3c, #c0392b)" }
          ].map((action, i) => (
            <button 
              key={i} 
              className="hover-lift card-shine" 
              style={styles.premiumQuickBtn} 
              onClick={() => handleActionClick(action.path)}
              onMouseEnter={() => setHoveredCard(`action-${i}`)}
              onMouseLeave={() => setHoveredCard(null)}
              disabled={isLoading[action.path]}
            >
              <div style={{ ...styles.premiumQuickIcon, background: action.gradient }} className="float-animation">
                {action.icon}
              </div>
              <span style={styles.premiumQuickLabel}>{action.label}</span>
              {isLoading[action.path] && (
                <div style={styles.actionLoader}>
                  <div className="loading-spinner"></div>
                </div>
              )}
              {hoveredCard === `action-${i}` && !isLoading[action.path] && (
                <div style={styles.actionGlow}></div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ========== SECTION 5: FARM OVERVIEW ========== */}
      <div style={styles.sectionSpacer}>
        <h3 style={styles.premiumSubSectionTitle} className="slide-in-right">
          <FaTree style={{ marginRight: "10px", color: "#27ae60" }} className="float-animation" />
          Farm Overview
        </h3>
        <div style={styles.premiumTwoColumn}>
          <div className="hover-lift card-shine" style={styles.premiumOverviewCard}>
            <div style={styles.premiumCardHeader}>
              <div style={styles.cardHeaderIcon}>
                <FaLeaf style={{ color: "#27ae60", fontSize: "1.5rem" }} className="spin-slow" />
              </div>
              <h4 style={styles.premiumCardTitle}>Crop Health Summary</h4>
            </div>
            <ul style={styles.premiumList}>
              <li className="hover-scale">
                <FaCheckCircle style={{ color: "#27ae60", marginRight: "10px" }} className="glow-pulse" /> 
                All crops: Ready for monitoring
              </li>
              <li className="hover-scale">
                <FaCalendarAlt style={{ color: "#3498db", marginRight: "10px" }} className="float-animation" /> 
                Next harvest: Not scheduled
              </li>
              <li className="hover-scale">
                <FaExclamationTriangle style={{ color: "#f39c12", marginRight: "10px" }} className="shake-on-hover" /> 
                Active alerts: None
              </li>
            </ul>
            <button 
              style={styles.premiumOutlineBtn}
              className="ripple-effect hover-glow"
              onClick={() => handleActionClick('/crops')}
            >
              Manage Crops →
            </button>
          </div>
          
          <div className="hover-lift card-shine" style={styles.premiumOverviewCard}>
            <div style={styles.premiumCardHeader}>
              <div style={styles.cardHeaderIcon}>
                <FaCloudSun style={{ color: "#3498db", fontSize: "1.5rem" }} className="float-animation" />
              </div>
              <h4 style={styles.premiumCardTitle}>Current Weather</h4>
            </div>
            <div style={styles.premiumWeather}>
              <div style={styles.weatherIconContainer} className="rotate-3d">
                <FaTemperatureHigh style={{ fontSize: "3rem", color: "#3498db" }} />
              </div>
              <div>
                <div style={styles.premiumTemp}>--°C</div>
                <div style={styles.premiumCond}>--</div>
              </div>
            </div>
            <div style={styles.premiumWeatherDetails}>
              <span className="hover-scale">
                <FaTint style={{ color: "#27ae60", marginRight: "5px" }} className="float-animation" /> 
                Humidity: --%
              </span>
              <span className="hover-scale">
                <FaWind style={{ color: "#3498db", marginRight: "5px" }} className="spin-slow" /> 
                Wind: -- km/h
              </span>
            </div>
            <button 
              style={styles.premiumOutlineBtn}
              className="ripple-effect hover-glow"
              onClick={() => handleActionClick('/farm-advisor')}
            >
              Full Forecast →
            </button>
          </div>
        </div>
      </div>

      {/* ========== SECTION 6: TODAY'S TASKS ========== */}
      <div style={styles.sectionSpacer}>
        <h3 style={styles.premiumSubSectionTitle} className="slide-in-left">
          <FaRegClock style={{ marginRight: "10px", color: "#27ae60" }} className="spin-slow" />
          Today's Tasks
        </h3>
        <div className="hover-lift card-shine" style={styles.premiumTaskCard}>
          <div style={styles.premiumTaskHeader}>
            <span className="gradient-text-animate">0 of 0 completed</span>
            <div style={styles.taskProgressBar}>
              <div style={{...styles.taskProgressFill, width: '0%'}}></div>
            </div>
          </div>
          <div style={styles.premiumTaskEmpty}>
            <div style={styles.taskEmptyIcon} className="float-animation">
              <FaCheckCircle style={{ fontSize: '3rem', color: '#27ae60' }} />
            </div>
            <p>✓ No tasks scheduled. Go to Farm Advisor to plan your day.</p>
            <button 
              style={styles.premiumGradientBtn} 
              onClick={() => handleActionClick("/farm-advisor")}
              className="ripple-effect hover-glow"
            >
              Plan My Day →
            </button>
          </div>
        </div>
      </div>

      {/* ========== SECTION 7: MARKET SNAPSHOT ========== */}
      <div style={styles.sectionSpacer}>
        <h3 style={styles.premiumSubSectionTitle} className="slide-in-right">
          <FaChartLine style={{ marginRight: "10px", color: "#27ae60" }} className="glow-pulse" />
          Market Snapshot
        </h3>
        <div className="hover-lift card-shine" style={styles.premiumTableCard}>
          <table style={styles.premiumTable}>
            <thead>
              <tr>
                <th>Crop</th>
                <th>Market</th>
                <th>Price</th>
                <th>Change</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {[1,2,3].map(i => (
                <tr key={i} className="hover-scale">
                  <td><span style={styles.premiumCrop}>—</span></td>
                  <td>—</td>
                  <td><span style={styles.premiumPrice}>—</span></td>
                  <td><span style={styles.premiumChange}>—</span></td>
                  <td>
                    <button 
                      style={styles.premiumSmallBtn}
                      className="ripple-effect hover-glow"
                    >
                      Set Alert
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button 
            style={styles.premiumOutlineBtn} 
            onClick={() => handleActionClick("/market-prices")}
            className="ripple-effect hover-glow"
          >
            View All Prices →
          </button>
        </div>
      </div>

      {/* ========== SECTION 8: RECENT ACTIVITY & NOTIFICATIONS ========== */}
      <div style={styles.sectionSpacer}>
        <div style={styles.premiumTwoColumn}>
          <div className="hover-lift card-shine" style={styles.premiumInfoCard}>
            <div style={styles.premiumCardHeader}>
              <div style={styles.cardHeaderIcon}>
                <FaClock style={{ color: "#3498db", fontSize: "1.5rem" }} className="spin-slow" />
              </div>
              <h4 style={styles.premiumCardTitle}>Recent Activity</h4>
            </div>
            <div style={styles.premiumEmptyState}>
              <div style={styles.premiumEmptyIcon} className="float-animation">📋</div>
              <p>No recent activity</p>
              <p style={styles.premiumEmptySub}>Your actions will appear here</p>
            </div>
            <button 
              style={styles.premiumOutlineBtn}
              className="ripple-effect hover-glow"
            >
              View All History →
            </button>
          </div>
          
          <div className="hover-lift card-shine" style={styles.premiumInfoCard}>
            <div style={styles.premiumCardHeader}>
              <div style={styles.cardHeaderIcon}>
                <FaBell style={{ color: "#e74c3c", fontSize: "1.5rem" }} className="shake-on-hover" />
              </div>
              <h4 style={styles.premiumCardTitle}>Notifications</h4>
            </div>
            <div style={styles.premiumEmptyState}>
              <div style={styles.premiumEmptyIcon} className="float-animation">🔔</div>
              <p>No new notifications</p>
              <p style={styles.premiumEmptySub}>Check back later</p>
            </div>
            <button 
              style={styles.premiumOutlineBtn}
              className="ripple-effect hover-glow"
            >
              View All →
            </button>
          </div>
        </div>
      </div>

      {/* ========== SECTION 9: FARMING TIPS & RESOURCES ========== */}
      <div style={styles.sectionSpacer}>
        <div style={styles.premiumTwoColumn}>
          <div className="hover-lift card-shine" style={styles.premiumTipCard}>
            <div style={styles.premiumCardHeader}>
              <div style={styles.cardHeaderIcon}>
                <FaLightbulb style={{ color: "#f39c12", fontSize: "1.5rem" }} className="glow-pulse" />
              </div>
              <h4 style={styles.premiumCardTitle}>Farming Tip</h4>
            </div>
            <p style={styles.premiumTipText}>
              "Start your day early. Water crops before 8 AM to reduce evaporation and prevent fungal diseases."
            </p>
            <button 
              style={styles.premiumOutlineBtn}
              className="ripple-effect hover-glow"
            >
              More Tips →
            </button>
          </div>
          
          <div className="hover-lift card-shine" style={styles.premiumTipCard}>
            <div style={styles.premiumCardHeader}>
              <div style={styles.cardHeaderIcon}>
                <FaBookOpen style={{ color: "#27ae60", fontSize: "1.5rem" }} className="float-animation" />
              </div>
              <h4 style={styles.premiumCardTitle}>Resources</h4>
            </div>
            <ul style={styles.premiumResourceList}>
              {['Crop Calendar', 'Pest Management Guide', 'Fertilizer Calculator', 'Government Schemes'].map((item, i) => (
                <li key={i} className="hover-scale">
                  <span style={styles.resourceDot}>•</span> {item}
                </li>
              ))}
            </ul>
            <button 
              style={styles.premiumOutlineBtn}
              className="ripple-effect hover-glow"
            >
              Browse Resources →
            </button>
          </div>
        </div>
      </div>

      {/* ========== SECTION 10: PREMIUM FOOTER ========== */}
      <div className="hover-lift card-shine" style={styles.premiumFooter}>
        <div style={styles.premiumSocialLinks}>
          {[FaFacebook, FaTwitter, FaInstagram, FaLinkedin].map((Icon, i) => (
            <Icon key={i} style={styles.socialIcon} className="hover-glow bounce-on-hover" />
          ))}
        </div>
        <div style={styles.premiumContact}>
          <span className="hover-scale"><FaPhone className="shake-on-hover" /> 1800-123-4567</span>
          <span className="hover-scale"><FaEnvelope className="float-animation" /> support@agriconnect.com</span>
        </div>
        <div style={styles.premiumCopyright}>
          © 2026 AgriConnect. All rights reserved. Made with 
          <FaHeart style={{ color: "#e74c3c", margin: "0 5px" }} className="heartbeat" /> 
          for Indian Farmers
        </div>
        <div style={styles.footerSparkles}>
          <FaStar className="float-animation" style={{ fontSize: '1rem', opacity: 0.3 }} />
          <FaStar className="float-slow" style={{ fontSize: '1.5rem', opacity: 0.2 }} />
          <FaStar className="spin-slow" style={{ fontSize: '0.8rem', opacity: 0.4 }} />
        </div>
      </div>

      {/* Back to Top Button */}
      <button 
        style={styles.backToTop}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="hover-lift"
      >
        <FaArrowRight style={{ transform: 'rotate(-90deg)' }} />
      </button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "30px 20px",
    fontFamily: "'Poppins', 'Inter', sans-serif",
    background: "linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)",
    position: "relative",
    minHeight: "100vh"
  },
  
  particleContainer: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
    zIndex: 0
  },
  
  sectionSpacer: {
    marginBottom: "50px",
    position: "relative",
    zIndex: 1
  },
  
  // ========== HEADER STYLES ==========
  premiumGlassHeader: {
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "24px",
    padding: "25px 30px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    position: "relative",
    overflow: "hidden"
  },
  welcomeBadge: {
    display: "inline-flex",
    alignItems: "center",
    background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)",
    padding: "6px 16px",
    borderRadius: "30px",
    color: "white",
    fontSize: "0.8rem",
    fontWeight: "600",
    marginBottom: "12px",
    letterSpacing: "0.5px",
    boxShadow: "0 5px 15px rgba(39, 174, 96, 0.3)"
  },
  badgeIcon: {
    marginRight: "6px",
    fontSize: "0.9rem"
  },
  greeting: {
    fontSize: "2rem",
    margin: "0 0 8px 0",
    color: "#1e293b",
    fontWeight: "700"
  },
  gradientText: {
    background: "linear-gradient(135deg, #27ae60, #2ecc71)",
    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent"
  },
  userMeta: {
    display: "flex",
    gap: "20px",
    color: "#64748b",
    flexWrap: "wrap"
  },
  metaItem: {
    display: "flex",
    alignItems: "center",
    gap: "6px",
    fontSize: "0.9rem",
    cursor: "default",
    padding: "4px 8px",
    borderRadius: "8px",
    transition: "all 0.3s"
  },
  metaIcon: {
    color: "#27ae60"
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },
  userAvatar: {
    background: "linear-gradient(135deg, #27ae60, #2ecc71)",
    width: "45px",
    height: "45px",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    boxShadow: "0 5px 15px rgba(39, 174, 96, 0.3)"
  },
  avatarIcon: {
    color: "white",
    fontSize: "1.2rem"
  },
  premiumNotification: {
    position: "relative",
    background: "white",
    padding: "12px",
    borderRadius: "50%",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
    cursor: "pointer"
  },
  bellIcon: {
    fontSize: "1.2rem",
    color: "#475569"
  },
  notificationPulse: {
    position: "absolute",
    top: "8px",
    right: "8px",
    width: "8px",
    height: "8px",
    background: "#27ae60",
    borderRadius: "50%",
    animation: "pulse-glow 2s infinite"
  },
  notificationDropdown: {
    position: "absolute",
    top: "50px",
    right: "0",
    background: "white",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
    minWidth: "200px",
    zIndex: 100
  },
  
  // ========== STATS CARDS ==========
  statsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "20px"
  },
  premiumStatCard: {
    background: "white",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
    border: "1px solid rgba(39, 174, 96, 0.1)",
    display: "flex",
    alignItems: "center",
    gap: "15px",
    position: "relative",
    overflow: "hidden"
  },
  premiumStatIcon: {
    width: "60px",
    height: "60px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "26px",
    color: "white",
    transition: "all 0.3s"
  },
  statContent: {
    flex: 1
  },
  statLabel: {
    fontSize: "0.85rem",
    color: "#64748b",
    marginBottom: "4px",
    textTransform: "uppercase",
    letterSpacing: "0.5px"
  },
  statValue: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#1e293b",
    marginBottom: "2px"
  },
  statSublabel: {
    fontSize: "0.75rem",
    color: "#94a3b8"
  },
  statSparkle: {
    position: "absolute",
    top: "-50%",
    right: "-50%",
    width: "100%",
    height: "100%",
    background: "radial-gradient(circle, rgba(255,255,255,0.8) 0%, transparent 70%)",
    animation: "rotateScale 1s ease-out"
  },
  
  // ========== SECTION TITLES ==========
  premiumSectionTitle: {
    fontSize: "2rem",
    textAlign: "center",
    margin: "0 0 8px 0",
    fontWeight: "700"
  },
  premiumSubtitle: {
    fontSize: "1rem",
    color: "#64748b",
    textAlign: "center",
    marginBottom: "25px"
  },
  premiumSubSectionTitle: {
    fontSize: "1.5rem",
    color: "#1e293b",
    margin: "0 0 20px 0",
    fontWeight: "600",
    display: "flex",
    alignItems: "center"
  },
  
  // ========== FEATURES GRID ==========
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "25px"
  },
  premiumFeatureCard: {
    background: "white",
    borderRadius: "24px",
    overflow: "hidden",
    boxShadow: "0 15px 30px rgba(0,0,0,0.05)",
    border: "1px solid rgba(39, 174, 96, 0.1)",
    position: "relative"
  },
  premiumImageWrapper: {
    position: "relative",
    height: "160px",
    overflow: "hidden"
  },
  premiumFeatureImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.5s"
  },
  premiumFeatureBadge: {
    position: "absolute",
    bottom: "12px",
    right: "12px",
    background: "white",
    width: "45px",
    height: "45px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.3rem",
    color: "#27ae60",
    boxShadow: "0 5px 15px rgba(0,0,0,0.1)"
  },
  featureOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(39, 174, 96, 0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    animation: "fadeIn 0.3s ease-out"
  },
  premiumFeatureContent: {
    padding: "20px"
  },
  premiumFeatureTitle: {
    fontSize: "1.2rem",
    margin: "0 0 8px 0",
    color: "#1e293b",
    fontWeight: "600"
  },
  premiumFeatureDesc: {
    fontSize: "0.9rem",
    color: "#64748b",
    marginBottom: "15px",
    lineHeight: 1.5
  },
  premiumFeatureBtn: {
    width: "100%",
    background: "linear-gradient(135deg, #27ae60, #2ecc71)",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "12px",
    fontSize: "0.95rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.3s"
  },
  
  // ========== QUICK ACTIONS 3x2 GRID ==========
  quickActions3x2Grid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "15px"
  },
  premiumQuickBtn: {
    background: "white",
    border: "1px solid rgba(39, 174, 96, 0.15)",
    borderRadius: "18px",
    padding: "18px 12px",
    cursor: "pointer",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "10px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.02)",
    position: "relative",
    overflow: "hidden"
  },
  premiumQuickIcon: {
    width: "48px",
    height: "48px",
    borderRadius: "14px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.4rem",
    color: "white"
  },
  premiumQuickLabel: {
    fontSize: "0.9rem",
    fontWeight: "500",
    color: "#475569"
  },
  actionLoader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "rgba(255,255,255,0.8)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  actionGlow: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "150%",
    height: "150%",
    background: "radial-gradient(circle, rgba(39,174,96,0.2) 0%, transparent 70%)",
    transform: "translate(-50%, -50%)",
    animation: "pulse-glow 1s infinite"
  },
  
  // ========== FARM OVERVIEW ==========
  premiumTwoColumn: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "20px"
  },
  premiumOverviewCard: {
    background: "white",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
    border: "1px solid rgba(39, 174, 96, 0.1)"
  },
  premiumCardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px"
  },
  cardHeaderIcon: {
    width: "40px",
    height: "40px",
    background: "rgba(39, 174, 96, 0.1)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  premiumCardTitle: {
    fontSize: "1.1rem",
    margin: 0,
    color: "#1e293b"
  },
  premiumList: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 20px 0"
  },
  premiumWeather: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "15px"
  },
  weatherIconContainer: {
    width: "60px",
    height: "60px",
    background: "rgba(52, 152, 219, 0.1)",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  premiumTemp: {
    fontSize: "1.8rem",
    fontWeight: "700",
    color: "#1e293b"
  },
  premiumCond: {
    color: "#64748b"
  },
  premiumWeatherDetails: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px"
  },
  
  // ========== TASKS ==========
  premiumTaskCard: {
    background: "white",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
    border: "1px solid rgba(39, 174, 96, 0.1)"
  },
  premiumTaskHeader: {
    marginBottom: "15px",
    fontSize: "1rem"
  },
  taskProgressBar: {
    width: "100%",
    height: "6px",
    background: "#e2e8f0",
    borderRadius: "3px",
    marginTop: "10px",
    overflow: "hidden"
  },
  taskProgressFill: {
    height: "100%",
    background: "linear-gradient(90deg, #27ae60, #2ecc71)",
    borderRadius: "3px",
    transition: "width 0.3s"
  },
  premiumTaskEmpty: {
    textAlign: "center",
    padding: "25px",
    background: "#f8fafc",
    borderRadius: "16px",
    border: "2px dashed #27ae60"
  },
  taskEmptyIcon: {
    marginBottom: "15px"
  },
  premiumGradientBtn: {
    background: "linear-gradient(135deg, #27ae60, #2ecc71)",
    color: "white",
    border: "none",
    padding: "10px 25px",
    borderRadius: "10px",
    fontSize: "0.95rem",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "10px",
    position: "relative",
    overflow: "hidden"
  },
  
  // ========== MARKET TABLE ==========
  premiumTableCard: {
    background: "white",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
    border: "1px solid rgba(39, 174, 96, 0.1)",
    overflowX: "auto"
  },
  premiumTable: {
    width: "100%",
    borderCollapse: "collapse",
    marginBottom: "15px"
  },
  premiumCrop: {
    fontWeight: "600",
    color: "#1e293b"
  },
  premiumPrice: {
    fontWeight: "600",
    color: "#27ae60"
  },
  premiumChange: {
    color: "#64748b"
  },
  premiumSmallBtn: {
    background: "linear-gradient(135deg, #27ae60, #2ecc71)",
    color: "white",
    border: "none",
    padding: "5px 10px",
    borderRadius: "6px",
    fontSize: "0.75rem",
    cursor: "pointer",
    position: "relative",
    overflow: "hidden"
  },
  premiumOutlineBtn: {
    background: "none",
    border: "2px solid #27ae60",
    color: "#27ae60",
    padding: "10px 20px",
    borderRadius: "10px",
    fontSize: "0.9rem",
    fontWeight: "600",
    cursor: "pointer",
    width: "100%",
    transition: "all 0.3s",
    position: "relative",
    overflow: "hidden"
  },
  
  // ========== INFO CARDS ==========
  premiumInfoCard: {
    background: "white",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
    border: "1px solid rgba(39, 174, 96, 0.1)"
  },
  premiumEmptyState: {
    textAlign: "center",
    padding: "20px",
    background: "#f8fafc",
    borderRadius: "14px",
    marginBottom: "15px"
  },
  premiumEmptyIcon: {
    fontSize: "2.5rem",
    marginBottom: "8px"
  },
  premiumEmptySub: {
    fontSize: "0.8rem",
    color: "#94a3b8"
  },
  
  // ========== TIP CARDS ==========
  premiumTipCard: {
    background: "white",
    borderRadius: "20px",
    padding: "20px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.03)",
    border: "1px solid rgba(39, 174, 96, 0.1)"
  },
  premiumTipText: {
    fontSize: "0.95rem",
    color: "#475569",
    fontStyle: "italic",
    lineHeight: 1.6,
    marginBottom: "15px"
  },
  premiumResourceList: {
    listStyle: "none",
    padding: 0,
    margin: "0 0 15px 0"
  },
  resourceDot: {
    color: "#27ae60",
    marginRight: "8px",
    fontSize: "1rem"
  },
  
  // ========== FOOTER ==========
  premiumFooter: {
    background: "linear-gradient(135deg, #1e293b, #0f172a)",
    color: "white",
    padding: "30px",
    borderRadius: "24px",
    textAlign: "center",
    marginTop: "20px",
    position: "relative",
    overflow: "hidden"
  },
  premiumSocialLinks: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    marginBottom: "20px"
  },
  socialIcon: {
    fontSize: "1.4rem",
    cursor: "pointer",
    color: "white",
    opacity: 0.8,
    transition: "all 0.3s"
  },
  premiumContact: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    marginBottom: "15px",
    color: "#cbd5e1"
  },
  premiumCopyright: {
    fontSize: "0.9rem",
    opacity: 0.7,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  footerSparkles: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    pointerEvents: "none",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
  },
  
  // ========== BACK TO TOP ==========
  backToTop: {
    position: "fixed",
    bottom: "30px",
    right: "30px",
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    background: "linear-gradient(135deg, #27ae60, #2ecc71)",
    color: "white",
    border: "none",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 5px 20px rgba(39, 174, 96, 0.4)",
    zIndex: 1000,
    transition: "all 0.3s"
  }
};

export default Dashboard;