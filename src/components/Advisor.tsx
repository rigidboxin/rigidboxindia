import React, { useState, useEffect } from 'react';
import { Box, Wrench, Settings, ArrowRight, ClipboardCopy, Ruler, Sparkles, AlertCircle, ShoppingBag, Lock, Unlock, Zap } from 'lucide-react';
import { BoxConfig, BoxType, LeadInquiry } from '../types';

interface AdvisorProps {
  onAddConfigToForm: (configText: string, configObj: BoxConfig) => void;
  onUnlockLead?: (lead: LeadInquiry) => void;
}

export default function Advisor({ onAddConfigToForm, onUnlockLead }: AdvisorProps) {
  const MOQ_POINTS = [200, 500, 1000, 2000, 3000, 5000];

  const getQtyFromSliderValue = (v: number): number => {
    if (v <= 0) return MOQ_POINTS[0];
    if (v >= 5) return MOQ_POINTS[5];
    const index = Math.floor(v);
    const frac = v - index;
    if (index >= 5) return MOQ_POINTS[5];
    const val = MOQ_POINTS[index] + frac * (MOQ_POINTS[index + 1] - MOQ_POINTS[index]);
    return Math.round(val);
  };

  const getSliderValueFromQty = (qty: number): number => {
    if (qty <= MOQ_POINTS[0]) return 0;
    if (qty >= MOQ_POINTS[5]) return 5;
    for (let i = 0; i < MOQ_POINTS.length - 1; i++) {
      if (qty >= MOQ_POINTS[i] && qty <= MOQ_POINTS[i + 1]) {
        const segmentFrac = (qty - MOQ_POINTS[i]) / (MOQ_POINTS[i + 1] - MOQ_POINTS[i]);
        return i + segmentFrac;
      }
    }
    return 0;
  };

  const getClosestPoint = (qty: number): number => {
    let closest = MOQ_POINTS[0];
    let minDiff = Math.abs(qty - MOQ_POINTS[0]);
    for (let i = 1; i < MOQ_POINTS.length; i++) {
      const diff = Math.abs(qty - MOQ_POINTS[i]);
      if (diff < minDiff) {
        minDiff = diff;
        closest = MOQ_POINTS[i];
      }
    }
    if (qty >= 5000) return 5000;
    return closest;
  };

  // Init default config state
  const [config, setConfig] = useState<BoxConfig>({
    type: 'rigid_standard',
    length: 15,
    width: 15,
    height: 6,
    quantity: 1000,
    outerPaper: 'Fine Linen Textured Paper (Gold Sparkle)',
    finishType: 'Matte Lamination + Gold Foil Stamping',
    insertType: 'Velvet covered EVA Cavity Insert',
    logoOption: 'Hot Stamp Gold Metallic Embossing',
    windowSize: 55
  });

  const [estimatedCost, setEstimatedCost] = useState({ min: 45, max: 65, total: 55000 });
  const [appliedMargin, setAppliedMargin] = useState(120);
  const [copied, setCopied] = useState(false);

  // Lead qualification lock states
  const [unlocked, setUnlocked] = useState(false);
  const [unlockForm, setUnlockForm] = useState({
    name: '',
    phone: '',
    company: ''
  });
  const [isUnlocking, setIsUnlocking] = useState(false);
  const [unlockError, setUnlockError] = useState('');

  // Auto-detect unlock state from device local storage
  useEffect(() => {
    const isAlreadyUnlocked = localStorage.getItem('rigid_box_india_unlocked_prices');
    if (isAlreadyUnlocked === 'true') {
      setUnlocked(true);
    }
  }, []);

  const handleUnlockPricingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUnlockError('');

    if (!unlockForm.phone.trim() || unlockForm.phone.trim().length < 10) {
      setUnlockError('Please enter a valid phone number (minimum 10 digits).');
      return;
    }

    setIsUnlocking(true);

    setTimeout(() => {
      const typeLabel = 
        config.type === 'rigid_standard' ? 'Premium TOP/BOTTOM' :
        config.type === 'top_bottom_window' ? 'TOP/BOTTOM with Window' :
        config.type === 'magnetic_flap' ? 'Luxury Magnetic Book Flap' :
        config.type === 'drawer_sleeve' ? 'Sliding Drawer Sleeve Box' :
        'Shoulder-Neck Premium Box';

      const detailsStr = `Unlocked Box Estimator Specs - Style: ${typeLabel} | Size: ${config.length}x${config.width}x${config.height}cm | MOQ: ${config.quantity} units`;

      const newLead: LeadInquiry = {
        id: 'lead-' + Date.now(),
        name: unlockForm.name.trim() || 'Valued Brand',
        companyName: unlockForm.company.trim() || 'Independent Brand',
        phone: unlockForm.phone.trim(),
        email: `${unlockForm.phone.trim().replace(/[^0-9]/g, '') || Date.now()}@rigidboxindia.com`,
        requirement: detailsStr,
        message: `Unlocked live pricing engine via the interactive Configurator panel. Interested in ${typeLabel}.`,
        config: config,
        status: 'new',
        createdAt: new Date().toISOString()
      };

      try {
        const storedLeadsRaw = localStorage.getItem('rigid_box_india_leads');
        const list: LeadInquiry[] = storedLeadsRaw ? JSON.parse(storedLeadsRaw) : [];
        list.unshift(newLead);
        localStorage.setItem('rigid_box_india_leads', JSON.stringify(list));
      } catch (err) {
        console.error("Failed to append lead to registry:", err);
      }

      if (onUnlockLead) {
        onUnlockLead(newLead);
      }

      localStorage.setItem('rigid_box_india_unlocked_prices', 'true');
      setUnlocked(true);
      setIsUnlocking(false);
    }, 900);
  };

  // Re-estimate prices based on configuration rules and user-defined custom margin scheme
  useEffect(() => {
    let basePrice = 18; // base raw material & processing cost in INR calibrated for high-grade manufacturing

    // Add cost based on box dimensional proportions
    const volume = config.length * config.width * config.height; // cm3 volume
    basePrice += Math.min(volume * 0.015, 30);

    // Adjust cost according to format complexity
    if (config.type === 'magnetic_flap') basePrice += 16;     // premium book styles with concealed magnets
    if (config.type === 'shoulder_neck') basePrice += 11;     // elegant neck suctions need extra raw-edge folding
    if (config.type === 'top_bottom_window') basePrice += 7;  // TOP/BOTTOM with PVC window cutout
    if (config.type === 'drawer_sleeve') basePrice += 5;      // sliding drawer sleeve box
    if (config.type === 'rigid_standard') basePrice += 2;     // standard TOP/BOTTOM telescope box

    // Adjust based on premium raw covers
    if (config.outerPaper.includes('Linen') || config.outerPaper.includes('Leatherette')) {
      basePrice += 4;
    }
    if (config.finishType.includes('Gold Foil')) {
      basePrice += 3;
    }
    if (config.insertType.includes('EVA') || config.insertType.includes('Velvet') || config.insertType.includes('Cavity')) {
      basePrice += 5;
    }

    // Explicit custom margin pricing engine:
    // - MOQ 200-500: margin is 120% (unitPrice = basePrice * 2.2)
    // - MOQ 501-2000 (represented by MOQ 2000): margin is 70% (unitPrice = basePrice * 1.7)
    // - MOQ 2001-4999: margin is 50% (unitPrice = basePrice * 1.5)
    // - MOQ 5000+: margin is 30% (unitPrice = basePrice * 1.3)
    let marginPercent = 120;
    if (config.quantity <= 500) {
      marginPercent = 120;
    } else if (config.quantity <= 2000) {
      marginPercent = 70;
    } else if (config.quantity < 5000) {
      marginPercent = 50;
    } else {
      marginPercent = 30;
    }

    setAppliedMargin(marginPercent);

    const marginMultiplier = 1 + (marginPercent / 100);
    const unitBase = basePrice * marginMultiplier;

    // Range intervals for realistic quotation representation
    const unitMin = Math.round(unitBase * 0.96);
    const unitMax = Math.round(unitBase * 1.04);
    const totalEst = Math.round(((unitMin + unitMax) / 2) * config.quantity);

    setEstimatedCost({
      min: Math.max(unitMin, 15),
      max: Math.max(unitMax, 18),
      total: totalEst
    });
  }, [config]);

  const selectBoxType = (type: BoxType) => {
    setConfig(prev => ({ ...prev, type }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setConfig(prev => ({
      ...prev,
      [name]: name === 'length' || name === 'width' || name === 'height' || name === 'quantity' || name === 'windowSize'
        ? parseInt(value) || 0 
        : value
    }));
  };

  const getConfigSummaryText = () => {
    const typeLabel = 
      config.type === 'rigid_standard' ? 'Premium TOP/BOTTOM' :
      config.type === 'top_bottom_window' ? 'TOP/BOTTOM with Window' :
      config.type === 'magnetic_flap' ? 'Luxury Magnetic Book Flap' :
      config.type === 'drawer_sleeve' ? 'Sliding Drawer Sleeve Box' :
      'Shoulder-Neck Premium Box';

    const windowText = config.type === 'top_bottom_window'
      ? ` | WINDOW SIZE: ${config.windowSize ?? 55}%`
      : '';

    return `BOX TYPE: ${typeLabel} | SIZE: ${config.length}x${config.width}x${config.height} cm${windowText} | QTY: ${config.quantity} units | FINISH: ${config.finishType} | PAPER: ${config.outerPaper} | CAVITY INSERT: ${config.insertType} | LOGO: ${config.logoOption}`;
  };

  const transmitToContactForm = () => {
    const textStr = getConfigSummaryText();
    onAddConfigToForm(textStr, config);
    
    // Quick notification alerts and scroll to contact
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Generate dynamic 3D-like box preview using calculated SVG styles
  // We clamp scale sizes so they render nicely within a 250x250 boundaries
  const maxVal = Math.max(config.length, config.width, config.height) || 1;
  const renderL = Math.max(40, Math.min(160, (config.length / maxVal) * 140));
  const renderW = Math.max(40, Math.min(160, (config.width / maxVal) * 140));
  const renderH = Math.max(30, Math.min(100, (config.height / maxVal) * 80));

  return (
    <section id="configurator" className="py-6 sm:py-8 bg-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,rgba(197,155,39,0.03),transparent_50%)] pointer-events-none" />

      <div className="max-w-7xl lg:max-w-[1380px] xl:max-w-[1550px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 relative z-10 font-sans">
        
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-5 space-y-1.5">
          <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-gold-600 uppercase block">
            Bespoke Spatial Modeling Tool
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl text-luxury-black font-extrabold tracking-tight">
            Interactive Box Configurator
          </h2>
          <p className="text-xs text-gray-550 font-medium max-w-xl mx-auto leading-relaxed">
            Customize your packaging dimensions, select premium lamination grades, choose gold foil elements, and estimate unit costs dynamically. Once finished, submit it directly to lock down a production queue.
          </p>
        </div>

        {/* Dynamic Widget Split Frame */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 lg:gap-8 bg-gray-50 border border-gold-500/15 rounded-lg p-4 sm:p-5 shadow-sm">
          
          {/* Controls - Column Span: 7 */}
          <div className="lg:col-span-7 space-y-4 divide-y divide-gold-500/15">
            
            {/* STEP 1: Select Box Style */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="w-4 h-4 rounded-full bg-gold-500 text-white font-sans text-[10px] font-bold flex items-center justify-center">1</span>
                <span className="text-[11px] uppercase tracking-widest font-extrabold text-luxury-black">Select Packaging Format</span>
              </div>
              
              <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-2 pt-1">
                {[
                  { id: 'rigid_standard', label: 'TOP/BOTTOM', desc: 'Two-piece box' },
                  { id: 'top_bottom_window', label: 'TOP/BOTTOM + Window', desc: 'PVC Window lid' },
                  { id: 'magnetic_flap', label: 'Magnetic Flap', desc: 'Concealed Magnets' },
                  { id: 'drawer_sleeve', label: 'Sleeve & Slider', desc: 'Frictionless Pull' },
                  { id: 'shoulder_neck', label: 'Shoulder Neck', desc: 'Luxury Suction' }
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => selectBoxType(item.id as BoxType)}
                    className={`p-2.5 rounded border text-left flex flex-col justify-between transition-all duration-300 cursor-pointer relative overflow-hidden ${
                      config.type === item.id 
                        ? 'border-gold-500 bg-gold-500/5 shadow-xs ring-1 ring-gold-500/30' 
                        : 'border-gold-500/10 bg-white hover:border-gold-500/20 hover:shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start justify-between w-full">
                      <span className={`text-[10px] font-extrabold tracking-wide uppercase leading-tight ${config.type === item.id ? 'text-gold-600' : 'text-gray-700'}`}>
                        {item.label}
                      </span>
                      {config.type === item.id && (
                        <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0 animate-pulse mt-0.5" />
                      )}
                    </div>
                    <span className="text-[9px] text-gray-500 mt-1.5 font-medium leading-none block">
                      {item.desc}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* STEP 2: Sliders for Sizing Customization */}
            <div className="space-y-3 pt-4 border-t border-gold-500/10">
              <div className="flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-gold-500 text-white font-sans text-xs font-bold flex items-center justify-center">2</span>
                <span className="text-xs uppercase tracking-widest font-extrabold text-luxury-black">Adjust Dimensions (in cm)</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1.5">
                {/* Length Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-gray-600 font-semibold">Length (L)</span>
                    <span className="text-gold-600 font-extrabold">{config.length}cm</span>
                  </div>
                  <input
                    type="range"
                    name="length"
                    min="5"
                    max="50"
                    value={config.length}
                    onChange={handleInputChange}
                    className="w-full accent-gold-500 bg-gray-200 h-1 rounded"
                  />
                  <div className="flex justify-between text-[9px] text-gray-500 font-medium leading-none">
                    <span>5cm</span>
                    <span>50cm</span>
                  </div>
                </div>

                {/* Width Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-gray-600 font-semibold">Width (W)</span>
                    <span className="text-gold-600 font-extrabold">{config.width}cm</span>
                  </div>
                  <input
                    type="range"
                    name="width"
                    min="5"
                    max="50"
                    value={config.width}
                    onChange={handleInputChange}
                    className="w-full accent-gold-500 bg-gray-200 h-1 rounded"
                  />
                  <div className="flex justify-between text-[9px] text-gray-500 font-medium leading-none">
                    <span>5cm</span>
                    <span>50cm</span>
                  </div>
                </div>

                {/* Height Slider */}
                <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[11px]">
                    <span className="text-gray-600 font-semibold">Height (H)</span>
                    <span className="text-gold-600 font-extrabold">{config.height}cm</span>
                  </div>
                  <input
                    type="range"
                    name="height"
                    min="2"
                    max="25"
                    value={config.height}
                    onChange={handleInputChange}
                    className="w-full accent-gold-500 bg-gray-200 h-1 rounded"
                  />
                  <div className="flex justify-between text-[9px] text-gray-500 font-medium leading-none">
                    <span>2cm</span>
                    <span>25cm</span>
                  </div>
                </div>
              </div>

              {/* Dynamic Window Resizing Bar (Only visible if Window configuration is selected) */}
              {config.type === 'top_bottom_window' && (
                <div id="window-resize-container" className="pt-2 pb-1.5 px-3 bg-cyan-500/5 hover:bg-cyan-500/10 border border-cyan-500/15 rounded-lg space-y-2 transition-all duration-300">
                  <div className="flex justify-between items-center text-[11px]">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
                      <span className="text-cyan-900 font-bold tracking-tight">PVC Acetate Window Resizer</span>
                    </div>
                    <span className="font-mono font-extrabold text-cyan-600 text-[11px] bg-cyan-100/50 px-2 py-0.5 rounded shadow-3xs">
                      {config.windowSize ?? 55}% Ratio
                    </span>
                  </div>
                  <input
                    id="window-size-resizer"
                    type="range"
                    name="windowSize"
                    min="20"
                    max="85"
                    value={config.windowSize ?? 55}
                    onChange={handleInputChange}
                    className="w-full accent-cyan-500 bg-cyan-200/40 h-1 rounded cursor-pointer"
                  />
                  <div className="flex justify-between text-[8px] text-cyan-700/70 font-semibold font-mono tracking-wide leading-none">
                    <span>20% (Compact Peek)</span>
                    <span>50% (Standard View)</span>
                    <span>85% (Maximize Display)</span>
                  </div>
                </div>
              )}
            </div>

            {/* STEP 3: Material Quality & Finishing Selections */}
            <div className="space-y-3 pt-4 border-t border-gold-500/10">
              <div className="flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-gold-500 text-white font-sans text-xs font-bold flex items-center justify-center">3</span>
                <span className="text-xs uppercase tracking-widest font-extrabold text-luxury-black">Select Raw Stock & Custom Finishes</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1.5">
                {/* Paper Lining wrap */}
                <div className="space-y-1.5">
                  <label className="text-[11px] text-gray-600 block font-bold">Outer Cover Stock wrapping</label>
                  <select
                    name="outerPaper"
                    value={config.outerPaper}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-white text-gray-700 hover:text-gray-950 border border-gold-500/15 hover:border-gold-500/30 text-xs rounded-sm focus:outline-none focus:border-gold-500 shadow-2xs"
                  >
                    <option value="Standard Art Paper (Matte Printed)">Standard Art Paper (Matte Printed)</option>
                    <option value="Fine Linen Textured Paper (Gold Sparkle)">Fine Linen Textured Paper (Gold Sparkle)</option>
                    <option value="Deep Genuine Leatherette Craft Sheet">Deep Genuine Leatherette Craft Sheet</option>
                    <option value="Eco-Safe Kraft Textured Paper Wrapping">Eco-Safe Kraft Textured Paper Wrapping</option>
                    <option value="Premium Brushed Silk Cover Stock">Premium Brushed Silk Cover Stock</option>
                  </select>
                </div>

                {/* Finish Options */}
                <div className="space-y-1.5">
                  <label className="text-[11px] text-gray-600 block font-bold">Luxury Surface Finishing</label>
                  <select
                    name="finishType"
                    value={config.finishType}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-white text-gray-700 hover:text-gray-950 border border-gold-500/15 hover:border-gold-500/30 text-xs rounded-sm focus:outline-none focus:border-gold-500 shadow-2xs"
                  >
                    <option value="Full Matte Lamination">Full Matte Lamination</option>
                    <option value="Spot UV Coating with Matte Face">Spot UV Coating with Matte Face</option>
                    <option value="Matte Lamination + Gold Foil Stamping">Matte Lamination + Gold Foil Stamping</option>
                    <option value="Premium Deep Embossing / Debossing">Premium Deep Embossing / Debossing</option>
                    <option value="Satin Ribbon Tie & Bow Closures">Satin Ribbon Tie & Bow Closures</option>
                  </select>
                </div>

                {/* Internal partitions and inserts */}
                <div className="space-y-1.5">
                  <label className="text-[11px] text-gray-600 block font-bold">Internal Protection Cavity Insert</label>
                  <select
                    name="insertType"
                    value={config.insertType}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-white text-gray-700 hover:text-gray-950 border border-gold-500/15 hover:border-gold-500/30 text-xs rounded-sm focus:outline-none focus:border-gold-500 shadow-2xs"
                  >
                    <option value="None - Hollow Internal Basin">None - Hollow Internal Basin</option>
                    <option value="Velvet covered EVA Cavity Insert">Velvet covered EVA Cavity Insert</option>
                    <option value="High Density EPE Foam protection slots">High Density EPE Foam protection slots</option>
                    <option value="Satin fabric draped thermoforme (PVC)">Satin fabric draped thermoforme (PVC)</option>
                    <option value="Eco-Friendly folded Cardboard grid dividers">Eco-Friendly folded Cardboard grid dividers</option>
                  </select>
                </div>

                {/* Logo foil layout */}
                <div className="space-y-1.5">
                  <label className="text-[11px] text-gray-600 block font-bold">Logo Branding Execution</label>
                  <select
                    name="logoOption"
                    value={config.logoOption}
                    onChange={handleInputChange}
                    className="w-full p-2 bg-white text-gray-700 hover:text-gray-950 border border-gold-500/15 hover:border-gold-500/30 text-xs rounded-sm focus:outline-none focus:border-gold-500 shadow-2xs"
                  >
                    <option value="None - Blank Packaging">None - Blank Packaging</option>
                    <option value="High Precision Offset Ink Print">High Precision Offset Ink Print</option>
                    <option value="Hot Stamp Gold Metallic Embossing">Hot Stamp Gold Metallic Embossing</option>
                    <option value="Hot Stamp Silver Chrome Embossing">Hot Stamp Silver Chrome Embossing</option>
                    <option value="Elegant Spot Gloss UV centering">Elegant Spot Gloss UV centering</option>
                  </select>
                </div>
              </div>
            </div>

            {/* STEP 4: Quantity MOQ selection */}
            <div className="space-y-3 pt-4 border-t border-gold-500/10">
              <div className="flex items-center space-x-2">
                <span className="w-5 h-5 rounded-full bg-gold-500 text-white font-sans text-xs font-bold flex items-center justify-center">4</span>
                <span className="text-xs uppercase tracking-widest font-extrabold text-luxury-black">Select Bulk Order Target Volume</span>
              </div>

              <div className="space-y-2.5 pt-1.5">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="text-gray-650 font-semibold font-sans">Production quantity per batch</span>
                  <div className="flex items-center space-x-2">
                    <input
                      id="moq-numeric-input"
                      type="number"
                      name="quantity"
                      min="200"
                      max="100000"
                      value={config.quantity}
                      onChange={handleInputChange}
                      className="text-gold-650 font-extrabold text-xs bg-white border border-gold-500/30 px-2 py-0.5 rounded shadow-xs w-22 text-right focus:outline-none focus:border-gold-500 font-mono"
                    />
                    <span className="text-gray-500 font-bold font-mono text-[9px]">UNITS</span>
                  </div>
                </div>
                <input
                  id="moq-range-slider"
                  type="range"
                  min="0"
                  max="5"
                  step="0.01"
                  value={getSliderValueFromQty(config.quantity)}
                  onChange={(e) => {
                    const mappedQty = getQtyFromSliderValue(parseFloat(e.target.value));
                    setConfig(prev => ({ ...prev, quantity: mappedQty }));
                  }}
                  className="w-full accent-gold-500 bg-gray-200 h-1 rounded cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-500 font-medium font-sans px-1 select-none">
                  {[200, 500, 1000, 2000, 3000, 5000].map((pt) => {
                    const isClosest = getClosestPoint(config.quantity) === pt;
                    const displayLabel = pt === 5000 ? '5,000+' : pt.toLocaleString();
                    return (
                      <span
                        key={pt}
                        className={`cursor-pointer transition-all duration-205 ${
                          isClosest 
                            ? 'text-gold-600 font-extrabold scale-105' 
                            : 'text-gray-500 hover:text-gold-500'
                        }`}
                        onClick={() => setConfig(prev => ({ ...prev, quantity: pt }))}
                      >
                        {displayLabel}
                      </span>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>

          {/* Interactive Simulated Preview Panel - Column Span: 5 */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            
            {/* Real-time proportions viewer with 3D look blueprint */}
            <div className="flex-1 p-4 bg-white border border-gold-500/15 rounded-lg flex flex-col justify-between min-h-[220px] lg:min-h-[250px] relative overflow-hidden shadow-2xs">
              <div className="absolute top-2 left-2 flex items-center space-x-1.5 text-[10px] uppercase font-bold tracking-widest text-gold-600">
                <Sparkles className="w-3.5 h-3.5 animate-spin" />
                <span>Active Spec Wireframe</span>
              </div>

              {/* Blueprint Grid Lines Backing */}
              <div className="absolute inset-0 bg-[linear-gradient(rgba(197,155,39,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(197,155,39,0.02)_1px,transparent_1px)] bg-[size:10px_10px]" />

              {/* Dynamic Coordinate Labels */}
              <div className="absolute bottom-2 right-2 text-right text-[9px] font-mono text-gray-500 font-medium">
                <span>{config.length} x {config.width} x {config.height} cm</span>
              </div>

              {/* Interactive Render Box with Responsive width/height vectors matching config ratios! */}
              <div className="flex-1 flex items-center justify-center py-2.5">
                <div className="relative flex items-center justify-center" style={{ width: '160px', height: '160px' }}>
                  
                  {/* isometric 3D illusion draw lines */}
                  <div className="absolute w-[150px] h-[150px] flex items-center justify-center">
                    {/* SVG modeling box sides dynamically */}
                    <svg className="w-full h-full text-gold-500" viewBox="0 0 200 200">
                      {/* Box Top Panel */}
                      <polygon
                        points={`${100 - renderL/2},${80 - renderH/2} ${100 + renderW/2 - renderL/2},${65 - renderH/2} ${100 + renderW/2},${80 - renderH/2} ${100},${95 - renderH/2}`}
                        className="fill-stone-100 stroke-gold-500/80 stroke-[1.5]"
                      />

                      {/* Box Top Panel Window (if top_bottom_window is active) */}
                      {config.type === 'top_bottom_window' && (() => {
                        const cx = 100 + (renderW - renderL) / 4;
                        const cy = 80 - renderH / 2;
                        const ratio = (config.windowSize ?? 55) / 100;
                        
                        const p1x = cx + ((100 - renderL/2) - cx) * ratio;
                        const p1y = cy + ((80 - renderH/2) - cy) * ratio;
                        
                        const p2x = cx + ((100 + renderW/2 - renderL/2) - cx) * ratio;
                        const p2y = cy + ((65 - renderH/2) - cy) * ratio;
                        
                        const p3x = cx + ((100 + renderW/2) - cx) * ratio;
                        const p3y = cy + ((80 - renderH/2) - cy) * ratio;
                        
                        const p4x = cx + (100 - cx) * ratio;
                        const p4y = cy + ((95 - renderH/2) - cy) * ratio;
                        
                        return (
                          <polygon
                            points={`${p1x},${p1y} ${p2x},${p2y} ${p3x},${p3y} ${p4x},${p4y}`}
                            className="fill-cyan-500/10 stroke-cyan-500/50 stroke-[1.5] stroke-dasharray-[2,2]"
                          />
                        );
                      })()}
                      
                      {/* Box Front Face */}
                      <polygon
                        points={`${100 - renderL/2},${80 - renderH/2} ${100},${95 - renderH/2} ${100},${95 + renderH/2} ${100 - renderL/2},${80 + renderH/2}`}
                        className="fill-white stroke-gold-500/70 stroke-[1.5]"
                      />
                      
                      {/* Box Right Side Face */}
                      <polygon
                        points={`${100},${95 - renderH/2} ${100 + renderW/2},${80 - renderH/2} ${100 + renderW/2},${80 + renderH/2} ${100},${95 + renderH/2}`}
                        className="fill-gray-50 stroke-gold-500/60 stroke-[1.5]"
                      />

                      {/* Golden Highlight Trim Overlay for custom logo foil option */}
                      {config.logoOption.includes('Gold') && (
                        <circle cx="100" cy={`${88}`} r="6" className="fill-gold-500/20 stroke-gold-500 stroke-[1] animate-pulse" />
                      )}

                      {/* Dimension Arrow indicators */}
                      <line x1={`${100 - renderL/2}`} y1={`${80 + renderH/2 + 10}`} x2="100" y2={`${95 + renderH/2 + 10}`} className="stroke-gold-500/30 stroke-1" />
                    </svg>
                  </div>

                  {/* Little helper indicators overlay */}
                  <span className="absolute left-1 top-1/2 -translate-y-1/2 text-[8px] font-mono text-gold-600/60 font-bold">Height: {config.height}cm</span>
                </div>
              </div>

              {/* Material Detail Taglines */}
              <div className="z-10 bg-gray-50 p-2 rounded border border-gold-500/15 text-[10px] text-gray-700 shadow-2xs font-medium">
                <span className="text-gold-600 font-bold block mb-0.5 text-[9px] uppercase">COMPOSITION SPEC:</span>
                Wrapped inside <span className="text-luxury-black font-semibold">{config.outerPaper}</span> with <span className="text-luxury-black font-semibold">{config.finishType}</span>.
              </div>
            </div>

            {/* Price Estimates Metrics card or Lock Lead Capture form */}
            {!unlocked ? (
              <div className="p-4 bg-white border border-gold-500/30 rounded-lg space-y-3 shadow-md relative overflow-hidden text-left">
                {/* Visual Lock Gradient Line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-500 via-gold-600 to-yellow-500 animate-pulse" />
                
                <div className="flex justify-between items-center pb-1.5 border-b border-gray-100">
                  <span className="text-xs uppercase font-extrabold tracking-widest text-gold-600">Calculated Cost Simulator</span>
                  <div className="p-0.5 px-2 bg-yellow-500/10 text-gold-650 rounded flex items-center space-x-1 font-sans text-[9px] font-extrabold uppercase tracking-widest">
                    <Lock className="w-3 h-3" />
                    <span>Locked</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <h4 className="text-[11px] font-bold text-luxury-black font-sans leading-tight">Enter details to unlock Live wholesale prices</h4>
                  <p className="text-[10px] text-gray-500 leading-normal font-medium">
                    We require a valid phone number to instantly activate the live pricing calculation engine for all configured specifications.
                  </p>
                </div>

                <form onSubmit={handleUnlockPricingSubmit} className="space-y-2.5 pt-1">
                  {unlockError && (
                    <div className="p-1.5 bg-red-50 text-red-600 text-[9px] font-semibold rounded border border-red-200">
                      {unlockError}
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    <div className="space-y-0.5">
                      <label className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">Your Name (Optional)</label>
                      <input
                        type="text"
                        value={unlockForm.name}
                        onChange={(e) => setUnlockForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="e.g. Amit Patel"
                        className="w-full px-2 py-1 bg-gray-50 border border-gold-500/10 text-xs font-semibold text-luxury-black rounded-sm focus:outline-none focus:border-gold-500 focus:bg-white"
                      />
                    </div>

                    <div className="space-y-0.5">
                      <label className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block font-sans">WhatsApp / Phone *</label>
                      <div className="relative">
                        <span className="absolute left-2 top-1/2 -translate-y-1/2 text-[10px] font-bold text-gray-400 font-mono">+91</span>
                        <input
                          type="tel"
                          required
                          value={unlockForm.phone}
                          onChange={(e) => setUnlockForm(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="9876543210"
                          className="w-full pl-8 pr-2 py-1 bg-gray-50 border border-gold-500/10 text-xs font-bold text-luxury-black rounded-sm focus:outline-none focus:border-gold-500 focus:bg-white font-mono"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 items-end">
                    <div className="space-y-0.5">
                      <label className="text-[9px] text-gray-500 font-bold uppercase tracking-wider block">Company / Brand (Optional)</label>
                      <input
                        type="text"
                        value={unlockForm.company}
                        onChange={(e) => setUnlockForm(prev => ({ ...prev, company: e.target.value }))}
                        placeholder="e.g. Royal Cosmetics"
                        className="w-full px-2 py-1 bg-gray-50 border border-gold-500/10 text-xs font-semibold text-luxury-black rounded-sm focus:outline-none focus:border-gold-500 focus:bg-white"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isUnlocking}
                      className="w-full py-2 bg-gold-500 hover:bg-gold-600 disabled:bg-gold-300 text-white font-extrabold text-[10px] uppercase tracking-widest rounded-sm transition-all duration-300 flex items-center justify-center space-x-1 shadow-xs cursor-pointer h-7"
                    >
                      {isUnlocking ? (
                        <>
                          <div className="w-3 h-3 border-2 border-white/40 border-t-white rounded-full animate-spin mr-1"></div>
                          <span>Unlocking...</span>
                        </>
                      ) : (
                        <>
                          <Zap className="w-3 h-3 fill-white mr-1" />
                          <span>Unlock Estimates</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>

                <p className="text-[8px] text-center text-gray-400 leading-none font-medium">
                  *Your specifications will be securely saved into your inquiry queue.
                </p>
              </div>
            ) : (
              <div className="p-4 bg-white border border-gold-500/25 rounded-lg space-y-3 shadow-xs animate-fade-in text-left">
                <div className="flex justify-between items-center pb-1.5 border-b border-gray-150">
                  <h4 className="text-[11px] uppercase font-extrabold tracking-widest text-gold-600">Budget Estimate Advisor</h4>
                  <div className="p-0.5 px-2 bg-emerald-500/10 text-emerald-700 rounded flex items-center space-x-1 font-sans text-[9px] font-extrabold uppercase tracking-wide">
                    <Unlock className="w-3 h-3" />
                    <span>Unlocked</span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-4 divide-x divide-gold-500/15">
                  <div>
                    <span className="block text-[9px] text-gray-500 uppercase tracking-widest font-bold">Est. Unit Price</span>
                    <span className="block text-lg sm:text-xl font-extrabold text-luxury-black">
                      ₹{estimatedCost.min} - ₹{estimatedCost.max}
                    </span>
                  </div>
                  <div className="pl-4">
                    <span className="block text-[9px] text-gray-500 uppercase tracking-widest font-bold">Batch Range Total</span>
                    <span className="block text-base sm:text-lg font-extrabold text-gold-600">
                      ₹{(estimatedCost.total).toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* Dynamic Margins Badge info based on volume */}
                <div className="p-2 bg-gold-500/5 rounded border border-gold-500/15 flex justify-between items-center text-[10px]">
                  <div className="flex items-center space-x-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold-650 animate-pulse" />
                    <span className="font-semibold text-gray-650 font-sans">Quantity Tier Margin:</span>
                  </div>
                  <span className="font-mono font-bold text-gold-750 bg-gold-500/10 px-1.5 py-0.5 rounded text-[9px]">
                    {appliedMargin}% Markup
                  </span>
                </div>

                <p className="text-[9px] text-gray-500 leading-normal font-medium">
                  *Rough Indian wholesale indicators based on current material indices. Standard taxes and shipping extra.
                </p>

                {/* ACTION: TRANSMIT CONFIG DIRECTLY TO LOWER CONTACT FORM */}
                <button
                  id="advisor-transmit-btn"
                  onClick={transmitToContactForm}
                  className="w-full py-2.5 bg-gold-500 hover:bg-gold-600 text-white font-extrabold text-[10px] uppercase tracking-widest rounded-sm transition-all duration-300 flex items-center justify-center space-x-1 w-full shadow-sm cursor-pointer"
                >
                  <span>Add Specs to Inquiry Form</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

          </div>

        </div>

      </div>
    </section>
  );
}
