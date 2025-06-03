import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Tabs, Tab, Card } from 'react-bootstrap';
import HeroImage from '../assets/images/sila-hero.png';
import { premiumFeatures, dataSwiper } from '../data/index';
import { FaHandPaper, FaVideo, FaStar } from 'react-icons/fa';
import GestureTutorial from '../components/GestureTutorial';
import VideoTutorial from '../components/VideoTutorial';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { submitFeedback } from '../api/feedbackApi';

const HomePage = () => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const feedback = e.target.feedback.value;

    try {
      await submitFeedback({ name, feedback, rating });
      alert('Thank you for your feedback!');
      e.target.reset();
      setRating(0);
    } catch (err) {
      console.error('Error:', err);
      alert('Failed to submit feedback.');
    }

    fetch('https://api.sheetbest.com/sheets/b7dbf6d5-3a56-4566-98e3-ec3210f0f13b', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        feedback: feedback,
        rating: rating,
        timestamp: new Date().toISOString()
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log('Success:', data);
        e.target.reset();
        setRating(0);
      })
      .catch(err => {
        console.error('Error:', err);
        alert('Failed to submit feedback.');
      });
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
                  <Card.Img variant="top" src={feature.image} alt="svgrepo.com" />
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
            <Tabs defaultActiveKey="gesture-translation" id="justify-tab-example" className="mb-3" justify>
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

      <div className="testimonial py-5">
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
              {dataSwiper.map((data) => (
                <SwiperSlide key={data.id} className='shadow-sm'>
                  <p className='desc'>{data.desc}</p>
                  <div className='people'>
                    <img src={data.image} alt="User Profile Testimonial" />
                    <div>
                      <h5 className='mb-1'>{data.name}</h5>
                      <i className={data.star1}></i>
                      <i className={data.star2}></i>
                      <i className={data.star3}></i>
                      <i className={data.star4}></i>
                      <i className={data.star5}></i>
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
                  <label htmlFor="name" className="form-label">Your Name</label>
                  <input type="text" className="form-control" id="name" name="name" placeholder="Enter your name" required />
                </div>
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
          

        </Container>
      </div>
    </div>
  );
};

export default HomePage;
