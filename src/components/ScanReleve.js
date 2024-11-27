// Import necessary components and libraries
import React, { useState, useEffect } from 'react';
import './ScanReleve.css'; // Ensure this CSS file contains the styles provided
import DemoPopup from './DemoPopup'; // Import the DemoPopup component
import { Link } from 'react-router-dom';
import * as pdfjsLib from 'pdfjs-dist/webpack';

function ScanReleve() {
  const [tableData, setTableData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [responseMessage, setResponseMessage] = useState('');
  const [csvData, setCsvData] = useState('');
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [fileName, setFileName] = useState('example.pdf');
  const [imageSrc, setImageSrc] = useState(null); // State for the image preview
  const [error, setError] = useState(''); // State for errors
  const [isProcessing, setIsProcessing] = useState(false); // State for showing processing GIF
  const [selectedOption, setSelectedOption] = useState('Sélectionnez une option'); // State for selected bank option
  const [showSelect, setShowSelect] = useState(false);
  useEffect(() => {
    // Disable file input initially
    document.getElementById('fileInput').disabled = true;
  }, []);

  const handleOpenPopup = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    // Enable file input when option is selected
    document.getElementById('fileInput').disabled = false;
    if (event.target.value !== '') {
      // Continue the scan or perform the desired action after selecting an option
      setShowSelect(false); // Hide the select dropdown if needed
      // Perform your scan or further actions here
    }
  };

  const handleFileChange = async (event) => {
    setIsProcessing(true); // Show loading GIF

    const file = event.target.files[0];

    if (file) {
      setFileName(file.name); // Set the uploaded file name
      const formData = new FormData();
      formData.append('file', file);
      const selectedValue = selectedOption; // Use selected option here

      // Convert PDF to image
      const reader = new FileReader();
      reader.onload = async () => {
        try {
          const pdfData = new Uint8Array(reader.result);
          const loadingTask = pdfjsLib.getDocument({ data: pdfData });
          const pdf = await loadingTask.promise;
          const page = await pdf.getPage(1);
          const viewport = page.getViewport({ scale: 1.5 });
          const canvas = document.createElement('canvas');
          const context = canvas.getContext('2d');
          canvas.height = viewport.height;
          canvas.width = viewport.width;

          await page.render({ canvasContext: context, viewport: viewport }).promise;

          // Convert canvas to base64 image
          const imgBase64 = canvas.toDataURL('image/png');
          setImageSrc(imgBase64);
        } catch (err) {
          setError('Error processing PDF file');
          console.error(err);
        }
      };
      reader.readAsArrayBuffer(file);

      // Existing file upload functionality
      const xhr = new XMLHttpRequest();
      xhr.open('POST', 'https://daisyocr.ddns.net/releveBancaire/' + selectedValue, true);
      xhr.onload = function () {
        setIsProcessing(false); // Hide loading GIF
        if (xhr.status === 200) {
          const response = JSON.parse(xhr.responseText);
          setTableData(response); // Assuming response is the array of objects

          let csv = "Date,Libelle,Debit,Credit\n";
          response.forEach(item => {
            csv += `${item.valeur},${item.libelle},${item.debit},${item.credit}\n`;
          });

          setCsvData(csv);
          document.getElementById('fileInput').value = '';
        } else {
          setResponseMessage('Error uploading file: ' + xhr.statusText);
        }
      };

      xhr.onerror = function () {
        setIsProcessing(false); // Hide loading GIF
        setResponseMessage('Network error.');
      };

      xhr.send(formData);
    } else {
      setIsProcessing(false); // Hide loading GIF
      setResponseMessage('Please select a file to upload.');
    }
  };

  const handleEdit = (index, key, value) => {
    const updatedData = [...tableData];
    updatedData[index][key] = value;
    setTableData(updatedData);
  };

  const handleBlur = (index, key) => (event) => {
    handleEdit(index, key, event.target.innerText);
  };

  const handleDownloadCSV = () => {
    const csv = convertToCSV(tableData);
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'table_data.csv';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJSON = () => {
    const json = JSON.stringify(tableData, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'table_data.json';
    document.body.appendChild(a);
    a.click();
    URL.revokeObjectURL(url);
  };

  const convertToCSV = (data) => {
    if (data.length === 0) return '';
    const headers = Object.keys(data[0]).join(',');
    const rows = data.map(row => Object.values(row).join(','));
    return [headers, ...rows].join('\n');
  };

  return (
    <div className="scan-bon-page">
      <div className="main-content">
        <div className="text-section">
          <h1>SCANNER VOS RELEVÉS</h1>
          <p>Transformez et transférez facilement les relevés bancaires scannés en fichiers CSV, en vous assurant qu'ils sont fusionnés, combinés et ordonnés selon vos préférences</p>
          <div className="action-buttons">
            <Link to="/auth" className="btn btn-primary">ESSAI GRATUIT</Link>
            <button className="btn btn-secondary" onClick={handleOpenPopup}>DÉMO GRATUITE</button>
          </div>
          {/* Render the DemoPopup component */}
          <DemoPopup isVisible={isPopupVisible} onClose={handleClosePopup} />
        </div>
        <div className="image-section">
          <img src="/Stage/1717078663.webp" alt="Scan Bon Feature" className="feature-image" />
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
          <img src="\Stage\8071255-removebg-preview.png" alt="Temps Réel" />
          <p><strong>Temps Réel</strong><br />Extraction de Données</p>
        </div>
        <div className="feature">
          <img src="/Stage/personalisable.png" alt="Personnalisable" />
          <p><strong>Personnalisable</strong><br />À Votre Entreprise</p>
        </div>
        <div className="feature">
          <img src="/Stage/8596275-removebg-preview.png" alt="Automatisé" />
          <p><strong>Flux de Travail</strong><br />Automatisé</p>
        </div>
      </div>
       <div className="bordered-container1">


<div className="additional-images-section">
  <div className="grey-container">
    {/* Conditional rendering of image preview */}
    {imageSrc ? (
      <img src={imageSrc} alt="PDF Preview" className="bottom-image" />
    ) : (
      <img src="/Stage/image-2.png" alt="Default Additional Named Image" className="bottom-image" />
    )}

    {/* Conditional rendering of processing GIF */}
    {isProcessing && (
        <div className="processing-overlay">
      <img src="/Stage/Document-Scan.gif" alt="Processing GIF" className="processing-gif" />
      </div>

    )}
  </div>

        {/* Container for image-3 with title and upload button */}
        <div className="pdf-container">
          <div className="pdf-header">
            <h2 className="pdf-title">{fileName}</h2>
            <form id="uploadForm" className="upload-form">
              <label htmlFor="fileInput" className='choisir'>Choisir un fichier :</label>
              <input type="file" id="fileInput" name="file" onChange={handleFileChange} required disabled />
              <select id="selectOption" onChange={handleOptionChange} value={selectedOption}>
              <option value="" className='selection'>Sélectionnez une option</option>

                <option value="attijari">attijari</option>
                <option value="BP">Banque Populaire</option>
                <option value="SG">Société Générale Maroc</option>
                <option value="cih">CIH</option>
                {/* Add more options as needed */}
              </select>
              {responseMessage && <p>{responseMessage}</p>}
              {tableData.length === 0 && (
                <>
                  <img src="/Stage/table.png" alt="PDF Example" className="bottom-image7" />
                </>
              )}
            </form>
          </div>

          {/* Display the fetched data in a table and JSON format */}
          {tableData.length > 0 && (
            <div className="data-display">
              <div className="data-table">
                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Libelle</th>
                        <th>Debit</th>
                        <th>Credit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tableData.map((item, index) => (
                        <tr key={index}>
                          <td contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={handleBlur(index, 'valeur')}>{item.valeur}</td>
                          <td contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={handleBlur(index, 'libelle')}>{item.libelle}</td>
                          <td contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={handleBlur(index, 'debit')}>{item.debit}</td>
                          <td contentEditable={isEditing} suppressContentEditableWarning={true} onBlur={handleBlur(index, 'credit')}>{item.credit}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button onClick={() => setIsEditing(!isEditing)}>
                  {isEditing ? "Enregistrer" : "Éditer"}
                </button>
                <button className="download-button" onClick={handleDownloadCSV}>TÉLÉCHARGER CSV</button>
                <button className="download-button" onClick={handleDownloadJSON}>TÉLÉCHARGER JSON</button>
              </div>
            </div>
          )}
        </div>
      </div>
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

      {/* Demo Popup */}
      {isPopupVisible && <DemoPopup onClose={handleClosePopup} />}
    </div>
  );
}

export default ScanReleve;

