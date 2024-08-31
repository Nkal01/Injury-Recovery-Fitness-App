import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const AthleticBackgroundScreen = ({ route, navigation }) => {
  const { profileName, age, height, weight } = route.params;
  const [sport, setSport] = useState('');
  const [experience, setExperience] = useState('');

  const handleSubmit = () => {
    // Handle form submission, e.g., send data to server
    const profileData = { profileName, age, height, weight, sport, experience };
    console.log('Submitted:', profileData);
    // Navigate back to the profile list
    navigation.navigate('ProfileListScreen');
  };

  return (
    <View style={styles.FormContent}>
      <Text style={styles.UserProfileText}>Athletic Background</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Sport"
          value={sport}
          onChangeText={setSport}
        />
        <TextInput
          style={styles.input}
          placeholder="Years of Experience"
          value={experience}
          onChangeText={setExperience}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  FormContent: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 20,
  },
  inputContainer: {
    width: '100%',
    minHeight: 150,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#dcd0ff',
    borderRadius: 8,
  },
  input: {
    width: '80%',
    marginBottom: 1,
    marginVertical: 25,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderWidth: 1,
    borderColor: 'grey',
    borderRadius: 4,
  },
  UserProfileText: {
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 18,
  },
  submitButton: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 4,
    marginTop: 15,
    marginBottom: 15,
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 15,
  },
});

export default AthleticBackgroundScreen;