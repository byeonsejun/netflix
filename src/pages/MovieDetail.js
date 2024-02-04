import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { movieAction } from './../redux/actions/MovieAction';
import PuffLoader from 'react-spinners/PuffLoader';
import { Container, Row, Col, Badge, Tab, Tabs, Button, Modal } from 'react-bootstrap';

import '@fortawesome/fontawesome-svg-core/styles.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImdb } from '@fortawesome/free-brands-svg-icons';
import { faYoutube } from '@fortawesome/free-brands-svg-icons';

import YouTube from 'react-youtube';

import { useState } from 'react';
import Reviews from '../component/Reviews';
import RelatedMovies from '../component/RelatedMovies';
import ErrorInfo from '../component/ErrorInfo';
import { addLocalStorage, initLocalStorage, readLocalStorage } from '../util/storage';

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detailMovie, detailReviews, detailRelated, detailVideo, genreList, loading } = useSelector(
    (state) => state.movie
  );

  const [show, setShow] = useState(false);
  const [like, setLike] = useState(false);

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

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
                  <img src={`https://image.tmdb.org/t/p/original///${detailMovie.poster_path}`} alt="mainImg" />
                </div>
              </Col>
              <Col xl="6" lg="8">
                <div className="detail_danger">
                  {!loading
                    ? detailMovie.genres.map((item, idx) => {
                        return (
                          <Badge key={idx} bg="danger">
                            {item.name}
                          </Badge>
                        );
                      })
                    : null}
                </div>
                <h2 className="detail_title">{detailMovie.original_title}</h2>
                <h3>{detailMovie.tagline}</h3>
                <div className="movie_social_details">
                  <ul className="overlay_info">
                    <li>
                      <FontAwesomeIcon icon={faImdb} className="icon-imdb" />
                      <span className="imb-score">{detailMovie.vote_average}</span>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faYoutube} className="icon-youtube" />
                      <span className="imb-score">{detailMovie.popularity}</span>
                    </li>
                    <li>
                      {detailMovie.adult ? (
                        <span className="eightteen">R-rated</span>
                      ) : (
                        <span className="eightteen">Under 18</span>
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
                        <Badge bg="danger">Budget</Badge>${detailMovie.budget.toLocaleString()}
                      </li>
                      <li>
                        <Badge bg="danger">Revenue</Badge>${detailMovie.revenue.toLocaleString()}
                      </li>
                      <li>
                        <Badge bg="danger">Release Day</Badge>
                        {detailMovie.release_date}
                      </li>
                      <li>
                        <Badge bg="danger">Time</Badge>
                        {detailMovie.runtime} minute
                      </li>
                    </ul>
                  </div>
                  <div className="product-action-details variant-item">
                    {!loading ? (
                      detailVideo.results.length === 0 ? null : (
                        <div className="modal_wrap">
                          <Button id="model-btn-open" onClick={() => setShow(true)}>
                            <FontAwesomeIcon icon={faYoutube} className="icon-youtube" />
                            Watch Trailer
                          </Button>
                          <Modal
                            show={show}
                            onHide={() => setShow(false)}
                            aria-labelledby="contained-modal-title-vcenter"
                            centered
                          >
                            <Modal.Header closeButton></Modal.Header>
                            <Modal.Body>
                              <YouTube videoId={!loading ? detailVideo.results[0].key : null} opts={opts} />
                            </Modal.Body>
                          </Modal>
                        </div>
                      )
                    ) : null}
                    <div className="product-details-action">
                      <button className={`details-action-icon ${like ? 'active' : ''}`} onClick={likeSwitch}>
                        {' '}
                        ♥{' '}
                      </button>
                    </div>
                  </div>
                </div>
              </Col>
            </Row>

            <Row>
              <Col xl="12" lg="12" className="mb-50 mt-50 detail-info-bottom">
                <Tabs defaultActiveKey="REVIEWS" id="uncontrolled-tab-example" className="mb-3 detail-info-SelectBtt">
                  <Tab eventKey="REVIEWS" title={!loading ? `REVIEWS (${detailReviews.results.length})` : ''}>
                    <Reviews detailReviews={detailReviews} />
                  </Tab>
                  <Tab
                    eventKey="RELATEDMOVIES"
                    title={!loading ? `RELATED MOVIES (${detailRelated.results.length})` : ''}
                  >
                    {!loading ? (
                      <RelatedMovies detailRelated={detailRelated} genreList={genreList} loading={loading} />
                    ) : (
                      ''
                    )}
                  </Tab>
                </Tabs>
              </Col>
            </Row>
          </Container>
        </section>
      ) : (
        <ErrorInfo />
      )}
    </>
  );
};

export default MovieDetail;
