import AddPersonButton from "@/components/AddPersonButton";
import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, FlatList, Switch, StyleSheet, Image, Modal, ActivityIndicator, TouchableOpacity } from "react-native";
import { deleteDoc, deleteField, doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../firebaseConfig";

type Person = {
  name: string;
  status: string;
  image: string;
};

const TripPeopleList = () => {
  const [people, setPeople] = useState<Person[]>([]);
  const [loading, setLoading] = useState(false);

  type Person = {
    name: string;
    status: string;
    image: string;
  };

  //grabbing list of people on trip
  useEffect(() => {
    const grabData = async () => {
      try {
        setLoading(true);
        console.log("Getting Trip Id");
        const value = await AsyncStorage.getItem('tripId');
        if (value !== null) {
          console.log("Trip ID:", value);
          const tripId = value as string;

          const docRef = doc(db, "trip", tripId, "Guest", "List")

          const unsubscribe = onSnapshot(docRef, (docSnap) => {
            if (docSnap.exists()) {
              const data = docSnap.data();

              const peopleArray = Object.entries(data).map(([name, [status, image]]) => ({
                name,
                status,
                image,
              }));

              setPeople(peopleArray);
            } else {
              setPeople([]);
            }
          });
          // Clean up the listener on unmount
          setLoading(false);
          return () => unsubscribe();
        } else {
          setLoading(false);
          console.log("No Trip ID found in AsyncStorage");
        }
      } catch (error) {
        setLoading(false);
        console.log(error);
      }
    };
    grabData();
  }, []);

 
  const kickUser =  async (userName: string) =>{
    try{

      console.log(userName)
      const docRef = doc(db, "usernames",userName);
      const user: any =  await (await getDoc(docRef)).data();
      const userId = user.id;
      console.log(userId)

      const value = await AsyncStorage.getItem('tripId');
      if(!value){
        return;
      }
      const tripDocRef = doc(db, "trip", value, "Guest", "List")
      
      await updateDoc(tripDocRef,{[userName]: deleteField()})
      


    const tripUserDocRef = doc(db, "users", userId , "trips", value);
    // Delete the document
    await deleteDoc(tripUserDocRef);

    }catch(error){
      console.log(error)
    }
  }
  

  return (
    <View style={styles.container}>
      <Modal
            transparent={true}
            animationType="none"
            visible={loading}
            onRequestClose={() => {}}
          >
            <View style={styles.overlay}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.loadingText}>Processing...</Text>
            </View>
      </Modal>
      <AddPersonButton />
      {people.length > 0 ? (
        <FlatList
        data={people}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.status}>{item.status}</Text>
            </View>
            <TouchableOpacity
              style={styles.kickButton}
              onPress={() => kickUser(item.name)}
            >
              <Text style={styles.kickText}>Kick</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      ) : (
        <Text style={styles.emptyText}>No people yet. Invite someone!</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  kickButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: "red",
    borderRadius: 5,
    marginLeft: "auto",
    justifyContent: "center",
    alignItems: "center",
  },
  kickText: {
    color: "white",
    fontWeight: "bold",
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  loadingText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
  },
  emptyText: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "gray",
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  status: {
    fontSize: 16,
    color: "#555",
  },
});

export default TripPeopleList;
