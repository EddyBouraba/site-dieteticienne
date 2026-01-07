import { useState, useEffect } from 'react';
import { images } from '../assets/images';
import { useScrollAnimation } from '../hooks/useScrollAnimation';

const Entreprise = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [contentRef, contentVisible] = useScrollAnimation({ threshold: 0.05 });
  const [imagesRef, imagesVisible] = useScrollAnimation({ threshold: 0.05 });
  
  // État pour la modal de zoom
  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  
  // Liste des images
  const galleryImages = [
    { 
      src: images.entreprise1, 
      alt: "Atelier d'entreprise - Intervention diététique",
      title: "Intervention diététique",
      description: "Sensibilisation à l'équilibre alimentaire"
    },
    { 
      src: images.entreprise2, 
      alt: "Atelier d'entreprise - Pratique culinaire",
      title: "Pratique culinaire",
      description: "Ateliers de préparation culinaire"
    },
    { 
      src: images.entreprise3, 
      alt: "Atelier d'entreprise - Séminaire nutrition",
      title: "Séminaire nutrition",
      description: "Temps forts autour de la nutrition"
    },
  ];
  
  // Gestion de la touche Échap pour fermer la modal
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && selectedImageIndex !== null) {
        setSelectedImageIndex(null);
      }
    };
    
    // Empêcher le scroll du body quand la modal est ouverte
    if (selectedImageIndex !== null) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    document.addEventListener('keydown', handleEscape);
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [selectedImageIndex]);
  
  // Navigation dans la modal
  const goToPrevious = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => 
      prev === 0 ? galleryImages.length - 1 : prev - 1
    );
  };
  
  const goToNext = (e) => {
    e.stopPropagation();
    setSelectedImageIndex((prev) => 
      (prev + 1) % galleryImages.length
    );
  };
  
  const openModal = (index) => {
    setSelectedImageIndex(index);
  };
  
  const goToSlide = (index) => {
    setSelectedImageIndex(index);
  };
  
  const closeModal = () => {
    setSelectedImageIndex(null);
  };

  return (
    <section id="entreprise" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Titre de section */}
        <div
          ref={titleRef}
          className={`text-center mb-16 transition-all duration-700 ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-[#7c9082] font-medium text-sm tracking-wider uppercase">
            Entreprise
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d3436] mt-3">
            Ateliers et séminaires d'entreprise
          </h2>
          <p className="text-lg text-[#636e72] mt-4 max-w-2xl mx-auto">
            Des interventions sur mesure pour sensibiliser vos équipes à l'équilibre alimentaire
          </p>
          <div className="w-20 h-1 bg-[#7c9082] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Contenu texte */}
        <div
          ref={contentRef}
          className={`max-w-3xl mx-auto mb-12 transition-all duration-700 ${
            contentVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <p className="text-lg text-[#636e72] leading-relaxed text-center mb-6">
            Pour les séminaires et ateliers d'entreprise, je propose également des temps forts autour de l'équilibre alimentaire afin de mieux manger au quotidien et notamment sur son lieu de travail. Un moment d'échange et de convivialité qui s'accompagne, si les locaux le permettent, de pratiques culinaires : collations rapides et sans cuisson, salades gourmandes et équilibrées etc...
          </p>
          
          {/* Types d'ateliers */}
          <div className="flex flex-wrap justify-center gap-3 mt-6">
            {[
              "Ateliers nutrition",
              "Pratiques culinaires",
              "Séminaires bien-être",
              "Coaching collectif"
            ].map((type, index) => (
              <span
                key={index}
                className="px-4 py-2 bg-[#7c9082]/10 text-[#5a6b5e] rounded-full text-sm font-medium"
              >
                {type}
              </span>
            ))}
          </div>
        </div>

        {/* Galerie des photos */}
        <div
          ref={imagesRef}
          className={`grid md:grid-cols-3 gap-6 mb-12 transition-all duration-700 ${
            imagesVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          {galleryImages.map((image, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl shadow-lg cursor-pointer"
              style={{
                transitionDelay: imagesVisible ? `${index * 100}ms` : "0ms",
              }}
              onClick={() => openModal(index)}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-white font-semibold text-lg mb-1">{image.title}</h3>
                  <p className="text-white/90 text-sm">{image.description}</p>
                </div>
                {/* Icône de zoom */}
                <div className="absolute top-4 right-4 bg-white/90 text-[#7c9082] p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {/* Modal de zoom */}
        {selectedImageIndex !== null && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 animate-fadeIn"
            onClick={closeModal}
          >
            {/* Bouton fermer */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-3 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white"
              aria-label="Fermer"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            
            {/* Bouton précédent */}
            {galleryImages.length > 1 && (
              <button
                onClick={goToPrevious}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Image précédente"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            )}
            
            {/* Image zoomée */}
            <div
              className="relative max-w-7xl max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={galleryImages[selectedImageIndex].src}
                alt={galleryImages[selectedImageIndex].alt}
                className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
                key={selectedImageIndex}
              />
              
              {/* Informations de l'image */}
              <div 
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6 rounded-b-lg"
                key={`info-${selectedImageIndex}`}
              >
                <h3 className="text-white font-semibold text-xl mb-1">
                  {galleryImages[selectedImageIndex].title}
                </h3>
                <p className="text-white/90 text-sm">
                  {galleryImages[selectedImageIndex].description}
                </p>
              </div>
            </div>
            
            {/* Bouton suivant */}
            {galleryImages.length > 1 && (
              <button
                onClick={goToNext}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/10 hover:bg-white/20 text-white p-4 rounded-full transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Image suivante"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            )}
            
            {/* Indicateur de position */}
            {galleryImages.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                {galleryImages.map((_, index) => (
                  <button
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      goToSlide(index);
                    }}
                    className={`transition-all duration-300 rounded-full ${
                      index === selectedImageIndex
                        ? 'w-8 h-2 bg-white'
                        : 'w-2 h-2 bg-white/50 hover:bg-white/80'
                    }`}
                    aria-label={`Aller à l'image ${index + 1}`}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* Avantages des ateliers */}
        <div className="mt-16 grid sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center p-6 bg-[#faf8f5] rounded-2xl">
            <div className="w-14 h-14 mx-auto bg-[#7c9082]/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-[#7c9082]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-[#2d3436] mb-2">Approche collective</h3>
            <p className="text-sm text-[#636e72]">Renforce la cohésion d'équipe</p>
          </div>

          <div className="text-center p-6 bg-[#faf8f5] rounded-2xl">
            <div className="w-14 h-14 mx-auto bg-[#7c9082]/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-[#7c9082]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-[#2d3436] mb-2">Sur mesure</h3>
            <p className="text-sm text-[#636e72]">Adapté à vos besoins</p>
          </div>

          <div className="text-center p-6 bg-[#faf8f5] rounded-2xl">
            <div className="w-14 h-14 mx-auto bg-[#7c9082]/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-[#7c9082]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="font-semibold text-[#2d3436] mb-2">Pédagogique</h3>
            <p className="text-sm text-[#636e72]">Apprentissage pratique</p>
          </div>

          <div className="text-center p-6 bg-[#faf8f5] rounded-2xl">
            <div className="w-14 h-14 mx-auto bg-[#7c9082]/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-[#7c9082]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-[#2d3436] mb-2">Convivial</h3>
            <p className="text-sm text-[#636e72]">Moment d'échange agréable</p>
          </div>
        </div>

        {/* Bouton CTA vers contact */}
        <div className="text-center">
          <a
            href="#contact"
            className="group relative overflow-hidden inline-flex items-center justify-center bg-[#7c9082] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#5a6b5e] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 btn-pulse"
          >
            Me contacter pour un atelier
            <svg
              className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Entreprise;
