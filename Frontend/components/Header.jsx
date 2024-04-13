import { StyleSheet, View, Image, Dimensions } from "react-native"

const dimensions = Dimensions.get('window');   
const deviceWidth = dimensions.width;

export default function Header({children}) {
  return (
    <View style={styles.container}>
      <View style={{backgroundColor: 'black', height: deviceWidth * 0.04}}></View>
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
        height: deviceWidth * 0.27,
        width: deviceWidth * 1,
        resizeMode: 'stretch'
      },
      logo: {
        position: 'absolute',
        left: 10,
        top: deviceWidth * 0.14,
        height: 30,
        width: 100,
      },
})
