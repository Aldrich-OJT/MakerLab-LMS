import { useContext, useEffect, useLayoutEffect, useState } from "react";
import { View, Text, StyleSheet, Pressable, Alert, ScrollView } from "react-native";
import Colors from "../../constants/Colors";
import { axiosDelete, axiosGet, } from "../../utils/axios";
import ModalContent from "../../components/LearnComponent/ModalContent";
import { AuthContext } from "../../context/AuthProvider";
import { ActivityIndicator, Portal } from 'react-native-paper';
// import * as FileSystem from 'expo-file-system';
// import { shareAsync } from 'expo';
import * as Linking from 'expo-linking';
import { Video } from 'expo-av';
import { Menu } from 'react-native-paper';

const deleteURL = "/api/post/delete/"
const postURL = "/api/post/id/"
// const getFileURL = "/api/post/download/"
// const deviceWidth = Dimensions.get("window")

export default function LearnDetails({ route, navigation }) {
    const [modalVisible, setModalVisible] = useState(false);
    const { _id } = route.params.item;
    const [postData, setPostData] = useState({})
    const [refresh, setRefresh] = useState(true)
    const { userData } = useContext(AuthContext);
    const [menuVisible, setMenuVisible] = useState(false);



    useEffect(() => {


        const fetchData = async () => {
            setPostData({})
            try {
                const data = await axiosGet(`${postURL}${_id}`, postData.token)
                console.log(data)

                //fetch the file itself
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
            navigation.setOptions({
                headerTintColor: Colors.bgYellow,
                headerTitle: ''
            });
        }
    }, [postData])

    const createTwoButtonAlert = () =>
        Alert.alert('Delete Post', 'This will delete all the files and questions attached with this section. do you want to continue?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'YES', onPress: deleteData },
        ]);

    const deleteData = async () => {
        try {
            const deleteddata = await axiosDelete(`${deleteURL}${_id}`, postData.token)
            console.log(`${deleteddata._id} deleted`)
            navigation.goBack()
        } catch (error) {
            console.log(error)
        }
    }
    //console.log(postData)


    // async function saveFile(uri, filename, mimetype) {
    //     if (Platform.OS === "android") {

    //         const permissions = await FileSystem.StorageAccessFramework.requestDirectoryPermissionsAsync();

    //         if (permissions.granted) {
    //             const base64 = await FileSystem.readAsStringAsync(uri, { encoding: FileSystem.EncodingType.Base64 });
    //             await FileSystem.StorageAccessFramework.createFileAsync(permissions.directoryUri, filename, mimetype)
    //                 .then(async (uri) => {
    //                     await FileSystem.writeAsStringAsync(uri, base64, { encoding: FileSystem.EncodingType.Base64 });


    //                 })
    //                 .catch(e => console.log(e));
    //         } else {
    //             shareAsync(uri);
    //         }
    //     } else {
    //         shareAsync(uri);
    //     }
    // }


// download file code
    // async function download(filename) {
    //     console.log("clicked")
    //     const fileUri = `${FileSystem.documentDirectory}${filename}`
    //     try {
    //         const result = await FileSystem.downloadAsync(
    //             `http://192.168.100.93:5000/api/documents/${filename}`,
    //             fileUri
    //         );
    //         console.log(result.uri)
    //         saveFile(result.uri, filename, result.headers["Content-Type"]);
    //     } catch (error) {
    //         console.log(error)
    //     }
    // }

    const openpdf = async () => {
        try {
            await Linking.openURL(`http://192.168.100.93:5000/api/documents/${postData.documentName}`);
        } catch (error) {
            console.error('Error opening PDF:', error);
        }
    }


    return (
        <Portal.Host>
            <Portal>
                <View style={styles.mainContainer}>
                    {(postData && Object.keys(postData).length > 0) ? (
                        <ModalContent
                            setRefresh={() => setRefresh(true)}
                            documentName={postData?.documentName}
                            title={postData.title}
                            description={postData.description}
                            id={postData._id}
                            visibility={modalVisible}
                            onPress={() => setModalVisible(false)}
                        >
                            Edit Document
                        </ModalContent>
                    ) : ""}

                    <View style={styles.lessonContainer}>
                        <View style={styles.purpleTint}>
                            <View style={styles.titleContainer}>

                                <Text style={styles.title}>{postData.title} </Text>
                                {userData.role === 'admin' && (
                                    <Menu
                                        style={{position:"absolute", top:40}}
                                        visible={menuVisible}
                                        onDismiss={() => setMenuVisible(false)}
                                        anchor={
                                            <Pressable style={{ width: 50, height: 30 }} onPress={() => (setMenuVisible(true))}>
                                                <Text style={{ fontFamily: 'icon', fontSize: 22, color: Colors.bgPurple, alignSelf: 'flex-end' }}> </Text>
                                            </Pressable>
                                        }>

                                        <Menu.Item onPress={() => setModalVisible(true)} title={<Text style={{ fontFamily: 'icon', fontSize: 16, color: Colors.bgDarkGray, textAlign: 'left' }}> Edit</Text>} />
                                        <Menu.Item onPress={createTwoButtonAlert} title={<Text style={{ fontFamily: 'icon', fontSize: 16, color: Colors.bgDarkGray, textAlign: 'left' }}> Delete</Text>} />
                                    </Menu>

                                )}

                            </View>

                        </View>

                        <ScrollView showsVerticalScrollIndicator={false}>


                            <View style={styles.attachmentContainer}>

                                {postData.documentType == "application/pdf" ? (<Pressable style={{ flexDirection: "row" }} onPress={openpdf}>



                                    <Text>{postData.documentName}</Text><Text style={{ fontFamily: 'icon', fontSize: 18 }}></Text>
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
                                <Text style={styles.description}>
                                    {postData.description}
                                </Text>
                            </View>
                        </ScrollView>
                    </View>
                </View>
            </Portal>
        </Portal.Host >
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        flex: 1
    },
    lessonContainer: {
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 10,
        marginHorizontal: 20,
        marginTop: 20,
        maxWidth: '90%',
        maxHeight: '94%',
        minWidth: '90%',
        minHeight: '94%',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    titleContainer: {
        flexDirection: 'row',
        marginHorizontal: 20,
        marginVertical: 15,
        justifyContent: 'space-between'
    },
    title: {
        color: Colors.bgPurple,
        fontSize: 20,
        fontFamily: 'PTSans-Bold',
    },
    purpleTint: {
        backgroundColor: 'rgba(238, 227, 255, 0.90)',
    },
    textcontainer: {
        justifyContent: "center",
        padding: 20
    },
    description: {
        fontSize: 17,
        textAlign: "justify",
        fontFamily: 'PTSans-Regular'
    },
    attachmentContainer: {
        backgroundColor: Colors.bgOffWhite,
        alignItems: 'center',
        height: "fit-content",
        marginHorizontal: 20,
        marginTop: 10,
        padding: 10,
        borderRadius: 10,
        gap: 5,

    },
    attachmentText: {
        marginTop: 20,
        fontFamily: 'PTSans-Bold',
        fontSize: 16,
        textAlign: 'center'
    },
    video: {
        height: 200,
        width: "100%"
    }
})