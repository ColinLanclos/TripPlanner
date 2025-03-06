import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const CreateNewTripForm = () => {
  const [TripTitle, onChangeTripTitle] = React.useState('');
  const [destination, onChangeDestination] = React.useState('');
  const [dates, onChangeDates] = React.useState('');
  const [people, onChangePeople] = React.useState('');
  const [discription, onChangeDiscription] = React.useState('');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text style={styles.header}>Create New Trip</Text>

          {/* Trip Title */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Trip Title</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeTripTitle}
              placeholder="Trip Title"
              value={TripTitle}
              autoComplete="off"
            />
          </View>

          {/* Destination */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Destination</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeDestination}
              value={destination}
              placeholder="Destination"
            />
          </View>

          {/* Dates */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Dates</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeDates}
              value={dates}
              placeholder="Dates"
            />
          </View>

          {/* People */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Invite People</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangePeople}
              value={people}
              placeholder="People"
            />
          </View>

          {/* Description */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeDiscription}
              value={discription}
              placeholder="Description"
              multiline={true}
              numberOfLines={4}
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={() => console.log('Submit')}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1, // Ensures full screen usage
  },
  formContainer: {
    padding: 20,
    paddingBottom: 40, // Extra padding at the bottom
    justifyContent: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    color: '#333',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
  },
  submitButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CreateNewTripForm;
