export default function AboutPage() {
    return (
        <div className="container mx-auto px-4 md:px-6 py-12 md:py-24">
            <div className="max-w-3xl mx-auto space-y-8">
                <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">About Us</h1>

                <div className="prose prose-lg text-muted-foreground">
                    <p className="text-xl font-medium text-foreground">
                        Langata Islamic Center is more than just a mosque; it is a vibrant community hub dedicated to fostering spiritual growth, educational excellence, and social welfare.
                    </p>

                    <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Our History</h2>
                    <p>
                        Founded with the vision of providing a sanctuary for the Muslims of Langata and its environs, the center has grown from a humble prayer space to a comprehensive institution offering a wide range of services to the community.
                    </p>

                    <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Our Mission</h2>
                    <p>
                        To serve humanity by propagating the true teachings of Islam, providing quality education, and engaging in humanitarian activities that uplift the less fortunate.
                    </p>

                    <h2 className="text-2xl font-bold text-foreground mt-8 mb-4">Our Vision</h2>
                    <p>
                        To be a leading Islamic center that inspires positive change and promotes peace, unity, and development in society.
                    </p>
                </div>
            </div>
        </div>
    );
}
