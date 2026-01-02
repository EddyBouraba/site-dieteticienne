import { siteConfig } from "../data/siteConfig";

const StarIcon = ({ filled }) => (
  <svg
    className={`w-5 h-5 ${filled ? "text-yellow-400" : "text-gray-300"}`}
    fill="currentColor"
    viewBox="0 0 20 20"
  >
    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
  </svg>
);

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1, 2, 3, 4, 5].map((star) => (
      <StarIcon key={star} filled={star <= rating} />
    ))}
  </div>
);

const TestimonialCard = ({ testimonial }) => (
  <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center gap-4 mb-4">
      <div className="w-12 h-12 bg-[#7c9082]/20 rounded-full flex items-center justify-center">
        <span className="text-[#7c9082] font-semibold text-lg">
          {testimonial.name.charAt(0)}
        </span>
      </div>
      <div>
        <h4 className="font-semibold text-[#2d3436]">{testimonial.name}</h4>
        <StarRating rating={testimonial.rating} />
      </div>
    </div>
    <p className="text-[#636e72] leading-relaxed italic">
      "{testimonial.text}"
    </p>
    {testimonial.date && (
      <p className="text-sm text-[#636e72]/70 mt-4">{testimonial.date}</p>
    )}
  </div>
);

const Testimonials = () => {
  const testimonials = siteConfig.testimonials || [];

  if (testimonials.length === 0) {
    return null;
  }

  return (
    <section id="avis" className="py-20 md:py-28 bg-[#faf8f5]">
      <div className="max-w-6xl mx-auto px-4 md:px-8">
        {/* Titre de section */}
        <div className="text-center mb-16">
          <span className="text-[#7c9082] font-medium text-sm tracking-wider uppercase">
            Temoignages
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-[#2d3436] mt-3">
            Ce que disent mes patients
          </h2>
          <p className="text-lg text-[#636e72] mt-4 max-w-2xl mx-auto">
            Decouvrez les retours de personnes que j'ai accompagnees dans leur
            parcours nutritionnel
          </p>
          <div className="w-20 h-1 bg-[#7c9082] mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Grille des temoignages */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>

        {/* Lien vers Google */}
        {siteConfig.googleReviewsUrl && (
          <div className="text-center mt-12">
            <a
              href="https://www.google.com/search?hl=fr&q=Pauline%20Rolland%20Avis&rflfq=1&num=20&stick=H4sIAAAAAAAAAONgkxIxNDQ0MDU0NzK2MDc2t7C0MLIwN9_AyPiKUSQgsTQnMy9VISg_JycxL0XBsSyzeBErVmEAftWLYUkAAAA&rldimm=11105172387378982877&tbm=lcl&cs=1#lkt=LocalPoiReviews"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#7c9082] hover:text-[#5a6b5e] font-medium transition-colors"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              Voir tous les avis sur Google
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
