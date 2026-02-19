import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, Download, Upload, AlertCircle, 
  CheckCircle2, Palette, Layout, User, Trash2, Mail, Linkedin, FileText
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

const Editor = () => {
  const navigate = useNavigate();
  
  // --- States ---
  const [themeColor, setThemeColor] = useState(localStorage.getItem('zencv_theme') || '#31694f');
  const [activeTemplate, setActiveTemplate] = useState(localStorage.getItem('selectedTemplate') || 'template1');
  const [viewMode, setViewMode] = useState('edit'); // Mobile toggle: edit/preview
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('zencv_data');
    return saved ? JSON.parse(saved) : {
      fullName: '', email: '', phone: '', linkedin: '',
      summary: '', experience: '', education: '', skills: '', profileImg: null
    };
  });

  const colorOptions = ['#31694f', '#2563eb', '#dc2626', '#7c3aed', '#f59e0b', '#000000'];
  const templates = [
    { id: 'template1', name: 'Sidebar' },
    { id: 'template2', name: 'Top Banner' },
    { id: 'template3', name: 'Classic' },
    { id: 'template4', name: 'Split' }
  ];

  // --- Effects ---
  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    localStorage.setItem('zencv_data', JSON.stringify(formData));
    localStorage.setItem('zencv_theme', themeColor);
    localStorage.setItem('selectedTemplate', activeTemplate);
    return () => window.removeEventListener('resize', handleResize);
  }, [formData, themeColor, activeTemplate]);

  const isMobile = windowWidth <= 768;

  // --- Handlers ---
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'email') setErrors(p => ({...p, email: /\S+@\S+\.\S+/.test(value) ? null : "Invalid email"}));
    if (name === 'linkedin') setErrors(p => ({...p, linkedin: value.includes('linkedin.com') ? null : "Invalid LinkedIn URL"}));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setFormData(prev => ({ ...prev, profileImg: reader.result }));
      reader.readAsDataURL(file);
    }
  };

  const removePhoto = () => setFormData(prev => ({ ...prev, profileImg: null }));

  const downloadPDF = async () => {
    const element = document.getElementById('resume-render');
    const canvas = await html2canvas(element, { scale: 2, useCORS: true });
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(canvas.toDataURL('image/png'), 'PNG', 0, 0, 210, 297);
    pdf.save(`${formData.fullName || 'Resume'}.pdf`);
  };

  // --- Template Renderers ---
  const renderTemplate = () => {
    const anim = { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, transition: { duration: 0.3 } };
    const content = (
      <>
        {/* Helper for Template Logic - Each template now uses all fields */}
        {activeTemplate === 'template1' && (
          <div style={{ display: 'flex', height: '100%' }}>
            <div style={{ width: '32%', backgroundColor: themeColor, color: '#fff', padding: '30px 15px' }}>
              <div style={photoPrevWrap}>{formData.profileImg && <img src={formData.profileImg} style={imgStyle} />}</div>
              <h4 style={sideHead}>CONTACT</h4>
              <p style={sideTxt}><Mail size={10}/> {formData.email}</p>
              <p style={sideTxt}><Linkedin size={10}/> {formData.linkedin}</p>
              <h4 style={sideHead}>SKILLS</h4>
              <p style={sideTxt}>{formData.skills}</p>
            </div>
            <div style={{ flex: 1, padding: '40px' }}>
              <h1 style={{ color: themeColor, margin: 0 }}>{formData.fullName || 'NAME'}</h1>
              <h3 style={sectionHead(themeColor)}>Summary</h3>
              <p style={bodyTxt}>{formData.summary}</p>
              <h3 style={sectionHead(themeColor)}>Experience</h3>
              <p style={bodyTxt}>{formData.experience}</p>
              <h3 style={sectionHead(themeColor)}>Education</h3>
              <p style={bodyTxt}>{formData.education}</p>
            </div>
          </div>
        )}
        {activeTemplate === 'template2' && (
          <div style={{ height: '100%' }}>
            <div style={{ backgroundColor: themeColor, color: '#fff', padding: '30px', textAlign: 'center' }}>
               {formData.profileImg && <img src={formData.profileImg} style={topImgStyle} />}
               <h1 style={{ margin: '10px 0 0' }}>{formData.fullName}</h1>
               <p style={{ fontSize: '0.8rem' }}>{formData.email} | {formData.linkedin}</p>
            </div>
            <div style={{ padding: '30px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
               <div style={{ gridColumn: '1 / span 2' }}><h3 style={sectionHead(themeColor)}>Summary</h3><p style={bodyTxt}>{formData.summary}</p></div>
               <div><h3 style={sectionHead(themeColor)}>Experience</h3><p style={bodyTxt}>{formData.experience}</p></div>
               <div>
                  <h3 style={sectionHead(themeColor)}>Education</h3><p style={bodyTxt}>{formData.education}</p>
                  <h3 style={sectionHead(themeColor)}>Skills</h3><p style={bodyTxt}>{formData.skills}</p>
               </div>
            </div>
          </div>
        )}
        {activeTemplate === 'template3' && (
          <div style={{ padding: '50px', height: '100%' }}>
            <div style={{ borderBottom: `3px solid ${themeColor}`, paddingBottom: '10px' }}>
               <h1 style={{ margin: 0, fontSize: '2.5rem' }}>{formData.fullName}</h1>
               <p>{formData.email} | {formData.linkedin}</p>
            </div>
            <div style={{ marginTop: '20px' }}>
               <h4 style={{ color: themeColor }}>SUMMARY</h4>
               <p style={bodyTxt}>{formData.summary}</p>
               <h4 style={{ color: themeColor, marginTop: '20px' }}>EXPERIENCE</h4>
               <p style={bodyTxt}>{formData.experience}</p>
               <h4 style={{ color: themeColor, marginTop: '20px' }}>EDUCATION</h4>
               <p style={bodyTxt}>{formData.education}</p>
               <h4 style={{ color: themeColor, marginTop: '20px' }}>SKILLS</h4>
               <p style={bodyTxt}>{formData.skills}</p>
            </div>
          </div>
        )}
        {activeTemplate === 'template4' && (
          <div style={{ display: 'flex', height: '100%' }}>
             <div style={{ width: '40%', backgroundColor: '#f1f5f9', padding: '30px', borderRight: `8px solid ${themeColor}` }}>
                {formData.profileImg && <img src={formData.profileImg} style={{ width: '100%', borderRadius: '10px', marginBottom: '20px' }} />}
                <h4 style={{ color: themeColor }}>CONTACT</h4>
                <p style={{ fontSize: '0.8rem' }}>{formData.email}</p>
                <p style={{ fontSize: '0.8rem' }}>{formData.linkedin}</p>
                <h4 style={{ color: themeColor, marginTop: '20px' }}>EDUCATION</h4>
                <p style={{ fontSize: '0.8rem' }}>{formData.education}</p>
                <h4 style={{ color: themeColor, marginTop: '20px' }}>SKILLS</h4>
                <p style={{ fontSize: '0.8rem' }}>{formData.skills}</p>
             </div>
             <div style={{ flex: 1, padding: '30px' }}>
                <h1 style={{ margin: 0 }}>{formData.fullName}</h1>
                <h3 style={sectionHead(themeColor)}>Summary</h3>
                <p style={bodyTxt}>{formData.summary}</p>
                <h3 style={sectionHead(themeColor)}>Experience</h3>
                <p style={bodyTxt}>{formData.experience}</p>
             </div>
          </div>
        )}
      </>
    );
    return <motion.div {...anim} style={{ height: '100%' }}>{content}</motion.div>;
  };

  return (
    <div style={containerStyle}>
      {/* Navigation */}
      <nav style={navStyle}>
        <button onClick={() => navigate('/templates')} style={navBtn}><ArrowLeft size={18}/> Back</button>
        <div style={{ fontWeight: '900', color: themeColor }}>ZEN<span style={{color:'#333'}}>CV</span></div>
        <button onClick={downloadPDF} style={downloadBtn(themeColor)}><Download size={18}/> {isMobile ? '' : 'Download PDF'}</button>
      </nav>

      <div style={{ ...editorLayout, flexDirection: isMobile ? 'column' : 'row' }}>
        {/* FORM SIDE */}
        <div style={{ 
          ...formSide, 
          width: isMobile ? '100%' : '35%', 
          display: isMobile && viewMode === 'preview' ? 'none' : 'block',
          paddingBottom: isMobile ? '100px' : '25px'
        }}>
          <div style={sectionTitle}><Layout size={14}/> Switch Template</div>
          <div style={templateGrid}>
            {templates.map(t => (
              <button key={t.id} onClick={() => setActiveTemplate(t.id)} style={templateBtn(activeTemplate === t.id, themeColor)}>{t.name}</button>
            ))}
          </div>

          <div style={sectionTitle}><Palette size={14}/> Theme Color</div>
          <div style={colorRow}>
            {colorOptions.map(c => <div key={c} onClick={() => setThemeColor(c)} style={colorCircle(c, themeColor === c)} />)}
            <div style={pickerWrap}><input type="color" value={themeColor} onChange={(e) => setThemeColor(e.target.value)} style={pickerInput} /><Palette size={12} style={pickerIcon}/></div>
          </div>

          <div style={sectionTitle}><User size={14}/> Photo</div>
          <div style={uploadBox}>
            <div style={{ position: 'relative' }}>
              <label htmlFor="p-img" style={uploadCircle(themeColor)}>
                {formData.profileImg ? <img src={formData.profileImg} style={imgStyle} /> : <Upload color="#fff" />}
              </label>
              {formData.profileImg && <button onClick={removePhoto} style={removeBtn}><Trash2 size={12} color="#fff"/></button>}
            </div>
            <input id="p-img" type="file" hidden onChange={handleImageUpload} />
          </div>

          <div style={sectionTitle}>Details</div>
          {['fullName', 'email', 'linkedin', 'summary', 'experience', 'education', 'skills'].map((name) => {
            const isSucc = formData[name] && !errors[name] && ['email', 'linkedin'].includes(name);
            return (
              <div key={name} style={{ marginBottom: '15px' }}>
                <label style={{ fontSize: '0.7rem', fontWeight: '800', color: isSucc ? '#2563eb' : '#555' }}>{name.toUpperCase()} {isSucc && '✓'}</label>
                {['summary', 'experience', 'education'].includes(name) ? 
                  <textarea name={name} value={formData[name]} onChange={handleInputChange} style={inputStyle(!!errors[name], isSucc, true)} placeholder={`Enter ${name}...`} /> :
                  <input name={name} value={formData[name]} onChange={handleInputChange} style={inputStyle(!!errors[name], isSucc, false)} placeholder={`Enter ${name}...`} />
                }
              </div>
            );
          })}
        </div>

        {/* PREVIEW SIDE */}
        <div style={{ 
          ...previewSide, 
          width: isMobile ? '100%' : '65%', 
          display: isMobile && viewMode === 'edit' ? 'none' : 'flex' 
        }}>
          <div id="resume-render" style={{
            ...resumePaper,
            transform: isMobile ? `scale(${(windowWidth - 40) / 794})` : 'scale(0.75)',
            transformOrigin: 'top center'
          }}>
             <AnimatePresence mode="wait">{renderTemplate()}</AnimatePresence>
          </div>
        </div>
      </div>

      {/* MOBILE BOTTOM NAVIGATION */}
      {isMobile && (
        <div style={mobileNav}>
          <button onClick={() => setViewMode('edit')} style={mobileNavBtn(viewMode === 'edit', themeColor)}>
            <FileText size={20} />
            <span>EDIT</span>
          </button>
          <button onClick={() => setViewMode('preview')} style={mobileNavBtn(viewMode === 'preview', themeColor)}>
            <Layout size={20} />
            <span>PREVIEW</span>
          </button>
        </div>
      )}
    </div>
  );
};

// --- Styles ---
const containerStyle = { backgroundColor: '#f1f5f9', minHeight: '100vh', fontFamily: 'Inter, sans-serif' };
const navStyle = { display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 5%', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', position: 'sticky', top: 0, zIndex: 100 };
const navBtn = { background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px', fontWeight: '700', color: '#64748b' };
const downloadBtn = (color) => ({ backgroundColor: color, color: '#fff', border: 'none', padding: '10px 15px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' });
const editorLayout = { display: 'flex', height: 'calc(100vh - 65px)', overflow: 'hidden' };
const formSide = { padding: '25px', backgroundColor: '#fff', overflowY: 'auto' };
const previewSide = { padding: '20px', justifyContent: 'center', overflowY: 'auto', backgroundColor: '#94a3b8' };
const sectionTitle = { fontSize: '0.8rem', fontWeight: '900', color: '#1e293b', margin: '20px 0 10px', display: 'flex', alignItems: 'center', gap: '8px' };
const templateGrid = { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' };
const templateBtn = (active, color) => ({ padding: '10px', borderRadius: '8px', border: active ? `2px solid ${color}` : '1px solid #e2e8f0', backgroundColor: active ? `${color}10` : '#fff', cursor: 'pointer', fontWeight: '700', fontSize: '0.75rem' });
const colorRow = { display: 'flex', gap: '8px', alignItems: 'center' };
const colorCircle = (c, active) => ({ width: '25px', height: '25px', borderRadius: '50%', backgroundColor: c, cursor: 'pointer', border: active ? '2px solid #fff' : 'none', boxShadow: active ? `0 0 0 2px ${c}` : 'none' });
const pickerWrap = { position: 'relative', width: '25px', height: '25px', borderRadius: '50%', overflow: 'hidden', border: '1px solid #ddd' };
const pickerInput = { position: 'absolute', top: '-5px', left: '-5px', width: '40px', height: '40px', cursor: 'pointer' };
const pickerIcon = { position: 'absolute', pointerEvents: 'none', top: '6px', left: '6px' };
const uploadBox = { display: 'flex', justifyContent: 'center', background: '#f8fafc', padding: '15px', borderRadius: '12px' };
const uploadCircle = (color) => ({ width: '75px', height: '75px', borderRadius: '50%', backgroundColor: color, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', cursor: 'pointer' });
const removeBtn = { position: 'absolute', bottom: 0, right: 0, backgroundColor: '#ef4444', border: 'none', borderRadius: '50%', width: '20px', height: '20px', cursor: 'pointer' };
const inputStyle = (err, succ, area) => ({ width: '100%', padding: '10px', borderRadius: '8px', border: err ? '2px solid red' : succ ? '2px solid #2563eb' : '1px solid #cbd5e1', outline: 'none', height: area ? '80px' : 'auto', resize: 'none' });
const resumePaper = { width: '210mm', minHeight: '297mm', backgroundColor: '#fff', transformOrigin: 'top center', boxShadow: '0 20px 50px rgba(0,0,0,0.3)' };
const photoPrevWrap = { width: '100px', height: '100px', borderRadius: '50%', overflow: 'hidden', border: '3px solid #fff', margin: '0 auto 20px' };
const imgStyle = { width: '100%', height: '100%', objectFit: 'cover' };
const topImgStyle = { width: '90px', height: '90px', borderRadius: '50%', border: '3px solid #fff', objectFit: 'cover' };
const sideHead = { fontSize: '0.8rem', borderBottom: '1px solid #fff5', paddingBottom: '3px', marginTop: '20px' };
const sideTxt = { fontSize: '0.7rem', marginTop: '5px', display: 'flex', alignItems: 'center', gap: '5px' };
const sectionHead = (color) => ({ color, borderBottom: `2px solid ${color}`, fontSize: '1rem', marginTop: '15px', textTransform: 'uppercase' });
const bodyTxt = { fontSize: '0.85rem', lineHeight: '1.5', marginTop: '5px', whiteSpace: 'pre-line' };

// Mobile Nav Styles
const mobileNav = { position: 'fixed', bottom: 0, left: 0, right: 0, height: '65px', backgroundColor: '#fff', borderTop: '1px solid #e2e8f0', display: 'flex', zIndex: 1000 };
const mobileNavBtn = (active, color) => ({ flex: 1, border: 'none', background: 'none', color: active ? color : '#64748b', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '4px', fontWeight: 'bold', fontSize: '0.7rem' });

export default Editor;