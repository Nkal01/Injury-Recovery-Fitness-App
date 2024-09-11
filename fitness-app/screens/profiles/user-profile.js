import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Modal, TextInput } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useUser } from '../../services/user-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { userInfo } from '../../services/api';

const UserProfileScreen = ({ navigation }) => {
  const { user, setUser } = useUser();
  const [modalVisible, setModalVisible] = useState(false);
  const [weightModalVisible, setWeightModalVisible] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(user.available_equipment || 'None');
  const [newWeight, setNewWeight] = useState((user.weight ?? '').toString());

  let plan_week = user.plan_week;
  let fitness_level = user.fitness_level;
  let preferred_workout_times = user.preferred_workout_times;
  let sex = user.sex;
  let age = user.age;
  let height = user.height;
  let weight = user.weight;
  let injuries = user.injuries;
  let has_plan = user.has_plan;
  let available_equipment = user.available_equipment

  const handleEquipmentChange = async () => {
    try {
      setUser({ ...user, available_equipment: selectedEquipment });

      const response = await userInfo(
        user.username,
        sex,
        age,
        height,
        weight,
        fitness_level,
        injuries,
        preferred_workout_times,
        selectedEquipment,
        has_plan,
        plan_week,
      );

      Alert.alert('Equipment Updated', 'Changes will apply on next week\'s workout plan.');
      setModalVisible(false);
      navigation.navigate('UserInfo');
    } catch (error) {
      console.error('Error updating equipment:', error);
      Alert.alert('Error', 'Failed to update your equipment. Please try again.');
    }
  };

  const handleWeightChange = async () => {
    try {
      const updatedWeight = parseFloat(newWeight);
      if (isNaN(updatedWeight)) {
        Alert.alert('Invalid Input', 'Please enter a valid weight.');
        return;
      }

      setUser({ ...user, weight: updatedWeight });

      const response = await userInfo(
        user.username,
        sex,
        age,
        height,
        updatedWeight,
        fitness_level,
        injuries,
        preferred_workout_times,
        selectedEquipment,
        has_plan,
        plan_week,
      );

      Alert.alert('Weight Updated', 'Your weight has been successfully updated.');
      setWeightModalVisible(false);
      navigation.navigate('UserInfo');
    } catch (error) {
      console.error('Error updating weight:', error);
      Alert.alert('Error', 'Failed to update your weight. Please try again.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.imageContainer}>
        <MaterialCommunityIcons name="account-circle" size={96} color="#3c3e56" />
        <Text style={styles.username}>{user.username}</Text>
      </View>

      <View style={styles.infoContainer}>
        {user.email && (
          <View style={styles.infoItem}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{user.email}</Text>
          </View>
        )}
        
        {user.sex && (
          <View style={styles.infoItem}>
            <Text style={styles.label}>Sex:</Text>
            <Text style={styles.value}>{user.sex}</Text>
          </View>
        )}
        
        {user.height && (
          <View style={styles.infoItem}>
            <Text style={styles.label}>Height:</Text>
            <Text style={styles.value}>{user.height} cm</Text>
          </View>
        )}
        
        {user.weight && (
          <View style={styles.infoItem}>
            <Text style={styles.label}>Weight:</Text>
            <View style={styles.equipmentRow}>
              <Text style={styles.value}>{user.weight} kg</Text>
              <TouchableOpacity style={styles.changeButton} onPress={() => setWeightModalVisible(true)}>
                <Text style={styles.changeButtonText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {user.bmi && (
          <View style={styles.infoItem}>
            <Text style={styles.label}>BMI:</Text>
            <Text style={styles.value}>{user.bmi}</Text>
          </View>
        )}
        
        {user.injuries && (
          <View style={styles.infoItem}>
            <Text style={styles.label}>Injuries:</Text>
            <Text style={styles.value}>{user.injuries}</Text>
          </View>
        )}

        {user.available_equipment && (
          <View style={styles.infoItem}>
            <Text style={styles.label}>Equipment:</Text>
            <View style={styles.equipmentRow}>
              <Text style={styles.value}>{user.available_equipment}</Text>
              <TouchableOpacity style={styles.changeButton} onPress={() => setModalVisible(true)}>
                <Text style={styles.changeButtonText}>Change</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>

        
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Available Equipment</Text>
            <Picker
              selectedValue={selectedEquipment}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedEquipment(itemValue)}
            >
              <Picker.Item label="None" value="None" />
              <Picker.Item label="Resistance bands" value="Resistance Band" />
              <Picker.Item label="Gym Subscription" value="Gym" />
            </Picker>

            <TouchableOpacity style={styles.modalButton} onPress={handleEquipmentChange}>
              <Text style={styles.modalButtonText}>Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        animationType="slide"
        transparent={true}
        visible={weightModalVisible}
        onRequestClose={() => setWeightModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter Your New Weight</Text>
            <TextInput
              style={styles.textInput}
              value={newWeight}
              onChangeText={(text) => setNewWeight(text)}
              keyboardType="numeric"
              placeholder="Enter weight in kg"
            />

            <TouchableOpacity style={styles.modalButton} onPress={handleWeightChange}>
              <Text style={styles.modalButtonText}>Save Changes</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.modalCloseButton} onPress={() => setWeightModalVisible(false)}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
    alignItems: 'center',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3c3e56',
    marginTop: 10,
  },
  infoContainer: {
    width: '100%',
    alignItems: 'center',
  },
  infoItem: {
    width: '100%',
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  equipmentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  changeButton: {
    backgroundColor: '#3c3e56',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  changeButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  picker: {
    width: '100%',
    height: 50,
    marginBottom: 20,
  },
  textInput: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    fontSize: 16,
  },
  modalButton: {
    backgroundColor: '#3c3e56',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalCloseButton: {
    marginTop: 10,
  },
  modalCloseButtonText: {
    color: '#3c3e56',
    fontWeight: 'bold',
  },
});

export default UserProfileScreen;
