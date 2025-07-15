import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, Tabs } from "expo-router";


const _layout = () => {
    return (
        //make tabs into stack after testing 
            <Tabs>
                <Tabs.Screen name="login" options={{headerShown: false,tabBarButton: () => null,tabBarStyle: { display: 'none' }}} />
                <Tabs.Screen name="signup" options={{headerShown: false,tabBarButton: () => null,tabBarStyle: { display: 'none' }}} />
                <Tabs.Screen name="resetpassword" options={{headerShown: false,tabBarButton: () => null,tabBarStyle: { display: 'none' }}}/>
            </Tabs>
    )
}

export default _layout;