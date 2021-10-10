import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect} from "react";
import { StyleSheet, Text, TextInput, View, Button, SafeAreaView, ScrollView, Alert} from "react-native";
import firebase from "firebase";
import addUniversity from "./dbFunctions/University";

export default function UniversityAddForm({route, navigation}){
    const initialState = { name: '', location: ''}
    const [university, setUniversity] = useState(initialState)

    const changeTextInput = (name, event) =>{
        setUniversity({...university, [name]: event})
    }

    const handleSave = async ()=>{
        let validator = Object.entries(university).find(prop => !prop[1].length)
        if (validator){
            return Alert.alert("Alle felter skal udfyldes!");
        }
        try {
            await addUniversity(university)
            Alert.alert(`Saved`);
            setUniversity(university)
        } catch (error) {
            console.log(`Error: ${error.message}`);
        }
    }

    return (
        <SafeAreaView styles={styles.container}>
            <ScrollView>
                {Object.keys(initialState).map((key,index) =>{
                    return(
                        <View style={styles.row} key={index}>
                            <Text style={styles.label}>{key}</Text>
                            <TextInput
                                value={university[key]}
                                onChangeText={(event) => changeTextInput(key,event)}
                                style={styles.input}
                            />
                        </View>
                    )
                })}
                <Button title={"Add University"} onPress={async ()=>{ await handleSave()}}/>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        height: 30,
        margin: 10,
    },
    label: {
        fontWeight: 'bold',
        width: 100
    },
    input: {
        borderWidth: 1,
        padding:5,
        flex: 1
    },
});
