import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AddPersonButton = () => {
  const handleAddPerson = () => {
    console.log('Add Person button pressed!');
    // Add your logic here to add a person
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleAddPerson}>
      <Text style={styles.buttonText}>Add Person</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default AddPersonButton;
