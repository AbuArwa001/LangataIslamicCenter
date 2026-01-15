"use client";
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getProjectById } from "@/data/projects";
import { DonationHeader } from "./DonationHeader";
import { DonationTabs } from "./DonationTabs";
import DonationProgress from "./DonationProgress";
import { PaymentFormRenderer } from "./donationFormComponents/PaymentFormRenderer";
import { StatusMessage } from "./donationFormComponents/StatusMessage";
import { PaymentTab, DonationMessage } from "./types";

export default function DonationForm({ projectId }: { projectId?: string }) {
  const searchParams = useSearchParams();
  const resolvedProjectId = projectId ?? searchParams.get("project") ?? null;

  const [activeTab, setActiveTab] = useState<PaymentTab>("mpesa");
  const [amount, setAmount] = useState("");
  const [goalAmount, setGoalAmount] = useState(0);
  const [message, setMessage] = useState<DonationMessage | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!resolvedProjectId) {
      setIsLoading(false);
      return;
    }

    const fetchProject = async () => {
      try {
        setIsLoading(true);
        const project = await getProjectById(resolvedProjectId);
        setGoalAmount(Number(project.goal_amount) || 0);
        // Usually, you don't want to set the user's donation amount 
        // to the total_donated immediately, but keeping your logic:
        setAmount(project.total_donated ? String(project.total_donated) : "");
      } catch (err) {
        console.error("Failed to fetch project:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProject();
  }, [resolvedProjectId]);

  if (isLoading) {
    return (
      <div className="w-full max-w-lg mx-auto animate-pulse">
        <div className="h-4 bg-slate-200 rounded w-full mb-6" />
        <div className="bg-white rounded-2xl shadow-xl h-[400px] border border-slate-100" />
      </div>
    );
  }

  return (
    <PayPalScriptProvider options={{ clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test", currency: "USD" }}>
      <div className="w-full max-w-lg mx-auto">
        {resolvedProjectId && (
          <DonationProgress currentAmount={Number(amount) || 0} goalAmount={goalAmount} />
        )}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
          <DonationHeader projectId={resolvedProjectId ?? undefined} />
          <DonationTabs activeTab={activeTab} onChange={setActiveTab} />

          <div className="p-8">
            <PaymentFormRenderer
              activeTab={activeTab}
              amount={amount}
              setAmount={setAmount}
              projectId={resolvedProjectId}
              onMessage={setMessage}
            />

            <StatusMessage message={message} />
          </div>
        </div>
      </div>
    </PayPalScriptProvider>
  );
}