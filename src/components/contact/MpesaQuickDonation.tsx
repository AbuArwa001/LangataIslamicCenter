"use client";

import { useState } from "react";
import { Smartphone } from "lucide-react";

export default function MpesaQuickDonation() {
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");
  const [isDonating, setIsDonating] = useState(false);
  const [donationStatus, setDonationStatus] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleMpesaDonation = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDonating(true);
    setDonationStatus(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/donations/mpesa/stk-push/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone_number: phone,
            amount: amount,
            account_reference: "ContactPage",
          }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        setDonationStatus({
          type: "success",
          message: "STK Push sent! Please check your phone.",
        });
      } else {
        setDonationStatus({
          type: "error",
          message: result.errorMessage || "Failed to initiate payment.",
        });
      }
    } catch (error) {
      setDonationStatus({
        type: "error",
        message: "An error occurred. Please try again.",
      });
    } finally {
      setIsDonating(false);
    }
  };

  return (
    <div className="bg-[#00b17b] p-8 rounded-2xl shadow-lg text-white">
      <div className="flex items-center gap-3 mb-6">
        <Smartphone className="w-8 h-8" />
        <h2 className="text-2xl font-bold">Quick M-Pesa</h2>
      </div>
      <p className="mb-6 text-emerald-50">
        Support our mosque projects instantly via M-Pesa STK Push.
      </p>

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
        <div
          className={`mt-4 p-3 rounded-lg text-sm font-medium ${
            donationStatus.type === "success"
              ? "bg-emerald-800/50 text-emerald-100"
              : "bg-red-800/50 text-red-100"
          }`}
        >
          {donationStatus.message}
        </div>
      )}
    </div>
  );
}
