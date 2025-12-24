"use client";

import { useState } from "react";
import { Loader2, KeyRound, Phone, Coins, CheckCircle, AlertCircle } from "lucide-react";

export default function DonationForm() {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setMessage(null);

        // Basic validation
        // Format: 2547XXXXXXXX or 07XXXXXXXX
        let formattedPhone = phoneNumber.replace(/\s+/g, '');
        if (formattedPhone.startsWith('0')) {
            formattedPhone = '254' + formattedPhone.substring(1);
        }

        if (!formattedPhone.match(/^2547\d{8}$/) && !formattedPhone.match(/^2541\d{8}$/)) {
            setMessage({ type: 'error', text: 'Please enter a valid Safaricom phone number (e.g., 0712345678).' });
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/daraja/stkpush', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone: formattedPhone,
                    amount: parseInt(amount),
                }),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage({ type: 'success', text: `STK Push sent to ${formattedPhone}. Please check your phone to complete the donation.` });
            } else {
                setMessage({ type: 'error', text: data.error || 'Failed to initiate payment. Please try again.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'An unexpected error occurred. Please try again later.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
            <div className="p-8 pb-6 bg-slate-50 border-b border-slate-100">
                <h3 className="text-2xl font-bold text-slate-800 text-center">Make a Donation</h3>
                <p className="text-center text-slate-500 mt-2 text-sm">Secure M-Pesa Payment</p>
            </div>

            <div className="p-8">
                <form onSubmit={handleSubmit} className="space-y-6">

                    <div className="space-y-2">
                        <label htmlFor="phone" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <Phone className="w-4 h-4 text-primary" /> Phone Number
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
                        <label htmlFor="amount" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
                            <Coins className="w-4 h-4 text-primary" /> Amount (KES)
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
                        <div className={`p-4 rounded-lg flex items-start gap-3 text-sm ${message.type === 'success' ? 'bg-emerald-50 text-emerald-800' : 'bg-red-50 text-red-800'}`}>
                            {message.type === 'success' ? (
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
                        className="w-full py-4 bg-primary hover:bg-emerald-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="w-5 h-5 animate-spin" />
                                Processing...
                            </>
                        ) : (
                            <>
                                Donate Now
                            </>
                        )}
                    </button>

                    <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
                        <KeyRound className="w-3 h-3" />
                        <span>Secured by Safaricom M-Pesa</span>
                    </div>

                </form>
            </div>
        </div>
    );
}
