import { View, StyleSheet, Text, Dimensions, ImageBackground, Image, Pressable } from "react-native";
import Colors from "../constants/Colors";
import QuizItem from "../components/QuizItem";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFonts, Dongle_400Regular } from '@expo-google-fonts/dongle';

const dimensions = Dimensions.get('window');   
const devicewidth = dimensions.width;
const deviceheight = dimensions.height;

export default function Assess() {
  let [fontsLoaded] = useFonts({
    Dongle_400Regular,
  });

    return(
        <View style={styles.mainContainer}>
            <ImageBackground source={require('../assets/assess-background.png')} style={styles.bgimage}>
            <Image source={require('../assets/logo-light.png')} style={styles.logo}/>
            <View style={styles.quizContainer}>
              <View style={styles.quizEditContainer}>
                <Text style={styles.quizName}>Quiz Name:</Text>
                <MaterialCommunityIcons name="square-edit-outline" size={27} color="white" />
              </View>
                <Text style={styles.quizDescription}>Description--</Text>
                <QuizItem question={'What is the powerhouse of the cell?'} 
                  choice1={'JavaScript'}
                  choice2={'Photosynthesis'}
                  choice3={'Kapampangan'}
                  choice4={'Mitochondria'}
                />
                <QuizItem question={'Who sang Leaves by Ben&Ben?'} 
                  choice1={'Yung puno'}
                  choice2={'Bato'}
                  choice3={'Ben&Ben'}
                  choice4={'Putek'}
                />
            </View>
            </ImageBackground>
        </View>
    )
}


const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        justifyContent:"center",
        alignItems:"center",
    },
    bgimage: {
        height:"100%",
        width:"100%",
        resizeMode: "contain",
        justifyContent:"center",
        alignItems:"center",
      },
      logo: {
        height: 30,
        width: 100,
        alignSelf: 'flex-end',
        margin: 10,
      },
      quizContainer: {
        backgroundColor: Colors.bgDarkViolet,
        height: '85%',
        width: '95%',
        borderRadius: 10,
        padding: 15,
      },
      quizName:{
        color: 'white',
        fontSize: 50,
        fontFamily: 'Dongle_400Regular',
      },
      quizDescription: {
        color: 'white',
        fontSize: 16,
        paddingTop: 5,
      },
      quizEditContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
})