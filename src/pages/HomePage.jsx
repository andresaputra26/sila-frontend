import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Tabs, Tab, Card } from 'react-bootstrap';
import { FaHandPaper, FaVideo, FaStar } from 'react-icons/fa';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { premiumFeatures, dataSwiper } from '../data';
import HeroImage from '../assets/images/sila-hero.png';
import GestureTutorial from '../components/GestureTutorial';
import VideoTutorial from '../components/VideoTutorial';
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
      console.error(err);
      alert('Failed to submit feedback.');
    }
  };

  return (
    <div className='homepage'>
      {/* ... header and features section remains the same ... */}

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
                      {[...Array(5)].map((_, i) => (
                        <i key={i} className={data[`star${i + 1}`]} />
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
                  <label htmlFor="name" className="form-label">Your Name</label>
                  <input type="text" className="form-control" id="name" name="name" placeholder="Enter your name" required />
                </div>
                <div className="mb-3">
                  <label htmlFor="feedback" className="form-label">Your Feedback</label>
                  <textarea className="form-control" id="feedback" name="feedback" rows="4" placeholder="Share your experience..." required></textarea>
                </div>
                <div className="mb-3 text-center">
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
