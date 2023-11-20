import React from 'react';
import { View, Text ,ImageBackground} from 'react-native';
import MaxPeoplePicker from './MaxPeoplePicker';

const NextMatchDescription = ({ isGroupLeader, maxListLength, onMaxLengthChange }) => {
  return (
    <ImageBackground source={require('../assets/pngwing.com.png')} style={styles.backgroundImage}>
    <View style={styles.container}>
      <Text style={styles.title}>Next Match</Text>
      {isGroupLeader && (
        <View style={styles.pickerContainer}>
          {/* <MaxPeoplePicker
            maxListLength={maxListLength}
            onValueChange={onMaxLengthChange}
          /> */}
        </View>
      )}
    </View>
    </ImageBackground>
  );
};

const styles = {
    container: {
        flex: 1,
        position: 'relative',
      },
      backgroundImage: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        resizeMode: 'cover',
      },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: 'white',
    marginTop: 35,
    textAlign: 'center',
  },
  pickerContainer: {
    marginBottom: 10,
  },
  selectedValue: {
    fontSize: 16,
    textAlign: 'center',
    marginTop: 10,
  },
};

export default NextMatchDescription;
