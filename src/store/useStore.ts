import { create } from 'zustand';
import { User, FeedingEntry, ActivityEntry, SleepEntry, BowelEntry } from '../types';

interface AppState {
  user: User | null;
  feedingEntries: FeedingEntry[];
  activityEntries: ActivityEntry[];
  sleepEntries: SleepEntry[];
  bowelEntries: BowelEntry[];
  setUser: (user: User | null) => void;
  addFeedingEntry: (entry: FeedingEntry) => void;
  addActivityEntry: (entry: ActivityEntry) => void;
  addSleepEntry: (entry: SleepEntry) => void;
  addBowelEntry: (entry: BowelEntry) => void;
  updateFeedingEntry: (id: string, entry: Partial<FeedingEntry>) => void;
  updateActivityEntry: (id: string, entry: Partial<ActivityEntry>) => void;
  updateSleepEntry: (id: string, entry: Partial<SleepEntry>) => void;
  updateBowelEntry: (id: string, entry: Partial<BowelEntry>) => void;
  deleteFeedingEntry: (id: string) => void;
  deleteActivityEntry: (id: string) => void;
  deleteSleepEntry: (id: string) => void;
  deleteBowelEntry: (id: string) => void;
}

export const useStore = create<AppState>((set) => ({
  user: null,
  feedingEntries: [],
  activityEntries: [],
  sleepEntries: [],
  bowelEntries: [],
  
  setUser: (user) => set({ user }),
  
  addFeedingEntry: (entry) => 
    set((state) => ({ feedingEntries: [...state.feedingEntries, entry] })),
  
  addActivityEntry: (entry) =>
    set((state) => ({ activityEntries: [...state.activityEntries, entry] })),
  
  addSleepEntry: (entry) =>
    set((state) => ({ sleepEntries: [...state.sleepEntries, entry] })),
  
  addBowelEntry: (entry) =>
    set((state) => ({ bowelEntries: [...state.bowelEntries, entry] })),

  updateFeedingEntry: (id, updatedEntry) =>
    set((state) => ({
      feedingEntries: state.feedingEntries.map((entry) =>
        entry.id === id ? { ...entry, ...updatedEntry } : entry
      ),
    })),

  updateActivityEntry: (id, updatedEntry) =>
    set((state) => ({
      activityEntries: state.activityEntries.map((entry) =>
        entry.id === id ? { ...entry, ...updatedEntry } : entry
      ),
    })),

  updateSleepEntry: (id, updatedEntry) =>
    set((state) => ({
      sleepEntries: state.sleepEntries.map((entry) =>
        entry.id === id ? { ...entry, ...updatedEntry } : entry
      ),
    })),

  updateBowelEntry: (id, updatedEntry) =>
    set((state) => ({
      bowelEntries: state.bowelEntries.map((entry) =>
        entry.id === id ? { ...entry, ...updatedEntry } : entry
      ),
    })),

  deleteFeedingEntry: (id) =>
    set((state) => ({
      feedingEntries: state.feedingEntries.filter((entry) => entry.id !== id),
    })),

  deleteActivityEntry: (id) =>
    set((state) => ({
      activityEntries: state.activityEntries.filter((entry) => entry.id !== id),
    })),

  deleteSleepEntry: (id) =>
    set((state) => ({
      sleepEntries: state.sleepEntries.filter((entry) => entry.id !== id),
    })),

  deleteBowelEntry: (id) =>
    set((state) => ({
      bowelEntries: state.bowelEntries.filter((entry) => entry.id !== id),
    })),
}));