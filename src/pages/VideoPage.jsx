import React, { useState } from 'react';
import { FaTrashAlt, FaRegCopy } from 'react-icons/fa';
import '../assets/css/main.css';
import VideoComponent from '../components/VideoComponent';

function VideoPage() {
  const [currentResult, setCurrentResult] = useState('');
  const [translation, setTranslation] = useState('');

  const handleClearAll = () => {
    setCurrentResult('');
    setTranslation('');
  };

  const handleCopy = () => {
    if (translation) {
      navigator.clipboard.writeText(translation);
      alert('Copied to clipboard!');
    }
  };

  const handleNowResult = (res) => {
    setCurrentResult(res);
  };

  const handleOutputResult = (label) => {
    const outputChar = label === 'space' ? ' ' : label;
    setTranslation((prev) => prev + outputChar);
  };

  return (
    <div className="video-page min-vh-100">
      <div className="left-panel">
        <div className="main-content">
          <VideoComponent
            onNowResult={handleNowResult}
            onOutputResult={handleOutputResult}
          />
        </div>
      </div>

      <div className="translation-panel">
        <div className="translation-header">
          <h2 className="title">Translation Result</h2>
          <div className="translation-actions">
            <button onClick={handleClearAll} title="Clear All">
              <FaTrashAlt />
            </button>
            <button onClick={handleCopy} title="Copy Output">
              <FaRegCopy />
            </button>
          </div>
        </div>

        <div
          className="translation-box"
          style={{
            padding: '1rem',
            minHeight: '120px',
            overflowY: 'auto',
            whiteSpace: 'pre-wrap',
            fontSize: '1.1rem',
          }}
        >
          <p><strong>Now:</strong> {currentResult || 'No hand'}</p>
          <p><strong>Output:</strong> {translation || 'No output yet'}</p>
        </div>
      </div>
    </div>
  );
}

export default VideoPage;
