export interface FoodItem {
  protein: number;
  carbs: number;
  fats: number;
  calories: number;
  unit: string;
}

export interface FoodDatabase {
  [key: string]: FoodItem;
}

export interface SelectedFood {
  name: string;
  quantity: number;
}
