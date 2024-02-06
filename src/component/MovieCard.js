import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { movieAction } from '../redux/actions/MovieAction';
import YouTube from 'react-youtube';
import uuid from 'react-uuid';
import ModalPortal from './ui/ModalPortal';
import VideoModal from './VideoModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faYoutube } from '@fortawesome/free-brands-svg-icons';

import adultSvg from './../images/adult.svg';
import kidsSvg from './../images/kids.svg';
import bestImg from './../images/best.png';

const opts = {
  height: '100%',
  width: '100%',
  playerVars: {
    autoplay: 1,
  },
};

const MovieCard = ({ item, genreList, page }) => {
  const dispatch = useDispatch();
  const { detailVideo, globalModalId } = useSelector((state) => state.movie);
  const navigate = useNavigate();
  const goToDetailMovie = () => navigate(`/movies/${item.id}`);

  const [uid] = useState(uuid());

  const [openModal, setOpenModal] = useState(false);
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => setHovered(true);
  const handleMouseLeave = () => setHovered(false);

  const showVideoModal = () => {
    dispatch(movieAction.getYoutubeVideo(item.id, uid));
  };

  useEffect(() => {
    if (uid !== globalModalId || detailVideo.results.length === 0) return;
    setOpenModal(true);
  }, [detailVideo]);

  useEffect(() => {
    const timer = hovered && setTimeout(showVideoModal, 3000);
    return () => clearTimeout(timer);
  }, [hovered]);

  return (
    <>
      <div
        onClick={goToDetailMovie}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`card ${page && page}`}
        style={{
          backgroundImage: `url(
                https://www.themoviedb.org/t/p/w710_and_h400_multi_faces${item.poster_path}
                )`,
        }}
      >
        <div className="overlay">
          <h2>{item.title}</h2>
          <div className="overlay_genre">
            <span className="genre_left">Genre: </span>
            {item.genre_ids.map((id, idx) => (
              <span key={idx}>
                {genreList.find((item) => item.id === id).name}
                {item.genre_ids.length > idx + 1 && ', '}
              </span>
            ))}
          </div>
          <div className="overlay_info">
            <span>
              <img className="best_img" src={bestImg} alt="best icon" />
              {item.vote_average.toFixed(1)}
            </span>
            <span>
              <FontAwesomeIcon icon={faYoutube} className="icon-youtube" />
              {item.popularity.toFixed(1)} K
            </span>
            <span>
              {item.adult ? (
                <img className="adult_img" src={adultSvg} alt="adult img" />
              ) : (
                <img className="kids_img" src={kidsSvg} alt="kids img" />
              )}
            </span>
          </div>
        </div>
      </div>
      {openModal && (
        <ModalPortal>
          <VideoModal onClose={() => setOpenModal(false)}>
            <YouTube videoId={detailVideo.results[0].key} opts={opts} />
          </VideoModal>
        </ModalPortal>
      )}
    </>
  );
};

export default MovieCard;
