import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react";
import { View, Text, Image, StyleSheet, Pressable, Alert, Dimensions } from "react-native";
import Colors from "../../constants/Colors";
import { axiosDelete, axiosGet, axiosPut } from "../../utils/axios";
import ModalContent from "../../components/LearnComponent/ModalContent";
import { AuthContext } from "../../context/AuthProvider";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ActivityIndicator } from 'react-native-paper';
import axios from "axios";
import * as FileSystem from 'expo-file-system';
import { shareAsync } from 'expo';
import { Platform } from 'react-native';
import * as Linking from 'expo-linking';
import { Video, ResizeMode } from 'expo-av';



const deleteURL = "/api/post/delete/"
const postURL = "/api/post/"
const getFileURL = "/api/post/download/"
const deviceWidth = Dimensions.get("window")
//let fileUri

export default function LearnDetails({ route, navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const { _id } = route.params.item;
    const [postData, setPostData] = useState({})
    const [refresh, setRefresh] = useState(true)
    const { userData } = useContext(AuthContext);


    useEffect(() => {
        console.log("effect")
        

        const fetchData = async () => {
            setPostData({})
            try {
                const data = await axiosGet(`${postURL}${_id}`, postData.token)
                console.log(data)
                // const response = await axios.get(`http://192.168.100.93:5000${getFileURL}${_id}`, {
                //     responseType: "blob"
                // })

                // const blob = new Blob([response.data], { type: "application/pdf" })
                // const URLObject = URL.createObjectURL(blob)
                setPostData(data)
                setRefresh(false)
            } catch (error) {
                console.log(error)
            }
        }

        if (refresh) {
            fetchData()
        }
    }, [refresh])

    useLayoutEffect(() => {
        if (postData.title) {
            const truncatedTitle = postData.title.length > 30 ? postData.title.slice(0, 30) + "..." : postData.title;
            navigation.setOptions({
                headerTitle: truncatedTitle,
            });
        }
    }, [postData])

    const createTwoButtonAlert = () =>
        Alert.alert('Warning', 'Do you really really really want to delete this file?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'YES', onPress: deleteData },
        ]);

    const deleteData = async () => {
        try {
            console.log("trying to delete something")
            const deleteddata = await axiosDelete(`${deleteURL}${_id}`, postData.token)
            console.log(`${deleteddata._id} deleted`)
            navigation.goBack()
        } catch (error) {
            console.log(error)
        }
    }
    //console.log(postData)


    async function saveFile(uri, filename, mimetype) {
        if (Platform.OS === "android") {

            const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

            if (permissions.granted) {
                const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });


                await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
                    .then(async (uri) => {
                        await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });
                        console.log("this is the uriiii", uri)
                        // const supported = await Linking.canOpenURL(data);
                        // if (!supported) {
                        //     console.log("file not supported")
                        //     return
                        // }
                        //await Linking.openURL(uri);

                    })
                    .catch(e => console.log(e));
            } else {
                shareAsync(uri);
            }
        } else {
            shareAsync(uri);
        }
    }



    async function download(filename) {
        console.log("clicked")
        const fileUri = `${FileSystem.documentDirectory}${filename}`
        try {
            const result = await FileSystem.downloadAsync(
                `http://192.168.100.93:5000/api/documents/${filename}`,
                fileUri
            );
            console.log(result.uri)
            saveFile(result.uri, filename, result.headers["Content-Type"]);
        } catch (error) {
            console.log(error)
        }
    }

    const openpdf = async () => {
        try {
            await Linking.openURL(`http://192.168.100.93:5000/api/documents/${postData.documentName}`);
        } catch (error) {
            console.error('Error opening PDF:', error);
        }
    }


    return (

        <View style={styles.mainContainer}>
            {(postData && Object.keys(postData).length > 0) ? (
                <ModalContent
                    setRefresh={() => setRefresh(true)}
                    documentName={postData.documentName}
                    title={postData.title}
                    description={postData.description}
                    id={postData._id}
                    visibility={modalVisible}
                    onPress={() => setModalVisible(false)}
                >
                    Edit Document
                </ModalContent>
            ) : (<ActivityIndicator
                animating={true}
                style={{ top: 20 }}
                size={60}
            />)
            }
            <View>
                {postData.documentType == "application/pdf" ? (<Pressable style={{ backgroundColor: "green" }} onPress={openpdf}>
                    <Text>CLICK THIS TO GET THE FUCKING PDF</Text>
                </Pressable>) : postData.documentType == "video/mp4" && (
                    <Video
                        source={{
                            uri: `http://192.168.100.93:5000/api/videos/${postData.documentName}`,
                        }}
                        resizeMode="contain"
                        style={styles.video}
                        useNativeControls>
                    </Video>)
                }
            </View>
            <View style={styles.textcontainer}>
                <Text style={styles.text}>
                    {postData.description}
                </Text>
                <Image />
            </View>
            <View style={styles.buttonContainer} >
                {userData.role === 'admin' && (
                    <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
                        <MaterialCommunityIcons name="square-edit-outline" size={25} color={Colors.bgYellow} />
                    </Pressable>
                )}
                {userData.role === 'admin' && (
                    <Pressable style={styles.button} onPress={createTwoButtonAlert}>
                        <MaterialCommunityIcons name="delete" size={25} color={Colors.bgYellow} />
                    </Pressable>
                )}
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
    video: {
        height: 250,
        width: deviceWidth

    }
})