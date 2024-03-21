import { TextInput } from "react-native-paper"
import { Dimensions, StyleSheet } from "react-native"
import Colors from "../constants/Colors"


const width = Dimensions.get("window").width

export default function Inputs({label,value, onChangeText}) {

  return (
    <TextInput
    style={styles.textinput}
    label={label}
    value={value}
    mode='outlined'
    onChangeText={onChangeText}

    />  
  )
}

const styles = StyleSheet.create({
  textinput: {
    width: '80%',
    height: width < 380 ? 40: 35 ,
    backgroundColor: Colors.bgOffWhite,
    margin: 2,
},
})
