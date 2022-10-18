import React, { useEffect } from 'react';
import { movieAction } from './../redux/actions/MovieAction';
import { useDispatch, useSelector } from 'react-redux';
import Banner from '../component/Banner';
import MovieSlide from '../component/MovieSlide';
import ClipLoader from "react-spinners/ClipLoader";


const Home = () => {
    const dispatch = useDispatch();
    const { popularMovies, topRatedMovies, upComingMovies, loading} = 
      useSelector( (state) => state.movie );
    
    useEffect(()=>{
        dispatch(movieAction.getMovies());
    },[]);

    // console.log(loading);
    // console.log("시작이요")
    // console.log(popularMovies)
    
  if(loading) {
    return <ClipLoader color="#ffffff" loading={loading} size={150} />
  }
  return (
    <div>
      <Banner movie={popularMovies.results[0]} />
      <section className='main_slider'>
        <h1>Popular Movie</h1>
        <MovieSlide movies={popularMovies} />
        <h1>Top rated Movie</h1>
        <MovieSlide movies={topRatedMovies} />
        <h1>upcoming Movie</h1>
        <MovieSlide movies={upComingMovies} />
      </section>
    </div>
  )
}

export default Home