import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

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
  const handleAddEvent = (date: string) => {
    console.log(`Add event to ${date}`);
    // You could open a modal or navigate to add screen
  };

  const handleEditEvent = (date: string, time: string) => {
    console.log(`Edit event on ${date} at ${time}`);
    // Trigger modal, route push, or inline edit
  };

  return (
    <ScrollView style={styles.container}>
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
  });

  export default Itinerary;