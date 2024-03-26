import { StyleSheet, View, Image, Dimensions } from "react-native"

const dimensions = Dimensions.get('window');   
const maxWidth = dimensions.width;
const maxHeight = dimensions.height;

export default function Header() {
  return (
    <View>
        <Image source={require('../../assets/top-home.png')} style={styles.bgimage}></Image>
        <Image source={require('../../assets/logo-light.png')} style={styles.logo}></Image>
    </View>
  )
}

const styles = StyleSheet.create({
    bgimage: {
        height: maxHeight * .25,
        width: maxWidth * 1,
        position: 'relative'
      },
      logo: {
        position: 'absolute',
        right: 10,
        top: 20,
        height: 30,
        width: 100,
      },
})
