import { StyleSheet, View, Image, Dimensions } from "react-native"
import Colors from "../constants/Colors";

const dimensions = Dimensions.get('window');   
const deviceWidth = dimensions.width;

export default function Header({children}) {
  return (
    <View style={styles.container}>
        <Image source={require('.././assets/top-home.png')} style={styles.bgimage}></Image>
        {children}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      position: 'relative',
      backgroundColor: Colors.bgOffWhite
    },
    bgimage: {
        height: deviceWidth * 0.27,
        width: deviceWidth * 1,
        resizeMode: 'stretch',
      },
})
