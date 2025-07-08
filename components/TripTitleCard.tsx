import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import React, {useCallback, useEffect, useState} from 'react';
import { Avatar, Button, Card,Text } from 'react-native-paper';
import {
  FlatList,
  Modal,
  StatusBar,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import {db , auth} from '../firebaseConfig';
import { async } from '@firebase/util';
import { router } from 'expo-router';

interface TripInfo {
    address: string;
    dates: [];
    description: string;
    owner: string;
    title: string;
}



const TripCard = (tripId: any) => {
    const [data, setData] = useState<TripInfo | null>(null);
    const [isOwner, setisOwner] = useState(false);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [display, setDisplay] = useState(false);
    const [address, setAddress] = useState("");
    const [description, setDscription] = useState("");
    const [dates, setDates] = useState(["",""])
    const [startDate, setStartDate] = React.useState('Date 1');
    const [endDate, setEndDate] = React.useState('Date 2');
    const [showDatePickerStart, setShowDatePickerStart] = React.useState(false);
    const [showDatePickerEnd, setShowDatePickerEnd] = React.useState(false);

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
              const userId = auth.currentUser?.uid
              if(!userId){
                return
              }
              const docUserTrip = doc(db, "users", userId, "trips", tripId);
              await deleteDoc(docUserTrip);
              console.log("deleted in user data")
              router.push("/(tabs)")
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
    
    useEffect(() => {
      const checkForOwner = async () =>{
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
      if(data?.owner != userName){
        setisOwner(false);
      }else{
        setisOwner(true)
      }
      }
      checkForOwner()
    },[data])


    const hideDatePicker = () => {
      setShowDatePickerStart(false);
      setShowDatePickerEnd(false);
    };

    function handleConfirmStart(date: Date): void {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
      const day = date.getDate().toString().padStart(2, '0');
  
      setStartDate(`${year}-${month}-${day}`);
      setShowDatePickerStart(false);
    }

    function handleConfirmEnd(date: Date): void {
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
      const day = date.getDate().toString().padStart(2, '0');
      
      setEndDate(`${year}-${month}-${day}`);
      setShowDatePickerEnd(false)
    }

    const onEditPress =  async () =>{
      setAddress(data?.address || '')
      setStartDate(data?.dates.at(0) || "")
      setEndDate(data?.dates.at(1) || "")
      setDscription(data?.description || "")
      setModalVisible(true);
    }

    const editTripDetials = async () => {
      if(address === ""|| description === ""){
        setDisplay(true);
      }else{
        const value = await AsyncStorage.getItem('tripId');
        console.log("Getting Trip Id")
        console.log(value)
        const id = value as string;
        try {
          const docRef = doc(db, "trip", id)
          await updateDoc(docRef,{
            address: address,
            dates: [startDate, endDate],
            description: description
          })
          setModalVisible(false);
        } catch (error) { 
          console.log(error);
        }
        setDisplay(false);
      }
    }

    const onclose = async () => {
      setAddress('')
      setDates([])
      setDscription("")
      setModalVisible(false);
    }

        


    return (
      <View style={{width:'98%'}}>
          {/* edit trip */}
           <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setDisplay(false);
                setAddress(data?.address || '')
                setDates(data?.dates || [])
                setDscription(data?.description || "")
                setModalVisible(false);
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <Text style={styles.modalText}>Edit Trip</Text>
                <Text>Address</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setAddress}
                    value={address}
                />
                <Text>Description</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setDscription}
                    value={description}
                />
                <Text>Date 1: {startDate}</Text>
                <TouchableOpacity onPress={() => setShowDatePickerStart(true)} style={styles.button}>
                    <Text style={styles.buttonToChooseDates}>Choose Start Date</Text>
                </TouchableOpacity>
                {/* start date picker */}
                <DateTimePickerModal
                        date={new Date()}
                        display="spinner"
                          isVisible={showDatePickerStart}
                          mode="date"
                          onConfirm={handleConfirmStart}
                          onCancel={hideDatePicker}
                          pickerComponentStyleIOS={{height: 300}}
                        />
                <Text>Date 2: {endDate}</Text>
                <TouchableOpacity onPress={() => setShowDatePickerEnd(true)} style={styles.button}>
                    <Text style={styles.buttonToChooseDates}>Choose Start Date</Text>
                </TouchableOpacity>
                <DateTimePickerModal
                    date={new Date()}
                    display="spinner"
                      isVisible={showDatePickerEnd}
                      mode="date"
                      onConfirm={handleConfirmEnd}
                      onCancel={hideDatePicker}
                      pickerComponentStyleIOS={{height: 300}}
                    />

                <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() =>  editTripDetials()}>
                    <Text style={styles.textStyle}>Submit</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() =>  {onclose();}}>
                    <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
                {display && <Text style={styles.redText}>Fill In Box Before Submittings</Text>}
                </View>
            </View>
           </Modal>

           <Card style={styles.card}>
              <Card.Title title={data?.title || 'Untitled Trip'} />

              <Card.Cover
                resizeMode="cover"
                source={{ uri: `https://maps.googleapis.com/maps/api/streetview?location=${data?.address}&size=600x400&key=AIzaSyAdpb_QNAlmoL30L8bFm91HBidOmXm1OIw` }}
                style={styles.image}
              />

              <Card.Content>
                <Text variant="titleMedium" style={styles.text}>
                  📍 Address: {data?.address || 'Not specified'}
                </Text>
                <Text variant="bodyMedium" style={styles.text}>
                  📝 {data?.description || 'No description provided.'}
                </Text>
                <Text variant="bodySmall" style={styles.text}>
                  📅 Dates: {data?.dates?.at(0) || 'N/A'} to {data?.dates?.at(1) || 'N/A'}
                </Text>
                <Text variant="bodySmall" style={styles.text}>
                  👤 Owner: {data?.owner || 'Unknown'}
                </Text>
              </Card.Content>

              {/* ✅ Add the action button here */}
              {isOwner && (
                <Card.Actions>
                  <Button
                    mode="contained-tonal"
                    onPress={() => {
                      console.log('Edit Pressed ✅');
                      onEditPress?.();
                    }}
                  >
                    Edit
                  </Button>
                </Card.Actions>
              )}
            </Card>

      </View>
    )
}
export default  TripCard;

const styles = StyleSheet.create({
  buttonWrapper: {
    flex: 1,
    alignItems: 'flex-end', // or 'center' / 'flex-start'
  },
   editButton: {
    backgroundColor: '#e0e0e0', // tonal look
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginTop: 8,
    elevation:10
  },
  editButtonText: {
    color: '#000',
    fontWeight: '600',
    fontSize: 16,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  button: {
    backgroundColor: '#4f46e5',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },centeredView: {
    flex: 1,
    justifyContent: 'center',
  },modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },redText:{
    color: '#FF0000',
    fontSize: 25,
    textAlign: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  card: {
    margin: 12,
    zIndex: 10, 
    elevation: 3 ,
    borderRadius: 12,
  },
  image: {
    height: 180,
  },
  text: {
    marginTop: 4,
  },
  buttonToChooseDates: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
