import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from 'react-router-dom';
import "../css/Header.css";

const Header = () => {
    const Logout = () => {};
    return <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand>
          <Link className='nav-link' to={'/'}>Meds</Link>
          </Navbar.Brand>
          <Nav className="me-auto">
            <Link className='nav-link' to={'/'}>List Meds</Link>
            <Link className='nav-link' to={'/login'}>Login</Link>
            <Link className='nav-link' to={'/register'}>Register</Link>
            <Link className='nav-link' to={'/manage-meds'}>Manage Meds</Link>
          </Nav>

          <Nav className="ms-auto">
            <Nav.Link onClick={Logout}>Logout</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
    </>;
};

export default Header;