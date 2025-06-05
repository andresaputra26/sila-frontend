import React, { useState } from 'react';
import { FaCamera, FaStopCircle, FaTrashAlt, FaRegCopy } from 'react-icons/fa';
import '../assets/css/main.css';
import GestureComponent from '../components/GestureComponent';

function GesturePage() {
  const [isRecording, setIsRecording] = useState(false);
  const [currentResult, setCurrentResult] = useState('');
  const [translation, setTranslation] = useState('');

  const handleClearAll = () => {
    setTranslation('');
    setCurrentResult('');
  };

  const handleCopy = () => {
    if (translation) {
      navigator.clipboard.writeText(translation);
      alert('Copied to clipboard!');
    }
  };

  const handleNowResult = (result) => {
    setCurrentResult(result);
  };

  const handleOutputResult = (label) => {
    const outputChar = label === 'space' ? ' ' : label;
    setTranslation((prev) => prev + outputChar);
  };

  return (
    <div className="gesture-page min-vh-100">
      <div className="left-panel">
        <div className="main-content">
          <div
            className="camera-panel"
            style={{
              position: 'relative',
              width: 640,
              height: 480,
              borderRadius: '12px',
              overflow: 'hidden',
              backgroundColor: '#000',
            }}
          >
            {!isRecording && (
              <div
                style={{
                  position: 'absolute',
                  width: '100%',
                  height: '100%',
                  zIndex: 3,
                  backgroundColor: '#000',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: '#fff',
                  fontSize: '1.2rem',
                  borderRadius: '12px',
                }}
              >
                <FaCamera className="camera-icon" size={48} />
                <span className="translating-label">Camera is off</span>
              </div>
            )}

            {isRecording && (
              <GestureComponent
                isActive={isRecording}
                onNowResult={handleNowResult}
                onOutputResult={handleOutputResult}
              />
            )}
          </div>

          <div className="record-button" style={{ marginTop: '1rem' }}>
            <button
              onClick={() => {
                setIsRecording(!isRecording);
                setCurrentResult('');
                setTranslation('');
              }}
              className={isRecording ? 'stop' : 'start'}
            >
              {isRecording ? <FaStopCircle /> : <FaCamera />}
              {isRecording ? ' Stop Recording' : ' Start Recording'}
            </button>
          </div>
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
          {isRecording ? (
            <>
              <p><strong>Now:</strong> {currentResult || 'No hand'}</p>
              <p><strong>Output:</strong> {translation || 'No output yet'}</p>
            </>
          ) : (
            <p>Start recording to see translation results</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default GesturePage;
