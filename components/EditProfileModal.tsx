import { useState } from "react";
import { TouchableOpacity, View, Text, StyleSheet, Modal, TextInput} from "react-native";

type editProfile = {
    name: string,
    phone: string
}

const EditProfileModal = (props: editProfile) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [name, setName] = useState(props.name);
    const [phoneNumber, setPhoneNumber] = useState(props.phone);
    const [display, setDisplay] = useState(false);
  

    function handleEditProfile() {
        if(!name || !phoneNumber){
            setDisplay(true);
          }else{
            setDisplay(false);
            setModalVisible(!modalVisible);
            console.log("Added New Item");
          }
    }

    return(
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
                <Text style={styles.modalText}>Edit Profile</Text>

                <Text>Name</Text>
                <TextInput
                    style={styles.input}
                    onChangeText={setName}
                    value={name}
                />

                <Text>Phone Number</Text>
                <TextInput
                    keyboardType='numeric'
                    style={styles.input}
                    onChangeText={setPhoneNumber}
                    value={phoneNumber}
                />  

                <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() =>  handleEditProfile()}>
                    <Text style={styles.textStyle}>Edit Profile</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, styles.buttonClose]}
                    onPress={() =>  {setModalVisible(false),
                    setDisplay(false);
                    setName(props.name);
                    setPhoneNumber(props.phone)
                    }}>
                    <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
                {display && <Text style={styles.redText}>Fill In Both Boxes Before Submittings</Text>}
                </View>
            </View>
            </Modal>

    
        <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
    </View>
    )
}

const styles = StyleSheet.create({
    button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
  },buttonText: {
    color: '#fff',
    fontSize: 18,
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

})

export default EditProfileModal;