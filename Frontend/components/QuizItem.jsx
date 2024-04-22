import { Text, Pressable, StyleSheet, View, Alert } from "react-native";
import Colors from "../constants/Colors";
import { useContext, useEffect, useState } from "react";
import { axiosDelete } from "../utils/axios";
import { AuthContext } from "../context/AuthProvider";
import QuizModal from "./QuizModal";
import { Menu } from "react-native-paper";

const deleteQuestionURL = "/api/question/delete/"



export default function QuizItem(props) {
  const indexToUpdate = props.itemNumber
  const singleScore =  props.singleScore
  const numberQuestionsAnswered = props.numberQuestionsAnswered
  const [menuVisible, setMenuVisible] = useState(false);
  const { userData } = useContext(AuthContext)
  const [selected, setSelected] = useState(null);


  
  const handleChoiceSelection = (choice) => {
    props.setErrorMessage("")
    setSelected(choice);
   
    let updatednumberQuestionsAnsweredArray = [...numberQuestionsAnswered]
    updatednumberQuestionsAnsweredArray[indexToUpdate] = 1
  
  
    props.setnumberQuestionsAnswered(updatednumberQuestionsAnsweredArray)


    //prevent multiple selection if user clicks the selected option again
    if (selected === choice) {
      setSelected(null)
         
      let updatedscoreArray = [...singleScore]
      updatedscoreArray[indexToUpdate] = 0
    
      props.setSingleScore(updatedscoreArray)

      let updatednumberQuestionsAnsweredArray = [...numberQuestionsAnswered]
      updatednumberQuestionsAnsweredArray[indexToUpdate] = 0
      props.setnumberQuestionsAnswered(updatednumberQuestionsAnsweredArray)

    } else if (props.item.options[choice] === props.item.answer) {
     
      let updatedArray = [...singleScore]
      updatedArray[indexToUpdate] = 1
    
      props.setSingleScore(updatedArray)

     
    } else {
       let updatedArray = [...singleScore]
       updatedArray[indexToUpdate] =  0


      props.setSingleScore(updatedArray)
    }


  };
  //only checks if state changes from 0 to 1 or vice versa, do not check if already 0
  

 
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
    //console.log(data)
    props.setRefresh()
  }

  //console.log(props.selectedNumber)
  
  return (
    <View style={styles.itemcontainer}>
      {/* { modalVisible && <QuizModal
        visibility={modalVisible}
        item={props.item}
        postID={props.postID}
        setModalVisible={() => setModalVisible(false)}
        setRefresh={props.setRefresh}
      >Edit Question</QuizModal>} */}

      <View style={styles.questioncontainer}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={styles.questionNumberText}>Question {props.itemNumber + 1} </Text>
          <View style={styles.buttonsContainer}>
            {userData.role === 'admin' && (
              <Menu
                visible={menuVisible}
                onDismiss={() => setMenuVisible(false)}
                anchor={
                  <Pressable style={{ width: 50, height: 30 }} onPress={() => (setMenuVisible(true))}>
                    <Text style={{ fontFamily: 'icon', fontSize: 22, color: Colors.bgPurple, alignSelf: 'flex-end', marginRight: 5 }}> </Text>
                  </Pressable>
                }>
                <Menu.Item onPress={() => {setSelectedData({
                  ...props.item
                }),props.setModalVisible(true)}} title={<Text style={{ fontFamily: 'icon', fontSize: 16, color: Colors.bgDarkGray, textAlign: "left" }}> Edit</Text>} />
                <Menu.Item onPress={createTwoButtonAlert} title={<Text style={{ fontFamily: 'icon', fontSize: 16, color: Colors.bgDarkGray, textAlign: "left" }}> Delete</Text>} />
              </Menu>
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
                  selected === index && { color: 'black' }
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
    backgroundColor: Colors.bgOffWhite,
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
    backgroundColor: Colors.bgLightYellow,
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