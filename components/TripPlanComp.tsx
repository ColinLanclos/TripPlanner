import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { useFocusEffect } from '@react-navigation/native';
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import TripCard from './TripTitleCard';



const TripPlanComp = () => {
    const [tripId , onChangeTripId] = useState("");
    const getData = async () => {
    try {
        const value = await AsyncStorage.getItem('tripId');
        console.log("Getting Trip Id")
        console.log(value)
        if (value !== null) {
            // call to firebase and then we will see stuff
            onChangeTripId(value);
        }
    } catch (e) {
        router.push("/(tabs)");
    }
    };
    //to reload page stuff
    useFocusEffect(
        useCallback(() => {
        getData(); // Function to load new data
        }, [])
    );

    return(
        <View style={{justifyContent:'center',alignItems: 'center'}}>
            <Text> 
                <TripCard />
            </Text>
        </View>
    )
}

 export default TripPlanComp;