import ReadMoreButton from "@/components/about/ReadMoreButton";
import TeamMemberCard from "@/components/about/TeamMemberCard";
import { members, chairman } from "@/data/team";

export default function About() {

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image Placeholder - distinct from the rest */}
        <div className="absolute inset-0 bg-slate-900">
          <div className="absolute inset-0 bg-[url('/about-hero-bg.jpg')] bg-cover bg-center opacity-40"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-transparent"></div>
        </div>

        <div className="relative z-10 text-center">
          <h1 className="text-6xl md:text-7xl font-serif text-[#eebb75] tracking-wide drop-shadow-lg">
            About Us
          </h1>
        </div>
      </div>

      {/* Main Split Section */}
      <div className="container mx-auto px-4 py-20 max-w-7xl">
        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left Column: Text Content */}
          <div className="space-y-8">
            <h2 className="text-5xl font-serif text-[#1e293b] mb-8">
              About Us
            </h2>

            <div className="space-y-6 text-[#475569] leading-relaxed text-[15px] font-light">
              <div>
                <h3 className="text-sm font-bold text-[#334155] uppercase tracking-wider mb-2">
                  History of Langata Islamic Welfare Organisation (LIWO)
                </h3>
                <h4 className="text-sm font-bold text-[#334155] uppercase tracking-wider mb-4">
                  How it all started :
                </h4>
                <p>
                  Prior to 1984, there was no Madrasa in all the Estates in the
                  whole neighborhood of Langata comprising Southlands, Ngei 1
                  and Ngei 2, Akiba, Onyonka, Otiende, Jambo, Rubia, Customs,
                  Masai, Civil Servants, Uhuru Gardens, etc. Of course there was
                  no mosque either. At the time there were close to 20 churches
                  in the vicinity.
                </p>
                <p className="mt-4">
                  To attend a Madrasa, children had to go to Kibra or South C.
                  The parents had a difficult duty of transporting them to and
                  from such distant places. This led to some parents engaging
                  private Ustadhs/Ustadhas to teach their children at home. In
                  some cases some children did not attend Madrasas at all.
                </p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-[#334155] uppercase tracking-wider mb-2">
                  Establishing a Madrasa :
                </h4>
                <p>
                  It is this inconvenience which eventually brought a few
                  Muslims together sometime in 1984, with a view to start a
                  Madrasa within the neighborhood. As a quick solution, one of
                  the pioneer members, Marhum Said Omar Nadhir, volunteered to
                  surrender his official car garage at the Customs Estate to be
                  converted into a Madrasa. He also sourced the very first
                  Ustadh for the Madrasa, Ustadh Hassan Komesha. Once the
                  Madrasa was up and running in 1985, the initiators went door
                  to door to all houses in the neighborhood occupied by Muslims
                  on a campaign to advertise the same.
                </p>
                <p className="mt-4">
                  The number of students grew so fast that within no time the
                  one garage was not adequate to accommodate all of them.
                  Luckily, the occupier of the garage adjacent to the Madrasa,
                  and who was not even a Muslim, offered the use of his garage
                  to host the students. Thus the Madrasa expanded.
                </p>
                <p className="mt-4">
                  During this period, the Madrasa was very vibrant and lively,
                  and a number of prize-giving ceremonies were hosted within the
                  Costoms Estate grounds...
                </p>
              </div>
            </div>

            <ReadMoreButton />
          </div>

          {/* Right Column: Image */}
          <div className="relative h-full min-h-[600px] w-full bg-slate-100 rounded-lg overflow-hidden shadow-2xl">
            {/* Placeholder for the Building Render */}
            <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-200">
              <img
                src="/building-render-placeholder.jpg"
                alt="Future Islamic Center"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center py-12">
          <div className="relative h-[400px] w-full bg-slate-100 rounded-sm overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-200">
              {/* Placeholder for Mission Image (Aerial View) */}
              <img
                src="/mission-placeholder.jpg"
                alt="Mission Aerial View"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-5xl font-serif text-[#0f172a] mb-4">
              Our Mission
            </h2>
            <p className="text-[#334155] text-lg leading-relaxed max-w-md">
              To nurture a God-fearing community through spiritual growth,
              education, and social empowerment
            </p>
          </div>
        </div>

        {/* Vision Section */}
        <div className="grid lg:grid-cols-2 gap-16 items-center py-12">
          <div className="space-y-6 lg:order-1 order-2">
            <h2 className="text-5xl font-serif text-[#0f172a] mb-4">
              Vision Statement
            </h2>
            <p className="text-[#334155] text-lg leading-relaxed max-w-md">
              To establish a leading Islamic Center that inspires generations
              through worship, learning, and sustainable development.
            </p>
          </div>
          <div className="relative h-[500px] w-full bg-slate-100 rounded-sm overflow-hidden lg:order-2 order-1">
            <div className="absolute inset-0 flex items-center justify-center text-slate-400 bg-slate-200">
              {/* Placeholder for Vision Image (Building Side View) */}
              <img
                src="/vision-placeholder.jpg"
                alt="One of our vision renders"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        {/* Meet The Team Section */}
        <div className="pt-12">
          <div className="container mx-auto px-4 py-20 max-w-7xl">
                  <div className="pt-12">
                    <div className="text-center mb-16">
                      <h4 className="text-xs font-bold tracking-[0.2em] text-slate-500 uppercase mb-3">Meet the Team</h4>
                      <h2 className="text-4xl md:text-5xl font-serif font-medium text-slate-900">Powered by our people</h2>
                    </div>

                    <div className="space-y-16">
                      {/* Chairman Section */}
                      <TeamMemberCard member={chairman} />

                      {/* Grid Section */}
                      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {members.map((m, i) => (
                          <TeamMemberCard key={i} member={m} />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
        </div>
      </div>
    </div>
  );
}
