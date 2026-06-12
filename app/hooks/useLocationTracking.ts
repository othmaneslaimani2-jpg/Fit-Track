import { useState, useEffect, useCallback, useRef } from 'react';
import * as Location from 'expo-location';

function calculateDistanceInMeters(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const EARTH_RADIUS_IN_METERS = 6371e3;
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_IN_METERS * c;
}

export function useLocationTracking() {
  const [isTracking, setIsTracking] = useState(false);
  const [distance, setDistance] = useState(0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [currentLocation, setCurrentLocation] = useState<Location.LocationObject | null>(null);
  const [routeCoordinates, setRouteCoordinates] = useState<{latitude: number, longitude: number}[]>([]);
  
  const subscriptionRef = useRef<Location.LocationSubscription | null>(null);
  const lastLocationRef = useRef<Location.LocationObject | null>(null);

  const startTracking = useCallback(async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      setErrorMsg(null);
      setDistance(0);
      setCurrentLocation(null);
      setRouteCoordinates([]);
      lastLocationRef.current = null;
      setIsTracking(true);

      subscriptionRef.current = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High, 
          timeInterval: 2000,
          distanceInterval: 1,
        },
        (newLocation) => {
          setCurrentLocation(newLocation);
          const newCoord = {
            latitude: newLocation.coords.latitude,
            longitude: newLocation.coords.longitude
          };

          if (lastLocationRef.current) {
            const distanceMoved = calculateDistanceInMeters(
              lastLocationRef.current.coords.latitude,
              lastLocationRef.current.coords.longitude,
              newLocation.coords.latitude,
              newLocation.coords.longitude
            );
            
            setDistance((prevTotal) => prevTotal + distanceMoved);
          }
          
          setRouteCoordinates((prev) => [...prev, newCoord]);
          lastLocationRef.current = newLocation;
        }
      );

    } catch (err) {
      console.error(err);
      setErrorMsg('Failed to start location tracking');
      setIsTracking(false);
    }
  }, []);

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
    distance,
    currentLocation,
    routeCoordinates,
    errorMsg
  };
}
