import React, { useEffect, useState } from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { registerForPushNotificationsAsync } from './helpers/registerForPushNotifications';

const NOTIF_MODAL_SHOWN_KEY = 'notif_modal_shown';

const NotificationPermissionModal = ({ userId }: { userId: string }) => {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkIfShown = async () => {
      const shown = await AsyncStorage.getItem(NOTIF_MODAL_SHOWN_KEY);
      if (!shown) {
        setVisible(true);
      }
      setLoading(false);
    };

    checkIfShown();
  }, []);

  const handleAllow = async () => {
    await registerForPushNotificationsAsync(userId);
    await AsyncStorage.setItem(NOTIF_MODAL_SHOWN_KEY, 'true');
    setVisible(false);
  };

  const handleMaybeLater = async () => {
    await AsyncStorage.setItem(NOTIF_MODAL_SHOWN_KEY, 'true');
    setVisible(false);
  };

  if (loading) {
    return null; // or a loading spinner
  }

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.overlay}>
        <View style={styles.modal}>
          <Text style={styles.title}>Enable Notifications</Text>
          <Text style={styles.message}>
            Stay up to date with trip invites, updates, and reminders!
          </Text>
          <View style={styles.buttons}>
            <Button title="Maybe Later" onPress={handleMaybeLater} />
            <Button title="Enable Notifications" onPress={handleAllow} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NotificationPermissionModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: '85%',
    padding: 24,
    backgroundColor: '#fff',
    borderRadius: 20,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 12,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});
