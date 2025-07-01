import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import { Avatar, Button, Card, Text } from 'react-native-paper';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { doc, getDoc } from 'firebase/firestore';
import {db , auth} from '../firebaseConfig';

interface TripInfo {
    address: string;
    dates: [];
    description: string;
    owner: string;
    title: string;
}



const TripCard = (tripId: any) => {
    const [data, setData] = useState<TripInfo | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        
        const fetchTrip = async () => {
            setLoading(true);
            const value = await AsyncStorage.getItem('tripId');
            const tripId = value as string;
          setLoading(true);
          try {
            const docRef = doc(db, "trip", tripId);
            const snap = await getDoc(docRef);
            if (snap.exists()) {
              setData(snap.data() as TripInfo);
              console.log(snap.data())
              console.log(data);
            } else {
              setError("Trip not found");
            }
          } catch (e: any) {
            console.error("Error fetching trip:", e);
            setError(e.message);
          } finally {
            setLoading(false);
          }
        };
        fetchTrip();
    }, [tripId]);

    return (
        <View style={{width:'98%'}}>
            <Card style={{}}> 
                <Card.Title title={data?.title}/>
                <Card.Content>
                    <Text variant="titleLarge"> Address: {data?.address}</Text>
                    <Text variant="bodyMedium"> Description: {data?.description}</Text>
                    <Text variant="bodySmall"> Dates:{data?.dates.at(0)} to {data?.dates.at(1)}</Text>
                    <Text variant="bodySmall"> Owner: {data?.owner}</Text>
                </Card.Content>
                <Card.Cover resizeMode='cover' source={{uri: 'data:image/jpeg;base64,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'}} />
            </Card>
            
        </View>
    )
}
export default  TripCard;
