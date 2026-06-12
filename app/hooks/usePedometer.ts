import { useState, useEffect, useCallback, useRef } from 'react';
import { Pedometer } from 'expo-sensors';
import { useActivityStore } from '@/app/store/activityStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useStepTracking() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState<boolean | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const subscriptionRef = useRef<any>(null);

  const { totalSteps, resetSteps } = useActivityStore();

  const checkDailyReset = async () => {
    try {
      const todayDate = new Date().toISOString().split('T')[0];
      const savedDate = await AsyncStorage.getItem('lastSavedDate');
      if (savedDate !== todayDate) {
        resetSteps();
        await AsyncStorage.setItem('lastSavedDate', todayDate);
      }
    } catch (e) {
      console.error('Failed to check daily reset', e);
    }
  };

  const startTracking = useCallback(async () => {
    try {
      if (subscriptionRef.current) {
        return;
      }

      await checkDailyReset();

      if (__DEV__) {
        console.log("DEV MODE: Using mock pedometer");
        const mockInterval = setInterval(() => {
          useActivityStore.getState().addSteps(2);
        }, 1000);

        subscriptionRef.current = {
          remove: () => clearInterval(mockInterval)
        };
        setIsTracking(true);
        return;
      }

      const isAvailable = await Pedometer.isAvailableAsync();
      setIsPedometerAvailable(isAvailable);

      if (!isAvailable) {
        setErrorMsg('Pedometer is not available on this device. Using mock steps.');
        setIsTracking(true);
        
        const mockInterval = setInterval(() => {
          useActivityStore.getState().addSteps(1);
        }, 1000);

        subscriptionRef.current = {
          remove: () => clearInterval(mockInterval)
        };
        return;
      }

      const { status } = await Pedometer.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access step count was denied');
        return;
      }

      setErrorMsg(null);
      setIsTracking(true);

      let lastResultSteps = 0;

      const sub = Pedometer.watchStepCount((result) => {
        const increment = result.steps - lastResultSteps;
        lastResultSteps = result.steps;

        if (increment > 0) {
          useActivityStore.getState().addSteps(increment);
        }
      });

      subscriptionRef.current = sub;
    } catch (err) {
      setErrorMsg('Failed to start tracking steps');
      setIsTracking(false);
    }
  }, [resetSteps]);

  const stopTracking = useCallback(() => {
    if (subscriptionRef.current) {
      subscriptionRef.current.remove();
      subscriptionRef.current = null;
    }
    setIsTracking(false);
  }, []);

  useEffect(() => {
    return () => {
      if (subscriptionRef.current) {
        subscriptionRef.current.remove();
      }
    };
  }, []);

  return {
    startTracking,
    stopTracking,
    isTracking,
    steps: totalSteps,
    totalSteps,
    isPedometerAvailable,
    errorMsg
  };
}
