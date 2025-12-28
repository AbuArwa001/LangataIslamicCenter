"use client";

import { useState } from "react";
import {
  Loader2,
  KeyRound,
  Phone,
  Coins,
  CheckCircle,
  AlertCircle,
  CreditCard,
} from "lucide-react";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  CardElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY ||
    process.env.NEXT_PUBLIC_TEST_STRIPE_PUBLIC_KEY ||
    ""
);

function StripeCardForm({
  amount,
  email,
  onSuccess,
  projectId,
}: {
  amount: string;
  email: string;
  onSuccess: (msg: string) => void;
  projectId: string;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // If stripe is null, it means the public key is likely missing or invalid
  if (!stripePromise) {
    return (
      <div className="text-red-500 text-xs text-center">
        Stripe Configuration Missing
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Block submission if Stripe isn't loaded or amount is empty
    if (!stripe || !elements) return;
    if (!amount || parseFloat(amount) <= 0) {
      setErrorMessage("Please enter a valid amount first.");
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/donations/initiate_payment/`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: amount,
            payment_method: "card",
            project: projectId,
          }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Server error");

      const result = await stripe.confirmCardPayment(data.client_secret, {
        payment_method: {
          card: elements.getElement(CardElement)!,
          billing_details: { email: email },
        },
      });

      if (result.error) {
        setErrorMessage(result.error.message || "Payment failed");
      } else if (result.paymentIntent.status === "succeeded") {
        onSuccess("Payment Successful!");
      }
    } catch (err: any) {
      setErrorMessage(err.message);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border border-slate-200 rounded-lg bg-white shadow-inner">
        <CardElement
          options={{
            style: { base: { fontSize: "16px", color: "#1e293b" } },
            hidePostalCode: true, // Simplifies the UI for international donors
          }}
        />
      </div>

      {errorMessage && (
        <div className="bg-red-50 text-red-600 p-2 rounded text-xs flex items-center gap-2">
          <AlertCircle className="w-3 h-3" /> {errorMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isProcessing || !stripe}
        className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg transition-all flex items-center justify-center gap-2 disabled:bg-slate-300 disabled:cursor-not-allowed"
      >
        {isProcessing ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          `Donate KES ${amount || "0"}`
        )}
      </button>
    </form>
  );
}

export default function DonationForm({ projectId }: { projectId?: string }) {
  const [activeTab, setActiveTab] = useState<
    "mpesa" | "card" | "paypal" | "paystack"
  >("mpesa");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  // Goal calculation (Mock data based on FAQ: 324M total)
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const goalAmount = 324000000;
  const currentAmount = 2450000; // Mock current amount
  const progressPercentage = Math.min((currentAmount / goalAmount) * 100, 100);

  const handleMpesaSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    // Basic validation
    // Format: 2547XXXXXXXX or 07XXXXXXXX
    let formattedPhone = phoneNumber.replace(/\s+/g, "");
    if (formattedPhone.startsWith("0")) {
      formattedPhone = "254" + formattedPhone.substring(1);
    }

    if (
      !formattedPhone.match(/^2547\d{8}$/) &&
      !formattedPhone.match(/^2541\d{8}$/)
    ) {
      setMessage({
        type: "error",
        text: "Please enter a valid Safaricom phone number (e.g., 0712345678).",
      });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/donations/mpesa/stk-push/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone_number: formattedPhone,
          amount: parseInt(amount),
          account_reference: "Langata Islamic Center",
          project: projectId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage({
          type: "success",
          text: `STK Push sent to ${formattedPhone}. Please check your phone to complete the donation.`,
        });
      } else {
        setMessage({
          type: "error",
          text:
            data.errorMessage ||
            data.error ||
            "Failed to initiate payment. Please try again.",
        });
      }
    } catch (error) {
      setMessage({
        type: "error",
        text: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handlePaystackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    if (!amount || parseFloat(amount) <= 0) {
      setMessage({ type: "error", text: "Please enter a valid amount." });
      setLoading(false);
      return;
    }
    if (!email) {
      setMessage({ type: "error", text: "Please enter your email address." });
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(`${API_URL}/donations/initiate_payment/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: amount,
          email: email,
          payment_method: "paystack",
          project: projectId,
        }),
      });

      const data = await response.json();

      if (response.ok && data.authorization_url) {
        // Redirect to Paystack
        window.location.href = data.authorization_url;
      } else {
        setMessage({
          type: "error",
          text: data.error || "Failed to initiate Paystack payment.",
        });
      }
    } catch (error) {
      console.error(error);
      setMessage({
        type: "error",
        text: "An unexpected error occurred.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      {!projectId && (
        /* Progress Bar Section - Only show on main donation page */
        <div className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-end mb-2">
            <div>
              <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                Raised so far
              </h4>
              <p className="text-2xl font-bold text-slate-900">
                KES {currentAmount.toLocaleString()}
              </p>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                {progressPercentage.toFixed(2)}% of Goal
              </span>
            </div>
          </div>
          <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <p className="text-xs text-slate-400 mt-2 text-right">
            Goal: KES {goalAmount.toLocaleString()}
          </p>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
        {/* Header */}
        <div className="bg-slate-900 p-8 text-center text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-emerald-600/10 pointer-events-none"></div>
          <h3 className="text-2xl font-bold relative z-10">Make a Donation</h3>
          <p className="text-slate-300 text-sm mt-1 relative z-10">
            {projectId
              ? "Support this specific project"
              : "Support the construction of the Langata Islamic Center"}
          </p>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100 overflow-x-auto">
          <button
            onClick={() => setActiveTab("mpesa")}
            className={`flex-1 py-4 text-sm font-semibold transition-all duration-300 relative min-w-[80px] ${
              activeTab === "mpesa"
                ? "text-emerald-600 bg-emerald-50/50"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
          >
            M-Pesa
            {activeTab === "mpesa" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab("card")}
            className={`flex-1 py-4 text-sm font-semibold transition-all duration-300 relative min-w-[80px] ${
              activeTab === "card"
                ? "text-emerald-600 bg-emerald-50/50"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
          >
            Card
            {activeTab === "card" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab("paypal")}
            className={`flex-1 py-4 text-sm font-semibold transition-all duration-300 relative min-w-[80px] ${
              activeTab === "paypal"
                ? "text-emerald-600 bg-emerald-50/50"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
          >
            Paypal
            {activeTab === "paypal" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600"></div>
            )}
          </button>
          <button
            onClick={() => setActiveTab("paystack")}
            className={`flex-1 py-4 text-sm font-semibold transition-all duration-300 relative min-w-[80px] ${
              activeTab === "paystack"
                ? "text-emerald-600 bg-emerald-50/50"
                : "text-slate-500 hover:text-slate-700 hover:bg-slate-50"
            }`}
          >
            Paystack
            {activeTab === "paystack" && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600"></div>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          {activeTab === "mpesa" && (
            <form
              onSubmit={handleMpesaSubmit}
              className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <div className="space-y-2">
                <label
                  htmlFor="phone"
                  className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                >
                  <Phone className="w-4 h-4 text-emerald-600" /> Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  placeholder="07XX XXX XXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="amount"
                  className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                >
                  <Coins className="w-4 h-4 text-emerald-600" /> Amount (KES)
                </label>
                <input
                  type="number"
                  id="amount"
                  placeholder="e.g. 1000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
                  required
                />
              </div>

              {message && (
                <div
                  className={`p-4 rounded-lg flex items-start gap-3 text-sm ${
                    message.type === "success"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-100"
                      : "bg-red-50 text-red-800 border border-red-100"
                  }`}
                >
                  {message.type === "success" ? (
                    <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  )}
                  <p>{message.text}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:shadow-emerald-600/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>Donate with M-Pesa</>
                )}
              </button>
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
                <KeyRound className="w-3 h-3" />
                <span>Secured by Safaricom M-Pesa</span>
              </div>
            </form>
          )}

          {activeTab === "card" && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 text-center text-slate-500 text-sm">
                <CreditCard className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                <p>Secure Card Payment</p>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                  <Coins className="w-4 h-4 text-emerald-600" /> Amount (KES)
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Amount to donate"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none"
                />
              </div>
              <Elements stripe={stripePromise}>
                <StripeCardForm
                  amount={amount}
                  email="donor@example.com"
                  onSuccess={() =>
                    setMessage({
                      type: "success",
                      text: "Thank you! Your card donation was successful.",
                    })
                  }
                  projectId={projectId || ""}
                />
              </Elements>

              <p className="text-center text-[10px] text-slate-400">
                Protected by industry-standard SSL encryption.
              </p>
            </div>
          )}
          {activeTab === "paypal" && (
            <div className="space-y-6 py-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
              <PayPalScriptProvider
                options={{
                  clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "test",
                  currency: "USD",
                }}
              >
                <div className="space-y-2 mb-4">
                  <label className="text-sm font-semibold text-slate-700 flex items-center gap-2 justify-center">
                    <Coins className="w-4 h-4 text-emerald-600" /> Amount (USD)
                  </label>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Amount to donate"
                    className="w-full px-4 py-3 border border-slate-200 rounded-lg outline-none max-w-xs mx-auto text-center"
                  />
                </div>
                <PayPalButtons
                  style={{ layout: "vertical" }}
                  createOrder={async (data, actions) => {
                    if (!amount || parseFloat(amount) <= 0) {
                      setMessage({
                        type: "error",
                        text: "Please enter a valid amount.",
                      });
                      throw new Error("Invalid amount");
                    }

                    try {
                      const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/donations/initiate_payment/`,
                        {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            amount: amount,
                            payment_method: "paypal",
                            project: projectId,
                          }),
                        }
                      );

                      const orderData = await response.json();

                      if (orderData.id) {
                        return orderData.id;
                      } else {
                        const errorDetail = orderData?.details?.[0];
                        const errorMessage = errorDetail
                          ? `${errorDetail.issue} ${errorDetail.description} (${orderData.debug_id})`
                          : JSON.stringify(orderData);

                        throw new Error(errorMessage);
                      }
                    } catch (error) {
                      console.error(error);
                      setMessage({
                        type: "error",
                        text: `Could not initiate PayPal Checkout: ${error}`,
                      });
                      throw error; // Rethrow to stop execution
                    }
                  }}
                  onApprove={async (data, actions) => {
                    try {
                      const response = await fetch(
                        `${process.env.NEXT_PUBLIC_API_URL}/donations/capture_paypal_payment/`,
                        {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            orderID: data.orderID,
                          }),
                        }
                      );

                      const orderData = await response.json();
                      const errorDetail = orderData?.details?.[0];

                      if (errorDetail?.issue === "INSTRUMENT_DECLINED") {
                        return actions.restart();
                      } else if (errorDetail) {
                        throw new Error(
                          `${errorDetail.description} (${orderData.debug_id})`
                        );
                      } else if (
                        !orderData.status ||
                        orderData.status !== "COMPLETED"
                      ) {
                        throw new Error("Payment not completed");
                      } else {
                        setMessage({
                          type: "success",
                          text:
                            "Transaction completed by " +
                            (orderData.payer?.name?.given_name ?? "Donor"),
                        });
                      }
                    } catch (error) {
                      console.error(error);
                      setMessage({
                        type: "error",
                        text: `Sorry, your transaction could not be processed...${error}`,
                      });
                    }
                  }}
                />
              </PayPalScriptProvider>
            </div>
          )}

          {activeTab === "paystack" && (
            <form
              onSubmit={handlePaystackSubmit}
              className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500"
            >
              <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 text-center text-slate-500 text-sm">
                <CreditCard className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                <p>Secure Paystack Payment</p>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
                  required
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="amount"
                  className="text-sm font-semibold text-slate-700 flex items-center gap-2"
                >
                  <Coins className="w-4 h-4 text-emerald-600" /> Amount (KES)
                </label>
                <input
                  type="number"
                  id="amount"
                  placeholder="e.g. 1000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  min="1"
                  className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 outline-none transition-all placeholder:text-slate-400"
                  required
                />
              </div>

              {message && (
                <div
                  className={`p-4 rounded-lg flex items-start gap-3 text-sm ${
                    message.type === "success"
                      ? "bg-emerald-50 text-emerald-800 border border-emerald-100"
                      : "bg-red-50 text-red-800 border border-red-100"
                  }`}
                >
                  {message.type === "success" ? (
                    <CheckCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  )}
                  <p>{message.text}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:shadow-emerald-600/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Processing...
                  </>
                ) : (
                  <>Donate with Paystack</>
                )}
              </button>
              <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
                <KeyRound className="w-3 h-3" />
                <span>Secured by Paystack</span>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
