import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Tabs, Tab, Card } from 'react-bootstrap';
import { FaHandPaper, FaVideo, FaStar } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';

import HeroImage from '../assets/images/sila-hero.png';
import GestureTutorial from '../components/GestureTutorial';
import VideoTutorial from '../components/VideoTutorial';
import { premiumFeatures, dataSwiper } from '../data/index';
import { submitFeedback } from '../api/feedbackApi';

const HomePage = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [testiSwiper, setTestiSwiper] = useState(() => {
    const stored = localStorage.getItem('testiSwiper');
    return stored ? JSON.parse(stored) : dataSwiper;
  })

  const handleSubmit = async (e) => {
    e.preventDefault();
    const feedback = e.target.feedback.value;

    try {
      await submitFeedback({ feedback, rating });
      
      const newFeedback = {
        id: Date.now(),
        desc: feedback,
        image: `https://ui-avatars.com/api/?name=User${Math.floor(Math.random() * 1000)}&background=random`,
        name: `User ${Math.floor(1000 + Math.random() * 9000)}`, // generate otomatis
        ...[1, 2, 3, 4, 5].reduce((acc, i) => ({
          ...acc,
          [`star${i}`]: i <= rating ? "fa-solid fa-star" : "fa-regular fa-star"
        }), {}),
      };

      setTestiSwiper(prev => {
        const updated = [newFeedback, ...prev];
        localStorage.setItem('testiSwiper', JSON.stringify(updated));
        return updated;
      });

      e.target.reset();
      setRating(0);
      setShowModal(true);
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to submit feedback.');
    }
  };

  return (
    <div className='homepage'>
      <header className='w-100 min-vh-100 d-flex align-items-center'>
        <Container>
          <Row className='header-box d-flex align-items-center'>
            <Col lg='6'>
              <h1 className='mb-4'>Welcome to SiLa</h1>
              <p className='mb-4'>Experience the elegance of sign language translation. SiLa bridges communication gaps with precision and style.</p>
              <button className='btn btn-outline-primary btn-lg rounded-5 me-2 mb-xs-0 mb-2' onClick={() => document.getElementById('guide')?.scrollIntoView({ behavior: 'smooth' })}>
                Guide
              </button>
              <Link to="/gesture" className="btn btn-primary btn-lg rounded-5 mb-xs-0 mb-2">
                Try Gesture Translation
              </Link>
            </Col>
            <Col lg='6' className='pt-lg-0 pt-5'>
              <img src={HeroImage} alt="SiLa Hero" />
            </Col>
          </Row>
        </Container>
      </header>

      <div className='features w-100 min-vh-100'>
        <Container>
          <Row>
            <Col>
              <h1 className='text-center fw-bold'>Premium Features</h1>
              <p className='text-center'>Discover what makes SiLa the most elegant sign language translation tool available</p>
            </Col>
          </Row>
          <Row>
            {premiumFeatures.map((feature) => (
              <Col key={feature.id} md={3} className='mb-4'>
                <Card className='card-custom'>
                  <Card.Img variant="top" src={feature.image} alt="feature" />
                  <Card.Body>
                    <Card.Title>{feature.title}</Card.Title>
                    <Card.Text>{feature.text}</Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </div>

      <div id='guide' className='guide w-100 min-vh-100'>
        <Container>
          <Row>
            <Col>
              <h1 className='text-center fw-bold'>Just 5 Simple Steps</h1>
              <p className='text-center'>Getting started is easy! Just follow these five steps to translate sign language using either your camera or uploaded videos.</p>
            </Col>
          </Row>
          <Row>
            <Tabs defaultActiveKey="gesture-translation" className="mb-3" justify>
              <Tab eventKey="gesture-translation" title={<span><FaHandPaper className='me-2' />Gesture Translation</span>}>
                <GestureTutorial />
              </Tab>
              <Tab eventKey="video-translation" title={<span><FaVideo className='me-2' />Video Translation</span>}>
                <VideoTutorial />
              </Tab>
            </Tabs>
          </Row>
        </Container>
      </div>

      <div className="testimonial w-100 min-vh-0 mb-5 p-5">
        <Container>
          <Row>
            <Col>
              <h1 className='text-center fw-bold my-5'>See Why People Love SiLa</h1>
            </Col>
          </Row>
          <Row>
            <Swiper
              slidesPerView={1}
              spaceBetween={10}
              pagination={{ clickable: true }}
              breakpoints={{
                640: { slidesPerView: 1, spaceBetween: 20 },
                768: { slidesPerView: 2, spaceBetween: 40 },
                992: { slidesPerView: 2, spaceBetween: 50 },
                1200: { slidesPerView: 3, spaceBetween: 50 },
              }}
              modules={[Pagination]}
              className="mySwiper"
            >
              {testiSwiper.map((data) => (
                <SwiperSlide key={data.id} className='shadow-sm'>
                  <p className='desc'>{data.desc}</p>
                  <div className='people'>
                    <img src={data.image} alt="User" />
                    <div>
                      <h5 className='mb-1'>{data.name}</h5>
                      {[1, 2, 3, 4, 5].map((i) => (
                        <i key={i} className={data[`star${i}`]}></i>
                      ))}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Row>

          <Row>
            <Col md={{ span: 8, offset: 2 }}>
              <h2 className="text-center fw-bold mb-4">Leave Your Feedback</h2>
              <form className="testimonial-form p-4 shadow-sm rounded" onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="feedback" className="form-label">Your Feedback</label>
                  <textarea className="form-control" id="feedback" name="feedback" rows="4" placeholder="Share your experience..." required></textarea>
                </div>
                <div className="mb-3">
                  <label className="form-label d-block">Your Rating</label>
                  {[...Array(5)].map((_, index) => {
                    const currentRating = index + 1;
                    return (
                      <label key={index}>
                        <input
                          type="radio"
                          name="rating"
                          value={currentRating}
                          onClick={() => setRating(currentRating)}
                          style={{ display: 'none' }}
                        />
                        <FaStar
                          size={30}
                          className="mx-1"
                          color={currentRating <= (hover || rating) ? "#ffc107" : "#e4e5e9"}
                          onMouseEnter={() => setHover(currentRating)}
                          onMouseLeave={() => setHover(0)}
                          style={{ cursor: 'pointer' }}
                        />
                      </label>
                    );
                  })}
                </div>
                <div className="text-center">
                  <button type="submit" className="btn btn-primary px-4">Submit</button>
                </div>
              </form>
            </Col>
          </Row>

          {showModal && (
            <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
              <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Feedback Received</h5>
                    <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                  </div>
                  <div className="modal-body">
                    <p>Thank you for your feedback!</p>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-primary" onClick={() => setShowModal(false)}>
                      OK
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </Container>
      </div>
    </div>
  );
};

export default HomePage;
