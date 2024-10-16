import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { UserContext } from '../services/user-context';
import { userInfo } from '../services/api';

const UserInfoForm = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [fitness_level, setFitnessLevel] = useState("");
  const [injuries, setInjuries] = useState("");
  const [preferred_workout_times, setPreferredWorkoutTimes] = useState("");
  const [available_equipment, setAvailableEquipment] = useState("");

  const fitnessLevelDescriptions = {
    Beginner: "This level is suited for users in the early stages of rehabilitation or those with limited prior athletic experience. If you are recovering from a recent injury or surgery, have restricted movement, or are experiencing significant muscle weakness, this is the right level.",
    Intermediate: "This level is designed for users in the mid-stage of rehabilitation or those who have some athletic background but are not yet ready for high-intensity exercise. If you've made progress in your recovery but still need to build strength, endurance, and flexibility, this is your level.",
    Advanced: "This level is intended for users in the late stages of rehabilitation or those with a high level of previous athletic experience. If you are nearing full recovery and looking to restore athletic performance or resume intense physical activities, this is the right choice."
  };

  const handleSubmit = async () => {
    if (!sex || !age || !height || !weight || !fitness_level || !injuries || !preferred_workout_times || !available_equipment) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    try {
      const response = await userInfo(
        user.username,
        sex,
        age,
        heightNum,
        weightNum,
        fitness_level,
        injuries,
        preferred_workout_times,
        available_equipment,
        true,
        1,
      );

      const updatedUser = {
        ...user,
        sex,
        age,
        height: heightNum,
        weight: weightNum,
        fitness_level,
        injuries,
        preferred_workout_times,
        available_equipment,
        has_plan: true,
        plan_week: 1,
      };
  
      setUser(updatedUser);

      navigation.navigate('Home');
      Alert.alert('Your personalized plan has been generated!');
    } catch (error) {
      console.error('Error generating personalized plan:', error);
      Alert.alert('Error', `An error occurred: ${error.message}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.header}>User Info Form</Text>

      <Text style={styles.label}>Sex</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={sex}
          onValueChange={(itemValue) => setSex(itemValue)}
        >
          <Picker.Item label="Select sex" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>

      <Text style={styles.label}>Age</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        placeholder="Enter age"
      />

      <Text style={styles.label}>Height (cm)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
        placeholder="Enter height"
      />

      <Text style={styles.label}>Weight (kg)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
        placeholder="Enter weight"
      />

      <Text style={styles.label}>Fitness Level</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={fitness_level}
          onValueChange={(itemValue) => setFitnessLevel(itemValue)}
        >
          <Picker.Item label="Select fitness level" value="" />
          <Picker.Item label="Beginner" value="Beginner" />
          <Picker.Item label="Intermediate" value="Intermediate" />
          <Picker.Item label="Advanced" value="Advanced" />
        </Picker>
      </View>
      {fitness_level && (
        <Text style={styles.fitnessDescription}>
          {fitnessLevelDescriptions[fitness_level]}
        </Text>
      )}

      <Text style={styles.label}>Injury</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={injuries}
          onValueChange={(itemValue) => setInjuries(itemValue)}
        >
          <Picker.Item label="Select injury" value="" />
          <Picker.Item label="Achilles" value="Torn Achilles" />
          <Picker.Item label="ACL" value="Torn ACL" />
          <Picker.Item label="Meniscus" value="Torn Meniscus" />
        </Picker>
      </View>

      <Text style={styles.label}>Workouts per week</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={preferred_workout_times}
          onValueChange={(itemValue) => setPreferredWorkoutTimes(itemValue)}
        >
          <Picker.Item label="Select workouts" value="" />
          <Picker.Item label="3 times a week" value="3" />
          <Picker.Item label="4 times a week" value="4" />
          <Picker.Item label="5 times a week" value="5" />
        </Picker>
      </View>

      <Text style={styles.label}>Available Equipment</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={available_equipment}
          onValueChange={(itemValue) => setAvailableEquipment(itemValue)}
        >
          <Picker.Item label="Select equipment" value="" />
          <Picker.Item label="None" value="None" />
          <Picker.Item label="Resistance bands" value="Resistance Band" />
          <Picker.Item label="Gym subscription" value="Gym" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: '600',
    color: '#555',
  },
  input: {
    height: 44,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 16,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 6,
    backgroundColor: '#fff',
  },
  fitnessDescription: {
    marginBottom: 16,
    fontSize: 14,
    color: '#777',
    fontStyle: 'italic',
  },
  submitButton: {
    backgroundColor: '#ab92b3',
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UserInfoForm;
