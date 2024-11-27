import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

function Navbar({ onGetADemoClick }) {
  return (
    <header className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          <img src="/Stage/logo.png" className="logo-image" alt="Logo" />
        </Link>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-links ">Home</Link>
          </li>
          <li className="nav-item dropdown">
            <Link to="#" className="nav-links">Scan</Link>
            <div className="dropdown-content">
              <Link to="/scan-releve" className="dropdown-link">
                <img src="/Stage/scan releve.jpg" alt="Scan Releve" className="dropdown-icon" />
                <span className="dropdown-text">Releve Banquaire</span>
              </Link>
              <Link to="/scan-bon" className="dropdown-link">
                <img src="/Stage/scan.png" alt="Scan Bon" className="dropdown-icon" />
                <span className="dropdown-text">Factures / Devis</span>
              </Link>
              <Link to="/scan-liasse-fiscale" className="dropdown-link">
                <img src="/Stage/Fiscale.png" alt="Scan Liasse Fiscale" className="dropdown-icon" />
                <span className="dropdown-text">Liasse Fiscale</span>
              </Link>
            </div>
          </li>
          <li className="nav-item">
            <Link to="/contact" className="nav-links">Contact</Link>
          </li>
        </ul>
        
        <div className="cta-buttons">
        <a href="http://localhost:3000/auth" target="_blank" rel="noopener noreferrer" className="btn btn-primary">
        ESSAI GRATUIT
</a>
          <button className="btn btn-secondary" onClick={onGetADemoClick}>DÉMO GRATUITE</button>
        </div>
      </div>
    </header>
  );
}

export default Navbar;
