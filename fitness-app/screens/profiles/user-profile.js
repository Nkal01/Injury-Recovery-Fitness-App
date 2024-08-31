import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image  } from 'react-native';
import { useUser } from '../../services/user-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const UserProfileScreen = () => {
  const { user } = useUser();

  return (
    <View style={styles.container}>
      
      <View style={styles.imageContainer}>
        <MaterialCommunityIcons name="account-circle" size={96} />
        <Text style={styles.username}>{user.username}</Text>
      </View>
      
      {user.email ? (
        <>
          <Text style={styles.label}>Email:</Text>
          <Text style={styles.value}>{user.email}</Text>
        </>
      ) : null}
      
      {user.sex ? (
        <>
          <Text style={styles.label}>Sex:</Text>
          <Text style={styles.value}>{user.sex}</Text>
        </>
      ) : null}
      
      {user.height ? (
        <>
          <Text style={styles.label}>Height:</Text>
          <Text style={styles.value}>{user.height} cm</Text>
        </>
      ) : null}
      
      {user.weight ? (
        <>
          <Text style={styles.label}>Weight:</Text>
          <Text style={styles.value}>{user.weight} kg</Text>
        </>
      ) : null}
      
      {user.bmi ? (
        <>
          <Text style={styles.label}>BMI:</Text>
          <Text style={styles.value}>{user.bmi}</Text>
        </>
      ) : null}
      
      {user.fitness_level ? (
        <>
          <Text style={styles.label}>Fitness Level:</Text>
          <Text style={styles.value}>{user.fitness_level}</Text>
        </>
      ) : null}
      
      {user.goals ? (
        <>
          <Text style={styles.label}>Goals:</Text>
          <Text style={styles.value}>{user.goals}</Text>
        </>
      ) : null}
      
      {user.injuries ? (
        <>
          <Text style={styles.label}>Injuries:</Text>
          <Text style={styles.value}>{user.injuries}</Text>
        </>
      ) : null}
      
      {user.preferred_workout_time ? (
        <>
          <Text style={styles.label}>Preferred Workout Time:</Text>
          <Text style={styles.value}>{user.preferred_workout_time}</Text>
        </>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  username: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10,
  },
  value: {
    fontSize: 16,
    marginBottom: 10,
  },
});

export default UserProfileScreen;