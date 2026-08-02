import type { Metadata, Viewport } from "next";
import { Inter, Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LoadingScreen } from "@/components/layout/LoadingScreen";
import { CursorSpotlight } from "@/components/layout/CursorSpotlight";
import { MotionConfigProvider } from "@/components/providers/MotionConfigProvider";
import { SITE } from "@/lib/constants";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
  weight: ["400", "500", "600", "700"],
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jetbrains-mono",
  weight: ["400", "500"],
});

const title = `${SITE.name} — ${SITE.role}`;
const description = `${SITE.name} is a ${SITE.role} and B.Tech Computer Science undergraduate building scalable, real-world web products with React, Next.js, Node.js, and MongoDB.`;

export const metadata: Metadata = {
  title,
  description,
  keywords: [
    "Rajendra Pal",
    "Full Stack Developer",
    "Portfolio",
    "React",
    "Next.js",
    "Node.js",
    "MongoDB",
    "TypeScript",
    "Web Developer",
    "CSE Undergraduate",
  ],
  authors: [{ name: SITE.name }],
  creator: SITE.name,
  metadataBase: new URL(SITE.url),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE.url,
    title,
    description,
    siteName: SITE.name,
    images: [
      {
        url: SITE.ogImage,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.role}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [SITE.ogImage],
    creator: "@rajendrapal",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export const viewport: Viewport = {
  themeColor: "#05070D",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  colorScheme: "dark",
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE.name,
  jobTitle: SITE.role,
  url: SITE.url,
  email: SITE.email,
  telephone: SITE.phone,
  address: { "@type": "Place", addressCountry: "IN" },
  sameAs: [SITE.github, SITE.linkedin],
  knowsAbout: [
    "React",
    "Next.js",
    "Node.js",
    "Express",
    "MongoDB",
    "TypeScript",
    "JavaScript",
    "Python",
    "Tailwind CSS",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "B.Tech Computer Science Engineering",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrains.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-bg font-sans text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-accent focus:px-4 focus:py-2 focus:text-sm"
        >
          Skip to content
        </a>
        <MotionConfigProvider>
          <LoadingScreen />
          <CursorSpotlight />
          {children}
        </MotionConfigProvider>
      </body>
    </html>
  );
}
