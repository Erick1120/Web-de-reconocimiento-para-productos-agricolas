import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "./components/ProductList";
import {
  toggleVoiceRecognition,
  speakMessage,
  requestMediaAccess,
  handleProductSelect,
} from "./utils/functions";
import "./style/bienvenida.css";

function App() {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [voiceText] = useState(
    "Selecciona o di los productos que deseas comprar."
  );
  const navigate = useNavigate();

  // Mensaje de bienvenida cuando el componente se monta
  useEffect(() => {
    speakMessage(voiceText);
  }, [voiceText]);

  // Guarda los productos seleccionados en localStorage cuando cambian
  useEffect(() => {
    localStorage.setItem("selectedProducts", JSON.stringify(selectedProducts));
  }, [selectedProducts]);

  // Selección manual de productos
  const handleProductClick = (product) => {
    handleProductSelect(product, setSelectedProducts);
  };

  // Navegar a la siguiente página si hay productos seleccionados
  const handleContinue = () => {
    if (selectedProducts.length > 0) {
      navigate("/deteccion");
    } else {
      speakMessage("No se han seleccionado productos.");
    }
  };

  // Activar reconocimiento de voz al hacer clic en el icono de micrófono
  const handleMicClick = async () => {
    await requestMediaAccess();
    toggleVoiceRecognition(setSelectedProducts);
  };

  return (
    <div className="App">
      <h1>Bienvenido a tu asistente de compras</h1>
      <section className="Contenido">
        <div id="mainMessage" style={{ textAlign: "center" }} key={voiceText}>
          {voiceText}
        </div>
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

        <form id="productForm">
          <input
            type="hidden"
            name="selected_products"
            id="selected_products"
          />
          <ProductList
            onProductSelect={handleProductClick}
            selectedProducts={selectedProducts}
          />
          <button type="button" onClick={handleContinue} id="continueButton">
            Continuar
          </button>
        </form>
        <div id="selectedItems"></div>
      </section>
      <footer>
        <p>Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default App;
