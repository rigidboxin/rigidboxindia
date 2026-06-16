import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import WhyChooseUs from './components/WhyChooseUs';
import Products from './components/Products';
import Advisor from './components/Advisor';
import Excellence from './components/Excellence';
import Industries from './components/Industries';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import AdminDashboard from './components/AdminDashboard';
import Footer from './components/Footer';
import DigitalCatalog from './components/DigitalCatalog';
import { LeadInquiry, BoxConfig } from './types';

export default function App() {
  // Tracking navigation links
  const [activeSection, setActiveSection] = useState('hero');
  const [adminOpen, setAdminOpen] = useState(false);
  
  // Leads tracking loaded from browser local storage
  const [leads, setLeads] = useState<LeadInquiry[]>([]);
  
  // Customization fields transmitted from other components (Advisor / Products Catalog) to Contact form
  const [initialRequirement, setInitialRequirement] = useState('');
  const [initialConfig, setInitialConfig] = useState<BoxConfig | undefined>(undefined);

  // Initialize and load any stored Leads from local database
  useEffect(() => {
    const loadedRaw = localStorage.getItem('rigid_box_india_leads');
    if (loadedRaw) {
      try {
        setLeads(JSON.parse(loadedRaw));
      } catch (err) {
        console.error("Error reading stored leads databases:", err);
      }
    }
  }, []);

  // Set up scroll index intersection observers to light up index tabs dynamically
  useEffect(() => {
    if (adminOpen) return; // scroll tracker is deactivated when owner back office dashboard is open

    const handleScroll = () => {
      const sections = ['hero', 'about', 'why-choose-us', 'products', 'configurator', 'excellence', 'industries', 'catalog', 'gallery', 'contact'];
      let currentSection = 'hero';

      for (const sectId of sections) {
        const el = document.getElementById(sectId);
        if (el) {
          const rect = el.getBoundingClientRect();
          // If the top of the element is near the top of the viewport
          if (rect.top <= 160) {
            currentSection = sectId;
          }
        }
      }
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [adminOpen]);

  // Smooth scroll navigate callback mapping
  const handleScrollToSection = (sectionId: string) => {
    setAdminOpen(false); // Force close dashboard to return to website layout if navigating sitemaps
    
    setTimeout(() => {
      const sectionEl = document.getElementById(sectionId);
      if (sectionEl) {
        sectionEl.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Pipe product selection directly to lead generation Contact form
  const handleSelectProductInquiry = (productTitle: string) => {
    setInitialRequirement(`Inquiry regarding catalog item: ${productTitle}`);
    setInitialConfig(undefined);
    
    // Jump down down to contact section
    const contactSectionEl = document.getElementById('contact');
    if (contactSectionEl) {
      contactSectionEl.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Pipe advisor 3D custom specifications directly to lead generation Contact form
  const handleSelectConfigInquiry = (summaryText: string, configObj: BoxConfig) => {
    setInitialRequirement(`Injected Custom Config: ${summaryText}`);
    setInitialConfig(configObj);
  };

  // Reset injected custom configuration states
  const handleClearInjectedSpecs = () => {
    setInitialRequirement('');
    setInitialConfig(undefined);
  };

  // Triggered when any contact inquiry form submit succeeds, to update sitemap alerts instantly in Nav header
  const handleSyncLeadsOnSubmission = (newLead: LeadInquiry) => {
    setLeads(prev => [newLead, ...prev]);
  };

  return (
    <div id="application-container" className="bg-[#F7F7F7] text-luxury-black min-h-screen flex flex-col font-sans antialiased selection:bg-gold-500 selection:text-white">
      
      {/* Sticky glass-blur navigation header across all layouts */}
      <Navbar
        onNavigate={handleScrollToSection}
        activeSection={activeSection}
        onOpenAdmin={() => setAdminOpen(!adminOpen)}
        adminOpen={adminOpen}
        totalLeadsCount={leads.filter(l => l.status === 'new').length}
      />

      {/* Main Core Router Flow */}
      <main className="flex-grow">
        {adminOpen ? (
          /* Back office leads manager workspace panels */
          <AdminDashboard
            onClose={() => setAdminOpen(false)}
            leads={leads}
            onLeadsChange={setLeads}
          />
        ) : (
          /* Standard primary company landing sections */
          <div id="website-presentation">
            <Hero onNavigate={handleScrollToSection} />
            
            <About />
            
            <WhyChooseUs />
            
            <Products onInquire={handleSelectProductInquiry} />
            
            <Advisor 
              onAddConfigToForm={handleSelectConfigInquiry} 
              onUnlockLead={handleSyncLeadsOnSubmission}
            />
            
            <Excellence />
            
            <Industries />
            
            <DigitalCatalog onInquire={handleSelectProductInquiry} />
            
            <Gallery />
            
            <Contact
              initialRequirement={initialRequirement}
              initialConfig={initialConfig}
              onClearRequirementAndConfig={handleClearInjectedSpecs}
              onSubmitInquiry={handleSyncLeadsOnSubmission}
            />
          </div>
        )}
      </main>

      {/* Sitemaps footer with corporate addresses and hotline links */}
      <Footer onNavigate={handleScrollToSection} />
    </div>
  );
}
