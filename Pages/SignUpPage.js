import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Switch, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { firebase } from '../firebase';
import LoadingAnimation from '../UiComponents/LoadingAnimation';

const SignUpPage = () => {
    const [isGroupManager, setIsGroupManager] = React.useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [fullName, setFullName] = useState('')
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [groupId, setGroupId] = useState('');

    const registerUser = async (fullName, email, password) => {
        if (password !== confirmPassword) {
            alert('The passwords are not equal');
            return;
        }
        // Check if user with email already exists in Firestore collection
        const userRef = firebase.firestore().collection('users').where('email', '==', email);
        const snapshot = await userRef.get();
    
        if (!snapshot.empty) {
            alert('This email address is already in use. Please sign up or use a different email address.');
            return;
        }
    
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password);
            firebase.auth().currentUser.sendEmailVerification({
                handleCodeInApp: true,
                url: "https://footballforfriends-21e9c.firebaseapp.com/__/auth/action?mode=action&oobCode=code",
            })
                .then(() => {
                    alert('Verification email has been sent');
                    console.log("sending verification!");
                    navigation.navigate('LoginPage');
                })
                .catch((error) => {
                    if (error.code === 'auth/email-already-in-use') {
                        alert('This email address is already in use. Please sign in or use a different email address.')
                    } else {
                        console.log(error);
                    }
                });
    
            const userData = {
                fullName,
                email,
            }; 
            await firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
                .set(userData);
            console.log("User added successfully");
        } catch (error) {
            console.log(error);
            alert(error.message);
        }
    }

    const handleLoginButtonPress = () => {
        console.log('Login button pressed');
        navigation.navigate('LoginPage');
    };
    const handleRegisterPress = () => {
        // Handle the register logic here
        if (isGroupManager) {
            if (!groupName || !groupId) {
              alert('Please enter a group name and ID');
              return;
            }
          }
        registerUser(fullName, email, password);
        console.log('Register button pressed');
    };

    return (
        <KeyboardAvoidingView style={styles.container} behavior="padding">
            <View style={styles.container}>
                <Text style={styles.text}>Sign up</Text>
                <View style={styles.inputsContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Full Name"
                        value={fullName}
                        onChangeText={text => setFullName(text)} />
                    <TextInput
                        style={styles.input}
                        placeholder="Email"
                        value={email}
                        onChangeText={text => setEmail(text)}
                        returnKeyType="next"
                        keyboardType='email-address' 
                        autoCapitalize="none"/>
                    <TextInput
                        style={styles.input}
                        placeholder="Password"
                        secureTextEntry
                        value={password}
                        onChangeText={text => setPassword(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Confirm Password"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={text => setConfirmPassword(text)} />
                </View>
                <View style={styles.loginContainer}>
                    <TouchableOpacity onPress={handleLoginButtonPress}>
                        <Text style={styles.loginButtonText}>Are you already signed in?Click here!</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={styles.registerButton} onPress={handleRegisterPress}>
                    <Text style={styles.registerButtonText}>Register</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#97c6d1',
        flex: 1,
    },
    text: {
        fontSize: 40,
        textAlign: 'left',
        marginTop: 60,
        marginLeft: 20,
    },
    inputsContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
    },
    input: {
        width: '80%',
        backgroundColor: 'white',
        padding: 10,
        marginBottom: 10,
        borderRadius: 5,
    },
    switchContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
    },
    switchText: {
        fontSize: 18,
        marginRight: 10,
    },
    registerButton: {
        backgroundColor: '#97c6d1',
        borderRadius: 5,
        paddingVertical: 2,
        paddingHorizontal: 50,
        alignSelf: 'center',
        position: 'absolute',
        bottom: 30,
    },
    registerButtonText: {
        color: '#ffffff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    loginContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 20,
    },
    inputsGroupManager: {
        alignItems: 'center',
        paddingVertical: 20,
      },
});

export default SignUpPage;
