import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import firebase from "firebase";
import UniversityAddForm from "./UniversityAddForm";
import EducationAddForm from "./EducationAddForm";

export default function UniversitiesList ({navigation}){
    const [universities, setUniversities] = useState();

    useEffect(() => {
        if(!universities) {
            firebase
                .database()
                .ref('/Universities')
                .on('value', snapshot => {
                    setUniversities(snapshot.val())
                });
        }
    },[]);

    if(!universities){
        return(
            <View>
                <Text>Opret et universitet:</Text>
                <UniversityAddForm/>
            </View>
        )
    }

    const handleSelectCar = async id => {
        const university = Object.entries(universities).find(university => university[0] === id);
        await navigation.navigate('Universities Educations', { university });
    }

    const universitiesArray = Object.values(universities);
    const universitiesKeys = Object.keys(universities);

    return (
        <SafeAreaView>
            <FlatList
                data={universitiesArray}
                keyExtractor={(item, index) => universitiesKeys[index]}
                renderItem={({ item, index }) => {
                    return(
                        <TouchableOpacity style={styles.container} onPress={() => handleSelectCar(universitiesKeys[index])}>
                            <Text>
                                {item.name}
                            </Text>
                        </TouchableOpacity>
                    )
                }}
            />
            <UniversityAddForm/>
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