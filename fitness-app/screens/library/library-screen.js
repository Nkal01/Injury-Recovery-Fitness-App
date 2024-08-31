import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { ExerciseContext } from '../../services/exercise-context';

const HomeScreen = ({ navigation }) => {
  const { exerciseType, setExerciseType } = useContext(ExerciseContext);
  const scaleFlex = new Animated.Value(1);
  const scaleStrength = new Animated.Value(1);

  const handlePressIn = (scale) => {
    Animated.spring(scale, {
      toValue: 1.1,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = (scale) => {
    Animated.spring(scale, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const navigateToMuscleGroup = (type) => {
    setExerciseType(type);
    navigation.navigate('MuscleGroup');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Exercise Type</Text>
      <Animated.View style={{ transform: [{ scale: scaleFlex }] }}>
        <TouchableOpacity
          style={styles.button}
          onPressIn={() => handlePressIn(scaleFlex)}
          onPressOut={() => handlePressOut(scaleFlex)}
          onPress={() => navigateToMuscleGroup('Flexibility')}
        >
          <Text style={styles.buttonText}>Flexibility Exercises</Text>
        </TouchableOpacity>
      </Animated.View>
      <Animated.View style={{ transform: [{ scale: scaleStrength }] }}>
        <TouchableOpacity
          style={styles.button}
          onPressIn={() => handlePressIn(scaleStrength)}
          onPressOut={() => handlePressOut(scaleStrength)}
          onPress={() => navigateToMuscleGroup('Strength')}
        >
          <Text style={styles.buttonText}>Strength Exercises</Text>
        </TouchableOpacity>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 25,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'black',
    paddingVertical: 25,
    paddingHorizontal: 50,
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 26,
    color: 'black',
  },
});

export default HomeScreen;