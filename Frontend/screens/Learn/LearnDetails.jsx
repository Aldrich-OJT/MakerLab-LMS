    import { useRoute } from "@react-navigation/native";
    import { useNavigation } from "@react-navigation/native";
    import { useContext, useEffect, useLayoutEffect, useState } from "react";
    import { View, Text, Image, StyleSheet, Pressable, Alert } from "react-native";
    import Colors from "../../constants/Colors";
    import { axiosDelete, axiosGet, axiosPut } from "../../utils/axios";
    import ModalContent from "../../components/LearnComponent/ModalContent";
    import * as FileSystem from 'expo-file-system';
    import { AuthContext } from "../../context/AuthProvider";
    import { ActivityIndicator } from 'react-native-paper';
    import LearnHeader from "../../components/LearnComponent/LearnHeader";

    const deleteURL = "/api/post/delete/"
    const postURL = "/api/post/"
    
    export default function LearnDetails({ route, navigation }) {
        const { token } = useContext(AuthContext)
        const [modalVisible, setModalVisible] = useState(false);
        const { _id } = route.params.item;
        const [postData, setPostData] = useState({})
        const [refresh, setRefresh] = useState(true)
        const {userData} = useContext(AuthContext);
        console.log(refresh)
        useEffect(() => {
            console.log("effect")
            //setPostData({})
            const fetchData = async () => {
                const data = await axiosGet(`${postURL}${_id}`, token)
                console.log(data) 
                setPostData(data)
                setRefresh(false)
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
                    headerStyle: {
                        backgroundColor: "black",
                    },
                    headerTitleStyle: {
                        fontFamily: 'PTSans-Bold',
                        color: Colors.bgYellow,
                    },
                    headerTintColor: Colors.bgYellow,
                    headerTitleAlign: 'center',
                });
            }
        }, [postData])

        const createTwoButtonAlert = () =>
            Alert.alert('Warning', 'Do you really want to delete this file?', [
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
                const deleteddata = await axiosDelete(`${deleteURL}${_id}`, token)
                console.log(`${deleteddata._id} deleted`)
                navigation.goBack()
            } catch (error) {
                console.log(error)
            }
        }
        //console.log(postData)

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
                ):(<ActivityIndicator 
                animating={true} 
                style={{top:20}}
                size={60}
                />)}
                <View style={styles.textcontainer}>
                    <Text style={styles.text}>
                        {postData.description}
                    </Text>
                    <Image />
                </View>
                <View style={styles.buttonContainer} >
                {userData.role === 'admin' && (
                    <Pressable style={styles.button} onPress={() => setModalVisible(true)}>
                        <Text style={{fontFamily: 'icon', fontSize:21, color:Colors.bgYellow,padding:8.5}}></Text>
                    </Pressable>
                )}
                {userData.role === 'admin' && (
                    <Pressable style={styles.button} onPress={createTwoButtonAlert}>
                        <Text style={{fontFamily: 'icon', fontSize:25, color:Colors.bgError}}></Text>
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
            textAlign: "justify",
            fontFamily: 'PTSans-Regular'
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
            backgroundColor: Colors.bgDarkGray,
            justifyContent: 'center',
            alignItems: 'center'
        },
    })