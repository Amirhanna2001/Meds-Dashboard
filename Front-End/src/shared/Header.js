import React from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import "../css/Header.css";
import { removeAuthUser } from '../helper/Storage';
import { getAuthUser } from '../helper/Storage';

const Header = () => {
  const navigate = useNavigate();
  const user = getAuthUser();

    const Logout = () => {
      removeAuthUser()
      navigate("/")
    };
    return (
      <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>
        <Link className='nav-link' to={'/'}>Home</Link>

        </Navbar.Brand>
        <Nav>
        <Link className='nav-link' to={'/manage-categories-meds/UserCats'}>Categories</Link>

        </Nav>
        <Nav className="me-auto">
          {user && user.role === 1 &&(
            <>
              <Link className='nav-link' to={'/manage-meds'}>Medicines</Link>
              <Link className='nav-link' to={'/manage-categories-meds'}>ManageCategories</Link>
              <Link className='nav-link' to={'/managePatients'}>Patients</Link>
              
              
            </>
          )}
          {user &&(
            <>
              <Link className='nav-link' to={'/request'}>Request</Link>
              <Link className='nav-link' to={'/history'}>History</Link>
              {/* <Link className='nav-link' to={'/manage-categories-meds/UserCats'}>Categories</Link> */}


            </>
          )}
          
        </Nav>

        {!user && (
        <>
          <Nav className="ms-auto">
          <Link className='nav-link' to={'/login'}>Login</Link>
          <Link className='nav-link' to={'/register'}>Register</Link>


        </Nav>
        </>)}
        {user &&(
          <Nav className='ms-auto'>
           <Nav.Link onClick={Logout}>Logout</Nav.Link>
            
          </Nav>
        )}
        
      </Container>
    </Navbar>
    );
};

export default Header;