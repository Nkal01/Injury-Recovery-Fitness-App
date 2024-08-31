import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import WorkoutsScreen from '../screens/workouts-screen';
import HomeScreen from '../screens/home-screen';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export const HomeTabs = () => {
  return (
    <Tab.Navigator
        screenOptions={({ route }) => ({
            headerShown: false,
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: 'black',
            },
            tabBarActiveTintColor: '#dcd0ff',
            tabBarInactiveTintColor: 'grey',
            tabBarIcon: ({focused, color, size}) => {
                let iconName;
                if (route.name === 'HomeTabs'){
                    iconName = focused ? 'home' : 'home-outline'
                }
                else if (route.name === 'Workouts') {
                    iconName = 'dumbbell'
                }

                return <MaterialCommunityIcons name={iconName} size={focused? 35: size} color={color} />
            }
        })}
    >
      <Tab.Screen 
        name="HomeTabs" 
        options={{
            title: 'Home',
            //tabBarIcon: () => <Ionicons name="home" color='white' size={26} />
        }}
        component={HomeScreen} />
      <Tab.Screen 
        name="Workouts" 
        options={{
            //tabBarIcon: () => <MaterialCommunityIcons name="dumbbell" color='white' size={26} />
        }}
        component={WorkoutsScreen} />
    </Tab.Navigator>
  );
}