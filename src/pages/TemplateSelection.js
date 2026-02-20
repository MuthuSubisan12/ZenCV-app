import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Layout, CheckCircle, ArrowLeft, Home } from 'lucide-react';

const Templates = () => {
  const navigate = useNavigate();
  const themeColor = "#31694f";
  const selectedTemplate = localStorage.getItem('selectedTemplate') || 'template1';

  const templates = [
    { 
      id: 'template1', 
      name: 'Modern Sidebar', 
      desc: 'Clean sidebar design with a professional look.',
      preview: 'linear-gradient(90deg, #31694f 30%, #fff 30%)' 
    },
    { 
      id: 'template2', 
      name: 'Top Banner', 
      desc: 'Elegant centered layout with a bold header.',
      preview: 'linear-gradient(180deg, #31694f 40%, #fff 40%)' 
    },
    { 
      id: 'template3', 
      name: 'Classic Professional', 
      desc: 'Minimalist traditional design for corporate roles.',
      preview: '#fff' 
    },
    { 
      id: 'template4', 
      name: 'Dual Column', 
      desc: 'Modern split-screen layout for better readability.',
      preview: 'linear-gradient(90deg, #f4f4f4 40%, #fff 40%)' 
    }
  ];

  const handleSelect = (id) => {
    localStorage.setItem('selectedTemplate', id);
    navigate('/editor');
  };

  return (
    <div style={containerStyle}>
      {/* --- NEW HEADER SECTION --- */}
      <nav style={navStyle}>
        <div style={navContent}>
          <button onClick={() => navigate('/')} style={backBtnStyle}>
            <ArrowLeft size={18} /> Back to Home
          </button>
          <div style={logoStyle}>ZEN<span style={{ color: themeColor }}>CV</span></div>
          <div style={{ width: '100px' }}></div> {/* Spacer for balance */}
        </div>
      </nav>

      <header style={headerSection}>
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          style={titleStyle}
        >
          Select Your <span style={{ color: themeColor }}>Resume Design</span>
        </motion.h1>
        <p style={subtitleStyle}>Choose from our 4 professionally crafted templates to get started.</p>
      </header>

      <div style={gridStyle}>
        {templates.map((temp, index) => (
          <motion.div
            key={temp.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ y: -10 }}
            onClick={() => handleSelect(temp.id)}
            style={cardStyle(selectedTemplate === temp.id)}
          >
            <div style={{ ...previewBox, background: temp.preview }}>
               {selectedTemplate === temp.id && (
                 <div style={activeBadge}><CheckCircle size={18} /> Active</div>
               )}
            </div>

            <div style={infoStyle}>
              <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>{temp.name}</h3>
              <p style={{ fontSize: '0.8rem', color: '#666', marginBottom: '15px' }}>{temp.desc}</p>
              <button style={selectBtn(selectedTemplate === temp.id, themeColor)}>
                {selectedTemplate === temp.id ? 'Continue with this' : 'Use this Template'}
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// --- Updated Styles ---
const containerStyle = { 
  backgroundColor: '#f8fafc', 
  minHeight: '100vh', 
  fontFamily: 'Inter, sans-serif' 
};

const navStyle = {
  backgroundColor: '#fff',
  padding: '15px 5%',
  borderBottom: '1px solid #e2e8f0',
  position: 'sticky',
  top: 0,
  zIndex: 100
};

const navContent = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center'
};

const logoStyle = {
  fontSize: '1.5rem',
  fontWeight: '900',
  letterSpacing: '1px',
  color: '#1e293b'
};

const backBtnStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  background: 'none',
  border: '1px solid #e2e8f0',
  padding: '8px 16px',
  borderRadius: '8px',
  cursor: 'pointer',
  fontWeight: '600',
  color: '#64748b',
  transition: '0.2s'
};

const headerSection = { 
  textAlign: 'center', 
  padding: '60px 20px 40px' 
};

const titleStyle = { fontSize: '2.8rem', fontWeight: '900', marginBottom: '10px' };
const subtitleStyle = { color: '#64748b', fontSize: '1.1rem' };

const gridStyle = { 
  display: 'grid', 
  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', 
  gap: '30px', 
  maxWidth: '1200px', 
  margin:  auto',
  paddingBottom: '50px'
};

const cardStyle = (active) => ({
  backgroundColor: '#fff',
  borderRadius: '20px',
  overflow: 'hidden',
  cursor: 'pointer',
  boxShadow: active ? '0 0 0 3px #31694f, 0 25px 50px -12px rgba(0,0,0,0.15)' : '0 10px 15px -3px rgba(0,0,0,0.05)',
  transition: '0.4s cubic-bezier(0.4, 0, 0.2, 1)'
});

const previewBox = { height: '180px', position: 'relative', borderBottom: '1px solid #f1f5f9' };

const activeBadge = {
  position: 'absolute',
  top: '15px',
  right: '15px',
  backgroundColor: '#31694f',
  color: '#fff',
  padding: '6px 14px',
  borderRadius: '20px',
  fontSize: '0.75rem',
  fontWeight: '700',
  display: 'flex',
  alignItems: 'center',
  gap: '6px'
};

const infoStyle = { padding: '25px' };

const selectBtn = (active, color) => ({
  width: '100%',
  padding: '12px',
  borderRadius: '10px',
  border: 'none',
  backgroundColor: active ? color : '#1e293b',
  color: '#fff',
  fontWeight: '700',
  cursor: 'pointer',
  transition: '0.3s'
});
export default Templates;
