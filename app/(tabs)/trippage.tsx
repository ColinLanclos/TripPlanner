import { ScrollView, Text, TouchableOpacity, View, StyleSheet } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TripPlanComp from '@/components/TripPlanComp';
import AttendingStatues from '@/components/AttendingStatues';
import { router } from 'expo-router';


const styles = StyleSheet.create({
    container: {
      flex: 1,
      paddingTop: 5,
      paddingHorizontal: 20,
      flexDirection: 'row',
      flexWrap: 'wrap', // Allow items to wrap
      justifyContent: 'space-between', // Evenly space out buttons
    },
    button: {
      backgroundColor: '#6e3b6e', // Purple background
      paddingVertical: 12,         // Padding on top and bottom
      paddingHorizontal: 20,       // Padding on the sides
      marginBottom: 15,            // Spacing between buttons
      borderRadius: 8,             // Rounded corners
      alignItems: 'center',        // Center the text horizontally
      justifyContent: 'center',    // Center the text vertically
      width: '48%',                // Each button takes up roughly half the width
      elevation: 3,                // Add shadow for Android
      shadowColor: '#000',         // iOS shadow color
      shadowOffset: { width: 0, height: 2 }, // Shadow offset
      shadowOpacity: 0.2,          // Shadow opacity
      shadowRadius: 4,             // Shadow blur radius
    },
    buttonText: {
      color: '#fff',               // White text color
      fontSize: 18,                 // Font size
      fontWeight: 'bold',           // Bold text
    },
    centeredWrapper: {
      alignItems: 'center',
      marginTop: 20, // optional spacing
    },
  });
  

export default function TripPage() {
  return (
      <SafeAreaView edges={["top",'bottom']}>
        <ScrollView className="container bg-white w-full h-full text-left">
          <View className="mt-5">
            <Text>Ntn</Text>
            <TripPlanComp /> 
            <View style={styles.centeredWrapper}>
              <TouchableOpacity
                onPress={() => {
                  router.push("/(list)/Itinerary");
                  console.log("Pressed?");
                }}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Itinerary</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.container}>
              
                <TouchableOpacity
                    onPress={() => { router.push("/(list)/grocerylist"); console.log("Pressed?"); }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Grocery List</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { router.push("/(list)/ItemsList"); console.log("Pressed?"); }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Trip List</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { router.push("/(list)/PersonItems"); console.log("Pressed?"); }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Your List</Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={() => { router.push("/(list)/TripPeopleList"); console.log("Pressed?"); }}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>Guest List</Text>
                </TouchableOpacity>
            </View>
            <AttendingStatues />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
    

}

