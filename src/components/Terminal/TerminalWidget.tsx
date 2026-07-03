import React, { useState, useRef, useEffect, useCallback } from 'react';
import { TerminalIcon } from 'lucide-react';
import { PROFILE } from '../../data/profile';
import { UDEMY_COURSES } from '../../data/courses';

// ── Types ──────────────────────────────────────────────
interface TerminalLine {
  id: number;
  type: 'input' | 'output' | 'error' | 'system';
  text: string;
}

// ── Command definitions ────────────────────────────────
const COMMANDS: Record<string, () => string[]> = {
  help: () => [
    '┌─ Available commands ──────────────────────────────────────────────┐',
    '│  help      — Show this help message                  │',
    '│  about     — Learn about Thanh                        │',
    '│  courses   — View Udemy courses                      │',
    '│  projects  — Browse featured projects                │',
    '│  contact   — Get in touch                            │',
    '│  clear     — Clear the terminal                      │',
    '└──────────────────────────────────────────────────────┘',
  ],
  about: () => [
    `> ${PROFILE.name} — Full Stack Developer & Udemy Instructor`,
    '',
    `  💻  3+ years building production web & distributed systems`,
    `  🎓  Teaching ${PROFILE.udemy.totalStudents.toLocaleString()}+ students on Udemy`,
    `  🛠️  React · NestJS · TypeScript · Spring Boot · Kafka · Docker`,
    `  🌏  Ho Chi Minh City, Vietnam`,
    '',
    `  Passionate about microservices, clean architecture, and`,
    `  sharing knowledge with the Vietnamese dev community.`,
  ],
  courses: () => [
    '> Udemy Courses — udemy.com/user/do-tan-thanh-2/',
    '',
    ...UDEMY_COURSES.slice(0, 4).map((c, i) =>
      `  [${i + 1}] ${c.title.length > 48 ? c.title.slice(0, 48) + '…' : c.title}  ⭐ ${c.avgRating.toFixed(1)}`
    ),
    `  ... and ${UDEMY_COURSES.length - 4} more courses`,
    '',
    '  → Scroll to #courses to see full details.',
  ],
  projects: () => [
    '> Featured Projects',
    '',
    '  [1] Be Businessfocus — SaaS CRM platform (France)',
    '  [2] VVM — Kanban / Gantt team management tool',
    '  [3] SPayment — Banking microservice with Kafka',
    '',
    '  → Scroll to #projects to see live demos & source.',
  ],
  contact: () => [
    '> Contact Information',
    '',
    `  📧  ${PROFILE.email}`,
    `  🐙  github.com/thanhmati`,
    `  💼  linkedin.com/in/thanh270600`,
    `  📺  youtube.com/@laptrinhfullstack`,
    '',
    '  → Or use the contact form below — scroll to #contact.',
  ],
};

const BOOT_LINES: TerminalLine[] = [
  { id: -3, type: 'system', text: 'tanthanh.dev — Interactive Portfolio Terminal v1.0.0' },
  { id: -2, type: 'system', text: 'Type "help" to see available commands.' },
  { id: -1, type: 'system', text: '' },
];

let lineCounter = 0;
const nextId = () => ++lineCounter;

// ── Component ──────────────────────────────────────────
export default function TerminalWidget() {
  const [lines, setLines] = useState<TerminalLine[]>(BOOT_LINES);
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  void historyIndex; // consumed by ArrowUp/Down handlers


  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new output
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const appendLines = useCallback((newLines: TerminalLine[]) => {
    setLines(prev => [...prev, ...newLines]);
  }, []);

  const runCommand = useCallback(
    (raw: string) => {
      const cmd = raw.trim().toLowerCase();

      // Echo the input
      const echoLine: TerminalLine = {
        id: nextId(),
        type: 'input',
        text: cmd,
      };

      if (cmd === 'clear') {
        setLines(BOOT_LINES);
        return;
      }

      if (!cmd) {
        appendLines([echoLine]);
        return;
      }

      const handler = COMMANDS[cmd];
      if (handler) {
        const outputLines: TerminalLine[] = handler().map(text => ({
          id: nextId(),
          type: 'output' as const,
          text,
        }));
        appendLines([echoLine, ...outputLines, { id: nextId(), type: 'output', text: '' }]);
      } else {
        appendLines([
          echoLine,
          {
            id: nextId(),
            type: 'error',
            text: `Command not found: "${cmd}". Type "help" for available commands.`,
          },
          { id: nextId(), type: 'output', text: '' },
        ]);
      }
    },
    [appendLines]
  );

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      const cmd = input;
      setHistory(prev => (cmd.trim() ? [cmd, ...prev] : prev));
      setHistoryIndex(-1);
      setInput('');
      runCommand(cmd);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHistoryIndex(prev => {
        const next = Math.min(prev + 1, history.length - 1);
        setInput(history[next] ?? '');
        return next;
      });
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHistoryIndex(prev => {
        const next = Math.max(prev - 1, -1);
        setInput(next === -1 ? '' : history[next] ?? '');
        return next;
      });
    }
  };

  const colorForType = (type: TerminalLine['type']) => {
    switch (type) {
      case 'input':  return 'text-accent-emerald';
      case 'error':  return 'text-red-400';
      case 'system': return 'text-accent-cyan';
      default:       return 'text-slate-300';
    }
  };

  return (
    <div
      className="rounded-xl border border-border-dark bg-card-dark/90 overflow-hidden shadow-2xl glow-emerald"
      onClick={() => inputRef.current?.focus()}
    >
      {/* Title bar */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-slate-900/80 border-b border-border-dark">
        <div className="flex gap-1.5">
          <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
          <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
          <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
        </div>
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <TerminalIcon className="w-3.5 h-3.5" />
          <span>tanthanh@portfolio: ~</span>
        </div>
        <span className="text-[10px] font-mono text-slate-600 hidden sm:inline">bash · utf-8</span>
      </div>

      {/* Output area */}
      <div className="h-72 overflow-y-auto p-4 space-y-0.5 scrollbar-thin">
        {lines.map(line => (
          <div
            key={line.id}
            className={`font-mono text-sm leading-relaxed ${colorForType(line.type)} animate-slide-in`}
          >
            {line.type === 'input' ? (
              <span>
                <span className="text-accent-violet">❯ </span>
                {line.text}
              </span>
            ) : (
              <span style={{ whiteSpace: 'pre' }}>{line.text || '\u00A0'}</span>
            )}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input row */}
      <div className="flex items-center gap-2 px-4 py-3 border-t border-border-dark bg-slate-900/50">
        <span className="text-accent-violet font-mono text-sm select-none">❯</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="terminal-input text-sm"
          placeholder="type a command..."
          autoFocus
          autoComplete="off"
          spellCheck={false}
        />
        <span className="terminal-cursor" />
      </div>
    </div>
  );
}
