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

const HISTORY_KEY = '@fit_track_history';

export const saveSession = async (session: SessionData) => {
  try {
    const existing = await AsyncStorage.getItem(HISTORY_KEY);
    let history: SessionData[] = existing ? JSON.parse(existing) : [];
    history = [session, ...history];
    await AsyncStorage.setItem(HISTORY_KEY, JSON.stringify(history));
  } catch (error) {
    console.error('Failed to save session:', error);
  }
};

export const getSessions = async (): Promise<SessionData[]> => {
  try {
    const existing = await AsyncStorage.getItem(HISTORY_KEY);
    if (existing) {
      const history: SessionData[] = JSON.parse(existing);
      return history.sort((a, b) => b.timestamp - a.timestamp);
    }
  } catch (error) {
    console.error('Failed to load sessions:', error);
  }
  return [];
};

export const clearHistory = async () => {
  try {
    await AsyncStorage.removeItem(HISTORY_KEY);
  } catch (error) {
    console.error('Failed to clear history:', error);
  }
};
