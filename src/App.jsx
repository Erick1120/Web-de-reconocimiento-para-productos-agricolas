import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import * as tf from "@tensorflow/tfjs";
import "@tensorflow/tfjs-backend-webgl";
import Loader from "./components/loader";
import { detectVideo } from "./utils/detect";
import { Webcam } from "./utils/webcam";
import "./style/App.css";
import {
  toggleVoiceRecognition,
  requestMediaAccess,
  speakMessage,
} from "./utils/functions";

const App = () => {
  const [loading, setLoading] = useState({ loading: true, progress: 0 });
  const [model, setModel] = useState({ net: null, inputShape: [1, 0, 0, 3] });
  const [detections, setDetections] = useState([]);
  const [modelReady, setModelReady] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [videoVisible, setVideoVisible] = useState(false);
  const cameraRef = useRef(null);
  const canvasRef = useRef(null);
  const webcamRef = useRef(new Webcam());
  const navigate = useNavigate();
  const modelName = "yolodev";

  useEffect(() => {
    speakMessage("Espera, ya casi estamos listos");

    const storedProducts = JSON.parse(localStorage.getItem("selectedProducts"));
    if (Array.isArray(storedProducts)) {
      setSelectedProducts(storedProducts);
    } else {
      setSelectedProducts([]);
    }

    tf.ready().then(async () => {
      const yolov8 = await tf.loadGraphModel(`/${modelName}/model.json`, {
        onProgress: (fractions) => {
          setLoading({ loading: true, progress: fractions });
        },
      });

      const dummyInput = tf.ones(yolov8.inputs[0].shape);
      yolov8.execute(dummyInput);
      tf.dispose(dummyInput);

      setLoading({ loading: false, progress: 1 });
      setModel({ net: yolov8, inputShape: yolov8.inputs[0].shape });
      setModelReady(true);

      speakMessage(
        "Estamos listos, comencemos el reconocimiento de tus productos ahora."
      );

      // Iniciar la cámara y la detección automáticamente
      const webcam = webcamRef.current;
      await webcam.open(cameraRef.current); // Abrir la cámara
    });
  }, []);
  useEffect(() => {
    if (modelReady) {
      detectVideo(
        cameraRef.current,
        model,
        canvasRef.current,
        setDetections,
        selectedProducts
      );
    }
  }, [selectedProducts, modelReady]);

  useEffect(() => {
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  const handleBack = () => {
    navigate("/");
  };

  const handleMicClick = async () => {
    await requestMediaAccess();
    toggleVoiceRecognition(setSelectedProducts);
  };

  const toggleVideoVisibility = () => {
    setVideoVisible((prevVisible) => !prevVisible);
  };

  return (
    <div className="App">
      {loading.loading && (
        <Loader>Cargando... {(loading.progress * 100).toFixed(2)}%</Loader>
      )}
      <h1>Detección de frutas</h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <img
          id="microphone"
          src="red_microphone.png"
          alt="Micrófono Rojo"
          title="Activar Reconocimiento de Voz"
          style={{ cursor: "pointer" }}
          onClick={handleMicClick}
        />
      </div>
      <div className="content">
        <video
          autoPlay
          muted
          ref={cameraRef}
          style={{ display: videoVisible ? "block" : "none" }}
        />
        <canvas width="640" height="640" ref={canvasRef} />
      </div>
      <div className="btn-container">
        <button onClick={toggleVideoVisibility}>
          {videoVisible ? "Ocultar" : "Mostrar"} Video
        </button>
      </div>
      <div className="text-box">
        <h2>Detecciones:</h2>
        <ul>
          {detections.map((det, index) => (
            <li key={index}>{det}</li>
          ))}
        </ul>
      </div>
      <div className="selected-products">
        <h2>Productos seleccionados:</h2>
        <ul>
          {selectedProducts.map((product, index) => (
            <li key={index} className="checkbox-container">
              <input type="checkbox" disabled checked />
              <label>{product}</label>
            </li>
          ))}
        </ul>
      </div>
      <button onClick={handleBack}>Volver</button>
    </div>
  );
};

export default App;
