import { TextInput } from "react-native-paper"
import { View, Pressable, Text, StyleSheet, Modal, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions } from "react-native"
import { useContext, useState } from "react"
import Colors from "../../constants/Colors";
import * as DocumentPicker from 'expo-document-picker';
import { axiosPost, axiosPut } from "../../utils/axios";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from "../../context/AuthProvider";
//import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';

const dimensions = Dimensions.get("window");
const deviceWidth = dimensions.width;

const POSTURL = "/api/post/upload/"
const PUTURL = "/api/post/update/"
const contentType = "multipart/form-data"
const mimeTypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation"
]

//FIX ON DOCUMENT BLANK ERROR
export default function ModalContent({documentName,title, description, visibility, onPress,children,id, setRefresh}) {
  const {token} = useContext(AuthContext)
  const navigation = useNavigation()
  const [errorMessage, setErrorMessage] = useState("");
  

  const formInitialData = {
    title: title ?? "",
    description: description ?? "",
    document: null
  }
  const [formData, setFormData] = useState(formInitialData)

  const handleForm = (inputName, inputValue) => {
    setFormData(prevData => ({
      ...prevData,
      [inputName]: inputValue
    }))

  }
//Function that lets you pick documents on your device
  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: mimeTypes
      });
      if (result) {
        console.log(result.assets[0])
        handleForm("document", result.assets[0])
  
      }
    } catch (err) {
      console.log("error getting document", err);
    }

    
  }
  const cancelForm = ()=>{
    onPress();
    setFormData(formInitialData);
    setErrorMessage("");
  }
  const submitForm = async()=>{
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('document', {
      uri: formData.document?.uri,
      type: formData.document?.mimeType, 
      name: formData.document?.name 
    });

    console.log(formDataToSend)
    if(children.split(" ")[0] === "Upload"){
      try {
        const data = await axiosPost(POSTURL,formDataToSend,contentType,token)

      console.log(data)
      onPress()
      setRefresh(true)
      console.log("working2")
      setFormData(formInitialData)
      setErrorMessage("");
      } catch (error) {
        //console.log(error)
        setErrorMessage(error?.data?.message)
      }
    }else if (children.split(" ")[0] === "Edit"){
      try {
        const data = await axiosPut(`${PUTURL}${id}`,formDataToSend,contentType,token)
        console.log(data)
        onPress()
        setRefresh(true)
        setFormData(formInitialData)
        setErrorMessage("");
      } catch (error) {
        setErrorMessage(error?.data?.message)
        
      }
     
    }
  }
  //console.log(formDataToSend)
  // console.log(selectedFile)
  // console.log(formData)
  //console.log(formData.title)
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
  
              <Pressable onPress={pickDocument}>
                <Text style={styles.selectButton}>
                  <Text>
                  <MaterialCommunityIcons name="paperclip" size={20} color="black" />{formData.document ? `${formData.document.name}` : "Upload File"}
                  </Text>
                {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}</Text>
              </Pressable>
    
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
    height: '30%',
    width: deviceWidth * .9,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.bgYellow,
    // borderColor: "black",
    // borderWidth: 2,
    height: "fit-content",
    gap: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    width: '100%',
    //justifyContent:"space-between",
    //alignItems:"center"
  },
  textTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex:5,
    //backgroundColor: Colors.bgGray,
    //color: Colors.bgYellow,
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    // borderBottomRightRadius: 15,
    // borderBottomLeftRadius: 15,
    width: deviceWidth * .64,
    height: deviceWidth * .13,
    //paddingVertical: (deviceWidth * .13)/4,
    //marginBottom: 5,
  },
  closeButton: {
    //backgroundColor: Colors.bgGray,
    // borderRadius: 50,
    //paddingHorizontal: 10,
    height: deviceWidth * .13,
    // borderTopLeftRadius: 30,
    // borderTopRightRadius: 30,
    // borderBottomRightRadius: 30,
    // borderBottomLeftRadius: 15,
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
    height: deviceWidth * .13,
    width: deviceWidth * .75,
    borderRadius: 50,
    paddingVertical: 10,
    marginTop: 10,
  },
  selectButton: {
    backgroundColor: "#FFA800",
    height: deviceWidth * .10,
    width: deviceWidth * .75,
    borderRadius: 6,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  SubmitText:{
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  errorMessage:{
    alignSelf:"center",
    color: Colors.bgError
  }
});


