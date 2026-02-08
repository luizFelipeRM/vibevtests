export const zIndex = {
  base: 0,

  dropdown: 100,
  sticky: 200,
  header: 300,

  overlay: 400,
  modal: 500,
  popover: 600,
  tooltip: 700,
  toast: 800,
};

export type ZIndexKey = keyof typeof zIndex;
