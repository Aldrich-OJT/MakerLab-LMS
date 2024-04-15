import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Dimensions,Image,Modal, Pressable, ScrollView } from "react-native";
import ProgressBar from 'react-native-progress/Bar';
import Colors from "../constants/Colors";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { AuthContext } from '../context/AuthProvider';

const dimensions = Dimensions.get('window');   
const deviceWidth = dimensions.width;
const deviceHeight = dimensions.height;

export default function Settings () {
const [avatarModalVisible, setAvatarModalVisible] = useState(false);
const [avatar,setAvatar] = useState(0);
const { logout, userData } = useContext(AuthContext);

const avatarChoices = [
  require('../assets/avatar1.png'),
  require('../assets/avatar2.png'),
  require('../assets/avatar3.png'),
  require('../assets/avatar4.png'),
]

const badges = [
  require('../assets/badge-makerlab.png'), 
  require('../assets/badge-coding.png'), 
  require('../assets/badge-3dprinting.png'), '',
  '', '', '', ''
];

const  tabBarHeight  = useBottomTabBarHeight();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
    <View style={[styles.mainContainer,{marginBottom:tabBarHeight}]}>
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
                  <Pressable onPress={()=>{setAvatar(0); setAvatarModalVisible(false)}}><Image source={require('../assets/avatar1.png')} style={styles.avatar}></Image></Pressable>
                  <Pressable onPress={()=>{setAvatar(1); setAvatarModalVisible(false)}}><Image source={require('../assets/avatar2.png')} style={styles.avatar}></Image></Pressable>
                </View>
                <View style={styles.modalRowImage}>
                  <Pressable onPress={()=>{setAvatar(2); setAvatarModalVisible(false)}}><Image source={require('../assets/avatar3.png')} style={styles.avatar}></Image></Pressable>
                  <Pressable onPress={()=>{setAvatar(3); setAvatarModalVisible(false)}}><Image source={require('../assets/avatar4.png')} style={styles.avatar}></Image></Pressable>
                </View>
              </View>

            </View>
          </View>
        </Modal> 

      <View style={styles.innerContainer}>
        <MaterialCommunityIcons 
                  name="square-edit-outline" 
                  size={26}
                  style={styles.editButton}  
                  color="black" 
                  onPress={() => setAvatarModalVisible(true)}/>
        <Image source={avatarChoices[avatar]} style={styles.avatar}></Image>
        <Text style={styles.nameText}>{userData.name}</Text>
        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Progress: 68%</Text>
          <View style={styles.progressBar}>
            <ProgressBar 
            animated={true}
            progress={.68} 
            width={270} 
            height={10}
            borderRadius={10}
            unfilledColor={Colors.bgOffWhite}
            borderWidth={0}
            color={Colors.bgDarkViolet}
            />
          </View>
        </View>
      </View>

      <View style={styles.innerContainer}>
        <Text style={styles.nameText}>My badges</Text>
        <View style={styles.badgesContainer}>
          {badges.map((badge, index) => (
            <View key={index} style={styles.badge}>
              {badge ? (
              <Image
                source={badge}
                style={{ width: '100%', height: '100%', resizeMode: 'contain' }}
              />
              ) : null}
            </View>
          ))}
        </View>
      </View>

        <Pressable style={[styles.logoutButton,{bottom:tabBarHeight}]} onPress={logout}>
          <Text style={styles.logoutText}> 
          <MaterialCommunityIcons name="logout" size={18} color='white'/>Logout</Text>
        </Pressable>
    </View>
    </ScrollView>
    
  );
  }

  const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: Colors.bgOffWhite,
      height: deviceHeight - (deviceWidth * 0.27), //Header height
    },
    innerContainer: {
      backgroundColor: Colors.bgYellow,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 20,
      marginTop: 20,
      borderRadius: 10,
      gap: 5,
      paddingVertical:15,
      height: 'fit-content',
    },
    editButton:{
      position: 'absolute',
      top: 15,
      right: 15,
    },
    avatar:{
      height: deviceWidth * .26,
      width: deviceWidth * .26,
      borderRadius: 50,
      borderColor: Colors.bgGray,
      borderWidth: 5,
    },
    nameText:{
      fontFamily: 'PTSans-Bold',
      fontSize: 20,
    },
    progressContainer:{
      backgroundColor: Colors.bgGray,
      borderRadius: 10,
      justifyContent:'center',
      minWidth: '90%',
      padding: 15,
      gap: 6,
    },
    progressText:{
      fontFamily: 'PTSans-Bold',
      color: 'white',
    },
    badgesContainer:{
      backgroundColor: Colors.bgOffWhite,
      borderRadius: 10,
      width: '90%',
      height: 'fit-content',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    badge: {
      width: deviceHeight * .07, 
      height: deviceHeight * .07,
      borderRadius: 50,
      backgroundColor: '#C4C4C4',
      margin: 10,
    },
    logoutButton:{
      backgroundColor: Colors.bgViolet,
      alignSelf:'center',
      justifyContent:'center',
      width: '30%',
      height: '5%',
      borderRadius: 10,
      position: 'absolute',
      bottom: 0,
    },
    logoutText:{
      color: 'white',
      fontFamily: 'PTSans-Bold',
      fontSize: 16,
      textAlign:'center',
    },

    //vv Modal styling vv
    modalMainContainer: {
      backgroundColor: 'rgba(0,0,0,0.3)',
      justifyContent: 'center',
      alignContent: 'center',
      flex: 1,
    },
    modalRowImage: {
      flexDirection: 'row',
      gap: 15,
    },
    modalContentContainer:{
      gap: 10,
      backgroundColor: Colors.bgYellow,
      margin: 20,
      padding: 10,
      alignItems: 'center',
      borderRadius: 10,
    },
    titleContainer:{
      flexDirection: 'row',
      padding: 5,
    },
    imageContainer: {
      gap: 10,
      flexDirection: 'column',
      height:"fit-content",
      marginBottom: 8,
    },
    modalText: {
      fontSize: 20,
      fontFamily: 'PTSans-Bold',
      flex:5,
      textAlign: 'center',
    },
    closeButton: {
      position: 'absolute',
      right: 0,
      padding: 5,
    },
  })