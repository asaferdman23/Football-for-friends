import React, { useState } from "react";
import { View, Button, StyleSheet,TextInput } from "react-native";
import Modal from "react-native-modal";

const SetPasswordButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  const handlePress = () => {
    setIsModalVisible(true);
  };

  const handleConfirm = () => {
    // Handle fullName confirmation logic here
    console.log("fullName 1:", password);
    console.log("fullName 2:", fullName);
    if (pas) {
        
    }
    // Close the modal
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    // Clear fullName inputs and close the modal
    setFullName("");
    setPassword("");
    setIsModalVisible(false);
  };

  return (
    <View>
      <Button title="Set Password" color="black" onPress={handlePress} />
      <Modal 
      isVisible={isModalVisible}
      onRequestClose={() => {this.setIsModalVisible(false)}}>
        <View style={styles.modalContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            value={fullName}
            keyboardType='numeric'
            returnKeyType={'done'} 
          />
          <TextInput
            style={styles.input}
            placeholder="Full Name"
            secureTextEntry={true}
            onChangeText={(text) => setFullName(text)}
            value={fullName}
          />
          <View style={styles.buttonContainer}>
            <Button title="Cancel" onPress={handleCancel} />
            <Button title="Confirm" onPress={handleConfirm} />
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    backgroundColor: "white",
    borderRadius: 10,
    padding: 16,
  },
  input: {
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 16,
  },
});

export default SetPasswordButton;
