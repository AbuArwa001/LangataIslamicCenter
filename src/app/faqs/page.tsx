"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const faqs = [
    {
        question: "What is the total cost of the new Islamic Center and Rental Project?",
        answer: "The total estimated cost for the complete development — including the masjid, school, madrasa, library, technical school, revert center, female student hostels, and rental apartments — is Ksh 324 million. This includes construction, finishing, furnishing, and initial operational costs."
    },
    {
        question: "How long will the construction take to complete?",
        answer: "The estimated construction period is approximately 24 to 30 months (2 to 2.5 years), depending on the availability of funds and construction conditions. The project may be completed in phases if full funding is not immediately available."
    },
    {
        question: "What facilities are included in the Islamic Center?",
        answer: (
            <ul className="list-disc pl-5 space-y-1">
                <li>A large, modern Masjid for 1,000 worshippers.</li>
                <li>A full Primary and Junior Secondary School.</li>
                <li>A Madrasa for Islamic education.</li>
                <li>A Library with Islamic and academic resources.</li>
                <li>A Technical/Vocational School teaching practical skills.</li>
                <li>A Revert Center to support and educate new Muslims.</li>
                <li>Female Hostels to accommodate female students safely.</li>
                <li>Rental Apartments to generate sustainable income for the Islamic Center’s operations.</li>
            </ul>
        )
    },
    {
        question: "How will the rental apartments benefit the mosque financially?",
        answer: (
            <div>
                <p className="mb-2">The rental apartments are a critical part of the project’s sustainability strategy. Monthly rental income will:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Fund the maintenance of the masjid and school facilities.</li>
                    <li>Support scholarships for needy students.</li>
                    <li>Cover salaries for teachers and staff.</li>
                    <li>Enable free programs like the revert education center.</li>
                </ul>
                <p className="mt-2">This ensures that the Islamic Center remains self-sufficient without having to rely constantly on donations after completion.</p>
            </div>
        )
    },
    {
        question: "How can individuals donate or sponsor part of the project?",
        answer: (
             <div>
                <p className="mb-2">Donors can contribute in several ways:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>One-time donations via bank transfer, mobile money, or cash.</li>
                    <li>Monthly pledges during the construction period.</li>
                    <li>Sponsorship of specific sections, e.g., sponsoring a prayer hall, classroom, or hostel room.</li>
                    <li>Naming rights for major donors (subject to Islamic guidelines).</li>
                    <li>Participating in fundraising dinners, mosque campaigns, or online fundraisers.</li>
                </ul>
                <p className="mt-2">A full sponsorship catalogue will be available, listing different portions of the project and corresponding donation levels.</p>
            </div>
        )
    },
     {
        question: "Will the new masjid and school be open to the general public?",
        answer: "Yes. The facilities will be open to all Muslims and the community at large. The school will accept students from diverse backgrounds while emphasizing Islamic values. Community members can freely access the masjid, library, revert center, and public activities organized by the Center."
    },
    {
        question: "What measures are being taken to ensure financial transparency?",
        answer: (
            <div>
                <p className="mb-2">The project will have strict financial controls, including:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Regular financial audits by certified auditors.</li>
                    <li>Quarterly financial reports available to major donors and community stakeholders.</li>
                    <li>Dedicated fundraising and project accounts separate from operational masjid accounts.</li>
                    <li>Transparency updates shared at community meetings and via newsletters.</li>
                </ul>
                <p className="mt-2">Additionally, a finance committee has been appointed to oversee all collections and expenditures.</p>
            </div>
        )
    },
    {
        question: "Are there opportunities for endowments (waqf) and naming rights for donors?",
        answer: "Yes. Donors who contribute significantly will have opportunities to create waqf endowments. Naming rights may be offered for parts of the project (e.g., classrooms, library sections, hostel rooms), following Islamic ethics and approval processes. This allows donors to leave a lasting legacy of sadaqah jariyah (continuous charity)."
    },
    {
        question: "How will the center support new Muslims and prevent radicalization?",
        answer: (
             <div>
                <p className="mb-2">The Revert Center is specifically designed to:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Educate new Muslims correctly about Islam, avoiding wrong ideology and misconceptions.</li>
                    <li>Provide structured mentorship, Islamic classes, and community support.</li>
                    <li>Offer social integration activities to build strong, peaceful Muslim identities.</li>
                </ul>
                <p className="mt-2">This proactive approach will help prevent radicalization and promote mainstream, balanced Islamic teachings. Trained teachers and scholars will be assigned to run the programs in both Swahili and English.</p>
            </div>
        )
    },
    {
        question: "How can international donors contribute from outside Kenya?",
        answer: (
             <div>
                <p className="mb-2">International donors can contribute through:</p>
                <ul className="list-disc pl-5 space-y-1">
                    <li>Bank wire transfers (details will be provided).</li>
                    <li>Online donation platforms (under development — links to be shared).</li>
                    <li>Fundraising representatives stationed in strategic countries (UAE, Saudi Arabia, UK, USA) who will coordinate local fundraising events and collections.</li>
                </ul>
                <p className="mt-2">Special thanks letters, updates, and financial accountability reports will be sent to all donors, ensuring their contribution’s impact is well-documented.</p>
            </div>
        )
    }
];

export default function FAQPage() {
    const [openIndex, setOpenIndex] = useState<number | null>(null);

    return (
        <div className="min-h-screen bg-slate-50">
             {/* Hero Section */}
            <div className="bg-slate-900 py-20 text-center text-white relative overflow-hidden">
                 <div className="absolute inset-0 bg-[#0a0a0a] opacity-90"></div>
                 <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 font-serif">Frequently Asked Questions</h1>
                    <p className="text-slate-300 max-w-2xl mx-auto text-lg">
                        Find answers to common questions about our new center, the project costs, and how you can get involved.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-16 max-w-4xl">
                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div 
                            key={index} 
                            className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm transition-all duration-300 hover:shadow-md"
                        >
                            <button
                                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                                className="w-full flex items-start justify-between p-6 text-left"
                            >
                                <span className={`font-bold text-lg ${openIndex === index ? 'text-emerald-700' : 'text-slate-800'}`}>
                                    {faq.question}
                                </span>
                                <span className={`ml-4 p-1 rounded-full ${openIndex === index ? 'bg-emerald-100 text-emerald-700' : 'bg-slate-100 text-slate-500'}`}>
                                    {openIndex === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                </span>
                            </button>
                            
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                    >
                                        <div className="px-6 pb-6 text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                                            {faq.answer}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </div>

                <div className="mt-16 text-center bg-emerald-900 rounded-2xl p-10 text-white">
                    <HelpCircle className="w-12 h-12 mx-auto mb-4 text-emerald-400" />
                    <h3 className="text-2xl font-bold mb-2">Still have questions?</h3>
                    <p className="text-emerald-100 mb-6 max-w-lg mx-auto">
                        Can't find the answer you're looking for? Please contact our friendly team.
                    </p>
                    <a 
                        href="/contact" 
                        className="inline-block bg-white text-emerald-900 font-bold py-3 px-8 rounded-full hover:bg-emerald-50 transition-colors"
                    >
                        Get in Touch
                    </a>
                </div>
            </div>
        </div>
    );
}
