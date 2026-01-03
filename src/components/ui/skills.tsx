"use client";

import { useState } from "react";
import { PlusIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip";
import { skillsInfo } from "@/data/skillsInfo";

type Skill = {
  text: string;
  alt: string;
  role: string;
};

type SkillsProps = React.ComponentProps<"div">;

export function Skills({ className, ...props }: SkillsProps) {
  const skillsConfig: Skill[] = [
    { text: "Design Strategist", alt: "Design Strategist", role: "Strategist" },
    { text: "Revenue-Driver", alt: "Revenue-Driver", role: "Revenue-Driver" },
    { text: "AI-Pioneer", alt: "AI-Pioneer", role: "AI-Pioneer" },
    { text: "Design Systems Architect", alt: "Design Systems Architect", role: "Architect" },
    { text: "Process Optimizer", alt: "Process Optimizer", role: "Optimizer" },
    { text: "Technical Hybrid MVP", alt: "Technical Hybrid MVP", role: "Hybrid" },
    { text: "Cross-functional Catalyst", alt: "Cross-functional Catalyst", role: "Catalyst" },
    { text: "Product Growth Analyst", alt: "Product Growth Analyst", role: "Analyst" },
  ];

  return (
    <div
      className={cn(
        "relative grid grid-cols-1 border-x sm:grid-cols-2 md:grid-cols-4",
        className
      )}
      {...props}
    >
      <div className="-translate-x-1/2 -top-px pointer-events-none absolute left-1/2 w-screen border-t" />

      <SkillCard
        className="relative border-r border-b bg-secondary dark:bg-secondary/30"
        skill={skillsConfig[0]}
      >
        <PlusIcon
          className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6"
          strokeWidth={1}
        />
      </SkillCard>

      <SkillCard
        className="border-b md:border-r"
        skill={skillsConfig[1]}
      />

      <SkillCard
        className="relative border-r border-b md:bg-secondary dark:md:bg-secondary/30"
        skill={skillsConfig[2]}
      >
        <PlusIcon
          className="-right-[12.5px] -bottom-[12.5px] absolute z-10 size-6"
          strokeWidth={1}
        />
        <PlusIcon
          className="-bottom-[12.5px] -left-[12.5px] absolute z-10 hidden size-6 md:block"
          strokeWidth={1}
        />
      </SkillCard>

      <SkillCard
        className="relative border-b bg-secondary md:bg-background dark:bg-secondary/30 md:dark:bg-background"
        skill={skillsConfig[3]}
      />

      <SkillCard
        className="relative border-r border-b bg-secondary md:border-b-0 md:bg-background dark:bg-secondary/30 md:dark:bg-background"
        skill={skillsConfig[4]}
      >
        <PlusIcon
          className="-right-[12.5px] -bottom-[12.5px] md:-left-[12.5px] absolute z-10 size-6 md:hidden"
          strokeWidth={1}
        />
      </SkillCard>

      <SkillCard
        className="border-b bg-background md:border-r md:border-b-0 md:bg-secondary dark:md:bg-secondary/30"
        skill={skillsConfig[5]}
      />

      <SkillCard
        className="border-r"
        skill={skillsConfig[6]}
      />

      <SkillCard
        className="bg-secondary dark:bg-secondary/30"
        skill={skillsConfig[7]}
      />

      <div className="-translate-x-1/2 -bottom-px pointer-events-none absolute left-1/2 w-screen border-b" />
    </div>
  );
}

type SkillCardProps = React.ComponentProps<"div"> & {
  skill: Skill;
};

function SkillCard({ skill, className, children, ...props }: SkillCardProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Find the skill info from data
  const skillInfo = skillsInfo.find(s => s.role === skill.role);

  return (
    <Tooltip open={isOpen} onOpenChange={setIsOpen}>
      <TooltipTrigger asChild>
        <div
          className={cn(
            "group relative flex items-center justify-center bg-background px-4 py-8 transition-colors duration-300 md:p-8",
            "cursor-pointer hover:bg-muted/50",
            className
          )}
          {...props}
        >
          <span className="select-none text-center text-sm font-medium text-gray-700 md:text-base">
            {skill.text}
          </span>
          {children}
        </div>
      </TooltipTrigger>
      
      {skillInfo && (
        <TooltipContent 
          side="top" 
          className="rainbow-tooltip max-w-xs border-2 border-transparent bg-white p-4 text-gray-900 shadow-lg"
          sideOffset={8}
        >
          <div className="space-y-3">
            <h4 className="border-b border-gray-200 pb-2 font-semibold text-gray-900">
              {skill.text}
            </h4>
            <p className="text-sm leading-relaxed text-gray-700">{skillInfo.description}</p>
            <div className="flex flex-wrap gap-1">
              {skillInfo.associatedSkills.map((skill, index) => (
                <span
                  key={index}
                  className="rounded bg-gray-100 px-2 py-0.5 text-xs text-gray-700"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </TooltipContent>
      )}
    </Tooltip>
  );
}