import { useState } from 'react';
import { siteConfig } from '../data/siteConfig';

const Footer = () => {
  const [showLegal, setShowLegal] = useState(false);
  const currentYear = new Date().getFullYear();

  return (
    <>
      <footer className="bg-[#2d3436] text-white py-12">
        <div className="max-w-6xl mx-auto px-4 md:px-8">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Colonne 1 - Identité */}
            <div>
              <h3 className="text-lg font-semibold mb-4">{siteConfig.professional.fullName}</h3>
              <p className="text-gray-400 text-sm">
                {siteConfig.professional.title} diplômée à {siteConfig.location.city}
              </p>
              <p className="text-gray-400 text-sm mt-2">
                {siteConfig.professional.diploma}
              </p>
              <p className="text-gray-400 text-sm">
                ADELI : {siteConfig.professional.adeliNumber}
              </p>
            </div>

            {/* Colonne 2 - Navigation */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Navigation</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#accueil" className="text-gray-400 hover:text-white transition-colors">
                    Accueil
                  </a>
                </li>
                <li>
                  <a href="#a-propos" className="text-gray-400 hover:text-white transition-colors">
                    À propos
                  </a>
                </li>
                <li>
                  <a href="#consultations" className="text-gray-400 hover:text-white transition-colors">
                    Consultations
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-gray-400 hover:text-white transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Colonne 3 - Contact */}
            <div>
              <h3 className="text-lg font-semibold mb-4">Rendez-vous</h3>
              <a
                href={siteConfig.contact.doctolibUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-[#7c9082] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#5a6b5e] transition-colors"
              >
                Prendre RDV sur Doctolib
              </a>
              <p className="text-gray-400 text-sm mt-4">
                {siteConfig.location.city}, {siteConfig.location.region}
              </p>
            </div>
          </div>

          {/* Ligne de séparation */}
          <div className="border-t border-gray-700 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
              <p>© {currentYear} {siteConfig.professional.fullName}. Tous droits réservés.</p>
              <div className="flex gap-6">
                <button
                  onClick={() => setShowLegal(true)}
                  className="hover:text-white transition-colors"
                >
                  Mentions légales
                </button>
                <button
                  onClick={() => setShowLegal(true)}
                  className="hover:text-white transition-colors"
                >
                  Politique de confidentialité
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Modal Mentions légales */}
      {showLegal && (
        <div
          className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
          onClick={() => setShowLegal(false)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl max-h-[80vh] overflow-y-auto p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <h2 className="text-2xl font-bold text-[#2d3436]">Mentions légales & RGPD</h2>
              <button
                onClick={() => setShowLegal(false)}
                className="text-gray-400 hover:text-gray-600"
                aria-label="Fermer"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="prose prose-sm max-w-none text-[#636e72]">
              <h3 className="text-lg font-semibold text-[#2d3436] mt-6 mb-3">Éditeur du site</h3>
              <p>
                <strong>Nom :</strong> {siteConfig.professional.fullName}<br />
                <strong>Profession :</strong> {siteConfig.professional.title}<br />
                <strong>Diplôme :</strong> {siteConfig.professional.diploma} - {siteConfig.professional.school}<br />
                <strong>Numéro ADELI :</strong> {siteConfig.professional.adeliNumber}<br />
                <strong>Localisation :</strong> {siteConfig.location.city}, {siteConfig.location.region}
              </p>

              <h3 className="text-lg font-semibold text-[#2d3436] mt-6 mb-3">Hébergement</h3>
              <p>
                [À compléter avec les informations de l'hébergeur]
              </p>

              <h3 className="text-lg font-semibold text-[#2d3436] mt-6 mb-3">Propriété intellectuelle</h3>
              <p>
                L'ensemble du contenu de ce site (textes, images, graphismes, logo, icônes, etc.)
                est la propriété exclusive de {siteConfig.professional.fullName}, à l'exception des
                marques, logos ou contenus appartenant à d'autres sociétés partenaires ou auteurs.
              </p>
              <p>
                Toute reproduction, distribution, modification, adaptation, retransmission ou publication,
                même partielle, de ces différents éléments est strictement interdite sans l'accord
                exprès par écrit de {siteConfig.professional.fullName}.
              </p>

              <h3 className="text-lg font-semibold text-[#2d3436] mt-6 mb-3">Protection des données personnelles (RGPD)</h3>
              <p>
                Conformément au Règlement Général sur la Protection des Données (RGPD) et à la loi
                « Informatique et Libertés » du 6 janvier 1978 modifiée, vous disposez d'un droit
                d'accès, de rectification, de suppression et d'opposition aux données personnelles
                vous concernant.
              </p>

              <h4 className="font-semibold text-[#2d3436] mt-4 mb-2">Données collectées</h4>
              <p>
                Les données personnelles collectées sur ce site sont :
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>Nom et prénom (formulaire de contact)</li>
                <li>Adresse email (formulaire de contact)</li>
                <li>Numéro de téléphone (formulaire de contact, optionnel)</li>
                <li>Message (formulaire de contact)</li>
              </ul>

              <h4 className="font-semibold text-[#2d3436] mt-4 mb-2">Finalité du traitement</h4>
              <p>
                Ces données sont collectées uniquement pour répondre à vos demandes de contact
                et ne sont jamais transmises à des tiers.
              </p>

              <h4 className="font-semibold text-[#2d3436] mt-4 mb-2">Conservation des données</h4>
              <p>
                Les données de contact sont conservées pendant une durée de 3 ans à compter du
                dernier contact.
              </p>

              <h4 className="font-semibold text-[#2d3436] mt-4 mb-2">Exercer vos droits</h4>
              <p>
                Pour exercer vos droits ou pour toute question sur le traitement de vos données,
                vous pouvez contacter {siteConfig.professional.fullName} :
              </p>
              <ul className="list-disc pl-5 space-y-1">
                {siteConfig.contact.email && <li>Par email : {siteConfig.contact.email}</li>}
                <li>Via le formulaire de contact du site</li>
              </ul>

              <h3 className="text-lg font-semibold text-[#2d3436] mt-6 mb-3">Cookies</h3>
              <p>
                Ce site n'utilise pas de cookies de traçage ou publicitaires. Seuls des cookies
                techniques essentiels au fonctionnement du site peuvent être utilisés.
              </p>

              <h3 className="text-lg font-semibold text-[#2d3436] mt-6 mb-3">Responsabilité</h3>
              <p>
                Les informations présentes sur ce site sont données à titre indicatif et ne
                sauraient se substituer à une consultation professionnelle. {siteConfig.professional.fullName}
                {' '}ne saurait être tenue responsable des dommages directs ou indirects résultant
                de l'utilisation des informations contenues sur ce site.
              </p>

              <h3 className="text-lg font-semibold text-[#2d3436] mt-6 mb-3">Secret professionnel</h3>
              <p>
                En tant que professionnelle de santé, {siteConfig.professional.fullName} est soumise
                au secret professionnel conformément aux articles L.1110-4 et R.4127-4 du Code de
                la Santé Publique.
              </p>
            </div>

            <button
              onClick={() => setShowLegal(false)}
              className="mt-8 w-full bg-[#7c9082] text-white py-3 rounded-lg font-medium hover:bg-[#5a6b5e] transition-colors"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
