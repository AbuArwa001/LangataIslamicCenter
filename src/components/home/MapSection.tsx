export default function MapSection() {
  return (
    <section className="w-full h-[500px] relative grayscale hover:grayscale-0 transition-all duration-700">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3988.7543888506843!2d36.7823382!3d-1.3234167!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x182f106093510e13%3A0x6b772c2957b70747!2sLangata%20Mosque!5e0!3m2!1sen!2ske!4v1715600000000!5m2!1sen!2ske"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>

      {/* Small floating info card matching your screenshot */}
      <div className="absolute top-10 left-10 bg-white p-4 shadow-2xl rounded-sm border-l-4 border-emerald-600 hidden md:block">
        <p className="font-bold text-gray-800 text-sm">Langata Mosque</p>
        <p className="text-xs text-gray-500">1°19'14.3"S 36°47'05.7"E</p>
        <a
          href="https://maps.app.goo.gl/..."
          target="_blank"
          className="text-blue-500 text-[10px] hover:underline uppercase font-bold mt-2 block"
        >
          View on Google Maps
        </a>
      </div>
    </section>
  );
}
