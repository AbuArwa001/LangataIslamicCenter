"use client";

import { useState } from "react";
import { Loader2, AlertCircle, CreditCard, Coins } from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { BaseFormProps } from "../types";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_TEST_STRIPE_PUBLIC_KEY || "");
// const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "");

function CardForm({ amount, projectId, onMessage }: Omit<BaseFormProps, 'setAmount'>) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);

  console.log("StripeCardForm ProjectId:", projectId);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setIsProcessing(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/donations/initiate_payment/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ amount, payment_method: "card", project: projectId }),
      });

      const data = await response.json();
      const result = await stripe.confirmCardPayment(data.client_secret, {
        payment_method: { card: elements.getElement(CardElement)! },
      });

      if (result.error) {
        onMessage({ type: "error", text: result.error.message || "Payment failed" });
      } else if (result.paymentIntent.status === "succeeded") {
        onMessage({ type: "success", text: "Payment Successful!" });
      }
    } catch (err: any) {
      onMessage({ type: "error", text: err.message });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border border-slate-200 rounded-lg bg-white shadow-inner">
        <CardElement options={{ style: { base: { fontSize: "16px" } }, hidePostalCode: true }} />
      </div>
      <button
        disabled={isProcessing || !stripe}
        className="w-full py-4 bg-emerald-600 text-white font-bold rounded-lg disabled:bg-slate-300"
      >
        {isProcessing ? <Loader2 className="animate-spin mx-auto" /> : `Donate KES ${amount || "0"}`}
      </button>
    </form>
  );
}

export default function StripeCardForm(props: BaseFormProps) {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4">
      <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 text-center text-sm">
        <CreditCard className="w-8 h-8 mx-auto mb-2 text-slate-400" />
        <p>Secure Card Payment</p>
      </div>
      <div className="space-y-2">
        <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
          <Coins className="w-4 h-4 text-emerald-600" /> Amount (KES)
        </label>
        <input
          type="number"
          value={props.amount}
          onChange={(e) => props.setAmount(e.target.value)}
          className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none"
        />
      </div>
      <Elements stripe={stripePromise}>
        <CardForm amount={props.amount} projectId={props.projectId} onMessage={props.onMessage} />
      </Elements>
    </div>
  );
}