import React from 'react';
import { View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const NewsHeader = () => {
  return (
    <View style={styles.container}>
      <MaterialCommunityIcons name="plus-box-multiple-outline" size={32} color="#000" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    width: '100%',
    backgroundColor: '#f3f6f4',
  },
});

export default NewsHeader;
