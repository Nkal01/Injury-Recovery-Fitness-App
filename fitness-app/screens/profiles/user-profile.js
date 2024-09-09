import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useUser } from '../../services/user-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const UserProfileScreen = () => {
  const { user } = useUser();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <MaterialCommunityIcons name="account-circle" size={96} color="#3c3e56" />
        <Text style={styles.username}>{user.username}</Text>
      </View>
      
      <View style={styles.infoContainer}>
        {user.email && (
          <View style={styles.infoItem}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>
        )}
        
        {user.sex && (
          <View style={styles.infoItem}>
            <Text style={styles.label}>Sex:</Text>
            <Text style={styles.value}>{user.sex}</Text>
          </View>
        )}
        
        {user.height && (
          <View style={styles.infoItem}>
            <Text style={styles.label}>Height:</Text>
            <Text style={styles.value}>{user.height} cm</Text>
          </View>
        )}
        
        {user.weight && (
          <View style={styles.infoItem}>
            <Text style={styles.label}>Weight:</Text>
            <Text style={styles.value}>{user.weight} kg</Text>
          </View>
        )}
        
        {user.bmi && (
          <View style={styles.infoItem}>
            <Text style={styles.label}>BMI:</Text>
            <Text style={styles.value}>{user.bmi}</Text>
          </View>
        )}
        
        {user.fitness_level && (
          <View style={styles.infoItem}>
            <Text style={styles.label}>Fitness Level:</Text>
            <Text style={styles.value}>{user.fitness_level}</Text>
          </View>
        )}
        
        {user.injuries && (
          <View style={styles.infoItem}>
            <Text style={styles.label}>Injuries:</Text>
            <Text style={styles.value}>{user.injuries}</Text>
          </View>
        )}
        
        {user.preferred_workout_time && (
          <View style={styles.infoItem}>
            <Text style={styles.label}>Preferred Workout Time:</Text>
            <Text style={styles.value}>{user.preferred_workout_time}</Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3c3e56',
    marginTop: 10,
  },
  infoContainer: {
    width: '100%',
    alignItems: 'center',
  },
  infoItem: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
});

export default UserProfileScreen;
