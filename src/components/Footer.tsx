import React from 'react';
import { Box, Phone, MapPin, Mail, Award, Key, Instagram } from 'lucide-react';
import MainLogo from './MainLogo';

interface FooterProps {
  onNavigate: (sectionId: string) => void;
}

export default function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="footer" className="bg-luxury-black border-t border-gold-500/10 text-gray-400 select-none">
      
      {/* Top Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 animate-fade-in">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 text-left">
          
          {/* Logo Brand Tagline Summary Column (Width Span: 4) */}
          <div className="md:col-span-4 space-y-6">
            <div 
              className="flex items-center cursor-pointer group transition-transform duration-300 hover:scale-[1.02] origin-left" 
              onClick={() => onNavigate('hero')}
            >
              <MainLogo size="sm" darkMode={true} className="items-start" showMotto={true} />
            </div>

            <p className="text-xs sm:text-sm text-gray-400 font-light leading-relaxed max-w-sm italic">
              "Crafting Premium Packaging That Elevates Your Brand."
            </p>

            {/* Micro badge of authority */}
            <div className="flex items-center space-x-2 text-[10px] text-gold-400/80 font-mono tracking-widest uppercase">
              <Award className="w-4 h-4 text-gold-500" />
              <span>Pan-India Supply Reliability</span>
            </div>
          </div>

          {/* Quick Sitemap Sitemap (Width Span: 3) */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-white font-bold border-b border-gold-500/10 pb-2">
              Sitemap Navigation
            </h4>
            
            <ul className="space-y-2 text-xs">
              {[
                { id: 'hero', label: 'Home Page' },
                { id: 'about', label: 'Company Overview' },
                { id: 'products', label: 'Our Custom Boxes' },
                { id: 'configurator', label: 'Box Advisor App' },
                { id: 'excellence', label: 'Our Workflow' },
                { id: 'catalog', label: 'Official E-Catalog' },
                { id: 'industries', label: 'Sectors We Serve' },
                { id: 'gallery', label: 'Portfolio Gallery' },
                { id: 'contact', label: 'Request Quote' }
              ].map((lnk) => (
                <li key={lnk.id}>
                  <button
                    onClick={() => onNavigate(lnk.id)}
                    className="hover:text-gold-500 transition-colors duration-200 cursor-pointer"
                  >
                    {lnk.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Details (Width Span: 5) */}
          <div className="md:col-span-5 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-white font-bold border-b border-gold-500/10 pb-2">
              Corporate Coordinates
            </h4>

            <div className="space-y-4 text-xs">
              {/* Phone Line link */}
              <div className="flex items-start space-x-3">
                <Phone className="w-4.5 h-4.5 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-gray-200 uppercase tracking-widest text-[10px]">Contact</span>
                  <div className="flex flex-col space-y-1">
                    <a href="tel:+918976378892" className="text-white hover:text-gold-500 font-semibold select-text transition-colors duration-200">
                      +91 89763 78892
                    </a>
                    <a href="tel:+917304366479" className="text-white hover:text-gold-500 font-semibold select-text transition-colors duration-200">
                      +91 73043 66479
                    </a>
                  </div>
                </div>
              </div>

              {/* Instagram */}
              <div className="flex items-start space-x-3">
                <Instagram className="w-4.5 h-4.5 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-gray-200 uppercase tracking-widest text-[10px]">Instagram</span>
                  <a
                    href="https://www.instagram.com/rigidboxin/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white hover:text-gold-500 font-semibold select-text transition-colors duration-200"
                  >
                    @rigidboxin
                  </a>
                </div>
              </div>

              {/* Corporate Office */}
              <div className="flex items-start space-x-3">
                <MapPin className="w-4.5 h-4.5 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-gray-200 uppercase tracking-widest text-[10px]">Corporate Office</span>
                  <p className="text-gray-400 font-light select-text">
                    <strong>Rigid Box India</strong><br />
                    Office No. 2205, 22nd Floor, One World By Sanjar,<br />
                    Swami Vivekanand Road, Near N.L. College,<br />
                    Mumbai – 400064
                  </p>
                </div>
              </div>

              {/* Manufacturing Factory */}
              <div className="flex items-start space-x-3">
                <MapPin className="w-4.5 h-4.5 text-gold-500 shrink-0 mt-0.5" />
                <div>
                  <span className="block font-bold text-gray-200 uppercase tracking-widest text-[10px]">Manufacturing Factory</span>
                  <p className="text-gray-400 font-light select-text">
                    Mahadev Industrial Park,<br />
                    Vasai Road, Karivali Village,<br />
                    Maharashtra – 421302
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>

      {/* Deep bottom sub-bar */}
      <div className="border-t border-gold-500/5 bg-charcoal/50 text-[11px] py-6 text-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p>© {currentYear} Rigid Box India Manufacturing Division. All Rights Reserved.</p>
          
          <div className="flex space-x-4 text-[10px]">
            <span>ISO 9001:2015 Approved</span>
            <span>|</span>
            <span>Pulp Sourced from FSC Certified Forests</span>
            <span>|</span>
            <button
              onClick={() => onNavigate('contact')}
              className="text-gold-400 font-semibold hover:underline"
            >
              Request Custom Die Layout
            </button>
          </div>
        </div>
      </div>

    </footer>
  );
}
