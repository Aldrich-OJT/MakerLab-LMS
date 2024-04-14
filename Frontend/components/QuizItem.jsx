import { Text, Pressable, StyleSheet, View, Dimensions } from "react-native";
import Colors from "../constants/Colors";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function QuizItem(props) {
  const [selected, setSelected] = useState(null);

  const [singleScore, setSingleScore] = useState(0)
  const handleChoiceSelection = (choice) => {
    console.log("i am pressed")
    setSelected(choice);
    props.setAnsweredQuestion(prevState => prevState + 1)
    //prevent multiple selection if user clicks the selected option again
    if (selected === choice) {
      console.log("i am selected again")
      setSelected(null)
      setSingleScore(0)
  
      props.setAnsweredQuestion(prevState => prevState - 1)
        
    }else if (props.options[choice] === props.answer) {//adds 1 to singleScore state if choice is equal to answer else reset to  0
      setSingleScore(prevState=>prevState+1)
    }else{
      setSingleScore(0)
    }
    
   
  };
  //only checks if state changes from 0 to 1 or vice versa, do not check if already 0
  useEffect(()=>{
    //initial value of score is zero, so this code prevents from subtracting at the inital value
    if (singleScore === 0 && props.score !=0) {
      console.log("change")
      console.log(singleScore)
     
      props.setScore(prevState => prevState - 1)
    }else{
      props.setScore(prevState => prevState + singleScore)
    }
   
  },[singleScore])
  console.log(props.score)
 console.log(singleScore)
  return (
    <View style={styles.itemcontainer}>
      <View style={styles.questioncontainer}>
        <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <Text style={styles.questionNumberText}>Question {props.itemNumber} </Text>
          <View style={styles.buttonsContainer}>
            <Pressable>
                <MaterialCommunityIcons 
                  name="square-edit-outline" 
                  size={24}
                  color={Colors.bgYellow}
                  style={styles.buttons}
                />
              </Pressable>

              <Pressable>
                <MaterialCommunityIcons 
                  name="delete"
                  size={24}
                  color={Colors.bgYellow}
                  style={styles.buttons}
                />
              </Pressable>
            </View>
        </View>
        <Text style={styles.questiontext}>{props.question}</Text>
      </View>

      <View style={styles.choicescontainer}>
        <View style={styles.choicesrow}>
          {props.options.map((option, index) => (
            <Pressable
             key={index}
              style={[
                styles.choices,
                selected === index && styles.selectedchoices
              ]}
              onPress={() => handleChoiceSelection(index)}
            >
              <Text
                style={[
                  styles.choicestext,
                  selected === index && { color: Colors.bgOffWhite }
                ]}
              >
                {String.fromCharCode(97 + index)}. {option}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>
    </View>
  );
};



const styles = StyleSheet.create({
  itemcontainer: {
    backgroundColor: Colors.bgYellow,
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 20
  },
  questioncontainer: {
    width: '90%',
    paddingTop: 15,
  },
  questiontext: {
    fontSize: 16,
    fontFamily: 'PTSans-Regular',
    textAlign: 'justify',
  },
  questionNumberText:{
    fontSize: 16,
    fontFamily: 'PTSans-Bold',
    color: Colors.bgYellow,
    backgroundColor: 'black',
    borderRadius: 10,
    width: '33%',
    textAlign: 'center',
    padding:10,
    marginBottom:10,
  },
  choicescontainer: {
    flexDirection: 'column',
    gap: 20,
    height: 'fit-content',
    paddingBottom: 20,
    paddingTop: 20,
    width: '90%',
    justifyContent: "center",
    alignItems: "flex-start",
  },
  choicesrow: {
    flexDirection: 'column',
    gap: 20,
  },
  choices: {
    backgroundColor: Colors.bgDarkYellow,
    borderRadius: 100,
    borderColor: Colors.bgGray,
    borderWidth: 1,
    minWidth: '100%',
    padding: 10,
    paddingHorizontal: 15,
  },
  choicestext: {
    fontSize: 16,
    fontFamily: 'PTSans-Regular'
  },
  selectedchoices: {
    backgroundColor: Colors.bgDarkViolet,
  },
  buttonsContainer:{
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'flex-end'
  },
  buttons:{
    borderRadius:10,
    padding:7,
    backgroundColor: 'black',
  },
})