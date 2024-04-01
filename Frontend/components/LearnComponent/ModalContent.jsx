import { TextInput } from "react-native-paper"
import { View, Pressable, Text, StyleSheet, Modal } from "react-native"
import { useState } from "react"

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
  console.log(addData)
  return (

    <Modal
      style={styles.mainContainer}
      animationType="slide"
      visible={visibility}
      onRequestClose={onPress}
    >
      <View style={styles.mainContainer} >
        <TextInput label="Title" style onChangeText={(inputvalue) => handleForm("title", inputvalue)} mode="flat" />
        <TextInput label="Description" style onChangeText={(inputvalue) =>handleForm("description", inputvalue)} mode="flat" />
        <Pressable onPress={onPress}>
          <Text>Hide Modal</Text>
        </Pressable>
      </View>
    </Modal>

  )
}

const styles = StyleSheet.create({
  mainContainer: {
    width: 300,
    height: 200,
    padding:20,
    backgroundColor: "red",
    alignSelf: "center", 
  },
  textStyle: {

  }
})


