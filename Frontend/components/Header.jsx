import { StyleSheet, View, Image, Dimensions } from "react-native";
import Colors from "../constants/Colors";
import { useContext } from "react";
import { useTheme } from "react-native-paper";

const dimensions = Dimensions.get('window');   
const deviceWidth = dimensions.width;

export default function Header({children}) {
  const theme = useTheme()

  return (
    <View style={[styles.container, {backgroundColor: theme.colors.grayOffwhite}]}>
        <Image source={require('.././assets/top-home.png')} style={styles.bgimage}></Image>
        {children}
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      flex:1
      //position: 'relative',
    },
    bgimage: {
        height: "100%",
        width: "100%",
        //resizeMode: "cover",
      },
})
