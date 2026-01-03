"use client";

import { CardSpotlight } from "./ui/card-spotlight";
import { RainbowButton } from "./ui/rainbow-button";
import { Timeline } from "./ui/timeline";
import { Footer } from "./Footer";
import { Skills } from "./ui/skills";
import { MyDomain } from "./MyDomain";
import { useRef } from "react";

export function AboutPage({ onNavigate }: { onNavigate?: (page: string) => void }) {
  const footerRef = useRef<HTMLElement>(null);

  const experience = [
    {
      "role": "Head of Design",
      "company": "Pure Storage, Unified Seller Exp",
      "period": "Aug 2022 - Present",
      "description": "Leading the design strategy for the org-wide CPQ system from the ground up. Streamlined processes for 1.7K sales reps and 12K partners, successfully reducing quoting turnaround time from days to minutes."
    },
    {
      "role": "Senior Designer",
      "company": "Pure Storage, Pure1 Digital Exp",
      "period": "Nov 2019 - Aug 2022",
      "description": "Shaped the Pure1 Marketplace UX, driving $15M in revenue through self-service expansion and SaaS renewals. Mentored new designers and spearheaded the launch of the Pure as-a-Service model."
    },
    {
      "role": "Design Manager",
      "company": "BYTON",
      "period": "Apr 2018 - Nov 2019",
      "description": "Executed the design of an internal services platform for vehicle-based data access and OTA updates. Managed a team of three to establish a comprehensive Sketch-based design system."
    },
    {
      "role": "Lead Designer",
      "company": "FINRA",
      "period": "Apr 2018 - Nov 2019",
      "description": "Shipped three high-traffic services sites (BrokerCheck, Fund Analyzer, OFAC) attracting millions of annual visitors. Collaborated with stakeholders to streamline compliance reporting for 4,000+ firms."
    },
    {
      "role": "Designer",
      "company": "Nexient",
      "period": "Apr 2018 - Nov 2019",
      "description": "Designed web services for Fortune 500 clients, including NBC Universal, the ADP Health Portal, and the BestBuy Agent UI."
    }
  ];

  const timelineData = experience.map((exp) => ({
    title: exp.period,
    content: (
      <CardSpotlight className="bg-white p-8">
        <div className="flex flex-col justify-between space-y-1 min-h-[100px]">
          <h5 className="text-primary">{exp.role}</h5>
          <p className="text-secondary">{exp.company}</p>
          <p className="description">{exp.description}</p>
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
          <div className="text-center space-y-6">
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