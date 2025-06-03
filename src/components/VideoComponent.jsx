import React, { useRef, useState, useEffect } from "react";
import { FaVideo } from 'react-icons/fa'
import { Hands } from "@mediapipe/hands";
import {
  drawConnectors,
  drawLandmarks,
  HAND_CONNECTIONS,
} from "@mediapipe/drawing_utils";

// ✅ Ganti URL ke domain hosting backend kamu
const API_URL = "https://sila-backend-production.up.railway.app/predict";

const VideoComponent = ({ onNowResult, onOutputResult }) => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const handsRef = useRef(null);
  const fileInputRef = useRef(null);

  const [videoFile, setVideoFile] = useState(null);

  const lastGestureRef = useRef("");
  const gestureStartTime = useRef(null);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      const videoURL = URL.createObjectURL(file);
      setVideoFile(videoURL);
      lastGestureRef.current = "";
      gestureStartTime.current = null;

      // Clear canvas & label
      const ctx = canvasRef.current?.getContext("2d");
      if (ctx) ctx.clearRect(0, 0, 640, 480);
      onNowResult("No hand");
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    const hands = new Hands({
      locateFile: (file) =>
        `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`,
    });

    hands.setOptions({
      maxNumHands: 1,
      modelComplexity: 0,
      minDetectionConfidence: 0.6,
      minTrackingConfidence: 0.5,
    });

    hands.onResults(async (results) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!ctx) return;

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (results.multiHandLandmarks?.length > 0) {
        const fullLandmarks = results.multiHandLandmarks[0];
        const flatLandmarks = fullLandmarks
          .flatMap((pt) => [pt.x, pt.y])
          .slice(0, 42); // hanya ambil x,y

        drawConnectors(ctx, fullLandmarks, HAND_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 2,
        });
        drawLandmarks(ctx, fullLandmarks, {
          color: "#FF0000",
          radius: 3,
        });

        try {
          const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ landmarks: flatLandmarks }),
          });

          const data = await res.json();
          const label = data.label;
          const confidence = data.confidence;

          if (label && typeof confidence === "number") {
            onNowResult(`${label} (${(confidence * 100).toFixed(2)}%)`);

            if (label === lastGestureRef.current) {
              if (!gestureStartTime.current) gestureStartTime.current = Date.now();

              const elapsed = Date.now() - gestureStartTime.current;
              if (elapsed >= 5000) {
                onOutputResult(label);
                gestureStartTime.current = null;
              }
            } else {
              lastGestureRef.current = label;
              gestureStartTime.current = Date.now();
            }
          }
        } catch (err) {
          console.error("Prediction error:", err);
        }
      } else {
        onNowResult("No hand");
        lastGestureRef.current = "";
        gestureStartTime.current = null;
      }

      ctx.restore();
    });

    handsRef.current = hands;
  }, [onNowResult, onOutputResult]);

  useEffect(() => {
    const processFrame = async () => {
      const video = videoRef.current;
      if (
        video &&
        handsRef.current &&
        !video.paused &&
        !video.ended &&
        video.readyState >= 2
      ) {
        await handsRef.current.send({ image: video });
        requestAnimationFrame(processFrame);
      }
    };

    if (videoFile && videoRef.current) {
      videoRef.current.addEventListener("play", () => {
        requestAnimationFrame(processFrame);
      });
    }
  }, [videoFile]);

  return (
    <div>
      <div style={{ position: "relative", width: 640, height: 480 }}>
        <video
          ref={videoRef}
          src={videoFile}
          controls
          width={640}
          height={480}
          style={{
            borderRadius: "12px",
            position: "absolute",
            zIndex: 1,
            objectFit: "cover",
            backgroundColor: "#000",
          }}
        />
        <canvas
          ref={canvasRef}
          width={640}
          height={480}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            borderRadius: "12px",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />
      </div>

      <div style={{ marginTop: '1rem', marginBottom: '6rem', display: 'flex', justifyContent: 'center' }}>
        <input
          type="file"
          accept="video/*"
          ref={fileInputRef}
          onChange={handleFileSelect}
          style={{ display: "none" }}
        />
        <button className="start" onClick={triggerFileSelect}>
          <FaVideo /> Select Video
        </button>
      </div>
    </div>
  );
};

export default VideoComponent;
