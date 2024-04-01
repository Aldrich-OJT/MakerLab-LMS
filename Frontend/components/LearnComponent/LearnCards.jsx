import {View, Text, StyleSheet, Image, Pressable} from "react-native"
import Colors from "../../constants/Colors"

export default function LearnCards({title, description, onPress}){

    return(
      <Pressable style={styles.container} onPress={onPress}>
        {/* <Image source={require('../../assets/video.png')} style={styles.video}></Image> */}
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
    // borderTopWidth:5,
    // borderBottomWidth:5,
    borderWidth: 4,
    borderColor: Colors.bgDarkViolet,
    borderRadius: 10,
    //flexDirection:"row",
    // alignItems: 'center',
    // justifyContent:"center",
    //height: "fit-content",
    paddingHorizontal: 20,
    paddingVertical:10,
    marginBottom:5,
  },
  // video: {
  //   width: '50%',
  //   height: '50%',
  //   resizeMode:"contain",
  //   alignSelf:"center"
  // },
  textcontainer: {
    flexDirection: 'column',
    //gap: 10
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 15,
  }
})
