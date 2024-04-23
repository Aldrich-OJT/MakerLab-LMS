import { StyleSheet, View, Image, Dimensions } from "react-native";
import Colors from "../constants/Colors";
import { DarkModeContext } from "../context/AuthProvider";
import { useContext } from "react";

const dimensions = Dimensions.get('window');   
const deviceWidth = dimensions.width;

export default function Header({children}) {
  const {isDarkMode} = useContext(DarkModeContext);

  return (
    <View style={[styles.container, {backgroundColor: isDarkMode ? Colors.bgGray : Colors.bgOffWhite}]}>
        <Image source={require('.././assets/top-home.png')} style={styles.bgimage}></Image>
        {children}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      position: 'relative',
    },
    bgimage: {
        height: deviceWidth * 0.27,
        width: deviceWidth * 1,
        resizeMode: 'stretch',
      },
})
