import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions,Image,Modal, Pressable} from "react-native";
import ProgressBar from 'react-native-progress/Bar';
import Header from "../components/Header";
import Colors from "../constants/Colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';

const dimensions = Dimensions.get('window');   
const maxWidth = dimensions.width;
const maxHeight = dimensions.height;

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
                style={styles.editbutton}  
                color="black" 
                onPress={() => setAvatarModalVisible(true)}/>
      {/* {------------------------------MODAL------------------------- */} 
        <Modal
          animationType="slide"
          transparent={true}
          visible={avatarModalVisible}
          onRequestClose={() => setAvatarModalVisible(false)}
        >
          <View style={styles.modalmaincontainer}>
            <View style={styles.modalcontentcontainer}>
              <Text style={styles.modaltext}>Select Avatar</Text>
              <View style={styles.imagecontainer}>
                <View style={styles.modalrowimage}>
                  <Pressable onPress={()=>{setAvatar(0); setAvatarModalVisible(false)}}><Image source={require('../assets/avatar1.png')} style={styles.avatar}></Image></Pressable>
                  <Pressable onPress={()=>{setAvatar(1); setAvatarModalVisible(false)}}><Image source={require('../assets/avatar2.png')} style={styles.avatar}></Image></Pressable>
                </View>
                <View style={styles.modalrowimage}>
                  <Pressable onPress={()=>{setAvatar(2); setAvatarModalVisible(false)}}><Image source={require('../assets/avatar3.png')} style={styles.avatar}></Image></Pressable>
                  <Pressable onPress={()=>{setAvatar(3); setAvatarModalVisible(false)}}><Image source={require('../assets/avatar4.png')} style={styles.avatar}></Image></Pressable>
                </View>
              </View>
              <Pressable style={styles.closebutton} onPress={() => setAvatarModalVisible(false)}>
                <Text style={styles.closetext}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </Modal> 

        <View style={styles.avatarcontainer}>
              <Image source={avatarChoices[avatar]} style={styles.avatar}></Image>
        </View>
        <View style={styles.bottomsheet}>
        <Text style={styles.nametext}>Full Name ko</Text>
          <View style={styles.progresscontainer}>
            <Text style={styles.text}>Progress: 69%</Text>
            <View style={styles.progressbar}>
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
    editbutton: {
      alignSelf: "flex-end",
      margin: 5,
    },
    nametext:{
      fontSize: 20,
      fontWeight: "bold",
      alignSelf: "center",
    },
    avatarcontainer: { 
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 150,
      backgroundColor: 'black',
      height: maxWidth * .4,
      width: maxWidth * .4,
      position: 'absolute',
      alignSelf: 'center',
      top: maxWidth*0.08,
      zIndex: 1,
    },
    avatar: {
      height: (maxWidth * .40) -13,
      width: (maxWidth * .40) -13,
      borderRadius: 150,
      borderColor: Colors.bgYellow,
      borderWidth: 4,
    },
    bottomsheet: {
      height: maxHeight * 1,
      width: maxWidth * 1,
      paddingHorizontal: 20,
      gap: 20,
      backgroundColor: Colors.bgOffWhite,
      top: maxWidth * 0.12,
    },
    progresscontainer: {
      backgroundColor: '#ffc42c',
      padding: 20,
      borderRadius: 10,
      gap: 5,
    },
    progressbar: {
      flexDirection: 'row',
      gap: 10,
    },
    progresstext: {
      fontSize: 15,
      fontWeight: 'bold'
    },
    modalmaincontainer: {
      backgroundColor: 'rgba(0,0,0,0.3)',
      justifyContent: 'center',
      alignContent: 'center',
      flex: 1,
    },
    modalrowimage: {
      flexDirection: 'row',
      gap: 10,
    },
    modalcontentcontainer:{
      gap: 10,
      backgroundColor: Colors.bgYellow,
      margin: 20,
      padding: 10,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 10,
    },
    imagecontainer: {
      gap: 10,
      flexDirection: 'column',
    },
    modaltext: {
      fontSize: 20,
      fontWeight: 'bold',
      borderBottomColor: 'black',
      borderBottomWidth: 2,
      width: '100%',
      textAlign: 'center',
      paddingBottom: 12,
    },
    closebutton: {
      backgroundColor:'black',
      borderRadius: 6,
      padding: 15,
    },
    closetext: {
      fontSize: 17,
      color: Colors.bgYellow
    },
  })