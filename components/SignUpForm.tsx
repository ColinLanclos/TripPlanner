import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const SignUpForm = () => {
  const [userName, onChangeUsername] = React.useState('');
  const [emailInput, onChangeEmail] = React.useState('');
  const [passwordInput, onChangePassword] = React.useState('');
  const [confirmPassword, onChangeNumberConfirmPassword] = React.useState('');

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
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangePassword}
              value={passwordInput}
              placeholder="Enter your password"
              secureTextEntry={true}
            />
          </View>

          {/* Confirm Password Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Confirm Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangeNumberConfirmPassword}
              placeholder="Confirm your password"
              value={confirmPassword}
              secureTextEntry={true}
              autoComplete="off"
            />
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={() => console.log('Sign Up')}
            style={styles.submitButton}
          >
            <Text style={styles.submitButtonText}>Sign Up</Text>
          </TouchableOpacity>

          {/* Login Link */}
          <TouchableOpacity onPress={() => router.push('/(auth)/login')}>
            <Text style={styles.linkText}>Already have an account? Login</Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
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
