import React from 'react';
import { useNavigate } from 'react-router-dom';
import PuffLoader from 'react-spinners/PuffLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

import adultSvg from './../images/adult.svg';
import kidsSvg from './../images/kids.svg';
import bestImg from './../images/best.png';

const RelatedMovies = ({ detailRelated, genreList, loading }) => {
  const navigate = useNavigate();
  const goToDetailMovie = (id) => navigate(`/movies/${id}`);

  if (loading) {
    return (
      <PuffLoader
        color="#dc143c"
        loading={loading}
        size={150}
        cssOverride={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
      />
    );
  }

  return (
    <div className="related-movies">
      {detailRelated.results.length > 0 &&
        detailRelated.results.map((item, idx) => (
          <div
            key={idx}
            onClick={() => goToDetailMovie(item.id)}
            className="related-card card"
            style={{
              backgroundImage: `url(https://image.tmdb.org/t/p/w600_and_h900_bestv2${item.poster_path})`,
            }}
          >
            <div className="overlay related-overlay">
              <div className="items"></div>
              <h2 className="related_title">{item.title}</h2>
              <div className="related_danger">
                <span className="genre_left">Genre: </span>
                {item.genre_ids.length > 1 &&
                  item.genre_ids.map((id, idx) => (
                    <span key={idx}>
                      {genreList.find((item) => item.id === id).name}
                      <span>, </span>
                    </span>
                  ))}
              </div>
              <div className="related_info">
                <span>
                  <img className="best_img" src={bestImg} alt="best icon" />
                  {item.vote_average.toFixed(1)}
                </span>
                <span>
                  <FontAwesomeIcon icon={faYoutube} className="icon-youtube" />
                  {item.popularity.toFixed(1)} K
                </span>
                <span className="eightteen">
                  {item.adult ? (
                    <img className="adult_img" src={adultSvg} alt="adult img" />
                  ) : (
                    <img className="kids_img" src={kidsSvg} alt="kids img" />
                  )}
                </span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RelatedMovies;
