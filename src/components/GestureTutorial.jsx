import React from 'react';
import { Card } from 'react-bootstrap';
import StepImg1 from '../assets/images/steps/number-1.svg';
import StepImg2 from '../assets/images/steps/number-2.svg';
import StepImg3 from '../assets/images/steps/number-3.svg';
import StepImg4 from '../assets/images/steps/number-4.svg';
import StepImg5 from '../assets/images/steps/number-5.svg';

const gestureSteps = [
    {
        title: "Open Gesture Translator",
        desc: 'Navigate to the "Gesture Translator" section from the main menu.',
    },
    {
        title: "Allow Camera Access",
        desc: "When prompted, allow SiLa to access your camera for real-time translation.",
    },
    {
        title: "Start Recording",
        desc: 'Click the "Start Recording" button to begin capturing your gestures.',
    },
    {
        title: "Perform Sign Language",
        desc: "Make sure your hands are clearly visible in the frame as you sign.",
    },
    {
        title: "View Translation",
        desc: "The translation will appear in the result panel on the right.",
    },
];

const stepIcons = [StepImg1, StepImg2, StepImg3, StepImg4, StepImg5];

const GestureStepsSection = () => {
  return (
    <div className="steps-wrapper fade-up">
      <div className="d-flex flex-wrap justify-content-between gap-4">
        {gestureSteps.map((step, idx) => (
            <Card key={idx} className="step-card flex-grow-1">
                <Card.Body>
                    <img className='step-icon mb-3' src={stepIcons[idx]} alt="www.svgrepo.com" />
                    <Card.Title className='step-title'>{step.title}</Card.Title>
                    <Card.Text className='step-desc'>{step.desc}</Card.Text>
                </Card.Body>
            </Card>
        ))}
      </div>
    </div>
  );
};

export default GestureStepsSection;