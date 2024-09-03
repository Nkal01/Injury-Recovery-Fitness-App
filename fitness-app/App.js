import { MyDrawer } from './navigation/drawer';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CalendarStack, ProfileStack, StartStack } from './navigation/stack';
import { HomeStack } from './navigation/stack';
import { StatusBar } from 'expo-status-bar';
import { UserProvider } from './services/user-context';
import { ExerciseProvider } from './services/exercise-context';

const RootStack = createStackNavigator();

export default function App() {
  return (
    <UserProvider>
      <ExerciseProvider>
        <NavigationContainer>
          <RootStack.Navigator initialRouteName="Start">
            <RootStack.Screen name="Start" component={StartStack} options={{ headerShown: false }} />
            <RootStack.Screen name="Drawer" component={MyDrawer} options={{ headerShown: false }} />
            <RootStack.Screen name="Home" component={HomeStack} options={{ headerShown: false }} />
            <RootStack.Screen name="User Profile" component={ProfileStack} options={{ headerShown: false }} />
          </RootStack.Navigator>
          <StatusBar style='light' backgroundColor='black' />
        </NavigationContainer>
      </ExerciseProvider>
    </UserProvider>
  );
}