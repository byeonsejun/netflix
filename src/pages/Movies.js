import React, { useEffect, useState } from 'react';
import { movieAction } from './../redux/actions/MovieAction';
import { Col, Container, Row, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import PuffLoader from "react-spinners/PuffLoader";
import FilterCard from '../component/FilterCard';
import SortSlector from '../component/SortSlector';
import FilterSlector from '../component/FilterSlector';

import { useSearchParams } from "react-router-dom";

const Movies = () => {
  const dispatch = useDispatch();
  const { nowContent , loading, genreList } = useSelector( (state) => state.movie );
  
  let [query, setQuery] = useSearchParams();

  const [readyData, setReadyData] = useState(false);

  const [nowPage, setNowPage] = useState(1);

  const clickPageNation = (event) => {
    const tabIdxNum = event.target.getAttribute('tabIndex');

    if(tabIdxNum != null) {
      if(query.get("t") != null) { 
        setNowPage(Number(tabIdxNum));
        setQuery({t:query.get("t"), p:Number(tabIdxNum)});
      } else if(query.get("s") != null) {
        setNowPage(Number(tabIdxNum));
        setQuery({s:query.get("s"), p:Number(tabIdxNum)});
      } 
      else if(query.get("gT") != null) {
        setNowPage(Number(tabIdxNum));
        setQuery({gT:query.get("gT"), p:Number(tabIdxNum), gN:query.get("gN")});
      }
      else {
        setNowPage(Number(tabIdxNum));
        setQuery({s:"", p:Number(tabIdxNum)});
      }
    }

  }

  useEffect(()=>{
    dispatch(movieAction.getHomeMovies());

    if (query.get("s") != null) {
      dispatch(movieAction.getSearchMovie(query.get("s"), query.get("p")));
      if(query.get("f") === "1") setNowPage(1);
      if (query.get("s") === "null" || query.get("s") === "") dispatch(movieAction.getFilterMovies("popular",nowPage)); //string 타입의 null 일시
    } 

    if (query.get("s") === null) {
      if(query.get("t") === null) {
        if( query.get("gT") != null ) {
          if(query.get("gF") === "1") {
            setNowPage(1);
          }
          dispatch(movieAction.getGenresFilter(query.get("gT"),query.get("p"),query.get("gN"))); // 쿼리값 페이지값 장르넘버 차례로 보내줌
        } else {
          dispatch(movieAction.getFilterMovies("popular",nowPage)); 
        }
      } else {
        dispatch(movieAction.getSelectType(query.get("t"),nowPage));
      }
  }

    setReadyData(true);
    return () => {
    }

  },[dispatch, query, nowPage]);


  if(loading || readyData === false) {
    return <PuffLoader color="#dc143c" loading={loading} size={150} cssOverride={{ position: "fixed", left: "50%", top: "50%", transform:"translate(-50%, -50%)" }} />
  }

  return (
    <div className='movie_filter_container_wrap'>
      <Container className='movie_filter_container' >
        <Row className='movie_filter_inner' >
          <Col xl="4" lg="4" sm="12">
            <div className='movie_slector'>
              <SortSlector dispatch={dispatch} nowPage={nowPage} setNowPage={setNowPage} setQuery={setQuery}/>
              <FilterSlector />
            </div>
          </Col>
          <Col xl="8" lg="8" sm="12" className='filter_card_wrap'>
            { nowContent.results && nowContent.results.length === 0 &&
                <h1>검색한 결과가 없습니다.</h1>
            }
            { nowContent.results && nowContent.results.length > 0 &&  
                nowContent.results.map((item,idx) => {
                  return <FilterCard key={idx} item={item} genreList={genreList} />
                })
            }
          </Col>
        </Row>
      </Container>

      <Pagination 
        onClick={clickPageNation}
        bsPrefix="pagination movies_pagenation"
      >
        { nowPage > 2 ? <Pagination.First tabIndex={1}/> : null }
        { nowPage > 1 ? <Pagination.Prev tabIndex={nowPage-1}/> : null }
        
        { nowPage > 2 ? <Pagination.Item tabIndex="1">1</Pagination.Item> : null }
        { nowPage > 3 ? <Pagination.Ellipsis disabled/> : null }
        { nowPage > 1 ? <Pagination.Item tabIndex={nowPage-1} >{ nowPage - 1 }</Pagination.Item> : null }
        
        <Pagination.Item active>{nowPage}</Pagination.Item>
        { nowPage > 499 || nowPage > nowContent.total_pages - 1 ? null : <Pagination.Item tabIndex={nowPage+1}>{nowPage + 1}</Pagination.Item> }
        { nowPage > 497 || nowPage > nowContent.total_pages - 3 ? null : <Pagination.Ellipsis disabled/> }
        { nowPage > 498 || nowPage > nowContent.total_pages - 2 ? null : <Pagination.Item tabIndex={nowContent.total_pages > 499 ? 500 : nowContent.total_pages}>{ nowContent.total_pages > 499 ? 500 : nowContent.total_pages }</Pagination.Item> }
        
        { nowPage > 499 || nowPage === nowContent.total_pages ? null : <Pagination.Next tabIndex={nowPage+1}/> }
        { nowPage > 498 || nowPage > nowContent.total_pages - 2 ? null : <Pagination.Last tabIndex={nowContent.total_pages > 499 ? 500 : nowContent.total_pages}/> }
      </Pagination>
    </div>
  )
}

export default Movies