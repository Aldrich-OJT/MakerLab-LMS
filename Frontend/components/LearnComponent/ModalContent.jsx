import { TextInput } from "react-native-paper"
import { View, Pressable, Text, StyleSheet, Modal, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Dimensions } from "react-native"
import { useContext, useEffect, useState } from "react"
import Colors from "../../constants/Colors";
import * as DocumentPicker from 'expo-document-picker';
import { axiosPost, axiosPut } from "../../utils/axios";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from "../../context/AuthProvider";
//import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';

const dimensions = Dimensions.get("window");
const deviceWidth = dimensions.width;

const POSTURL = "/api/post/add"
const PUTURL = "/api/post/update/"
const contentType = "multipart/form-data"
const mimeTypes = [
  "application/pdf",
  "application/vnd.openxmlformats-officedocument.presentationml.presentation"
]

//FIX ON DOCUMENT BLANK ERROR
export default function ModalContent({documentName,title, description, visibility, onPress,children,id, setRefresh}) {
  const {userData} = useContext(AuthContext)
  const navigation = useNavigation()
  const [errorMessage, setErrorMessage] = useState("");
  

  const formInitialData = {
    title: title ?? "",
    description: description ?? "",
    document:null
  }
  const [formData, setFormData] = useState(formInitialData)

  const handleForm = (inputName, inputValue) => {
    setFormData(prevData => ({
      ...prevData,
      [inputName]: inputValue
    }))

  }
  // useEffect(() => {
  //   console.log(title,description)
  //   formInitialData ={
  //     title: title,
  //     description: description,
  //     document:documentName ?? ""
  //   }
  // }, []);
//Function that lets you pick documents on your device
const pickDocument = async () => {
  try {
    const result = await DocumentPicker.getDocumentAsync({
      type: mimeTypes
    });
    if (result) {
      console.log(result.assets[0]);
      handleForm("document", result.assets[0]);
    } else {
      handleForm("document", null);
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
    
    const formDataToSend = new FormData()
    formDataToSend.append('title', formData?.title)
    formDataToSend.append('description', formData?.description)
    
    if(formData.document != null){
      formDataToSend.append('document', {
      uri: formData.document.uri,
      type: formData.document.mimeType, 
      name: formData.document.name 
    })}

   
    if(children.split(" ")[0] === "Upload"){
      formDataToSend.append('categoryID', id)
      console.log(formDataToSend._parts)
      try {
        const data = await axiosPost(POSTURL,formDataToSend,contentType,userData.token)
        console.log(data)
      } catch (error) {
        console.log(error.data.message)
        setErrorMessage(error?.data?.message)
        console.log(errorMessage)
        return
      }
    }else if (children.split(" ")[0] === "Edit"){
      try {
        const data = await axiosPut(`${PUTURL}${id}`,formDataToSend,contentType,userData.token)
        console.log(data)
        
      } catch (error) {
        setErrorMessage(error?.data?.message)
        return
      }
      console.log("done adding now will close modal")
    }
    onPress()
    setRefresh(true)
    setFormData(formInitialData)
    setErrorMessage("");
  }
  //console.log(formDataToSend)
  // console.log(selectedFile)
  // console.log(formData)
  //console.log(formData.title)
  //console.log(formData)
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
                value={formData.title ? formData.title : ""}
                />
                
              <TextInput
                multiline={true}
                label="Description"
                style={styles.textInput}
                onChangeText={(inputvalue) => handleForm("description", inputvalue)}
                mode="flat"
                value={formData.description ? formData.description : ""} />
  
              <Pressable onPress={pickDocument}>
                <Text style={styles.selectButton}>
                  <Text style={{fontFamily: 'PTSans-Regular'}}>
                  <MaterialCommunityIcons name="paperclip" size={20} color="black" />
                  {formData.document ? `${formData.document.name}` : "Upload File"}
                  {/* formData.document ? `${formData.document.name}` :  */}
                  </Text>
                
                </Text>
              </Pressable>
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
  selectButton: {
    backgroundColor: Colors.bgDarkYellow,
    paddingVertical: 10,
    width: deviceWidth * .75,
    borderRadius: 6,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  SubmitText:{
    color: 'white',
    fontSize: 16,
    fontFamily: 'PTSans-Bold',
  },
  errorMessage:{
    alignSelf:"center",
    color: Colors.bgError,
    fontFamily: 'PTSans-Bold',
  }
});


