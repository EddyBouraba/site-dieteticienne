import { siteConfig } from '../data/siteConfig';
import { images } from '../assets/images';

const Cabinet = () => {
  return (
    <section id="cabinet" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Titre de section */}
        <div className="text-center mb-16">
          <span className="text-[#7c9082] font-medium text-sm tracking-wider uppercase">
            Le cabinet
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d3436] mt-3">
            Un espace accueillant et rassurant
          </h2>
          <p className="text-lg text-[#636e72] mt-4 max-w-2xl mx-auto">
            Decouvrez le cabinet ou je vous accueille pour nos consultations en dietetique a {siteConfig.location.city}
          </p>
          <div className="w-20 h-1 bg-[#7c9082] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Grille des photos */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Salle d'attente */}
          <div className="group relative overflow-hidden rounded-2xl shadow-lg">
            <img
              src={images.waitingRoom}
              alt={siteConfig.images.waitingRoom.alt}
              className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white font-semibold text-lg">Salle d'attente</h3>
                <p className="text-white/80 text-sm mt-1">Un espace confortable pour patienter</p>
              </div>
            </div>
          </div>

          {/* Bureau de consultation */}
          <div className="group relative overflow-hidden rounded-2xl shadow-lg">
            <img
              src={images.office}
              alt={siteConfig.images.office.alt}
              className="w-full h-64 md:h-80 object-cover transition-transform duration-500 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white font-semibold text-lg">Bureau de consultation</h3>
                <p className="text-white/80 text-sm mt-1">Espace dedie aux entretiens personnalises</p>
              </div>
            </div>
          </div>
        </div>

        {/* Points forts du cabinet */}
        <div className="mt-12 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
          <div className="text-center p-4">
            <div className="w-14 h-14 mx-auto bg-[#7c9082]/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-[#7c9082]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="font-semibold text-[#2d3436]">Accessibilite</h3>
            <p className="text-sm text-[#636e72] mt-1">Acces facile au cabinet</p>
          </div>

          <div className="text-center p-4">
            <div className="w-14 h-14 mx-auto bg-[#7c9082]/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-[#7c9082]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="font-semibold text-[#2d3436]">Confidentialite</h3>
            <p className="text-sm text-[#636e72] mt-1">Espace prive et discret</p>
          </div>

          <div className="text-center p-4">
            <div className="w-14 h-14 mx-auto bg-[#7c9082]/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-[#7c9082]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="font-semibold text-[#2d3436]">Confort</h3>
            <p className="text-sm text-[#636e72] mt-1">Ambiance chaleureuse</p>
          </div>

          <div className="text-center p-4">
            <div className="w-14 h-14 mx-auto bg-[#7c9082]/10 rounded-full flex items-center justify-center mb-4">
              <svg className="w-7 h-7 text-[#7c9082]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-[#2d3436]">Ponctualite</h3>
            <p className="text-sm text-[#636e72] mt-1">Respect de votre temps</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Cabinet;
