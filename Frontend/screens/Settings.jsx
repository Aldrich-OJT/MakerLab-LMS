import React, { useState, useContext, useEffect, useCallback, useRef } from "react";
import { View, Text, StyleSheet, Dimensions, Image, Modal, Pressable, ScrollView } from "react-native";
import ProgressBar from 'react-native-progress/Bar';
import Colors from "../constants/Colors";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { AuthContext } from '../context/AuthProvider';
import aang from '../assets/avatars/aang.png';
import boyred from '../assets/avatars/boyred.png';
import girlblue from '../assets/avatars/girlblue.png';
import girlyellowhair from '../assets/avatars/girlyellowhair.png';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosGet, axiosPost, axiosPut } from "../utils/axios";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator, useTheme } from "react-native-paper";
import { DarkModeContext } from "../context/ThemeProvider";
const dimensions = Dimensions.get('window');
const deviceWidth = dimensions.width;
const deviceHeight = dimensions.height;
const getuserDataURL = "/api/user/data/";
const updateuserDataURL = "/api/user/data/update/";
const contentType = "application/json"

const avatarChoices = [aang, boyred, girlblue, girlyellowhair];


export default function Settings() {
  const theme = useTheme()
  const tabBarHeight = useBottomTabBarHeight();
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [avatar, setAvatar] = useState(null)
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { logout, userData } = useContext(AuthContext);
  const { toggleDarkMode } = useContext(DarkModeContext);
  const [pressed, setPressed] = useState(false)
  const [progress, setProgress] = useState();
  const [formdata, setFormdata] = useState({
    avatar: 0
  });

  //console.log("current avatar",avatar)
  const darkModeHandler = () => {
    toggleDarkMode()
    setPressed(!pressed)
  };

  const saveAvatar = (index) => {
    console.log(index)
    setFormdata({ avatar: index })
    setAvatarModalVisible(false);

  };
  useEffect(() => {
    const updateAvatar = async () => {
      setAvatar(null)
      const data = await axiosPut(`${updateuserDataURL}${user.user}`, formdata, contentType, userData.token)
      console.log("avatar from database", data)
      setAvatar(data.avatar)
    }
    updateAvatar()
  }, [formdata, user])

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (refresh) {
          setLoading(true);
          const data = await axiosGet(`${getuserDataURL}${userData._id}`, userData.token);
          //console.log(data)
          setProgress(parseFloat(data.progress.$numberDecimal));
          setUser(data);
          setAvatar(data.avatar)
          setLoading(false);
          setRefresh(false);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [refresh]);

  const badges = [
    require('../assets/badges/badge-makerlab.png'),
    require('../assets/badges/badge-coding.png'),
    require('../assets/badges/badge-3dprinting.png')
  ];

  useFocusEffect(
    useCallback(() => {
      setRefresh(true);
    }, [])
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
          style={[styles.mainContainer, { backgroundColor: theme.colors.grayOffwhite }]}
      >

        <Modal
          animationType="fade"
          transparent={true}
          visible={avatarModalVisible}
          onRequestClose={() => setAvatarModalVisible(false)}
        >
          <View style={styles.modalMainContainer}>
            <View style={[styles.modalContentContainer, { backgroundColor:theme.colors.darkGrayWhite }]}>
              <View style={styles.titleContainer}>
                <Text style={[styles.modalText, { color: theme.colors.fontcolor }]}>
                  Select Avatar
                </Text>
              </View>

              <View style={styles.imageContainer}>
                {avatarChoices.map((item, index) => (
                  <Pressable key={index} onPress={() => saveAvatar(index)}>
                    <Image source={avatarChoices[index]} style={[styles.avatar, { borderColor: theme.colors.grayLightgray }]} />
                  </Pressable>
                ))}
              </View>

              <Pressable
                style={[styles.cancelButton, { backgroundColor: theme.colors.darkGrayWhite }]}
                onPress={() => setAvatarModalVisible(false)}>

                <Text style={styles.cancelText}>
                  Cancel
                </Text>
              </Pressable>
            </View>
          </View>
        </Modal>

        {loading ? "" : (
          <View style={[styles.innerContainer,
          { backgroundColor: theme.colors.darkGrayWhite }]}>
            <Pressable style={styles.modeButton} onPress={darkModeHandler}>
              <Text style={styles.modeText}>{pressed ? '' : ''}</Text>
            </Pressable>
            <Pressable onPress={() => setAvatarModalVisible(true)}>
              {<Image source={avatarChoices[avatar]} style={[styles.avatar, { borderColor: theme.colors.grayLightgray }]}></Image>}
              <View style={styles.editButtonContainer}>
                <Text style={styles.editButton}></Text>
              </View>
            </Pressable>

            <Text style={[styles.nameText, { color: theme.colors.fontcolorOffwhiteBlack }]}>{userData.name} </Text>


            <View style={[styles.progressContainer, { backgroundColor: theme.colors.grayOffwhite }]}>

              <Text style={[styles.progressText,
              { color: theme.colors.fontcolorOffwhiteBlack }]}>
                Progress {parseInt(progress * 100)}%
              </Text>

              <View style={styles.progressBar}>
                <ProgressBar
                  animated={true}
                  progress={progress}
                  width={270}
                  height={10}
                  borderRadius={10}
                  unfilledColor={ "white" }
                  borderWidth={0}
                  color={Colors.bgPurple}
                />
              </View>
            </View>
          </View>
        )}

        <View style={[styles.innerContainer, { backgroundColor: theme.colors.darkGrayWhite }]}>
          <Text style={[styles.nameText, {color: theme.colors.fontcolorOffwhiteBlack}]}>My badges</Text>
          <View style={[styles.badgesContainer, { backgroundColor: theme.colors.grayOffwhite }]}>
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
        <Pressable style={[styles.logoutButton, { backgroundColor: theme.colors.darkGrayWhite }]} onPress={logout}>
          <Text style={styles.logoutText}>
            <Text style={{ fontFamily: 'icon', fontSize: 18 }}></Text>
            Logout
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
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
  editButtonContainer: {
    position: 'absolute',
    right: -2,
    top: 65,
    backgroundColor: Colors.bgGray,
    borderRadius: 100,
    padding: 7,
  },
  editButton: {
    fontFamily: 'icon',
    fontSize: 16,
    color: Colors.bgYellow
  },
  modeButton: {
    position: 'absolute',
    right: 10,
    top: 10,
    backgroundColor: Colors.bgGray,
    borderRadius: 100,
    padding: 7,
    fontSize: 18,
  },
  modeText: {
    fontFamily: 'icon',
    color: Colors.bgYellow
  },
  avatar: {
    height: deviceWidth * .26,
    width: deviceWidth * .26,
    borderRadius: 1000,
    borderWidth: 5,
  },
  nameText: {
    fontFamily: 'PTSans-Bold',
    fontSize: 20,
  },
  progressContainer: {
    borderRadius: 10,
    justifyContent: 'center',
    minWidth: '90%',
    padding: 15,
    gap: 6,
  },
  progressText: {
    fontFamily: 'PTSans-Bold',
  },
  badgesContainer: {
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
    backgroundColor: 'white',
    alignSelf: 'center',
    justifyContent: 'center',
    width: '30%',
    height: '5%',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    marginTop: 10,
    elevation: 5,

  },
  logoutText: {
    color: Colors.bgError,
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
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    width: "80%",
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
  icon: {

  }
})