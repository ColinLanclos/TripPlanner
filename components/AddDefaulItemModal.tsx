import { Modal, View, Text, TouchableOpacity, TextInput, StyleSheet} from "react-native";
import { useState } from "react";
import {auth , db} from "../firebaseConfig";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
import { arrayUnion, collection, doc, setDoc, updateDoc } from "firebase/firestore";

type MyModalProps = {
    visible: boolean;
    onClose: () => void;
    thisTripName: string | string[];
  };




const AddDefaultItemModal: React.FC<MyModalProps> = ({visible , onClose, thisTripName}) =>{
    const [modalVisible, setModalVisible] = useState(false);
    const [itemName, setItemName] = useState("");
    const [display, setDisplay] = useState(false);

    async function addNewDefaultList(): Promise<void> {
        if(!itemName){
            setDisplay(true);
        }else{
            setDisplay(false);
            
            const userId = auth.currentUser?.uid;
            if(!userId){
                console.log("User Not Here");
                return;
            }else{
                const tripNameParam = thisTripName as string;
                const docRef = doc(db, "users", userId, "Default_List", tripNameParam);
                try{
                await updateDoc(docRef,{ items:arrayUnion(itemName)})
                onClose();
                }catch(error){
                    console.log(error);
                }
            }
        }

    }

    

    return(    
        <Modal
            animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={() => {
                setDisplay(false);
                setItemName("")
                onClose
            }}>
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                <Text style={styles.modalText}>Add New Item</Text>
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
                    onPress={() =>  {onClose();}}>
                    <Text style={styles.textStyle}>Cancel</Text>
                </TouchableOpacity>
                {display && <Text style={styles.redText}>Fill In Box Before Submittings</Text>}
                </View>
            </View>
            </Modal>
        )}

    export default AddDefaultItemModal;

    const styles = StyleSheet.create({
        button: {
            backgroundColor: '#4f46e5',
            paddingVertical: 14,
            paddingHorizontal: 20,
            borderRadius: 10,
            marginBottom: 20,
          },
        buttonOpen: {
            backgroundColor: '#F194FF',
          },
          buttonClose: {
            backgroundColor: '#2196F3',
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
    })