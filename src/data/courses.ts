/**
 * Udemy courses data — sourced from Udemy API.
 * API: https://www.udemy.com/api-2.0/users/228659088/taught-profile-courses/
 */

export interface UdemyCourse {
  id: number;
  title: string;
  headline: string;
  url: string;           // relative, e.g. /course/slug/
  image240x135: string;
  image480x270: string;
  price: string;
  avgRating: number;
  numReviews: number;
  numLectures: number;
  contentInfo: string;   // e.g. "35 total hours"
  level: string;         // "All Levels" | "Beginner" | "Intermediate"
  locale: string;        // e.g. "vi_VN"
  category: string;      // manually tagged
  tags: string[];
}

export const UDEMY_COURSES: UdemyCourse[] = [
  {
    id: 7127093,
    title: 'Google Antigravity: Xây dựng AI Agent, AI App & Vibe Coding',
    headline: 'Vibe Coding and Agentic Workflow: Build AI Apps nhanh, scalable and production-ready',
    url: '/course/google-antigravity-xay-dung-ai-agent-ai-vibe-coding/',
    image240x135: 'https://img-c.udemycdn.com/course/240x135/7127093_a81a_2.jpg',
    image480x270: 'https://img-c.udemycdn.com/course/480x270/7127093_a81a_2.jpg',
    price: '999.000\u00a0\u20ab',
    avgRating: 4.89,
    numReviews: 31,
    numLectures: 54,
    contentInfo: '8.5 total hours',
    level: 'All Levels',
    locale: 'vi_VN',
    category: 'AI',
    tags: ['AI', 'Gemini', 'Agent', 'Vibe Coding', 'TypeScript'],
  },
  {
    id: 6765689,
    title: 'Khóa Học NestJS Microservices Thực Chiến: Từ Zero Đến Hero',
    headline: 'Xây dựng hệ thống NestJS Microservices, TCP, gRPC, Kafka, Keycloak OIDC, SAGA, Docker, Nx monorepo, Testing, Monitoring',
    url: '/course/khoa-hoc-nestjs-microservices-thuc-chien-tu-zero-en-hero/',
    image240x135: 'https://img-c.udemycdn.com/course/240x135/6765689_723e_6.jpg',
    image480x270: 'https://img-c.udemycdn.com/course/480x270/6765689_723e_6.jpg',
    price: '999.000\u00a0\u20ab',
    avgRating: 4.76,
    numReviews: 90,
    numLectures: 155,
    contentInfo: '35 total hours',
    level: 'All Levels',
    locale: 'vi_VN',
    category: 'Backend',
    tags: ['NestJS', 'Microservices', 'Kafka', 'gRPC', 'Docker', 'Keycloak'],
  },
  {
    id: 5321346,
    title: 'Thực chiến microservice với Spring Boot và Event Sourcing',
    headline: 'Microservice, Spring Boot, Event Sourcing, CQRS, Apache Kafka, Keycloak, Docker, Kubernetes, CI/CD, Nginx, Spring Cloud',
    url: '/course/thuc-chien-microservice-voi-spring-boot-va-event-sourcing/',
    image240x135: 'https://img-c.udemycdn.com/course/240x135/5321346_b6d5_5.jpg',
    image480x270: 'https://img-c.udemycdn.com/course/480x270/5321346_b6d5_5.jpg',
    price: '999.000\u00a0\u20ab',
    avgRating: 4.5,
    numReviews: 129,
    numLectures: 121,
    contentInfo: '30 total hours',
    level: 'Intermediate',
    locale: 'vi_VN',
    category: 'Backend',
    tags: ['Spring Boot', 'Microservices', 'Kafka', 'CQRS', 'Kubernetes', 'Docker'],
  },
  {
    id: 5273900,
    title: 'Thực chiến microservice với Spring Webflux & Apache Kafka',
    headline: 'microservice, Spring Webflux, Apache Kafka, Kong gateway, Docker',
    url: '/course/khoa-hoc-microservice-voi-spring-webflux-apache-kafka/',
    image240x135: 'https://img-c.udemycdn.com/course/240x135/5273900_da0f_2.jpg',
    image480x270: 'https://img-c.udemycdn.com/course/480x270/5273900_da0f_2.jpg',
    price: '499.000\u00a0\u20ab',
    avgRating: 4.31,
    numReviews: 24,
    numLectures: 40,
    contentInfo: '13.5 total hours',
    level: 'Beginner',
    locale: 'vi_VN',
    category: 'Backend',
    tags: ['Spring Webflux', 'Kafka', 'Reactive', 'Kong', 'Docker'],
  },
  {
    id: 5803088,
    title: 'Java 8 Masterclass: Tính năng mới với Lambdas & Stream',
    headline: 'Học Functional programming bằng cách sử dụng Lambdas, Streams, Optionals và Date API',
    url: '/course/whats-new-in-java-8-vietnamese/',
    image240x135: 'https://img-c.udemycdn.com/course/240x135/5803088_53a7_10.jpg',
    image480x270: 'https://img-c.udemycdn.com/course/480x270/5803088_53a7_10.jpg',
    price: '499.000\u00a0\u20ab',
    avgRating: 4.39,
    numReviews: 35,
    numLectures: 57,
    contentInfo: '5 total hours',
    level: 'Beginner',
    locale: 'vi_VN',
    category: 'Backend',
    tags: ['Java 8', 'Lambdas', 'Streams', 'Functional Programming'],
  },
  {
    id: 5325310,
    title: 'Cơ Sở Dữ Liệu Phân tán MSSQL, C#, DevExpress',
    headline: 'Khóa học xây dựng ứng dụng Quản Lý Điểm Sinh Viên Hệ Tín Chỉ',
    url: '/course/co-so-du-lieu-phan-tan-mssql-c-devexpress/',
    image240x135: 'https://img-c.udemycdn.com/course/240x135/5325310_1756.jpg',
    image480x270: 'https://img-c.udemycdn.com/course/480x270/5325310_1756.jpg',
    price: '499.000\u00a0\u20ab',
    avgRating: 4.17,
    numReviews: 12,
    numLectures: 16,
    contentInfo: '8.5 total hours',
    level: 'Beginner',
    locale: 'vi_VN',
    category: 'Database',
    tags: ['MSSQL', 'C#', 'DevExpress', 'Database'],
  },
];
