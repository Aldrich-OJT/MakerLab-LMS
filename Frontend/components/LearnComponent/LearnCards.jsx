import {View, Text, StyleSheet, Image, Pressable} from "react-native"
import Colors from "../../constants/Colors"

export default function LearnCards({title, description, onPress}){

    return(
      <Pressable style={styles.container} onPress={onPress}>
        {/* <Image source={require('../../assets/video.png')} style={styles.video}></Image> */}
        <View style={styles.textcontainer}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description} numberOfLines={1}>{description}</Text>
        </View>
      </Pressable>
    )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.bgYellow,
    // borderTopWidth:5,
    // borderBottomWidth:5,
<<<<<<< HEAD
    // borderWidth: 4,
    // borderColor: Colors.bgDarkViolet,
=======
>>>>>>> 9a73fe83ec4818520f87b4ff351f13067ced32d9
    borderRadius: 10,
    //flexDirection:"row",
    // alignItems: 'center',
    // justifyContent:"center",
    //height: "fit-content",
    paddingHorizontal: 20,
    paddingVertical:10,
    marginBottom:10,
  },
  // video: {
  //   width: '50%',
  //   height: '50%',
  //   resizeMode:"contain",
  //   alignSelf:"center"
  // },
  textcontainer: {
    flexDirection: 'column',
    minWidth: "95%",
    maxWidth: "95%"
    //gap: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.bgViolet
  },
  description: {
    fontSize: 15,
  }
})
