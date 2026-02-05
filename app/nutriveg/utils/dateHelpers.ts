export const formatDate = (date: Date): string => {
  return date.toISOString().split("T")[0];
};

export const getDateLabel = (date: Date): string => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (formatDate(date) === formatDate(today)) return "Hoje";
  if (formatDate(date) === formatDate(yesterday)) return "Ontem";
  return date.toLocaleDateString("pt-BR");
};

export const addDays = (date: Date, days: number): Date => {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + days);
  return newDate;
};

export const isToday = (date: Date): boolean => {
  const today = new Date();
  return formatDate(date) === formatDate(today);
};
