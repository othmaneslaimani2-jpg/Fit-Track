import { useState, useEffect, useCallback } from 'react';
import * as Location from 'expo-location';

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3;
  const toRadians = (deg: number) => (deg * Math.PI) / 180;
  
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function useLocationTracking() {
  const [locations, setLocations] = useState<Location.LocationObject[]>([]);
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);
  const [isTracking, setIsTracking] = useState(false);
  const [distance, setDistance] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [subscription, setSubscription] = useState<Location.LocationSubscription | null>(null);

  const startTracking = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      setErrorMsg(null);
      setIsTracking(true);
      setLocations([]);
      setDistance(0);

      const sub = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High, 
          timeInterval: 2000,
          distanceInterval: 1,
        },
        (newLocation) => {
          setCurrentLocation(newLocation);
          
          setLocations((prevLocations) => {
            if (prevLocations.length > 0) {
              const lastLoc = prevLocations[prevLocations.length - 1];
              const distToAdd = calculateDistance(
                lastLoc.coords.latitude,
                lastLoc.coords.longitude,
                newLocation.coords.latitude,
                newLocation.coords.longitude
              );
              setDistance((prevDist) => prevDist + distToAdd);
            }
            return [...prevLocations, newLocation];
          });
        }
      );

      setSubscription(sub);
    } catch (err) {
      setErrorMsg('Failed to start location tracking');
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
    currentLocation,
    locations,
    distance,
    errorMsg
  };
}
