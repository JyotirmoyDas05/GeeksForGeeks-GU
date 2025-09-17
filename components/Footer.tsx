import Link from 'next/link';
import { Linkedin, Instagram, Facebook } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="mt-auto py-8 w-full" style={{ backgroundColor: '#1a1a1a' }}>
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col space-y-8 md:grid md:grid-cols-4 md:gap-8 md:space-y-0">
          
          {/* Column 1 - Logo */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center gap-3 mb-4">
              <Logo className="w-10 h-10" />
              <div className="text-center">
                <h3 className="text-white font-semibold text-lg">GFG Campus Body</h3>
                <p className="text-gray-300 text-sm">Gauhati University</p>
              </div>
            </div>
          </div>
          
          {/* Column 2 - Navigation */}
          <div className="flex flex-col items-center text-center">
            <h4 className="text-white font-semibold text-lg mb-4">Quick Links</h4>
            <nav className="flex flex-col items-center space-y-2">
              <Link href="/events" className="text-gray-300 hover:text-[#00bc60] transition-colors text-sm">
                Events
              </Link>
              <Link href="/members" className="text-gray-300 hover:text-[#00bc60] transition-colors text-sm">
                Members
              </Link>
            </nav>
          </div>
          
          {/* Column 3 - Contact */}
          <div className="flex flex-col items-center text-center">
            <h4 className="text-white font-semibold text-lg mb-4">Contact Us</h4>
            <a 
              href="mailto:gfggucampusbody@gmail.com"
              className="text-gray-300 hover:text-[#00bc60] transition-colors text-sm text-center px-2"
              style={{ wordBreak: 'break-word' }}
            >
              gfggucampusbody@gmail.com
            </a>
          </div>
          
          {/* Column 4 - Social Media */}
          <div className="flex flex-col items-center text-center">
            <h4 className="text-white font-semibold text-lg mb-4">Follow Us</h4>
            <div className="flex gap-4 justify-center">
              <a 
                href="#" 
                className="text-gray-300 hover:text-[#00bc60] transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={24} />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-[#00bc60] transition-colors"
                aria-label="Instagram"
              >
                <Instagram size={24} />
              </a>
              <a 
                href="#" 
                className="text-gray-300 hover:text-[#00bc60] transition-colors"
                aria-label="Facebook"
              >
                <Facebook size={24} />
              </a>
            </div>
          </div>
        </div>
        
        {/* Bottom Copyright */}
        <div className="border-t border-gray-600 mt-8 pt-6 text-center">
          <p className="text-gray-400 text-sm">GFG Community - 2025</p>
        </div>
      </div>
    </footer>
  );
}
