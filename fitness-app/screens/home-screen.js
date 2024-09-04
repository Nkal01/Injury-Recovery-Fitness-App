import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { getWorkoutPlan } from '../services/api';
import { useUser } from '../services/user-context';

const HomeScreen = ({ navigation }) => {
    const { user } = useUser();
    const [workoutPlan, setWorkoutPlan] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Function to fetch workout plan based on username
    const fetchWorkoutPlan = async (username) => {
        try {
            const response = await getWorkoutPlan(username);
            console.log('API Response:', response); // Debugging the response

            if (response && response.plan) {
                setWorkoutPlan(response.plan);
            } else {
                console.log('No plan data available');
                setWorkoutPlan({});
            }
            setLoading(false);
        } catch (err) {
            console.error('Error fetching workout plan:', err);
            setError(err);
            setLoading(false);
        }
    };

    // Fetch workout plan when component mounts or username changes
    useEffect(() => {
        if (user && user.username) {
            fetchWorkoutPlan(user.username);
        }
    }, [user]);

    // Render different UI states based on data and loading status
    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>Error fetching workout plan: {error.message}</Text>;
    }

    const handleDayPress = (day) => {
        navigation.navigate('PlanDayExercises', { exercises: workoutPlan[day] });
    };

    if (user.has_plan){
        return (
            <ScrollView style={styles.container}>
                {Object.keys(workoutPlan).map((day, index) => (
                    <TouchableOpacity key={index} style={styles.dayBox} onPress={() => handleDayPress(day)}>
                        <View style={styles.dayTitleContainer}>
                            <Text style={styles.dayTitle}>{day}</Text>
                        </View>
                        {workoutPlan[day].map((exercise, i) => (
                            <View key={i}>
                                <Text style={styles.exerciseText}>{exercise}</Text>
                                {i < workoutPlan[day].length - 1 && (
                                    <View style={styles.separator} />
                                )}
                            </View>
                        ))}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    } else {
        return (
            <View style={styles.containerNoPlan}>
                <Text style={styles.textStyle}>No fitness plan available</Text>
                <TouchableOpacity
                    style={styles.button}
                    onPress={() => navigation.navigate('UserInfo')}
                >
                    <Text style={styles.buttonText}>Generate a fitness plan</Text>
                </TouchableOpacity>
            </View>
        );
    }
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
      },
    containerNoPlan: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 25
    },
      dayBox: {
        marginBottom: 16,
        padding: 16,
        backgroundColor: '#f5f5f5',
        borderRadius: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        borderWidth: 1,
        borderColor: 'black',
      },
    dayTitleContainer: {
        backgroundColor: '#f5f5f5',
        alignSelf: 'center'
    },
    button: {
        backgroundColor: '#3c3e56',
        paddingVertical: 20,
        paddingHorizontal: 20,
        borderRadius: 25,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
    },
    textStyle: {
        fontSize: 28,
        paddingBottom: 10,
    },
    dayTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 8,
    },
    exerciseText: {
        fontSize: 16,
        color: '#333',
    },
    separator: {
        height: 1,
        backgroundColor: 'black',
        marginVertical: 5,
    },
});

export default HomeScreen;