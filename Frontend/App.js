import React, { useEffect, useContext, useState } from 'react';
import HomePage from './screens/HomePage';
import Login from './screens/auths/Login';
import Signup from './screens/auths/Signup';
import Welcome from './screens/auths/Welcome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import AuthProvider, { AuthContext } from './context/AuthProvider';
import { Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Settings from './screens/Settings';
import Header from "./components/Header";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Lessons from './screens/Learn/Lessons';
import LearnDetails from './screens/Learn/LearnDetails';
import Colors from './constants/Colors';
import LoadingScreen from './screens/LoadingScreen';
import { useFonts } from 'expo-font';
import Questions from './screens/Assess/Questions';
import Templearn from './screens/Learn/templearn';
import LearnHeader from './components/LearnComponent/LearnHeader';

const Stack = createNativeStackNavigator()
const LearnStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
//const AssessStack = createNativeStackNavigator()

const LearnStackGroup = () => {
  return (
    <LearnStack.Navigator>
      <LearnStack.Screen options={{ headerShown: false }} name="TabGroup" component={TabGroup} />
      {/* <LearnStack.Screen options={{ headerShown: false }} name='Lessons' component={Lessons} /> */}
      <LearnStack.Screen options={{ 
        presentation: "modal",
        headerStyle: {
            backgroundColor: "black",
        },
        headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
        },
        headerTintColor: 'white',
        headerTitleAlign: 'center',
        }} name="LearnDetails" component={LearnDetails} />
      <LearnStack.Screen options={{ headerShown: false }} name="templearn" component={Templearn} />
      <LearnStack.Screen options={{ headerShown: false }} name="Questions" component={Questions}  />
    </LearnStack.Navigator>

  )
}

const TabGroup = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = <Text style={{fontFamily: 'icon', fontSize:30, color: focused ? Colors.bgDarkGray : Colors.bgYellow}}></Text>
              break;
            case 'Profile':
              iconName = <Text style={{fontFamily: 'icon', fontSize:30, color: focused ? Colors.bgDarkGray : Colors.bgYellow}}></Text>
              break;
            case 'Lessons':
              iconName = <Text style={{fontFamily: 'icon', fontSize:30, color: focused ? Colors.bgDarkGray : Colors.bgYellow}}></Text>
              break;
            }
          return iconName;
        },
        
        tabBarActiveTintColor: "black",
        tabBarActiveBackgroundColor: Colors.bgYellow,
        tabBarHideOnKeyboard: true,
        tabBarInactiveTintColor: Colors.bgYellow,
        tabBarStyle: {
          backgroundColor: Colors.bgDarkGray,
          overflow: "hidden",
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          position: "absolute",
          height: 60,
          alignItems: 'center',
        },
        tabBarItemStyle: {
          height: 45,
          paddingVertical:3,
          maxWidth: 80,
          alignSelf:'center',
          borderRadius: 100,
          marginHorizontal: 15,
        },
      })}
      >
      <Tab.Screen options={{ headerStyle: {height: 105}, headerShown: true, headerTitle: '', headerBackground: ()=> (<Header/>) }} name='Home' component={HomePage} />  
      <Tab.Screen options={{ headerStyle: {height: 105,}, headerShown: true, headerTitle: '', headerBackground: ()=> (<Header/>) }} name='Lessons' component={Lessons} />
      {/* <Tab.Screen options={{ headerShown: false }} name='AssesStackGroup' component={AssesStackGroup} /> */}
      <Tab.Screen options={{ 
        headerStyle: {height: 105},
        headerShown: true, 
        headerTitle: '', 
        headerBackground: ()=> (<Header/>)
      }} name='Profile' component={Settings} />
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
    'PTSans-Regular': require('./assets/fonts/PTSans-Regular.ttf'),
    'PTSans-Bold': require('./assets/fonts/PTSans-Bold.ttf'),
    'icon' : require('./assets/fonts/icomoon.ttf'),
  });

  useEffect(() => {
    setLoading(true);


    const fetchData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');

        if (userData) {
          authContext.authenticate(JSON.parse(userData));
          //console.log(userData)
        } else {
          console.log("no data found");
        }
      } catch (error) {
        console.error("Error fetching data:", error);

      } finally {
        if (fontsLoaded) {
          setLoading(false);
        } else if (fontError) {
          console.error("Error loading fonts:", fontError);
          setLoading(false); 
        }
        // } else {
        //   setLoading(false); 
        // }
      }
    };

    fetchData();
  }, [fontsLoaded,fontError]);

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