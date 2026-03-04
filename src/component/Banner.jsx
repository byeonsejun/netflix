import React from 'react';
import { MdInfoOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { getTmdbImageUrl, getTmdbBannerDesktopSrcSet, TMDB_SIZE } from '../util/tmdbImage';

const Banner = ({ movie }) => {
  const navigate = useNavigate();
  const goToDetailMovie = () => navigate(`/movies/${movie.id}`);
  const path = movie?.backdrop_path || movie?.poster_path;
  const bannerFallback = getTmdbImageUrl(path, TMDB_SIZE.CARD_MOBILE);
  const desktopSrcSet = path ? getTmdbBannerDesktopSrcSet(path) : '';
  const mobileSrc = getTmdbImageUrl(path, TMDB_SIZE.CARD_MOBILE);

  return (
    <div className="banner">
      {path && (
        <picture className="banner-picture">
          <source media="(max-width: 600px)" srcSet={mobileSrc} />
          <source media="(min-width: 601px)" srcSet={desktopSrcSet} sizes="100vw" />
          <img
            src={bannerFallback}
            alt=""
            className="banner-img"
            fetchpriority="high"
            loading="eager"
            decoding="sync"
          />
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
