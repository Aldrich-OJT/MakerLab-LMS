import { Text, Pressable, StyleSheet, View } from "react-native"
import Colors from "../../constants/Colors"


export default function LinkContainer({children,Link, navigation}) {
  return (
    <View style={styles.signUpLinkContainer}>
        <Text style={styles.haveAccountText}>{children}</Text>
        <Pressable onPress={() => navigation.replace('Login')}>
            <Text style={styles.signupLink}>{Link}</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    signupLink:{
		color: Colors.bgViolet
	},
	haveAccountText:{
		color: Colors.bgGray
	},
	signUpLinkContainer:{
		flexDirection:"row"
	}
})
