import { Button, ScrollView, StyleSheet, Text, Touchable, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link, router } from "expo-router";


const messages = () => {
  return (
    <SafeAreaView edges={["top"]}>
      <ScrollView className="container bg-white w-full h-full text-left">
        <View className="mt-5">
          <Text>Ntn</Text>
          <Link href={"/(auth)/login"}> To Auth</Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default messages;
