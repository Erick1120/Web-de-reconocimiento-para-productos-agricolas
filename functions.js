document.addEventListener('DOMContentLoaded', function () {
    const continueButton = document.getElementById('continueButton');
    const productList = document.getElementById('productList');
    const selectedItemsDiv = document.getElementById('selectedItems');
    const selectedProducts = [];

    continueButton.addEventListener('click', function () {
        if (selectedProducts.length > 0) {
            // Almacenar los productos seleccionados en localStorage
            localStorage.setItem('selectedProducts', JSON.stringify(selectedProducts));
            // Redirige a identificacion.html si hay productos seleccionados
            window.location.href = 'identificacion.html';
        } else {
            alert('No se han seleccionado productos.');
        }
    });

    document.getElementById('microphone').addEventListener('click', function () {
        startVoiceRecognition();
        this.src = "orange_microphone.png"; // Cambia el micrófono a naranja al iniciar
    });

    productList.addEventListener('click', function (event) {
        const item = event.target.closest('.product-item');
        if (item) {
            const product = item.getAttribute('data-product');
            selectProduct(product);
        }
    });

    function selectProduct(product) {
        const productItem = Array.from(productList.children).find(item => item.getAttribute('data-product') === product);
        if (productItem) {
            // Cambia el estado de selección
            if (productItem.classList.toggle('selected')) {
                selectedProducts.push(product);
                speakMessage(`Has seleccionado ${product}`);
            } else {
                const index = selectedProducts.indexOf(product);
                if (index > -1) {
                    selectedProducts.splice(index, 1);
                    speakMessage(`Has quitado ${product}`);
                }
            }
            selectedItemsDiv.textContent = 'Productos seleccionados: ' + selectedProducts.join(', ');
        }
    }

    async function startVoiceRecognition() {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'es-ES';
        recognition.interimResults = false;

        recognition.onstart = function () {
            speakMessage('Inicia a hablar después de "quiero agregar".');
        };

        recognition.onresult = function (event) {
            const transcript = event.results[0][0].transcript.toLowerCase();
            const words = transcript.split(" ");
            
            // Buscar si hay un producto después de "quiero agregar"
            const agregarIndex = words.indexOf("agregar");
            if (agregarIndex !== -1 && agregarIndex < words.length - 1) {
                const product = words[agregarIndex + 1]; // Obtiene el producto
                selectProduct(product);
                askForMoreProducts();
            } else {
                speakMessage("No se reconoció ningún producto válido.");
            }
        };

        recognition.onerror = function (event) {
            console.error("Error de reconocimiento:", event.error);
            speakMessage("Error de reconocimiento: " + event.error);
        };

        recognition.onend = function () {
            // Cambia el micrófono de vuelta a rojo cuando finaliza el reconocimiento de voz
            document.getElementById('microphone').src = "red_microphone.png";
            speakMessage("El reconocimiento de voz ha terminado.");
        };

        // Inicia el reconocimiento de voz durante 6 segundos
        recognition.start();
        setTimeout(() => {
            recognition.stop();
        }, 7000);
    }

    function askForMoreProducts() {
        speakMessage("¿Deseas agregar otro producto?");
        listenForResponse();
    }

    function listenForResponse() {
        const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
        recognition.lang = 'es-ES';
        recognition.interimResults = false;

        recognition.onresult = function (event) {
            const response = event.results[0][0].transcript.toLowerCase();

            if (response.includes("sí")) {
                speakMessage("Indica el producto que deseas agregar.");
                startVoiceRecognition();
            } else if (response.includes("no")) {
                speakMessage("¿Deseas continuar?");
                askToContinue();
            } else {
                speakMessage("No te entendí. Por favor, responde sí o no.");
                listenForResponse();
            }
        };

        recognition.start();
    }

    function askToContinue() {
        listenForResponse();
    }

    async function requestMediaAccess() {
        try {
            await navigator.mediaDevices.getUserMedia({ audio: true });
            speakMessage('Acceso al micrófono concedido. Puedes seleccionar productos.');
        } catch (error) {
            console.error('Error al acceder al micrófono:', error);
            speakMessage('No se pudo acceder al micrófono. Asegúrate de que está habilitado.');
        }
    }

    function speakMessage(message) {
        const utterance = new SpeechSynthesisUtterance(message);
        utterance.lang = 'es-ES'; // Establece el idioma
        speechSynthesis.speak(utterance);
    }

    // Iniciar solicitud de acceso al micrófono al cargar la página
    requestMediaAccess();
});
