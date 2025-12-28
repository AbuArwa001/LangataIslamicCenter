"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Header() {
  const pathname = usePathname();
  const [isAboutHovered, setIsAboutHovered] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAboutOpen, setMobileAboutOpen] = useState(false);

  // Close mobile menu when path changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About Us", href: "/about", hasDropdown: true },
    { name: "Donate", href: "/donate" },
    { name: "Projects & Facilities", href: "/projects" },
    { name: "Contact Us", href: "/contact" },
  ];

  return (
    <header className="bg-[#0f0f0f] text-white py-4 md:py-6 sticky top-0 z-50 border-b border-white/5 font-serif">
      <nav className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        {/* Mobile Logo / Brand */}
        <div className="md:hidden">
          <Link
            href="/"
            className="text-[#FFC06E] font-bold text-lg tracking-wider"
          >
            LANGATA <span className="text-white">MOSQUE</span>
          </Link>
        </div>

        {/* Desktop Navigation - Hidden on Mobile */}
        <div className="hidden md:flex space-x-8 items-center mx-auto">
          {navLinks
            .filter((link) => link.name !== "Donate")
            .map((link) => {
              const isActive = pathname === link.href;
              const isHighlighted =
                isActive || (link.name === "About Us" && isAboutHovered);

              return (
                <div
                  key={link.name}
                  className="relative"
                  onMouseEnter={() =>
                    link.hasDropdown && setIsAboutHovered(true)
                  }
                  onMouseLeave={() =>
                    link.hasDropdown && setIsAboutHovered(false)
                  }
                >
                  <Link
                    href={link.href}
                    className={`text-[15px] font-medium transition-all duration-300 relative pb-1 flex items-center gap-1 ${
                      isHighlighted
                        ? "text-[#FFC06E]"
                        : "text-white hover:text-[#FFC06E]"
                    }`}
                  >
                    {link.name}
                    {link.hasDropdown && (
                      <ChevronDown
                        size={14}
                        className={`mt-0.5 transition-transform ${
                          isAboutHovered ? "rotate-180" : ""
                        }`}
                      />
                    )}

                    {isHighlighted && (
                      <motion.div
                        layoutId="navUnderline"
                        className="absolute -bottom-1 left-0 right-0 h-[2.5px] bg-[#FFC06E]"
                      />
                    )}
                  </Link>

                  {/* Dropdown Menu - Desktop */}
                  {link.hasDropdown && (
                    <AnimatePresence>
                      {isAboutHovered && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: 5 }}
                          className="absolute left-1/2 -translate-x-1/2 top-full pt-4 w-44"
                        >
                          <div className="mx-auto w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-b-[8px] border-b-[#fdfdf8]"></div>
                          <div className="bg-[#fdfdf8] rounded-md shadow-2xl py-3 border border-gray-100">
                            <Link
                              href="/about/story"
                              className="block px-4 py-2 text-[14px] text-[#441A05] hover:text-[#FFC06E] font-bold text-center transition-colors"
                            >
                              Our Story
                            </Link>
                            <Link
                              href="/faqs"
                              className="block px-4 py-2 text-[14px] text-[#441A05] hover:text-[#FFC06E] font-bold text-center transition-colors"
                            >
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

          {/* Donate Button - Desktop */}
          <Link
            href="/donate"
            className="bg-[#00b17b] hover:bg-[#009e6d] text-white px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5"
          >
            Donate Now
          </Link>
        </div>

        {/* Mobile Menu Button - Visible only on Mobile */}
        <button
          className="md:hidden text-[#FFC06E] p-2"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </nav>

      {/* Mobile Sidebar Navigation */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-y-0 right-0 w-[80%] bg-[#0f0f0f] z-[60] shadow-2xl border-l border-white/10 md:hidden p-8 flex flex-col"
          >
            <div className="flex justify-end mb-8">
              <button onClick={() => setMobileMenuOpen(false)}>
                <X size={32} className="text-[#FFC06E]" />
              </button>
            </div>

            <div className="flex flex-col space-y-6">
              {navLinks.map((link) => (
                <div key={link.name} className="flex flex-col">
                  <div className="flex justify-between items-center">
                    <Link
                      href={link.href}
                      className={`text-xl font-bold ${
                        pathname === link.href ? "text-[#FFC06E]" : "text-white"
                      }`}
                      onClick={() =>
                        !link.hasDropdown && setMobileMenuOpen(false)
                      }
                    >
                      {link.name}
                    </Link>
                    {link.hasDropdown && (
                      <button
                        onClick={() => setMobileAboutOpen(!mobileAboutOpen)}
                      >
                        <ChevronDown
                          className={`text-[#FFC06E] transition-transform ${
                            mobileAboutOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Mobile Dropdown items */}
                  {link.hasDropdown && mobileAboutOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      className="ml-4 mt-4 flex flex-col space-y-4 border-l-2 border-[#FFC06E]/30 pl-4"
                    >
                      <Link
                        href="/about/story"
                        className="text-gray-300 text-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Our Story
                      </Link>
                      <Link
                        href="/faqs"
                        className="text-gray-300 text-lg"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        FAQs
                      </Link>
                    </motion.div>
                  )}
                </div>
              ))}
            </div>

            <div className="mt-auto">
              <Link
                href="/donate"
                className="block w-full text-center bg-[#00b17b] py-4 rounded-xl font-bold text-lg"
              >
                Donate Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[55] md:hidden"
          />
        )}
      </AnimatePresence>
    </header>
  );
}
