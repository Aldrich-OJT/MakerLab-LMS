import { TextInput } from "react-native-paper"
import { StyleSheet } from "react-native"

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
    backgroundColor: '#EDEDED',
    margin: 7,

},
})
