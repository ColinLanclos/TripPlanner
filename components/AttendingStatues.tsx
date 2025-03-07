import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { RadioButton } from 'react-native-paper';

const AttendingStatues = () => {
    const [checked, setChecked] = React.useState('going');

    return(
        <View style={styles.container}> 
            <Text style={styles.header}>Attending Status</Text>
            <Text style={styles.subheader}>Please select your attendance status</Text>

            <View style={styles.radioOption}>
                <RadioButton
                    value="going"
                    status={checked === 'going' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('going')}
                    color="#4CAF50" // Green for "Going"
                />
                <TouchableOpacity onPress={() => setChecked('going')}>
                    <Text style={styles.radioLabel}>Going</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.radioOption}>
                <RadioButton
                    value="maybe"
                    status={checked === 'maybe' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('maybe')}
                    color="#FF9800" // Orange for "Maybe"
                />
                <TouchableOpacity onPress={() => setChecked('maybe')}>
                    <Text style={styles.radioLabel}>Maybe</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.radioOption}>
                <RadioButton
                    uncheckedColor="red"
                    value="notGoing"
                    status={checked === 'notGoing' ? 'checked' : 'unchecked'}
                    onPress={() => setChecked('notGoing')}
                    color="#F44336" // Red for "Not Going"
                />
                <TouchableOpacity onPress={() => setChecked('notGoing')}>
                    <Text style={styles.radioLabel}>Not Going</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#f5f5f5",
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        color: "#333",
        textAlign: 'center',
        marginBottom: 10,
    },
    subheader: {
        fontSize: 16,
        color: "#666",
        textAlign: 'center',
        marginBottom: 20,
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,  // Added more margin for spacing
        paddingVertical: 10, // Added padding for better layout
    },
    radioLabel: {
        fontSize: 18,
        color: "#333",
        marginLeft: 10,
        marginTop: 2, // Small margin top to align text with radio button
    },
});

export default AttendingStatues;
