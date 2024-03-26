import { StyleSheet, View, Image, Dimensions } from "react-native"

const dimensions = Dimensions.get('window');   
const deviceWidth = dimensions.width;
const deviceHeight = dimensions.height;

export default function Header({children}) {
  return (
    <View style={styles.container}>
        <Image source={require('.././assets/top-home.png')} style={styles.bgimage}></Image>
        {children}
        <Image source={require('.././assets/logo-light.png')} style={styles.logo}></Image>
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
      position: 'relative'
    },
    bgimage: {
        height: 100,
        width: deviceWidth * 1,
      },
      logo: {
        position: 'absolute',
        right: 10,
        top: 30,
        height: 30,
        width: 100,
      },
})
