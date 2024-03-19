  import React from 'react';
  import { StatusBar } from 'expo-status-bar';
  import { StyleSheet, Text, View } from 'react-native';
  import HomePage from './screens/HomePage';
  import Login from './screens/auths/Login';
  import Signup from './screens/auths/Signup';
  import Welcome from './screens/auths/Welcome';
  import { NavigationContainer} from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import { PaperProvider } from 'react-native-paper';
  import { useState } from 'react';

  const Stack = createNativeStackNavigator()
    
  const AuthStack = () => {
    return(
      <Stack.Navigator>
        <Stack.Screen options={{headerShown:false}} name='Welcome' component={Welcome}/>
        <Stack.Screen options={{headerShown:false}} name='Signup' component={Signup}/>
        <Stack.Screen options={{headerShown:false}} name='Login' component={Login}/>
      </Stack.Navigator>
    )
  }
  const AuthenticatedStack = ()=>{
    return(
      <Stack.Navigator>
        <Stack.Screen options={{headerShown:false}} name='Homepage' component={HomePage}/>
      </Stack.Navigator>
    )
  }

  export default function App() {
    const [isloggedIn, SetisLoggedIn] = useState(true)
    return (
      <PaperProvider>
        <NavigationContainer>
            {isloggedIn ? <AuthenticatedStack/>: <AuthStack/>}
        </NavigationContainer>
      </PaperProvider>
    );
  }
