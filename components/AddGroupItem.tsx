import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AddGroupItemButton = () => {
  const handlePress = () => {
    console.log("Add Group Item Button Pressed");
    // You can perform actions here, such as opening a modal or adding a group item to the list.
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <Text style={styles.buttonText}>Add Group Item</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#28a745', // Green color to differentiate the button from Add Grocery
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

export default AddGroupItemButton;
