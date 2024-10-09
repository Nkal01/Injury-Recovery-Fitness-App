import React, { useContext, useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, TextInput, Button } from 'react-native';
import { ExerciseContext } from '../../services/exercise-context';
import { getExercisesByTypeAndMuscleGroup } from '../../services/api';

const ExercisesScreen = () => {
  const { exerciseType, muscleGroup } = useContext(ExerciseContext);
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedExercise, setSelectedExercise] = useState(null);
  const [searchQuery, setSearchQuery] = useState(''); // State to store the search query
  const [filteredExercises, setFilteredExercises] = useState([]); // State for filtered exercises

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await getExercisesByTypeAndMuscleGroup(exerciseType, muscleGroup);
        setExercises(response.data);
        setFilteredExercises(response.data);
      } catch (error) {
        console.error('Failed to fetch exercises:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchExercises();
  }, [exerciseType, muscleGroup]);

  const handleSearch = () => {
    const filtered = exercises.filter((exercise) =>
      exercise.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredExercises(filtered);
  };

  const renderItem = ({ item }) => {
    if (selectedExercise?.id !== item.id) {
      return (
        <TouchableOpacity
          style={styles.exerciseBox}
          onPress={() => setSelectedExercise(item)}
        >
          <Text style={styles.exerciseName}>{item.name}</Text>
          <Text style={styles.exerciseDetails}>Type: {item.type}</Text>
          <Text style={styles.exerciseDetails}>Muscle Group: {item.muscle_group}</Text>
          <Text style={styles.exerciseDetails}>
            {item.equipment && item.equipment !== 'nan'
              ? `Equipment: ${item.equipment}`
              : 'Equipment: None'}
          </Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        style={styles.exerciseCard}
        onPress={() => setSelectedExercise(null)}
      >
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
          {item.equipment && item.equipment !== 'nan'
            ? `Equipment needed: ${item.equipment}`
            : 'Equipment needed: None'}
        </Text>
      </TouchableOpacity>
    );
  };

  const muscleGroupText = Array.isArray(muscleGroup)
    ? muscleGroup.length === 2
      ? muscleGroup.join(' and ')
      : muscleGroup[0]
    : muscleGroup;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {muscleGroupText.trim()
          ? `${exerciseType} Exercises for ${muscleGroupText}`
          : 'All exercises'}
      </Text>

      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search exercises..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <Text>Loading...</Text>
      ) : filteredExercises.length === 0 ? (
        <Text>No exercises found.</Text>
      ) : (
        <FlatList
          data={filteredExercises}
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
  exerciseBox: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    elevation: 2,
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  exerciseDescription: {
    fontSize: 14,
    marginBottom: 10,
  },
  exerciseDetails: {
    fontSize: 16,
    color: 'gray',
  },
  searchContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginRight: 10,
    backgroundColor: '#fff',
  },
  searchButton: {
    backgroundColor: '#ab92b3',
    padding: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  
});

export default ExercisesScreen;
