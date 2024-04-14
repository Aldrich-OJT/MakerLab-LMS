import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Pressable,Text } from "react-native";
//import Header from "../../components/Header";
import Colors from "../../constants/Colors";
import LessonCards from "../../components/LearnComponent/LessonCards";
import Learn from "./Learn";
import LessonModal from "../../components/LearnComponent/LessonModal";
//import { useNavigation } from '@react-navigation/native';
import { axiosGet } from "../../utils/axios";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { ActivityIndicator} from 'react-native-paper';
import { AuthContext } from "../../context/AuthProvider";

const getCategoryURL = "/api/categories/"

export default function Lessons({ navigation }) {
  const {userData,logout} = useContext(AuthContext);
  const  tabBarHeight  = useBottomTabBarHeight();
  const [lessonData, setLessonData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        const data = await axiosGet(getCategoryURL, userData.token);
        //console.log(data)
        setLessonData(data);
        setRefresh(false)
      } catch (error) {
        console.log(error.status)
        if (error.status == 401) {
          logout();
        }
      }
    };

    fetchLessonData();
  }, [refresh]);


  const handleNavigation = (param) => {
    navigation.navigate('templearn', { param });
  };
 
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <View style={[styles.mainContainer,{marginBottom:tabBarHeight}]}>
      <LessonModal setRefresh={() => setRefresh(true)} visibility={modalVisible} onPress={() => setModalVisible(false)}>Upload Course</LessonModal>
      
      <View style={styles.mainContainer}>
        {lessonData ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={lessonData}
            renderItem={({ item }) => (
              <LessonCards
                onPress={() => handleNavigation(item)}
                title={item.title}
                description={item.description}
              />
            )}
            keyExtractor={(item) => item._id}
          />
        ) : (
          <ActivityIndicator 
          animating={true} 
          style={{top:20}}
          size={60}
          />
        )}
      </View>
      <Pressable style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.buttonText} >
            +
          </Text>
        </Pressable>
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer:{
    flex:1
  },
  container: {
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: Colors.bgOffWhite,
    gap: 20,
    flex: 1
  },
  addButton: {
    position: "absolute",
    right: 10,
    bottom: 10,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    backgroundColor: "black",
  },
  buttonText: {
    color: Colors.bgYellow,
    fontSize: 25
  },
})