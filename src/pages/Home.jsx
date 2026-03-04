import React, { useEffect } from 'react';
import { movieAction } from './../redux/actions/MovieAction';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../component/Banner';
import MovieSlide from '../component/MovieSlide';
import LazySection from '../component/LazySection';

const BannerSkeleton = () => (
  <div className="banner">
    <div className="banner-picture" style={{ background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 50%, #0f3460 100%)' }} />
    <div className="banner-info">
      <div style={{ width: '60%', height: '2rem', background: 'rgba(255,255,255,0.08)', borderRadius: 4, marginBottom: 12 }} />
      <div style={{ width: '90%', height: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: 4, marginBottom: 8 }} />
      <div style={{ width: '75%', height: '1rem', background: 'rgba(255,255,255,0.05)', borderRadius: 4 }} />
    </div>
  </div>
);

const Home = () => {
  const dispatch = useDispatch();
  const { popularMovies, animationList, actionList, upComingMovies, loading } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(movieAction.getHomeMovies());
  }, [dispatch]);

  const hasData = !loading && Object.keys(popularMovies).length > 0;

  return (
    <div id="home">
      {hasData ? (
        <Banner movie={popularMovies.results[0]} />
      ) : (
        <BannerSkeleton />
      )}
      {hasData && (
        <section className="main_slider">
          <h1>Popular on Netflix</h1>
          <MovieSlide movies={popularMovies} page={'main'} />
          <LazySection>
            <h1>Coming This Week</h1>
            <MovieSlide movies={upComingMovies} page={'main'} />
          </LazySection>
          <LazySection>
            <h1>Animation</h1>
            <MovieSlide movies={animationList} page={'main'} />
          </LazySection>
          <LazySection>
            <h1>Action</h1>
            <MovieSlide movies={actionList} page={'main'} />
          </LazySection>
        </section>
      )}
    </div>
  );
};

export default Home;
