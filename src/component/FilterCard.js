import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImdb , faYoutube } from "@fortawesome/free-brands-svg-icons";
import { Badge } from 'react-bootstrap';
const FilterCard = ({ item, genreList }) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={()=> navigate(`/movies/${item.id}`) }
            className='filter_card'
            id='bright'
        >
            <div className="info_section">
                <div className="movie_header">
                    <img className="locandina" src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={`posterImg`} />
                    <h1>{item.title}</h1>
                    <h4>
                        {
                            item.release_date ?
                                item.release_date.substring(0, 4)
                            :   null
                        }
                    </h4>
                    <div className='overlay_badge'>
                        {item.genre_ids.map((id,idx)=>
                            <Badge key={idx} bg="danger">
                                { 
                                    genreList.length > 0 ?
                                        genreList.find(item => item.id === id ).name 
                                    : ""
                                }
                            </Badge>
                        )}
                    </div>
                </div>
                <div className="movie_desc">
                    <p className="text">
                        {
                            item.overview ?
                                item.overview.substring(0, 200)
                            : null
                        }...
                    </p>
                </div>
                <div className="movie_social">
                    <ul>
                        <li>
                            <span className="imb-score">
                                <FontAwesomeIcon icon={faImdb} className="icon-imdb" />
                                {
                                    item.vote_average ?
                                        item.vote_average
                                    :   null
                                }
                            </span>
                        </li>
                        <li>
                            <span className="imb-score">
                                <FontAwesomeIcon icon={faYoutube} className="icon-youtube" />
                                {
                                    item.popularity ?
                                        item.popularity.toFixed(1)
                                    :   null
                                }
                            </span>
                        </li>
                        <li>
                            <span className="eightteen">{item.adult ? "R-rated" : "Under 18"}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div 
                className="blur_back bright_back" 
                style={{
                    backgroundImage: "url("
                        + `https://image.tmdb.org/t/p/original/${item.backdrop_path}` +
                        ")",
                }}
            >
            </div>
        </div>
    )
}

export default FilterCard