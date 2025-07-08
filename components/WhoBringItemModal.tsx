import React, { useState } from 'react';
import { Modal, StyleSheet, Text, Pressable, View, TouchableOpacity } from 'react-native';

type Props = {
  people: string[];
};

const WhoBringItemModal: React.FC<Props> = ({ people: props }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [peeps, setPeeps] = useState<string[]>([]) 

  const OpenModalForBringing = () => {
    setPeeps(props)
    setModalVisible(true);
  };

  return (
    <View>
      <TouchableOpacity onPress={OpenModalForBringing}>
        <Text style={{ fontSize: 20, color: 'grey' }}>See Who's Bringing It</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
                {peeps.map((name:string, index:number) => (
              <Text key={index} style={{fontSize: 18,fontWeight: "600", marginBottom:8, color: "#333", letterSpacing: 0.5 }}>
                • {peeps[index]}
              </Text>
            ))}
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};


const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
});

export default WhoBringItemModal;