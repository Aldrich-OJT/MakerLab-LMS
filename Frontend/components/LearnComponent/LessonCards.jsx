import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, Pressable, Alert, ImageBackground } from "react-native";
import { axiosDelete, axiosGet, axiosPut } from "../../utils/axios";
import { AuthContext } from "../../context/AuthProvider";
import { Menu} from 'react-native-paper';
import LessonModal from "./LessonModal";
import Colors from "../../constants/Colors";

const deleteCategoryURL = "/api/categories/delete/"

export default function LessonCards ({title, description, onPress, ID,setRefresh,index}) {
  const {userData} = useContext(AuthContext)
  const [modalVisible,setModalVisible] = useState(false)
 
  const [showDescription, setShowDescription] = useState(false);

  const showDescriptionHandler = () => {
      setShowDescription(!showDescription);
  };
  const createTwoButtonAlert = () =>
  Alert.alert('Warning', 'Do you really want to delete this category?', [
      {
          text: 'Cancel',
          //onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
      },
      { text: 'YES', onPress: deletePost },
  ]);
  const deletePost= ()=>{

    const res = axiosDelete(`${deleteCategoryURL}${ID}`,userData.token)
    //console.log(res, "deleted")
    setRefresh(true)
  }
  //console.log(title)
  const [menuVisible, setMenuVisible] = useState(false);

    return (
      <Pressable style={[styles.lessonContainer, { marginTop: index === 0 ? 20 : 10 }]} onPress={onPress}>
        <LessonModal
          onPress={()=>setModalVisible(false)}
          visibility={modalVisible}
          setRefresh={setRefresh}
          title={title}
          description={description}
          ID={ID}>
          Edit Lesson
        </LessonModal>

        <ImageBackground 
          source={require('../../assets/lesson-image.png')} 
          style={styles.imageContainer}>
        
          <View style={styles.purpleTint}>
            <View style={styles.titleContainer}>
              <Text style={{fontFamily: 'icon', fontSize:23, color: Colors.bgPurple, marginTop:2}}></Text> 
              <Text style={styles.title}>{title}</Text>

              {userData.role === 'admin' && (
                <Menu
                  visible={menuVisible}
                  onDismiss={()=>setMenuVisible(false)}
                  anchor={
                  <Pressable style={{width:50,height:30}} onPress={()=>(setMenuVisible(true))}>
                    <Text style={{fontFamily: 'icon', fontSize:22, color:Colors.bgPurple, alignSelf:'flex-end', marginRight:5}}> </Text>
                  </Pressable>
                }>
                  <Menu.Item onPress={()=>setModalVisible(true)} title={<Text style={{fontFamily: 'icon', fontSize:16, color:Colors.bgDarkGray, textAlign:'center'}}> Edit</Text>} />
                  <Menu.Item onPress={createTwoButtonAlert} title={<Text style={{fontFamily: 'icon', fontSize:16, color:Colors.bgDarkGray, textAlign:'center'}}> Delete</Text>} />
                </Menu>
              )}
            </View>
          </View>
        </ImageBackground>
        
          <View>            
            <Text 
              numberOfLines={showDescription ? undefined : 2}
              style={styles.lessonDescription}>
              {description}
            </Text>
          </View>

          {description.length > 50 && (
            <Pressable onPress={showDescriptionHandler}>
              <Text style={{ fontFamily: 'icon', fontSize: 20, color: Colors.bgPurple,alignSelf:'flex-end', marginRight:25, marginBottom:10 }}>
                {showDescription ? '' : ''}
              </Text>
            </Pressable>
          )}
      </Pressable>
    );
  };

const styles = StyleSheet.create({
    lessonContainer: {
        flexDirection: 'column',
        backgroundColor: 'white',
        borderRadius: 10,
        minHeight: 150,
        marginHorizontal: 20,
        margin: 10,
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
        padding:20,
    },
    imageContainer:{
      borderTopLeftRadius: 10,
      borderTopRightRadius: 10,
      overflow:"hidden",
    },
    purpleTint:{
      backgroundColor: 'rgba(238, 227, 255, 0.90)',
    },
    title:{
        color: Colors.bgPurple,
        fontSize: 21,
        fontFamily: 'PTSans-Bold',
        marginRight:5,
        flex:2,
        textAlignVertical: 'center'
    },
    buttons:{
      borderRadius:10,
      padding:7,
      backgroundColor: Colors.bgDarkGray,
      marginLeft: 10,
      overflow:"hidden",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.22,
      shadowRadius: 2.22,
      
      elevation: 3,
    },
    lessonDescription:{
        marginVertical: 5,
        fontSize: 14,
        fontFamily: 'PTSans-Regular',
        textAlign: 'justify',
        paddingHorizontal:15,
        paddingTop:15,
    },
})