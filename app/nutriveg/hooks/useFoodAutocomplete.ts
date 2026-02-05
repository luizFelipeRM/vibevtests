import { useState, useCallback } from "react";
import { filterFoodsBySearch } from "../utils/foodHelpers";
import { fullFoodNames } from "../data/foodDatabase";

export const useFoodAutocomplete = (selectedFoods: string[] = []) => {
  const [searchInput, setSearchInput] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);

  const filteredFoods = filterFoodsBySearch(
    fullFoodNames,
    searchInput,
    selectedFoods
  );

  const handleSelect = useCallback((food: string, onSelect: (food: string) => void) => {
    onSelect(food);
    setSearchInput("");
    setShowDropdown(false);
  }, []);

  const handleInputChange = useCallback((value: string) => {
    setSearchInput(value);
    setShowDropdown(value.length >= 2);
  }, []);

  const handleFocus = useCallback(() => {
    if (searchInput.length >= 2) {
      setShowDropdown(true);
    }
  }, [searchInput]);

  const handleBlur = useCallback(() => {
    setTimeout(() => setShowDropdown(false), 200);
  }, []);

  const clearInput = useCallback(() => {
    setSearchInput("");
    setShowDropdown(false);
  }, []);

  return {
    searchInput,
    setSearchInput,
    showDropdown,
    setShowDropdown,
    filteredFoods,
    handleSelect,
    handleInputChange,
    handleFocus,
    handleBlur,
    clearInput,
  };
};
