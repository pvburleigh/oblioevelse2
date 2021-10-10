import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect} from 'react';
import { StyleSheet, Text, View } from 'react-native';

import UniversitiesList from "./components/UniversititesList.js";
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from "firebase";
import LoginForm from "./components/LoginForm";
import SignUpForm from "./components/SignUpForm";
import EducationsList from "./components/EducationsList";
import PostsList from "./components/PostsList";


export default function App() {
    const firebaseConfig = {
        apiKey: "AIzaSyDj4gVlPCNAd3rz_hfP-cTl-pVpmuWDoe8",
        authDomain: "oblioevelse2.firebaseapp.com",
        projectId: "oblioevelse2",
        databaseURL: "https://oblioevelse2-default-rtdb.europe-west1.firebasedatabase.app/",
        storageBucket: "oblioevelse2.appspot.com",
        messagingSenderId: "1002058787552",
        appId: "1:1002058787552:web:1b6e8667d1d9efe4467e85"
    };

    // Initialize Firebase
    if (!firebase.apps.length) {
        firebase.initializeApp(firebaseConfig);
    }

    const [user, setUser] = useState({ loggedIn: false });

    const onAuthStateChange = () => {
        return firebase.auth().onAuthStateChanged(user => {
            if (user) {
                setUser({loggedIn: true});
            } else {
                setUser({loggedIn: false});
            }
        });
    }


    useEffect(() => {
        const unsubscribe = onAuthStateChange();
        return () => {
            unsubscribe();
        };
    }, []);

  const Tab = createBottomTabNavigator();
  const Stack = createStackNavigator();

  const StackNavigation = () => {
      return(
          <Stack.Navigator>
              <Stack.Screen name={'Universities'} component={UniversitiesList}/>
              <Stack.Screen name={'Universities Educations'} component={EducationsList}/>
              <Stack.Screen name={'Posts'} component={PostsList}/>
          </Stack.Navigator>
      )
  }

  return (
      <>
          {user.loggedIn ?
              <NavigationContainer>
                  <Tab.Navigator>

                          <Tab.Screen
                              name={'Home'}
                              component={StackNavigation}
                              options={{
                                  tabBarLabel: 'Home',
                                  tabBarIcon: ({ color, size }) => (
                                      <MaterialCommunityIcons name="home" color={color} size={size} />
                                  ),
                                  headerShown: false
                              }}
                          />
                  </Tab.Navigator>
              </NavigationContainer>:
              <>
                  <SignUpForm/>
                  <LoginForm/>
              </>
          }
      </>
  );
}