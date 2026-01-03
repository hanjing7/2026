"use client";

import { FloatingDock } from "./ui/floating-dock";
import { FileText, User, Home } from "lucide-react";

interface NavigationProps {
  currentPage: string;
  onPageChange: (page: string) => void;
}

export function Navigation({ currentPage, onPageChange }: NavigationProps) {
  const links = [
    {
      title: "Home",
      icon: (
        <Home 
          className={`h-full w-full transition-colors ${ 
            currentPage === "Home" ? "text-white" : "text-gray-600"
          }`} 
        />
      ),
      href: "#",
      isActive: currentPage === "Home",
    },
    {
      title: "Article",
      icon: (
        <FileText 
          className={`h-full w-full transition-colors ${ 
            currentPage === "Article" ? "text-white" : "text-gray-600"
          }`} 
        />
      ),
      href: "#",
      isActive: currentPage === "Article",
    },
    {
      title: "About",
      icon: (
        <User 
          className={`h-full w-full transition-colors ${ 
            currentPage === "About" ? "text-white" : "text-gray-600"
          }`} 
        />
      ),
      href: "#",
      isActive: currentPage === "About",
    },
  ];

  // Override href clicks to use state management
  const handleClick = (e: React.MouseEvent, page: string) => {
    e.preventDefault();
    onPageChange(page);
  };

  // Add click handlers to links
  const linksWithHandlers = links.map((link) => ({
    ...link,
    href: "#",
    onClick: (e: React.MouseEvent) => handleClick(e, link.title),
  }));

  return (
    <div className="fixed top-8 left-1/2 z-[9999] -translate-x-1/2">
      <FloatingDock items={linksWithHandlers as any} />
    </div>
  );
}