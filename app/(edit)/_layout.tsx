import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Tabs } from "expo-router";


const _layout = () => {
    return (
        //list for Groceris, Big Items, and Indvidual
            <Tabs>
                <Tabs.Screen name="MakeNewDefaultList" options={{headerShown: true}} />
            </Tabs>
    )
}

export default _layout;