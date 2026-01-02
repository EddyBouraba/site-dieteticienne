import { useState } from 'react';
import { siteConfig } from '../data/siteConfig';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulation d'envoi - à remplacer par une vraie API
    // Options : Formspree, EmailJS, Netlify Forms, etc.
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSubmitStatus('success');
      setFormData({ name: '', email: '', phone: '', message: '' });
    } catch {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-[#faf8f5]">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Titre de section */}
        <div className="text-center mb-16">
          <span className="text-[#7c9082] font-medium text-sm tracking-wider uppercase">
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d3436] mt-3">
            Me contacter
          </h2>
          <p className="text-lg text-[#636e72] mt-4 max-w-2xl mx-auto">
            Une question ? N'hésitez pas à me contacter. Je vous réponds dans les plus brefs délais.
          </p>
          <div className="w-20 h-1 bg-[#7c9082] mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Formulaire de contact */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-semibold text-[#2d3436] mb-6">
              Envoyer un message
            </h3>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#2d3436] mb-2">
                  Nom complet *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#7c9082] focus:border-transparent transition-all outline-none"
                  placeholder="Votre nom"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#2d3436] mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#7c9082] focus:border-transparent transition-all outline-none"
                  placeholder="votre@email.fr"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#2d3436] mb-2">
                  Téléphone
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#7c9082] focus:border-transparent transition-all outline-none"
                  placeholder="06 XX XX XX XX"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#2d3436] mb-2">
                  Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#7c9082] focus:border-transparent transition-all outline-none resize-none"
                  placeholder="Votre message..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-[#7c9082] text-white py-4 rounded-lg font-medium hover:bg-[#5a6b5e] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Envoi en cours...' : 'Envoyer le message'}
              </button>

              {submitStatus === 'success' && (
                <div className="bg-green-50 text-green-800 p-4 rounded-lg text-sm">
                  ✓ Votre message a été envoyé avec succès. Je vous répondrai rapidement.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 text-red-800 p-4 rounded-lg text-sm">
                  ✗ Une erreur est survenue. Veuillez réessayer ou me contacter directement.
                </div>
              )}
            </form>
          </div>

          {/* Informations et carte */}
          <div className="space-y-6">
            {/* Informations de contact - NAP pour SEO local */}
            <div className="bg-white rounded-2xl p-8 shadow-sm">
              <h3 className="text-xl font-semibold text-[#2d3436] mb-6">
                Informations
              </h3>

              <div className="space-y-4">
                {/* Nom - N de NAP */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#7c9082]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#7c9082]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-[#2d3436]">{siteConfig.professional.fullName}</p>
                    <p className="text-[#636e72] text-sm">{siteConfig.professional.title}</p>
                  </div>
                </div>

                {/* Adresse - A de NAP */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#7c9082]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#7c9082]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-medium text-[#2d3436]">{siteConfig.location.city}</p>
                    <p className="text-[#636e72] text-sm">{siteConfig.location.region}</p>
                  </div>
                </div>

                {/* Email */}
                {siteConfig.contact.email && (
                  <div className="flex items-start gap-4">
                    <div className="w-10 h-10 bg-[#7c9082]/10 rounded-full flex items-center justify-center flex-shrink-0">
                      <svg className="w-5 h-5 text-[#7c9082]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <a
                        href={`mailto:${siteConfig.contact.email}`}
                        className="font-medium text-[#2d3436] hover:text-[#7c9082] transition-colors"
                      >
                        {siteConfig.contact.email}
                      </a>
                    </div>
                  </div>
                )}

                {/* Doctolib */}
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#7c9082]/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-[#7c9082]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <a
                      href={siteConfig.contact.doctolibUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-[#7c9082] hover:text-[#5a6b5e] transition-colors"
                    >
                      Prendre RDV sur Doctolib →
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Carte Google Maps */}
            <div className="bg-white rounded-2xl overflow-hidden shadow-sm h-64 md:h-80">
              <iframe
                src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d43000!2d${siteConfig.location.coordinates.lng}!3d${siteConfig.location.coordinates.lat}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f${siteConfig.location.mapZoom}!3m3!1m2!1s0x47f29d8ceffd9675%3A0x409ce34b31458d0!2sDijon!5e0!3m2!1sfr!2sfr!4v1700000000000!5m2!1sfr!2sfr`}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title={`Localisation du cabinet de ${siteConfig.professional.title.toLowerCase()} à ${siteConfig.location.city}`}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
