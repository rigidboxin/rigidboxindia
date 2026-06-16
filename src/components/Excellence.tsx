import React, { useState } from 'react';
import { Layers, Activity, ClipboardCheck, Sparkles, Server, Truck, ShieldAlert } from 'lucide-react';
import { ExcellenceStep } from '../types';

export default function Excellence() {
  const [activeStep, setActiveStep] = useState(0);

  const steps: ExcellenceStep[] = [
    {
      id: 0,
      title: 'Premium Raw Material Sourcing',
      subtitle: 'Premium Kappa Boards & Cover Papers',
      icon: 'Layers',
      description: 'We source high-density recycled greyboards (Kappa board) that offer perfect flat surface layouts and strict structural deflection resistance. Cover papers are selected from international luxury textured cardstocks.'
    },
    {
      id: 1,
      title: 'Precision Craft Manufacturing',
      subtitle: '90-Degree V-Groove Cutting & Sizing',
      icon: 'Activity',
      description: 'Using high-speed automated V-Grooving machines, we etch precise clean grooves into the kappa board core. This secures sharp 90-degree outer corners, removing the ugly curved profiles seen on lower-tier packaging.'
    },
    {
      id: 2,
      title: 'Continuous Quality Inspection',
      subtitle: 'Strict Bonding & Shear Tests',
      icon: 'ClipboardCheck',
      description: 'Our in-house QA technicians run continuous inspection checks. We verify adhesive curing states, moisture content tolerances (maintained strictly beneath 8%), and conduct drop-testing to guarantee robustness under stress.'
    },
    {
      id: 3,
      title: 'Custom Finishes & Foils',
      subtitle: 'Hot Gold Foiling & Spot UV Accents',
      icon: 'Sparkles',
      description: 'The exterior covers are embellished using precision hydraulic foil stampers and state-of-the-art lamination rolls. We support spot ultraviolet textures, deep embossed tactile seals, and silk screen printing.'
    },
    {
      id: 4,
      title: 'Large-scale Capacity Scaling',
      subtitle: 'High Output Production Machinery',
      icon: 'Server',
      description: 'Our factory utilizes high-efficiency production lines capable of outputting over 10,000 finished rigid boxes daily, letting us execute high-volume contracts for leading corporate brands across India easily.'
    },
    {
      id: 5,
      title: 'Protected Timely Delivery',
      subtitle: 'Secure Multi-layer Bubble Wrap Shipping',
      icon: 'Truck',
      description: 'Every completed product batch is vacuum packed, protected with multi-layer bubble wrap shields, and loaded into reinforced shipping master cartons. We coordinate delivery directly to your distribution center on schedule.'
    }
  ];

  const getStepIcon = (iconName: string) => {
    switch (iconName) {
      case 'Layers': return <Layers className="w-5 h-5" />;
      case 'Activity': return <Activity className="w-5 h-5" />;
      case 'ClipboardCheck': return <ClipboardCheck className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Server': return <Server className="w-5 h-5" />;
      case 'Truck': return <Truck className="w-5 h-5" />;
      default: return <Sparkles className="w-5 h-5" />;
    }
  };

  return (
    <section id="excellence" className="py-6 sm:py-8 bg-white relative overflow-hidden">
      <div className="absolute top-1/4 left-10 w-72 h-72 bg-gold-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5 space-y-1.5">
          <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-gold-600 uppercase block">
            Industrial Superiority
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl text-luxury-black font-extrabold tracking-tight">
            Manufacturing Excellence &amp; Workflow
          </h2>
          <p className="text-xs text-gray-550 font-medium">
            Behind every beautiful rigid box is an intricate engineering workflow. Explore how our skilled team uses advanced machinery to finalize luxury packaging.
          </p>
        </div>

        {/* Desktop Split Step Explorer Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch mt-6">
          
          {/* Navigation Steps Buttons - Column: 5 */}
          <div className="lg:col-span-5 flex flex-col justify-start space-y-1.5">
            {steps.map((st, idx) => (
              <button
                id={`excellence-step-btn-${idx}`}
                key={st.id}
                onClick={() => setActiveStep(idx)}
                className={`w-full p-2 rounded border text-left flex items-center space-x-2.5 transition-all duration-300 cursor-pointer ${
                  activeStep === idx
                    ? 'bg-gold-500/5 border-gold-500 text-gold-600 scale-[1.01] shadow-sm'
                    : 'bg-white border-gold-500/10 text-gray-700 hover:border-gold-500/20 hover:text-luxury-black shadow-2xs'
                }`}
              >
                <div className={`p-2 rounded ${activeStep === idx ? 'bg-gold-500 text-white font-bold' : 'bg-gray-50 text-gold-500/80'} transition-colors duration-300`}>
                  {getStepIcon(st.icon)}
                </div>
                <div>
                  <span className="text-[9px] font-mono block text-gold-600 uppercase tracking-widest leading-none font-semibold mb-0.5">
                    STEP 0{idx + 1}
                  </span>
                  <span className={`text-[11px] sm:text-xs font-bold tracking-wide ${activeStep === idx ? 'text-luxury-black' : 'text-gray-750'}`}>
                    {st.title}
                  </span>
                </div>
              </button>
            ))}
          </div>

          {/* Interactive Screen - Column: 7 */}
          <div className="lg:col-span-7 bg-white border border-gold-500/15 rounded-lg p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden shadow-sm">
            {/* Ambient vector blueprint backing */}
            <div className="absolute top-0 right-0 w-48 h-48 border-b border-l border-gold-500/5 rounded-bl-full pointer-events-none" />
            
            <div className="space-y-4 relative z-10 text-left">
              <div className="flex justify-end items-start">
                <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-gold-600 bg-gold-400/5 border border-gold-400/20 px-2 py-0.5 rounded inline-block">
                  Verified Standard
                </span>
              </div>

              <div className="space-y-2">
                <h3 className="font-sans text-xs sm:text-sm text-luxury-black font-extrabold">
                  {steps[activeStep].title}
                </h3>
                <h4 className="text-[10px] text-gold-600 font-bold uppercase tracking-widest">
                  {steps[activeStep].subtitle}
                </h4>
              </div>

              <p className="text-gray-600 text-xs font-semibold leading-relaxed">
                {steps[activeStep].description}
              </p>
            </div>

            {/* In View quality micro checklist footer */}
            <div className="pt-4 border-t border-gold-500/15 mt-4 grid grid-cols-2 gap-2 relative z-10 text-[10px] text-gray-500 font-medium text-left">
              <div className="flex items-center space-x-1.5">
                <span className="text-gold-500 font-extrabold text-[12px]">✔</span>
                <span>
                  <strong className="font-serif font-bold italic text-gold-700 tracking-wide border-b border-gold-500/20 pb-0.5 mr-1.5 inline-block hover:text-gold-600 transition-colors">Moisture Analysis</strong>
                  <span className="text-gray-500 ml-1">Verified</span>
                </span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="text-gold-500 font-extrabold text-[12px]">✔</span>
                <span>
                  <strong className="font-serif font-bold italic text-gold-700 tracking-wide border-b border-gold-500/20 pb-0.5 mr-1.5 inline-block hover:text-gold-600 transition-colors">90° Perfect</strong>
                  <span className="text-gray-500 ml-1">V-Grooves</span>
                </span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="text-gold-500 font-extrabold text-[12px]">✔</span>
                <span>
                  <strong className="font-serif font-bold italic text-gold-700 tracking-wide border-b border-gold-500/20 pb-0.5 mr-1.5 inline-block hover:text-gold-600 transition-colors">ISO Raw Materials</strong>
                  <span className="text-gray-500 ml-1">Only</span>
                </span>
              </div>
              <div className="flex items-center space-x-1.5">
                <span className="text-gold-500 font-extrabold text-[12px]">✔</span>
                <span>
                  <strong className="font-serif font-bold italic text-gold-700 tracking-wide border-b border-gold-500/20 pb-0.5 mr-1.5 inline-block hover:text-gold-600 transition-colors">Vacuum Cured</strong>
                  <span className="text-gray-500 ml-1">Adhesives</span>
                </span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
