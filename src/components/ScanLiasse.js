import React, { useRef, useState } from 'react';
import './ScanLiasse.css';
import DemoPopup from './DemoPopup'; // Import the DemoPopup component
import { Link } from 'react-router-dom';

function ScanLiasse() {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [jsonData, setJsonData] = useState('');
  const [analysisResult, setAnalysisResult] = useState('');
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [fileName, setFileName] = useState('example.pdf'); // State to store the file name
  const [liasseData, setLiasseData] = useState({
    actif: '',
    passif: '',
    cpc: '',
    cpc_details: '',
    esg: '',
  });
  const [tableData, setTableData] = useState(null);
  const [editableData, setEditableData] = useState(null);
  const [emptyColumns, setEmptyColumns] = useState([]);
  const [currentColumnName, setCurrentColumnName] = useState('');

  const handleOpenPopup = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name); // Update the file name state
      const formData = new FormData();
      formData.append('file', file);
      setLoading(true);
      setResponseMessage('');

      fetch('https://daisyocr.ddns.net/liassefiscale/', {
        method: 'POST',
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          setLoading(false);
          setJsonData(JSON.stringify(data, null, 2));
          setLiasseData(data);
          setResponseMessage('File uploaded successfully.');
        })
        .catch(error => {
          setLoading(false);
          setResponseMessage('Error uploading file.');
          console.error('Error:', error);
        });
    }
  };

  const downloadCSV = (filename, data) => {
    const csvContent = data.map(row => 
      row.map(cell => `"${cell.replace(/"/g, '""')}"`).join(',')
    ).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = `${filename}.csv`;
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  };

  const analyseLiasseFiscal = () => {
    setLoading(true);
    fetch('https://daisyocr.ddns.net/analyse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dictionnaire: liasseData }),
    })
      .then(response => response.text())  // Expecting text response
      .then(data => {
        setLoading(false);
        setResponseMessage('Analysis completed successfully.');
        setAnalysisResult(data);
      })
      .catch(error => {
        setLoading(false);
        setResponseMessage('Error analyzing data.');
        console.error('Error:', error);
      });
  };

  const handleButtonClick = (type, name) => {
    const data = liasseData[type];
    setCurrentColumnName(name);
    setTableData(data);
    const splitData = data.split('\n').map(row => row.split(/"\s*,\s*"|"\s*,\s*"/));
    setEditableData(splitData);
    setEmptyColumns(findEmptyColumns(splitData));
  };

  const findEmptyColumns = (data) => {
    const emptyCols = [];
    if (data.length > 0) {
      for (let colIndex = 0; colIndex < data[0].length; colIndex++) {
        const isEmpty = data.every(row => !row[colIndex]);
        if (isEmpty) {
          emptyCols.push(colIndex);
        }
      }
    }
    return emptyCols;
  };

  const handleEditChange = (rowIndex, cellIndex, value) => {
    const updatedData = editableData.map((row, rIdx) =>
      row.map((cell, cIdx) => (rIdx === rowIndex && cIdx === cellIndex ? value : cell))
    );
    setEditableData(updatedData);
    setEmptyColumns(findEmptyColumns(updatedData));
  };

  const renderTable = (data) => {
    if (!data) return null;

    const headers = data[0];
    const columns = headers.map((header, index) => ({
      name: `Column ${index + 1}`,
      visible: !emptyColumns.includes(index)
    }));

    return (
      <table className="table-wrapper">
        <thead>
          <tr>
            {columns.map((col, index) => (
              col.visible && <th key={index} className={`column${index + 1}`}>{col.name}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {editableData.slice(1).map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                columns[cellIndex].visible && (
                  <td key={cellIndex} className={`column${cellIndex + 1}`}>
                    <input 
                      type="text"
                      value={cell ? cell.replace(/"/g, '') : ''} // Replace double quotes
                      onChange={(e) => handleEditChange(rowIndex + 1, cellIndex, e.target.value)}
                    />
                  </td>
                )
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  const handleDownloadUpdatedCSV = () => {
    downloadCSV('updated_data', editableData);
  };

  return (
    <div className="scan-bon-page">
      <div className="main-content">
        <div className="text-section">
          <h1>SCANNER VOS RELEVÉS</h1>
          <p>Transformez et transférez facilement les liasses fiscales scannées en fichiers CSV, en vous assurant qu'elles sont fusionnées, combinées et ordonnées selon vos préférences. Obtenez également une analyse détaillée pour votre entreprise.</p>
          <div className="action-buttons">
            <Link to="/auth" className="btn btn-primary">ESSAI GRATUIT</Link>
            <button className="btn btn-secondary" onClick={handleOpenPopup}>DÉMO GRATUITE</button>
          </div>
          {/* Render the DemoPopup component */}
          <DemoPopup isVisible={isPopupVisible} onClose={handleClosePopup} />
        </div>
        <div className="image-section">
          <img src="/Stage/image-4.png" alt="Scan Bon Feature" className="feature-image" />
        </div>
      </div>

      {/* Loading GIF */}
      {loading && (
        <div className="processing-overlay">
          <img id="processing-overlay" src="/Stage/Document-Scan.gif" alt="Loading..." className="processing-gif" />
        </div>
      )}

      {/* Additional Images Section */}
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
          <img src="\Stage\8071255-removebg-preview.png" alt="Temps Réel" />
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

      {/* Border Container */}
      <div className="bordered-container3">
        {/* Additional Images Section */}
        <div className="additional-images-section">
          {/* Grey Container for bon.png */}
          <div className="grey-container7">
            <img src="/Stage/Screenshot 2024-06-20 192914.png" alt="Bon Image" className="bottom-image10" />
          </div>

          {/* Container for image-3 with title and upload button */}
          <div className="pdf-container1">
            <div className="pdf-header1">
              <h2 className="pdf-title">{fileName}</h2> {/* Display the updated file name */}
              <button className="upload-button" onClick={handleUploadClick}>Télécharger</button>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} style={{ display: 'none' }} />
            </div>
            <img src="/Stage/Screenshot 2024-06-20 142200.png" alt="Additional Named Image" className="bottom-image1" />
            <img src="/Stage/image-5.png" alt="PDF Example" className="bottom-image1" />
          </div>
        </div>

        {/* Response Message */}
        {responseMessage && <p>{responseMessage}</p>}
        
        {/* JSON Data */}
        {jsonData && (
          <div>
            <button className="button button-primary" onClick={() => handleButtonClick('actif', 'Bilan Actif')}>Show Actif</button>
            <button className="button button-primary" onClick={() => handleButtonClick('passif', 'Bilan Passif')}>Show Passif</button>
            <button className="button button-primary" onClick={() => handleButtonClick('cpc', 'CPC')}>Show CPC</button>
            <button className="button button-primary" onClick={() => handleButtonClick('cpc_details', 'CPC Details')}>Show CPC Details</button>
            <button className="button button-primary" onClick={() => handleButtonClick('esg', 'E.G.S')}>Show E.G.S</button>
            <button className="button button-secondary" onClick={analyseLiasseFiscal}>Analyze</button>
          </div>
        )}

        {/* Table Data */}
        <div>
          {currentColumnName && <h2>{currentColumnName}</h2>}
          {editableData && renderTable(editableData)}
          {editableData && (
            <div>
              <button className="button button-primary" onClick={handleDownloadUpdatedCSV}>Download Updated CSV</button>
            </div>
          )}
        </div>

        {/* Analysis Result */}
        {analysisResult && <pre>{analysisResult}</pre>}
      </div>

      {/* New Container Section */}
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

export default ScanLiasse;
