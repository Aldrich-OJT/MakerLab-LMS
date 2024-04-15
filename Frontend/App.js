import React, { useEffect, useContext, useState } from 'react';
import HomePage from './screens/HomePage';
import Login from './screens/auths/Login';
import Signup from './screens/auths/Signup';
import Welcome from './screens/auths/Welcome';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { PaperProvider } from 'react-native-paper';
import AuthProvider, { AuthContext } from './context/AuthProvider';
import { Pressable, Text} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Learn from './screens/Learn/Learn';
import Settings from './screens/Settings';
import { FontAwesome } from '@expo/vector-icons';
import Header from "./components/Header";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Lessons from './screens/Learn/Lessons';
import { Ionicons } from '@expo/vector-icons';
import LearnDetails from './screens/Learn/LearnDetails';
import Colors from './constants/Colors';
import LoadingScreen from './screens/LoadingScreen';
import { useFonts } from 'expo-font';
// import QuizCategory from './screens/Assess/QuizCategory';
// import Quizzes from './screens/Assess/Quizzes';
import Questions from './screens/Assess/Questions';
import Templearn from './screens/Learn/templearn';

const Stack = createNativeStackNavigator()
const LearnStack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()
//const AssessStack = createNativeStackNavigator()

const LearnStackGroup = () => {
  return (
    <LearnStack.Navigator>
      <LearnStack.Screen options={{ headerShown: false }} name="TabGroup" component={TabGroup} />
      <LearnStack.Screen options={{ headerShown: false }} name='Lessons' component={Lessons} />
      <LearnStack.Screen options={{ presentation: "modal" }} name="LearnDetails" component={LearnDetails} />
      <LearnStack.Screen options={{ headerShown: false }} name="templearn" component={Templearn} />
      <LearnStack.Screen options={{ headerShown: false }} name="Questions" component={Questions}  />
    </LearnStack.Navigator>

  )
}
// const AssessStack = ()=>{
//   return(
//     <AssesStack.Navigator>
//       
//       <AssesStack.Screen options={{ headerShown: false }} name="QuizCategory" component={QuizCategory}/>
//       <AssesStack.Screen options={{ headerShown: false }} name="Quizzses" component={Quizzes}  />
//     </AssesStack.Navigator>
//   )
// }

// const LessonStackGroup = () => {
//   return (
//     <LearnStack.Navigator>
      

//     </LearnStack.Navigator>
//   );
// };

const TabGroup = () => {
  const { logout } = useContext(AuthContext)
  return (
    <Tab.Navigator
      screenOptions={({ route, navigation }) => ({
        tabBarIcon: ({ focused }) => {
          let iconName;

          switch (route.name) {
            case 'HomePage':
              iconName = <Ionicons name={focused ? 'home' : 'home-outline'} size={23} color={'black'} />;
              break;
            case 'AssesStackGroup':
              iconName = <Ionicons name={focused ? 'book' : 'book-outline'} size={23} color={'black'} />;
              break;
            case 'Profile':
              iconName = <FontAwesome
                name={focused ? 'user' : 'user-o'}
                size={focused ? 23 : 20} // Decrease font size if not focused
                color={'black'}
              />
              break;
            case 'Lessons':
              iconName = <Ionicons name={focused ? 'school' : 'school-outline'} size={25} color={'black'} />;
              break;
            }
          return iconName;
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
      <Tab.Screen options={{ headerStyle: {height: 120,}, headerShown: true, headerTitle: '', headerBackground: ()=> (<Header/>) }} name='HomePage' component={HomePage} />  
      <Tab.Screen options={{ headerStyle: {height: 120,}, headerShown: true, headerTitle: '', headerBackground: ()=> (<Header/>) }} name='Lessons' component={Lessons} />
      {/* <Tab.Screen options={{ headerShown: false }} name='AssesStackGroup' component={AssesStackGroup} /> */}
      <Tab.Screen options={{ 
        headerStyle: {height: 120,},
        headerShown: true, 
        headerTitle: '', 
        headerBackground: ()=> (<Header/>),
        headerRight: () => (
          <Pressable onPress={logout}>
            <Text style={{color: 'white',fontFamily: 'PTSans-Bold', fontSize: 20}}>Logout</Text>
          </Pressable>)
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
    'PTSans-Regular': require('./assets/fonts/PTSans-Regular.ttf'),
    'PTSans-Bold': require('./assets/fonts/PTSans-Bold.ttf'),
  });

  useEffect(() => {
    setLoading(true);


    const fetchData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');

        if (userData) {
          authContext.authenticate(JSON.parse(userData));
          console.log(userData)
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
