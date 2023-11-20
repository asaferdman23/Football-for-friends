import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import NewsHeader from "../NewsHeader";
import { useState } from 'react';
import { TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const NewsPage = () => {
 

  return (
    <View style={styles.container}>
     <Text style={styles.text}>News page</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    padding:20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
  },
  rowText: {
    fontSize: 16,
  },
  addButton: {
    marginTop: 20,
    backgroundColor: 'transparent',
  },
});
export default NewsPage;