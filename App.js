import React from 'react';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Pages/HomePage';
import LoginPage from './Pages/LoginPage';
import SignUpPage from './Pages/SignUpPage';
import SetProfilePage from './Pages/SetProfilePage';
import MainContainer from './Pages/NavigationBar/MainContainer';
import ChooseYourTeamPage from './Pages/ChooseYourTeamPage';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          options={{ headerShown: false }}
          name="HomeScreen"
          component={HomeScreen}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="MainContainer"
          component={MainContainer}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="ChooseYourTeam"
          component={ChooseYourTeamPage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="LoginPage"
          component={LoginPage}
        />
        <Stack.Screen
          options={{ headerShown: false }}
          name="SignUpPage"
          component={SignUpPage}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#97c6d1',
  },
});
