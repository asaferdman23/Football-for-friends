import React from 'react';
import { View, Button, StyleSheet } from 'react-native';

// Navigation import
import { useNavigation } from '@react-navigation/native';

export default function ButtonToCheckSomething() {
  const navigation = useNavigation();

  const handleButtonPress = () => {
    navigation.navigate('MainContainer');
  };

  return (
    <View>
      <Button onPress={handleButtonPress} title="Go to next page example" />
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 16,
  },
});
