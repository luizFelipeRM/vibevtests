import { useState, useCallback } from "react";
import { addDays, getDateLabel } from "../utils/dateHelpers";

export const useDateNavigation = () => {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const changeDate = useCallback((days: number) => {
    setSelectedDate((prev) => addDays(prev, days));
  }, []);

  const goToToday = useCallback(() => {
    setSelectedDate(new Date());
  }, []);

  const goToPreviousDay = useCallback(() => {
    changeDate(-1);
  }, [changeDate]);

  const goToNextDay = useCallback(() => {
    changeDate(1);
  }, [changeDate]);

  const dateLabel = getDateLabel(selectedDate);

  return {
    selectedDate,
    setSelectedDate,
    changeDate,
    goToToday,
    goToPreviousDay,
    goToNextDay,
    dateLabel,
  };
};
