import { View, Text, StyleSheet, } from "react-native";
import { useContext, useState, useEffect, useCallback } from "react";
import { AuthContext } from "../context/AuthProvider";
import ProgressBar from 'react-native-progress/Bar';
import Colors from "../constants/Colors";
import HomeUserModal from "../components/HomePageComponent/HomeUsersModal";
import HomeLessonsModal from "../components/HomePageComponent/HomeLessonsModal";
import Shortcut from "../components/HomePageComponent/Shortcuts";
import { axiosGet } from "../utils/axios";
import { useFocusEffect } from "@react-navigation/native";
export default function HomePage() {

  const { userData } = useContext(AuthContext);
  const [gradeModalVisible, setGradeModalVisible] = useState(false)
  const [userListModalVisible, setUserListModalVisible] = useState(false)
  const [refresh, setRefresh] = useState(true)
  const [loading, setLoading] = useState(false)
  const [users, setUsers] = useState([]);
  const [userScores, setUserScores] = useState([]);
  const [filteredData, setfilteredData] = useState({})
  const [categories, setCategories] = useState([])
  const [progress, setProgress] = useState(null)



  useEffect(() => {
    const filteredData = {};

    // Loop through categories
    categories.forEach(categories => {

      const categoryId = categories._id;
      const categoryTitle = categories.title; // Store the category title

      // Find matching data objects
      const matchingData = userScores.filter(item => item.categoryId === categoryId);


      // If there's matching data, create an object with category title and data
      if (matchingData.length > 0) {
        filteredData[categoryTitle] = matchingData;
      }
    });

    setfilteredData(filteredData)


  }, [userScores, categories])

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
      text: 'Placeholder\nText',
      onPress: () => { },
    },
    {
      role: 'user',
      icon: '',
      text: 'Finished\nLessons',
      onPress: () => setGradeModalVisible(true),
    },
    {
      role: 'admin',
      icon: '',
      text: 'Placeholder\nText',
      onPress: () => { },
    },
  ];

  return (
    <View style={styles.container}>

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

      <View style={styles.bottomSheet}>
        <View style={styles.progressContainer}>
          <View style={styles.progressTopContainer}>
            <Text style={[styles.icons, { fontSize: 100 }]}></Text>

            <View style={styles.progressTextContainer}>
              <Text style={styles.greetingText}>Hi {userData.name},</Text>
              <Text style={styles.progressText}>
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
              unfilledColor={Colors.bgLightGray}
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
    backgroundColor: Colors.bgOffWhite,
  },
  progressContainer: {
    backgroundColor: 'white',
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
    color: Colors.bgGray,
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