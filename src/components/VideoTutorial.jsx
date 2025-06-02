import React from 'react';
import { Card } from 'react-bootstrap';
import StepImg1 from '../assets/images/steps/number-1.svg';
import StepImg2 from '../assets/images/steps/number-2.svg';
import StepImg3 from '../assets/images/steps/number-3.svg';
import StepImg4 from '../assets/images/steps/number-4.svg';

const videoSteps = [
    {
        title: "Open Video Translator",
        desc: 'Navigate to the "Video Translator" section from the main menu.',
    },
    {
        title: "Upload a Video",
        desc: "Click 'Select Video' or drag and drop a video file into the upload area.",
    },
    {
        title: "Wait for Processing",
        desc: 'SiLa will process the video and analyze the sign language content.',
    },
    {
        title: "View Translation",
        desc: "Once processing is complete, the translation will appear in the result panel.",
    },
];

const stepIcons = [StepImg1, StepImg2, StepImg3, StepImg4];

const VideoStepsSection = () => {
  return (
    <div className="steps-wrapper fade-up">
      <div className="d-flex flex-wrap justify-content-between gap-4">
        {videoSteps.map((step, idx) => (
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

export default VideoStepsSection;