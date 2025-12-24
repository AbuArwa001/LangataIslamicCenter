import Link from "next/link";
import { Facebook, Twitter, Instagram, Linkedin, Home, Mail, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#0a0a0a] text-gray-400 py-16 px-4 overflow-hidden border-t border-gray-800">
      <div className="relative z-10 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
        {/* Column 1: Logo & Title */}
        <div className="flex flex-col items-start gap-6">
          <div className="flex items-center gap-3">
             {/* Placeholder for logo - using a div for now if image fails, but keeping img tag */}
            <div className="w-12 h-12 bg-emerald-900/20 rounded-lg flex items-center justify-center border border-emerald-900/50 backdrop-blur-sm">
                <img src="/logo.png" alt="LIC Logo" className="w-8 h-8 object-contain opacity-80" />
            </div>
            <div>
                 <h3 className="text-white font-serif text-xl tracking-wide">Langata Islamic Center</h3>
                 <p className="text-xs text-gray-500 uppercase tracking-widest mt-0.5">Compassion & Integrity</p>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-gray-400 max-w-xs">
            Dedicated to serving our community with compassion and integrity. Join us in our mission to uplift lives.
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div>
          <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em] relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-emerald-600">Quick Links</h4>
          <ul className="text-sm space-y-3">
            <li><Link href="/about" className="hover:text-emerald-500 transition-colors duration-300 flex items-center gap-2">About Us</Link></li>
            <li><Link href="/projects-facilities" className="hover:text-emerald-500 transition-colors duration-300 flex items-center gap-2">Our Projects</Link></li>
            <li><Link href="/donate" className="hover:text-emerald-500 transition-colors duration-300 flex items-center gap-2">Donate</Link></li>
            <li><Link href="/contact" className="hover:text-emerald-500 transition-colors duration-300 flex items-center gap-2">Contact Us</Link></li>
          </ul>
        </div>

         {/* Column 3: Contact Info */}
        <div>
           <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em] relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-emerald-600">Contact Us</h4>
           <ul className="text-sm space-y-4">
             <li className="flex items-start gap-3">
                <Home className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Uhuru Gardens Nairobi,<br/>00100, Nairobi Kenya</span>
             </li>
             <li className="flex items-center gap-3">
                 <Phone className="w-5 h-5 text-emerald-600 shrink-0" />
                 <a href="tel:0700123456" className="hover:text-white transition-colors">0700 123 456</a>
             </li>
             <li className="flex items-center gap-3">
                 <Mail className="w-5 h-5 text-emerald-600 shrink-0" />
                 <a href="mailto:info@langataislamiccenter.org" className="hover:text-white transition-colors">info@langataislamiccenter.org</a>
             </li>
           </ul>
        </div>

        {/* Column 4: Newsletter / Social */}
        <div>
            <h4 className="text-white font-bold mb-6 uppercase text-xs tracking-[0.2em] relative inline-block after:content-[''] after:absolute after:-bottom-2 after:left-0 after:w-8 after:h-0.5 after:bg-emerald-600">Connect</h4>
             <p className="text-sm text-gray-400 mb-6">Follow us on social media for updates and community news.</p>
             <div className="flex gap-4">
                <Link href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all duration-300 group">
                    <Facebook className="w-4 h-4" />
                </Link>
                <Link href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all duration-300 group">
                    <Twitter className="w-4 h-4" />
                </Link>
                 <Link href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all duration-300 group">
                    <Instagram className="w-4 h-4" />
                </Link>
                 <Link href="#" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all duration-300 group">
                    <Linkedin className="w-4 h-4" />
                </Link>
             </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="relative z-10 border-t border-gray-900 mt-20 pt-8 text-center">
        <p className="text-xs text-gray-600">
            Copyright © {new Date().getFullYear()} by <span className="text-gray-400">Langata Islamic Center</span>. All rights reserved.
        </p>
      </div>
    </footer>
  );
}