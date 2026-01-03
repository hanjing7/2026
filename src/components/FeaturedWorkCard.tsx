"use client";

import { CardSpotlight } from "./ui/card-spotlight";
import { Badge } from "./ui/badge";

interface FeaturedWorkCardProps {
  id: string;
  title: string;
  description: string;
  images?: string[]; // Array of images for grid display
  categories?: string[]; // Changed to array
  year?: string;
  featuredTag?: string;
  gammaUrl?: string;
  onNavigate?: (page: string) => void;
}

export function FeaturedWorkCard({ 
  id, 
  title, 
  description, 
  images = [], 
  categories = [], 
  year, 
  featuredTag,
  gammaUrl, 
  onNavigate 
}: FeaturedWorkCardProps) {
  const handleClick = () => {
    if (gammaUrl) {
      window.open(gammaUrl, '_blank');
    } else {
      onNavigate && onNavigate(`case-study-work-${id}`);
    }
  };

  return (
    <CardSpotlight 
      className="group cursor-pointer transition-shadow duration-300 hover:shadow-2xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 overflow-hidden"
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
      {/* Image Grid Section */}
      <div className="relative bg-gray-100">
        <div className={`grid gap-4 ${images.length > 2 ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {images.map((imageUrl, index) => (
            <div 
              key={index}
              className={`relative overflow-hidden bg-white  ${
                images.length === 3 && index === 0 ? 'row-span-2' : ''
              }`}
            >
              <img
                src={imageUrl}
                alt={`${title} - Image ${index + 1}`}
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* Featured Tag Overlay */}
        {featuredTag && (
          <div className="absolute right-8 top-8">
            <Badge className="bg-black text-white hover:bg-gray-800">
              {featuredTag}
            </Badge>
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="bg-white p-8 space-y-4">
        {/* Title and Year */}
        <div className="flex items-start justify-between gap-4">
          <h3 className="flex-1">{title}</h3>
          {year && (
            <span className="text-muted-foreground whitespace-nowrap mt-1">
              {year}
            </span>
          )}
        </div>

        {/* Description */}
        <p className="text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Categories - Match ProjectCard styling */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            {categories.map((category, index) => (
              <Badge 
                key={index}
                variant="secondary"
                className="border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200"
              >
                {category}
              </Badge>
            ))}
          </div>
        )}
      </div>
    </CardSpotlight>
  );
}