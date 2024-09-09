import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';


const StartScreen = ({ navigation }) => {
    return (
      <View style={styles.container}>
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
    logo: {
        width: 64,
        height: 64,
        marginBottom: 20,
    },
    signupText: {
        color: '#ab92b3',
        fontSize: 18,
    },
    });
  
  export default StartScreen;