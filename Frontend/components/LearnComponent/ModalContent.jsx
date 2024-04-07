import { TextInput } from "react-native-paper"
import { View, Pressable, Text, StyleSheet, Modal, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native"
import { useContext, useState } from "react"
import Colors from "../../constants/Colors";
import * as DocumentPicker from 'expo-document-picker';
import { axiosPost, axiosPut } from "../../utils/axios";

import { AuthContext } from "../../context/AuthProvider";
//import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';

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
            <View style={styles.inputcontainer}>
              <Text style={styles.texttitle}>{children}</Text>

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
                
              <View>
                <Text>{formData.document ? `${formData.document.name}` : "Upload your file"}</Text>
                {errorMessage && <Text style={styles.errorMessage}>{errorMessage}</Text>}
              </View>
              <Pressable style={[styles.button,{backgroundColor: Colors.bgViolet}]} onPress={pickDocument}>
                <Text style={styles.buttonText}>Select File</Text>
              </Pressable>
              <View style={styles.buttonContainer}>
                <Pressable style={[styles.button,{backgroundColor: "blue"}]} onPress={submitForm}>
                  <Text style={styles.buttonText}>Submit</Text>
                </Pressable>
                <Pressable style={[styles.button,{backgroundColor: "red"}]} onPress={cancelForm}>
                  <Text style={styles.buttonText}>Cancel</Text>
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
    paddingHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.4)"
  },
  texttitle: {
    alignSelf: "center",
    fontSize: 20,
    fontWeight: "bold",
    margin: 10,
  },
  inputcontainer: {
    height: '30%',
    width: "100%",
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
  textInput: {
    width: "100%"
  },
  buttonContainer: {
    flexDirection:"row",
    gap: 5
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 35,
    width: 100,
    borderRadius: 10,
  },
  buttonText: {
    color: "white"
  },
  errorMessage:{
    alignSelf:"center",
    color: Colors.bgError
  }
});


