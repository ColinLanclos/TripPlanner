import React, { useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AddGroceryItemModal from "@/components/AddGroceryItemModal";


const groceryList = [
  { id: "1", name: "Apples", quantity: 5, checked: false },
  { id: "2", name: "Bread", quantity: 2, checked: false },
  { id: "3", name: "Milk", quantity: 1, checked: true },
  { id: "4", name: "Eggs", quantity: 12, checked: false },
  { id: "5", name: "Chicken", quantity: 3, checked: true },
  { id: "6", name: "Chicken", quantity: 3, checked: true },
  { id: "7", name: "Chicken", quantity: 3, checked: true },
  { id: "8", name: "Chicken", quantity: 3, checked: true },
  { id: "9", name: "Chicken", quantity: 3, checked: true },
  { id: "10", name: "Chicken", quantity: 3, checked: true },
];

const GroceryList = () => {
  const [groceries, setGroceries] = useState(groceryList);

  const toggleChecked = (id: string) => {
    setGroceries((prevGroceries) =>
      prevGroceries.map((item) =>
        item.id === id ? { ...item, checked: !item.checked } : item
      )
    );
  };

  const increaseQuantity = (id: string) => {
    setGroceries((prevGroceries) =>
      prevGroceries.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (id: string) => {
    setGroceries((prevGroceries) =>
      prevGroceries.map((item) =>
        item.id === id && item.quantity > 0
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  return (
    <View style={styles.container}>
      <AddGroceryItemModal />
      <FlatList
        scrollEnabled={true} 
        data={groceries}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <View style={styles.quantityContainer}>
                <Text style={styles.quantity}>Qty: {item.quantity}</Text>
                <View style={styles.quantityButtons}>
                  <TouchableOpacity onPress={() => increaseQuantity(item.id)} style={styles.quantityButton}>
                    <Ionicons name="add-circle-outline" size={24} color="#007bff" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => decreaseQuantity(item.id)} style={styles.quantityButton}>
                    <Ionicons name="remove-circle-outline" size={24} color="#007bff" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            <TouchableOpacity onPress={() => toggleChecked(item.id)} style={{ padding: 4 }}>
              <Ionicons
                name={item.checked ? "checkbox" : "square-outline"}
                size={28}
                color="#007bff"
              />
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f8f9fa",
  },
  item: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#ffffff",
    borderRadius: 8,
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textContainer: {
    flexDirection: "column",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantity: {
    fontSize: 16,
    color: "#555",
    marginRight: 10,
  },
  quantityButtons: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    marginHorizontal: 8,
    padding: 4,
  },
});

export default GroceryList;
