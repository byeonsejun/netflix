import api from '../api';
import { movieActions } from '../reducers/movieReducer';

const API_KEY = process.env.REACT_APP_API_KEY;
function getHomeMovies() {
  return async (dispatch) => {
    try {
      dispatch(movieActions.loadingTrue());

      const popularMovieApi = api.get(`/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
      const upComingApi = api.get(`/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`);
      const genreApi = api.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`);

      const animationApi = api.get(
        `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=16&with_watch_monetization_types=free`
      );

      const actionApi = api.get(
        `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_genres=28&with_watch_monetization_types=free`
      );

      let [popularMovies, upComingMovies, genreList, animationList, actionList] = await Promise.all([
        popularMovieApi,
        upComingApi,
        genreApi,
        animationApi,
        actionApi,
      ]);

      dispatch(
        movieActions.getHomePageAllMovies({
          popularMovies: popularMovies.data,
          animationList: animationList.data,
          actionList: actionList.data,
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
      const filterMovieApi = await api.get(`/movie/${movieType}?api_key=${API_KEY}&language=en-US&page=${nowPage}`);

      dispatch(
        movieActions.getFilterSuccess({
          filterMovie: filterMovieApi.data,
        })
      );
      dispatch(
        movieActions.pageNumChange({
          nowPageNum: nowPage,
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

      const searchMovieApi = await api.get(
        `/search/movie?api_key=${API_KEY}&language=en-US&page=${pageNum}&include_adult=false&query=${search}`
      );

      dispatch(
        movieActions.getSearchSuccess({
          searchMovie: searchMovieApi.data,
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

      const selectTypeApi = await api.get(
        `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${type}&include_adult=false&include_video=false&page=${pageNum}&with_watch_monetization_types=free`
      );

      dispatch(
        movieActions.getSelectSuccess({
          slectType: selectTypeApi.data,
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

      const genresFilterApi = await api.get(
        `/discover/movie?api_key=${API_KEY}&language=en-US&sort_by=${gT}&include_adult=false&include_video=false&page=${p}&with_genres=${gN}&with_watch_monetization_types=free`
      );

      dispatch(
        movieActions.getGenresFilter({
          genresFilter: genresFilterApi.data,
        })
      );
    } catch (err) {
      dispatch(movieActions.loadingFalse());
    }
  };
}

function getGenres() {
  return async (dispatch) => {
    try {
      dispatch(movieActions.loadingTrue());
      const genreApi = await api.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`);
      dispatch(
        movieActions.getGenres({
          genreList: genreApi.data.genres,
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
  getGenres,
};
