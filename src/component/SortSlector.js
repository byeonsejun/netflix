import React from 'react';
import { useState } from 'react';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const sortType = [
  'popularity.asc',
  'popularity.desc',
  'release_date.asc',
  'release_date.desc',
  'revenue.asc',
  'revenue.desc',
  'vote_count.asc',
  'vote_count.desc',
];

const SortSlector = ({ getQuery, setNowPage, setQuery }) => {
  const SlectSortType = (event) => {
    getQuery('gT') !== null
      ? setQuery({ gT: event.target.getAttribute('tabIndex'), p: 1, gN: getQuery('gN'), gF: getQuery('gF') })
      : setQuery({ t: event.target.getAttribute('tabIndex'), p: 1 });
    setNowPage(1);
  };

  const [arrow1, setArrow1] = useState(false);
  const arrowTop = () => setArrow1(!arrow1);

  return (
    <div className="slector_box">
      <div className="arrow_info">
        <h3>Sort</h3>
        {arrow1 ? (
          <span className="arrowTop" onClick={arrowTop}>
            {' '}
            ↓{' '}
          </span>
        ) : (
          <span className="arrowTop" onClick={arrowTop}>
            {' '}
            →{' '}
          </span>
        )}
      </div>
      {arrow1 && (
        <div className="showAndHide">
          <h4>Sort Results By</h4>
          <DropdownButton align={{ lg: 'start' }} title="Sort By" id="dropdown-menu-align-responsive-1" variant="none">
            {sortType.map((item, idx) => {
              let itemType = item.split('.');
              return (
                <Dropdown.Item key={item} tabIndex={item} eventKey={idx} onClick={SlectSortType}>
                  {itemType[0]}(<span className="click_none">{itemType[1]}</span>)
                </Dropdown.Item>
              );
            })}
          </DropdownButton>
        </div>
      )}
    </div>
  );
};

export default SortSlector;
