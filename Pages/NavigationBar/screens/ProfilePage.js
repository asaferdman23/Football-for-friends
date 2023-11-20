import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { firebase } from '../../../firebase';
import { getDownloadURL, ref } from 'firebase/storage';

const ProfilePage = () => {
  const [nickname, setNickname] = useState('');
  const [photoURL, setPhotoURL] = useState(null);

  useEffect(() => {
    // Get the currently signed-in user
    const currentUser = firebase.auth().currentUser;

    if (currentUser) {
      // Get the user's nickname and photo URL from Firestore
      const userRef = firebase.firestore().collection('users').doc(currentUser.uid);
      userRef.get().then(async (doc) => {
        if (doc.exists) {
          const data = doc.data();
          console.log('photoURL:', data.photoURL);
          setNickname(data.nickname);
          const storageRef = ref(firebase.storage(), data.photoURL);
          const photoURL = await getDownloadURL(storageRef);
          console.log('photoURL:', photoURL);
          setPhotoURL(photoURL);
        } else {
          setNickname("null");
          setPhotoURL(null);
        }
      }).catch((error) => {
        console.log("Error getting document:", error);
      });
    }
  }, []);

  return (
    <View style={styles.container}>
      {photoURL ? (
       <Image source={{ uri: encodeURI(photoURL) }} style={styles.image} />
      ) : (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imagePlaceholderText}>No photo available</Text>
        </View>
      )}
      <Text style={styles.nickname}>{nickname}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#97c6d1',
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 50,
  },
  imagePlaceholder: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: 50,
    backgroundColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagePlaceholderText: {
    color: '#fff',
    fontSize: 18,
  },
  nickname: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 30,
  },
});

export default ProfilePage;
