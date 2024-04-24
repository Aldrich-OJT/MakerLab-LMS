import { useCallback, useContext, useState } from 'react';
import { Text, Pressable, StyleSheet, View, Modal, Dimensions, TouchableWithoutFeedback, KeyboardAvoidingView, Keyboard } from "react-native";
import { TextInput, RadioButton } from "react-native-paper"
import Colors from "../constants/Colors";
import { axiosPost, axiosPut } from '../utils/axios';
import { AuthContext } from '../context/AuthProvider';
import { DarkModeContext } from '../context/AuthProvider';

const dimensions = Dimensions.get("window");
const deviceWidth = dimensions.width;

const postquestionURL = "/api/question/add"
const updateQuestionURL = "/api/question/update/"
const contentType = "application/json"

export default function QuizModal({ item, selectedData,setSelectedData ,setRefresh, visibility, setModalVisible, children, postID, }) {
  const { userData } = useContext(AuthContext)
  const [errorMessage, setErrorMessage] = useState("")
  const [checked, setChecked] = useState(selectedData?.answer);
  const {isDarkMode} = useContext(DarkModeContext)
  
  const questionFormInitialValue = {
    question: selectedData?.question ?? "",
    options: selectedData?.options ? [...selectedData.options] : ["", "", "", ""],
    answer: selectedData?.answer ?? "",
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
  const cancelForm = useCallback(() => {
    setModalVisible();
    setQuestionForm(questionFormInitialValue);
    setErrorMessage("");
    setSelectedData(null)

  },[])
  // useEffect(()=>{
  //   console.log("i am rendered")
  // },[])

  const submitQuestion = useCallback(async () => {
    console.log("click")
    try {

      if (children.split(" ")[0] === "Upload") {
        const data = await axiosPost(postquestionURL, questionForm, contentType, userData.token);
        console.log(data);

      } else if (children.split(" ")[0] === "Edit") {
        const data = await axiosPut(`${updateQuestionURL}${selectedData?._id}`, questionForm, contentType, userData.token);
        console.log("ssuccess");

      }
      setRefresh()
      cancelForm()
    } catch (error) {
      console.log("error occured")
      console.log(error.data.message);
      setErrorMessage(error?.data?.message);
    }

  },[selectedData, questionForm])


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
            <View style={[styles.inputContainer, {backgroundColor: isDarkMode ? Colors.bgGray : 'white'}]}>
              <View style={styles.titleContainer}>
                <Text style={[styles.textTitle, {color: isDarkMode ? 'white' : 'black'}]}>{children}</Text>
              </View>

              <View style={styles.inputText}>
                <TextInput
                  label="Question"
                  multiline={true}
                  mode="flat"
                  onChangeText={(inputValue) => { handleForm("question", inputValue) }}
                  value={questionForm.question}
                  style={{maxHeight:90}}
                />
              </View>

              <Text style={{ fontFamily: 'PTSans-Bold', color: isDarkMode ? Colors.bgOffWhite : 'black' }}>Input choices and select the correct answer.</Text>

              <View style={styles.inputChoicesContainer}>
                {questionForm.options.map((option, i) => (
                  <View key={i} style={[styles.radiobuttonContainer, {backgroundColor: isDarkMode ? Colors.bgDarkGray : 'white'}]}>
                    <RadioButton.Android
                      style={{}}

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
              {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
              <View style={styles.buttonContainer}>
                <Pressable style={[styles.cancelButton, {backgroundColor: isDarkMode? Colors.bgGray : 'white'}]} onPress={cancelForm}>
                  <Text style={[styles.submitText, { color: Colors.bgPurple }]}>
                    Cancel
                  </Text>
                </Pressable>

                <Pressable style={[styles.submitButton, {backgrounColor: isDarkMode? Colors.bgDarkPurpleTint : Colors.bgPurple}]} onPress={submitQuestion}>
                  <Text style={styles.submitText}>
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
    height: '30%',
    width: deviceWidth * .9,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
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
    maxHeight: 60
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 30,
    paddingBottom: 5,
  },
  submitButton: {
    justifyContent: "center",
    alignItems: "center",
    height: deviceWidth * .13,
    width: deviceWidth * .34,
    borderRadius: 10,
    paddingVertical: 10,
  },
  cancelButton:{
    justifyContent: "center",
    alignItems: "center",
    height: deviceWidth * .13,
    width: deviceWidth * .34,
    borderRadius: 10,
    paddingVertical: 10,
    borderWidth: 2, 
    borderColor: Colors.bgPurple, 
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'PTSans-Bold',
  },
  radiobuttonContainer: {
    flexDirection: 'row',
    justifyContent: "center",
    alignItems: "center"
  },
  errorMessage: {
    textAlign: "center",
    fontFamily: "PTSans-Bold",
    color: Colors.bgError
  }
});



