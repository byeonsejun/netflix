import React from 'react';
import { MdInfoOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { getTmdbImageUrl, getTmdbBackdropSrcSet, TMDB_SIZE } from '../util/tmdbImage';

const Banner = ({ movie }) => {
  const navigate = useNavigate();
  const goToDetailMovie = () => navigate(`/movies/${movie.id}`);
  const path = movie?.backdrop_path || movie?.poster_path;
  const bannerUrl = getTmdbImageUrl(path, TMDB_SIZE.BANNER);
  const srcSet = path ? getTmdbBackdropSrcSet(path) : '';

  return (
    <div className="banner">
      {bannerUrl && (
        <picture className="banner-picture">
          <source srcSet={srcSet} sizes="100vw" type="image/jpeg" />
          <img
            src={bannerUrl}
            alt=""
            className="banner-img"
            fetchpriority="high"
            decoding="async"
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
