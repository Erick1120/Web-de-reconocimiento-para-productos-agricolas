export class Webcam {
  open = (videoRef) => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: false, video: { facingMode: "environment" } })
        .then((stream) => {
          videoRef.srcObject = stream;
        })
        .catch((err) => {
          alert("Error al abrir la webcam: " + err.message);
        });
    } else {
      alert("No se puede abrir la cámara web");
    }
  };

  close = (videoRef) => {
    if (videoRef.srcObject) {
      videoRef.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.srcObject = null;
    } else {
      alert("Primero abre la cámara web.");
    }
  };
}
