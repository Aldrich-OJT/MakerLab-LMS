import { TextInput } from "react-native-paper"
import { View, Pressable, Text, StyleSheet, Modal, KeyboardAvoidingView } from "react-native"
import { useState } from "react"
import Colors from "../../constants/Colors";
import { axiosPost } from "../../utils/axios";

const URL = "/api/video/upload"

export default function ModalContent({ visibility, onPress }) {
  const [addData, setAddData] = useState({
    title: "",
    description: ""
  })

  const handleForm = (inputName, inputValue)=>{
    setAddData( prevData => ({
      ...prevData,
      [inputName]: inputValue
    }))

  }
 
  
  return (
    <KeyboardAvoidingView behavior="padding">
    <Modal
      animationType="slide"
      visible={visibility}
      onRequestClose={onPress}
      transparent={true}

    >
      <View style={styles.mainContainer} >
        <View style={styles.inputcontainer}>
          <Text style={styles.texttitle}>Upload Lesson</Text>
          <TextInput label="Title" style onChangeText={(inputvalue) => handleForm("title", inputvalue)} mode="flat" />
          <TextInput multiline={true} label="Description" style onChangeText={(inputvalue) =>handleForm("description", inputvalue)} mode="flat" />
          <Pressable>
            <Text>Select</Text>
          </Pressable>
          <Pressable onPress={onPress}>
            <Text>Hide Modal</Text>
          </Pressable>
        </View>
      </View>
    </Modal></KeyboardAvoidingView>

  )
}

const styles = StyleSheet.create({
  mainContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "center",
    alignSelf: "center", 
    paddingHorizontal: 20,
    backgroundColor: "rgba(0,0,0,0.3)"
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
    backgroundColor: 'blue',
    justifyContent: "center",
    alignSelf: "center", 
    padding: 15,
    borderRadius: 10,
    backgroundColor: Colors.bgYellow,
    borderColor: "black",
    borderWidth: 2,
    height: "fit-content",
    gap: 10,
  },
  textStyle: {
    
  }
})


