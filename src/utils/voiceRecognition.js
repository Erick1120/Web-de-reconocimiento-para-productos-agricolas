// voiceRecognition.js
export const startVoiceRecognition = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
  
    if (!SpeechRecognition) {
      console.error("El reconocimiento de voz no es compatible con este navegador.");
      alert("El reconocimiento de voz no es compatible con este navegador. Prueba usando Google Chrome.");
      return;
    }
  
    const recognition = new SpeechRecognition();
    recognition.continuous = true; // Continuar escuchando
    recognition.interimResults = false; // No mostrar resultados intermedios
  
    recognition.onresult = (event) => {
      const transcript = Array.from(event.results)
        .map(result => result[0])
        .map(result => result.transcript)
        .join('');
  
      console.log("Texto reconocido:", transcript);
    };
  
    recognition.onerror = (event) => {
      console.error("Error en reconocimiento de voz:", event.error);
    };
  
    recognition.onend = () => {
      console.log("El reconocimiento de voz se ha detenido. Reiniciando...");
      recognition.start(); // Reinicia el reconocimiento
    };
  
    recognition.start(); // Comienza el reconocimiento
  };
  