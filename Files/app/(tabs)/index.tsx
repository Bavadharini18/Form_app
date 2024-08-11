import React, { useState } from 'react';
import { StyleSheet, ScrollView, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSignUpPress = () => {
    router.push('/explore');
  };

  const handleSubmit = async () => {
    const formData = {
     email,
     username,
     password
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
        <View style={styles.headerContainer}>
          <Text style={styles.header}>Login</Text>
          <View style={styles.formContainer}>
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
            <View style={styles.signUpContainer}>
              <Text style={styles.signUpText}>No account? </Text>
              <TouchableOpacity style={styles.button} onPress={handleSignUpPress}>
                <Text style={styles.buttonText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Submit</Text>
          </TouchableOpacity>
          </View>
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
    fontSize: 54,
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
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
  },
  signUpText: {
    color: 'white',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#7a5ec7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginLeft: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  submitButton:{
    backgroundColor: '#7a5ec7',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginLeft: 10,
    marginTop:25
  }
});
