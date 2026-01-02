import { siteConfig } from "../data/siteConfig";

const Appointment = () => {
  return (
    <section
      id="rdv"
      className="py-14 md:py-20 bg-gradient-to-br from-[#7c9082] to-[#5a6b5e]"
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div className="text-center text-white">
          {/* Icône */}

          {/* Titre */}
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Prêt(e) à prendre soin de votre alimentation ?
          </h2>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Prenez rendez-vous en ligne avec votre{" "}
            {siteConfig.professional.title.toLowerCase()} à{" "}
            {siteConfig.location.city}. Consultation en cabinet ou en
            téléconsultation selon vos préférences.
          </p>

          {/* Horaires */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 md:p-8 max-w-xl mx-auto mb-10">
            <h3 className="font-semibold text-lg mb-4">Horaires d'ouverture</h3>
            <div className="space-y-3">
              {siteConfig.hours.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3 border-b border-white/15 last:border-0"
                >
                  <span className="text-base md:text-lg text-white/70">
                    {item.day}
                  </span>
                  <span className="text-lg md:text-xl font-semibold tracking-wide">
                    {item.hours}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <a
            href={siteConfig.contact.doctolibUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center bg-white text-[#5a6b5e] px-10 py-5 rounded-full text-lg font-semibold hover:bg-[#f5f0e8] transition-all hover:shadow-xl transform hover:-translate-y-1"
          >
            <svg
              className="w-6 h-6 mr-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            Prendre rendez-vous sur Doctolib
          </a>

          {/* Info supplémentaire */}
          <p className="text-white/70 text-sm mt-6">
            Première consultation : {siteConfig.pricing[0].price}€ • Suivi :{" "}
            {siteConfig.pricing[1].price}€
          </p>
        </div>
      </div>
    </section>
  );
};

export default Appointment;
