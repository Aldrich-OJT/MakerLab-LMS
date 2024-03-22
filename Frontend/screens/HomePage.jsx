import { View, Text,  Button, Pressable } from "react-native";


export default function HomePage() {
  return (
    <View>
        <Text> This is my home pge</Text>
        <Button
        onPress={()=>{
          console.log("hello")
        }}
        title = "button"
        />
        <Pressable>
          <Text>Button</Text>
        </Pressable>
    </View>
  )
}
