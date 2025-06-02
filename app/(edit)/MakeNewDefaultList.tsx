import NewDefaultList from '@/components/NewDefaultList';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet,Modal, View, TextInput } from 'react-native';
import { red } from 'react-native-reanimated/lib/typescript/Colors';
import { SafeAreaView } from 'react-native-safe-area-context';


const AddDefaultModal = (props: string) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [itemName, setItemName] = useState("");
  const [display, setDisplay] = useState(false);

  const handlePress = () => {
    console.log(`Add Group Item Button Pressed ${props}`);
    setModalVisible(true);
    // You can perform actions here, such as opening a modal or adding a group item to the list.
  };

  function addNewitem() {
    if(!itemName){
      setDisplay(true);
    }else{
      setDisplay(false);
      setModalVisible(!modalVisible);
      //add to defualt List
      console.log("Added New List");
      let tempVar = itemName;
      //router.push()
      setItemName("");
    }
  }

  return (
    <SafeAreaView>
      <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setDisplay(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Name New List</Text>

              <Text>New Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={setItemName}
                value={itemName}
              />
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() =>  addNewitem()}>
                <Text style={styles.textStyle}>Submit</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() =>  {
                  setModalVisible(false);
                    router.replace("/(list)/DefualtListEditorAndMaker");
                  ;}}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              {display && <Text style={styles.redText}>Fill In Box Before Submittings</Text>}
            </View>
          </View>
        </Modal>
        
      <TouchableOpacity onPress={handlePress} style={styles.button}>
        <Text style={styles.buttonText}>Add New Item To List</Text>
      </TouchableOpacity>
      <NewDefaultList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  redText:{
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
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
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
  },
  button: {
    backgroundColor: '#28a745', // Green color to differentiate the button from Add Grocery
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default AddDefaultModal;
