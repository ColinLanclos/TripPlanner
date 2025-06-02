import AddDefaultModal from "@/components/AddDefualtModal";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, FlatList } from "react-native";

const items = [
  { id: '1', name: 'Tent', person: 'John Doe', bringing: true },
  { id: '2', name: 'Sleeping Bag', person: '', bringing: false }, // No one is bringing it
  { id: '3', name: 'Food Supplies', person: 'Michael Brown', bringing: true },
  { id: '4', name: 'First Aid Kit', person: '', bringing: false }, // No one is bringing it
  // More items can be added here
];

const EditDefaultList = (nameOfTrip: string) => {
  const [data, setData] = useState(items);
  const { tripId, tripName } = useLocalSearchParams();

  // Handle toggle for the switch
  const handleSwitchToggle = (itemId: string) => {
    const updatedData = data.map(item => 
      item.id === itemId ? { ...item, bringing: !item.bringing, person: item.bringing ? '' : 'No one' } : item
    );
    setData(updatedData);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.title}>Items for the Trip {tripName}</Text>
        {/* List of Items */}
        <FlatList
          data={data}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.name}</Text>
              <View style={styles.switchContainer}>
              <TouchableOpacity onPress={() => console.log("Minus pressed", item.id)} style={styles.addsub}>
                  <Text style={styles.buttonText} >−</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log("Plus pressed", item.id)} style={styles.addsub}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContent}
        />

        {/* Button or any other content */}
        <TouchableOpacity onPress={() => console.log('Going to the next screen')}>
          <Text style={styles.button}>Go to Next Screen</Text>
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  addsub: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10, // Or use marginHorizontal if gap doesn't work in your RN version
  },
  safeArea: {
    flex: 1, // Ensure SafeAreaView takes the full height of the screen
  },
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 20,
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 15,  // Space between items
  },
  itemName: {
    fontSize: 18,
    flex: 2,  // Makes the item name take up more space
  },
  itemPerson: {
    
    fontSize: 16,
    color: 'gray',
    flex: 3,  // Ensures enough space for the person
  },
  switchContainer: {
    marginLeft: 2,
    gap: 20,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,  // Makes sure switch aligns properly
  },
  flatListContent: {
    paddingBottom: 20, // Adds padding to the bottom for scrolling space
  },
  button: {
    marginTop: 20,
    backgroundColor: '#007BFF',
    color: 'white',
    padding: 10,
    textAlign: 'center',
    borderRadius: 5,
    fontWeight: 'bold',
  },
});

export default EditDefaultList;