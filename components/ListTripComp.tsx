import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ImageBackground,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {auth , db} from "../firebaseConfig"
import { collection, doc, onSnapshot } from 'firebase/firestore';

type ItemData = {
  id: string;
  title: string;
  location: string; // Add location for fetching background image
  dates: ["" , ""]
};



const DATA: ItemData[] = [
];

type ItemProps = {
  item: ItemData;
  onPress: () => void;
  backgroundColor: string;
  textColor: string;
};

const Item = ({ item, onPress, backgroundColor, textColor }: ItemProps) => {
  // Google Static Maps API URL for background image
 // const googleMapsAPI = `https://maps.googleapis.com/maps/api/staticmap?center=${item.location}&zoom=12&size=500x300&maptype=roadmap&key=AIzaSyAdpb_QNAlmoL30L8bFm91HBidOmXm1OIw`;
  const googleMapsAPI = `https://maps.googleapis.com/maps/api/streetview?location=${item.location}&size=600x400&key=AIzaSyAdpb_QNAlmoL30L8bFm91HBidOmXm1OIw`

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.itemContainer, { backgroundColor }]}
    >
      <ImageBackground
        source={{ uri: googleMapsAPI }}
        style={styles.itemBackground}
        imageStyle={{ borderRadius: 8 }}
      >
        <View style={styles.itemTextContainer}>
          <Text style={[styles.title, { color: textColor }]}>{item.title}</Text>
          
          {/* Display Dates */}
          <Text style={[styles.dates, { color: textColor }]}>
            Dates: {item.dates[0]} - {item.dates[1]}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const ListTripComp = () => {
  const [DATA, setDATA] = useState<ItemData[]>()

  useEffect( () => {
    {/* grab userid*/}
    const userId = auth.currentUser?.uid
    if(!userId){
      console.log("User Not Found");
      return;
    }
  
    const colRef = collection(db, "users", userId, "trips")
    try{
    const unsubscribe = onSnapshot(colRef, (querySnapshot) => {
      const trips: any[] = [];
      querySnapshot.forEach((doc) => {
        trips.push({ id: doc.id, ...doc.data() });
      });
      setDATA(trips)
      console.log('Trips:', trips);
    });
  
    // ✅ Clean up the listener on unmount
    return () => unsubscribe();
  }catch(error){
    console.log(error)
  }
  }, [])



  const [selectedId, setSelectedId] = useState<string>();

  const renderItem = ({ item }: { item: ItemData }) => {
    const backgroundColor = item.id === selectedId ? '#6e3b6e' : '#f9c2ff';
    const color = item.id === selectedId ? 'white' : 'white';

    return (
      <Item
        item={item}
        onPress={async () => {
          setSelectedId(item.id);
          await removeValue();
          await storeData(item.id);
          router.push('/(tabs)/trippage');
        }}
        backgroundColor={backgroundColor}
        textColor={color}
      />
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Text style={styles.header}>Choose a Trip</Text>
        <FlatList
          data={DATA}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          extraData={selectedId}
        />
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight || 0,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  itemContainer: {
    marginBottom: 20,
    marginHorizontal: 10,
    borderRadius: 8,
    overflow: 'hidden', // Ensures the rounded corners
    height: 250, // Set height for the items
  },
  itemBackground: {
    flex: 1,
    justifyContent: 'flex-end', // Align text at the bottom of the background
    padding: 20,
  },
  itemTextContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent background for text
    padding: 10,
    borderRadius: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  dates: {
    fontSize: 14,
    marginTop: 5,
    fontStyle: 'italic',
  },
});

const storeData = async (value: string) => {
  try {
    console.log('Stored item here');
    await AsyncStorage.setItem('tripId', value);
  } catch (e) {
    console.log(e);
  }
};

const removeValue = async () => {
  try {
    await AsyncStorage.removeItem('tripId');
    console.log('Deleted Old Id');
  } catch (e) {
    console.log(e);
  }
  console.log('Done.');
};

export default ListTripComp;
