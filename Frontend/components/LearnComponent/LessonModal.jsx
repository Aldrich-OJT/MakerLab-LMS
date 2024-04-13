import { TextInput } from "react-native-paper"
import { View, Pressable, Text, StyleSheet, Modal, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions } from "react-native"
import { useContext, useState } from "react"
import Colors from "../../constants/Colors";
import { axiosPost, axiosPut } from "../../utils/axios";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from "../../context/AuthProvider";
import { useNavigation } from '@react-navigation/native';

const POSTURL = "/api/categories/add"
const contentType = "application/json"

//FIX ON DOCUMENT BLANK ERROR
export default function LessonModal({ visibility, onPress, children, setRefresh }) {
  const { token } = useContext(AuthContext)
  //const navigation = useNavigation()
  const [errorMessage, setErrorMessage] = useState("");
  
  const formInitialData = {
    title: "",
    description: "",
  }
  const [formData, setFormData] = useState(formInitialData)

  const handleForm = (inputName, inputValue) => {
    setFormData(prevData => ({
      ...prevData,
      [inputName]: inputValue
    }))

  }

  const cancelForm = () => {
    onPress();
    setFormData(formInitialData);
    setErrorMessage("");
  }

  const submitForm = async () => {
    console.log(formData)
    try {
      const data = await axiosPost(POSTURL, formData, contentType, token)
      console.log(data)
      onPress()
      setRefresh(true)
      console.log("working2")
      setFormData(formInitialData)
      setErrorMessage("");
      } catch (error) {
        setErrorMessage(error?.data?.message)
      }
  }
 
  return (
    <KeyboardAvoidingView behavior="padding">
      <Modal
        animationType="fade"
        visible={visibility}
        onRequestClose={onPress}
        transparent={true}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.mainContainer} >
            <View style={styles.inputContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.textTitle}>{children}</Text>
                
                <Pressable style={styles.closeButton} onPress={cancelForm}>
                <Text><MaterialCommunityIcons name="close" size={30} color={Colors.bgRedInvalid} /></Text>
                </Pressable>
                
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
                <Pressable style={[styles.submitButton]} onPress={submitForm}>
                  <Text style={styles.SubmitText}>
                    Submit
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
    paddingHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  inputContainer: {
    width: '100%',
    backgroundColor: Colors.bgYellow,
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
    flex:5,
    textAlign: 'center',
    alignSelf: 'center',
    padding: 10,
  },
  closeButton: {
    position: 'absolute',
    right: 0,
    top:0,
  },
  textInput: {
    width: "92%",
  },
  buttonContainer: {
    flexDirection:"row",
    gap: 30,
    paddingBottom: 5,
  },
  submitButton: {
    backgroundColor: Colors.bgViolet,
    justifyContent: "center",
    alignItems: "center",
    width: '60%',
    borderRadius: 10,
    paddingVertical: 15,
    marginTop: 10,
  },
  SubmitText:{
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


