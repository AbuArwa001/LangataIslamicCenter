import DonationForm from "@/components/donation/DonationForm";
import Image from "next/image";
import { HandCoins, Building2, HeartHandshake } from "lucide-react";

export default function DonatePage() {
  return (
    <div className="min-h-screen bg-[#fdfdf8]">
      {/* Hero Section */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="/donation.png"
            alt="Donation Background"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-[#441A05]/80 mix-blend-multiply" />
          <div className="absolute inset-0 bg-black/30" />
        </div>

        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto space-y-6">
          <h1 className="text-5xl md:text-7xl font-bold text-white font-serif tracking-tight drop-shadow-lg">
            Support Our Cause
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 font-light max-w-2xl mx-auto leading-relaxed">
            Your generous donations help us maintain the mosque, support our
            educational programs, and provide for the needy in our community.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 md:py-24 -mt-20 relative z-20">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Donation Form Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 border border-gray-100">
              <h2 className="text-3xl font-bold text-[#441A05] font-serif mb-8">
                Make a Donation
              </h2>
              <DonationForm />
            </div>
          </div>

          {/* Info Column */}
          <div className="lg:col-span-1 space-y-8">
            {/* Why Donate Card */}
            <div className="bg-[#441A05] text-white rounded-3xl p-8 shadow-xl">
              <h3 className="text-2xl font-bold font-serif mb-4">
                Why Donate?
              </h3>
              <p className="text-white/90 leading-relaxed mb-6">
                Every contribution, no matter how small, makes a significant
                impact. Your Sadaqah Jariyah helps build a legacy of faith and
                community support.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-3">
                  <Building2 className="w-5 h-5 text-[#FFC06E]" />
                  <span>Mosque Maintenance</span>
                </li>
                <li className="flex items-center gap-3">
                  <HandCoins className="w-5 h-5 text-[#FFC06E]" />
                  <span>Community Outreach</span>
                </li>
                <li className="flex items-center gap-3">
                  <HeartHandshake className="w-5 h-5 text-[#FFC06E]" />
                  <span>Educational Programs</span>
                </li>
              </ul>
            </div>

            {/* Other Ways to Give */}
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              <h3 className="text-2xl font-bold text-[#441A05] font-serif mb-6">
                Other Ways to Give
              </h3>

              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-lg text-[#3d2616] mb-2">
                    Bank Transfer
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-xl text-sm text-[#5c4033] space-y-1">
                    <p>
                      <span className="font-semibold">Bank:</span> KCB Bank
                    </p>
                    <p>
                      <span className="font-semibold">Account Name:</span>{" "}
                      Langata Islamic Center
                    </p>
                    <p>
                      <span className="font-semibold">Account No:</span>{" "}
                      1234567890
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-bold text-lg text-[#3d2616] mb-2">
                    In-Kind Donations
                  </h4>
                  <p className="text-[#5c4033] text-sm mb-3">
                    We accept food, clothes, and other items for our community
                    outreach programs.
                  </p>
                  <p className="text-sm font-bold text-[#00b17b]">
                    Visit our office to drop off items.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
