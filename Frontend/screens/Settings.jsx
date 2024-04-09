import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions,Image,Modal, Pressable} from "react-native";
import ProgressBar from 'react-native-progress/Bar';
import Header from "../components/Header";
import Colors from "../constants/Colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const dimensions = Dimensions.get('window');   
const deviceWidth = dimensions.width;
const deviceHeight = dimensions.height;

export default function Settings () {
const [avatarModalVisible, setAvatarModalVisible] = useState(false);
const [avatar,setAvatar] = useState(0);

const avatarChoices = [
  require('../assets/avatar1.png'),
  require('../assets/avatar2.png'),
  require('../assets/avatar3.png'),
  require('../assets/avatar4.png'),
]

  return (
      <View style={styles.container}>
        <Header/>
        <MaterialCommunityIcons 
                name="square-edit-outline" 
                size={26}
                style={styles.editButton}  
                color="black" 
                onPress={() => setAvatarModalVisible(true)}/>
      {/* {------------------------------MODAL------------------------- */} 
        <Modal
          animationType="slide"
          transparent={true}
          visible={avatarModalVisible}
          onRequestClose={() => setAvatarModalVisible(false)}
        >
          <View style={styles.modalMainContainer}>
            <View style={styles.modalContentContainer}>
              <View style={styles.titleContainer}>
              <Text style={styles.modalText}>Select Avatar</Text>
              <Pressable style={styles.closeButton} onPress={() => setAvatarModalVisible(false)}>
                <Text><MaterialCommunityIcons name="close" size={30} color={Colors.bgRedInvalid} /></Text>
              </Pressable>
              </View>

              <View style={styles.imageContainer}>
                <View style={styles.modalRowImage}>
                  <Pressable onPress={()=>{setAvatar(0); setAvatarModalVisible(false)}}><Image source={require('../assets/avatar1.png')} style={styles.choices}></Image></Pressable>
                  <Pressable onPress={()=>{setAvatar(1); setAvatarModalVisible(false)}}><Image source={require('../assets/avatar2.png')} style={styles.choices}></Image></Pressable>
                </View>
                <View style={styles.modalRowImage}>
                  <Pressable onPress={()=>{setAvatar(2); setAvatarModalVisible(false)}}><Image source={require('../assets/avatar3.png')} style={styles.choices}></Image></Pressable>
                  <Pressable onPress={()=>{setAvatar(3); setAvatarModalVisible(false)}}><Image source={require('../assets/avatar4.png')} style={styles.choices}></Image></Pressable>
                </View>
              </View>

            </View>
          </View>
        </Modal> 

        <View style={styles.avatarContainer}>
              <Image source={avatarChoices[avatar]} style={styles.avatar}></Image>
        </View>
        <View style={styles.bottomSheet}>
        <Text style={styles.nameText}>Full Name ko</Text>
          <View style={styles.progressContainer}>
            <Text style={styles.text}>Progress: 69%</Text>
            <View style={styles.progressBar}>
              <ProgressBar 
              animated={true}
              progress={.69} 
              width={270} 
              height={15}
              borderRadius={10}
              unfilledColor={'white'}
              borderWidth={0}
              color={Colors.bgDarkViolet}
              />
              </View>
          </View>
  
        </View>
      </View>    
  );
  }

  const styles = StyleSheet.create({
    container: {
      backgroundColor: Colors.bgOffWhite
    },
    editButton: {
      alignSelf: "flex-end",
      margin: 10,
    },
    nameText:{
      fontSize: 20,
      fontWeight: "bold",
      alignSelf: "center",
    },
    avatarContainer: { 
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 150,
      backgroundColor: 'black',
      height: deviceWidth * .4,
      width: deviceWidth * .4,
      position: 'absolute',
      alignSelf: 'center',
      top: deviceWidth*0.08,
      zIndex: 1,
    },
    avatar: {
      height: (deviceWidth * .40) -13,
      width: (deviceWidth * .40) -13,
      borderRadius: 150,
      borderColor: Colors.bgYellow,
      borderWidth: 4,
    },
    bottomSheet: {
      height: deviceHeight * 1,
      width: deviceWidth * 1,
      paddingHorizontal: 20,
      gap: 20,
      backgroundColor: Colors.bgOffWhite,
      top: deviceWidth * 0.12,
    },
    progressContainer: {
      backgroundColor: '#ffc42c',
      padding: 20,
      borderRadius: 10,
      gap: 5,
    },
    progressBar: {
      flexDirection: 'row',
      gap: 10,
    },
    progressText: {
      fontSize: 15,
      fontWeight: 'bold'
    },
    modalMainContainer: {
      backgroundColor: 'rgba(0,0,0,0.3)',
      justifyContent: 'center',
      alignContent: 'center',
      flex: 1,
    },
    modalRowImage: {
      flexDirection: 'row',
      gap: 10,
    },
    choices:{
      height: (deviceWidth * .30),
      width: (deviceWidth * .30),
      borderRadius: 150,
      borderColor: Colors.bgYellow,
      borderWidth: 3,
    },
    modalContentContainer:{
      gap: 10,
      backgroundColor: Colors.bgYellow,
      margin: 20,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 30,
    },
    titleContainer:{
      flexDirection: 'row',
      padding: 5,
      width: '100%',
      justifyContent: 'space-evenly',
    },
    imageContainer: {
      gap: 10,
      flexDirection: 'column',
      backgroundColor: Colors.bgGray,
      borderRadius: 30,
      paddingHorizontal: 30,
      paddingVertical: 20,
      marginBottom: 8,
    },
    modalText: {
      fontSize: 16,
      fontWeight: 'bold',
      backgroundColor: Colors.bgGray,
      color: Colors.bgYellow,
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      borderBottomRightRadius: 15,
      borderBottomLeftRadius: 15,
      width: deviceWidth * .64,
      textAlign: 'center',
      height: deviceWidth * .13,
      paddingVertical: (deviceWidth * .13)/4,
    },
    closeButton: {
      backgroundColor: Colors.bgGray,
      borderRadius: 50,
      paddingHorizontal: 10,
      height: deviceWidth * .13,
      justifyContent: 'center',
      borderTopLeftRadius: 30,
      borderTopRightRadius: 30,
      borderBottomRightRadius: 30,
      borderBottomLeftRadius: 15,
    },
    closetext: {
      fontSize: 17,
      color: Colors.bgYellow
    },
  })