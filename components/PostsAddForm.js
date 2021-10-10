import { StatusBar } from "expo-status-bar";
import React, {useState, useEffect} from "react";
import { StyleSheet, Text, TextInput, View, Button, SafeAreaView, ScrollView, Alert} from "react-native";
import firebase from "firebase";
import addPost from "./dbFunctions/Post";

export default function postAddForm({educationId}){
    const initialState = { title: '', content:'', educationId: educationId}
    const [post, setPost] = useState(initialState)
    const changeTextInput = (name, event) =>{
        setPost({...post, [name]: event})
    }

    const handleSave = async ()=>{
        let validator = Object.entries(post).find(prop => !prop[1].length)
        if (validator){
            return Alert.alert("Alle felter skal udfyldes!");
        }

        const postLength = 200

        if(post.content.length < postLength){
            return Alert.alert(`En beretning skal minimum indeholde ${postLength} tegn!`);
        }
        try {
            await addPost(post)
            Alert.alert(`Saved`);
            setPost(post)
        } catch (error) {
            console.log(`Error: ${error}`);
        }
    }

    return (
        <SafeAreaView styles={styles.container}>
            <ScrollView>
                {Object.keys(initialState).map((key,index) =>{
                    if (key !== 'educationId'){
                        return(
                            <View style={styles.row} key={index}>
                                <Text style={styles.label}>{key}</Text>
                                <TextInput
                                    value={post[key]}
                                    onChangeText={(event) => changeTextInput(key,event)}
                                    style={styles.input}
                                />
                            </View>
                        )
                    }
                })}
                <Button title={"Save post"} onPress={async ()=>{await handleSave()}}/>
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
