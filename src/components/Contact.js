import React from 'react';
import './Contact.css'; // Ensure you have this CSS file for styling
import Footer from './Footer'; // Import the Footer component

function Contact() {
  return (
    <div className="contact-page">
      {/* Banner Section */}
      <div className="contact-banner">
        <img src="/Stage/contact-us.webp" alt="Contact Us" className="contact-banner-image" />
        <div className="contact-banner-text">
          <h1>Contact Us</h1>
          <p>Our staff of professionals is prepared to offer you the finest service</p>
        </div>
      </div>

      {/* Review Form Section */}
      <div className="review-form-section">
        <div className="review-form">
          <h2>Message de Révision</h2>
          <p>Envoyez-nous vos avis, cela nous aidera à nous améliorer !</p>
          <form>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" id="email" placeholder="Example@gmail.com" />
            </div>
            <div className="form-group">
              <label htmlFor="fullName">Full Name</label>
              <input type="text" id="fullName" placeholder="Sabrina Willson" />
            </div>
            <div className="form-group">
              <label htmlFor="country">Choose Country</label>
              <select id="country">
                <option value="Fes">Fes, Maroc</option>
                <option value="Casablanca">Casablanca, Maroc</option>
                <option value="Tanger">Tanger, Maroc</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea id="description" placeholder="Enter your text"></textarea>
            </div>
            <button type="submit" className="submit-button">Envoyer un message</button>
          </form>
        </div>
        {/* Map Section */}
        <div className="map-section">
          <iframe 
            src="https://maps.google.com/maps?output=embed&q=54 Ave Allal Ben Abdellah, Fes 30000&z=10&t=m" 
            className="map-iframe" 
            title="Daisy OCR Location">
          </iframe>
        </div>
      </div>
    </div>
  );
}

export default Contact;
