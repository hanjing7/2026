"use client";

import { ArrowLeft, Home } from "lucide-react";
import { Button } from "./ui/button";

interface FloatingNavProps {
  onNavigate?: (page: string) => void;
  onBack?: () => void;
  currentPage?: string;
}

export function FloatingNav({ onNavigate, onBack, currentPage }: FloatingNavProps) {
  return (
    <div className="fixed left-0 right-0 top-0 z-50 bg-white/80 shadow-md backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-8 py-4">
        {/* Left side - Back button */}
        <div className="flex items-center gap-4">
          {onBack && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onBack}
              className="flex items-center gap-2 hover:bg-orange-50"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
          )}
          {currentPage && (
            <span className="text-sm text-muted-foreground">
              {currentPage}
            </span>
          )}
        </div>

        {/* Right side - Home button */}
        <div className="flex items-center gap-4">
          {onNavigate && (
            <Button
              variant="outline"
              size="sm"
              onClick={() => onNavigate("home")}
              className="flex items-center gap-2"
            >
              <Home className="h-4 w-4" />
              Home
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
