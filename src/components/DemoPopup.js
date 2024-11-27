// DemoPopup.js
import React from 'react';
import './DemoPopup.css';

function DemoPopup({ isVisible, onClose }) {
  if (!isVisible) return null;

  return (
    <div className="popup-overlay">
      <div className="popup-content">
        <button className="close-button" onClick={onClose}>&times;</button>
        <h2>Intro Call</h2>
        <p>Thanks for your interest in our product! Here’s what you can expect from the demo:</p>
        <ul>
          <li>Realized exceptional OCR capabilities.</li>
          <li>Recognized the exceptional ROI.</li>
          <li>Conceptualized seamless workflows for your business processes.</li>
        </ul>
        <form>
          <label>
            Name:
            <input type="text" name="name" />
          </label>
          <label>
            Company Email:
            <input type="email" name="email" />
          </label>
          <label>
            Employee Count:
            <select>
              <option value="1-50">1-50</option>
              <option value="51-250">51-250</option>
              <option value="251-1000">251-1000</option>
              <option value="1000+">1000+</option>
            </select>
          </label>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default DemoPopup;
