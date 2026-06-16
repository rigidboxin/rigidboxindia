import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, Map, CheckCircle, ExternalLink, MessageSquare, Instagram } from 'lucide-react';
import { LeadInquiry, BoxConfig } from '../types';

interface ContactProps {
  initialRequirement: string;
  initialConfig?: BoxConfig;
  onClearRequirementAndConfig: () => void;
  onSubmitInquiry: (lead: LeadInquiry) => void;
}

export default function Contact({ initialRequirement, initialConfig, onClearRequirementAndConfig, onSubmitInquiry }: ContactProps) {
  // Main form state
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    phone: '',
    email: '',
    requirement: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [activeMap, setActiveMap] = useState<'corporate' | 'factory'>('corporate');

  // Sync incoming requirement trigger props (e.g., from product catalog select or advisor customizer)
  useEffect(() => {
    if (initialRequirement) {
      setFormData(prev => ({
        ...prev,
        requirement: initialRequirement
      }));
    }
  }, [initialRequirement]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.email) {
      alert('Please fill out Name, Phone Number, and Email fields to request a quote.');
      return;
    }

    setIsSubmitting(true);

    // Simulate sending with a realistic delay, then store in local base
    setTimeout(() => {
      const newLead: LeadInquiry = {
        id: 'lead-' + Date.now(),
        name: formData.name,
        companyName: formData.companyName || 'Independant Brand',
        phone: formData.phone,
        email: formData.email,
        requirement: formData.requirement || 'Standard Rigid Boxes',
        message: formData.message || 'Looking to discuss dimensions and MOQs.',
        config: initialConfig || undefined,
        status: 'new',
        createdAt: new Date().toISOString()
      };

      // Push to localStorage
      const existingLeadsRaw = localStorage.getItem('rigid_box_india_leads');
      const existingLeads: LeadInquiry[] = existingLeadsRaw ? JSON.parse(existingLeadsRaw) : [];
      existingLeads.unshift(newLead);
      localStorage.setItem('rigid_box_india_leads', JSON.stringify(existingLeads));

      // Propagate state upwards
      onSubmitInquiry(newLead);

      setIsSubmitting(false);
      setSubmitted(true);
      onClearRequirementAndConfig();

      // Clear local states
      setFormData({
        name: '',
        companyName: '',
        phone: '',
        email: '',
        requirement: '',
        message: ''
      });
    }, 1200);
  };

  const corporateMapUrl = "https://maps.google.com/?q=Office+No+2205+22nd+Floor+One+World+By+Sanjar+Swami+Vivekanand+Road+Mumbai+400064";
  const factoryMapUrl = "https://maps.google.com/?q=Mahadev+Industrial+Park+Vasai+Road+Karivali+Village+421302";

  return (
    <section id="contact" className="py-6 sm:py-8 bg-gray-50 relative">
      <div className="absolute top-0 left-0 w-80 h-80 bg-[radial-gradient(ellipse_at_top_left,rgba(197,155,39,0.04),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full font-sans">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-5 space-y-1.5">
          <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-gold-600 uppercase block">
            Initiate Contact
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl text-luxury-black font-extrabold tracking-tight">
            Request a Free Quote
          </h2>
          <p className="text-xs text-gray-550 font-semibold leading-normal">
            Fill out the requirement form below to receive a custom CAD layout and pricing breakdown, or talk directly on corporate channels.
          </p>
        </div>

        {/* Contact Split Columns Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start mt-6">
          
          {/* Columns 1-5: Addresses, Contact Details & Google Map simulation link */}
          <div className="lg:col-span-5 space-y-4 select-none">
            
            {/* Direct Hotlines Panel */}
            <div className="p-4 sm:p-5 bg-white border border-gold-500/15 rounded-lg space-y-3 shadow-sm">
              <h3 className="font-sans text-sm text-luxury-black font-bold">Contact</h3>
              
              <div className="space-y-4 text-xs font-medium">
                <div className="flex items-start space-x-3.5 text-gray-700">
                  <div className="p-2 bg-gray-50 text-gold-600 rounded border border-gold-500/15 shrink-0 mt-1">
                    <Phone className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider leading-none mb-1.5 pt-1">Contact</span>
                    <div className="flex flex-col space-y-1">
                      <a href="tel:+918976378892" className="text-sm font-bold text-luxury-black hover:text-gold-600 duration-150 block">
                        +91 89763 78892
                      </a>
                      <a href="tel:+917304366479" className="text-sm font-bold text-luxury-black hover:text-gold-600 duration-150 block">
                        +91 73043 66479
                      </a>
                    </div>
                  </div>
                </div>

                <a href="https://www.instagram.com/rigidboxin/" target="_blank" rel="noopener noreferrer" className="flex items-center space-x-3.5 text-gray-700 hover:text-gold-600 duration-200">
                  <div className="p-2 bg-gray-50 text-gold-600 rounded border border-gold-500/15">
                    <Instagram className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="text-sm font-bold text-luxury-black">@rigidboxin</span>
                  </div>
                </a>

                <a href="mailto:rigidboxin@gmail.com" className="flex items-center space-x-3.5 text-gray-700 hover:text-gold-600 duration-200">
                  <div className="p-2 bg-gray-50 text-gold-600 rounded border border-gold-500/15">
                    <Mail className="w-4.5 h-4.5" />
                  </div>
                  <div>
                    <span className="block text-[10px] text-gray-400 uppercase font-bold tracking-wider leading-none mb-1">Send Email Proposal</span>
                    <span className="text-sm font-bold text-luxury-black select-text">rigidboxin@gmail.com</span>
                  </div>
                </a>
              </div>
            </div>

            {/* Address cards with integrated vector layout coordinates toggle */}
            <div className="p-6 bg-white border border-gold-500/15 rounded-xl space-y-4 shadow-sm">
              <div className="flex justify-between items-center pb-2 border-b border-gold-500/15">
                <h3 className="font-sans text-lg text-luxury-black font-extrabold text-left">Our Locations</h3>
                
                {/* Visual Toggle Buttons */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => setActiveMap('corporate')}
                    className={`px-3 py-1 text-[9px] uppercase font-bold tracking-widest rounded transition-all cursor-pointer ${
                      activeMap === 'corporate' ? 'bg-gold-500 text-white font-bold' : 'bg-gray-50 text-gray-600 hover:text-luxury-black'
                    }`}
                  >
                    Office
                  </button>
                  <button
                    onClick={() => setActiveMap('factory')}
                    className={`px-3 py-1 text-[9px] uppercase font-bold tracking-widest rounded transition-all cursor-pointer ${
                      activeMap === 'factory' ? 'bg-gold-500 text-white font-bold' : 'bg-gray-50 text-gray-600 hover:text-luxury-black'
                    }`}
                  >
                    Factory
                  </button>
                </div>
              </div>

              {/* Dynamic location print */}
              {activeMap === 'corporate' ? (
                <div className="space-y-3.5 text-xs leading-relaxed text-left">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gold-650 mt-1 shrink-0 font-bold" />
                    <div>
                      <span className="font-bold text-luxury-black font-sans block text-sm">Corporate Office</span>
                      <p className="text-gray-600 font-semibold mt-1 select-text leading-relaxed">
                        <strong>Rigid Box India</strong><br />
                        Office No. 2205, 22nd Floor,<br />
                        One World By Sanjar, Swami Vivekanand Road,<br />
                        Near N.L. College, Mumbai – 400064
                      </p>
                    </div>
                  </div>
                  
                  <a
                    href={corporateMapUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="inline-flex items-center space-x-2 text-xs text-gold-600 hover:text-gold-850 font-bold tracking-widest uppercase pt-2 duration-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Map</span>
                  </a>
                </div>
              ) : (
                <div className="space-y-3.5 text-xs leading-relaxed text-left">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-gold-650 mt-1 shrink-0 font-bold" />
                    <div>
                      <span className="font-bold text-luxury-black font-sans block text-sm">Factory</span>
                      <p className="text-gray-600 font-semibold mt-1 select-text leading-relaxed">
                        <strong>Rigid Box India</strong><br />
                        Mahadev Industrial Park,<br />
                        Vasai Road, Karivali Village,<br />
                        Maharashtra – 421302
                      </p>
                    </div>
                  </div>
                  
                  <a
                    href={factoryMapUrl}
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="inline-flex items-center space-x-2 text-xs text-gold-600 hover:text-gold-850 font-bold tracking-widest uppercase pt-2 duration-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>Open Map</span>
                  </a>
                </div>
              )}

              {/* Simulated Map Coordinates Canvas Graphics */}
              <div className="w-full h-36 bg-gray-50 border border-gold-500/15 rounded relative overflow-hidden mt-4 flex items-center justify-center">
                {/* Architectural blueprint lines */}
                <div className="absolute inset-0 bg-[linear-gradient(rgba(197,155,39,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(197,155,39,0.015)_1px,transparent_1px)] bg-[size:16px_16px]" />
                <div className="absolute w-24 h-24 border border-gold-500/20 rounded-full animate-ping pointer-events-none" />
                
                {/* Styled Center Point */}
                <div className="relative flex flex-col items-center">
                  <div className="w-8 h-8 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-500">
                    <Map className="w-4 h-4 animate-bounce" />
                  </div>
                  <span className="text-[9px] font-mono font-bold text-gold-600 mt-1 uppercase tracking-widest bg-white border border-gold-500/25 px-2 py-0.5 rounded shadow-sm">
                    {activeMap === 'corporate' ? 'Mumbai Office' : 'Manufacturing Factory'}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Columns 6-12: The Quote Request Form */}
          <div className="lg:col-span-7 bg-white border border-gold-500/15 rounded-xl p-6 sm:p-10 shadow-sm">
            
            {submitted ? (
              <div id="contact-success" className="text-center py-12 space-y-6">
                <div className="w-16 h-16 bg-gold-500/10 border border-gold-500 text-gold-600 rounded-full flex items-center justify-center mx-auto">
                  <CheckCircle className="w-9 h-9" />
                </div>
                <div className="space-y-2">
                  <h3 className="font-sans text-2xl text-luxury-black font-extrabold">Quote Request Received!</h3>
                  <p className="text-xs sm:text-sm text-gray-600 font-medium max-w-md mx-auto leading-relaxed">
                    Thank you. Your request specifications have been verified and logged into our queue. Our design engineering team will reach out shortly.
                  </p>
                </div>

                {/* Micro inquiry data breakdown receipt */}
                <div className="p-4 bg-gray-50 rounded border border-gold-500/15 text-xs text-left max-w-md mx-auto">
                  <span className="text-gold-600 font-bold block mb-2 uppercase tracking-widest text-[10px]">Logged Specs</span>
                  <p className="text-gray-500 font-mono text-[10px] leading-relaxed break-words font-semibold">
                    ID: RBI-{Date.now().toString().slice(-6)} | State: ACTIVE L1 PROTOCOL
                  </p>
                </div>

                <div className="pt-4 flex justify-center space-x-3">
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2 bg-gray-50 text-luxury-black hover:text-gold-600 text-xs font-semibold uppercase tracking-widest border border-gold-500/15 hover:border-gold-500/30 rounded transition-all cursor-pointer"
                  >
                    Send Another Request
                  </button>
                  <a
                    href="https://wa.me/918976378892"
                    target="_blank"
                    referrerPolicy="no-referrer"
                    className="px-6 py-2 bg-emerald-600 text-white hover:bg-emerald-500 text-xs font-semibold uppercase tracking-widest rounded transition-all flex items-center space-x-2"
                  >
                    <span>Chat on WhatsApp</span>
                  </a>
                </div>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-6 text-left">
                
                {/* Form Intro */}
                <div className="border-b border-gold-500/15 pb-4">
                  <h3 className="font-sans text-lg text-luxury-black font-extrabold">Requirement Specifications Form</h3>
                  <p className="text-xs text-gray-500 mt-1 font-medium">
                    *Complete Name, Email, and Phone fields to transmit your inquiry to our system.
                  </p>
                </div>

                {/* Configurator Inject Indicator */}
                {initialConfig && (
                  <div className="p-3.5 bg-gold-500/5 border border-gold-500/30 rounded flex items-start space-x-3 text-[11px] text-gold-600">
                    <span className="text-gold-500 text-base">✨</span>
                    <div>
                      <span className="font-bold uppercase tracking-wider block">Advisor Specs Injected:</span>
                      <p className="text-gray-700 font-mono mt-0.5 max-w-lg leading-relaxed font-semibold">
                        Format: {initialConfig.type} | Size: {initialConfig.length}x{initialConfig.width}x{initialConfig.height}mm | Qty: {initialConfig.quantity}
                      </p>
                      <button
                        onClick={onClearRequirementAndConfig}
                        className="text-[10px] text-red-400 font-semibold uppercase mt-1.5 underline underline-offset-2 tracking-wider"
                      >
                        Reset Config Customizer Data
                      </button>
                    </div>
                  </div>
                )}

                {/* Double input grids */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-600 block font-bold">Your Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="e.g. Rahul Sharma"
                      className="w-full p-2.5 bg-gray-50 border border-gold-500/15 hover:border-gold-500/35 text-xs text-luxury-black font-semibold rounded-sm focus:outline-none focus:border-gold-500 focus:bg-white"
                    />
                  </div>

                  {/* Company Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-600 block font-bold">Company Name (Optional)</label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      placeholder="e.g. Aura Cosmetics Pvt Ltd"
                      className="w-full p-2.5 bg-gray-50 border border-gold-500/15 hover:border-gold-500/35 text-xs text-luxury-black font-semibold rounded-sm focus:outline-none focus:border-gold-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Phone Num */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-600 block font-bold">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. +91 98765 43210"
                      className="w-full p-2.5 bg-gray-50 border border-gold-500/15 hover:border-gold-500/35 text-xs text-luxury-black font-semibold rounded-sm focus:outline-none focus:border-gold-500 focus:bg-white"
                    />
                  </div>

                  {/* Email address */}
                  <div className="space-y-1.5">
                    <label className="text-xs text-gray-600 block font-bold">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="e.g. rsharma@aura.com"
                      className="w-full p-2.5 bg-gray-50 border border-gold-500/15 hover:border-gold-500/35 text-xs text-luxury-black font-semibold rounded-sm focus:outline-none focus:border-gold-500 focus:bg-white"
                    />
                  </div>
                </div>

                {/* Packaging Requirement Spec line (Auto populated by advisor or catalog select) */}
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-600 block font-bold">Packaging Requirement Overview</label>
                  <input
                    id="requirement-field"
                    type="text"
                    name="requirement"
                    value={formData.requirement}
                    onChange={handleInputChange}
                    placeholder="e.g. Customized Magnetic Flap box for Luxury Jewelry (Size 150x150x50mm)"
                    className="w-full p-2.5 bg-gray-50 border border-gold-500/15 hover:border-gold-500/35 text-xs text-luxury-black font-bold rounded-sm focus:outline-none focus:border-gold-500 focus:bg-white"
                  />
                  <p className="text-[10px] text-gray-500 leading-none font-semibold">
                    Select any product card above or use the Box Advisor Configurator tool to populate this quickly.
                  </p>
                </div>

                {/* Detailed messages */}
                <div className="space-y-1.5">
                  <label className="text-xs text-gray-600 block font-bold">Custom Message / Tolerances &amp; Timeline</label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Describe your design specifications, estimated launch timeline, custom print choices, and bulk shipping destinations."
                    className="w-full p-2.5 bg-gray-50 border border-gold-500/15 hover:border-gold-500/35 text-xs text-luxury-black font-semibold rounded-sm focus:outline-none focus:border-gold-500 focus:bg-white resize-none"
                  />
                </div>

                {/* CTA Submit Button */}
                <button
                  id="contact-form-submit"
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 bg-gradient-to-r from-gold-600 to-gold-500 hover:from-gold-500 hover:to-gold-400 disabled:from-charcoal disabled:to-charcoal text-white font-extrabold text-xs uppercase tracking-widest rounded-sm transition-all duration-300 flex items-center justify-center space-x-2 shadow-md cursor-pointer disabled:text-gray-500 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin"></div>
                      <span>Verifying Proposal Specifications...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-white" />
                      <span>Transmit Request for Free Quote</span>
                    </>
                  )}
                </button>
              </form>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
