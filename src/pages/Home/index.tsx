import HeroSection from './HeroSection';
import AboutSection from './AboutSection';
import ContactSection from './ContactSection';

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-2">
      <HeroSection />

      {/* Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-border-dark to-transparent my-4" />

      <AboutSection />

      {/* Separator */}
      <div className="h-px bg-gradient-to-r from-transparent via-border-dark to-transparent my-4" />

      {/* Placeholder sections (to be implemented in Phase 5) */}
      <section id="courses" className="py-20 text-center space-y-4">
        <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">// courses</p>
        <p className="text-slate-500 font-mono text-sm">
          Udemy Courses Showcase — coming in Phase 5
        </p>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-border-dark to-transparent my-4" />

      <section id="projects" className="py-20 text-center space-y-4">
        <p className="text-xs font-mono text-slate-500 uppercase tracking-widest">// projects</p>
        <p className="text-slate-500 font-mono text-sm">
          Project Portfolio Grid — coming in Phase 5
        </p>
      </section>

      <div className="h-px bg-gradient-to-r from-transparent via-border-dark to-transparent my-4" />

      <ContactSection />
    </div>
  );
}
