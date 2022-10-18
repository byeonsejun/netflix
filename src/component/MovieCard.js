import React from 'react';
import { Badge } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImdb } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

const MovieCard = ({item}) => {
    // console.log(item)
    const {genereList} = useSelector(state=>state.movie);
    const navigate = useNavigate();
    const goToDetailMovie = () => {
        navigate(`/movies/${item.id}`);
        // console.log("카드클릭 했고 id값 = ",item.id )
    }
  return (
    <div 
        onClick={goToDetailMovie}
        className='card'
        style={{backgroundImage: "url("
            +`https://www.themoviedb.org/t/p/w710_and_h400_multi_faces${item.poster_path}`+
            ")",
        }}
    >
        <div className='overlay'>
            <h2>{item.title}</h2>
            <div className='overlay_badge'>
                {item.genre_ids.map((id,idx)=>
                    <Badge key={idx} bg="danger">
                        { genereList.find(item => item.id === id ).name }
                    </Badge>
                )}
            </div>
            <div className='overlay_info'>
                <span className=''>
                    <FontAwesomeIcon icon={faImdb} className="icon-imdb" />
                    {item.vote_average}
                </span>
                <span>
                    <FontAwesomeIcon icon={faYoutube} className="icon-youtube" />
                    {item.popularity}
                </span>
                <span className="eightteen">{item.adult?"R-rated":"Under 18"}</span>
            </div>
        </div>
    </div>
  )
}

export default MovieCard