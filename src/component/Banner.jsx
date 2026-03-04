import React from 'react';
import { MdInfoOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import { getTmdbImageUrl } from '../util/tmdbImage';

const IS_MOBILE = window.innerWidth <= 600;
const BANNER_SIZE = IS_MOBILE ? 'w300' : 'w780';

const Banner = ({ movie }) => {
  const navigate = useNavigate();
  const goToDetailMovie = () => navigate(`/movies/${movie.id}`);
  const path = movie?.backdrop_path || movie?.poster_path;
  const bannerUrl = getTmdbImageUrl(path, BANNER_SIZE);

  return (
    <div className="banner">
      {path && (
        <div className="banner-picture">
          <img
            src={bannerUrl}
            alt=""
            className="banner-img"
            fetchPriority="high"
            loading="eager"
          />
        </div>
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
