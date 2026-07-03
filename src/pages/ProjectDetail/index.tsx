import { useParams, Link } from 'react-router-dom';
import { PROJECTS } from '../../data/projects';
import PageTransition from '../../components/PageTransition';
import { ArrowLeft, ExternalLink, Calendar, User, Tag, ShieldAlert, Cpu, Sparkles, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '../../components/SocialIcons';

export default function ProjectDetail() {
  const { projectId } = useParams<{ projectId: string }>();
  const project = PROJECTS.find(p => p.id === projectId);

  if (!project) {
    return (
      <PageTransition>
        <div className="flex flex-col items-center justify-center py-20 text-center space-y-6 max-w-md mx-auto">
          <ShieldAlert className="w-16 h-16 text-red-400" />
          <h1 className="text-2xl font-bold font-heading text-slate-100">Project Not Found</h1>
          <p className="text-slate-400 font-mono text-sm leading-relaxed">
            The project ID "{projectId}" does not exist in our system configurations.
          </p>
          <Link
            to="/"
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg border border-border-dark bg-card-dark text-slate-300 font-semibold text-sm hover:text-accent-cyan hover:border-accent-cyan/30 transition-all duration-200"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </PageTransition>
    );
  }

  return (
    <PageTransition>
      <div className="max-w-4xl mx-auto space-y-8 animate-fade-up">
        {/* Navigation Breadcrumb */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-mono text-slate-500 hover:text-accent-cyan transition-colors duration-150"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>&lt; Back to Home</span>
        </Link>

        {/* Header Metadata */}
        <header className="space-y-4 border-b border-border-dark/60 pb-6">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="text-xs font-mono px-2.5 py-0.5 rounded-full border border-accent-cyan/40 bg-accent-cyan/5 text-accent-cyan">
              {project.category}
            </span>
            <span className="text-xs font-mono text-slate-500 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {project.period}
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading text-slate-50">
            {project.title}
          </h1>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            {project.shortDesc}
          </p>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 text-sm font-mono text-accent-emerald">
              <User className="w-4 h-4" />
              <span>Role: {project.role}</span>
            </div>
            
            {/* Project Links */}
            {(project.github || project.liveDemo) && (
              <div className="flex items-center gap-3">
                {project.github && (
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-border-dark bg-slate-900/60 text-xs font-mono text-slate-400 hover:text-accent-cyan hover:border-accent-cyan/30 transition-all duration-200"
                  >
                    <GithubIcon className="w-4 h-4" />
                    Source Code
                  </a>
                )}
                {project.liveDemo && (
                  <a
                    href={project.liveDemo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-emerald text-slate-900 text-xs font-mono font-semibold hover:bg-emerald-300 transition-all duration-200"
                  >
                    <ExternalLink className="w-4 h-4" />
                    Live Demo
                  </a>
                )}
              </div>
            )}
          </div>
        </header>

        {/* Case Study Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Main Case Sections */}
          <div className="md:col-span-2 space-y-8">
            
            {/* PROBLEM */}
            <section className="space-y-3 p-6 rounded-xl border border-border-dark bg-card-dark/40 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-accent-violet" />
              <h2 className="text-sm font-mono text-accent-violet flex items-center gap-2 uppercase tracking-wider">
                <Cpu className="w-4 h-4" />
                // 01. The Problem
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {project.problem}
              </p>
            </section>

            {/* SOLUTION */}
            <section className="space-y-3 p-6 rounded-xl border border-border-dark bg-card-dark/40 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-accent-cyan" />
              <h2 className="text-sm font-mono text-accent-cyan flex items-center gap-2 uppercase tracking-wider">
                <Sparkles className="w-4 h-4" />
                // 02. The Solution
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {project.solution}
              </p>
            </section>

            {/* OUTCOME */}
            <section className="space-y-3 p-6 rounded-xl border border-border-dark bg-card-dark/40 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-accent-emerald" />
              <h2 className="text-sm font-mono text-accent-emerald flex items-center gap-2 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                // 03. The Outcome
              </h2>
              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                {project.outcome}
              </p>
            </section>

          </div>

          {/* Sidebar - Tech Stack Details */}
          <div className="space-y-6">
            <div className="p-5 rounded-xl border border-border-dark bg-card-dark/70 space-y-4">
              <h3 className="text-xs font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Tag className="w-3.5 h-3.5" />
                Technologies Sourced
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {project.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-md border border-border-dark bg-slate-900/60 text-xs font-mono text-slate-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-xl border border-border-dark/60 bg-slate-950/40 text-xs font-mono text-slate-500 leading-relaxed">
              <p>
                // This case study documents active system architecture decisions. All implementations conform to the high-performance design specifications.
              </p>
            </div>
          </div>

        </div>
      </div>
    </PageTransition>
  );
}
