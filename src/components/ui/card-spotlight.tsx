"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "motion/react";
import { cn } from "./utils";

export function CardSpotlight({
  children,
  className,
  spotlightColor = "rainbow",
  onClick,
  tabIndex,
  role,
  onKeyDown,
  ...props
}: {
  children: React.ReactNode;
  className?: string;
  spotlightColor?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  tabIndex?: number;
  role?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLDivElement>) => void;
  [key: string]: any;
}) {
  const divRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);
  const [isFocused, setIsFocused] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();

    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  const handleMouseEnter = () => {
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setOpacity(0);
  };

  const handleFocus = () => {
    setIsFocused(true);
    setOpacity(1);
  };

  const handleBlur = () => {
    setIsFocused(false);
    setOpacity(0);
  };

  // Create rainbow gradient with low opacity
  const rainbowGradient = `
    radial-gradient(
      300px circle at ${position.x}px ${position.y}px,
      hsl(30 100% 63% / 0.12),
      hsl(60 100% 63% / 0.10) 15%,
      hsl(120 100% 63% / 0.10) 35%,
      hsl(180 100% 63% / 0.12),50%,
      transparent 70%
    )
  `;

  return (
    <div
      ref={divRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      className={cn(
        "relative border border-gray-300 bg-white",
        className
      )}
      style={{ overflow: 'visible' }}
      onClick={onClick}
      tabIndex={tabIndex}
      role={role}
      onKeyDown={onKeyDown}
      {...props}
    >
      {/* Corner Plus Icons - Heavy strokes extending beyond boundaries */}
      {/* Top Left */}
      <div className="absolute -left-[6px] -top-[6px] h-3 w-3 z-30">
        <div className="absolute left-0 top-[5px] h-[2px] w-full bg-gray-700" />
        <div className="absolute left-[5px] top-0 h-full w-[2px] bg-gray-700" />
      </div>
      
      {/* Top Right */}
      <div className="absolute -right-[6px] -top-[6px] h-3 w-3 z-30">
        <div className="absolute left-0 top-[5px] h-[2px] w-full bg-gray-700" />
        <div className="absolute left-[5px] top-0 h-full w-[2px] bg-gray-700" />
      </div>
      
      {/* Bottom Left */}
      <div className="absolute -bottom-[6px] -left-[6px] h-3 w-3 z-30">
        <div className="absolute left-0 top-[5px] h-[2px] w-full bg-gray-700" />
        <div className="absolute left-[5px] top-0 h-full w-[2px] bg-gray-700" />
      </div>
      
      {/* Bottom Right */}
      <div className="absolute -bottom-[6px] -right-[6px] h-3 w-3 z-30">
        <div className="absolute left-0 top-[5px] h-[2px] w-full bg-gray-700" />
        <div className="absolute left-[5px] top-0 h-full w-[2px] bg-gray-700" />
      </div>

      <motion.div
        className="pointer-events-none absolute -inset-px opacity-0 transition-opacity duration-300"
        style={{
          opacity,
          background: spotlightColor === "rainbow" ? rainbowGradient : `radial-gradient(600px circle at ${position.x}px ${position.y}px, ${spotlightColor}, transparent 40%)`,
        }}
      />
      {children}
    </div>
  );
}