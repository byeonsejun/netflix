import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { movieAction } from "./../redux/actions/MovieAction";
import ClipLoader from "react-spinners/ClipLoader";
import { Container, Row, Col, Badge, Tab, Tabs, Button, Modal } from "react-bootstrap";

import '@fortawesome/fontawesome-svg-core/styles.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImdb } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

import YouTube from 'react-youtube';

import { useState } from 'react';
import Reviews from "../component/Reviews";
import RelatedMovies from "../component/RelatedMovies";

const MovieDetail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detailMovie, detailReviews, detailRelated, detailVideo, loading } = useSelector(state => state.movie);
  
  // console.log("detailVideo", detailVideo)

  let [readyData, setReadyData] = useState(false);
  const [show, setShow] = useState(false);
  // const [videoKey, setVideoKey] = useState(false);

  const opts = {
    height: '100%',
    width: '100%',
    playerVars: {
      autoplay: 1,
    },
  };

  const _onReady = (event) => {
    // access to player in all event handlers via event.target
    // event.target.pauseVideo();
  }

  useEffect(() => {
    dispatch(movieAction.getDetailMovie(id));
    setReadyData(true);
  }, []);

  if (loading) {
    return <ClipLoader color="#ffffff" loading={loading} size={150} />;
  }


  return (
    <section className="detail-box">
      <Container className="detail-wrap">
        <Row>
          <Col xl="6" lg="4" className="detail-img">
            <div className="detail-img-wrap">
              <img
                src={`https://image.tmdb.org/t/p/original///${detailMovie.poster_path}`}
                alt="mainImg"
              />
            </div>
          </Col>
          <Col xl="6" lg="8">
            <div className="detail_danger">
              {
                readyData ?
                  detailMovie.genres.map((item, idx) => {
                    return <Badge key={idx} bg="danger">{item.name}</Badge>
                  })
                  : null
              }
            </div>
            <h2 className="detail_title">{detailMovie.original_title}</h2>
            <h3>{detailMovie.tagline}</h3>
            <div className="movie_social_details">
              <ul className='overlay_info'>
                <li>
                  <FontAwesomeIcon icon={faImdb} className="icon-imdb" />
                  <span className="imb-score">{detailMovie.vote_average}</span>
                </li>
                <li>
                  <FontAwesomeIcon icon={faYoutube} className="icon-youtube" />
                  <span className="imb-score">{detailMovie.popularity}</span>
                </li>
                <li>
                  {
                    detailMovie.adult ? (
                      <span className="eightteen">R-rated</span>
                    ) : (
                      <span className="eightteen">Under 18</span>
                    )
                  }
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
                    <Badge bg="danger">Budget</Badge>${detailMovie.budget}
                  </li>
                  <li>
                    <Badge bg="danger">Revenue</Badge>${detailMovie.revenue}
                  </li>
                  <li>
                    <Badge bg="danger">Release Day</Badge>
                    {detailMovie.release_date}
                  </li>
                  <li>
                    <Badge bg="danger">Time</Badge>
                    {detailMovie.runtime}
                  </li>
                </ul>
              </div>
              <div className="product-action-details variant-item">
                <div className="modal_wrap">
                  <Button id="model-btn-open" onClick={() => setShow(true)}>
                    <FontAwesomeIcon icon={faYoutube} className="icon-youtube" />
                    Watch Trailer
                  </Button>
                  <Modal
                    show={show}
                    onHide={() => setShow(false)}
                    // dialogClassName="modal-90w"
                    // aria-labelledby="example-custom-modal-styling-title"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                  >
                    <Modal.Header closeButton >
                    </Modal.Header>
                    <Modal.Body>
                      <YouTube 
                        videoId={
                          readyData ? detailVideo.results[0].key : null
                        }
                        opts={opts} 
                        onReady={_onReady} 
                      />;
                    </Modal.Body>
                  </Modal>
                </div>
                <div className="product-details-action">
                  <button className="details-action-icon"> ♥ </button>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row>
          <Col xl="12" lg="12" className="mb-50 mt-50 detail-info-bottom">
            <Tabs
              defaultActiveKey="REVIEWS"
              id="uncontrolled-tab-example"
              className="mb-3 detail-info-SelectBtt"
            >
              <Tab eventKey="REVIEWS"
                title={
                  readyData ? `REVIEWS (${detailReviews.results.length})` : ""
                }
              >
                <Reviews detailReviews={detailReviews} />
              </Tab>
              <Tab eventKey="RELATEDMOVIES"
                title={
                  readyData ? `RELATED MOVIES (${detailRelated.results.length})` : ""
                }
              >
                <RelatedMovies detailRelated={detailRelated} />
              </Tab>
            </Tabs>
          </Col>
        </Row>

      </Container>
    </section>
  );
};

export default MovieDetail;
