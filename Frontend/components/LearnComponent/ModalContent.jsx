import { TextInput } from "react-native-paper"
import { View, Pressable, Text, StyleSheet, Modal, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard } from "react-native"
import { useContext, useState } from "react"
import Colors from "../../constants/Colors";
import * as DocumentPicker from 'expo-document-picker';
import { axiosPost } from "../../utils/axios";
import axios from "axios";
import { AuthContext } from "../../context/AuthProvider";
//import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from '@react-navigation/native';
import { AntDesign } from '@expo/vector-icons';

const URL = "/api/video/upload"
const contentType = "multipart/form-data"

export default function ModalContent({title, description, visibility, onPress,children,id }) {
  const [formData, setFormData] = useState({
    title: null,
    description: null,
    document:null
  })
  const authContext = useContext(AuthContext)
  const [selectedFile, setSelectedFile] = useState(null);
  const navigation = useNavigation()


  const handleForm = (inputName, inputValue) => {
    setFormData(prevData => ({
      ...prevData,
      [inputName]: inputValue
    }))

  }


  const pickDocument = async () => {
    const mimeTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.presentationml.presentation"
    ]
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: mimeTypes
      });
      if (result) {
        setSelectedFile(result.assets[0])
        handleForm("document", result.assets[0])
  
      }
    } catch (err) {
      console.log("error getting document", err);
    }

    
  }
  const submitForm = async()=>{
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('document', {
      uri: selectedFile.uri,
      type: selectedFile.mimeType, // You can adjust the MIME type if needed
      name: selectedFile.name // You can adjust the filename if needed
    });

    // console.log(formDataToSend)
    if(children.split(" ")[0] === "Upload"){
      try {
      
        const response = await axios.post("http://192.168.1.208:5000/api/video/upload",formDataToSend,{
          headers: {
            "Content-Type":"multipart/form-data",
            Authorization: `Bearer ${authContext.token}`
            
          }
        })
        if(response){
          // console.log("poost suscuhscush",response)
          navigation.navigate("TabGroup")
        }
      } catch (error) {
        console.log(error.response.data)
      } 
    }else{
      try {
      
        const response = await axios.put(`http://192.168.1.208:5000/api/video/update/${id}`,formDataToSend,{
          headers: {
            "Content-Type":"multipart/form-data",
            Authorization: `Bearer ${authContext.token}`
            
          }
          
        })
        console.log(response.data)
        // if(response){
        //   console.log("poost suscuhscush",response)
        // }
      } catch (error) {
        console.log(error.response.data)
      } 
    }
  }
  // console.log(selectedFile)
  // console.log(formData)
  console.log()
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
                value={formData.title ? formData.title : title}
                />
                
              <TextInput
                multiline={true}
                label="Description"
                style={styles.textInput}
                onChangeText={(inputvalue) => handleForm("description", inputvalue)}
                mode="flat"
                value={formData.description ? formData.description : description} />
                
              <View>
                <Text>{selectedFile ? `${selectedFile.name}` : "Upload your file"}</Text>
              </View>
              <Pressable style={[styles.button]} onPress={pickDocument}>
                <Text style={styles.selectButton}><AntDesign name="addfile" size={16} color="black" /> Select File</Text>
              </Pressable>
              <View style={styles.buttonContainer}>
                <Pressable style={[styles.button,{backgroundColor: "black"}]} onPress={submitForm}>
                  <Text style={styles.buttonText}>Submit</Text>
                </Pressable>
                <Pressable style={[styles.button,{backgroundColor: Colors.bgRedInvalid}]} onPress={onPress}>
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
    backgroundColor: "rgba(0,0,0,0.3)"
  },
  texttitle: {
    fontSize: 20,
    fontWeight: 'bold',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    marginBottom: 5,
    width: '100%',
    textAlign: 'center',
    paddingBottom: 12,
  },
  inputcontainer: {
    height: '30%',
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.bgYellow,
    height: "fit-content",
    gap: 10,
  },
  textInput: {
    width: "100%",
  },
  buttonContainer: {
    flexDirection:"row",
    gap: 30,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    width: 100,
    borderRadius: 6,
  },
  selectButton: {
    backgroundColor: "#FFA800",
    height: 35,
    width: 150,
    borderRadius: 6,
    textAlign: 'center',
    textAlignVertical: 'center',
  },
  buttonText: {
    color: "white"
  }
})


