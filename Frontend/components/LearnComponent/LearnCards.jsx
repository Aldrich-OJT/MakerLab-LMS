import {View, Text, StyleSheet, Image, Pressable} from "react-native"
import Colors from "../../constants/Colors"

export default function LearnCards({title, description, onPress}){


  const press = ()=>{
    console.log("working")
  }
    return(
      <Pressable style={styles.container} onPress={onPress}>
        <Image source={require('../../assets/video.png')} style={styles.video}></Image>
        <View style={styles.textcontainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>
      </Pressable>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgYellow,
    borderTopWidth:5,
    borderBottomWidth:5,
    borderColor: Colors.bgDarkViolet,
    borderRadius: 10,
    alignItems: 'flex-start',
    overflow:"hidden",
    height: "auto",
    padding: 20,
    marginBottom:5
  },
  video: {
    width: '50%',
    height: '50%',
    resizeMode:"stretch",
  },
  textcontainer: {
    flex: 1,
    flexDirection: 'column',
    gap: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 15,
  }
})
