"use client";

import { useRef, useState } from "react";
import DisplayCards from "./ui/display-cards";
import { RainbowButton } from "./ui/rainbow-button";
import { ProjectCard } from "./ProjectCard";
import { FeaturedWorkCard } from "./FeaturedWorkCard";
import { Sparkles, Brain, Zap, ExternalLink } from "lucide-react";
import { Footer } from "./Footer";
import type { Project } from "../data/projects";
import type { WorkItem } from "../data/work";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";

const customCards = [
  {
    icon: <Sparkles className="size-4" />,
    title: "AI Driven Velocity",
    description: "Accelerate your ideation for a smart and adaptive UX",
    className:
      "[grid-area:stack] transition-transform duration-700 hover:-translate-y-20",
  },
  {
    icon: <Brain className="size-4" />,
    title: "System Thinking",
    description: "Consolidate your upstream product logic with downstream sales & customers need",
    className:
      "[grid-area:stack] translate-x-8 translate-y-16 transition-transform duration-700 hover:-translate-y-12",
  },
  {
    icon: <Zap className="size-4" />,
    title: "Scalable, Reusable Design Language",
    description: "Enable your team to self-serve and ship with confidence.",
    className:
      "[grid-area:stack] translate-x-16 translate-y-32 transition-transform duration-700 hover:-translate-y-2",
  },
];

interface PresentationModeProps {
  onNavigate?: (page: string) => void;
  workItems: WorkItem[];
  projects: Project[];
}

export function PresentationMode({ onNavigate, workItems, projects }: PresentationModeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  return (
    <div className="parallax-container" ref={containerRef}>
      {/* Section 1: Hero */}
      <div className="parallax-item">
        <div className="parallax-content" style={{ zIndex: 1 }}>
          <div className="flex min-h-screen w-full flex-col lg:flex-row">
            {/* Left Side - Hero Content */}
            <div className="flex w-full flex-col items-start justify-center px-4 py-12 sm:px-6 md:px-8 lg:w-1/2 lg:px-16 lg:py-20">
              <div className="max-w-3xl space-y-6">
                <h1 className="rainbow-text">
                  Jing Han
                </h1>
                <h3>Design AI Enablement Solutions</h3>
                <p className="text-xl text-muted-foreground">
                  Driving rapid product introduction with AI automation, reusabledesign frameworks with my design creativity, developer passion
                  and product systems thinking.
                  Transform Scattered processes into coherency
                </p>
                
                {/* Mobile: "I can..." button triggers modal */}
                <div className="flex flex-wrap gap-4">
                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <RainbowButton className="lg:hidden">I can...</RainbowButton>
                    </DialogTrigger>
                    <DialogContent className="max-w-[95vw] sm:max-w-[500px] p-0 overflow-hidden">
                      <DialogHeader className="px-6 pt-6 pb-2">
                        <DialogTitle>What I Can Do</DialogTitle>
                      </DialogHeader>
                      <div className="w-full overflow-x-hidden overflow-y-auto flex items-start justify-start pl-2 pr-2 pb-6 max-h-[70vh]">
                        <div className="scale-[0.58] sm:scale-[0.68] origin-top-left">
                          <DisplayCards cards={customCards} />
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                  
                  {/* Desktop: "Resume" button (hidden on mobile) */}
                  <RainbowButton asChild className="hidden lg:inline-flex group/resume">
                    <a 
                      href="https://cdn.gamma.app/07p9lb66qfoscak/e62d26f4517843788080f2e0dd82d54f/original/Jing-Resume-2025.pdf" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      Resume
                      <ExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover/resume:opacity-100" />
                    </a>
                  </RainbowButton>
                </div>
              </div>
            </div>

            {/* Right Side - Display Cards Widget (Desktop Only) */}
            <div className="hidden w-1/2 items-center justify-center bg-muted/30 lg:flex">
              <DisplayCards cards={customCards} />
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: My Work */}
      <div className="parallax-item">
        <div className="parallax-content bg-muted/30" style={{ zIndex: 2 }}>
          <div className="w-full px-4 py-12 sm:px-6 md:px-8 lg:px-16 lg:py-20" style={{ minHeight: "100vh" }}>
            <div className="mx-auto max-w-7xl space-y-4">
              <div className="space-y-4">
                <h2>Featured Work</h2>
              </div>
              
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2" style={{ overflow: 'visible' }}>
                {workItems.map((workItem) => (
                  <FeaturedWorkCard key={workItem.id} {...workItem} onNavigate={onNavigate} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Earlier Projects */}
      <div className="parallax-item">
        <div className="parallax-content bg-background" style={{ zIndex: 3 }}>
          <div className="w-full px-4 py-12 sm:px-6 md:px-8 lg:px-16 lg:py-20" style={{ minHeight: "100vh" }}>
            <div className="mx-auto max-w-7xl space-y-12">
              <div className="space-y-4">
                <h2>Earlier Projects</h2>
                <p className="text-xl text-muted-foreground">
                  A selection of my recent work showcasing innovation and creativity
                </p>
              </div>
              
              <div className="grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3" style={{ overflow: 'visible' }}>
                {projects.map((project) => (
                  <ProjectCard key={project.id} {...project} onNavigate={onNavigate} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 4: Footer */}
      <div className="parallax-item">
        <div className="parallax-content bg-background" style={{ zIndex: 4 }}>
          <Footer onNavigate={onNavigate} />
        </div>
      </div>

      <style jsx>{`
        .parallax-container {
          height: 100vh;
          overflow-y: scroll;
          scroll-snap-type: y mandatory;
          scroll-behavior: smooth;
        }

        .parallax-item {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          min-height: 100vh;
          scroll-snap-align: start;
          scroll-snap-stop: always;
          position: relative;
        }

        .parallax-content {
          position: sticky;
          top: 0;
          width: 100%;
          min-height: 100vh;
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
          overflow-y: auto;
        }
      `}</style>
    </div>
  );
}