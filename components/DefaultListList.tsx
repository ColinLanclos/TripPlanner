import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useRouter } from 'expo-router';

const trips = [
  { id: '1', name: 'Hiking Trip' },
  { id: '2', name: 'Beach Vacation' },
  { id: '3', name: 'Ski Weekend' },
];

const DefaultListList = () => {
  const router = useRouter();

  const handlePress = (tripId: string, tripName: string) => {
    router.push({
      pathname: '/(list)/EditDefaultList',
      params: { tripId, tripName },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Trips</Text>
      <FlatList
        data={trips}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.tripButton}
            onPress={() => handlePress(item.id, item.name)}
          >
            <Text style={styles.tripText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    fontWeight: 'bold',
  },
  tripButton: {
    padding: 16,
    backgroundColor: '#dce7ff',
    borderRadius: 12,
    marginBottom: 10,
  },
  tripText: {
    fontSize: 18,
  },
});

export default DefaultListList;