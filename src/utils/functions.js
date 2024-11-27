let recognition; // Mantener la variable global de reconocimiento
let isRecognitionActive = false;

const capitalizeEachWord = (str) => {
  return str
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

export const startVoiceRecognition = (setSelectedProducts) => {
  if (!("webkitSpeechRecognition" in window)) {
    console.warn("El navegador no soporta Speech Recognition API");
    return;
  }

  const SpeechRecognition = window.webkitSpeechRecognition;
  recognition = new SpeechRecognition();
  recognition.lang = "es-CO";
  recognition.continuous = true;
  speakMessage("Empieza a hablar ahora.");

  recognition.onresult = (event) => {
    const transcript = event.results[event.results.length - 1][0].transcript
      .trim()
      .toLowerCase();
    console.log("Reconociendo:", transcript);

    const localProducts = [
      { singular: "manzana", plural: "manzanas" },
      { singular: "ajo", plural: "ajos" },
      { singular: "mandarina", plural: "mandarinas" },
      { singular: "mango", plural: "mangos" },
      { singular: "banano", plural: "bananos" },
      { singular: "pera", plural: "peras" },
      { singular: "cebolla cabezona", plural: "cebollas cabezonas" },
      { singular: "piña", plural: "piñas" },
      { singular: "limón", plural: "limones" },
      { singular: "guayaba", plural: "guayabas" },
      { singular: "pimentón", plural: "pimentones" },
      { singular: "maracuyá", plural: "maracuyás" },
      { singular: "cebolla larga", plural: "cebollas largas" },
      { singular: "plátano", plural: "plátanos" },
      { singular: "mora", plural: "moras" },
      { singular: "cilantro", plural: "cilantros" },
      { singular: "papa", plural: "papas" },
      { singular: "tomate", plural: "tomates" },
      { singular: "uva", plural: "uvas" },
      { singular: "papaya", plural: "papayas" },
      { singular: "lulo", plural: "lulos" },
      { singular: "naranja", plural: "naranjas" },
      { singular: "aguacate verde", plural: "aguacates verdes" },
      { singular: "aguacate negro", plural: "aguacates negros" },
      { singular: "kiwi", plural: "kiwis" },
      { singular: "sandía", plural: "sandías" },
      { singular: "granadilla", plural: "granadillas" },
      { singular: "fríjol", plural: "fríjoles" },
      { singular: "repollo", plural: "repollos" },
      { singular: "zanahoria", plural: "zanahorias" },
      { singular: "coliflor", plural: "coliflores" },
      { singular: "pepino", plural: "pepinos" },
      { singular: "espinaca", plural: "espinacas" },
      { singular: "maíz", plural: "mazorcas" },
      { singular: "calabaza", plural: "calabazas" },
      { singular: "perejil", plural: "perejiles" },
      { singular: "cebolla roja", plural: "cebollas rojas" },
    ];

    localProducts.forEach((product) => {
      if (
        transcript.includes(product.singular) ||
        transcript.includes(product.plural)
      ) {
        // Capitaliza cada palabra en el nombre en singular y lo envía a handleProductSelect
        const capitalizedProduct = capitalizeEachWord(product.singular);
        handleProductSelect(capitalizedProduct, setSelectedProducts);
      }
    });
  };

  recognition.onerror = (event) => {
    console.error("Error en el reconocimiento de voz:", event.error);
  };
};

export const toggleVoiceRecognition = (setSelectedProducts) => {
  if (isRecognitionActive) {
    // Detiene el reconocimiento
    isRecognitionActive = false;
    recognition.stop();
    speakMessage("La selección por voz a terminado.");
    document.getElementById("microphone").src = "red_microphone.png";
  } else {
    // Activa el reconocimiento de voz
    isRecognitionActive = true;
    startVoiceRecognition(setSelectedProducts);
    recognition.start();
    document.getElementById("microphone").src = "orange_microphone.png";
  }
};

export const requestMediaAccess = async () => {
  try {
    await navigator.mediaDevices.getUserMedia({ audio: true });
  } catch (error) {
    console.error("Error al acceder al micrófono:", error);
    speakMessage(
      "No se pudo acceder al micrófono. Asegúrate de que está habilitado."
    );
  }
};

export const handleProductSelect = (product, setSelectedProducts) => {
  setSelectedProducts((prevSelected) => {
    const isSelected = prevSelected.includes(product);
    const newSelectedProducts = isSelected
      ? prevSelected.filter((p) => p !== product) // Deselect if already selected
      : [...prevSelected, product]; // Select if not already selected

    updateSelectedItemsText(product, isSelected);
    return newSelectedProducts;
  });
};

// Función que genera el mensaje basado en si el producto fue seleccionado o deseleccionado
export const updateSelectedItemsText = (product, isSelected) => {
  if (isSelected) {
    speakMessage(`${product} ha sido quitado`);
  } else {
    speakMessage(`Has seleccionado ${product}`);
  }
};

export const speakMessage = (message) => {
  if (!("speechSynthesis" in window)) {
    console.error("Speech synthesis no es compatible en este navegador.");
    return;
  }

  const voices = window.speechSynthesis.getVoices();
  let selectedVoice = voices.find((voice) => voice.lang === "es-CO");

  if (!selectedVoice) {
    selectedVoice = voices.find(
      (voice) => voice.lang.startsWith("es") && !voice.lang.includes("en")
    );
  }

  const utterance = new SpeechSynthesisUtterance(message);
  utterance.voice = selectedVoice;
  utterance.lang = selectedVoice ? selectedVoice.lang : "es-MX";
  utterance.onerror = (error) =>
    console.error("Error al sintetizar voz:", error);
  speechSynthesis.speak(utterance);
};
