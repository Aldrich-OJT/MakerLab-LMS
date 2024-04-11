import React, { useState } from "react";
import { View, Text, StyleSheet, Dimensions,Image,Modal, Pressable} from "react-native";
import ProgressBar from 'react-native-progress/Bar';
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

const badges = ['badge1', 'badge2', 'badge3', '',
                '', '', '', ''];
  return (
    <View style={styles.mainContainer}>
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
        <Text style={styles.nameText}>Full Name ko</Text>
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
              {/* You can put your badge image or icon here */}
              <Text>{badge}</Text>
            </View>
          ))}
        </View>
      </View>
      <View>
        <Pressable style={styles.logoutButton}>
          <Text style={styles.logoutText}> 
          <MaterialCommunityIcons name="logout" size={19} color='white'/>Logout</Text>
        </Pressable>
      </View>
    </View>
  );
  }

  const styles = StyleSheet.create({
    mainContainer: {
      backgroundColor: Colors.bgOffWhite,
      flex: 1,
    },
    innerContainer: {
      backgroundColor: Colors.bgYellow,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 20,
      marginTop: 20,
      borderRadius: 10,
      gap: 5,
      height: '33%',
    },
    editButton:{
      position: 'absolute',
      top: 15,
      right: 15,
    },
    avatar:{
      height: deviceWidth * .28,
      width: deviceWidth * .28,
      borderRadius: 150,
      borderColor: Colors.bgGray,
      borderWidth: 3,
    },
    nameText:{
      fontFamily: 'PTSans-Bold',
      fontSize: 20,
    },
    progressContainer:{
      backgroundColor: Colors.bgGray,
      borderRadius: 10,
      justifyContent:'center',
      width: '90%',
      height: '27%',
      padding: 20,
      gap: 6,
    },
    progressText:{
      fontFamily: 'PTSans-Bold',
      color: 'white',
    },
    badgesContainer:{
      backgroundColor: Colors.bgOffWhite,
      borderRadius: 10,
      height: '70%',
      width: '90%',
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    badge: {
      width: deviceWidth * .15,
      height: deviceWidth * .15,
      borderRadius: 50,
      backgroundColor: '#C4C4C4',
      justifyContent: 'center',
      alignItems: 'center',
      margin: 10,
    },
    logoutButton:{
      backgroundColor: Colors.bgViolet,
      alignSelf:'center',
      justifyContent:'center',
      width: '35%',
      height: '20%',
      borderRadius: 10,
      top: '80%',
    },
    logoutText:{
      color: 'white',
      fontFamily: 'PTSans-Bold',
      fontSize: 16,
      textAlign:'center',
    },
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
      justifyContent: 'center',
      borderRadius: 10,
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
      borderRadius: 10,
      marginBottom: 8,
    },
    modalText: {
      fontSize: 18,
      fontFamily: 'PTSans-Bold',
      flex:5,
      textAlign: 'center',
      alignSelf: 'center',
      padding: 5,
    },
    closeButton: {
      position: 'absolute',
      right: 0,
      padding: 5,
    },
  })