let initialState = {
    popularMovies:{},
    topRatedMovies:{},
    upComingMovies:{},
    loading:true,
    genreList:[],
    detailMovie:{},
    detailReviews:{},
    detailRelated:{},
    detailVideo:{},
    filterMovie:{},
    searchMovie:{},
    nowContent:{},
    nowPageNum: 1,
    slectType:{},
    filterFlag:true,
    originalContent:{},
}

function movieReducer(state=initialState,action){
    let {type,payload} = action;
    switch(type) {

        case "GET_MOVIES_FAILURE":
            return { ...state, loading:false};
        case "GET_MOVIES_REQUEST":
            return { ...state, loading:true};

        case "GET_MOVIES_SUCCESS":
            return {
                ...state, 
                popularMovies: payload.popularMovies,
                topRatedMovies: payload.topRatedMovies,
                upComingMovies: payload.upComingMovies,
                genreList: payload.genreList,
                loading: false,
            };

        case "GET_DETAIL_SUCCESS":
            return {
                ...state,
                detailMovie: payload.detailMovie,
                detailReviews: payload.detailReviews,
                detailRelated: payload.detailRelated,
                detailVideo: payload.detailVideo,
                genreList: payload.genreList,
                loading: false,
            };

        case "GET_FILTER_SUCCESS":
            return {
                ...state, 
                filterMovie: payload.filterMovie,
                nowContent: payload.filterMovie,
                originalContent: payload.filterMovie,
                loading: false,
            };

        case "GET_SEARCH_SUCCESS":
            return {
                ...state, 
                searchMovie: payload.searchMovie,
                nowContent: payload.searchMovie,
                originalContent: payload.searchMovie,
                loading: false,
            };
        case "PAGE_NUM_CHANGE":
            return {
                ...state,
                nowPageNum: payload.nowPageNum,
                loading: false,
            };

        case "GET_SELECT_SUCCESS":
            return {
                ...state,
                slectType: payload.slectType,
                nowContent: payload.slectType,
                originalContent: payload.slectType,
                loading: false,
            };

        case "GET_NEW_RESULT":
            return {
                ...state,
                nowContent: payload.newResult,
                loading: false,
            };
            
        case "GET_GENRES_FILTER":
            return {
                ...state,
                nowContent: payload.genresFilter,
                originalContent: payload.genresFilter,
                loading: false,
            }
            

        default:
            return {...state};
    }
}

export default movieReducer;