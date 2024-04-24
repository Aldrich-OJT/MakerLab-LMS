import React, { useState, useContext, useEffect, useCallback, useRef } from "react";
import { View, Text, StyleSheet, Dimensions, Image, Modal, Pressable, ScrollView } from "react-native";
import ProgressBar from 'react-native-progress/Bar';
import Colors from "../constants/Colors";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { AuthContext, DarkModeContext } from '../context/AuthProvider';
import avatar1 from '../assets/avatars/avatar1.png';
import avatar2 from '../assets/avatars/avatar2.png';
import avatar3 from '../assets/avatars/avatar3.png';
import avatar4 from '../assets/avatars/avatar4.png';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { axiosGet } from "../utils/axios";
import { useFocusEffect } from "@react-navigation/native";
import { ActivityIndicator } from "react-native-paper";
const dimensions = Dimensions.get('window');
const deviceWidth = dimensions.width;
const deviceHeight = dimensions.height;
const getuserDataURL = "/api/user/data/";

const avatarChoices = [avatar1, avatar2, avatar3, avatar4];


export default function Settings() {
  const tabBarHeight = useBottomTabBarHeight();
  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const avatarRef = useRef(0);
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const { logout, userData } = useContext(AuthContext);
  const { isDarkMode, setIsDarkMode } = useContext(DarkModeContext);
  const [progress, setProgress] = useState();
  const [formdata, setFormdata] = useState();

  const darkModeHandler = () => {
    setIsDarkMode(!isDarkMode);
  };

  const saveAvatar = (index) => {
    setAvatarModalVisible(false);
    avatarRef.current = index;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (refresh) {
          setLoading(true);
          const data = await axiosGet(`${getuserDataURL}${userData._id}`, userData.token);
          setProgress(parseFloat(data.progress.$numberDecimal));
          setUser(data);
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

  // Refresh the page when focus goes back on this tab
  useFocusEffect(
    useCallback(() => {
      setRefresh(true);
    }, [])
  );

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View
        style={[styles.mainContainer, { backgroundColor: isDarkMode ? Colors.bgGray : Colors.bgOffWhite }]}
      >

        <Modal
          animationType="fade"
          transparent={true}
          visible={avatarModalVisible}
          onRequestClose={() => setAvatarModalVisible(false)}
        >
          <View style={styles.modalMainContainer}>
            <View style={[styles.modalContentContainer, { backgroundColor: isDarkMode ? Colors.bgGray : 'white' }]}>
              <View style={styles.titleContainer}>
                <Text style={[styles.modalText, { color: isDarkMode ? 'white' : Colors.bgDarkGray }]}>
                  Select Avatar
                </Text>
              </View>

              <View style={styles.imageContainer}>
                {avatarChoices.map((item, index) => (
                  <Pressable key={index} onPress={() => saveAvatar(index)}>
                    <Image source={item} style={[styles.avatar, { borderColor: isDarkMode ? Colors.bgDarkGray : Colors.bgLightGray }]} />
                  </Pressable>
                ))}
              </View>

              <Pressable
                style={[styles.cancelButton, { backgroundColor: isDarkMode ? Colors.bgGray : 'white' }]}
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
            {backgroundColor: isDarkMode ? Colors.bgDarkGray : 'white'}]}>
          <Text style={styles.modeButton} onPress={darkModeHandler}>{isDarkMode ? '' : ''}</Text>
          
          <Pressable onPress={() => setAvatarModalVisible(true)}>
            <Image source={avatarChoices[avatarRef.current]} style={[styles.avatar, {borderColor: isDarkMode ? Colors.bgGray : Colors.bgLightGray}]}></Image>
            <Text style={styles.editButton}></Text>
          </Pressable>

          <Text style={[styles.nameText, 
            {color: isDarkMode ? Colors.bgOffWhite : 'black'}]}>
            {userData.name}
          </Text>

          <View style={[styles.progressContainer, {backgroundColor: isDarkMode ? Colors.bgGray : Colors.bgOffWhite} ]}>

            <Text style={[styles.progressText, 
              {color: isDarkMode ? Colors.bgOffWhite : 'black'}]}>
              Progress {parseInt(progress * 100)}%
            </Text>

            <View style={styles.progressBar}>
              <ProgressBar
                animated={true}
                progress={progress}
                width={270}
                height={10}
                borderRadius={10}
                unfilledColor={isDarkMode ? Colors.bgOffWhite : 'white'}
                borderWidth={0}
                color={Colors.bgPurple}
              />
            </View>
          </View>
        </View>
        )}

        <View style={[styles.innerContainer, { backgroundColor: isDarkMode ? Colors.bgDarkGray : 'white' }]}>
          <Text style={[styles.nameText, { color: isDarkMode ? 'white' : Colors.bgDarkGray }]}>My badges</Text>
          <View style={[styles.badgesContainer, { backgroundColor: isDarkMode ? Colors.bgGray : Colors.bgOffWhite }]}>
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
        <Pressable style={[styles.logoutButton, { backgroundColor: isDarkMode ? Colors.bgDarkGray : 'white' }]} onPress={logout}>
          <Text style={styles.logoutText}>
            <Text style={{ fontFamily: 'icon', fontSize: 18 }}></Text>Logout</Text>
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
  editButton: {
    position: 'absolute',
    right: -2,
    top:65,
    backgroundColor:Colors.bgGray,
    borderRadius:100,
    padding:7,
    fontFamily: 'icon', 
    fontSize:16, 
    color: Colors.bgYellow
  },
  modeButton:{
    position: 'absolute',
    right: 10,
    top:10,
    backgroundColor:Colors.bgGray,
    borderRadius:100,
    padding:7,
    fontFamily: 'icon', 
    fontSize:18, 
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
    marginTop:10,
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