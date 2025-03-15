import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AddGroceryButton = () => {
  const handlePress = () => {
    console.log("Add Grocery Button Pressed");
    // You can perform actions here, such as opening a modal or adding an item to the list.
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <Text style={styles.buttonText}>Add Grocery</Text>
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
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

// Ensure there is only one default export
export default AddGroceryButton;
