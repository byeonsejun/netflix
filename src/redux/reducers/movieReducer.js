let initialState = {
    popularMovies:{},
    topRatedMovies:{},
    upComingMovies:{},
    loading:true,
    genereList:[],
    detailMovie:{},
    detailReviews:{},
    detailRelated:{},
    detailVideo:{},
    filterPopular:{},
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
                genereList: payload.genereList,
                loading: false,
            };

        case "GET_DETAIL_SUCCESS":
            return {
                ...state,
                detailMovie: payload.detailMovie,
                detailReviews: payload.detailReviews,
                detailRelated: payload.detailRelated,
                detailVideo: payload.detailVideo,
                loading: false,
            };

        case "GET_FILTER_SUCCESS":
            return {
                ...state, 
                filterPopular: payload.filterPopular,
                loading: false,
            };

        default:
            return {...state};
    }
}

export default movieReducer;