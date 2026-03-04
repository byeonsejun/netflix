import React from 'react';
import { MdInfoOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { getTmdbImageUrl, getTmdbBannerMobileSrcSet, getTmdbBannerDesktopSrcSet, TMDB_SIZE } from '../util/tmdbImage';

const Banner = ({ movie }) => {
  const navigate = useNavigate();
  const goToDetailMovie = () => navigate(`/movies/${movie.id}`);
  const path = movie?.backdrop_path || movie?.poster_path;
  // 모바일 LCP 개선: fallback src는 w500 (Slow 4G에서 작은 이미지 우선 로드)
  const bannerUrl = getTmdbImageUrl(path, TMDB_SIZE.BANNER_MOBILE);
  const mobileSrcSet = path ? getTmdbBannerMobileSrcSet(path) : '';
  const desktopSrcSet = path ? getTmdbBannerDesktopSrcSet(path) : '';

  return (
    <div className="banner">
      {bannerUrl && (
        <picture className="banner-picture">
          <source media="(max-width: 600px)" srcSet={mobileSrcSet} sizes="100vw" />
          <source media="(min-width: 601px)" srcSet={desktopSrcSet} sizes="100vw" />
          <img src={bannerUrl} alt="" className="banner-img" fetchpriority="high" decoding="async" />
        </picture>
      )}
      <div className="banner-info">
        <h1>{movie.title}</h1>
        <p>{movie.overview}</p>
        <button className="more_info" onClick={goToDetailMovie}>
          <span>
            <MdInfoOutline />
          </span>
          More information
        </button>
      </div>
    </div>
  );
};

export default Banner;
