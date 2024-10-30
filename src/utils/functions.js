// utils/functions.js

let recognition; // Variable de reconocimiento global
let isRecognitionActive = false; // Controla si el reconocimiento está activo

// Importa la lista de productos para poder acceder a ella
import { products } from "../components/ProductList"; // Asegúrate de que la ruta sea correcta

export const handleProductSelect = (
  product,
  selectedProducts,
  setSelectedProducts,
  setVoiceText
) => {
  const newSelectedProducts = selectedProducts.includes(product)
    ? selectedProducts.filter((p) => p !== product)
    : [...selectedProducts, product];

  setSelectedProducts(newSelectedProducts);
  updateSelectedItemsText(newSelectedProducts, setVoiceText);
};

export const updateSelectedItemsText = (products, setVoiceText) => {
  if (products.length > 0) {
    speakMessage(`Has seleccionado ${products[products.length - 1]}`);
  } else {
    speakMessage("No se han seleccionado productos.");
  }
};

export const toggleVoiceRecognition = (setVoiceText, setSelectedProducts) => {
  if (isRecognitionActive) {
    // Detiene el reconocimiento de voz
    isRecognitionActive = false;
    recognition.stop();
    document.getElementById("microphone").src = "red_microphone.png"; // Cambia el icono de vuelta a rojo
    speakMessage("El reconocimiento de voz ha terminado.");
  } else {
    // Inicia el reconocimiento de voz
    isRecognitionActive = true;
    startVoiceRecognition(setVoiceText, setSelectedProducts);
  }
};

const startVoiceRecognition = (setVoiceText, setSelectedProducts) => {
  recognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  recognition.lang = "es-ES";
  recognition.interimResults = false;

  recognition.onstart = () => {
    document.getElementById("microphone").src = "orange_microphone.png"; // Cambia el icono a naranja
    speakMessage(
      "Comienza a hablar, menciona los productos que deseas agregar."
    );
  };

  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript.toLowerCase();
    const words = transcript.split(" ");

    // Lista de nombres de productos para comparar (en minúsculas)
    const productNames = products.map((product) => product.name.toLowerCase());

    setSelectedProducts((prev) => {
      let newSelectedProducts = [...prev];

      words.forEach((word) => {
        // Solo selecciona o deselecciona si el producto está en la lista
        if (productNames.includes(word)) {
          if (newSelectedProducts.includes(word)) {
            newSelectedProducts = newSelectedProducts.filter((p) => p !== word); // Deseleccionar
            speakMessage(`${word} ha sido deseleccionado.`);
          } else {
            newSelectedProducts.push(word); // Seleccionar
            speakMessage(`Has seleccionado ${word}.`);
          }
        }
      });

      return newSelectedProducts;
    });
  };

  recognition.onerror = (event) => {
    console.error("Error de reconocimiento:", event.error);
    speakMessage("Error de reconocimiento: " + event.error);
  };

  recognition.onend = () => {
    if (isRecognitionActive) {
      // Si la escucha aún está activa, reinicia el reconocimiento
      recognition.start();
    } else {
      // Cambia el icono de vuelta a rojo si la escucha ha terminado
      document.getElementById("microphone").src = "red_microphone.png";
      speakMessage("El reconocimiento de voz ha terminado.");
    }
  };

  recognition.start();
};

export const requestMediaAccess = async () => {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
    speakMessage("Acceso al micrófono concedido.");
  } catch (error) {
    console.error("Error al acceder al micrófono:", error);
    speakMessage(
      "No se pudo acceder al micrófono. Asegúrate de que está habilitado."
    );
  }
};

export const speakMessage = (message) => {
  if (!("speechSynthesis" in window)) {
    console.error("Speech synthesis no es compatible en este navegador.");
    return;
  }
  const utterance = new SpeechSynthesisUtterance(message);
  utterance.lang = "es-ES";
  utterance.onerror = (error) =>
    console.error("Error al sintetizar voz:", error);
  speechSynthesis.speak(utterance);
};
