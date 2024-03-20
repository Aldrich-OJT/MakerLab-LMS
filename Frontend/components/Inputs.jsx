import { TextInput } from "react-native-paper"
import { Dimensions, StyleSheet } from "react-native"


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
    height: width < 380 ? 40: 50 ,
    backgroundColor: '#EDEDED',
    margin:  width < 380 ? 2: 7,
},
})
