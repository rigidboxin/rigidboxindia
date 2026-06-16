import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, Box, ShieldCheck, Database, Send, Instagram } from 'lucide-react';
import MainLogo from './MainLogo';

interface NavbarProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
  onOpenAdmin: () => void;
  adminOpen: boolean;
  totalLeadsCount: number;
}

export default function Navbar({ onNavigate, activeSection, onOpenAdmin, adminOpen, totalLeadsCount }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'why-choose-us', label: 'Why Us' },
    { id: 'products', label: 'Premium Boxes' },
    { id: 'configurator', label: 'Box Advisor' },
    { id: 'excellence', label: 'Manufacturing' },
    { id: 'industries', label: 'Industries' },
    { id: 'catalog', label: 'E-Catalog' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'contact', label: 'Contact Us' }
  ];

  const handleItemClick = (id: string) => {
    onNavigate(id);
    setIsOpen(false);
  };

  return (
    <nav
      id="main-navigation"
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-md border-b border-gold-500/10 py-2 md:py-3 shadow-md' : 'bg-transparent py-4 md:py-6'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <div 
            id="nav-logo"
            className="flex items-center cursor-pointer group shrink-0 transition-transform duration-300 hover:scale-[1.02]"
            onClick={() => handleItemClick('hero')}
          >
            {/* Compact, pixel-perfect logo on mobile, tablet, and standard laptops */}
            <div className="xl:hidden">
              <MainLogo size="sm" className="scale-95 sm:scale-100 origin-left" />
            </div>
            {/* Stunningly large luxury logo on large desktop screens, scaling down seamlessly when scrolled */}
            <div className="hidden xl:block">
              {scrolled ? (
                <MainLogo size="md" className="origin-left transition-all duration-300" />
              ) : (
                <MainLogo size="lg" className="scale-100 lg:scale-105 origin-left transition-all duration-300" />
              )}
            </div>
          </div>

          {/* Right Action Menu Group (Combines Desktop action counters + Hamburger icon) */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            
            {/* Desktop Action & Admin Portal Switcher */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-4">
              {/* Quick Phone Call Link */}
              <div className="hidden xl:flex flex-col items-end text-right">
                <a
                  id="navbar-call-button-1"
                  href="tel:+918976378892"
                  className="flex items-center space-x-1.5 text-xs font-semibold text-gray-700 hover:text-gold-500 transition-colors"
                >
                  <Phone className="w-3 h-3 text-gold-500 animate-pulse animate-duration-1000" />
                  <span>+91 89763 78892</span>
                </a>
                <a
                  id="navbar-call-button-2"
                  href="tel:+917304366479"
                  className="text-[9px] font-bold text-gray-500 hover:text-gold-500 transition-colors mt-0.5"
                >
                  +91 73043 66479
                </a>
              </div>

              {/* Icon only Phone link for smaller laptops */}
              <a
                id="navbar-phone-icon-link"
                href="tel:+918976378892"
                className="p-1.5 text-gray-600 hover:text-gold-500 transition-colors bg-gray-100/80 hover:bg-gold-500/10 rounded-sm xl:hidden"
                title="Call Sales Customer Care"
              >
                <Phone className="w-4 h-4 text-gold-600" />
              </a>

              {/* Instagram link */}
              <a
                id="navbar-instagram-link"
                href="https://www.instagram.com/rigidboxin/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 text-gray-600 hover:text-gold-500 transition-colors bg-gray-100/80 hover:bg-gold-500/10 rounded-sm"
                title="Follow us on Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>

              {/* Secret Admin/Logs Tracker Workspace */}
              <button
                id="navbar-admin-toggle"
                onClick={onOpenAdmin}
                className={`p-1.5 px-2.5 rounded-sm border transition-all relative flex items-center space-x-1 ${
                  adminOpen
                    ? 'bg-gold-500 text-white border-gold-500 shadow-md'
                    : 'bg-gray-100/95 text-gray-600 border-gold-500/20 hover:text-gold-500 hover:border-gold-500/40'
                }`}
                title="Open Back Office Lead Tracker"
              >
                <Database className="w-3.5 h-3.5" />
                <span className="text-[9px] uppercase font-bold tracking-wider hidden xl:inline">Leads Panel</span>
                {totalLeadsCount > 0 && !adminOpen && (
                  <span className="absolute -top-1 -right-1 bg-red-600 text-white font-sans text-[8px] w-4.5 h-4.5 flex items-center justify-center rounded-full border border-white font-bold animate-bounce">
                    {totalLeadsCount}
                  </span>
                )}
              </button>

              {/* Instant Quote Call-to-action */}
              <button
                id="navbar-cta-quote"
                onClick={() => handleItemClick('contact')}
                className="px-3 xl:px-4 py-1.5 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-white text-[10px] xl:text-xs uppercase tracking-wider xl:tracking-widest font-bold rounded-sm border border-gold-300/30 shadow-md transition-all duration-300 hover:translate-y-[-1px] hover:shadow-gold-500/10 cursor-pointer shrink-0"
              >
                Get Quote
              </button>
            </div>

            {/* Mobile Database lead counter accessibility - remains visible only on small screens */}
            <div className="flex lg:hidden items-center">
              <button
                id="navbar-mobile-admin-toggle"
                onClick={onOpenAdmin}
                className={`p-2 rounded-lg border transition-all relative ${
                  adminOpen
                    ? 'bg-gold-500 text-white border-gold-500'
                    : 'bg-gray-100 text-gray-600 border-gold-500/20'
                }`}
              >
                <Database className="w-4.5 h-4.5" />
                {totalLeadsCount > 0 && !adminOpen && (
                  <span className="absolute -top-1.5 -right-1.5 bg-red-600 text-white font-sans text-[8px] w-4.5 h-4.5 flex items-center justify-center rounded-full font-bold">
                    {totalLeadsCount}
                  </span>
                )}
              </button>
            </div>

            {/* Premium Three-Lines (Hamburger/Close) Toggle - PERMANENTLY VISIBLE on all viewports */}
            <button
              id="navbar-hamburger-btn"
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 text-gray-700 hover:text-gold-500 focus:outline-none w-10 h-10 relative flex items-center justify-center cursor-pointer transition-colors"
              aria-label="Toggle Menu"
            >
              <div className="w-6 h-5 relative flex flex-col justify-between">
                <span className={`block h-[2px] w-6 transition-all duration-300 rounded-full ${isOpen ? 'rotate-45 translate-y-[9px] bg-gold-500' : 'bg-gray-700'}`} />
                <span className={`block h-[2px] w-6 transition-all duration-300 rounded-full ${isOpen ? 'opacity-0 bg-gold-500' : 'bg-gray-700'}`} />
                <span className={`block h-[2px] w-6 transition-all duration-300 rounded-full ${isOpen ? '-rotate-45 -translate-y-[9px] bg-gold-500' : 'bg-gray-700'}`} />
              </div>
            </button>

          </div>
        </div>
      </div>

      {/* Slide-out/Dropdown Site Menu (Always visible when index drawer is toggled open) */}
      {isOpen && (
        <div 
          id="mobile-nav-menu" 
          className="absolute top-full left-0 w-full bg-white border-b border-gold-500/20 py-4 sm:py-6 lg:py-8 shadow-xl px-4 sm:px-6 lg:px-8 divide-y divide-gold-500/10 animate-fade-in z-50 text-left"
        >
          {/* Grid Layout that expands seamlessly on tablet/desktop viewports */}
          <div className="py-2.5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-1.5 sm:gap-2 lg:gap-3">
            {navItems.map((item) => (
              <button
                id={`mobile-nav-link-${item.id}`}
                key={item.id}
                onClick={() => handleItemClick(item.id)}
                className={`block w-full text-left px-4 py-2 text-[11px] sm:text-xs uppercase tracking-wider font-bold rounded-sm border-l-2 transition-all cursor-pointer ${
                  activeSection === item.id && !adminOpen
                    ? 'bg-gold-500/5 text-gold-600 border-gold-500 font-extrabold'
                    : 'text-gray-700 border-transparent hover:bg-gold-500/5 hover:text-gold-600'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          <div className="py-4 space-y-3.5 px-3">
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-8 space-y-2.5 sm:space-y-0">
              <a
                id="mobile-navbar-phone-1"
                href="tel:+918976378892"
                className="flex items-center space-x-3 text-xs text-gray-700 font-medium hover:text-gold-500 duration-200"
              >
                <Phone className="w-4 h-4 text-gold-500 shrink-0" />
                <span>+91 89763 78892</span>
              </a>
              <a
                id="mobile-navbar-phone-2"
                href="tel:+917304366479"
                className="flex items-center space-x-3 text-xs text-gray-700 font-medium hover:text-gold-500 duration-200"
              >
                <Phone className="w-4 h-4 text-gold-500/60 shrink-0" />
                <span>+91 73043 66479</span>
              </a>
              <a
                id="mobile-navbar-instagram"
                href="https://www.instagram.com/rigidboxin/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-3 text-xs text-gray-700 font-medium hover:text-gold-500 duration-200"
              >
                <Instagram className="w-4 h-4 text-gold-500 shrink-0" />
                <span>@rigidboxin</span>
              </a>
            </div>
            
            <div className="flex space-x-2 pt-2 max-w-sm sm:max-w-md">
              <button
                id="mobile-navbar-admin-btn"
                onClick={() => {
                  onOpenAdmin();
                  setIsOpen(false);
                }}
                className="flex-1 py-1.5 border border-gold-500/20 text-center rounded-sm text-[10px] uppercase tracking-wider font-bold text-gold-600 bg-gray-50 hover:bg-gray-100 cursor-pointer"
              >
                Owner Leads
              </button>
              <button
                id="mobile-navbar-cta-btn"
                onClick={() => handleItemClick('contact')}
                className="flex-1 py-1.5 bg-gold-500 text-white text-center rounded-sm text-[10px] uppercase tracking-wider font-bold hover:bg-gold-600 cursor-pointer"
              >
                Request Quote
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
