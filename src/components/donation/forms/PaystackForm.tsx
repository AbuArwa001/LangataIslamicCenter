"use client";

import { useState } from "react";
import { Coins, Loader2, CreditCard, KeyRound } from "lucide-react";
import { BaseFormProps } from "../types";

export default function PaystackForm({ amount, setAmount, projectId, onMessage }: BaseFormProps) {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/donations/initiate_payment/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, email, payment_method: "paystack", project: projectId }),
      });

      const data = await response.json();
      if (response.ok && data.authorization_url) {
        window.location.href = data.authorization_url;
      } else {
        onMessage({ type: "error", text: data.error || "Failed to initiate Paystack." });
      }
    } catch (error) {
      onMessage({ type: "error", text: "An unexpected error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 text-center text-sm">
        <CreditCard className="w-8 h-8 mx-auto mb-2 text-slate-400" />
        <p>Secure Paystack Payment</p>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700">Email Address</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none"
          required
        />
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <Coins className="w-4 h-4 text-emerald-600" /> Amount (KES)
        </label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none"
          required
        />
      </div>
      <button disabled={loading} className="w-full py-4 bg-emerald-600 text-white font-bold rounded-lg flex justify-center items-center gap-2">
        {loading ? <Loader2 className="animate-spin" /> : "Donate with Paystack"}
      </button>
      <div className="flex items-center justify-center gap-2 text-xs text-slate-400">
        <KeyRound className="w-3 h-3" />
        <span>Secured by Paystack</span>
      </div>
    </form>
  );
}