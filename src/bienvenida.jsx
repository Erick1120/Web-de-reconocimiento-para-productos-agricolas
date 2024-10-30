import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProductList from "./components/ProductList";
import { startVoiceRecognition, speakMessage, requestMediaAccess } from "./utils/functions"; // Import functions
import "./style/bienvenida.css";

function App() {
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [voiceText, setVoiceText] = useState("Selecciona o di los productos que deseas comprar.");
    const navigate = useNavigate();

    // Trigger introductory message on component mount
    useEffect(() => {
        speakMessage(voiceText); // Speak the introductory message
    }, [voiceText]);

    // Handle product selection and apply color and speech feedback
    const handleProductSelect = (product) => {
        setSelectedProducts((prev) => {
            if (prev.includes(product)) {
                speakMessage(`${product} ha sido deseleccionado.`);
                return prev.filter((item) => item !== product); // Deselect
            }
            speakMessage(`Has seleccionado ${product}.`);
            return [...prev, product]; // Select
        });
    };

    const handleContinue = () => {
        if (selectedProducts.length > 0) {
            localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
            navigate('/deteccion');
        } else {
            alert('No se han seleccionado productos.');
        }
    };

    // Start voice recognition on microphone icon click
    const handleMicClick = async () => {
        await requestMediaAccess(); // Ensure permissions are requested
        startVoiceRecognition(setVoiceText, setSelectedProducts);
    };

    return (
        <div className="App">
            <h1>Bienvenidos a tu asistente de compras</h1>
            <div id="mainMessage" style={{ textAlign: "center" }}>
                {voiceText}
            </div>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img
                    id="microphone"
                    src="red_microphone.png"
                    alt="Micrófono Rojo"
                    title="Activar Reconocimiento de Voz"
                    style={{ cursor: "pointer" }}
                    onClick={handleMicClick} // Connect the microphone function
                />
            </div>
            <form id="productForm">
                <input type="hidden" name="selected_products" id="selected_products" />
                <ProductList 
                    onProductSelect={handleProductSelect} 
                    selectedProducts={selectedProducts} 
                />
                <button 
                    type="button" 
                    onClick={handleContinue} 
                    id="continueButton" 
                    style={{ backgroundColor: '#4caf50', color: 'white' }}
                >
                    Continuar
                </button>
            </form>
            <div id="selectedItems"></div>
        </div>
    );
}

export default App;
