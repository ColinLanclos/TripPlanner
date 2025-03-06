import { ScrollView, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import TripPlanComp from '@/components/TripPlanComp';
import TripIinforamationComp from '@/components/TripInformationComp';
import AttendingStatues from '@/components/AttendingStatues';
import { router } from 'expo-router';
import TripPeopleList from '../(list)/TripPeopleList';

export default function TripPage() {
  return (
      <SafeAreaView edges={["top",'bottom']}>
        <ScrollView className="container bg-white w-full h-full text-left">
          <View className="mt-5">
            <Text>Ntn</Text>
            <TripPlanComp /> 
                <TouchableOpacity onPress={() => {router.push("/(list)/grocerylist"), console.log("Pressed?")}}>
                    <Text>Grocery List</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {router.push("/(list)/ItemsList"), console.log("Pressed?")}}>
                    <Text>Trip List</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => {router.push("/(list)/TripPeopleList"), console.log("Pressed?")}}>
                    <Text>Your List</Text>
                </TouchableOpacity>
            <TripIinforamationComp />
            <AttendingStatues />
          </View>
        </ScrollView>
      </SafeAreaView>
    );
}
