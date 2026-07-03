import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Search, ArrowRight, BookOpen, Layers, User, Mail, X, Terminal } from 'lucide-react';
import { GithubIcon, LinkedinIcon, YoutubeIcon } from '../SocialIcons';
import { UDEMY_COURSES } from '../../data/courses';
import { FEATURED_PROJECTS } from '../../data/projects';
import { PROFILE } from '../../data/profile';

interface CommandItem {
  id: string;
  group: string;
  label: string;
  description?: string;
  icon: React.ReactNode;
  action: () => void;
  keywords?: string;
}

interface CommandMenuProps {
  open: boolean;
  onClose: () => void;
}

export default function CommandMenu({ open, onClose }: CommandMenuProps) {
  const [query, setQuery] = useState('');
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = useCallback(
    (id: string) => {
      onClose();
      if (location.pathname === '/') {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
      } else {
        navigate('/');
        setTimeout(() => {
          document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      }
    },
    [navigate, location, onClose]
  );

  // Build command items
  const allItems: CommandItem[] = [
    // Navigation
    {
      id: 'nav-about',
      group: 'Navigation',
      label: 'About Me',
      description: 'Skills, bio & instructor stats',
      icon: <User className="w-4 h-4" />,
      action: () => scrollToSection('about'),
      keywords: 'about me bio skills',
    },
    {
      id: 'nav-courses',
      group: 'Navigation',
      label: 'Courses',
      description: 'Udemy course showcase',
      icon: <BookOpen className="w-4 h-4" />,
      action: () => scrollToSection('courses'),
      keywords: 'courses udemy teaching',
    },
    {
      id: 'nav-projects',
      group: 'Navigation',
      label: 'Projects',
      description: 'Featured portfolio projects',
      icon: <Layers className="w-4 h-4" />,
      action: () => scrollToSection('projects'),
      keywords: 'projects portfolio work',
    },
    {
      id: 'nav-contact',
      group: 'Navigation',
      label: 'Contact',
      description: 'Get in touch',
      icon: <Mail className="w-4 h-4" />,
      action: () => scrollToSection('contact'),
      keywords: 'contact email message',
    },
    // Courses
    ...UDEMY_COURSES.map(c => ({
      id: `course-${c.id}`,
      group: 'Courses',
      label: c.title,
      description: `⭐ ${c.avgRating.toFixed(1)} · ${c.numReviews} reviews · ${c.contentInfo}`,
      icon: <Terminal className="w-4 h-4" />,
      action: () => {
        onClose();
        window.open(`https://www.udemy.com${c.url}`, '_blank');
      },
      keywords: `${c.title} ${c.tags.join(' ')} ${c.category}`.toLowerCase(),
    })),
    // Projects
    ...FEATURED_PROJECTS.map(p => ({
      id: `project-${p.id}`,
      group: 'Projects',
      label: p.title,
      description: `${p.role} · ${p.period}`,
      icon: <Layers className="w-4 h-4" />,
      action: () => {
        onClose();
        navigate(`/project/${p.id}`);
      },
      keywords: `${p.title} ${p.tags.join(' ')} ${p.category}`.toLowerCase(),
    })),
    // Social links
    {
      id: 'social-github',
      group: 'Social',
      label: 'GitHub',
      description: 'github.com/thanhmati',
      icon: <GithubIcon className="w-4 h-4" />,
      action: () => { onClose(); window.open(PROFILE.socials.github, '_blank'); },
      keywords: 'github code source',
    },
    {
      id: 'social-linkedin',
      group: 'Social',
      label: 'LinkedIn',
      description: 'linkedin.com/in/thanh270600',
      icon: <LinkedinIcon className="w-4 h-4" />,
      action: () => { onClose(); window.open(PROFILE.socials.linkedin, '_blank'); },
      keywords: 'linkedin professional',
    },
    {
      id: 'social-youtube',
      group: 'Social',
      label: 'YouTube — Lập Trình Full Stack',
      description: 'youtube.com/@laptrinhfullstack',
      icon: <YoutubeIcon className="w-4 h-4" />,
      action: () => { onClose(); window.open(PROFILE.socials.youtube, '_blank'); },
      keywords: 'youtube video tutorial',
    },
  ];

  // Filter by query
  const filtered = query.trim()
    ? allItems.filter(
        item =>
          item.label.toLowerCase().includes(query.toLowerCase()) ||
          (item.keywords ?? '').includes(query.toLowerCase()) ||
          (item.description ?? '').toLowerCase().includes(query.toLowerCase())
      )
    : allItems;

  // Group filtered items
  const groups = filtered.reduce<Record<string, CommandItem[]>>((acc, item) => {
    if (!acc[item.group]) acc[item.group] = [];
    acc[item.group].push(item);
    return acc;
  }, {});

  const flatFiltered = Object.values(groups).flat();

  // Reset on open
  useEffect(() => {
    if (open) {
      setQuery('');
      setActiveIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [open]);

  // Keep active item in view
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const active = list.querySelector('[data-active="true"]');
    active?.scrollIntoView({ block: 'nearest' });
  }, [activeIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') { onClose(); return; }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(i => Math.min(i + 1, flatFiltered.length - 1));
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(i => Math.max(i - 1, 0));
    }
    if (e.key === 'Enter' && flatFiltered[activeIndex]) {
      flatFiltered[activeIndex].action();
    }
  };

  // Reset activeIndex when query changes
  useEffect(() => { setActiveIndex(0); }, [query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4"
      onMouseDown={e => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm" />

      {/* Panel */}
      <div
        className="relative w-full max-w-xl rounded-xl border border-border-dark bg-card-dark/95 shadow-2xl overflow-hidden animate-fade-up"
        onKeyDown={handleKeyDown}
      >
        {/* Search input */}
        <div className="flex items-center gap-3 px-4 py-3 border-b border-border-dark">
          <Search className="w-4 h-4 text-slate-500 shrink-0" />
          <input
            ref={inputRef}
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Search commands, courses, projects..."
            className="flex-1 bg-transparent text-sm text-slate-200 placeholder-slate-500 outline-none font-mono"
          />
          {query && (
            <button onClick={() => setQuery('')} className="text-slate-500 hover:text-slate-300">
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <kbd className="hidden sm:inline-flex items-center gap-1 px-1.5 py-0.5 text-[10px] font-mono bg-slate-800 border border-slate-700 rounded text-slate-400">
            ESC
          </kbd>
        </div>

        {/* Results */}
        <div ref={listRef} className="max-h-80 overflow-y-auto py-2">
          {flatFiltered.length === 0 ? (
            <div className="px-4 py-8 text-center text-sm text-slate-500 font-mono">
              No results for "{query}"
            </div>
          ) : (
            Object.entries(groups).map(([group, items]) => (
              <div key={group}>
                <div className="px-4 py-1.5 text-[10px] font-mono text-slate-500 uppercase tracking-widest">
                  {group}
                </div>
                {items.map(item => {
                  const globalIndex = flatFiltered.indexOf(item);
                  const isActive = globalIndex === activeIndex;
                  return (
                    <button
                      key={item.id}
                      data-active={isActive}
                      className={`w-full flex items-center gap-3 px-4 py-2.5 text-left transition-colors duration-100 ${
                        isActive ? 'bg-accent-emerald/10 text-slate-100' : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                      }`}
                      onClick={item.action}
                      onMouseEnter={() => setActiveIndex(globalIndex)}
                    >
                      <span className={`shrink-0 ${isActive ? 'text-accent-emerald' : 'text-slate-600'}`}>
                        {item.icon}
                      </span>
                      <div className="flex flex-col min-w-0">
                        <span className="text-sm font-medium truncate">{item.label}</span>
                        {item.description && (
                          <span className="text-[11px] font-mono text-slate-500 truncate">{item.description}</span>
                        )}
                      </div>
                      {isActive && (
                        <ArrowRight className="w-3.5 h-3.5 ml-auto shrink-0 text-accent-emerald" />
                      )}
                    </button>
                  );
                })}
              </div>
            ))
          )}
        </div>

        {/* Footer hint */}
        <div className="px-4 py-2.5 border-t border-border-dark flex items-center gap-4 text-[10px] font-mono text-slate-600">
          <span><kbd className="bg-slate-800 px-1 rounded">↑↓</kbd> navigate</span>
          <span><kbd className="bg-slate-800 px-1 rounded">↵</kbd> select</span>
          <span><kbd className="bg-slate-800 px-1 rounded">esc</kbd> close</span>
        </div>
      </div>
    </div>
  );
}
