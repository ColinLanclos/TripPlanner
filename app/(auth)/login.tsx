import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import LoginForm from "@/components/LoginForm";
const style = StyleSheet.create({
  colorText: {
    textAlign: "left",
    color: "rgb(120, 173, 207)",
  },
});

const login = () => {
  return (
    <SafeAreaView>
      <ScrollView className="container bg-white w-full h-full text-left">
        <View className="items-center">
           <Link href={"/(tabs)/createtrip"}>back to other</Link>
           <Text>Build in login component</Text>
           <LoginForm />
        </View>
        
      </ScrollView>
      </SafeAreaView>
  );
};

export default login;

const styles = StyleSheet.create({});
