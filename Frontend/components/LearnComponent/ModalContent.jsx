import { TextInput, useTheme } from "react-native-paper"
import { View, Pressable, Text, StyleSheet, Modal, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions } from "react-native"
import { useCallback, useContext, useState } from "react"
import { axiosPost, axiosPut } from "../../utils/axios";
import { AuthContext } from "../../context/AuthProvider";
//import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import Colors from "../../constants/Colors";
import * as DocumentPicker from 'expo-document-picker';

const dimensions = Dimensions.get("window");
const deviceWidth = dimensions.width;

const POSTURL = "/api/post/add"
const PUTURL = "/api/post/update/"
const contentType = "multipart/form-data"
const mimeTypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "video/mp4"
]

//FIX ON DOCUMENT BLANK ERROR
export default function ModalContent({ documentName, title, description, visibility, onPress, children, id, setRefresh }) {
  const { userData } = useContext(AuthContext)
  //const navigation = useNavigation()
  const [errorMessage, setErrorMessage] = useState("");
  const theme = useTheme()

  const formInitialData = {
    title: title ?? "",
    description: description ?? "",
    document: documentName
  }
  const [formData, setFormData] = useState(formInitialData)

  const handleForm = (inputName, inputValue) => {
    setFormData(prevData => ({
      ...prevData,
      [inputName]: inputValue
    }))

  }
  //Function that lets you pick documents on your device
  const pickDocument = useCallback(async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: mimeTypes
      });
      if (result) {
        handleForm("document", result.assets[0]);
      } else {
        handleForm("document", null);
      }
    } catch (err) {
      console.log("error getting document", err);
    }
  }, [])

  const cancelForm = useCallback(() => {
    onPress();
    setFormData(formInitialData);
    setErrorMessage("");
  }, [])

  const submitForm = async () => {

    const formDataToSend = new FormData()
    formDataToSend.append('userId', userData._id)
    formDataToSend.append('title', formData?.title)
    formDataToSend.append('description', formData?.description)

    if (formData.document != null) {
      formDataToSend.append('document', {
        uri: formData.document.uri,
        type: formData.document.mimeType,
        name: formData.document.name
      })
    }


    if (children.split(" ")[0] === "Upload") {
      formDataToSend.append('categoryID', id)
      try {
        const data = await axiosPost(POSTURL, formDataToSend, contentType, userData.token)
      } catch (error) {
        setErrorMessage(error?.data?.message)
        //console.log(errorMessage)
        return
      }
    } else if (children.split(" ")[0] === "Edit") {
      try {
        const data = await axiosPut(`${PUTURL}${id}`, formDataToSend, contentType, userData.token)

      } catch (error) {
        setErrorMessage(error?.data?.message)
        return
      }
    }

    setRefresh(true)
    cancelForm()
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
            <View style={[styles.inputContainer,{backgroundColor: theme.colors.darkGrayWhite}]}>
              <View style={styles.titleContainer}>
                <Text style={[styles.textTitle, {color: theme.colors.fontcolorOffwhiteBlack}]}>{children}</Text>
              </View>

              <TextInput
                label="Title"
                style={styles.textInput}
                onChangeText={(inputvalue) => handleForm("title", inputvalue)}
                mode="flat"
                value={formData.title ? formData.title : ""}
              />

              <TextInput
                multiline={true}
                label="Description"
                style={styles.textInput}
                onChangeText={(inputvalue) => handleForm("description", inputvalue)}
                mode="flat"
                value={formData.description ? formData.description : ""}
              />

              <Pressable onPress={pickDocument}>
                <Text style={styles.selectButton}>
                  <Text style={{ fontFamily: 'PTSans-Bold', color: Colors.bgDarkGray }}>
                    <Text style={{ fontFamily: 'icon', fontSize: 20 }}></Text>
                    {formData?.document?.name ? `${formData?.document?.name}` : formData?.document ? `${formData?.document}` : "Upload File"}
                    {/* formData.document ? `${formData.document.name}` :  */}
                  </Text>
                </Text>
              </Pressable>
              {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}

              <View style={styles.buttonContainer}>
                <Pressable style={[styles.cancelButton, {backgroundColor: theme.colors.grayWhite}]} onPress={cancelForm}>
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
    backgroundColor: "rgba(0,0,0,0.3)"
  },
  inputContainer: {
    maxheight: '30%',
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
  closeButton: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  textInput: {
    width: "92%",
    maxHeight: '50%',
  },
  buttonContainer: {
    flexDirection: "row",
    paddingBottom: 5,
    gap: 30,
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
  selectButton: {
    backgroundColor: Colors.bgLightGray,
    paddingVertical: 10,
    width: deviceWidth * .75,
    borderRadius: 6,
    textAlign: 'center',
    textAlignVertical: 'center',
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
  cancelButton:{
    borderWidth: 2, 
    borderColor: Colors.bgPurple, 
    backgroundColor: 'white' ,
    justifyContent: "center",
    alignItems: "center",
    height: deviceWidth * .13,
    width: deviceWidth * .34,
    borderRadius: 10,
    paddingVertical: 10,
    marginTop: 10,
  },
  errorMessage: {
    alignSelf: "center",
    color: Colors.bgError,
    fontFamily: 'PTSans-Bold',
  }
});


