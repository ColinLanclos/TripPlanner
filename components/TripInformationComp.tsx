import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const TripInformationComp = () => {
    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.contentContainer}>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>Description:</Text>
                    <Text style={styles.text}>
                        Just input from the Main Guy. Need to let the main guy edit the trips by putting him/her a button.
                    </Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>Where:</Text>
                    <Text style={styles.text}>
                        Use Google API to grab an image of the place with the address.
                    </Text>
                </View>
                <View style={styles.infoContainer}>
                    <Text style={styles.title}>Dates:</Text>
                    <Text style={styles.text}>
                        Use React Native Calendar to display dates.
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        paddingBottom: 20,
    },
    infoContainer: {
        marginBottom: 20,
        backgroundColor: "#fff",
        borderRadius: 8,
        padding: 15,
        marginHorizontal: 20,
        elevation: 3, // For shadow effect on Android
        shadowColor: "#000", // Shadow color for iOS
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#333",
        marginBottom: 8,
    },
    text: {
        fontSize: 16,
        color: "#555",
        lineHeight: 22,
    },
});

export default TripInformationComp;
