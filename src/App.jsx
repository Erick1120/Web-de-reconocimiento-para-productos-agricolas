import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import Loader from "./components/loader";
import ButtonHandler from "./components/btn-handler";
import { detectVideo } from "./utils/detect";
import "./style/App.css";

const App = () => {
  const [loading, setLoading] = useState({ loading: true, progress: 0 });
  const [model, setModel] = useState({
    net: null,
    inputShape: [1, 0, 0, 3],
  });
  const [detections, setDetections] = useState([]); // State for detections

  const cameraRef = useRef(null);
  const canvasRef = useRef(null);

  const modelName = "yolodev";

  useEffect(() => {
    tf.ready().then(async () => {
      const yolov8 = await tf.loadGraphModel(
        `${window.location.href}/${modelName}/model.json`,
        {
          onProgress: (fractions) => {
            setLoading({ loading: true, progress: fractions });
          },
        }
      );

      const dummyInput = tf.ones(yolov8.inputs[0].shape);
      const warmupResults = yolov8.execute(dummyInput);

      setLoading({ loading: false, progress: 1 });
      setModel({
        net: yolov8,
        inputShape: yolov8.inputs[0].shape,
      });

      tf.dispose([warmupResults, dummyInput]);
    });
  }, []);

  return (
    <div className="App">
      {loading.loading && (
        <Loader>Cargando... {(loading.progress * 100).toFixed(2)}%</Loader>
      )}
      <div className="header">
        <h1>Detección de frutas</h1>
        <p>
          Yolo convertido a tfjs <code>by umng</code>
        </p>
        <p>
          Serving : <code className="code">{modelName}</code>
        </p>
      </div>

      <div className="content">
        <video
          autoPlay
          muted
          ref={cameraRef}
          onPlay={
            () =>
              detectVideo(
                cameraRef.current,
                model,
                canvasRef.current,
                setDetections
              ) // Pass setDetections here
          }
        />
        <canvas
          width={model.inputShape[1]}
          height={model.inputShape[2]}
          ref={canvasRef}
        />
      </div>
      <ButtonHandler cameraRef={cameraRef} />
      <div className="text-box">
        <h2>Detecciones:</h2>
        <ul>
          {detections.map((det, index) => (
            <li key={index}>{det}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;
