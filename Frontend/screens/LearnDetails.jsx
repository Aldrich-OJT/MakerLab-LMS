import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useLayoutEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Pressable } from "react-native";
import Colors from "../constants/Colors";
import { axiosPut } from "../utils/axios";
import ModalContent from "../components/LearnComponent/ModalContent";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const updateURL = "/update"
const deleteURL = "/delete"

export default function LearnDetails() {
    const [modalVisible, setModalVisible] = useState(false);
    const router = useRoute()
    const navigation = useNavigation()

    //console.log(router.params)
    useLayoutEffect(() => {
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

    const editData = () => {
        const id = router.params.item._id
        axiosPut(`${updateURL}${id}`,)
    }
    const deleteData = () => {

    }
    //console.log(router.params.item)
    return (

        <View style={styles.mainContainer}>
            <ModalContent
                style={{ backgroundColor: "green" }}
                title={router.params.item.title}
                description={router.params.item.description}
                id={router.params.item._id}
                visibility={modalVisible}
                onPress={() => setModalVisible(false)}>Edit Document</ModalContent>
            <View style={styles.textcontainer}>
                <Text style={styles.text}>
                    {router.params.item.description}
                </Text>
                <Image />
            </View>
            <View style={styles.buttonContainer} >
                <Pressable style={styles.button} onPress={()=>setModalVisible(true)}>
                <MaterialCommunityIcons name="square-edit-outline" size={25} color={Colors.bgYellow} />
                </Pressable>
                <Pressable style={styles.button}>
                    <MaterialCommunityIcons name="delete" size={25} color={Colors.bgYellow} />
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    textcontainer: {
        justifyContent: "center",
        padding: 20
    },
    text: {
        fontSize: 17,
        textAlign: "justify"
    },
    buttonContainer: {
        position: "absolute",
        bottom: 10,
        right: 10,
        gap: 10,
    },
    button: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    },
})