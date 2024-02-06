import React from 'react';
import { useSelector } from 'react-redux';
import MovieCard from './MovieCard';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation } from 'swiper';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const MovieSlide = ({ movies, page }) => {
  const { genreList } = useSelector((state) => state.movie);
  return (
    <div>
      <Swiper
        modules={[Pagination, Navigation]}
        pagination={{ clickable: true }}
        navigation={true}
        className="mySwiper"
        spaceBetween={10}
        slidesPerView={1}
        slidesPerGroup={1}
        speed={1000}
        breakpoints={{
          320: { slidesPerView: 1, centeredSlides: true, slidesPerGroup: 1 },
          420: { slidesPerView: 1.25, centeredSlides: false, slidesPerGroup: 1 },
          480: { slidesPerView: 1.4, slidesPerGroup: 1 },
          520: { slidesPerView: 1.55, slidesPerGroup: 1 },
          580: { slidesPerView: 1.7, slidesPerGroup: 1 },
          620: { slidesPerView: 1.85, slidesPerGroup: 1 },
          680: { slidesPerView: 2, slidesPerGroup: 2 },
          820: { slidesPerView: 2.45, slidesPerGroup: 2 },
          960: { slidesPerView: 2.85, slidesPerGroup: 2 },
          1024: { slidesPerView: 3, slidesPerGroup: 3 },
          1280: { slidesPerView: 3.8, slidesPerGroup: 3 },
          1360: { slidesPerView: 4, slidesPerGroup: 4 },
          1620: { slidesPerView: 4.8, slidesPerGroup: 4 },
          1680: { slidesPerView: 5, slidesPerGroup: 5 },
          2000: { slidesPerView: 6, slidesPerGroup: 6 },
          2340: { slidesPerView: 7, slidesPerGroup: 7 },
        }}
      >
        {movies.results.map((item, idx) => {
          return (
            <SwiperSlide key={idx}>
              <MovieCard item={item} genreList={genreList} page={page && page} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
};

export default MovieSlide;
