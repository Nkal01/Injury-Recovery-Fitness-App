import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { getWorkoutPlan } from '../services/api';


const CalendarScreen = () => {
    /*const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1;
    const day = today.getDate();
    const dateString = `${year}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;

    return (
        <View style={styles.container}>
            <Calendar
                markedDates={{
                    [dateString]: { selected: true, marked: true, selectedColor: '#e3a89e', selectedTextColor: 'black' },
                }}
                style={styles.calendar}
            />
        </View>
    );*/
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
};

const styles = StyleSheet.create({
    /*container: {
        flex: 1,
    },
    calendar: {
        width: '100%', // Adjust the width as needed
    },*/
    container: {
        flex: 1,
        padding: 16,
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

export default CalendarScreen;