export type Role = {
  company: string;
  href?: string;
  title: string;
  period: string;
  location: string;
  summary: string;
  highlights: string[];
  tech?: string[];
  tags: string[];
};

export const roles: Role[] = [
  {
    company: "Kolors India Private Limited",
    href: "https://www.kolorsworld.com/",
    title: "Senior Fullstack Developer",
    period: "Present",
    location: "Mumbai, India",
    summary:
      "Senior fullstack developer owning web, firmware, and home-automation work on connected electrical products — from device protocols to the apps people open.",
    highlights: [
      "Fullstack features across web products and internal tools",
      "Firmware and home-automation development on connected hardware",
      "Bridging product, hardware, and software — bugs can live in a PCB or a UI state",
    ],
    tags: ["Fullstack", "Firmware", "Home automation", "Embedded", "Product"],
  },
  {
    company: "Snapwork Technologies",
    title: "Senior Full-Stack Developer",
    period: "Jun 2025 – 2026",
    location: "Mumbai, India",
    summary:
      "Led a 2-developer team delivering full-stack services to GCash, plus rapid event-site delivery and internal POCs.",
    highlights: [
      "Owned end-to-end development of an internal MediCard POC, documentation, and handover to delivery",
      "Shipped production-ready event sites within 3 days of requirements via a reusable deployment strategy",
      "Led a 2-developer team for GCash — task delegation, code quality, feature delivery",
      "Integrated REST APIs and PostgreSQL schemas across client engagements",
      "Cut client delivery cycles ~10x with reusable component libraries and standardized API patterns",
    ],
    tech: ["React", "Node.js", "PostgreSQL", "REST"],
    tags: ["Fullstack", "Team lead", "Client delivery"],
  },
  {
    company: "Fynd (Shopsense Retail Technologies)",
    title: "3D Game Artist & Full-Stack Developer",
    period: "Dec 2022 – Apr 2025",
    location: "Mumbai, India",
    summary:
      "Bridged 3D content pipelines and full-stack product work across Fynd's product lines — Pixelbin.io, Erase.bg, Upscale.media, and generative AI launches.",
    highlights: [
      "Automated image pipelines (Python, Blender, JS) generating 100,000+ captioned AI training images",
      "Full-stack features across 8 products including Pixelbin.io, Erase.bg, Upscale.media",
      "Custom Strapi CMS for multilingual delivery across 20+ languages with real-time shared UI updates",
      "Launched AiHeadshotGenerator.media in under a week; built BharatDiffusion.ai from the ground up",
    ],
    tech: ["Python", "Blender", "Next.js", "Strapi", "TypeScript"],
    tags: ["Fullstack", "3D", "AI pipelines", "CMS"],
  },
  {
    company: "HERE Technologies",
    title: "Map Modeler",
    period: "Sep 2018 – Jun 2020",
    location: "Mumbai, India",
    summary:
      "Unity indoor-navigation POC and internal Blender training for employee cohorts.",
    highlights: [
      "Unity-based POC mobile app for indoor office navigation",
      "Trained two employee cohorts in Blender to build internal 3D asset capability",
    ],
    tech: ["Unity", "Blender"],
    tags: ["3D", "Unity", "Training"],
  },
  {
    company: "Powerweave Studio",
    title: "3D Artist (Contract)",
    period: "May 2018 – Aug 2018",
    location: "Mumbai, India",
    summary:
      "Browser-based 3D product visualization via the Sketchfab Viewer API.",
    highlights: [
      "POC 3D model viewer web app using Sketchfab Viewer API for client product review",
    ],
    tech: ["Sketchfab API"],
    tags: ["3D", "Contract"],
  },
];

export const education = [
  {
    credential: "B.Sc. Computer Science",
    school: "MVLU College, Andheri",
    year: "Mar 2023",
  },
  {
    credential: "Diploma in Game Design & Development + Animate (Flash)",
    school: "MAAC, Andheri",
    year: "Apr 2018",
  },
  {
    credential: "Higher Secondary Certificate (HSC)",
    school: "St. Francis Junior College, Borivali",
    year: "Feb 2015",
  },
  {
    credential: "Secondary School Certificate (SSC)",
    school: "Rustomjee International School, Dahisar",
    year: "Mar 2013",
  },
];

export const achievements = [
  "100K+ AI training images via in-house automation pipelines",
  "Content teams localize 20+ languages with zero developer dependency",
  "Full-stack features across 8 high-traffic products as a sole contributor",
  "Trained non-technical staff to build 3D models and pipelines",
];
