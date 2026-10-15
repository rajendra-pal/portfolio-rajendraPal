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
  Cpu,
  Sigma,
  Table2,
  BarChart3,
  ChartNoAxesCombined,
  Brain,
  Binary,
  Filter,
  FlaskConical,
  Activity,
} from "lucide-react";

// skills section
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
      { name: "C++", proficiency: 85, Icon: FileCode2 },
      { name: "Python", proficiency: 90, Icon: Code2 },
      { name: "JavaScript", proficiency: 80, Icon: Code2 },
      { name: "TypeScript", proficiency: 70, Icon: Code2 },
    ],
  },
  {
    id: "data science",
    title: "Data Science & Machine Learning",
    blurb: "Data analysis, statistical modeling, and ML pipelines.",
    skills: [
      { name: "Python", proficiency: 90, Icon: Code2 },
      { name: "scikit-learn", proficiency: 82, Icon: Brain },
      { name: "NumPy", proficiency: 82, Icon: Sigma },
      { name: "Pandas", proficiency: 84, Icon: Table2 },
      { name: "Matplotlib", proficiency: 75, Icon: BarChart3 },
      { name: "Seaborn", proficiency: 70, Icon: ChartNoAxesCombined },
      { name: "NLTK (NLP)", proficiency: 78, Icon: Binary },
      { name: "Data Cleaning & EDA", proficiency: 85, Icon: Filter },
      { name: "Streamlit", proficiency: 84, Icon: Activity },
    ],
  },
  {
    id: "frontend",
    title: "Frontend",
    blurb: "Interfaces engineered for clarity, speed, and responsiveness.",
    skills: [
      { name: "HTML", proficiency: 90, Icon: Globe },
      { name: "CSS", proficiency: 90, Icon: Paintbrush },
      { name: "React", proficiency: 80, Icon: Atom },
      { name: "Next.js", proficiency: 70, Icon: Triangle },
      { name: "Tailwind", proficiency: 75, Icon: Paintbrush },
      { name: "Responsive Web Design", proficiency: 88, Icon: Globe },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    blurb: "APIs, auth, and the logic that powers products.",
    skills: [
      { name: "Node.js", proficiency: 65, Icon: Server },
      { name: "Express", proficiency: 86, Icon: Server },
      { name: "Flask", proficiency: 78, Icon: FlaskConical },
      { name: "REST APIs", proficiency: 85, Icon: Workflow },
      { name: "Authentication", proficiency: 50, Icon: KeyRound },
      { name: "JWT", proficiency: 40, Icon: KeyRound },
    ],
  },
  {
    id: "fundamentals",
    title: "CS Fundamentals",
    blurb: "Core computer science concepts I apply in development.",
    skills: [
      { name: "Data Structures", proficiency: 80, Icon: Cpu },
      { name: "OOP", proficiency: 75, Icon: Cpu },
      { name: "DBMS", proficiency: 85, Icon: Database },
      { name: "Computer Networks", proficiency: 70, Icon: Workflow },
      { name: "Operating Systems", proficiency: 70, Icon: Terminal },
    ],
  },
  {
    id: "database",
    title: "Database",
    blurb: "Schema design, relational models, and query craft.",
    skills: [
      { name: "MongoDB", proficiency: 86, Icon: Database },
      { name: "MySQL", proficiency: 80, Icon: Database },
      { name: "SQL", proficiency: 86, Icon: Database },
      { name: "SQLite", proficiency: 82, Icon: Database },
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
      { name: "Streamlit", proficiency: 84, Icon: Activity },
    ],
  },
];

export const MARQUEE_ICONS: { name: string; Icon: LucideIcon }[] = [
  { name: "Python", Icon: Terminal },
  { name: "scikit-learn", Icon: Brain },
  { name: "Pandas", Icon: Table2 },
  { name: "NumPy", Icon: Sigma },
  { name: "Streamlit", Icon: Activity },
  { name: "Flask", Icon: FlaskConical },
  { name: "React", Icon: Atom },
  { name: "Next.js", Icon: Triangle },
  { name: "Node.js", Icon: Server },
  { name: "Express", Icon: Layers },
  { name: "MongoDB", Icon: Database },
  { name: "MySQL", Icon: Database },
  { name: "JavaScript", Icon: Code2 },
  { name: "TypeScript", Icon: FileCode2 },
  { name: "Git", Icon: GitBranch },
  { name: "GitHub", Icon: Github },
  { name: "VS Code", Icon: Code2 },
  { name: "Postman", Icon: Boxes },
  { name: "HTML", Icon: Globe },
  { name: "CSS", Icon: Paintbrush },
  { name: "Tailwind", Icon: Paintbrush },
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

// display numeric achievement
export const STATS: Stat[] = [
  {
    value: 5,
    suffix: "+",
    decimals: 0,
    label: "Shipped Projects",
    hint: "Full-Stack & ML end-to-end",
  },
  {
    value: 7.56,
    decimals: 2,
    label: "Current CGPA",
    hint: "B.Tech CSE (upto 6th sem)",
  },
  {
    value: 2027,
    label: "Graduating B.Tech CSE",
    hint: "2023 – 2027",
  },
];

// education path section
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
    degree: "B.Tech · Computer Science & Engineering",
    institution: "Hooghly Engineering & Technology College, West Bengal",
    period: "2023 - 2027",
    metric: "7.56",
    metricLabel: "CGPA (upto 6th sem)",
    description:
      "Pursuing B.Tech CSE with strong academic standing. Building depth across AI/ML pipelines, systems, algorithms, and full-stack web engineering while shipping real-world applications.",
  },
  {
    id: "12th",
    degree: "Higher Secondary (Class XII) · WBCHSE",
    institution: "Baidyapur Ramkrishna Vidyapith (WBCHSE)",
    period: "2020 - 2022",
    metric: "84.6%",
    metricLabel: "Score",
    description:
      "Strong academic base in Mathematics and Science under the West Bengal Council of Higher Secondary Education, establishing analytical rigor for computer science.",
  },
  {
    id: "10th",
    degree: "Secondary (Class X) · WBBSE",
    institution: "Biruha Sarat Chandra Uchcha Vidyalaya (WBBSE)",
    period: "2015 - 2020",
    metric: "90.71%",
    metricLabel: "Score",
    description:
      "Graduated with distinction under the West Bengal Board of Secondary Education. Built the foundational discipline and curiosity that drive my problem solving today.",
  },
];

// achievements and certifications
export type Achievement = {
  id: string;
  title: string;
  issuer: string;
  period?: string;
  description: string;
  highlight: string;
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: "cisco-data-science",
    title: "Introduction to Data Science Certification",
    issuer: "Cisco Networking Academy",
    description:
      "Completed comprehensive credential covering data analysis fundamentals, data collection, analytical workflows, and modern machine learning concepts.",
    highlight: "Cisco Certified",
  },
  {
    id: "fullstack-apps",
    title: "Shipped 3+ Production Full-Stack & Python Apps",
    issuer: "End-to-End Projects",
    description:
      "Built and deployed full-stack e-commerce with payments (Loknath Art Centre), an NLP ML classifier (SpamShield), an application tracking platform, and student tools.",
    highlight: "Production Ready",
  },
  {
    id: "ai-ml-learning",
    title: "Active AI & Machine Learning Practitioner",
    issuer: "Artificial Intelligence & ML",
    description:
      "Hands-on expertise training ensemble StackingClassifiers in scikit-learn, building NLP pipelines with NLTK, and developing real-time Streamlit data apps.",
    highlight: "AI/ML Focus",
  },
];

export const SPOKEN_LANGUAGES = [
  { name: "English", level: "Professional Working Proficiency" },
  { name: "Bengali", level: "Native / Bilingual Proficiency" },
  { name: "Hindi", level: "Professional Working Proficiency" },
];

// projects section
export type Project = {
  slug: string;
  title: string;
  blurb: string;
  cover: string;
  tech: string[];
  features: string[];
  live?: string;
  github?: string;
};

export const PROJECTS: Project[] = [
  {
    slug: "spamshield",
    title: "SpamShield – SMS & Email Spam Classifier",
    blurb:
      "A machine learning and NLP web application for classifying SMS and email messages with ~97.7% accuracy and real-time message analytics.",
    cover: "/project_image/spamshield.png",
    tech: ["Python", "scikit-learn", "NLTK", "Streamlit", "Machine Learning"],
    features: [
      "Built a Python NLP pipeline with NLTK (tokenization, stopword removal, Porter stemming) to preprocess text",
      "Trained a StackingClassifier ensemble (SVC, Naive Bayes, ExtraTrees), achieving ~97.7% accuracy and ~92.5% precision",
      "Developed an interactive Streamlit web app that classifies messages as spam or ham and displays message statistics",
      "Saved trained model and vectorizer for fast predictions; documented setup and usage in README",
    ],
    live: "https://sms-email-classifier-git.streamlit.app/",
    github: "https://github.com/rajendra-pal",
  },
  {
    slug: "job-application-tracker",
    title: "Job Application Tracker",
    blurb:
      "A full-stack job and internship application management platform with custom status pipelines, weekly reports, and analytics.",
    cover: "/project_image/job_tracker.jpg",
    tech: ["Python", "Flask", "SQLite", "JavaScript", "HTML/CSS", "Pandas"],
    features: [
      "Developed a job application tracker with REST APIs for CRUD operations, filtering, and validation",
      "Implemented search, sorting, status tracking pipelines, and dashboard analytics",
      "Created Pandas-based weekly reports and automated CSV export generation",
      "Built calculated response rates, status-wise application statistics, and 12 unit tests with parameterized SQL security",
    ],
    live: "",
    github: "https://github.com/rajendra-pal",
  },
  {
    slug: "loknath-art-centre",
    title: "Loknath Art Centre",
    blurb:
      "A complete e-commerce experience for a traditional art school — courses, payments, and authentication in one product.",
    cover: "/project_image/loknath-Art-Centre.png",
    tech: ["Next.js", "React", "Node.js", "Express", "MongoDB"],
    features: [
      "E-commerce catalogue for art supplies",
      "Structured drawing courses with progress tracking",
      "Email + password authentication",
      "UPI QR-based checkout flow",
      "Responsive design across devices",
    ],
    live: "https://loknath-art-centre.vercel.app/",
    github: "https://github.com/rajendra-pal/loknath-art-centre",
  },
  {
    slug: "studentfocus",
    title: "StudentFocus",
    blurb:
      "A focused productivity suite for students — goals, projects, DSA practice, and analytics on one dashboard.",
    cover: "/project_image/student_focus.png",
    tech: ["React", "TypeScript", "Tailwind"],
    features: [
      "Goal tracking with milestones",
      "Project manager with status boards",
      "DSA tracker for daily practice",
      "Personal analytics dashboard",
      "Calm, focused interface",
    ],
    live: "https://studentfocus-v862.onrender.com/",
    github: "https://github.com/rajendra-pal/studentfocus",
  },
  {
    slug: "bajale",
    title: "Bajale",
    blurb:
      "A Spotify-inspired music streaming front-end with real-time search and a responsive, audio-first layout.",
    cover: "/project_image/bajale_music.png",
    tech: ["HTML", "CSS", "JavaScript", "Node.js", "Express"],
    features: [
      "Spotify-inspired layout and motion",
      "Music streaming interface",
      "Real-time search across the catalogue",
      "Responsive across mobile and desktop",
    ],
    live: "",
    github: "https://github.com/rajendra-pal/Bajale-Music-web-app",
  },
  {
    slug: "portfolio",
    title: "Portfolio",
    blurb:
      "A beautiful portfolio website front-end with responsive design",
    cover: "/project_image/portfolio.png",
    tech: ["REACT", "CSS", "TypeScript"],
    features: [
      "Hero section with personal details and image",
      "Projects with github repo link and live preview link",
      "Work experience and education history",
      "Responsive across mobile and desktop",
    ],
    live: "https://portfolio-rajendrapal2.onrender.com/",
    github: "https://github.com/rajendra-pal/portfolio-rajendraPal",
  },
];

export const ROTATING_ROLES = [
  "Full Stack Developer",
  "AI/ML & Python Developer",
  "CSE Undergraduate",
  "Problem Solver",
] as const;
