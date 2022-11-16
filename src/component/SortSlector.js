import React from 'react';
import { useState } from 'react';
import { Dropdown,DropdownButton } from 'react-bootstrap';

const SortSlector = ({setNowPage, setQuery}) => {
  
  const SlectSortType = (event) => {
    if (event.target.className === "dropdown-item") {
      setNowPage(1)
      setQuery({t:event.target.getAttribute('tabIndex'), p:1});
    }
  }

  const [arrow1 ,setArrow1] = useState(false);
  const arrowTop = () => {
    setArrow1(!arrow1);
  }

  const [sortType] = useState([
    "popularity.asc", 
    "popularity.desc",
    "release_date.asc",
    "release_date.desc",
    "revenue.asc",
    "revenue.desc",
    "vote_count.asc",
    "vote_count.desc",
  ]);

  return (
    <div className='slector_box'>
      <div className='arrow_info'>
        <h3>Sort</h3>
        {
          arrow1 ? <span className='arrowTop' onClick={arrowTop}> ↓ </span>
          : <span className='arrowTop' onClick={arrowTop}> → </span>
        }
      </div>
      {
        arrow1 ?
        <div className='showAndHide'>
          <h4>Sort Results By</h4>
          <DropdownButton
            onClick={SlectSortType}
            align={{ lg: 'start' }}
            title="Sort By"
            id="dropdown-menu-align-responsive-1"
            variant="none"
          >
            {
              sortType.map((item,idx) => {
                let itemType = item.split('.');
                return (
                  <Dropdown.Item key={item} tabIndex={item} eventKey={idx}>{itemType[0]}(<span>{itemType[1]}</span>)</Dropdown.Item>
                )
              })
            }
          </DropdownButton>
          </div>
        :
          null
      }
    </div>
  )
}

export default SortSlector