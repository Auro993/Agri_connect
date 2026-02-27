import { Link } from "react-router-dom";
import { 
  FaLeaf, FaTractor, FaShippingFast, FaShieldAlt, 
  FaChartLine, FaUsers, FaSeedling, FaMobileAlt,
  FaCheckCircle, FaArrowRight, FaRupeeSign,
  FaHandHoldingHeart, FaEnvelope, FaPhone, FaMapMarkerAlt,
  FaClock
} from "react-icons/fa";
import heroImage from "../assets/images/AgriConnect_Home.avif"; // ✅ IMPORT YOUR IMAGE

function Home() {
  return (
    <div style={styles.container}>
      {/* ============ FULL-SCREEN HERO SECTION WITH BACKGROUND IMAGE ============ */}
      <section style={styles.hero}>
        {/* Animated overlay */}
        <div style={styles.heroOverlay}></div>
        <div style={styles.heroPattern}></div>
        
        {/* Content on top of image */}
        <div style={styles.heroContent}>
          <div style={styles.badge} className="float-animation">
            <FaLeaf style={{ marginRight: "8px" }} /> India's #1 Agritech Platform
          </div>
          <h1 style={styles.heroTitle}>
            <span style={styles.heroTitleAccent} className="slide-up">AgriConnect</span>
            <br />
            <span className="fade-in">Empowering Farmers with</span>
            <span style={styles.heroHighlight} className="glow-text"> Smart Technology</span>
          </h1>
          <p style={styles.heroSubtitle} className="slide-up-delay">
            India's premier digital marketplace connecting farmers directly with buyers. 
            Streamline your farming operations, maximize profits, and grow sustainably.
          </p>
          <div style={styles.heroButtons} className="slide-up-delay-2">
            <Link to="/register" style={styles.primaryButton} className="pulse-hover">
              Get Started Free <FaArrowRight style={{ marginLeft: "10px" }} className="icon-shake" />
            </Link>
            <Link to="/login" style={styles.secondaryButton} className="glow-hover">
              Sign In
            </Link>
          </div>
          <div style={styles.heroTrust} className="fade-in-delay">
            <span style={styles.trustItem} className="hover-scale">
              <FaCheckCircle style={{ color: "#27ae60", marginRight: "5px" }} /> No credit card required
            </span>
            <span style={styles.trustItem} className="hover-scale">
              <FaCheckCircle style={{ color: "#27ae60", marginRight: "5px" }} /> 30-day free trial
            </span>
            <span style={styles.trustItem} className="hover-scale">
              <FaCheckCircle style={{ color: "#27ae60", marginRight: "5px" }} /> Cancel anytime
            </span>
          </div>
        </div>
      </section>

      {/* ============ FEATURES SECTION ============ */}
      <section style={styles.featuresSection}>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionBadge} className="slide-in">WHY CHOOSE US</span>
          <h2 style={styles.sectionTitle} className="slide-up">
            Revolutionizing Agriculture with 
            <span style={styles.sectionHighlight}> Cutting-Edge Features</span>
          </h2>
          <p style={styles.sectionSubtitle} className="fade-in">
            Everything you need to manage your farm and maximize profits
          </p>
        </div>
        
        <div style={styles.featuresGrid}>
          {/* FEATURE 1: Smart Farming Tools */}
          <div style={styles.featureCard} className="card-hover">
            <div style={styles.featureIconWrapper} className="icon-float">
              <FaTractor className="icon-spin-slow" />
            </div>
            <h3 style={styles.featureTitle}>Smart Farming Tools</h3>
            <p style={styles.featureDesc}>
              AI-powered crop recommendations, weather alerts, and soil health monitoring for optimal yield.
            </p>
            <div style={styles.cardGlow}></div>
          </div>

          {/* FEATURE 2: Direct Marketplace */}
          <div style={styles.featureCard} className="card-hover">
            <div style={styles.featureIconWrapper} className="icon-float">
              <FaHandHoldingHeart className="icon-pulse" />
            </div>
            <h3 style={styles.featureTitle}>Direct Marketplace</h3>
            <p style={styles.featureDesc}>
              Sell directly to buyers without middlemen. Get 30% better prices for your premium produce.
            </p>
            <div style={styles.cardGlow}></div>
          </div>

          {/* FEATURE 3: Logistics Support */}
          <div style={styles.featureCard} className="card-hover">
            <div style={styles.featureIconWrapper} className="icon-float">
              <FaShippingFast className="icon-shake-hover" />
            </div>
            <h3 style={styles.featureTitle}>Logistics Support</h3>
            <p style={styles.featureDesc}>
              End-to-end supply chain management with real-time tracking and temperature-controlled delivery.
            </p>
            <div style={styles.cardGlow}></div>
          </div>

          {/* FEATURE 4: Secure Payments */}
          <div style={styles.featureCard} className="card-hover">
            <div style={styles.featureIconWrapper} className="icon-float">
              <FaShieldAlt className="icon-shield" />
            </div>
            <h3 style={styles.featureTitle}>Secure Payments</h3>
            <p style={styles.featureDesc}>
              Bank-grade escrow protection with instant settlements. 100% payment guarantee for every transaction.
            </p>
            <div style={styles.cardGlow}></div>
          </div>

          {/* FEATURE 5: Analytics Dashboard */}
          <div style={styles.featureCard} className="card-hover">
            <div style={styles.featureIconWrapper} className="icon-float">
              <FaChartLine className="icon-chart" />
            </div>
            <h3 style={styles.featureTitle}>Analytics Dashboard</h3>
            <p style={styles.featureDesc}>
              Track earnings, crop performance, and market trends with real-time insights and predictions.
            </p>
            <div style={styles.cardGlow}></div>
          </div>

          {/* FEATURE 6: Mobile First */}
          <div style={styles.featureCard} className="card-hover">
            <div style={styles.featureIconWrapper} className="icon-float">
              <FaMobileAlt className="icon-rotate" />
            </div>
            <h3 style={styles.featureTitle}>Mobile First</h3>
            <p style={styles.featureDesc}>
              Access all features from your smartphone. Works seamlessly even in low-network rural areas.
            </p>
            <div style={styles.cardGlow}></div>
          </div>
        </div>
      </section>

      {/* ============ HOW IT WORKS ============ */}
      <section style={styles.worksSection}>
        <div style={styles.worksBackground}></div>
        <div style={styles.sectionHeader}>
          <span style={styles.sectionBadgeLight} className="slide-in">SIMPLE PROCESS</span>
          <h2 style={{ ...styles.sectionTitle, color: "white" }} className="slide-up">
            From Farm to Buyer in 
            <span style={{ color: "#ffd700" }}> 6 Easy Steps</span>
          </h2>
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
            <div key={index} style={styles.stepCard} className="step-card-hover">
              <div style={styles.stepIcon} className="step-icon-float">{step.icon}</div>
              <span style={styles.stepNumber} className="pulse">{step.number}</span>
              <h3 style={styles.stepTitle}>{step.title}</h3>
              <p style={styles.stepDesc}>{step.desc}</p>
              <div style={styles.stepGlow}></div>
            </div>
          ))}
        </div>
      </section>

      {/* ============ CTA SECTION ============ */}
      <section style={styles.ctaSection}>
        <div style={styles.ctaBackground}></div>
        <div style={styles.ctaContent}>
          <h2 style={styles.ctaTitle} className="slide-up">
            Ready to Transform Your Farming Journey?
          </h2>
          <p style={styles.ctaSubtitle} className="fade-in">
            Join thousands of farmers already growing with AgriConnect
          </p>
          
          <div style={styles.ctaFeatures} className="slide-up-delay">
            <div style={styles.ctaFeature} className="hover-scale">
              <FaCheckCircle className="icon-check" /> 30-day free trial
            </div>
            <div style={styles.ctaFeature} className="hover-scale">
              <FaCheckCircle className="icon-check" /> No credit card required
            </div>
            <div style={styles.ctaFeature} className="hover-scale">
              <FaCheckCircle className="icon-check" /> Cancel anytime
            </div>
          </div>

          <div style={styles.ctaButtons} className="slide-up-delay-2">
            <Link to="/register" style={styles.primaryButtonLarge} className="pulse-hover">
              Start Free Trial <FaArrowRight style={{ marginLeft: "10px" }} className="icon-shake" />
            </Link>
            <Link to="/crops" style={styles.secondaryButtonLight} className="glow-hover">
              Browse Marketplace
            </Link>
          </div>
        </div>
      </section>

      {/* ============ CONTACT US SECTION ============ */}
      <section style={styles.contactSection}>
        <div style={styles.contactContainer}>
          <div style={styles.contactInfo}>
            <h2 style={styles.contactTitle} className="slide-in">Get in Touch</h2>
            <p style={styles.contactSubtitle} className="fade-in">
              Have questions? We're here to help you 24/7
            </p>
            
            <div style={styles.contactDetails}>
              {[
                { icon: <FaPhone />, title: "Call Us", lines: ["+91 1800-123-4567", "Mon-Sat, 9AM-8PM"] },
                { icon: <FaEnvelope />, title: "Email Us", lines: ["support@agriconnect.com", "care@agriconnect.com"] },
                { icon: <FaMapMarkerAlt />, title: "Visit Us", lines: ["AgriConnect Tower, Sector 62", "Gurugram, Haryana - 122011"] },
                { icon: <FaClock />, title: "Working Hours", lines: ["Monday - Saturday: 9:00 AM - 8:00 PM", "Sunday: Closed"] }
              ].map((item, index) => (
                <div key={index} style={styles.contactItem} className="contact-item-hover">
                  <div style={styles.contactIcon} className="icon-float">{item.icon}</div>
                  <div>
                    <h4 style={styles.contactItemTitle}>{item.title}</h4>
                    {item.lines.map((line, i) => (
                      <p key={i} style={styles.contactItemText}>{line}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div style={styles.contactForm} className="form-slide-in">
            <h3 style={styles.formTitle}>Send us a Message</h3>
            <form style={styles.form}>
              <div style={styles.formGroup}>
                <input 
                  type="text" 
                  placeholder="Your Name" 
                  style={styles.formInput}
                  className="input-focus"
                />
              </div>
              <div style={styles.formGroup}>
                <input 
                  type="email" 
                  placeholder="Your Email" 
                  style={styles.formInput}
                  className="input-focus"
                />
              </div>
              <div style={styles.formGroup}>
                <input 
                  type="text" 
                  placeholder="Subject" 
                  style={styles.formInput}
                  className="input-focus"
                />
              </div>
              <div style={styles.formGroup}>
                <textarea 
                  placeholder="Your Message" 
                  rows="5"
                  style={styles.formTextarea}
                  className="input-focus"
                ></textarea>
              </div>
              <button type="submit" style={styles.submitBtn} className="submit-btn-hover">
                Send Message <FaArrowRight style={{ marginLeft: "10px" }} className="icon-shake" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* ============ FOOTER ============ */}
      <footer style={styles.footer}>
        <div style={styles.footerMain}>
          <div style={styles.footerBrand}>
            <div style={styles.footerLogo} className="hover-scale">
              <FaLeaf style={{ fontSize: "32px", color: "#27ae60", marginRight: "10px" }} className="icon-spin-slow" />
              <span style={styles.footerLogoText}>AgriConnect</span>
            </div>
            <p style={styles.footerDesc}>
              India's fastest growing agritech platform, connecting farmers directly to buyers with transparency and trust.
            </p>
            <div style={styles.socialLinks}>
              <span style={styles.socialIcon} className="social-icon-hover">📘</span>
              <span style={styles.socialIcon} className="social-icon-hover">🐦</span>
              <span style={styles.socialIcon} className="social-icon-hover">📷</span>
              <span style={styles.socialIcon} className="social-icon-hover">📧</span>
            </div>
          </div>

          <div style={styles.footerLinks}>
            {[
              { title: "For Farmers", links: ["Register Farm", "Sell Crops", "Dashboard"] },
              { title: "For Buyers", links: ["Create Account", "Browse Crops", "Track Orders"] },
              { title: "Resources", links: ["Blog", "Help Center", "Market Trends"] },
              { title: "Company", links: ["About Us", "Contact", "Privacy Policy"] }
            ].map((column, index) => (
              <div key={index} style={styles.footerColumn}>
                <h4 style={styles.footerHeading}>{column.title}</h4>
                {column.links.map((link, i) => (
                  <Link key={i} to="/" style={styles.footerLink} className="footer-link-hover">
                    {link}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div style={styles.footerBottom}>
          <div style={styles.footerStats}>
            <span className="stat-item">📍 Serving 20+ states across India</span>
            <span className="stat-item">🌾 50,000+ tons of produce traded</span>
            <span className="stat-item">💳 100% secure payments</span>
          </div>
          <div style={styles.copyright}>
            <p>© 2026 AgriConnect Technologies Pvt. Ltd. All rights reserved.</p>
            <p style={{ fontSize: "12px", marginTop: "8px", opacity: 0.7 }} className="heartbeat">
              Made with ❤️ for Indian Farmers
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        /* ============ ANIMATIONS ============ */
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        
        @keyframes pulse {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          75% { transform: translateX(5px); }
        }
        
        @keyframes glow {
          0% { box-shadow: 0 0 5px rgba(39, 174, 96, 0.2); }
          50% { box-shadow: 0 0 20px rgba(39, 174, 96, 0.6); }
          100% { box-shadow: 0 0 5px rgba(39, 174, 96, 0.2); }
        }
        
        @keyframes heartbeat {
          0% { transform: scale(1); }
          14% { transform: scale(1.3); }
          28% { transform: scale(1); }
          42% { transform: scale(1.3); }
          70% { transform: scale(1); }
        }
        
        /* Animation Classes */
        .float-animation {
          animation: float 3s ease-in-out infinite;
        }
        
        .slide-up {
          animation: slideUp 0.8s ease-out;
        }
        
        .slide-up-delay {
          animation: slideUp 0.8s ease-out 0.2s both;
        }
        
        .slide-up-delay-2 {
          animation: slideUp 0.8s ease-out 0.4s both;
        }
        
        .slide-in {
          animation: slideIn 0.8s ease-out;
        }
        
        .fade-in {
          animation: fadeIn 1s ease-out;
        }
        
        .fade-in-delay {
          animation: fadeIn 1s ease-out 0.6s both;
        }
        
        .pulse {
          animation: pulse 2s ease-in-out infinite;
        }
        
        .heartbeat {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
        
        .glow-text {
          animation: glow 2s ease-in-out infinite;
        }
        
        /* Hover Animations */
        .card-hover {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          overflow: hidden;
        }
        
        .card-hover:hover {
          transform: translateY(-10px) scale(1.02);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }
        
        .card-hover:hover .icon-float {
          animation: float 1s ease-in-out infinite;
        }
        
        .icon-float {
          transition: all 0.3s;
        }
        
        .icon-spin-slow {
          transition: all 0.3s;
        }
        
        .card-hover:hover .icon-spin-slow {
          animation: spin 3s linear infinite;
        }
        
        .icon-shake-hover:hover {
          animation: shake 0.5s ease-in-out;
        }
        
        .icon-pulse:hover {
          animation: pulse 1s ease-in-out infinite;
        }
        
        .icon-rotate:hover {
          transform: rotate(360deg);
          transition: transform 0.5s;
        }
        
        .icon-shield:hover {
          filter: drop-shadow(0 0 10px #27ae60);
        }
        
        .icon-chart:hover {
          transform: scale(1.2);
          transition: transform 0.3s;
        }
        
        .icon-shake {
          transition: transform 0.3s;
        }
        
        .icon-shake:hover {
          animation: shake 0.5s ease-in-out;
        }
        
        .icon-check {
          transition: all 0.3s;
        }
        
        .icon-check:hover {
          transform: scale(1.2);
          color: #ffd700;
        }
        
        .pulse-hover {
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        
        .pulse-hover:hover {
          transform: scale(1.05);
          box-shadow: 0 15px 30px rgba(0,0,0,0.3);
        }
        
        .pulse-hover::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300%;
          height: 300%;
          background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
          transform: translate(-50%, -50%) scale(0);
          transition: transform 0.5s;
          border-radius: 50%;
          z-index: 1;
          pointer-events: none;
        }
        
        .pulse-hover:hover::after {
          transform: translate(-50%, -50%) scale(1);
        }
        
        .glow-hover {
          transition: all 0.3s;
        }
        
        .glow-hover:hover {
          background: rgba(255,255,255,0.25) !important;
          border-color: white !important;
          box-shadow: 0 0 20px rgba(255,255,255,0.3);
        }
        
        .hover-scale {
          transition: transform 0.3s;
        }
        
        .hover-scale:hover {
          transform: scale(1.1);
        }
        
        .step-card-hover {
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        
        .step-card-hover:hover {
          transform: translateY(-5px) scale(1.05);
          background: rgba(255,255,255,0.15) !important;
        }
        
        .step-card-hover:hover .step-icon-float {
          animation: float 2s ease-in-out infinite;
        }
        
        .contact-item-hover {
          transition: all 0.3s;
          padding: 15px;
          border-radius: 12px;
        }
        
        .contact-item-hover:hover {
          background: rgba(39, 174, 96, 0.05);
          transform: translateX(10px);
        }
        
        .contact-item-hover:hover .contactIcon {
          animation: pulse 1s ease-in-out;
        }
        
        .social-icon-hover {
          transition: all 0.3s;
        }
        
        .social-icon-hover:hover {
          transform: translateY(-5px) scale(1.1);
          background: #27ae60 !important;
          box-shadow: 0 5px 15px rgba(39, 174, 96, 0.4);
        }
        
        .footer-link-hover {
          position: relative;
          display: inline-block;
          transition: all 0.3s;
        }
        
        .footer-link-hover::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: #27ae60;
          transition: width 0.3s;
        }
        
        .footer-link-hover:hover {
          color: white !important;
          transform: translateX(5px);
        }
        
        .footer-link-hover:hover::after {
          width: 100%;
        }
        
        .stat-item {
          transition: all 0.3s;
          display: inline-block;
        }
        
        .stat-item:hover {
          transform: scale(1.1);
          color: white !important;
        }
        
        .form-slide-in {
          animation: slideIn 1s ease-out;
        }
        
        .input-focus {
          transition: all 0.3s;
        }
        
        .input-focus:focus {
          transform: translateY(-2px);
          border-color: #27ae60 !important;
          box-shadow: 0 10px 20px rgba(39, 174, 96, 0.1);
        }
        
        .submit-btn-hover {
          transition: all 0.3s;
          position: relative;
          overflow: hidden;
        }
        
        .submit-btn-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(39, 174, 96, 0.4);
        }
        
        .submit-btn-hover::after {
          content: '';
          position: absolute;
          top: 50%;
          left: 50%;
          width: 300%;
          height: 300%;
          background: radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%);
          transform: translate(-50%, -50%) scale(0);
          transition: transform 0.5s;
          border-radius: 50%;
          z-index: 1;
          pointer-events: none;
        }
        
        .submit-btn-hover:hover::after {
          transform: translate(-50%, -50%) scale(1);
        }
        
        /* Parallax Effects */
        .hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="none"><path d="M0,0 L100,0 L100,100 L0,100 Z" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></svg>');
          animation: slide 20s linear infinite;
          z-index: 1;
        }
        
        @keyframes slide {
          from { transform: translateX(-100%); }
          to { transform: translateX(100%); }
        }
        
        /* Glass Morphism Effects */
        .glass-effect {
          backdrop-filter: blur(10px);
          background: rgba(255,255,255,0.1);
        }
        
        /* Scroll Animations */
        @media (prefers-reduced-motion: no-preference) {
          .scroll-fade-in {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease-out, transform 0.6s ease-out;
          }
          
          .scroll-fade-in.visible {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .heroTitle {
            font-size: 2.5rem;
          }
          
          .heroTitleAccent {
            font-size: 3rem;
          }
          
          .featuresGrid {
            grid-template-columns: 1fr;
          }
          
          .stepsContainer {
            grid-template-columns: 1fr;
          }
          
          .footerMain {
            grid-template-columns: 1fr;
          }
          
          .footerLinks {
            grid-template-columns: 1fr 1fr;
          }
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1440px",
    margin: "0 auto",
    fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
    position: "relative",
    background: "linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)"
  },
  
  // ============ HERO SECTION WITH BACKGROUND IMAGE ============
  hero: {
    position: "relative",
    height: "90vh",
    minHeight: "600px",
    backgroundImage: `url(${heroImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    backgroundAttachment: "fixed", // Parallax effect
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "0 0 32px 32px",
    margin: "0 0 40px 0",
    overflow: "hidden"
  },
  
  heroOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.5) 50%, rgba(39,174,96,0.3) 100%)",
    zIndex: 1
  },
  
  heroPattern: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "url('data:image/svg+xml;utf8,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M30 0 L60 30 L30 60 L0 30 Z\" fill=\"none\" stroke=\"rgba(255,255,255,0.05)\" stroke-width=\"1\"/></svg>')",
    opacity: 0.3,
    zIndex: 1
  },
  
  heroContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: "800px",
    padding: "0 20px",
    textAlign: "center",
    color: "white"
  },
  
  badge: {
    display: "inline-flex",
    alignItems: "center",
    background: "rgba(255,255,255,0.15)",
    color: "white",
    padding: "8px 20px",
    borderRadius: "50px",
    fontSize: "14px",
    fontWeight: "600",
    marginBottom: "30px",
    backdropFilter: "blur(10px)",
    border: "1px solid rgba(255,255,255,0.2)",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)"
  },
  
  heroTitle: {
    fontSize: "3.5rem",
    color: "white",
    marginBottom: "25px",
    lineHeight: 1.2,
    fontWeight: "700",
    textShadow: "2px 2px 4px rgba(0,0,0,0.3)"
  },
  
  heroTitleAccent: {
    color: "#27ae60",
    fontSize: "4rem",
    textShadow: "2px 2px 4px rgba(0,0,0,0.3)",
    display: "inline-block"
  },
  
  heroHighlight: {
    color: "#ffd700",
    borderBottom: "4px solid #ffd700",
    paddingBottom: "5px"
  },
  
  heroSubtitle: {
    fontSize: "1.3rem",
    color: "rgba(255,255,255,0.9)",
    marginBottom: "40px",
    lineHeight: 1.7,
    textShadow: "1px 1px 2px rgba(0,0,0,0.3)"
  },
  
  heroButtons: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
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
    boxShadow: "0 10px 20px rgba(0,0,0,0.2)",
    position: "relative",
    overflow: "hidden"
  },
  
  secondaryButton: {
    background: "rgba(255,255,255,0.15)",
    color: "white",
    padding: "16px 40px",
    borderRadius: "50px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "1.1rem",
    display: "inline-block",
    transition: "all 0.3s",
    border: "2px solid rgba(255,255,255,0.3)",
    backdropFilter: "blur(10px)"
  },
  
  heroTrust: {
    display: "flex",
    gap: "25px",
    justifyContent: "center",
    marginTop: "20px"
  },
  
  trustItem: {
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    color: "rgba(255,255,255,0.9)",
    cursor: "default"
  },
  
  // ============ FEATURES SECTION ============
  featuresSection: {
    padding: "80px 40px",
    background: "white",
    margin: "20px",
    borderRadius: "32px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.05)"
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
    color: "#27ae60",
    position: "relative",
    display: "inline-block"
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
    textAlign: "center",
    position: "relative",
    overflow: "hidden"
  },
  
  cardGlow: {
    position: "absolute",
    top: "-50%",
    left: "-50%",
    width: "200%",
    height: "200%",
    background: "radial-gradient(circle, rgba(39,174,96,0.1) 0%, transparent 70%)",
    opacity: 0,
    transition: "opacity 0.3s",
    pointerEvents: "none"
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
    margin: "0 auto 25px",
    transition: "all 0.3s"
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
    fontSize: "0.95rem",
    margin: 0
  },
  
  // ============ HOW IT WORKS ============
  worksSection: {
    background: "linear-gradient(145deg, #0b3b2c 0%, #1a4d3e 100%)",
    borderRadius: "32px",
    padding: "80px 40px",
    margin: "20px",
    color: "white",
    position: "relative",
    overflow: "hidden"
  },
  
  worksBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "url('data:image/svg+xml;utf8,<svg width=\"100\" height=\"100\" viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\"><circle cx=\"50\" cy=\"50\" r=\"40\" fill=\"none\" stroke=\"rgba(255,255,255,0.05)\" stroke-width=\"2\"/></svg>')",
    opacity: 0.3,
    animation: "spin 60s linear infinite"
  },
  
  stepsContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(6, 1fr)",
    gap: "20px",
    marginTop: "50px",
    position: "relative",
    zIndex: 2
  },
  
  stepCard: {
    background: "rgba(255,255,255,0.08)",
    backdropFilter: "blur(10px)",
    borderRadius: "20px",
    padding: "30px 20px",
    textAlign: "center",
    position: "relative",
    border: "1px solid rgba(255,255,255,0.1)",
    transition: "all 0.3s"
  },
  
  stepGlow: {
    position: "absolute",
    top: "50%",
    left: "50%",
    width: "100%",
    height: "100%",
    background: "radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)",
    transform: "translate(-50%, -50%) scale(0)",
    transition: "transform 0.3s",
    pointerEvents: "none",
    borderRadius: "20px"
  },
  
  stepIcon: {
    fontSize: "32px",
    marginBottom: "15px",
    transition: "all 0.3s"
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
    fontWeight: "700",
    boxShadow: "0 4px 10px rgba(0,0,0,0.2)"
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
  
  // ============ CTA SECTION ============
  ctaSection: {
    background: "linear-gradient(145deg, #27ae60 0%, #2ecc71 100%)",
    borderRadius: "32px",
    padding: "80px 40px",
    margin: "20px",
    color: "white",
    textAlign: "center",
    position: "relative",
    overflow: "hidden"
  },
  
  ctaBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: "url('data:image/svg+xml;utf8,<svg width=\"60\" height=\"60\" viewBox=\"0 0 60 60\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M30 0 L60 30 L30 60 L0 30 Z\" fill=\"none\" stroke=\"rgba(255,255,255,0.1)\" stroke-width=\"1\"/></svg>')",
    opacity: 0.3,
    animation: "slide 30s linear infinite"
  },
  
  ctaContent: {
    maxWidth: "700px",
    margin: "0 auto",
    position: "relative",
    zIndex: 2
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
    fontSize: "1rem",
    cursor: "default"
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
    transition: "all 0.3s",
    position: "relative",
    overflow: "hidden"
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
    backdropFilter: "blur(10px)",
    transition: "all 0.3s"
  },
  
  // ============ CONTACT SECTION ============
  contactSection: {
    padding: "80px 40px",
    background: "white",
    margin: "20px",
    borderRadius: "32px",
    boxShadow: "0 20px 40px rgba(0,0,0,0.05)"
  },
  
  contactContainer: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "50px",
    maxWidth: "1200px",
    margin: "0 auto"
  },
  
  contactInfo: {
    padding: "20px"
  },
  
  contactTitle: {
    fontSize: "2.2rem",
    color: "#1e293b",
    marginBottom: "15px",
    fontWeight: "700"
  },
  
  contactSubtitle: {
    fontSize: "1.1rem",
    color: "#64748b",
    marginBottom: "40px"
  },
  
  contactDetails: {
    display: "flex",
    flexDirection: "column",
    gap: "25px"
  },
  
  contactItem: {
    display: "flex",
    alignItems: "flex-start",
    gap: "20px",
    transition: "all 0.3s"
  },
  
  contactIcon: {
    width: "50px",
    height: "50px",
    background: "rgba(39, 174, 96, 0.1)",
    borderRadius: "12px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
    color: "#27ae60",
    transition: "all 0.3s"
  },
  
  contactItemTitle: {
    margin: "0 0 5px 0",
    color: "#1e293b",
    fontSize: "1.1rem",
    fontWeight: "600"
  },
  
  contactItemText: {
    margin: "0 0 3px 0",
    color: "#64748b",
    fontSize: "0.95rem"
  },
  
  contactForm: {
    background: "#f8fafc",
    padding: "40px",
    borderRadius: "24px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
  },
  
  formTitle: {
    fontSize: "1.5rem",
    color: "#1e293b",
    marginBottom: "25px",
    fontWeight: "600"
  },
  
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },
  
  formGroup: {
    width: "100%"
  },
  
  formInput: {
    width: "100%",
    padding: "15px 20px",
    fontSize: "1rem",
    border: "2px solid #e2e8f0",
    borderRadius: "10px",
    outline: "none",
    transition: "all 0.3s",
    background: "white"
  },
  
  formTextarea: {
    width: "100%",
    padding: "15px 20px",
    fontSize: "1rem",
    border: "2px solid #e2e8f0",
    borderRadius: "10px",
    outline: "none",
    transition: "all 0.3s",
    fontFamily: "inherit",
    resize: "vertical",
    background: "white"
  },
  
  submitBtn: {
    background: "linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)",
    color: "white",
    padding: "16px 30px",
    borderRadius: "10px",
    border: "none",
    fontSize: "1.1rem",
    fontWeight: "600",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "all 0.3s",
    marginTop: "10px",
    position: "relative",
    overflow: "hidden"
  },
  
  // ============ FOOTER ============
  footer: {
    background: "#0f172a",
    borderRadius: "32px",
    margin: "20px",
    padding: "60px 40px 30px",
    color: "white",
    position: "relative",
    overflow: "hidden"
  },
  
  footerMain: {
    display: "grid",
    gridTemplateColumns: "1.5fr 2fr",
    gap: "60px",
    marginBottom: "50px",
    position: "relative",
    zIndex: 2
  },
  
  footerBrand: {
    maxWidth: "350px"
  },
  
  footerLogo: {
    display: "flex",
    alignItems: "center",
    marginBottom: "25px",
    cursor: "pointer"
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
    paddingTop: "30px",
    position: "relative",
    zIndex: 2
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