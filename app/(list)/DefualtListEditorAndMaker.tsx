import AddDefaultModal from "@/components/AddDefualtModal"
import StartNewDefaultListModal from "@/components/StartNewDefaultListModal"
import { useState } from "react"
import { StyleSheet,  ScrollView, View, Text } from "react-native"
import { SafeAreaView } from "react-native-safe-area-context"




const DefaultListEditorAndMaker = () => {
    return(
    <SafeAreaView>
        <ScrollView className="container bg-white w-full h-full text-left">
            <View style={styles.container} >
                <StartNewDefaultListModal />
                <AddDefaultModal />

            </View>
        </ScrollView>
      </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
      backgroundColor: '#fff',
      justifyContent: 'center',
      alignItems: 'center',
    },
  });
  


export default DefaultListEditorAndMaker;