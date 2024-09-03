import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/home-screen';
import EventDetailScreen from '../screens/event-detail-screen';
import { Ionicons } from '@expo/vector-icons';
import { navOptions } from './options';
import ProfilesScreen from '../screens/profiles/not used/profiles-screen';
import ProfileDetailScreen from '../screens/profiles/not used/profile-detail-screen';
import StartScreen from '../screens/login-signup/start-screen';
import LoginScreen from '../screens/login-signup/login-screen';
import SignupScreen from '../screens/login-signup/signup-screen';
import { HomeTabs } from './tabs';
import WorkoutsScreen from '../screens/workouts-screen';
import UserInfoForm from '../screens/user-info-form';
import LibraryScreen from '../screens/library/library-screen';
import UserProfileScreen from '../screens/profiles/user-profile';
import MuscleGroupScreen from '../screens/library/muscle-group-screen';
import ExercisesScreen from '../screens/library/exercises-screen';
import PlanDayExercises from '../screens/workout-plan/workout-plan-day';

const Stack = createStackNavigator();

export const StartStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        ...navOptions(navigation),
        headerTitleAlign: 'center',
        headerShown: false,
      })}
    >
      <Stack.Screen name="Start" component={StartScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Signup" component={SignupScreen} />
    </Stack.Navigator>
  );
};

export const ProfileStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        ...navOptions(navigation),
        headerTitleAlign: 'center',
      })}
    >
      <Stack.Screen name="User Profile" component={UserProfileScreen} />
    </Stack.Navigator>
  );
};

export const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        ...navOptions(navigation),
        headerTitleAlign: 'center',
      })}
    >
      <Stack.Screen name="Home" component={HomeScreen} />
      <Stack.Screen
        name="UserInfo"
        component={UserInfoForm}
        options={({ navigation }) => ({
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              color="white"
              style={{ marginLeft: 15 }}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
      <Stack.Screen name="PlanDayExercises" component={PlanDayExercises} 
        options={({ navigation }) => ({
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              color="white"
              style={{ marginLeft: 15 }}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export const LibraryStack = () => {
  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        ...navOptions(navigation),
        headerTitleAlign: 'center',
      })}
    >
      <Stack.Screen name="Exercise Library" component={LibraryScreen} />
      <Stack.Screen name="MuscleGroup" component={MuscleGroupScreen} 
        options={({ navigation }) => ({
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              color="white"
              style={{ marginLeft: 15 }}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
        />

      <Stack.Screen name="Exercises" component={ExercisesScreen} 
        options={({ navigation }) => ({
          headerLeft: () => (
            <Ionicons
              name="arrow-back"
              size={24}
              color="white"
              style={{ marginLeft: 15 }}
              onPress={() => navigation.goBack()}
            />
          ),
        })}
        />

    </Stack.Navigator>
  );
};