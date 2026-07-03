import { useState, useEffect } from 'react';
import { BookOpen, ExternalLink } from 'lucide-react';
import CourseCard from '../../components/CourseCard/CourseCard';
import { getCourses, getCategories } from '../../services/udemyService';
import type { UdemyCourse } from '../../data/courses';

// ── Skeleton ────────────────────────────────────────────
function SkeletonCard() {
  return (
    <div className="rounded-xl border border-border-dark bg-card-dark/60 overflow-hidden animate-pulse">
      <div className="h-40 bg-slate-800/60" />
      <div className="p-4 space-y-3">
        <div className="h-3.5 bg-slate-800 rounded w-3/4" />
        <div className="h-3 bg-slate-800 rounded w-full" />
        <div className="h-3 bg-slate-800 rounded w-5/6" />
        <div className="flex gap-2 mt-2">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-4 w-12 bg-slate-800 rounded" />
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Main component ─────────────────────────────────────
export default function CoursesSection() {
  const [courses, setCourses] = useState<UdemyCourse[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const [all, cats] = await Promise.all([getCourses(), getCategories()]);
      if (!mounted) return;
      setCourses(all);
      setCategories(cats);
      setLoading(false);
    })();
    return () => { mounted = false; };
  }, []);

  const displayed =
    activeCategory === 'All'
      ? courses
      : courses.filter(c => c.category === activeCategory);

  const allCategories = ['All', ...categories];

  return (
    <section id="courses" className="py-20 space-y-10">
      {/* Section header */}
      <div className="flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-border-dark to-transparent" />
        <h2 className="text-xs font-mono text-accent-violet tracking-widest uppercase">
          // courses
        </h2>
        <div className="h-px flex-1 bg-gradient-to-l from-border-dark to-transparent" />
      </div>

      {/* Title + CTA */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <h3 className="text-2xl font-bold font-heading text-slate-100">
            Udemy Courses
          </h3>
          <p className="text-slate-400 text-sm mt-1 font-mono">
            {courses.length} courses · Teaching in Vietnamese 🇻🇳
          </p>
        </div>
        <a
          href="https://www.udemy.com/user/do-tan-thanh-2/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-4 py-2 rounded-lg border border-accent-violet/40 text-accent-violet text-sm font-semibold hover:bg-accent-violet/10 transition-colors duration-200 w-fit"
        >
          <BookOpen className="w-4 h-4" />
          View All on Udemy
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>

      {/* Category filter tabs */}
      <div className="flex flex-wrap gap-2">
        {allCategories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-all duration-200 ${
              activeCategory === cat
                ? 'border-accent-violet bg-accent-violet/10 text-accent-violet'
                : 'border-border-dark text-slate-400 hover:border-slate-600 hover:text-slate-200'
            }`}
          >
            {cat}
            {cat !== 'All' && (
              <span className="ml-1.5 text-slate-500">
                ({courses.filter(c => c.category === cat).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Course grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : displayed.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {displayed.map(course => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 text-slate-500 font-mono text-sm">
          No courses in "{activeCategory}" category.
        </div>
      )}
    </section>
  );
}
