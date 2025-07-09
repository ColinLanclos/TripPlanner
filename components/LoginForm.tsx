import { router } from 'expo-router';
import { Firestore } from 'firebase/firestore';
import {useState} from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, View, ScrollView, Modal, ActivityIndicator } from 'react-native';
import { ColorProperties } from 'react-native-reanimated/lib/typescript/Colors';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { auth } from  "../firebaseConfig"
import { signInWithEmailAndPassword, signOut} from  "firebase/auth"

const LoginForm = () => {
  const [emailInput, onChangeEmail] = useState('');
  const [passwordInput, onChangePassword] = useState('');
  const [peepPassword, setPeepPassword] = useState(true);
  const [showRedText, setShowRedText] = useState(false);
  const [wrongPWEmail, setWrongPWEmail] = useState(false);
  const [loading, setLoading] = useState(false);
  

  function onSubmit(){
      if(!emailInput || !passwordInput){
        setShowRedText(true);
      }else {
        signInWithEmailAndPassword(auth, emailInput, passwordInput)
        .then(() => {
          console.log('Signed in!');
          setLoading(false);
          setWrongPWEmail(false);
          router.push("/(tabs)")
        })
        .catch(error => {
          setLoading(false);
          console.error(error);
          setWrongPWEmail(true);
        });
      }
    }

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.header}>Login</Text>

          {/* Email Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeEmail}
              placeholder="Enter your email"
              value={emailInput}
              keyboardType="email-address"
              autoComplete="off"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputGroup}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.label}>Password</Text>
            <TouchableOpacity onPress={() => setPeepPassword(!peepPassword)} style={{ padding: 10 }}>
              <Icon name={!peepPassword ? 'visibility' : 'visibility-off'} size={24} />
            </TouchableOpacity>
          </View>
            <TextInput
              style={styles.input}
              onChangeText={onChangePassword}
              value={passwordInput}
              placeholder="Enter your password"
              secureTextEntry={peepPassword}
              autoComplete="off"
            />
          </View>
          {showRedText && <Text style={styles.redText}>Please Fill in All Boxes</Text>}
          {wrongPWEmail && <Text style={styles.redText}>Password And/Or Email is Not Found</Text>}

          {/* Login Button */}
          <TouchableOpacity
            onPress={() => onSubmit()}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => router.push("/(auth)/signup")}
            style={styles.loginButton}
          >
            <Text style={styles.loginButtonText}>Sign Up</Text>
          </TouchableOpacity>


          {/* Reset Password Link */}
          <TouchableOpacity onPress={() => router.push("/(auth)/resetpassword")}>
            <Text style={styles.resetPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          {/* loading spinner overlay */}
          <Modal
            transparent={true}
            animationType="none"
            visible={loading}
            onRequestClose={() => {}}
          >
            <View style={styles.overlay}>
              <ActivityIndicator size="large" color="#fff" />
              <Text style={styles.loadingText}>Processing...</Text>
            </View>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  loadingText: {
    marginTop: 10,
    color: '#fff',
    fontSize: 16,
  },
  redText: {
    color: 'red',
    fontWeight: 'bold',
    marginBottom: 10,
  },
  safeArea: {
    flex: 1,
  },
  container: {
    padding: 20,
    paddingBottom: 40,
    justifyContent: 'center',
    flex: 1,
  },
  header: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 8,
  },
  input: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingLeft: 10,
    fontSize: 16,
  },
  loginButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  resetPasswordText: {
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default LoginForm;
