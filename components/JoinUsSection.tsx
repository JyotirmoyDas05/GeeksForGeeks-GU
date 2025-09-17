import TextAnimation from "@/components/text-animation";

export default function JoinUsSection() {
  return (
    <div className="container mx-auto px-6 py-16">
      <div className="max-w-4xl mx-auto text-center">
        <TextAnimation>
          <h2 className="text-4xl font-bold mb-8">Join Our Community</h2>
        </TextAnimation>
        <p className="text-lg text-gray-300 mb-12 leading-relaxed">
          Ready to enhance your coding skills and be part of an amazing tech community? 
          Join us and connect with like-minded students passionate about technology and innovation.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button className="px-8 py-3 bg-[#00bc60] text-white font-semibold rounded-lg hover:bg-[#00a555] transition-colors">
            Become a Member
          </button>
          <button className="px-8 py-3 border border-[#00bc60] text-[#00bc60] font-semibold rounded-lg hover:bg-[#00bc60] hover:text-white transition-colors">
            View Events
          </button>
        </div>
      </div>
    </div>
  );
}
