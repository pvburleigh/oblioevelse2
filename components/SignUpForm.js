import React, {useState} from "react";
import {Text, TextInput, View, Button, StyleSheet, SafeAreaView} from "react-native";
import firebase from "firebase"
import { Card } from 'react-native-paper';

export default function SignUpForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isCompleted, setCompleted] = useState(false);
    const handleSubmit = async () =>{
        try{
            const data = await firebase.auth().createUserWithEmailAndPassword(email, password)
        } catch (e) {
            console.log(e.message)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Card style={styles.removeCardBorder}>
                <Text style={styles.header}>Opret bruger</Text>
                <TextInput
                    onChangeText={(text)=>{
                        setEmail(text);
                    }}
                    value={email}
                    placeholder="Indtast email"
                    keyboardType="default"
                    style={styles.inputField}
                />
                <TextInput
                    onChangeText={(text)=>{
                        setPassword(text);
                    }}
                    value={password}
                    placeholder="Indtast kodeord"
                    secureTextEntry={true}
                    style={styles.inputField}
                />
                <Button title="Opret" onPress={()=>{handleSubmit()}} />
            </Card>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container: {

    },
    removeCardBorder:{
        borderWidth: 0, // Remove Border

        shadowColor: 'rgba(0,0,0, 0.0)', // Remove Shadow for iOS
        shadowOffset: { height: 0, width: 0 },
        shadowOpacity: 0,
        shadowRadius: 0,

        elevation: 0 // Remove Shadow for Android
    },
    inputField: {
        borderWidth: 1,
        margin: 10,
        padding: 10,
    },
    header: {
        fontSize: 40,
        textAlign: 'center',
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },

});
