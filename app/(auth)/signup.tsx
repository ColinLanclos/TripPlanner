import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import SignUpForm from "@/components/SignUpForm";

//import LoginForm from "@/components/LoginForm";
const style = StyleSheet.create({
  colorText: {
    textAlign: "left",
    color: "rgb(120, 173, 207)",
  },
});

const singup = () => {
  return (

      <ScrollView className="container bg-white w-full h-full text-left">
        <View className="items-center">
           <Text>Build singup component</Text>
           <SignUpForm/>
        </View>
      </ScrollView>

  );
};

export default singup;

const styles = StyleSheet.create({});
