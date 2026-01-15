import MpesaForm from "@/components/donation/forms/MpesaForm";
import StripeCardForm from "@/components/donation/forms/StripeCardForm";
import PayPalForm from "@/components/donation/forms/PayPalForm";
import PaystackForm from "@/components/donation/forms/PaystackForm";
import { PaymentTab, DonationMessage } from "../types";

interface Props {
  activeTab: PaymentTab;
  amount: string;
  setAmount: (val: string) => void;
  projectId: string | null;
  onMessage: (msg: DonationMessage | null) => void;
}

export const PaymentFormRenderer = ({ activeTab, ...props }: Props) => {
  switch (activeTab) {
    case "mpesa":
      return <MpesaForm {...props} />;
    case "card":
      return <StripeCardForm {...props} />;
    case "paypal":
      return <PayPalForm {...props} />;
    case "paystack":
      return <PaystackForm {...props} />;
    default:
      return null;
  }
};
