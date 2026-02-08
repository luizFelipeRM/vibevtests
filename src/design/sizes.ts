/*
 * width, height, icon, avatar
 */

// sizes no plural, pra nao ter conflito com props size
export const sizes = {
  // usar somente para elementos não interativos
  dot: 4,
  micro: 8,
  xs: 12,
  // default
  sm: 16,
  md: 20,
  lg: 24,
  // enormes
  xl: 32,
  "2xl": 40,
  "3xl": 48,
  "4xl": 56,
  "5xl": 64,
  // tamanhos específicos
  icon_sm: 20,
  icon_md: 24,
  icon_lg: 28,
  icon_xl: 32,
  // semanticos, de logica, nao so numeros
  pagecontainer: "1200px",
};

export type SizeKey = keyof typeof sizes;
