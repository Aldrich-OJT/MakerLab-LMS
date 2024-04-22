import React, {  useContext, useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Pressable,Text } from "react-native";
import { axiosGet } from "../../utils/axios";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { ActivityIndicator} from 'react-native-paper';
import { AuthContext } from "../../context/AuthProvider";
//import { useNavigation } from '@react-navigation/native';
//import Header from "../../components/Header";
import Colors from "../../constants/Colors";
import LessonCards from "../../components/LearnComponent/LessonCards";
import LessonModal from "../../components/LearnComponent/LessonModal";

const getCategoryURL = "/api/categories/"

export default function Lessons({ navigation }) {
  console.log("testing")
  const {userData,logout} = useContext(AuthContext);
  const  tabBarHeight  = useBottomTabBarHeight();
  const [lessonData, setLessonData] = useState([]);
  const [refresh, setRefresh] = useState(true);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedData, setSelectedData] = useState("") 
 

  useEffect(() => {
    const fetchLessonData = async () => {
      setLessonData([])
      try {
        const data = await axiosGet(getCategoryURL, userData.token);
        setLessonData(data);
        setRefresh(false)
      } catch (error) {
        console.log(error.status)
        if (error.status == 401) {
          logout();
        }
      }
    };

    if (refresh) {
      fetchLessonData();
    }
  }, [refresh]);


  const handleNavigation = (param) => {
    navigation.navigate('templearn', { param });
  };
 //console.log(selectedData)
 
  return (
    <View style={[styles.mainContainer,{marginBottom:tabBarHeight}]}>
      {selectedData ? (<LessonModal 
        setRefresh={() => setRefresh(true)} 
        selectedData= {selectedData}
        setSelectedData={()=>setSelectedData(null)}
        visibility={modalVisible} 
        setModalVisible={() => setModalVisible(false)}>
       {selectedData == "true" ? "Upload Lesson" : "Edit Lesson"}
      </LessonModal>) : ""}
      
      
      <View style={styles.mainContainer}>
        {lessonData ? (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={lessonData}
            renderItem={({ item, index }) => (
              <LessonCards
                onPress={() => handleNavigation(item)}
                title={item.title}
                setModalVisible={setModalVisible}
                ID={item._id}
                description={item.description}
                setRefresh={setRefresh}
                index={index}
                setSelectedData={setSelectedData}
                length={lessonData.length}
                // modalVisible={modalVisible}
                // setModalVisible={setModalVisible}
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

      {userData.role === 'admin' && (
        <Pressable style={styles.addButton} onPress={() => {setModalVisible(true),setSelectedData("true")}}>
          <Text style={styles.buttonText} >
            +
          </Text>
        </Pressable>
      )}
    </View>
  );
}
const styles = StyleSheet.create({
  mainContainer:{
    flex:1,
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
    backgroundColor: Colors.bgDarkGray,
  },
  buttonText: {
    color: Colors.bgYellow,
    fontSize: 25
  },
})