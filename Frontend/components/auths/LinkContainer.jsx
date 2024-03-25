import { Text, Pressable, StyleSheet, View } from "react-native"
import Colors from "../../constants/Colors"


export default function LinkContainer({children,Link, navigation,to}) {
  return (
    <View style={styles.signUpLinkContainer}>
        <Text style={styles.haveAccountText}>{children}</Text>
        <Pressable onPress={() => navigation.navigate(to)}>
            <Text style={styles.signupLink}>{Link}</Text>
        </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    signupLink:{
        marginLeft:5,
		color: Colors.bgViolet
	},
	haveAccountText:{
		color: Colors.bgGray
	},
	signUpLinkContainer:{
		flexDirection:"row"
	}
})
