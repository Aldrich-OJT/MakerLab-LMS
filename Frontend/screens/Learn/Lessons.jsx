import React, { useCallback, useContext, useEffect, useState } from "react";
import { StyleSheet, View, FlatList, Pressable,Text } from "react-native";
import Header from "../../components/Header";
import Colors from "../../constants/Colors";
import LessonCards from "../../components/LearnComponent/LessonCards";
import Learn from "./Learn";
//import { useNavigation } from '@react-navigation/native';
import { axiosGet } from "../../utils/axios";
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { AuthContext } from "../../context/AuthProvider";

const getCategoryURL = "/api/categories/"

export default function Lessons({ navigation }) {
  const authcontext = useContext(AuthContext);
  const  tabBarHeight  = useBottomTabBarHeight();
  const [lessonData, setLessonData] = useState([]);


  useEffect(() => {
    const fetchLessonData = async () => {
      try {
        const data = await axiosGet(getCategoryURL, authcontext.token);
        //console.log(data)
        setLessonData(data);
      } catch (error) {
        console.log(error.status)
        if (error.status == 401) {
          authcontext.logout();
        }
      }
    };

    fetchLessonData();
  }, []);


  const handleNavigation = (param) => {
    navigation.navigate('templearn', { param });
  };
  return (
    <View style={[styles.mainContainer,{marginBottom:tabBarHeight}]}>
      <Header />
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
          <Text>Loading...</Text>
        )}
      </View>
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
})