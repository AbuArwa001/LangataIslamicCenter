import { Building, Book, HeartHandshake } from "lucide-react";

export default function ProjectsPage() {
    const projects = [
        {
            title: "New Masjid Extension",
            description: "Expanding our prayer hall to accommodate the growing number of worshippers, especially during Friday prayers and Ramadan.",
            status: "Ongoing",
            icon: Building,
        },
        {
            title: "Educational Complex",
            description: "Building a modern madrasa and library to facilitate Islamic and secular education for our youth.",
            status: "Planning Phase",
            icon: Book,
        },
        {
            title: "Community Clinic",
            description: "Establishing a low-cost medical facility to provide basic healthcare services to the needy in Langata.",
            status: "Fundraising",
            icon: HeartHandshake,
        },
    ];

    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
            <div className="max-w-4xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">Our Projects</h1>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        Witness our commitment to growth and community service through our ongoing and future initiatives.
                    </p>
                </div>

                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project, index) => (
                        <div key={index} className="flex flex-col bg-card border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                            <div className="p-6 flex-1 space-y-4">
                                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary mb-4">
                                    <project.icon className="w-6 h-6" />
                                </div>
                                <h3 className="text-2xl font-bold text-card-foreground">{project.title}</h3>
                                <p className="text-muted-foreground">{project.description}</p>
                            </div>
                            <div className="px-6 py-4 bg-muted/50 border-t border-border flex items-center justify-between">
                                <span className="text-sm font-medium text-muted-foreground">Status</span>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                                    {project.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
