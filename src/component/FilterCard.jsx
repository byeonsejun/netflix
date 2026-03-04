import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

import { getTmdbImageUrl, TMDB_SIZE } from '../util/tmdbImage';
import adultSvg from './../images/adult.svg';
import kidsSvg from './../images/kids.svg';
import bestImg from './../images/best.png';

const FilterCard = ({ item, genreList }) => {
  const navigate = useNavigate();
  return (
    <div onClick={() => navigate(`/movies/${item.id}`)} className="filter_card" id="bright">
      <div className="info_section">
        <div className="movie_header">
          <img
            className="locandina"
            src={getTmdbImageUrl(item.poster_path, TMDB_SIZE.POSTER)}
            alt={`posterImg`}
            width={54}
            height={80}
            loading="lazy"
          />
          <h1>{item.title}</h1>
          {item.release_date && <h4>{item.release_date.substring(0, 4)}</h4>}
          <div className="overlay_badge">
            <span className="genre_left">Genre: </span>
            {item.genre_ids.map((id, idx) => {
              return (
                <span key={idx}>
                  {genreList.length > 0 && genreList.find((item) => item.id === id).name}
                  <span>,</span>
                </span>
              );
            })}
          </div>
        </div>
        <div className="movie_desc">
          <p className="text">{item.overview && item.overview.substring(0, 200)}...</p>
        </div>
        <div className="movie_social">
          <ul>
            <li>
              <span className="imb-score">
                <img className="best_img" src={bestImg} alt="best icon" width={20} height={20} />
                {item.vote_average && item.vote_average.toFixed(1)}
              </span>
            </li>
            <li>
              <span className="imb-score">
                <FontAwesomeIcon icon={faYoutube} className="icon-youtube" />
                {item.popularity && item.popularity.toFixed(1)} K
              </span>
            </li>
            <li>
              <span className="eightteen">
                {item.adult ? (
                  <img className="adult_img" src={adultSvg} alt="adult img" width={16} height={16} />
                ) : (
                  <img className="kids_img" src={kidsSvg} alt="kids img" width={16} height={16} />
                )}
              </span>
            </li>
          </ul>
        </div>
      </div>
      <div className="blur_back bright_back">
        <img
          src={getTmdbImageUrl(item.backdrop_path, TMDB_SIZE.BACKDROP)}
          alt=""
          className="blur_back_img"
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  );
};

export default FilterCard;
