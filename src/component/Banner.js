import React from 'react';
import { MdInfoOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

const Banner = ({ movie }) => {
  const navigate = useNavigate();
  const goToDetailMovie = () => navigate(`/movies/${movie.id}`);

  return (
    <div
      className="banner"
      style={{
        backgroundImage: `url(https://www.themoviedb.org/t/p/w1920_and_h800_multi_faces${movie.poster_path})`,
      }}
    >
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
