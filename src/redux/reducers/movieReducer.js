import { createSlice } from '@reduxjs/toolkit';

let initialState = {
  popularMovies: {},
  animationList: {},
  actionList: {},
  upComingMovies: {},
  loading: true,
  genreList: [],
  detailMovie: {},
  detailReviews: {},
  detailRelated: {},
  detailVideo: {},
  filterMovie: {},
  searchMovie: {},
  nowContent: {},
  nowPageNum: 1,
  slectType: {},
  filterFlag: true,
  originalContent: {},
};

const movieSlice = createSlice({
  name: 'movie',
  initialState: initialState,
  reducers: {
    loadingFalse(state) {
      // GET_MOVIES_FAILURE
      state.loading = false;
    },
    loadingTrue(state) {
      // GET_MOVIES_REQUEST
      state.loading = true;
    },
    getHomePageAllMovies(state, action) {
      // GET_MOVIES_SUCCESS
      state.popularMovies = action.payload.popularMovies;
      state.animationList = action.payload.animationList;
      state.actionList = action.payload.actionList;
      state.upComingMovies = action.payload.upComingMovies;
      state.genreList = action.payload.genreList;
      state.loading = false;
    },
    getDetailMovie(state, action) {
      // GET_DETAIL_SUCCESS
      state.detailMovie = action.payload.detailMovie;
      state.detailReviews = action.payload.detailReviews;
      state.detailRelated = action.payload.detailRelated;
      state.detailVideo = action.payload.detailVideo;
      state.genreList = action.payload.genreList;
      state.loading = false;
    },
    getFilterSuccess(state, action) {
      // GET_FILTER_SUCCESS
      state.filterMovie = action.payload.filterMovie;
      state.nowContent = action.payload.filterMovie;
      state.originalContent = action.payload.filterMovie;
      state.loading = false;
    },
    getSearchSuccess(state, action) {
      // GET_SEARCH_SUCCESS
      state.searchMovie = action.payload.searchMovie;
      state.nowContent = action.payload.searchMovie;
      state.originalContent = action.payload.searchMovie;
      state.loading = false;
    },
    pageNumChange(state, action) {
      // PAGE_NUM_CHANGE
      state.nowPageNum = action.payload.nowPageNum;
      state.loading = false;
    },
    getSelectSuccess(state, action) {
      // GET_SELECT_SUCCESS
      state.slectType = action.payload.slectType;
      state.nowContent = action.payload.slectType;
      state.originalContent = action.payload.slectType;
      state.loading = false;
    },
    getNewResult(state, action) {
      // GET_NEW_RESULT
      state.nowContent = action.payload.newResult;
      state.loading = false;
    },
    getGenresFilter(state, action) {
      // GET_GENRES_FILTER
      state.nowContent = action.payload.genresFilter;
      state.originalContent = action.payload.genresFilter;
      state.loading = false;
    },
  },
});

const movieActions = movieSlice.actions;
const movieReducer = movieSlice.reducer;
export { movieReducer, movieActions };
