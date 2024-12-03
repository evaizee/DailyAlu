import { 
  Apple, 
  Beef, 
  Carrot, 
  Egg, 
  Fish, 
  Leaf, 
  Salad,
  Wheat 
} from 'lucide-react';

export type Ingredient = {
  value: string;
  label: string;
  icon: typeof Apple;
  category: 'fruits' | 'vegetables' | 'meat' | 'protein' | 'grains';
};

export const ingredientOptions: Ingredient[] = [
  { value: 'apple', label: 'Apple', icon: Apple, category: 'fruits' },
  { value: 'banana', label: 'Banana', icon: Apple, category: 'fruits' },
  { value: 'orange', label: 'Orange', icon: Apple, category: 'fruits' },
  { value: 'carrot', label: 'Carrot', icon: Carrot, category: 'vegetables' },
  { value: 'celery', label: 'Celery', icon: Leaf, category: 'vegetables' },
  { value: 'pumpkin', label: 'Pumpkin', icon: Carrot, category: 'vegetables' },
  { value: 'chicken', label: 'Chicken', icon: Beef, category: 'meat' },
  { value: 'beef', label: 'Beef', icon: Beef, category: 'meat' },
  { value: 'fish', label: 'Fish', icon: Fish, category: 'meat' },
  { value: 'egg', label: 'Egg', icon: Egg, category: 'protein' },
  { value: 'rice', label: 'Rice', icon: Wheat, category: 'grains' },
  { value: 'broccoli', label: 'Broccoli', icon: Salad, category: 'vegetables' },
  { value: 'spinach', label: 'Spinach', icon: Leaf, category: 'vegetables' }
];