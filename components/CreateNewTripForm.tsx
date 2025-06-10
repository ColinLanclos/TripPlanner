import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import DateTimePickerModal from "react-native-modal-datetime-picker";

const CreateNewTripForm = () => {
  const [TripTitle, onChangeTripTitle] = React.useState('');
  const [destination, onChangeDestination] = React.useState('');
  const [dates, onChangeDates] = React.useState('');
  const [startDate, setStartDate] = React.useState('Date 1');
  const [endDate, setEndDate] = React.useState('Date 2');
  const [showDatePickerStart, setShowDatePickerStart] = React.useState(false);
  const [showDatePickerEnd, setShowDatePickerEnd] = React.useState(false);
  const [people, onChangePeople] = React.useState('');
  const [discription, onChangeDiscription] = React.useState('');

  const hideDatePicker = () => {
    setShowDatePickerStart(false);
    setShowDatePickerEnd(false);
  };

  function handleConfirmStart(date: Date): void {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const day = date.getDate().toString().padStart(2, '0');

    setStartDate(`${year}-${month}-${day}`);
  }

  function handleConfirmEnd(date: Date): void {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
    const day = date.getDate().toString().padStart(2, '0');
    
    setEndDate(`${year}-${month}-${day}`);
  }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        {/* start date picker */}
        <DateTimePickerModal
                date={new Date()}
                display="spinner"
                  isVisible={showDatePickerStart}
                  mode="date"
                  onConfirm={handleConfirmStart}
                  onCancel={hideDatePicker}
                  pickerComponentStyleIOS={{height: 300}}
                />
                
        {/* end date picker */}
        <DateTimePickerModal
                date={new Date()}
                display="spinner"
                  isVisible={showDatePickerEnd}
                  mode="date"
                  onConfirm={handleConfirmEnd}
                  onCancel={hideDatePicker}
                  pickerComponentStyleIOS={{height: 300}}
                />
        

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
            <Text style={styles.label}>Dates: {startDate} to {endDate}</Text>

            <View style={styles.buttonRow}>
              <TouchableOpacity onPress={() => setShowDatePickerStart(true)} style={styles.button}>
                <Text style={styles.buttonToChooseDates}>Choose Start Date</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={() => setShowDatePickerEnd(true)} style={styles.button}>
                <Text style={styles.buttonToChooseDates}>Choose End Date</Text>
              </TouchableOpacity>
            </View>
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
  buttonToChooseDates: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '500',
  },buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },button: {
    flex: 1,
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 4,
    marginHorizontal: 4,
  },
});

export default CreateNewTripForm;
