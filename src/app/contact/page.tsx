import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import MpesaQuickDonation from "@/components/contact/MpesaQuickDonation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us | Langata Islamic Center",
  description:
    "Get in touch with Langata Islamic Center. Reach out for questions, support, or to learn more about our mission.",
};

export default function ContactPage() {
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
          <div>
            <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-4">
              Contact <span className="text-[#FFC06E]">Us</span>
            </h1>
            <div className="flex justify-center mb-4">
              <div className="h-1 w-16 bg-[#FFC06E]"></div>
              <div className="h-1 w-16 bg-[#00b17b]"></div>
            </div>
            <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-200">
              Have questions or want to support our mission? Reach out to us
              today.
            </p>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Contact Info Card */}
          <div className="lg:col-span-1 space-y-8">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
              <h2 className="text-2xl font-bold text-[#441A05] mb-8">
                Get in Touch
              </h2>

              <div className="space-y-8">
                <div className="flex items-start space-x-4">
                  <div className="bg-[#FFC06E]/10 p-3 rounded-lg">
                    <MapPin className="w-6 h-6 text-[#FFC06E]" />
                  </div>
                  <div>
                    <h3 className="font-bold text-[#441A05]">Visit Us</h3>
                    <p className="text-gray-600">
                      Langata South Road
                      <br />
                      Nairobi, Kenya
                    </p>
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
            <MpesaQuickDonation />
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-2">
            <ContactForm />
          </div>
        </div>
      </div>
    </main>
  );
}
