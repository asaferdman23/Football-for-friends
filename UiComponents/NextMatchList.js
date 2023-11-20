import React from 'react';
import { View, Text, TouchableOpacity,FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const NextMatchList = ({ rows, refreshing, onRefresh, removeRow }) => {
  const renderRow = ({ item }) => {
    return (
      <View style={styles.row}>
        <Text style={styles.rowText}>{`${item.fullName}`}</Text>
        <TouchableOpacity onPress={() => removeRow(item.id)}>
          <MaterialIcons name="remove-circle" size={24} color="red" />
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <Text style={styles.title}>The List</Text>
      <FlatList 
        data={rows}
        renderItem={renderRow}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
};

const styles = {
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
    marginTop: 35,
    textAlign: 'center',
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
};

export default NextMatchList;
