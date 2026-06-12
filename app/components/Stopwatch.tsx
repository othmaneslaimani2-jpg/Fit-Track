import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

interface StopwatchProps {
  timeInSeconds: number;
}

export default function Stopwatch({ timeInSeconds }: StopwatchProps) {
  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timeText}>{formatTime(timeInSeconds)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  timeText: {
    fontSize: 84,
    color: '#fff',
    fontFamily: 'SANSSULEX',
    fontWeight: 'bold',
  },
});
