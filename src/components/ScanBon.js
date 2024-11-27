import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import './ScanBon.css'; // Custom styles for ScanBon

function ScanBon() {
  const [jsonData, setJsonData] = useState('');
  //const [isEditing, setIsEditing] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false); // State for showing processing GIF
  const jsonDataRef = useRef(null); // Reference to the content editable div

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      setLoading(true);

      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://daisyocr.ddns.net/bonCommande/', true);
      xhr.onload = function () {
        setLoading(false);
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          setJsonData(response); // Assuming response is the array of objects
          alert('File uploaded successfully.');
          document.getElementById('fileInput').value = '';
        } else {
          setResponseMessage('Error uploading file: ' + xhr.statusText);
        }
      };

      xhr.onerror = function () {
        setLoading(false);
        setResponseMessage('Network error.');
      };

      xhr.send(formData);
    } else {
      setResponseMessage('Please select a file to upload.');
    }
  };
  //condition de parse l api sur la table 

  const handleDownloadJSON = () => {
    const json = JSON.stringify(jsonData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'data.json';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  };

 // const handleSaveChanges = () => {
  /*  try {
      const updatedJsonData = JSON.parse(jsonDataRef.current.innerText);
      setJsonData(updatedJsonData);
      setIsEditing(false);
    } catch (error) {
      alert('Invalid JSON format. Please correct the JSON syntax.');*/
  //  }
 // };

  return (
    <div className="scan-bon-page">
      <div className="main-content">
        <div className="text-section">
          <h1>SCANNER VOS RELEVÉS</h1>
          <p>Transformez et transférez facilement les bons scannés en fichiers JSON, en vous assurant qu'ils sont fusionnés, combinés et ordonnés selon vos préférences.</p>
          <div className="action-buttons">
            <Link to="/auth" className="btn btn-primary">ESSAI GRATUIT</Link>
            <button className="btn btn-secondary">DÉMO GRATUITE</button>
          </div>
        </div>
        <div className="image-section">
          <img src="/Stage/creer-bon-de-livraison-antsroute-7.jpg" alt="Scan Bon Feature" className="feature-image" />
        </div>
      </div>

      {/* Scrolling Images Section */}
      <div className="additional-image-container">
        <div className="scroll-images">
        <img src="/Stage/cih-removebg-preview.png" alt="CIH Bank" className="additional-image" />
            <img src="/Stage/CFG-removebg-preview.png" alt="CFG Bank" className="additional-image" />
            <img src="/Stage/CDM-removebg-preview.png" alt="CDM Bank" className="additional-image" />
            <img src="/Stage/BMCE-removebg-preview.png" alt="Bmce Bank" className="additional-image" />
            <img src="/Stage/BMCI-removebg-preview.png" alt="Bmci Bank" className="additional-image" />
            <img src="/Stage/societegenerale-removebg-preview.png" alt="societegenerale Bank" className="additional-image" />
            <img src="/Stage/almaghrib-removebg-preview.png" alt="almaghrib Bank" className="additional-image" />
            <img src="/Stage/BARID-removebg-preview.png" alt="Barid Bank" className="additional-image" />
            <img src="/Stage/chaabi-removebg-preview.png" alt="Chaabi Bank" className="additional-image" />
            <img src="/Stage/credit-removebg-preview.png" alt="Credit Bank" className="additional-image" />
            {/* Repeat the images to make the scroll seamless */}
            <img src="/Stage/cih-removebg-preview.png" alt="CIH Bank" className="additional-image" />
            <img src="/Stage/CFG-removebg-preview.png" alt="CFG Bank" className="additional-image" />
            <img src="/Stage/CDM-removebg-preview.png" alt="CDM Bank" className="additional-image" />
            <img src="/Stage/BMCE-removebg-preview.png" alt="Bmce Bank" className="additional-image" />
            <img src="/Stage/BMCI-removebg-preview.png" alt="Bmci Bank" className="additional-image" />
            <img src="/Stage/BARID-removebg-preview.png" alt="Barid Bank" className="additional-image" />
            <img src="/Stage/societegenerale-removebg-preview.png" alt="societegenerale Bank" className="additional-image" />
            <img src="/Stage/almaghrib-removebg-preview.png" alt="almaghrib Bank" className="additional-image" />
            <img src="/Stage/chaabi-removebg-preview.png" alt="Chaabi Bank" className="additional-image" />
            <img src="/Stage/credit-removebg-preview.png" alt="Credit Bank" className="additional-image" />
        </div>
      </div>

      {/* Features Section */}
      <div className="features-container">
        <div className="feature">
          <img src="/Stage/Api.png" alt="API" />
          <p><strong>24/7</strong><br />API REST Disponible</p>
        </div>
        <div className="feature">
          <img src="/Stage/8071255-removebg-preview.png" alt="Temps Réel" />
          <p><strong>Temps Réel</strong><br />Extraction de Données</p>
        </div>
        <div className="feature">
          <img src="/Stage/personalisable.png" alt="Personnalisable" />
          <p><strong>Personnalisable</strong><br />À Votre Entreprise</p>
        </div>
        <div className="feature">
          <img src="/Stage/8596275-removebg-preview.png" alt="Automatisé" />
          <p><strong>Automatisé</strong><br />Flux de Travail</p>
        </div>
      </div>

      {/* New Container Section */}
      <div className="bordered-container">
        {/* Grey Container for bon.png */}
        <div className="additional-images-section">

        <div className="grey-container">
          <img src="/Stage/bon.jpg" alt="Bon Image" className="bottom-image" />
                    {/* Conditional rendering of processing GIF */}
                    {loading && (
            <div className="processing-overlay">
              <img src="/Stage/Document-Scan.gif" alt="Processing GIF" className="processing-gif" />
            </div>
          )}
        </div>

        {/* Container for image-3 with title and upload button */}
        <div className="pdf-container">
          <div className="pdf-header">
            <h2 className="pdf-title">example.pdf</h2>
            <form id="uploadForm" className="upload-form">
              <label htmlFor="fileInput">upload</label>
              <input type="file" id="fileInput" name="file" onChange={handleFileChange} required />
              {responseMessage && <p>{responseMessage}</p>}
            </form>
          </div>
          <img src="/Stage/image-3.png" alt="PDF Example" className="bottom-image" />


        </div>
        </div>


        {/* Display the fetched data in JSON format */}
        {jsonData && (
          <div className="data-display1">
            <h2>JSON Data</h2>
            <div className="json-table1">
              <table>
                <thead>
                  <tr>
                    <th>Key</th>
                    <th>Value</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(jsonData).map((key) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{JSON.stringify(jsonData[key])}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

             
            </div>
        
        )} <button className="download-button2" onClick={handleDownloadJSON}>
                Download JSON
              </button>
      </div>

      {/* Security Section */}
      <div className="outer-container1">
        <div className="inner-container1">
          <div className="content-wrapper">
            <div className="text-content">
              <h1 className="title-text3">LA SÉCURITÉ DES DONNÉES EST NOTRE PRIORITÉ ABSOLUE</h1>
              <p className="description-text">
                Nous accordons la priorité à la confidentialité et à l'intégrité de vos données. Notre engagement envers des normes strictes de conformité garantit la protection de vos informations.
              </p>
            </div>
            <div className="image-container">
              <img src="/Stage/lock.png" alt="Lock Icon" className="icon-image" />
              <img src="/Stage/security.png" alt="Security Icon" className="icon-image1" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScanBon;
