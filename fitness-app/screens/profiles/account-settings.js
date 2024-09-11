import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useUser } from '../../services/user-context';
import { changeUsername, changePassword, deleteAccount } from '../../services/api';

const AccountSettingsScreen = ({ navigation }) => {
  const { user, setUser } = useUser(); // Assuming user state is managed via a context
  const [newUsername, setNewUsername] = useState(user.username);
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(''); // New confirm password field
  const [confirmedNewPassword, setConfirmedNewPassword] = useState('');

  const [isEditingUsername, setIsEditingUsername] = useState(false); // Toggle for editing username
  const [isEditingPassword, setIsEditingPassword] = useState(false); // Toggle for editing password

    const handleChangeUsername = async () => {
        if (!isEditingUsername) {
            setIsEditingUsername(true);
        } else {
            if (!confirmPassword) {
                Alert.alert('Error', 'Please enter your password to confirm the change.');
                return;
            }

            try {
                if (user.username == newUsername){
                    Alert.alert('Error', 'You need to pick a username different from the current one.');
                }
                else{
                    const response = await changeUsername(user.username, newUsername, confirmPassword);

                    if (response.success) {
                        setUser({ ...user, username: newUsername });
                        Alert.alert('Success', 'Username has been updated! Please log in again with your new username.');
                        navigation.navigate('Start', { screen: 'Start' });
                    } else {
                        Alert.alert('Error', response.error || 'Failed to update username.');
                    }
                }
            } catch (error) {
                Alert.alert('Error', 'Failed to update username. Please ensure your password is correct.');
            }
        }
    };

  const handleChangePassword = async () => {
    if (!isEditingPassword) {
      setIsEditingPassword(true); // Start editing
    } else {
      if (!currentPassword || !newPassword || !confirmedNewPassword) {
        Alert.alert('Error', 'Please fill in all of the fields.');
        return;
      }

      if (newPassword == confirmedNewPassword){
        try {
            const response = await changePassword(user.username, currentPassword, newPassword);
            
            if (response.success) {
                Alert.alert('Success', 'Password has been updated! Please log in again with your new password.');
                navigation.navigate('Start', { screen: 'Start' });
            } else {
                Alert.alert('Error', response.error || 'Failed to update username.');
            } 
          } catch (error) {
            Alert.alert('Error', 'Failed to change password. Please check your current password.');
          }
      } else {
        Alert.alert('Error', 'New password cannot be confirmed.');
      }
    }
  };

  // Handle deleting the account
  const handleDeleteAccount = async () => {
    Alert.alert(
      'Confirm Delete',
      'Are you sure you want to delete your account? This action is irreversible.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await deleteAccount(user.username);
              Alert.alert('Deleted', 'Your account has been deleted.');
              navigation.navigate('Start', { screen: 'Start' });
            } catch (error) {
              Alert.alert('Error', 'Failed to delete your account. Please try again.');
            }
          },
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Current Username:</Text>
        {isEditingUsername ? (
          <>
          <Text style={styles.value}>{user.username}</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter new Username"
              value={newUsername}
              onChangeText={setNewUsername}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              secureTextEntry={true}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleChangeUsername}>
                <Text style={styles.buttonText}>Save Username</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={() => setIsEditingUsername(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
            <>
            <Text style={styles.value}>{user.username}</Text>
            <TouchableOpacity style={styles.button2} onPress={handleChangeUsername}>
                <Text style={styles.buttonText}>
                    Change Username
                </Text>
            </TouchableOpacity>
            </>
        )}
        
      </View>

      <View style={styles.inputContainer}>
        {isEditingPassword ? (
          <>
            <TextInput
              style={styles.input}
              placeholder="Current Password"
              secureTextEntry={true}
              value={currentPassword}
              onChangeText={setCurrentPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="New Password"
              secureTextEntry={true}
              value={newPassword}
              onChangeText={setNewPassword}
            />
            <TextInput
              style={styles.input}
              placeholder="Confirm New Password"
              secureTextEntry={true}
              value={confirmedNewPassword}
              onChangeText={setConfirmedNewPassword}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
                <Text style={styles.buttonText}>Save Password</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton} onPress={() => setIsEditingPassword(false)}>
                <Text style={styles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
            <>
            <TouchableOpacity style={styles.button2} onPress={handleChangePassword}>
                <Text style={styles.buttonText}>
                    Change Password
                </Text>
            </TouchableOpacity>
            </>
        )}

        </View>

        <View style={styles.deleteContainer}>
            <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
            <Text style={styles.deleteButtonText}>Delete Account</Text>
            </TouchableOpacity>
        </View>
        </View>
    );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  input: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 10,
  },
  value: {
    fontSize: 20,
    color: '#666',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#3c3e56',
    padding: 15,
    borderRadius: 16,
    alignItems: 'center',
    flex: 1,
    marginRight: 10,
  },
  button2: {
    backgroundColor: '#3c3e56',
    padding: 15,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  closeButton: {
    backgroundColor: 'grey',
    padding: 15,
    borderRadius: 16,
    alignItems: 'center',
    flex: 1,
  },
  closeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  deleteContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  deleteButton: {
    backgroundColor: '#ab92b3',
    padding: 15,
    borderRadius: 4,
    width: '100%',
    alignItems: 'center',
  },
  deleteButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18
  },
});

export default AccountSettingsScreen;
