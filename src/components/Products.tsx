import React, { useState } from 'react';
import { Box, Sparkles, Check, ChevronRight, Bookmark, ArrowRight, ShieldCheck, Gem, ShoppingBag, X, ZoomIn } from 'lucide-react';
import { ProductItem } from '../types';
// @ts-ignore
import powerBankBoxImg from '../assets/images/power_bank_box_1780657897715.png';
// @ts-ignore
import smartWatchBoxImg from '../assets/images/smart_watch_box_1780658364544.png';
// @ts-ignore
import airTagBoxImg from '../assets/images/airtag_gift_box_1780658805056.png';
// @ts-ignore
import yellowAccentBoxImg from '../assets/images/yellow_accent_box_v2_1780658994040.png';
// @ts-ignore
import emptyWhiteBoxImg from '../assets/images/empty_white_box_1780658835295.png';
// @ts-ignore
import corporateGiftBoxImg from '../assets/images/corporate_gift_box_1780999546726.png';

interface ProductsProps {
  onInquire: (productName: string) => void;
}

export default function Products({ onInquire }: ProductsProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'rigid' | 'kappa' | 'custom'>('all');
  const [zoomImage, setZoomImage] = useState<{ src: string; title: string } | null>(null);
  const [fullscreenImage, setFullscreenImage] = useState<{ src: string; title: string } | null>(null);

  const formatFeatureText = (text: string) => {
    const words = text.split(' ');
    const prefixCount = Math.min(3, words.length);
    const prefix = words.slice(0, prefixCount).join(' ');
    const remainder = words.slice(prefixCount).join(' ');
    return (
      <span className="text-[11px] text-gray-700 leading-relaxed font-medium">
        <strong className="font-serif font-bold italic text-gold-700 tracking-wide border-b border-gold-500/20 pb-0.5 mr-1.5 inline-block hover:text-gold-600 transition-colors">
          {prefix}
        </strong>{' '}
        <span className="text-gray-600 font-normal">{remainder}</span>
      </span>
    );
  };

  const products: ProductItem[] = [
    {
      id: 'p1',
      title: 'Smart Watch Box',
      category: 'rigid',
      badge: 'Bestseller',
      description: 'Modern retail smart watch packaging custom-engineered with pristine rigid walls, precise graphics, and a custom-molded internal thermoformed white safety tray designed to hold smart watches securely.',
      features: [
        'V-Grooved 90° flawless sharp edges delivering extreme shape symmetry',
        'Custom white thermoformed vacuum insert tray shaped to hold smart watches and charge wires',
        'High-contrast crisp typography offset-printed on premium 130GSM wrap sheets',
        'Built with durable 1.8mm recycled Kappa board ensuring outstanding crush resistance'
      ],
      specs: {
        material: 'Premium white art cardwrap over sturdy structure',
        thickness: '1.8mm rigid structural core',
        moq: '200 Units',
        customization: 'Fully bespoke sizing, thermoformed trays & custom prints'
      },
      details: 'Custom made shoulder-and-neck boxes for elite consumer electronics and wireless accessory launches. Engineered to resist high vibrations, moisture, and drops during parcel shipping.',
      image: smartWatchBoxImg
    },
    {
      id: 'p2',
      title: 'Premium Cosmetic & Perfume Shoulder Box',
      category: 'rigid',
      badge: 'Ultra Premium',
      description: 'Sophisticated three-piece shoulder-and-neck rigid box custom-engineered for heavy cosmetic jars, botanical perfumes, and skin creams. Features flawless right-angle V-grooves and a custom layout card neck divider.',
      features: [
        'Plush velvet-laminated interior trays precision-shaped to hold glass flacons securely',
        'Reinforced 2.2mm high-density imported greyboard core for superior compression strength',
        'Crisp custom hot-foil leaf borders in matte gold or silver metallic finishes',
        'Satisfying slow-vacuum air release on lid lift for a rich customer unboxing experience'
      ],
      specs: {
        material: 'Premium coated white art wrap sheets over hard boards',
        thickness: '2.2mm high-density core board',
        moq: '200 Units',
        customization: 'Bespoke custom neck heights, compartment patterns, and brand stamps'
      },
      details: 'Designed to elevate high-end cosmetics, wellness, and perfume collections. Work with our industrial packaging designers to construct bespoke sizes, custom satin wraps, or metallic hot stamping.',
      image: emptyWhiteBoxImg
    },
    {
      id: 'p3',
      title: 'Air Tag Rigid Box',
      category: 'rigid',
      badge: 'Featured Packaging',
      description: 'Stately rigid presentation packaging custom-designed for premium AirTag lines, keychains, and tracking accessories. Features an integrated custom-formed insert tailored to keep the luxury tracking devices and leather fobs in pristine alignment.',
      features: [
        'Secure-fit thermoformed internal cavity designed specifically for AirTag tracking devices',
        'Sturdy book-style protective lid structure delivering a delightful, seamless unboxing interaction',
        'High-density 2.0mm rigid core providing superior vibration & drop safety under parcel logistics',
        'Vivid high-resolution graphics and custom brand lettering offset-printed on premium wrap'
      ],
      specs: {
        material: 'Premium coated white art wrap sheets over hard board',
        thickness: '2.0mm premium rigid structural board',
        moq: '200 Units',
        customization: 'Bespoke thermoformed cavities, full surface gloss-lamination, and sizing'
      },
      details: 'Tailor-made for electronic device manufacturers and wearable gift sets. Work directly with our design division to construct custom box dimensions, custom foil stamped logos, or customized internal compartment layouts.',
      image: airTagBoxImg
    },
    {
      id: 'p4',
      title: 'Premium Yellow Accent Accessory Box',
      category: 'custom',
      badge: 'Bold Elegance',
      description: 'Distinctive long-form book-style magnetic box with a vibrant yellow interior frame divider. Built to house premium smart bands, writing instruments, or bespoke device sets with a modern contrasting aesthetic.',
      features: [
        'Iconic dual-tone color contrast layout utilizing bold canary yellow inner walls',
        'Extended rectangular book-style structure with easy magnetic flap opening',
        'Luxury matte black exterior wrapping with anti-fingerprint coating',
        'Tailor-made dense layout cavities ensuring minimal components rattling'
      ],
      specs: {
        material: 'Premium Dual-Tone Matte Card with Rigid Inner Core',
        thickness: '2.0mm structural rigid board',
        moq: '200 Units',
        customization: 'Custom frame wall sizing, foil printing & inner templates'
      },
      details: 'A packaging masterpiece that stands out on retail shelves and unboxings. Combining the seriousness of industrial matte black with the luxury-pop of golden-canary yellow accents, this box is perfect for modern wearable accessories or collector edition cases.',
      image: yellowAccentBoxImg
    },
    {
      id: 'p5',
      title: 'Premium Tan Leatherette Corporate Gift Set Box',
      category: 'custom',
      badge: 'Elite Creation',
      description: 'Sophisticated rigid presentation packaging matching the exact items safely. Custom-contoured partitions securely nest a tan leatherette thermos flask, an executive metal pen, a matching cardholder wallet, and a loop keychain.',
      features: [
        'Precision die-cut partition structures customized to fit each accessory tightly',
        'Premium tan leatherette wrapper paper finish for a matching executive corporate identity',
        'Sturdy heavy-duty Kraft board interior walls preventing impact during corporate shipments',
        'High-strength invisible magnetic flap closure for an elegant, premium lid seal'
      ],
      specs: {
        material: 'Premium Tan Leatherette Paper over Kraft board',
        thickness: '2.5mm extra-durable core board',
        moq: '200 Units',
        customization: 'Bespoke partition layouts, foil stamped company emblems, and coordinates'
      },
      details: 'A bespoke corporate gift option designed to present multiple high-value items together in perfect harmony. Every compartment is custom-curated based on the exact dimensions of your corporate hamper items.',
      image: corporateGiftBoxImg
    },

    {
      id: 'p6',
      title: 'Luxury Leather-Finish Corporate Gift Box',
      category: 'custom',
      badge: 'Executive Hamper',
      description: 'Superb custom-engineered rigid gift case featuring a textured tan leather-finish outer wrap and custom die-cut inner slots. Securely carries and presents elite brand assets like a matching insulated stainless steel flask and a classic faux-leather journal.',
      features: [
        'Precision-cut custom nested foam cavities preventing any movement during transit',
        'Luxurious hand-wrapped textured tan leatherette paper wrap with soft-touch feel',
        'Spacious 90-degree grooved rigid structural layout for a high-end symmetrical gift presentation',
        'Durable dual-wall frame designed to withstand heavy retail or courier shipping loads'
      ],
      specs: {
        material: 'Premium composite structures & multiple kappa sheets',
        thickness: '2.4mm dense structural core',
        moq: '200 Units',
        customization: 'Bespoke compartment patterns, sizes, and hot-foil branding'
      },
      details: 'A masterpiece of structural aesthetics and clean spacing. Built specifically for elite corporate gifting, influencer onboarding packages, or limited edition brand promotions.',
      image: powerBankBoxImg
    }
  ];

  const filteredProducts = activeTab === 'all' 
    ? products 
    : products.filter(p => p.category === activeTab);

  return (
    <section id="products" className="py-6 sm:py-8 bg-gray-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(197,155,39,0.02),transparent_60%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 font-sans">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-5 space-y-1.5">
          <span className="text-[10px] font-sans font-bold tracking-[0.3em] text-gold-600 uppercase block">
            Our Manufacturing Catalog
          </span>
          <h2 className="font-sans text-2xl sm:text-3xl text-luxury-black font-extrabold tracking-tight">
            Premium Boxes &amp; Custom Packaging
          </h2>
          <p className="text-xs text-gray-550 font-medium leading-normal">
            Our state-of-the-art facility manufactures custom rigid boxes, kappa boxes, and premium custom containers according to the highest luxury industry tolerances.
          </p>

          {/* Navigation Tab Filters */}
          <div className="flex flex-wrap justify-center gap-2 pt-4">
            {(['all', 'rigid', 'kappa', 'custom'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-1.5 text-[10px] uppercase tracking-wider rounded-sm transition-all duration-300 font-semibold border ${
                  activeTab === tab
                    ? 'bg-gold-500 text-white border-gold-500 font-bold'
                    : 'bg-white text-gray-700 border-gold-500/10 hover:text-gold-600 hover:border-gold-500/30 shadow-xs cursor-pointer'
                }`}
              >
                {tab === 'all' && 'All Products'}
                {tab === 'rigid' && 'Rigid Boxes'}
                {tab === 'kappa' && 'Kappa Boxes'}
                {tab === 'custom' && 'Bespoke Custom'}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5">
          {filteredProducts.map((p) => (
            <div
              id={`product-card-${p.id}`}
              key={p.id}
              className="group flex flex-col justify-between bg-white border border-gold-500/10 hover:border-gold-500/30 rounded-lg p-3.5 sm:p-4 relative overflow-hidden transition-all duration-300 hover:shadow-md text-left"
            >
              <div>
                {/* Product Badge Tag */}
                <div className="flex justify-between items-center mb-4">
                  <span className="text-[10px] font-bold text-gold-600 tracking-wider uppercase border border-gold-500/30 px-2.5 py-1 rounded bg-gold-500/5">
                    {p.badge}
                  </span>
                  <Bookmark className="w-4 h-4 text-gray-400 group-hover:text-gold-500 transition-colors" />
                </div>

                {/* Packaging Type Representation - Beautiful Vector Line Boxes or Image */}
                <div className="w-full h-36 bg-gray-50 rounded-md border border-gold-500/10 mb-3 flex items-center justify-center relative overflow-hidden group-hover:bg-gray-100 duration-300">
                  {p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      referrerPolicy="no-referrer"
                      className="w-full h-md object-contain transition-transform duration-500 group-hover:scale-105 p-2 h-36 cursor-zoom-in"
                      onClick={() => setFullscreenImage({ src: p.image, title: p.title })}
                      title="Click to view full screen (fit to screen)"
                    />
                  ) : (
                    <>
                      {p.category === 'rigid' && (
                        <div className="relative flex flex-col items-center">
                          {/* Suction lid styling vector */}
                          <div className="w-24 h-16 border-2 border-gold-500/60 rounded-md flex flex-col justify-between p-1.5 transform hover:-translate-y-2 duration-300 bg-white shadow-lg cursor-pointer">
                            <div className="w-full h-3 border-b border-gold-500/30 flex justify-between px-1">
                              <span className="w-1.5 h-1 bg-gold-500/40 rounded-full" />
                              <span className="w-1.5 h-1 bg-gold-500/40 rounded-full" />
                            </div>
                            <div className="text-[7px] text-center text-gold-500/70 font-mono tracking-widest mt-1">LID COVERED</div>
                            <div className="w-full h-2 bg-gold-500/20 rounded-xs" />
                          </div>
                          <div className="w-24 h-6 border-2 border-dashed border-gold-500/20 rounded-b-md mt-1 flex items-center justify-center">
                            <span className="text-[8px] text-gray-500 font-mono">BASE LINER</span>
                          </div>
                          <Gem className="absolute -top-3 -right-3 w-4 h-4 text-gold-500/30 animate-pulse" />
                        </div>
                      )}

                      {p.category === 'kappa' && (
                        <div className="relative flex flex-col items-center">
                          {/* Heavy folding kappa container styling */}
                          <div className="w-28 h-20 border-2 border-gold-500/40 rounded-md relative flex items-center justify-center bg-white shadow-inner">
                            {/* Internal grid outline dividers */}
                            <div className="absolute inset-2 border border-dashed border-gold-500/20 rounded-sm flex divide-x divide-gold-500/20">
                              <div className="flex-1 flex items-center justify-center text-[7px] text-gold-500/30 font-mono">SLOT 1</div>
                              <div className="flex-1 flex items-center justify-center text-[7px] text-gold-500/30 font-mono">SLOT 2</div>
                            </div>
                            <ShieldCheck className="w-5 h-5 text-gold-500/40 absolute right-2 bottom-2" />
                          </div>
                          <span className="text-[8px] text-gray-500 uppercase tracking-widest font-mono mt-2">Durable kappa construction</span>
                        </div>
                      )}

                      {p.category === 'custom' && (
                        <div className="relative flex items-center justify-center space-x-1">
                          {/* Drawer and sleeve vector styling */}
                          <div className="w-20 h-14 border-2 border-gold-500/30 rounded-md bg-white flex items-center justify-center text-[8px] text-gray-400 font-mono">
                            SLEEVE
                          </div>
                          <div className="w-16 h-12 border-2 border-gold-500/60 rounded-md bg-white p-1 transform translate-x-2 border-l-4 border-l-gold-500 shadow-md">
                            <div className="w-full h-full bg-gold-500/5 border border-gold-500/20 rounded-xs flex items-center justify-center">
                              <div className="w-1.5 h-1.5 bg-gold-500 rounded-full animate-pulse" />
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}
                </div>

                <h3 className="font-sans text-xs sm:text-sm text-luxury-black font-extrabold mb-1 group-hover:text-gold-600 transition-colors">
                  {p.title}
                </h3>
                <p className="text-[11px] text-gray-500 leading-normal mb-3 line-clamp-3">
                  {p.description}
                </p>

                {/* Feature checklist */}
                <div className="space-y-1 my-3">
                  {p.features.slice(0, 3).map((f, index) => (
                    <div key={index} className="flex items-start text-[10px] text-gray-705 leading-relaxed">
                      <Check className="w-3 h-3 text-gold-500 mr-1.5 mt-1 shrink-0" />
                      {formatFeatureText(f)}
                    </div>
                  ))}
                </div>

                {/* Specs Box */}
                <div className="p-2.5 bg-gray-50 rounded border border-gold-500/10 mb-4 text-[10px] leading-relaxed">
                  <div className="flex justify-between border-b border-gold-500/10 pb-1">
                    <span className="text-gray-400">Core Stock:</span>
                    <span className="text-luxury-black font-bold truncate max-w-[130px]">{p.specs.material}</span>
                  </div>
                  <div className="flex justify-between pt-1">
                    <span className="text-gray-400">Wall Gauge:</span>
                    <span className="text-luxury-black font-bold">{p.specs.thickness}</span>
                  </div>
                </div>
              </div>

              {/* Inquiry Action Buttons (On every product item, matching requested prompt triggers) */}
              <button
                id={`product-inquire-btn-${p.id}`}
                onClick={() => onInquire(p.title)}
                className="w-full py-2 mt-auto bg-gray-900 hover:bg-gold-500 text-white hover:text-white font-bold text-[11px] uppercase tracking-wider rounded-sm border border-transparent transition-all duration-300 flex items-center justify-center space-x-1.5 shadow-sm cursor-pointer"
              >
                <span>Select &amp; Inquire</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        {/* Global Catalog Disclaimer Quote */}
        <div className="mt-8 text-center p-4 bg-white border border-dashed border-gold-500/20 rounded-sm max-w-2xl mx-auto shadow-xs">
          <p className="text-[11px] text-gray-500 font-medium leading-relaxed italic">
            💡 Need a completely bespoke size? We specialize in fabricating custom dies from CAD blueprints. All our outputs undergo strict moisture testing, drop tests, and adhesive shear testing to secure pristine client delivery.
          </p>
        </div>

      </div>

      {/* Product Photo Lightbox / Modal */}
      {zoomImage && (
        <div 
          id="product-photo-lightbox"
          className="fixed inset-0 z-50 bg-luxury-black/90 backdrop-blur-md flex flex-col items-center justify-center p-4"
          onClick={() => setZoomImage(null)}
        >
          {/* Modal Box */}
          <div 
            className="bg-white border border-gold-500/25 rounded-md max-w-2xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-7 relative shadow-2xl animate-fade-in text-center font-sans scrollbar-thin"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button top-right */}
            <button
              id="close-lightbox-top"
              onClick={() => setZoomImage(null)}
              className="absolute top-4 right-4 p-2 bg-gray-900 hover:bg-gold-500 text-white rounded-full transition-all cursor-pointer z-10 border border-transparent shadow-md"
              title="Close Photo Preview"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-gold-600 tracking-[0.2em] uppercase block mb-1">
                  Product Design Preview
                </span>
                <h3 className="font-sans text-base sm:text-lg text-luxury-black font-extrabold tracking-tight">
                  {zoomImage.title}
                </h3>
              </div>

              {/* Main high-res photo representation */}
              <div 
                className="w-full h-56 sm:h-72 md:h-[320px] bg-gray-50 rounded border border-gold-500/10 flex items-center justify-center relative overflow-hidden cursor-zoom-in group/img"
                onClick={() => setFullscreenImage({ src: zoomImage.src, title: zoomImage.title })}
                title="Click to view full screen (fit to screen)"
              >
                <img
                  id="zoom-modal-img"
                  src={zoomImage.src}
                  alt={zoomImage.title}
                  className="w-full h-full object-contain p-4 transition-transform duration-300 group-hover/img:scale-[1.02]"
                  referrerPolicy="no-referrer"
                />
                {/* Floating click to zoom badge */}
                <div className="absolute top-3 right-3 bg-luxury-black/90 hover:bg-gold-500 text-white text-[9.5px] font-bold px-2 py-1 rounded flex items-center space-x-1 border border-white/10 transition-colors">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Fit to Screen</span>
                </div>
              </div>

              {/* Footer Controls with Explicit Cancel Button */}
              <div className="flex items-center justify-between pt-3 border-t border-gold-500/10 gap-3">
                <button
                  id="close-lightbox-cancel"
                  onClick={() => setZoomImage(null)}
                  className="flex-1 py-2 bg-gray-150 hover:bg-gray-200 text-gray-700 hover:text-gray-900 font-bold text-[10px] uppercase tracking-wider rounded transition-all cursor-pointer border border-gray-300/40"
                >
                  Cancel &amp; Close
                </button>

                <button
                  id="close-lightbox-inquire"
                  onClick={() => {
                    onInquire(zoomImage.title);
                    setZoomImage(null);
                  }}
                  className="flex-1 py-2 bg-gold-500 hover:bg-gold-600 text-white font-extrabold text-[10px] uppercase tracking-wider rounded-sm shadow-md cursor-pointer transition-all animate-fade-in"
                >
                  Select &amp; Inquire
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen fit-to-screen Lightbox Overlay */}
      {fullscreenImage && (
        <div 
          id="global-products-fullscreen-lightbox"
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
