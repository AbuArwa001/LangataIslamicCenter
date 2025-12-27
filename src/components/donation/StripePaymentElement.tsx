import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { useState } from "react";

export default function StripePaymentElement({ clientSecret, onWait }: { clientSecret: string, onWait: (loading: boolean) => void }) {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!stripe || !elements) return;

        onWait(true);
        const cardElement = elements.getElement(CardElement);

        const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: cardElement!,
            },
        });

        if (error) {
            setError(error.message || "An error occurred");
            onWait(false);
        } else if (paymentIntent.status === "succeeded") {
            window.location.href = "/donate/success"; // Redirect on success
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div className="p-4 border rounded-xl bg-gray-50">
                <CardElement options={{ style: { base: { fontSize: '16px' } } }} />
            </div>
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <button 
                type="submit" 
                disabled={!stripe}
                className="w-full bg-[#00b17b] text-white py-4 rounded-xl font-bold hover:bg-[#008f63] transition-colors"
            >
                Confirm Secure Payment
            </button>
        </form>
    );
}
