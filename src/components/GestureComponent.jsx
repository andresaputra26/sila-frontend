import React, { useEffect, useRef } from "react";
import Webcam from "react-webcam";
import { Hands } from "@mediapipe/hands";
import {
  drawConnectors,
  drawLandmarks,
  HAND_CONNECTIONS,
} from "@mediapipe/drawing_utils";

// ✅ Ganti URL ini dengan domain backend kamu
const API_URL = "https://silaapi-production.up.railway.app///predict";

const GestureComponent = ({ isActive, onNowResult, onOutputResult }) => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const handsRef = useRef(null);
  const animationRef = useRef(null);

  const lastSentRef = useRef(0);
  const currentLabelRef = useRef(null);
  const stableStartRef = useRef(null);
  const hasOutputRef = useRef(false);

  const sendToFastAPI = async (landmarks) => {
    const now = Date.now();
    if (now - lastSentRef.current < 500) return;
    lastSentRef.current = now;

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ landmarks }),
      });

      const data = await res.json();
      const label = data.label;
      const confidence = data.confidence;

      onNowResult(`${label} (${(confidence * 100).toFixed(2)}%)`);

      // Stabilization logic
      if (label === currentLabelRef.current) {
        if (!stableStartRef.current) stableStartRef.current = now;
        const elapsed = now - stableStartRef.current;

        if (elapsed >= 5000 && !hasOutputRef.current) {
          onOutputResult(label);
          hasOutputRef.current = true;

          // reset state
          stableStartRef.current = null;
          hasOutputRef.current = false;
          currentLabelRef.current = null;
        }
      } else {
        currentLabelRef.current = label;
        stableStartRef.current = now;
        hasOutputRef.current = false;
      }
    } catch (err) {
      console.error("Prediction error:", err);
    }
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

    hands.onResults((results) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!ctx) return;

      ctx.save();
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (results.multiHandLandmarks?.length > 0) {
        const fullLandmarks = results.multiHandLandmarks[0];
        const flatLandmarks = fullLandmarks
          .flatMap((pt) => [pt.x, pt.y])
          .slice(0, 42);

        drawConnectors(ctx, fullLandmarks, HAND_CONNECTIONS, {
          color: "#00FF00",
          lineWidth: 3,
        });

        drawLandmarks(ctx, fullLandmarks, {
          color: "#FF0000",
          radius: 4,
        });

        sendToFastAPI(flatLandmarks);
      } else {
        onNowResult("No hand");
        currentLabelRef.current = null;
        stableStartRef.current = null;
        hasOutputRef.current = false;
      }

      ctx.restore();
    });

    handsRef.current = hands;
  }, [onNowResult, onOutputResult]);

  useEffect(() => {
    const detect = async () => {
      if (
        isActive &&
        webcamRef.current &&
        webcamRef.current.video.readyState === 4
      ) {
        await handsRef.current.send({ image: webcamRef.current.video });
      }
      animationRef.current = requestAnimationFrame(detect);
    };

    if (isActive) {
      detect();
    }

    return () => cancelAnimationFrame(animationRef.current);
  }, [isActive]);

  return (
    <>
      <Webcam
        ref={webcamRef}
        mirrored={false}
        audio={false}
        width={640}
        height={480}
        style={{
          position: "absolute",
          borderRadius: "12px",
          zIndex: 1,
        }}
      />
      <canvas
        ref={canvasRef}
        width={640}
        height={480}
        style={{
          position: "absolute",
          borderRadius: "12px",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
    </>
  );
};

GestureComponent.defaultProps = {
  isActive: false,
  onNowResult: () => {},
  onOutputResult: () => {},
};

export default GestureComponent;
