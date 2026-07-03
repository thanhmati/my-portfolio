import { useEffect, useRef } from 'react';
import { ExternalLink, Calendar, Tag } from 'lucide-react';
import { GithubIcon } from '../SocialIcons';
import { useNavigate } from 'react-router-dom';
import type { Project } from '../../data/projects';

const CATEGORY_STYLES: Record<string, { border: string; text: string; bg: string }> = {
  SaaS:          { border: 'border-accent-cyan/40',    text: 'text-accent-cyan',    bg: 'bg-accent-cyan/5' },
  Microservices: { border: 'border-accent-emerald/40', text: 'text-accent-emerald', bg: 'bg-accent-emerald/5' },
  Backend:       { border: 'border-accent-violet/40',  text: 'text-accent-violet',  bg: 'bg-accent-violet/5' },
  Frontend:      { border: 'border-yellow-500/40',     text: 'text-yellow-400',     bg: 'bg-yellow-500/5' },
  DevOps:        { border: 'border-orange-500/40',     text: 'text-orange-400',     bg: 'bg-orange-500/5' },
};

interface ProjectCardProps {
  project: Project;
  index?: number; // for staggered animation delay
}

export default function ProjectCard({ project, index = 0 }: ProjectCardProps) {
  const cardRef = useRef<HTMLElement | null>(null);
  const navigate = useNavigate();
  const style = CATEGORY_STYLES[project.category] ?? CATEGORY_STYLES.Backend;

  // Scroll-reveal with stagger
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-visible');
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <article
      ref={cardRef as React.RefObject<HTMLElement>}
      className="reveal group flex flex-col rounded-xl border border-border-dark bg-card-dark/70 p-5 gap-4 hover:border-slate-600 glow-emerald cursor-pointer transition-all duration-300 hover:-translate-y-0.5"
      style={{ transitionDelay: `${index * 80}ms` }}
      onClick={() => navigate(`/project/${project.id}`)}
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && navigate(`/project/${project.id}`)}
      aria-label={`View ${project.title} case study`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          {/* Category + Period */}
          <div className="flex items-center gap-2">
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${style.border} ${style.text} ${style.bg}`}>
              {project.category}
            </span>
            <span className="text-[10px] font-mono text-slate-500 flex items-center gap-1">
              <Calendar className="w-2.5 h-2.5" />
              {project.period}
            </span>
          </div>
          {/* Title */}
          <h3 className="text-base font-bold font-heading text-slate-100 group-hover:text-accent-emerald transition-colors duration-200">
            {project.title}
          </h3>
          {/* Role */}
          <p className="text-xs font-mono text-accent-cyan">{project.role}</p>
        </div>

        {/* Arrow icon */}
        <div className="shrink-0 w-8 h-8 rounded-lg border border-border-dark bg-slate-900/60 flex items-center justify-center text-slate-600 group-hover:text-accent-emerald group-hover:border-accent-emerald/30 transition-all duration-200">
          <ExternalLink className="w-3.5 h-3.5" />
        </div>
      </div>

      {/* Short description */}
      <p className="text-sm text-slate-400 leading-relaxed line-clamp-2">{project.shortDesc}</p>

      {/* Problem snippet */}
      <div className="p-3 rounded-lg bg-slate-900/60 border border-border-dark">
        <p className="text-[11px] font-mono text-slate-500 line-clamp-2">
          <span className="text-accent-violet">// problem: </span>
          {project.problem}
        </p>
      </div>

      {/* Tech tags */}
      <div className="flex flex-wrap gap-1.5">
        <Tag className="w-3 h-3 text-slate-600 mt-0.5" />
        {project.tags.slice(0, 5).map(tag => (
          <span
            key={tag}
            className="px-2 py-0.5 rounded text-[10px] font-mono border border-border-dark bg-slate-900/60 text-slate-500 hover:text-slate-300 hover:border-slate-600 transition-colors duration-150"
          >
            {tag}
          </span>
        ))}
        {project.tags.length > 5 && (
          <span className="text-[10px] font-mono text-slate-600">+{project.tags.length - 5}</span>
        )}
      </div>

      {/* Footer links */}
      {(project.github || project.liveDemo) && (
        <div className="flex items-center gap-3 pt-1 border-t border-border-dark/60">
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-mono text-slate-500 hover:text-accent-cyan transition-colors duration-150"
              onClick={e => e.stopPropagation()}
            >
              <GithubIcon className="w-3.5 h-3.5" />
              Source
            </a>
          )}
          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-xs font-mono text-slate-500 hover:text-accent-emerald transition-colors duration-150"
              onClick={e => e.stopPropagation()}
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          )}
          <span className="ml-auto text-[10px] font-mono text-slate-600 group-hover:text-accent-emerald/60 transition-colors duration-200">
            View Case Study →
          </span>
        </div>
      )}
    </article>
  );
}
