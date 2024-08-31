import React, { useContext } from 'react';
import { createDrawerNavigator, DrawerItemList } from '@react-navigation/drawer';
import { Image, Button, View, Text, SafeAreaView, Alert, TouchableOpacity } from 'react-native';
import { HomeStack, CalendarStack, ProfileStack, LibraryStack } from './stack';
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
        {
          text: "No",
          style: "cancel",
        },
        {
          text: "Yes",
          onPress: () => {
            navigation.navigate('Start', { screen: 'Start' });
          },
        },
      ],
      { cancelable: false }
    );
  };

  return (
    <Drawer.Navigator initialRouteName={user.hasPlan ? "Calendar" : "Home"}
      drawerContent={(props) => {
        return (
          <SafeAreaView style={{ flex: 1, paddingTop: 20, backgroundColor: 'white' }}>
            <View style={{ justifyContent: 'center', alignItems: 'center', height: 140 }}>
              <Image
                style={{ width: 100, resizeMode: 'contain', marginTop: 20 }}
                source={require("../assets/images/logos/logo.png")}
              />
            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', height: 50 }}>
              <Text style={{ fontSize: 18 }}>{"Logged in as: " + user.username}</Text>
              <TouchableOpacity onPress={handleLogout}>
                <Text style={{ fontSize: 18, color: '#ab92b3' }}>Log Out</Text>
              </TouchableOpacity>
            </View>
            <DrawerItemList {...props} />
          </SafeAreaView>
        );
      }}
      screenOptions={{
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="UserInfo"
        component={ProfileStack}
        options={{
          title: 'User Profile',
          drawerActiveTintColor: 'black',
          drawerIcon: () => <MaterialCommunityIcons name="account" size={26} />,
        }}
      />
      {user.has_plan ? (
        <Drawer.Screen
          name="Calendar"
          component={CalendarStack}
          options={{
            title: 'Calendar',
            drawerActiveTintColor: 'black',
            drawerIcon: () => <MaterialCommunityIcons name="calendar" size={26} />,
          }}
        />
      ) : (
        <Drawer.Screen
          name="Home"
          component={HomeStack}
          options={{
            title: 'Home',
            drawerActiveTintColor: 'black',
            drawerIcon: () => <Ionicons name="home" size={26} />,
          }}
        />
      )}
      <Drawer.Screen
        name="ExerciseLibrary"
        component={LibraryStack}
        options={{
          title: 'Exercise Library',
          drawerActiveTintColor: 'black',
          drawerIcon: () => <MaterialCommunityIcons name="dumbbell" size={26} />,
        }}
      />
    </Drawer.Navigator>
  );
};