/**
 * Udemy Service — src/services/udemyService.ts
 *
 * Architecture:
 *  1. Attempt to fetch from Udemy public API (client-side, no auth needed for taught-profile-courses).
 *  2. On failure (CORS, network error, etc.), fall back silently to local mock data.
 *  3. Results are cached in memory for the session to avoid redundant network calls.
 *
 * When Udemy provides a private API schema/key in the future, replace the
 * fetchFromUdemy() implementation with the authenticated endpoint.
 */

import { UDEMY_COURSES, type UdemyCourse } from '../data/courses';

export type { UdemyCourse };

// ── Constants ─────────────────────────────────────────────────────────────────

const UDEMY_USER_ID = 228659088;

const RAW_UDEMY_URL =
  `https://www.udemy.com/api-2.0/users/${UDEMY_USER_ID}/taught-profile-courses/` +
  `?page=1&organizationCoursesOnly=false` +
  `&fields[course]=@default,discount,num_published_lectures,headline,instructional_level_simple,avg_rating,num_reviews,buyable_object_type,content_info,is_wishlisted,rating,image_100x100,is_recently_published,caption_locales,caption_languages,locale,badges,tracking_id,is_in_user_subscription,learn_url,is_in_premium,is_coding_exercises_badge_eligible,is_google_partner_course` +
  `&filter_hq_courses=true` +
  `&ordering=lang,-course_performance__revenue_30days,-published_time` +
  `&price_country=VN` +
  `&page_size=9`;

const UDEMY_API_URL = `https://corsproxy.io/?` + encodeURIComponent(RAW_UDEMY_URL);

// ── In-memory cache ───────────────────────────────────────────────────────────

let _cache: UdemyCourse[] | null = null;

// ── API response shape (Udemy public API) ─────────────────────────────────────

interface UdemyApiCourse {
  id: number;
  title: string;
  url: string;
  headline: string;
  is_paid: boolean;
  price: string;
  price_detail?: {
    amount: number;
    currency: string;
    price_string: string;
    currency_symbol: string;
  };
  image_100x100?: string;
  image_240x135?: string;
  image_480x270?: string;
  avg_rating: number;
  rating: number;
  num_reviews: number;
  num_published_lectures: number;
  instructional_level_simple: string;
  content_info: string;
  locale: { locale: string };
}

interface UdemyApiResponse {
  count: number;
  results: UdemyApiCourse[];
}

// ── Mapper ────────────────────────────────────────────────────────────────────

function mapApiCourse(raw: UdemyApiCourse): UdemyCourse {
  // Find local enrichment (category, tags) from our static data
  const local = UDEMY_COURSES.find(c => c.id === raw.id);

  return {
    id: raw.id,
    title: raw.title,
    headline: raw.headline,
    url: raw.url,
    image240x135: raw.image_240x135 || raw.image_100x100 || '',
    image480x270: raw.image_480x270 || raw.image_100x100 || '',
    price: raw.price || 'Miễn phí',
    avgRating: Number(raw.avg_rating.toFixed(2)),
    numReviews: raw.num_reviews,
    numLectures: raw.num_published_lectures,
    contentInfo: raw.content_info,
    level: raw.instructional_level_simple,
    locale: raw.locale?.locale ?? 'vi_VN',
    // Preserve local enrichment or fallback to defaults
    category: local?.category ?? 'Other',
    tags: local?.tags ?? [],
  };
}

// ── Fetcher ───────────────────────────────────────────────────────────────────

async function fetchFromUdemy(): Promise<UdemyCourse[]> {
  const response = await fetch(UDEMY_API_URL, {
    headers: {
      Accept: 'application/json, text/plain, */*',
    },
    // 5-second timeout
    signal: AbortSignal.timeout(5000),
  });

  if (!response.ok) {
    throw new Error(`Udemy API responded with ${response.status}`);
  }

  const data: UdemyApiResponse = await response.json();
  return data.results.map(mapApiCourse);
}

// ── Public API ────────────────────────────────────────────────────────────────

/**
 * Returns the instructor's courses.
 * Tries the live Udemy API first, falls back to local mock data on any error.
 * Results are cached for the browser session.
 */
export async function getCourses(): Promise<UdemyCourse[]> {
  if (_cache) return _cache;

  try {
    const courses = await fetchFromUdemy();
    _cache = courses;
    console.info('[udemyService] Loaded %d courses from Udemy API.', courses.length);
    return courses;
  } catch (err) {
    console.warn(
      '[udemyService] Udemy API unavailable (%s). Falling back to local data.',
      err instanceof Error ? err.message : String(err)
    );
    _cache = UDEMY_COURSES;
    return UDEMY_COURSES;
  }
}

/**
 * Returns a single course by ID.
 * Uses the same cached/fallback source as getCourses().
 */
export async function getCourseById(id: number): Promise<UdemyCourse | undefined> {
  const courses = await getCourses();
  return courses.find(c => c.id === id);
}

/**
 * Returns courses filtered by category.
 */
export async function getCoursesByCategory(category: string): Promise<UdemyCourse[]> {
  const courses = await getCourses();
  return courses.filter(c => c.category === category);
}

/**
 * Returns all distinct category names.
 */
export async function getCategories(): Promise<string[]> {
  const courses = await getCourses();
  return Array.from(new Set(courses.map(c => c.category)));
}

/**
 * Clears the in-memory cache (useful for dev/testing).
 */
export function clearCache(): void {
  _cache = null;
}
