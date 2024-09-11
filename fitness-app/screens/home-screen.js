import React, { useState, useEffect, useContext } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Alert, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Checkbox from 'expo-checkbox';
import { Picker } from '@react-native-picker/picker';
import { getWorkoutPlan, updateCompletedDays, updatePlan } from '../services/api';
import { UserContext } from '../services/user-context';

const HomeScreen = ({ navigation }) => {
    const { user, setUser } = useContext(UserContext);
    const [workoutPlan, setWorkoutPlan] = useState({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [checkedDays, setCheckedDays] = useState([]);
    const [allChecked, setAllChecked] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [feedback, setFeedback] = useState({
        challengingButDoable: false,
        struggled: false,
        comfortable: false,
        lowerVolume: false
    });
    const [workoutsPerWeek, setWorkoutsPerWeek] = useState('3');


    const fetchWorkoutPlan = async (username) => {
        try {
            const response = await getWorkoutPlan(username);

            if (response && response.plan) {
                setWorkoutPlan(response.plan);
                if (response.completed_days) {
                    setCheckedDays(response.completed_days);
                    console.log('Completed Days:', response.completed_days);

                    const isAllChecked = response.completed_days.every(day => day === 1);
                    setAllChecked(isAllChecked);
                }
            } else {
                console.log('No plan data available');
                setWorkoutPlan([]);
                setCheckedDays([]);
                setAllChecked(false);
            }
            setLoading(false);
        } catch (err) {
            console.error('Error fetching workout plan:', err);
            setError(err);
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user && user.username) {
            fetchWorkoutPlan(user.username);
        }
    }, [user]);

    const toggleChecked = async (dayIndex) => {
        const updatedCheckedDays = [...checkedDays];
        updatedCheckedDays[dayIndex] = updatedCheckedDays[dayIndex] === 1 ? 0 : 1;

        setCheckedDays(updatedCheckedDays);

        const isAllChecked = updatedCheckedDays.every(day => day === 1);
        setAllChecked(isAllChecked);

        try {
            await updateCompletedDays(user.username, updatedCheckedDays);
        } catch (error) {
            console.error("Error updating completed days:", error);
            Alert.alert('Error', 'There was a problem updating your progress. Please try again.');
        }
    };

    const handleFeedbackChange = (feedbackType) => {
        setFeedback({
            challengingButDoable: feedbackType === 'challengingButDoable',
            lowerVolume: feedbackType === 'lowerVolume',
            struggled: feedbackType === 'struggled',
            comfortable: feedbackType === 'comfortable'
        });
    };

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" />;
    }

    if (error) {
        return <Text>Error fetching workout plan: {error.message}</Text>;
    }

    const handleDayPress = (day) => {
        navigation.navigate('PlanDayExercises', { exercises: workoutPlan[day] });
    };

    const handleProceed = () => {
        console.log(user);
        setModalVisible(true);
    };

    const handleModalSubmit = async () => {
        let plan_week = user.plan_week;
        let fitness_level = user.fitness_level;
        let preferred_workout_times = `${workoutsPerWeek}`;
        let completedDays = checkedDays;

        let sex = user.sex;
        let age = user.age;
        let height = user.height;
        let weight = user.weight;
        let injuries = user.injuries;
        let available_equipment = user.available_equipment;
        let has_plan = user.has_plan;
    
        if (feedback.comfortable) {
            plan_week += 1;
            if (user.plan_week === 3) {
                if (user.fitness_level === 'Beginner') {
                    fitness_level = 'Intermediate';
                } else if (user.fitness_level === 'Intermediate') {
                    fitness_level = 'Advanced';
                }
                plan_week = 1;
            }
        } else if (feedback.lowerVolume) {
            plan_week -= 1;
            if (user.plan_week === 1) {
                if (user.fitness_level === 'Advanced') {
                    fitness_level = 'Intermediate';
                } else if (user.fitness_level === 'Intermediate') {
                    fitness_level = 'Beginner';
                }
                plan_week = 3;
            }
        } else if (feedback.struggled) {
            if (user.fitness_level === 'Advanced') {
                fitness_level = 'Intermediate';
            } else if (user.fitness_level === 'Intermediate') {
                fitness_level = 'Beginner';
            }
            plan_week = 3;
        }

        completedDays.fill(0)
    
        const updatedUser = {
            ...user,
            sex,
            age,
            height,
            weight,
            fitness_level,
            injuries,
            preferred_workout_times,
            available_equipment,
            has_plan,
            plan_week,
        };

        try {
            await updatePlan(user.username, age, injuries, available_equipment, user.height, user.weight, fitness_level, preferred_workout_times, plan_week, completedDays);
            
            setUser(updatedUser);

            Alert.alert('Feedback Submitted', 'Your feedback has been recorded, and your plan has been adjusted accordingly!');
            setModalVisible(false);
    
            console.log(user);
            navigation.navigate('Home');
    
        } catch (error) {
            console.error('Error updating user info:', error);
            Alert.alert('Error', 'There was a problem updating your information. Please try again.');
        }
    };

    if (user.has_plan) {
        return (
            <View style={styles.container}>
                <ScrollView>
                    {Object.keys(workoutPlan).map((day, index) => (
                        <TouchableOpacity key={index} style={styles.dayBox} onPress={() => handleDayPress(day)}>
                            <View style={styles.dayHeader}>
                                <Text style={styles.dayTitle}>{day}</Text>
                                <TouchableOpacity
                                    style={[styles.checkbox, checkedDays[index] === 1 && styles.checked]}
                                    onPress={() => toggleChecked(index)}
                                >
                                    {checkedDays[index] === 1 && (
                                        <Icon name="check" size={16} color="black" /> // Display checkmark when checked
                                    )}
                                </TouchableOpacity>
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
                {allChecked && (
                    <TouchableOpacity style={styles.proceedButton} onPress={handleProceed}>
                        <Text style={styles.proceedButtonText}>Give end of week feedback</Text>
                    </TouchableOpacity>
                )}
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => setModalVisible(false)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Feedback on your workout plan</Text>
                            <View style={styles.checkboxContainer}>
                                <View style={styles.checkboxRow}>
                                    <Checkbox
                                        value={feedback.comfortable}
                                        onValueChange={() => handleFeedbackChange('comfortable')}
                                        color={feedback.comfortable ? '#3c3e56' : undefined}
                                    />
                                    <Text style={styles.checkboxLabel}>Comfortable while doing all exercises</Text>
                                </View>
                                <View style={styles.checkboxRow}>
                                    <Checkbox
                                        value={feedback.challengingButDoable}
                                        onValueChange={() => handleFeedbackChange('challengingButDoable')}
                                        color={feedback.challengingButDoable ? '#3c3e56' : undefined}
                                    />
                                    <Text style={styles.checkboxLabel}>Challenging but doable</Text>
                                </View>
                                <View style={styles.checkboxRow}>
                                    <Checkbox
                                        value={feedback.lowerVolume}
                                        onValueChange={() => handleFeedbackChange('lowerVolume')}
                                        color={feedback.lowerVolume ? '#3c3e56' : undefined}
                                    />
                                    <Text style={styles.checkboxLabel}>Struggled with the volume of the exercises</Text>
                                </View>
                                <View style={styles.checkboxRow}>
                                    <Checkbox
                                        value={feedback.struggled}
                                        onValueChange={() => handleFeedbackChange('struggled')}
                                        color={feedback.struggled ? '#3c3e56' : undefined}
                                    />
                                    <Text style={styles.checkboxLabel}>Struggled or couldn't do multiple exercises</Text>
                                </View>
                            </View>
                            <View style={styles.pickerContainer}>
                                <Text style={styles.pickerLabel}>Select workouts for the next week:</Text>
                                <Picker
                                    selectedValue={workoutsPerWeek}
                                    onValueChange={(itemValue) => setWorkoutsPerWeek(itemValue)}
                                    style={styles.picker}
                                >
                                    <Picker.Item label="3 Workouts" value="3" />
                                    <Picker.Item label="4 Workouts" value="4" />
                                    <Picker.Item label="5 Workouts" value="5" />
                                </Picker>
                            </View>
                            <TouchableOpacity style={styles.modalButton} onPress={handleModalSubmit}>
                                <Text style={styles.modalButtonText}>Proceed to next week</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
                                <Text style={styles.cancelButtonText}>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
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
        paddingBottom: 25,
    },
    dayBox: {
        marginBottom: 25,
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
    dayHeader: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 8,
    },
    dayTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderWidth: 2,
        borderColor: 'black',
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    checked: {
        backgroundColor: 'white',
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
    exerciseText: {
        fontSize: 16,
        color: '#333',
    },
    separator: {
        height: 1,
        backgroundColor: 'black',
        marginVertical: 5,
    },
    proceedButton: {
        backgroundColor: '#3c3e56',
        paddingVertical: 12,
        borderRadius: 25,
        marginTop: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    proceedButtonText: {
        color: 'white',
        fontSize: 16,
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalContent: {
        width: '80%',
        padding: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    checkboxContainer: {
        width: '100%',
        marginBottom: 20,
    },
    checkboxRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkboxLabel: {
        marginLeft: 8,
        fontSize: 16,
    },
    pickerContainer: {
        width: '100%',
        marginBottom: 30,
        alignItems:'center'
    },
    pickerLabel: {
        fontSize: 16,
        marginBottom: 10,
    },
    picker: {
        width: '100%',
        height: 50,
        borderColor: 'black',
        borderWidth: 1,
        borderRadius: 4,
        backgroundColor: '#f0f0f0',
    },
    modalButton: {
        backgroundColor: '#3c3e56',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
    },
    cancelButton: {
        backgroundColor: '#ccc',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    cancelButtonText: {
        color: 'black',
        fontSize: 16,
    },
});

export default HomeScreen;
