import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { Plus, X } from 'lucide-react';
import { Tab } from '@headlessui/react';
import { IngredientSelect } from './IngredientSelect';
import { DateTimeInput } from './DateTimeInput';
import { TabPanel } from './TabPanel';
import { Utensils, Activity, Moon, Baby } from 'lucide-react';
import type { 
  FeedingEntry, 
  ActivityEntry, 
  SleepEntry, 
  BowelEntry,
  IngredientWithQuantity 
} from '../../types';

export const NewLogEntry = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedIngredients, setSelectedIngredients] = useState<IngredientWithQuantity[]>([]);
  
  const addFeedingEntry = useStore((state) => state.addFeedingEntry);
  const addActivityEntry = useStore((state) => state.addActivityEntry);
  const addSleepEntry = useStore((state) => state.addSleepEntry);
  const addBowelEntry = useStore((state) => state.addBowelEntry);

  const handleSubmit = (e: React.FormEvent, type: string) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const id = Math.random().toString(36).substr(2, 9);

    switch (type) {
      case 'feeding': {
        const entry: FeedingEntry = {
          id,
          timestamp: selectedDate,
          foodName: formData.get('foodName') as string,
          ingredients: selectedIngredients,
          quantity: formData.get('quantity') as string,
          response: formData.get('response') as FeedingEntry['response'],
          notes: formData.get('notes') as string
        };
        addFeedingEntry(entry);
        break;
      }
      case 'activity': {
        const entry: ActivityEntry = {
          id,
          timestamp: selectedDate,
          type: formData.get('activityType') as ActivityEntry['type'],
          duration: parseInt(formData.get('duration') as string),
          description: formData.get('description') as string
        };
        addActivityEntry(entry);
        break;
      }
      case 'sleep': {
        const duration = parseInt(formData.get('duration') as string);
        const endTime = new Date(selectedDate.getTime() + duration * 60000);
        const entry: SleepEntry = {
          id,
          startTime: selectedDate,
          endTime,
          duration,
          quality: formData.get('quality') as SleepEntry['quality']
        };
        addSleepEntry(entry);
        break;
      }
      case 'bowel': {
        const entry: BowelEntry = {
          id,
          timestamp: selectedDate,
          type: formData.get('bowelType') as BowelEntry['type'],
          notes: formData.get('notes') as string
        };
        addBowelEntry(entry);
        break;
      }
    }

    form.reset();
    setSelectedIngredients([]);
    setIsOpen(false);
  };

  const handleIngredientChange = (newValue: any[]) => {
    setSelectedIngredients(
      newValue.map(v => ({
        ...v,
        name: v.value,
        quantity: v.quantity || 0
      }))
    );
  };

  const updateIngredientQuantity = (ingredient: IngredientWithQuantity, quantity: number) => {
    setSelectedIngredients(prev =>
      prev.map(ing =>
        ing.name === ingredient.name ? { ...ing, quantity } : ing
      )
    );
  };

  const tabsCategory = [
    { category: 'Feeding', icon: Utensils },
    { category: 'Activity', icon: Activity },
    { category: 'Sleep', icon: Moon },
    { category: 'Diaper', icon: Baby },
  ];

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 text-gray-400 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="p-6">
              <Tab.Group>
                <Tab.List className="flex space-x-2 rounded-lg bg-gray-100 p-1">
                  {tabsCategory.map(({category, icon:Icon}) => (
                    <Tab
                      key={category}
                      className={({ selected }) =>
                        `flex items-center space-x-2 w-full rounded-lg py-2.5 px-4 text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-primary focus:outline-none
                        ${selected
                          ? 'bg-white text-primary shadow'
                          : 'text-gray-600 hover:bg-white/[0.12] hover:text-primary'
                        }`
                      }
                    >
                      <Icon className="h-4 w-4" />
                      <span>{category}</span>
                    </Tab>
                  ))}
                </Tab.List>
                <Tab.Panels>
                  <TabPanel>
                    <form onSubmit={(e) => handleSubmit(e, 'feeding')} className="space-y-4">
                      <DateTimeInput
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date || new Date())}
                        label="Date & Time"
                      />
                      <input
                        name="foodName"
                        placeholder="Food name"
                        required
                        className="input-field"
                      />
                      <div className="space-y-2">
                        <label className="block text-sm font-medium text-gray-700">Ingredients</label>
                        <IngredientSelect
                          value={selectedIngredients}
                          onChange={handleIngredientChange}
                        />
                      </div>
                      {selectedIngredients.length > 0 && (
                        <div className="space-y-2">
                          <label className="block text-sm font-medium text-gray-700">
                            Quantities (grams)
                          </label>
                          {selectedIngredients.map((ingredient) => (
                            <div key={ingredient.name} className="flex items-center space-x-2">
                              <span className="text-sm">{ingredient.name}:</span>
                              <input
                                type="number"
                                value={ingredient.quantity}
                                onChange={(e) => updateIngredientQuantity(
                                  ingredient,
                                  parseInt(e.target.value)
                                )}
                                className="input-field w-24"
                                min="0"
                              />
                            </div>
                          ))}
                        </div>
                      )}
                      <label className="block text-sm font-medium text-gray-700">
                        Baby Response
                      </label>
                      <select name="response" className="input-field">
                        <option value="love">Love</option>
                        <option value="like">Like</option>
                        <option value="indifferent">Indifferent</option>
                        <option value="dislike">Dislike</option>
                        <option value="hate">Hate</option>
                      </select>
                      <textarea
                        name="notes"
                        placeholder="Notes"
                        className="input-field"
                      />
                      <button type="submit" className="btn-primary w-full">
                        Add Feeding
                      </button>
                    </form>
                  </TabPanel>

                  <TabPanel>
                    <form onSubmit={(e) => handleSubmit(e, 'activity')} className="space-y-4">
                      <DateTimeInput
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date || new Date())}
                        label="Date & Time"
                      />
                      <select name="activityType" required className="input-field">
                        <option value="play">Play</option>
                        <option value="bath">Bath</option>
                        <option value="medicine">Medicine</option>
                        <option value="other">Other</option>
                      </select>
                      <input
                        name="duration"
                        type="number"
                        placeholder="Duration (minutes)"
                        required
                        className="input-field"
                      />
                      <textarea
                        name="description"
                        placeholder="Description"
                        required
                        className="input-field"
                      />
                      <button type="submit" className="btn-primary w-full">
                        Add Activity
                      </button>
                    </form>
                  </TabPanel>

                  <TabPanel>
                    <form onSubmit={(e) => handleSubmit(e, 'sleep')} className="space-y-4">
                      <DateTimeInput
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date || new Date())}
                        label="Start Time"
                      />
                      <input
                        name="duration"
                        type="number"
                        placeholder="Duration (minutes)"
                        required
                        className="input-field"
                      />
                      <select name="quality" className="input-field">
                        <option value="good">Good</option>
                        <option value="fair">Fair</option>
                        <option value="poor">Poor</option>
                      </select>
                      <button type="submit" className="btn-primary w-full">
                        Add Sleep
                      </button>
                    </form>
                  </TabPanel>

                  <TabPanel>
                    <form onSubmit={(e) => handleSubmit(e, 'bowel')} className="space-y-4">
                      <DateTimeInput
                        selected={selectedDate}
                        onChange={(date) => setSelectedDate(date || new Date())}
                        label="Date & Time"
                      />
                      <select name="bowelType" required className="input-field">
                        <option value="wet">Wet</option>
                        <option value="solid">Solid</option>
                        <option value="both">Both</option>
                      </select>
                      <textarea
                        name="notes"
                        placeholder="Notes"
                        className="input-field"
                      />
                      <button type="submit" className="btn-primary w-full">
                        Add Diaper Change
                      </button>
                    </form>
                  </TabPanel>
                </Tab.Panels>
              </Tab.Group>
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-primary hover:bg-primary-dark text-white rounded-full p-4 shadow-lg transition-transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
      >
        <Plus className="h-6 w-6" />
      </button>
    </>
  );
};