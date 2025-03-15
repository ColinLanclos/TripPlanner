import AddPersonButton from "@/components/AddPersonButton";
import React, { useState } from "react";
import { View, Text, FlatList, Switch, StyleSheet, Image } from "react-native";

const peopleList = [
  {
    id: "1",
    name: "John Doe",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    coming: true,
  },
  {
    id: "2",
    name: "Jane Smith",
    image: "https://randomuser.me/api/portraits/women/2.jpg",
    coming: false,
  },
  {
    id: "3",
    name: "Mike Johnson",
    image: "https://randomuser.me/api/portraits/men/3.jpg",
    coming: true,
  },
  {
    id: "4",
    name: "Emily Davis",
    image: "https://randomuser.me/api/portraits/women/4.jpg",
    coming: false,
  },
];

const TripPeopleList = () => {
  const [people, setPeople] = useState(peopleList);


  return (
    <View style={styles.container}>
      <AddPersonButton />
      <FlatList
        data={people}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.textContainer}>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.status}>
                {item.coming ? "Coming" : "Not Coming"}
              </Text>
            </View>
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
  image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  status: {
    fontSize: 16,
    color: "#555",
  },
});

export default TripPeopleList;
