import { siteConfig } from "../data/siteConfig";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

const Services = () => {
  const [titleRef, titleVisible] = useScrollAnimation();
  const [cardsRef, cardsVisible] = useScrollAnimation({ threshold: 0.05 });
  const [tagsRef, tagsVisible] = useScrollAnimation();

  return (
    <section id="consultations" className="py-20 md:py-28 bg-[#faf8f5]">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <div
          ref={titleRef}
          className={`text-center transition-all duration-700 ${
            titleVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <span className="text-[#7c9082] font-medium text-sm tracking-wider uppercase">
            Consultations
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d3436] mt-3">
            Mes accompagnements en dietetique
          </h2>
          <p className="text-lg text-[#636e72] mt-4 max-w-2xl mx-auto">
            Des consultations adaptees a vos besoins pour un accompagnement
            nutritionnel personnalise
          </p>
          <p className="text-sm text-[#7c9082] mt-3 font-medium">
            Consultations susceptibles d’être prises en charge par votre
            mutuelle
          </p>
          <div className="w-20 h-1 bg-[#7c9082] mx-auto mt-6 rounded-full"></div>
        </div>

        <div
          ref={cardsRef}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8"
        >
          {siteConfig.pricing.map((service, index) => (
            <div
              key={index}
              className={`bg-white rounded-2xl p-6 shadow-md transition-all duration-700 flex flex-col relative ${
                index === 0 ? "border-2 border-[#7c9082]" : ""
              } ${
                cardsVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-6"
              }`}
              style={{
                transitionDelay: cardsVisible ? `${index * 100}ms` : "0ms",
              }}
            >
              {index === 0 && (
                <span className="absolute -top-3 left-4 bg-[#7c9082] text-white text-xs font-medium px-3 py-1 rounded-full">
                  Premiere consultation
                </span>
              )}
              <h3 className="text-lg font-semibold text-[#2d3436] mb-2">
                {service.name}
              </h3>
              <p className="text-[#636e72] text-sm mb-4 flex-grow">
                {service.description}
              </p>
              <div className="flex items-end justify-between mt-auto">
                <span className="text-3xl font-bold gradient-text-animated">
                  {service.price}€
                </span>
                <span className="text-sm text-[#636e72]">
                  {service.duration}
                </span>
              </div>
            </div>
          ))}
        </div>

        <div
          ref={tagsRef}
          className={`mt-20 transition-all duration-700 ${
            tagsVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-6"
          }`}
        >
          <h3 className="text-xl font-bold text-[#2d3436] text-center mb-8">
            Domaines d'accompagnement
          </h3>
          <div className="flex flex-wrap justify-center gap-3">
            {siteConfig.specialties.map((specialty, index) => (
              <span
                key={index}
                className={`px-4 py-2 bg-white rounded-full text-sm text-[#2d3436] shadow-sm transition-all duration-500 ${
                  tagsVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
                }`}
                style={{
                  transitionDelay: tagsVisible ? `${index * 80}ms` : "0ms",
                }}
              >
                {specialty}
              </span>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <a
            href={siteConfig.contact.doctolibUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden inline-flex items-center justify-center bg-[#7c9082] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#5a6b5e] transition-all duration-300 hover:shadow-xl hover:-translate-y-1 btn-pulse"
          >
            Reserver une consultation
            <svg
              className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:rotate-12"
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
          </a>
        </div>
      </div>
    </section>
  );
};

export default Services;
