"use client";

import Logo from "@/components/Logo";
import TextAnimation from "@/components/text-animation";

export default function AboutHero() {
  return (
    <section className="relative min-h-[60vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 pt-32 overflow-hidden">
      
      {/* Reduced Wavy Lines Pattern */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {Array.from({ length: 5 }, (_, i) => (
          <div
            key={i}
            className="absolute opacity-8 border-l-2 border-gray-300 dark:border-gray-600"
            style={{
              height: '120%',
              left: `${15 + i * 18}%`,
              top: '-10%',
              clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
              background: `linear-gradient(180deg, 
                transparent 0%, 
                transparent ${15 + Math.sin(i * 0.7) * 12}%, 
                currentColor ${25 + Math.sin(i * 0.7) * 12}%, 
                transparent ${35 + Math.sin(i * 0.7) * 12}%,
                transparent ${55 + Math.sin(i * 0.9) * 20}%,
                currentColor ${65 + Math.sin(i * 0.9) * 20}%,
                transparent ${75 + Math.sin(i * 0.9) * 20}%,
                transparent 100%
              )`,
              width: '2px',
              transform: `skewX(${-12 + Math.sin(i * 0.4) * 6}deg)`,
            }}
          />
        ))}
        
        {/* Reduced horizontal wavy elements with more spacing */}
        <svg className="absolute inset-0 w-full h-full opacity-4" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Only 2 wavy paths with 50% separation instead of 4 with 20% */}
          <path
            d="M0,30 Q35,20 70,30 T100,30 L100,35 Q65,45 30,35 T0,35 Z"
            fill="currentColor"
            className="text-gray-300 dark:text-gray-600"
          />
          <path
            d="M0,70 Q40,60 80,70 T100,70 L100,75 Q60,85 20,75 T0,75 Z"
            fill="currentColor"
            className="text-gray-300 dark:text-gray-600"
          />
        </svg>
      </div>

      {/* About Us Heading - Outside the card with better spacing */}
      <div className="max-w-5xl mx-auto w-full relative z-10 mb-8">
        <TextAnimation>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white text-center">
            ABOUT US
          </h1>
        </TextAnimation>
      </div>

      {/* Card container */}
      <div className="max-w-5xl mx-auto w-full relative z-10">
        {/* Enhanced glassmorphism card */}
        <div className="bg-white/10 dark:bg-gray-800/10 backdrop-blur-md border border-white/20 dark:border-gray-600/20 rounded-xl shadow-2xl shadow-black/10 dark:shadow-black/30 p-6">
          {/* Force exact 30/70 split using flexbox */}
          <div className="flex gap-4">
            
            {/* Logo Section - Exactly 30% */}
            <div className="w-[30%] flex-shrink-0 flex flex-col items-center justify-center">
              <Logo className="w-32 h-32 mb-2" />
              <h2 className="text-base font-bold text-gray-900 dark:text-white mb-1 text-center">
                GeeksforGeeks
              </h2>
              <p className="text-green-600 dark:text-green-400 text-sm font-medium text-center">
                Campus Body
              </p>
            </div>
            
            {/* Text Section - Exactly 70% */}
            <div className="w-[70%] flex-shrink-0">
              <div className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed space-y-2">
                <p>
                  GFG Campus Body is a community by GeeksforGeeks for Gauhati University. The GeeksforGeeks Campus Body at Gauhati University would serve as a student-driven tech community aimed at enhancing coding culture on campus.
                </p>
                
                <p>
                  Its key activities would include organizing workshops, hackathons, and coding contests, supporting students with interview preparation and mock tests, acting as a bridge to GFG resources like courses and mentorship, hosting guest lectures and webinars with industry experts, and encouraging peer learning and collaborative projects.
                </p>
                
                <p>
                  Overall, it would help students improve their technical skills, industry readiness, and teamwork.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
