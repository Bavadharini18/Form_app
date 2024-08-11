import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, View, TextInput, TouchableOpacity, Alert, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Checkbox from 'expo-checkbox';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Index() {
  const [isChecked, setChecked] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [date, setDate] = useState(new Date());
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');

  const handleDateChange = (event: any, selectedDate: Date) => {
    const currentDate = selectedDate || date;
    setShowPicker(false); 
    setDate(currentDate);
  };

  const navigation = useNavigation(); 
  const handleSubmit = async () => {
    const formData = {
      firstName,
      lastName,
      email,
      username,
      password,
      dateOfBirth: date.toISOString(),
      gender: isChecked ? 'Male' : 'Female',
      address,
      pincode,
    };

    try {
      await AsyncStorage.setItem('userFormData', JSON.stringify(formData));
      Alert.alert("Form Submitted!", "Your data has been saved.");
    } catch (error) {
      Alert.alert("Error", "There was an error saving your data.");
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
      <TouchableOpacity 
          style={styles.previousButton} 
          onPress={() => navigation.goBack()} 
        >
          <Text style={styles.previousButtonText}>Previous</Text>
        </TouchableOpacity>
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Sign Up </Text>
        </View>
        <View style={styles.formContainer}>
        <View style={styles.inputRow}>
            <Text style={styles.label}>First Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your firstname"
              value={firstName}
              onChangeText={setFirstName}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Last Name</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your lastname"
              value={lastName}
              onChangeText={setLastName}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your username"
              value={username}
              onChangeText={setUsername}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              secureTextEntry={true}
              value={password}
              onChangeText={setPassword}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Date of Birth</Text>
            <TouchableOpacity onPress={() => setShowPicker(true)}>
              <Text style={styles.input}>{date.toDateString()}</Text>
            </TouchableOpacity>
            {showPicker && (
              <DateTimePicker
                value={date}
                mode='date'
                display={Platform.OS === 'ios' ? 'inline' : 'default'}
                onChange={handleDateChange}
              />
            )}
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Gender</Text>
            <Checkbox value={isChecked} onValueChange={setChecked} />
            <Text style={styles.checkboxtitle}>Male</Text>
            <Checkbox value={!isChecked} onValueChange={() => setChecked(!isChecked)} />
            <Text style={styles.checkboxtitle}>Female</Text>
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your Address"
              value={address}
              onChangeText={setAddress}
            />
          </View>
          <View style={styles.inputRow}>
            <Text style={styles.label}>Pincode</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your pincode"
              value={pincode}
              onChangeText={setPincode}
            />
          </View>
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#B1B1EF',
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerContainer: {
    flex: 1,
    alignItems: 'center',
    marginTop: 50,
  },
  header: {
    fontSize: 45,
    color: 'white',
    marginBottom: 40,
    fontFamily: 'Roboto',
  },
  formContainer: {
    width: '80%',
    alignItems: 'center',
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    width: '100%',
  },
  label: {
    width: '40%',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'white',
  },
  input: {
    height: 50,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#fff',
    borderRadius: 10,
    width: '60%',
  },
  button: {
    backgroundColor: '#7a5ec7',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
  },
  checkboxtitle: {
    marginLeft: 10,
    marginRight: 10,
    color: '#ffffff'
  },
  previousButton: {
    alignSelf: 'flex-start', 
    marginLeft: 20, 
    marginTop: 20,  
  },
  previousButtonText: {
    color: '#FFF',
    fontSize: 18,
    textDecorationLine: 'underline',
  },
});
