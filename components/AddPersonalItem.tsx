import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

const AddPersonalItemButton = () => {
  const handlePress = () => {
    console.log("Add Personal Item Button Pressed");
    // You can perform actions here, such as opening a modal or adding a personal item to the list.
  };

  return (
    <TouchableOpacity onPress={handlePress} style={styles.button}>
      <Text style={styles.buttonText}>Add Personal Item</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#ffc107', // Yellow color to differentiate from other buttons
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

export default AddPersonalItemButton;
