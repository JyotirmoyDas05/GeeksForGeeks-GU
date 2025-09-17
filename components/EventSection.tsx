"use client";

import TextAnimation from "@/components/text-animation";
import Image from 'next/image';

export default function EventsSection() {
  const events = [
    {
      id: 1,
      title: 'GFG Nation SkillUP',
      description: 'Event details',
    },
  ];
  console.log("events:", events);

  return (
    <section className="w-full py-6 px-4"> {/* Changed from py-12 to py-6 */}
      <div className="max-w-4xl mx-auto">
        <TextAnimation>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white text-center mb-6"> {/* Changed from mb-8 to mb-6 */}
            Upcoming Events
          </h2>
        </TextAnimation>
        
        <div className="w-full max-w-3xl mx-auto mb-4"> {/* Changed from mb-6 to mb-4 */}
          <div className="flex flex-col sm:flex-row bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm border-2 border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden hover:border-green-500 dark:hover:border-green-400 transition-all duration-300 shadow-lg dark:shadow-xl">
            
            {/* Image from public folder */}
            <div className="w-full sm:w-48 h-32 bg-gray-50/90 dark:bg-gray-700/90 flex items-center justify-center border-r-2 border-gray-200 dark:border-gray-600 relative overflow-hidden">
              <Image
                src="/image.png"
                alt="GFG Nation SkillUP Event"
                fill
                style={{ objectFit: 'cover' }}
                className="rounded-l-lg"
              />
            </div>
            
            {/* Content */}
            <div className="flex-1 p-6">
              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                GFG Nation SkillUP
              </h3>
              <a
                href="https://forms.gle/swvZ21Hc7SBUtBvK7"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded transition-colors duration-200"
              >
                Register Now
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
