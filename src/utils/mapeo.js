// mapeo.js

/**
 * Función para obtener en qué zona de una cuadrícula 3x3 está el objeto
 * @param {Number} centerX - Coordenada X del centro del objeto
 * @param {Number} centerY - Coordenada Y del centro del objeto
 * @param {Number} width - Ancho de la imagen (en este caso 640)
 * @param {Number} height - Alto de la imagen (en este caso 640)
 * @returns {String} - Zona en la que se encuentra el objeto
 */
export const obtenerZona = (centerX, centerY, width = 640, height = 640) => {
  const thirdWidth = width / 3;
  const thirdHeight = height / 3;

  let zonaX, zonaY;

  // Determinar la columna (X)
  if (centerX < thirdWidth) {
    zonaX = "izquierda";
  } else if (centerX < 2 * thirdWidth) {
    zonaX = "centro";
  } else {
    zonaX = "derecha";
  }

  // Determinar la fila (Y)
  if (centerY < thirdHeight) {
    zonaY = "superior";
  } else if (centerY < 2 * thirdHeight) {
    zonaY = "medio";
  } else {
    zonaY = "inferior";
  }

  // Devolver la descripción completa de la zona
  return `${zonaY} ${zonaX}`;
};
