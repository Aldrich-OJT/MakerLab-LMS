import { TextInput } from "react-native-paper"
import { View, Pressable, Text, StyleSheet, Modal, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions, Platform } from "react-native"
import { useContext, useState } from "react"
import Colors from "../../constants/Colors";
import * as DocumentPicker from 'expo-document-picker';
import { axiosPost, axiosPut } from "../../utils/axios";
import { AuthContext } from "../../context/AuthProvider";
//import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';


const dimensions = Dimensions.get("window");
const deviceWidth = dimensions.width;

const POSTURL = "/api/categories/add"
const EDITURL = "/api/categories/update/"
const contentType = "application/json"

//FIX ON DOCUMENT BLANK ERROR
export default function LessonModal({ visibility, onPress,title,description, children, setRefresh,ID }) {
  const { userData } = useContext(AuthContext)
  //const navigation = useNavigation()
  const [errorMessage, setErrorMessage] = useState("");

  const formInitialData = {
    title: title ?? "",
    description: description ?? "",
  }
  const [formData, setFormData] = useState(formInitialData)

  const handleForm = (inputName, inputValue) => {
    setFormData(prevData => ({
      ...prevData,
      [inputName]: inputValue
    }))

  }
  console.log(ID)
  const cancelForm = () => {
    onPress();
    setFormData(formInitialData);
    setErrorMessage("");
  }

  const submitForm = async () => {
    //console.log(formData)
  
    try {
      if(children.split(" ")[0] === "Upload"){
        const data = await axiosPost(POSTURL, formData, contentType, userData.token)
        console.log(data)
      }else{
        const data = await axiosPut(`${EDITURL}${ID}`, formData, contentType, userData.token)
        console.log(data)
      }

    } catch (error) {
      setErrorMessage(error?.data?.message)
    }
    onPress()
    setRefresh(true)
    setFormData(formInitialData)
    setErrorMessage("");
  }

  return (

    <Modal
      animationType="fade"
      visible={visibility}
      onRequestClose={onPress}
      transparent={true}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.mainContainer} >
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={styles.inputContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.textTitle}>{children}</Text>
              </View>

              <TextInput
                label="Title"
                style={styles.textInput}
                onChangeText={(inputvalue) => handleForm("title", inputvalue)}
                mode="flat"
                value={formData.title}
              />

              <TextInput
                multiline={true}
                label="Description"
                style={styles.textInput}
                onChangeText={(inputvalue) => handleForm("description", inputvalue)}
                mode="flat"
                value={formData.description} />
              {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
              <View style={styles.buttonContainer}>
              <Pressable style={[styles.submitButton, {borderWidth:2, borderColor: Colors.bgPurple, backgroundColor: 'white'}]} onPress={cancelForm}>
                  <Text style={[styles.submitText, {color:Colors.bgPurple}]}>
                    Cancel
                  </Text>
                </Pressable>

                <Pressable style={styles.submitButton} onPress={submitForm}>
                  <Text style={styles.submitText}>
                    Submit
                  </Text>
                </Pressable>
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
      </TouchableWithoutFeedback>
    </Modal>


  )
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  inputContainer: {
    height: '30%',
    width: deviceWidth * .9,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    backgroundColor: 'white',
    height: "fit-content",
    gap: 10,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  textTitle: {
    fontSize: 18,
    fontFamily: 'PTSans-Bold',
    flex: 5,
    textAlign: 'center',
    alignSelf: 'center',
    padding: 10,
  },
  textInput: {
    width: "92%",
  },
  buttonContainer: {
    flexDirection: "row",
    gap: 30,
    paddingBottom: 5,
  },
  submitButton: {
    backgroundColor: Colors.bgPurple,
    justifyContent: "center",
    alignItems: "center",
    height: deviceWidth * .13,
    width: deviceWidth * .34,
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 10,
  },
  submitText: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'PTSans-Bold',
  },
  cancelText:{
    color: 'white',
    fontSize: 16,
    fontFamily: 'PTSans-Bold',
  },
  errorMessage: {
    alignSelf: "center",
    color: Colors.bgError,
    fontFamily: 'PTSans-Bold',
  }
});


