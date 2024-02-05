import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge } from 'react-bootstrap';
import PuffLoader from 'react-spinners/PuffLoader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImdb } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

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
                {item.genre_ids.length > 1 &&
                  item.genre_ids.map((id, idx) => (
                    <Badge key={idx} bg="danger">
                      {genreList.find((item) => item.id === id).name}
                    </Badge>
                  ))}
              </div>
              <div className="related_info">
                <span>
                  <FontAwesomeIcon icon={faImdb} className="icon-imdb" />
                  {item.vote_average}
                </span>
                <span>
                  <FontAwesomeIcon icon={faYoutube} className="icon-youtube" />
                  {item.popularity}
                </span>
                <span className="eightteen">{item.adult ? 'R-rated' : 'Under 18'}</span>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
};

export default RelatedMovies;
