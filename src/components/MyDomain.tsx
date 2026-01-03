"use client";

import React, { forwardRef, useRef } from "react";
import { cn } from "./ui/utils";
import { AnimatedBeam } from "./ui/animated-beam";
import { domainData } from "../data/domain";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode; isCenter?: boolean }
>(({ className, children, isCenter = false }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "z-10 flex items-center justify-center rounded-full bg-white shadow-lg transition-all duration-300 hover:scale-[1.2] hover:shadow-xl overflow-hidden",
        isCenter
          ? "size-20 p-0 sm:size-24 md:size-32"
          : "size-16 p-1 sm:size-20 md:size-24 md:p-2",
        className,
      )}
    >
      <div className={cn(isCenter && "scale-125")}>
        {children}
      </div>
    </div>
  );
});

Circle.displayName = "Circle";

export function MyDomain() {
  const containerRef = useRef<HTMLDivElement>(null);
  const centerRef = useRef<HTMLDivElement>(null);
  const domain1Ref = useRef<HTMLDivElement>(null);
  const domain2Ref = useRef<HTMLDivElement>(null);
  const domain3Ref = useRef<HTMLDivElement>(null);
  const domain4Ref = useRef<HTMLDivElement>(null);
  const domain5Ref = useRef<HTMLDivElement>(null);
  const domain6Ref = useRef<HTMLDivElement>(null);
  
  const { Domain, centerIcon } = domainData;
  
  // Split domains into left and right groups (3 each)
  const leftDomains = Domain.slice(0, 3);
  const rightDomains = Domain.slice(3, 6);
  
  const leftRefs = [domain1Ref, domain2Ref, domain3Ref];
  const rightRefs = [domain4Ref, domain5Ref, domain6Ref];

  return (
    <div
      className="relative flex h-[500px] w-full items-center justify-center overflow-visible px-2 sm:px-0"
      ref={containerRef}
    >
      <div className="flex size-full max-w-5xl max-h-[500px] items-stretch justify-between gap-2 sm:gap-6 md:gap-10">
        {/* Left column - 3 domains */}
        <div className="flex flex-col items-center justify-between gap-4 sm:gap-6 md:gap-8">
          {leftDomains.map((domain, index) => (
            <div key={domain.id} className="flex flex-col items-center gap-1 sm:gap-2 md:gap-3">
              <Circle ref={leftRefs[index]}>
                <img 
                  src={domain.icon} 
                  alt={domain.name}
                  className="h-full w-full object-contain"
                />
              </Circle>
              <p className="text-center text-xs sm:text-sm font-medium text-gray-700 max-w-[80px] sm:max-w-[100px] md:max-w-[120px]">
                {domain.name}
              </p>
            </div>
          ))}
        </div>

        {/* Center icon */}
        <div className="flex flex-col items-center justify-center gap-1 sm:gap-2 md:gap-3">
          <Circle ref={centerRef} className="relative z-20 bg-background pt-2 px-2 sm:pt-3 sm:px-3 md:pt-4 md:px-4" isCenter>
            <img 
              src={centerIcon.icon} 
              alt={centerIcon.name}
              className="h-full w-full object-contain"
            />
          </Circle>
          <p className="text-center text-xs sm:text-sm font-semibold text-gray-800 max-w-[100px] sm:max-w-[120px] md:max-w-[140px]">
            {centerIcon.name}
          </p>
        </div>

        {/* Right column - 3 domains */}
        <div className="flex flex-col items-center justify-between gap-4 sm:gap-6 md:gap-8">
          {rightDomains.map((domain, index) => (
            <div key={domain.id} className="flex flex-col items-center gap-1 sm:gap-2 md:gap-3">
              <Circle ref={rightRefs[index]}>
                <img 
                  src={domain.icon} 
                  alt={domain.name}
                  className="h-full w-full object-contain"
                />
              </Circle>
              <p className="text-center text-xs sm:text-sm font-medium text-gray-700 max-w-[80px] sm:max-w-[100px] md:max-w-[120px]">
                {domain.name}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Animated Beams - Left side to center */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={domain1Ref}
        toRef={centerRef}
        curvature={-75}
        endYOffset={-10}
        gradientStartColor="#0099ff"
        gradientStopColor="#a033ff"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={domain2Ref}
        toRef={centerRef}
        gradientStartColor="#a033ff"
        gradientStopColor="#ff5757"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={domain3Ref}
        toRef={centerRef}
        curvature={75}
        endYOffset={10}
        gradientStartColor="#ff5757"
        gradientStopColor="#ff764d"
      />

      {/* Animated Beams - Center to right side */}
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={domain4Ref}
        toRef={centerRef}
        curvature={-75}
        endYOffset={-10}
        reverse
        gradientStartColor="#ff764d"
        gradientStopColor="#ffcc00"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={domain5Ref}
        toRef={centerRef}
        reverse
        gradientStartColor="#ffcc00"
        gradientStopColor="#0099ff"
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={domain6Ref}
        toRef={centerRef}
        curvature={75}
        endYOffset={10}
        reverse
        gradientStartColor="#a033ff"
        gradientStopColor="#ff5757"
      />
    </div>
  );
}