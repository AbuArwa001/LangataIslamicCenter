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
            Your generous donations help us build our mosque and support the Masjid Building
            Project of the Langata Islamic Welfare Organization, creating a lasting place of worship for our community.
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
            <div className="lg:col-span-1 space-y-8">
              {/* Why Donate Card */}
              <div className="bg-[#441A05] text-white rounded-3xl p-8 shadow-xl">
                <h3 className="text-2xl font-bold font-serif mb-4">
                  Why Donate?
                </h3>

                <p className="text-white/90 leading-relaxed mb-6">
                  Every contribution, no matter the size, makes a meaningful difference.
                  Your Sadaqah Jariyah helps build a permanent house of worship and nurtures
                  a lasting legacy of faith, unity, and service for generations to come.
                </p>

                <ul className="space-y-4">
                  <li className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-[#FFC06E]" />
                    <span className="font-medium">Mosque Construction</span>
                  </li>

                  <li className="flex items-center gap-3">
                    <HandCoins className="w-5 h-5 text-[#FFC06E]" />
                    <span className="font-medium">Community Support & Outreach</span>
                  </li>

                  <li className="flex items-center gap-3">
                    <HeartHandshake className="w-5 h-5 text-[#FFC06E]" />
                    <span className="font-medium">Islamic & Educational Programs</span>
                  </li>
                </ul>
              </div>
            </div>
            {/* Other Ways to Give */}
            <div>
              <h4 className="font-bold text-lg text-[#3d2616] mb-2">
                Bank Transfer
              </h4>
              <div className="bg-gray-50 p-6 rounded-xl text-sm text-[#5c4033] space-y-2 border border-gray-200">
                <div className="flex justify-between border-b border-gray-200 pb-1">
                  <span className="font-semibold text-gray-500 uppercase text-[10px] tracking-wider">Bank</span>
                  <span className="font-medium">Premier Bank Kenya</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-1">
                  <span className="font-semibold text-gray-500 uppercase text-[10px] tracking-wider">Branch</span>
                  <span className="font-medium">Wabera Branch</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-1">
                  <span className="font-semibold text-gray-500 uppercase text-[10px] tracking-wider">Account Name</span>
                  <span className="font-medium">Langata Islamic Welfare Organization</span>
                </div>
                <div className="flex justify-between border-b border-gray-200 pb-1">
                  <span className="font-semibold text-gray-500 uppercase text-[10px] tracking-wider">Account No (KES)</span>
                  <span className="font-bold text-slate-900">0012556901</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="font-semibold text-gray-500 uppercase text-[10px] tracking-wider">SWIFT Code</span>
                  <span className="font-medium italic">IFCBKENA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
