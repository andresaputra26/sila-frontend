import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import { alphabetSIBI } from '../data';

function AlphabetPage() {
    return (
        <div className="alphabet-page">
            <div className='alphabet min-vh-100'>
                <Container>
                    <Row>
                        <Col>
                            <h1 className='fw-bold text-center'>SIBI Alphabet</h1>
                            <p className='text-center'>Learn how to sign each letter of the alphabet in Indonesian Sign Language (SIBI)</p>
                        </Col>
                    </Row>
                    <Row>
                        {alphabetSIBI.map((alphabet) => {
                            return (
                                <Col key={alphabet.id} className='shadow rounded'>
                                    <img src={alphabet.image} alt="pkplk.kemendikdasmen.go.id/sibi/kosakata" className='w-100 mb-5 rounded-top' />
                                    <h5 className='mb-5 px-3'>{alphabet.title}</h5>
                                </Col>
                            )
                        })}
                    </Row>
                </Container>
            </div>
        </div>
    )
}

export default AlphabetPage