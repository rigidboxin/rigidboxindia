import React from 'react';
import { Smartphone, Sparkles, Gem, Watch, Shirt, Gift, ShoppingCart, Apple } from 'lucide-react';
import { IndustryCard } from '../types';

export default function Industries() {
  const industries: IndustryCard[] = [
    {
      id: 'ind-1',
      title: 'Luxury Brands',
      description: 'Premium boxes for boutique jewelry, designer watches, and limited editions.',
      icon: 'Gem',
      bgGradient: 'from-amber-500/5 to-white'
    },
    {
      id: 'ind-2',
      title: 'Cosmetics & Beauty',
      description: 'High-end branding for perfumes, premium kits, and organic skincare.',
      icon: 'Sparkles',
      bgGradient: 'from-rose-500/5 to-white'
    },
    {
      id: 'ind-3',
      title: 'Electronics',
      description: 'Durable layout packaging for gadgets, smart tech, and audio gear.',
      icon: 'Watch',
      bgGradient: 'from-blue-500/5 to-white'
    },
    {
      id: 'ind-4',
      title: 'Mobile Accessories',
      description: 'Sleek sliding drawer trays for modern cases, chargers, and wearables.',
      icon: 'Smartphone',
      bgGradient: 'from-cyan-500/5 to-white'
    },
    {
      id: 'ind-5',
      title: 'Apparel & Fashion',
      description: 'Oversized luxury apparel packaging with premium soft-matte finishes.',
      icon: 'Shirt',
      bgGradient: 'from-purple-500/5 to-white'
    },
    {
      id: 'ind-6',
      title: 'Corporate Gifting',
      description: 'Custom reward hampers, organizer sleeves, and VIP welcome kits.',
      icon: 'Gift',
      bgGradient: 'from-emerald-500/5 to-white'
    },
    {
      id: 'ind-7',
      title: 'E-commerce Brands',
      description: 'Heavy-duty personalized shipping mailers designed for direct-to-consumer brands.',
      icon: 'ShoppingCart',
      bgGradient: 'from-orange-500/5 to-white'
    }
  ];

  const getIndustryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Smartphone': return <Smartphone className="w-5 h-5 text-gold-600" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-gold-600" />;
      case 'Gem': return <Gem className="w-5 h-5 text-gold-600" />;
      case 'Watch': return <Watch className="w-5 h-5 text-gold-600" />;
      case 'Shirt': return <Shirt className="w-5 h-5 text-gold-600" />;
      case 'Gift': return <Gift className="w-5 h-5 text-gold-600" />;
      case 'ShoppingCart': return <ShoppingCart className="w-5 h-5 text-gold-600" />;
      default: return <Sparkles className="w-5 h-5 text-gold-600" />;
    }
  };

  return (
    <section id="industries" className="py-6 sm:py-8 bg-gray-50 relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(197,155,39,0.02),transparent_50%)]" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-4 space-y-1.5">
          <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-gold-600 uppercase block">
            Custom Target Sectors
          </span>
          <h2 className="font-sans text-xl sm:text-2xl text-luxury-black font-extrabold tracking-tight">
            Industries We Serve Across India
          </h2>
          <p className="text-xs text-gray-550 font-medium max-w-xl mx-auto leading-normal">
            Our luxury packaging is designed in tandem with high-end brand identities. We craft tailormade solutions customized to individual product specifications.
          </p>
        </div>

        {/* Single-line Minimalist Horizontal Track */}
        <div className="flex overflow-x-auto md:grid md:grid-cols-7 gap-4 pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-gold-500/20 scrollbar-track-transparent">
          {industries.map((ind) => {
            return (
              <div
                id={`industry-bento-${ind.id}`}
                key={ind.id}
                className={`flex-shrink-0 w-[170px] md:w-auto p-3.5 bg-gradient-to-br ${ind.bgGradient} border border-gold-500/10 hover:border-gold-500/25 rounded-lg flex flex-col justify-between group transition-all duration-300 hover:shadow-xs snap-start select-none text-left`}
              >
                <div>
                  {/* Icon and Accent circle */}
                  <div className="w-8 h-8 rounded-full bg-white border border-gold-500/15 flex items-center justify-center mb-2.5 duration-300 shadow-xs">
                    {getIndustryIcon(ind.icon)}
                  </div>

                  <h3 className="font-sans text-[11px] text-luxury-black font-extrabold tracking-tight mb-1">
                    {ind.title}
                  </h3>
                  <p className="text-[10px] text-gray-500 leading-normal font-medium">
                    {ind.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
