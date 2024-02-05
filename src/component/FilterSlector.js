import React from 'react';
import { movieAction } from './../redux/actions/MovieAction';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';

const FilterSlector = () => {
  const dispatch = useDispatch();
  let [query, setQuery] = useSearchParams();
  const [minNum, setMinNum] = useState(1874);
  const [maxNum, setMaxNum] = useState(2028);
  const { originalContent, genreList } = useSelector((state) => state.movie);
  const [arrow1, setArrow1] = useState(false);
  const arrowTop = () => setArrow1(!arrow1);

  const rangeMove = () => {
    const rangeInput = document.querySelectorAll('.range-input input');
    setMinNum(rangeInput[0].value);
    setMaxNum(rangeInput[1].value);

    const target = originalContent.results.filter(
      (item) =>
        Number(item.release_date.substring(0, 4)) >= rangeInput[0].value &&
        Number(item.release_date.substring(0, 4)) <= rangeInput[1].value
    );

    let ChangeNowContent = { ...originalContent, results: target };
    dispatch(movieAction.ChangeResults(ChangeNowContent));
  };

  const SelectGenreType = (event) => {
    let genreNum = event.target.getAttribute('tabIndex');
    let sortQuery = query.get('t');
    let genreQuery = query.get('gT');

    switch (true) {
      case !!sortQuery:
        genreQuery = sortQuery;
        break;
      case genreQuery === null:
        genreQuery = 'popularity.desc';
        break;

      default:
        break;
    }
    setQuery({ gT: genreQuery, p: 1, gN: genreNum, gF: 1 });
  };

  return (
    <>
      <div className="slector_box">
        <div className="arrow_info">
          <h3>Filter</h3>
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
            <h4>Genres Filter</h4>
            <div className="genre_select">
              <DropdownButton
                align={{ lg: 'start' }}
                title="Genre By"
                id="dropdown-menu-align-responsive-2"
                variant="none"
              >
                {genreList.map((item, idx) => (
                  <Dropdown.Item key={item.name} tabIndex={item.id} eventKey={idx} onClick={SelectGenreType}>
                    {item.name}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </div>
          </div>
        )}
      </div>
      <div className="allShow">
        <h4>Current Page Filter</h4>
        <div className="range_box">
          <div className="range_result">
            <h5>
              From: <span>{minNum}</span> - To: <span>{maxNum}</span>
            </h5>
          </div>
          <div className="range_slider">
            <div
              className="range_progress"
              style={{
                left: `${((minNum - 1874) / (2028 - 1874)) * 100}%`,
                right: `${100 - ((maxNum - 1874) / (2028 - 1874)) * 100}%`,
              }}
            ></div>
          </div>
          <div className="range-input">
            <input type="range" className="range-min" min="1874" max="2028" value={minNum} onChange={rangeMove} />
            <input type="range" className="range-max" min="1874" max="2028" value={maxNum} onChange={rangeMove} />
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSlector;
