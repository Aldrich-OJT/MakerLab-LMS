import { useContext, useState } from 'react';
import { Text, Pressable, StyleSheet, View, Modal, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from "react-native";
import { TextInput, RadioButton } from "react-native-paper"
import Colors from "../constants/Colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { axiosPost, axiosPut } from '../utils/axios';
import { AuthContext } from '../context/AuthProvider';



const postquestionURL = "/api/question/add"
const updateQuestionURL = "/api/question/update/"
const contentType =  "application/json"

export default function QuizModal({ item, setRefresh, visibility, setModalVisible, children, postID,  }) {
  //console.log(postID,"ITEM I?T")
  const {userData} = useContext(AuthContext)
  const [errorMessage, setErrorMessage] = useState("")
  const [checked, setChecked] = useState(item?.answer);
  const questionFormInitialValue = {
    question: item?.question ?? "",
    options: item?.options ? [...item.options] : [ "", "", "", ""],
    answer: item?.answer ?? "",
    postID: postID
  }
  const [questionForm, setQuestionForm] = useState(questionFormInitialValue) 
  const handleForm = (inputName, inputValue, indx) => {

    setQuestionForm(prevData => ({
      ...prevData,
      // If inputName is "options", it will add the inputValue into the array instead of replacing the value
      [inputName]: inputName === "options" ? prevData.options.map((item, index) => indx === index ? inputValue : item) : inputValue
    }));
  };
  const cancelForm = () => {
    setModalVisible();
    setQuestionForm(questionFormInitialValue);
    setErrorMessage("");
  
  }

const addQuestion = async () => {
  try {

    if(children.split(" ")[0] === "Upload"){
      const data = await axiosPost(postquestionURL, questionForm, contentType, userData.token);
      console.log("this is data",data);
     
    }else if (children.split(" ")[0] === "Edit"){
      const data = await axiosPut(`${updateQuestionURL}${item?._id}`, questionForm, contentType, userData.token);
      console.log("this is data",data);
      
    }
    setRefresh()
    cancelForm()
  } catch (error) {
    console.log(error.data.message);
    setErrorMessage(error?.data?.message);
  }
 
};

  
  //console.log(questionForm)
  return (
    <KeyboardAvoidingView behavior="padding">
      <Modal
        animationType="fade"
        visible={visibility}
        onRequestClose={setModalVisible}
        transparent={true}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.mainContainer} >
            <View style={styles.inputContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.textTitle}>{children}</Text>
                <Pressable style={styles.closeButton} onPress={cancelForm}>
                  <Text>
                    <MaterialCommunityIcons name="close" size={30} color={Colors.bgRedInvalid} />
                  </Text>
                </Pressable>
              </View>

              <View style={styles.inputText}>
                <TextInput
                  label="Question"
                  multiline={true}
                  mode="flat"
                  onChangeText={(inputValue) => { handleForm("question", inputValue) }}
                  value={questionForm.question}
                />
              </View>

              <Text style={{ fontFamily: 'PTSans-Bold' }}>Input choices and select the correct answer.</Text>

              <View style={styles.inputChoicesContainer}>
                {questionForm.options.map((option, i) => (
                  <View key={i} style={styles.radiobuttonContainer}>
                    <RadioButton.Android
                      style={{}}
                      color={Colors.bgDarkViolet}
                      
                      value={checked}
                      status={checked === option && option.length > 0 ? 'checked' : 'unchecked'}
                      onPress={() => (handleForm("answer", option, setChecked(option)))}
                    />
                    <TextInput
                      style={styles.inputText}
                      multiline={true}
                      label={`Option ${String.fromCharCode(97 + i).toUpperCase()}`}
                      mode="flat"
                      onChangeText={(inputValue) => handleForm("options", inputValue, i)}
                      value={questionForm.options[i]}
                    />
                  </View>
                ))}


              </View>

              <View style={styles.buttonContainer}>
                {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
                <Pressable style={[styles.submitButton]}onPress={addQuestion}>
                  <Text style={styles.SubmitText}>
                    {children.split(" ")[0]} Question
                  </Text>
                </Pressable>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  inputContainer: {
    width: '90%',
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.bgYellow,
    height: "fit-content",
    gap: 10,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  textTitle: {
    fontSize: 20,
    fontFamily: 'PTSans-Bold',
    flex: 5,
    textAlign: 'center',
    paddingVertical: 5,
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  inputChoicesContainer: {
    width: '90%',
    gap: 5,
    alignItems: 'center'
  },
  inputText: {
    width: '90%',
  },
  //radioButtons:{
  //  textSelf:'center'
  //},
  buttonContainer: {
    width:"100%",
    justifyContent:"center",
    alignItems:"stretch",
    paddingBottom: 5,
  },
  submitButton: {
    backgroundColor: Colors.bgViolet,
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 10,
  },
  SubmitText: {
    textAlign:"center",
    color: 'white',
    fontFamily: 'PTSans-Bold',
  },
  radiobuttonContainer:{
    flexDirection: 'row', 
    justifyContent:"center", 
    alignItems:"center"
  },
  errorMessage:{
    textAlign:"center",
    fontFamily: "PTSans-Bold",
    color:Colors.bgError
  }
});



