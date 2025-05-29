import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, TextInput, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const LoginForm = () => {
  const [emailInput, onChangeEmail] = React.useState('');
  const [passwordInput, onChangePassword] = React.useState('');

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
            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              onChangeText={onChangePassword}
              value={passwordInput}
              placeholder="Enter your password"
              secureTextEntry={true}
            />
          </View>

          {/* Login Button */}
          <TouchableOpacity
            onPress={() => console.log('Login')}
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
