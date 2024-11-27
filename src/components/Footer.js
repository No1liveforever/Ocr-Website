import React from 'react';
import './Footer.css'; // Ensure you have the CSS for styling

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-section about">
          <img src="/Stage/logo.png" alt="Daisy OCR Logo" className="footer-logo" />
          <p>
            Transformez la gestion de vos documents avec notre solution OCR avancée. Scannez vos rapports d'intervention
            rapidement et avec précision, gérez vos ordres de mission de manière organisée et intuitive, et analysez les
            statistiques d'intervention pour améliorer la planification et la prise de décision. Adoptez notre outil pour
            une efficacité accrue et une gestion simplifiée de vos opérations.
          </p>
          
        </div>
        
      </div>
      <div className="footer-section pages">
          <h4>Pages</h4>
          <ul>
            <li>How it works</li>
            <li>Reporting</li>
            <li>Demo</li>
            <li>Contact</li>
          </ul>
        </div>
        <div className="footer-section services">
          <h4>Services</h4>
          <ul>
            <li>Support</li>
            <li>OCR Scan</li>
            <li>Integrations</li>
          </ul>
        </div>
        <div className="footer-section contact">
          <h4>Contact</h4>
          <ul>
            <li><i className="fas fa-phone"></i> (67) 1788 10171</li>
            <li><i className="fas fa-envelope"></i> daisyconsulting.ma</li>
            <li><i className="fas fa-map-marker-alt"></i> 54 Ave Allal Ben Abdellah, Fes 30000</li>
          </ul>
        </div>
        <div className="footer-section social-media">
          <h4>Social Media</h4>
          <div className="social-icons">
            <a href="https://www.linkedin.com/company/daisy-consulting-group/?originalSubdomain=ma" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-linkedin-in"></i>
            </a>
            <a href="https://www.odoo.com/fr_FR/partners/daisy-consulting-10902726" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.instagram.com/daisyconsulting/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="https://www.pinterest.com/" target="_blank" rel="noopener noreferrer">
              <i className="fab fa-pinterest-p"></i>
            </a>
          </div>
        </div>
    </footer>
  );
}

export default Footer;
