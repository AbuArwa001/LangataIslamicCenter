import { HandCoins, BookOpen, Handshake, User } from "lucide-react";
import Image from "next/image";

export default function ProjectsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* Hero Section */}
            <section className="relative h-[60vh] min-h-[400px] flex items-center justify-center">
                <div className="absolute inset-0 z-0">
                    <Image
                        src="/hero-mosque.jpg"
                        alt="Mosque Background"
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-black/60" />
                </div>
                <div className="relative z-10 container mx-auto px-4 text-center space-y-6">
                    <h1 className="text-4xl md:text-6xl font-bold text-white">
                        <span className="text-secondary">Our Projects</span> <span className="text-primary">& Facilities</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto">
                        Explore our ongoing and completed projects that serve the community.
                    </p>
                </div>
            </section>

            {/* Ongoing & Completed Projects Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-bold">
                            <span className="text-secondary">Ongoing &</span> <span className="text-primary">Completed Projects</span>
                        </h2>
                    </div>

                    <div className="space-y-12">
                        {/* Featured Project: Revert Center Establishment */}
                        <div className="relative w-full aspect-[21/9] min-h-[400px] rounded-2xl overflow-hidden group shadow-xl">
                            <Image
                                src="/about_1.jpg" // Placeholder
                                alt="Revert Center Establishment"
                                fill
                                className="object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8 md:p-12">
                                <h3 className="text-3xl md:text-5xl font-bold text-secondary mb-4 drop-shadow-md font-serif">
                                    Revert Center Establishment
                                </h3>
                                <div className="flex items-center space-x-4 text-sm text-gray-300 uppercase tracking-wider mb-4 font-medium">
                                    <div className="flex items-center">
                                        <User className="w-4 h-4 mr-2" />
                                        ADMIN
                                    </div>
                                    <span>•</span>
                                    <span>APRIL 18, 2025</span>
                                </div>
                                <p className="text-lg text-gray-200 max-w-4xl drop-shadow-sm">
                                    About Project Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                </p>
                            </div>
                        </div>

                        {/* Other Projects Grid */}
                        <div className="grid md:grid-cols-2 gap-8">
                            {/* Project 2: College Construction */}
                            <div className="group space-y-6">
                                <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-lg">
                                    <Image
                                        src="/building-render-placeholder.jpg" // Placeholder
                                        alt="College Construction"
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-2xl md:text-3xl font-bold text-[#3d2616] font-serif">COLLEGE CONSTRUCTION</h3>
                                    <div className="flex items-center space-x-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">
                                        <div className="flex items-center">
                                            <User className="w-3 h-3 mr-2" />
                                            ADMIN
                                        </div>
                                        <span>•</span>
                                        <span>APRIL 18, 2025</span>
                                    </div>
                                    {/* Description removed to match the screenshot style more closely if needed, or kept brief */}
                                </div>
                            </div>

                            {/* Project 3: Revert Center Establishment (Repeated for Grid Demo per screenshot) */}
                            <div className="group space-y-6">
                                <div className="relative aspect-video w-full overflow-hidden rounded-2xl shadow-lg">
                                    <Image
                                        src="/about_2.jpg" // Placeholder
                                        alt="Revert Center Establishment"
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-2xl md:text-3xl font-bold text-[#3d2616] font-serif">Revert Center Establishment</h3>
                                    <div className="flex items-center space-x-4 text-xs text-muted-foreground uppercase tracking-wider font-medium">
                                        <div className="flex items-center">
                                            <User className="w-3 h-3 mr-2" />
                                            ADMIN
                                        </div>
                                        <span>•</span>
                                        <span>APRIL 18, 2025</span>
                                    </div>
                                    <p className="text-muted-foreground line-clamp-2">
                                        About Project Lorem ipsum dolor sit amet, consectetur adipiscing elit...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Community Engagement Section */}
            <section className="py-16 md:py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16 space-y-4">
                        <h4 className="text-xl font-bold text-[#3d2616] font-serif">Get Involved</h4>
                        <h2 className="text-4xl md:text-5xl font-bold">
                            <span className="text-secondary">Community</span> <span className="text-primary">Engagement</span>
                        </h2>
                        <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
                            At Langata Islamic Center, we believe in the power of community. Join us in our efforts to uplift our neighborhood with initiatives focused on giving and support.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Charity Drives */}
                        <div className="bg-gradient-to-b from-[#ffdea6] to-[#ffc56e] p-8 rounded-[2rem] text-center space-y-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-orange-200/50">
                            <div className="flex justify-center">
                                <HandCoins className="w-12 h-12 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#3d2616] font-serif">Charity Drives</h3>
                            <p className="text-[#5c4033] leading-relaxed">
                                Get involved in our charity drives that address local needs and assist those who are facing difficulties in our community.
                            </p>
                        </div>

                        {/* Educational Workshops */}
                        <div className="bg-gradient-to-b from-[#ffdea6] to-[#ffc56e] p-8 rounded-[2rem] text-center space-y-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform md:-translate-y-6 border border-orange-200/50">
                            <div className="flex justify-center">
                                <BookOpen className="w-12 h-12 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#3d2616] font-serif">Educational Workshops</h3>
                            <p className="text-[#5c4033] leading-relaxed">
                                Participate in our workshops that aim to enlighten minds and encourage personal development and community understanding.
                            </p>
                        </div>

                        {/* Volunteer Opportunities */}
                        <div className="bg-gradient-to-b from-[#ffdea6] to-[#ffc56e] p-8 rounded-[2rem] text-center space-y-6 shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 border border-orange-200/50">
                            <div className="flex justify-center">
                                <Handshake className="w-12 h-12 text-primary" />
                            </div>
                            <h3 className="text-2xl font-bold text-[#3d2616] font-serif">Volunteer Opportunities</h3>
                            <p className="text-[#5c4033] leading-relaxed">
                                Join our volunteer events and help us bring positive change through various community projects.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
