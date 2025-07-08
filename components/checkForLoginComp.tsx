import { useEffect, useState } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig'; // adjust path to your Firebase config
import { useRouter } from 'expo-router';

interface Props {
  children: React.ReactNode;
}

export default function CheckForLoginComp({ children }: Props) {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCheckingAuth(false);
      if (!user) {
        router.replace('/login'); // or whatever route you use
      }
    });

    return unsubscribe;
  }, []);

  if (checkingAuth) {
    return (
      <View style={styles.loading}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return <>{children}</>;
}

const styles = StyleSheet.create({
  loading: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
