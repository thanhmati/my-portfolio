import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import CoursesSection from './CoursesSection';
import ProjectsSection from './ProjectsSection';
import ContactSection from './ContactSection';

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-2">
      <HeroSection />

      <div className="h-px bg-gradient-to-r from-transparent via-border-dark to-transparent my-4" />

      <AboutSection />

      <div className="h-px bg-gradient-to-r from-transparent via-border-dark to-transparent my-4" />

      <CoursesSection />

      <div className="h-px bg-gradient-to-r from-transparent via-border-dark to-transparent my-4" />

      <ProjectsSection />

      <div className="h-px bg-gradient-to-r from-transparent via-border-dark to-transparent my-4" />

      <ContactSection />
    </div>
  );
}
