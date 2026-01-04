import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { siteConfig } from "../data/siteConfig";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Liens avec gestion intelligente des ancres
  const navLinks = [
    {
      href: isHomePage ? "#accueil" : "/#accueil",
      label: "Accueil",
      isAnchor: true,
    },
    {
      href: isHomePage ? "#a-propos" : "/#a-propos",
      label: "À propos",
      isAnchor: true,
    },
    {
      href: isHomePage ? "#consultations" : "/#consultations",
      label: "Consultations",
      isAnchor: true,
    },
    {
      href: isHomePage ? "#contact" : "/#contact",
      label: "Contact",
      isAnchor: true,
    },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-sm shadow-md py-3"
          : "bg-transparent py-5"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        <nav className="flex items-center justify-between">
          {/* Logo / Nom */}
          <Link
            to="/"
            className="text-lg md:text-xl font-semibold text-[#5a6b5e] hover:text-[#7c9082] transition-colors"
          >
            {siteConfig.professional.fullName}
          </Link>

          {/* Navigation desktop */}
          <ul className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <li key={link.href}>
                {link.isAnchor ? (
                  <a
                    href={link.href}
                    className="text-[#2d3436] hover:text-[#7c9082] transition-colors text-sm font-medium"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    to={link.href}
                    className={`text-sm font-medium transition-colors ${
                      location.pathname.startsWith(link.href)
                        ? "text-[#7c9082]"
                        : "text-[#2d3436] hover:text-[#7c9082]"
                    }`}
                  >
                    {link.label}
                  </Link>
                )}
              </li>
            ))}
            <li>
              <a
                href={siteConfig.contact.doctolibUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#7c9082] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#5a6b5e] transition-colors"
              >
                Prendre rendez-vous
              </a>
            </li>
          </ul>

          {/* Bouton menu mobile */}
          <button
            className="md:hidden p-2 text-[#2d3436]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menu"
            aria-expanded={isMobileMenuOpen}
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </nav>

        {/* Menu mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-white shadow-lg py-4">
            <ul className="flex flex-col gap-2 px-4">
              {navLinks.map((link) => (
                <li key={link.href}>
                  {link.isAnchor ? (
                    <a
                      href={link.href}
                      className="block py-2 text-[#2d3436] hover:text-[#7c9082] transition-colors"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </a>
                  ) : (
                    <Link
                      to={link.href}
                      className={`block py-2 transition-colors ${
                        location.pathname.startsWith(link.href)
                          ? "text-[#7c9082]"
                          : "text-[#2d3436] hover:text-[#7c9082]"
                      }`}
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {link.label}
                    </Link>
                  )}
                </li>
              ))}
              <li className="pt-2">
                <a
                  href={siteConfig.contact.doctolibUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-center bg-[#7c9082] text-white px-5 py-3 rounded-full font-medium hover:bg-[#5a6b5e] transition-colors"
                >
                  Prendre rendez-vous
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
