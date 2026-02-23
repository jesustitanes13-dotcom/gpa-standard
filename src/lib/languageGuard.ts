const spanishHints = [
  "hola",
  "gracias",
  "por favor",
  "tarea",
  "examen",
  "clase",
  "estudio",
  "hoy",
  "mañana",
  "ayer",
  "profesor",
  "nota"
];

const accentPattern = /[áéíóúñü¿¡]/i;

export const isLikelySpanish = (text: string) => {
  const normalized = text.toLowerCase();
  if (accentPattern.test(normalized)) {
    return true;
  }

  return spanishHints.some((hint) => normalized.includes(hint));
};
