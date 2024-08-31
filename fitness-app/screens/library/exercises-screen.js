import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { ExerciseContext } from '../../services/exercise-context';
import { getExercisesByTypeAndMuscleGroup } from '../../services/api';

const ExercisesScreen = () => {
  const { exerciseType, muscleGroup } = useContext(ExerciseContext);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await getExercisesByTypeAndMuscleGroup(exerciseType, muscleGroup);
        setExercises(response.data);
      } catch (error) {
        console.error("Failed to fetch exercises:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [exerciseType, muscleGroup]);

  const renderItem = ({ item }) => (
    <TouchableOpacity style={styles.exerciseCard}>
      {item.image ? (
        <Image
          source={{ uri: item.image }}
          style={styles.exerciseImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.placeholderImage} />
      )}
      <Text style={styles.exerciseName}>{item.name}</Text>
      <Text style={styles.exerciseDescription}>{item.description}</Text>
      <Text style={styles.exerciseDetails}>
        {item.equipment && item.equipment !== "nan" ? `Equipment needed: ${item.equipment}` : 'Equipment needed: None'}
      </Text>
    </TouchableOpacity>
  );

  const muscleGroupText = Array.isArray(muscleGroup)
    ? muscleGroup.length === 2
      ? muscleGroup.join(' and ')
      : muscleGroup[0]
    : muscleGroup;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {exerciseType} Exercises for {muscleGroupText}
      </Text>
      {loading ? (
        <Text>Loading...</Text>
      ) : exercises.length === 0 ? (
        <Text>No exercises found.</Text>
      ) : (
        <FlatList
          data={exercises}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  list: {
    paddingBottom: 20,
  },
  exerciseCard: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 10,
    elevation: 2,
  },
  exerciseImage: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 10,
  },
  placeholderImage: {
    width: '100%',
    height: 200,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    marginBottom: 10,
  },
  exerciseName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  exerciseDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  exerciseDetails: {
    fontSize: 12,
    color: 'gray',
  },
});

export default ExercisesScreen;
