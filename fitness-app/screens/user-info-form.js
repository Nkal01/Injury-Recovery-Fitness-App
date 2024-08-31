import React, { useState, useContext } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ScrollView, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { UserContext } from '../services/user-context';
import { userInfo } from '../services/api';

const UserInfoForm = ({ navigation }) => {
  const { user, setUser } = useContext(UserContext);
  const [sex, setSex] = useState("");
  const [age, setAge] = useState("");
  const [height, setHeight] = useState("");
  const [weight, setWeight] = useState("");
  const [fitnessLevel, setFitnessLevel] = useState("");
  const [injuries, setInjuries] = useState("");
  const [preferredWorkoutTimes, setPreferredWorkoutTimes] = useState("");
  const [availableEquipment, setAvailableEquipment] = useState("");

  const handleSubmit = async () => {
    if (!sex || !age || !height || !weight || !fitnessLevel || !injuries || !preferredWorkoutTimes || !availableEquipment) {
      Alert.alert('Error', 'Please fill out all fields.');
      return;
    }

    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    const updatedUser = {
      ...user,
      sex,
      age,
      height: heightNum,
      weight: weightNum,
      fitnessLevel,
      injuries,
      preferredWorkoutTimes,
      availableEquipment,
      hasPlan: true,
    };

    setUser(updatedUser);

    try {
      const response = await userInfo(
        user.username,
        sex,
        age,
        heightNum,
        weightNum,
        fitnessLevel,
        null,
        injuries,
        preferredWorkoutTimes,
        availableEquipment,
        true
      );
      navigation.navigate('Home');
      Alert.alert('Your personalized plan has been generated!');
    } catch (error) {
      console.error('Error generating personalized plan:', error);
      Alert.alert('Error', `An error occurred: ${error.message}`);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.boldText}>Sex</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={sex}
          onValueChange={(itemValue) => setSex(itemValue)}
        >
          <Picker.Item label="-" value="" />
          <Picker.Item label="Male" value="Male" />
          <Picker.Item label="Female" value="Female" />
        </Picker>
      </View>

      <Text style={styles.boldText}>Age</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={age}
        onChangeText={setAge}
        placeholder="Enter age"
      />

      <Text style={styles.boldText}>Height (cm)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={height}
        onChangeText={setHeight}
        placeholder="Enter height"
      />

      <Text style={styles.boldText}>Weight (kg)</Text>
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        value={weight}
        onChangeText={setWeight}
        placeholder="Enter weight"
      />

      <Text style={styles.boldText}>Fitness Level</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={fitnessLevel}
          onValueChange={(itemValue) => setFitnessLevel(itemValue)}
        >
          <Picker.Item label="-" value="" />
          <Picker.Item label="Beginner" value="Beginner" />
          <Picker.Item label="Intermediate" value="Intermediate" />
          <Picker.Item label="Advanced" value="Advanced" />
        </Picker>
      </View>

      <Text style={styles.boldText}>Injury</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={injuries}
          onValueChange={(itemValue) => setInjuries(itemValue)}
        >
          <Picker.Item label="-" value="" />
          <Picker.Item label="Achilles" value="Torn Achilles" />
          <Picker.Item label="ACL" value="Torn ACL" />
          <Picker.Item label="Meniscus" value="Torn Meniscus" />
        </Picker>
      </View>

      <Text style={styles.boldText}>Preferred Workout Times per Week</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={preferredWorkoutTimes}
          onValueChange={(itemValue) => setPreferredWorkoutTimes(itemValue)}
        >
          <Picker.Item label="-" value="" />
          <Picker.Item label="2 times a week" value="2" />
          <Picker.Item label="3 times a week" value="3" />
          <Picker.Item label="4 times a week" value="4" />
        </Picker>
      </View>

      <Text style={styles.boldText}>Available Equipment</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={availableEquipment}
          onValueChange={(itemValue) => setAvailableEquipment(itemValue)}
        >
          <Picker.Item label="-" value="" />
          <Picker.Item label="None" value="None" />
          <Picker.Item label="Resistance bands" value="Resistance Band" />
          <Picker.Item label="Gym subscription" value="Gym" />
        </Picker>
      </View>

      <Button title="Submit" onPress={handleSubmit} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 36,
  },
  boldText: {
    fontWeight: 'bold',
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: '#000',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 16,
    width: '100%',
  },
  input: {
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 16,
    paddingHorizontal: 8,
    width: '100%',
  },
});

export default UserInfoForm;