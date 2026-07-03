/**
 * Projects data — src/data/projects.ts
 *
 * Static configuration for the portfolio's Project section.
 * Each entry follows the ProjectDetail case-study format:
 *   Problem → Solution → Outcome → Tech Stack → Links
 *
 * Data sourced from LinkedIn work history and personal projects.
 */

export type ProjectCategory = 'SaaS' | 'Microservices' | 'Backend' | 'Frontend' | 'DevOps';

export interface Project {
  id: string;              // URL slug, e.g. "be-businessfocus"
  title: string;
  shortDesc: string;       // 1-liner for card
  role: string;            // e.g. "Full Stack Developer"
  period: string;          // e.g. "Mar 2024 – Present"
  category: ProjectCategory;
  tags: string[];          // Tech stack badges
  // Case-study sections
  problem: string;
  solution: string;
  outcome: string;
  // Links
  github?: string;
  liveDemo?: string;
  // Optional media
  imageUrl?: string;
  featured: boolean;       // Shows on homepage grid
}

export const PROJECTS: Project[] = [
  {
    id: 'be-businessfocus',
    title: 'Be Businessfocus',
    shortDesc: 'Enterprise SaaS CRM platform for the French market, built with NestJS microservices.',
    role: 'Full Stack Developer',
    period: 'Mar 2024 – Present',
    category: 'SaaS',
    tags: ['React.js', 'MUI', 'NestJS', 'Microservices', 'PostgreSQL', 'Docker', 'TypeScript'],
    problem:
      'A French enterprise needed a modern CRM SaaS to replace their legacy on-premise system. The platform had to support multi-tenancy, real-time collaboration, and integrate with external ERP systems — all while meeting French data-residency requirements.',
    solution:
      'Architected a NestJS microservices backend with event-driven communication via message queues. Built a React + MUI frontend with a modular component library. Implemented multi-tenant data isolation at the database layer and a role-based access control (RBAC) system to handle complex organisational hierarchies.',
    outcome:
      'Successfully delivered the first production release. The platform now serves multiple enterprise clients in France with 99.9% uptime. Onboarding time for new tenants reduced from days to minutes via an automated provisioning pipeline.',
    featured: true,
  },
  {
    id: 'vvm',
    title: 'VVM — Team Management Platform',
    shortDesc: 'Full-stack team collaboration tool with Kanban, Gantt chart, and real-time updates.',
    role: 'Full Stack Developer',
    period: 'Feb 2023 – Jun 2023',
    category: 'SaaS',
    tags: ['React.js', 'NestJS', 'WebSocket', 'PostgreSQL', 'Redis', 'Docker'],
    problem:
      'Development teams lacked a unified tool combining Kanban boards, Gantt chart scheduling, and real-time team communication in a single platform without vendor lock-in.',
    solution:
      'Built a full-stack application using NestJS on the backend with WebSocket support for real-time sync. Implemented a drag-and-drop Kanban board and a custom Gantt chart renderer in React. Used Redis for caching and session management.',
    outcome:
      'Delivered a working platform used internally for project tracking. The Gantt chart reduced sprint planning time by an estimated 40% compared to spreadsheet-based planning.',
    featured: true,
  },
  {
    id: 'spayment',
    title: 'SPayment — Banking Microservice',
    shortDesc: 'High-throughput payment processing system with Kafka event streaming and Spring Boot.',
    role: 'Full Stack Developer',
    period: 'Dec 2022 – Feb 2023',
    category: 'Microservices',
    tags: ['Spring Boot', 'Apache Kafka', 'Java', 'Docker', 'PostgreSQL', 'Redis', 'Kong Gateway'],
    problem:
      'A fintech client required a reliable, audit-traceable payment processing backend capable of handling thousands of transactions per second, with guaranteed message delivery and rollback capabilities on failure.',
    solution:
      'Designed an event-sourcing architecture with Apache Kafka as the message backbone. Each transaction step (initiate, validate, execute, settle) is represented as an immutable event. Implemented the Saga pattern for distributed transaction management across services. Kong API Gateway handles rate limiting and authentication.',
    outcome:
      'The system processes 5,000+ transactions per minute with end-to-end latency under 200ms. Event-sourcing provides a complete audit trail satisfying banking compliance requirements.',
    featured: true,
  },

  {
    id: 'hsbc-nova-migration',
    title: 'HSBC NOVA Migration',
    shortDesc: 'Enterprise banking system migration from legacy to cloud-native Spring Boot microservices.',
    role: 'Backend Java Developer',
    period: 'Jul 2022 – Dec 2022',
    category: 'Backend',
    tags: ['Java', 'Spring Boot', 'Mulesoft', 'Kong Gateway', 'REST', 'Oracle DB'],
    problem:
      'HSBC needed to migrate a critical legacy banking system (NOVA) to a modern microservices architecture while maintaining zero downtime and full backward compatibility with 15+ downstream systems.',
    solution:
      'Developed new Spring Boot microservices as strangler-fig replacements for legacy monolith modules. Used Mulesoft as an integration middleware to route traffic between old and new systems during the transition. Kong Gateway was deployed as the unified API entry point with policy-based routing.',
    outcome:
      'Successfully completed migration of 6 critical modules ahead of schedule. The new architecture reduced average API response time by 65% and enabled independent deployability of each service.',
    featured: true,
  },
  {
    id: 'mft-process-erp',
    title: 'MFT Process ERP Platform',
    shortDesc: 'Visually engaging web interfaces for Project and Contract Management ERP platform.',
    role: 'Frontend Web Developer',
    period: 'Oct 2023 – Mar 2024',
    category: 'Frontend',
    tags: ['React.js', 'Next.js', 'TypeScript', 'Redux', 'Material UI'],
    problem:
      'The existing Project and Contract Management processes lacked user-friendly interfaces, making it difficult for users to engage with the system and manage contracts efficiently.',
    solution:
      'Developed visually engaging web interfaces using ReactJS, NextJS, and Material UI. Integrated intuitive features into the web platform to simplify Contract Management processes, while collaborating closely with cross-functional teams to ensure alignment with business requirements.',
    outcome:
      'Significantly enhanced user engagement and streamlined the contract management workflow, delivering a robust frontend application for American Code Lab.',
    featured: true,
  },
  {
    id: 'acl-marketplace',
    title: 'ACL — Education Marketplace',
    shortDesc: 'Online education marketplace connecting instructors and students with course management.',
    role: 'Frontend Developer',
    period: 'Jun 2023 – Oct 2023',
    category: 'Frontend',
    tags: ['React.js', 'TypeScript', 'TailwindCSS', 'React Query', 'Zustand'],
    problem:
      'An education startup needed a performant, responsive marketplace frontend to showcase courses, manage enrollments, and provide an instructor dashboard — with tight UI consistency requirements across 50+ pages.',
    solution:
      'Built a component library of 30+ reusable UI components aligned to a custom design system. Implemented React Query for server-state management, reducing redundant API calls by 70%. Zustand managed local UI state. Applied code-splitting per route to achieve a <2s initial load time.',
    outcome:
      'Frontend delivered on time for the beta launch. Lighthouse performance score of 91. The component library was subsequently adopted by the backend team for admin tooling.',
    featured: true,
  },
];

/**
 * Returns only the featured projects (for homepage grid).
 */
export const FEATURED_PROJECTS = PROJECTS.filter(p => p.featured);
