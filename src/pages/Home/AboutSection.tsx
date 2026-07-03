import { useRef } from 'react';
import { useCountUp } from '../../hooks/useCountUp';
import { Users, Star, BookOpen, Code2, Server, Database, Cloud, GitBranch, Layers, Cpu } from 'lucide-react';
import { PROFILE } from '../../data/profile';

// ── Stat card component ────────────────────────────────
interface StatCardProps {
  icon: React.ReactNode;
  target: number;
  suffix: string;
  label: string;
  color: 'emerald' | 'cyan' | 'violet';
}

function StatCard({ icon, target, suffix, label, color }: StatCardProps) {
  const { count, ref } = useCountUp({ target, duration: 2000 });

  const colorMap = {
    emerald: {
      icon: 'text-accent-emerald',
      bg: 'bg-accent-emerald/10',
      border: 'border-accent-emerald/20',
      text: 'text-accent-emerald',
      glow: 'glow-emerald',
    },
    cyan: {
      icon: 'text-accent-cyan',
      bg: 'bg-accent-cyan/10',
      border: 'border-accent-cyan/20',
      text: 'text-accent-cyan',
      glow: 'glow-cyan',
    },
    violet: {
      icon: 'text-accent-violet',
      bg: 'bg-accent-violet/10',
      border: 'border-accent-violet/20',
      text: 'text-accent-violet',
      glow: 'glow-violet',
    },
  };

  const c = colorMap[color];

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`flex flex-col items-center gap-3 p-6 rounded-xl border ${c.border} bg-card-dark/70 ${c.glow} transition-all duration-300`}
    >
      <div className={`p-3 rounded-lg ${c.bg} ${c.icon}`}>{icon}</div>
      <div className={`text-3xl font-bold font-heading ${c.text}`}>
        {count.toLocaleString()}{suffix}
      </div>
      <div className="text-sm text-slate-400 font-mono text-center">{label}</div>
    </div>
  );
}

// ── Skill badge ────────────────────────────────────────
interface SkillBadgeProps {
  icon: React.ReactNode;
  label: string;
  level: 'expert' | 'advanced' | 'proficient';
}

function SkillBadge({ icon, label, level }: SkillBadgeProps) {
  const levelColor = {
    expert: 'border-accent-emerald/40 text-accent-emerald',
    advanced: 'border-accent-cyan/40 text-accent-cyan',
    proficient: 'border-accent-violet/40 text-accent-violet',
  }[level];

  return (
    <div
      className={`flex items-center gap-2 px-3 py-2 rounded-lg border bg-card-dark/60 ${levelColor} hover:bg-card-dark transition-colors duration-200`}
    >
      <span className="w-4 h-4">{icon}</span>
      <span className="text-xs font-mono text-slate-300">{label}</span>
    </div>
  );
}

// ── Main component ─────────────────────────────────────
export default function AboutSection() {
  const sectionRef = useRef<HTMLElement | null>(null);

  const skills = [
    { icon: <Code2 className="w-4 h-4" />, label: 'React / Next.js', level: 'expert' as const },
    { icon: <Code2 className="w-4 h-4" />, label: 'TypeScript', level: 'expert' as const },
    { icon: <Server className="w-4 h-4" />, label: 'NestJS / Node.js', level: 'expert' as const },
    { icon: <Server className="w-4 h-4" />, label: 'Spring Boot / Java', level: 'expert' as const },
    { icon: <Cpu className="w-4 h-4" />, label: 'Microservices / Kafka', level: 'advanced' as const },
    { icon: <Database className="w-4 h-4" />, label: 'PostgreSQL / MongoDB', level: 'advanced' as const },
    { icon: <Cloud className="w-4 h-4" />, label: 'Docker / Kubernetes', level: 'advanced' as const },
    { icon: <Cloud className="w-4 h-4" />, label: 'AWS / GCP', level: 'advanced' as const },
    { icon: <GitBranch className="w-4 h-4" />, label: 'CI/CD / DevOps', level: 'advanced' as const },
    { icon: <Layers className="w-4 h-4" />, label: 'gRPC / REST / GraphQL', level: 'proficient' as const },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-20 space-y-16">
      {/* Section header */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-border-dark to-transparent" />
        <h2 className="text-xs font-mono text-accent-emerald tracking-widest uppercase">
          // about me
        </h2>
        <div className="h-px flex-1 bg-gradient-to-l from-border-dark to-transparent" />
      </div>

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        {/* Left — Bio */}
        <div className="space-y-6">
          <div className="space-y-4">
            {/* Avatar placeholder */}
            <div className="flex items-center gap-4">
              <img
                src={PROFILE.avatar}
                alt={PROFILE.name}
                className="w-16 h-16 rounded-full border-2 border-accent-emerald/40 shadow-lg object-cover"
              />
              <div>
                <h3 className="text-xl font-bold font-heading text-slate-100">{PROFILE.name}</h3>
                <p className="text-sm font-mono text-accent-cyan">
                  Full Stack Dev · Udemy Instructor
                </p>
              </div>
            </div>

            <p className="text-slate-400 leading-relaxed">
              I'm a Full Stack Developer with <span className="text-slate-200 font-semibold">3+ years</span> of
              hands-on experience building production web applications — from startup MVPs to enterprise-scale distributed systems.
              I specialise in the JavaScript/TypeScript ecosystem (React, NestJS) and Java backend (Spring Boot, Microservices).
            </p>
            <p className="text-slate-400 leading-relaxed">
              As an <span className="text-accent-violet font-semibold">Udemy Instructor</span>, I've taught
              <span className="text-accent-cyan font-semibold"> {PROFILE.udemy.totalStudents.toLocaleString()}+ students</span> on{' '}
              {PROFILE.udemy.totalCourses} published courses. I focus on practical, project-based learning with real
              production-quality code — covering NestJS Microservices, Spring Boot, Apache Kafka, and AI development.
            </p>
          </div>

          {/* Quick facts */}
          <div className="space-y-2 font-mono text-sm">
            {[
              { key: 'location', value: PROFILE.location },
              { key: 'experience', value: '3+ years professional development' },
              { key: 'education', value: 'B.Eng. — Posts & Telecom Institute of Technology (PTIT)' },
              { key: 'languages', value: 'Tiếng Việt (native) · English (professional)' },
              { key: 'contact', value: PROFILE.email },
            ].map(({ key, value }) => (
              <div key={key} className="flex gap-2">
                <span className="text-accent-violet min-w-24">{key}:</span>
                <span className="text-slate-300">{value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right — Skills */}
        <div className="space-y-6">
          <h3 className="text-sm font-mono text-slate-400 uppercase tracking-widest">
            // tech stack
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {skills.map(skill => (
              <SkillBadge key={skill.label} {...skill} />
            ))}
          </div>

          {/* Legend */}
          <div className="flex gap-4 text-xs font-mono text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent-emerald/60" />Expert
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent-cyan/60" />Advanced
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent-violet/60" />Proficient
            </span>
          </div>
        </div>
      </div>

      {/* Instructor Stats — counter animation */}
      <div className="space-y-6">
        <h3 className="text-center text-xs font-mono text-slate-500 uppercase tracking-widest">
          // instructor stats · powered by counter animation
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard
            icon={<Users className="w-6 h-6" />}
            target={PROFILE.udemy.totalStudents}
            suffix="+"
            label="Students Enrolled"
            color="emerald"
          />
          <StatCard
            icon={<Star className="w-6 h-6" />}
            target={PROFILE.udemy.totalReviews}
            suffix="+"
            label="5-Star Reviews"
            color="cyan"
          />
          <StatCard
            icon={<BookOpen className="w-6 h-6" />}
            target={PROFILE.udemy.totalCourses}
            suffix=""
            label="Published Courses"
            color="violet"
          />
        </div>
      </div>
    </section>
  );
}
