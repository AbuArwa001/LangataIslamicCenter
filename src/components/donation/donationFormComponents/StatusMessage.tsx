import { CheckCircle, AlertCircle } from "lucide-react";
import { DonationMessage } from "../types";

export const StatusMessage = ({ message }: { message: DonationMessage | null }) => {
  if (!message) return null;

  const isSuccess = message.type === "success";
  return (
    <div className={`mt-4 p-4 rounded-lg flex gap-3 text-sm ${
      isSuccess ? "bg-emerald-50 text-emerald-800" : "bg-red-50 text-red-800"
    }`}>
      {isSuccess ? <CheckCircle className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
      <p>{message.text}</p>
    </div>
  );
};