import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { 
  FaLeaf, FaTractor, FaShippingFast, FaShieldAlt, 
  FaChartLine, FaUsers, FaSeedling, FaMobileAlt,
  FaCheckCircle, FaArrowRight, FaStar, FaRupeeSign,
  FaCloudSun, FaWater, FaHandHoldingHeart
} from "react-icons/fa";

function Home() {
  const [stats, setStats] = useState({
    farmers: 1349,
    crops: 5796,
    orders: 8900,
    earnings: "4.2Cr"
  });

  useEffect(() => {
    // Animated counter effect
    const interval = setInterval(() => {
      setStats(prev => ({
        ...prev,
        farmers: prev.farmers + Math.floor(Math.random() * 3),
        crops: prev.crops + Math.floor(Math.random() * 5),
        orders: prev.orders + Math.floor(Math.random() * 4)
      }));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={styles.container}>
      {/* ============ HERO SECTION ============ */}
      <section style={styles.hero}>
        <div style={styles.heroGrid}>
          <div style={styles.heroContent}>
            <div style={styles.badge}>
              <FaLeaf style={{ marginRight: "8px" }} /> India's #1 Agritech Platform
            </div>
            <h1 style={styles.heroTitle}>
              <span style={styles.heroTitleAccent}>AgriConnect</span>
              <br />
              Empowering Farmers with 
              <span style={styles.heroHighlight}> Smart Technology</span>
            </h1>
            <p style={styles.heroSubtitle}>
              India's premier digital marketplace connecting farmers directly with buyers. 
              Streamline your farming operations, maximize profits, and grow sustainably.
            </p>
            <div style={styles.heroButtons}>
              <Link to="/register" style={styles.primaryButton}>
                Get Started Free <FaArrowRight style={{ marginLeft: "10px" }} />
              </Link>
              <Link to="/login" style={styles.secondaryButton}>
                Sign In
              </Link>
            </div>
            <div style={styles.heroTrust}>
              <span style={styles.trustItem}>
                <FaCheckCircle style={{ color: "#27ae60", marginRight: "5px" }} /> No credit card required
              </span>
              <span style={styles.trustItem}>
                <FaCheckCircle style={{ color: "#27ae60", marginRight: "5px" }} /> 30-day free trial
              </span>
              <span style={styles.trustItem}>
                <FaCheckCircle style={{ color: "#27ae60", marginRight: "5px" }} /> Cancel anytime
              </span>
            </div>
          </div>
          
          <div style={styles.heroVisual}>
            <div style={styles.heroCard}>
              <div style={styles.heroCardHeader}>
                <FaLeaf style={{ fontSize: "32px", color: "#27ae60" }} />
                <h3 style={{ color: "#2c3e50", margin: 0 }}>Digital Farm</h3>
              </div>
              <div style={styles.heroStats}>
                <div style={styles.heroStat}>
                  <span style={styles.heroStatLabel}>Active Farmers</span>
                  <span style={styles.heroStatValue}>1,349</span>
                </div>
                <div style={styles.heroStat}>
                  <span style={styles.heroStatLabel}>Today's Orders</span>
                  <span style={styles.heroStatValue}>128</span>
                </div>
                <div style={styles.heroStat}>
                  <span style={styles.heroStatLabel}>Avg. Price</span>
                  <span style={styles.heroStatValue}>₹2,275/qt</span>
                </div>
              </div>
              <div style={styles.heroCardFooter}>
                <span style={styles.trending}>📈 +23% this month</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ STATS SECTION ============ */}
      <section style={styles.statsSection}>
        <div style={styles.statsContainer}>
          <div style={styles.statCard}>
            <div style={{ ...styles.statIconWrapper, background: "linear-gradient(135deg, #3498db 0%, #2980b9 100%)" }}>
              <FaUsers />
            </div>
            <div style={styles.statContent}>
              <h3 style={styles.statValue}>{stats.farmers.toLocaleString()}</h3>
              <p style={styles.statLabel}>Active Farmers</p>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={{ ...styles.statIconWrapper, background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)" }}>
              <FaSeedling />
            </div>
            <div style={styles.statContent}>
              <h3 style={styles.statValue}>{stats.crops.toLocaleString()}</h3>
              <p style={styles.statLabel}>Crops Listed</p>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={{ ...styles.statIconWrapper, background: "linear-gradient(135deg, #e74c3c 0%, #c0392b 100%)" }}>
              <FaShippingFast />
            </div>
            <div style={styles.statContent}>
              <h3 style={styles.statValue}>{stats.orders.toLocaleString()}</h3>
              <p style={styles.statLabel}>Orders Delivered</p>
            </div>
          </div>
          
          <div style={styles.statCard}>
            <div style={{ ...styles.statIconWrapper, background: "linear-gradient(135deg, #f39c12 0%, #e67e22 100%)" }}>
              <FaRupeeSign />
            </div>
            <div style={styles.statContent}>
              <h3 style={styles.statValue}>₹{stats.earnings}</h3>
              <p style={styles.statLabel}>Total Earnings</p>
            </div>
          </div>
        </div>
      </section>

      {/* ============ FEATURES SECTION ============ */}
      <section style={styles.featuresSection}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionBadge}>WHY CHOOSE US</span>
          <h2 style={styles.sectionTitle}>
            Revolutionizing Agriculture with 
            <span style={styles.sectionHighlight}> Cutting-Edge Features</span>
          </h2>
        </div>
        
        <div style={styles.featuresGrid}>
          <div style={styles.featureCard}>
            <div style={styles.featureIconWrapper}>
              <FaTractor style={styles.featureIcon} />
            </div>
            <h3 style={styles.featureTitle}>Smart Farming Tools</h3>
            <p style={styles.featureDesc}>
              AI-powered crop recommendations, weather alerts, and soil health monitoring for optimal yield.
            </p>
            <Link to="/" style={styles.featureLink}>
              Learn more <FaArrowRight style={{ marginLeft: "8px", fontSize: "12px" }} />
            </Link>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIconWrapper}>
              <FaHandHoldingHeart style={styles.featureIcon} />
            </div>
            <h3 style={styles.featureTitle}>Direct Marketplace</h3>
            <p style={styles.featureDesc}>
              Sell directly to buyers without middlemen. Get 30% better prices for your premium produce.
            </p>
            <Link to="/" style={styles.featureLink}>
              Learn more <FaArrowRight style={{ marginLeft: "8px", fontSize: "12px" }} />
            </Link>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIconWrapper}>
              <FaShippingFast style={styles.featureIcon} />
            </div>
            <h3 style={styles.featureTitle}>Logistics Support</h3>
            <p style={styles.featureDesc}>
              End-to-end supply chain management with real-time tracking and temperature-controlled delivery.
            </p>
            <Link to="/" style={styles.featureLink}>
              Learn more <FaArrowRight style={{ marginLeft: "8px", fontSize: "12px" }} />
            </Link>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIconWrapper}>
              <FaShieldAlt style={styles.featureIcon} />
            </div>
            <h3 style={styles.featureTitle}>Secure Payments</h3>
            <p style={styles.featureDesc}>
              Bank-grade escrow protection with instant settlements. 100% payment guarantee for every transaction.
            </p>
            <Link to="/" style={styles.featureLink}>
              Learn more <FaArrowRight style={{ marginLeft: "8px", fontSize: "12px" }} />
            </Link>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIconWrapper}>
              <FaChartLine style={styles.featureIcon} />
            </div>
            <h3 style={styles.featureTitle}>Analytics Dashboard</h3>
            <p style={styles.featureDesc}>
              Track earnings, crop performance, and market trends with real-time insights and predictions.
            </p>
            <Link to="/" style={styles.featureLink}>
              Learn more <FaArrowRight style={{ marginLeft: "8px", fontSize: "12px" }} />
            </Link>
          </div>

          <div style={styles.featureCard}>
            <div style={styles.featureIconWrapper}>
              <FaMobileAlt style={styles.featureIcon} />
            </div>
            <h3 style={styles.featureTitle}>Mobile First</h3>
            <p style={styles.featureDesc}>
              Access all features from your smartphone. Works seamlessly even in low-network rural areas.
            </p>
            <Link to="/" style={styles.featureLink}>
              Learn more <FaArrowRight style={{ marginLeft: "8px", fontSize: "12px" }} />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section style={styles.worksSection}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionBadgeLight}>SIMPLE PROCESS</span>
          <h2 style={{ ...styles.sectionTitle, color: "white" }}>
            From Farm to Buyer in 
            <span style={{ color: "#ffd700" }}> 6 Easy Steps</span>
          </h2>
          <p style={{ ...styles.sectionSubtitle, color: "rgba(255,255,255,0.9)" }}>
            We've simplified the entire agricultural trading process
          </p>
        </div>

        <div style={styles.stepsContainer}>
          {[
            { number: "01", title: "Sign Up", desc: "Create your free account as farmer or buyer", icon: "📝" },
            { number: "02", title: "List Crops", desc: "Farmers list crops with quality certificates & pricing", icon: "🌾" },
            { number: "03", title: "Browse & Order", desc: "Buyers discover fresh produce and place orders", icon: "🔍" },
            { number: "04", title: "Secure Payment", desc: "100% advance payment held in escrow", icon: "💰" },
            { number: "05", title: "Quality Check", desc: "Third-party verification at pickup point", icon: "✅" },
            { number: "06", title: "Delivery & Earn", desc: "Timely delivery with instant settlement", icon: "🚜" }
          ].map((step, index) => (
            <div key={index} style={styles.stepCard}>
              <div style={styles.stepIcon}>{step.icon}</div>
              <span style={styles.stepNumber}>{step.number}</span>
              <h3 style={styles.stepTitle}>{step.title}</h3>
              <p style={styles.stepDesc}>{step.desc}</p>
              {index < 5 && <div style={styles.stepConnector}></div>}
            </div>
          ))}
        </div>
      </section>

      {/* ============ SUCCESS STORIES ============ */}
      <section style={styles.testimonialsSection}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionBadge}>SUCCESS STORIES</span>
          <h2 style={styles.sectionTitle}>
            Trusted by <span style={styles.sectionHighlight}>10,000+ Farmers</span>
          </h2>
          <p style={styles.sectionSubtitle}>
            Real stories from our growing community
          </p>
        </div>

        <div style={styles.testimonialsGrid}>
          <div style={styles.testimonialCard}>
            <div style={styles.testimonialRating}>
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} style={{ color: "#f39c12", marginRight: "4px" }} />
              ))}
            </div>
            <p style={styles.testimonialText}>
              "AgriConnect doubled my income by eliminating middlemen. The direct buyer connection is revolutionary! My wheat sold at 40% premium."
            </p>
            <div style={styles.testimonialAuthor}>
              <div style={styles.testimonialAvatar}>R</div>
              <div style={styles.testimonialInfo}>
                <h4 style={styles.testimonialName}>Rajesh Kumar</h4>
                <p style={styles.testimonialRole}>Farmer, Punjab</p>
                <span style={styles.testimonialBadge}>Verified Seller</span>
              </div>
            </div>
          </div>

          <div style={styles.testimonialCard}>
            <div style={styles.testimonialRating}>
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} style={{ color: "#f39c12", marginRight: "4px" }} />
              ))}
            </div>
            <p style={styles.testimonialText}>
              "Fresh produce directly from farms. Quality is exceptional and prices are 30% better than local mandi. The traceability feature is amazing!"
            </p>
            <div style={styles.testimonialAuthor}>
              <div style={styles.testimonialAvatar}>P</div>
              <div style={styles.testimonialInfo}>
                <h4 style={styles.testimonialName}>Priya Sharma</h4>
                <p style={styles.testimonialRole}>Buyer, Delhi</p>
                <span style={styles.testimonialBadge}>Premium Buyer</span>
              </div>
            </div>
          </div>

          <div style={styles.testimonialCard}>
            <div style={styles.testimonialRating}>
              {[...Array(4)].map((_, i) => (
                <FaStar key={i} style={{ color: "#f39c12", marginRight: "4px" }} />
              ))}
              <FaStar style={{ color: "#bdc3c7" }} />
            </div>
            <p style={styles.testimonialText}>
              "The crop management tools helped me increase yield by 40%. Payment security gives me peace of mind. Best decision for my farm!"
            </p>
            <div style={styles.testimonialAuthor}>
              <div style={styles.testimonialAvatar}>A</div>
              <div style={styles.testimonialInfo}>
                <h4 style={styles.testimonialName}>Arun Patel</h4>
                <p style={styles.testimonialRole}>Farmer, Gujarat</p>
                <span style={styles.testimonialBadge}>Top Producer</span>
              </div>
            </div>
          </div>
        </div>

        <div style={styles.testimonialsStats}>
          <div>
            <span style={styles.testimonialsStatValue}>4.8★</span>
            <span style={styles.testimonialsStatLabel}>Overall Rating</span>
          </div>
          <div>
            <span style={styles.testimonialsStatValue}>10k+</span>
            <span style={styles.testimonialsStatLabel}>Happy Farmers</span>
          </div>
          <div>
            <span style={styles.testimonialsStatValue}>95%</span>
            <span style={styles.testimonialsStatLabel}>Repeat Buyers</span>
          </div>
        </div>
      </section>

      {/* ============ CTA SECTION ============ */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle}>
            Ready to Transform Your Farming Journey?
          </h2>
          <p style={styles.ctaSubtitle}>
            Join <span style={{ fontWeight: "800", color: "#ffd700" }}>10,000+ farmers</span> already growing with AgriConnect
          </p>
          
          <div style={styles.ctaFeatures}>
            <div style={styles.ctaFeature}>
              <FaCheckCircle /> 30-day free trial
            </div>
            <div style={styles.ctaFeature}>
              <FaCheckCircle /> No credit card required
            </div>
            <div style={styles.ctaFeature}>
              <FaCheckCircle /> Cancel anytime
            </div>
          </div>

          <div style={styles.ctaButtons}>
            <Link to="/register" style={styles.primaryButtonLarge}>
              Start Free Trial <FaArrowRight style={{ marginLeft: "10px" }} />
            </Link>
            <Link to="/crops" style={styles.secondaryButtonLight}>
              Browse Marketplace
            </Link>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer style={styles.footer}>
        <div style={styles.footerMain}>
          <div style={styles.footerBrand}>
            <div style={styles.footerLogo}>
              <FaLeaf style={{ fontSize: "32px", color: "#27ae60", marginRight: "10px" }} />
              <span style={styles.footerLogoText}>AgriConnect</span>
            </div>
            <p style={styles.footerDesc}>
              India's fastest growing agritech platform, connecting farmers directly to buyers with transparency and trust.
            </p>
            <div style={styles.socialLinks}>
              <span style={styles.socialIcon}>📘</span>
              <span style={styles.socialIcon}>🐦</span>
              <span style={styles.socialIcon}>📷</span>
              <span style={styles.socialIcon}>📧</span>
            </div>
          </div>

          <div style={styles.footerLinks}>
            <div style={styles.footerColumn}>
              <h4 style={styles.footerHeading}>For Farmers</h4>
              <Link to="/register" style={styles.footerLink}>Register Farm</Link>
              <Link to="/crops" style={styles.footerLink}>Sell Crops</Link>
              <Link to="/dashboard" style={styles.footerLink}>Dashboard</Link>
              <Link to="/" style={styles.footerLink}>Pricing</Link>
            </div>

            <div style={styles.footerColumn}>
              <h4 style={styles.footerHeading}>For Buyers</h4>
              <Link to="/register" style={styles.footerLink}>Create Account</Link>
              <Link to="/crops" style={styles.footerLink}>Browse Crops</Link>
              <Link to="/orders" style={styles.footerLink}>Track Orders</Link>
              <Link to="/" style={styles.footerLink}>Become Partner</Link>
            </div>

            <div style={styles.footerColumn}>
              <h4 style={styles.footerHeading}>Resources</h4>
              <Link to="/" style={styles.footerLink}>Blog</Link>
              <Link to="/" style={styles.footerLink}>Help Center</Link>
              <Link to="/" style={styles.footerLink}>Market Trends</Link>
              <Link to="/" style={styles.footerLink}>Farmer Stories</Link>
            </div>

            <div style={styles.footerColumn}>
              <h4 style={styles.footerHeading}>Company</h4>
              <Link to="/" style={styles.footerLink}>About Us</Link>
              <Link to="/" style={styles.footerLink}>Careers</Link>
              <Link to="/" style={styles.footerLink}>Contact</Link>
              <Link to="/" style={styles.footerLink}>Privacy Policy</Link>
            </div>
          </div>
        </div>

        <div style={styles.footerBottom}>
          <div style={styles.footerStats}>
            <span>📍 Serving 20+ states across India</span>
            <span>🌾 50,000+ tons of produce traded</span>
            <span>💳 100% secure payments</span>
          </div>
          <div style={styles.copyright}>
            <p>© 2026 AgriConnect Technologies Pvt. Ltd. All rights reserved.</p>
            <p style={{ fontSize: "12px", marginTop: "8px", opacity: 0.7 }}>
              Made with ❤️ for Indian Farmers
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1440px",
    margin: "0 auto",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif"
  },

  // ============ HERO SECTION ============
  hero: {
    background: "linear-gradient(145deg, #ffffff 0%, #f8fafc 100%)",
    borderRadius: "32px",
    margin: "20px",
    padding: "60px 40px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.02)",
    border: "1px solid rgba(255,255,255,0.5)"
  },
  heroGrid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "60px",
    alignItems: "center"
  },
  heroContent: {
    maxWidth: "600px"
  },
  badge: {
    display: "inline-flex",
    alignItems: "center",
    background: "rgba(39, 174, 96, 0.1)",
    color: "#27ae60",
    padding: "8px 20px",
    borderRadius: "50px",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "30px"
  },
  heroTitle: {
    fontSize: "3.2rem",
    color: "#1e293b",
    marginBottom: "25px",
    lineHeight: 1.2,
    fontWeight: "700"
  },
  heroTitleAccent: {
    color: "#27ae60",
    fontSize: "3.5rem"
  },
  heroHighlight: {
    color: "#e74c3c",
    borderBottom: "4px solid #e74c3c",
    paddingBottom: "5px"
  },
  heroSubtitle: {
    fontSize: "1.2rem",
    color: "#64748b",
    marginBottom: "40px",
    lineHeight: 1.7
  },
  heroButtons: {
    display: "flex",
    gap: "20px",
    marginBottom: "30px"
  },
  primaryButton: {
    background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)",
    color: "white",
    padding: "16px 40px",
    borderRadius: "50px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "1.1rem",
    display: "flex",
    alignItems: "center",
    transition: "all 0.3s",
    border: "none",
    cursor: "pointer",
    boxShadow: "0 10px 20px rgba(39, 174, 96, 0.2)"
  },
  secondaryButton: {
    background: "transparent",
    color: "#27ae60",
    padding: "16px 40px",
    borderRadius: "50px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "1.1rem",
    display: "inline-block",
    transition: "all 0.3s",
    border: "2px solid #27ae60"
  },
  heroTrust: {
    display: "flex",
    gap: "25px",
    marginTop: "20px"
  },
  trustItem: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    color: "#475569"
  },
  heroVisual: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  heroCard: {
    background: "white",
    borderRadius: "24px",
    padding: "30px",
    boxShadow: "0 25px 50px rgba(0,0,0,0.05)",
    width: "100%",
    maxWidth: "400px",
    border: "1px solid #f1f5f9"
  },
  heroCardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "15px",
    marginBottom: "25px",
    paddingBottom: "20px",
    borderBottom: "1px solid #e2e8f0"
  },
  heroStats: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
    marginBottom: "25px"
  },
  heroStat: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },
  heroStatLabel: {
    color: "#64748b",
    fontSize: "15px"
  },
  heroStatValue: {
    color: "#1e293b",
    fontWeight: "700",
    fontSize: "18px"
  },
  heroCardFooter: {
    background: "#f8fafc",
    padding: "15px",
    borderRadius: "12px",
    textAlign: "center"
  },
  trending: {
    color: "#27ae60",
    fontWeight: "600",
    fontSize: "14px"
  },

  // ============ STATS SECTION ============
  statsSection: {
    padding: "40px 20px",
    margin: "20px"
  },
  statsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "25px"
  },
  statCard: {
    background: "white",
    borderRadius: "20px",
    padding: "25px",
    display: "flex",
    alignItems: "center",
    gap: "20px",
    boxShadow: "0 5px 20px rgba(0,0,0,0.02)",
    border: "1px solid #f1f5f9",
    transition: "all 0.3s"
  },
  statIconWrapper: {
    width: "60px",
    height: "60px",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "24px",
    color: "white"
  },
  statContent: {
    flex: 1
  },
  statValue: {
    fontSize: "1.8rem",
    color: "#1e293b",
    margin: "0 0 5px 0",
    fontWeight: "700"
  },
  statLabel: {
    fontSize: "0.9rem",
    color: "#64748b",
    margin: 0
  },

  // ============ FEATURES SECTION ============
  featuresSection: {
    padding: "80px 40px",
    background: "white",
    margin: "20px",
    borderRadius: "32px"
  },
  sectionHeader: {
    textAlign: "center",
    marginBottom: "60px"
  },
  sectionBadge: {
    background: "rgba(39, 174, 96, 0.1)",
    color: "#27ae60",
    padding: "8px 24px",
    borderRadius: "50px",
    fontSize: "14px",
    fontWeight: "600",
    display: "inline-block",
    marginBottom: "20px",
    letterSpacing: "1px"
  },
  sectionBadgeLight: {
    background: "rgba(255,255,255,0.15)",
    color: "white",
    padding: "8px 24px",
    borderRadius: "50px",
    fontSize: "14px",
    fontWeight: "600",
    display: "inline-block",
    marginBottom: "20px",
    letterSpacing: "1px",
    backdropFilter: "blur(10px)"
  },
  sectionTitle: {
    fontSize: "2.5rem",
    color: "#1e293b",
    margin: "0 0 20px 0",
    fontWeight: "700"
  },
  sectionHighlight: {
    color: "#27ae60"
  },
  sectionSubtitle: {
    fontSize: "1.1rem",
    color: "#64748b",
    margin: 0
  },
  featuresGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "30px",
    marginTop: "40px"
  },
  featureCard: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: "35px 25px",
    transition: "all 0.3s",
    border: "1px solid #f1f5f9",
    position: "relative",
    overflow: "hidden"
  },
  featureIconWrapper: {
    width: "70px",
    height: "70px",
    background: "linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%)",
    borderRadius: "18px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "30px",
    color: "#27ae60",
    marginBottom: "25px"
  },
  featureIcon: {
    fontSize: "32px"
  },
  featureTitle: {
    fontSize: "1.3rem",
    color: "#1e293b",
    marginBottom: "15px",
    fontWeight: "600"
  },
  featureDesc: {
    color: "#64748b",
    lineHeight: 1.7,
    marginBottom: "20px",
    fontSize: "0.95rem"
  },
  featureLink: {
    color: "#27ae60",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "0.95rem",
    display: "flex",
    alignItems: "center"
  },

  // ============ HOW IT WORKS ============
  worksSection: {
    background: "linear-gradient(145deg, #0b3b2c 0%, #1a4d3e 100%)",
    borderRadius: "32px",
    padding: "80px 40px",
    margin: "20px",
    color: "white"
  },
  stepsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "20px",
    marginTop: "50px",
    position: "relative"
  },
  stepCard: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "30px 20px",
    textAlign: "center",
    position: "relative",
    border: "1px solid rgba(255,255,255,0.1)"
  },
  stepIcon: {
    fontSize: "32px",
    marginBottom: "15px"
  },
  stepNumber: {
    position: "absolute",
    top: "-15px",
    left: "20px",
    background: "#27ae60",
    color: "white",
    padding: "5px 12px",
    borderRadius: "30px",
    fontSize: "12px",
    fontWeight: "700"
  },
  stepTitle: {
    fontSize: "1.1rem",
    marginBottom: "10px",
    fontWeight: "600"
  },
  stepDesc: {
    fontSize: "0.85rem",
    opacity: 0.8,
    lineHeight: 1.6,
    margin: 0
  },
  stepConnector: {
    display: "none"
  },

  // ============ TESTIMONIALS ============
  testimonialsSection: {
    padding: "80px 40px",
    background: "white",
    margin: "20px",
    borderRadius: "32px"
  },
  testimonialsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "30px",
    marginTop: "50px"
  },
  testimonialCard: {
    background: "#ffffff",
    borderRadius: "24px",
    padding: "35px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.03)",
    border: "1px solid #f1f5f9"
  },
  testimonialRating: {
    marginBottom: "20px"
  },
  testimonialText: {
    fontSize: "1rem",
    color: "#334155",
    lineHeight: 1.7,
    fontStyle: "italic",
    marginBottom: "25px"
  },
  testimonialAuthor: {
    display: "flex",
    alignItems: "center",
    gap: "15px"
  },
  testimonialAvatar: {
    width: "55px",
    height: "55px",
    background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)",
    color: "white",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "22px",
    fontWeight: "600"
  },
  testimonialInfo: {
    flex: 1
  },
  testimonialName: {
    margin: "0 0 5px 0",
    color: "#1e293b",
    fontSize: "1.1rem",
    fontWeight: "600"
  },
  testimonialRole: {
    margin: "0 0 5px 0",
    color: "#64748b",
    fontSize: "0.85rem"
  },
  testimonialBadge: {
    background: "rgba(39, 174, 96, 0.1)",
    color: "#27ae60",
    padding: "4px 12px",
    borderRadius: "30px",
    fontSize: "11px",
    fontWeight: "600"
  },
  testimonialsStats: {
    display: "flex",
    justifyContent: "center",
    gap: "60px",
    marginTop: "60px",
    paddingTop: "40px",
    borderTop: "1px solid #e2e8f0"
  },
  testimonialsStatValue: {
    fontSize: "2rem",
    fontWeight: "700",
    color: "#1e293b",
    display: "block",
    marginBottom: "5px"
  },
  testimonialsStatLabel: {
    fontSize: "0.9rem",
    color: "#64748b"
  },

  // ============ CTA SECTION ============
  ctaSection: {
    background: "linear-gradient(145deg, #27ae60 0%, #2ecc71 100%)",
    borderRadius: "32px",
    padding: "80px 40px",
    margin: "20px",
    color: "white",
    textAlign: "center"
  },
  ctaContent: {
    maxWidth: "700px",
    margin: "0 auto"
  },
  ctaTitle: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    fontWeight: "700"
  },
  ctaSubtitle: {
    fontSize: "1.3rem",
    marginBottom: "40px",
    opacity: 0.95
  },
  ctaFeatures: {
    display: "flex",
    justifyContent: "center",
    gap: "30px",
    marginBottom: "40px"
  },
  ctaFeature: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    fontSize: "1rem"
  },
  ctaButtons: {
    display: "flex",
    justifyContent: "center",
    gap: "20px"
  },
  primaryButtonLarge: {
    background: "white",
    color: "#27ae60",
    padding: "18px 50px",
    borderRadius: "50px",
    textDecoration: "none",
    fontWeight: "700",
    fontSize: "1.1rem",
    display: "flex",
    alignItems: "center",
    transition: "all 0.3s"
  },
  secondaryButtonLight: {
    background: "rgba(255,255,255,0.15)",
    color: "white",
    padding: "18px 40px",
    borderRadius: "50px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "1.1rem",
    display: "inline-block",
    border: "1px solid rgba(255,255,255,0.3)",
    backdropFilter: "blur(10px)"
  },

  // ============ FOOTER ============
  footer: {
    background: "#0f172a",
    borderRadius: "32px",
    margin: "20px",
    padding: "60px 40px 30px",
    color: "white"
  },
  footerMain: {
    display: "grid",
    gridTemplateColumns: "1.5fr 2fr",
    gap: "60px",
    marginBottom: "50px"
  },
  footerBrand: {
    maxWidth: "350px"
  },
  footerLogo: {
    display: "flex",
    alignItems: "center",
    marginBottom: "25px"
  },
  footerLogoText: {
    fontSize: "24px",
    fontWeight: "700",
    color: "white"
  },
  footerDesc: {
    color: "#94a3b8",
    lineHeight: 1.7,
    marginBottom: "25px"
  },
  socialLinks: {
    display: "flex",
    gap: "15px"
  },
  socialIcon: {
    width: "40px",
    height: "40px",
    background: "#1e293b",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    transition: "all 0.3s",
    fontSize: "18px"
  },
  footerLinks: {
    display: "grid",
    gridTemplateColumns: "repeat(4, 1fr)",
    gap: "30px"
  },
  footerColumn: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  footerHeading: {
    color: "white",
    fontSize: "1.1rem",
    marginBottom: "10px",
    fontWeight: "600"
  },
  footerLink: {
    color: "#94a3b8",
    textDecoration: "none",
    fontSize: "0.95rem",
    transition: "color 0.3s"
  },
  footerBottom: {
    borderTop: "1px solid #1e293b",
    paddingTop: "30px"
  },
  footerStats: {
    display: "flex",
    justifyContent: "space-between",
    color: "#94a3b8",
    fontSize: "0.9rem",
    marginBottom: "20px"
  },
  copyright: {
    textAlign: "center",
    color: "#64748b",
    fontSize: "0.9rem"
  }
};

export default Home;