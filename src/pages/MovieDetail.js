import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { movieAction } from './../redux/actions/MovieAction';
import PuffLoader from 'react-spinners/PuffLoader';
import { Container, Row, Col, Tab, Tabs, Button } from 'react-bootstrap';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

import YouTube from 'react-youtube';
import Reviews from '../component/Reviews';
import RelatedMovies from '../component/RelatedMovies';
import ErrorInfo from '../component/ErrorInfo';
import { addLocalStorage, initLocalStorage, readLocalStorage } from '../util/util';
import ModalPortal from '../component/ui/ModalPortal';
import VideoModal from '../component/VideoModal';

import adultSvg from './../images/adult.svg';
import kidsSvg from './../images/kids.svg';
import bestImg from './../images/best.png';
import { FaRegThumbsUp } from 'react-icons/fa';

const opts = {
  height: '100%',
  width: '100%',
  playerVars: {
    autoplay: 1,
  },
};

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detailMovie, detailReviews, detailRelated, detailVideo, genreList, loading } = useSelector(
    (state) => state.movie
  );

  const [openModal, setOpenModal] = useState(false);
  const [like, setLike] = useState(false);

  const likeSwitch = () => {
    const currentValue = readLocalStorage('like');
    if (currentValue === null) {
      addLocalStorage('like', [id]);
      setLike(true);
      return;
    }
    const current = currentValue.find((storageId) => storageId === id);
    if (current === undefined) {
      currentValue.push(id);
      addLocalStorage('like', currentValue);
      setLike(true);
    } else {
      const newValue = currentValue.filter((storageId) => storageId !== current);
      addLocalStorage('like', newValue);
      setLike(false);
    }
  };

  useEffect(() => {
    dispatch(movieAction.getMovieDetails(id));
    initLocalStorage('like', id) ? setLike(true) : setLike(false);
  }, [dispatch, id]);

  useEffect(() => {
    console.log(detailMovie);
  }, [detailMovie]);

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
    <>
      {detailMovie.id !== undefined ? (
        <section className="detail-box">
          <Container className="detail-wrap">
            <Row>
              <Col xl="6" lg="4" className="detail-img">
                <div className="detail-img-wrap">
                  <img src={`https://image.tmdb.org/t/p/original///${detailMovie.poster_path}`} alt="detail Img" />
                </div>
              </Col>
              <Col xl="6" lg="8">
                <h2 className="detail_title">{detailMovie.original_title}</h2>
                <h3>{detailMovie.tagline}</h3>
                <div className="detail_danger">
                  <span className="genre_left">Genre: </span>
                  {detailMovie.genres.map((item, idx) => (
                    <span key={item.name}>
                      {item.name}
                      {detailMovie.genres.length > idx + 1 && ', '}
                    </span>
                  ))}
                </div>
                <div className="movie_social_details">
                  <ul className="overlay_info">
                    <li>
                      <img className="best_img" src={bestImg} alt="best icon" />
                      <span>{detailMovie.vote_average.toFixed(1)}</span>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faYoutube} className="icon-youtube" />
                      <span className="imb-score">{detailMovie.popularity.toFixed(1)} K</span>
                    </li>
                    <li>
                      {detailMovie.adult ? (
                        <img className="adult_img" src={adultSvg} alt="adult img" />
                      ) : (
                        <img className="kids_img" src={kidsSvg} alt="kids img" />
                      )}
                    </li>
                  </ul>
                </div>
                <div className="product-variant">
                  <div className="product-desc variant-item">
                    <p>{detailMovie.overview}</p>
                  </div>
                  <div className="product-info-list variant-item">
                    <ul>
                      <li>
                        <span>production budget: </span>$ {detailMovie.budget.toLocaleString()}
                      </li>
                      <li>
                        <span>box office revenue: </span>$ {detailMovie.revenue.toLocaleString()}
                      </li>
                      <li>
                        <span>Release Day: </span> {detailMovie.release_date}
                      </li>
                      <li>
                        <span>Running Time: </span> {detailMovie.runtime} minute
                      </li>
                    </ul>
                  </div>
                  <div className="product-action-details variant-item whatch_wrap">
                    {detailVideo.results.length > 0 && (
                      <div className="modal_wrap">
                        <Button id="model-btn-open" onClick={() => setOpenModal(true)}>
                          <FontAwesomeIcon icon={faYoutube} className="icon-youtube" />
                          Watch Trailer
                        </Button>
                      </div>
                    )}
                    <div className="product-details-action">
                      <button className={`details-action-icon ${like ? 'active' : ''}`} onClick={likeSwitch}>
                        <FaRegThumbsUp className="save_icon" />
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col xl="12" lg="12" className="mb-50 mt-50 detail-info-bottom">
                <Tabs defaultActiveKey="REVIEWS" id="uncontrolled-tab-example" className="mb-3 detail-info-SelectBtt">
                  <Tab eventKey="REVIEWS" title={`REVIEWS (${detailReviews.results.length})`}>
                    <Reviews detailReviews={detailReviews} />
                  </Tab>
                  <Tab eventKey="RELATEDMOVIES" title={`RELATED MOVIES (${detailRelated.results.length})`}>
                    <RelatedMovies detailRelated={detailRelated} genreList={genreList} loading={loading} />
                  </Tab>
                </Tabs>
              </Col>
            </Row>
          </Container>
          {openModal && (
            <ModalPortal>
              <VideoModal onClose={() => setOpenModal(false)}>
                <YouTube videoId={!loading && detailVideo.results[0].key} opts={opts} />
              </VideoModal>
            </ModalPortal>
          )}
        </section>
      ) : (
        <ErrorInfo />
      )}
    </>
  );
};

export default MovieDetail;
