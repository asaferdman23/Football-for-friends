import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { BlurView } from 'expo-blur';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { firebase } from '../firebase';
import { useNavigation } from '@react-navigation/native';
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";


const SetProfilePage = () => {
  const [image, setImage] = useState(null);
  const [nickname, setNickname] = useState('');
  const storageRef = ref(storage, "images/" + new Date().getTime() + ".jpg");
  const navigation = useNavigation();

  const submitData = async () => {
    if (!image || !nickname) {
      alert('Please select an image and enter a nickname.');
      return;
    }

    try {
      const currentUser = firebase.auth().currentUser;
      // Upload the image to Firebase Storage
      const storageSnapshot = await uploadBytes(storageRef, image);
      console.log('Uploaded a file! 3');

      // Get the URL of the uploaded image
      const downloadURL = await getDownloadURL(storageSnapshot.ref);
      console.log('Uploaded a file! 4');
      if (currentUser) {
        const userRef = firebase.firestore().collection('users').doc(currentUser.uid);
        userRef.get().then(async (doc) => {
          if (doc.exists) {
            // Update the user document with the new nickname and photoURL values
            await userRef.set({
              nickname,
              photoURL: downloadURL,
            },{ merge: true });
          } else {
            console.log("User document does not exist");
          }
        }).catch((error) => {
          console.log("Error getting user document:", error);
        });
      } else {
        console.log("No user is currently signed in");
      }
      alert('Welcome back ' + nickname);
      navigation.navigate('MainContainer');
    } catch (error) {
      console.log(error.message);
      alert('Failed to save data to Firebase.');
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Set Profile</Text>
      <TouchableOpacity style={styles.imageContainer} onPress={pickImage}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <BlurView intensity={70} tint="light" style={styles.blur}>
            <Icon name="camera-alt" size={50} color="#8f8f8f" />
            <Text style={styles.imagePlaceholder}>Tap to choose a photo</Text>
          </BlurView>
        )}
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Nickname"
        value={nickname}
        onChangeText={setNickname}
      />
      <TouchableOpacity style={styles.saveButton} onPress={submitData}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#97c6d1',
    flex: 1,
    alignItems: 'center',
  },
  text: {
    fontSize: 40,
    textAlign: 'center',
    marginTop: 60,
  },
  imageContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: 30,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 75,
  },
  blur: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 75,
    paddingHorizontal: 20,
  },
  imagePlaceholder: {
    textAlign: 'center',
    color: '#8f8f8f',
    marginTop: 10,
  },
  input: {
    width: '80%',
    backgroundColor: 'white',
    padding: 10,
    marginTop: 20,
    borderRadius: 5,
  },
  saveButton: {
    backgroundColor: '#97c6d1',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 50,
    alignSelf: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default SetProfilePage;
