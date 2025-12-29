"use client";

import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { Coins } from "lucide-react";
import { BaseFormProps } from "../types";

export default function PayPalForm({ amount, setAmount, projectId, onMessage }: BaseFormProps) {
  return (
    <div className="space-y-6 py-8 text-center animate-in fade-in slide-in-from-bottom-4">
      <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test", currency: "USD" }}>
        <div className="space-y-2 mb-4">
          <label className="text-sm font-semibold text-slate-700 flex items-center justify-center gap-2">
            <Coins className="w-4 h-4 text-emerald-600" /> Amount (USD)
          </label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none max-w-xs mx-auto text-center"
          />
        </div>
        <PayPalButtons
          style={{ layout: "vertical" }}
          createOrder={async () => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/donations/initiate_payment/`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ amount, payment_method: "paypal", project: projectId }),
            });
            const data = await res.json();
            return data.id;
          }}
          onApprove={async (data) => {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/donations/capture_paypal_payment/`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ orderID: data.orderID }),
            });
            if (res.ok) onMessage({ type: "success", text: "Transaction completed!" });
          }}
        />
      </PayPalScriptProvider>
    </div>
  );
}