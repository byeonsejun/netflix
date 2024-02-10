import React, { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import mianLogo from './../images/logo.png';

import { FaBell, FaUserAlt } from 'react-icons/fa';
import { movieAction } from '../redux/actions/MovieAction';

const navLink = [
  { text: 'Home', class: 'nav-item', to: '/' },
  { text: 'Movies', class: 'nav-item', to: '/movies' },
];

const headerUi = [
  { text: 'Bell', icon: <FaBell />, point: true, id: 'bell_ui' },
  // { text: 'User', icon: <FaUserAlt />, active: false, id: 'user_ui' },
];

const Navigation = () => {
  const dispatch = useDispatch();

  const { upComingMovies, loading } = useSelector((state) => state.movie);
  const navigate = useNavigate();
  const location = useLocation();
  const searchText = useRef();
  const [nav, setNav] = useState('Home');

  const goToSearch = (event) => {
    event.preventDefault();
    let inputValue = searchText.current.value;
    if (inputValue.trim() === '') {
      alert('검색어를 입력해주세요.');
      return;
    }
    navigate(`/movies?s=${inputValue}&p=1&f=1`);
    searchText.current.value = '';
  };

  const getUpComingMovies = () => dispatch(movieAction.getUpComingMovies());

  useEffect(() => {
    if (!loading && Object.keys(upComingMovies).length === 0) {
      getUpComingMovies();
    }
  }, [upComingMovies, loading]);

  useEffect(() => {
    location.pathname === '/' ? setNav('Home') : setNav('Movies');
  }, [location]);

  return (
    <header id="header">
      <Navbar variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="" className="mainLogo">
            <img onClick={() => navigate('/')} width={100} src={mianLogo} alt="logoimg" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll" className="nav_wrap">
            <Nav className="my-2 my-lg-0 nav" style={{ maxHeight: '100px' }} navbarScroll>
              {navLink.map((item) => (
                <Link
                  id={`${item.text === nav ? 'link_target' : ''}`}
                  className={`${item.class}`}
                  to={item.to}
                  key={item.text}
                >
                  {item.text}
                </Link>
              ))}
            </Nav>
            <Form className="d-flex search_form" onSubmit={(e) => e.preventDefault()}>
              <Form.Control
                name="search Movie"
                type="search"
                placeholder="Search"
                className="me-2 search_input"
                aria-label="Search"
                ref={searchText}
              />
              <button className="search_btt" onClick={goToSearch}>
                Search
              </button>
            </Form>
            <div className="header_ui">
              <ul>
                {headerUi.map((ui) => (
                  <li key={ui.text} id={ui.id} className={`${ui.point ? 'point' : ''}`}>
                    {ui.icon}
                  </li>
                ))}
                <div id="bell_modal">
                  <h3>What's New</h3>
                  <div className="bell_popup_wrap">
                    <p className="popup_info">New Content </p>
                    <div className="same_content_box">
                      {!loading &&
                        Object.keys(upComingMovies).length !== 0 &&
                        upComingMovies.results.map((item, idx) => (
                          <div className="bell_content" key={idx}>
                            <div className="bell_content_img_wrap">
                              <img
                                src={`
                                https://image.tmdb.org/t/p/original/${item.poster_path}
                                `}
                                alt="new img"
                                className="bell_content_img"
                              />
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              </ul>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Navigation;
