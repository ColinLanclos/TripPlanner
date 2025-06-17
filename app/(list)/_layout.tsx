import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Tabs } from "expo-router";
import CheckForLoginComp from "@/components/checkForLoginComp";


const _layout = () => {
    return (
        //list for Groceris, Big Items, and Indvidual
        <CheckForLoginComp>
            <Tabs>
                <Tabs.Screen name="grocerylist" options={{headerShown: true}} />
                <Tabs.Screen name="ItemsList" options={{headerShown: true}} />
                <Tabs.Screen name="PersonItems" options={{headerShown: true}}/>
                <Tabs.Screen name="TripPeopleList" options={{headerShown: true}}/>
                <Tabs.Screen name="DefualtListEditorAndMaker" options={{headerShown: true}} />
                <Tabs.Screen name="EditDefaultList" options={{headerShown: true}} />
                <Tabs.Screen name="Itinerary" options={{headerShown: true}} />
            </Tabs>
        </CheckForLoginComp>
    )
}

export default _layout;