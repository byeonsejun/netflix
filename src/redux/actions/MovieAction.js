import api from '../api';


const API_KEY = process.env.REACT_APP_API_KEY;
function getMovies(){
    return async (dispatch)=>{
        try {
            dispatch({type: "GET_MOVIES_REQUEST"});
            
            const popularMovieApi = api.get(`/movie/popular?api_key=${API_KEY}&language=en-US&page=1`);
            const topRatedApi = api.get(`/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`);
            const upComingApi = api.get(`/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`);
            const genereApi = api.get(`/genre/movie/list?api_key=${API_KEY}&language=en-US`);
            
            let [popularMovies,topRatedMovies,upComingMovies,genereList] = await Promise.all([
                    popularMovieApi,
                    topRatedApi,
                    upComingApi,
                    genereApi,
            ]);
            
            dispatch({  
                type: "GET_MOVIES_SUCCESS",
                payload: {
                    popularMovies:popularMovies.data,
                    topRatedMovies:topRatedMovies.data,
                    upComingMovies:upComingMovies.data,
                    genereList:genereList.data.genres,
                },
            });
        } catch(err){
            dispatch({type:"GET_MOVIES_FAILURE"})
        }
        
    }
};

function getDetailMovie(id) {
    return async (dispatch) => { 
        try {
            dispatch({type: "GET_MOVIES_REQUEST"})

            const detailMovieApi = api.get(`/movie/${id}?api_key=${API_KEY}&language=en-US`);
            const detailReviewsApi = api.get(`/movie/${id}/reviews?api_key=${API_KEY}&language=en-US&page=1`);
            const detailRelatedApi = api.get(`/movie/${id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`);
            const detailVideoApi = api.get(`/movie/${id}/videos?api_key=${API_KEY}&language=en-US`);

            let [ detailMovie, detailReviews, detailRelated, detailVideo ] = await Promise.all([
                detailMovieApi,
                detailReviewsApi,
                detailRelatedApi,
                detailVideoApi,
            ]);

            dispatch({
                type: "GET_DETAIL_SUCCESS",
                payload: {
                    detailMovie: detailMovie.data,
                },
            });

        } catch(err) {
            dispatch({type:"GET_MOVIES_FAILURE"})
        }
    }
}


function getFilterMovies(page) {
    return async (dispatch) => { 
        try {
            dispatch({type: "GET_MOVIES_REQUEST"})

            const filterPopularApi = api.get(`/movie/popular?api_key=${API_KEY}&language=en-US&page=${page}`);
            
            let [filterPopular] = await Promise.all([
                    filterPopularApi,
            ]);
            
            dispatch({  
                type: "GET_FILTER_SUCCESS",
                payload: {
                    filterPopular:filterPopular.data,
                },
            });

        } catch(err) {
            dispatch({type:"GET_MOVIES_FAILURE"})
        }
    }
}


export const movieAction = {
    getMovies,
    getDetailMovie,
    getFilterMovies,
}