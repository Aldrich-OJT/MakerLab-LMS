import { View, Text, StyleSheet, Pressable, Modal, ScrollView, Dimensions} from "react-native";
import { useContext, useState, useEffect} from "react";
import {AuthContext} from "../context/AuthProvider";
import ProgressBar from 'react-native-progress/Bar';
import Colors from "../constants/Colors";
import HomeUserModal from "../components/HomePageComponent/HomeUsersModal";
import HomeLessonsModal from "../components/HomePageComponent/HomeLessonsModal";
import Shortcut from "../components/HomePageComponent/Shortcuts";

export default function HomePage(navigation) {
  const { authContext, userData } = useContext(AuthContext);
  const [ gradeModalVisible, setGradeModalVisible] = useState(false)
  const [ userListModalVisible, setUserListModalVisible] = useState(false)
  const [ refresh, setRefresh]  = useState(true)
  const [ users, setUsers ] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      console.log("effect")
        const data = await axiosGet('/api/user')
        console.log(data) 
        setUsers(data)
        setRefresh(false)
    }

    if (refresh) {
        fetchData()
    }
}, [refresh])

  const shortcuts = [
    {
      role: 'admin',
      icon: '',
      text: 'List of\nUsers',
      onPress: () => setUserListModalVisible(true),
    },
    {
      role: 'admin',
      icon: '',
      text: 'Placeholder\nText',
      onPress: () => {},
    },
    {
      role: 'user',
      icon: '',
      text: 'Finished\nLessons',
      onPress: () => setGradeModalVisible(true),
    },
    {
      role: 'user',
      icon: '',
      text: 'Placeholder\nText',
      onPress: () => {},
    },
  ];

  return (
    <View style={styles.container}>

      <HomeUserModal 
        visibility={userListModalVisible}
        users={users}
        setModalVisible={() => setUserListModalVisible(false)}
      />

      <HomeLessonsModal
        visibility={gradeModalVisible} 
        setModalVisible={() => setGradeModalVisible(false)}
      />

      <View style={styles.bottomSheet}>
        <View style={styles.progressContainer}>
          <View style={styles.progressTopContainer}>
            <Text style={[styles.icons, {fontSize:100}]}></Text>

            <View style={styles.progressTextContainer}>
              <Text style={styles.greetingText}>Hi {userData.name},</Text>
              <Text style={styles.progressText}>
                {userData.role === 'user' ? "You have finished 68% of the course. Good Job!" : "Welcome back!"}
              </Text>
              </View>
          </View>
        {userData.role === 'user' && (
          <ProgressBar 
            animated={true}
            progress={.68} 
            width={300} 
            height={10}
            borderRadius={10}
            unfilledColor={Colors.bgLightGray}
            borderWidth={0}
            color={Colors.bgPurple}
          />
        )}
        </View>

        <View style={styles.shortcutContainer}>
          {shortcuts
            .filter((shortcut) => shortcut.role === userData.role)
            .map((shortcut, index) => (
              <Shortcut
                key={index}
                icon={shortcut.icon}
                text={shortcut.text}
                onPress={shortcut.onPress}
              />
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  bottomSheet: {
    flex: 1,
    padding: 20,
    gap: 20,
    backgroundColor: Colors.bgOffWhite,
  },
  progressContainer: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    flexDirection: 'column',
    gap: 20,
    alignItems:'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
    elevation: 5,
  },
  icons:{
    fontFamily: 'icon',
    color:Colors.bgGray,
  },
  progressTopContainer:{
    flexDirection:'row',
  },
  progressTextContainer: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-evenly',
  },
  greetingText: {
    flexWrap: 'wrap',
    fontSize: 20,
    fontFamily: 'PTSans-Bold'
  },
  progressText: {
    flexWrap: 'wrap',
    fontSize: 16,
    fontFamily: 'PTSans-Regular'
  },
  shortcutContainer: {
    flexDirection: 'row',
    borderRadius: 10,
    gap: 20,
  },
})