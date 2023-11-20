import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const SignUpButton = ({ onPress, title }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#4c8494',
    padding: 15,
    borderRadius: 30,
  },
  text: {
    textAlign:"center",
    color: 'white',
    fontSize: 18,
  },
});

export default SignUpButton;
