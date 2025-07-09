import AddGroupItemButton from "@/components/AddGroupItem";
import WhoBringItemModal from "@/components/WhoBringItemModal";
import { auth, db } from "@/firebaseConfig";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { arrayRemove, arrayUnion, deleteField, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, Text, SafeAreaView, Switch, TouchableOpacity, StyleSheet, FlatList } from "react-native";

type Group = {
  id: string;
  people: string[];
};


const ItemListScreen = () => {
  const [groupList, setGroupList] = useState<Group[]>([]);
  const [tripId, setTripId] = useState("");

  // Handle toggle for the switch
  const handleSwitchToggle = (itemId: string) => {
  };

  const handlePlusItem =  async(id: string) => {
    try{
      const userId = auth.currentUser?.uid;
      if(!userId){
        return;
      }
      const docRef = doc(db, "users", userId)
      const data:any =  (await getDoc(docRef)).data()
      const userName = data.userName
      console.log(userName)

      const updateDocRef = doc(db, "trip", tripId,"Group","List")
      await updateDoc(updateDocRef,{
        [id]: arrayUnion(userName)
      })
      
    }catch(error){
      console.log(error);
    }
  }

  const handleMinusItem = async (id: string,) => {
    try{
      const userId = auth.currentUser?.uid;
      if(!userId){
        return;
      }
      const docRef = doc(db, "users", userId)
      const data:any =  (await getDoc(docRef)).data()
      const userName = data.userName
      console.log(userName)

      const updateDocRef = doc(db, "trip", tripId,"Group","List")
      await updateDoc(updateDocRef,{
        [id]: arrayRemove(userName)
      })

      const snap = await getDoc(updateDocRef);

      if (snap.exists()) {
        const data = snap.data();
        const groupArray = data[id]; // this is the array after removal

        // Step 3: If the array is empty, delete the field
        if (Array.isArray(groupArray) && groupArray.length === 0) {
          await updateDoc(updateDocRef, {
            [id]: deleteField()
          });
        }
      }


      
    }catch(error){
      console.log(error);
    }

  }

  useEffect(() => {
    const grabGroceries = async () =>{
    const value = await AsyncStorage.getItem('tripId');
    console.log(value)
    const id = value as string;
    setTripId(id)
    
    try{
    {/*Grabbing default list*/}
    const listRef = doc(db, "trip", id, "Group", "List");
    const unsubscribe = onSnapshot(listRef, (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as Record<string, string[]>;
        console.log(data);
        const items = Object.entries(data).map(([label, people]) => ({
          id: label,
          people
        }));
        console.log("here")
        console.log(items)
        items.sort((a, b) => a.id.localeCompare(b.id));
        setGroupList(items)
      } else {
        console.warn("Document does not exist");
        setGroupList([]);
      }
    }, (error) => {
      console.error("Snapshot error:", error);
    });

    console.log(groupList)
    return () => unsubscribe();
  }catch(error){
    console.log(error)
    }
  }
  grabGroceries();
  }, [])




  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <AddGroupItemButton thisId={tripId} />
        
        <Text style={styles.title}>Items for the Trip</Text>

        {/* List of Items */}
        <FlatList
          data={groupList}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemName}>{item.id}</Text>
              <View style={styles.itemPerson}>
                <WhoBringItemModal people={item.people} />
              </View>
              <View style={styles.switchContainer}>
              <TouchableOpacity onPress={() => handleMinusItem(item.id)} style={styles.addsub}>
                  <Text style={styles.buttonText} >−</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handlePlusItem(item.id)} style={styles.addsub}>
                  <Text style={styles.buttonText}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.flatListContent}
        />

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

export default ItemListScreen;