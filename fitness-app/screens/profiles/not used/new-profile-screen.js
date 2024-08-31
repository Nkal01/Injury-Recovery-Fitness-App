import React, { useState, useLayoutEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AthleticBackgroundScreen from './new-profile-2';

const Stack = createStackNavigator();

const NewProfileScreen = ({ navigation }) => {
  return (
    <NavigationContainer independent={true}>
      <Stack.Navigator initialRouteName="NewProfileForm">
        <Stack.Screen 
          name="NewProfileForm" 
          component={NewProfileForm} 
          options={{ title: '' }} 
        />
        <Stack.Screen 
          name="AthleticBackgroundScreen" 
          component={AthleticBackgroundScreen} 
          options={{ title: '' }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const NewProfileForm = ({ navigation }) => {
    const [profileName, setProfileName] = useState(''); // Declare profileName state here
    const [age, setAge] = useState('');
    const [height, setHeight] = useState('');
    const [weight, setWeight] = useState('');
  
    const handleNext = () => {
        // Navigate to the next screen with the collected data
        navigation.navigate('AthleticBackgroundScreen', { profileName, age, height, weight });
      };

    useLayoutEffect(() => {
        navigation.setOptions({
            headerLeft: () => null, // Hide the header left component (back button)
        });
    }, [navigation]);

    return (
      <View style={styles.FormContent}>
        <Text style={styles.UserProfileText}>Add New Profile</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={profileName}
            onChangeText={setProfileName}
          />
          <TextInput
            style={styles.input}
            placeholder="Age"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Height (cm)"
            value={height}
            onChangeText={setHeight}
            keyboardType="numeric"
          />
          <TextInput
            style={styles.input}
            placeholder="Weight (kg)"
            value={weight}
            onChangeText={setWeight}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextButtonText}>Next</Text>
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
  nextButton: {
    backgroundColor: 'grey',
    padding: 10,
    borderRadius: 4,
    marginTop: 15,
    marginBottom: 15,
  },
  nextButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 15,
  },
});

export default NewProfileScreen;