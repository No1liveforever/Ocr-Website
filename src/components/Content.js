import React, { useState, useEffect } from 'react';
import './Content.css'; // Ensure you have the CSS for styling
import Footer from './Footer'; // Import the Footer component
import DemoPopup from './DemoPopup'; // Import the DemoPopup component
import { Link } from 'react-router-dom';
import VideoModal from './VideoModal';



function Content() {
  const [isPopupVisible, setPopupVisible] = useState(false);
  const [isVideoModalVisible, setVideoModalVisible] = useState(false);

  const handleVideoModalOpen = (event) => {
    event.preventDefault(); // Prevent default anchor behavior
    setVideoModalVisible(true);
  };

  const handleVideoModalClose = () => {
    setVideoModalVisible(false);
  };


  const handleOpenPopup = () => {
    setPopupVisible(true);
  };

  const handleClosePopup = () => {
    setPopupVisible(false);
  };

  // State to track the current slide index
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3; // Number of slides in the carousel

  // Function to handle the next slide transition
  const handleNext = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % totalSlides);
  };

  // Function to handle the previous slide transition
  const handlePrev = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + totalSlides) % totalSlides);
  };

  // Use an effect to handle slide indicators click events
  useEffect(() => {
    const indicators = document.querySelectorAll('.slider-indicators li');
    indicators.forEach((indicator, index) => {
      indicator.className = currentSlide === index ? 'active' : '';
    });
  }, [currentSlide]);

  return (
    <div className="content-container">
      <div className="main-text">
        <h1 className="main-title">
          <span style={{ fontWeight: 700 }}>
            <span className="text-black">Mettez vos processus métier en pilotage automatique</span>
          </span>
          <br />
          <span className="highlight-text" style={{ fontWeight: 700 }}>avec DAISYOCR</span>
        </h1>
        <p className="sub-text">
        Découvrez des informations précieuses à partir de n'importe quel document et automatisez les tâches répétitives avec des flux de travail alimentés par l'IA.        </p>
        <div className="buttons">
        <Link to="/auth" className="btn btn-primary">TRY FOR FREE</Link>
        <button className="btn btn-secondary" onClick={handleOpenPopup}>DÉMO GRATUITE</button>
        </div>
        <p className="trusted-by">
        Fiable par plus de 10 banques à travers le monde

        </p>
          {/* Render the DemoPopup component */}
      <DemoPopup isVisible={isPopupVisible} onClose={handleClosePopup} />

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
        {/* New Section for About Us */}
        <section className="about-section">
          <div className="about-content">
            <h1 className="about-title">
              <span className="text-black">À PROPOS DE NOUS |​&nbsp;</span>
              <span className="highlight-text">Qui sommes-nous</span>
            </h1>
            <p className="about-description">
              Transformez la gestion de vos documents avec notre solution OCR avancée. Scannez vos rapports d'intervention rapidement et avec précision, gérez vos ordres de mission de manière organisée et intuitive, et analysez les statistiques d'intervention pour améliorer la planification et la prise de décision. Adoptez notre outil pour une efficacité accrue et une gestion simplifiée de vos opérations.
            </p>
            <Link to="/contact" className="btn about-btn"> SAVOIR PLUS</Link>
          </div>
          <div className="about-image">
            <img
              src="/Stage/pngegg.png"
              alt="Earth"
              className="about-img"
            />
          </div>
        </section>
      </div>
      {/* How Businesses Use DAISY OCR Section */}
      <section className="usage-section">
        <h4 className="usage-title">Comment les entreprises utilisent DAISY OCR ?     </h4>
        <div className="usage-layout">
          <div className="usage-row">
            <div className="usage-image">
              <img src="/Stage/Screenshot2024-06-13172623.png" alt="Usage Example" />
            </div>
            <div className="usage-content">
              <h2 className="usage-subtitle">PRODUCTION</h2>
              <h4 className="usage-description">Automatisez le traitement des relevés bancaires et rationalisez les transactions en quelques jours</h4>
              <h6 className="usage-detail">
              Transformez les relevés bancaires scannés en fichiers CSV sans effort. Éliminez la saisie manuelle des données, réduisez les erreurs et suivez les enregistrements financiers en un seul endroit centralisé. Améliorez les rapports financiers et la prise de décision avec des données précises et opportunes. Évoluez vos opérations tout en maintenant des coûts de traitement bas.              </h6>
              <a href="#" className="usage-link" onClick={handleVideoModalOpen}>Explorez les types de documents -&gt;</a>
               {/* Video Modal */}
              <VideoModal isVisible={isVideoModalVisible} onClose={handleVideoModalClose} />
              </div>
          </div>
        </div>
      </section>

      {/* Another Use Case */}
      <section className="use-case-section">
        <div className="use-case-layout">
          <div className="use-case-row">
            <div className="use-case-content">
              <h3 className="use-case-title">PRODUCTION</h3>
              <h5 className="use-case-description">
              Rationalisez le traitement des rapports et transformez les conceptions rapidement
              </h5>
              <h6 className="use-case-detail">
              Convertissez les rapports financiers scannés et les liasses fiscales en fichiers CSV ou JSON sans effort. Éliminez la saisie manuelle des données, améliorez la précision et gérez les données efficacement. Améliorez la gestion des données, assurez la conformité et optimisez vos flux de production.              </h6>
              <a href="#" className="use-case-link">Explorez les types de documents-&gt;</a>
            </div>
            <div className="use-case-image">
              <img src="/Stage/Screenshot2024-06-13173720.png" alt="Report Processing" />
            </div>
          </div>
        </div>
      </section>

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

<div className="modules-container">
  <div className="modules-text">
    <h1>Nos Modules <span className="highlight">| Documents Supportés</span></h1>
  </div>
  <div className="modules-grid">
    <div className="module">
      <img src="/Stage/Factures.png" alt="Factures" />
      <p><strong>Factures, Reçus, Notes de frais</strong></p>
    </div>
    <div className="module">
      <img src="/Stage/id.png" alt="Cartes d'identité" />
      <p><strong>Cartes d'identité, Permis de conduire, Passeports</strong></p>
    </div>
    <div className="module">
      <img src="/Stage/analytique.png" alt="Analytique" />
      <p><strong>Analytique et Reporting</strong></p>
    </div>
    <div className="module">
      <img src="/Stage/lieux.png" alt="Lieux et Groupes" />
      <p><strong>Lieux et Groupes</strong></p>
    </div>
    <div className="module">
      <img src="/Stage/scan releve.png" alt="Scan des transactions" />
      <p><strong>Scan des transactions</strong></p>
    </div>
    <div className="module">
      <img src="/Stage/gestion.png" alt="Gestion des Documents" />
      <p><strong>Gestion des Documents</strong></p>
    </div>
    <div className="module">
      <img src="/Stage/Contacts.png" alt="Contacts" />
      <p><strong>Contacts</strong></p>
    </div>
    <div className="module">
      <img src="/Stage/Projets.png" alt="Projets" />
      <p><strong>Projets</strong></p>
    </div>
  </div>
        {/* Slider Section */}
      <section className="slider" id="carousel">
        <ol className="slider-indicators">
          <li
            data-target="#carousel"
            className={currentSlide === 0 ? 'active' : ''}
            data-slide-to="0"
            onClick={() => setCurrentSlide(0)}
          ></li>
          <li
            data-target="#carousel"
            className={currentSlide === 1 ? 'active' : ''}
            data-slide-to="1"
            onClick={() => setCurrentSlide(1)}
          ></li>
          <li
            data-target="#carousel"
            className={currentSlide === 2 ? 'active' : ''}
            data-slide-to="2"
            onClick={() => setCurrentSlide(2)}
          ></li>
        </ol>
        <div className="slider-inner">
          <div
            className={`slider-item ${currentSlide === 0 ? 'active' : ''}`}
            style={{ backgroundImage: 'url(/Stage/sample-commercial-invoice-template-7wc2s.webp)' }}
          >
            <div className="slider-content">
              <h1 className="slider-title">Invoice Document.</h1>
              <p className="slider-description">Numérisation des factures : Transformez vos factures en fichiers CSV et JSON sans effort</p>
              <div className="slider-buttons">
              <Link to="/contact" className="btn about-btn">SAVOIR PLUS</Link>
              </div>
            </div>
          </div>
          <div
            className={`slider-item ${currentSlide === 1 ? 'active' : ''}`}
            style={{ backgroundImage: 'url(/Stage/pexels-photo-6863332.jpeg)' }}
          >
            <div className="slider-content">
              <h1 className="slider-title">Tax Documents.</h1>
              <p className="slider-description">Numérisation des liasses fiscales : Convertissez vos documents fiscaux en plusieurs fichiers PDF, CSV et rapports analytiques complets</p>
              <div className="slider-buttons">
              <Link to="/contact" className="btn about-btn">SAVOIR PLUS</Link>
              </div>
            </div>
          </div>
          <div
            className={`slider-item ${currentSlide === 2 ? 'active' : ''}`}
            style={{ backgroundImage: 'url(/Stage/istockphoto-1133420269-612x612.jpg)' }}
          >
            <div className="slider-content">
              <h1 className="slider-title">Bank Statement.</h1>
              <p className="slider-description">Numérisation des relevés bancaires : Extrayez facilement les données des relevés bancaires en fichiers JSON et CSV</p>
              <div className="slider-buttons">
              <Link to="/contact" className="btn about-btn">SAVOIR PLUS</Link>
              </div>
            </div>
          </div>
        </div>
        <button className="slider-control-prev" onClick={handlePrev}>
          <span aria-hidden="true" className="slider-control-icon">‹</span>
          <span className="sr-only">Previous</span>
        </button>
        <button className="slider-control-next" onClick={handleNext}>
          <span aria-hidden="true" className="slider-control-icon">›</span>
          <span className="sr-only">Next</span>
        </button>
      </section>
      </div>
       {/* New Container Section */}
       <div className="outer-container">
        <div className="inner-container">
          <h1 className="title-text">RÉDÉFINISSEZ L'EFFICACITÉ          </h1>
          <h2  className="title-text2">Traitement des données à la vitesse de l'éclair - Commencez votre transformation dès aujourd'hui !</h2>
          <Link to="/auth"  className="demo-button">Try For Free</Link>
        </div>
      </div>

      


    </div>
  );
}

export default Content;
