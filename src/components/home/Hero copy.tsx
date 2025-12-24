import Link from "next/link";
import { ArrowRight, Heart } from "lucide-react";

export default function Hero() {
    return (
        <section className="relative w-full py-24 md:py-32 lg:py-40 bg-gradient-to-br from-emerald-900 via-emerald-800 to-slate-900 text-white overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute inset-0 bg-[url('/pattern.svg')] opacity-10"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>

            <div className="container px-4 md:px-6 relative z-10 flex flex-col items-center text-center">
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tight mb-6 animate-in slide-in-from-bottom-6 fade-in duration-700">
                    Building Faith, <br className="hidden md:block" />
                    <span className="text-primary-foreground text-transparent bg-clip-text bg-gradient-to-r from-emerald-200 to-amber-200">
                        Serving Humanity
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-emerald-100 max-w-2xl mb-8 animate-in slide-in-from-bottom-8 fade-in duration-700 delay-150">
                    The heart of the community in Langata. Join us for prayers, education, and social welfare programs designed to uplift everyone.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 animate-in slide-in-from-bottom-10 fade-in duration-700 delay-300">
                    <Link
                        href="/donate"
                        className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-primary bg-white rounded-full hover:bg-emerald-50 transition-colors shadow-lg gap-2"
                    >
                        <Heart className="w-5 h-5 fill-primary" />
                        Donate for our Cause
                    </Link>
                    <Link
                        href="/about"
                        className="inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white border border-emerald-400/50 hover:bg-white/10 rounded-full transition-colors gap-2 backdrop-blur-sm"
                    >
                        Learn More
                        <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
