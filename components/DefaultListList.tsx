import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';
import { useEffect, useState } from 'react';
import { auth, db } from "../firebaseConfig"
import { doc, collection, getDoc, onSnapshot } from 'firebase/firestore';


interface tripData{
  listTitle:string;
};

const DefaultListList = () => {
  const [trips, setTrips] = useState<any>([]); 

  useEffect(() => {
    console.log("Trips updated:", trips);
  }, [trips]);

  useEffect(() => {

    {/* grab userid*/}
    const userId = auth.currentUser?.uid
    if(!userId){
      console.log("User Not Found");
      return;
    }

    {/*Grabbing default list*/}
    const listRef = collection(db, "users", userId, "Default_List");
    const unsubscribe = onSnapshot(listRef, (snapshot) => {
      const items = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...(doc.data() as []),
      }));
      console.log(items)
      setTrips(items)
    }, (error) => {
      console.error("Snapshot error:", error);
    });

    console.log(trips)
    return () => unsubscribe();
    
  }, [])

  const router = useRouter();

  const handlePress = ( tripName: string, defaultTripList: []) => {
    router.push({
      pathname: '/(list)/EditDefaultList',
      params: {tripName,
      defaultTripList: JSON.stringify(defaultTripList),} ,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Trips</Text>
      {trips && trips.length > 0 ? (
      <FlatList
        data={trips}
        keyExtractor={(item , index) =>  item + index}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.tripButton}
            onPress={() => handlePress(item.id, item.items)}
          >
            <Text style={styles.tripText}>{item.id}</Text>
          </TouchableOpacity>
        )}
            />
            
          ) : (
            <View style={styles.emptyStateContainer}>
              <Text style={styles.emptyStateTitle}>No Trips Yet</Text>
              <Text style={styles.emptyStateText}>Start by creating your first list ✨</Text>
            </View>
          )}
    </View>
  );
}

const styles = StyleSheet.create({
  emptyStateContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  emptyStateTitle: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 10,
    color: '#333',
  },
  emptyStateText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  tripButton: {
    padding: 16,
    backgroundColor: '#dce7ff',
    borderRadius: 12,
    marginBottom: 10,
  },
  tripText: {
    fontSize: 18,
  },
});

export default DefaultListList;