/**
 * TMDB 이미지 URL 생성 – original 대신 적정 해상도 사용으로 페이로드 최적화
 * @see https://developer.themoviedb.org/docs/image-urls
 *
 * WebP/AVIF: TMDB는 기본적으로 JPG만 제공합니다. WebP/AVIF로 변환하려면
 * 이미지 프록시(Vercel Image Optimization, Cloudflare Images 등)를 사용하고
 * .env에 REACT_APP_IMAGE_PROXY=https://your-domain/api/image 처럼 설정하면
 * getTmdbImageUrl이 해당 프록시를 통해 URL을 감싸 반환합니다.
 */
const BASE = 'https://image.tmdb.org/t/p';

function wrapWithProxyIfSet(url) {
  const proxy = typeof process !== 'undefined' && process.env.REACT_APP_IMAGE_PROXY;
  if (!proxy) return url;
  return `${proxy}?url=${encodeURIComponent(url)}`;
}

/** 모바일 뷰포트 기준 (px) – 이하일 때 작은 해상도 사용 */
export const MOBILE_VIEWPORT_MAX = 600;

export const TMDB_SIZE = {
  /** 메인 배너·히어로: w1280 (1280px 폭, 데스크톱) */
  BANNER: 'w1280',
  /** 모바일 배너 LCP용: w500 (Slow 4G에서 LCP 개선) */
  BANNER_MOBILE: 'w500',
  /** 배경(백드롭): w780 */
  BACKDROP: 'w780',
  /** 목록 카드·썸네일: w500 */
  POSTER: 'w500',
  /** 작은 썸네일(벨 팝업 등): w185 */
  THUMB: 'w185',
  /** 관련 영화 카드: w500 */
  CARD: 'w500',
};

/**
 * @param {string} path - API에서 오는 poster_path/backdrop_path (앞의 / 포함 여부 무관)
 * @param {string} size - TMDB_SIZE 상수 또는 'w300' 등
 * @returns {string} 이미지 URL
 */
export function getTmdbImageUrl(path, size = TMDB_SIZE.POSTER) {
  if (!path) return '';
  const normalized = path.startsWith('/') ? path : `/${path}`;
  const url = `${BASE}/${size}${normalized}`;
  return wrapWithProxyIfSet(url);
}

function buildSrcSet(entries) {
  return entries
    .map(([url, w]) => `${wrapWithProxyIfSet(url)} ${w}w`)
    .join(', ');
}

/**
 * 반응형 poster용 srcSet 문자열 생성 (w300, w500, w780)
 */
export function getTmdbPosterSrcSet(path) {
  if (!path) return '';
  const p = path.startsWith('/') ? path : `/${path}`;
  return buildSrcSet([
    [`${BASE}/w300${p}`, 300],
    [`${BASE}/w500${p}`, 500],
    [`${BASE}/w780${p}`, 780],
  ]);
}

/**
 * 배너/백드롭용 srcSet – 모바일(w300, w500) + 데스크톱(w780, w1280)
 * 브라우저가 viewport에 맞춰 선택. LCP용 fallback은 Banner에서 w500 사용.
 */
export function getTmdbBackdropSrcSet(path) {
  if (!path) return '';
  const p = path.startsWith('/') ? path : `/${path}`;
  return buildSrcSet([
    [`${BASE}/w300${p}`, 300],
    [`${BASE}/w500${p}`, 500],
    [`${BASE}/w780${p}`, 780],
    [`${BASE}/w1280${p}`, 1280],
  ]);
}

/**
 * 모바일 전용 배너 srcSet (뷰포트 ≤600px) – w300, w500만
 */
export function getTmdbBannerMobileSrcSet(path) {
  if (!path) return '';
  const p = path.startsWith('/') ? path : `/${path}`;
  return buildSrcSet([
    [`${BASE}/w300${p}`, 300],
    [`${BASE}/w500${p}`, 500],
  ]);
}

/**
 * 데스크톱 전용 배너 srcSet (뷰포트 >600px) – w780, w1280
 */
export function getTmdbBannerDesktopSrcSet(path) {
  if (!path) return '';
  const p = path.startsWith('/') ? path : `/${path}`;
  return buildSrcSet([
    [`${BASE}/w780${p}`, 780],
    [`${BASE}/w1280${p}`, 1280],
  ]);
}
