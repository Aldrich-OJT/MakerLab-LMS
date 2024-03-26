import { Text, Pressable, StyleSheet, View, Image, Dimensions } from "react-native"
import Colors from "../constants/Colors";

const dimensions = Dimensions.get('window');   
const deviceWidth = dimensions.width;
const deviceHeight = dimensions.height;

export default function QuizItem(param) {
  return (
    <View style={styles.itemcontainer}>
      <View style={styles.questioncontainer}>
          <Text style={styles.questiontext}>{param.question}</Text>
      </View>

      <View style={styles.choicescontainer}>
        <View style={styles.choicesrow}>
            <Pressable style={styles.choices}>
                <Text style={styles.choicestext}>{'a. '+param.choice1}</Text>
            </Pressable>

            <Pressable style={styles.choices}>
                <Text style={styles.choicestext}>{'b. '+param.choice2}</Text>
            </Pressable>
        </View>

        <View style={styles.choicesrow}>
            <Pressable style={styles.choices}>
                <Text style={styles.choicestext}>{'c. '+param.choice3}</Text>
            </Pressable>

            <Pressable style={styles.choices}>
                <Text style={styles.choicestext}>{'d. '+param.choice4}</Text>
            </Pressable>
        </View>
      </View>

    </View>
  )
}

const styles = StyleSheet.create({
  
    itemcontainer: {
      backgroundColor: Colors.bgYellow,
      borderWidth: 2,
      borderColor: 'black',
      height: 'fit-content',
      width: '100%',
      justifyContent:"center",
      alignItems:"center",
      marginTop: 15,
    },
    questioncontainer: {
      borderBottomWidth: 2,
      padding: 15,
      width: '90%'
    },
    questiontext:{
      fontSize: 16,
    },
    choicescontainer: {
      flexDirection: 'column',
      gap: 20,
      height: 'fit-content',
      paddingBottom: 20,
      paddingTop: 20,
      width: '90%',
      justifyContent:"center",
      alignItems:"flex-start",
    },
    choicesrow:{
      flexDirection: 'column',
      gap: 20,
    },
    choices: {
      backgroundColor: Colors.bgDarkYellow,
      borderRadius: 100,
      borderColor: 'black',
      borderWidth: 2,
      minWidth: '100%',
      padding: 10,
      paddingLeft: 15,
      paddingRight: 15,
    },
    choicestext: {
      fontSize: 15,
    },
})