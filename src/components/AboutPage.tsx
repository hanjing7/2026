"use client";

import { CardSpotlight } from "./ui/card-spotlight";
import { RainbowButton } from "./ui/rainbow-button";
import { Timeline } from "./ui/timeline";
import { Footer } from "./Footer";
import { Skills } from "./ui/skills";
import { MyDomain } from "./MyDomain";
import { Badge } from "./ui/badge";
import { ExternalLink, FileText, Award, FolderOpen } from "lucide-react";
import { useRef } from "react";

interface ExperienceBadge {
  label: string;
  url: string;
  icon?: "patent" | "award" | "portfolio";
}

interface ExperienceItem {
  role: string;
  company: string;
  period: string;
  description: string;
  badges?: ExperienceBadge[];
  layoutType?: "card" | "cardless"; // Control card style
  imageUrl?: string; // Optional image for cardless layout
  actionButton?: {
    label: string;
    url: string;
    icon?: "portfolio" | "external";
  };
}

export function AboutPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const footerRef = useRef<HTMLElement>(null);

  // Helper function to get the appropriate icon
  const getBadgeIcon = (iconType?: "patent" | "award" | "portfolio") => {
    switch (iconType) {
      case "patent":
        return <FileText className="h-3 w-3" />;
      case "award":
        return <Award className="h-3 w-3" />;
      case "portfolio":
        return <FolderOpen className="h-3 w-3" />;
      default:
        return null;
    }
  };

  const getActionIcon = (iconType?: "portfolio" | "external") => {
    switch (iconType) {
      case "portfolio":
        return <FolderOpen className="h-4 w-4" />;
      case "external":
        return <ExternalLink className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const experience: ExperienceItem[] = [
    {
      role: "Head of Design",
      company: "Pure Storage, Unified Seller Exp",
      period: "Aug 2022 - Present",
      description: "Leading the design strategy for the org-wide CPQ system from the ground up. Streamlined processes for 1.7K sales reps and 12K partners, successfully reducing quoting turnaround time from days to minutes.",
      layoutType: "card",
      badges: [
        { label: "Pure Realize Patent: US-20250077097-A1", url: "https://cdn.gamma.app/07p9lb66qfoscak/a13afa3c97e343a6829a1b079f3fb4ef/original/blob.png", icon: "patent" },
        { label: "CPQ Patent: 20250390410", url: "https://cdn.gamma.app/07p9lb66qfoscak/e7d6cb1ed8514192a8fca8a863b3316a/original/blob.png", icon: "patent" }
      ]
    },
    {
      role: "Senior Designer",
      company: "Pure Storage, Pure1 Digital Exp",
      period: "Nov 2019 - Aug 2022",
      description: "Shaped the Pure1 Marketplace UX, driving $15M in revenue through self-service expansion and SaaS renewals. Mentored new designers and spearheaded the launch of the Pure as-a-Service model.",
      layoutType: "card",
      badges: [
        { label: "A' Design Award Silver", url: "https://competition.adesignaward.com/gooddesign.php?ID=119708", icon: "award" }
      ]
    },
    {
      role: "Byton-Genesis",
      company: "",
      period: "2019",
      description: "Where Automotive UX meets the Web. An 4 months exploration of remote touchpad logic and vivid, real-time feedback in Angular8.",
      layoutType: "cardless",
      imageUrl: "https://cdn.gamma.app/07p9lb66qfoscak/placeholder.png", // Placeholder URL
      actionButton: {
        label: "Archived Portfolio",
        url: "https://hanjing7.github.io/portfolio2020/home",
        icon: "portfolio"
      }
    },
    {
      role: "Design Manager",
      company: "BYTON",
      period: "Apr 2018 - Nov 2019",
      description: "Executed the design of an internal services platform for vehicle-based data access and OTA updates. Managed a team of three to establish a comprehensive Sketch-based design system.",
      layoutType: "card"
    },
    {
      role: "Lead Designer",
      company: "FINRA",
      period: "Apr 2016 - Apr 2018",
      description: "Shipped three high-traffic services sites (BrokerCheck, Fund Analyzer, OFAC) attracting millions of annual visitors. Collaborated with stakeholders to streamline compliance reporting for 4,000+ firms.",
      layoutType: "card",
      badges: [
        { label: "BrokerCheck", url: "#", icon: "award" },
        { label: "Fund Analyzer", url: "#", icon: "award" },
        { label: "OFAC", url: "#", icon: "award" }
      ]
    },
    {
      role: "Designer",
      company: "Nexient",
      period: "Jan 2015 - Apr 2016",
      description: "Designed web services for Fortune 500 clients, including NBC Universal, the ADP Health Portal, and the BestBuy Agent UI.",
      layoutType: "card"
    }
  ];

  const timelineData = experience.map((exp) => ({
    title: exp.period,
    content: exp.layoutType === "cardless" ? (
      // Cardless layout with 2-column grid
      <div className="p-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Left column - content */}
          <div className="space-y-4">
            <h5 className="text-primary">{exp.role}</h5>
            {exp.company && <p className="text-secondary">{exp.company}</p>}
            <p className="description">{exp.description}</p>
            
            {exp.actionButton && (
              <RainbowButton asChild className="group/action">
                <a 
                  href={exp.actionButton.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2"
                >
                  {getActionIcon(exp.actionButton.icon)}
                  {exp.actionButton.label}
                  <ExternalLink className="h-4 w-4 opacity-0 transition-opacity group-hover/action:opacity-100" />
                </a>
              </RainbowButton>
            )}
          </div>
          
          {/* Right column - image placeholder */}
          <div className="aspect-[4/3] bg-gray-100 border border-gray-200 rounded-lg flex items-center justify-center overflow-hidden">
            {exp.imageUrl ? (
              <img src={exp.imageUrl} alt={exp.role} className="w-full h-full object-cover" />
            ) : (
              <p className="text-gray-400 text-sm">Image placeholder</p>
            )}
          </div>
        </div>
      </div>
    ) : (
      // Card layout
      <CardSpotlight className="bg-white p-8">
        <div className="flex flex-col justify-between space-y-1 min-h-[100px]">
          <h5 className="text-primary">{exp.role}</h5>
          {exp.company && <p className="text-secondary">{exp.company}</p>}
          <p className="description">{exp.description}</p>
          {exp.badges && (
            <div className="flex flex-wrap gap-2 mt-2">
              {exp.badges.map((badge, index) => (
                <Badge 
                  key={index} 
                  asChild 
                  variant="secondary"
                  className="border-gray-200 bg-gray-100 text-gray-700 hover:bg-gray-200 group/badge"
                >
                  <a 
                    href={badge.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1"
                  >
                    {getBadgeIcon(badge.icon)}
                    {badge.label}
                    <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover/badge:opacity-100" />
                  </a>
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardSpotlight>
    ),
  }));

  const scrollToFooter = () => {
    footerRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="w-full">
      {/* Combined About Me, Domain Expertise & Skills Section - Gradient dotted background */}
      <section className="w-full px-4 pt-12 sm:px-6 md:px-8 lg:px-16 lg:pt-16 bg-gradient-to-br from-gray-50 via-orange-50/30 to-purple-50/20 dotted-bg-light">
        <div className="mx-auto max-w-7xl space-y-16">
          {/* About Me Header */}
          <div className="text-center space-y-6 pt-12">
            <h1>About Me</h1>
            <p className="description-large max-w-4xl mx-auto">
              As a seasoned Design Leader with over a decade of experience, 
              I specialize in bridging the gap between high-level business strategy 
              and technical execution to deliver
              <span className="rainbow-text font-bold"> scalable, high-impact</span> results. 
              <br/>
              Foster a culture of <span className="rainbow-text font-bold">innovation</span> that aligns with your core business objectives.
            </p>
            <div className="flex justify-center">
              <RainbowButton onClick={scrollToFooter}>Get In Touch</RainbowButton>
            </div>
          </div>

          {/* Domain Expertise Visualization */}
          <MyDomain />

          {/* Skills Section */}
          <div className="space-y-8">
            <Skills />
          </div>
        </div>
      </section>

      {/* Experience Section - Pure grey background without pattern */}
      <section className="section-bg-grey w-full px-4 py-12 sm:px-6 md:px-8 lg:px-16 lg:py-20">
        <div className="mx-auto max-w-7xl space-y-12">
          <h2 className="heading-2">My Journey</h2>
          
          <Timeline data={timelineData} />
        </div>
      </section>

      {/* Footer Section */}
      <Footer onNavigate={onNavigate} ref={footerRef} />
    </div>
  );
}
