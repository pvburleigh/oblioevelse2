import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import firebase from "firebase";
import EducationAddForm from "./EducationAddForm.js";

export default function EducationsList ({route,navigation}){
    const [educations, setEducations] = useState();

    useEffect(() => {
        if(!educations) {
            firebase
                .database()
                .ref('/Educations')
                .orderByChild('universityId')
                .equalTo(route.params.university[0])
                .on('value', snapshot => {
                    setEducations(snapshot.val())
                });
        }
    },[]);


    const addForm = <EducationAddForm universityId={route.params.university[0]}/>

    if(!educations){
        return (
            <View>
                <Text>Opret en uddannelse:</Text>
                {addForm}
            </View>
        )
    }

    const handleSelectEducation = async id => {
        const education = Object.entries(educations).find(education => education[0] === id);
        await navigation.navigate('Posts', { education });
    }

    const educationsArray = Object.values(educations);
    const educationsKeys = Object.keys(educations);

    return (
        <SafeAreaView>
            <FlatList
                data={educationsArray}
                keyExtractor={(item, index) => educationsKeys[index]}
                renderItem={({ item, index }) => {
                    return(
                        <TouchableOpacity style={styles.container} onPress={() => handleSelectEducation(educationsKeys[index])}>
                            <Text>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )
                }}
            />
            {addForm}
        </SafeAreaView>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        borderWidth: 1,
        borderRadius:10,
        margin: 5,
        padding: 5,
        height: 50,
        justifyContent:'center'
    },
});