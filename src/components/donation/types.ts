export type PaymentTab = "mpesa" | "card" | "paypal" | "paystack";

export interface DonationMessage {
  type: "success" | "error";
  text: string;
}

export interface BaseFormProps {
  amount: string;
  setAmount: (val: string) => void;
  projectId: string | null;
  onMessage: (msg: DonationMessage | null) => void;
}