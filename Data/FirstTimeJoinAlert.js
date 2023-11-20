import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';

const CustomAlert = ({ isFirstTimer }) => {
  return (
    <Modal isVisible={isFirstTimer}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>Custom Alert</Text>
        <Text>This is your first time using the app!</Text>
        <TouchableOpacity style={styles.button} onPress={() => {}}>
          <Text style={styles.buttonText}>OK</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}; 

const FirstTimeJoinLogic = ({isFirstTimerAlso}) => {
    const [isFirstTimer, setIsFirstTimer] = useState(true);
    return (
      <View>
        <Text>Welcome to the App!</Text>
        <CustomAlert isFirstTimer={isFirstTimer} /> {/* Pass the isFirstTimer value */}
        {/* Rest of the component */}
      </View>
    );
  };
const styles = StyleSheet.create({
    modalContainer: {
      backgroundColor: 'white',
      padding: 20,
      borderRadius: 10,
    },
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 10,
    },
    button: {
      marginTop: 20,
      backgroundColor: '#5CB8FF',
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 20,
      alignItems: 'center',
    },
    buttonText: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });
  
  export default FirstTimeJoinLogic;