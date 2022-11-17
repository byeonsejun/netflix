import React, { useEffect } from 'react';
import { movieAction } from './../redux/actions/MovieAction';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../component/Banner';
import MovieSlide from '../component/MovieSlide';
import PuffLoader from "react-spinners/PuffLoader";

const Home = () => {
    const dispatch = useDispatch();
    const { popularMovies, topRatedMovies, upComingMovies, loading } = useSelector( (state) => state.movie );

    useEffect(()=>{
        dispatch(movieAction.getHomeMovies());
    },[dispatch]);
    
  if(loading) {
    return <PuffLoader color="#dc143c" loading={loading} size={150} cssOverride={{ position: "fixed", left: "50%", top: "50%", transform:"translate(-50%, -50%)" }} />
  }

  return (
    <div id='home'>
      {
        popularMovies.results !== undefined ?
          <>
            <Banner movie={popularMovies.results[0]} />
            <section className='main_slider'>
              <h1>Popular Movie</h1>
              <MovieSlide movies={popularMovies} />
              <h1>Top rated Movie</h1>
              <MovieSlide movies={topRatedMovies} />
              <h1>Upcoming Movie</h1>
              <MovieSlide movies={upComingMovies} />
            </section>
          </>
        : null
      }
      
    </div>
  )
}

export default Home