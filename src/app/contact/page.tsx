import { Mail, MapPin, Phone } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
            <div className="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">

                {/* Contact Info */}
                <div className="space-y-8">
                    <h1 className="text-4xl font-bold tracking-tight text-foreground">Get in Touch</h1>
                    <p className="text-xl text-muted-foreground">
                        We'd love to hear from you. Whether you have a question about our programs, want to volunteer, or just say salaam.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-start space-x-4">
                            <MapPin className="w-6 h-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold text-foreground">Visit Us</h3>
                                <p className="text-muted-foreground">Langata South Road<br />Nairobi, Kenya</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <Phone className="w-6 h-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold text-foreground">Call Us</h3>
                                <p className="text-muted-foreground">+254 700 000 000</p>
                            </div>
                        </div>

                        <div className="flex items-start space-x-4">
                            <Mail className="w-6 h-6 text-primary mt-1" />
                            <div>
                                <h3 className="font-semibold text-foreground">Email Us</h3>
                                <p className="text-muted-foreground">info@langataislamic.org</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
                    <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label htmlFor="firstName" className="text-sm font-medium text-foreground">First Name</label>
                                <input type="text" id="firstName" className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                            </div>
                            <div className="space-y-2">
                                <label htmlFor="lastName" className="text-sm font-medium text-foreground">Last Name</label>
                                <input type="text" id="lastName" className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                            <input type="email" id="email" className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50" />
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                            <textarea id="message" rows={4} className="w-full px-3 py-2 border border-border rounded-md bg-background focus:outline-none focus:ring-2 focus:ring-primary/50"></textarea>
                        </div>

                        <button type="submit" className="w-full py-3 px-4 bg-primary text-primary-foreground font-semibold rounded-md hover:bg-emerald-700 transition-colors">
                            Send Message
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
}
