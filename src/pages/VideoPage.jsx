import React, { useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import '../assets/css/main.css';
import VideoComponent from '../components/VideoComponent';

function VideoPage() {
  const [currentResult, setCurrentResult] = useState('');
  const [translation, setTranslation] = useState('');

  const handleClearAll = () => {
    setCurrentResult('');
    setTranslation('');
  };

  return (
    <div className="video-page min-vh-100">
      <div className="left-panel">
        <div className="main-content">

          {/* VideoComponent sudah termasuk tombol upload */}
          <VideoComponent
            onNowResult={(res) => setCurrentResult(res)}
            onOutputResult={(char) => setTranslation((prev) => prev + char)}
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