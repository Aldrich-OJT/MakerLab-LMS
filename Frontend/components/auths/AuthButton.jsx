import { Text, Pressable, StyleSheet, View } from "react-native"



export default function AuthButton({children , submitForm}) {
  return (
    <View>
        <Pressable style={styles.signupButton} onPress={submitForm}>
			<Text style={styles.signupText}>{children}</Text>
		</Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
    signupText: {
        backgroundColor: 'black',
        borderRadius: 6,
        paddingVertical: 15,
        marginTop: 10,
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        overflow:"hidden",
    },
    signupButton: {
        width: 170,
        marginBottom: 15
    },
})
