import { SafeAreaView, View, Text, TouchableOpacity, StyleSheet, Modal, TextInput } from 'react-native';
import { router } from 'expo-router';
import DefaultListList from '@/components/DefaultListList';
import { useState } from 'react';
import {auth, db} from "../../firebaseConfig";
import { setDoc, doc, collection, addDoc } from 'firebase/firestore';

const DefaultListEditorAndMaker = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [itemName, setItemName] = useState("");
  const [display, setDisplay] = useState(false);

  async function addNewDefaultList() {
    if (!itemName) {
      setDisplay(true); // Show validation error
    } else {
      setDisplay(false);
      setModalVisible(false);

      const userId = auth.currentUser?.uid
      if(!userId){
        console.log("User Not Found");
        return;
      }
      try{
      const colRef = doc(db, "users", userId, "Default_List", itemName);
      await setDoc(colRef,{});
      }catch(error){
        console.log(error)
      }
  
      
      let tempVar = itemName;
  
      // Navigate to a screen and pass item name
      router.push({
        pathname: "/(list)/EditDefaultList", // or whatever route you're going to
        params: { tripName: tempVar },       // pass the item name as param
      });
  
      setItemName(""); // Clear input
    }
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setDisplay(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Add New Defualt List</Text>
              <Text>Default List Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={setItemName}
                value={itemName}
              />
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() =>  addNewDefaultList()}>
                <Text style={styles.textStyle}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() =>  {setModalVisible(false);}}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              {display && <Text style={styles.redText}>Fill In Box Before Submittings</Text>}
            </View>
          </View>
        </Modal>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.buttonText}>Make New Default List</Text>
        </TouchableOpacity>

        <Text style={styles.description}>
          Under here will be a list of already-made lists with names. On click, it will go to the details page, just like the Home Page.
        </Text>

        <Text style={styles.sectionTitle}>Default Lists</Text>

        <DefaultListList />
      </View>
    </SafeAreaView>
  );
};

export default DefaultListEditorAndMaker;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 20,
  },
  button: {
    backgroundColor: '#4f46e5',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16,
  },
  description: {
    fontSize: 14,
    color: '#333',
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
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
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
});
