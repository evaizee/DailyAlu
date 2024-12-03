import React from 'react';
import Select from 'react-select';
import { Ingredient, ingredientOptions } from '../../data/ingredients';

interface IngredientSelectProps {
  value: any;
  onChange: (value: any) => void;
}

const formatOptionLabel = ({ label, icon: Icon, category }: Ingredient) => (
  <div className="flex items-center space-x-2">
    <Icon className="h-4 w-4" />
    <span>{label}</span>
    <span className="text-gray-400 text-sm">({category})</span>
  </div>
);

export const IngredientSelect: React.FC<IngredientSelectProps> = ({ value, onChange }) => {
  return (
    <Select
      isMulti
      options={ingredientOptions}
      value={value}
      onChange={onChange}
      formatOptionLabel={formatOptionLabel}
      className="react-select-container"
      classNamePrefix="react-select"
      placeholder="Select ingredients..."
    />
  );
};