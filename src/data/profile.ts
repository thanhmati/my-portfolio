/**
 * Profile constants — single source of truth for personal info.
 * Update this file whenever your profile data changes.
 */

export const PROFILE = {
  name: 'Đỗ Tấn Thành',
  nameEn: 'Do Tan Thanh',
  alias: 'tanthanh',
  title: 'Full Stack Developer & Udemy Instructor',
  location: 'Ho Chi Minh City, Vietnam 🇻🇳',
  email: 'dotanthanhvlog@gmail.com',
  bio: `I'm a Full Stack Developer with 3+ years of hands-on experience building production web applications — from startup MVPs to enterprise-scale distributed systems. I specialise in the JavaScript/TypeScript ecosystem (React, NestJS, Node.js) and Java backend (Spring Boot, Microservices). As a Udemy Instructor, I create practical, project-based courses in Vietnamese that take students from zero to production-ready.`,
  bio_short: 'Full Stack Developer · Udemy Instructor · Microservices & Cloud enthusiast.',
  avatar: 'https://img-c.udemycdn.com/user/100x100/228659088_fae4.jpg',
  socials: {
    github: 'https://github.com/thanhmati',
    linkedin: 'https://www.linkedin.com/in/thanh270600/',
    udemy: 'https://www.udemy.com/user/do-tan-thanh-2/',
    youtube: 'https://www.youtube.com/@laptrinhfullstack',
    email: 'mailto:dotanthanhvlog@gmail.com',
  },
  udemy: {
    userId: 228659088,
    totalStudents: 1913,
    totalReviews: 320,
    avgRating: 4.6,
    totalCourses: 6,
  },
} as const;
