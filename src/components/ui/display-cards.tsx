"use client";

import { useState } from "react";
import { cn } from "./utils";
import { Sparkles } from "lucide-react";

interface DisplayCardProps {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  date?: string;
  iconClassName?: string;
  titleClassName?: string;
}

function DisplayCard({
  className,
  icon = <Sparkles className="size-4" />,
  title = "Featured",
  description = "Discover amazing content",
  date = "Just now",
  iconClassName = "",
  titleClassName = "",
  isFront = false,
  isHovered = false,
  isAnyOtherHovered = false,
  onMouseEnter = () => {},
  onMouseLeave = () => {},
}: DisplayCardProps & {
  isFront?: boolean;
  isHovered?: boolean;
  isAnyOtherHovered?: boolean;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
}) {
  // Show rainbow text if:
  // 1. This card is hovered, OR
  // 2. This is the front card AND no other card is hovered
  const showRainbow = isHovered || (isFront && !isAnyOtherHovered);
  const showWhiteIcon = isHovered || (isFront && !isAnyOtherHovered);

  return (
    <div
      className={cn(
        "group relative flex h-48 w-[28rem] -skew-y-[8deg] select-none flex-col gap-3 rounded-xl border-2 bg-muted/70 backdrop-blur-sm px-6 py-5 transition-all duration-700 after:absolute after:-right-1 after:top-[-5%] after:h-[110%] after:w-[26rem] after:bg-gradient-to-l after:from-background/70 after:to-transparent after:content-[''] hover:border-white/20 hover:bg-muted",
        className
      )}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="flex items-center gap-2">
        <span
          className={cn(
            "relative inline-block rounded-full p-1 transition-all duration-700",
            showWhiteIcon ? "bg-foreground" : "bg-muted-foreground/30"
          )}
        >
          <span
            className={cn(
              "transition-colors duration-700",
              showWhiteIcon ? "text-white" : "text-muted-foreground"
            )}
          >
            {icon}
          </span>
        </span>
        <p
          className={cn(
            "text-lg font-medium transition-colors duration-700",
            showRainbow ? "rainbow-text" : "text-muted-foreground",
            titleClassName
          )}
        >
          {title}
        </p>
      </div>
      <p className="whitespace-normal text-lg leading-relaxed line-clamp-4 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

interface DisplayCardsProps {
  cards?: DisplayCardProps[];
}

export default function DisplayCards({ cards }: DisplayCardsProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const defaultCards = [
    {
      className: "[grid-area:stack] hover:-translate-y-10 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-16 translate-y-10 hover:-translate-y-1 before:absolute before:w-[100%] before:outline-1 before:rounded-xl before:outline-border before:h-[100%] before:content-[''] before:bg-blend-overlay before:bg-background/50 grayscale-[100%] hover:before:opacity-0 before:transition-opacity before:duration:700 hover:grayscale-0 before:left-0 before:top-0",
    },
    {
      className: "[grid-area:stack] translate-x-32 translate-y-20 hover:translate-y-10",
    },
  ];

  const displayCards = cards || defaultCards;

  return (
    <div className="grid [grid-template-areas:'stack'] place-items-center opacity-100 animate-in fade-in-0 duration-700">
      {displayCards.map((cardProps, index) => (
        <DisplayCard
          key={index}
          {...cardProps}
          isFront={index === displayCards.length - 1}
          isHovered={hoveredIndex === index}
          isAnyOtherHovered={hoveredIndex !== null && hoveredIndex !== index}
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
        />
      ))}
    </div>
  );
}