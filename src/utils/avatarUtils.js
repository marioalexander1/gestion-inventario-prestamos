/**
 * Genera un color hexadecimal a partir de un string.
 * @param {string} string La cadena de texto para generar el color.
 * @returns {string} Un color en formato hexadecimal.
 */
export function stringToColor(string) {
  let hash = 0;
  let i;

  if (!string || string.length === 0) {
    return '#6C5CE7'; // Color por defecto
  }

  for (i = 0; i < string.length; i += 1) {
    hash = string.charCodeAt(i) + ((hash << 5) - hash);
  }

  let color = '#';

  for (i = 0; i < 3; i += 1) {
    const value = (hash >> (i * 8)) & 0xff;
    color += `00${value.toString(16)}`.slice(-2);
  }

  return color;
}

/**
 * Obtiene las iniciales de un nombre.
 * @param {string} name El nombre completo.
 * @returns {string} Las iniciales (ej: "John Doe" -> "JD").
 */
export const getInitials = (name = '') =>
  name
    .replace(/\s+/, ' ')
    .split(' ')
    .slice(0, 2)
    .map((v) => v && v[0].toUpperCase())
    .join('');