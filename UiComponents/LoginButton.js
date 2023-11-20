import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const LoginButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius:'spacing',
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 30,
    justifyContent: 'center',
  },
  text: {
    textAlign:"center",
    color: 'black',
    fontSize: 18,
  },
});

export default LoginButton;
