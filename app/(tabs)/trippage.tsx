import { IconSymbol } from '@/components/ui/IconSymbol';
import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import CreateNewTripForm from '@/components/CreateNewTripForm';
import TripPlanComp from '@/components/TripPlanComp';
import TripIinforamationComp from '@/components/TripInformationComp';
import AttendingStatues from '@/components/AttendingStatues';
import ListOfPeople from '@/components/ListOfPeople';
import { router } from 'expo-router';

export default function TripPage() {
  return (
      <SafeAreaView edges={["top"]}>
        <ScrollView className="container bg-white w-full h-full text-left">
          <View className="mt-5">
            <Text>Ntn</Text>
            <TripPlanComp /> 
                <TouchableOpacity onPress={() => {router.push("/(list)/grocerylist"), console.log("Pressed?")}}>
                    <Text>Grocery List</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {router.push("/(list)/trip"), console.log("Pressed?")}}>
                    <Text>Trip List</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {router.push("/(list)/individual"), console.log("Pressed?")}}>
                    <Text>Your List</Text>
                </TouchableOpacity>
            <TripIinforamationComp />
            <AttendingStatues />
            <ListOfPeople />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
}
