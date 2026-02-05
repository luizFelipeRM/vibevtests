export const filterFoodsBySearch = (
  foods: string[],
  searchTerm: string,
  excludeFoods: string[] = []
): string[] => {
  if (searchTerm.length < 2) return [];

  return foods
    .filter(
      (food) =>
        food.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !excludeFoods.includes(food)
    )
    .slice(0, 8);
};

export const isFoodSelected = (food: string, selectedFoods: string[]): boolean => {
  return selectedFoods.includes(food);
};
