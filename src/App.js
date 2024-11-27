import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import Content from './components/Content';
import Contact from './components/Contact';
import ScanBon from './components/ScanBon';
import ScanLiasse from './components/ScanLiasse';
import ScanReleve from './components/ScanReleve';
import Footer from './components/Footer';
import AuthForm from './components/AuthForm';
import DemoPopup from './components/DemoPopup'; // Import the DemoPopup component

function App() {
  const [isPopupVisible, setPopupVisible] = useState(false);

  const handleOpenPopup = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  return (
    <Router>
      <Navbar onGetADemoClick={handleOpenPopup} /> {/* Pass the handler to Navbar */}
      <Routes>
        <Route path="/" element={<Content onGetADemoClick={handleOpenPopup} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/scan-bon" element={<ScanBon />} />
        <Route path="/scan-liasse-fiscale" element={<ScanLiasse />} />
        <Route path="/scan-releve" element={<ScanReleve />} />
        <Route path="/auth" element={<AuthForm />} />
      </Routes>
      <Footer />
      <DemoPopup isVisible={isPopupVisible} onClose={handleClosePopup} /> {/* Include DemoPopup */}
    </Router>
  );
}

export default App;
