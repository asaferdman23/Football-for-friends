import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const MaxPeoplePicker = ({ maxListLength, onValueChange }) => {
  const [pickerVisible, setPickerVisible] = useState(false);
  const maxLengthOptions = Array.from({ length: 21 }, (_, index) => index + 4);

  const handleTogglePicker = () => {
    setPickerVisible(!pickerVisible);
  };

  const handleValueChange = (itemValue) => {
    onValueChange(itemValue); // Pass the selected value to the onValueChange function
    setPickerVisible(false); // Hide the picker after selecting a value
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleTogglePicker} style={styles.labelContainer}>
        <Text style={styles.label}>{`Max List Length: ${maxListLength}`}</Text>
      </TouchableOpacity>
      {pickerVisible && (
        <View style={styles.pickerContainer}>
          <Picker selectedValue={maxListLength} onValueChange={handleValueChange}>
            {maxLengthOptions.map((option) => (
              <Picker.Item key={option} label={option.toString()} value={option} />
            ))}
          </Picker>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 20,
  },
  labelContainer: {
    marginBottom: 5,
  },
  label: {
    fontSize: 16,
  },
  pickerContainer: {
    marginBottom: -10,
  },
});

export default MaxPeoplePicker;
