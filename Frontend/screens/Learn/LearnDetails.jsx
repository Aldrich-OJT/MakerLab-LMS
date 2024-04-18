    import { useRoute } from "@react-navigation/native";
    import { useNavigation } from "@react-navigation/native";
    import { useContext, useEffect, useLayoutEffect, useState } from "react";
    import { View, Text, Image, StyleSheet, Pressable, Alert, ScrollView } from "react-native";
    import Colors from "../../constants/Colors";
    import { axiosDelete, axiosGet, axiosPut } from "../../utils/axios";
    import ModalContent from "../../components/LearnComponent/ModalContent";
    import * as FileSystem from 'expo-file-system';
    import { AuthContext } from "../../context/AuthProvider";
    import { ActivityIndicator } from 'react-native-paper';
    import LearnHeader from "../../components/LearnComponent/LearnHeader";
    import { Menu } from 'react-native-paper';
    
    const deleteURL = "/api/post/delete/"
    const postURL = "/api/post/"
    
    export default function LearnDetails({ route, navigation}) {
        const { token } = useContext(AuthContext)
        const [modalVisible, setModalVisible] = useState(false);
        const { _id } = route.params.item;
        const [postData, setPostData] = useState({})
        const [refresh, setRefresh] = useState(true)
        const {userData} = useContext(AuthContext);
        const [menuVisible, setMenuVisible] = useState(false);
   
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
                navigation.setOptions({
                    headerTitle: "",
                    headerStyle: {
                        backgroundColor: Colors.bgDarkGray,
                    },
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

                <View style={styles.lessonContainer}>
                    <View style={styles.purpleTint}>
                        <View style={styles.titleContainer}>
                            <Text style={styles.title}>{postData.title} </Text>
                            {userData.role === 'admin' && (
                                <Menu
                                    visible={menuVisible}
                                    onDismiss={()=>setMenuVisible(false)}
                                    anchor={
                                    <Pressable style={{width:50,height:30}} onPress={()=>(setMenuVisible(true))}>
                                        <Text style={{fontFamily: 'icon', fontSize:22, color:Colors.bgPurple, alignSelf:'flex-end'}}> </Text>
                                    </Pressable>
                                    }>
                                    <Menu.Item onPress={()=>setModalVisible(true)} title={<Text style={{fontFamily: 'icon', fontSize:16, color:Colors.bgDarkGray, textAlign:'center'}}> Edit</Text>} />
                                    <Menu.Item onPress={createTwoButtonAlert} title={<Text style={{fontFamily: 'icon', fontSize:16, color:Colors.bgDarkGray, textAlign:'center'}}> Delete</Text>} />
                                </Menu>
                            )}
                        </View>
                    </View>

                    <ScrollView showsVerticalScrollIndicator={false}>
                    <Text style={styles.attachmentText}>Attachments
                            <Text style={{fontFamily: 'icon', fontSize:18}}></Text>
                        </Text>
                        
                        <View style={styles.attachmentContainer}>
                    {/* Insert name of attachment here */}
                          <Text style={{textDecorationLine: 'underline'}}>SampleAttachmentText.pdf</Text>
                        </View>
                        <View style={styles.textcontainer}>
                            <Text style={styles.description}>
                            {postData.description}
                            </Text>
                        </View>
                    </ScrollView>
                </View>
            </View>
        )
    }

    const styles = StyleSheet.create({
        mainContainer: {
            flex: 1
        },
        lessonContainer:{
            flexDirection: 'column',
            backgroundColor: 'white',
            borderRadius: 10,
            marginHorizontal: 20,
            marginTop:20,
            maxWidth: '90%',
            maxHeight: '94%',
            minWidth: '90%',
            minHeight:'94%',
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
            marginHorizontal:20,
            marginVertical:15,
            justifyContent:'space-between'
          },
          title: {
            color: Colors.bgPurple,
            fontSize: 20,
            fontFamily: 'PTSans-Bold',
          },
          purpleTint:{
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
            marginHorizontal: 20,
            padding: 10,
            borderRadius: 10,
            gap:5,
            
        },
        attachmentText:{
            marginTop: 20,
            fontFamily:'PTSans-Bold',
            fontSize: 16,
            textAlign: 'center'
        }
    })