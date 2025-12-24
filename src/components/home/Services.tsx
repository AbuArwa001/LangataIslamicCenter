import { BookOpen, Users, HandHeart, GraduationCap } from "lucide-react";

const services = [
    {
        title: "Daily Prayers",
        description: "Join us for the five daily prayers in a serene and spiritual environment. Jummah prayers every Friday.",
        icon: Users,
        color: "bg-blue-100 text-blue-600",
    },
    {
        title: "Islamic Education",
        description: "Madrasa classes for children and adults, focusing on Quranic studies, Tajweed, and Fiqh.",
        icon: BookOpen,
        color: "bg-emerald-100 text-emerald-600",
    },
    {
        title: "Community Outreach",
        description: "Charity drives, food distribution, and support for the less fortunate in our neighborhood.",
        icon: HandHeart,
        color: "bg-amber-100 text-amber-600",
    },
    {
        title: "Youth Development",
        description: "Mentorship programs, workshops, and sports activities to nurture the next generation of leaders.",
        icon: GraduationCap,
        color: "bg-purple-100 text-purple-600",
    },
];

export default function Services() {
    return (
        <section className="py-20 bg-slate-50">
            <div className="container mx-auto px-4 md:px-6">
                <div className="text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Core Activities</h2>
                    <p className="text-slate-600 text-lg">
                        We are dedicated to serving the spiritual, educational, and social needs of the Langata community.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {services.map((service, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 border border-slate-100"
                        >
                            <div className={`w-14 h-14 rounded-xl ${service.color} flex items-center justify-center mb-6`}>
                                <service.icon className="w-7 h-7" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                            <p className="text-slate-600 leading-relaxed">
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
