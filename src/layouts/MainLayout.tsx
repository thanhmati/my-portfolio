import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Terminal, BookOpen, Search, Menu, X } from 'lucide-react';
import { GithubIcon, LinkedinIcon, YoutubeIcon } from '../components/SocialIcons';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === '/';

  // Function to handle scroll to section
  const handleNavClick = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (isHome) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      // If not on home page, navigate to home first, then scroll
      navigate('/');
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    }
  };

  return (
    <div className="flex flex-col min-h-screen text-slate-300 font-sans relative">
      
      {/* HEADER */}
      <header className="sticky top-0 z-40 w-full border-b border-border-dark/60 bg-bg-dark/85 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-accent-emerald/10 p-1.5 rounded-lg border border-accent-emerald/30 group-hover:border-accent-emerald/80 transition-all duration-300">
              <Terminal className="w-5 h-5 text-accent-emerald" />
            </div>
            <span className="font-heading font-bold text-lg tracking-wider text-slate-100 group-hover:text-accent-emerald transition-colors duration-300">
              tanthanh<span className="text-accent-cyan">.dev</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            <button 
              onClick={() => handleNavClick('about')}
              className="text-sm font-medium font-mono hover:text-accent-cyan transition-colors duration-200 cursor-pointer"
            >
              // about
            </button>
            <button 
              onClick={() => handleNavClick('courses')}
              className="text-sm font-medium font-mono hover:text-accent-violet transition-colors duration-200 cursor-pointer"
            >
              // courses
            </button>
            <button 
              onClick={() => handleNavClick('projects')}
              className="text-sm font-medium font-mono hover:text-accent-cyan transition-colors duration-200 cursor-pointer"
            >
              // projects
            </button>
            <button 
              onClick={() => handleNavClick('contact')}
              className="text-sm font-medium font-mono hover:text-accent-emerald transition-colors duration-200 cursor-pointer"
            >
              // contact
            </button>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center gap-4">
            {/* Search/Command Menu Trigger Button */}
            <button 
              className="flex items-center gap-2 px-3 py-1.5 text-xs font-mono border border-border-dark/80 bg-card-dark rounded-md text-slate-400 hover:border-slate-600 hover:text-slate-200 transition-all duration-200 cursor-pointer"
              title="Mở menu lệnh (Cmd+K)"
            >
              <Search className="w-3.5 h-3.5" />
              <span>Search</span>
              <kbd className="bg-slate-800 px-1.5 py-0.5 rounded text-[10px] text-slate-400 border border-slate-700">⌘K</kbd>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-4">
            <button 
              className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-mono border border-border-dark bg-card-dark rounded-md text-slate-400 cursor-pointer"
            >
              <Search className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-slate-400 hover:text-slate-100 p-1 cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-border-dark bg-bg-dark/95 backdrop-blur-lg px-4 pt-2 pb-6 flex flex-col gap-4 animate-fade-in">
            <button 
              onClick={() => handleNavClick('about')}
              className="text-left py-2 font-mono hover:text-accent-cyan transition-colors"
            >
              &gt; about
            </button>
            <button 
              onClick={() => handleNavClick('courses')}
              className="text-left py-2 font-mono hover:text-accent-violet transition-colors"
            >
              &gt; courses
            </button>
            <button 
              onClick={() => handleNavClick('projects')}
              className="text-left py-2 font-mono hover:text-accent-cyan transition-colors"
            >
              &gt; projects
            </button>
            <button 
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 font-mono hover:text-accent-emerald transition-colors"
            >
              &gt; contact
            </button>
          </div>
        )}
      </header>

      {/* OS WINDOW WRAPPER FRAME */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-10 z-10">
        <div className="border border-border-dark/80 bg-card-dark/60 rounded-xl overflow-hidden shadow-2xl backdrop-blur-sm flex flex-col min-h-[70vh]">
          {/* Title Bar */}
          <div className="bg-slate-900/90 px-4 py-3 flex items-center justify-between border-b border-border-dark/70">
            {/* macOS window dots */}
            <div className="flex gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#27c93f] inline-block" />
            </div>
            {/* Terminal Title */}
            <span className="text-xs font-mono text-slate-400 select-none">
              tanthanh@portfolio: ~{location.pathname}
            </span>
            {/* Window stats placeholder */}
            <span className="text-[10px] font-mono text-slate-500 hidden sm:inline select-none">
              utf-8 | typescript | vite
            </span>
          </div>

          {/* Content Area */}
          <div className="flex-grow p-4 sm:p-6 md:p-8 overflow-y-auto">
            {children}
          </div>
        </div>
      </main>

      {/* FOOTER */}
      <footer className="border-t border-border-dark/60 bg-slate-950/60 py-8 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Logo / Copy */}
          <div className="flex flex-col items-center md:items-start gap-1">
            <span className="font-mono text-xs text-slate-500">
              © {new Date().getFullYear()} tanthanh.dev. All rights reserved.
            </span>
            <span className="text-[10px] font-mono text-slate-600 flex items-center gap-1">
              Built with React + TS + Tailwind v4 + Framer Motion
            </span>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-lg border border-border-dark bg-slate-900/50 hover:bg-slate-800 hover:text-accent-cyan hover:border-accent-cyan/30 transition-all duration-300 cursor-pointer"
              title="GitHub"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-lg border border-border-dark bg-slate-900/50 hover:bg-slate-800 hover:text-accent-cyan hover:border-accent-cyan/30 transition-all duration-300 cursor-pointer"
              title="LinkedIn"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>
            <a 
              href="https://udemy.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-lg border border-border-dark bg-slate-900/50 hover:bg-slate-800 hover:text-accent-violet hover:border-accent-violet/30 transition-all duration-300 cursor-pointer"
              title="Udemy Instructor"
            >
              <BookOpen className="w-4 h-4" />
            </a>
            <a 
              href="https://youtube.com" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="p-2 rounded-lg border border-border-dark bg-slate-900/50 hover:bg-slate-800 hover:text-[#ff0000] hover:border-[#ff0000]/30 transition-all duration-300 cursor-pointer"
              title="YouTube"
            >
              <YoutubeIcon className="w-4 h-4" />
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
