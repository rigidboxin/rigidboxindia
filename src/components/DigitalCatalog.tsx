import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  Download, 
  ChevronLeft, 
  ChevronRight, 
  Phone, 
  Globe, 
  Clock, 
  CheckCircle, 
  BadgePercent, 
  Compass, 
  Hammer, 
  Milestone, 
  Award,
  Maximize2,
  X,
  ZoomIn
} from 'lucide-react';

// Import actual premium mockups for display boxes in the catalog pages
// @ts-ignore
import airtagGiftBox from '../assets/images/airtag_gift_box_1780658805056.png';
// @ts-ignore
import powerBankBox from '../assets/images/power_bank_box_1780657897715.png';
// @ts-ignore
import emptyWhiteBox from '../assets/images/empty_white_box_1780658835295.png';
// @ts-ignore
import bortiveWatchBox from '../assets/images/bortive_watch_box_v1_1781519039891.jpg';
// @ts-ignore
import yellowPenGiftBox from '../assets/images/gift_set_box_v1_1781519362312.jpg';

interface DigitalCatalogProps {
  onInquire: (productTitle: string) => void;
}

export default function DigitalCatalog({ onInquire }: DigitalCatalogProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [fullscreenImage, setFullscreenImage] = useState<{ src: string; title: string } | null>(null);
  const totalPages = 4;

  const navigatePage = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && currentPage > 1) {
      setCurrentPage(prev => prev - 1);
    } else if (direction === 'next' && currentPage < totalPages) {
      setCurrentPage(prev => prev + 1);
    }
  };

  const handleDownloadPDF = () => {
    // Elegant system print of the catalog sections with dedicated clean layout
    window.print();
  };

  // Direct action linking from catalog items directly to quotes
  const handleCatalogInquiry = (category: string) => {
    onInquire(`Catalog Collection: ${category}`);
  };

  return (
    <section id="catalog" className="py-12 bg-gray-50/70 border-y border-gold-500/10 relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-gold-500/5 blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-gold-500/5 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-[10px] font-sans font-extrabold tracking-[0.3em] text-gold-600 uppercase block mb-1">
            Official Brochure
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl text-luxury-black font-black tracking-tight uppercase">
            Rigid Box India Catalog
          </h2>
          <div className="w-16 h-[2px] bg-gradient-to-r from-transparent to-gold-500/60 via-gold-500 mx-auto my-3"></div>
          <p className="text-xs sm:text-sm text-gray-600 font-medium leading-relaxed">
            Browse our digital product portfolio, core advantages, and premium manufacturing workflows. 
            Click the page numbers or use navigation arrows to explore.
          </p>
        </div>

        {/* Catalog Control Ribbon */}
        <div className="flex flex-wrap items-center justify-between gap-4 bg-white/70 backdrop-blur-md rounded border border-gold-500/10 p-3 sm:px-5 mb-8">
          {/* Left: Mode Indicator */}
          <div className="flex items-center space-x-2">
            <BookOpen className="w-4 h-4 text-gold-600 animate-pulse" />
            <span className="text-[10px] sm:text-xs uppercase font-extrabold tracking-wider text-luxury-black">
              Digital Presentation <span className="text-gold-500 font-normal">|</span> Page {currentPage} of {totalPages}
            </span>
          </div>

          {/* Center: Pagination Dots */}
          <div className="flex items-center space-x-1.5 order-last sm:order-none mx-auto sm:mx-0">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((idx) => (
              <button
                key={idx}
                onClick={() => setCurrentPage(idx)}
                className={`w-7 h-7 flex items-center justify-center font-serif text-xs rounded transition-all cursor-pointer ${
                  currentPage === idx
                    ? 'bg-gold-500 text-white font-bold shadow-md shadow-gold-500/20'
                    : 'bg-gray-100 hover:bg-gold-500/10 text-gray-500 font-medium'
                }`}
                title={`Go to Page ${idx}`}
              >
                {idx}
              </button>
            ))}
          </div>

          {/* Right: Print / Saving Action */}
          <button
            onClick={handleDownloadPDF}
            className="flex items-center space-x-1.5 px-3 py-1.5 bg-gray-900 hover:bg-gold-600 text-white text-[10px] uppercase tracking-wider font-extrabold rounded transition-all duration-300 shadow hover:translate-y-[-1px]"
            title="Saves high-quality document directly"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Print Catalog / Save PDF</span>
          </button>
        </div>

        {/* Dynamic Presentation Window Wrapper */}
        <div className="relative mx-auto max-w-4xl bg-white shadow-2xl border border-gold-500/20 rounded-xl overflow-hidden min-h-[520px] md:min-h-[580px]">
          
          {/* Quick Arrow Controllers */}
          <button
            onClick={() => navigatePage('prev')}
            disabled={currentPage === 1}
            className={`absolute left-2.5 top-[48%] -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-white/95 border border-gold-500/15 text-gold-600 shadow-md transition-all ${
              currentPage === 1 
                ? 'opacity-25 cursor-not-allowed' 
                : 'hover:bg-gold-500 hover:text-white hover:scale-105 cursor-pointer'
            }`}
          >
            <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={() => navigatePage('next')}
            disabled={currentPage === totalPages}
            className={`absolute right-2.5 top-[48%] -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-white/95 border border-gold-500/15 text-gold-600 shadow-md transition-all ${
              currentPage === totalPages 
                ? 'opacity-25 cursor-not-allowed' 
                : 'hover:bg-gold-500 hover:text-white hover:scale-105 cursor-pointer'
            }`}
          >
            <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          {/* Slide display content with beautiful frame transition */}
          <div className="w-full h-full select-text">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentPage}
                initial={{ opacity: 0, x: 25 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -25 }}
                transition={{ duration: 0.35 }}
                className="w-full h-full"
              >
                {/* PAGE 1: Brand Introduction & Quality Loop */}
                {currentPage === 1 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 min-h-[520px] md:min-h-[580px]">
                    {/* Left Column (Ochre/Gold Accent Panel consistent with page layout) */}
                    <div className="bg-[#CCA45F] text-white p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden">
                      {/* Decorative elements representing catalog vectors */}
                      <div className="absolute top-[3%] left-[10%] opacity-20 text-white font-sans text-7xl font-bold tracking-tight select-none">RB</div>
                      <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full border border-white/10" />

                      <div className="space-y-1 relative z-10">
                        <span className="text-[10px] uppercase tracking-[0.25em] font-extrabold text-white/95 block">Rigid Box</span>
                        <h3 className="text-xl sm:text-2xl font-serif font-black tracking-wider border-b border-white/20 pb-2">INDIA</h3>
                      </div>

                      {/* Interactive Circular Loop Lifecycle representation */}
                      <div className="py-6 flex flex-col items-center justify-center relative z-10">
                        <div className="relative w-44 h-44 sm:w-52 sm:h-52 rounded-full border-2 border-white/25 flex items-center justify-center">
                          {/* Circle text and loop dots */}
                          <div className="absolute -top-1 px-2.5 py-0.5 bg-[#4A1D1A] rounded-full text-[8.5px] font-extrabold border border-white/35 shadow-sm uppercase tracking-wide">
                            Consistent Quality
                          </div>
                          <div className="absolute -right-3 top-[25%] px-2.5 py-0.5 bg-[#4A1D1A] rounded-full text-[8.5px] font-extrabold border border-white/35 shadow-sm uppercase tracking-wide">
                            Product Customization
                          </div>
                          <div className="absolute -right-3 bottom-[25%] px-2.5 py-0.5 bg-[#4A1D1A] rounded-full text-[8.5px] font-extrabold border border-white/35 shadow-sm uppercase tracking-wide">
                            Customer Support
                          </div>
                          <div className="absolute -bottom-1 px-2.5 py-0.5 bg-[#4A1D1A] rounded-full text-[8.5px] font-extrabold border border-white/35 shadow-sm uppercase tracking-wide">
                            Innovative Solution
                          </div>
                          <div className="absolute -left-3 bottom-[25%] px-2.5 py-0.5 bg-[#4A1D1A] rounded-full text-[8.5px] font-extrabold border border-white/35 shadow-sm uppercase tracking-wide">
                            Standard Process
                          </div>
                          <div className="absolute -left-3 top-[25%] px-2.5 py-0.5 bg-[#4A1D1A] rounded-full text-[8.5px] font-extrabold border border-white/35 shadow-sm uppercase tracking-wide">
                            Best Materials
                          </div>

                          {/* Center Circle */}
                          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-white/10 backdrop-blur-sm border border-white/30 flex flex-col items-center justify-center text-center p-3 animate-pulse">
                            <Compass className="w-6 h-6 text-white mb-1.5" />
                            <span className="text-[10px] font-extrabold tracking-widest uppercase">Lifecycle</span>
                            <span className="text-[7.5px] font-medium text-white/80 uppercase">Continuous Loop</span>
                          </div>
                        </div>
                      </div>

                      {/* Contact banner */}
                      <div className="bg-[#4A1D1A]/35 backdrop-blur-md rounded p-3 relative z-10 border border-white/15">
                        <span className="text-[8px] uppercase tracking-widest font-extrabold text-gold-300 block mb-1">Direct Brand Hotline</span>
                        <div className="flex flex-col space-y-1">
                          <a href="tel:+918976378892" className="flex items-center space-x-1.5 text-[10px] font-bold text-white hover:text-gold-200">
                            <span className="shrink-0 bg-white/10 p-0.5 rounded">📞</span>
                            <span>+91 89763 78892 </span>
                          </a>
                          <div className="flex items-center space-x-1.5 text-[9px] text-white/90">
                            <span className="shrink-0 bg-white/10 p-0.5 rounded">🌐</span>
                            <span>www.rigidbox.in</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column (Product Presentation Panel) */}
                    <div className="p-6 sm:p-10 flex flex-col justify-between bg-white text-left">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[9px] font-mono font-bold tracking-widest text-[#4A1D1A] uppercase">Rigid Box INDIA</span>
                          <span className="text-[9px] bg-gold-500/10 text-gold-700 px-2.5 py-0.5 rounded font-extrabold">Page 01</span>
                        </div>

                        <div className="space-y-1.5">
                          <h4 className="text-luxury-black font-extrabold text-xl sm:text-2xl tracking-normal">
                            Premium Box Manufacturing Solutions
                          </h4>
                          <span className="text-gold-600 font-serif font-black tracking-widest uppercase text-xs block">
                            Premium Custom Luxury Packaging
                          </span>
                        </div>

                        {/* Kraft box mock represent */}
                        <div 
                          className="relative group overflow-hidden rounded border border-gold-500/15 shadow-md my-4 bg-gray-50 flex items-center justify-center p-4 cursor-zoom-in group/img"
                          onClick={() => setFullscreenImage({ src: emptyWhiteBox, title: "Kappa Board Kraft Specimen" })}
                          title="Click to view full screen (fit to screen)"
                        >
                          <img 
                            src={emptyWhiteBox} 
                            alt="Rigid Box Manufacturer Solutions" 
                            className="h-32 object-contain duration-300 group-hover:scale-105"
                          />
                          <div className="absolute bottom-2 right-2 bg-gray-900/80 backdrop-blur-xs text-white text-[8px] px-1.5 py-0.5 rounded font-bold">
                            Kappa Board Kraft Specimen
                          </div>
                          {/* Hover Zoom badge */}
                          <div className="absolute top-2 right-2 opacity-0 group-hover/img:opacity-100 bg-luxury-black/90 text-white text-[8px] font-bold px-1.5 py-0.5 rounded flex items-center space-x-1 border border-white/10 transition-opacity">
                            <ZoomIn className="w-3 h-3" />
                            <span>Fit to Screen</span>
                          </div>
                        </div>

                        {/* Bullet point list mirroring screenshot */}
                        <div className="space-y-2 pt-2">
                          <p className="text-[10px] uppercase tracking-wider font-extrabold text-gold-600">Core Disciplines:</p>
                          <ul className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                            <li className="flex items-center space-x-1.5 p-1.5 bg-gray-50 border border-gold-500/10 rounded">
                              <span className="text-gold-600 font-bold">•</span>
                              <span className="text-[9px] font-bold text-gray-700 uppercase">Luxury Packaging</span>
                            </li>
                            <li className="flex items-center space-x-1.5 p-1.5 bg-gray-50 border border-gold-500/10 rounded">
                              <span className="text-gold-600 font-bold">•</span>
                              <span className="text-[9px] font-bold text-gray-700 uppercase">Custom Designs</span>
                            </li>
                            <li className="flex items-center space-x-1.5 p-1.5 bg-gray-50 border border-gold-500/10 rounded">
                              <span className="text-gold-600 font-bold">•</span>
                              <span className="text-[9px] font-bold text-gray-700 uppercase">High Finishing</span>
                            </li>
                          </ul>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-100 flex justify-between items-center mt-4">
                        <span className="text-[9px] text-gray-400 font-mono">© RigidBoxIndia Corporate</span>
                        <button
                          onClick={() => handleCatalogInquiry("Core Manufacturer Solutions")}
                          className="px-3 py-1 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 text-white text-[9px] font-bold uppercase tracking-wider rounded transition-all"
                        >
                          Request Brochure Sample
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* PAGE 2: About & Manufacturing Process */}
                {currentPage === 2 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 min-h-[520px] md:min-h-[580px]">
                    {/* Left Column (Core About Intro) */}
                    <div className="p-6 sm:p-10 flex flex-col justify-between bg-white text-left">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold tracking-widest text-gold-600 uppercase">Rigid Box INDIA</span>
                          <span className="text-[9px] bg-[#4A1D1A]/10 text-[#4A1D1A] px-2.5 py-0.5 rounded font-extrabold">Page 02</span>
                        </div>

                        <div className="space-y-1.5">
                          <span className="text-gray-400 uppercase text-[9px] tracking-widest font-extrabold leading-none block">Corporate Identity</span>
                          <h4 className="text-luxury-black font-extrabold text-xl sm:text-2xl tracking-normal uppercase">
                            ABOUT RIGID BOX
                          </h4>
                          <span className="w-12 h-[2px] bg-[#4A1D1A] block"></span>
                        </div>

                        {/* Copytext exact mirror from page 2 */}
                        <p className="text-gray-650 text-xs font-semibold leading-relaxed text-justify">
                          RigidBox is a trusted box manufacturing company delivering high-quality packaging solutions for businesses across multiple industries. We specialize in manufacturing premium boxes with excellent finishing, strong durability, and customized designs according to client requirements.
                        </p>
                        
                        <p className="text-gray-650 text-xs font-semibold leading-relaxed text-justify">
                          Our manufacturing process combines advanced machinery, skilled production techniques, and quality materials to create packaging that enhances product presentation and brand value.
                        </p>

                        {/* Double box image mockup */}
                        <div className="grid grid-cols-2 gap-3 mt-4">
                          <div 
                            className="rounded border border-gold-500/10 p-1 bg-gray-50 cursor-zoom-in relative group/img overflow-hidden"
                            onClick={() => setFullscreenImage({ src: airtagGiftBox, title: "Airtag Lid Box" })}
                            title="Click to view full screen"
                          >
                            <img src={airtagGiftBox} alt="Rigid Box Airtag" className="h-20 w-full object-contain" />
                            <span className="text-[8px] font-bold text-gray-500 block text-center mt-1 uppercase">Airtag Lid Box</span>
                            {/* Hover zoom badge */}
                            <div className="absolute top-1 right-1 opacity-0 group-hover/img:opacity-100 bg-luxury-black/90 text-white text-[7px] font-bold px-1 rounded flex items-center space-x-0.5 border border-white/10 transition-opacity">
                              <ZoomIn className="w-2.5 h-2.5" />
                              <span>Fit</span>
                            </div>
                          </div>
                          <div 
                            className="rounded border border-gold-500/10 p-1 bg-gray-50 cursor-zoom-in relative group/img overflow-hidden"
                            onClick={() => setFullscreenImage({ src: powerBankBox, title: "Sturdy Charger Box" })}
                            title="Click to view full screen"
                          >
                            <img src={powerBankBox} alt="Power Bank packaging" className="h-20 w-full object-contain" />
                            <span className="text-[8px] font-bold text-gray-500 block text-center mt-1 uppercase">Sturdy Charger Box</span>
                            {/* Hover zoom badge */}
                            <div className="absolute top-1 right-1 opacity-0 group-hover/img:opacity-100 bg-luxury-black/90 text-white text-[7px] font-bold px-1 rounded flex items-center space-x-0.5 border border-white/10 transition-opacity">
                              <ZoomIn className="w-2.5 h-2.5" />
                              <span>Fit</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-100 flex justify-between items-center mt-4">
                        <span className="text-[8px] text-gray-400 font-mono">Quality Assurance Systems</span>
                        <span className="text-[10px] text-gold-600 font-bold uppercase font-serif italic">Est. 2011</span>
                      </div>
                    </div>

                    {/* Right Column (Ochre/Gold Stepper Manufacturing Process Panel) */}
                    <div className="bg-[#CCA45F] text-white p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden text-left">
                      <div className="absolute top-1/4 right-0 w-32 h-32 rounded-full border border-white/5 pointer-events-none" />
                      
                      <div className="space-y-1">
                        <span className="text-[8px] uppercase tracking-[0.2em] font-extrabold text-white/95 block">Verified Assembly</span>
                        <h4 className="text-lg sm:text-xl font-serif font-black tracking-wider uppercase">
                          OUR MANUFACTURING PROCESS
                        </h4>
                        <div className="w-12 h-1 bg-[#4A1D1A]/50 my-2"></div>
                      </div>

                      {/* Manufacturing stepper design matching PDF Page 2 */}
                      <div className="space-y-3 py-4">
                        <div className="flex items-start space-x-3.5 bg-white/10 backdrop-blur-xs p-2.5 rounded border border-white/10 hover:bg-white/15 transition-colors">
                          <span className="bg-white text-[#CCA45F] text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-sm">
                            No. 1
                          </span>
                          <div>
                            <span className="text-xs font-bold block uppercase tracking-wide">Design &amp; Development</span>
                            <p className="text-[9.5px] text-white/80 font-medium">Digital CAD vector blueprints and accurate physical mockup sizing templates.</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3.5 bg-[#4A1D1A]/20 backdrop-blur-xs p-2.5 rounded border border-white/10 hover:bg-white/15 transition-colors">
                          <span className="bg-white text-[#CCA45F] text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-sm">
                            No. 2
                          </span>
                          <div>
                            <span className="text-xs font-bold block uppercase tracking-wide">Material Selection</span>
                            <p className="text-[9.5px] text-white/80 font-medium font-semibold">Strict vetting of 1.2mm - 2.5mm heavy-density greyboards and textured liners.</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3.5 bg-white/10 backdrop-blur-xs p-2.5 rounded border border-white/10 hover:bg-white/15 transition-colors">
                          <span className="bg-white text-[#CCA45F] text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-sm">
                            No. 3
                          </span>
                          <div>
                            <span className="text-xs font-bold block uppercase tracking-wide">Precision Manufacturing</span>
                            <p className="text-[9.5px] text-white/80 font-medium">90° CNC V-grooving machinery providing flawless matching outer box edges.</p>
                          </div>
                        </div>

                        <div className="flex items-start space-x-3.5 bg-[#4A1D1A]/20 backdrop-blur-xs p-2.5 rounded border border-white/10 hover:bg-white/15 transition-colors">
                          <span className="bg-white text-[#CCA45F] text-[9px] font-extrabold px-1.5 py-0.5 rounded shadow-sm">
                            No. 4
                          </span>
                          <div>
                            <span className="text-xs font-bold block uppercase tracking-wide">Quality Checking</span>
                            <p className="text-[9.5px] text-white/80 font-medium font-semibold">Moisture tolerance analysis and bond strength checks before batch packaging.</p>
                          </div>
                        </div>
                      </div>

                      <button
                        onClick={() => handleCatalogInquiry("Manufacturing Process Verification")}
                        className="w-full py-1.5 bg-[#4A1D1A] hover:bg-luxury-black text-white text-[9px] font-bold uppercase tracking-widest rounded-sm shadow border border-white/10 transition-colors block text-center"
                      >
                        Inquire About Custom Sizing Specs
                      </button>
                    </div>
                  </div>
                )}

                {/* PAGE 3: Product Portfolio & Advantages */}
                {currentPage === 3 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 min-h-[520px] md:min-h-[580px]">
                    {/* Left Column (Burgundy Ochre Product Listing Panel) */}
                    <div className="bg-[#CCA45F] text-white p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden text-left">
                      <div className="absolute top-[5%] right-[5%] opacity-15 text-white/60 font-serif text-5xl font-black italic">PROD</div>
                      
                      <div className="space-y-1">
                        <span className="text-[8px] uppercase tracking-[0.2em] font-extrabold text-white/95 block">Portfolio Collection</span>
                        <h4 className="text-lg sm:text-xl font-serif font-black tracking-wider uppercase">
                          OUR PRODUCT RANGE
                        </h4>
                        <div className="w-12 h-1 bg-[#4A1D1A]/50 my-2"></div>
                      </div>

                      {/* Product portfolio lists mirroring Page 3 */}
                      <div className="space-y-2.5 py-4">
                        <div className="flex items-center justify-between p-2.5 bg-white/10 hover:bg-white/15 duration-200 border border-white/10 rounded">
                          <div className="flex items-center space-x-3">
                            <span className="w-5 h-5 bg-[#4A1D1A] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                              1
                            </span>
                            <span className="text-[11px] sm:text-xs font-extrabold uppercase">Rigid Boxes</span>
                          </div>
                          <span className="text-[8px] font-mono tracking-widest bg-[#4A1D1A]/20 px-1.5 py-0.5 rounded">Moq 200</span>
                        </div>

                        <div className="flex items-center justify-between p-2.5 bg-white/10 hover:bg-white/15 duration-200 border border-white/10 rounded">
                          <div className="flex items-center space-x-3">
                            <span className="w-5 h-5 bg-[#4A1D1A] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                              2
                            </span>
                            <span className="text-[11px] sm:text-xs font-extrabold uppercase">Luxury Rigid Boxes</span>
                          </div>
                          <span className="text-[8px] font-mono tracking-widest bg-[#4A1D1A]/20 px-1.5 py-0.5 rounded">Hot Foil</span>
                        </div>

                        <div className="flex items-center justify-between p-2.5 bg-white/10 hover:bg-white/15 duration-200 border border-white/10 rounded">
                          <div className="flex items-center space-x-3">
                            <span className="w-5 h-5 bg-[#4A1D1A] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                              3
                            </span>
                            <span className="text-[11px] sm:text-xs font-extrabold uppercase">Corporate Gift Boxes</span>
                          </div>
                          <span className="text-[8px] font-mono tracking-widest bg-[#4A1D1A]/20 px-1.5 py-0.5 rounded">Custom EVA</span>
                        </div>

                        <div className="flex items-center justify-between p-2.5 bg-white/10 hover:bg-white/15 duration-200 border border-white/10 rounded">
                          <div className="flex items-center space-x-3">
                            <span className="w-5 h-5 bg-[#4A1D1A] text-white text-[9px] font-bold rounded-full flex items-center justify-center">
                              4
                            </span>
                            <span className="text-[11px] sm:text-xs font-extrabold uppercase">Custom Printed Boxes</span>
                          </div>
                          <span className="text-[8px] font-mono tracking-widest bg-[#4A1D1A]/20 px-1.5 py-0.5 rounded">Full Offset</span>
                        </div>
                      </div>

                      {/* Smaller visual mock box at bottom */}
                      <div 
                        className="bg-[#4A1D1A]/20 rounded p-2 border border-white/10 flex items-center space-x-3 cursor-zoom-in relative group/img overflow-hidden"
                        onClick={() => setFullscreenImage({ src: yellowPenGiftBox, title: "Executive Gift Set & Premium Box Lining" })}
                        title="Click to view full screen"
                      >
                        <img src={yellowPenGiftBox} alt="Executive Gift Box mockup" className="w-14 h-12 object-cover rounded" />
                        <div className="text-left flex-grow">
                          <span className="text-[10px] font-extrabold block uppercase tracking-wider">Premium Custom Lining</span>
                          <span className="text-[8px] text-white/85 uppercase">Custom card dividers &amp; thermoformed plastic slots.</span>
                        </div>
                        {/* Hover badge */}
                        <div className="absolute top-1 right-1 opacity-0 group-hover/img:opacity-100 bg-[#4A1D1A] text-white text-[7px] font-bold px-1 rounded flex items-center space-x-0.5 border border-white/10 transition-opacity">
                          <ZoomIn className="w-2.5 h-2.5" />
                          <span>Fit</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Column (Strengths and Advantages) */}
                    <div className="p-6 sm:p-10 flex flex-col justify-between bg-white text-left">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold tracking-widest text-[#4A1D1A] uppercase">Rigid Box INDIA</span>
                          <span className="text-[9px] bg-gold-500/10 text-gold-700 px-2.5 py-0.5 rounded font-extrabold">Page 03</span>
                        </div>

                        <div className="space-y-1.5">
                          <span className="text-gray-400 uppercase text-[9px] tracking-widest font-extrabold leading-none block">Our Edge</span>
                          <h4 className="text-luxury-black font-extrabold text-xl sm:text-2xl tracking-normal uppercase">
                            STRENGTHS &amp; ADVANTAGES
                          </h4>
                          <span className="w-12 h-[2px] bg-[#4A1D1A] block"></span>
                        </div>

                        {/* List format matching Page 3 right column */}
                        <div className="space-y-3.5 pt-2">
                          <div className="flex items-start space-x-3 bg-gray-50 border border-gold-500/10 p-2.5 rounded">
                            <span className="w-4 h-4 rounded-full bg-[#CCA45F] text-white font-extrabold text-[9px] flex items-center justify-center shrink-0">
                              ✓
                            </span>
                            <div>
                              <span className="text-xs font-bold text-luxury-black uppercase block">Advanced Machinery</span>
                              <p className="text-[10px] text-gray-500 font-medium">Automatic V-Grooving, rigid corner-taping machines, with 10k/day manufacturing lines.</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3 bg-gray-50 border border-gold-500/10 p-2.5 rounded">
                            <span className="w-4 h-4 rounded-full bg-[#CCA45F] text-white font-extrabold text-[9px] flex items-center justify-center shrink-0">
                              ✓
                            </span>
                            <div>
                              <span className="text-xs font-bold text-luxury-black uppercase block">Skilled Workforce</span>
                              <p className="text-[10px] text-gray-500 font-medium">Over 20 seasoned custom case binders supervising detail-sensitive alignment folds.</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3 bg-gray-50 border border-gold-500/10 p-2.5 rounded">
                            <span className="w-4 h-4 rounded-full bg-[#CCA45F] text-white font-extrabold text-[9px] flex items-center justify-center shrink-0">
                              ✓
                            </span>
                            <div>
                              <span className="text-xs font-bold text-luxury-black uppercase block">Customization Expertise</span>
                              <p className="text-[10px] text-gray-500 font-medium">We design inserts of high-density EVA, memory foam, fabric pillows, or plastic.</p>
                            </div>
                          </div>

                          <div className="flex items-start space-x-3 bg-gray-50 border border-gold-500/10 p-2.5 rounded">
                            <span className="w-4 h-4 rounded-full bg-[#CCA45F] text-white font-extrabold text-[9px] flex items-center justify-center shrink-0">
                              ✓
                            </span>
                            <div>
                              <span className="text-xs font-bold text-luxury-black uppercase block">Competitive Pricing</span>
                              <p className="text-[10px] text-gray-500 font-medium">Direct B2B wholesale prices ensuring maximum trade margins for Indian distributors.</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-gray-100 flex justify-between items-center mt-4">
                        <span className="text-[8px] text-gray-400 font-mono">B2B Manufacturing Tier-1 Pricing</span>
                        <button
                          onClick={() => handleCatalogInquiry("Portfolio Pricing Advantages")}
                          className="px-2.5 py-1 bg-gray-900 hover:bg-[#4A1D1A] text-white text-[9px] font-extrabold uppercase rounded transition-colors"
                        >
                          Request Price Quotation
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* PAGE 4: Competitive Value & Industries served */}
                {currentPage === 4 && (
                  <div className="grid grid-cols-1 md:grid-cols-2 min-h-[520px] md:min-h-[580px]">
                    {/* Left Column (Why Choose Us) */}
                    <div className="p-6 sm:p-10 flex flex-col justify-between bg-white text-left">
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-mono font-bold tracking-widest text-[#4A1D1A] uppercase">Rigid Box INDIA</span>
                          <span className="text-[9px] bg-[#CCA45F]/15 text-gold-700 px-2.5 py-0.5 rounded font-extrabold">Page 04</span>
                        </div>

                        <div className="space-y-1.5">
                          <span className="text-gray-400 uppercase text-[9px] tracking-widest font-extrabold leading-none block">Corporate Values</span>
                          <h4 className="text-luxury-black font-extrabold text-xl sm:text-2xl tracking-normal uppercase">
                            WHY CHOOSE US ?
                          </h4>
                          <span className="w-12 h-[2px] bg-[#4A1D1A] block"></span>
                        </div>

                        {/* Why choose us 4 elements */}
                        <div className="space-y-3 pt-2">
                          <div className="p-3 bg-gray-50/50 rounded border border-gold-500/10 hover:border-gold-500/30 transition-all">
                            <span className="text-[10px] font-extrabold text-gold-600 uppercase block mb-0.5">No 1. High Quality Materials</span>
                            <p className="text-[10px] text-gray-600 font-semibold leading-relaxed">Dense 100% recycled ESKA/Kappa boards lined with chlorine-free wood-free face liners.</p>
                          </div>

                          <div className="p-3 bg-gray-50/50 rounded border border-gold-500/10 hover:border-gold-500/30 transition-all">
                            <span className="text-[10px] font-extrabold text-gold-600 uppercase block mb-0.5">No 2. Modern Manufacturing</span>
                            <p className="text-[10px] text-gray-600 font-semibold leading-relaxed">Laser-guided board slots, structural corner bonding, heat-cured adhesive lamination.</p>
                          </div>

                          <div className="p-3 bg-gray-50/50 rounded border border-gold-500/10 hover:border-gold-500/30 transition-all">
                            <span className="text-[10px] font-extrabold text-gold-600 uppercase block mb-0.5">No 3. Custom Packaging Solutions</span>
                            <p className="text-[10px] text-gray-600 font-semibold leading-relaxed">From single retail items up to massive complex corporate launch boxes with accessories.</p>
                          </div>

                          <div className="p-3 bg-gray-50/50 rounded border border-gold-500/10 hover:border-gold-500/30 transition-all">
                            <span className="text-[10px] font-extrabold text-gold-600 uppercase block mb-0.5">No 4. Bulk Production Capacity</span>
                            <p className="text-[10px] text-gray-600 font-semibold leading-relaxed">Frictionless supply lines running continuously to ship high volume contract orders securely.</p>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-gray-100 flex justify-between items-center mt-3">
                        <span className="text-[8px] text-gray-400 font-mono">India Bulk Packing License</span>
                        <span className="text-[9px] text-[#4A1D1A] font-extrabold uppercase">Rigid Box INDIA</span>
                      </div>
                    </div>

                    {/* Right Column (Ochre/Gold Accent Panel consistent with Page 4) */}
                    <div className="bg-[#CCA45F] text-white p-6 sm:p-10 flex flex-col justify-between relative overflow-hidden text-left">
                      <div className="absolute top-[10%] left-[5%] opacity-15 text-white/50 font-serif text-5xl font-extrabold uppercase">SERVE</div>
                      
                      <div className="space-y-1">
                        <span className="text-[8px] uppercase tracking-[0.2em] font-extrabold text-white/95 block">Market Verticals</span>
                        <h4 className="text-lg sm:text-xl font-serif font-black tracking-wider uppercase">
                          INDUSTRIES WE SERVE
                        </h4>
                        <div className="w-12 h-1 bg-[#4A1D1A]/50 my-2"></div>
                      </div>

                      {/* Industries serving format matching Page 4 */}
                      <div className="space-y-3 py-4">
                        <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-xs p-2.5 rounded border border-white/10 hover:bg-white/15 transition-colors">
                          <span className="bg-[#4A1D1A] font-extrabold text-[9px] px-2 py-0.5 rounded shadow">
                            No. 1
                          </span>
                          <div>
                            <span className="text-xs font-bold block uppercase tracking-wide">Mobile Accessories Industry</span>
                            <p className="text-[9.5px] text-white/80 font-medium">Earpiece drawers, charge block inserts, glass covers boxes.</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 bg-[#4A1D1A]/25 backdrop-blur-xs p-2.5 rounded border border-white/10 hover:bg-white/15 transition-colors">
                          <span className="bg-[#4A1D1A] font-extrabold text-[9px] px-2 py-0.5 rounded shadow">
                            No. 2
                          </span>
                          <div>
                            <span className="text-xs font-bold block uppercase tracking-wide">Cosmetic Industry</span>
                            <p className="text-[9.5px] text-white/80 font-medium font-semibold">Premium cream jars sets, luxury lipsticks drawers, perfume shoulders.</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 bg-white/10 backdrop-blur-xs p-2.5 rounded border border-white/10 hover:bg-white/15 transition-colors">
                          <span className="bg-[#4A1D1A] font-extrabold text-[9px] px-2 py-0.5 rounded shadow">
                            No. 3
                          </span>
                          <div>
                            <span className="text-xs font-bold block uppercase tracking-wide">Electronics Industry</span>
                            <p className="text-[9.5px] text-white/80 font-medium">Smart wearable boxes, audio deck packaging, magnetic device cases.</p>
                          </div>
                        </div>

                        <div className="flex items-center space-x-3 bg-[#4A1D1A]/25 backdrop-blur-xs p-2.5 rounded border border-white/10 hover:bg-white/15 transition-colors">
                          <span className="bg-[#4A1D1A] font-extrabold text-[9px] px-2 py-0.5 rounded shadow">
                            No. 4
                          </span>
                          <div>
                            <span className="text-xs font-bold block uppercase tracking-wide">Retail Industry</span>
                            <p className="text-[9.5px] text-white/80 font-medium font-semibold">Luxury apparel chests, premium chocolates sets, corporate launch boxes.</p>
                          </div>
                        </div>
                      </div>

                      {/* Watch mockup placeholder represent */}
                      <div 
                        className="rounded border border-white/15 bg-white/5 p-2 flex items-center space-x-3 cursor-zoom-in relative group/img overflow-hidden"
                        onClick={() => setFullscreenImage({ src: bortiveWatchBox, title: "Smart Wearable Custom Design Sample" })}
                        title="Click to view full screen"
                      >
                        <img 
                          src={bortiveWatchBox} 
                          alt="Smart Wearable Box Showcase" 
                          className="w-12 h-12 object-cover rounded shadow-sm border border-white/10" 
                        />
                        <div className="text-left flex-grow">
                          <span className="text-[9px] font-bold block uppercase">Custom Design Sample</span>
                          <span className="text-[8px] text-white/85 text-left block">Bortive® custom matte visual watch lidded display case.</span>
                        </div>
                        {/* Hover zoom badge */}
                        <div className="absolute top-1 right-1 opacity-0 group-hover/img:opacity-100 bg-[#4A1D1A] text-white text-[7px] font-bold px-1 rounded flex items-center space-x-0.5 border border-white/10 transition-opacity">
                          <ZoomIn className="w-2.5 h-2.5" />
                          <span>Fit</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Catalog Print Preview Sheet (Specifically rendered for printing clean pages on Paper/Save to PDF) */}
        <div id="catalog-print-section" className="hidden print:block bg-white text-luxury-black font-sans leading-normal text-[12px] p-8 space-y-12 select-text">
          {/* Cover Spread */}
          <div className="border border-gold-500/10 p-8 h-[297mm] flex flex-col justify-between">
            <div className="text-center">
              <span className="text-xs tracking-[0.3em] font-bold text-gold-650 uppercase">Official Corporate Portfolio</span>
              <h1 className="text-4xl font-serif font-black tracking-widest text-[#4A1D1A] mt-2 mb-1">Rigid Box INDIA</h1>
              <h2 className="text-sm font-bold tracking-[0.15em] text-gold-600 mb-6 uppercase">Premium Custom Luxury Packaging</h2>
              <div className="w-24 h-[1px] bg-gold-400 mx-auto my-4"></div>
            </div>

            <div className="grid grid-cols-2 gap-8 my-8">
              <div className="space-y-4">
                <h3 className="font-extrabold text-[#4A1D1A] border-b border-gold-500/25 pb-2 text-sm">CORPORATE PROFILE &amp; MATRICES</h3>
                <p className="text-gray-700 leading-relaxed text-justify">
                  RigidBox India is the leading custom rigid box manufacturer in India, engineering V-Grooved luxury Greyboard and Kappa board boxes for premium watch brands, electronics, mobile accessories, cosmetics, and cosmetics. Our plant compiles 10,000 units high volume daily using modern packaging machinery, maintaining absolute moisture content levels strictly beneath 8%.
                </p>
                
                <h4 className="font-bold text-xs uppercase tracking-wider text-gold-600">The Quality Lifecycle Loop:</h4>
                <ul className="space-y-1 text-gray-750 text-xs font-semibold">
                  <li>• Consistent Premium Quality Assurance</li>
                  <li>• Use of Best Raw Materials (ESKA/Kappa)</li>
                  <li>• Complete Bespoke Product Customization</li>
                  <li>• Innovative 3D Structural Box Modeling</li>
                  <li>• Standard ISO Manufacturing Process</li>
                  <li>• Round-The-Clock B2B Customer Support</li>
                </ul>
              </div>

              <div className="border border-gold-500/20 rounded p-4 bg-gray-50 flex flex-col justify-between">
                <div>
                  <h4 className="font-bold text-xs uppercase tracking-wider text-gold-700 mb-2">PRODUCT COLLECTIONS</h4>
                  <ul className="space-y-2 font-bold text-xs">
                    <li className="flex justify-between border-b border-gray-200 pb-1.5 text-[#4A1D1A]"><span>1. Premium Rigid Boxes</span> <span>(Moq 200)</span></li>
                    <li className="flex justify-between border-b border-gray-200 pb-1.5"><span>2. Luxury Lidded Gift Cases</span> <span>(Velvet Slots)</span></li>
                    <li className="flex justify-between border-b border-gray-200 pb-1.5 text-[#4A1D1A]"><span>3. Drawers &amp; Slide Sleeve Boxes</span> <span>(Matte)</span></li>
                    <li className="flex justify-between border-b border-gray-200 pb-1.5"><span>4. Shoulder &amp; Neck Accent Boxes</span> <span>(V-groove)</span></li>
                  </ul>
                </div>

                <div className="text-[10px] text-gray-500 space-y-1.5 pt-4.5">
                  <p className="font-bold">Contact Brand Headquarters:</p>
                  <p>📞 Phone Call / WhatsApp: +91 89763 78892 / +91 73043 66479</p>
                  <p>🌐 Official Corporate Site: www.rigidbox.in</p>
                  <p>📍 Location: Mumbai, Maharashtra, India</p>
                </div>
              </div>
            </div>

            <div className="text-center text-xs text-gray-400 font-mono border-t border-gray-100 pt-4">
              RIGID BOX INDIA CORPORATE BROCHURE SPEC SHEET — REVISION v2.4
            </div>
          </div>

          {/* Process Spread */}
          <div className="border border-gold-500/10 p-8 h-[297mm] flex flex-col justify-between">
            <div className="space-y-2 text-left">
              <span className="text-xs uppercase font-extrabold text-gold-650 tracking-widest">Our Engineering Advantage</span>
              <h2 className="text-2xl font-serif font-black tracking-wider text-luxury-black">MANUFACTURING FLOWS &amp; CRITERIA</h2>
              <div className="w-16 h-[2px] bg-[#4A1D1A] mt-2"></div>
            </div>

            <div className="grid grid-cols-2 gap-8 my-6">
              <div className="space-y-4">
                <h3 className="font-extrabold text-[#4A1D1A] border-b pb-1 text-sm uppercase">1. Fabrication Process Phases</h3>
                <div className="space-y-3">
                  <div>
                    <span className="font-bold text-xs text-gold-700 block">Step N° 1 — Design &amp; Development</span>
                    <p className="text-gray-600 text-xs">Accurate CAD structural engineering sizing mockups mapped to custom device weights.</p>
                  </div>
                  <div>
                    <span className="font-bold text-xs text-gold-700 block">Step N° 2 — Material Selection</span>
                    <p className="text-gray-600 text-xs">High-density Eska raw board stocks from 1.2mm up to 2.5mm stiffness thresholds.</p>
                  </div>
                  <div>
                    <span className="font-bold text-xs text-gold-700 block">Step N° 3 — Precision Manufacturing</span>
                    <p className="text-gray-600 text-xs">90° CNC automatic V-groove scoring, corner bonding, and wrapping with premium sheets.</p>
                  </div>
                  <div>
                    <span className="font-bold text-xs text-gold-700 block">Step N° 4 — Quality Checking</span>
                    <p className="text-gray-600 text-xs">Digital hygrometer moisture testing under 8% to ensure no box warping or mold formation.</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-extrabold text-[#4A1D1A] border-b pb-1 text-sm uppercase">2. Key Strategic Strengths</h3>
                <ul className="space-y-2.5 text-xs text-gray-700">
                  <li><strong>• Advanced Machinery Plant:</strong> Operating automatic lamination lines and linear groovers for pristine industrial uniformity.</li>
                  <li><strong>• Customization Expertise:</strong> High-density EVA foam shapes, custom vac-formed plastic inserts, satin pillows dividers.</li>
                  <li><strong>• Bulk Production Capacity:</strong> Continuous factory queues executing B2B bulk orders on strict timelines.</li>
                  <li><strong>• Industries Served:</strong> Luxury Mobile Accessories, High-End Cosmetics, Electronics Wearables, and Premium Retail Brands.</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-100 p-4 rounded text-center border text-[11px] text-[#4A1D1A] font-bold">
              PRE-ARRANGE PILOT BOX SAMPLING AND DISCUSS PRICING WITH TECHNICAL REPRESENTATIVES
            </div>
          </div>
        </div>

      </div>

      {/* Fullscreen fit-to-screen Lightbox Overlay */}
      {fullscreenImage && (
        <div 
          id="global-catalog-fullscreen-lightbox"
          className="fixed inset-0 z-[110] bg-black/95 backdrop-blur-xl flex flex-col items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setFullscreenImage(null)}
        >
          {/* Close button */}
          <button
            onClick={() => setFullscreenImage(null)}
            className="absolute top-6 right-6 p-3 bg-gray-900/80 hover:bg-gold-500 border border-white/15 hover:border-transparent text-white rounded-full transition-all cursor-pointer z-[120] shadow-2xl"
            title="Close image"
          >
            <X className="w-6 h-6" />
          </button>

          {/* Image Container with precise size fit constraints */}
          <div className="relative max-w-5xl w-full max-h-[82vh] md:max-h-[86vh] flex items-center justify-center p-2" onClick={(e) => e.stopPropagation()}>
            <img
              src={fullscreenImage.src}
              alt={fullscreenImage.title}
              className="max-w-full max-h-[82vh] md:max-h-[86vh] h-auto w-auto object-contain rounded-md shadow-2xl select-none"
              referrerPolicy="no-referrer"
            />
          </div>

          {/* Minimalist elegant visual indicators */}
          <div className="mt-4 text-center max-w-xl px-4 pointer-events-none select-none">
            <h4 className="text-xs sm:text-sm font-sans font-extrabold text-white tracking-wider uppercase">
              {fullscreenImage.title}
            </h4>
            <p className="text-[9px] font-mono text-gold-450 mt-1 uppercase tracking-[0.25em] font-bold">
              Rigid Box India Premium Showcase • Click outer backdrop to close
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
