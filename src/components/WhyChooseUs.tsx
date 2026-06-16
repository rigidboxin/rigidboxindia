import React from 'react';
import { Award, Coins, Scale, Clock, ShieldCheck, HeartHandshake, Truck, Sparkles } from 'lucide-react';

export default function WhyChooseUs() {
  const reasons = [
    {
      id: 'reason-price',
      icon: <Coins className="w-6 h-6 text-gold-500" />,
      title: 'Affordable Price',
      badge: 'Direct Factory',
      desc: 'By eliminating all middlemen and operating our own direct manufacturing facilities in India, we guarantee premium quality custom boxes at the most competitive wholesale price points in the industry.'
    },
    {
      id: 'reason-delivery',
      icon: <Truck className="w-6 h-6 text-gold-500" />,
      title: 'Fast Delivery',
      badge: 'Rapid Turnaround',
      desc: 'With state-of-the-art automated grooving tables and efficient production scheduling, we fulfill bulk orders swiftly, coupled with express shipping channels to ensure on-time doorstep delivery across India.'
    },
    {
      id: 'reason-materials',
      icon: <Award className="w-6 h-6 text-gold-500" />,
      title: 'High Quality Materials',
      badge: 'Zero Compromise',
      desc: 'We construct each box using ultra-dense 2.5mm heavy-gauge Kappa core boards, eco-friendly high-bond starches, and luxury paper wrap finishes ensuring structural resilience and sensory perfection during unboxing.'
    }
  ];

  return (
    <section id="why-choose-us" className="py-12 sm:py-16 bg-white relative overflow-hidden">
      {/* Decorative premium ambient gradients */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-[radial-gradient(circle_at_top_left,rgba(188,150,81,0.03),transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[radial-gradient(circle_at_bottom_right,rgba(188,150,81,0.04),transparent_70%)] pointer-events-none" />

      {/* Thin elegant horizontal line breaks */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold-500/10 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 space-y-2" id="why-choose-us-header">
          <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-gold-600 uppercase block">
            Why Partner With Us
          </span>
          <h2 className="font-sans text-2xl sm:text-3.5xl text-luxury-black font-extrabold tracking-tight">
            Setting the Standard in Bespoke <br />
            <span className="font-serif font-light italic text-gold-600 text-xl sm:text-2xl">Rigid Packaging Systems</span>
          </h2>
          <p className="text-xs sm:text-sm text-gray-550 leading-relaxed font-normal max-w-2xl mx-auto">
            We merge premium physical materials with state-of-the-art machinery to create stunning, durable packaging assets that represent your brand with absolute luxury and durability.
          </p>
        </div>

        {/* Feature Grid with Luxury Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto" id="why-choose-us-grid">
          {reasons.map((item, index) => (
            <div
              id={item.id}
              key={item.id}
              className="bg-gray-50/60 border border-gold-500/10 rounded-xl p-6 relative flex flex-col items-start transition-all duration-300 hover:border-gold-500/30 hover:bg-white hover:-translate-y-1 hover:shadow-md group shadow-exs"
            >
              <div className="flex items-center justify-between w-full mb-4.5">
                {/* Golden Icon Container */}
                <div className="w-11 h-11 shrink-0 rounded-xl bg-gold-500/5 border border-gold-500/15 flex items-center justify-center transition-colors duration-300 group-hover:bg-gold-500 group-hover:border-gold-500 group-hover:text-white text-gold-500 shadow-exs">
                  {item.icon}
                </div>
                
                {/* Micro-badge accent */}
                <span className="text-[9px] font-sans tracking-wider font-extrabold text-gold-600/80 bg-gold-500/5 px-2 py-0.5 rounded border border-gold-500/10">
                  {item.badge}
                </span>
              </div>

              {/* Details Content */}
              <div className="flex-1 min-w-0">
                {/* Card Title */}
                <h3 className="font-sans text-sm sm:text-base text-luxury-black font-extrabold tracking-wide mb-2 leading-snug">
                  {item.title}
                </h3>

                {/* Card Description */}
                <p className="text-xs text-gray-550 leading-relaxed font-medium">
                  {item.desc}
                </p>
              </div>

              {/* Decorative Subtle Overlay Border Hint */}
              <div className="absolute right-4 bottom-4 text-gold-500/5 text-3xl font-sans font-black select-none leading-none opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                0{index + 1}
              </div>
            </div>
          ))}
        </div>

        {/* Fast Action Trust Callout Box */}
        <div 
          id="why-choose-us-callout"
          className="mt-10 bg-gradient-to-r from-luxury-black/95 to-luxury-black border border-gold-500/20 rounded-xl p-5 sm:p-6 text-white relative overflow-hidden shadow-md select-none"
        >
          {/* Subtle Golden Pattern Background Ring */}
          <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-[radial-gradient(circle_at_right,rgba(197,155,39,0.06),transparent_80%)] pointer-events-none" />
          
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 relative z-10 font-sans">
            <div className="space-y-1">
              <span className="text-[9px] text-gold-500 uppercase tracking-widest font-extrabold block">
                RIGID BOX INDIA ASSURANCE
              </span>
              <h3 className="text-base font-extrabold text-white tracking-wide">
                Ready to transform your brand unboxing presentation?
              </h3>
              <p className="text-[11px] text-gray-400 font-medium max-w-lg">
                Get custom specifications, instant calculated rates, and continuous physical guidance from a dedicated package architect today.
              </p>
            </div>
            
            <div>
              <a
                href="#contact"
                className="inline-flex items-center justify-center px-4.5 py-2.5 bg-gold-500 hover:bg-gold-600 active:bg-gold-700 text-white font-bold text-xs uppercase tracking-wider rounded transition-all duration-200 shadow-sm"
                onClick={(e) => {
                  e.preventDefault();
                  const target = document.getElementById('contact');
                  if (target) {
                    target.scrollIntoView({ behavior: 'smooth' });
                  }
                }}
              >
                Inquire Instantly
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
