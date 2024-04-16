import { Text, Pressable, StyleSheet, View, Alert } from "react-native";
import Colors from "../constants/Colors";
import { useContext, useEffect, useState } from "react";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { axiosDelete } from "../utils/axios";
import { AuthContext } from "../context/AuthProvider";
import QuizModal from "./QuizModal";

const deleteQuestionURL = "/api/question/delete/"

export default function QuizItem(props) {
  console.log(props)
  const { userData } = useContext(AuthContext)
  const [modalVisible, setModalVisible] = useState(false)
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

    } else if (props.item.options[choice] === props.item.answer) {//adds 1 to singleScore state if choice is equal to answer else reset to  0
      setSingleScore(prevState => prevState + 1)
    } else {
      setSingleScore(0)
    }


  };
  //only checks if state changes from 0 to 1 or vice versa, do not check if already 0
  useEffect(() => {
    //initial value of score is zero, so this code prevents from subtracting at the inital value
    if (singleScore === 0 && props.score != 0) {
      console.log("change")
      console.log(singleScore)

      props.setScore(prevState => prevState - 1)
    } else {
      props.setScore(prevState => prevState + singleScore)
    }

  }, [singleScore])
  const createTwoButtonAlert = () => {
    Alert.alert("Delete Question?", "Are you sure you want to delete this question?", [
      {
        text: "Cancel",
        style: "cancel"

      },
      {
        text: "yes",
        onPress: deleteQuestion
      },
    ])
  }
  const deleteQuestion = async () => {
    const data = await axiosDelete(`${deleteQuestionURL}${props.ID}`, userData.token)
    console.log(data)
    props.setRefresh()
  }

  //   console.log(props.score)
  //  console.log(singleScore)
  return (
    <View style={styles.itemcontainer}>
      <QuizModal
      visibility={modalVisible}
      item={props.item}
      postID={props.postID}
      setModalVisible={()=>setModalVisible(false)}
      setRefresh={props.setRefresh}
      
      >Edit Question</QuizModal>
      <View style={styles.questioncontainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.questionNumberText}>Question {props.itemNumber} </Text>
          <View style={styles.buttonsContainer}>
            {userData.role === "admin" && (
              <Pressable>
                <Text style={[styles.buttons, {fontFamily: 'icon', fontSize:21, color:Colors.bgYellow,padding:8.5}]}></Text>
              </Pressable>
            )}

            {userData.role === 'admin' && (
            <Pressable onPress={createTwoButtonAlert}>
              <Text style={[styles.buttons, {fontFamily: 'icon', fontSize:25, color:Colors.bgError}]}></Text>
            </Pressable>
            )}
          </View>
        </View>
        <Text style={styles.questiontext}>{props.item.question}</Text>
      </View>

      <View style={styles.choicescontainer}>
        <View style={styles.choicesrow}>
          {props.item.options.map((option, index) => (
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
                  selected === index && { color: 'white' }
                ]}
              >
                {String.fromCharCode(97 + index).toUpperCase()}. {option}
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
    backgroundColor: 'white',
    alignItems: "center",
    borderRadius: 10,
    marginBottom: 10,
    marginHorizontal: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 5,
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
  questionNumberText: {
    fontSize: 16,
    fontFamily: 'PTSans-Bold',
    color: 'white',
    backgroundColor: Colors.bgPurple,
    borderRadius: 10,
    width: '33%',
    textAlign: 'center',
    padding: 10,
    marginBottom: 10,
    overflow: "hidden"
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
    backgroundColor: '#FFF5DB',
    borderRadius: 100,
    borderColor: Colors.bgGray,
    borderWidth: .5,
    minWidth: '100%',
    padding: 10,
    paddingHorizontal: 15,
  },
  choicestext: {
    fontSize: 16,
    fontFamily: 'PTSans-Regular'
  },
  selectedchoices: {
    backgroundColor: Colors.bgPurple,
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 5,
    justifyContent: 'flex-end'
  },
  buttons: {
    borderRadius: 10,
    padding: 7,
    backgroundColor: Colors.bgDarkGray,
    overflow: "hidden"
  },
})