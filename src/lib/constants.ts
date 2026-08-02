/**
 * Single source of truth for all personal information.
 * Edit this file to update contact details, resume path, and OG image references.
 */

export const SITE = {
  name: "Rajendra Pal",
  initials: "RP",
  role: "Full Stack Developer",
  tagline: "Building scalable web products that solve real-world problems.",
  email: "rajendrapal3257@gmail.com", 
  phone: "+91 7029868504", 
  github: "https://github.com/rajendra-pal", 
  linkedin: "https://linkedin.com/in/rajendrapal27", 
  location: "West Bengal, India",
  resumeUrl: "/resume.pdf",
  ogImage: "/og-image.svg",
  url: "https://rajendrapal.dev", // ← replace once deployed
};

export const NAV_SECTIONS = [
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
] as const;
