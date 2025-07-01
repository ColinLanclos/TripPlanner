import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect } from "react";
import { RadioButton } from 'react-native-paper';
import { doc, getDoc, updateDoc } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { auth, db } from "@/firebaseConfig";

const AttendingStatues = () => {
    const [checked, setChecked] = React.useState('');

    //chekcing going statues
    useEffect(() => {
        const checkStatues = async () => {
        const value = await AsyncStorage.getItem('tripId');
        if(!value){
            return;
        }
        try{
        const docRef = doc(db, "trip" ,value, "Guest", "List");
        const existingDoc = await getDoc(docRef);
        if (!existingDoc.exists()) {
          console.log("List document does not exist.");
          return;
        }
        const userId = auth.currentUser?.uid;
        if(!userId){
            return;
        }
        const userDoc = await getDoc(doc(db ,'users' , userId ));
        const userNameData: any = userDoc.data();
        const username: string = userNameData.userName; 
        
    
        const userArray = existingDoc.data()[username];
        console.log(" right here here here ")
        console.log(userArray[0])
        setChecked(userArray[0])
    }catch(error){
        console.log(error)
    }
        }
        checkStatues();
    },[]);

    //updating going statues
    useEffect(() => {
        const updateStatus = async () => {
            const value = await AsyncStorage.getItem('tripId');
            if(!value){
                return;
            }
            //get username
            const userId = auth.currentUser?.uid;
            

            if(userId){
                const userDoc = await getDoc(doc(db ,'users' , userId ));
                const userNameData: any = userDoc.data();
                const username: string = userNameData.userName; 
                console.log(username)
                
                const docRef = doc(db, "trip" ,value, "Guest", "List");
                try {
                    // Get the existing array for that user first
                    const existingDoc = await getDoc(docRef);
                    if (!existingDoc.exists()) {
                      console.log("List document does not exist.");
                      return;
                    }
                    
                
                    const userArray = existingDoc.data()[username];
                    console.log(userArray);
                
                    if (!userArray || !Array.isArray(userArray)) {
                      console.log("No array found for user:", username);
                      return;
                    }
                
                    // Replace first element (status)
                    const updatedArray = [checked, ...userArray.slice(1)];
                
                    // Update only the user's field
                    await updateDoc(docRef, {
                      [username]: updatedArray,
                    });
                
                    console.log("Status updated successfully.");
                  } catch (error) {
                    console.error("Failed to update status:", error);
                  }

            }

        }
        updateStatus();
    },[checked])


    return(
        <View style={styles.container}> 
            <Text style={styles.header}>Attending Status</Text>
            <Text style={styles.subheader}>Please select your attendance status</Text>

            <View style={styles.radioOption}>
                <RadioButton
                    value="going"
                    status={checked === 'going' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('going')}
                    color="#4CAF50" // Green for "Going"
                />
                <TouchableOpacity onPress={() => setChecked('going')}>
                    <Text style={styles.radioLabel}>Going</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.radioOption}>
                <RadioButton
                    value="maybe"
                    status={checked === 'maybe' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('maybe')}
                    color="#FF9800" // Orange for "Maybe"
                />
                <TouchableOpacity onPress={() => setChecked('maybe')}>
                    <Text style={styles.radioLabel}>Maybe</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.radioOption}>
                <RadioButton
                    uncheckedColor="red"
                    value="Not Going"
                    status={checked === 'Not Going' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('No tGoing')}
                    color="#F44336" // Red for "Not Going"
                />
                <TouchableOpacity onPress={() => setChecked('Not Going')}>
                    <Text style={styles.radioLabel}>Not Going</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#333",
        textAlign: 'center',
        marginBottom: 10,
    },
    subheader: {
        fontSize: 16,
        color: "#666",
        textAlign: 'center',
        marginBottom: 20,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,  // Added more margin for spacing
        paddingVertical: 10, // Added padding for better layout
    },
    radioLabel: {
        fontSize: 18,
        color: "#333",
        marginLeft: 10,
        marginTop: 2, // Small margin top to align text with radio button
    },
});

export default AttendingStatues;
