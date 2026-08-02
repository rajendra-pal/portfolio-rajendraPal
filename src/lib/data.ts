import type { LucideIcon } from "lucide-react";
import {
  Atom,
  Boxes,
  Code2,
  Database,
  FileCode2,
  GitBranch,
  Github,
  Globe,
  KeyRound,
  Layers,
  Package,
  Paintbrush,
  Server,
  Terminal,
  Triangle,
  Workflow,
} from "lucide-react";

export type Skill = {
  name: string;
  proficiency: number; // 0–100
  Icon: LucideIcon;
};

export type SkillCategory = {
  id: string;
  title: string;
  blurb: string;
  skills: Skill[];
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "languages",
    title: "Languages",
    blurb: "The foundations I write logic in.",
    skills: [
      { name: "C", proficiency: 78, Icon: FileCode2 },
      { name: "C++", proficiency: 80, Icon: FileCode2 },
      { name: "Python", proficiency: 88, Icon: Code2 },
      { name: "JavaScript", proficiency: 92, Icon: Code2 },
      { name: "TypeScript", proficiency: 86, Icon: Code2 },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    blurb: "Interfaces engineered for clarity and speed.",
    skills: [
      { name: "HTML", proficiency: 95, Icon: Globe },
      { name: "CSS", proficiency: 92, Icon: Paintbrush },
      { name: "React", proficiency: 92, Icon: Atom },
      { name: "Next.js", proficiency: 86, Icon: Triangle },
      { name: "Tailwind", proficiency: 90, Icon: Paintbrush },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    blurb: "APIs, auth, and the logic that powers products.",
    skills: [
      { name: "Node.js", proficiency: 88, Icon: Server },
      { name: "Express", proficiency: 86, Icon: Server },
      { name: "REST APIs", proficiency: 88, Icon: Workflow },
      { name: "Authentication", proficiency: 82, Icon: KeyRound },
      { name: "JWT", proficiency: 84, Icon: KeyRound },
    ],
  },
  {
    id: "database",
    title: "Database",
    blurb: "Schema design and query craft.",
    skills: [
      { name: "MongoDB", proficiency: 86, Icon: Database },
      { name: "MySQL", proficiency: 80, Icon: Database },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    blurb: "My daily craft kit.",
    skills: [
      { name: "Git", proficiency: 92, Icon: GitBranch },
      { name: "GitHub", proficiency: 92, Icon: Github },
      { name: "VS Code", proficiency: 95, Icon: Code2 },
      { name: "Postman", proficiency: 88, Icon: Boxes },
      { name: "npm", proficiency: 90, Icon: Package },
    ],
  },
];

export const MARQUEE_ICONS: { name: string; Icon: LucideIcon }[] = [
  { name: "React", Icon: Atom },
  { name: "Next.js", Icon: Triangle },
  { name: "Node.js", Icon: Server },
  { name: "Express", Icon: Layers },
  { name: "MongoDB", Icon: Database },
  { name: "JavaScript", Icon: Code2 },
  { name: "TypeScript", Icon: FileCode2 },
  { name: "Python", Icon: Terminal },
  { name: "Git", Icon: GitBranch },
  { name: "GitHub", Icon: Github },
  { name: "VS Code", Icon: Code2 },
  { name: "HTML", Icon: Globe },
  { name: "CSS", Icon: Paintbrush },
  { name: "Tailwind", Icon: Paintbrush },
  { name: "Postman", Icon: Boxes },
  { name: "MySQL", Icon: Database },
  { name: "JWT", Icon: KeyRound },
  { name: "NPM", Icon: Package },
];

export type Stat = {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  hint: string;
};

export const STATS: Stat[] = [
  {
    value: 3,
    suffix: "+",
    decimals: 0,
    label: "Full Stack Projects",
    hint: "Shipped end-to-end",
  },
  {
    value: 7.56,
    decimals: 2,
    label: "Current CGPA",
    hint: "B.Tech Computer Science",
  },
  {
    value: 2027,
    label: "Graduating B.Tech CSE",
    hint: "2023 – 2027",
  },
];

export type Education = {
  id: string;
  degree: string;
  institution: string;
  period: string;
  metric: string;
  metricLabel: string;
  description: string;
};

export const EDUCATION: Education[] = [
  {
    id: "btech",
    degree: "B.Tech · Computer Science Engineering",
    institution: "Hooghly Engineering & Technology College, West Bengal",
    period: "2023 – 2027",
    metric: "7.56",
    metricLabel: "CGPA",
    description:
      "Building depth across systems, algorithms, and modern web engineering while shipping real projects outside the classroom.",
  },
  {
    id: "12th",
    degree: "Higher Secondary (Class XII)",
    institution: "Baidyapur Ramkrishna Vidyapith",
    period: "2020 – 2022",
    metric: "84.6%",
    metricLabel: "Score",
    description:
      "Strong academic base in Mathematics, Science that set the stage for a CS undergraduate path.",
  },
  {
    id: "10th",
    degree: "Secondary (Class X)",
    institution: "Biruha Sarat Chandra Uchcha Vidyalaya",
    period: "2015 – 2020",
    metric: "90.71%",
    metricLabel: "Score",
    description:
      "Built the discipline and curiosity that still drive how I solve problems today.",
  },
];

export type Project = {
  slug: string;
  title: string;
  blurb: string;
  cover: string; // gradient seed — user can swap with real /projects/<slug>.png
  tech: string[];
  features: string[];
  live?: string;
  github?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "loknath-art-centre",
    title: "Loknath Art Centre",
    blurb:
      "A complete e-commerce experience for a traditional art school — courses, payments, and authentication in one product.",
    cover: "from-[#1E3A8A] via-[#3B82F6] to-[#60A5FA]",
    tech: ["Next.js", "React", "Node.js", "Express", "MongoDB"],
    features: [
      "E-commerce catalogue for art supplies",
      "Structured drawing courses with progress tracking",
      "Email + password authentication",
      "UPI QR-based checkout flow",
      "Responsive design across devices",
    ],
    live: "https://loknathartcentre.example.com",
    github: "https://github.com/rajendrapal/loknath-art-centre",
  },
  {
    slug: "studentfocus",
    title: "StudentFocus",
    blurb:
      "A focused productivity suite for students — goals, projects, DSA practice, and analytics on one dashboard.",
    cover: "from-[#0F172A] via-[#1D4ED8] to-[#3B82F6]",
    tech: ["React", "TypeScript", "Tailwind"],
    features: [
      "Goal tracking with milestones",
      "Project manager with status boards",
      "DSA tracker for daily practice",
      "Personal analytics dashboard",
      "Calm, focused interface",
    ],
    live: "",
    github: "https://github.com/rajendrapal/studentfocus",
  },
  {
    slug: "bajale",
    title: "Bajale",
    blurb:
      "A Spotify-inspired music streaming front-end with real-time search and a responsive, audio-first layout.",
    cover: "from-[#1E1B4B] via-[#4338CA] to-[#60A5FA]",
    tech: ["HTML", "CSS", "JavaScript", "Node.js", "Express"],
    features: [
      "Spotify-inspired layout and motion",
      "Music streaming interface",
      "Real-time search across the catalogue",
      "Responsive across mobile and desktop",
    ],
    live: "",
    github: "https://github.com/rajendrapal/bajale",
  },
];

export const ROTATING_ROLES = [
  "Full Stack Developer",
  "CSE Undergraduate",
  "Problem Solver",
] as const;
