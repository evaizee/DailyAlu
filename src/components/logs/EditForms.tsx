import React, { useEffect } from 'react';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { differenceInMinutes } from 'date-fns';
import { Ingredient, ingredientOptions } from '../../data/ingredients';
import type { FeedingEntry, ActivityEntry, SleepEntry, BowelEntry, IngredientWithQuantity } from '../../types';
import { icons, Plus, Trash2 } from 'lucide-react';

interface EditFormProps {
  entry: any;
  setEditedEntry: (entry: any) => void;
}

export const FeedingEditForm = ({ entry, setEditedEntry }: EditFormProps) => {
  const handleIngredientChange = (index: number, field: 'name' | 'quantity', value: any) => {
    const updatedIngredients = [...(entry.ingredients || [])];
    if (field === 'name') {
      const selectedIngredient = ingredientOptions.find(i => i.value === value);
      if (selectedIngredient) {
        updatedIngredients[index] = {
          ...updatedIngredients[index],
          name: selectedIngredient.value,
          icon: selectedIngredient.icon,
          category: selectedIngredient.category,
        };
      }
    } else {
      updatedIngredients[index] = {
        ...updatedIngredients[index],
        [field]: value
      };
    }
    setEditedEntry({ ...entry, ingredients: updatedIngredients });
  };

  const addIngredient = () => {
    const defaultIngredient = {
      name: ingredientOptions[0].value,
      icon: ingredientOptions[0].icon,
      category: ingredientOptions[0].category,
      quantity: 1
    };
    setEditedEntry({
      ...entry,
      ingredients: [...(entry.ingredients || []), defaultIngredient]
    });
  };

  const removeIngredient = (index: number) => {
    const updatedIngredients = [...(entry.ingredients || [])];
    updatedIngredients.splice(index, 1);
    setEditedEntry({ ...entry, ingredients: updatedIngredients });
  };

  const formatOptionLabel = ({ label, icon: Icon, category }: Ingredient) => (
    <div className="flex items-center space-x-2">
      <Icon className="h-4 w-4" />
      <span>{label}</span>
      <span className="text-gray-400 text-sm">({category})</span>
    </div>
  );

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Food Name</label>
        <input
          type="text"
          value={entry.foodName || ''}
          onChange={(e) => setEditedEntry({ ...entry, foodName: e.target.value })}
          className="input-field"
        />
      </div>
      
      <div>
        <div className="flex justify-between items-center mb-2">
          <label className="block text-sm font-medium text-gray-700">Ingredients</label>
          <button
            type="button"
            onClick={addIngredient}
            className="flex items-center space-x-1 text-sm text-primary hover:text-primary-dark"
          >
            <Plus className="h-4 w-4" />
            <span>Add Ingredient</span>
          </button>
        </div>
        
        <div className="space-y-3">
          {(entry.ingredients || []).map((ingredient: IngredientWithQuantity, index: number) => (
            <div key={index} className="flex items-center space-x-2">
              <div className="flex-1">
                <Select
                  value={{ 
                    value: ingredient.name, 
                    label: ingredientOptions.find(i => i.value === ingredient.name)?.label,
                    icon: ingredient.icon
                  }}
                  onChange={(option) => handleIngredientChange(index, 'name', option?.value)}
                  options={ingredientOptions.map(i => ({ value: i.value, label: i.label, icon: i.icon }))}
                  className="react-select-container"
                  classNamePrefix="react-select"
                />
              </div>
              <div className="w-24">
                <input
                  type="number"
                  value={ingredient.quantity}
                  onChange={(e) => handleIngredientChange(index, 'quantity', parseInt(e.target.value))}
                  className="input-field"
                  min="1"
                  placeholder="Qty"
                />
              </div>
              <button
                type="button"
                onClick={() => removeIngredient(index)}
                className="p-2 text-red-500 hover:text-red-700"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Response</label>
          <Select
            value={{ 
              value: entry.response || 'love', 
              label: (entry.response || 'Love').charAt(0).toUpperCase() + (entry.response || 'love').slice(1)
            }}
            onChange={(option) => setEditedEntry({ ...entry, response: option?.value })}
            options={[
              { value: 'like', label: 'Like' },
              { value: 'indifferent', label: 'Indifferent' },
              { value: 'dislike', label: 'Dislike' },
              { value: 'hate', label: 'Hate' }
            ]}
            className="react-select-container"
            classNamePrefix="react-select"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Total Quantity</label>
        <input
          type="text"
          value={entry.quantity || ''}
          onChange={(e) => setEditedEntry({ ...entry, quantity: e.target.value })}
          className="input-field"
          placeholder="e.g., 200ml, 2 servings"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
        <DatePicker
          selected={new Date(entry.timestamp)}
          onChange={(date: Date) => setEditedEntry({ ...entry, timestamp: date })}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          className="input-field"
        />
      </div>
    </div>
  );
};

export const ActivityEditForm = ({ entry, setEditedEntry }: EditFormProps) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
      <Select
        value={{ value: entry.type, label: entry.type }}
        onChange={(option) => setEditedEntry({ ...entry, type: option?.value })}
        options={[
          { value: 'play', label: 'Play' },
          { value: 'bath', label: 'Bath' },
          { value: 'medicine', label: 'Medicine' },
          { value: 'other', label: 'Other' }
        ]}
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
      <input
        type="text"
        value={entry.description || ''}
        onChange={(e) => setEditedEntry({ ...entry, description: e.target.value })}
        className="input-field"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
      <input
        type="number"
        value={entry.duration || 0}
        onChange={(e) => setEditedEntry({ ...entry, duration: parseInt(e.target.value) })}
        className="input-field"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
      <DatePicker
        selected={new Date(entry.timestamp)}
        onChange={(date: Date) => setEditedEntry({ ...entry, timestamp: date })}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
        className="input-field"
      />
    </div>
  </div>
);

export const BowelEditForm = ({ entry, setEditedEntry }: EditFormProps) => (
  <div className="space-y-4">
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
      <Select
        value={{ value: entry.type, label: entry.type }}
        onChange={(option) => setEditedEntry({ ...entry, type: option?.value })}
        options={[
          { value: 'wet', label: 'Wet' },
          { value: 'solid', label: 'Solid' },
          { value: 'both', label: 'Both' }
        ]}
        className="react-select-container"
        classNamePrefix="react-select"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
      <input
        type="text"
        value={entry.notes || ''}
        onChange={(e) => setEditedEntry({ ...entry, notes: e.target.value })}
        className="input-field"
      />
    </div>
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
      <DatePicker
        selected={new Date(entry.timestamp)}
        onChange={(date: Date) => setEditedEntry({ ...entry, timestamp: date })}
        showTimeSelect
        dateFormat="MMMM d, yyyy h:mm aa"
        className="input-field"
      />
    </div>
  </div>
);

export const SleepEditForm = ({ entry, setEditedEntry }: EditFormProps) => {
  useEffect(() => {
    const startTime = new Date(entry.startTime);
    const endTime = new Date(entry.endTime);
    const duration = differenceInMinutes(endTime, startTime);
    if (duration !== entry.duration) {
      setEditedEntry({ ...entry, duration });
    }
  }, [entry.startTime, entry.endTime]);

  const handleDurationChange = (newDuration: number) => {
    const startTime = new Date(entry.startTime);
    const newEndTime = new Date(startTime.getTime() + newDuration * 60000);
    setEditedEntry({ ...entry, duration: newDuration, endTime: newEndTime });
  };

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Start Time</label>
        <DatePicker
          selected={new Date(entry.startTime)}
          onChange={(date: Date) => setEditedEntry({ ...entry, startTime: date })}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          className="input-field"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">End Time</label>
        <DatePicker
          selected={new Date(entry.endTime)}
          onChange={(date: Date) => setEditedEntry({ ...entry, endTime: date })}
          showTimeSelect
          dateFormat="MMMM d, yyyy h:mm aa"
          className="input-field"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Duration (minutes)</label>
        <input
          type="number"
          value={entry.duration || 0}
          onChange={(e) => handleDurationChange(parseInt(e.target.value))}
          className="input-field"
          min="0"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Quality</label>
        <Select
          value={{ 
            value: entry.quality || 'good', 
            label: (entry.quality || 'Good').charAt(0).toUpperCase() + (entry.quality || 'good').slice(1)
          }}
          onChange={(option) => setEditedEntry({ ...entry, quality: option?.value })}
          options={[
            { value: 'good', label: 'Good' },
            { value: 'fair', label: 'Fair' },
            { value: 'poor', label: 'Poor' }
          ]}
          className="react-select-container"
          classNamePrefix="react-select"
        />
      </div>
    </div>
  );
};