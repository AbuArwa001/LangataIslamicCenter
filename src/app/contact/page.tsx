"use client";

import { useState } from "react";
import { Mail, MapPin, Phone, Send, Smartphone } from "lucide-react";
import { motion } from "framer-motion";

export default function ContactPage() {
    const [phone, setPhone] = useState("");
    const [amount, setAmount] = useState("");
    const [isDonating, setIsDonating] = useState(false);
    const [donationStatus, setDonationStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);

    const handleMpesaDonation = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsDonating(true);
        setDonationStatus(null);

        try {
            const response = await fetch("http://localhost:8000/api/v1/donations/mpesa/stk-push/", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    phone_number: phone,
                    amount: amount,
                    account_reference: "ContactPage"
                }),
            });

            const result = await response.json();

            if (response.ok) {
                setDonationStatus({ type: 'success', message: "STK Push sent! Please check your phone." });
            } else {
                setDonationStatus({ type: 'error', message: result.errorMessage || "Failed to initiate payment." });
            }
        } catch (error) {
            setDonationStatus({ type: 'error', message: "An error occurred. Please try again." });
        } finally {
            setIsDonating(false);
        }
    };

    return (
        <main className="min-h-screen bg-[#f9f9f9] font-serif">
            {/* Hero Section */}
            <section className="relative h-[40vh] flex items-center justify-center text-white overflow-hidden">
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center"
                    style={{ backgroundImage: "url('/hero-mosque.jpg')" }}
                >
                    <div className="absolute inset-0 bg-[#000000] opacity-70"></div>
                </div>

                <div className="relative z-10 text-center px-4">
                    <motion.div
                        initial={{ y: -30, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
                            Contact <span className="text-[#FFC06E]">Us</span>
                        </h1>
                        <div className="flex justify-center mb-4">
                            <div className="h-1 w-16 bg-[#FFC06E]"></div>
                            <div className="h-1 w-16 bg-[#00b17b]"></div>
                        </div>
                        <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
                            Have questions or want to support our mission? Reach out to us today.
                        </p>
                    </motion.div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Contact Info Card */}
                    <div className="lg:col-span-1 space-y-8">
                        <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
                            <h2 className="text-2xl font-bold text-[#441A05] mb-8">Get in Touch</h2>

                            <div className="space-y-8">
                                <div className="flex items-start space-x-4">
                                    <div className="bg-[#FFC06E]/10 p-3 rounded-lg">
                                        <MapPin className="w-6 h-6 text-[#FFC06E]" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#441A05]">Visit Us</h3>
                                        <p className="text-gray-600">Langata South Road<br />Nairobi, Kenya</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-[#00b17b]/10 p-3 rounded-lg">
                                        <Phone className="w-6 h-6 text-[#00b17b]" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#441A05]">Call Us</h3>
                                        <p className="text-gray-600">+254 700 000 000</p>
                                    </div>
                                </div>

                                <div className="flex items-start space-x-4">
                                    <div className="bg-[#441A05]/10 p-3 rounded-lg">
                                        <Mail className="w-6 h-6 text-[#441A05]" />
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-[#441A05]">Email Us</h3>
                                        <p className="text-gray-600">info@langataislamic.org</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* M-Pesa Quick Donation Card */}
                        <div className="bg-[#00b17b] p-8 rounded-2xl shadow-lg text-white">
                            <div className="flex items-center gap-3 mb-6">
                                <Smartphone className="w-8 h-8" />
                                <h2 className="text-2xl font-bold">Quick M-Pesa</h2>
                            </div>
                            <p className="mb-6 text-emerald-50">Support our mosque projects instantly via M-Pesa STK Push.</p>

                            <form onSubmit={handleMpesaDonation} className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">Phone Number</label>
                                    <input
                                        type="tel"
                                        placeholder="2547XXXXXXXX"
                                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-white/40 text-white"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1">Amount (KES)</label>
                                    <input
                                        type="number"
                                        placeholder="e.g. 1000"
                                        className="w-full px-4 py-2 rounded-lg bg-white/10 border border-white/20 focus:outline-none focus:ring-2 focus:ring-white/50 placeholder:text-white/40 text-white"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        required
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={isDonating}
                                    className="w-full py-3 px-4 bg-[#FFC06E] text-[#441A05] font-bold rounded-lg hover:bg-[#eeb160] transition-all shadow-md active:scale-95 disabled:opacity-50"
                                >
                                    {isDonating ? "Processing..." : "Donate Now"}
                                </button>
                            </form>

                            {donationStatus && (
                                <div className={`mt-4 p-3 rounded-lg text-sm font-medium ${donationStatus.type === 'success' ? 'bg-emerald-800/50 text-emerald-100' : 'bg-red-800/50 text-red-100'
                                    }`}>
                                    {donationStatus.message}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Contact Form */}
                    <div className="lg:col-span-2">
                        <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm border border-gray-100">
                            <h2 className="text-3xl font-bold text-[#441A05] mb-8">Send us a Message</h2>
                            <form className="space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-2">
                                        <label htmlFor="firstName" className="text-sm font-bold text-[#441A05] uppercase tracking-wider">First Name</label>
                                        <input
                                            type="text"
                                            id="firstName"
                                            className="w-full px-4 py-3 border-b-2 border-gray-100 focus:border-[#00b17b] bg-transparent focus:outline-none transition-colors"
                                            placeholder="Salim"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label htmlFor="lastName" className="text-sm font-bold text-[#441A05] uppercase tracking-wider">Last Name</label>
                                        <input
                                            type="text"
                                            id="lastName"
                                            className="w-full px-4 py-3 border-b-2 border-gray-100 focus:border-[#00b17b] bg-transparent focus:outline-none transition-colors"
                                            placeholder="Salim"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-bold text-[#441A05] uppercase tracking-wider">Email Address</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="w-full px-4 py-3 border-b-2 border-gray-100 focus:border-[#00b17b] bg-transparent focus:outline-none transition-colors"
                                        placeholder="salim@example.com"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label htmlFor="message" className="text-sm font-bold text-[#441A05] uppercase tracking-wider">Your Message</label>
                                    <textarea
                                        id="message"
                                        rows={5}
                                        className="w-full px-4 py-3 border-b-2 border-gray-100 focus:border-[#00b17b] bg-transparent focus:outline-none transition-colors resize-none"
                                        placeholder="How can we help you?"
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="inline-flex items-center gap-2 py-4 px-10 bg-[#441A05] text-white font-bold rounded-full hover:bg-[#2d1103] transition-all shadow-lg hover:-translate-y-1"
                                >
                                    Send Message
                                    <Send className="w-5 h-5" />
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}
