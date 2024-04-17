import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Dimensions, Image, Modal, Pressable, ScrollView } from "react-native";
import ProgressBar from 'react-native-progress/Bar';
import Colors from "../constants/Colors";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../context/AuthProvider';
import avatar1 from '../assets/avatars/avatar1.png';
import avatar2 from '../assets/avatars/avatar2.png';
import avatar3 from '../assets/avatars/avatar3.png';
import avatar4 from '../assets/avatars/avatar4.png';

const dimensions = Dimensions.get('window');
const deviceWidth = dimensions.width;
const deviceHeight = dimensions.height;

const avatarChoices= [avatar1,avatar2,avatar3,avatar4]


export default function Settings() {

   console.log('Avatar choices:', avatarChoices);
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [avatar, setAvatar] = useState(0);
  const { logout, userData } = useContext(AuthContext);

  // const avatarChoices = [
  //   require('../assets/avatars/avatar1.png'),
  //   require('../assets/avatars/avatar2.png'),
  //   require('../assets/avatars/avatar3.png'),
  //   require('../assets/avatars/avatar4.png'),
  // ]

  const badges = [
    require('../assets/badges/badge-makerlab.png'),
    require('../assets/badges/badge-coding.png'),
    require('../assets/badges/badge-3dprinting.png'), '',
    '', '', '', ''
  ];

  const tabBarHeight = useBottomTabBarHeight();

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={[styles.mainContainer,{marginBottom:tabBarHeight}]}>
        <Modal
          animationType="fade"
          transparent={true}
          visible={avatarModalVisible}
          onRequestClose={() => setAvatarModalVisible(false)}
        >
          <View style={styles.modalMainContainer}>
            <View style={styles.modalContentContainer}>
              <View style={styles.titleContainer}>
                <Text style={styles.modalText}>Select Avatar</Text>
              </View>

              <View style={styles.imageContainer}>
                {avatarChoices.map((avatar, index) => (
                  <Pressable key={index} onPress={() => { setAvatarModalVisible(false) }}>
                    <Image source={avatar} style={styles.avatar} />

                  </Pressable>
                ))}
              </View>

              <Pressable style={styles.cancelButton} onPress={() => setAvatarModalVisible(false)}>
                <Text style={styles.cancelText}>
                  Cancel
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        <View style={styles.innerContainer}>
          <Text style={[styles.editButton, { fontFamily: 'icon', fontSize: 20, color: Colors.bgGray }]}
            onPress={() => setAvatarModalVisible(true)}></Text>
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
                color={Colors.bgPurple}
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

        <Pressable style={[styles.logoutButton, { bottom: tabBarHeight }]} onPress={logout}>
          <Text style={styles.logoutText}>
            <Text style={{ fontFamily: 'icon', fontSize: 18 }}></Text>Logout</Text>
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
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    gap: 5,
    paddingVertical: 15,
    height: 'fit-content',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  editButton: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
  avatar: {
    height: deviceWidth * .26,
    width: deviceWidth * .26,
    borderRadius: 50,
    borderColor: Colors.bgGray,
    borderWidth: 5,
  },
  nameText: {
    fontFamily: 'PTSans-Bold',
    fontSize: 20,
  },
  progressContainer: {
    backgroundColor: Colors.bgGray,
    borderRadius: 10,
    justifyContent: 'center',
    minWidth: '90%',
    padding: 15,
    gap: 6,
  },
  progressText: {
    fontFamily: 'PTSans-Bold',
    color: 'white',
  },
  badgesContainer: {
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
  logoutButton: {
    backgroundColor: Colors.bgGray,
    alignSelf: 'center',
    justifyContent: 'center',
    width: '30%',
    height: '5%',
    borderRadius: 10,
    position: 'absolute',
  },
  logoutText: {
    color: Colors.bgYellow,
    fontFamily: 'PTSans-Bold',
    fontSize: 16,
    textAlign: 'center',
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
  modalContentContainer: {
    gap: 10,
    backgroundColor: 'white',
    margin: 20,
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  titleContainer: {
    flexDirection: 'row',
    padding: 5,
  },
  imageContainer: {
    gap: 10,
    flexDirection: 'row',
    justifyContent:"center",
    alignItems:"center",    
    flexWrap:"wrap",
    width:"80%",
    height: "fit-content",
    marginBottom: 8,
  },
  modalText: {
    fontSize: 20,
    fontFamily: 'PTSans-Bold',
    flex: 5,
    textAlign: 'center',
  },
  cancelButton: {
    backgroundColor: 'white',
    justifyContent: "center",
    alignItems: "center",
    height: deviceWidth * .13,
    width: deviceWidth * .34,
    borderRadius: 10,
    paddingVertical: 10,
    marginVertical: 10,
    borderColor: Colors.bgPurple,
    borderWidth: 2,
  },
  cancelText: {
    color: Colors.bgPurple,
    fontSize: 16,
    fontFamily: 'PTSans-Bold',
  },
})