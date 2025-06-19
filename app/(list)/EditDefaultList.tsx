import AddDefaultItemModal from "@/components/AddDefaulItemModal";
import { auth,db } from "../../firebaseConfig";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, FlatList } from "react-native";
import { arrayRemove, collection, doc, onSnapshot, updateDoc } from "firebase/firestore";
import TripCard from "@/components/TripTitleCard";
import DeleteDefaultListModal from "@/components/DeleteDefaultListModal";
;

const EditDefaultList = (nameOfTrip: string) => {
  const [data, setData] = useState<any>([]);
  const { tripName, defaultTripList } = useLocalSearchParams();
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible ] = useState(false);

  

  const list = defaultTripList ? JSON.parse(defaultTripList as string) : [];
  useEffect(() => {

    {/* grab userid*/}
    const userId = auth.currentUser?.uid
    if(!userId){
      console.log("User Not Found");
      return;
    }

    {/*Grabbing default list*/}
    const tripNameStr = tripName as string;
    const listRef = doc(db, "users", userId, "Default_List", tripNameStr);
    const unsubscribe = onSnapshot(listRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data();
        const items = data.items || []; // safely handle if 'items' doesn't exist
        console.log(items)
        setData(items);
      } else {
        console.warn("Document does not exist");
        setData([]);
      }
    }, (error) => {
      console.error("Snapshot error:", error);
    });

    console.log(data)
    return () => unsubscribe();
  }, [])
  // Handle toggle for the switch
  const handleSwitchToggle = (itemId: string) => {
    
  };

  function openAddModel(): void {
    setModalVisible(true);
  }


  {/*Item Delete*/}
  async function deleteItem(item: string): Promise<void> {
    const userId = auth.currentUser?.uid
    if(!userId){
      console.log("User Not Found");
      return;
    }
    const tripNameStr = tripName as string;
    const docRef = doc(db, "users", userId, "Default_List", tripNameStr)
    try{
      await updateDoc(docRef, {
        items: arrayRemove(item), // Replace with the name you want to delete
      }); 
    }catch(error){
      console.log(error);
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <AddDefaultItemModal  visible={modalVisible} onClose={() => setModalVisible(false)} thisTripName={tripName} />
      <DeleteDefaultListModal visible={deleteModalVisible} onClose={() => setDeleteModalVisible(false)} thisTripName={tripName}/>
      <View style={styles.container}>
        <Text style={styles.title}>Items for the Trip {tripName}</Text>
        <TouchableOpacity onPress={() => openAddModel()}><Text style={styles.addingColor}>Add New Item</Text></TouchableOpacity>
        {data && data.length > 0 ? (
          <FlatList
            data={data}
            renderItem={({ item }) =>  (
              <View style={styles.itemContainer}>
                <Text style={styles.itemName}>{item}</Text>
                <View style={styles.switchContainer}>
                  <TouchableOpacity
                    onPress={() => deleteItem(item)}
                    style={styles.addsub}
                  >
                    <Text style={styles.buttonText}>🗑️</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
            keyExtractor={(index) => index}
            contentContainerStyle={styles.flatListContent}
          />
        ) : (
          <Text style={styles.emptyMessage}>No Items Yet</Text>
        )}
        <TouchableOpacity onPress={() => setDeleteModalVisible(true)} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete this Default list</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    padding: 12,
    backgroundColor: '#ffdddd',
    borderRadius: 6,
    alignItems: 'center',
    marginVertical: 10,
  },
  deleteButtonText: {
    color: '#cc0000',
    fontWeight: '600',
    fontSize: 16,
  },
  addingColor:{
    fontSize: 20,       // larger font
    color: '#007AFF',   // iOS-style blue
    textAlign: 'center',
  },
  emptyMessage: {
    fontSize: 20,       // larger font
    color: '#28a745',   // iOS-style blue
    textAlign: 'center',
    marginTop: 50
  },
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