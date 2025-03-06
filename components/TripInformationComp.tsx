import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";


const TripIinforamationComp = () => {
    return(
        <View>
            <Text  style={{marginTop:10}}>
                Discrption: just input from the Main Guy. Need to Let main gay edit the trips by putting him/her a button
            </Text>
            <Text  style={{marginTop:10}}>
                Where: Use Google  Api to Grab img of place with adress
            </Text> 
            <Text style={{marginTop:10}}>
                Dates: Use React Native Calender to Display Dates
            </Text> 
        </View>
    )
}

export default TripIinforamationComp;