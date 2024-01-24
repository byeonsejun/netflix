import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';

const Navigation = () => {
  const navigate = useNavigate();

  const getSearchName = (event) => {
    event.preventDefault();
    navigate(`/movies?s=${event.target[0].value}&p=1&f=1`);
    event.target[0].value = '';
  };
  const goToSearch = () => {
    let searchInput = document.querySelector('.me-2.form-control').value;
    navigate(`/movies/?s=${searchInput}&p=1&f=1`);
    document.querySelector('.me-2.form-control').value = '';
  };

  return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="" className="mainLogo">
            <img
              onClick={() => {
                navigate('/');
              }}
              width={100}
              src="https://sejun-netflix.netlify.app/logo.png"
              alt="logoimg"
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0" style={{ maxHeight: '100px' }} navbarScroll>
              <Link className="nav-item" to="/">
                Home
              </Link>
              <Link className="nav-item" to="/movies">
                Movies
              </Link>
            </Nav>
            <Form className="d-flex" onSubmit={(event) => getSearchName(event)}>
              <Form.Control
                name="search Movie"
                type="search"
                placeholder="Search"
                className="me-2 search_input"
                aria-label="Search"
              />
              <Button variant="outline-danger" className="search_btt" onClick={goToSearch}>
                Search
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Navigation;
