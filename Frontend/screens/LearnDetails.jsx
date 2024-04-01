import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect } from "react";
import { View, Text, Image, StyleSheet } from "react-native";


export default function LearnDetails() {
    const router = useRoute()
    const navigation = useNavigation()

    console.log(router.params)
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle: router.params.item.title,
            headerStyle: {
                backgroundColor: "black",
            },
            headerTitleStyle: {
                fontWeight: 'bold', // Change the font weight of the header title
                color: 'white', // Change the color of the header title
            },
            headerTintColor: 'white', // Change the color of the back button
            headerTitleAlign: 'center', // Align the header title in the center
        })
    }, [])
    return (
        <View style={styles.textcontainer}>
            <Text style={styles.text}>
               {router.params.item.description}
            </Text>
            <Image/>
        </View>
    )
}

const styles = StyleSheet.create({
    textcontainer: {
        justifyContent: "center",
        padding: 20
    },
    text: {
        fontSize: 17,
        textAlign: "justify"
    },
})