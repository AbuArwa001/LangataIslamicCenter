export default function Testimonials() {
  return (
    <section className="py-24 bg-gray-50 text-center px-4 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-serif text-orange-400 mb-2">
          Hear from Users of the facilities
        </h2>
        <p className="text-gray-500 italic mb-12">
          Our community loves and appreciates our Service!
        </p>

        <blockquote className="text-2xl md:text-3xl font-medium text-gray-800 leading-snug mb-8">
          "Affordable Madrasa Classes: Children from underprivileged families
          have been receiving affordable Islamic education for years, building
          the next generation of faithful Muslims."
        </blockquote>

        <div className="space-y-1">
          <p className="font-bold text-gray-600 uppercase tracking-[0.2em] text-sm">
            Ibrahim Said
          </p>
          <p className="text-xs text-gray-400 uppercase tracking-widest">
            Chairman, LIWO Mosque Board
          </p>
        </div>
      </div>
    </section>
  );
}
