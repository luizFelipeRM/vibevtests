/*
 * fontSize
 */

// fontSizes no plural, pra nao ter conflito com props fontSize
export const fontSizes = {
  // exceções
  micro: 8,
  // default
  xs: 12,
  sm: 14,
  md: 16,
  lg: 18,
  xl: 20,
  // enormes
  "2xl": 24,
  "3xl": 48,
};

export type FontSizeKey = keyof typeof fontSizes;
