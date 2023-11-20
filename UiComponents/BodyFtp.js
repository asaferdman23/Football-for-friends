import React, { useState } from 'react';
import { View, Switch, StyleSheet,Text } from 'react-native';
const BodyFtp = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={switchStyle.container}>
            <Text>Open up App.js to start working on your app!</Text>
            <Switch 
                trackColor={{ false: '#767577', true: '#81b0ff' }}
                thumbColor={isEnabled ? '#f5dd4b' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
                />
        </View>
    );
}

const switchStyle = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    }
  });
  
export default BodyFtp;