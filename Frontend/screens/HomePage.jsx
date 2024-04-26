import { View, Text, StyleSheet} from "react-native";
import {AuthContext} from "../context/AuthProvider";
import { useContext, useState, useEffect, useCallback } from "react";
import ProgressBar from 'react-native-progress/Bar';
import Colors from "../constants/Colors";
import HomeUserModal from "../components/HomePageComponent/HomeUsersModal";
import HomeLessonsModal from "../components/HomePageComponent/HomeLessonsModal";
import Shortcut from "../components/HomePageComponent/Shortcuts";
import { axiosGet } from "../utils/axios";
import { useFocusEffect } from "@react-navigation/native";
import { useTheme } from "react-native-paper";



export default function HomePage() {
  const { userData } = useContext(AuthContext);
  const  theme =useTheme()
  const [ gradeModalVisible, setGradeModalVisible] = useState(false)
  const [ userListModalVisible, setUserListModalVisible] = useState(false)
  const [ refresh, setRefresh]  = useState(true)
  const [ users, setUsers ] = useState([]);
  const [ userScores, setUserScores] =  useState([]); 
  const [loading, setLoading] = useState(false)
  const [filteredData, setfilteredData] = useState({})
  const [categories, setCategories] = useState([])
  const [progress, setProgress] = useState(null)
  

  useEffect(() => {
    const filteredData = {};
    // Loop through categories
    categories.forEach(categories => {

      const categoryId = categories._id;
      const categoryTitle = categories.title; // Store the category title

      // Find matching category id
      const matchingData = userScores.filter(item => item.categoryId === categoryId);


      // If there's matching data, create an object with category title and data
      if (matchingData.length > 0) {
        filteredData[categoryTitle] = matchingData;
      }
    });
   

    if(!loading){
      setfilteredData(filteredData)
    }


  }, [loading])

  useEffect(() => {
    const fetchData = async () => {

      try {
        setLoading(true)
        const data = await axiosGet('/api/user')
        const userdata = await axiosGet(`/api/user/data/${userData._id}`, userData.token)
        const categories = await axiosGet(`/api/categories/`, userData.token)
        setUserScores(userdata.quizScores)
        setProgress(parseFloat(userdata.progress.$numberDecimal))
        setCategories(categories)
        setUsers(data)
        setRefresh(false)
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    if (refresh) {
      fetchData()
    }
  }, [refresh])

  useFocusEffect(
    useCallback(() => {
      setRefresh(true)
    }, [])
  );
  const shortcuts = [
    {
      role: 'admin',
      icon: '',
      text: 'List of\nUsers',
      onPress: () => setUserListModalVisible(true),
    },
    {
      role: 'user',
      icon: '',
      text: 'View\nGrades',
      onPress: () => { },
    },
    {
      role: 'admin',
      icon: '',
      text: 'Finished\nLessons',
      onPress: () => setGradeModalVisible(true),
    },
    {
      role: 'user',
      icon: '',
      text: 'Placeholder\nText',
      onPress: () => { },
    },
  ];
  //console.log("filtered",userScores)
  return (
    <View style={[styles.container, { backgroundColor: theme.colors.grayOffwhite }]}>
      {!loading && <HomeUserModal
        visibility={userListModalVisible}
        users={users}
        setModalVisible={() => setUserListModalVisible(false)}
      />}

      {filteredData && <HomeLessonsModal
        data={filteredData}
        visibility={gradeModalVisible}
        setModalVisible={() => setGradeModalVisible(false)}
      />}

      <View style={[styles.bottomSheet, {backgroundColor: theme.colors.grayOffwhite}]}>
        <View style={[styles.progressContainer, {backgroundColor: theme.colors.darkGrayWhite}]}>
          <View style={styles.progressTopContainer}>
            <Text style={[styles.icons, {fontSize:100, color: theme.colors.fontcolor}]}></Text>
            <View style={styles.progressTextContainer}>
              <Text style={[styles.greetingText, {color: theme.colors.fontcolor}]}>Hi {userData.name},</Text>
              <Text style={[styles.progressText, {color: theme.colors.fontcolor}]}>
                {userData.role === 'user' ? `You have finished ${Math.floor(progress * 100)}% of the course. ${(progress*100) < 50 ? "Keep going!" :"Good job!"}` : "Welcome back!"}
              </Text>
            </View>
          </View>
          {userData.role === 'user' && !loading ? (
            <ProgressBar
              animated={true}
              progress={progress}
              width={300}
              height={10}
              borderRadius={10}
              unfilledColor={theme.lightGrayOffwhite}
              borderWidth={0}
              color={Colors.bgPurple}
            />
          ) : ""}
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
  },
  progressContainer: {
    padding: 20,
    borderRadius: 10,
    flexDirection: 'column',
    gap: 20,
    alignItems: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  icons: {
    fontFamily: 'icon',
  },
  progressTopContainer: {
    flexDirection: 'row',
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