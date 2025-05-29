import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { push } from 'expo-router/build/global-state/routing';

const ProfilePage = () => {
  const handleLogout = () => {
    router.push('/login');
  };

  const handleEditProfile = () => {
    console.log('Edit Profile button pressed!');
    // Add navigation or logic for editing the profile
  };

  const handleChangePassword = () => {
    console.log('Change Password button pressed!');
    // Add navigation or logic for changing the password
  };

  const handleMakeDefaultList = () => {
    router.push('../(list)/DefualtListEditorAndMaker');
  };

  return (
    <View style={styles.container}>
      {/* Profile Picture */}
      <Image
        source={{
          uri: 'https://media.glamour.com/photos/662aa1a5135aec3fedab0103/1:1/w_1607,h_1607,c_limit/Copy%20of%20Untitled%20Design%20(7).png',
        }}
        style={styles.profilePic}
      />

      {/* Name */}
      <Text style={styles.name}>Jim Bob Poopy Pants</Text>

      {/* Phone Number */}
      <Text style={styles.phone}>1234567890</Text>

      {/* Make Default List Button */}
      <TouchableOpacity style={styles.button} onPress={handleMakeDefaultList}>
        <Text style={styles.buttonText}>Make Default List</Text>
      </TouchableOpacity>

      {/* Edit Profile Button */}
      <TouchableOpacity style={styles.button} onPress={handleEditProfile}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      {/* Change Password Button */}
      <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
        <Text style={styles.buttonText}>Change Password</Text>
      </TouchableOpacity>

      {/* Logout Button */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  profilePic: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  phone: {
    fontSize: 18,
    color: 'gray',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: 'red',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default ProfilePage;
