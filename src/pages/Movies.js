import React, { useEffect, useState } from 'react';
import { movieAction } from './../redux/actions/MovieAction';
import { Col, Container, Row } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import ClipLoader from "react-spinners/ClipLoader";
import FilterCard from '../component/FilterCard';



const Movies = () => {
  const dispatch = useDispatch();
  const { filterPopular, loading} = useSelector( (state) => state.movie );

  // const [nowShowPage, setNowShowPage] = useState(null);
  const [nowGood, setNowGood] = useState(false);



  useEffect(()=>{
    dispatch(movieAction.getFilterMovies(5)); //수동으로 5 넣어줬음
    setNowGood(true);
  },[]);


  if(loading) {
    return <ClipLoader color="#ffffff" loading={loading} size={150} />
  }
  return (
    <div>
      <Container className='movie_filter_container' >
        <Row className='movie_filter_inner' >
          <Col xl="4" lg="4" sm="12">
            검색창
          </Col>
          <Col xl="8" lg="8" sm="12">
            {
              nowGood
              ? 
              filterPopular.results.map((item,idx)=>{
                <FilterCard key={idx} item={item} />
              })
              :
              <span>안뜨네..</span>
            }
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Movies