import { TextInput, useTheme } from "react-native-paper"
import { View, Pressable, Text, StyleSheet, Modal, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions, Platform } from "react-native"
import { useCallback, useContext, useState } from "react"
import Colors from "../../constants/Colors";
import { axiosPost, axiosPut } from "../../utils/axios";
import { AuthContext} from "../../context/AuthProvider";
import { useNavigation } from '@react-navigation/native';

const dimensions = Dimensions.get("window");
const deviceWidth = dimensions.width;

const POSTURL = "/api/categories/add"
const EDITURL = "/api/categories/update/"
const contentType = "application/json"


export default function LessonModal({ visibility,selectedData, setSelectedData,setModalVisible, children, setRefresh }) {
  const { userData } = useContext(AuthContext)
  //const navigation = useNavigation()
  const [errorMessage, setErrorMessage] = useState("");
  const theme  = useTheme()

  const formInitialData = {
    title: selectedData?.title,
    description: selectedData?.description,
  }
  const [formData, setFormData] = useState(formInitialData)
  const handleForm = (inputName, inputValue) => {
    setFormData(prevData => ({
      ...prevData,
      [inputName]: inputValue
    }))

  }
 
  const cancelForm = () => {
    setModalVisible();
    setFormData(formInitialData);
    setErrorMessage("");
    setSelectedData("");
  }

  const submitForm = useCallback(async () => {
  

    try {
      if (children.split(" ")[0] === "Upload") {
        await axiosPost(POSTURL, formData, contentType, userData.token)
        //console.log("success")
      } else {
       await axiosPut(`${EDITURL}${selectedData.ID}`, formData, contentType, userData.token)
        //console.log("success")
      }
      cancelForm()
      setRefresh(true)
    } catch (error) {
      setErrorMessage(error?.data?.message)
    }
  
  },[formData, selectedData])


  return (

    <Modal
      animationType="fade"
      visible={visibility}
      onRequestClose={setModalVisible}
      transparent={true}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.mainContainer} >
          <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"}>
            <View style={[styles.inputContainer, {backgroundColor: theme.colors.darkGrayWhite}]}>
              <View style={styles.titleContainer}>
                <Text style={[styles.textTitle, {color:theme.colors.fontcolorOffwhiteBlack}]}>{children}</Text>
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
                <Pressable style={[styles.cancelButton, {backgroundColor: theme.colors.darkGrayWhite}]} onPress={cancelForm}>
                  <Text style={[styles.submitText, { color: Colors.bgPurple }]}>
                    Cancel
                  </Text>
                </Pressable>

                <Pressable style={[styles.submitButton, {backgroundColor: Colors.bgPurple}]} onPress={submitForm}>
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
    justifyContent: "center",
    alignItems: "center",
    height: deviceWidth * .13,
    width: deviceWidth * .34,
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 10,
  },
  cancelButton: {
    borderWidth: 2, 
    borderColor: Colors.bgPurple, 
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
  cancelText: {
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


