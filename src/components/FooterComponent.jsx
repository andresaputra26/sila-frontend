import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function FooterComponent() {
  return (
    <div className='footer'>
      <Container>
        <Row className='d-flex justify-content-between'>
          <Col className='col-lg-3'>
            <img src="/images/logo-sila.png" width="120" className='d-inline-block align-top' alt="SiLa Logo" />
            <p className='desc'>Bridging communication gaps with elegant sign language translation technology.</p>
          </Col>
          <Col className='d-flex flex-column col-lg-3'>
            <h5>Product</h5>
            <Link to="gesture">Gesture Translation</Link>
            <Link to="video">Video Translation</Link>
            <Link to="#">API Access</Link>
            <Link to="#">Pricing</Link>
          </Col>
          <Col className='d-flex flex-column col-lg-3'>
            <h5>Company</h5>
            <Link to="about">About Us</Link>
            <Link to="#">Careers</Link>
            <Link to="#">Blog</Link>
            <Link to="#">Contact</Link>
          </Col>
          <Col className='d-flex flex-column col-lg-3'>
            <h5>Legal</h5>
            <Link to="#">Terms of Service</Link>
            <Link to="#">Privacy Police</Link>
            <Link to="#">Cookie Police</Link>
          </Col>
        </Row>
        <Row>
          <Col>
          <p className='text-center px-md-0 px-3'>&copy; Copyright {new Date().getFullYear()} <span className='fw-bold'>SiLa</span>. All Right Reserved.</p>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default FooterComponent