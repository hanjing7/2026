"use client";

import { Badge } from "./ui/badge";
import { CardSpotlight } from "./ui/card-spotlight";
import { ArrowRight } from "lucide-react";

interface ProjectTag {
  name: string;
}

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  tags: ProjectTag[];
  imageUrl?: string;
  featuredTag?: string;
  gammaUrl?: string;
  onNavigate?: (page: string) => void;
}

export function ProjectCard({ id, title, description, tags, imageUrl, featuredTag, gammaUrl, onNavigate }: ProjectCardProps) {
  const handleClick = () => {
    if (gammaUrl) {
      window.open(gammaUrl, '_blank');
    } else {
      onNavigate && onNavigate(`case-study-project-${id}`);
    }
  };

  return (
    <CardSpotlight 
      className="group bg-muted/30 cursor-pointer transition-shadow duration-300 hover:shadow-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-label={`View ${title}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <div className="relative z-20 overflow-hidden">
        <div className="aspect-[4/3] w-full overflow-hidden bg-gray-100 border-b border-gray-200 relative">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={title}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-gray-50">
              <div className="rounded-full bg-gray-200 p-4">
                <div className="h-12 w-12 rounded-full border-2 border-gray-400" />
              </div>
            </div>
          )}
          
          {/* Featured Tag Overlay */}
          {featuredTag && (
            <div className="absolute right-3 top-3">
              <Badge className="bg-black text-white hover:bg-gray-800">
                {featuredTag}
              </Badge>
            </div>
          )}

          {/* Hover Overlay with View Case Study button */}
          <div className="absolute inset-0 flex items-center justify-center bg-transparent transition-all duration-300">
            <div className="translate-y-4 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
              <button className="group/btn relative inline-flex h-11 animate-rainbow cursor-pointer items-center justify-center gap-2 rounded-xl border-0 bg-[length:200%] px-8 py-2 font-medium text-primary-foreground transition-colors [background-clip:padding-box,border-box,border-box] [background-origin:border-box] [border:calc(0.08*1rem)_solid_transparent] before:absolute before:bottom-[-20%] before:left-1/2 before:z-0 before:h-1/5 before:w-3/5 before:-translate-x-1/2 before:animate-rainbow before:bg-[linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] before:bg-[length:200%] before:[filter:blur(calc(0.8*1rem))] bg-[linear-gradient(#121213,#121213),linear-gradient(#121213_50%,rgba(18,18,19,0.6)_80%,rgba(18,18,19,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] dark:bg-[linear-gradient(#fff,#fff),linear-gradient(#fff_50%,rgba(255,255,255,0.6)_80%,rgba(0,0,0,0)),linear-gradient(90deg,hsl(var(--color-1)),hsl(var(--color-5)),hsl(var(--color-3)),hsl(var(--color-4)),hsl(var(--color-2)))] shadow-lg">
                <span>View Case Study</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        <div className="p-6">
          <h5 className="mb-2">{title}</h5>
          <p className="mb-4 text-gray-600">{description}</p>
          
          <div className="flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <Badge
                key={index}
                variant="secondary"
                className="border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                {tag.name}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </CardSpotlight>
  );
}