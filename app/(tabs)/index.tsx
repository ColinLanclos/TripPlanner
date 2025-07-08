import { Image,Text, StyleSheet, Platform, View } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { SafeAreaView } from 'react-native-safe-area-context';
import ListTripComp from '@/components/ListTripComp';
import { Link } from 'expo-router';
import CheckForLoginComp from '@/components/checkForLoginComp';

export default function HomeScreen() {
  return (
    <SafeAreaView style={{flex:1}} >
      <Text>Wow</Text>
      <Link href={"/(auth)/login"}> To Auth</Link>
  
          <ListTripComp />
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
