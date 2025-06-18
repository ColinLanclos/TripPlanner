import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { getAuth, updatePassword } from 'firebase/auth';
import {auth } from "../firebaseConfig"

const ChangePassword = ({ visible, onClose }: { visible: boolean; onClose: () => void }) => {
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleChangePassword = async () => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (passwordRegex.test(newPassword)) {
      console.log("Error: Not a Valid PW");
      return;
    }

    if (newPassword !== confirmPassword) {
      console.log("Passwords Do not Match");
      return;
    }

    const user = auth.currentUser;


    if (user) {
      try {
        await updatePassword(user, newPassword);
        console.log("Password Changed");
        setNewPassword('');
        setConfirmPassword('');
        onClose(); // Close modal
      } catch (error: any) {
        Alert.alert("Error", error.message);
      }
    }
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Change Password</Text>
          <TextInput
            placeholder="New Password"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
            style={styles.input}
          />
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            style={styles.input}
          />
          <View style={styles.buttonRow}>
            <TouchableOpacity onPress={onClose} style={styles.cancelButton}>
              <Text style={styles.buttonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={handleChangePassword} style={styles.saveButton}>
              <Text style={styles.buttonText}>Update</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

export default ChangePassword;
const styles = StyleSheet.create({
    overlay: {
      flex: 1,
      justifyContent: 'center',
      backgroundColor: 'rgba(0,0,0,0.5)',
      padding: 20,
    },
    modal: {
      backgroundColor: '#fff',
      borderRadius: 12,
      padding: 20,
    },
    title: {
      fontSize: 20,
      fontWeight: '600',
      marginBottom: 20,
      textAlign: 'center',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 8,
      padding: 12,
      marginBottom: 12,
    },
    buttonRow: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      gap: 10,
    },
    cancelButton: {
      backgroundColor: '#ccc',
      padding: 12,
      borderRadius: 8,
    },
    saveButton: {
      backgroundColor: '#4A90E2',
      padding: 12,
      borderRadius: 8,
    },
    buttonText: {
      color: '#fff',
      fontWeight: '600',
    },
  });
  