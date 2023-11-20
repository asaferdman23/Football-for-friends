import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';

const BoxUi = () => {
  const [groupNumber, setGroupNumber] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.box}>
        <View style={styles.row}>
          <Text style={styles.label}>Your Group Number</Text>
          <TextInput
            style={styles.input}
            onChangeText={setGroupNumber}
            placeholder="Please enter Group Number"
            keyboardType='numeric'
            returnKeyType={ 'done' } 
            value={groupNumber}
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            onChangeText={setEmail}
            placeholder="Email"
            value={email}
            returnKeyType="next"
          />
        </View>
        <View style={styles.row}>
          <Text style={styles.label}>Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={setPassword}
            value={password}
            returnKeyType="next"
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  box: {
    width: '100%',
    backgroundColor: '#f3f6f4',
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 10, height: 10},
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 16,
  },
  label: {
    flex: 1,
    fontSize: 16,
    marginRight: 8,
  },
  input: {
    flex: 2,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
  },
});

export default BoxUi;
