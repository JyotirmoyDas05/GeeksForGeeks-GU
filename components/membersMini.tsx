"use client";

import TextAnimation from "@/components/text-animation";
import Image from "next/image";
import Link from "next/link";

const keyLeadership = [
  // Main Leadership (First Row - 2 items)
  { name: "Simanta", role: "GfG Lead", image: "/simanta.jpg" },
  { name: "Nitin", role: "Technical Lead", image: "/nitin.jpg" },
  
  // Department Leads (Second Row - 3 items)  
  { name: "Priyam", role: "PR Lead", image: "/priyam.jpg" },
  { name: "Dhritee", role: "Event Lead", image: "/dhritee.jpg" },
  { name: "Gourab", role: "Development Lead", image: "/gourab.jpg" },
  
  // More Department Leads (Third Row - 3 items)
  { name: "Bhargab", role: "AI/ML Lead", image: "/bhargav.jpg" },
  { name: "Pragyan", role: "DevOps Lead", image: "/pragyan.jpg" },
  { name: "Diya", role: "DSA Lead", image: "/diya1.jpg" },
];

function LeaderCard({ member, isMainLead = false }: { member: { name: string; role: string; image: string }, isMainLead?: boolean }) {
  return (
    <div className={`bg-white/10 dark:bg-gray-800/10 backdrop-blur-md border border-white/20 dark:border-gray-600/20 rounded-xl hover:scale-105 transition-transform duration-300 shadow-xl hover:shadow-2xl w-full max-w-sm mx-auto ${
      isMainLead 
        ? 'p-8 ring-2 ring-green-500/70 min-h-[320px]' 
        : 'p-6 min-h-[280px]'
    }`}>
      <div className={`relative mx-auto mb-4 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700 ${
        isMainLead ? 'w-32 h-32' : 'w-28 h-28'
      }`}>
        {member.image ? (
          <Image
            src={member.image}
            alt={member.name}
            fill
            className="object-cover"
            onError={(e: any) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className={`w-full h-full bg-green-600 flex items-center justify-center text-white font-bold ${
          isMainLead ? 'text-xl' : 'text-lg'
        }`} style={{display: member.image ? 'none' : 'flex'}}>
          {member.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}
        </div>
      </div>
      <h3 className={`font-bold text-gray-900 dark:text-white text-center mb-2 ${
        isMainLead ? 'text-xl' : 'text-lg'
      }`}>
        {member.name}
      </h3>
      <p className={`text-center font-semibold text-green-600 dark:text-green-400 ${
        isMainLead ? 'text-base' : 'text-sm'
      }`}>
        {member.role}
      </p>
    </div>
  );
}

export default function HomeTeamSection() {
  return (
    <section className="relative py-20 px-6 sm:px-8 lg:px-16">
      
      {/* Reduced and Better Spaced Background Pattern */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <svg className="absolute inset-0 w-full h-full opacity-4" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Only 2 wavy lines with much more separation */}
          <path
            d="M0,25 Q30,15 60,25 T100,25 L100,30 Q70,40 40,30 T0,30 Z"
            fill="currentColor"
            className="text-gray-300 dark:text-gray-600"
          />
          <path
            d="M0,75 Q40,65 80,75 T100,75 L100,80 Q60,90 20,80 T0,80 Z"
            fill="currentColor"
            className="text-gray-300 dark:text-gray-600"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        <TextAnimation>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white text-center mb-20 pt-16">
            Meet Our Leadership
          </h2>
        </TextAnimation>

        {/* Leadership Grid Layout */}
        <div className="space-y-16">
          
          {/* First Row - Main Leadership (2 items, larger cards) */}
          <div className="flex justify-center">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 w-full max-w-4xl">
              {keyLeadership.slice(0, 2).map((member, index) => (
                <LeaderCard key={index} member={member} isMainLead={true} />
              ))}
            </div>
          </div>

          {/* Second Row - Department Leads (3 items) - Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
            {keyLeadership.slice(2, 5).map((member, index) => (
              <LeaderCard key={index} member={member} />
            ))}
          </div>

          {/* Third Row - More Department Leads (3 items) - Responsive Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-6xl mx-auto">
            {keyLeadership.slice(5, 8).map((member, index) => (
              <LeaderCard key={index} member={member} />
            ))}
          </div>
        </div>

        {/* Know More Button */}
        <div className="text-center mt-16">
          <Link
            href="/members"
            className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-4 px-10 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl text-lg"
          >
            Know More About Our Team
          </Link>
        </div>
      </div>
    </section>
  );
}
