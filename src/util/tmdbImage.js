/**
 * TMDB 이미지 URL 생성 – original 대신 적정 해상도 사용으로 페이로드 최적화
 * @see https://developer.themoviedb.org/docs/image-urls
 */
const BASE = 'https://image.tmdb.org/t/p';

export const TMDB_SIZE = {
  /** 메인 배너·히어로: w1280 (1280px 폭) */
  BANNER: 'w1280',
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
  return `${BASE}/${size}${normalized}`;
}

/**
 * 반응형 poster용 srcSet 문자열 생성 (w300, w500, w780)
 */
export function getTmdbPosterSrcSet(path) {
  if (!path) return '';
  const p = path.startsWith('/') ? path : `/${path}`;
  return [
    `${BASE}/w300${p} 300w`,
    `${BASE}/w500${p} 500w`,
    `${BASE}/w780${p} 780w`,
  ].join(', ');
}

/**
 * 배너/백드롭용 srcSet (w780, w1280)
 */
export function getTmdbBackdropSrcSet(path) {
  if (!path) return '';
  const p = path.startsWith('/') ? path : `/${path}`;
  return [
    `${BASE}/w780${p} 780w`,
    `${BASE}/w1280${p} 1280w`,
  ].join(', ');
}
