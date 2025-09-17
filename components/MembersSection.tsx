"use client";

import TextAnimation from "@/components/text-animation";
import Image from "next/image";

const teamData = {
  leadership: {
    title: "Leadership",
    leads: [
      { name: "Simanta", role: "GfG Lead", image: "/simanta.jpg" },
      { name: "Nitin", role: "Technical Lead", image: "/nitin.jpg" },
    ],
    coLeads: [],
    associates: []
  },
  pr: {
    title: "Public Relations",
    leads: [
      { name: "Priyam", role: "PR Lead", image: "/priyam.jpg" },
    ],
    coLeads: [
      { name: "Vrishank", role: "Co Lead", image: "/vrishank.jpg" },
      { name: "Dawar", role: "Co Lead", image: "/dawar.jpg" },
    ],
    associates: [
      { name: "Mandeep", role: "Associate", image: "/mandeep.jpg" },
      { name: "Sagarika", role: "Associate", image: "/sagarika.jpg" },
    ]
  },
  sponsorship: {
    title: "Sponsorship Outreach & Acquisition",
    leads: [
      { name: "Nancy", role: "Lead", image: "/nancy.jpg" },
    ],
    coLeads: [],
    associates: []
  },
  events: {
    title: "Events",
    leads: [
      { name: "Dhritee", role: "Event Lead", image: "/dhritee.jpg" },
    ],
    coLeads: [
      { name: "Debakalpa", role: "Co Lead", image: "/debakalpa.jpg" },
      { name: "Jyotisman", role: "Co Lead", image: "/jyotishman.jpg" },
    ],
    associates: [
      { name: "Sarangapani", role: "Associate", image: "/sarangapani.jpg" },
    ]
  },
  graphics: {
    title: "Graphics & Design",
    leads: [
      { name: "Nahid", role: "Lead", image: "/nahid.jpg" },
    ],
    coLeads: [
      { name: "Shruti", role: "Co Lead", image: "/shruti.jpg" },
      { name: "Garima", role: "Co Lead", image: "/garima.jpg" },
    ],
    associates: [
      { name: "Parisa", role: "Associate", image: "/parisa.jpg" },
      { name: "Nileem", role: "Associate", image: "/neelim.jpg" },
    ]
  },
  socialMedia: {
    title: "Social Media",
    leads: [
      { name: "Prajnan", role: "Lead", image: "/prajnan.jpg" },
    ],
    coLeads: [
      { name: "Dibyajyoti", role: "Co Lead", image: "/dibyajyoti.jpg" },
    ],
    associates: []
  },
  dsa: {
    title: "DSA",
    leads: [
      { name: "Diya", role: "Lead", image: "/diya1.jpg" },
    ],
    coLeads: [],
    associates: []
  },
  devops: {
    title: "DevOps",
    leads: [
      { name: "Pragyan", role: "Lead", image: "/pragyan.jpg" },
      { name: "Ankita", role: "Lead", image: "/ankita.jpg" },
    ],
    coLeads: [
      { name: "Jyotirmoy", role: "Co Lead", image: "/jyotirmoy.jpg" },
    ],
    associates: []
  },
  development: {
    title: "Development",
    leads: [
      { name: "Gourab", role: "Lead", image: "/gourab.jpg" },
    ],
    coLeads: [
      { name: "Muskaan", role: "Co Lead", image: "/muskan.jpg" },
      { name: "Sahid", role: "Co Lead", image: "/sahid.jpg" },
    ],
    associates: []
  },
  iot: {
    title: "IoT",
    leads: [
      { name: "Mriganga", role: "Lead", image: "/mriganga .jpg" }, // Keeping the space
      { name: "Denim", role: "Lead", image: "/denim.jpg" },
    ],
    coLeads: [
      { name: "Diya", role: "Co Lead", image: "/diya2.jpg" },
      { name: "Bitopan", role: "Co Lead", image: "/bitopan.jpg" },
    ],
    associates: []
  },
  aiml: {
    title: "AI/ML",
    leads: [
      { name: "Bhargab", role: "Lead", image: "/bhargav.jpg" },
      { name: "Sampurna", role: "Lead", image: "/sampurna.jpg" },
    ],
    coLeads: [
      { name: "Tanmoy", role: "Co Lead", image: "/tanmoy .jpg" }, // Keeping the space
    ],
    associates: []
  },
  gameDev: {
    title: "Game Development",
    leads: [
      { name: "Uddipta", role: "Lead", image: "/uddipta.jpg" },
    ],
    coLeads: [
      { name: "Bhairab", role: "Co Lead", image: "/bhairab.jpg" },
    ],
    associates: []
  },
  creative: {
    title: "Creative & Content",
    leads: [
      { name: "Jupitora", role: "Lead", image: "/jupitora.jpg" },
      { name: "Nishita", role: "Lead", image: "/nishita.jpg" },
      { name: "Taniya", role: "Lead", image: "/taniya.jpg" },
      { name: "Pritom", role: "Lead", image: "/pritom.jpg" },
      { name: "Prachi", role: "Lead", image: "/prachi.jpg" },
      { name: "Tanbir", role: "Lead", image: "/tanbir.jpg" },
    ],
    coLeads: [],
    associates: []
  },
};

function MemberCard({ member, isLead = false }: { member: { name: string; role: string; image: string }, isLead?: boolean }) {
  return (
    <div className={`bg-white/10 dark:bg-gray-800/10 backdrop-blur-md border border-white/20 dark:border-gray-600/20 rounded-xl p-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl ${isLead ? 'ring-2 ring-green-400/50' : ''}`}>
      <div className="relative w-28 h-28 mx-auto mb-4 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700">
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
        <div className="w-full h-full bg-green-500 flex items-center justify-center text-white text-lg font-bold" style={{display: member.image ? 'none' : 'flex'}}>
          {member.name.split(' ').map(n => n[0]).join('').slice(0,2).toUpperCase()}
        </div>
      </div>
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white text-center mb-2">
        {member.name}
      </h3>
      <p className={`text-sm text-center font-medium ${isLead ? 'text-green-500 dark:text-green-400' : 'text-green-600 dark:text-green-400'}`}>
        {member.role}
      </p>
    </div>
  );
}

function DepartmentSection({ department }: { department: any }) {
  return (
    <div className="space-y-12">
      <h2 className="text-3xl font-bold text-gray-900 dark:text-white text-center">
        {department.title}
      </h2>
      
      {/* Leads Section */}
      {department.leads.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-green-600 dark:text-green-400 text-center">
            Lead{department.leads.length > 1 ? 's' : ''}
          </h3>
          <div className="flex flex-wrap justify-center gap-8">
            {department.leads.map((member: any, index: number) => (
              <div key={index} className="w-72">
                <MemberCard member={member} isLead={true} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Co-Leads Section */}
      {department.coLeads.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-blue-600 dark:text-blue-400 text-center">
            Co-Lead{department.coLeads.length > 1 ? 's' : ''}
          </h3>
          <div className="flex flex-wrap justify-center gap-8">
            {department.coLeads.map((member: any, index: number) => (
              <div key={index} className="w-72">
                <MemberCard member={member} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Associates Section */}
      {department.associates.length > 0 && (
        <div className="space-y-6">
          <h3 className="text-xl font-medium text-purple-600 dark:text-purple-400 text-center">
            Associate{department.associates.length > 1 ? 's' : ''}
          </h3>
          <div className="flex flex-wrap justify-center gap-8">
            {department.associates.map((member: any, index: number) => (
              <div key={index} className="w-72">
                <MemberCard member={member} />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default function MembersSection() {
  return (
    <div className="relative min-h-screen">
      {/* Enhanced 3D Wavy Background with More Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        
        {/* Multiple diagonal line layers with different angles */}
        {Array.from({ length: 15 }, (_, i) => (
          <div
            key={`diag-${i}`}
            className="absolute opacity-[0.03] bg-gradient-to-b from-gray-400 to-transparent dark:from-gray-500 dark:to-transparent"
            style={{
              width: '2px',
              height: '200vh',
              left: `${i * 7}%`,
              top: '-50%',
              transform: `rotate(${15 + Math.sin(i * 0.5) * 10}deg) skewY(${Math.cos(i * 0.3) * 5}deg)`,
              transformOrigin: 'top left',
              filter: 'blur(1px)',
            }}
          />
        ))}

        {/* Small floating particles */}
        {Array.from({ length: 30 }, (_, i) => (
          <div
            key={`particle-${i}`}
            className="absolute opacity-[0.015] bg-gray-400 dark:bg-gray-500 rounded-full"
            style={{
              width: `${2 + (i % 3)}px`,
              height: `${2 + (i % 3)}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${10 + (i % 5)}s ease-in-out infinite`,
              animationDelay: `${i * 0.2}s`,
              filter: 'blur(0.5px)',
            }}
          />
        ))}

        {/* Tiny geometric shapes scattered */}
        {Array.from({ length: 25 }, (_, i) => (
          <div
            key={`tiny-shape-${i}`}
            className="absolute opacity-[0.01] bg-green-400 dark:bg-green-500"
            style={{
              width: `${3 + (i % 2)}px`,
              height: `${3 + (i % 2)}px`,
              left: `${5 + (i * 3.8) % 95}%`,
              top: `${10 + (i * 4.2) % 90}%`,
              borderRadius: i % 3 === 0 ? '50%' : i % 3 === 1 ? '20%' : '0%',
              transform: `rotate(${i * 15}deg) scale(${0.5 + (i % 3) * 0.3})`,
              filter: 'blur(1px)',
            }}
          />
        ))}

        {/* Small wavy lines */}
        {Array.from({ length: 12 }, (_, i) => (
          <div
            key={`small-wave-${i}`}
            className="absolute opacity-[0.02]"
            style={{
              width: `${50 + (i % 4) * 20}px`,
              height: '1px',
              left: `${i * 8}%`,
              top: `${15 + (i % 5) * 18}%`,
              background: `linear-gradient(90deg, transparent, rgba(156, 163, 175, 0.3), transparent)`,
              transform: `rotate(${Math.sin(i * 0.4) * 15}deg) scaleY(${1 + Math.sin(i * 0.6) * 0.5})`,
              borderRadius: '50px',
            }}
          />
        ))}

        {/* Subtle grid dots */}
        {Array.from({ length: 40 }, (_, i) => (
          <div
            key={`grid-dot-${i}`}
            className="absolute opacity-[0.008] bg-gray-300 dark:bg-gray-600 rounded-full"
            style={{
              width: '1px',
              height: '1px',
              left: `${(i % 8) * 12.5}%`,
              top: `${Math.floor(i / 8) * 20}%`,
              filter: 'blur(0.5px)',
            }}
          />
        ))}

        {/* Curved wavy lines using CSS gradients */}
        {Array.from({ length: 20 }, (_, i) => (
          <div
            key={`curve-${i}`}
            className="absolute opacity-[0.04]"
            style={{
              width: '100%',
              height: '4px',
              top: `${i * 5}%`,
              background: `radial-gradient(ellipse 100px 20px at ${20 + (i % 3) * 30}% 50%, rgba(156, 163, 175, 0.6), transparent), 
                         radial-gradient(ellipse 80px 15px at ${60 + (i % 4) * 20}% 50%, rgba(156, 163, 175, 0.4), transparent)`,
              transform: `rotate(${Math.sin(i * 0.2) * 3}deg) translateX(${Math.cos(i * 0.3) * 10}px)`,
              borderRadius: '50%',
            }}
          />
        ))}

        {/* Enhanced SVG wavy patterns with 3D effect */}
        <svg className="absolute inset-0 w-full h-full opacity-[0.06]" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="waveGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="currentColor" stopOpacity="0.8"/>
              <stop offset="50%" stopColor="currentColor" stopOpacity="0.3"/>
              <stop offset="100%" stopColor="currentColor" stopOpacity="0.1"/>
            </linearGradient>
            <filter id="blur1">
              <feGaussianBlur in="SourceGraphic" stdDeviation="0.5"/>
            </filter>
          </defs>
          
          {/* Main wavy paths */}
          <path
            d="M0,10 Q20,5 40,15 T80,20 Q90,25 100,15 L100,20 Q80,30 60,25 T20,20 Q10,15 0,20 Z"
            fill="url(#waveGrad1)"
            className="text-gray-400 dark:text-gray-600"
            filter="url(#blur1)"
          />
          <path
            d="M0,25 Q30,20 50,30 T100,35 L100,40 Q70,50 50,40 T0,40 Z"
            fill="url(#waveGrad1)"
            className="text-gray-300 dark:text-gray-700"
          />
          <path
            d="M0,45 Q25,35 50,50 T100,55 L100,60 Q75,70 50,60 T0,65 Z"
            fill="url(#waveGrad1)"
            className="text-gray-400 dark:text-gray-600"
          />
          <path
            d="M0,70 Q35,60 70,75 T100,80 L100,85 Q65,95 35,85 T0,85 Z"
            fill="url(#waveGrad1)"
            className="text-gray-300 dark:text-gray-700"
          />
        </svg>

        {/* Floating geometric shapes (existing larger ones) */}
        {Array.from({ length: 8 }, (_, i) => (
          <div
            key={`float-${i}`}
            className="absolute opacity-[0.02] bg-green-500 dark:bg-green-400"
            style={{
              width: `${20 + (i % 3) * 10}px`,
              height: `${20 + (i % 3) * 10}px`,
              left: `${10 + i * 12}%`,
              top: `${20 + (i % 4) * 20}%`,
              borderRadius: i % 2 === 0 ? '50%' : '20%',
              transform: `rotate(${i * 45}deg)`,
              filter: 'blur(2px)',
            }}
          />
        ))}
      </div>

      {/* CSS Animation for floating particles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) translateX(0px); }
          25% { transform: translateY(-10px) translateX(5px); }
          50% { transform: translateY(-5px) translateX(-3px); }
          75% { transform: translateY(-15px) translateX(8px); }
        }
      `}</style>

      {/* Main Content with Better Spacing */}
      <section className="relative z-10 pt-24 pb-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-24">
          
          {/* Main Title with Extra Top Spacing */}
          <div className="pt-16 pb-8">
            <TextAnimation>
              <h1 className="text-5xl sm:text-6xl font-bold text-gray-900 dark:text-white text-center leading-tight">
                KNOW YOUR TEAM
              </h1>
            </TextAnimation>
          </div>

          {/* Render each department */}
          {Object.entries(teamData).map(([key, department]) => (
            <DepartmentSection key={key} department={department} />
          ))}
        </div>
      </section>
    </div>
  );
}
