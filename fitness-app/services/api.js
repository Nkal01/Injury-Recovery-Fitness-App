import axios from 'axios';

const API_URL = 'http://10.0.2.2:8000/api';

export const signup = (username, password, email) => {
    return axios.post(`${API_URL}/register/`, { username, password, email });
};

export const login = (username, password) => {
    return axios.post(`${API_URL}/login/`, { username, password });
};

export const userInfo = (username, sex, age, height, weight, fitness_level, injuries, preferred_workout_times, available_equipment, hasPlan, planWeek) => {
    return axios.post(`${API_URL}/userInfo/`, { username, sex, age, height, weight, fitness_level, injuries, preferred_workout_times, available_equipment, hasPlan, planWeek });
};

export const updatePlan = (username, age, injuries, available_equipment, height, weight, fitness_level, preferred_workout_times, planWeek, completedDays) => {
    return axios.put(`${API_URL}/updatePlan/`, { username, age, injuries, available_equipment, height, weight, fitness_level, preferred_workout_times, planWeek, completedDays });
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

export const getExercisesByName = (name) => {
    return axios.get(`${API_URL}/exercises/`, {
        params: { name },
    });
};

export const getAllExercises = () => {
    return axios.get(`${API_URL}/exercises/`);
};

export const getWorkoutPlan = async (username) => {
    try {
        const response = await fetch(`${API_URL}/workoutplan/${username}/`);
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching workout plan:', error);
        throw error;
    }
};

export const updateCompletedDays = async (username, completedDays) => {
    try {
        const response = await axios.post(`${API_URL}/workoutplan/${username}/`, { completed_days: completedDays });
        return response.data;
    } catch (error) {
        console.error('Error updating completed days:', error);
        throw error;
    }
};

export const changeUsername = async (currentUsername, newUsername, confirmPassword) => {
    try {
        const response = await axios.put(`${API_URL}/changeUsername/`, {
            current_username: currentUsername,
            new_username: newUsername,
            password: confirmPassword
        });
        return response.data;
    } catch (error) {
        console.error('Error changing username:', error);
        throw error;
    }
};

export const changePassword = async (username, currentPassword, newPassword) => {
    try {
        const response = await axios.put(`${API_URL}/changePassword/`, {
            username: username,
            current_password: currentPassword,
            new_password: newPassword
        });
        return response.data;
    } catch (error) {
        console.error('Error changing username:', error);
        throw error;
    }
};

export const deleteAccount = async (username) => {
    try {
        const response = await axios.delete(`${API_URL}/deleteAccount/`, {
            data: {username: username,}
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting account:', error);
        throw error;
    }
};