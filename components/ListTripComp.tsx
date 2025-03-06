import { router } from 'expo-router';
import React, { useState } from 'react';
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

type ItemData = {
  id: string;
  title: string;
  tripId: string;
  location: string; // Add location for fetching background image
  startDate: string; // Start date for the trip
  endDate: string; // End date for the trip
};

const DATA: ItemData[] = [
  {
    id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    title: 'Beach Vacation',
    tripId: '12345',
    location: '410 N Main St, Loreauville, LA 70552',
    startDate: '2025-06-01',
    endDate: '2025-06-10',
  },
  {
    id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    title: 'Mountain Adventure',
    tripId: '67890',
    location: 'Denver, CO',
    startDate: '2025-07-01',
    endDate: '2025-07-07',
  },
  {
    id: '58694a0ff145571e29d72',
    title: 'City Exploration',
    tripId: '11223',
    location: 'New York, NY',
    startDate: '2025-08-15',
    endDate: '2025-08-20',
  },
  {
    id: '58694a0f-3dff-bd96-145571e29d72',
    title: 'Desert Escape',
    tripId: '44556',
    location: 'Phoenix, AZ',
    startDate: '2025-09-01',
    endDate: '2025-09-05',
  },
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
            Dates: {item.startDate} - {item.endDate}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

const ListTripComp = () => {
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
