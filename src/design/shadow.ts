/*
 * box-shadow
 */
export const shadows = {
  none: "none",

  xs: "0 1px 2px rgba(0, 0, 0, 0.08)",
  sm: "0 2px 4px rgba(0, 0, 0, 0.10)",
  md: "0 4px 8px rgba(0, 0, 0, 0.12)",
  lg: "0 8px 16px rgba(0, 0, 0, 0.14)",
  xl: "0 16px 24px rgba(0, 0, 0, 0.16)",
};

export type ShadowKey = keyof typeof shadows;
export default shadows;
