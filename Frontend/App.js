import React, { useEffect, useContext, useState } from 'react';
import HomePage from './screens/HomePage';
import Login from './screens/auths/Login';
import Signup from './screens/auths/Signup';
import Welcome from './screens/auths/Welcome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import AuthProvider, { AuthContext } from './context/AuthProvider';
import { Pressable, Text, } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Learn from './screens/Learn';
import Settings from './screens/Settings';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Assess from './screens/Assess';
import { Ionicons } from '@expo/vector-icons';
import LearnDetails from './screens/LearnDetails';
import Colors from './constants/Colors';
import LoadingScreen from './screens/LoadingScreen';
import { useFonts } from 'expo-font';

const Stack = createNativeStackNavigator()
const LearnStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

const LearnStackGroup = () => {
  return (
    <LearnStack.Navigator>
      <LearnStack.Screen options={{ headerShown: false }} name="TabGroup" component={TabGroup} />
      <LearnStack.Screen options={{ presentation: "modal" }} name="LearnDetails" component={LearnDetails} />
    </LearnStack.Navigator>

  )
}
const TabGroup = () => {
  const { logout } = useContext(AuthContext)
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;
          if (route.name !== 'Learn') {
            if (route.name === 'HomePage') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'Assess') {
              iconName = focused ? 'book' : 'book-outline';
            } else if (route.name === 'Settings') {
              iconName = focused ? 'settings' : 'settings-outline';
            }

            return <Ionicons name={iconName} size={23} color={'black'} />
          }
          else if (route.name === 'Learn') {
            iconName = focused ? 'school' : 'school-outline';
            return <Ionicons name={iconName} size={25} color={'black'} />
          }
        },
        tabBarActiveTintColor: "black",
        tabBarActiveBackgroundColor: Colors.bgYellow,
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          overflow: "hidden",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: "absolute"
        },
        tabBarItemStyle: {
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
        },
      })}
    >

      <Tab.Screen options={{ headerShown: false }} name='HomePage' component={HomePage} />
      <Tab.Screen options={{ headerShown: false }} name='Learn' component={Learn} />
      <Tab.Screen options={{ headerShown: false }} name='Assess' component={Assess} />
      <Tab.Screen options={{
        headerTitle: "Settings",
        headerRight: () => (
          <Pressable onPress={logout}>
            <Text>Logout</Text>
          </Pressable>)
      }} name='Settings' component={Settings} />
    </Tab.Navigator>
  )
}

const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false }} name='Welcome' component={Welcome} />
      <Stack.Screen options={{ headerShown: false }} name='Signup' component={Signup} />
      <Stack.Screen options={{ headerShown: false }} name='Login' component={Login} />
    </Stack.Navigator>
  )
}
// const AuthenticatedStack = () => {
//   const {logout} = useContext(AuthContext)
//   return(
//     <Stack.Navigator>

//     </Stack.Navigator>
//   )
// }
const Navigation = () => {
  const authContext = useContext(AuthContext)


  return (
    <NavigationContainer>
      {!authContext.isAuthenticated && <AuthStack />}
      {authContext.isAuthenticated && <LearnStackGroup />}
    </NavigationContainer>
  )
}
const Root = () => {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [fontsLoaded, fontError] = useFonts({
    'Dongle-Regular': require('./assets/fonts/Dongle-Regular.ttf'),
  });

  useEffect(() => {
    setLoading(true);

    const fetchToken = async () => {
      try {
        const token = await AsyncStorage.getItem('token');

        if (token) {
          authContext.authenticate(token);
          console.log(authContext.token)
        } else {
          console.log("no token found");
        }
      } catch (error) {
        console.error("Error fetching token:", error);

      } finally {
        if (fontsLoaded) {
          setLoading(false);
        } else if (fontError) {
          console.error("Error loading fonts:", fontError);
          setLoading(false); 
        } else {
          setLoading(false); 
        }
      }
    };

    fetchToken();
  }, []);

  return loading ? <LoadingScreen /> : <Navigation />;
};

export default function App() {
  return (
    <AuthProvider>
      <PaperProvider>
        <Root />
      </PaperProvider>
    </AuthProvider>
  );
}
