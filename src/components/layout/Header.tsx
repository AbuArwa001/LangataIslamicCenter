"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const [isAboutHovered, setIsAboutHovered] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about", hasDropdown: true },
    { name: "Donate", href: "/donate" },
    { name: "Projects & Facilities", href: "/projects" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="bg-[#0f0f0f] text-white py-6 sticky top-0 z-50 border-b border-white/5 font-serif">
      <nav className="max-w-7xl mx-auto px-4 flex justify-center items-center">
        <div className="flex space-x-10 items-center">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            const isHighlighted = isActive || (link.name === "About Us" && isAboutHovered);
            
            return (
              <div 
                key={link.name}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setIsAboutHovered(true)}
                onMouseLeave={() => link.hasDropdown && setIsAboutHovered(false)}
              >
                <Link
                  href={link.href}
                  className={`text-[15px] font-medium transition-all duration-300 relative pb-1 flex items-center gap-1 ${
                    isHighlighted ? "text-[#FFC06E]" : "text-white hover:text-[#FFC06E]"
                  }`}
                >
                  {link.name}
                  {link.hasDropdown && <ChevronDown size={14} className={`mt-0.5 transition-transform ${isAboutHovered ? 'rotate-180' : ''}`} />}
                  
                  {/* Underline for Active or Hovered Link */}
                  {isHighlighted && (
                    <motion.div 
                      layoutId="navUnderline"
                      className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-[#FFC06E]"
                    />
                  )}
                </Link>

                {/* Dropdown Menu - Exact Style from image_52e811.png */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {isAboutHovered && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 5 }}
                        className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-44"
                      >
                        {/* Triangle pointer */}
                        <div className="mx-auto w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-[#fdfdf8]"></div>
                        
                        <div className="bg-[#fdfdf8] rounded-md shadow-2xl py-3 border border-gray-100">
                          <Link href="/about/story" className="block px-4 py-2 text-[14px] text-[#441A05] hover:text-[#FFC06E] font-bold text-center transition-colors">
                            Our Story
                          </Link>
                          <Link href="/about/faqs" className="block px-4 py-2 text-[14px] text-[#441A05] hover:text-[#FFC06E] font-bold text-center transition-colors">
                            FAQs
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </header>
  );
}