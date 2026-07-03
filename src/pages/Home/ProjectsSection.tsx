import { GithubIcon } from '../../components/SocialIcons';
import ProjectCard from '../../components/ProjectCard/ProjectCard';
import { FEATURED_PROJECTS, PROJECTS } from '../../data/projects';
import { PROFILE } from '../../data/profile';

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-20 space-y-10">
      {/* Section header */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-border-dark to-transparent" />
        <h2 className="text-xs font-mono text-accent-emerald tracking-widest uppercase">
          // projects
        </h2>
        <div className="h-px flex-1 bg-gradient-to-l from-border-dark to-transparent" />
      </div>

      {/* Title + CTA */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold font-heading text-slate-100">
            Featured Projects
          </h3>
          <p className="text-slate-400 text-sm mt-1 font-mono">
            {PROJECTS.length} projects · Production systems & open-source
          </p>
        </div>
        <a
          href={PROFILE.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-accent-emerald/40 text-accent-emerald text-sm font-semibold hover:bg-accent-emerald/10 transition-colors duration-200 w-fit"
        >
          <GithubIcon className="w-4 h-4" />
          View GitHub
        </a>
      </div>

      {/* Project grid — 2 cols on lg */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {FEATURED_PROJECTS.map((project, index) => (
          <ProjectCard key={project.id} project={project} index={index} />
        ))}
      </div>

      {/* "View all" hint if there are non-featured */}
      {PROJECTS.length > FEATURED_PROJECTS.length && (
        <p className="text-center text-xs font-mono text-slate-600">
          Showing {FEATURED_PROJECTS.length} of {PROJECTS.length} projects
          <span className="text-slate-500"> · More coming soon</span>
        </p>
      )}
    </section>
  );
}
