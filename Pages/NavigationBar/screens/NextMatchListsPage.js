import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions,  TextInput} from 'react-native';
import { TouchableOpacity, FlatList } from 'react-native';
import { firebase } from '../../../firebase';
import NextMatchDescription from '../../../UiComponents/NextMatchDescription';
import NextMatchList from '../../../UiComponents/NextMatchList';
import FirstTimeJoinLogic from '../../../Data/FirstTimeJoinAlert';

const { width } = Dimensions.get('window');

const NextMatchListsPage = () => {
  const [rows, setRows] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [isGroupLeader, setIsGroupLeader] = useState(false);
  const [maxListLength, setMaxListLength] = useState(0);
  const maxLengthOptions = [4, 8, 12, 16, 20, 24];
  const currentUserId = firebase.auth().currentUser.uid;
  const [isFirstTimer,setIsFirstTimer]=useState(true);
  
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const teamQuerySnapshot = await firebase
          .firestore()
          .collection('teams')
          .where('groupLeader', '==', currentUserId)
          .limit(1)
          .get();
  
        if (!teamQuerySnapshot.empty) {
          setIsGroupLeader(true);
          const teamDoc = teamQuerySnapshot.docs[0];
          const teamData = teamDoc.data();
          setMaxListLength(teamData.maxListLength);
  
          const matchListQuerySnapshot = await teamDoc.ref.collection('matchList').get();
          const newRows = matchListQuerySnapshot.docs.map((doc) => ({
            id: doc.id,
            fullName: doc.data().fullName,
          }));
          setRows(newRows);
        } else {
          setIsGroupLeader(false);
        }
      } catch (error) {
        console.log('Error fetching team data:', error);
      }
    };
  
    fetchTeamData();
  }, [currentUserId]);
  
  useEffect(() => {
    const unsubscribe = firebase.firestore().collection('users').onSnapshot((querySnapshot) => {
      const newRows = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        fullName: doc.data().fullName,
      }));
      setRows(newRows);
    });

    return () => {
      unsubscribe();
    };
  }, []);


const addRow = () => {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    alert('SOMETHING WRONG WITH THIS USER');
    return;
  }

  const userId = currentUser.uid;
  firebase
    .firestore()
    .collection('users')
    .doc(userId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        const fullName = doc.data().fullName;
        if (!fullName) {
          console.log('Full name not found');
          return;
        }

        const matchListExists = rows.some((row) => row.fullName === fullName);
        if (matchListExists) {
          alert('You cannot use the same name twice');
          return;
        } 

        const exists = rows.some((row) => row.nickname === fullName);
        if (!exists) {
            firebase
            .firestore()
            .collection('teams')
            .where('groupMembers', 'array-contains', userId)
            .get()
            .then((querySnapshot) => {
              if (!querySnapshot.empty) {
                const teamRef = querySnapshot.docs[0].ref;
                teamRef
                  .collection('matchList')
                  .get()
                  .then((matchListSnapshot) => {
                    const currentListSize = matchListSnapshot.size;
                    if (currentListSize >= maxListLength) {
                      alert("You can't join the match right now, wait for someone to leave.");
                      return;
                    }
                    
                    teamRef
                      .collection('matchList')
                      .add({ fullName })
                      .then((docRef) => {
                        const newRow = { id: docRef.id, fullName };
                        setRows((prevRows) => [...prevRows, newRow]);
                      })
                      .catch((error) =>
                        console.log('Error adding user to matchList', error)
                      );
                  });
              }
            })
            .catch((error) => console.log('Error adding user to matchList', error));
        } else {
          alert('You cannot use the same name twice');
          return;
        }
      } else {
        console.log('User document not found');
      }
    })
    .catch((error) => console.log('Error retrieving user document', error));
};


const removeRow = (docId) => {
  firebase
    .firestore()
    .collection('teams')
    .where('groupMembers', 'array-contains', currentUserId)
    .get()
    .then((querySnapshot) => {
      if (!querySnapshot.empty) {
        const teamRef = querySnapshot.docs[0].ref;
        teamRef
          .collection('matchList')
          .doc(docId)
          .delete()
          .then(() => {
            setRows((prevRows) => prevRows.filter((row) => row.id !== docId));
          })
          .catch((error) => console.log('Error removing user from matchList', error));
      }
    })
    .catch((error) => console.log('Error retrieving team document', error));
};



  const handleAddButtonPress = () => {
    addRow();
    console.log("Im inside handle add button press");
  };


  const handleUpdateButtonPress = () => {
    if (matchLocation === undefined || maxListLength === undefined) {
      console.log('Invalid requirements');
      return;
    }
    const teamRef = firebase.firestore().collection('teams').doc(currentUserId);
    teamRef
      .update({
        matchLocation: matchLocation,
        maxListLength: maxListLength,
      })
      .then(() => {
        console.log('Requirements updated successfully!');
      })
      .catch((error) => {
        console.log('Error updating requirements:', error);
      });
  };


  const onRefresh = () => {
    setRefreshing(true);
    firebase.firestore().collection('teams').get().then(querySnapshot => {
      const newRows = querySnapshot.docs.map(doc => ({
        id: doc.id,
        nickname: doc.data().nickname,
        userId: doc.data().userId,
      }));
      setRows(newRows);
      setRefreshing(false);
    }).catch(error => {
      console.log('Error refreshing list:', error);
      setRefreshing(false);
    });
  };

  const handleMaxLengthChange = (maxLength) => {
    setMaxListLength(maxLength);
  };
  
  return (
    <View style={styles.container}>
      <View style={styles.halfContainer}>
                <NextMatchDescription
                    isGroupLeader={isGroupLeader}
                    maxListLength={maxListLength}
                    onMaxLengthChange={handleMaxLengthChange}
                />
            </View>
            <View style={styles.halfContainer}>
                <NextMatchList
                    rows={rows}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    removeRow={removeRow}
                />
            </View>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.addButton} onPress={handleAddButtonPress}>
          <Text  color="green" >Add me to the list!</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
 
const styles = StyleSheet.create({
  container: {
      flex: 1,
      backgroundColor: '#97c6d1',
      paddingTop: 20,
  },
  halfContainer: {
    flex: 1,
},
  row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingHorizontal: 20,
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: '#E0E0E0',
  },
  rowText: {
      fontSize: 16,
      color: '#333',
  },
  addButton: {
      marginTop: 20,
      marginBottom:10,
      backgroundColor: 'white',
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 20,
      alignItems: 'center',
  },
  inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 20,
      width: '100%',
  },
  addButtonLabel: {
      color: '#FFF',
      fontSize: 18,
      fontWeight: 'bold',
  },
});

export default NextMatchListsPage;
