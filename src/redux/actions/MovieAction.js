import api from '../api';
import { movieActions } from '../reducers/movieReducer';

const API_KEY = process.env.REACT_APP_API_KEY;
function getHomeMovies() {
  return async (dispatch) => {
    try {
      dispatch(movieActions.loadingTrue());

      const popularMovieApi = api.get(`/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
      const topRatedApi = api.get(`/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
      const upComingApi = api.get(`/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`);
      const genreApi = api.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`);

      let [popularMovies, topRatedMovies, upComingMovies, genreList] = await Promise.all([
        popularMovieApi,
        topRatedApi,
        upComingApi,
        genreApi,
      ]);

      dispatch(
        movieActions.getHomePageAllMovies({
          popularMovies: popularMovies.data,
          topRatedMovies: topRatedMovies.data,
          upComingMovies: upComingMovies.data,
          genreList: genreList.data.genres,
        })
      );
    } catch (err) {
      dispatch(movieActions.loadingFalse());
    }
  };
}

function getMovieDetails(id) {
  return async (dispatch) => {
    try {
      dispatch(movieActions.loadingTrue());

      const detailMovieApi = api.get(`/movie/${id}?api_key=${API_KEY}&language=en-US`);
      const detailReviewsApi = api.get(`/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`);
      const detailRelatedApi = api.get(`/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`);
      const detailVideoApi = api.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);
      const genreApi = api.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`);

      let [detailMovie, detailReviews, detailRelated, detailVideo, genreList] = await Promise.all([
        detailMovieApi,
        detailReviewsApi,
        detailRelatedApi,
        detailVideoApi,
        genreApi,
      ]);

      dispatch(
        movieActions.getDetailMovie({
          detailMovie: detailMovie.data,
          detailReviews: detailReviews.data,
          detailRelated: detailRelated.data,
          detailVideo: detailVideo.data,
          genreList: genreList.data.genres,
        })
      );
    } catch (err) {
      dispatch(movieActions.loadingFalse());
    }
  };
}

function getFilterMovies(movieType, nowPage) {
  return async (dispatch) => {
    try {
      dispatch(movieActions.loadingTrue());
      const filterMovieApi = api.get(`/movie/${movieType}?api_key=${API_KEY}&language=en-US&page=${nowPage}`);

      let nowPageNum = nowPage;
      let [filterMovie] = await Promise.all([filterMovieApi]);

      dispatch(
        movieActions.getFilterSuccess({
          filterMovie: filterMovie.data,
        })
      );

      dispatch(
        movieActions.pageNumChange({
          nowPageNum: nowPageNum.data,
        })
      );
    } catch (err) {
      dispatch(movieActions.loadingFalse());
    }
  };
}

function getSearchMovie(search, pageNum) {
  return async (dispatch) => {
    try {
      dispatch(movieActions.loadingTrue());

      const searchMovieApi = api.get(
        `/search/movie?api_key=${API_KEY}&language=en-US&page=${pageNum}&include_adult=false&query=${search}`
      );

      let [searchMovie] = await Promise.all([searchMovieApi]);

      dispatch(
        movieActions.getSearchSuccess({
          searchMovie: searchMovie.data,
        })
      );
    } catch (err) {
      dispatch(movieActions.loadingFalse());
    }
  };
}

function getSelectType(type, pageNum) {
  return async (dispatch) => {
    try {
      dispatch(movieActions.loadingTrue());

      const selectTypeApi = api.get(
        `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${type}&include_adult=false&include_video=false&page=${pageNum}&with_watch_monetization_types=free`
      );

      let [slectType] = await Promise.all([selectTypeApi]);

      dispatch(
        movieActions.getSelectSuccess({
          slectType: slectType.data,
        })
      );
    } catch (err) {
      dispatch(movieActions.loadingFalse());
    }
  };
}

function ChangeResults(newNowContent) {
  return async (dispatch) => {
    try {
      dispatch(movieActions.loadingTrue());

      dispatch(
        movieActions.getNewResult({
          newResult: newNowContent,
        })
      );
    } catch (err) {
      dispatch(movieActions.loadingFalse());
    }
  };
}

function getGenresFilter(gT, p, gN) {
  return async (dispatch) => {
    try {
      dispatch(movieActions.loadingTrue());

      const genresFilterApi = api.get(
        `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${gT}&include_adult=false&include_video=false&page=${p}&with_genres=${gN}&with_watch_monetization_types=free`
      );
      let [genresFilter] = await Promise.all([genresFilterApi]);

      dispatch(
        movieActions.getGenresFilter({
          genresFilter: genresFilter.data,
        })
      );
    } catch (err) {
      dispatch(movieActions.loadingFalse());
    }
  };
}

export const movieAction = {
  getHomeMovies,
  getMovieDetails,
  getFilterMovies,
  getSearchMovie,
  getSelectType,
  ChangeResults,
  getGenresFilter,
};
