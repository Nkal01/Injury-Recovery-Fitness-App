import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const StartScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate('Drawer')}>
          <Ionicons name="close-outline" size={32} color="#ab92b3" />
        </TouchableOpacity>
        <Image source={require('../../assets/images/logos/logo2.png')} style={styles.logo} />
        <Text style={styles.title}>Welcome!</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <Text style={styles.buttonText}>Log In</Text>
        </TouchableOpacity>
        <Text>Dont have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
          <Text style={styles.signupText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    button: {
      backgroundColor: '#ab92b3',
      width: 200,
      height: 50,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 10,
      marginBottom: 20,
    },
    buttonText: {
      color: '#FFFFFF',
      fontSize: 26,
    },
    closeButton: {
      position: 'absolute',
      top: 40,
      left: 20,
    },
    logo: {
        width: 64, // Adjust the width as needed
        height: 64, // Adjust the height as needed
        marginBottom: 20, // Add some space below the logo
    },
    signupText: {
        color: '#ab92b3',
        fontSize: 18,
    },
    });
  
  export default StartScreen;