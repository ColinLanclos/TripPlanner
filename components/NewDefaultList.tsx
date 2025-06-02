import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; // Using Expo Icons

const sampleItems = [
  { id: '1', name: 'Toothbrush' },
  { id: '2', name: 'Socks' },
  { id: '3', name: 'Tent' },
];

const NewDefaultList = () => {
  const handleDelete = (itemId: string) => {
    console.log(`Delete item with id: ${itemId}`);
    // Add your delete logic here (e.g., update state or call backend)
  };

  const renderItem = ({ item }: { item: { id: string; name: string } }) => (
    <View style={styles.itemContainer}>
      <Text style={styles.itemText}>{item.name}</Text>
      <TouchableOpacity onPress={() => handleDelete(item.id)}>
        <Ionicons name="trash-outline" size={24} color="#ef4444" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={sampleItems}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 14,
  },
  itemText: {
    fontSize: 16,
  },
  separator: {
    height: 1,
    backgroundColor: '#e5e7eb',
  },
});

export default NewDefaultList