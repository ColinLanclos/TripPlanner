import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Modal, TextInput } from 'react-native';
import { withRepeat } from 'react-native-reanimated';
import DateTimePickerModal from "react-native-modal-datetime-picker";
const itinerary = {
  "June 1": {
    "11:00 - 3:00": {
      description: "Breaching",
      where: "Whale Bay",
    },
    "4:00 - 6:00": {
      description: "Beach Picnic",
      where: "Sunset Shore",
    },
  },
  "June 2": {
    "9:00 - 10:30": {
      description: "Morning Hike",
      where: "Eagle Trail",
    },
  },
};

const Itinerary = () => {
  const [modalAddToDateVisible, setModalAddToDateVisible] = useState(false);
  const [display, setDisplay] = useState(false);
  const [date, setDate] = useState("")
  const [datePick, setDatePicker] = useState(new Date())
  const [timeFrame, setTimeFrame] = useState("");
  const [newWhere , setNewWhere] = useState("");
  const [newDisription, setNewDiscription] = useState("");
  const [open, setOpen] = useState(false)
  const [showTimePicker, setShowTimePicker] = useState(false);

  const handleAddEvent = (date: string) => {
    console.log(`Add event to ${date}`);
    setDate(date);
    setModalAddToDateVisible(true);
  };


  const handleEditEvent = (date: string, time: string) => {
    console.log(`Edit event on ${date} at ${time}`);
    // Trigger modal, route push, or inline edit
  };

  const handleConfirm = (date: any) => {
    console.warn("A date has been picked: ", date);
    setShowTimePicker(false);
  };
  const hideDatePicker = () => {
    setShowTimePicker(false);
  };


  const addNewDateEvent = () => {
    throw new Error('Function not implemented.');
  }

  return (
    <ScrollView style={styles.container}>
       <Modal
          animationType="slide"
          transparent={true}
          visible={modalAddToDateVisible}
          onRequestClose={() => {
            setDisplay(false);
            setDate("");
            setNewWhere("");
            setNewDiscription("")
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Add New Event To {date}</Text>

              <Text>Time Frame</Text>
              <DateTimePickerModal
              date={new Date()}
              display="spinner"
                isVisible={showTimePicker}
                mode="time"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                pickerComponentStyleIOS={{height: 300}}
              />

              <TouchableOpacity
                style={[styles.buttonModal, styles.buttonClose]}
                onPress={() =>  setShowTimePicker(true)}>
                <Text style={styles.textStyle}>Pick Times</Text>
              </TouchableOpacity>

              <Text>Where</Text>
              <TextInput
                keyboardType='numeric'
                style={styles.input}
                onChangeText={setNewWhere}
                value={newWhere}
              />  

              <Text>Discrition</Text>
              <TextInput
                keyboardType='numeric'
                style={styles.input}
                onChangeText={setNewDiscription}
                value={newDisription}
              />  

              <TouchableOpacity
                style={[styles.buttonModal, styles.buttonClose]}
                onPress={() =>  addNewDateEvent()}>
                <Text style={styles.textStyle}>Add New Item</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.buttonModal, styles.buttonClose]}
                onPress={() =>  {setModalAddToDateVisible(false),
                  setDisplay(false);}}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              {display && <Text style={styles.redText}>Fill In Both Boxes Before Submittings</Text>}
            </View>
          </View>
        </Modal>

      {Object.entries(itinerary).map(([date, events]) => (
        <View key={date} style={styles.dateSection}>
          <View style={styles.dateHeader}>
            <Text style={styles.dateText}>{date}</Text>
            <TouchableOpacity onPress={() => handleAddEvent(date)} style={styles.addButton}>
              <Text style={styles.addButtonText}>＋</Text>
            </TouchableOpacity>
          </View>

          {Object.entries(events).map(([time, details]) => (
            <View key={time} style={styles.eventItem}>
              <View style={styles.timeRow}>
                <Text style={styles.timeText}>{time}</Text>
                <TouchableOpacity onPress={() => handleEditEvent(date, time)} style={styles.editButton}>
                  <Text style={styles.editButtonText}>Edit</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.descText}>Description: {details.description}</Text>
              <Text style={styles.whereText}>Where: {details.where}</Text>
            </View>
          ))}
        </View>
      ))}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
    container: {
      padding: 16,
      backgroundColor: '#ffffff',
    },
    dateSection: {
      marginBottom: 20,
    },
    dateHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: 10,
    },
    dateText: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#1e3a8a',
    },
    addButton: {
      backgroundColor: '#4f46e5',
      borderRadius: 20,
      paddingHorizontal: 10,
      paddingVertical: 4,
    },
    addButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    eventItem: {
      backgroundColor: '#eef2ff',
      borderRadius: 10,
      padding: 10,
      marginBottom: 8,
    },
    timeRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    timeText: {
      fontSize: 16,
      fontWeight: '600',
      color: '#374151',
    },
    editButton: {
      paddingVertical: 2,
      paddingHorizontal: 8,
      backgroundColor: '#dbeafe',
      borderRadius: 6,
    },
    editButtonText: {
      color: '#2563eb',
      fontWeight: '600',
    },
    descText: {
      fontSize: 14,
      color: '#4b5563',
      marginTop: 4,
    },
    whereText: {
      fontSize: 14,
      color: '#4b5563',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    buttonModal: {
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
    redText:{
      color: '#FF0000',
      fontSize: 25,
      textAlign: 'center',
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    buttonOpen: {
      backgroundColor: '#F194FF',
    },
    buttonClose: {
      backgroundColor: '#2196F3',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    
  });

  export default Itinerary;