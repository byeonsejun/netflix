import React from 'react';
import { useSelector } from 'react-redux';
import MovieCard from './MovieCard';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from "swiper";
import 'swiper/css';
import "swiper/css/pagination";
import "swiper/css/navigation";

const MovieSlide = ({ movies }) => {
  const { genreList } = useSelector(state=>state.movie);
  return (
    <div>
      <Swiper
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true, }}
        navigation={ true }
        className="mySwiper"
        spaceBetween={10}
        slidesPerView={1}
        slidesPerGroup={1}
        speed={1000}
        breakpoints={{
          320: { slidesPerView: 1, centeredSlides: true, slidesPerGroup: 1},
          520: { slidesPerView: 1.3, centeredSlides: false, slidesPerGroup: 1},
          580: { slidesPerView: 1.5, slidesPerGroup: 1}, 
          767: { slidesPerView: 2, spaceBetween: 15, slidesPerGroup: 2 },
          1024: { slidesPerView: 2.5, spaceBetween: 20 , slidesPerGroup: 2},
          1280: { slidesPerView: 3, slidesPerGroup: 3}, 
          1620: { slidesPerView: 4, spaceBetween: 25 , slidesPerGroup: 4}
        }}
      > 
          {
            movies.results.map((item, idx) =>
              <SwiperSlide key={idx} >
                <MovieCard item={item} genreList={genreList}/> 
              </SwiperSlide>
            )
          }
      </Swiper>
    </div>
  )
}

export default MovieSlide 