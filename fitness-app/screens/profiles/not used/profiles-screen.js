import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import NewProfileScreen from './new-profile-screen';

const Stack = createStackNavigator();

const ProfileListScreen = ({ navigation }) => {
  const [userProfiles, setUserProfiles] = useState([]);

  useEffect(() => {
    // Fetch user profiles from the backend or local storage
    // For demonstration, using a static list
    setUserProfiles([
      { id: '1', name: 'John Doe', age: 30, height: 180, weight: 75 },
      { id: '2', name: 'Jane Smith', age: 25, height: 165, weight: 60 },
    ]);
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.profileContainer}>
      <Text>Name: {item.name}</Text>
      <Text>Age: {item.age}</Text>
      <Text>Height: {item.height} cm</Text>
      <Text>Weight: {item.weight} kg</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={userProfiles}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
      <Button title="Add Profile" onPress={() => navigation.navigate('NewProfileScreen')} color="grey" />
    </View>
  );
};

const ProfilesScreen = () => (
  <NavigationContainer independent={true}>
    <Stack.Navigator initialRouteName="ProfileListScreen">
      <Stack.Screen 
        name="ProfileListScreen" 
        component={ProfileListScreen} 
        options={{ title: 'User Profiles' }} 
      />
      <Stack.Screen 
        name="NewProfileScreen" 
        component={NewProfileScreen} 
        options={{ title: 'Add Profile' }} 
      />
    </Stack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  profileContainer: {
    padding: 15,
    marginVertical: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
  },
});

export default ProfilesScreen;