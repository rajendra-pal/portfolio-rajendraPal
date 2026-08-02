import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Marquee } from "@/components/sections/Marquee";
import { Education } from "@/components/sections/Education";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main id="main" className="relative">
        <Hero />
        <About />
        <Skills />
        <Marquee />
        <Education />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}