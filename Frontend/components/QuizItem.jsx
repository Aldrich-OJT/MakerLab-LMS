import { Text, Pressable, StyleSheet, View, Image, Dimensions } from "react-native"
import Colors from "../constants/Colors";
import { useState } from "react";

const dimensions = Dimensions.get('window');   

export default function QuizItem(props) {
  const [selected, setSelected] = useState(null);

  const handleChoiceSelection = (choice) => {
    setSelected(choice === selected ? null : choice);
  };

  return (
    <View style={styles.itemcontainer}>
      <View style={styles.questioncontainer}>
        <Text style={styles.questiontext}>{props.question}</Text>
      </View>

      <View style={styles.choicescontainer}>
        <View style={styles.choicesrow}>
          <Pressable
            style={[
              styles.choices,
              selected === 'a' && styles.selectedchoices]}
            onPress={() => handleChoiceSelection('a')}
          >
            <Text
              style={[
              styles.choicestext,
              selected === 'a' && {color: Colors.bgOffWhite}]}
            >
              {'a. ' + props.choice1}</Text>
          </Pressable>

          <Pressable
            style={[
              styles.choices,
              selected === 'b' && styles.selectedchoices]}
            onPress={() => handleChoiceSelection('b')}
          >
               <Text 
              style={[
              styles.choicestext,
              selected === 'b' && {color: Colors.bgOffWhite}]}
            >
              {'b. ' + props.choice2}</Text>
          </Pressable>
        </View>

        <View style={styles.choicesrow}>
          <Pressable
            style={[
              styles.choices,
              selected === 'c' && styles.selectedchoices]}
            onPress={() => handleChoiceSelection('c')}
          >
            <Text 
              style={[
              styles.choicestext,
              selected === 'c' && {color: Colors.bgOffWhite}]}
            >
              {'c. ' + props.choice3}</Text>
          </Pressable>

          <Pressable
            style={[
              styles.choices,
              selected === 'd' && styles.selectedchoices]}
            onPress={() => handleChoiceSelection('d')}
          >
            <Text 
              style={[
              styles.choicestext,
              selected === 'd' && {color: Colors.bgOffWhite}]}
            >
              {'d. ' + props.choice4}
            </Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  
    itemcontainer: {
      backgroundColor: Colors.bgYellow,
      height: 'fit-content',
      width: '100%',
      justifyContent:"center",
      alignItems:"center",
      borderRadius:10,
      marginTop: 15,
    },
    questioncontainer: {
      borderBottomWidth: 2,
      borderBottomColor: Colors.bgDarkYellow,
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
      minWidth: '100%',
      padding: 10,
      paddingLeft: 15,
      paddingRight: 15,
    },
    choicestext: {
      fontSize: 15,
    },
    selectedchoices: {
      backgroundColor: Colors.bgDarkViolet,
      borderColor: 'black',
    }
})