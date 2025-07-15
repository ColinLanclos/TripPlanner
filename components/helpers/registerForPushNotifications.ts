import * as Notifications from 'expo-notifications';
import * as Device from 'expo-device';
import { Alert } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export async function registerForPushNotificationsAsync(userId: string) {
    if (!Device.isDevice) {
        Alert.alert('Must use physical device for notifications');
        return;
    }

    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;

    if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
    }

    if (finalStatus !== 'granted') {
        Alert.alert('Notification permissions not granted');
        return;
    }

    const tokenData = await Notifications.getExpoPushTokenAsync();
    const token = tokenData.data;
    console.log('✅ Expo Push Token:', token);

    await setDoc(doc(db, 'users', userId), { pushToken: token }, { merge: true });
}
