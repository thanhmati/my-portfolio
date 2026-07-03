import { Star, Clock, BookOpen, Users, ExternalLink } from 'lucide-react';
import type { UdemyCourse } from '../../data/courses';

interface CourseCardProps {
  course: UdemyCourse;
}

function StarRating({ rating }: { rating: number }) {
  const full = Math.floor(rating);
  const half = rating - full >= 0.4;
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`w-3.5 h-3.5 ${
            i < full
              ? 'text-yellow-400 fill-yellow-400'
              : i === full && half
              ? 'text-yellow-400 fill-yellow-400/50'
              : 'text-slate-600'
          }`}
        />
      ))}
      <span className="text-xs font-mono text-slate-300 ml-0.5">{rating.toFixed(1)}</span>
    </div>
  );
}

const CATEGORY_COLORS: Record<string, string> = {
  AI:       'border-accent-violet/40 text-accent-violet bg-accent-violet/5',
  Backend:  'border-accent-cyan/40 text-accent-cyan bg-accent-cyan/5',
  Database: 'border-accent-emerald/40 text-accent-emerald bg-accent-emerald/5',
  Other:    'border-slate-600/40 text-slate-400 bg-slate-800/20',
};

export default function CourseCard({ course }: CourseCardProps) {
  const udemy = `https://www.udemy.com${course.url}`;
  const colorClass = CATEGORY_COLORS[course.category] ?? CATEGORY_COLORS.Other;

  return (
    <a
      href={udemy}
      target="_blank"
      rel="noopener noreferrer"
      className="cursor-pointer group flex flex-col rounded-xl border border-border-dark bg-card-dark/70 overflow-hidden hover:border-slate-600 glow-cyan transition-all duration-300 hover:-translate-y-0.5"
    >
      {/* Thumbnail */}
      <div className="relative overflow-hidden">
        <img
          src={course.image480x270}
          alt={course.title}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />
        {/* Overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-card-dark/60 to-transparent" />
        {/* Price badge */}
        <span className="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-slate-900/80 border border-border-dark text-xs font-mono text-accent-emerald">
          {course.price}
        </span>
        {/* Category badge */}
        <span className={`absolute top-2 left-2 px-2 py-0.5 rounded-md border text-[10px] font-mono ${colorClass}`}>
          {course.category}
        </span>
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-4 gap-3">
        {/* Title */}
        <h3 className="text-sm font-semibold font-heading text-slate-100 line-clamp-2 group-hover:text-accent-cyan transition-colors duration-200">
          {course.title}
        </h3>

        {/* Headline */}
        <p className="text-xs text-slate-500 line-clamp-2 font-mono leading-relaxed">
          {course.headline}
        </p>

        {/* Stats row */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-slate-400 font-mono">
          <StarRating rating={course.avgRating} />
          <span className="flex items-center gap-1">
            <Users className="w-3 h-3" />
            {course.numReviews.toLocaleString()} reviews
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {course.contentInfo}
          </span>
          <span className="flex items-center gap-1">
            <BookOpen className="w-3 h-3" />
            {course.numLectures} lectures
          </span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {course.tags.slice(0, 4).map(tag => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded text-[10px] font-mono border border-border-dark bg-slate-900/60 text-slate-500"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Level + CTA */}
        <div className="mt-auto pt-2 flex items-center justify-between">
          <span className="text-[10px] font-mono text-slate-500 border border-border-dark px-2 py-0.5 rounded">
            {course.level}
          </span>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-accent-violet/10 border border-accent-violet/30 text-accent-violet text-xs font-semibold group-hover:bg-accent-violet/20 transition-colors duration-200">
            Enroll Now
            <ExternalLink className="w-3 h-3" />
          </div>
        </div>
      </div>
    </a>
  );
}
