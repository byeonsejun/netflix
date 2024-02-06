import React, { useEffect } from 'react';
import { movieAction } from './../redux/actions/MovieAction';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../component/Banner';
import MovieSlide from '../component/MovieSlide';
import PuffLoader from 'react-spinners/PuffLoader';

const Home = () => {
  const dispatch = useDispatch();
  const { popularMovies, animationList, actionList, upComingMovies, loading } = useSelector((state) => state.movie);

  useEffect(() => {
    dispatch(movieAction.getHomeMovies());
  }, [dispatch]);

  if (loading || Object.keys(popularMovies).length === 0) {
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
    <div id="home">
      <>
        <Banner movie={popularMovies.results[0]} />
        <section className="main_slider">
          <h1>Popular on Netflix</h1>
          <MovieSlide movies={popularMovies} page={'main'} />
          <h1>Coming This Week</h1>
          <MovieSlide movies={upComingMovies} page={'main'} />
          <h1>Animation</h1>
          <MovieSlide movies={animationList} page={'main'} />
          <h1>Action</h1>
          <MovieSlide movies={actionList} page={'main'} />
        </section>
      </>
    </div>
  );
};

export default Home;
