import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import MovieCard from './MovieCard';

const responsive = {
  bigDesktop: {
    breakpoint: { max: 5000, min: 3000 },
    items: 5,
    slidesToSlide: 5 // optional, default to 1.
  },
  desktop: {
    breakpoint: { max: 3000, min: 1600 },
    items: 4,
    slidesToSlide: 4 // optional, default to 1.
  },
  smallDesktop: {
    breakpoint: { max: 1600, min: 1240 },
    items: 3,
    slidesToSlide: 3 // optional, default to 1.
  },
  tablet: {
    breakpoint: { max: 1240, min: 776 },
    items: 2,
    slidesToSlide: 2 // optional, default to 1.
  },
  mobile: {
    breakpoint: { max: 776, min: 0 },
    items: 1,
    slidesToSlide: 1 // optional, default to 1.
  }
};


const MovieSlide = ({ movies }) => {
  // console.log(movies)
  return (
    <div>
      <Carousel responsive={responsive} className="movie_slide_inner">
        {
          movies.results.map((item, idx) =>
            <MovieCard key={idx} item={item} />
          )}
      </Carousel>
    </div>
  )
}

export default MovieSlide 