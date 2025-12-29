"use client";

import { useState } from "react";
import {DonationHeader} from "./DonationHeader";
import {DonationTabs} from "./DonationTabs";
import DonationProgress from "./DonationProgress";
import MpesaForm from "./forms/MpesaForm";
import StripeCardForm from "./forms/StripeCardForm";
import PayPalForm from "./forms/PayPalForm";
import PaystackForm from "./forms/PaystackForm";
import { PaymentTab, DonationMessage } from "./types";
import { CheckCircle, AlertCircle } from "lucide-react";
import { useSearchParams } from "next/navigation";

export default function DonationForm({ projectId }: { projectId?: string }) {
  const [activeTab, setActiveTab] = useState<PaymentTab>("mpesa");
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState<DonationMessage | null>(null);
  const searchParams = useSearchParams();
  
  // 1. Get the ID from the URL if the prop wasn't passed directly
  const queryProjectId = searchParams.get("project");
  if (!projectId && queryProjectId) {
    projectId = queryProjectId;
  }
  
  // Constants (Ideally fetched from an API or config)
  const goalAmount = 324000000;
  const currentAmount = 2450000;

  return (
    <div className="w-full max-w-lg mx-auto">
      {!projectId && <DonationProgress currentAmount={currentAmount} goalAmount={goalAmount} />}

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        <DonationHeader projectId={projectId} />
        
        <DonationTabs activeTab={activeTab} onChange={setActiveTab} />

        <div className="p-8">
          {activeTab === "mpesa" && (
            <MpesaForm amount={amount} setAmount={setAmount} projectId={projectId||null} onMessage={setMessage} />
          )}
          {activeTab === "card" && (
            <StripeCardForm amount={amount} setAmount={setAmount} projectId={projectId||null} onMessage={setMessage} />
          )}
          {activeTab === "paypal" && (
            <PayPalForm amount={amount} setAmount={setAmount} projectId={projectId||null} onMessage={setMessage} />
          )}
          {activeTab === "paystack" && (
            <PaystackForm amount={amount} setAmount={setAmount} projectId={projectId||null} onMessage={setMessage} />
          )}

          {/* Shared Status Message Component */}
          {message && (
            <div className={`mt-4 p-4 rounded-lg flex items-start gap-3 text-sm ${
              message.type === "success" ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"
            }`}>
              {message.type === "success" ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
              <p>{message.text}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}