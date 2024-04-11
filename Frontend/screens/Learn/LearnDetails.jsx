import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { useContext, useLayoutEffect, useState } from "react";
import { View, Text, Image, StyleSheet, Pressable, Alert } from "react-native";
import Colors from "../../constants/Colors";
import { axiosDelete, axiosPut } from "../../utils/axios";
import ModalContent from "../../components/LearnComponent/ModalContent";
import * as FileSystem from 'expo-file-system';
import { AuthContext } from "../../context/AuthProvider";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const deleteURL = "/api/post/delete"

export default function LearnDetails({route}) {
    const {token} = useContext(AuthContext)
    const [modalVisible, setModalVisible] = useState(false);
    const { item } = route.params;
    const navigation = useNavigation()

    console.log(item)
    useLayoutEffect(() => {
        navigation.setOptions({
            headerTitle: item.title,
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
        const deleteddata = await axiosDelete(`${deleteURL}${id}`,token)
        console.log(`${deleteData}, deleted`)
        navigation.goBack()
        } catch (error) {
            console.log(error)
        }
    }
    console.log(item)
    return (

        <View style={styles.mainContainer}>
            <ModalContent
                
                documentName={item.documentName}
                title={item.title}
                description={item.description}
                id={item._id}
                visibility={modalVisible}
                onPress={() => setModalVisible(false)}>Edit Document</ModalContent>
            <View style={styles.textcontainer}>
               
                <Text style={styles.text}>
                    {item.content}
                </Text>
                <Image />
            </View>
            <View style={styles.buttonContainer} >
                <Pressable style={styles.button} onPress={()=>setModalVisible(true)}>
                <MaterialCommunityIcons name="square-edit-outline" size={25} color={Colors.bgYellow} />
                </Pressable>
                <Pressable style={styles.button} onPress={createTwoButtonAlert}>
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