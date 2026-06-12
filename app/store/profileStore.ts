import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface ProfileState {
  profileImage: string | null;
  userName: string;
  setProfileImage: (uri: string | null) => void;
  setUserName: (name: string) => void;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set) => ({
      profileImage: null,
      userName: 'OTHMANE',
      
      setProfileImage: (uri) => 
        set({ profileImage: uri }),
        
      setUserName: (name) => 
        set({ userName: name }),
    }),
    {
      name: 'profile-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
