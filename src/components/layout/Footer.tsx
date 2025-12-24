import Link from "next/link";

export default function Footer() {
  return (
    <footer className="relative bg-[#0d0d0d] text-gray-400 py-16 px-4 overflow-hidden">
      {/* Subtle Background Pattern Overlay */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none bg-center bg-cover"
        style={{ backgroundImage: "url('/footer-pattern.jpg')" }} // Use a subtle geometric or mosque interior image
      ></div>

      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        {/* Column 1: Logo & Title */}
        <div className="flex flex-col items-center md:items-start">
          <div className="w-16 h-16 mb-4 bg-orange-400/20 rounded-full flex items-center justify-center border border-orange-400/50">
            <img src="/logo.png" alt="LIC Logo" className="w-10 h-10 object-contain" />
          </div>
          <h3 className="text-white font-serif text-lg">Langata Islamic Center</h3>
        </div>

        {/* Column 2: About */}
        <div>
          <p className="text-sm leading-relaxed">
            Langata Islamic Center is dedicated to serving our community with compassion and integrity.
          </p>
        </div>

        {/* Column 3: Contact */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-widest">Contact</h4>
          <ul className="text-sm space-y-2">
            <li>0700123456</li>
            <li>info@langataislamiccenter.org</li>
            <li>Langata, Nairobi,</li>
            <li>Kenya</li>
          </ul>
        </div>

        {/* Column 4: Social */}
        <div>
          <h4 className="text-white font-bold mb-4 uppercase text-sm tracking-widest">Social</h4>
          <ul className="text-sm space-y-2">
            <li><Link href="#" className="hover:text-orange-400 transition">Facebook</Link></li>
            <li><Link href="#" className="hover:text-orange-400 transition">Pinterest</Link></li>
            <li><Link href="#" className="hover:text-orange-400 transition">Instagram</Link></li>
            <li><Link href="#" className="hover:text-orange-400 transition">Twitter</Link></li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative z-10 border-t border-gray-800 mt-16 pt-8 text-center text-xs">
        <p>Copyright © 2025 by Langata Islamic Center. All rights reserved.</p>
      </div>
    </footer>
  );
}