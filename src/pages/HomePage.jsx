import Hero from "../components/Hero";
import About from "../components/About";
import Services from "../components/Services";
import Cabinet from "../components/Cabinet";
import Testimonials from "../components/Testimonials";
import { BlogPreview } from "../components/blog";
import Appointment from "../components/Appointment";
import Entreprise from "../components/Entreprise";
import Contact from "../components/Contact";
import SEO from "../components/SEO";

const HomePage = () => {
  return (
    <>
      {/* SEO : JSON-LD et meta tags */}
      <SEO />

      {/* Contenu principal */}
      <main>
        {/* Section 1 : Hero avec nom, métier, localisation et CTA */}
        <Hero />

        {/* Section 2 : Présentation / À propos + Diplôme & approche */}
        <About />

        {/* Section 3 : Consultations et accompagnements avec tarifs */}
        <Testimonials />

        {/* Section 4 : Photos du cabinet */}
        <Cabinet />

        

        {/* Section 5 : Temoignages clients */}
        <Services />
        <Entreprise />

        {/* Section 6 : Apercu du blog */}
        {/*<BlogPreview />*/}

        {/* Section 7 : Prise de rendez-vous */}
        <Appointment />

        {/* Section 9 : Contact et localisation */}
        <Contact />
      </main>
    </>
  );
};

export default HomePage;
