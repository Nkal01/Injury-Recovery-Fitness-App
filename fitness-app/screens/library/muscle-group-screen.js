import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { ExerciseContext } from '../../services/exercise-context';

const muscleGroups = [
    'Quadriceps',
    'Hamstrings',
    'Hip Flexors/Abductors',
    'Glutes',
    'Calves',
    'Any'
  ];

  const MuscleGroupScreen = ({ navigation }) => {
    const { setMuscleGroup } = useContext(ExerciseContext);

    const navigateToExercises = (group) => {
        if (group === 'Hip Flexors/Abductors') {
            setMuscleGroup(['Hip Flexors', 'Hip Abductors'].join(','));
        } else if (group === 'Any') {
            setMuscleGroup('');
        } else {
            setMuscleGroup(group);
        }
        navigation.navigate('Exercises');
    };

    const renderItem = ({ item }) => (
        <TouchableOpacity style={styles.button} onPress={() => navigateToExercises(item)}>
        <Text style={styles.buttonText}>{item}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
        <Text style={styles.title}>Choose Muscle Group</Text>
        <FlatList
            data={muscleGroups}
            keyExtractor={(item) => item}
            renderItem={renderItem}
            numColumns={1}
        />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
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
        marginVertical: 5,
    },
    buttonText: {
        fontSize: 20,
        color: 'black',
    },
});

export default MuscleGroupScreen;
