import React, { useState, useEffect } from 'react';
import { Database, Search, Download, Trash2, CheckSquare, HeartHandshake, Eye, EyeOff, Briefcase, RefreshCw, Sparkles, Tag, Layout, FileDown, Lock, Unlock, LogOut, Key, ShieldAlert } from 'lucide-react';
import { LeadInquiry } from '../types';
import { jsPDF } from 'jspdf';

interface AdminDashboardProps {
  onClose: () => void;
  leads: LeadInquiry[];
  onLeadsChange: (updatedLeads: LeadInquiry[]) => void;
}

export default function AdminDashboard({ onClose, leads, onLeadsChange }: AdminDashboardProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'new' | 'contacted' | 'quoted'>('all');
  const [activeTab, setActiveTab] = useState<'leads' | 'seo'>('leads');

  // Security & Owner Session Authentication States
  const [passcodeInput, setPasscodeInput] = useState('');
  const [showPasscode, setShowPasscode] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('rigid_box_owner_authenticated') === 'true' || 
           localStorage.getItem('rigid_box_owner_authenticated_persisted') === 'true';
  });
  const [errorMsg, setErrorMsg] = useState('');
  
  // Custom Passcode Modification States
  const [isChangingPasscode, setIsChangingPasscode] = useState(false);
  const [currentPasscode, setCurrentPasscode] = useState(() => {
    return localStorage.getItem('rigid_box_owner_passcode') || 'rigidsanjar@2026';
  });
  const [oldPasscodeCheck, setOldPasscodeCheck] = useState('');
  const [newPasscodeInput, setNewPasscodeInput] = useState('');
  const [passcodeSuccessMsg, setPasscodeSuccessMsg] = useState('');
  const [passcodeErrorMsg, setPasscodeErrorMsg] = useState('');

  // Access validation gate rendering
  if (!isAuthenticated) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center p-4 sm:p-8 bg-gradient-to-b from-[#111111] to-[#1A1A1A] select-none text-white">
        <div className="max-w-md w-full bg-[#1F1F1F] border border-gold-500/20 rounded-xl p-6 sm:p-8 shadow-2xl relative text-center font-sans overflow-hidden">
          {/* Accent decoration */}
          <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-gold-600 via-gold-450 to-gold-600"></div>
          
          <div className="space-y-6 animate-fade-in">
            {/* Rigid Box India Owner Emblem */}
            <div className="flex flex-col items-center space-y-2">
              <div className="w-16 h-16 bg-gold-500/10 border border-gold-500/30 rounded-full flex items-center justify-center text-gold-500 shadow-inner">
                <Lock className="w-7 h-7 text-gold-500" />
              </div>
              <span className="text-[10px] font-mono tracking-[0.3em] text-gold-400 uppercase font-bold">Rigid Box India</span>
              <h1 className="font-sans text-xl font-extrabold text-white tracking-tight uppercase">Owner Access Panel</h1>
              <div className="inline-flex items-center space-x-1.5 bg-gold-500/10 px-2.5 py-0.5 rounded-full border border-gold-500/25">
                <span className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-pulse"></span>
                <span className="text-[9px] font-mono text-gold-300 font-bold uppercase tracking-wider">Owner Session: rigidboxin@gmail.com</span>
              </div>
            </div>

            <p className="text-xs text-gray-400 leading-normal">
              This panel is protected by a master passcode. Access to active client leads, custom box config files, and wholesale business quotes is strictly restricted to company owners.
            </p>

            {/* Error Message */}
            {errorMsg && (
              <div className="p-3 bg-red-950/40 border border-red-500/25 rounded text-[11px] text-red-200 flex items-center space-x-2 text-left justify-center">
                <ShieldAlert className="w-4 h-4 text-red-400 shrink-0" />
                <span>{errorMsg}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={(e) => {
              e.preventDefault();
              if (passcodeInput.trim() === currentPasscode) {
                if (rememberMe) {
                  localStorage.setItem('rigid_box_owner_authenticated_persisted', 'true');
                } else {
                  sessionStorage.setItem('rigid_box_owner_authenticated', 'true');
                }
                setIsAuthenticated(true);
                setErrorMsg('');
              } else {
                setErrorMsg('Invalid master passcode. Please verify or check owner files.');
              }
            }} className="space-y-4 text-left">
              <div className="space-y-1.5">
                <div className="flex justify-between items-center">
                  <label className="text-[10px] font-mono font-bold uppercase text-gray-400 tracking-wider">
                    Enter Security Passcode
                  </label>
                  <span className="text-[9.5px] font-mono text-gold-400 bg-gold-500/10 px-1.5 py-0.5 rounded font-bold">
                    Passcode Hint: {currentPasscode === 'rigidbox99' ? 'rigidbox99' : '••••••••'}
                  </span>
                </div>
                <div className="relative">
                  <input
                    type={showPasscode ? 'text' : 'password'}
                    value={passcodeInput}
                    onChange={(e) => setPasscodeInput(e.target.value)}
                    placeholder="••••••••"
                    required
                    className="w-full bg-[#292929] border border-white/10 hover:border-gold-500/30 focus:border-gold-500 focus:outline-none p-2.5 pl-3.5 pr-10 text-white rounded-md text-xs placeholder-gray-600 transition-all font-mono"
                    autoFocus
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasscode(!showPasscode)}
                    className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-400 hover:text-gold-500 transition-colors"
                  >
                    {showPasscode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Remember me checkbox */}
              <div className="flex items-center justify-between text-[11px] text-gray-400 py-1">
                <label className="flex items-center space-x-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-gold-500 cursor-pointer rounded"
                  />
                  <span>Keep me signed in on this device</span>
                </label>
              </div>

              {/* Buttons */}
              <div className="pt-2 flex space-x-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="flex-1 py-1.5 sm:py-2 border border-white/10 bg-transparent hover:bg-white/5 text-gray-300 hover:text-white rounded-md text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer"
                >
                  Return to Site
                </button>
                <button
                  type="submit"
                  className="flex-1 py-1.5 sm:py-2 bg-gold-500 hover:bg-gold-600 text-white rounded-md text-[10px] font-extrabold uppercase tracking-wider transition-all shadow-md cursor-pointer flex items-center justify-center space-x-1.5"
                >
                  <Unlock className="w-3.5 h-3.5" />
                  <span>Verify Passcode</span>
                </button>
              </div>
            </form>

            {/* Footer help */}
            <div className="pt-4 border-t border-white/5 flex flex-col items-center space-y-1">
              <span className="text-[9px] text-gray-500 font-medium">RIGID BOX INDIA PACKAGING PRIVATE LIMITED</span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const filteredLeads = leads.filter(ld => {
    const matchesSearch = 
      ld.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ld.companyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ld.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ld.requirement.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (statusFilter === 'all') return matchesSearch;
    return matchesSearch && ld.status === statusFilter;
  });

  const updateLeadStatus = (leadId: string, newStatus: 'new' | 'contacted' | 'quoted' | 'completed') => {
    const updated = leads.map(ld => {
      if (ld.id === leadId) {
        return { ...ld, status: newStatus };
      }
      return ld;
    });
    onLeadsChange(updated);
    localStorage.setItem('rigid_box_india_leads', JSON.stringify(updated));
  };

  const deleteLead = (leadId: string) => {
    if (window.confirm('Are you sure you want to permanently delete this lead from local tracking?')) {
      const updated = leads.filter(ld => ld.id !== leadId);
      onLeadsChange(updated);
      localStorage.setItem('rigid_box_india_leads', JSON.stringify(updated));
    }
  };

  const clearAllLeads = () => {
    if (window.confirm('WARNING: Remove all recorded simulated leads permanently?')) {
      onLeadsChange([]);
      localStorage.removeItem('rigid_box_india_leads');
    }
  };

  const exportLeadsToJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(leads, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `rigid_box_india_leads_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const exportLeadsToPDF = () => {
    if (filteredLeads.length === 0) return;
    
    // We import or reference jsPDF constructor as standard
    const doc = new jsPDF({
      orientation: 'portrait',
      unit: 'mm',
      format: 'a4'
    });

    let y = 28;

    // Helper functions for headers and footers
    const drawHeader = (pageNumber: number) => {
      // Background Accent bar at the top
      doc.setFillColor(26, 26, 26); // Luxury dark charcoal
      doc.rect(0, 0, 210, 15, 'F');

      // Top Gold Accent thin line
      doc.setFillColor(197, 155, 39); // Gold
      doc.rect(0, 15, 210, 1.5, 'F');

      // Header text
      doc.setTextColor(255, 255, 255);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(8);
      doc.text("RIGID BOX INDIA - BACK OFFICE MANAGEMENT", 15, 9.5);

      doc.setTextColor(197, 155, 39);
      doc.setFontSize(8);
      doc.text("LEADS REPORT", 195, 9.5, { align: 'right' });
    };

    const drawFooter = (pageNumber: number) => {
      doc.setDrawColor(220, 220, 220);
      doc.setLineWidth(0.2);
      doc.line(15, 280, 195, 280);

      doc.setTextColor(120, 120, 120);
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(7);
      doc.text("Confidential - For Rigid Box India Authorized Personnel Only", 15, 285);
      doc.text(`Page ${pageNumber}`, 195, 285, { align: 'right' });
    };

    let pageNum = 1;
    drawHeader(pageNum);
    drawFooter(pageNum);

    // Report Title
    doc.setTextColor(26, 26, 26);
    doc.setFont('Helvetica', 'bold');
    doc.setFontSize(18);
    doc.text("Business Inquiry Leads Report", 15, y);
    y += 6;

    // Meta Info (Date generated)
    doc.setTextColor(120, 120, 120);
    doc.setFont('Helvetica', 'normal');
    doc.setFontSize(9);
    doc.text(`Generated on: ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}`, 15, y);
    doc.text(`Total Records: ${filteredLeads.length} Inquiries`, 195, y, { align: 'right' });
    y += 10;

    // Draw horizontal separator
    doc.setDrawColor(197, 155, 39);
    doc.setLineWidth(1);
    doc.line(15, y, 195, y);
    y += 10;

    // Loop through filtered leads and display them neatly
    filteredLeads.forEach((ld, idx) => {
      // Estimate block height needed for this lead in mm
      const reqLines = doc.splitTextToSize(ld.requirement, 170);
      const msgLines = ld.message ? doc.splitTextToSize(`"${ld.message}"`, 170) : [];
      
      const blockHeight = 15 + (reqLines.length * 4.5) + (ld.message ? (msgLines.length * 4.5) + 6 : 0) + 12;

      // Check if this block will fit on the current page
      if (y + blockHeight > 275) {
        doc.addPage();
        pageNum++;
        drawHeader(pageNum);
        drawFooter(pageNum);
        y = 28; // Start top
      }

      const blockStartY = y;

      // Draw subtle background border for lead
      doc.setFillColor(252, 251, 248); // warm cream tint
      doc.setDrawColor(230, 225, 215); // soft goldish-gray border
      doc.setLineWidth(0.3);
      doc.rect(15, y, 180, blockHeight, 'FD');

      // Top status indicator bar/badge inside the box
      doc.setFillColor(26, 26, 26); // dark bar
      doc.rect(15, y, 180, 7.5, 'F');

      // Title & Status text inside the bar
      doc.setTextColor(255, 255, 255);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(8);
      const leadIndexText = `INQUIRY #${idx + 1} - ${ld.id.toUpperCase().slice(0, 8)}`;
      doc.text(leadIndexText, 18, y + 5);

      // Status Badge
      let statusLabel = ld.status.toUpperCase();
      if (statusLabel === 'NEW') statusLabel = '🔴 NEW INQUIRY';
      else if (statusLabel === 'CONTACTED') statusLabel = '🔵 CONTACTED';
      else if (statusLabel === 'QUOTED') statusLabel = '🟡 QUOTED';
      else statusLabel = `⚪ ${statusLabel}`;

      doc.setTextColor(197, 155, 39);
      doc.text(statusLabel, 192, y + 5, { align: 'right' });
      y += 12;

      // Contact details
      doc.setTextColor(26, 26, 26);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(10);
      doc.text(ld.name, 18, y);
      
      doc.setTextColor(197, 155, 39);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(9);
      doc.text(ld.companyName || 'Individual Creator', 18, y + 4.5);

      // Timestamp & contacts on the right side
      doc.setTextColor(120, 120, 120);
      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(8.5);
      doc.text(`Phone: ${ld.phone}`, 192, y, { align: 'right' });
      doc.text(`Email: ${ld.email}`, 192, y + 4.5, { align: 'right' });
      doc.text(`Received: ${new Date(ld.createdAt).toLocaleString()}`, 192, y + 9, { align: 'right' });
      y += 14;

      // Divider line
      doc.setDrawColor(240, 235, 225);
      doc.setLineWidth(0.2);
      doc.line(18, y, 192, y);
      y += 4.5;

      // Requirements section
      doc.setTextColor(26, 26, 26);
      doc.setFont('Helvetica', 'bold');
      doc.setFontSize(8);
      doc.text("REQUESTED SPECIFICATIONS:", 18, y);
      y += 4;

      doc.setFont('Helvetica', 'normal');
      doc.setFontSize(9);
      reqLines.forEach((line: string) => {
        doc.text(line, 18, y);
        y += 4.5;
      });

      // Customer message
      if (ld.message) {
        y += 2.5;
        doc.setTextColor(120, 120, 120);
        doc.setFont('Helvetica', 'bold');
        doc.setFontSize(8);
        doc.text("CLIENT NOTES / MESSAGE:", 18, y);
        y += 4;

        doc.setFont('Helvetica', 'italic');
        doc.setFontSize(8.5);
        doc.setTextColor(80, 80, 80);
        msgLines.forEach((line: string) => {
          doc.text(line, 19 + 0, y); // unique offset avoid crash
          y += 4.5;
        });
      }

      // Restore y position relative to actual block end + gap
      y = blockStartY + blockHeight + 6;
    });

    doc.save(`rigid_box_india_leads_report_${Date.now()}.pdf`);
  };

  // Seed sample leads if database is completely empty so owner has visual metrics to test instantly
  const seedSampleLeads = () => {
    const samples: LeadInquiry[] = [
      {
        id: 'seed-1',
        name: 'Gaurav Mehta',
        companyName: 'Mehta Jewelers Palace',
        phone: '+91 88761 90212',
        email: 'gaurav@mehtajewelers.in',
        requirement: 'BOX TYPE: Magnetic Flap | SIZE: 120x120x40 mm | QTY: 1200 units',
        message: 'Need high end velvet lining inserts to hold gold bangles. Looking for dark forest green color wrapping with gold hot stamping logo.',
        status: 'new',
        createdAt: new Date(Date.now() - 3600000 * 2).toISOString()
      },
      {
        id: 'seed-2',
        name: 'Pooja Bhatia',
        companyName: 'Aura Cosmeceuticals',
        phone: '+91 99823 88102',
        email: 'pooja@auracosmetics.com',
        requirement: 'Premium Shoulder-Neck Rigid Box for Lip Balm Series (Qty: 5000 units)',
        message: 'Looking to launch our autumn edition box series. Delivery required at our corporate warehousing hub by end of month.',
        status: 'contacted',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString()
      },
      {
        id: 'seed-3',
        name: 'Vivek Singhania',
        companyName: 'Singhania Silk Weavers',
        phone: '+91 98210 50401',
        email: 'v.singhania@singhania.co',
        requirement: 'BOX TYPE: Sliding Drawer Sleeve | SIZE: 300x250x70 mm | QTY: 2000 units',
        message: 'Sleeve packaging for boutique designer sarees. Silver embossed brand name on high structured custom card wrapper.',
        status: 'quoted',
        createdAt: new Date(Date.now() - 3600000 * 48).toISOString()
      }
    ];
    onLeadsChange(samples);
    localStorage.setItem('rigid_box_india_leads', JSON.stringify(samples));
  };

  return (
    <div className="min-h-screen bg-[#F7F7F7] text-luxury-black pt-28 pb-16 relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(197,155,39,0.03),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full select-none font-sans">
        
        {/* Navigation back and title */}
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 border-b border-gold-500/15 pb-6 mb-8 text-left">
          <div>
            <div className="flex items-center space-x-2 text-gold-600 mb-1">
              <Database className="w-4 h-4" />
              <span className="text-[10px] uppercase font-bold tracking-widest font-sans">Back Office Management Workspace</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 gap-1">
              <h1 className="font-sans text-2xl sm:text-3xl font-extrabold text-luxury-black">Owner Inquiry &amp; SEO Dashboard</h1>
              <span className="text-[9px] font-mono font-bold bg-gold-500/10 text-gold-700 px-2.5 py-1 rounded border border-gold-500/20 max-w-max">
                Owner Mode Active
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={() => setIsChangingPasscode(true)}
              className="px-3 py-2 bg-gray-50 text-[10px] uppercase tracking-wider font-bold text-gray-700 hover:text-luxury-black border border-gold-500/20 hover:border-gold-500/40 rounded-sm cursor-pointer flex items-center space-x-1"
              title="Change the master passcode required to open this dashboard"
            >
              <Key className="w-3.5 h-3.5 text-gold-600" />
              <span>Modify Passcode</span>
            </button>
            
            <button
              onClick={seedSampleLeads}
              className="px-3.5 py-2 bg-gray-50 text-[10px] uppercase tracking-wider font-bold text-luxury-black border border-gold-500/15 hover:border-gold-500/30 rounded-sm cursor-pointer"
              title="Populates the table with professional simulation customer questions so you can test features easily."
            >
              Seed Sample Leads
            </button>

            <button
              onClick={() => {
                sessionStorage.removeItem('rigid_box_owner_authenticated');
                localStorage.removeItem('rigid_box_owner_authenticated_persisted');
                setIsAuthenticated(false);
                setPasscodeInput('');
              }}
              className="px-3 py-2 bg-red-50 text-[10px] uppercase tracking-wider font-bold text-red-600 border border-red-500/15 hover:bg-red-100 rounded-sm cursor-pointer flex items-center space-x-1"
              title="Log out and secure the Leads Panel instantly"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Lock Panel</span>
            </button>

            <button
              onClick={onClose}
              className="px-4 py-2 bg-gold-500 hover:bg-gold-600 text-white font-extrabold text-[10px] uppercase tracking-widest rounded-sm shadow-sm cursor-pointer"
            >
              Return to Website
            </button>
          </div>
        </div>

        {/* Passcode changer modal dialog if requested */}
        {isChangingPasscode && (
          <div className="fixed inset-0 z-[100] bg-luxury-black/80 backdrop-blur-xs flex items-center justify-center p-4">
            <div className="bg-white border border-gold-500/20 rounded-xl max-w-sm w-full p-5 sm:p-6 relative shadow-2xl text-left font-sans">
              <h3 className="font-sans text-sm text-luxury-black font-extrabold uppercase tracking-wide flex items-center space-x-2">
                <Key className="w-4 h-4 text-gold-500" />
                <span>Modify Master Passcode</span>
              </h3>
              <p className="text-[10.5px] text-gray-500 mt-2 leading-relaxed">
                Secure your database records by establishing a new secret access key. This overrides the current passcode.
              </p>

              {passcodeErrorMsg && (
                <div className="mt-3 p-2 bg-red-50 border border-red-200 rounded text-[10px] text-red-650 font-bold">
                  ⚠️ {passcodeErrorMsg}
                </div>
              )}

              {passcodeSuccessMsg && (
                <div className="mt-3 p-2 bg-emerald-50 border border-emerald-200 rounded text-[10px] text-emerald-650 font-bold">
                  ✓ {passcodeSuccessMsg}
                </div>
              )}

              <div className="space-y-3 mt-4">
                <div className="space-y-1">
                  <label className="text-[9px] font-mono font-bold uppercase text-gray-500">
                    Verify Current Passcode
                  </label>
                  <input
                    type="password"
                    value={oldPasscodeCheck}
                    onChange={(e) => setOldPasscodeCheck(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-gray-50 border border-gray-300 focus:border-gold-500 focus:outline-none p-2 text-xs rounded transition-all font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[9px] font-mono font-bold uppercase text-gray-500">
                    New Secret Passcode
                  </label>
                  <input
                    type="text"
                    value={newPasscodeInput}
                    onChange={(e) => setNewPasscodeInput(e.target.value)}
                    placeholder="Min 4 letters/digits"
                    className="w-full bg-gray-50 border border-gray-300 focus:border-gold-500 focus:outline-none p-2 text-xs rounded transition-all font-mono"
                  />
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-gray-100 flex justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsChangingPasscode(false);
                    setOldPasscodeCheck('');
                    setNewPasscodeInput('');
                    setPasscodeSuccessMsg('');
                    setPasscodeErrorMsg('');
                  }}
                  className="px-3 py-1.5 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold text-[9.5px] uppercase tracking-wider rounded cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setPasscodeSuccessMsg('');
                    setPasscodeErrorMsg('');

                    if (oldPasscodeCheck !== currentPasscode) {
                      setPasscodeErrorMsg('Current passcode verification failed.');
                      return;
                    }
                    if (newPasscodeInput.trim().length < 4) {
                      setPasscodeErrorMsg('Passcode must be at least 4 characters.');
                      return;
                    }

                    const updatedKey = newPasscodeInput.trim();
                    localStorage.setItem('rigid_box_owner_passcode', updatedKey);
                    setCurrentPasscode(updatedKey);
                    setPasscodeSuccessMsg(`Key successfully updated!`);
                    setOldPasscodeCheck('');
                    setNewPasscodeInput('');

                    setTimeout(() => {
                      setIsChangingPasscode(false);
                      setPasscodeSuccessMsg('');
                    }, 2000);
                  }}
                  className="px-3.5 py-1.5 bg-gold-500 hover:bg-gold-600 text-white font-extrabold text-[9.5px] uppercase tracking-wider rounded cursor-pointer shadow-sm"
                >
                  Update Passcode
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dashboard Sub Tabs Navigation Section */}
        <div className="flex space-x-4 mb-6 border-b border-gold-500/15 text-left">
          <button
            onClick={() => setActiveTab('leads')}
            className={`pb-3 text-xs uppercase tracking-widest font-extrabold border-b-2 transition-all cursor-pointer ${
              activeTab === 'leads' ? 'border-gold-500 text-gold-600' : 'border-transparent text-gray-500 hover:text-luxury-black'
            }`}
          >
            Inquiry Leads ({filteredLeads.length})
          </button>
          <button
            onClick={() => setActiveTab('seo')}
            className={`pb-3 text-xs uppercase tracking-widest font-extrabold border-b-2 transition-all cursor-pointer ${
              activeTab === 'seo' ? 'border-gold-500 text-gold-600' : 'border-transparent text-gray-500 hover:text-luxury-black'
            }`}
          >
            SEO Keywords &amp; Search Index
          </button>
        </div>

        {activeTab === 'leads' ? (
          /* LEADS MANAGEMENT PANEL */
          <div className="space-y-6">
            
            {/* Lead metrics bar */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
              
              {/* Stat Card 1 */}
              <div className="p-5 bg-white border border-gold-500/15 rounded-xl shadow-xs">
                <span className="block text-[10px] text-gray-500 uppercase tracking-widest leading-none mb-2 font-bold">Total Received Inquiries</span>
                <span className="block font-sans text-3xl font-extrabold text-luxury-black">{leads.length}</span>
              </div>

              {/* Stat Card 2 */}
              <div className="p-5 bg-white border border-gold-500/15 rounded-xl shadow-xs">
                <span className="block text-[10px] text-gray-500 uppercase tracking-widest leading-none mb-2 font-bold">Active New Leads</span>
                <span className="block font-sans text-3xl font-extrabold text-red-600">
                  {leads.filter(ld => ld.status === 'new').length}
                </span>
              </div>

              {/* Stat Card 3 */}
              <div className="p-5 bg-white border border-gold-500/15 rounded-xl shadow-xs">
                <span className="block text-[10px] text-gray-500 uppercase tracking-widest leading-none mb-2 font-bold">Quoted in Pipeline</span>
                <span className="block font-sans text-3xl font-extrabold text-gold-600">
                  {leads.filter(ld => ld.status === 'quoted').length}
                </span>
              </div>

              {/* Stat Card 4 */}
              <div className="p-5 bg-white border border-gold-500/15 rounded-xl shadow-xs">
                <span className="block text-[10px] text-gray-500 uppercase tracking-widest leading-none mb-2 font-bold">Potential Value Scope</span>
                <span className="block font-sans text-2xl font-extrabold text-emerald-600">
                  ₹{(leads.length * 68000).toLocaleString()}+
                </span>
              </div>

            </div>

            {/* Filters Bar */}
            <div className="p-4 bg-white border border-gold-500/15 rounded-xl shadow-xs flex flex-col md:flex-row justify-between items-center gap-4">
              
              {/* Search */}
              <div className="relative w-full md:w-96 text-left">
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Query Name, Email, or Organization..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 bg-gray-50 border border-gold-500/15 hover:border-gold-500/25 rounded text-xs placeholder-gray-400 text-luxury-black font-semibold focus:outline-none focus:border-gold-500"
                />
              </div>

              {/* Toggle filters and bulk operations */}
              <div className="flex flex-wrap gap-2 w-full md:w-auto justify-end">
                {/* Status selector */}
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="p-2 bg-gray-50 border border-gold-500/15 text-xs rounded text-luxury-black font-bold cursor-pointer"
                >
                  <option value="all">All States</option>
                  <option value="new">🟢 New Inquiries</option>
                  <option value="contacted">🔵 Contacted Leads</option>
                  <option value="quoted">🟡 Quote Finalized</option>
                </select>

                <button
                  onClick={exportLeadsToPDF}
                  disabled={filteredLeads.length === 0}
                  className="p-2 bg-red-50 hover:bg-red-600 text-red-700 hover:text-white border border-red-200 hover:border-red-600 text-xs rounded transition-all flex items-center space-x-1.5 font-bold cursor-pointer disabled:opacity-50"
                  title="Export styled print-ready PDF Report of filtered leads"
                >
                  <FileDown className="w-3.5 h-3.5" />
                  <span>Download PDF Report</span>
                </button>

                <button
                  onClick={exportLeadsToJSON}
                  disabled={leads.length === 0}
                  className="p-2 bg-gray-50 hover:bg-gold-500 text-gray-600 hover:text-white border border-gold-500/15 hover:border-gold-500 text-xs rounded transition-all flex items-center space-x-1.5 font-bold cursor-pointer disabled:opacity-50"
                  title="Export raw lead databases in JSON backup format"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>JSON Backup</span>
                </button>

                <button
                  onClick={clearAllLeads}
                  disabled={leads.length === 0}
                  className="p-2 bg-red-50 hover:bg-red-100 text-red-600 border border-red-500/15 text-xs rounded transition-all cursor-pointer disabled:opacity-50"
                  title="Purge Local Tracker Storage"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>

            </div>

            {/* Tabular Database View */}
            {filteredLeads.length === 0 ? (
              <div className="p-12 text-center bg-white rounded-xl border border-gold-500/15 space-y-3 shadow-xs">
                <Layout className="w-12 h-12 text-gold-500/20 mx-auto" />
                <p className="text-gray-500 text-sm font-bold">No recorded inquiry match found in this tracking index.</p>
                <p className="text-xs text-gray-450 font-medium">Please click "Seed Sample Leads" or fill out the website form to test.</p>
              </div>
            ) : (
              <div className="overflow-x-auto border border-gold-500/15 rounded-xl bg-white shadow-xs">
                <table className="w-full text-left text-xs text-gray-600">
                  <thead className="text-[10px] uppercase font-bold text-gray-500 border-b border-gold-500/15 bg-gray-50/80">
                    <tr>
                      <th className="p-4">Contact Details</th>
                      <th className="p-4">Requested Configurations</th>
                      <th className="p-4">Timestamp</th>
                      <th className="p-4">Lead Status</th>
                      <th className="p-4 text-center">Manage</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gold-500/10 select-text font-medium text-left">
                    {filteredLeads.map((ld) => (
                      <tr key={ld.id} className="hover:bg-gray-50/30">
                        
                        {/* Name & Email */}
                        <td className="p-4 text-left">
                          <span className="block font-bold text-luxury-black text-sm leading-snug">{ld.name}</span>
                          <span className="block text-[11px] text-gold-600 font-extrabold mt-0.5">{ld.companyName}</span>
                          <div className="text-[10px] text-gray-500 mt-1 space-y-0.5 font-sans font-semibold">
                            <p>📞 Phone: {ld.phone}</p>
                            <p>✉ Email: {ld.email}</p>
                          </div>
                        </td>

                        {/* Custom requirement specifications */}
                        <td className="p-4 uppercase max-w-sm">
                          <span className="block text-[11px] text-luxury-black font-bold leading-normal">{ld.requirement}</span>
                          {ld.message && (
                            <p className="text-[10px] text-gray-500 mt-1 capitalize font-medium select-text max-h-16 overflow-y-auto leading-relaxed border-t border-gold-500/10 pt-1">
                              "{ld.message}"
                            </p>
                          )}
                        </td>

                        {/* Timestamp */}
                        <td className="p-4 text-gray-500 font-sans font-semibold">
                          {new Date(ld.createdAt).toLocaleString()}
                        </td>

                        {/* State Pill */}
                        <td className="p-4">
                          <div className="space-y-1.5">
                            {ld.status === 'new' && (
                              <span className="px-2 py-1 rounded bg-red-50 text-white font-bold block text-[9px] uppercase tracking-wider text-center">
                                🟢 New Inquiry
                              </span>
                            )}
                            {ld.status === 'contacted' && (
                              <span className="px-2 py-1 rounded bg-blue-600 text-white font-bold block text-[9px] uppercase tracking-wider text-center font-sans">
                                🔵 Contacted
                              </span>
                            )}
                            {ld.status === 'quoted' && (
                              <span className="px-2 py-1 rounded bg-gold-500 text-white font-bold block text-[9px] uppercase tracking-wider text-center font-sans">
                                🟡 Quoted
                              </span>
                            )}

                            {/* Dropdown fast state modifier */}
                            <select
                              value={ld.status}
                              onChange={(e) => updateLeadStatus(ld.id, e.target.value as any)}
                              className="w-full text-[9px] bg-gray-50 border border-gold-500/15 text-luxury-black p-1 rounded font-sans font-bold mt-1 focus:outline-none cursor-pointer"
                            >
                              <option value="new">Mark New</option>
                              <option value="contacted">Mark Contacted</option>
                              <option value="quoted">Mark Quoted</option>
                            </select>
                          </div>
                        </td>

                        {/* Delete action */}
                        <td className="p-4 text-center">
                          <button
                            onClick={() => deleteLead(ld.id)}
                            className="p-1.5 rounded text-red-500 hover:text-red-700 hover:bg-red-50 border border-transparent hover:border-red-500/15 transition-all duration-200 cursor-pointer"
                            title="Purge Lead"
                          >
                            <Trash2 className="w-4.5 h-4.5" />
                          </button>
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        ) : (
          /* SEO AUDIT SIMULATOR PANEL */
          <div className="space-y-6 text-left p-6 sm:p-8 bg-white rounded-xl border border-gold-500/15 shadow-sm">
            <h2 className="font-sans text-xl font-extrabold text-luxury-black mb-2">Rigid Box India Search Engine Indexation Review</h2>
            <p className="text-xs text-gray-500 leading-normal mb-6 font-semibold">
              Our website code structures are pre-configured to automatically map search crawlers. Here is a review of search indexing metrics for the Indian packaging sector.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              
              {/* Box 1: Simulated Google Search Preview */}
              <div className="p-5 bg-gray-50 rounded-lg border border-gold-500/15 space-y-3">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">SERP Google Preview Snippet</span>
                
                <div className="p-4 bg-white border border-gray-100 rounded font-sans space-y-1 shadow-xs">
                  <div className="text-[11px] text-gray-400 flex items-center space-x-1.5">
                    <span>https://www.rigidboxindia.com</span>
                    <span className="text-[10px]">▼</span>
                  </div>
                  <a className="text-blue-600 text-base hover:underline block font-semibold leading-snug">
                    Rigid Box India | Premium Custom Luxury Packaging Manufacturers
                  </a>
                  <p className="text-[11px] text-gray-600 leading-relaxed font-medium">
                    Manufacturers of High-Quality Rigid Boxes, Kappa Boxes &amp; Custom Packaging Solutions for luxury brands across India. Sourcing premium raw stocks across major industrial hubs...
                  </p>
                </div>
              </div>

              {/* Box 2: SEO Meta tag audits */}
              <div className="p-5 bg-gray-50 rounded-lg border border-gold-500/15 space-y-3 text-xs">
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest font-mono">Crawler Audited Keywords</span>
                
                <div className="space-y-2 font-mono text-[11px] font-bold">
                  <div className="flex justify-between border-b border-gold-500/10 pb-1">
                    <span className="text-gray-600">"Rigid Box Manufacturer India"</span>
                    <span className="text-emerald-600">★★★★★ High Vol</span>
                  </div>
                  <div className="flex justify-between border-b border-gold-500/10 pb-1">
                    <span className="text-gray-600">"Luxury Packaging Manufacturer"</span>
                    <span className="text-emerald-600">★★★★★ High Vol</span>
                  </div>
                  <div className="flex justify-between border-b border-gold-500/10 pb-1">
                    <span className="text-gray-600">"Kappa Box Manufacturer Mumbai"</span>
                    <span className="text-gold-600">★★★★ Mid Vol</span>
                  </div>
                  <div className="flex justify-between border-b border-gold-500/10 pb-1">
                    <span className="text-gray-600">"Custom Rigid Box Manufacturer"</span>
                    <span className="text-gold-600">★★★★ Mid Vol</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Performance analysis score */}
            <div className="p-4 bg-gold-500/5 border border-gold-500/20 rounded mt-6 text-xs text-gray-600 space-y-2">
              <span className="font-bold text-gold-600 block text-[11px]">⚡ HIGH PERFORMANCE ATTRIBUTES ENFORCED:</span>
              <div className="space-y-1.5 mt-2 pt-1 font-sans text-[10.5px] text-gray-600">
                <div className="flex items-start space-x-2">
                  <span className="text-gold-500 font-mono select-none">✦</span>
                  <span><strong>Mobile responsive tags</strong> implemented for all screens.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-gold-500 font-mono select-none">✦</span>
                  <span><strong>Dynamic loading vectors</strong> used in place of static binary images to optimize Lighthouse benchmarks.</span>
                </div>
                <div className="flex items-start space-x-2">
                  <span className="text-gold-500 font-mono select-none">✦</span>
                  <span><strong>Semantic markup index structures</strong> (h1, h2, section, nav headers) mapped perfectly.</span>
                </div>
              </div>
            </div>

          </div>
        )}

      </div>
    </div>
  );
}
