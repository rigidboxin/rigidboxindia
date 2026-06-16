import React from 'react';
import LogoIcon from './LogoIcon';

interface MainLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  darkMode?: boolean;
  align?: 'left' | 'center';
  showMotto?: boolean;
}

export default function MainLogo({ className = "", size = "md", darkMode = false, align = "left", showMotto = false }: MainLogoProps) {
  // Dimensions adaptation
  const iconSize = size === 'sm' ? 26 : size === 'lg' ? 48 : 36;
  const titleSize = size === 'sm' ? 'text-sm' : size === 'lg' ? 'text-2xl' : 'text-lg';
  const indiaSize = size === 'sm' ? 'text-[8.5px]' : size === 'lg' ? 'text-[11px]' : 'text-[9.5px]';
  const tagSize = size === 'sm' ? 'text-[8.5px]' : size === 'lg' ? 'text-[12px]' : 'text-[10.5px]';
  const spacing = size === 'sm' ? 'space-y-0.5' : 'space-y-1';

  const isCenter = align === 'center';

  return (
    <div id="company-main-brand-logo" className={`flex flex-col select-none ${isCenter ? 'items-center text-center' : 'items-start text-left'} ${className}`}>
      {/* Upper combination of Box Icon & Brand Name */}
      <div className={`flex items-center space-x-2.5 sm:space-x-3 ${isCenter ? 'justify-center' : 'justify-start'}`}>
        {/* Left: Isometric Gold 3D Box Logo Icon */}
        <div className="shrink-0 flex items-center justify-center">
          <LogoIcon size={iconSize} className="text-gold-500 duration-300" />
        </div>

        {/* Right Stack: Name & INDIA divider */}
        <div className={`flex flex-col text-left ${spacing}`}>
          {/* Rigid Box Title */}
          <span className={`font-sans font-black tracking-normal leading-none ${titleSize} ${darkMode ? 'text-white' : 'text-luxury-black'}`}>
            Rigid Box
          </span>

          {/* INDIA Divider with Flanking Lines */}
          <div className="flex items-center justify-between w-full text-center">
            {/* Left accent line */}
            <span className="h-[1px] flex-1 bg-gold-500/40"></span>
            
            {/* Center localized text block */}
            <span className={`font-sans block text-gold-500 tracking-[0.25em] font-extrabold leading-none px-2 shrink-0 ${indiaSize}`}>
              INDIA
            </span>
            
            {/* Right accent line */}
            <span className="h-[1px] flex-1 bg-gold-500/40"></span>
          </div>
        </div>
      </div>

      {/* Underneath: Beautiful 'As Envisioned, So Delivered.' tagline with flanking lines & gold clover motifs */}
      <div id="company-motto-tagline" className={`flex items-center w-full mt-2 space-x-1.5 ${isCenter ? 'justify-center mx-auto' : 'justify-start'}`}>
        {/* Left line segment */}
        <span className="h-[1px] bg-gradient-to-r from-transparent to-gold-500/50 grow max-w-[32px]"></span>
        
        {/* Left Clover Motif */}
        <svg className="w-2 h-2 text-gold-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 8l4 4-4 4-4-4z" />
          <circle cx="12" cy="4.5" r="1.5" />
          <circle cx="12" cy="19.5" r="1.5" />
          <circle cx="4.5" cy="12" r="1.5" />
          <circle cx="19.5" cy="12" r="1.5" />
        </svg>

        {/* Core Tagline Text in premium Serif */}
        <span className={`font-serif italic font-medium text-gold-600 tracking-wide whitespace-nowrap px-0.5 ${tagSize}`}>
          As Envisioned, So Delivered
        </span>

        {/* Right Clover Motif */}
        <svg className="w-2 h-2 text-gold-500 shrink-0" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 8l4 4-4 4-4-4z" />
          <circle cx="12" cy="4.5" r="1.5" />
          <circle cx="12" cy="19.5" r="1.5" />
          <circle cx="4.5" cy="12" r="1.5" />
          <circle cx="19.5" cy="12" r="1.5" />
        </svg>

        {/* Right line segment */}
        <span className="h-[1px] bg-gradient-to-l from-transparent to-gold-500/50 grow max-w-[32px]"></span>
      </div>
    </div>
  );
}
