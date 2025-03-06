import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList } from "react-native-reanimated/lib/typescript/Animated";
import ProfileInListComp from "./ProfileInListComp";

const ListOfPeople = () => {
    return (
        <View  style={{marginTop:10}}>
            <Text style={{backgroundColor:'blue'}}>
                List of People
            </Text>
            <ProfileInListComp />
            
        </View>
    )
}

export default ListOfPeople;