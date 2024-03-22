  import React, { useEffect,useState, useContext } from 'react';
  import HomePage from './screens/HomePage';
  import ProfilePage from './screens/ProfilePage';
  import Login from './screens/auths/Login';
  import Signup from './screens/auths/Signup';
  import Welcome from './screens/auths/Welcome';
  import { NavigationContainer} from '@react-navigation/native';
  import { createNativeStackNavigator } from '@react-navigation/native-stack';
  import { PaperProvider } from 'react-native-paper';
  import AuthContext, { AuthProvider } from './context/AuthProvider';  

  const Stack = createNativeStackNavigator()
 
  // const AuthStack = () => {
  //   return(
      
  //   )
  // }
  // const AuthenticatedStack = ()=>{
  //   return(

  //   )
  // }
  
  export default function App() {
    const {auth} = useContext(AuthContext)
    const [isLoggedIn, setisLoggedIn] = useState(false)

    useEffect(()=>{
      if(auth){
        setisLoggedIn(true)
      }
    },[auth])

    console.log(isLoggedIn)
    return (
      <AuthProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            {/* {isLoggedIn ? (
              <Stack.Group>
                <Stack.Screen options={{headerShown:false}} name='HomePage' component={HomePage}/>
              </Stack.Group>
            ) : (
              <Stack.Group>
                <Stack.Screen options={{headerShown:false}} name='Welcome' component={Welcome}/>
                <Stack.Screen options={{headerShown:false}} name='Signup' component={Signup}/>
                <Stack.Screen options={{headerShown:false}} name='Login' component={Login}/> 
              </Stack.Group>
            )} */}
              <Stack.Group>
                
                <Stack.Screen options={{headerShown:false}} name='Welcome' component={Welcome}/>
                <Stack.Screen options={{headerShown:false}} name='Signup' component={Signup}/>
                <Stack.Screen options={{headerShown:false}} name='Login' component={Login}/> 
                <Stack.Screen options={{headerShown:false}} name='HomePage' component={HomePage}/>
                <Stack.Screen options={{headerShown:false}} name='ProfilePage' component={ProfilePage}/>
              </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
    );
  }
