import { Text, StyleSheet, View } from "react-native"


export default function Title({children}) {
  return (
    <View style={styles.topsheet}>
        <Text style={styles.signInTitle}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    topsheet: {
		flex:1,
		alignItems:"flex-start"
	},
    signInTitle:{
		marginLeft: 20,
		marginTop:100,
		fontWeight: "500",
		fontSize: 60
	},
})
