import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { getWorkoutPlan } from '../services/api';
import { useUser } from '../services/user-context';

const HomeScreen = ({ navigation }) => {
    const { user } = useUser();

    const [workoutPlan, setWorkoutPlan] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchWorkoutPlan = async (username) => {
        try {
        const data = await getWorkoutPlan(username);
        setWorkoutPlan(data.plan);
        setLoading(false);
        } catch (err) {
        setError(err);
        setLoading(false);
        }
    };

    useEffect(() => {
        const username = user.username; // Replace with actual username or pass as a prop
        fetchWorkoutPlan(username);
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>Error fetching workout plan: {error.message}</Text>;
    }

    const handleDayPress = (day) => {
        Alert.alert(day, workoutPlan[day].join('\n'));
    };

    if (user.hasPlan) {
        return (
            <ScrollView style={styles.container}>
                {Object.keys(workoutPlan).map((day, index) => (
                    <TouchableOpacity key={index} style={styles.dayBox} onPress={() => handleDayPress(day)}>
                    <Text style={styles.dayTitle}>{day}</Text>
                    {workoutPlan[day].map((exercise, i) => (
                        <Text key={i} style={styles.exerciseText}>{exercise}</Text>
                    ))}
                    </TouchableOpacity>
                ))}
            </ScrollView>
        );
    } else {
        return (
            <View style={styles.container}>
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
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 25
    },
    containerCalendar: {
        flex: 1,
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
        borderColor: '#ddd',
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
});

export default HomeScreen;