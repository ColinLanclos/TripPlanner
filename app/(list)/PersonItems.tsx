import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View, FlatList } from "react-native";

type ItemData = {
  id: string;
  name: string;
  isChecked: boolean;
};

const DATA: ItemData[] = [
  { id: "1", name: "Apples", isChecked: false },
  { id: "2", name: "Bananas", isChecked: false },
  { id: "3", name: "Oranges", isChecked: false },
  { id: "4", name: "Tomatoes", isChecked: false },
  { id: "5", name: "Lettuce", isChecked: false },
];

const ItemChecklist = () => {
  const [items, setItems] = useState(DATA);

  const toggleCheck = (id: string) => {
    const updatedItems = items.map((item) =>
      item.id === id ? { ...item, isChecked: !item.isChecked } : item
    );
    setItems(updatedItems);
  };

  const renderItem = ({ item }: { item: ItemData }) => (
    <View style={styles.itemContainer}>
      <TouchableOpacity
        style={[styles.checkbox, item.isChecked && styles.checked]}
        onPress={() => toggleCheck(item.id)}
      >
        <Text style={styles.checkboxText}>
          {item.isChecked ? "✔" : "❌"}
        </Text>
      </TouchableOpacity>
      <Text style={styles.itemText}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Item Checklist</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 20,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingVertical: 10,
    backgroundColor: "#fff",
    paddingHorizontal: 10,
    borderRadius: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderRadius: 4,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    backgroundColor: "#fff",
  },
  checked: {
    backgroundColor: "#4CAF50", // Green background when checked
    borderColor: "#4CAF50",
  },
  checkboxText: {
    fontSize: 16,
    color: "#333",
  },
  itemText: {
    fontSize: 18,
    color: "#333",
  },
});

export default ItemChecklist;
