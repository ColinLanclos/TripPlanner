import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
//import LoginForm from "@/components/LoginForm";
const style = StyleSheet.create({
  colorText: {
    textAlign: "left",
    color: "rgb(120, 173, 207)",
  },
});

const resetpassword = () => {
  return (
    <SafeAreaView>
      <ScrollView className="container bg-white w-full h-full text-left">
        <View className="items-center">
           <Text>Build Reset Password Component</Text>
        </View>
      </ScrollView>
      </SafeAreaView>
  );
};

export default resetpassword;

const styles = StyleSheet.create({});
