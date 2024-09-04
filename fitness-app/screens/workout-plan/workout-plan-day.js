import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, FlatList, TouchableOpacity, Image } from 'react-native';
import { getExercisesByName } from '../../services/api';
import { useUser } from '../../services/user-context';

const PlanDayExercises = ({ route }) => {
    const { exercises } = route.params; // Array of exercise names for the day
    const [exerciseDetails, setExerciseDetails] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const { user } = useUser();

    useEffect(() => {
        const fetchExercises = async () => {
            try {
                // Fetch all exercises from the API
                const response = await getExercisesByName('');
                const allExercises = response.data;

                // Filter exercises that match the names in the exercises array
                const filteredExercises = allExercises.filter(exercise => exercises.includes(exercise.name));

                setExerciseDetails(filteredExercises);
            } catch (err) {
                setError(err);
            } finally {
                setLoading(false);
            }
        };

        fetchExercises();
    }, [exercises]);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>Error fetching exercises: {error.message}</Text>;
    }
    

    const renderItem = ({ item }) => {
        let repetition;
        let user_week = user.plan_week;
    
        // Determine the repetition based on the user's current week
        if (user_week == 1) {
            repetition = item.week1;
        } else if (user_week == 2) {
            repetition = item.week2;
        } else if (user_week == 3) {
            repetition = item.week3;
        }
    
        return (
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
                <Text style={styles.exerciseRepetition}>{repetition}</Text>
                <Text style={styles.exerciseDescription}>{item.description}</Text>
                <Text style={styles.exerciseDetails}>
                    {item.equipment && item.equipment !== "nan"
                        ? `Equipment needed: ${item.equipment}`
                        : 'Equipment needed: None'}
                </Text>
            </TouchableOpacity>
        );
    };

    return (
        <FlatList
            data={exerciseDetails}
            renderItem={renderItem}
            keyExtractor={(item) => item.name}
        />
    );
};

const styles = StyleSheet.create({
    exerciseCard: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        marginHorizontal: 10,
        marginVertical: 10,
        borderColor: 'black',
    },
    exerciseImage: {
        width: '100%',
        height: 400,
        borderRadius: 8,
    },
    placeholderImage: {
        width: '100%',
        height: 200,
        backgroundColor: '#e0e0e0',
        borderRadius: 8,
    },
    exerciseName: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
    },
    exerciseDescription: {
        fontSize: 16,
        marginVertical: 4,
    },
    exerciseDetails: {
        fontSize: 14,
        color: '#333',
    },
    exerciseRepetition: {
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default PlanDayExercises;
