import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../firebase';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { MaterialCommunityIcons } from '@expo/vector-icons';
const LoginPage = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const checkUserProfileStatus = async (email, password) => {
    if (email.trim() === '' || password.trim() === '') {
      alert('Email and password cannot be empty.');
      return;
    }
  
    try {
      // Sign in user with email and password
      await firebase.auth().signInWithEmailAndPassword(email, password);
      const currentUser = firebase.auth().currentUser;
      if (currentUser) {
        const uid = currentUser.uid;
        const teamsRef = firebase.firestore().collection('teams');
        const querySnapshot = await teamsRef.where('groupMembers', 'array-contains', uid).get();
        if (!querySnapshot.empty) {
          // User is already a member of at least one team
          navigation.navigate('MainContainer');
          // Do something, e.g. navigate to a page where the user can view their teams
        } else {
          // User is not a member of any teams yet
          // Do something else, e.g. navigate to the Choose Your Team page
          navigation.navigate('ChooseYourTeam');
        }
      } else {
        // User is not signed in
        // Do something else, e.g. navigate to the sign in page
      }
      } catch (error) {
      console.log(error);
      alert(error.message);
      return;
    }
  };
    

  const handleSignUpPress = () => {
    // Handle the sign-up logic here
    navigation.navigate('SignUpPage');
  };

  const handleLoginPress = () => {
    // Handle the login logic here
    checkUserProfileStatus(email, password);
    if (rememberMe) {
      AsyncStorage.setItem('email', email);
      AsyncStorage.setItem('password', password);
    } else {
      AsyncStorage.removeItem('email');
      AsyncStorage.removeItem('password');
    }
  };

  useEffect(() => {
    const getEmailAndPassword = async () => {
      const storedEmail = await AsyncStorage.getItem('email');
      const storedPassword = await AsyncStorage.getItem('password');
      if (storedEmail && storedPassword) {
        setEmail(storedEmail);
        setPassword(storedPassword);
        setRememberMe(true);
      }
    };
    getEmailAndPassword();
  }, []);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior="padding"
    >
      <View style={styles.container}>
        <Text style={styles.text}>Login</Text>
        <View style={styles.inputsContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={text => setEmail(text)}
            value={email}
            autoCorrect={true}
            returnKeyType="next"
            keyboardType='email-address'
          />

          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              onChangeText={text => setPassword(text)}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              value={password}
              autoCorrect={false}
            />
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <MaterialCommunityIcons
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>


        </View>
        <View style={styles.checkboxContainer}>
          <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
            {rememberMe ? (
              <Text style={styles.checkboxText}>✓ Remember me</Text>
            ) : (
              <Text style={styles.checkboxText}>Remember me</Text>
            )}
          </TouchableOpacity>
        </View>
        <View style={styles.signUpContainer}>
          <TouchableOpacity onPress={handleSignUpPress}>
            <Text style={styles.signUpText}>Don't have an account? Click here!</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLoginPress}
        >
          <Text style={styles.loginButtonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#97c6d1",
    flex: 1,
  },
  text: {
    fontSize: 40,
    textAlign: 'left',
    marginTop: 60,
    marginLeft: 20,
  },
  inputsContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    flexDirection: 'column',
  },
  input: {
    width: '80%',
    backgroundColor: 'white',
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  eyeIcon: {
    position: 'absolute',
    right: 10,
    top: '50%',
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  signUpText: {
    marginBottom: 10,
  },
  signUpButton: {
    backgroundColor: '#3b3a3a',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 25,
  },
  signUpButtonText: {
    fontSize: 14,
    color: 'white',
  },
  loginButton: {
    backgroundColor: '#97c6d1',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 50,
    alignSelf: 'center',
    position: 'absolute',
    bottom: 30,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 32,
    marginBottom: 20,
  },
  checkboxText: {
    marginLeft: 10,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    backgroundColor: 'white',
    borderRadius: 5,
  },
});

export default LoginPage;
