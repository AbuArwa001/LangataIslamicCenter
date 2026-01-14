import { useState } from "react";
import { Phone, Coins, Loader2, KeyRound } from "lucide-react";
import { BaseFormProps } from "../types";

export default function MpesaForm({ amount, setAmount, projectId, onMessage }: BaseFormProps) {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("MpesaForm ProjectId:", projectId);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    onMessage(null);

    let formattedPhone = phoneNumber.replace(/\s+/g, "");
    if (formattedPhone.startsWith("0")) formattedPhone = "254" + formattedPhone.substring(1);

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/mpesa/stk-push/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: formattedPhone,
          amount: parseInt(amount),
          account_reference: "Langata Islamic Center",
          project: projectId,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        onMessage({ type: "success", text: `STK Push sent to ${formattedPhone}.` });
      } else {
        onMessage({ type: "error", text: data.error || "Failed to initiate." });
      }
    } catch (error) {
      onMessage({ type: "error", text: "An unexpected error occurred." });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <Phone className="w-4 h-4 text-emerald-600" /> Phone Number
        </label>
        <input
          type="tel"
          placeholder="07XX XXX XXX"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
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
      <button 
      type="submit" 
      disabled={loading}
      // onClick={handleSubmit}
      className="w-full py-4 bg-emerald-600 text-white font-bold rounded-lg flex justify-center items-center gap-2"
      >
        {loading ? <Loader2 className="animate-spin" /> : "Donate with M-Pesa"}
      </button>
    </form>
  );
}