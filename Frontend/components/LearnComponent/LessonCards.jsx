import React, { useCallback, useContext, useState } from "react";
import { StyleSheet, View, Text, Pressable, Alert, ImageBackground } from "react-native";
import { axiosDelete, } from "../../utils/axios";
import { AuthContext } from "../../context/AuthProvider";
import { Menu, useTheme } from 'react-native-paper';
import LessonModal from "./LessonModal";
import Colors from "../../constants/Colors";
import background from "../../assets/lesson-image.png"

const deleteCategoryURL = "/api/categories/delete/"

export default function LessonCards({ title, description, setModalVisible, ID, setRefresh, onPress, index, setSelectedData, length }) {
  const { userData } = useContext(AuthContext)
  const [menuVisible, setMenuVisible] = useState(false);
  const theme = useTheme()
console.log
  const [showDescription, setShowDescription] = useState(false);

  const showDescriptionHandler = () => {
    setShowDescription(!showDescription);
  };
  const createTwoButtonAlert = useCallback(() =>
  Alert.alert('Warning', 'Do you really want to delete this category?', [
    {
      text: 'Cancel',
      //onPress: () => console.log('Cancel Pressed'),
      style: 'cancel',
    },
    { text: 'YES', onPress: deletePost },
  ]),[]) 

  const deletePost = useCallback(() => {

    const res = axiosDelete(`${deleteCategoryURL}${ID}`, userData.token)
    //console.log(res, "deleted")
    setRefresh(true)
  },[])
  //console.log(title)

  return (
    <Pressable style={[
      styles.lessonContainer,
      {marginBottom:
        (userData.role === 'admin' && index === length - 1 ? 70 :
        (userData.role === 'user' && index === length - 1 ? 20 : 0))
      , backgroundColor: theme.colors.darkGrayWhite}]} onPress={onPress}>
      {/* <LessonModal
        setModalVisibility={() => setModalVisible(false)}
        visibility={modalVisible}
        setRefresh={setRefresh}
        title={title}
        description={description}
        ID={ID}>
        Edit Lesson
      </LessonModal> */}

      <ImageBackground
        source={background}
        style={styles.imageContainer}>

        <View style={{backgroundColor: theme.colors.purpletintPurple}}>
          <View style={styles.titleContainer}>
            <Text style={{ fontFamily: 'icon', fontSize: 23, color: theme.colors.fontcolorPurple, marginTop: 2 }}></Text>
            <Text style={[styles.title, {color: theme.colors.fontcolorPurple}]}>{title}</Text>

            {userData.role === 'admin' && (
              <Menu
                visible={menuVisible}
                onDismiss={() => setMenuVisible(false)}
                anchor={
                  <Pressable style={{ width: 50, height: 30 }} onPress={() => (setMenuVisible(true))}>
                    <Text style={{ fontFamily: 'icon', fontSize: 22, color: theme.colors.fontcolorPurple, alignSelf: 'flex-end', marginRight: 5 }}> </Text>
                  </Pressable>
                }>
                <Menu.Item onPress={() => {
                  setModalVisible(true),
                  setSelectedData({
                    title,
                    description,
                    ID 
                  })
                }} title={<Text style={{ fontFamily: 'icon', fontSize: 16, color: theme.colors.lightGrayDarkgray , textAlign: "left" }}> Edit</Text>} />
                <Menu.Item onPress={createTwoButtonAlert} title={<Text style={{ fontFamily: 'icon', fontSize: 16, color: theme.colors.lightGrayDarkgray, textAlign: "left" }}> Delete</Text>} />
              </Menu>
            )}
          </View>
        </View>
      </ImageBackground>

      <View>
        <Text
          numberOfLines={showDescription ? undefined : 2}
          style={[styles.lessonDescription, {color: theme.colors.fontcolorOffwhiteBlack}]}>
          {description}
        </Text>
      </View>

          {description.length > 100 && (
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
        borderRadius: 10,
        minHeight: 155,
        marginHorizontal: 20,
        marginTop: 20,
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
    title:{
        fontSize: 21,
        fontFamily: 'PTSans-Bold',
        marginRight:5,
        flex:2,
        textAlignVertical: 'center'
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