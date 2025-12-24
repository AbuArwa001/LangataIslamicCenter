"use client";

import { useState } from "react";
import { Loader2, KeyRound, Phone, Coins, CheckCircle, AlertCircle, CreditCard } from "lucide-react";

export default function DonationForm() {
    const [activeTab, setActiveTab] = useState<'mpesa' | 'card' | 'paypal'>('mpesa');
    const [phoneNumber, setPhoneNumber] = useState("");
    const [amount, setAmount] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    // Goal calculation (Mock data based on FAQ: 324M total)
    const goalAmount = 324000000;
    const currentAmount = 2450000; // Mock current amount
    const progressPercentage = Math.min((currentAmount / goalAmount) * 100, 100);

    const handleMpesaSubmit = async (e: React.FormEvent) => {
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

    const handleCardSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Placeholder for Card logic
        setMessage({ type: 'success', text: 'Card payment integration coming soon.' });
    };

    return (
        <div className="w-full max-w-lg mx-auto">
             {/* Progress Bar Section */}
             <div className="mb-8 bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
                <div className="flex justify-between items-end mb-2">
                    <div>
                        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">Raised so far</h4>
                        <p className="text-2xl font-bold text-slate-900">KES {currentAmount.toLocaleString()}</p>
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
                <p className="text-xs text-slate-400 mt-2 text-right">Goal: KES {goalAmount.toLocaleString()}</p>
             </div>


            <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-slate-100">
                {/* Header */}
                <div className="bg-slate-900 p-8 text-center text-white relative overflow-hidden">
                    <div className="absolute inset-0 bg-emerald-600/10 pointer-events-none"></div>
                    <h3 className="text-2xl font-bold relative z-10">Make a Donation</h3>
                    <p className="text-slate-300 text-sm mt-1 relative z-10">Support the construction of the Langata Islamic Center</p>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-slate-100">
                    <button 
                        onClick={() => setActiveTab('mpesa')}
                        className={`flex-1 py-4 text-sm font-semibold transition-all duration-300 relative ${activeTab === 'mpesa' ? 'text-emerald-600 bg-emerald-50/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                    >
                        M-Pesa
                        {activeTab === 'mpesa' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600"></div>}
                    </button>
                    <button 
                        onClick={() => setActiveTab('card')}
                        className={`flex-1 py-4 text-sm font-semibold transition-all duration-300 relative ${activeTab === 'card' ? 'text-emerald-600 bg-emerald-50/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                    >
                        Card
                        {activeTab === 'card' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600"></div>}
                    </button>
                     <button 
                        onClick={() => setActiveTab('paypal')}
                        className={`flex-1 py-4 text-sm font-semibold transition-all duration-300 relative ${activeTab === 'paypal' ? 'text-emerald-600 bg-emerald-50/50' : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}`}
                    >
                        Paypal
                        {activeTab === 'paypal' && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600"></div>}
                    </button>
                </div>

                {/* Content */}
                <div className="p-8">
                    {activeTab === 'mpesa' && (
                        <form onSubmit={handleMpesaSubmit} className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                             <div className="space-y-2">
                                <label htmlFor="phone" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
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
                                <label htmlFor="amount" className="text-sm font-semibold text-slate-700 flex items-center gap-2">
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
                                <div className={`p-4 rounded-lg flex items-start gap-3 text-sm ${message.type === 'success' ? 'bg-emerald-50 text-emerald-800 border border-emerald-100' : 'bg-red-50 text-red-800 border border-red-100'}`}>
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
                                className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:shadow-emerald-600/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    <>
                                        Donate with M-Pesa
                                    </>
                                )}
                            </button>
                             <div className="flex items-center justify-center gap-2 text-xs text-slate-400 pt-2">
                                <KeyRound className="w-3 h-3" />
                                <span>Secured by Safaricom M-Pesa</span>
                            </div>
                        </form>
                    )}

                    {activeTab === 'card' && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                             <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 text-center text-slate-500 text-sm">
                                <CreditCard className="w-8 h-8 mx-auto mb-2 text-slate-400" />
                                <p>Secure Card Payment</p>
                            </div>
                            
                            <form onSubmit={handleCardSubmit} className="space-y-4 opacity-60 pointer-events-none"> {/* Placeholder state */}
                                <div className="space-y-2">
                                    <label className="text-sm font-semibold text-slate-700">Card Number</label>
                                    <input type="text" placeholder="0000 0000 0000 0000" className="w-full px-4 py-3 border border-slate-200 rounded-lg" disabled />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                     <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">Expiry</label>
                                        <input type="text" placeholder="MM/YY" className="w-full px-4 py-3 border border-slate-200 rounded-lg" disabled />
                                    </div>
                                     <div className="space-y-2">
                                        <label className="text-sm font-semibold text-slate-700">CVC</label>
                                        <input type="text" placeholder="123" className="w-full px-4 py-3 border border-slate-200 rounded-lg" disabled />
                                    </div>
                                </div>
                                 <button disabled className="w-full py-4 bg-slate-300 text-white font-bold rounded-lg cursor-not-allowed">
                                    Pay with Card (Coming Soon)
                                </button>
                            </form>
                             <p className="text-center text-xs text-emerald-600 font-medium mt-4">Card integration is currently being set up by the administrator.</p>
                        </div>
                    )}
                     {activeTab === 'paypal' && (
                         <div className="space-y-6 py-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-500">
                            <p className="text-slate-600 mb-6">Support us using your Paypal account. It's fast, free and secure!</p>
                            <button className="w-full py-4 bg-[#0070ba] hover:bg-[#005ea6] text-white font-bold rounded-lg shadow-md transition-all flex items-center justify-center gap-2">
                                <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.946 5.05-3.674 7.12-8.448 7.12h-1.59l-.984 6.293-.191 1.22c-.022.137.084.271.222.271h3.346c.466 0 .863-.334.936-.798l.012-.089.467-2.95.105-.683c.099-.64.646-1.12 1.293-1.12h.73c3.708 0 5.426-1.854 6.136-5.875.029-.166.056-.33.08-.493.385-2.618-.08-4.708-1.503-6.423C13.435 2.158 10.99 1.578 8.016 1.578H5.998c-.14 0-.27.085-.3.22L2.784 19.98a.22.22 0 0 0 .216.254h4.48c.118 0 .216.096.216.214 0 .09-.057.17-.138.204l-.409 2.617c-.015.093-.095.162-.19.162z"/></svg>
                                Donate with Paypal
                            </button>
                         </div>
                    )}

                </div>
            </div>
        </div>
    );
}
