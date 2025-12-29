// components/donation/DonationTabs.tsx
import { PaymentTab } from "./types";

export function DonationTabs({
  activeTab,
  onChange,
}: {
  activeTab: PaymentTab;
  onChange: (tab: PaymentTab) => void;
}) {
  const tabs: PaymentTab[] = ["mpesa", "card", "paypal", "paystack"];

  return (
    <div className="flex border-b">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`flex-1 py-4 text-sm font-semibold ${
            activeTab === tab
              ? "text-emerald-600 bg-emerald-50"
              : "text-slate-500"
          }`}
        >
          {tab.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
