import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { Badge } from 'react-bootstrap';
import ClipLoader from "react-spinners/ClipLoader";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImdb } from "@fortawesome/free-brands-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

const RelatedMovies = ({ detailRelated }) => {
  const [relatedData, setRelatedData] = useState([]);
  let [readyData, setReadyData] = useState(false);
  const { genereList, loading } = useSelector(state => state.movie);
  useEffect(() => {
    setRelatedData(detailRelated.results);
    setReadyData(true);
  }, [])
  // console.log(genereList);
  // console.log(relatedData);

  if (loading) {
    return <ClipLoader color="#ffffff" loading={loading} size={150} />;
  }

  return (
    <div className='related-movies'>
      {
        relatedData.map((item, idx) => {
          return (
            <div
              key={idx}
              className='related-card card'
              style={{
                backgroundImage: "url("
                  + `https://image.tmdb.org/t/p/w600_and_h900_bestv2${item.poster_path}` +
                  ")",
              }}
            >
              <div className='overlay related-overlay'>
                <div className="items"></div>
                <h2 className='related_title'>{item.title}</h2>
                <div className='related_danger'>
                  {
                    item.genre_ids.map((id, idx) =>
                      <Badge key={idx} bg="danger">
                        {
                          readyData ? genereList.find(item => item.id === id).name : ""
                        }
                      </Badge>
                    )
                  }
                </div>
                <div  className='related_info'>
                  <span><FontAwesomeIcon icon={faImdb} className="icon-imdb" />{item.vote_average}</span>
                  <span><FontAwesomeIcon icon={faYoutube} className="icon-youtube" />{item.popularity}</span>
                  <span className="eightteen">{item.adult ? "R-rated" : "Under 18"}</span> 
                </div>
              </div>
            </div>
          )
        })
      }
    </div>
  )
}

export default RelatedMovies