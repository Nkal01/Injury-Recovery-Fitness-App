import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Dimensions } from 'react-native';
import { ExerciseContext } from '../../services/exercise-context';

const muscleGroups = [
    'Quadriceps',
    'Hamstrings',
    'Hip Flexors/Abductors',
    'Glutes',
    'Calves',
  ];

const MuscleGroupScreen = ({ navigation }) => {
    const { setMuscleGroup } = useContext(ExerciseContext);

    const navigateToExercises = (group) => {
        if (group === 'Hip Flexors/Abductors') {
            setMuscleGroup(['Hip Flexors', 'Hip Abductors'].join(','));
        } else {
            setMuscleGroup(group); // Set as a single string
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
            numColumns={2}
            columnWrapperStyle={styles.row}
        />
        </View>
    );
};

const { width } = Dimensions.get('window');
const buttonWidth = (width - 60) / 2;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        color: '#333',
    },
    row: {
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    button: {
        backgroundColor: 'white',
        borderRadius: 25,
        borderWidth: 2,
        borderColor: 'black',
        paddingVertical: 15,
        paddingHorizontal: 10,
        width: buttonWidth,
        alignItems: 'center',
        justifyContent: 'center', 
    },
    buttonText: {
        fontSize: 18,
        color: 'black',
    },
});

export default MuscleGroupScreen;
