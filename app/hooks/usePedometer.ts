import { useState, useEffect, useCallback } from 'react';
import { Pedometer } from 'expo-sensors';

export function useStepTracking() {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState<boolean | null>(null);
  const [currentStepCount, setCurrentStepCount] = useState(0);
  const [isTracking, setIsTracking] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<any>(null);

  const startTracking = useCallback(async () => {
    try {
      const isAvailable = await Pedometer.isAvailableAsync();
      setIsPedometerAvailable(isAvailable);

      if (!isAvailable) {
        setErrorMsg('Pedometer is not available on this device');
        return;
      }

      const { status } = await Pedometer.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access step count was denied');
        return;
      }

      setErrorMsg(null);
      setIsTracking(true);
      setCurrentStepCount(0); 

      const sub = Pedometer.watchStepCount((result) => {
        setCurrentStepCount(result.steps);
      });

      setSubscription(sub);
    } catch (err) {
      setErrorMsg('Failed to start tracking steps');
      setIsTracking(false);
    }
  }, []);

  const stopTracking = useCallback(() => {
    if (subscription) {
      subscription.remove();
      setSubscription(null);
    }
    setIsTracking(false);
  }, [subscription]);

  useEffect(() => {
    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [subscription]);

  return {
    startTracking,
    stopTracking,
    isTracking,
    steps: currentStepCount,
    isPedometerAvailable,
    errorMsg
  };
}
