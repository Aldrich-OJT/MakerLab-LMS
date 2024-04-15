import React, { useContext, useState } from "react";
import { StyleSheet, View, Text, Pressable, Alert } from "react-native";
import Colors from "../../constants/Colors";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { axiosDelete, axiosGet, axiosPut } from "../../utils/axios";
import { AuthContext } from "../../context/AuthProvider";
import LessonModal from "./LessonModal";

const deleteCategoryURL = "/api/categories/delete/"

export default function LessonCards ({title, description, onPress, ID,setRefresh,index}) {
  const {userData} = useContext(AuthContext)
  const [modalVisible,setModalVisible] = useState(false)
 
  const [showDescription, setShowDescription] = useState(false);

  const showDescriptionHandler = () => {
      setShowDescription(!showDescription);
  };
  const createTwoButtonAlert = () =>
  Alert.alert('Warning', 'Do you really want to delete this file?', [
      {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
      },
      { text: 'YES', onPress: deletePost },
  ]);
  const deletePost= ()=>{

    const res = axiosDelete(`${deleteCategoryURL}${ID}`,userData.token)
    console.log(res, "deleted")
    setRefresh(true)
  }
  console.log(title)
    return (
      <Pressable style={[styles.lessonContainer, { marginTop: index === 0 ? 20 : 10 }]} onPress={onPress}>
        <LessonModal
          onPress={()=>setModalVisible(false)}
          visibility={modalVisible}
          setRefresh={setRefresh}
          title={title}
          description={description}
          ID={ID}
        >Edit Lesson</LessonModal>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            <FontAwesome5 name="book" size={20} color={Colors.bgViolet} /> {title}
          </Text>
         {userData.role === 'admin' && (
          <Pressable onPress={()=>setModalVisible(true)}>
              <MaterialCommunityIcons 
                name="square-edit-outline" 
                size={24}
                color={Colors.bgYellow}
                style={styles.buttons}
              />
            </Pressable> 
          )}
          {userData.role === 'admin' && (
            <Pressable onPress={createTwoButtonAlert}>
              <MaterialCommunityIcons 
                name="delete"
                size={24}
                color={Colors.bgYellow}
                style={styles.buttons}
              />
            </Pressable>
          )}
        </View>

          <View>            
            <Text 
              numberOfLines={showDescription ? undefined : 3}
              style={styles.lessonDescription}>
              {description}
            </Text>
          </View>

          {description.length > 50 && (
            <Pressable onPress={showDescriptionHandler}>
               <MaterialCommunityIcons 
                  name={showDescription ? "chevron-up" : "chevron-down"} 
                  size={26} 
                  color={Colors.bgViolet}
                  style={{alignSelf:'flex-end', marginRight:5 }}
               />
            </Pressable>
          )}
      </Pressable>
    );
  };

const styles = StyleSheet.create({
    lessonContainer: {
        flexDirection: 'column',
        backgroundColor: Colors.bgYellow,
        borderRadius: 10,
        height: 'fit-content',
        minwidth: '100%',
        paddingHorizontal: 20,
        paddingVertical:10,
        marginHorizontal: 20,
        margin: 10,
    },
    titleContainer: {
        flexDirection: 'row',
    },
    title:{
        color: Colors.bgViolet,
        fontSize: 20,
        fontFamily: 'PTSans-Bold',
        marginRight:5,
        flex:2,
        textAlignVertical: 'center'
    },
    buttons:{
      borderRadius:10,
      padding:7,
      backgroundColor: 'black',
      marginLeft: 10,
      overflow:"hidden"
    },
    lessonDescription:{
        marginVertical: 5,
        fontSize: 14,
        fontFamily: 'PTSans-Regular',
        marginRight: 10,
        textAlign: 'justify',
    },
})