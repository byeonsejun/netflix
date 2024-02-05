import React, { useEffect, useState } from 'react';
import { movieAction } from './../redux/actions/MovieAction';
import { Col, Container, Row, Pagination } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import PuffLoader from 'react-spinners/PuffLoader';
import FilterCard from '../component/FilterCard';
import SortSlector from '../component/SortSlector';
import FilterSlector from '../component/FilterSlector';

import { useSearchParams } from 'react-router-dom';

const Movies = () => {
  const dispatch = useDispatch();
  const { nowContent, loading, genreList } = useSelector((state) => state.movie);
  let [query, setQuery] = useSearchParams();
  const [readyData, setReadyData] = useState(false);
  const [nowPage, setNowPage] = useState(1);
  const getQuery = (type) => query.get(type);

  const totalPage = nowContent.total_pages;

  const clickPageNation = (event) => {
    const tabIdxNum = event.target.getAttribute('tabIndex');
    if (tabIdxNum === null) return;

    const movePageNum = Number(tabIdxNum);

    switch (true) {
      case !!getQuery('t'):
        setQuery({ t: getQuery('t'), p: movePageNum });
        break;
      case !!getQuery('s'):
        setQuery({ s: getQuery('s'), p: movePageNum });
        break;
      case !!getQuery('gT'):
        setQuery({ gT: getQuery('gT'), p: movePageNum, gN: getQuery('gN') });
        break;
      default:
        setQuery({ p: movePageNum });
    }
    setNowPage(movePageNum);
  };

  useEffect(() => {
    dispatch(movieAction.getGenres());

    switch (true) {
      case query.size === 0:
        dispatch(movieAction.getFilterMovies('popular', 1));
        setNowPage(1);
        break;
      case !!(query.size === 1 && getQuery('p')):
        dispatch(movieAction.getFilterMovies('popular', nowPage));
        break;
      case !!getQuery('s'):
        dispatch(movieAction.getSearchMovie(getQuery('s'), getQuery('p')));
        getQuery('f') === '1' && setNowPage(1);
        break;
      case !!getQuery('t'):
        dispatch(movieAction.getSelectType(getQuery('t'), nowPage));
        break;
      case !!getQuery('gT'):
        getQuery('gF') === '1' && setNowPage(1);
        dispatch(movieAction.getGenresFilter(getQuery('gT'), getQuery('p'), getQuery('gN')));
        break;

      default:
        break;
    }
    setReadyData(true);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, query, nowPage]);

  if (loading || !readyData) {
    return (
      <PuffLoader
        color="#dc143c"
        loading={loading}
        size={150}
        cssOverride={{ position: 'fixed', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
      />
    );
  }

  return (
    <div className="movie_filter_container_wrap">
      <Container className="movie_filter_container">
        <Row className="movie_filter_inner">
          <Col xl="4" lg="4" sm="12">
            <div className="movie_slector">
              <SortSlector getQuery={getQuery} setNowPage={setNowPage} setQuery={setQuery} />
              <FilterSlector />
            </div>
          </Col>
          <Col xl="8" lg="8" sm="12" className="filter_card_wrap">
            {nowContent.results && nowContent.results.length === 0 && <h1>검색한 결과가 없습니다.</h1>}
            {nowContent.results &&
              nowContent.results.length > 0 &&
              nowContent.results.map((item, idx) => {
                return <FilterCard key={idx} item={item} genreList={genreList} />;
              })}
          </Col>
        </Row>
      </Container>

      <Pagination onClick={clickPageNation} bsPrefix="pagination movies_pagenation">
        {nowPage > 2 && <Pagination.First tabIndex={1} />}
        {nowPage > 1 && <Pagination.Prev tabIndex={nowPage - 1} />}

        {nowPage > 2 && <Pagination.Item tabIndex="1">1</Pagination.Item>}
        {nowPage > 3 && <Pagination.Ellipsis disabled />}
        {nowPage > 1 && <Pagination.Item tabIndex={nowPage - 1}>{nowPage - 1}</Pagination.Item>}

        <Pagination.Item active>{nowPage}</Pagination.Item>
        {nowPage > 499 || nowPage > totalPage - 1 ? null : (
          <Pagination.Item tabIndex={nowPage + 1}>{nowPage + 1}</Pagination.Item>
        )}
        {nowPage > 497 || nowPage > totalPage - 3 ? null : <Pagination.Ellipsis disabled />}
        {nowPage > 498 || nowPage > totalPage - 2 ? null : (
          <Pagination.Item tabIndex={totalPage > 499 ? 500 : totalPage}>
            {totalPage > 499 ? 500 : totalPage}
          </Pagination.Item>
        )}

        {nowPage > 499 || nowPage === totalPage ? null : <Pagination.Next tabIndex={nowPage + 1} />}
        {nowPage > 498 || nowPage > totalPage - 2 ? null : (
          <Pagination.Last tabIndex={totalPage > 499 ? 500 : totalPage} />
        )}
      </Pagination>
    </div>
  );
};

export default Movies;
