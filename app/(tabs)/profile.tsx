import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";


const profile = () => {
  return (
    <SafeAreaView edges={["top"]}>
      <ScrollView className="container bg-white w-full h-full text-left">
        <View className="mt-5">
          <Text>Ntn</Text>
          <Text>Steal it From Old Project</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default profile;
