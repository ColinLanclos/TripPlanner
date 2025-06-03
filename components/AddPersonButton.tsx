import React, { useState } from 'react';
import { TouchableOpacity, Text, StyleSheet, TextInput, View, Modal } from 'react-native';

const AddPersonButton = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [itemName, setItemName] = useState("");
  const [display, setDisplay] = useState(false);
  
  const handleAddPerson = () => {
    console.log('Add Person button pressed!');
    setModalVisible(true);
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
    <View>
    <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setDisplay(false);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Add New Item</Text>

              <Text>Item Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={setItemName}
                value={itemName}
              />
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() =>  addNewitem()}>
                <Text style={styles.textStyle}>Add New Item</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.buttonClose]}
                onPress={() =>  {setModalVisible(false),
                  setDisplay(false);}}>
                <Text style={styles.textStyle}>Cancel</Text>
              </TouchableOpacity>
              {display && <Text style={styles.redText}>Fill In Box Before Submittings</Text>}
            </View>
          </View>
        </Modal>

    <TouchableOpacity style={styles.button} onPress={handleAddPerson}>
      <Text style={styles.buttonText}>Add Person</Text>
    </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 5
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  redText:{
    color: '#FF0000',
    fontSize: 25,
    textAlign: 'center',
  },input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },buttonOpen: {
    backgroundColor: '#F194FF',
  }, buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  }, centeredView: {
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
  },modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

export default AddPersonButton;
