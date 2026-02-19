import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Sparkles, Layout, DownloadCloud, Menu, X, FileText, ClipboardCheck, Award, Briefcase, Mail, Github, Linkedin } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const themeColor = "#31694f";
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Smooth scroll to Footer
  const scrollToAbout = () => {
    document.getElementById('about-section').scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div style={containerStyle}>
      {/* Background Icons */}
      <div style={{...bgIcon, left: '5%', top: '15%'}}><FileText size={180} color={themeColor} opacity={0.04} /></div>
      <div style={{...bgIcon, right: '5%', top: '10%'}}><ClipboardCheck size={200} color={themeColor} opacity={0.04} /></div>

      {/* Navigation */}
      <nav style={navStyle}>
        <div style={{ ...logoStyle, color: themeColor, cursor: 'pointer' }} onClick={() => navigate('/')}>ZenCV</div>
        
        {isMobile ? (
          <div onClick={() => setMenuOpen(!menuOpen)} style={{ cursor: 'pointer', zIndex: 1001 }}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </div>
        ) : (
          <div style={navLinks}>
            <button onClick={() => navigate('/templates')}className="nav-btn-smooth" style={navButton}>Templates</button>
            <button onClick={scrollToAbout} className="nav-btn-smooth" style={navButton}>About Us</button>
            <button onClick={() => navigate('/templates')} className="pulse-button" style={{...ctaButton(themeColor), padding: '10px 25px', fontSize: '0.9rem'}}>Build Now</button>
          </div>
        )}

      {isMobile && menuOpen && (
  <div style={mobileOverlay}>
    <button 
      onClick={() => {navigate('/templates'); setMenuOpen(false)}} 
      className="nav-btn-smooth" 
      style={{...mobileLink, background: 'none', border: 'none'}}
    >Templates
    </button>
    <button 
      onClick={scrollToAbout} 
      className="nav-btn-smooth" 
      style={{...mobileLink, background: 'none', border: 'none'}}>About Us</button>
    <button 
      onClick={() => navigate('/templates')} // Adding pulse even in mobile overlay
      style={ctaButton(themeColor)}
    >Get Started
    </button>
  </div>
)}
      </nav>

      {/* Hero Section */}
      <header style={heroSection}>
        <h1 style={{ ...titleStyle, fontSize: isMobile ? '2.2rem' : '3.5rem', color: '#1a1a1a' }}>
          Craft Your Future with a
        </h1>
        <div style={{ height: isMobile ? '40px' : '70px' }}>
          <h1 className="typing-target" style={{ 
            ...titleStyle, 
            fontSize: isMobile ? '2.2rem' : '3.5rem',
            color: themeColor,
          }}>
            Premium Resume.
          </h1>
        </div>
        
        <p style={{ ...subtitleStyle, fontSize: isMobile ? '1rem' : '1.1rem' }}>
          The "Zen" way to build a professional CV. <br/> 
          Simple, fast, and designed to get you hired.
        </p>
        
        <button 
          onClick={() => navigate('/templates')}
          className="pulse-button"
          style={ctaButton(themeColor)}
        >
          Create My Resume
        </button>
      </header>

      {/* Footer / About Section */}
      <footer id="about-section" style={footerStyle}>
        <div style={footerContent}>
          <div style={footerGrid}>
            <div style={footerInfo}>
              <h3 style={{color: themeColor, fontWeight: '800'}}>ZenCV</h3>
              <p>We believe that building a resume shouldn't be stressful. Our mission is to provide a calm, intuitive, and "Zen" experience for job seekers worldwide.</p>
            </div>
            <div style={footerLinks}>
              <h4 style={{marginBottom: '15px'}}>Quick Links</h4>
              <button onClick={() => navigate('/templates')} style={footerBtn}>Templates</button>
              <button onClick={() => window.scrollTo(0,0)} style={footerBtn}>Home</button>
              <button style={footerBtn}>Privacy Policy</button>
            </div>
            <div style={footerContact}>
              <h4 style={{marginBottom: '15px'}}>Connect</h4>
              <div style={{display: 'flex', gap: '15px', justifyContent: isMobile ? 'center' : 'flex-start'}}>
                <Mail size={20} cursor="pointer" />
                <Linkedin size={20} cursor="pointer" />
                <Github size={20} cursor="pointer" />
              </div>
            </div>
          </div>
          <div style={copyright}>
            © 2026 ZenCV Builder. All rights reserved. | Designed with ❤️ for Professionals
          </div>
        </div>
      </footer>
    </div>
  );
};

// --- Styles ---
const containerStyle = { backgroundColor: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column', position: 'relative', overflowX: 'hidden' };
const bgIcon = { position: 'absolute', zIndex: 0 };
const navStyle = { padding: '20px 10%', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 1000 };
const logoStyle = { fontSize: '1.8rem', fontWeight: '800', fontFamily: "'Poppins', sans-serif" };
const navLinks = { display: 'flex', gap: '20px', alignItems: 'center' };
const navButton = { background: 'none', border: 'none', fontSize: '1rem', fontWeight: '600', color: '#444', cursor: 'pointer', padding: '10px 15px' };

const mobileOverlay = { position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', gap: '30px', zIndex: 1000 };
const mobileLink = { background: 'none', border: 'none', fontSize: '1.8rem', fontWeight: '700', color: '#31694f', cursor: 'pointer' };

const heroSection = { textAlign: 'center', padding: '100px 20px', zIndex: 1, flex: 1 };
const titleStyle = { fontWeight: '800', fontFamily: "'Poppins', sans-serif", margin: '5px 0' };
const subtitleStyle = { color: '#666', margin: '25px auto 45px auto', maxWidth: '550px', lineHeight: '1.6' };

const ctaButton = (color) => ({
  padding: '16px 40px', fontSize: '1.1rem', fontWeight: '700', backgroundColor: color, color: '#fff', border: 'none', borderRadius: '50px', cursor: 'pointer', boxShadow: `0 8px 20px ${color}30`
});

const footerStyle = { backgroundColor: '#f9faf9', padding: '60px 10% 20px 10%', borderTop: '1px solid #eee', zIndex: 1 };
const footerContent = { maxWidth: '1200px', margin: '0 auto' };
const footerGrid = { display: 'flex', flexDirection: window.innerWidth < 768 ? 'column' : 'row', justifyContent: 'space-between', gap: '40px', textAlign: window.innerWidth < 768 ? 'center' : 'left' };
const footerInfo = { flex: 2 };
const footerLinks = { flex: 1, display: 'flex', flexDirection: 'column' };
const footerBtn = { background: 'none', border: 'none', textAlign: window.innerWidth < 768 ? 'center' : 'left', padding: '5px 0', cursor: 'pointer', color: '#666', fontSize: '0.9rem' };
const footerContact = { flex: 1 };
const copyright = { marginTop: '40px', paddingTop: '20px', borderTop: '1px solid #eee', textAlign: 'center', fontSize: '0.8rem', color: '#aaa' };

export default Home;