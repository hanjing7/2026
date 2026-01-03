export interface SkillInfo {
  role: string;
  description: string;
  associatedSkills: string[];
}

export const skillsInfo: SkillInfo[] = [
  {
    role: "Strategist",
    description: "Leading end-to-end UX initiatives that transform business goals into high-impact digital realities.",
    associatedSkills: ["Product Strategy", "Storytelling", "Leadership", "User Research"]
  },
  {
    role: "Revenue-Driver",
    description: "Leveraging strategic design to drive massive growth, including a $15M boost in SaaS renewals.",
    associatedSkills: ["Data-driven Analytics", "Journey Mapping", "Product Strategy", "Marketplace UX"]
  },
  {
    role: "AI-Pioneer",
    description: "Exploring the frontier of interaction paradigms through advanced AI tooling and rapid vibe-coding.",
    associatedSkills: ["AI Product Design", "Midjourney", "Invideo", "Vibe Coding", "AI Strategy"]
  },
  {
    role: "Architect",
    description: "Building agile, scalable design systems that serve as the single source of truth for global teams.",
    associatedSkills: ["Design Systems", "Figma", "Sketch", "UI Library Guidance", "Version Management"]
  },
  {
    role: "Optimizer",
    description: "Streamlining enterprise workflows to reduce complex turnaround times from days to minutes.",
    associatedSkills: ["Workflow Analysis", "Agile/Sprint Planning", "JIRA", "Priority Management"]
  },
  {
    role: "Hybrid",
    description: "Fluent in both pixels and code, bridging the gap with functional prototypes in HTML, CSS, and JS.",
    associatedSkills: ["HTML/CSS", "JS (Angular)", "Tailwind CSS", "ProtoPie", "SVGator"]
  },
  {
    role: "Catalyst",
    description: "Uniting sales, engineering, and leadership to foster a culture of cross-functional innovation.",
    associatedSkills: ["Cross-functional Collaboration", "Mentoring", "Stakeholder Management", "Design Delivery"]
  },
  {
    role: "Analyst",
    description: "Using data-driven metrics and user research to validate success and continuously refine the product.",
    associatedSkills: ["Usability Testing", "Accessibility", "Product Metrics", "UAT", "Analytics"]
  }
];
