import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ActivityState {
  totalSteps: number;
  dailyGoal: number;
  addSteps: (steps: number) => void;
  resetSteps: () => void;
  setDailyGoal: (goal: number) => void;
}

export const useActivityStore = create<ActivityState>()(
  persist(
    (set) => ({
      totalSteps: 0,
      dailyGoal: 10000,
      
      addSteps: (steps) => 
        set((state) => ({ totalSteps: state.totalSteps + steps })),
        
      resetSteps: () => 
        set({ totalSteps: 0 }),
        
      setDailyGoal: (goal) => 
        set({ dailyGoal: goal }),
    }),
    {
      name: 'activity-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
