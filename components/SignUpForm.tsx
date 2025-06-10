import { router } from 'expo-router';
import {useState} from 'react';
import { useForm, Controller } from 'react-hook-form';
import { StyleSheet, TextInput, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';




const SignUpForm = () => {
  const [userName, onChangeUsername] = useState('');
  const [emailInput, onChangeEmail] = useState('');
  const [passwordInput, onChangePassword] = useState('');
  const [confirmPassword, onChangeNumberConfirmPassword] = useState('');
  const [redTextForAll, setRedTextForAll] = useState(false);
  const [redTextNonUnqueUserName, setRedTextForNonUnqueUserName] = useState(false);
  const [redTextForUnvalidUserNamer, setRedTextForUnvalidUserNamer ] = useState(false);
  const [redTextForEmail, setRedTextForEmail] = useState(false);
  const [redTextForPassword, setRedTextForPassword] = useState(false);
  const [redTextForConfirmPassword, setRedTextForConfirmPassword] = useState(false);
  const [peepPassword, setPeepPassword] = useState(true);
  const [redTextForEmailAlreadyUsed, setRedTextForEmailAlreadyUsed] = useState(false);
  

  async function onSubmit() {
    let hasError = false;
  
    // Basic empty field check
    if (!userName || !emailInput || !passwordInput || !confirmPassword) {
      setRedTextForAll(true);
      hasError = true;
    } else {
      setRedTextForAll(false);
    }
  
    // Username validation
    const usernameRegex = /^[a-zA-Z0-9]{5,15}$/;
    if (!usernameRegex.test(userName)) {
      setRedTextForUnvalidUserNamer(true);
      hasError = true;
    } else {
      setRedTextForUnvalidUserNamer(false);
  
      // Replace with actual Firebase check
      const isUsernameTaken = false; // await checkUsernameInFirebase(userName);
      if (isUsernameTaken) {
        setRedTextForNonUnqueUserName(true);
        hasError = true;
      } else {
        setRedTextForNonUnqueUserName(false);
      }
    }
  
    // Email validation
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(emailInput)) {
      setRedTextForEmail(true);
      hasError = true;
    } else {
      setRedTextForEmail(false);
  
      // Replace with actual Firebase email check
      const isEmailTaken = false; // await checkEmailInFirebase(emailInput);
      if (isEmailTaken) {
        setRedTextForEmailAlreadyUsed(true);
        hasError = true;
      } else {
        setRedTextForEmailAlreadyUsed(false);
      }
    }
  
    // Password validation
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,}$/;
    if (!passwordRegex.test(passwordInput)) {
      setRedTextForPassword(true);
      hasError = true;
    } else {
      setRedTextForPassword(false);
      if (passwordInput !== confirmPassword) {
        setRedTextForConfirmPassword(true);
        hasError = true;
      } else {
        setRedTextForConfirmPassword(false);
      }
    }
  
    // Final check
    if (!hasError) {
      //firebase things
      console.log("All Good ✅");
      // Submit your form here
    }else{
      console.log("shit")
    }
  }
  
  
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.header}>Sign Up</Text>

          {/* Username Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>User Name</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeUsername}
              placeholder="Enter your username"
              value={userName}
              keyboardType="default"
              autoComplete="off"
            />
          </View>
          {redTextNonUnqueUserName && <Text style={styles.redText}>User Name Already Taken</Text>}
          {redTextForUnvalidUserNamer && <Text style={styles.redText}>User Name has to be 5 Characters Long and No Spaces and No Upper Case</Text>}

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
          {redTextForEmail && <Text style={styles.redText}>Not A Valid Email</Text>}
          {redTextForEmailAlreadyUsed && <Text style={styles.redText}>Email Already Used</Text>}


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
            />
          </View>
          {redTextForPassword && (
          <Text style={styles.redText}>
            Password must be at least 8 characters long, include at least 1 uppercase letter, and contain at least 1 special character (e.g. !@#$%^&*).
          </Text>
        )}

          {/* Confirm Password Input */}
          <View style={styles.inputGroup}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Text style={styles.label}>Confirm Password</Text>
            <TouchableOpacity onPress={() => setPeepPassword(!peepPassword)} style={{ padding: 10 }}>
              <Icon name={!peepPassword ? 'visibility' : 'visibility-off'} size={24} />
            </TouchableOpacity>
          </View>
            <TextInput
              style={styles.input}
              onChangeText={onChangeNumberConfirmPassword}
              placeholder="Confirm your password"
              value={confirmPassword}
              secureTextEntry={peepPassword}
              autoComplete="off"
            />
          </View>
          {redTextForConfirmPassword && (
          <Text style={styles.redText}>
            Passwords Do Not Match
          </Text>
        )}

          {/* Submit Button */}
          <TouchableOpacity
            onPress={() => onSubmit()}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>Sign Up</Text>
          </TouchableOpacity>

          {redTextForAll && <Text style={styles.redText}>Please Fill in All Boxes</Text>}

          {/* Login Link */}
          <TouchableOpacity onPress={() => router.push("/(auth)/login")}>
            <Text style={styles.linkText}>Already have an account? Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 30,
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
  submitButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  linkText: {
    color: '#007BFF',
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
    fontWeight: '500',
  },
});

export default SignUpForm;
