import { ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { RadioButton } from 'react-native-paper';

const AttendingStatues = () => {
    const [checked, setChecked] = React.useState('going');

    //pull from firbase to see which one to check
    

    return(
        <View style={{backgroundColor:"grey", marginTop:10 }}> 
            <Text>Gotta find something better lookng than this lol </Text>
            <RadioButton
                value="going"
                status={ checked === 'going' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('going')}
            />
            <RadioButton
                value="maybe"
                status={ checked === 'maybe' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('maybe')}
            />
             <RadioButton
                uncheckedColor="red"
                value="notGoing"
                status={ checked === 'notGoing' ? 'checked' : 'unchecked' }
                onPress={() => setChecked('notGoing')}
            />
        </View>
    )
}
export default AttendingStatues