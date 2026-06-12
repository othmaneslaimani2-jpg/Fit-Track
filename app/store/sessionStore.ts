import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface SessionData {
  id: string;
  date: string;
  type: string;
  distance: string;
  calories: string;
  time: string;
  steps: string;
  timestamp: number;
}

interface SessionState {
  sessions: SessionData[];
  addSession: (session: SessionData) => void;
  clearSessions: () => void;
}

export const useSessionStore = create<SessionState>()(
  persist(
    (set) => ({
      sessions: [],
      
      addSession: (session) => 
        set((state) => ({ 
          sessions: [session, ...state.sessions].sort((a, b) => b.timestamp - a.timestamp) 
        })),
        
      clearSessions: () => 
        set({ sessions: [] }),
    }),
    {
      name: 'session-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
