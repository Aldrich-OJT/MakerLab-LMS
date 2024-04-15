import { StyleSheet, View, Image } from "react-native"

export default function Title() {
  return (
    <View style={styles.topsheet}>
		<Image source={require('../../assets/top-register.png')} style={styles.bgimage}></Image>
    </View>
  )
}

const styles = StyleSheet.create({
    topsheet: {
		flex:1,
		alignItems:"center",
		justifyContent: 'center',
	},
	bgimage:{
		width: '100%', 
		height: '100%',
		resizeMode: "cover"
	},
})
