import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

interface SessionCardProps {
  distance: number;
  steps: number;
  calories: number;
}

export default function SessionCard({ distance, steps, calories }: SessionCardProps) {
  return (
    <View style={styles.card}>
      <View style={styles.metric}>
        <Ionicons name="location-outline" size={24} color="#c6ff00" style={styles.icon} />
        <Text style={styles.value}>{(distance / 1000).toFixed(2)}</Text>
        <Text style={styles.label}>Kilometers</Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.metric}>
        <MaterialCommunityIcons name="shoe-print" size={24} color="#c6ff00" style={styles.icon} />
        <Text style={styles.value}>{steps}</Text>
        <Text style={styles.label}>Steps</Text>
      </View>
      
      <View style={styles.divider} />
      
      <View style={styles.metric}>
        <MaterialCommunityIcons name="fire" size={24} color="#ff6b00" style={styles.icon} />
        <Text style={styles.value}>{calories}</Text>
        <Text style={styles.label}>Calories</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#15181b',
    borderRadius: 20,
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 20,
  },
  metric: {
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginBottom: 8,
  },
  value: {
    color: '#fff',
    fontSize: 26,
    fontFamily: 'SANSSULEX',
    fontWeight: 'bold',
  },
  label: {
    color: '#666',
    fontSize: 12,
    fontFamily: 'Duitech',
    marginTop: 5,
  },
  divider: {
    width: 1,
    height: '60%',
    backgroundColor: '#25282c',
  },
});
