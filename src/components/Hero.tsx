import React from 'react';
import { FormInput, Phone, ArrowUpRight, Award, Flame, Box, HelpCircle } from 'lucide-react';
import MainLogo from './MainLogo';

interface HeroProps {
  onNavigate: (sectionId: string) => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  const whatsappUrl = "https://wa.me/918976378892?text=Hello%20Rigid%20Box%20India%2C%20I%20visited%20your%20website%20and%20would%20like%20to%20inquire%20about%20your%20luxury%20rigid%20packaging%20solutions.";

  return (
    <section 
      id="hero" 
      className="relative min-h-[600px] md:min-h-[75vh] lg:min-h-[85vh] xl:min-h-[90vh] flex items-center justify-center pt-28 sm:pt-32 md:pt-40 lg:pt-44 xl:pt-48 pb-10 overflow-hidden bg-gradient-to-b from-white via-gray-50 to-gray-100"
    >
      {/* Background Decorative Grid and Glow Ambient elements */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(197,155,39,0.07),transparent_50%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(197,155,39,0.04),transparent_40%)]" />
        
        {/* Fine gold horizontal & vertical lines */}
        <div className="absolute top-1/4 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />
        <div className="absolute bottom-1/3 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />
        <div className="absolute top-0 bottom-0 left-1/4 w-[1px] bg-gradient-to-b from-transparent via-gold-500/5 to-transparent hidden md:block" />
        <div className="absolute top-0 bottom-0 right-1/4 w-[1px] bg-gradient-to-b from-transparent via-gold-500/5 to-transparent hidden md:block" />
      </div>

      {/* Hero Content Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full mt-2">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column Text details */}
          <div className="lg:col-span-7 select-none space-y-5 text-center lg:text-left">
            {/* Top Badge alert */}
            <div className="inline-flex items-center space-x-2 bg-gold-100/50 border border-gold-500/20 px-2.5 py-1 rounded-full">
              <Award className="w-3.5 h-3.5 text-gold-600" />
              <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] font-semibold text-gold-700">
                Premium Packaging Manufacturer
              </span>
            </div>

            {/* Main Luxury Headings */}
            <div className="space-y-3">
              <h1 id="hero-title" className="font-serif text-3xl sm:text-4xl lg:text-5.5xl font-extrabold text-luxury-black leading-tight tracking-tight">
                Custom <br />
                <span className="font-serif font-light italic text-transparent bg-clip-text bg-gradient-to-r from-gold-600 via-gold-500 to-gold-400 relative inline-block pb-1">
                  Luxury Packaging
                  <span className="absolute left-0 bottom-1 w-full h-[1.5px] bg-gold-500/35"></span>
                </span> <br />
                <span className="font-sans font-black tracking-normal uppercase text-gray-850 text-2xl sm:text-3xl lg:text-4.5xl">Box Solutions</span>
              </h1>
              <p id="hero-subtitle" className="max-w-xl mx-auto lg:mx-0 text-xs sm:text-sm text-gray-600 font-medium tracking-wide leading-relaxed">
                Manufacturer of High-Quality Rigid Boxes, Kappa Boxes &amp; Custom Packaging Solutions for Premium Brands Across India. Elevate your product presentation and secure brand value.
              </p>
            </div>

            {/* Quick stats grid inside Hero to elevate credibility */}
            <div className="grid grid-cols-3 gap-3 border-y border-gold-500/10 py-1.5 my-2.5 max-w-sm mx-auto lg:mx-0 text-left">
              <div>
                <span className="block text-base font-bold font-sans text-gold-600">100%</span>
                <span className="block text-[8px] text-gray-500 uppercase tracking-widest font-semibold mt-0.5">Custom Built</span>
              </div>
              <div className="border-l border-gold-500/10 pl-3">
                <span className="block text-base font-bold font-sans text-gold-600">Premium</span>
                <span className="block text-[8px] text-gray-500 uppercase tracking-widest font-semibold mt-0.5">Raw Materials</span>
              </div>
              <div className="border-l border-gold-500/10 pl-3">
                <span className="block text-base font-bold font-sans text-gold-600">Pan India</span>
                <span className="block text-[8px] text-gray-500 uppercase tracking-widest font-semibold mt-0.5">Supply Chain</span>
              </div>
            </div>

            {/* Action Buttons CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3">
              <button
                id="hero-get-quote"
                onClick={() => onNavigate('contact')}
                className="w-full sm:w-auto px-6 py-2.5 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-white font-bold text-xs uppercase tracking-widest rounded-sm shadow-md hover:shadow-lg duration-300 transform hover:translate-y-[-1px] flex items-center justify-center space-x-2 cursor-pointer"
              >
                <span>Get a Quote</span>
                <ArrowUpRight className="w-4 h-4" />
              </button>

              <a
                id="hero-whatsapp"
                href={whatsappUrl}
                target="_blank"
                referrerPolicy="no-referrer"
                className="w-full sm:w-auto px-6 py-2.5 bg-white hover:bg-gray-100 text-gray-900 border border-gold-500/30 hover:border-gold-500 font-bold text-xs uppercase tracking-widest rounded-sm tracking-[0.15em] transition-all duration-300 flex items-center justify-center space-x-2 shadow-sm cursor-pointer"
              >
                <span>WhatsApp Us</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
              </a>

              <button
                id="hero-config-cta"
                onClick={() => onNavigate('configurator')}
                className="w-full sm:w-auto text-xs uppercase text-gold-600 hover:text-gold-700 font-bold tracking-widest py-3 flex items-center justify-center space-x-1 duration-300 underline underline-offset-4 decoration-gold-500/30"
              >
                <span>Try Packaging Configurator</span>
              </button>
            </div>


          </div>

          {/* Right Column Custom Vector Art Luxury Box Drawing */}
          <div className="lg:col-span-12 xl:col-span-5 flex justify-center relative select-none mt-2 lg:mt-0">
            <div className="relative w-60 h-60 sm:w-68 h-68 lg:w-76 lg:h-76">
              
              {/* Spinning background outline aura */}
              <div className="absolute inset-0 rounded-full border border-dashed border-gold-500/20 animate-[spin_40s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-gold-500/5 animate-[spin_20s_linear_infinite_reverse]" />
              
{/* Premium Floating Packaging Vector Art */}
<div className="absolute inset-0 flex items-center justify-center">
  <div 
    onClick={() => onNavigate('configurator')}
    title="Click to design your own box in our 3D Advisor/Configurator"
    className="w-48 h-48 lg:w-56 lg:h-56 border border-gold-500/30 rounded-xl bg-white backdrop-blur-md p-4 flex flex-col justify-between shadow-lg relative group hover:border-gold-500 hover:shadow-xl duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-1"
  >
    {/* Luxury foil diagonal streak reflection */}
    <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-gold-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-2000 ease-out"></div>
    
    {/* Box content representation */}
    ...
  </div>
</div>       
                  {/* Luxury foil diagonal streak reflection */}
                  <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-gold-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-2000 ease-out"></div>
                  
                  {/* Top corner elements */}
                  <div className="flex justify-between items-start">
                    <div className="w-4 h-4 border-t border-l border-gold-500/70" />
                    <span className="font-sans text-[8px] text-gold-600 tracking-widest uppercase font-bold">Premium Finish</span>
                    <div className="w-4 h-4 border-t border-r border-gold-500/70" />
                  </div>
                  
                  {/* Glowing Box Icon Illustration */}
                  <div className="flex-1 flex flex-col items-center justify-center my-2 relative transform scale-95 group-hover:scale-100 duration-300">
                    <MainLogo size="sm" align="center" showMotto={true} />
                  </div>

                  {/* Bottom corner elements */}
                  <div className="flex justify-between items-end">
                    <div className="w-4 h-4 border-b border-l border-gold-500/70" />
                    <div className="text-[7px] text-gray-400 uppercase tracking-widest font-mono">CODE: RB-905X</div>
                    <div className="w-4 h-4 border-b border-r border-gold-500/70" />
                  </div>

                  {/* Aesthetic grid indicators */}
                  <span className="absolute top-1.5 left-8 text-[7px] text-gold-600 font-mono">1.2mm Kappa</span>
                  <span className="absolute bottom-1.5 right-8 text-[7px] text-gold-600 font-mono font-bold">Gold Foil Lock</span>
                </div>
              </div>

              {/* Little overlapping floating tags for details */}
              <div className="absolute top-6 right-0 bg-white p-2 rounded border border-gold-500/30 text-[9px] font-bold text-gold-600 uppercase tracking-widest shadow-md flex items-center space-x-1 animate-bounce">
                <span>⭐ Custom Sizing</span>
              </div>
              <div className="absolute bottom-4 -left-2 bg-white p-2 rounded border border-gold-500/30 text-[9px] font-bold text-gold-600 uppercase tracking-widest shadow-md flex items-center space-x-1">
                <span>🛡️ High Durability</span>
                {/* Premium Floating Packaging Vector Art */}
<div className="absolute inset-0 flex items-center justify-center">
  <div 
    onClick={() => onNavigate('configurator')}
    title="Click to design your own box in our 3D Advisor/Configurator"
    className="w-48 h-48 lg:w-56 lg:h-56 border border-gold-500/30 rounded-xl bg-white backdrop-blur-md p-4 flex flex-col justify-between shadow-lg relative group hover:border-gold-500 hover:shadow-xl duration-500 overflow-hidden cursor-pointer transform hover:-translate-y-1"
  >
    {/* Luxury foil diagonal streak reflection */}
    <div className="absolute inset-0 w-[200%] h-full bg-gradient-to-r from-transparent via-gold-500/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-2000 ease-out"></div>
    
    {/* Box content representation */}
    ...
  </div>
</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
