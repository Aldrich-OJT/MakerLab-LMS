import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useContext, useLayoutEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Pressable, Alert } from "react-native";
import Colors from "../constants/Colors";
import { axiosDelete, axiosPut } from "../utils/axios";
import ModalContent from "../components/LearnComponent/ModalContent";
import * as FileSystem from 'expo-file-system';
import { AuthContext } from "../context/AuthProvider";
const deleteURL = "/api/post/delete/"

export default function LearnDetails() {
    const {token} = useContext(AuthContext)
    const [modalVisible, setModalVisible] = useState(false);
    const router = useRoute()
    const { item } = router.params;
    const navigation = useNavigation()

    //console.log(router.params)
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: router.params.item.title,
            headerStyle: {
                backgroundColor: "black",
            },
            headerTitleStyle: {
                fontWeight: 'bold', 
                color: 'white', 
            },
            headerTintColor: 'white', 
            headerTitleAlign: 'center', 
        })
    }, [])

    const createTwoButtonAlert = () =>
    Alert.alert('Warning', 'Do you really want to delete this file?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'YES', onPress: () => deleteData},
    ]);

    const deleteData = async() => {
        try {
        console.log("trying to delete something")
        const id = item._id
        const data = await axiosDelete(`${deleteURL}${id}`,token)
        navigation.goBack()
        } catch (error) {
            console.log(error)
        }
    }
    console.log(item)
    return (

        <View style={styles.mainContainer}>
            <ModalContent
                style={{ backgroundColor: "green" }}
                documentName={item.documentName}
                title={item.title}
                description={item.description}
                id={item._id}
                visibility={modalVisible}
                onPress={() => setModalVisible(false)}>Edit Document</ModalContent>
            <View style={styles.textcontainer}>
               
                <Text style={styles.text}>
                    {item.description}
                </Text>
                <Image />
            </View>
            <View style={styles.buttonContainer} >
                <Pressable style={styles.add} onPress={()=>setModalVisible(true)}>
                    <Text>edit</Text>
                </Pressable>
                <Pressable style={styles.delete}  onPress={createTwoButtonAlert}>
                    <Text>delete</Text>
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
        right: 10
    },
    add: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: Colors.bgDarkYellow
    },
    delete: {
        width: 50,
        height: 50,
        borderRadius: 10,
        backgroundColor: Colors.bgError
    }
})