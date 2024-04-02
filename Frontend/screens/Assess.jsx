import { View, StyleSheet, Text, Dimensions, Pressable } from "react-native";
import Colors from "../constants/Colors";
import QuizItem from "../components/QuizItem";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Header from "../components/Header";
import { useState } from "react";
import { FlatList } from "react-native";
// import { useFonts, Dongle_400Regular } from '@expo-google-fonts/dongle';

const dimensions = Dimensions.get('window');   
const devicewidth = dimensions.width;
const deviceheight = dimensions.height;

export default function Assess() {
  // let [fontsLoaded] = useFonts({
  //   Dongle_400Regular,
  // });
  const [quizData, setQuizData] = useState([
  {
    id: '1',
    question: 'Musta araw mo?',
    choices: ['Gutom', 'YIPPEEEE', 'Antok na ako', 'COFFEEEEEEE']
  },
  {
    id: '2',
    question: 'Ano gusto mo?',
    choices: ['Siya', 'Pera', 'Baon', 'Uwi']
  },
  {
    id: '3',
    question: 'Kumain kana ba?',
    choices: ['Oo', 'Hindi', 'Pake mo', 'Who u']
  },
  {
    id: '4',
    question: 'Ano ulam mo?',
    choices: ['Chicken Fillet', 'Chicken Fillet', 'Chicken Fillet', 'Chicken Fillet']
  }
]);

const renderQuizItem = ({ item }) => (
  <QuizItem
    question={item.question}
    choice1={item.choices[0]}
    choice2={item.choices[1]}
    choice3={item.choices[2]}
    choice4={item.choices[3]}
  />
);

    return(
        <View style={styles.mainContainer}>
          <Header />
          <View style={styles.quizContainer}>
            <View style={styles.quizEditContainer}>
              <Text style={styles.quizName}>Quiz Name:</Text>
              <MaterialCommunityIcons 
                name="square-edit-outline" 
                size={25} 
                style={{marginTop: 20}} 
                color="black" />
            </View>
            
            <Text style={styles.quizDescription}>Choose the correct answer.</Text>
            <FlatList
              style={styles.flatlist}
              showsVerticalScrollIndicator={false}
              data={quizData}
              renderItem={renderQuizItem}
              keyExtractor={item => item.id}
              ListFooterComponent={
                <Pressable style={styles.submitbutton}>
                <Text style={styles.submittext}>Submit</Text>
                </Pressable>
              }
            />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex:1,
        alignItems:"center",
    },
      quizContainer: {
        backgroundColor: Colors.bgOffWhite,
        height: '75%',
        width: '95%',
        borderRadius: 10,
        paddingHorizontal: 16,
      },
      quizName:{
        fontSize: 50,
        fontFamily: 'Dongle-Regular',
      },
      quizDescription: {
        marginTop:-10,
        marginLeft:6,
        fontSize: 16,
      },
      quizEditContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      submitbutton: {
        alignSelf: 'center',
        backgroundColor: Colors.bgYellow,
        borderRadius: 6,
        margin: 10,
        padding: 15,

      },
      submittext: {
        fontSize: 20,
        color: 'black',
        alignSelf: 'center',
      },
})