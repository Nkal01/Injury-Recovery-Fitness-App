import React, { useState, useContext  } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { login } from '../../services/api';
import { UserContext } from '../../services/user-context';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(UserContext);

  const handleLogin = async () => {
    try {
        const response = await login(username, password);
        const userData = response.data.user;
        const has_plan = userData.has_plan;

        Alert.alert('Login Success', 'Welcome, ' + username + '!');
        console.log(userData);
        setUser(userData);

        navigation.navigate('Drawer', {
            screen: has_plan ? 'Calendar' : 'Home',
        });

    } catch (error) {
        Alert.alert('Login Failed', 'Invalid credentials');
        console.error(error);
    }
};

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.backButton} onPress={() => navigation.navigate('Start')}>
        <Ionicons name="arrow-back" size={24} color="#ab92b3" />
      </TouchableOpacity>
      <Image source={require('../../assets/images/logos/logo2.png')} style={styles.logo} />
      <Text style={styles.title}>Log In</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  backButton: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  logo: {
    width: 64,
    height: 64,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#ab92b3',
    width: 200,
    height: 50,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
});

export default LoginScreen;