import Link from "next/link";
import { Mail, MapPin, Phone, Facebook, Twitter, Instagram } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-slate-900 text-slate-200 border-t border-slate-800">
            <div className="container mx-auto px-4 md:px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

                    {/* Brand & Description */}
                    <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                            <div className="w-8 h-8 bg-primary rounded flex items-center justify-center text-white font-bold text-lg">
                                L
                            </div>
                            <span className="text-xl font-bold text-white">
                                Langata Islamic Center
                            </span>
                        </div>
                        <p className="text-sm text-slate-400 max-w-xs">
                            Serving the community with spiritual guidance, education, and humanitarian aid. Join us in building a better future.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="/about" className="text-sm text-slate-400 hover:text-white transition-colors">About Us</Link>
                            </li>
                            <li>
                                <Link href="/projects" className="text-sm text-slate-400 hover:text-white transition-colors">Our Projects</Link>
                            </li>
                            <li>
                                <Link href="/donate" className="text-sm text-slate-400 hover:text-white transition-colors">Donate</Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-sm text-slate-400 hover:text-white transition-colors">Contact</Link>
                            </li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold text-white mb-4">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start space-x-3">
                                <MapPin className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                                <span className="text-sm text-slate-400">
                                    Langata South Road, Nairobi, Kenya
                                </span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Phone className="w-5 h-5 text-primary shrink-0" />
                                <span className="text-sm text-slate-400">+254 700 000 000</span>
                            </li>
                            <li className="flex items-center space-x-3">
                                <Mail className="w-5 h-5 text-primary shrink-0" />
                                <span className="text-sm text-slate-400">info@langataislamic.org</span>
                            </li>
                        </ul>

                        {/* Socials */}
                        <div className="flex items-center space-x-4 mt-6">
                            <Link href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary transition-colors hover:text-white text-slate-400">
                                <Facebook className="w-4 h-4" />
                            </Link>
                            <Link href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary transition-colors hover:text-white text-slate-400">
                                <Twitter className="w-4 h-4" />
                            </Link>
                            <Link href="#" className="p-2 bg-slate-800 rounded-full hover:bg-primary transition-colors hover:text-white text-slate-400">
                                <Instagram className="w-4 h-4" />
                            </Link>
                        </div>
                    </div>

                </div>

                <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
                    <p>&copy; {new Date().getFullYear()} Langata Islamic Center. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
