import { router } from 'expo-router';
import React from 'react';
import {StyleSheet, TextInput,Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const CreateNewTripForm = () => {
  const [TripTitle, onChangeTripTitle] = React.useState('');
  const [destination, onChangeDestination] = React.useState('');
  const [dates, onChangeDates] = React.useState('');
  const [people, onChangePeople] = React.useState('');
  const [discription, onChangeDiscription] = React.useState('');

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={{marginBottom:20, marginTop:20}}>
            <Text>Trip Title</Text>
            <TextInput
            style={styles.input}
            onChangeText={onChangeTripTitle}
            placeholder="Trip Title"
            value={TripTitle}
            autoComplete='off'
            />
        </View>
        <View style={{marginBottom:20}}>
            <Text>Destinations</Text>
            <TextInput
            style={styles.input}
            onChangeText={onChangeDestination}
            value={destination}
            placeholder="Destination"
            />
        </View>
        <View style={{marginBottom:20}}>
            <Text>Dates</Text>
            <TextInput
            style={styles.input}
            onChangeText={onChangeDates}
            value={dates}
            placeholder="Dates"
            />
        </View>
    
        <View style={{marginBottom:20}}>
            <Text>Invite Pople (This might change)</Text>
            <TextInput
            style={styles.input}
            onChangeText={onChangePeople}
            value={people}
            placeholder="People"
            />
        </View>
        <View style={{marginBottom:20}}>
            <Text>Discription</Text>
            <TextInput
            style={styles.input}
            onChangeText={onChangeDiscription}
            value={discription}
            placeholder="Disription"
            />
        </View>
        <TouchableOpacity onPress={() => console.log("Submit")}>
            <Text>
                Submit
            </Text>
        </TouchableOpacity>

      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default CreateNewTripForm;