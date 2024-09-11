import React, { useContext } from 'react';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Image, View, Text, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import { HomeStack, CalendarStack, ProfileStack, LibraryStack, SettingsStack } from './stack';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useUser } from '../services/user-context';

const Drawer = createDrawerNavigator();

export const MyDrawer = ({ navigation }) => {
  const { user } = useUser();

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to Log out?",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: () => navigation.navigate('Start', { screen: 'Start' }) }
      ],
      { cancelable: false }
    );
  };

  return (
    <Drawer.Navigator
      initialRouteName="Home"
      drawerContent={(props) => (
        <SafeAreaView style={styles.drawerContainer}>
          <View style={styles.logoContainer}>
            <Image
              source={require("../assets/images/logos/logo.png")}
              style={styles.logo}
            />
          </View>

          <View style={styles.userInfoContainer}>
            <Text style={styles.userText}>Logged in as: {user.username}</Text>
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.logoutText}>Log Out</Text>
            </TouchableOpacity>
          </View>

          <DrawerItemList {...props} />
        </SafeAreaView>
      )}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: 'black',
      }}
    >
      <Drawer.Screen
        name="UserInfo"
        component={ProfileStack}
        options={{
          title: 'User Profile',
          drawerIcon: ({ color }) => <MaterialCommunityIcons name="account" size={26} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={SettingsStack}
        options={{
          title: 'Account Settings',
          drawerIcon: ({ color }) => <Ionicons name="settings" size={26} color={color} />,
        }}
      />
      <Drawer.Screen
        name="Home"
        component={HomeStack}
        options={{
          title: 'Home',
          drawerIcon: ({ color }) => <Ionicons name="home" size={26} color={color} />,
        }}
      />
      <Drawer.Screen
        name="ExerciseLibrary"
        component={LibraryStack}
        options={{
          title: 'Exercise Library',
          drawerIcon: ({ color }) => <MaterialCommunityIcons name="dumbbell" size={26} color={color} />,
        }}
      />
    </Drawer.Navigator>
  );
};

const styles = {
  drawerContainer: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: 'white',
  },
  logoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 140,
  },
  logo: {
    width: 100,
    resizeMode: 'contain',
    marginTop: 20,
  },
  userInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 50,
    marginVertical: 10,
  },
  userText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  logoutText: {
    fontSize: 18,
    color: '#ab92b3',
    marginTop: 5,
  },
};

export default MyDrawer;
