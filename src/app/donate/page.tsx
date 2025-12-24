import DonationForm from "@/components/donation/DonationForm";

export default function DonatePage() {
    return (
        <div className="min-h-screen bg-slate-50">
            {/* Hero Banner for Donate Page */}
            <div className="bg-slate-900 py-16 md:py-24 text-center text-white relative overflow-hidden">
                <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-5"></div>
                <div className="container mx-auto px-4 relative z-10">
                    <h1 className="text-3xl md:text-5xl font-bold mb-4">Support Our Cause</h1>
                    <p className="text-slate-300 max-w-2xl mx-auto text-lg">
                        Your generous donations help us maintain the mosque, support our educational programs, and provide for the needy in our community.
                    </p>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 -mt-10 relative z-20">
                <DonationForm />
            </div>

            <div className="container mx-auto px-4 py-12 max-w-4xl text-center">
                <h3 className="text-xl font-semibold mb-6">Other Ways to Give</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
                        <h4 className="font-bold text-lg mb-2 text-foreground">Bank Transfer</h4>
                        <p className="text-muted-foreground text-sm mb-4">Direct transfer to our bank account.</p>
                        <div className="space-y-1 text-sm">
                            <p><span className="font-semibold">Bank:</span> Example Bank</p>
                            <p><span className="font-semibold">Account Name:</span> Langata Islamic Center</p>
                            <p><span className="font-semibold">Account No:</span> 1234567890</p>
                        </div>
                    </div>

                    <div className="p-6 bg-white rounded-xl shadow-sm border border-slate-100">
                        <h4 className="font-bold text-lg mb-2 text-foreground">In-Kind Donations</h4>
                        <p className="text-muted-foreground text-sm mb-4">We accept food, clothes, and other items for our community outreach programs.</p>
                        <p className="text-sm font-medium text-primary">Please visit our office to drop off items.</p>
                    </div>
                </div>
            </div>

        </div>
    );
}
