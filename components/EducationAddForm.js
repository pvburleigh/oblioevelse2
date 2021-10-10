import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect} from "react";
import { StyleSheet, Text, TextInput, View, Button, SafeAreaView, ScrollView, Alert} from "react-native";
import firebase from "firebase";
import addEducation from "./dbFunctions/Education";

export default function EducationAddForm({universityId}){
    const initialState = { name: '', universityId: universityId}
    const [education, setEducation] = useState(initialState)

    const changeTextInput = (name, event) =>{
        setEducation({...education, [name]: event})
    }

    const handleSave = async ()=>{
        let validator = Object.entries(education).find(prop => !prop[1].length)
        if (validator){
            return Alert.alert("Alle felter skal udfyldes!");
        }
        try {
            await addEducation(education)
            Alert.alert(`Saved`);
            setEducation(education)
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    return (
        <SafeAreaView styles={styles.container}>
            <ScrollView>
                {Object.keys(initialState).map((key,index) =>{
                    if (key !== 'universityId'){
                        return(
                            <View style={styles.row} key={index}>
                                <Text style={styles.label}>{key}</Text>
                                <TextInput
                                    value={education[key]}
                                    onChangeText={(event) => changeTextInput(key,event)}
                                    style={styles.input}
                                />
                            </View>
                        )
                    }
                })}
                <Button title={"Save education"} onPress={async ()=>{await handleSave()}}/>
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
