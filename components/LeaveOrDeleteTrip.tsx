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
import { auth, db } from '@/firebaseConfig';
import { deleteDoc, deleteField, doc, getDoc, updateDoc } from 'firebase/firestore';



const LeaveOrDeleteTrip = () => {
    const [isOwner , setIsOwner] = useState(false);
    const [tripdId, setTripId] = useState("");
    const [UserName, setUsername] = useState("");


    const onDeletePress = async () => {
        //delete from trips but will have to make a function in firebase
        try {
        const tripRef = doc(db, 'trip', tripdId);
        await deleteDoc(tripRef); 

        const userId = auth.currentUser?.uid;
        if(!userId){
            return;
        } 
        const docUserTrip = doc(db, "users", userId, "trips", tripdId);
        await deleteDoc(docUserTrip);
        console.log("deleted in user data")
        router.push("/(tabs)")

      } catch (error) {
          console.log(error)
      }

        
    }
     
    const onLeavePress = async () => {
        const docGuestRef = doc(db, "trip", tripdId, "Guest", "List")
        //delete in guest list
        console.log(UserName)
        console.log(tripdId)
        await updateDoc(docGuestRef, {
            [UserName]: deleteField()
          });
          console.log("deleted in guest list")
        const userId = auth.currentUser?.uid;
        if(!userId){
            return;
        }

        //delete from Personal List in Trip
        const docPersonalRef = doc(db, "trip", tripdId, "PersonalList", userId)
        await deleteDoc(docPersonalRef);
        console.log("deleted in personal list")

        //delete from user data
        const docUserTrip = doc(db, "users", userId, "trips", tripdId);
        await deleteDoc(docUserTrip);
        console.log("deleted in user data")
        router.push("/(tabs)")
    }

    useFocusEffect(
      useCallback(() =>{
          const getData = async () => {
              try {
                  const value = await AsyncStorage.getItem('tripId');
                  console.log("Getting Trip Id")
                  console.log(value)
                  const id = value as string;
                  setTripId(id);
                  const tripDocRef = doc(db, "trip", id)
                  const tripSnap = await getDoc(tripDocRef)
                  if (!tripSnap.exists()) {
                      return
                  }
                  const tripOwner = tripSnap.data().owner;

                  const userid = auth.currentUser?.uid;
                  if(!userid){
                      return
                  }
                  const userRef = doc(db, "users", userid);
                  const userSnap = await getDoc(userRef);

                  if (!userSnap.exists()) {
                      return
                  }
                  const userName = userSnap.data().userName;
                  setUsername(userName)
                  if(tripOwner != userName){
                      setIsOwner(false);
                  }else{
                      setIsOwner(true)
                  }
              } catch (error) {
                  console.log(error)
              }
          }
          getData();
      },[tripdId]))


    return(

        <View>
        {isOwner ? (
            <TouchableOpacity style={styles.deleteButton} onPress={() => onDeletePress()}>
              <Text style={styles.deleteButtonText}>Delete Trip</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity style={styles.leaveButton} onPress={() => onLeavePress()}>
              <Text style={styles.leaveButtonText}>Leave Trip</Text>
            </TouchableOpacity>
          )}

        </View>

    )
}

 export default LeaveOrDeleteTrip;

 const styles = StyleSheet.create({
    deleteButton: {
      backgroundColor: '#ff4d4d',
      paddingVertical: 12,
      paddingHorizontal: 24, // inner space
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 12,
      marginHorizontal: 20, // outer space from screen edges
    },
    deleteButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
    leaveButton: {
      backgroundColor: '#ffaa00',
      paddingVertical: 12,
      paddingHorizontal: 24, // inner space
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 12,
      marginHorizontal: 20, // outer space from screen edges
    },
    leaveButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });
  