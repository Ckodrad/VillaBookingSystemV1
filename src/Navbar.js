import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useState } from 'react';
import { UserContext } from './AuthProvider';



const NavBar = () => {
  const {Logout, user} = useContext(UserContext)
  const navigate = useNavigate()

  const userLogOut = () => {
    Logout()
    navigate("/Login")
  }

    return (
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" fixed='top' style={{paddingLeft: "35px", paddingRight:"35px",}}>
          <Navbar.Brand href="#home">Sahabat Resort & Retreat</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className='ms-auto'>
              {
                user 
                ?
                <>
                <Nav.Item eventKey={1}>    
                  <Nav.Link>Logged in as {user}</Nav.Link>
                </Nav.Item>
                <Nav.Item eventKey={2} type="submit" onClick={userLogOut}>    
                  <Nav.Link>Logout</Nav.Link>
                </Nav.Item>
                <Nav.Item eventKey={2} href="/Home">
                  <Nav.Link as={Link} to={"/Home"}>Home</Nav.Link>
                </Nav.Item>
                </>
                :
                <>
                <Nav.Item eventKey={1} href="/Login" >
                  <Nav.Link as={Link} to={"/Login"}>Log In</Nav.Link>
                </Nav.Item>
                <Nav.Item eventKey={2} href="/Home">
                  <Nav.Link as={Link} to={"/Home"}>Home</Nav.Link>
                </Nav.Item>
                <Nav.Item eventKey={3} href="/Register">
                  <Nav.Link as={Link} to={"/Register"}>Register</Nav.Link>
                </Nav.Item>
                </>
              }
                
            </Nav>
          </Navbar.Collapse>
        </Navbar>
    )
}

export default NavBar;