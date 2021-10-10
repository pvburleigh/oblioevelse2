import React, {useState, useEffect} from "react";
import { StyleSheet, Text, View, FlatList, TouchableOpacity, SafeAreaView } from "react-native";
import firebase from "firebase";
import PostsAddForm from "./PostsAddForm";

export default function PostsList ({route,navigation}){
    const [posts, setPosts] = useState();
    useEffect(() => {
        if(!posts) {
            firebase
                .database()
                .ref('/Posts')
                .orderByChild('educationId')
                .equalTo(route.params.education[0])
                .on('value', snapshot => {
                    setPosts(snapshot.val())
                });
        }
    },[]);
    console.log(route.params.education)
    const addForm = <PostsAddForm educationId={route.params.education[0]}/>

    if(!posts){
        return (
            <View>
                <Text>Opret et post:</Text>
                {addForm}
            </View>
        )
    }

    const handleSelectPost = async id => {
        const education = Object.entries(posts).find(post => post[0] === id);
        //await navigation.navigate('Car Details', { car });
    }

    const postsArray = Object.values(posts);
    const postsKeys = Object.keys(posts);

    return (
        <SafeAreaView>
            <FlatList
                data={postsArray}
                keyExtractor={(item, index) => postsKeys[index]}
                renderItem={({ item, index }) => {
                    return(
                        <TouchableOpacity style={styles.container} onPress={() => handleSelectPost(postsKeys[index])}>
                            <Text>
                                {item.title}
                            </Text>
                            <Text>
                                {item.content}
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