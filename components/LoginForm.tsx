import { router } from 'expo-router';
import React from 'react';
import {StyleSheet, TextInput,Text, TouchableOpacity, View} from 'react-native';
import {SafeAreaView, SafeAreaProvider} from 'react-native-safe-area-context';

const LoginForm = () => {
  const [emailInput, onChangeEmail] = React.useState('');
  const [passwordInput, onChangePassword] = React.useState('');

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <View style={{marginBottom:20, marginTop:20}}>
            <Text>Email</Text>
            <TextInput
            style={styles.input}
            onChangeText={onChangeEmail}
            placeholder="Email"
            value={emailInput}
            keyboardType="email-address"
            autoComplete='off'
            />
        </View>
        <View style={{marginBottom:20}}>
            <Text>Password</Text>
            <TextInput
            style={styles.input}
            onChangeText={onChangePassword}
            value={passwordInput}
            placeholder="Password"
            secureTextEntry={true}
            />
        </View>
        <TouchableOpacity onPress={() => console.log("Login")}>
            <Text>
                Login
            </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("/(auth)/resetpassword")}>
            <Text>
                Reset Password
            </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});

export default LoginForm;