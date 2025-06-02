import React from 'react';
import { Container, Card, Row, Col, Tabs, Tab } from 'react-bootstrap';
import { teamMembers } from '../data/index';
import { FaInfoCircle, FaUsers, FaCog } from 'react-icons/fa';


const AboutPage = () => {
  return (
    <div className='aboutpage min-vh-100'>
      <Container>
        <Tabs defaultActiveKey="getting-started" id="justify-tab-example" className="mb-3" justify>
                <Tab eventKey="getting-started" 
                    title={
                    <span>
                        <FaInfoCircle className='me-2' />
                        Getting Started
                    </span>
                }>
                    <Card body className='fade-up'>
                        <h4>Getting Started with SiLa</h4>
                        <p>Learn the basics of using Sisa for sign language translation</p>

                        <h5>What is SiLa?</h5>
                        <p>SiLa is a powerful sign language translation tool that uses advanced AI to translate between sign language and text. It supports both real-time gesture translation and video translation.</p>

                        <h5>Key Features</h5>
                        <ul>
                            <li>Real-time gesture translation using your camera</li>
                            <li>Video translation for pre-recorded content</li>
                            <li>Support for multiple sign languages</li>
                            <li>Text-to-speech for translated content</li>
                            <li>History of your translations</li>
                        </ul>

                        <h5>System Requirements</h5>
                        <p>SiLa works best on modern browsers like Chrome, Firefox, Safari, and Edge. For gesture translation, you'll need a webcam or camera on your device.</p>
                    </Card>
                </Tab>

                <Tab eventKey="teams" title={
                    <span>
                        <FaUsers className='me-2' />
                        Teams
                    </span>
                }>
                    <Card body className='fade-up'>
                        <h4>Our Team</h4>
                        <p>Meet the talented individuals behind Sila who are passionate about making communication accessible for everyone.</p>

                        <Row className='g-3'>
                          {teamMembers.map((member, index) => (
                            <Col md={4} className="d-flex justify-content-center" key={index}>
                              <Card className="team-card text-center p-3 shadow-sm rounded-4" style={{ width: '100%', maxWidth: '300px' }}>
                                <Card.Img
                                  variant="top"
                                  src={member.image}
                                  alt={member.name}
                                  className="rounded-circle mx-auto"
                                  style={{ width: '100px', height: '100px', objectFit: 'cover', marginTop: '10px' }}
                                />
                                <Card.Body>
                                  <Card.Title className="fw-bold">{member.name}</Card.Title>
                                  <Card.Subtitle className="mb-2 text-primary">{member.role}</Card.Subtitle>
                                  <Card.Text className="text-muted" style={{ fontSize: '14px' }}>
                                    {member.description}
                                  </Card.Text>
                                </Card.Body>
                              </Card>
                            </Col>
                          ))}
                        </Row>
                    </Card>
                </Tab>

                <Tab eventKey="setting" title={
                    <span>
                        <FaCog className='me-2' />
                        Setting
                    </span>
                }>
                    <Card body className='fade-up'>
                        <h4>Setting Guide</h4>
                        <p>Learn how to customize SiLa to your preferences</p>

                        <h5>Language Settings</h5>
                        <p>You can customize which sign languages are supported in your translation:</p>
                        <ul>
                            <li>Sistem Isyarat Bahasa Indonesia (SIBI)</li>
                        </ul>
                    </Card>
                </Tab>
            </Tabs>
      </Container>
    </div>
  )
}

export default AboutPage