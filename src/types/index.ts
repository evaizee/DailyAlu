export interface User {
  id: string;
  email: string;
  name: string;
  role: 'parent' | 'caregiver';
}

export interface FeedingEntry {
  id: string;
  timestamp: Date;
  foodName: string;
  ingredients: IngredientWithQuantity[];
  quantity: string;
  response: 'like' | 'love' | 'indifferent' | 'dislike' | 'hate';
  notes?: string;
}

export interface ActivityEntry {
  id: string;
  timestamp: Date;
  type: 'play' | 'bath' | 'medicine' | 'other';
  duration: number;
  description: string;
}

export interface SleepEntry {
  id: string;
  startTime: Date;
  endTime: Date;
  duration: number;
  quality?: 'good' | 'fair' | 'poor';
}

export interface BowelEntry {
  id: string;
  timestamp: Date;
  type: 'wet' | 'solid' | 'both';
  notes?: string;
}

export interface Ingredient {
  name: string;
  icon: React.ComponentType;
  category: 'fruits' | 'vegetables' | 'meat' | 'protein' | 'grains';
}

export interface IngredientWithQuantity extends Ingredient {
  quantity: number;
}