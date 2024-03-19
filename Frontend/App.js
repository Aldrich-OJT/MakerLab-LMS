  import React from 'react';
  import { StatusBar } from 'expo-status-bar';
  import { StyleSheet, Text, View } from 'react-native';
  import HomePage from './screens/HomePage';
  import {Login, Signup} from './screens/auths/Login';
  import { NavigationContainer} from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import { PaperProvider } from 'react-native-paper';
  import { useState } from 'react';

  const Stack = createNativeStackNavigator()
    

  const authStack = () => {
    return(
      <Stack.Navigator>
        <Stack.Screen name='Login' component={Login}/>
        <Stack.Screen name='Signup' component={Signup}/>
      </Stack.Navigator>
    )
  }
  const AuthenticatedStack = ()=>{
    return(
      <Stack.Navigator>
        <Stack.Screen name='Homepage' component={HomePage}/>
      </Stack.Navigator>
    )
  }

  export default function App() {
    const [isloggedIn, SetisLoggedIn] = useState(false)
    return (
      <PaperProvider>
        <NavigationContainer>
            {isloggedIn ? <authStack/> : <AuthenticatedStack/>}
        </NavigationContainer>
      </PaperProvider>
    );
  }
