import axios from 'axios';

const API_URL = 'http://10.0.2.2:8000/api';

export const signup = (username, password, email) => {
    return axios.post(`${API_URL}/register/`, { username, password, email });
};

export const login = (username, password) => {
    return axios.post(`${API_URL}/login/`, { username, password });
};

export const userInfo = (username, sex, age, height, weight, fitnessLevel, goals, injuries, preferredWorkoutTimes, availableEquipment, hasPlan) => {
    return axios.post(`${API_URL}/userInfo/`, { username, sex, age, height, weight, fitnessLevel, goals, injuries, preferredWorkoutTimes, availableEquipment, hasPlan });
};

export const getExercisesByType = (type) => {
    return axios.get(`${API_URL}/exercises/`, {
        params: { type },
    });
};
  
export const getExercisesByTypeAndMuscleGroup = (type, muscleGroup) => {
    return axios.get(`${API_URL}/exercises/`, {
        params: { type, muscle_group: muscleGroup },
    });
};

export const getWorkoutPlan = async (username) => {
    try {
        const response = await axios.get(`${API_URL}/workoutplan/${username}/`);
        return response.data;
      } catch (error) {
        console.error('Error fetching workout plan:', error);
        throw error;
      }
};