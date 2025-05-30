import { useState, useEffect } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { navLinks } from '../data/index';
import { NavLink } from 'react-router-dom';

const NavbarComponent = () => {
  const [changeColor, setChangeColor] = useState(false);

  const changeBackgroundColor = () => {
    if (window.scrollY > 10) {
      setChangeColor(true);
    } else {
      setChangeColor(false);
    }
  };

  useEffect(() => {
    changeBackgroundColor();
    window.addEventListener('scroll', changeBackgroundColor);

    return () => window.removeEventListener('scroll', changeBackgroundColor);
  }, []);

  return (
    <Navbar expand="lg" className={`navbar ${changeColor ? "color-active" : ""}`}>
      <Container>
        <Navbar.Brand href="#home">
          <img 
            src="/images/logo-sila.png" 
            width="120"
            className='d-inline-block align-top'
            alt="SiLa Logo" 
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto text-center">
            {navLinks.map((link) => {
              return (
                <div className='nav-link' key={link.id}>
                  <NavLink to={link.path} className={({ isActive, isPending }) => (isPending ? "pending" : isActive ? "active": "")} end>
                    {link.text}
                  </NavLink>
                </div>
              );
            })}
          </Nav>

          {/* <div className='text-center'>
            <button className='btn btn-outline-primary rounded-5'>Get Started</button>
          </div> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent