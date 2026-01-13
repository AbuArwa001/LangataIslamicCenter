"use client";

import { useState } from "react";
import { X, User } from "lucide-react"; // Added User icon for the placeholder

interface Member {
  name: string;
  role: string;
  bio?: string;
  isChairman?: boolean;
}

export default function TeamMemberCard({ member }: { member: Member }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Clickable Card */}
      <div
        onClick={() => setIsOpen(true)}
        className={`${
          member.isChairman ? "max-w-3xl mx-auto" : ""
        } bg-white rounded-sm overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer border hover:border-[#eebb75]`}
      >
        <div className={`${member.isChairman ? "h-80" : "h-64"} bg-slate-100 relative overflow-hidden flex items-center justify-center`}>
          {/* Placeholder Icon for Card */}
          <User className="w-24 h-24 text-slate-300 group-hover:text-[#eebb75]/30 transition-colors duration-300" />
          
          <div className="absolute inset-0 opacity-20">
            <svg viewBox="0 0 1440 320" className="absolute bottom-0 w-full h-auto text-slate-400 fill-current transform scale-150 origin-bottom">
              <path d="M0,128L48,144C96,160,192,192,288,197.3C384,203,480,181,576,181.3C672,181,768,203,864,224C960,245,1056,267,1152,261.3C1248,256,1344,224,1392,208L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path>
            </svg>
          </div>
        </div>
        <div className={`p-8 text-center ${!member.isChairman ? "bg-[#f9fafb]" : ""}`}>
          <h3 className={`${member.isChairman ? "text-3xl" : "text-xl"} font-serif text-slate-900 mb-4`}>
            {member.name}
          </h3>
          <div className="inline-block border border-slate-400 px-4 py-2 text-[10px] font-bold text-slate-600 uppercase tracking-widest bg-white">
            {member.role}
          </div>
        </div>
      </div>

      {/* Modal */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div 
            className="bg-white w-full max-w-lg rounded-sm overflow-hidden shadow-2xl relative animate-in fade-in zoom-in duration-200"
            onClick={(e) => e.stopPropagation()}
          >
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 rounded-full text-slate-400 hover:text-slate-900 transition-colors"
            >
              <X size={20} />
            </button>

            {/* Modal Header Image / Placeholder */}
            <div className="bg-slate-50 h-56 w-full flex items-center justify-center border-b border-slate-100">
               <div className="relative">
                  <div className="absolute inset-0 bg-[#eebb75]/10 rounded-full blur-2xl"></div>
                  <User className="w-32 h-32 text-slate-200 relative z-0" />
               </div>
            </div>

            <div className="p-10">
              <span className="text-[#eebb75] text-xs font-bold uppercase tracking-widest block mb-2">
                {member.role}
              </span>
              <h3 className="text-3xl font-serif text-slate-900 mb-4">{member.name}</h3>
              <div className="h-0.5 w-12 bg-[#eebb75] mb-6"></div>
              <p className="text-slate-600 font-light leading-relaxed">
                {member.bio || `As the ${member.role}, ${member.name.split(' ')[0]} is dedicated to supporting the Langata Islamic Welfare Organisation's mission of community empowerment and spiritual growth.`}
              </p>
              
              <button 
                onClick={() => setIsOpen(false)}
                className="mt-8 w-full border border-slate-900 text-slate-900 py-3 text-xs font-bold uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all duration-300"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}