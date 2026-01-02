import { siteConfig } from '../data/siteConfig';

const About = () => {
  return (
    <section id="a-propos" className="py-20 md:py-28 bg-white">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Titre de section */}
        <div className="text-center mb-16">
          <span className="text-[#7c9082] font-medium text-sm tracking-wider uppercase">
            À propos
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d3436] mt-3">
            Votre {siteConfig.professional.title.toLowerCase()} à {siteConfig.location.city}
          </h2>
          <div className="w-20 h-1 bg-[#7c9082] mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Contenu */}
          <div className="space-y-6">
            <p className="text-lg text-[#636e72] leading-relaxed">
              Je suis <strong className="text-[#2d3436]">{siteConfig.professional.fullName}</strong>,
              {' '}{siteConfig.professional.title.toLowerCase()} diplômée, installée à{' '}
              <strong className="text-[#2d3436]">{siteConfig.location.city}</strong> en{' '}
              {siteConfig.location.region}.
            </p>

            <p className="text-lg text-[#636e72] leading-relaxed">
              Mon approche de la diététique repose sur l'<strong className="text-[#2d3436]">écoute</strong>,
              la <strong className="text-[#2d3436]">bienveillance</strong> et un accompagnement
              personnalisé. Je crois fermement que chaque personne est unique et mérite un suivi
              adapté à son mode de vie, ses goûts et ses objectifs.
            </p>

            <p className="text-lg text-[#636e72] leading-relaxed">
              Mon objectif est de vous aider à retrouver un équilibre alimentaire durable,
              sans frustration ni régime restrictif. Ensemble, nous construisons des habitudes
              saines qui s'intègrent naturellement à votre quotidien.
            </p>

            {/* Points clés */}
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#7c9082]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#7c9082]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#2d3436]">Écoute</h3>
                  <p className="text-sm text-[#636e72]">Approche bienveillante</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#7c9082]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#7c9082]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#2d3436]">Personnalisé</h3>
                  <p className="text-sm text-[#636e72]">Suivi sur mesure</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#7c9082]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#7c9082]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#2d3436]">Durable</h3>
                  <p className="text-sm text-[#636e72]">Résultats pérennes</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-[#7c9082]/10 flex items-center justify-center flex-shrink-0">
                  <svg className="w-5 h-5 text-[#7c9082]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-[#2d3436]">Éducation</h3>
                  <p className="text-sm text-[#636e72]">Comprendre pour agir</p>
                </div>
              </div>
            </div>
          </div>

          {/* Diplôme et qualifications */}
          <div className="bg-gradient-to-br from-[#f5f0e8] to-[#e8f0e8] rounded-2xl p-8 md:p-10">
            <h3 className="text-xl font-bold text-[#2d3436] mb-6 flex items-center gap-3">
              <svg className="w-6 h-6 text-[#7c9082]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M12 14l9-5-9-5-9 5 9 5z" />
                <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
              </svg>
              Formation et diplôme
            </h3>

            <div className="space-y-4">
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="font-semibold text-[#2d3436]">{siteConfig.professional.diploma}</p>
                <p className="text-[#636e72] mt-1">{siteConfig.professional.school}</p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-sm text-[#636e72]">Numéro ADELI</p>
                <p className="font-semibold text-[#2d3436] font-mono">{siteConfig.professional.adeliNumber}</p>
                <p className="text-xs text-[#636e72] mt-2">
                  Le numéro ADELI garantit l'enregistrement officiel auprès de l'Agence Régionale de Santé.
                </p>
              </div>

              <div className="bg-white rounded-xl p-5 shadow-sm">
                <p className="text-sm text-[#636e72]">Localisation</p>
                <p className="font-semibold text-[#2d3436]">
                  {siteConfig.location.city}, {siteConfig.location.region}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
