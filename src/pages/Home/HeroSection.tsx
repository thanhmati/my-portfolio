import { useEffect, useState } from 'react';
import { ArrowDown, Layers, BookOpen } from 'lucide-react';
import TerminalWidget from '../../components/Terminal/TerminalWidget';
import { PROFILE } from '../../data/profile';

const ROLES = [
  'Full Stack Developer',
  'Udemy Instructor',
  'NestJS & Microservices',
  'Spring Boot Engineer',
  'AI App Builder',
];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect for rotating roles
  useEffect(() => {
    const current = ROLES[roleIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && displayed.length < current.length) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 80);
    } else if (!isDeleting && displayed.length === current.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2200);
    } else if (isDeleting && displayed.length > 0) {
      timeout = setTimeout(() => setDisplayed(current.slice(0, displayed.length - 1)), 40);
    } else if (isDeleting && displayed.length === 0) {
      setIsDeleting(false);
      setRoleIndex(prev => (prev + 1) % ROLES.length);
    }

    return () => clearTimeout(timeout);
  }, [displayed, isDeleting, roleIndex]);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="min-h-[calc(100vh-4rem)] flex flex-col justify-center gap-10 py-12 md:py-20"
    >
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* ── Left column ── */}
        <div className="flex flex-col gap-6 animate-fade-up">


          {/* Headline */}
          <div className="space-y-2">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold font-heading leading-tight text-slate-50">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-accent-emerald via-accent-cyan to-accent-violet bg-clip-text text-transparent">
                {PROFILE.name}
              </span>
            </h1>
            <div className="text-xl sm:text-2xl font-mono text-slate-400 h-8 flex items-center gap-1">
              <span className="text-accent-violet">$</span>&nbsp;
              <span className="text-slate-200">{displayed}</span>
              <span className="terminal-cursor ml-0.5" />
            </div>
          </div>

          {/* Description */}
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-lg">
            I build scalable web applications and teach programming to{' '}
            <span className="text-accent-cyan font-semibold">{PROFILE.udemy.totalStudents.toLocaleString()}+ students</span> on Udemy.
            Specialising in NestJS Microservices, Spring Boot, and modern AI tooling.
          </p>

          {/* CTA buttons */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => scrollTo('projects')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg bg-accent-emerald text-slate-900 font-semibold text-sm hover:bg-emerald-300 transition-colors duration-200 shadow-lg shadow-accent-emerald/20"
            >
              <Layers className="w-4 h-4" />
              View Projects
            </button>
            <button
              onClick={() => scrollTo('courses')}
              className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-accent-violet/50 text-accent-violet font-semibold text-sm hover:bg-accent-violet/10 transition-colors duration-200"
            >
              <BookOpen className="w-4 h-4" />
              View Courses
            </button>
          </div>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 pt-2">
            {['React', 'TypeScript', 'NestJS', 'Spring Boot', 'Kafka', 'Docker', 'Kubernetes', 'AWS'].map(tech => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md border border-border-dark bg-card-dark text-xs font-mono text-slate-400 hover:border-slate-600 hover:text-slate-200 transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* ── Right column — Terminal ── */}
        <div
          className="animate-fade-up"
          style={{ animationDelay: '0.2s', opacity: 0, animation: 'fadeUp 0.6s 0.2s ease forwards' }}
        >
          <TerminalWidget />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="flex justify-center mt-4">
        <button
          onClick={() => scrollTo('about')}
          className="flex flex-col items-center gap-1 text-slate-500 hover:text-accent-cyan transition-colors duration-200 group"
          aria-label="Scroll to about section"
        >
          <span className="text-xs font-mono">scroll down</span>
          <ArrowDown className="w-4 h-4 animate-bounce group-hover:text-accent-cyan" />
        </button>
      </div>
    </section>
  );
}
