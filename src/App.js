import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import TemplateSelection from './pages/TemplateSelection';
import Editor from './pages/Editor';

/**
 * ZenCV - Main Application Component
 * ---------------------------------
 * S, S, H, A, J - Project Theme
 * Color: #31694f (Dark Green) & White
 */

function App() {
  return (
    <Router>
      <div style={appContainer}>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Home />} />
          
          {/* Step 1: Choose Design */}
          <Route path="/templates" element={<TemplateSelection />} />
          
          {/* Step 2: Input Data & Live Preview */}
          <Route path="/editor" element={<Editor />} />
        </Routes>
      </div>
    </Router>
  );
}

// Global Application Styles
const appContainer = {
  fontFamily: "'Inter', sans-serif",
  color: '#1a1a1a',
  backgroundColor: '#ffffff',
  minHeight: '100vh',
  margin: 0,
  padding: 0,
  boxSizing: 'border-box',
  overflowX: 'hidden' 
};

export default App;
