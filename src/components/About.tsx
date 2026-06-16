import React from 'react';
import { ShieldCheck, Ruler, Truck, Sparkles } from 'lucide-react';

export default function About() {
  const values = [
    {
      icon: <Sparkles className="w-5 h-5 text-gold-500" />,
      title: 'Quality Craftsmanship',
      desc: 'Meticulous corner pasting and exact alignment ensure a premium unboxing.'
    },
    {
      icon: <Ruler className="w-5 h-5 text-gold-500" />,
      title: 'Full Customization',
      desc: 'Bespoke finishes, custom textures, and custom cavity insert layouts.'
    },
    {
      icon: <ShieldCheck className="w-5 h-5 text-gold-500" />,
      title: 'Structurally Durable',
      desc: 'Heavy-duty Kappa Board (1.2mm - 3mm) for retail and transit strength.'
    },
    {
      icon: <Truck className="w-5 h-5 text-gold-500" />,
      title: 'Timely Delivery',
      desc: 'Optimized production workflows guarantee reliable supply chains nationwide.'
    }
  ];

  return (
    <section id="about" className="py-6 sm:py-8 bg-white relative overflow-hidden">
      {/* Subtle details */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(ellipse_at_top_right,rgba(197,155,39,0.03),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-center">
          
          {/* Left Column editorial text */}
          <div className="lg:col-span-6 space-y-5 animate-fade-in">
            <div className="space-y-2">
              <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-gold-600 uppercase block">
                The Heritage of Presentation
              </span>
              <h2 className="font-sans text-xl sm:text-2xl text-luxury-black font-extrabold tracking-tight">
                Crafting Custom Packaging <br className="hidden sm:block" />
                <span className="font-serif font-light italic text-gold-600">That Elevates Your Brand Value</span>
              </h2>
            </div>

            <div className="space-y-2 text-gray-750 text-xs sm:text-sm font-medium leading-relaxed">
              <p className="border-l-2 border-gold-500 pl-4 italic text-gold-700 bg-gold-50/50 py-1 pr-2 rounded-r">
                “A premium product deserves an unforgettable unboxing experience. The packaging is the first point of tactile contact with your brand.”
              </p>
              <p>
                <strong>Rigid Box India</strong> specializes in manufacturing premium rigid boxes, kappa board boxes, and luxury packaging solutions designed to elevate brand value and product presentation.
              </p>
              <p className="text-gray-550 leading-relaxed font-normal">
                From premium cosmetics, corporate gifting, high-performance electronics to sophisticated apparel packaging, our professional workflows integrate heavy-duty durability with breathtaking structural layouts. Whether based in Mumbai, Delhi, Bangalore, or remote trade hubs, businesses across India trust us for error-free packaging supply chains.
              </p>
            </div>

            {/* In-view micro stats info cards */}
            <div className="pt-4 max-w-xs">
              <div className="p-4 bg-gray-50 border border-gold-500/10 rounded-sm text-center sm:text-left">
                <span className="block text-2xl sm:text-3xl font-sans text-luxury-black font-extrabold">1.2mm - 3mm</span>
                <span className="block text-[10px] text-gray-500 uppercase tracking-widest font-semibold mt-1">Board Thickness</span>
              </div>
            </div>
          </div>

          {/* Right Column Value Pillar card grid */}
          <div className="lg:col-span-6 select-none relative">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {values.map((v, i) => (
                <div
                  id={`value-card-${i}`}
                  key={i}
                  className="p-4 bg-white border border-gold-500/10 rounded-lg shadow-sm relative flex items-start space-x-3 transition-all duration-300 hover:border-gold-500/30 hover:-translate-y-1 hover:shadow-md group"
                >
                  {/* Decorative faint glow */}
                  <div className="absolute top-0 right-0 w-12 h-12 bg-gradient-to-bl from-gold-500/5 to-transparent rounded-tr-lg" />
                  
                  {/* Icon wrap with golden outer rim */}
                  <div className="w-9 h-9 shrink-0 rounded-lg bg-gold-500/5 border border-gold-500/15 flex items-center justify-center text-gold-500 group-hover:bg-gold-500 group-hover:border-gold-500 group-hover:text-white duration-300 shadow-exs">
                    {v.icon}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-sans text-xs sm:text-sm text-luxury-black font-extrabold tracking-wide mb-1 leading-snug">
                      {v.title}
                    </h3>
                    <p className="text-[10.5px] text-gray-550 leading-relaxed font-medium">
                      {v.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Elegant framing quote backdrop */}
            <div className="hidden lg:block absolute -right-6 -bottom-10 text-[10rem] font-sans font-black text-gold-500/5 leading-none pointer-events-none select-none">
              RBI
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
