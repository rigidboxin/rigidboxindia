import React, { useState } from 'react';
import { Image, ZoomIn, Eye, Layers, Camera, ShieldAlert, X, Shield, Box, Tag } from 'lucide-react';

// Import high-end authentic customer rigid box assets
// @ts-ignore
import aureoSmartWatchBox from '../assets/images/airtag_gift_box_1780658805056.png';
// @ts-ignore
import powerBankBox from '../assets/images/power_bank_box_1780657897715.png';
// @ts-ignore
import smartWatchBox from '../assets/images/smart_watch_box_1780658364544.png';
// @ts-ignore
import yellowAccentBox from '../assets/images/yellow_accent_box_v2_1780658994040.png';
// @ts-ignore
import emptyWhiteBox from '../assets/images/empty_white_box_1780658835295.png';
// @ts-ignore
import corporateGiftBox from '../assets/images/corporate_gift_box_1780999546726.png';
// @ts-ignore
import bortiveWatchBox from '../assets/images/bortive_watch_box_v1_1781519039891.jpg';
// @ts-ignore
import yellowPenGiftBox from '../assets/images/gift_set_box_v1_1781519362312.jpg';
// @ts-ignore
import zzeusEarbudsBox from '../assets/images/zzeus_earbuds_box_1781520817159.jpg';
// @ts-ignore
import socksDrawerBox from '../assets/images/socks_drawer_box_1781520985207.jpg';
// @ts-ignore
import rigidBoxSuite from '../assets/images/rigid_box_india_suite_1781522930183.jpg';

interface GalleryItem {
  id: string;
  title: string;
  category: 'rigid' | 'kappa' | 'custom' | 'facility';
  categoryLabel: string;
  specs: string;
  description: string;
  image: string;
}

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<{ src: string; title: string } | null>(null);

  const galleryItems: GalleryItem[] = [
    {
      id: 'g_rigid_suite',
      title: 'Rigid Box India Finished Deluxe Corporate Collection',
      category: 'rigid',
      categoryLabel: 'Finished Rigid Box',
      specs: 'Complete Product Suite | Multi-Color Matte Foil Trims | 1.8mm Board Bases',
      description: 'Elegant deluxe flat lay showcase displaying six tailor-designed rigid sliding drawer boxes for Premium Tea, Perfume, Skincare, Chocolates, Watches, and Jewellery. Features bespoke gold foiling, soft spot-printed detail accents, robust structural corners, and smooth-gliding ribbon pullers.',
      image: rigidBoxSuite
    },
    {
      id: 'g_socks_drawer',
      title: 'Sports Compression Socks & Calf Sleeves Custom Drawer Box',
      category: 'rigid',
      categoryLabel: 'Finished Rigid Box',
      specs: '1.5mm Kraft Board | Custom Matte Black Sleeve | Patterned Sky Blue Tray',
      description: 'Dynamic sliding sleeve-and-drawer box custom designed for performance compression socks. Features a rich matte black outer sleeve wrapped with runner silhouette decals, paired with a vibrant sky-blue inner sliding container finished with elegant patterns.',
      image: socksDrawerBox
    },
    {
      id: 'g_zzeus_earbuds',
      title: 'Earbuds Premium Sliding Sleeve Box',
      category: 'rigid',
      categoryLabel: 'Finished Rigid Box',
      specs: '1.5mm Kraft White Liner | Dual-Tone Matte Sleeve | Customized Pull Tab',
      description: 'Elegant custom-engineered sliding drawer box for Zzeus premium TWS earbuds. Features a structural dual-ply design consisting of a high-contrast matte printed black outer sleeve and a sliding pristine white inner container with a structural red ribbon extraction puller.',
      image: zzeusEarbudsBox
    },
    {
      id: 'g_yellow_pen_gift',
      title: 'Executive Pen & Keyring Custom Gift Box',
      category: 'custom',
      categoryLabel: 'Custom Project',
      specs: '1.8mm Premium Kraft Board | Custom Matte Texture Wrap | Precision Vac-formed Tray',
      description: 'Sleek, executive custom-branded presentation set pairing a brilliant yellow lacquer pen and silver-brushed keyring. Designed with custom thermoformed contour tray inserts nesting each corporate gift in absolute place.',
      image: yellowPenGiftBox
    },
    {
      id: 'g_bortive_watch',
      title: 'Watch Premium Window-Lidded Watch Box',
      category: 'rigid',
      categoryLabel: 'Finished Rigid Box',
      specs: '1.8mm Kraft Board | Custom Matte Finish | Precision EVA Foam Insert',
      description: 'Stunning turquoise rigid custom-engineered smartwatch box. Elevated with a clear viewing window on the lid, premium brand typography, and an ultra-precise black high-density EVA insert custom molded to display high-end adventure watch models with absolute safety.',
      image: bortiveWatchBox
    },
    {
      id: 'g_corporate_set',
      title: 'Premium Tan Leatherette Corporate Gift Set Box',
      category: 'custom',
      categoryLabel: 'Custom Project',
      specs: '2.5mm Extra-Durable Kappa Board | Die-Cut Kraft Partition insert | Magnetic Closure Lid',
      description: 'Sophisticated rigid presentation packaging matching the exact items safely. Custom-contoured partitions securely nest a tan leatherette thermos flask, an executive metal pen, a matching cardholder wallet, and a loop keychain.',
      image: corporateGiftBox
    },
    {
      id: 'g_corp',
      title: 'Luxury Leather-Finish Corporate Gift Box',
      category: 'custom',
      categoryLabel: 'Custom Project',
      specs: '2.4mm Dense Board | Tan Leather Kraft | Bespoke Fitments & Inserts',
      description: 'Custom luxury gift box created for elite brand presentations. Features custom compartments carrying matching executive thermos & classic faux-leather handbook.',
      image: powerBankBox
    },
    {
      id: 'g_aureo_smartwatch',
      title: 'Air Tag Rigid Box',
      category: 'rigid',
      categoryLabel: 'Finished Rigid Box',
      specs: '2.0mm Premium Board | Custom Thermoformed Layout | Offset Graphics',
      description: 'Sleek rigid retail packaging crafted for digital smartwatches and wearable accessories. Features high-definition multi-color outer wraps and an integrated pristine white vacuum tray designed to nest the dial, bands, and USB charger beautifully.',
      image: aureoSmartWatchBox
    },
    {
      id: 'g_aurox',
      title: 'Smart Watch Box',
      category: 'rigid',
      categoryLabel: 'Finished Rigid Box',
      specs: '1.8mm Premium Board | 130GSM Pure White Artpaper | Custom Graphics',
      description: 'Modern telescopic retail packaging custom crafted for brand promotion. Finished using precise V-grooves to obtain flawless outer symmetry and 90° edges.',
      image: smartWatchBox
    },
    {
      id: 'g_yellow',
      title: 'Golden Accent Premium Magnetic Ribbon Box',
      category: 'custom',
      categoryLabel: 'Bespoke Project',
      specs: 'Tailored Grooving | Silk Ribbon Accents | Seamless Overlay Lid',
      description: 'Elegant dual-structure premium box with contrasting luxury gold accents, ribbon pullers, and customized matte-laminated protective base sheets.',
      image: yellowAccentBox
    },
    {
      id: 'g_white',
      title: 'Minimalist Pure White Flat-Lid Rigid Frame',
      category: 'kappa',
      categoryLabel: 'Kappa Board Box',
      specs: '2.0mm High Density Kappa | Velvet Matte Spotless Finish',
      description: 'Symmetric spotless white box prototype base engineered to highlight precise structural joints, smooth-laminated folds, and pristine tactile feedback.',
      image: emptyWhiteBox
    }
  ];

  return (
    <section id="gallery" className="py-6 sm:py-8 bg-white relative">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gold-500/2 blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full font-sans">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5 space-y-1.5">
          <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-gold-600 uppercase block">
            The Packaging Showcase
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl text-luxury-black font-extrabold tracking-tight">
            Production &amp; Finished Projects Gallery
          </h2>
          <p className="text-xs text-gray-550 font-medium max-w-xl mx-auto leading-normal">
            Flip through our custom-made, premium rigid box samples designed isometrically and crafted in real high-grade material sheets.
          </p>
        </div>

        {/* Gallery Matrix */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryItems.map((item) => (
            <div
              id={`gallery-item-card-${item.id}`}
              key={item.id}
              onClick={() => setSelectedItem(item)}
              className="group cursor-pointer bg-white border border-gold-500/10 hover:border-gold-500/30 rounded-lg overflow-hidden relative flex flex-col justify-between transition-all duration-300 hover:shadow-md"
            >
              {/* Product Visual Container */}
              <div 
                className="w-full h-40 sm:h-44 bg-gray-50 relative overflow-hidden flex items-center justify-center border-b border-gold-500/10 duration-300 cursor-zoom-in"
                onClick={(e) => {
                  e.stopPropagation();
                  setFullscreenImage({ src: item.image, title: item.title });
                }}
                title="Click image to fit fully to screen"
              >
                
                {/* Real-life imported image */}
                <img 
                  id={`gallery-img-${item.id}`}
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-contain p-2.5 transition-transform duration-500 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                />

                <span className="absolute top-1.5 right-1.5 text-[7px] bg-luxury-black/75 text-white backdrop-blur-xs border border-white/10 px-1.5 py-0.5 rounded uppercase font-mono font-bold shadow-2xs">
                  {item.categoryLabel}
                </span>

                {/* Overlaid Hover View triggers */}
                <div className="absolute inset-0 bg-luxury-black/90 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-default" onClick={(e) => e.stopPropagation()}>
                  <div className="flex space-x-4">
                    {/* Trigger Detail Specs */}
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="flex flex-col items-center space-y-1 hover:scale-105 transition-transform cursor-pointer"
                      title="Inspect Specifications"
                    >
                      <div className="w-9 h-9 bg-gold-550 hover:bg-gold-600 text-white rounded-full flex items-center justify-center shadow-md border border-white/10">
                        <Eye className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[7.5px] uppercase font-extrabold text-gold-100 tracking-wider">Specs Sheet</span>
                    </button>

                    {/* Trigger True Fullscreen Lightbox directly */}
                    <button
                      onClick={() => setFullscreenImage({ src: item.image, title: item.title })}
                      className="flex flex-col items-center space-y-1 hover:scale-105 transition-transform cursor-pointer"
                      title="Fit fully to screen"
                    >
                      <div className="w-9 h-9 bg-gray-800 hover:bg-gold-500 text-white rounded-full flex items-center justify-center shadow-md border border-white/10">
                        <ZoomIn className="w-4 h-4 text-white" />
                      </div>
                      <span className="text-[7.5px] uppercase font-extrabold text-gray-250 tracking-wider">Fit Screen</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Text metadata */}
              <div className="p-3 space-y-1.5 flex-grow flex flex-col justify-between text-left">
                <div>
                  <h3 className="font-sans text-[11px] sm:text-xs font-extrabold text-luxury-black tracking-tight leading-snug group-hover:text-gold-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[9px] text-gold-650 font-mono mt-0.5 block font-bold leading-normal">
                    {item.specs}
                  </p>
                </div>
                
                <p className="text-[11px] text-gray-550 leading-relaxed pt-1.5 border-t border-gold-500/5 font-medium">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Modal Window for Zooming Details */}
        {selectedItem && (
          <div className="fixed inset-0 z-50 bg-luxury-black/80 backdrop-blur-md flex items-center justify-center p-4">
            <div className="bg-white border border-gold-500/20 rounded-xl max-w-2xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-7 relative shadow-2xl select-none font-sans scrollbar-thin">
              
              {/* Close Button */}
              <button
                id="gallery-modal-close"
                onClick={() => setSelectedItem(null)}
                className="absolute top-4 right-4 p-2 bg-gray-900 hover:bg-gold-500 border border-transparent text-white hover:text-white transition-colors rounded-full cursor-pointer z-10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-4 text-left">
                
                {/* Top category label */}
                <div className="inline-flex items-center space-x-2 bg-gold-500/10 border border-gold-500/30 px-3 py-1 rounded-full animate-pulse">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold-500" />
                  <span className="text-[10px] font-bold text-gold-600 tracking-widest uppercase">
                    {selectedItem.categoryLabel}
                  </span>
                </div>

                {/* Real photo inside modal */}
                <div 
                  className="w-full h-56 sm:h-72 md:h-[320px] bg-gray-50 rounded-lg border border-gold-500/10 flex items-center justify-center relative overflow-hidden cursor-zoom-in group/img"
                  onClick={() => setFullscreenImage({ src: selectedItem.image, title: selectedItem.title })}
                  title="Click to view full screen (fit to screen)"
                >
                  <img
                    id={`gallery-modal-img-${selectedItem.id}`}
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-contain transition-transform duration-300 group-hover/img:scale-[1.02]"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-2 left-2 text-[9px] bg-luxury-black/70 text-white px-2 py-0.5 rounded font-mono font-bold">
                    Rigid Box India Production Sample
                  </span>
                  {/* Floating click to zoom badge */}
                  <div className="absolute top-3 right-3 bg-luxury-black/90 hover:bg-gold-500 text-white text-[9.5px] font-bold px-2 py-1 rounded flex items-center space-x-1 border border-white/10 transition-colors">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Fit to Screen</span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <h3 className="font-sans text-base sm:text-lg text-luxury-black font-extrabold tracking-tight">
                    {selectedItem.title}
                  </h3>
                  <p className="text-[11px] font-mono text-gold-600 font-bold uppercase tracking-wider">
                    📄 Specs: {selectedItem.specs}
                  </p>
                </div>

                <p className="text-gray-600 text-[11px] sm:text-xs font-medium leading-relaxed">
                  {selectedItem.description}
                </p>

                {/* Quality Standards checklist inside modal */}
                <div className="pt-3 border-t border-gold-500/10 flex flex-wrap gap-y-1.5 gap-x-5 text-[9.5px] text-gray-500 font-medium">
                  <div className="flex items-center space-x-1">
                    <span className="text-gold-500">🛡️</span>
                    <span>
                      <strong className="font-serif font-bold italic text-gold-700 tracking-wide border-b border-gold-500/20 pb-0.5 mr-1 inline-block">Moisture Checked</strong>
                      <span className="text-gray-500">Under 8%</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-gold-500">🛡️</span>
                    <span>
                      <strong className="font-serif font-bold italic text-gold-700 tracking-wide border-b border-gold-500/20 pb-0.5 mr-1 inline-block">Heavy Load</strong>
                      <span className="text-gray-500">friction tested</span>
                    </span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="text-gold-500">🛡️</span>
                    <span>
                      <strong className="font-serif font-bold italic text-gold-700 tracking-wide border-b border-gold-500/20 pb-0.5 mr-1 inline-block">Auto Corner Wrap</strong>
                      <span className="text-gray-500">perfect pasting</span>
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 gap-3">
                  <button
                    id="gallery-modal-cancel"
                    onClick={() => setSelectedItem(null)}
                    className="flex-1 py-2 bg-gray-150 hover:bg-gray-200 text-gray-700 hover:text-gray-950 font-bold text-[9.5px] uppercase tracking-wider rounded transition-all cursor-pointer border border-gray-300/40 text-center"
                  >
                    Cancel &amp; Close
                  </button>

                  <button
                    id="gallery-modal-inquire"
                    onClick={() => {
                      const contactForm = document.getElementById('contact');
                      if (contactForm) {
                        setSelectedItem(null);
                        // Trigger scrolling
                        contactForm.scrollIntoView({ behavior: 'smooth' });
                        // Fill lead requirement 
                        const reqInput = document.getElementById('requirement-field') as HTMLSelectElement | HTMLInputElement;
                        if (reqInput) {
                          reqInput.value = `Inquiry regarding: ${selectedItem.title}`;
                        }
                      }
                    }}
                    className="flex-1 py-2 bg-gold-500 hover:bg-gold-600 text-white font-extrabold text-[9.5px] uppercase tracking-wider rounded-sm shadow-md cursor-pointer text-center"
                  >
                    Request Quote
                  </button>
                </div>

              </div>
            </div>
          </div>
        )}

      </div>

      {/* Fullscreen fit-to-screen Lightbox Overlay */}
      {fullscreenImage && (
        <div 
          id="global-gallery-fullscreen-lightbox"
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
              Rigid Box India Premium Production Sample • Click outer backdrop to close
            </p>
          </div>
        </div>
      )}
    </section>
  );
}
