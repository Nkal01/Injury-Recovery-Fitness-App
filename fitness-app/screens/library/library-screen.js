import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { ExerciseContext } from '../../services/exercise-context';

const HomeScreen = ({ navigation }) => {
  const { exerciseType, setExerciseType } = useContext(ExerciseContext);
  const scaleFlex = new Animated.Value(1);
  const scaleStrength = new Animated.Value(1);
  const scaleAny = new Animated.Value(1);

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

      <Animated.View style={{ transform: [{ scale: scaleStrength }] }}>
        <TouchableOpacity
          style={styles.button}
          onPressIn={() => handlePressIn(scaleStrength)}
          onPressOut={() => handlePressOut(scaleStrength)}
          onPress={() => navigateToMuscleGroup('Strength')}
        >
          <Text style={styles.buttonText}>Strength</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={{ transform: [{ scale: scaleFlex }] }}>
        <TouchableOpacity
          style={styles.button}
          onPressIn={() => handlePressIn(scaleFlex)}
          onPressOut={() => handlePressOut(scaleFlex)}
          onPress={() => navigateToMuscleGroup('Flexibility')}
        >
          <Text style={styles.buttonText}>Flexibility</Text>
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={{ transform: [{ scale: scaleAny }] }}>
        <TouchableOpacity
          style={styles.button}
          onPressIn={() => handlePressIn(scaleAny)}
          onPressOut={() => handlePressOut(scaleAny)}
          onPress={() => navigateToMuscleGroup('')}
        >
          <Text style={styles.buttonText}>Any</Text>
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
    textAlign: 'center',
    fontWeight: 'bold',
  },
  button: {
    backgroundColor: 'white',
    borderRadius: 25,
    borderWidth: 2,
    borderColor: 'black',
    paddingVertical: 25,
    width: 240,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  buttonText: {
    fontSize: 26,
    color: 'black',
    textAlign: 'center',
  },
});

export default HomeScreen;
