import { useEffect, useState } from 'react';
import { siteConfig } from '../data/siteConfig';
import { images } from '../assets/images';

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Déclencher les animations après le montage
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section
      id="accueil"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#faf8f5] via-[#f5f0e8] to-[#e8f0e8] pt-20 overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8 py-12 md:py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Contenu texte */}
          <div className="text-center md:text-left order-2 md:order-1">
            {/* Badge localisation pour SEO local */}
            <span
              className={`inline-block bg-[#7c9082]/10 text-[#5a6b5e] px-4 py-2 rounded-full text-sm font-medium mb-6 transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {siteConfig.professional.title} à {siteConfig.location.city}
            </span>

            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold text-[#2d3436] leading-tight mb-6 transition-all duration-700 delay-100 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              {siteConfig.professional.fullName}
              <span className="block gradient-text-animated text-2xl md:text-3xl lg:text-4xl font-normal mt-2">
                {siteConfig.professional.title} diplômée
              </span>
            </h1>

            <p
              className={`text-lg md:text-xl text-[#636e72] mb-8 max-w-lg mx-auto md:mx-0 transition-all duration-700 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              Accompagnement personnalisé en nutrition pour retrouver un équilibre alimentaire
              durable et améliorer votre santé au quotidien.
            </p>

            {/* CTA principal */}
            <div
              className={`flex flex-col sm:flex-row gap-4 justify-center md:justify-start transition-all duration-700 delay-300 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <a
                href={siteConfig.contact.doctolibUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-center bg-[#7c9082] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#5a6b5e] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 btn-pulse"
              >
                Prendre rendez-vous
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
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>
              <a
                href="#a-propos"
                className="inline-flex items-center justify-center border-2 border-[#7c9082] text-[#5a6b5e] px-8 py-4 rounded-full text-lg font-medium hover:bg-[#7c9082] hover:text-white transition-all duration-300 hover:-translate-y-1"
              >
                En savoir plus
              </a>
            </div>

            {/* Informations clés */}
            <div
              className={`mt-10 flex flex-wrap justify-center md:justify-start gap-6 text-sm text-[#636e72] transition-all duration-700 delay-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="flex items-center gap-2 group cursor-default">
                <svg className="w-5 h-5 text-[#7c9082] icon-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Diplômée d'État</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <svg className="w-5 h-5 text-[#7c9082] icon-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span>{siteConfig.location.city}</span>
              </div>
              <div className="flex items-center gap-2 group cursor-default">
                <svg className="w-5 h-5 text-[#7c9082] icon-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>RDV en ligne</span>
              </div>
            </div>
          </div>

          {/* Image portrait */}
          <div
            className={`order-1 md:order-2 flex justify-center transition-all duration-1000 delay-200 ${
              isLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
            }`}
          >
            <div className="relative animate-float">
              {/* Cercle décoratif avec animation */}
              <div className="absolute -inset-4 bg-[#7c9082]/20 rounded-full blur-2xl animate-glow"></div>
              <img
                src={images.portrait}
                alt={siteConfig.images.portrait.alt}
                className="relative w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full object-cover shadow-2xl border-4 border-white transition-transform duration-500 hover:scale-105"
                loading="eager"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 transition-all duration-700 delay-700 ${
          isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
        }`}
      >
        <a href="#a-propos" className="flex flex-col items-center text-[#7c9082] hover:text-[#5a6b5e] transition-colors">
          <span className="text-xs mb-2">Découvrir</span>
          <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;
