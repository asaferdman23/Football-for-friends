import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "react-native-vector-icons/Ionicons";
import NextMatchListsPage from "./screens/NextMatchListsPage";
import NewsPage from './screens/NewsPage';
import RatingsPage from './screens/RatingsPage';
import LineUp from './screens/LineUp';
import ProfilePage from './screens/ProfilePage';
import { useNavigation } from '@react-navigation/native';

const Tab = createBottomTabNavigator();
const nextMatchScreen = "Next Match";
const newsPage = "News";
const ratingsPage = "Ratings";
const lineUpPage = "Line Up";
const profilePage = "Profile";

const MainContainer = () => {
  const navigation = useNavigation();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      gestureEnabled: false,
      gestureDirection: 'horizontal',
    });
  }, [navigation]);

  return (
    <Tab.Navigator
      initialRouteName={NextMatchListsPage}
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let rn = route.name;
          if (rn === nextMatchScreen) {
            iconName = focused ? "football" : "football-outline";
          } else if (rn === newsPage) {
            iconName = focused ? "newspaper" : "newspaper-outline";
          // } else if (rn === ratingsPage) {
          //   iconName = focused ? "ios-star" : "ios-star-outline";
           } else if (rn === lineUpPage){
            iconName = focused ? "bar-chart" : "bar-chart-outline";
          } else if (rn === profilePage){
            iconName = focused ? "person" : "person-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 10,
          fontWeight: 'bold',
        },
        tabBarItemStyle: {
          padding: 5,
        },
        tabBarStyle: {
          backgroundColor: '#F5F5F5', // Change background color
          borderTopColor: 'transparent', // Hide top border
        },
      })}
    >
      <Tab.Screen options={{ headerShown: false }} name={newsPage} component={NewsPage} />
      <Tab.Screen options={{ headerShown: false }} name={nextMatchScreen} component={NextMatchListsPage} />
      {/* //<Tab.Screen options={{ headerShown: false }} name={ratingsPage} component={RatingsPage} /> */}
      <Tab.Screen options={{ headerShown: false }} name={lineUpPage} component={LineUp} />
      <Tab.Screen options={{ headerShown: false }} name={profilePage} component={ProfilePage} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 20,
  },
});

export default MainContainer;
