import React from 'react';

interface LogoIconProps {
  className?: string;
  size?: number;
}

export default function LogoIcon({ className = "text-gold-500", size = 40 }: LogoIconProps) {
  return (
    <svg
      id="custom-rigidbox-logo-svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`${className} transition-transform duration-300`}
    >
      {/* 
        This high-fidelity SVG beautifully renders the official 3D isometric rigid box 
        from the logo image, displaying the premium stepped-lid / shoulder-neck 
        telescopic construction with ultra-clean golden lines.
      */}
      
      {/* 1. TOP COVER PANEL (Rhombus) */}
      <path
        d="M 50 17 L 78 31 L 50 45 L 22 31 Z"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 2. RIGHT COVER/LID SIDE */}
      <path
        d="M 78 31 L 78 46 L 50 60"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 3. FRONT-LEFT TELESCOPIC STEP (We have an elegant cut on the lid showing the inner neck) */}
      {/* The cut goes down the left seam, then slopes down-right, then vertical step up to show the cuff crease */}
      <path
        d="M 22 31 L 22 44 L 46 56 L 46 45 L 50 47"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 4. LOWER CONTAINER BASE (Both left and right bottom edges & bottom-most corner) */}
      <path
        d="M 22 44 L 22 69 L 50 83 L 78 69 L 78 46"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 5. MIDDLE VERTICAL CORNER RIDGE */}
      {/* This ridge begins at the top lid center intersections and descends to the baseline */}
      <path
        d="M 50 45 L 50 83"
        stroke="currentColor"
        strokeWidth="3.2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* 6. INNER EXPOSED NECK ACCENT LINE (Subtle premium detail indicating the high-end box construction) */}
      <path
        d="M 46 45 L 50 43"
        stroke="currentColor"
        strokeWidth="2.0"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />
    </svg>
  );
}
